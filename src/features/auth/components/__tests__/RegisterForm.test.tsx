import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RegisterForm } from '../RegisterForm';
import { AuthProvider } from '../../contexts/AuthContext';

// Мокаем контекст аутентификации
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    register: jest.fn().mockResolvedValue(undefined),
  }),
}));

describe('RegisterForm', () => {
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('рендерит форму регистрации', () => {
    render(
      <AuthProvider>
        <RegisterForm onSuccess={mockOnSuccess} onError={mockOnError} />
      </AuthProvider>
    );

    expect(screen.getByLabelText(/имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/подтвердите пароль/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /зарегистрироваться/i })).toBeInTheDocument();
  });

  it('вызывает onSuccess при успешной регистрации', async () => {
    render(
      <AuthProvider>
        <RegisterForm onSuccess={mockOnSuccess} onError={mockOnError} />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/имя/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/пароль/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/подтвердите пароль/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('вызывает onError при несовпадении паролей', async () => {
    render(
      <AuthProvider>
        <RegisterForm onSuccess={mockOnSuccess} onError={mockOnError} />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/имя/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/пароль/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/подтвердите пароль/i), {
      target: { value: 'differentpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalledWith('Пароли не совпадают');
    });
  });

  it('валидирует обязательные поля', async () => {
    render(
      <AuthProvider>
        <RegisterForm onSuccess={mockOnSuccess} onError={mockOnError} />
      </AuthProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/имя/i)).toBeInvalid();
      expect(screen.getByLabelText(/email/i)).toBeInvalid();
      expect(screen.getByLabelText(/пароль/i)).toBeInvalid();
      expect(screen.getByLabelText(/подтвердите пароль/i)).toBeInvalid();
    });
  });
}); 