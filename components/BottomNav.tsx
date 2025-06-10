// Нижняя навигация
import React from 'react';
import { Link } from 'react-router-dom';

export const BottomNav: React.FC = () => {
  // Нижняя навигация
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t shadow-lg flex justify-around py-2 md:hidden">
      {/* Кнопка перехода к редактору */}
      <Link to="/editor" className="flex flex-col items-center text-sm">
        <span className="text-xl">＋</span>
        <span>Добавить</span>
      </Link>
      {/* Публикация профиля */}
      <Link to="/editor" className="flex flex-col items-center text-sm">
        <span className="text-xl">⬆</span>
        <span>Опубликовать</span>
      </Link>
    </nav>
  );
};

