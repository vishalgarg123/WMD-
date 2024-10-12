import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Check if user is authenticated
  const isAuthenticated = !!localStorage.getItem('user'); // Check if user info exists in localStorage

  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
