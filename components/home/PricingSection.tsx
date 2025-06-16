import React from 'react';
import { motion } from 'framer-motion';
import { typography, spacing, borderRadius, shadows } from '../../styles/typography';

const plans = [
  {
    name: 'Базовый',
    price: '0',
    description: 'Идеально для начала работы',
    features: [
      '1 портфолио',
      'Базовые шаблоны',
      'Интеграция с GitHub',
      'Базовая аналитика',
      'Поддержка по email',
    ],
    cta: 'Начать бесплатно',
    popular: false,
  },
  {
    name: 'Про',
    price: '990',
    description: 'Для профессионалов',
    features: [
      '3 портфолио',
      'Все шаблоны',
      'Все интеграции',
      'Расширенная аналитика',
      'Приоритетная поддержка',
      'Свой домен',
      'Экспорт в PDF',
    ],
    cta: 'Выбрать план',
    popular: true,
  },
  {
    name: 'Бизнес',
    price: '2990',
    description: 'Для команд и агентств',
    features: [
      '10 портфолио',
      'Все шаблоны',
      'Все интеграции',
      'Расширенная аналитика',
      'Приоритетная поддержка',
      'Свой домен',
      'Экспорт в PDF',
      'API доступ',
      'Командное управление',
    ],
    cta: 'Выбрать план',
    popular: false,
  },
];

export const PricingSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
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
            Выберите подходящий тариф
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            style={typography.body}
          >
            Гибкие тарифы для любых задач
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl p-8 ${
                plan.popular
                  ? 'ring-2 ring-indigo-600 shadow-xl'
                  : 'shadow-lg'
              }`}
              style={{ borderRadius: borderRadius.lg, boxShadow: shadows.md }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -mt-4 -mr-4">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold bg-indigo-600 text-white">
                    Популярный
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3
                  className="text-2xl font-bold text-gray-900 mb-2"
                  style={typography.h3}
                >
                  {plan.name}
                </h3>
                <p
                  className="text-gray-600 mb-6"
                  style={typography.body}
                >
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span
                    className="text-4xl font-bold text-gray-900"
                    style={typography.h1}
                  >
                    {plan.price === '0' ? 'Бесплатно' : `${plan.price} ₽/мес`}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
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
                    <span
                      className="text-gray-600"
                      style={typography.body}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
                style={{ ...typography.button, borderRadius: borderRadius.md }}
              >
                {plan.cta}
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
            Нужен индивидуальный тариф?
          </p>
          <button
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200"
            style={{ ...typography.button, borderRadius: borderRadius.md }}
          >
            Связаться с нами
          </button>
        </motion.div>
      </div>
    </section>
  );
}; 