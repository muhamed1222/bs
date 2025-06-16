import { api } from '../api';
import { showError } from '../../utils/toast';
import { User, AuthResponse, UserSchema, AuthResponseSchema } from './types';

export class AuthServiceImpl {
  private static instance: AuthServiceImpl;
  private currentUser: User | null = null;
  private token: string | null = null;
  private refreshTokenValue: string | null = null;

  private constructor() {
    // Инициализация из localStorage
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (storedUser && storedToken && storedRefreshToken) {
      try {
        this.currentUser = UserSchema.parse(JSON.parse(storedUser));
        this.token = storedToken;
        this.refreshTokenValue = storedRefreshToken;
      } catch (error) {
        this.clearAuth();
      }
    }
  }

  public static getInstance(): AuthServiceImpl {
    if (!AuthServiceImpl.instance) {
      AuthServiceImpl.instance = new AuthServiceImpl();
    }
    return AuthServiceImpl.instance;
  }

  public async login(email: string, password: string): Promise<User> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', { email, password }, AuthResponseSchema);
      this.setAuth(response);
      return response.user;
    } catch (error) {
      showError('Ошибка при входе в систему');
      throw error;
    }
  }

  public async logout(): Promise<void> {
    try {
      if (this.token) {
        await api.post('/auth/logout', { refreshToken: this.refreshTokenValue });
      }
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    } finally {
      this.clearAuth();
    }
  }

  public async refreshToken(): Promise<void> {
    if (!this.refreshTokenValue) {
      throw new Error('Нет токена для обновления');
    }

    try {
      const response = await api.post<AuthResponse>('/auth/refresh', { refreshToken: this.refreshTokenValue }, AuthResponseSchema);
      this.setAuth(response);
    } catch (error) {
      this.clearAuth();
      throw error;
    }
  }

  public getUser(): User | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public getToken(): string | null {
    return this.token;
  }

  private setAuth(auth: AuthResponse): void {
    this.currentUser = auth.user;
    this.token = auth.token;
    this.refreshTokenValue = auth.refreshToken;

    localStorage.setItem('user', JSON.stringify(auth.user));
    localStorage.setItem('token', auth.token);
    localStorage.setItem('refreshToken', auth.refreshToken);
  }

  private clearAuth(): void {
    this.currentUser = null;
    this.token = null;
    this.refreshTokenValue = null;

    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
} 