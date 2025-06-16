import React, { createContext, useContext, useState } from 'react';
import { login, signup, resetPassword, logout, getUser } from '../services/auth';
import { User } from '../services/auth/types';

export interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getUser());

  const handleLogin = async (email: string, password: string) => {
    const u = await login({ email, password });
    setUser(u);
  };

  const handleSignup = async (email: string, password: string, name?: string) => {
    const u = await signup(email, password, name);
    setUser(u);
  };

  const handleResetPassword = async (email: string) => {
    await resetPassword(email);
  };

  const handleUpdateUser = (newUser: User | null) => {
    setUser(newUser);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login: handleLogin, 
        signup: handleSignup, 
        resetPassword: handleResetPassword, 
        updateUser: handleUpdateUser, 
        logout: handleLogout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
