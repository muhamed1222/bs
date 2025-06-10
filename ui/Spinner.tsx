import React from 'react';

export interface SpinnerProps {
  size?: string;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'h-5 w-5', className = '' }) => (
  // Иконка загрузки
  <div className={`animate-spin rounded-full border-b-2 border-current ${size} ${className}`} />
);

export default Spinner;

