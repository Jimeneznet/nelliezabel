import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../lib/context/auth.context';

export interface IProtectedRoute {
    children?: React.ReactNode
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({children}) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/' />;
  }
  return <>{children}</>
};

export default ProtectedRoute;
