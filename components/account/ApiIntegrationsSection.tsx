import React from 'react';
import SectionCard from './SectionCard';
import Spinner from '../../ui/Spinner';

interface ApiKey {
  id: string;
  name: string;
  created: string;
  lastUsed?: string;
}

interface Props {
  apiKeys: ApiKey[];
  onRemove: (id: string) => void;
  onGenerate: () => void;
  generating: boolean;
}

const ApiIntegrationsSection: React.FC<Props> = ({ apiKeys, onRemove, onGenerate, generating }) => {
  return (
    <SectionCard title="API и Интеграции">
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-800 mb-4">API-ключи</h4>
          {apiKeys.length > 0 ? (
            <div className="space-y-2 mb-4">
              {apiKeys.map((key) => (
                <div key={key.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium">{key.name}</span>
                    <span className="text-sm text-gray-500 ml-2">Создан: {new Date(key.created).toLocaleDateString()}</span>
                    {key.lastUsed && (
                      <span className="text-sm text-gray-500 ml-2">Последнее использование: {new Date(key.lastUsed).toLocaleDateString()}</span>
                    )}
                  </div>
                  <button onClick={() => onRemove(key.id)} className="text-red-600 text-sm hover:underline">
                    Удалить
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600 mb-4">У вас нет активных API-ключей.</p>
          )}
          <button
            onClick={onGenerate}
            disabled={generating}
            aria-busy={generating}
            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {generating && <Spinner size="h-4 w-4" className="mr-2" />}
            {generating ? 'Генерация...' : 'Сгенерировать API-ключ'}
          </button>
        </div>
      </div>
    </SectionCard>
  );
};

export default ApiIntegrationsSection;
