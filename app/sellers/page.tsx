"use client";
import React, { useState, useEffect } from 'react';
import { 
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Snackbar,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Switch
} from '@mui/material';
import { collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/config';
import { Plus, Delete } from 'lucide-react';
import { useAppSelector } from '@/lib/hooks';

type Crop = {
  id: string;
 
  location: string;
  country: string;
  region: string;
  cropType: string;
  quantity: number;
  quality: number;
  inStock: boolean;
};


const SellerDashboard: React.FC = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCrop, setNewCrop] = useState<Omit<Crop, 'id' | 'inStock'>>({
 
    location: '',
    quality: 0,
    country: '',
    region: '',
    cropType: '',
    quantity: 0,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  // gettingthe 
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      const cropsCollection = collection(db, 'crops');
      const snapshot = await getDocs(cropsCollection);
      const cropList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Crop));
      setCrops(cropList);
      setLoading(false);
    };

    fetchData();

    const unsubscribe = onSnapshot(collection(db, 'crops'), (snapshot) => {
      const cropList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Crop));
      setCrops(cropList);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCrop((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCrop = async () => {
    if (newCrop.cropType.trim() === '' || newCrop.location.trim() === '') return;

    try {
      await addDoc(collection(db, 'crops'), { ...newCrop, inStock: true });
      setSnackbarMessage('Crop added successfully!');
    } catch (error) {
      setSnackbarMessage('Error adding crop.');
    }
    setNewCrop({
      location: '',
      quality: 0,
      country: '',
      region: '',
      cropType: '',
      quantity: 0,});
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
    <Container className='mt-20 ml-56 '>
      {/* <Typography variant="h3" gutterBottom>
        Seller Dashboard
      </Typography> */}
      <Grid container spacing={3}>
        {/* Key Metrics */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Key Metrics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Card style={{ backgroundColor: '#bbdefb' }}>
                    <CardContent>
                      <Typography variant="h6">Total Crops Listed</Typography>
                      <Typography variant="h4">{crops.length}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card style={{ backgroundColor: '#c8e6c9' }}>
                    <CardContent>
                      <Typography variant="h6">Crops In Stock</Typography>
                      <Typography variant="h4">{crops.filter(crop => crop.inStock).length}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card style={{ backgroundColor: '#ffecb3' }}>
                    <CardContent>
                      <Typography variant="h6">Crops Out of Stock</Typography>
                      <Typography variant="h4">{crops.filter(crop => !crop.inStock).length}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Crops */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Recent Crops
              </Typography>
              {loading ? (
                <CircularProgress />
              ) : (
                <ul>
                  {crops.slice(0, 5).map((crop) => (
                    <li key={crop.id} className="border-b py-2">
                      <Typography className="font-medium">{crop.cropType}</Typography>
                      <Typography className="text-gray-600">{crop.location} - Quality: {crop.quality}</Typography>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* <Button variant="contained" color="primary" className="mt-4" onClick={() => setOpenDialog(true)}>
        <Plus /> Add Crop
      </Button>

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
      value={newCrop.cropType}
      onChange={handleChange}
    />
    <TextField
      margin="dense"
      name="country"
      label="Country"
      type="text"
      fullWidth
      value={newCrop.country}
      onChange={handleChange}
    />
    <TextField
      margin="dense"
      name="region"
      label="Region"
      type="text"
      fullWidth
      value={newCrop.region}
      onChange={handleChange}
    />
    <TextField
      margin="dense"
      name="cropType"
      label="Crop Type"
      type="text"
      fullWidth
      value={newCrop.cropType}
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
      name="quantity"
      label="Quantity"
      type="number"
      fullWidth
      value={newCrop.quantity}
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


      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      /> */}

      {/* <Typography variant="h5" gutterBottom className="mt-6">
        Manage Crops
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Location</th>
              <th className="py-2">Quality</th>
              <th className="py-2">In Stock</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {crops.map((crop) => (
              <tr key={crop.id}>
                <td className="border px-4 py-2">{crop.cropType}</td>
                <td className="border px-4 py-2">{crop.location}</td>
                <td className="border px-4 py-2">{crop.quality}</td>
                <td className="border px-4 py-2">
                  <Switch
                    checked={crop.inStock}
                    onChange={() => handleToggleStock(crop.id, crop.inStock)}
                    color="primary"
                  />
                </td>
                <td className="border px-4 py-2">
                  <IconButton onClick={() => handleDeleteCrop(crop.id)}>
                    <Delete />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )} */}
    </Container>
  );
};

export default SellerDashboard;
