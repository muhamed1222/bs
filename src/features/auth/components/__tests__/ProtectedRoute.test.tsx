import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProtectedRoute } from '../ProtectedRoute';
import { AuthProvider } from '../../contexts/AuthContext';

// Мокаем useRouter
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Мокаем useAuth
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('ProtectedRoute', () => {
  const mockChildren = <div>Protected Content</div>;

  it('рендерит дочерние элементы для аутентифицированного пользователя', () => {
    const mockAuth = {
      user: { id: '1', email: 'test@example.com' },
      isAuthenticated: true,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      register: jest.fn(),
    };

    (require('../../contexts/AuthContext').useAuth as jest.Mock).mockReturnValue(mockAuth);

    render(
      <AuthProvider>
        <ProtectedRoute>{mockChildren}</ProtectedRoute>
      </AuthProvider>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('перенаправляет на страницу входа для неаутентифицированного пользователя', () => {
    const mockAuth = {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      register: jest.fn(),
    };

    (require('../../contexts/AuthContext').useAuth as jest.Mock).mockReturnValue(mockAuth);

    const mockPush = jest.fn();
    jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => ({
      push: mockPush,
    }));

    render(
      <AuthProvider>
        <ProtectedRoute>{mockChildren}</ProtectedRoute>
      </AuthProvider>
    );

    expect(mockPush).toHaveBeenCalledWith('/auth/login');
  });

  it('отображает индикатор загрузки во время проверки аутентификации', () => {
    const mockAuth = {
      user: null,
      isAuthenticated: false,
      isLoading: true,
      login: jest.fn(),
      logout: jest.fn(),
      register: jest.fn(),
    };

    (require('../../contexts/AuthContext').useAuth as jest.Mock).mockReturnValue(mockAuth);

    render(
      <AuthProvider>
        <ProtectedRoute>{mockChildren}</ProtectedRoute>
      </AuthProvider>
    );

    expect(screen.getByText(/загрузка/i)).toBeInTheDocument();
  });
}); 