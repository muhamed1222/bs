import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

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
  const router = useRouter();
  const auth = useAuth();

  React.useEffect(() => {
    if (!auth.isAuthenticated()) {
      router.push('/auth');
      return;
    }

    if (requiredRole && !auth.hasRole(requiredRole)) {
      router.push('/');
      return;
    }

    if (requiredPermission && !auth.hasPermission(requiredPermission)) {
      router.push('/');
      return;
    }
  }, [auth, router, requiredRole, requiredPermission]);

  if (!auth.isAuthenticated() || 
      (requiredRole && !auth.hasRole(requiredRole)) || 
      (requiredPermission && !auth.hasPermission(requiredPermission))) {
    return fallback || null;
  }

  return <>{children}</>;
}; 