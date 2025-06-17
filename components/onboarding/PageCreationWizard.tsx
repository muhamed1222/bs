import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
  title: string;
  description: string;
  component: React.ReactNode;
}

interface PageCreationWizardProps {
  steps: Step[];
  onComplete: () => void;
  onSkip: () => void;
}

export const PageCreationWizard: React.FC<PageCreationWizardProps> = ({
  steps,
  onComplete,
  onSkip,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextStep = () => {
    setDirection(1);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep(currentStep - 1);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {steps[currentStep].title}
            </h2>
            <button
              onClick={onSkip}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Пропустить
            </button>
          </div>

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="min-h-[300px]"
            >
              {steps[currentStep].component}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center mt-8">
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-4">
              {currentStep > 0 && (
                <button
                  onClick={prevStep}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Назад
                </button>
              )}
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                {currentStep === steps.length - 1 ? 'Завершить' : 'Далее'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 