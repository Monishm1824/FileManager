import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/api';

export default function PrivateRoute({ children, allowedRoles = [] }) {
  const user = authService.getUser();
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
