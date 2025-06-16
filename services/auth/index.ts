import { AuthServiceImpl } from './AuthServiceImpl';
import { User, AuthResponse } from './types';

const authService = AuthServiceImpl.getInstance();

export async function login(email: string, password: string): Promise<User> {
  return authService.login(email, password);
}

export async function signup(email: string, password: string, name?: string): Promise<User> {
  // TODO: Реализовать регистрацию
  throw new Error('Not implemented');
}

export async function resetPassword(email: string): Promise<void> {
  // TODO: Реализовать сброс пароля
  throw new Error('Not implemented');
}

export async function logout(): Promise<void> {
  return authService.logout();
}

export function getUser(): User | null {
  return authService.getUser();
}

export function isAuthenticated(): boolean {
  return authService.isAuthenticated();
} 