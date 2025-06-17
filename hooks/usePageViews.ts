import { useState, useEffect } from 'react';
import type { PageView, PageStats } from '@/types/analytics';

/**
 * Хук для получения статистики просмотров страницы
 * @param {string} pageId - ID страницы
 * @returns {Object} Объект с данными и состоянием загрузки
 * @property {number} total - Общее количество просмотров
 * @property {number} unique - Количество уникальных посетителей
 * @property {number} countries - Количество стран
 * @property {PageView[]} recentViews - Последние просмотры
 * @property {boolean} isLoading - Флаг загрузки данных
 * @property {Error | null} error - Объект ошибки, если она возникла
 */
export function usePageViews(pageId: string) {
  const [stats, setStats] = useState<PageStats>({ total: 0, unique: 0, countries: 0 });
  const [recentViews, setRecentViews] = useState<PageView[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsResponse, viewsResponse] = await Promise.all([
          fetch(`/api/pages/${pageId}/stats`),
          fetch(`/api/pages/${pageId}/views`),
        ]);

        if (!statsResponse.ok || !viewsResponse.ok) {
          throw new Error('Failed to fetch page views data');
        }

        const [statsData, viewsData] = await Promise.all([
          statsResponse.json(),
          viewsResponse.json(),
        ]);

        setStats(statsData);
        setRecentViews(viewsData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    }

    void fetchData();
  }, [pageId]);

  return { ...stats, recentViews, isLoading, error };
} 