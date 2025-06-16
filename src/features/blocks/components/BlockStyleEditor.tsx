import React from 'react';
import { BlockStyle } from '@/shared/types';

interface BlockStyleEditorProps {
  style: Partial<BlockStyle>;
  onChange: (style: BlockStyle) => void;
}

export const BlockStyleEditor: React.FC<BlockStyleEditorProps> = ({
  style,
  onChange,
}) => {
  const handleChange = (key: keyof BlockStyle, value: string) => {
    onChange({
      ...style,
      [key]: value,
    } as BlockStyle);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Цвет фона
          <input
            type="color"
            value={style.backgroundColor || '#ffffff'}
            onChange={(e) => handleChange('backgroundColor', e.target.value)}
            className="mt-1 block w-full"
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Цвет текста
          <input
            type="color"
            value={style.textColor || '#000000'}
            onChange={(e) => handleChange('textColor', e.target.value)}
            className="mt-1 block w-full"
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Скругление
          <input
            type="text"
            value={style.borderRadius || '0px'}
            onChange={(e) => handleChange('borderRadius', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Отступы
          <input
            type="text"
            value={style.padding || '0px'}
            onChange={(e) => handleChange('padding', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Внешние отступы
          <input
            type="text"
            value={style.margin || '0px'}
            onChange={(e) => handleChange('margin', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </label>
      </div>
    </div>
  );
}; 