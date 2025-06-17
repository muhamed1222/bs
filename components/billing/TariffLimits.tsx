import React from 'react';
import { TariffLimits as TariffLimitsType } from '@/types/billing';
import { TariffRestriction } from '../common/TariffRestriction';

interface TariffLimitsProps {
  limits: TariffLimitsType;
  currentPlan: string;
  requiredPlan: string;
}

export const TariffLimits: React.FC<TariffLimitsProps> = ({
  limits,
  currentPlan,
  requiredPlan,
}) => {
  const isRestricted = currentPlan !== requiredPlan;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          Ограничения тарифа
        </h3>
        {isRestricted && (
          <TariffRestriction type={requiredPlan as 'pro' | 'business'} />
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Страницы
          </h4>
          <p className="text-sm text-gray-500">
            Максимум {limits.maxPages} страниц
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Блоки
          </h4>
          <p className="text-sm text-gray-500">
            Максимум {limits.maxBlocks} блоков на страницу
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Файлы
          </h4>
          <p className="text-sm text-gray-500">
            Максимум {limits.maxFileSize}MB на файл
          </p>
          <p className="text-sm text-gray-500">
            Всего {limits.maxTotalStorage}GB
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            API запросы
          </h4>
          <p className="text-sm text-gray-500">
            {limits.maxApiRequests} запросов в день
          </p>
        </div>

        {limits.maxTeamMembers && (
          <div className="bg-white shadow rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Команда
            </h4>
            <p className="text-sm text-gray-500">
              Максимум {limits.maxTeamMembers} участников
            </p>
          </div>
        )}
      </div>
    </div>
  );
}; 