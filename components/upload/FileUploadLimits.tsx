import React from 'react';
import { TariffLimits as TariffLimitsType } from '@/types/billing';
import { TariffRestriction } from '../common/TariffRestriction';

interface FileUploadLimitsProps {
  limits: TariffLimitsType;
  currentPlan: string;
  requiredPlan: string;
  currentFileSize: number;
  totalStorageUsed: number;
}

export const FileUploadLimits: React.FC<FileUploadLimitsProps> = ({
  limits,
  currentPlan,
  requiredPlan,
  currentFileSize,
  totalStorageUsed,
}) => {
  const isRestricted = currentPlan !== requiredPlan;
  const isFileSizeExceeded = currentFileSize > limits.maxFileSize * 1024 * 1024;
  const isStorageExceeded = totalStorageUsed > limits.maxTotalStorage * 1024 * 1024 * 1024;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          Ограничения загрузки
        </h3>
        {isRestricted && (
          <TariffRestriction type={requiredPlan as 'pro' | 'business'} />
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Размер файла
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Текущий размер:</span>
              <span className={isFileSizeExceeded ? 'text-red-600' : 'text-gray-900'}>
                {(currentFileSize / (1024 * 1024)).toFixed(2)} MB
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Максимальный размер:</span>
              <span className="text-gray-900">{limits.maxFileSize} MB</span>
            </div>
            {isFileSizeExceeded && (
              <p className="text-sm text-red-600">
                Размер файла превышает допустимый лимит
              </p>
            )}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Общее хранилище
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Использовано:</span>
              <span className={isStorageExceeded ? 'text-red-600' : 'text-gray-900'}>
                {(totalStorageUsed / (1024 * 1024 * 1024)).toFixed(2)} GB
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Доступно:</span>
              <span className="text-gray-900">{limits.maxTotalStorage} GB</span>
            </div>
            {isStorageExceeded && (
              <p className="text-sm text-red-600">
                Превышен лимит общего хранилища
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 