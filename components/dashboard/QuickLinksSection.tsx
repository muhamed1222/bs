import React from 'react';
import { Link } from 'react-router-dom';

const QuickLinksSection: React.FC = () => (
  <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
    <section>
      <h2 className="text-xl font-semibold font-pragmatica mb-3 text-gray-700">
        Быстрые настройки
      </h2>
      <ul className="space-y-2">
        <li>
          <Link to="/account" className="text-indigo-600 hover:underline">
            Настройки аккаунта
          </Link>
        </li>
        <li>
          <Link to="/account#security" className="text-indigo-600 hover:underline">
            Безопасность
          </Link>
        </li>
      </ul>
    </section>
    <section>
      <h2 className="text-xl font-semibold font-pragmatica mb-3 text-gray-700">
        Тарифы и Подписка
      </h2>
      <p className="text-sm text-gray-600 mb-2">
        Ваш текущий тариф: <span className="font-semibold text-green-600">Free</span>
      </p>
      <Link to="/billing" className="text-indigo-600 hover:underline">
        Управление подпиской и тарифами
      </Link>
    </section>
  </div>
);

export default QuickLinksSection;
