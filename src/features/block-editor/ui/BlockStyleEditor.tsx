import React, { useState } from 'react';
import { Block, BlockStyle } from '@/shared/types/block';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/Button';
import toast from 'react-hot-toast';

interface BlockStyleEditorProps {
  block: Block;
  onBlockUpdate: (block: Block) => void;
}

export const BlockStyleEditor: React.FC<BlockStyleEditorProps> = ({
  block,
  onBlockUpdate,
}) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleStyleChange = async (property: keyof BlockStyle, value: string) => {
    try {
      setIsSaving(true);
      const updatedBlock = {
        ...block,
        style: {
          ...block.style,
          [property]: value,
        },
      };
      await onBlockUpdate(updatedBlock);
      toast.success('Стили обновлены');
    } catch (error) {
      toast.error('Ошибка при обновлении стилей');
    } finally {
      setIsSaving(false);
    }
  };

  const inputClasses = cn(
    'mt-1 block w-full p-2 border rounded transition-colors',
    'focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
  );

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Редактирование стилей</h3>
        {isSaving && (
          <span className="text-sm text-gray-500">Сохранение...</span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Цвет фона
          </label>
          <input
            type="color"
            value={block.style.backgroundColor || '#ffffff'}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            className={cn('mt-1 block w-full transition-colors')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Цвет текста
          </label>
          <input
            type="color"
            value={block.style.color || '#000000'}
            onChange={(e) => handleStyleChange('color', e.target.value)}
            className={cn('mt-1 block w-full transition-colors')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Размер шрифта
          </label>
          <input
            type="text"
            value={block.style.fontSize || ''}
            onChange={(e) => handleStyleChange('fontSize', e.target.value)}
            placeholder="16px"
            className={inputClasses}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Жирность шрифта
          </label>
          <select
            value={block.style.fontWeight || ''}
            onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
            className={inputClasses}
          >
            <option value="">Обычный</option>
            <option value="bold">Жирный</option>
            <option value="lighter">Тонкий</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Выравнивание текста
          </label>
          <select
            value={block.style.textAlign || ''}
            onChange={(e) => handleStyleChange('textAlign', e.target.value as 'left' | 'center' | 'right')}
            className={inputClasses}
          >
            <option value="left">По левому краю</option>
            <option value="center">По центру</option>
            <option value="right">По правому краю</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Отступы
          </label>
          <input
            type="text"
            value={block.style.padding || ''}
            onChange={(e) => handleStyleChange('padding', e.target.value)}
            placeholder="10px"
            className={inputClasses}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Внешние отступы
          </label>
          <input
            type="text"
            value={block.style.margin || ''}
            onChange={(e) => handleStyleChange('margin', e.target.value)}
            placeholder="10px"
            className={inputClasses}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Скругление углов
          </label>
          <input
            type="text"
            value={block.style.borderRadius || ''}
            onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
            placeholder="4px"
            className={inputClasses}
          />
        </div>
      </div>
    </div>
  );
}; 