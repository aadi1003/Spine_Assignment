import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import { Container, TextField, Grid, Typography } from '@mui/material';
import CarCard from '../components/CarCard';

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await API.get('/cars');
        setCars(data);
      } catch (error) {
        console.error(error.response?.data?.error || 'Failed to fetch cars');
      }
    };
    fetchCars();
  }, []);

  const handleSearch = async () => {
    try {
      const { data } = await API.get(`/cars/search?keyword=${search}`);
      setCars(data);
    } catch (error) {
      console.error(error.response?.data?.error || 'Search failed');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>My Cars</Typography>
      <TextField 
        label="Search" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        fullWidth 
        margin="normal" 
      />
      <Grid container spacing={3}>
        {cars.map((car) => (
          <Grid item key={car._id} xs={12} sm={6} md={4}>
            <CarCard car={car} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
