import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // assuming you're using js-cookie

const isAuthenticated = () => {
  const token = Cookies.get('authToken');
  return !!token;
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
