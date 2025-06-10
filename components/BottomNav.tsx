 import React, { useState } from 'react';
 import { Link } from 'react-router-dom';
 import { BottomSheet } from './BottomSheet';
 import { Button } from '../ui/Button';
 
export const BottomNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const publish = () => {
    if (window.confirm('Опубликовать текущий проект?')) {
      alert('Проект опубликован');
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 shadow z-40">
      <div className="flex justify-around py-2">
        <Link to="/" className="text-sm font-medium text-gray-700">
          Главная
        </Link>
        <Link to="/editor" className="text-sm font-medium text-gray-700">
          Добавить
        </Link>
        <button onClick={publish} className="text-sm font-medium text-gray-700">
          Опубликовать
        </button>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Меню
        </Button>
      </div>
      <BottomSheet open={open} onClose={() => setOpen(false)}>
        <ul className="space-y-2">
          <li>
            <Link to="/editor" className="block p-2">
              Редактор
            </Link>
          </li>
          <li>
            <Link to="/support" className="block p-2">
              Поддержка
            </Link>
          </li>
          <li>
            <Link to="/legal" className="block p-2">
              Правовая информация
            </Link>
          </li>
        </ul>
      </BottomSheet>
    </nav>
   );
 };
 
 // Нижняя навигационная панель для мобильных устройств
