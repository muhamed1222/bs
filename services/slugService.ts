import { z } from 'zod';
import { fetchJson } from './api';

const checkResponse = z.object({ unique: z.boolean() });
const registerResponse = z.object({ success: z.boolean() });

export async function checkSlugUnique(slug: string): Promise<{ unique: boolean }> {
  return fetchJson(
    `/api/check-slug?slug=${encodeURIComponent(slug)}`,
    checkResponse
  );
}

export async function registerSlug(slug: string): Promise<{ success: boolean }> {
  return fetchJson(
    '/api/register-slug',
    registerResponse,
    { method: 'POST', body: { slug } }
  );
}
