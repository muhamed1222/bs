// Статистика
import React, { useState } from 'react';
import StandardPageLayout from '../layouts/StandardPageLayout';
import { useAnalytics } from '../hooks/useAnalytics';
import { isIncognito, setIncognito } from '../services/analytics';
import StatCard from '../components/analytics/StatCard';
import ChartPlaceholder from '../components/analytics/ChartPlaceholder';

const AnalyticsPage: React.FC = () => {
  const { data } = useAnalytics();
  return (
    <StandardPageLayout title="8. Analytics">
      <div className="space-y-8">
        {/* Date Range Picker Placeholder */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <label className="text-sm mr-2">
              <input
                type="checkbox"
                checked={isIncognito()}
                onChange={(e) => setIncognito(e.target.checked)}
                className="mr-1"
              />
              Инкогнито
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Период:</span>
            <input
              type="date"
              defaultValue="2024-07-01"
              className="p-1.5 border border-gray-300 rounded-md text-sm"
            />
            <span className="text-sm text-gray-600">-</span>
            <input
              type="date"
              defaultValue="2024-07-31"
              className="p-1.5 border border-gray-300 rounded-md text-sm"
            />
            <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
              Применить
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Всего просмотров" value={String(data.views)} />
          <StatCard title="Уникальные посетители" value={String(data.uniqueViews)} />
          <StatCard
            title="Всего кликов (CTA)"
            value={String(Object.values(data.linkClicks).reduce((a, b) => a + b, 0))}
          />
          <StatCard
            title="Всего реакций"
            value={String(Object.values(data.reactions).reduce((a, b) => a + b, 0))}
          />
        </section>

        {/* Charts Section */}
        <section className="grid lg:grid-cols-2 gap-6">
          <ChartPlaceholder title="Просмотры страниц по дням" />
          <ChartPlaceholder title="География посетителей" />
        </section>

        <section className="grid lg:grid-cols-2 gap-6">
          <ChartPlaceholder title="Источники трафика" height="h-48" />
          <ChartPlaceholder title="Популярные устройства" height="h-48" />
        </section>

        {/* Conversion Data Section */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold font-pragmatica text-gray-800 mb-4">
            Конверсии по формам и CTA
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-3 text-left font-medium text-gray-500">
                    Элемент
                  </th>
                  <th className="py-2 px-3 text-left font-medium text-gray-500">
                    Показы
                  </th>
                  <th className="py-2 px-3 text-left font-medium text-gray-500">
                    Клики/Отправки
                  </th>
                  <th className="py-2 px-3 text-left font-medium text-gray-500">
                    Конверсия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-2 px-3">Форма "Обратная связь"</td>
                  <td className="py-2 px-3">500</td>
                  <td className="py-2 px-3">25</td>
                  <td className="py-2 px-3">5.0%</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Кнопка "Подписаться"</td>
                  <td className="py-2 px-3">2,300</td>
                  <td className="py-2 px-3">150</td>
                  <td className="py-2 px-3">6.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Export Data */}
        <section className="text-right">
          <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors">
            Экспорт данных (CSV)
          </button>
        </section>
      </div>
    </StandardPageLayout>
  );
};

export default AnalyticsPage;

// Аналитика посещений и активности пользователей
