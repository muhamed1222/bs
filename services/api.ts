import { z, type ZodSchema } from 'zod';
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

const API_BASE_URL = '/api';

class ApiService {
  private async fetchJson<T>(url: string, options: globalThis.RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      showError('Произошла ошибка при выполнении запроса');
      throw error;
    }
  }

  public async get<T>(url: string, schema?: ZodSchema<T>): Promise<T> {
    const data = await this.fetchJson<T>(url);
    if (schema) {
      return schema.parse(data);
    }
    return data;
  }

  public async post<T>(url: string, data: unknown, schema?: ZodSchema<T>): Promise<T> {
    const response = await this.fetchJson<T>(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (schema) {
      return schema.parse(response);
    }
    return response;
  }

  public async put<T>(url: string, data: unknown, schema?: ZodSchema<T>): Promise<T> {
    const response = await this.fetchJson<T>(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    if (schema) {
      return schema.parse(response);
    }
    return response;
  }

  public async delete<T>(url: string, schema?: ZodSchema<T>): Promise<T> {
    const response = await this.fetchJson<T>(url, {
      method: 'DELETE',
    });
    if (schema) {
      return schema.parse(response);
    }
    return response;
  }
}

export const api = new ApiService();
