


import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Layout from './layout/Layout';
import Landingpage from '../pages/Landingpage';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token'); // Check if there's a token in localStorage

  if (!token) {
    // If no token, redirect to login page
    console.log("hhhhh")
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the nested routes (Outlet)
  return <Landingpage />;
};

export default ProtectedRoute;
