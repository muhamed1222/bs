import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { typography, spacing, borderRadius, shadows } from '../../styles/typography';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    content: Record<string, any>;
    customize: Record<string, any>;
  };
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          style={{ borderRadius: borderRadius.lg, boxShadow: shadows.xl }}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2
              className="text-xl font-bold text-gray-900"
              style={typography.h2}
            >
              Предварительный просмотр
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
            <div
              className="bg-white rounded-lg p-8"
              style={{
                fontFamily: data.customize.font || 'Inter, sans-serif',
                color: data.customize.colorScheme === 'dark' ? '#F9FAFB' : '#1F2937',
                backgroundColor: data.customize.colorScheme === 'dark' ? '#1F2937' : '#FFFFFF',
                borderRadius: borderRadius.lg,
                boxShadow: shadows.md,
              }}
            >
              <div className="text-center mb-8">
                <h1
                  className="text-3xl font-bold mb-2"
                  style={{
                    color: data.customize.colorScheme === 'dark' ? '#F9FAFB' : '#1F2937',
                    ...typography.h1,
                  }}
                >
                  {data.content.name || 'Ваше имя'}
                </h1>
                <p
                  className="text-lg text-gray-600"
                  style={{
                    color: data.customize.colorScheme === 'dark' ? '#D1D5DB' : '#4B5563',
                    ...typography.body,
                  }}
                >
                  {data.content.title || 'Ваша должность'}
                </p>
              </div>

              <div className="prose max-w-none mb-8">
                <p
                  style={{
                    color: data.customize.colorScheme === 'dark' ? '#D1D5DB' : '#4B5563',
                    ...typography.body,
                  }}
                >
                  {data.content.bio || 'Расскажите о себе...'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3
                    className="text-lg font-medium mb-4"
                    style={{
                      color: data.customize.colorScheme === 'dark' ? '#F9FAFB' : '#1F2937',
                      ...typography.h3,
                    }}
                  >
                    Контакты
                  </h3>
                  <ul className="space-y-2">
                    {data.content.email && (
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span
                          style={{
                            color: data.customize.colorScheme === 'dark' ? '#D1D5DB' : '#4B5563',
                            ...typography.body,
                          }}
                        >
                          {data.content.email}
                        </span>
                      </li>
                    )}
                    {data.content.phone && (
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span
                          style={{
                            color: data.customize.colorScheme === 'dark' ? '#D1D5DB' : '#4B5563',
                            ...typography.body,
                          }}
                        >
                          {data.content.phone}
                        </span>
                      </li>
                    )}
                    {data.content.location && (
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span
                          style={{
                            color: data.customize.colorScheme === 'dark' ? '#D1D5DB' : '#4B5563',
                            ...typography.body,
                          }}
                        >
                          {data.content.location}
                        </span>
                      </li>
                    )}
                  </ul>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium mb-4"
                    style={{
                      color: data.customize.colorScheme === 'dark' ? '#F9FAFB' : '#1F2937',
                      ...typography.h3,
                    }}
                  >
                    Социальные сети
                  </h3>
                  <ul className="space-y-2">
                    {data.content.social?.github && (
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <a
                          href={data.content.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-700"
                          style={typography.body}
                        >
                          GitHub
                        </a>
                      </li>
                    )}
                    {data.content.social?.linkedin && (
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                          />
                        </svg>
                        <a
                          href={data.content.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-700"
                          style={typography.body}
                        >
                          LinkedIn
                        </a>
                      </li>
                    )}
                    {data.content.social?.twitter && (
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                          />
                        </svg>
                        <a
                          href={data.content.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-700"
                          style={typography.body}
                        >
                          Twitter
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}; 