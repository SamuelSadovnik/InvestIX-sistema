import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, userType } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se allowedRoles for fornecido, verificar se o usuário tem permissão
  if (allowedRoles && userType) {
    // Converter a userType para minúsculas para compatibilidade com as roles definidas
    const normalizedUserType = userType.toLowerCase();
    if (!allowedRoles.includes(normalizedUserType)) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
