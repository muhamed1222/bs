import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
    <span className="ml-3 text-gray-600">Загрузка...</span>
  </div>
);

export default LoadingSpinner;
