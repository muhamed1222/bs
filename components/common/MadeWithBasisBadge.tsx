import React from 'react';
import { Link } from 'react-router-dom';
import { BasisBSolidIcon } from '../icons/IconComponents';

interface MadeWithBasisBadgeProps {
  className?: string;
}

export const MadeWithBasisBadge: React.FC<MadeWithBasisBadgeProps> = ({ className = '' }) => {
  return (
    <Link
      to="https://basis.dev"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    >
      <span className="text-sm text-gray-600">Made with</span>
      <BasisBSolidIcon className="w-4 h-4 text-primary-600" />
      <span className="text-sm font-medium text-primary-600">Basis</span>
    </Link>
  );
}; 