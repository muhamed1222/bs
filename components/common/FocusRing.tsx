import React from 'react';

interface FocusRingProps {
  children: React.ReactNode;
  className?: string;
}

export const FocusRing: React.FC<FocusRingProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`relative group ${className}`}
      tabIndex={0}
    >
      {children}
      <div className="absolute inset-0 rounded-lg ring-2 ring-primary-500/0 ring-offset-2 ring-offset-white transition-all duration-200 group-focus-visible:ring-primary-500/100 group-hover:ring-primary-500/50" />
    </div>
  );
}; 