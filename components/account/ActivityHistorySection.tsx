import React from 'react';
import SectionCard from './SectionCard';

interface Log {
  id: string;
  action: string;
  timestamp: string;
  ip?: string;
}

interface Props {
  logs: Log[];
  onViewAll: () => void;
}

const ActivityHistorySection: React.FC<Props> = ({ logs, onViewAll }) => {
  return (
    <SectionCard title="История активности">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">Последние действия в вашем аккаунте:</p>
        {logs.length > 0 ? (
          <div className="space-y-2">
            {logs.slice(0, 5).map((log) => (
              <div key={log.id} className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                <span className="font-medium">{log.action}</span>
                <span className="text-gray-500"> - {new Date(log.timestamp).toLocaleString()}</span>
                {log.ip && <span className="text-gray-400"> (IP: {log.ip})</span>}
              </div>
            ))}
            <button onClick={onViewAll} className="text-sm text-indigo-600 hover:underline">
              Посмотреть всю историю
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-500">История активности пуста</p>
        )}
      </div>
    </SectionCard>
  );
};

export default ActivityHistorySection;
