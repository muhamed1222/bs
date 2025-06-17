import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import AnalyticsCharts from './AnalyticsCharts';
import TrafficSources from './TrafficSources';
import GeographyStats from './GeographyStats';

interface PageAnalyticsProps {
  pageId: string;
}

interface PageView {
  id: string;
  createdAt: string;
  country: string;
  city: string;
  referer: string;
}

export default function PageAnalytics({ pageId }: PageAnalyticsProps) {
  const [views, setViews] = useState<PageView[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch(`/api/pages/${pageId}/views`);
        if (!response.ok) {
          throw new Error('Не удалось загрузить статистику');
        }
        const data = await response.json();
        setViews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка');
      } finally {
        setIsLoading(false);
      }
    };

    fetchViews();
  }, [pageId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  const totalViews = views.length;
  const uniqueVisitors = new Set(views.map(view => view.country)).size;
  const countries = new Set(views.map(view => view.country)).size;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Всего просмотров</h3>
          <p className="text-3xl font-bold text-blue-600">{totalViews}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Уникальных посетителей</h3>
          <p className="text-3xl font-bold text-green-600">{uniqueVisitors}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Стран</h3>
          <p className="text-3xl font-bold text-purple-600">{countries}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCharts views={views} />
        <TrafficSources views={views} />
      </div>

      <GeographyStats views={views} />

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Последние просмотры</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Время
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Страна
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Город
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Источник
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {views.slice(0, 10).map((view) => (
                <tr key={view.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(view.createdAt), 'dd MMMM yyyy, HH:mm', { locale: ru })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {view.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {view.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {view.referer || 'Прямой переход'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 