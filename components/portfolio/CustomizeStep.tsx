import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { typography, spacing, borderRadius, shadows } from '../../styles/typography';

interface CustomizeStepProps {
  onNext: () => void;
  onBack: () => void;
}

const colorSchemes = [
  {
    id: 'default',
    name: 'Стандартная',
    primary: '#4F46E5',
    secondary: '#818CF8',
    background: '#FFFFFF',
    text: '#1F2937',
  },
  {
    id: 'dark',
    name: 'Тёмная',
    primary: '#818CF8',
    secondary: '#4F46E5',
    background: '#1F2937',
    text: '#F9FAFB',
  },
  {
    id: 'light',
    name: 'Светлая',
    primary: '#6366F1',
    secondary: '#A5B4FC',
    background: '#F9FAFB',
    text: '#1F2937',
  },
];

const fonts = [
  {
    id: 'inter',
    name: 'Inter',
    value: 'Inter, sans-serif',
  },
  {
    id: 'roboto',
    name: 'Roboto',
    value: 'Roboto, sans-serif',
  },
  {
    id: 'open-sans',
    name: 'Open Sans',
    value: 'Open Sans, sans-serif',
  },
];

export const CustomizeStep: React.FC<CustomizeStepProps> = ({ onNext, onBack }) => {
  const [customization, setCustomization] = useState({
    colorScheme: 'default',
    font: 'inter',
    spacing: 'comfortable',
    animations: true,
  });

  const handleChange = (name: string, value: string | boolean) => {
    setCustomization(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl shadow-lg p-8"
      style={{ borderRadius: borderRadius.lg, boxShadow: shadows.md }}
    >
      <h2
        className="text-2xl font-bold text-gray-900 mb-6"
        style={typography.h2}
      >
        Настройте дизайн
      </h2>

      <div className="space-y-8">
        {/* Цветовая схема */}
        <div>
          <h3
            className="text-lg font-medium text-gray-900 mb-4"
            style={typography.h3}
          >
            Цветовая схема
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {colorSchemes.map(scheme => (
              <div
                key={scheme.id}
                className={`relative rounded-lg p-4 cursor-pointer border-2 transition-all duration-200 ${
                  customization.colorScheme === scheme.id
                    ? 'border-indigo-600'
                    : 'border-transparent hover:border-gray-200'
                }`}
                style={{ borderRadius: borderRadius.md }}
                onClick={() => handleChange('colorScheme', scheme.id)}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: scheme.primary }}
                  />
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: scheme.secondary }}
                  />
                  <div
                    className="w-8 h-8 rounded-full border border-gray-200"
                    style={{ backgroundColor: scheme.background }}
                  />
                </div>
                <p
                  className="mt-2 text-sm font-medium text-gray-900"
                  style={typography.body}
                >
                  {scheme.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Шрифты */}
        <div>
          <h3
            className="text-lg font-medium text-gray-900 mb-4"
            style={typography.h3}
          >
            Шрифт
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {fonts.map(font => (
              <div
                key={font.id}
                className={`relative rounded-lg p-4 cursor-pointer border-2 transition-all duration-200 ${
                  customization.font === font.id
                    ? 'border-indigo-600'
                    : 'border-transparent hover:border-gray-200'
                }`}
                style={{ borderRadius: borderRadius.md }}
                onClick={() => handleChange('font', font.id)}
              >
                <p
                  className="text-lg"
                  style={{ fontFamily: font.value }}
                >
                  {font.name}
                </p>
                <p
                  className="mt-1 text-sm text-gray-500"
                  style={typography.body}
                >
                  Пример текста
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Отступы */}
        <div>
          <h3
            className="text-lg font-medium text-gray-900 mb-4"
            style={typography.h3}
          >
            Отступы
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {['compact', 'comfortable', 'spacious'].map(spacing => (
              <div
                key={spacing}
                className={`relative rounded-lg p-4 cursor-pointer border-2 transition-all duration-200 ${
                  customization.spacing === spacing
                    ? 'border-indigo-600'
                    : 'border-transparent hover:border-gray-200'
                }`}
                style={{ borderRadius: borderRadius.md }}
                onClick={() => handleChange('spacing', spacing)}
              >
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded" />
                  <div className="h-2 bg-gray-200 rounded" />
                  <div className="h-2 bg-gray-200 rounded" />
                </div>
                <p
                  className="mt-2 text-sm font-medium text-gray-900 capitalize"
                  style={typography.body}
                >
                  {spacing}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Анимации */}
        <div>
          <h3
            className="text-lg font-medium text-gray-900 mb-4"
            style={typography.h3}
          >
            Анимации
          </h3>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={customization.animations}
              onChange={(e) => handleChange('animations', e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span
              className="text-sm text-gray-700"
              style={typography.body}
            >
              Включить анимации при прокрутке
            </span>
          </label>
        </div>

        {/* Кнопки навигации */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            style={{ ...typography.button, borderRadius: borderRadius.md }}
          >
            Назад
          </button>
          <button
            type="button"
            onClick={onNext}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
            style={{ ...typography.button, borderRadius: borderRadius.md }}
          >
            Продолжить
          </button>
        </div>
      </div>
    </motion.div>
  );
}; 