import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navigation } from '../Navigation';

// Мокаем useRouter
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Мокаем useAuth
jest.mock('@/features/auth/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('отображает ссылки для неаутентифицированного пользователя', () => {
    const mockAuth = {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      register: jest.fn(),
    };

    (require('@/features/auth/contexts/AuthContext').useAuth as jest.Mock).mockReturnValue(mockAuth);

    render(<Navigation />);

    expect(screen.getByText(/войти/i)).toBeInTheDocument();
    expect(screen.getByText(/регистрация/i)).toBeInTheDocument();
  });

  it('отображает ссылки для аутентифицированного пользователя', () => {
    const mockAuth = {
      user: { id: '1', email: 'test@example.com' },
      isAuthenticated: true,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      register: jest.fn(),
    };

    (require('@/features/auth/contexts/AuthContext').useAuth as jest.Mock).mockReturnValue(mockAuth);

    render(<Navigation />);

    expect(screen.getByText(/дашборд/i)).toBeInTheDocument();
    expect(screen.getByText(/редактор/i)).toBeInTheDocument();
    expect(screen.getByText(/выйти/i)).toBeInTheDocument();
  });

  it('вызывает logout при нажатии на кнопку выхода', () => {
    const mockAuth = {
      user: { id: '1', email: 'test@example.com' },
      isAuthenticated: true,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      register: jest.fn(),
    };

    (require('@/features/auth/contexts/AuthContext').useAuth as jest.Mock).mockReturnValue(mockAuth);

    render(<Navigation />);

    fireEvent.click(screen.getByText(/выйти/i));

    expect(mockAuth.logout).toHaveBeenCalled();
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

    (require('@/features/auth/contexts/AuthContext').useAuth as jest.Mock).mockReturnValue(mockAuth);

    render(<Navigation />);

    expect(screen.getByText(/загрузка/i)).toBeInTheDocument();
  });
}); 