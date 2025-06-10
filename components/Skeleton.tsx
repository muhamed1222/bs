import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className || ''}`} />
);

// Используется как placeholder во время загрузки данных
