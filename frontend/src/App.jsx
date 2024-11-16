
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CarDetails from './pages/CarDetails';
import EditCar from './pages/EditCar';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute'; // A component to protect routes

const App = () => {
  return (
    <Router>
      <CssBaseline /> {/* Material UI Reset */}
      <Navbar /> {/* Navigation bar */}
      
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes (Dashboard, Car Details, Edit Car) */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/car/:id" 
            element={
              <ProtectedRoute>
                <CarDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/edit-car/:id" 
            element={
              <ProtectedRoute>
                <EditCar />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
