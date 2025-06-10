export interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
}

import { ZodSchema } from 'zod';
import { showError } from '../utils/toast';

export function handleApiError(error: unknown) {
  const msg = error instanceof Error ? error.message : 'Неизвестная ошибка';
  showError(msg);
}

export async function fetchJson<T>(
  url: string,
  schema: ZodSchema<T>,
  options: ApiOptions = {}
): Promise<T> {
  const { method = 'GET', body, headers } = options;
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
      let message = `HTTP error ${response.status}`;
      try {
        const err = await response.json();
        message = err.error || message;
      } catch {
        /* ignore */
      }
      const error = new Error(message);
      handleApiError(error);
      throw error;
    }
    const json = await response.json();
    return schema.parse(json);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}
