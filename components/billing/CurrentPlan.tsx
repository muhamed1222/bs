import React from 'react';
import { TariffPlan } from '@/types/billing';
import { TARIFFS } from '@/constants/tariffs';
import { TariffLimits } from './TariffLimits';

interface CurrentPlanProps {
  plan: TariffPlan;
  onUpgrade: () => void;
}

export const CurrentPlan: React.FC<CurrentPlanProps> = ({
  plan,
  onUpgrade,
}) => {
  const currentTariff = TARIFFS[plan];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Текущий тариф: {currentTariff.name}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {currentTariff.price} {currentTariff.currency} /{' '}
            {currentTariff.billingInterval === 'month' ? 'месяц' : 'год'}
          </p>
        </div>
        {plan !== 'business' && (
          <button
            onClick={onUpgrade}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Улучшить тариф
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Возможности тарифа
          </h3>
          <ul className="space-y-3">
            {currentTariff.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <TariffLimits
          limits={currentTariff.limits}
          currentPlan={plan}
          requiredPlan={plan}
        />
      </div>
    </div>
  );
}; 