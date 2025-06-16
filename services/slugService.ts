import { api } from './api';
import { z } from 'zod';

const SlugCheckResponse = z.object({
  available: z.boolean(),
  suggestions: z.array(z.string()).optional(),
});

export async function checkSlugAvailability(slug: string): Promise<boolean> {
  const response = await api.get('/api/slug/check', SlugCheckResponse);
  return response.available;
}

export async function generateSlug(text: string): Promise<string> {
  const response = await api.post('/api/slug/generate', { text }, z.object({ slug: z.string() }));
  return response.slug;
}
