import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Exemple avec token dans le localStorage

  return isAuthenticated ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
