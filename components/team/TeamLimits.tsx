import React from 'react';
import { TariffLimits as TariffLimitsType } from '@/types/billing';
import { TariffRestriction } from '../common/TariffRestriction';

interface TeamLimitsProps {
  limits: TariffLimitsType;
  currentPlan: string;
  requiredPlan: string;
  currentMembers: number;
}

export const TeamLimits: React.FC<TeamLimitsProps> = ({
  limits,
  currentPlan,
  requiredPlan,
  currentMembers,
}) => {
  const isRestricted = currentPlan !== requiredPlan;
  const isMembersExceeded = currentMembers >= (limits.maxTeamMembers || 0);

  if (!limits.maxTeamMembers) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            Командный доступ
          </h3>
          <TariffRestriction type="business" />
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Командный доступ доступен только на тарифе Business
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          Ограничения команды
        </h3>
        {isRestricted && (
          <TariffRestriction type={requiredPlan as 'pro' | 'business'} />
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">
          Участники команды
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Текущее количество:</span>
            <span className={isMembersExceeded ? 'text-red-600' : 'text-gray-900'}>
              {currentMembers} участников
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Максимальное количество:</span>
            <span className="text-gray-900">{limits.maxTeamMembers} участников</span>
          </div>
          {isMembersExceeded && (
            <p className="text-sm text-red-600">
              Превышен лимит участников команды
            </p>
          )}
        </div>

        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary-600 h-2.5 rounded-full"
              style={{
                width: `${Math.min(
                  (currentMembers / limits.maxTeamMembers) * 100,
                  100
                )}%`,
              }}
            />
          </div>
        </div>
      </div>

      {isRestricted && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Для увеличения лимита участников команды необходимо обновить тариф до{' '}
                {requiredPlan === 'pro' ? 'Pro' : 'Business'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 