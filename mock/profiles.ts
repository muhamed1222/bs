import type { PublicProfileData } from '../types';

export const publicProfiles: Record<string, PublicProfileData> = {
  dev: {
    name: 'John Developer',
    bio: 'Пример портфолио разработчика',
    seoTitle: 'Портфолио разработчика John Developer',
    seoDescription: 'Работы и ссылки разработчика John Developer',
    seoKeywords: 'разработчик, портфолио, john developer',
    ogImage: null,
  },
  designer: {
    name: 'Jane Designer',
    bio: 'Пример портфолио дизайнера',
    seoTitle: 'Портфолио дизайнера Jane Designer',
    seoDescription: 'Работы дизайнера Jane Designer',
    seoKeywords: 'дизайнер, портфолио, jane designer',
    ogImage: null,
  },
};

export async function fetchPublicProfile(slug: string): Promise<PublicProfileData | null> {
  return publicProfiles[slug] || null;
}

export function getPublicProfileSlugs(): string[] {
  return Object.keys(publicProfiles);
}
