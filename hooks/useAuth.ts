import { useEffect, useState } from 'react';
import { AuthService, AuthState, User } from '../services/auth/types';
import { AuthServiceImpl } from '../services/auth/AuthServiceImpl';

const authService: AuthService = AuthServiceImpl.getInstance();

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: authService.isAuthenticated(),
    user: authService.getUser(),
    loading: false,
    error: null
  });

  useEffect(() => {
    const unsubscribe = authService.subscribe(setState);
    return () => unsubscribe();
  }, []);

  return {
    ...state,
    login: authService.login.bind(authService),
    logout: authService.logout.bind(authService),
    hasRole: authService.hasRole.bind(authService),
    hasPermission: authService.hasPermission.bind(authService)
  };
};

export default useAuth;
