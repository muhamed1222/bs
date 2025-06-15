import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StandardPageLayout from '../layouts/StandardPageLayout';
import useAuth from '../hooks/useAuth';
import useNotification from '../hooks/useNotification';
import LoadingSpinner from '../components/account/LoadingSpinner';
import ErrorMessage from '../components/account/ErrorMessage';
import SuccessMessage from '../components/account/SuccessMessage';
import BasicInfoSection from '../components/account/BasicInfoSection';
import SecuritySection from '../components/account/SecuritySection';
import SubscriptionSection from '../components/account/SubscriptionSection';
import ActivityHistorySection from '../components/account/ActivityHistorySection';
import ApiIntegrationsSection from '../components/account/ApiIntegrationsSection';

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  socialProfile?: string;
  twoFactorEnabled: boolean;
  subscription: {
    plan: string;
    status: string;
  };
}

interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
  ip?: string;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed?: string;
}

const AccountSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading, updateUser } = useAuth();
  const { showNotification } = useNotification();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [success, setSuccess] = useState<Record<string, string>>({});

  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    socialProfile: '',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const [userResponse, activityResponse, apiKeysResponse] = await Promise.all([
        fetch('/api/user/profile'),
        fetch('/api/user/activity'),
        fetch('/api/user/api-keys'),
      ]);

      if (!userResponse.ok) throw new Error('Ошибка загрузки профиля');
      if (!activityResponse.ok) throw new Error('Ошибка загрузки активности');
      if (!apiKeysResponse.ok) throw new Error('Ошибка загрузки API ключей');

      const userData = await userResponse.json();
      const activityData = await activityResponse.json();
      const apiKeysData = await apiKeysResponse.json();

      setUserData(userData);
      setActivityLogs(activityData.logs || []);
      setApiKeys(apiKeysData.keys || []);

      setProfileForm({
        name: userData.name || '',
        email: userData.email || '',
        socialProfile: userData.socialProfile || '',
      });
    } catch (error) {
      console.error('Error loading user data:', error);
      setErrors({ general: 'Ошибка загрузки данных. Попробуйте обновить страницу.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving({ ...saving, profile: true });
    setErrors({ ...errors, profile: '' });
    setSuccess({ ...success, profile: '' });

    try {
      if (!profileForm.name.trim()) {
        throw new Error('Имя не может быть пустым');
      }
      if (!profileForm.email.includes('@')) {
        throw new Error('Некорректный email адрес');
      }

      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка сохранения');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      await updateUser?.(updatedUser);

      setSuccess({ ...success, profile: 'Профиль успешно обновлен!' });
      showNotification('Профиль обновлен', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ошибка сохранения';
      setErrors({ ...errors, profile: message });
      showNotification(message, 'error');
    } finally {
      setSaving({ ...saving, profile: false });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving({ ...saving, password: true });
    setErrors({ ...errors, password: '' });
    setSuccess({ ...success, password: '' });

    try {
      if (passwordForm.newPassword.length < 8) {
        throw new Error('Пароль должен содержать минимум 8 символов');
      }
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        throw new Error('Пароли не совпадают');
      }

      const response = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка смены пароля');
      }

      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSuccess({ ...success, password: 'Пароль успешно изменен!' });
      showNotification('Пароль изменен', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ошибка смены пароля';
      setErrors({ ...errors, password: message });
      showNotification(message, 'error');
    } finally {
      setSaving({ ...saving, password: false });
    }
  };

  const handleAvatarUpload = async (file: File) => {
    setSaving({ ...saving, avatar: true });
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch('/api/user/avatar', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Ошибка загрузки аватара');

      const result = await response.json();
      setUserData((prev) => (prev ? { ...prev, avatar: result.avatarUrl } : null));
      showNotification('Аватар обновлен', 'success');
    } catch (error) {
      showNotification('Ошибка загрузки аватара', 'error');
    } finally {
      setSaving({ ...saving, avatar: false });
    }
  };

  const toggle2FA = async () => {
    setSaving({ ...saving, twoFactor: true });
    try {
      const response = await fetch('/api/user/2fa/toggle', {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Ошибка настройки 2FA');

      const result = await response.json();
      setUserData((prev) => (prev ? { ...prev, twoFactorEnabled: result.enabled } : null));
      showNotification(result.enabled ? '2FA включена' : '2FA отключена', 'success');
    } catch (error) {
      showNotification('Ошибка настройки 2FA', 'error');
    } finally {
      setSaving({ ...saving, twoFactor: false });
    }
  };

  const generateApiKey = async () => {
    setSaving({ ...saving, apiKey: true });
    try {
      const response = await fetch('/api/user/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `Key ${Date.now()}` }),
      });

      if (!response.ok) throw new Error('Ошибка генерации API ключа');

      const newKey = await response.json();
      setApiKeys((prev) => [...prev, newKey]);
      showNotification('API ключ создан', 'success');
    } catch (error) {
      showNotification('Ошибка создания API ключа', 'error');
    } finally {
      setSaving({ ...saving, apiKey: false });
    }
  };

  if (authLoading || loading) {
    return (
      <StandardPageLayout title="Настройки аккаунта">
        <LoadingSpinner />
      </StandardPageLayout>
    );
  }

  if (!isAuthenticated || !userData) {
    return (
      <StandardPageLayout title="Доступ запрещен">
        <ErrorMessage message="Необходимо войти в систему для доступа к настройкам аккаунта" />
      </StandardPageLayout>
    );
  }

  return (
    <StandardPageLayout title="Настройки аккаунта">
      <div className="max-w-4xl mx-auto space-y-8">
        <BasicInfoSection
          profileForm={profileForm}
          setProfileForm={(v) => setProfileForm(v)}
          userAvatar={userData.avatar}
          saving={{ profile: saving.profile, avatar: saving.avatar }}
          success={success.profile}
          error={errors.profile}
          onSave={handleSaveProfile}
          onAvatarUpload={handleAvatarUpload}
        />
        <SecuritySection
          passwordForm={passwordForm}
          setPasswordForm={(v) => setPasswordForm(v)}
          twoFactorEnabled={userData.twoFactorEnabled}
          saving={{ password: saving.password, twoFactor: saving.twoFactor }}
          success={success.password}
          error={errors.password}
          onChangePassword={handleChangePassword}
          onToggle2FA={toggle2FA}
        />
        <SubscriptionSection
          plan={userData.subscription.plan}
          status={userData.subscription.status}
          onManage={() => navigate('/billing')}
        />
        <ActivityHistorySection
          logs={activityLogs}
          onViewAll={() => navigate('/account/activity')}
        />
        <ApiIntegrationsSection
          apiKeys={apiKeys}
          onRemove={(id) => setApiKeys((prev) => prev.filter((k) => k.id !== id))}
          onGenerate={generateApiKey}
          generating={saving.apiKey}
        />
      </div>
    </StandardPageLayout>
  );
};

export default AccountSettingsPage;

// Страница управления учётной записью и безопасностью
