import React from 'react';
import Spinner from '../../ui/Spinner';

interface TariffCardProps {
  name: string;
  price: string;
  features: string[];
  current?: boolean;
  popular?: boolean;
  onSwitch?: () => void;
  loading?: boolean;
}

const TariffCard: React.FC<TariffCardProps> = ({
  name,
  price,
  features,
  current,
  popular,
  onSwitch,
  loading,
}) => (
  <div
    className={`border rounded-lg p-6 shadow-sm relative ${current ? 'border-indigo-500 ring-2 ring-indigo-500' : 'bg-white'} ${popular ? 'border-green-500' : ''}`}
    aria-current={current ? 'true' : 'false'}
  >
    {popular && !current && (
      <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
        Популярный
      </div>
    )}
    {current && (
      <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-500 text-white text-xs font-semibold rounded-full">
        Текущий тариф
      </div>
    )}
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
    <p className="text-3xl font-bold text-gray-900 mb-4">
      {price}
      <span className="text-sm font-normal text-gray-500">/месяц</span>
    </p>
    <ul className="space-y-2 text-sm text-gray-600 mb-6">
      {features.map((feature) => (
        <li key={feature} className="flex items-center">
          <svg className="w-4 h-4 text-green-500 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
          </svg>
          {feature}
        </li>
      ))}
    </ul>
    {current ? (
      <button disabled className="w-full px-6 py-3 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed" aria-label="Ваш текущий тариф">
        Ваш текущий тариф
      </button>
    ) : (
      <button
        onClick={onSwitch}
        disabled={loading}
        aria-busy={loading}
        className={`w-full px-6 py-3 ${popular ? 'bg-green-500 hover:bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-semibold rounded-lg transition-colors flex items-center justify-center`}
        aria-label={`Переключиться на тариф ${name}`}
      >
        {loading && <Spinner size="h-4 w-4" className="mr-2" />}
        {loading ? 'Переключаем...' : `Переключиться на ${name}`}
      </button>
    )}
  </div>
);

export default TariffCard;
