// Панель реакций
import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

const EMOJIS = ['👍', '❤️', '😂'];

export const ReactionBar: React.FC = () => {
  // Панель реакций
  const { data, react } = useAnalytics();
  return (
    <div className="flex gap-2 mt-4">
      {EMOJIS.map((e) => (
        <button
          key={e}
          onClick={() => react(e)}
          className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
        >
          {e} {data.reactions[e] || 0}
        </button>
      ))}
    </div>
  );
};

// Простая панель реакций с подсчётом лайков
