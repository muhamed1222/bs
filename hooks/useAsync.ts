import { useState, useCallback } from 'react';
import { logService } from '../services/logging/LogService';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseAsyncOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  logPrefix?: string;
}

export function useAsync<T>(options: UseAsyncOptions = {}) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const execute = useCallback(async (promise: Promise<T>) => {
    const { onSuccess, onError, logPrefix = 'useAsync' } = options;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const data = await promise;
      setState({ data, loading: false, error: null });
      onSuccess?.(data);
      logService.info(`${logPrefix}: Operation completed successfully`, { data });
      return data;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      setState({ data: null, loading: false, error: err });
      onError?.(err);
      logService.error(`${logPrefix}: Operation failed`, err);
      throw err;
    }
  }, [options]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset
  };
}
