import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '../LoginForm';
import { AuthProvider } from '../../contexts/AuthContext';

// Мокаем контекст аутентификации
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    login: jest.fn().mockResolvedValue(undefined),
  }),
}));

describe('LoginForm', () => {
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('рендерит форму входа', () => {
    render(
      <AuthProvider>
        <LoginForm onSuccess={mockOnSuccess} onError={mockOnError} />
      </AuthProvider>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /войти/i })).toBeInTheDocument();
  });

  it('вызывает onSuccess при успешном входе', async () => {
    render(
      <AuthProvider>
        <LoginForm onSuccess={mockOnSuccess} onError={mockOnError} />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/пароль/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('вызывает onError при ошибке входа', async () => {
    const mockError = new Error('Ошибка входа');
    jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <AuthProvider>
        <LoginForm onSuccess={mockOnSuccess} onError={mockOnError} />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/пароль/i), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalled();
    });
  });

  it('валидирует обязательные поля', async () => {
    render(
      <AuthProvider>
        <LoginForm onSuccess={mockOnSuccess} onError={mockOnError} />
      </AuthProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toBeInvalid();
      expect(screen.getByLabelText(/пароль/i)).toBeInvalid();
    });
  });
}); 