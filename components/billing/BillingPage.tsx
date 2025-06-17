import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TARIFFS } from '../../constants/tariffs';
import { TariffPlan } from '../../types/billing';
import { TariffRestriction } from '../common/TariffRestriction';

interface BillingPageProps {
  currentPlan: TariffPlan;
  onPlanChange: (plan: TariffPlan) => Promise<void>;
}

export const BillingPage: React.FC<BillingPageProps> = ({
  currentPlan,
  onPlanChange,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<TariffPlan>(currentPlan);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlanChange = async (plan: TariffPlan) => {
    if (plan === currentPlan) return;
    
    setIsLoading(true);
    try {
      await onPlanChange(plan);
      setSelectedPlan(plan);
    } catch (error) {
      console.error('Failed to change plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Выберите подходящий тариф
        </h1>
        <p className="text-lg text-gray-600">
          Расширьте возможности вашего портфолио
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.values(TARIFFS).map((tariff) => (
          <motion.div
            key={tariff.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`relative rounded-2xl border ${
              selectedPlan === tariff.id
                ? 'border-primary-500 shadow-lg'
                : 'border-gray-200'
            } p-8`}
          >
            {tariff.id !== 'free' && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <TariffRestriction type={tariff.id as 'pro' | 'business'} />
              </div>
            )}

            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {tariff.name}
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  {tariff.price === 0 ? 'Бесплатно' : `${tariff.price} ₽`}
                </span>
                {tariff.price > 0 && (
                  <span className="text-gray-500">/месяц</span>
                )}
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {tariff.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary-500 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="ml-3 text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePlanChange(tariff.id as TariffPlan)}
              disabled={isLoading || tariff.id === currentPlan}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                tariff.id === currentPlan
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              {isLoading
                ? 'Загрузка...'
                : tariff.id === currentPlan
                ? 'Текущий тариф'
                : 'Выбрать тариф'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 