import React from 'react';
import SectionCard from './SectionCard';
import Spinner from '../../ui/Spinner';
import SuccessMessage from './SuccessMessage';

interface Props {
  passwordForm: { currentPassword: string; newPassword: string; confirmPassword: string };
  setPasswordForm: (v: { currentPassword: string; newPassword: string; confirmPassword: string }) => void;
  twoFactorEnabled: boolean;
  saving: { password: boolean; twoFactor: boolean };
  success?: string;
  error?: string;
  onChangePassword: (e: React.FormEvent<HTMLFormElement>) => void;
  onToggle2FA: () => void;
}

const SecuritySection: React.FC<Props> = ({
  passwordForm,
  setPasswordForm,
  twoFactorEnabled,
  saving,
  success,
  error,
  onChangePassword,
  onToggle2FA,
}) => {
  return (
    <SectionCard title="Безопасность" loading={saving.password || saving.twoFactor} error={error}>
      {success && <SuccessMessage message={success} />}
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-800 mb-4">Смена пароля</h4>
          <form onSubmit={onChangePassword}>
            <div className="space-y-4 max-w-md">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Текущий пароль
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  Новый пароль
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  minLength={8}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Подтвердите новый пароль
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={saving.password}
                aria-busy={saving.password}
                className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {saving.password && <Spinner size="h-4 w-4" className="mr-2" />}
                {saving.password ? 'Изменение...' : 'Изменить пароль'}
              </button>
            </div>
          </form>
        </div>
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Двухфакторная аутентификация (2FA)</h4>
          <p className="text-sm text-gray-600 mb-4">
            Статус:{' '}
            <span className={`font-semibold ${twoFactorEnabled ? 'text-green-600' : 'text-red-600'}`}>{
              twoFactorEnabled ? 'Включена' : 'Отключена'
            }</span>
          </p>
          <button
            onClick={onToggle2FA}
            disabled={saving.twoFactor}
            aria-busy={saving.twoFactor}
            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {saving.twoFactor && <Spinner size="h-4 w-4" className="mr-2" />}
            {saving.twoFactor ? 'Обновление...' : twoFactorEnabled ? 'Отключить 2FA' : 'Включить 2FA'}
          </button>
        </div>
      </div>
    </SectionCard>
  );
};

export default SecuritySection;
