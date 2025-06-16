import React from 'react';
import { motion } from 'framer-motion';
import { typography, spacing, borderRadius, shadows } from '../../styles/typography';

const testimonials = [
  {
    name: 'Анна Петрова',
    role: 'UI/UX Дизайнер',
    company: 'Design Studio',
    avatar: '/avatars/anna.jpg',
    text: 'Basis помог мне создать профессиональное портфолио за считанные минуты. Теперь я могу легко демонстрировать свои работы клиентам.',
    rating: 5,
  },
  {
    name: 'Иван Смирнов',
    role: 'Фотограф',
    company: 'Freelance',
    avatar: '/avatars/ivan.jpg',
    text: 'Отличная платформа для фотографов. Удобная галерея, быстрая загрузка и красивые шаблоны.',
    rating: 5,
  },
  {
    name: 'Михаил Иванов',
    role: 'Frontend Developer',
    company: 'Tech Corp',
    avatar: '/avatars/mikhail.jpg',
    text: 'Использую Basis для демонстрации своих проектов. Интеграция с GitHub и удобный редактор кода.',
    rating: 5,
  },
];

export const TestimonialsSection: React.FC = () => {
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
            Отзывы пользователей
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            style={typography.body}
          >
            Что говорят о нас профессионалы
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div
                className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ borderRadius: borderRadius.lg, boxShadow: shadows.md }}
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    style={{ borderRadius: borderRadius.full }}
                  />
                  <div className="ml-4">
                    <h3
                      className="text-lg font-bold text-gray-900"
                      style={typography.h3}
                    >
                      {testimonial.name}
                    </h3>
                    <p
                      className="text-gray-600"
                      style={typography.small}
                    >
                      {testimonial.role} в {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p
                  className="text-gray-600"
                  style={typography.body}
                >
                  {testimonial.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 