import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, Box } from '@mui/material';
import CarIcon from '@mui/icons-material/DirectionsCar';

const Home = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Box textAlign="center">
        <Typography variant="h3" gutterBottom>
          Welcome to Car Management App
        </Typography>
        <Typography variant="h6" paragraph>
          Manage your car listings easily. You can add, update, or delete cars, and keep track of your inventory.
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button 
              component={Link} 
              to="/signup" 
              variant="contained" 
              color="primary" 
              size="large"
              startIcon={<CarIcon />}
            >
              Sign Up
            </Button>
          </Grid>
          <Grid item>
            <Button 
              component={Link} 
              to="/login" 
              variant="outlined" 
              color="primary" 
              size="large"
              startIcon={<CarIcon />}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box mt={5} textAlign="center">
        <Typography variant="h5">Features</Typography>
        <Typography variant="body1" paragraph>
          - Add new cars with details like title, description, images, and tags.<br />
          - Edit and update your cars anytime.<br />
          - Search for cars based on their title, description, or tags.<br />
          - Easily delete cars you no longer need.<br />
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
