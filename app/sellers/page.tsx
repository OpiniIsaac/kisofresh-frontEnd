"use client";
import React, { useState, useEffect } from 'react';
import { 
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Snackbar
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
      quantity: 0,
    });
    setOpenSnackbar(true);
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
    <Container maxWidth="lg" className="mt-8">
      <Grid container spacing={4}>
        {/* Key Metrics */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Key Metrics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card style={{ backgroundColor: '#e3f2fd' }}>
                    <CardContent>
                      <Typography variant="body1">Total Crops Listed</Typography>
                      <Typography variant="h4" className="font-bold">{crops.length}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Crops */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default SellerDashboard;
