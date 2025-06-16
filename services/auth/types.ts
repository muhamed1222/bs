import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['user', 'admin']),
});

export const AuthResponseSchema = z.object({
  user: UserSchema,
  token: z.string(),
  refreshToken: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export interface AuthService {
  isAuthenticated(): boolean;
  getUser(): User | null;
  hasRole(role: string): boolean;
  hasPermission(permission: string): boolean;
  login(credentials: { email: string; password: string }): Promise<User>;
  logout(): Promise<void>;
  refreshToken(): Promise<void>;
  updateUser(user: User): Promise<void>;
  subscribe(listener: (state: AuthState) => void): () => void;
} 