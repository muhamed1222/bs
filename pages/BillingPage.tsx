// Платёжная страница
import React, { useEffect, useState } from 'react';
import StandardPageLayout from '../layouts/StandardPageLayout';
import {
  getTariffs,
  getBillingInfo,
  switchTariff,
  updatePaymentMethod,
  toggleAutoRenew,
  getPaymentHistory,
  Tariff,
  BillingInfo,
  PaymentHistoryItem,
} from '../mock/billing';
import { Link } from 'react-router-dom';
import useNotification from '../hooks/useNotification';
import Spinner from '../ui/Spinner';

const TariffCard = ({
  name,
  price,
  features,
  current,
  popular,
  onSwitch,
  loading,
}: {
  name: string;
  price: string;
  features: string[];
  current?: boolean;
  popular?: boolean;
  onSwitch?: () => void;
  loading?: boolean;
}) => (
  <div
    className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 transition-all duration-500 hover:-translate-y-2 hover:shadow-3xl ${
      current 
        ? 'border-blue-500 ring-4 ring-blue-100 bg-gradient-to-br from-blue-50 to-white' 
        : popular 
        ? 'border-green-500 ring-4 ring-green-100 bg-gradient-to-br from-green-50 to-white' 
        : 'border-gray-200 hover:border-gray-300'
    }`}
    aria-current={current ? 'true' : 'false'}
  >
    {/* Badge */}
    {(popular && !current) && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
          🔥 Популярный
        </div>
      </div>
    )}
    
    {current && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
          ✨ Текущий тариф
        </div>
      </div>
    )}

    {/* Plan Icon */}
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
      current 
        ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
        : popular 
        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
        : 'bg-gradient-to-r from-gray-500 to-gray-600'
    }`}>
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {name === 'Free' ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        ) : name === 'Pro' ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        )}
      </svg>
    </div>

    <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
    <div className="mb-6">
      <span className="text-4xl font-black text-gray-900">{price}</span>
      <span className="text-gray-500 ml-2">/месяц</span>
    </div>

    <ul className="space-y-4 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 mr-3">
            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-gray-700 leading-relaxed">{feature}</span>
        </li>
      ))}
    </ul>

    {current ? (
      <button
        disabled
        className="w-full py-4 bg-gray-100 text-gray-500 font-bold rounded-2xl cursor-not-allowed"
        aria-label="Ваш текущий тариф"
      >
        Ваш текущий тариф
      </button>
    ) : (
      <button
        onClick={onSwitch}
        disabled={loading}
        aria-busy={loading}
        className={`w-full py-4 font-bold rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center ${
          popular 
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
        }`}
        aria-label={`Переключиться на тариф ${name}`}
      >
        {loading && <Spinner size="h-5 w-5" className="mr-2" />}
        {loading ? 'Переключаем...' : `Выбрать ${name}`}
      </button>
    )}
  </div>
);

const PaymentHistoryRow = ({
  date,
  amount,
  status,
  invoiceId,
  invoiceLink,
}: PaymentHistoryItem) => (
  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
    <td className="py-4 px-6 text-gray-900 font-medium">{date}</td>
    <td className="py-4 px-6 text-gray-900 font-semibold">{amount}</td>
    <td className="py-4 px-6">
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
          status === 'Оплачено'
            ? 'bg-green-100 text-green-800'
            : status === 'Отклонено'
            ? 'bg-red-100 text-red-800'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {status === 'Оплачено' && '✓ '}
        {status}
      </span>
    </td>
    <td className="py-4 px-6">
      {invoiceLink ? (
        <a 
          href={invoiceLink} 
          className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          #{invoiceId}
        </a>
      ) : (
        <span className="text-gray-400">—</span>
      )}
    </td>
  </tr>
);

