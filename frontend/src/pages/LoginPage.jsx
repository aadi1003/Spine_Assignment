import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { Container, TextField, Button, Typography } from '@mui/material';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
          label="Email" 
          name="email" 
          value={form.email} 
          onChange={handleChange} 
          fullWidth 
          margin="normal" 
        />
        <TextField 
          label="Password" 
          name="password" 
          type="password" 
          value={form.password} 
          onChange={handleChange} 
          fullWidth 
          margin="normal" 
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
