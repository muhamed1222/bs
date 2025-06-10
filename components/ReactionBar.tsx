// Панель реакций
import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

export interface ReactionBarProps {
  /**
   * Набор эмодзи для реакций
   */
  emojis?: string[];
  /**
   * Классы для контейнера
   */
  className?: string;
  /**
   * Классы для кнопки
   */
  buttonClassName?: string;
}

const DEFAULT_EMOJIS = ['👍', '❤️', '😂'];

export const ReactionBar: React.FC<ReactionBarProps> = ({
  emojis = DEFAULT_EMOJIS,
  className = 'flex gap-2 mt-4',
  buttonClassName = 'px-2 py-1 bg-gray-100 rounded hover:bg-gray-200',
}) => {
  // Панель реакций
  const { data, react } = useAnalytics();
  return (
    <div className={className}>
      {emojis.map((e) => (
        <button key={e} onClick={() => react(e)} className={buttonClassName}>
          {e} {data.reactions[e] || 0}
        </button>
      ))}
    </div>
  );
};

// Простая панель реакций с подсчётом лайков
