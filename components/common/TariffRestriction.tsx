import React from 'react';
import { CrownIcon, SparklesIcon } from '../icons/IconComponents';

interface TariffRestrictionProps {
  type: 'pro' | 'business';
  className?: string;
}

export const TariffRestriction: React.FC<TariffRestrictionProps> = ({ type, className = '' }) => {
  const Icon = type === 'pro' ? SparklesIcon : CrownIcon;
  const label = type === 'pro' ? 'Pro' : 'Business';
  
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm ${className}`}>
      <Icon className="w-4 h-4 text-primary-600" />
      <span className="text-sm font-medium text-primary-600">{label}</span>
    </div>
  );
}; 