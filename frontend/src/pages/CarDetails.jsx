import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api';
import { Container, Typography, Grid, Button } from '@mui/material';

const CarDetails = () => {
  const { id } = useParams(); // Get the car ID from the URL
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await API.get(`/cars/${id}`);
        setCar(data);
      } catch (error) {
        console.error(error.response?.data?.error || 'Failed to fetch car details');
      }
    };

    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    try {
      await API.delete(`/cars/${id}`);
      navigate('/dashboard');
    } catch (error) {
      console.error(error.response?.data?.error || 'Failed to delete car');
    }
  };

  if (!car) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>{car.title}</Typography>
      <Typography variant="body1" gutterBottom>{car.description}</Typography>
      <Typography variant="subtitle1" gutterBottom>
        Tags: {car.tags.join(', ')}
      </Typography>

      <Grid container spacing={2}>
        {car.images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <img 
              src={image} 
              alt={`Car ${index + 1}`} 
              style={{ width: '100%', borderRadius: '8px' }} 
            />
          </Grid>
        ))}
      </Grid>

      <Button 
        variant="contained" 
        color="primary" 
        component={Link} 
        to={`/edit-car/${id}`} 
        style={{ marginTop: '16px' }}
      >
        Edit
      </Button>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleDelete} 
        style={{ marginTop: '16px', marginLeft: '8px' }}
      >
        Delete
      </Button>
    </Container>
  );
};

export default CarDetails;
