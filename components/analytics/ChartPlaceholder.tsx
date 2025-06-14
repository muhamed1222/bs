import React from 'react';

interface ChartPlaceholderProps {
  title: string;
  height?: string;
}

const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({ title, height = 'h-64' }) => (
  <div className={`bg-white border border-gray-200 rounded-lg shadow-sm p-6 ${height} flex flex-col`}>
    <h4 className="text-md font-semibold text-gray-700 font-pragmatica mb-2">{title}</h4>
    <div className="flex-grow bg-gray-100 rounded flex items-center justify-center">
      <p className="text-gray-400 text-sm">(Placeholder for {title} Chart)</p>
    </div>
  </div>
);

export default ChartPlaceholder;
