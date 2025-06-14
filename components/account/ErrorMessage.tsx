import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
    <div className="flex items-center">
      <span className="text-red-500 text-xl mr-3">⚠️</span>
      <div>
        <p className="text-red-700">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="mt-2 text-sm text-red-600 hover:text-red-800 underline">
            Попробовать снова
          </button>
        )}
      </div>
    </div>
  </div>
);

export default ErrorMessage;
