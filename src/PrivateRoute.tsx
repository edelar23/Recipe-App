import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface RequireAuthProps {
  children: React.ReactNode;
  isPublic?: boolean; // Add a prop to specify if the route is public
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, isPublic = false }) => {
  const auth = useAuth();

  // Redirect to the login page if the route is private and the user is not authenticated
  if (!auth.isAuthenticated && !isPublic) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default RequireAuth;
