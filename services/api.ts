import { z } from 'zod';
import { showError } from '../utils/toast';

export interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
}

export function handleApiError(error: unknown) {
  const msg = error instanceof Error ? error.message : 'Неизвестная ошибка';
  showError(msg);
}

const API_BASE_URL = typeof window !== 'undefined' ? window.location.origin : '';

export class ApiService {
  private async fetchJson<T>(url: string, options: globalThis.RequestInit = {}): Promise<T> {
    try {
      const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
      const response = await fetch(fullUrl, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Произошла ошибка при выполнении запроса', error);
      throw error;
    }
  }

  async get<T>(url: string, schema: z.ZodType<T>): Promise<T> {
    const data = await this.fetchJson<unknown>(url);
    return schema.parse(data);
  }

  async post<T>(url: string, body: unknown, schema: z.ZodType<T>): Promise<T> {
    const data = await this.fetchJson<unknown>(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return schema.parse(data);
  }

  async put<T>(url: string, body: unknown, schema: z.ZodType<T>): Promise<T> {
    const data = await this.fetchJson<unknown>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
    return schema.parse(data);
  }

  async delete<T>(url: string, schema: z.ZodType<T>): Promise<T> {
    const data = await this.fetchJson<unknown>(url, {
      method: 'DELETE',
    });
    return schema.parse(data);
  }
}

export const api = new ApiService();

globalThis.API_BASE_URL = 'http://localhost';
