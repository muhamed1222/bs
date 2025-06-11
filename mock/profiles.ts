import type { PublicProfileData } from '../types';

export async function fetchPublicProfile(slug: string): Promise<PublicProfileData | null> {
  const profiles: Record<string, PublicProfileData> = {
    dev: {
      name: 'John Developer',
      bio: 'Пример портфолио разработчика',
    },
    designer: {
      name: 'Jane Designer',
      bio: 'Пример портфолио дизайнера',
    },
  };
  return profiles[slug] || null;
}
