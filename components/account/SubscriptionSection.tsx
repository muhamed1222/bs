import React from 'react';
import SectionCard from './SectionCard';

interface Props {
  plan: string;
  status: string;
  onManage: () => void;
}

const SubscriptionSection: React.FC<Props> = ({ plan, status, onManage }) => {
  return (
    <SectionCard title="Управление подпиской">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Ваш текущий тариф: <span className="font-semibold text-green-600">{plan}</span>
        </p>
        <p className="text-sm text-gray-600">
          Статус:{' '}
          <span className={`font-semibold ${status === 'active' ? 'text-green-600' : 'text-orange-600'}`}>{
            status === 'active' ? 'Активен' : 'Неактивен'
          }</span>
        </p>
        <button onClick={onManage} className="px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-md hover:bg-teal-600">
          Управлять подпиской
        </button>
      </div>
    </SectionCard>
  );
};

export default SubscriptionSection;
