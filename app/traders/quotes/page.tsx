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
} from '@mui/material';
import { Plus, Delete } from 'lucide-react';
import { useAppSelector } from '@/lib/hooks';
import { addCropToInventory, deleteCropFromInventory, fetchCropsByUserId } from '@/lib/actions/source.actions';

// Define the Crop type
type Crop = {
  _id: string;
  CropType: string;
  location: string;
  quantity: number;
  inStock: boolean;
};

const TraderInventory: React.FC = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCrop, setNewCrop] = useState<Omit<Crop, '_id' | 'inStock'>>({ CropType: '', location: '', quantity: 0 });
  const [editCrop, setEditCrop] = useState<Crop | null>(null);
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
    if (editCrop) {
      setEditCrop((prev) => prev ? { ...prev, [name]: value } : prev);
    } else {
      setNewCrop((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddCrop = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the page from refreshing
    try {
      if (user) {
        const result = await addCropToInventory({
          name: newCrop.CropType,
          quantity: newCrop.quantity,
          userId: user.uid,
        });

        setSnackbarMessage('Crop added successfully!');
        setCrops([...crops, { ...newCrop, _id: result.insertedId, inStock: true }]);
        setNewCrop({CropType:'',location:"",quantity:0})
      }
    } catch (error) {
      setSnackbarMessage('Error adding crop.');
    }

    setOpenSnackbar(true);
    setOpenDialog(false);
  };

  // const handleEditCrop = async (e: React.FormEvent) => {
  //   e.preventDefault();
  
  //   if (editCrop && user) {
  //     try {
  //       const updatedCrop = {
  //         _id: editCrop._id,
  //         CropType: editCrop.CropType,
  //         quantity:  editCrop.quantity,
  //         location: editCrop.location,
  //       };
  
  //       const result = await updateCropInInventory({
  //         cropId: updatedCrop._id,
  //         name: updatedCrop.CropType,
  //         quantity: updatedCrop.quantity,
  //       });
  
  //       if (result.success) {
  //         setCrops((prevCrops) =>
  //           prevCrops.map((crop) =>
  //             crop._id === updatedCrop._id ? { ...updatedCrop, inStock: crop.inStock } : crop
  //           )
  //         );
  //         setSnackbarMessage('Crop updated successfully!');
  //       } else {
  //         setSnackbarMessage(result.message || 'Error updating crop.');
  //       }
  //     } catch (error) {
  //       setSnackbarMessage('Error updating crop.');
  //       console.error('Error:', error);
  //     }
  
  //     setOpenSnackbar(true);
  //     setOpenDialog(false);
  //     setEditCrop(null);
  //     setNewCrop({ CropType: '', location: '', quantity: 0 });
  //   }
  // };
  
  
  

  const handleDeleteCrop = async (id: string) => {
    try {
      const result = await deleteCropFromInventory(id);

      if (result.success) {
        setSnackbarMessage('Crop deleted successfully!');
        setCrops(crops.filter((crop) => crop._id !== id));
      } else {
        setSnackbarMessage(result.message || 'Error deleting crop.');
      }
    } catch (error) {
      setSnackbarMessage('Error deleting crop.');
      console.error('Error:', error);
    }

    setOpenSnackbar(true);
  };

  const handleEditClick = (crop: Crop) => {
    setEditCrop(crop);
    setNewCrop({ CropType: crop.CropType, location: crop.location, quantity: crop.quantity });
    setOpenDialog(true);
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
          <Button variant="contained" color="primary" onClick={() => { setNewCrop({ CropType: '', location: '', quantity: 0 }); setOpenDialog(true); }}>
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
                {/* <TableCell>Edit</TableCell> */}
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {crops.map((crop) => (
                <TableRow key={crop._id}>
                  <TableCell>{crop.CropType}</TableCell>
                  <TableCell>{crop.quantity}</TableCell>
                  {/* <TableCell>
                    <Button onClick={() => handleEditClick(crop)} variant="outlined">
                      Edit
                    </Button>
                  </TableCell> */}
                  <TableCell>
                    <Button onClick={() => handleDeleteCrop(crop._id)} variant="outlined" color="secondary">
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
        <DialogTitle>{editCrop ? "Edit Crop" : "Add New Crop"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editCrop
              ? "Please update the details of the crop."
              : "Please enter the details of the new crop you want to add."}
          </DialogContentText>
          <form onSubmit={handleAddCrop}>
            <TextField
              autoFocus
              margin="dense"
              name="CropType"
              label="Crop Name"
              type="text"
              fullWidth
              value={editCrop ? editCrop.CropType : newCrop.CropType} // Use editCrop if editing
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="quantity"
              label="Quantity"
              type="number"
              fullWidth
              value={editCrop ? editCrop.quantity : newCrop.quantity} // Use editCrop if editing
              onChange={handleChange}
            />
          
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                {editCrop ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default TraderInventory;
