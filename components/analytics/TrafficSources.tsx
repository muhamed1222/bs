import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TrafficSourcesProps {
  views: {
    referer: string;
  }[];
}

export default function TrafficSources({ views }: TrafficSourcesProps) {
  // Группировка просмотров по источникам
  const sources = views.reduce((acc, view) => {
    const source = view.referer || 'Прямой переход';
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Подготовка данных для графика
  const chartData = {
    labels: Object.keys(sources),
    datasets: [
      {
        data: Object.values(sources),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Источники трафика',
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Pie options={options} data={chartData} />
    </div>
  );
} 