import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { z } from 'zod';

interface UseApiQueryOptions<T> {
  url: string;
  schema: z.ZodType<T>;
  enabled?: boolean;
}

export function useApiQuery<T>({ url, schema, enabled = true }: UseApiQueryOptions<T>) {
  return useQuery({
    queryKey: [url],
    queryFn: () => api.get(url, schema),
    enabled
  });
}
