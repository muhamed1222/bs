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
import TariffCard from '../components/billing/TariffCard';
import PaymentHistoryRow from '../components/billing/PaymentHistoryRow';


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
      <StandardPageLayout title="Биллинг">
        <div className="flex items-center justify-center py-16">
          <span className="text-lg text-gray-500">Загрузка...</span>
        </div>
      </StandardPageLayout>
    );
  }

  return (
    <StandardPageLayout title="Биллинг и тарифы">
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Тарифные планы</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Настройки оплаты</h2>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-700">Способ оплаты</h4>
              <p className="text-sm text-gray-600">
                {billingInfo?.paymentMethod || 'Не задан'}
              </p>
              <button
                className="text-sm text-indigo-600 hover:underline mt-1 flex items-center"
                disabled={payMethodLoading}
                onClick={handleUpdatePayMethod}
                aria-busy={payMethodLoading}
              >
                {payMethodLoading && <Spinner size="h-4 w-4" className="mr-1" />}
                {payMethodLoading ? 'Обновляем...' : 'Изменить способ оплаты'}
              </button>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Автопродление подписки</h4>
              <div className="flex items-center mt-1">
                <input
                  type="checkbox"
                  id="auto_renew"
                  checked={autoRenew}
                  onChange={handleToggleAutoRenew}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  aria-checked={autoRenew}
                />
                <label htmlFor="auto_renew" className="ml-2 block text-sm text-gray-700">
                  Автоматически продлевать подписку каждый месяц
                </label>
              </div>
            </div>
            <Link to="/account" className="text-sm text-gray-500 hover:underline">
              Управлять подпиской в настройках аккаунта
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">История платежей</h2>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Сумма</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Инвойс</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {history.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-400">Нет данных о платежах</td>
                  </tr>
                ) : (
                  history.map((p) => <PaymentHistoryRow key={p.invoiceId} {...p} />)
                )}
              </tbody>
            </table>
          </div>
          {history.length > 3 && (
            <p className="text-sm text-gray-500 mt-4">
              Показаны последние 3 платежа.{" "}
              <Link to="/billing/history" className="text-indigo-600 hover:underline">
                Посмотреть всю историю
              </Link>
              .
            </p>
          )}
        </section>
      </div>
    </StandardPageLayout>
  );
};

export default BillingPage;

// Управление тарифами и историей платежей
