import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { typography, spacing, borderRadius, shadows } from '../../styles/typography';

interface PublishStepProps {
  onBack: () => void;
  onNext?: (data: { url: string }) => void;
}

export const PublishStep: React.FC<PublishStepProps> = ({
  onNext,
  onBack,
}) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [portfolioUrl, setPortfolioUrl] = useState('');

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // Здесь будет логика публикации
      await new Promise(resolve => setTimeout(resolve, 2000)); // Имитация задержки
      const url = 'https://basis.io/portfolio/john-doe';
      setPortfolioUrl(url);
      setIsPublished(true);
      onNext({ url });
    } catch (error) {
      console.error('Ошибка при публикации:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 style={typography.h2}>Опубликуйте ваше портфолио</h2>
        <p style={typography.body} className="mt-2 text-gray-600">
          Нажмите кнопку ниже, чтобы опубликовать ваше портфолио
        </p>
      </div>

      {!isPublished ? (
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 style={typography.h3} className="mb-4">
              Что произойдет после публикации:
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-500 mt-1 mr-2"
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
                <span>Ваше портфолио станет доступно по уникальному URL</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-500 mt-1 mr-2"
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
                <span>Вы сможете делиться ссылкой с потенциальными работодателями</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-500 mt-1 mr-2"
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
                <span>Вы сможете отслеживать статистику просмотров</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
              style={typography.button}
            >
              Назад
            </button>
            <motion.button
              type="button"
              onClick={handlePublish}
              disabled={isPublishing}
              className={`px-6 py-2 rounded-lg shadow-md ${
                isPublishing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } text-white`}
              style={{ ...typography.button, borderRadius: borderRadius.lg }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isPublishing ? 'Публикация...' : 'Опубликовать'}
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <svg
              className="w-12 h-12 text-green-500 mx-auto mb-4"
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
            <h3 style={typography.h3} className="text-green-600 mb-2">
              Портфолио успешно опубликовано!
            </h3>
            <p style={typography.body} className="text-gray-600">
              Ваше портфолио доступно по ссылке:
            </p>
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
              style={typography.body}
            >
              {portfolioUrl}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}; 