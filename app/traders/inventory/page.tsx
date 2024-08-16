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
import { addDoc, collection, getDocs, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/config';
import { Plus, Delete } from 'lucide-react';
import { useAppSelector } from '@/lib/hooks';
import { addCropToInventory, fetchCropsByUserId } from '@/lib/actions/source.actions';
import { capitalizeFirstLetter } from '@/utilis/capitalLetter';

// Define the Crop type
type Crop = {
  id: string;
  name: string;
  location: string;
  quality: number;
  inStock: boolean;
};

const TraderInventory: React.FC =  async () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCrop, setNewCrop] = useState<Omit<Crop, 'id' | 'inStock'>>({ name: '', location: '', quality: 0 });
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

 
  const handleAddCrop = async () => {
   
  
  
    try {
      // await addCropToInventory({
       
      // });
      setSnackbarMessage('Crop added successfully!');
    } catch (error) {
      setSnackbarMessage('Error adding crop.');
    }
  
    // setNewCrop({ CropType: '', country: '', Region: '', quality: 0 });
    setOpenSnackbar(true);
    setOpenDialog(false);
  };
  const handleDeleteCrop = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'crops', id));
      setSnackbarMessage('Crop deleted successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Error deleting crop.');
      setOpenSnackbar(true);
    }
  };

  const handleToggleStock = async (id: string, inStock: boolean) => {
    try {
      await updateDoc(doc(db, 'crops', id), { inStock: !inStock });
      setSnackbarMessage('Stock status updated successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Error updating stock status.');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container className='mt-20'>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Crop TraderInventory</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Crop TraderInventory
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
                <TableCell>In Stock</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {crops.map((crop) => (
                <TableRow key={crop.id}>
                  <TableCell>{crop.name}</TableCell>
                  <TableCell>{crop.location}</TableCell>
                  <TableCell>{crop.quality}</TableCell>
                  <TableCell>
                    <Switch
                      checked={crop.inStock}
                      onChange={() => handleToggleStock(crop.id, crop.inStock)}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteCrop(crop.id)}>
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteCrop(crop.id)} >
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
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Crop Name"
            type="text"
            fullWidth
            value={newCrop.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="quality"
            label="Quality"
            type="number"
            fullWidth
            value={newCrop.quality}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="location"
            label="Location"
            type="text"
            fullWidth
            value={newCrop.location}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddCrop} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TraderInventory;
