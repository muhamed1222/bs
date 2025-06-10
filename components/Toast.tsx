import React from 'react';

interface Props {
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<Props> = ({ message, onClose }) => (
  // Всплывающее уведомление
  <div role="alert" className="fixed bottom-2 right-2 bg-black text-white p-2 rounded">
    {message}
    <button onClick={onClose} className="ml-2">✕</button>
  </div>
);

export default Toast;

// Всплывающее уведомление
