import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BottomSheet } from './BottomSheet';
import { Button } from '../ui/Button';

export const BottomNav: React.FC = () => {
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t shadow-lg flex justify-around py-2 md:hidden">
        <button
          type="button"
          onClick={() => setOpenAdd(true)}
          className="flex flex-col items-center text-sm"
          aria-label="Добавить"
        >
          <span className="text-xl">＋</span>
          <span>Добавить</span>
        </button>
        <Link
          to="/editor"
          className="flex flex-col items-center text-sm"
          aria-label="Опубликовать"
        >
          <span className="text-xl">⬆</span>
          <span>Опубликовать</span>
        </Link>
      </nav>
      <BottomSheet open={openAdd} onClose={() => setOpenAdd(false)}>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Добавить</h3>
          <p className="text-sm">Здесь будет форма добавления.</p>
          <Button onClick={() => setOpenAdd(false)} className="w-full">
            Закрыть
          </Button>
        </div>
      </BottomSheet>
    </>
  );
};

// Нижняя навигационная панель для мобильных устройств
