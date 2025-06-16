import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContentStep } from '../components/portfolio/ContentStep';
import { CustomizeStep } from '../components/portfolio/CustomizeStep';
import { PublishStep } from '../components/portfolio/PublishStep';
import { PreviewModal } from '../components/portfolio/PreviewModal';
import { SaveDraftButton } from '../components/portfolio/SaveDraftButton';
import { typography, spacing, borderRadius, shadows } from '../styles/typography';
import Link from 'next/link';

interface FormData {
  content: Record<string, any>;
  customize: Record<string, any>;
  publish?: Record<string, any>;
}

export default function CreatePortfolio() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    content: {},
    customize: {},
    publish: {},
  });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const steps = [
    'Добавьте информацию',
    'Настройте дизайн',
    'Опубликуйте',
  ];

  const handleNext = (data: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      [currentStep === 0 ? 'content' : currentStep === 1 ? 'customize' : 'publish']: data,
    }));
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const canPreview = currentStep > 0 && Object.keys(formData.content).length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        <div className="text-center py-12">
          <h1 style={typography.h1}>Создание портфолио</h1>
          <p style={typography.body}>Создайте свое профессиональное портфолио за несколько шагов</p>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step}>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index <= currentStep
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`ml-2 ${
                      index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      index < currentStep ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ContentStep
                      onNext={handleNext}
                      onBack={handleBack}
                      initialData={formData.content}
                    />
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    key="customize"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CustomizeStep
                      onNext={handleNext}
                      onBack={handleBack}
                      initialData={formData.customize}
                    />
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="publish"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PublishStep
                      onNext={(data) => handleNext(data)}
                      onBack={handleBack}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {canPreview && (
        <motion.button
          type="button"
          onClick={() => setIsPreviewOpen(true)}
          className="fixed bottom-8 right-8 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-200"
          style={{ ...typography.button, borderRadius: borderRadius.full }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Предпросмотр
        </motion.button>
      )}

      <SaveDraftButton
        data={formData}
        onSave={() => {
          // Здесь можно добавить дополнительную логику после сохранения
          console.log('Черновик сохранен');
        }}
      />

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        data={formData}
      />

      <div className="flex items-center space-x-4">
        <Link
          href="/portfolio/examples"
          className="text-indigo-600 hover:text-indigo-500"
          style={typography.link}
        >
          Примеры
        </Link>
        <Link
          href="/"
          className="text-indigo-600 hover:text-indigo-500"
          style={typography.link}
        >
          На главную
        </Link>
      </div>
    </div>
  );
} 