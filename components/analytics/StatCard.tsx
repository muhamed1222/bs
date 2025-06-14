import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
      {title}
    </h4>
    <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    {change && (
      <p className={`text-xs mt-1 ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>{
        changeType === 'positive' ? '↑' : '↓'
      } {change} с прошлого периода</p>
    )}
  </div>
);

export default StatCard;
