import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

interface Page {
  slug: string;
  updatedAt: Date;
}

interface User {
  username: string;
  updatedAt: Date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Получаем все опубликованные страницы
  const pages = await prisma.page.findMany({
    where: {
      isPublished: true,
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  // Получаем всех пользователей
  const users = await prisma.user.findMany({
    select: {
      username: true,
      updatedAt: true,
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bs.example.com';

  // Формируем URL для страниц
  const pageUrls = pages.map((page: Page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page.updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // Формируем URL для профилей пользователей
  const userUrls = users.map((user: User) => ({
    url: `${baseUrl}/u/${user.username}`,
    lastModified: user.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Добавляем статические страницы
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return [...staticPages, ...pageUrls, ...userUrls];
} 