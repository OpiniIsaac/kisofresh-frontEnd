"use client";
import React, { useState, useEffect } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  TextField,
  CircularProgress,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Switch,
} from '@mui/material';
import { Plus, Delete } from 'lucide-react';
import { useAppSelector } from '@/lib/hooks';
import { addCropToInventory, fetchCropsByUserId } from '@/lib/actions/source.actions';

// Define the Crop type
type Crop = {
  id: string;
  CropType: string;
  location: string;
  quantity: number;
  inStock: boolean;
};

const TraderInventory: React.FC = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCrop, setNewCrop] = useState<Omit<Crop, 'id' | 'inStock'>>({ CropType: '', location: '', quantity: 0});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchCrops = async () => {
      if (user) {
        try {
          const cropsData = await fetchCropsByUserId(user.uid);
          setCrops(cropsData);
        } catch (error) {
          console.error('Error fetching crops:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchCrops();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCrop((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCrop = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the page from refreshing
    try {
     if (user){
    const result = await addCropToInventory({
        name: newCrop.CropType,
        quantity: newCrop.quantity,
        userId: user.uid,
      });

      
      setSnackbarMessage('Crop added successfully!');
      setCrops([...crops, { ...newCrop, id: result.insertedId, inStock: true }]);
     }

     
   
    } catch (error) {
      setSnackbarMessage('Error adding crop.');
    }

    setOpenSnackbar(true);
    setOpenDialog(false);
  };

  const handleDeleteCrop = async (id: string) => {
    // Your delete logic here
  };

  const handleToggleStock = async (id: string, inStock: boolean) => {
    // Your toggle logic here
  };

  return (
    <Container className='mt-20'>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Crop Trader Inventory</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Crop Trader Inventory
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
            <Plus /> Add Crop
          </Button>
        </Grid>
      </Grid>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Crop</TableCell>
                <TableCell>Quantity</TableCell>
      
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {crops.map((crop) => (
                <TableRow key={crop.id}>
                  <TableCell>{crop.CropType}</TableCell>
                  <TableCell>{crop.quantity}</TableCell>
                
                  <TableCell>
                    <Button onClick={() => {}} variant='outlined'>
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteCrop(crop.id)} color='error' variant='contained'>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Crop</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details of the new crop you want to add.
          </DialogContentText>
          <form onSubmit={handleAddCrop}>
            <TextField
              autoFocus
              margin="dense"
              name="CropType"
              label="Crop Name"
              type="text"
              fullWidth
              value={newCrop.CropType}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="quantity"
              label="Quantity"
              type="number"
              fullWidth
              value={newCrop.quantity}
              onChange={handleChange}
            />
            
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default TraderInventory;
