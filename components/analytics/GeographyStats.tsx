import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface GeographyStatsProps {
  views: {
    country: string;
    city: string;
  }[];
}

export default function GeographyStats({ views }: GeographyStatsProps) {
  // Группировка просмотров по странам
  const countries = views.reduce((acc, view) => {
    const country = view.country || 'Неизвестно';
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Сортировка стран по количеству просмотров
  const sortedCountries = Object.entries(countries)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  // Подготовка данных для графика
  const chartData = {
    labels: sortedCountries.map(([country]) => country),
    datasets: [
      {
        label: 'Просмотры',
        data: sortedCountries.map(([, count]) => count),
        backgroundColor: 'rgb(75, 192, 192)',
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
        text: 'Топ-10 стран по просмотрам',
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Bar options={options} data={chartData} />
    </div>
  );
} 