import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { Container, TextField, Button, Typography } from '@mui/material';

const AddCar = () => {
  const [form, setForm] = useState({ title: '', description: '', tags: '' });
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    Array.from(images).forEach((file) => formData.append('images', file));

    try {
      await API.post('/cars', formData);
      navigate('/dashboard');
    } catch (error) {
      console.error(error.response?.data?.error || 'Failed to add car');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>Add Car</Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
          label="Title" 
          name="title" 
          value={form.title} 
          onChange={handleChange} 
          fullWidth 
          margin="normal" 
        />
        <TextField 
          label="Description" 
          name="description" 
          value={form.description} 
          onChange={handleChange} 
          fullWidth 
          margin="normal" 
          multiline 
          rows={4} 
        />
        <TextField 
          label="Tags (comma-separated)" 
          name="tags" 
          value={form.tags} 
          onChange={handleChange} 
          fullWidth 
          margin="normal" 
        />
        <input type="file" multiple onChange={handleImageChange} />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Car
        </Button>
      </form>
    </Container>
  );
};

export default AddCar;
