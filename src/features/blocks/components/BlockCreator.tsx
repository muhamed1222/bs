import React, { useState, useRef, useEffect } from 'react';
import { Block } from '@/shared/types';
import { v4 as uuidv4 } from 'uuid';

interface BlockCreatorProps {
  onCreate: (block: Block) => void;
}

export const BlockCreator: React.FC<BlockCreatorProps> = ({ onCreate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCreateBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: uuidv4(),
      type,
      content: getDefaultContent(type),
      order: 0,
    };

    onCreate(newBlock);
    setIsOpen(false);
  };

  const getDefaultContent = (type: Block['type']) => {
    switch (type) {
      case 'text':
        return { text: '' };
      case 'link':
        return { url: '', text: '' };
      case 'image':
        return { url: '', alt: '' };
      default:
        return {};
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Добавить блок
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              type="button"
              onClick={() => handleCreateBlock('text')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Текстовый блок
            </button>
            <button
              type="button"
              onClick={() => handleCreateBlock('link')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Ссылка
            </button>
            <button
              type="button"
              onClick={() => handleCreateBlock('image')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Изображение
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 