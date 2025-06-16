import { Profile, User } from '@/shared/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      data.message || 'Произошла ошибка при выполнении запроса',
      response.status,
      data
    );
  }

  return data;
}

export const api = {
  // Профили
  profiles: {
    get: (slug: string) => 
      request<Profile>(`/profiles/${slug}`),
    
    create: (data: Partial<Profile>) =>
      request<Profile>('/profiles', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    
    update: (id: string, data: Partial<Profile>) =>
      request<Profile>(`/profiles/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    
    delete: (id: string) =>
      request<void>(`/profiles/${id}`, {
        method: 'DELETE',
      }),
    
    publish: (id: string) =>
      request<Profile>(`/profiles/${id}/publish`, {
        method: 'POST',
      }),
    
    unpublish: (id: string) =>
      request<Profile>(`/profiles/${id}/unpublish`, {
        method: 'POST',
      }),
  },

  // Пользователи
  users: {
    get: (id: string) =>
      request<User>(`/users/${id}`),
    
    update: (id: string, data: Partial<User>) =>
      request<User>(`/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
  },

  // Аутентификация
  auth: {
    login: (email: string, password: string) =>
      request<{ token: string; user: User }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    
    register: (email: string, password: string, name: string) =>
      request<{ token: string; user: User }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
      }),
    
    logout: () =>
      request<void>('/auth/logout', {
        method: 'POST',
      }),
  },
}; 