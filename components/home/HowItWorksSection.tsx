import React from 'react';
import { motion } from 'framer-motion';
import { typography, spacing, borderRadius, shadows } from '../../styles/typography';

const steps = [
  {
    title: 'Создайте аккаунт',
    description: 'Зарегистрируйтесь за 30 секунд и получите доступ ко всем возможностям платформы',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    title: 'Выберите шаблон',
    description: 'Подберите готовый шаблон или начните с чистого листа',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Настройте дизайн',
    description: 'Добавьте свои работы, настройте цвета и шрифты под свой стиль',
    gradient: 'from-orange-500 to-red-500',
  },
];

export const HowItWorksSection: React.FC = () => {
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
            Как это работает
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            style={typography.body}
          >
            Создайте профессиональное портфолио всего за три простых шага
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r opacity-10 rounded-2xl"
                style={{
                  backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  '--tw-gradient-from': step.gradient.split(' ')[1],
                  '--tw-gradient-to': step.gradient.split(' ')[3],
                } as any}
              />
              <div
                className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{ borderRadius: borderRadius.lg, boxShadow: shadows.md }}
              >
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center text-white text-xl font-bold mb-6`}
                  style={{ borderRadius: borderRadius.full }}
                >
                  {index + 1}
                </div>
                <h3
                  className="text-xl font-bold text-gray-900 mb-4"
                  style={typography.h3}
                >
                  {step.title}
                </h3>
                <p
                  className="text-gray-600"
                  style={typography.body}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
