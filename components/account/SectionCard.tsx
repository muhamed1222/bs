import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, children, loading, error, onRetry }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
    {loading ? <LoadingSpinner /> : error ? <ErrorMessage message={error} onRetry={onRetry} /> : children}
  </div>
);

export default SectionCard;
