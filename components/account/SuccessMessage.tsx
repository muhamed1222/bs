import React from 'react';

interface SuccessMessageProps {
  message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => (
  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
    <div className="flex items-center">
      <span className="text-green-500 text-xl mr-3">✅</span>
      <p className="text-green-700">{message}</p>
    </div>
  </div>
);

export default SuccessMessage;
