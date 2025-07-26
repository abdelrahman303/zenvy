import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requiredRole }) {
  const { token, user } = useContext(UserContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/home" />; 
  }

  return children;
}
