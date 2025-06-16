import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { typography, spacing, borderRadius, shadows } from '../../styles/typography';

interface ContentStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

export const ContentStep: React.FC<ContentStepProps> = ({
  onNext,
  onBack,
  initialData = {},
}) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    social: {
      github: '',
      linkedin: '',
      twitter: '',
    },
    ...initialData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('social.')) {
      const socialPlatform = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        social: {
          ...prev.social,
          [socialPlatform]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
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
        Добавьте информацию о себе
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
              style={typography.label}
            >
              Имя
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              style={{ borderRadius: borderRadius.md }}
              required
            />
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
              style={typography.label}
            >
              Должность
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              style={{ borderRadius: borderRadius.md }}
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 mb-1"
            style={typography.label}
          >
            О себе
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            style={{ borderRadius: borderRadius.md }}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
              style={typography.label}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              style={{ borderRadius: borderRadius.md }}
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
              style={typography.label}
            >
              Телефон
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              style={{ borderRadius: borderRadius.md }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
              style={typography.label}
            >
              Местоположение
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              style={{ borderRadius: borderRadius.md }}
            />
          </div>

          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700 mb-1"
              style={typography.label}
            >
              Веб-сайт
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              style={{ borderRadius: borderRadius.md }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3
            className="text-lg font-medium text-gray-900"
            style={typography.h3}
          >
            Социальные сети
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label
                htmlFor="github"
                className="block text-sm font-medium text-gray-700 mb-1"
                style={typography.label}
              >
                GitHub
              </label>
              <input
                type="url"
                id="github"
                name="social.github"
                value={formData.social.github}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                style={{ borderRadius: borderRadius.md }}
              />
            </div>

            <div>
              <label
                htmlFor="linkedin"
                className="block text-sm font-medium text-gray-700 mb-1"
                style={typography.label}
              >
                LinkedIn
              </label>
              <input
                type="url"
                id="linkedin"
                name="social.linkedin"
                value={formData.social.linkedin}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                style={{ borderRadius: borderRadius.md }}
              />
            </div>

            <div>
              <label
                htmlFor="twitter"
                className="block text-sm font-medium text-gray-700 mb-1"
                style={typography.label}
              >
                Twitter
              </label>
              <input
                type="url"
                id="twitter"
                name="social.twitter"
                value={formData.social.twitter}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                style={{ borderRadius: borderRadius.md }}
              />
            </div>
          </div>
        </div>

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
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
            style={{ ...typography.button, borderRadius: borderRadius.md }}
          >
            Продолжить
          </button>
        </div>
      </form>
    </motion.div>
  );
}; 