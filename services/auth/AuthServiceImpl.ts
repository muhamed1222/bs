import { api } from '../api';
import { showError } from '../../utils/toast';
import { User, AuthResponse, UserSchema, AuthResponseSchema, AuthService, AuthState } from './types';

export class AuthServiceImpl implements AuthService {
  private static instance: AuthServiceImpl;
  private currentUser: User | null = null;
  private token: string | null = null;
  private refreshTokenValue: string | null = null;

  private state: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  };

  private listeners: ((state: AuthState) => void)[] = [];

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

  public async login(credentials: { email: string; password: string }): Promise<User> {
    try {
      this.setState({ loading: true, error: null });
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      this.setState({
        isAuthenticated: true,
        user: response.user,
        loading: false,
      });
      localStorage.setItem('token', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (error) {
      this.setState({
        loading: false,
        error: error instanceof Error ? error : new Error('Login failed'),
      });
      throw error;
    }
  }

  public async logout(): Promise<void> {
    try {
      this.setState({ loading: true, error: null });
      await api.post('/auth/logout', {});
      this.setState({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      this.setState({
        loading: false,
        error: error instanceof Error ? error : new Error('Logout failed'),
      });
      throw error;
    }
  }

  public async refreshToken(): Promise<void> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('No refresh token');

      const response = await api.post<AuthResponse>('/auth/refresh', { refreshToken });
      localStorage.setItem('token', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
    } catch (error) {
      this.setState({
        isAuthenticated: false,
        user: null,
        error: error instanceof Error ? error : new Error('Token refresh failed'),
      });
      throw error;
    }
  }

  public getUser(): User | null {
    return this.state.user;
  }

  public isAuthenticated(): boolean {
    return this.state.isAuthenticated;
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

  async updateUser(user: User): Promise<void> {
    try {
      this.setState({ loading: true, error: null });
      const response = await api.put<User>('/user/profile', user);
      this.setState({
        user: response,
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error instanceof Error ? error : new Error('Update failed'),
      });
      throw error;
    }
  }

  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private setState(newState: Partial<AuthState>): void {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  }

  hasRole(role: string): boolean {
    return this.state.user?.role === role;
  }

  hasPermission(permission: string): boolean {
    // TODO: Implement permission checking
    return true;
  }
} 