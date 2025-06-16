import { useState, useCallback, useEffect } from 'react';
import { cacheService } from '../services/cache/CacheService';

interface UseCacheOptions<T> {
  key: string;
  ttl?: number;
  initialData?: T;
  fetchData?: () => Promise<T>;
}

export function useCache<T>({
  key,
  ttl,
  initialData,
  fetchData
}: UseCacheOptions<T>) {
  const [data, setData] = useState<T | null>(() => {
    const cached = cacheService.get<T>(key);
    return cached || initialData || null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (!fetchData) return;

    setLoading(true);
    setError(null);

    try {
      const newData = await fetchData();
      setData(newData);
      cacheService.set(key, newData, ttl);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [key, ttl, fetchData]);

  const update = useCallback((newData: T) => {
    setData(newData);
    cacheService.set(key, newData, ttl);
  }, [key, ttl]);

  const clear = useCallback(() => {
    setData(null);
    cacheService.delete(key);
  }, [key]);

  useEffect(() => {
    if (fetchData && !data) {
      refresh();
    }
  }, [fetchData, data, refresh]);

  return {
    data,
    loading,
    error,
    refresh,
    update,
    clear
  };
} 