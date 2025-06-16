import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { typography, spacing, borderRadius, shadows } from '../../styles/typography';

interface SaveDraftButtonProps {
  data: Record<string, any>;
  onSave?: () => void;
}

export const SaveDraftButton: React.FC<SaveDraftButtonProps> = ({
  data,
  onSave,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Здесь будет логика сохранения в базу данных
      await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация задержки
      localStorage.setItem('portfolio_draft', JSON.stringify(data));
      setIsSaved(true);
      if (onSave) {
        onSave();
      }
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      console.error('Ошибка при сохранении черновика:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleSave}
      disabled={isSaving}
      className={`fixed bottom-8 left-8 px-4 py-2 rounded-full shadow-lg transition-colors duration-200 flex items-center space-x-2 ${
        isSaving
          ? 'bg-gray-400 cursor-not-allowed'
          : isSaved
          ? 'bg-green-600 hover:bg-green-700'
          : 'bg-indigo-600 hover:bg-indigo-700'
      }`}
      style={{ ...typography.button, borderRadius: borderRadius.full }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isSaving ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Сохранение...</span>
        </>
      ) : isSaved ? (
        <>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Сохранено</span>
        </>
      ) : (
        <>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
          <span>Сохранить черновик</span>
        </>
      )}
    </motion.button>
  );
}; 