const BillingPage: React.FC = () => {
  // Платёжная страница
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [billingInfo, setBillingInfo] = useState<BillingInfo | null>(null);
  const [history, setHistory] = useState<PaymentHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tariffLoading, setTariffLoading] = useState<string | null>(null);
  const [autoRenew, setAutoRenew] = useState(false);
  const [payMethodLoading, setPayMethodLoading] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [t, b, h] = await Promise.all([
          getTariffs(),
          getBillingInfo(),
          getPaymentHistory(),
        ]);
        setTariffs(t);
        setBillingInfo(b);
        setHistory(h);
        setAutoRenew(!!b?.autoRenew);
      } catch {
        showNotification('Ошибка загрузки биллинга', 'error');
      } finally {
        setLoading(false);
      }
    })();
  }, [showNotification]);

  const handleSwitchTariff = async (tariffId: string) => {
    setTariffLoading(tariffId);
    try {
      await switchTariff(tariffId);
      showNotification('Тариф успешно переключён!', 'success');
      const b = await getBillingInfo();
      setBillingInfo(b);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Ошибка переключения тарифа';
      showNotification(message, 'error');
    } finally {
      setTariffLoading(null);
    }
  };

  const handleUpdatePayMethod = async () => {
    setPayMethodLoading(true);
    try {
      await updatePaymentMethod();
      showNotification('Способ оплаты обновлён', 'success');
      const b = await getBillingInfo();
      setBillingInfo(b);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Ошибка обновления оплаты';
      showNotification(message, 'error');
    } finally {
      setPayMethodLoading(false);
    }
  };

  const handleToggleAutoRenew = async () => {
    setAutoRenew((prev) => !prev);
    try {
      await toggleAutoRenew(!autoRenew);
      showNotification(`Автопродление ${!autoRenew ? 'включено' : 'отключено'}`, 'success');
    } catch (e: unknown) {
      setAutoRenew((prev) => !prev);
      const message = e instanceof Error ? e.message : 'Ошибка смены автопродления';
      showNotification(message, 'error');
    }
  };

  if (loading) {
    return (
      <StandardPageLayout title="Биллинг и тарифы">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Spinner size="h-8 w-8" className="text-white" />
            </div>
            <p className="text-xl text-gray-600">Загрузка тарифов...</p>
          </div>
        </div>
      </StandardPageLayout>
    );
  }

  return (
    <StandardPageLayout title="Биллинг и тарифы">
      <div className="space-y-16">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Выберите свой тариф
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Начните бесплатно и масштабируйтесь по мере роста ваших потребностей
          </p>
        </div>

        {/* Tariff Plans */}
        <section>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {tariffs.map((t) => (
              <TariffCard
                key={t.id}
                name={t.name}
                price={t.price}
                features={t.features}
                current={billingInfo?.tariff?.id === t.id}
                popular={t.popular}
                onSwitch={() => handleSwitchTariff(t.id)}
                loading={tariffLoading === t.id}
              />
            ))}
          </div>
        </section>

        {/* Payment Settings */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Настройки оплаты</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Способ оплаты</h3>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-gray-700 mb-3">
                      {billingInfo?.paymentMethod || 'Не задан'}
                    </p>
                    <button
                      onClick={handleUpdatePayMethod}
                      disabled={payMethodLoading}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {payMethodLoading && <Spinner size="h-4 w-4" className="mr-2" />}
                      {payMethodLoading ? 'Обновляем...' : 'Изменить способ оплаты'}
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Автопродление</h3>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoRenew}
                        onChange={handleToggleAutoRenew}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700">
                        Автоматически продлевать подписку каждый месяц
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Текущий тариф</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-2">
                    {billingInfo?.tariff?.name || 'Free'}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    Статус: <span className="font-semibold text-green-600">Активен</span>
                  </p>
                  <Link 
                    to="/account" 
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                  >
                    Управлять в настройках аккаунта
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment History */}
        <section className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">История платежей</h2>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Дата</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Сумма</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Статус</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Инвойс</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {history.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="text-gray-500 text-lg">Нет данных о платежах</p>
                      </td>
                    </tr>
                  ) : (
                    history.map((p) => <PaymentHistoryRow key={p.invoiceId} {...p} />)
                  )}
                </tbody>
              </table>
            </div>
            
            {history.length > 3 && (
              <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
                <Link 
                  to="/billing/history" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Посмотреть всю историю
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </StandardPageLayout>
  );
};

export default BillingPage;

// Управление тарифами и историей платежей