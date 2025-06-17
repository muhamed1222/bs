import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsChartsProps {
  views: {
    createdAt: string;
    country: string;
    city: string;
    referer: string;
  }[];
}

export default function AnalyticsCharts({ views }: AnalyticsChartsProps) {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');

  // Группировка просмотров по времени
  const groupedViews = views.reduce((acc, view) => {
    const date = new Date(view.createdAt);
    let key: string;

    switch (timeRange) {
      case 'day':
        key = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        break;
      case 'week':
        key = date.toLocaleDateString('ru-RU', { weekday: 'short' });
        break;
      case 'month':
        key = date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
        break;
    }

    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Подготовка данных для графика
  const chartData = {
    labels: Object.keys(groupedViews),
    datasets: [
      {
        label: 'Просмотры',
        data: Object.values(groupedViews),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Статистика просмотров',
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setTimeRange('day')}
          className={`px-3 py-1 rounded ${
            timeRange === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          День
        </button>
        <button
          onClick={() => setTimeRange('week')}
          className={`px-3 py-1 rounded ${
            timeRange === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Неделя
        </button>
        <button
          onClick={() => setTimeRange('month')}
          className={`px-3 py-1 rounded ${
            timeRange === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Месяц
        </button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
} 