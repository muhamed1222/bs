import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Modal from '../common/Modal';
import { typography, spacing, borderRadius, shadows } from '../../styles/typography';

export const HeroSection: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Бейдж */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mb-8"
            style={{ boxShadow: shadows.md }}
          >
            <span className="text-white text-sm font-medium" style={typography.small}>
              ✨ Новая эра цифровых портфолио
            </span>
          </motion.div>

          {/* Заголовок */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            style={typography.h1}
          >
            Создайте портфолио на{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
              Basis
            </span>
          </motion.h1>

          {/* Подзаголовок */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
            style={typography.body}
          >
            Создайте профессиональное портфолио за 2 минуты с помощью нашего конструктора. 
            Перетаскивайте элементы, настраивайте дизайн и делитесь результатом.
          </motion.p>

          {/* Кнопки */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
              style={{ ...typography.button, borderRadius: borderRadius.md }}
            >
              Начать бесплатно
            </Link>
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              style={{ ...typography.button, borderRadius: borderRadius.md }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Смотреть демо
            </button>
          </motion.div>

          {/* Статистика */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { label: 'Пользователей', value: '10K+' },
              { label: 'Создано страниц', value: '50K+' },
              { label: 'Средняя оценка', value: '4.9/5' },
              { label: 'Страны', value: '100+' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2" style={typography.h3}>
                  {stat.value}
                </div>
                <div className="text-gray-600" style={typography.small}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Модальное окно с видео */}
      <Modal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="Демонстрация Basis"
      >
        <div className="aspect-w-16 aspect-h-9">
          <video
            className="w-full h-full rounded-lg"
            controls
            poster="/demo-poster.jpg"
          >
            <source src="/demo-video.mp4" type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
        </div>
      </Modal>
    </section>
  );
};
