import React from 'react';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  minWidth?: string;
  maxWidth?: string;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  minWidth = '320px',
  maxWidth = '100%',
}) => {
  return (
    <div
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
      style={{
        minWidth,
        maxWidth,
      }}
    >
      {children}
    </div>
  );
}; 