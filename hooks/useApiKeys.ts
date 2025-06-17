import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { ApiKey } from '@/types/billing';

interface UseApiKeysResult {
  isLoading: boolean;
  error: string | null;
  createApiKey: (name: string) => Promise<void>;
  deleteApiKey: (keyId: string) => Promise<void>;
  toggleApiKey: (keyId: string) => Promise<void>;
  getApiKeys: () => Promise<ApiKey[]>;
}

export function useApiKeys(): UseApiKeysResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const createApiKey = async (name: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error('Failed to create API key');
      }
    } catch (err) {
      setError('Не удалось создать API ключ');
      console.error('Error creating API key:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteApiKey = async (keyId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/keys/${keyId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete API key');
      }
    } catch (err) {
      setError('Не удалось удалить API ключ');
      console.error('Error deleting API key:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleApiKey = async (keyId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/keys/${keyId}/toggle`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Failed to toggle API key');
      }
    } catch (err) {
      setError('Не удалось изменить статус API ключа');
      console.error('Error toggling API key:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getApiKeys = async (): Promise<ApiKey[]> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/keys');
      if (!response.ok) {
        throw new Error('Failed to fetch API keys');
      }
      return response.json();
    } catch (err) {
      setError('Не удалось получить список API ключей');
      console.error('Error fetching API keys:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createApiKey,
    deleteApiKey,
    toggleApiKey,
    getApiKeys,
  };
} 