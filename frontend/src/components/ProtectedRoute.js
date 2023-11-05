import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function ProtectedRoute({ element, isAuthenticated, fallbackPath }) {
  if (isAuthenticated) {
    return <Route element={element} />;
  } else {
    return <Navigate to={fallbackPath} />;
  }
}

export default ProtectedRoute;
