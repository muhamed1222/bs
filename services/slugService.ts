import { z } from 'zod';
import { fetchJson } from './api';

const checkResponse = z.object({ available: z.boolean() });
const registerResponse = z.object({ success: z.boolean() });

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
