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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Plus, Delete } from 'lucide-react';
import { useAppSelector } from '@/lib/hooks';
import { addCropToInventory, deleteCropFromInventory, fetchCropsByUserId} from '@/lib/actions/source.actions';

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    e.preventDefault();
    try {
      if (user) {
        const result = await addCropToInventory({
          name: newCrop.CropType,
          quantity: newCrop.quantity,
          userId: user.uid,
        });

        setSnackbarMessage('Crop added successfully!');
        setCrops([...crops, { ...newCrop, _id: result.insertedId, inStock: true }]);
        setNewCrop({CropType:'', location:"", quantity:0})
      }
    } catch (error) {
      setSnackbarMessage('Error adding crop.');
    }

    setOpenSnackbar(true);
    setOpenDialog(false);
  };

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
    <Container maxWidth="lg" className="mt-10">
      <AppBar position="static">
        <Toolbar>
          <Typography variant={isMobile ? 'h6' : 'h5'}>Crop Trader Inventory</Typography>
        </Toolbar>
      </AppBar>
      
      <Grid container spacing={2} alignItems="center" justifyContent="space-between" className="mt-4 mb-4">
        <Grid item>
          <Typography variant={isMobile ? 'h5' : 'h4'}>Manage Your Crops</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Plus />}
            onClick={() => { setNewCrop({ CropType: '', location: '', quantity: 0 }); setOpenDialog(true); }}
            sx={{ textTransform: 'none', padding: isMobile ? '8px 16px' : '10px 20px' }}
          >
            Add Crop
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <TableContainer component={Paper} className={isMobile ? 'shadow-none' : 'shadow-lg'}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Crop</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {crops.map((crop) => (
                <TableRow key={crop._id}>
                  <TableCell>{crop.CropType}</TableCell>
                  <TableCell>{crop.quantity}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      size={isMobile ? 'small' : 'medium'}
                      startIcon={<Delete />}
                      onClick={() => handleDeleteCrop(crop._id)}
                    >
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
      
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editCrop ? "Edit Crop" : "Add New Crop"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editCrop ? "Please update the crop details." : "Enter the details for the new crop."}
          </DialogContentText>
          <form onSubmit={handleAddCrop}>
            <TextField
              autoFocus
              margin="dense"
              name="CropType"
              label="Crop Name"
              type="text"
              fullWidth
              value={editCrop ? editCrop.CropType : newCrop.CropType}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="quantity"
              label="Quantity"
              type="number"
              fullWidth
              value={editCrop ? editCrop.quantity : newCrop.quantity}
              onChange={handleChange}
              required
            />
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="primary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
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
