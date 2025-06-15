import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, unstable_usePrompt } from 'react-router-dom';
import StandardPageLayout from '../layouts/StandardPageLayout';
import { ProfileEditor } from '../components/ProfileEditor';
import useAuth from '../hooks/useAuth';
import { useToast } from '../components/ToastProvider';
import LoadingSpinner from '../components/account/LoadingSpinner';
import ErrorMessage from '../components/account/ErrorMessage';

const ProfileEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, error, isAuthenticated, refreshUser } = useAuth();
  const { showSuccess, showError } = useToast();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [editorKey, setEditorKey] = useState(0);

  unstable_usePrompt({
    when: hasUnsavedChanges,
    message: 'У вас есть несохраненные изменения. Покинуть страницу?',
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', {
        state: { from: location.pathname },
        replace: true,
      });
    }
  }, [loading, isAuthenticated, navigate, location]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue =
          'У вас есть несохраненные изменения. Вы уверены, что хотите покинуть страницу?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleRetry = () => {
    refreshUser?.();
  };

  const handleReset = () => {
    setEditorKey(k => k + 1);
    setHasUnsavedChanges(false);
    showSuccess('Изменения отменены');
  };

  if (loading) {
    return (
      <StandardPageLayout
        title="Редактирование профиля"
        description="Настройте свой профиль и персональную информацию"
      >
        <LoadingSpinner />
      </StandardPageLayout>
    );
  }

  if (error) {
    return (
      <StandardPageLayout
        title="Ошибка загрузки профиля"
        description="Произошла ошибка при загрузке данных профиля"
      >
        <ErrorMessage
          message="Не удалось загрузить данные профиля. Проверьте подключение к интернету и попробуйте снова."
          onRetry={handleRetry}
        />
      </StandardPageLayout>
    );
  }

  if (!user || !isAuthenticated) {
    return (
      <StandardPageLayout
        title="Доступ запрещен"
        description="Необходима авторизация для доступа к этой странице"
      >
        <ErrorMessage message="Для редактирования профиля необходимо войти в систему." />
      </StandardPageLayout>
    );
  }

  return (
    <StandardPageLayout
      title="Редактирование профиля"
      description="Настройте свой профиль и персональную информацию"
      breadcrumbs={[
        { label: 'Главная', href: '/' },
        { label: 'Профиль', href: '/profile' },
        { label: 'Редактирование', href: '/profile/edit' },
      ]}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Редактирование профиля</h1>
          <p className="text-gray-600">Обновите свои личные данные и настройки аккаунта</p>
        </div>

        {hasUnsavedChanges && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">⚠️</span>
              <span className="text-sm text-yellow-700">У вас есть несохраненные изменения</span>
            </div>
            <button
              onClick={handleReset}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            >
              Отменить
            </button>
          </div>
        )}

        <ProfileEditor
          key={editorKey}
          userId={user.id}
          onUnsavedChanges={setHasUnsavedChanges}
          onSaveSuccess={() => {
            setHasUnsavedChanges(false);
            showSuccess('Профиль сохранён');
          }}
          onError={err => {
            showError('Ошибка при сохранении');
            console.error('Profile editor error:', err);
          }}
        />
      </div>
    </StandardPageLayout>
  );
};

export default ProfileEditorPage;

// Страница редактирования профиля с автосохранением
