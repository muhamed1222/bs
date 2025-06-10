// Панель реакций
import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

interface Props {
  emojis?: string[];
}

const DEFAULT_EMOJIS = ['👍', '❤️', '😂'];

export const ReactionBar: React.FC<Props> = ({ emojis = DEFAULT_EMOJIS }) => {
  // Панель реакций
  const { data, react } = useAnalytics();
  return (
    <div className="flex gap-2 mt-4">
      {emojis.map((e) => (
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
