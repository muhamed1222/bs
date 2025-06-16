import React, { useState } from 'react';
import { Block } from '@/shared/types';

interface BlockEditorProps {
  block: Block;
  onSave: (block: Block) => void;
  onCancel?: () => void;
}

export const BlockEditor: React.FC<BlockEditorProps> = ({
  block,
  onSave,
  onCancel,
}) => {
  const [content, setContent] = useState(block.content);
  const [style, setStyle] = useState(block.style || {});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateContent = () => {
    const newErrors: Record<string, string> = {};

    switch (block.type) {
      case 'text':
        if (!content.text) {
          newErrors.text = 'Поле обязательно для заполнения';
        }
        break;
      case 'link':
        if (!content.url) {
          newErrors.url = 'URL обязателен';
        }
        if (!content.text) {
          newErrors.text = 'Текст ссылки обязателен';
        }
        break;
      case 'image':
        if (!content.url) {
          newErrors.url = 'URL изображения обязателен';
        }
        if (!content.alt) {
          newErrors.alt = 'Alt текст обязателен';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateContent()) {
      onSave({
        ...block,
        content,
        style,
      });
    }
  };

  const renderContentFields = () => {
    switch (block.type) {
      case 'text':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Текст
              <textarea
                value={content.text || ''}
                onChange={(e) => setContent({ ...content, text: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={4}
              />
            </label>
            {errors.text && (
              <p className="mt-1 text-sm text-red-600">{errors.text}</p>
            )}
          </div>
        );

      case 'link':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                URL
                <input
                  type="url"
                  value={content.url || ''}
                  onChange={(e) => setContent({ ...content, url: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </label>
              {errors.url && (
                <p className="mt-1 text-sm text-red-600">{errors.url}</p>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Текст ссылки
                <input
                  type="text"
                  value={content.text || ''}
                  onChange={(e) => setContent({ ...content, text: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </label>
              {errors.text && (
                <p className="mt-1 text-sm text-red-600">{errors.text}</p>
              )}
            </div>
          </>
        );

      case 'image':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                URL изображения
                <input
                  type="url"
                  value={content.url || ''}
                  onChange={(e) => setContent({ ...content, url: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </label>
              {errors.url && (
                <p className="mt-1 text-sm text-red-600">{errors.url}</p>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Alt текст
                <input
                  type="text"
                  value={content.alt || ''}
                  onChange={(e) => setContent({ ...content, alt: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </label>
              {errors.alt && (
                <p className="mt-1 text-sm text-red-600">{errors.alt}</p>
              )}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const renderStyleFields = () => (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Стили</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Цвет фона
          <input
            type="color"
            value={style.backgroundColor || '#ffffff'}
            onChange={(e) => setStyle({ ...style, backgroundColor: e.target.value })}
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
            onChange={(e) => setStyle({ ...style, textColor: e.target.value })}
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
            onChange={(e) => setStyle({ ...style, borderRadius: e.target.value })}
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
            onChange={(e) => setStyle({ ...style, padding: e.target.value })}
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
            onChange={(e) => setStyle({ ...style, margin: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </label>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {renderContentFields()}
      {renderStyleFields()}
      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Отмена
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Сохранить
        </button>
      </div>
    </form>
  );
}; 