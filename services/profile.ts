import { api } from './api';
import { z } from 'zod';

const ProfileSchema = z.object({
  id: z.string(),
  username: z.string(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string().url()
  })).optional()
});

export type Profile = z.infer<typeof ProfileSchema>;

export async function getProfile(username: string): Promise<Profile> {
  return api.get(`/api/profiles/${username}`, ProfileSchema);
}

export async function updateProfile(data: Partial<Profile>): Promise<Profile> {
  return api.put('/api/profiles/me', data, ProfileSchema);
}
