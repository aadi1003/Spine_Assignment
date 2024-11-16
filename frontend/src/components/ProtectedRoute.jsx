import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

  // If there is no token, redirect the user to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If the token is present, allow the route to render
  return children;
};

export default ProtectedRoute;
