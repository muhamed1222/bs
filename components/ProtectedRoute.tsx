import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AuthService } from '../services/auth/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  requiredPermission?: string;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  requiredPermission,
  fallback
}) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated()) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requiredRole && !auth.hasRole(requiredRole)) {
    return fallback || <Navigate to="/" replace />;
  }

  if (requiredPermission && !auth.hasPermission(requiredPermission)) {
    return fallback || <Navigate to="/" replace />;
  }

  return <>{children}</>;
}; 