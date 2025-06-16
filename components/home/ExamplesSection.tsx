import React from 'react';
import { motion } from 'framer-motion';
import { typography, spacing, borderRadius, shadows } from '../../styles/typography';

const examples = [
  {
    title: 'Портфолио дизайнера',
    description: 'Современный дизайн с акцентом на визуальные работы',
    image: '/examples/designer-preview.jpg',
    author: 'Анна Петрова',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    title: 'Страница фотографа',
    description: 'Минималистичный стиль с галереей работ',
    image: '/examples/photographer-preview.jpg',
    author: 'Иван Смирнов',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Портфолио разработчика',
    description: 'Технический дизайн с акцентом на проекты',
    image: '/examples/developer-preview.jpg',
    author: 'Михаил Иванов',
    gradient: 'from-orange-500 to-red-500',
  },
];

export const ExamplesSection: React.FC = () => {
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
            Примеры портфолио
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            style={typography.body}
          >
            Вдохновляйтесь работами других пользователей
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div
                className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{ borderRadius: borderRadius.lg, boxShadow: shadows.md }}
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={example.image}
                    alt={example.title}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div
                    className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${example.gradient} text-white text-sm font-medium mb-4`}
                    style={{ borderRadius: borderRadius.full }}
                  >
                    {example.author}
                  </div>
                  <h3
                    className="text-xl font-bold text-gray-900 mb-2"
                    style={typography.h3}
                  >
                    {example.title}
                  </h3>
                  <p
                    className="text-gray-600"
                    style={typography.body}
                  >
                    {example.description}
                  </p>
                </div>
              </div>
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
          <button
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
            style={{ ...typography.button, borderRadius: borderRadius.md }}
          >
            Смотреть все примеры
          </button>
        </motion.div>
      </div>
    </section>
  );
};
