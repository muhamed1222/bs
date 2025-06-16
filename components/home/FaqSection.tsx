import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { typography, spacing, borderRadius, shadows } from '../../styles/typography';

const faqs = [
  {
    question: 'Сколько стоит использование Basis?',
    answer: 'Basis предлагает бесплатный тариф для начала работы и несколько платных планов для расширенных возможностей. Подробности можно найти в разделе "Тарифы".',
  },
  {
    question: 'Можно ли использовать свой домен?',
    answer: 'Да, вы можете подключить свой домен к портфолио на Basis. Это доступно на платных тарифах.',
  },
  {
    question: 'Как долго создается портфолио?',
    answer: 'С помощью нашего конструктора вы можете создать базовое портфолио за 2-3 минуты. Время настройки и кастомизации зависит от ваших предпочтений.',
  },
  {
    question: 'Какие интеграции доступны?',
    answer: 'Basis поддерживает интеграцию с популярными сервисами: GitHub, Behance, Dribbble, Instagram и другими. Полный список доступен в документации.',
  },
  {
    question: 'Можно ли экспортировать портфолио?',
    answer: 'Да, вы можете экспортировать свое портфолио в формате HTML/CSS или PDF. Эта функция доступна на всех тарифах.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            style={typography.h2}
          >
            Часто задаваемые вопросы
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            style={typography.body}
          >
            Ответы на популярные вопросы о платформе
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ borderRadius: borderRadius.lg, boxShadow: shadows.md }}
              >
                <div className="flex justify-between items-center">
                  <h3
                    className="text-lg font-bold text-gray-900"
                    style={typography.h3}
                  >
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p
                        className="mt-4 text-gray-600"
                        style={typography.body}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p
            className="text-gray-600 mb-4"
            style={typography.body}
          >
            Не нашли ответ на свой вопрос?
          </p>
          <button
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
            style={{ ...typography.button, borderRadius: borderRadius.md }}
          >
            Задать вопрос
          </button>
        </motion.div>
      </div>
    </section>
  );
}; 