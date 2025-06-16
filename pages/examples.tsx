import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { typography, spacing, borderRadius, shadows } from '../styles/typography';

const examples = [
  {
    id: 'minimal',
    name: 'Минималистичный',
    description: 'Чистый и современный дизайн',
    image: '/examples/minimal.jpg',
    author: 'Анна Петрова',
    role: 'UI/UX дизайнер',
  },
  {
    id: 'creative',
    name: 'Креативный',
    description: 'Яркий и нестандартный дизайн',
    image: '/examples/creative.jpg',
    author: 'Иван Смирнов',
    role: 'Графический дизайнер',
  },
  {
    id: 'professional',
    name: 'Профессиональный',
    description: 'Строгий и деловой стиль',
    image: '/examples/professional.jpg',
    author: 'Мария Иванова',
    role: 'Маркетолог',
  },
];

export default function Examples() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 style={typography.h1} className="text-3xl font-bold text-gray-900">
                Примеры портфолио
              </h1>
              <Link
                href="/create-portfolio"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                style={{ ...typography.button, borderRadius: borderRadius.md }}
              >
                Создать свое
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {examples.map((example) => (
              <motion.div
                key={example.id}
                className="bg-white overflow-hidden shadow-lg rounded-lg"
                style={{ borderRadius: borderRadius.lg, boxShadow: shadows.md }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative h-48">
                  <img
                    src={example.image}
                    alt={example.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3
                      className="text-xl font-semibold text-white"
                      style={typography.h3}
                    >
                      {example.name}
                    </h3>
                    <p
                      className="text-sm text-gray-200"
                      style={typography.body}
                    >
                      {example.description}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={`/authors/${example.id}.jpg`}
                        alt={example.author}
                      />
                    </div>
                    <div className="ml-3">
                      <p
                        className="text-sm font-medium text-gray-900"
                        style={typography.body}
                      >
                        {example.author}
                      </p>
                      <p
                        className="text-sm text-gray-500"
                        style={typography.body}
                      >
                        {example.role}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link
                      href={`/examples/${example.id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                      style={{ ...typography.button, borderRadius: borderRadius.md }}
                    >
                      Подробнее
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-indigo-50">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2
              className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
              style={typography.h2}
            >
              <span className="block">Вдохновились?</span>
              <span className="block text-indigo-600">Создайте свое портфолио прямо сейчас.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  href="/portfolio/create"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  style={{ ...typography.button, borderRadius: borderRadius.md }}
                >
                  Создать портфолио
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                  style={{ ...typography.button, borderRadius: borderRadius.md }}
                >
                  На главную
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 