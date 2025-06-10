// Заглушка во время загрузки
import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  // Заглушка во время загрузки
  <div className={`animate-pulse bg-gray-200 rounded ${className || ''}`} />
);

// Используется как placeholder во время загрузки данных
