// Админ-панель
import React from 'react';
import StandardPageLayout from '../layouts/StandardPageLayout';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AdminSectionLink from '../components/admin/AdminSectionLink';

const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const isStaff = user?.role === 'staff' || user?.role === 'owner';

  if (!isStaff) {
    return (
      <StandardPageLayout title="Access Denied">
        <p>У вас нет прав для доступа к этой странице.</p>
        <Link
          to="/"
          className="text-indigo-600 hover:underline mt-4 inline-block"
        >
          Вернуться на главную
        </Link>
      </StandardPageLayout>
    );
  }

  return (
    <StandardPageLayout title="10. Admin Panel">
      <div className="space-y-6">
        <p className="text-sm text-gray-500">
          Добро пожаловать в административную панель. Здесь вы можете управлять
          платформой.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <AdminSectionLink
            to="/admin/users"
            title="Управление пользователями"
            description="Просмотр, редактирование и управление аккаунтами пользователей."
          />
          <AdminSectionLink
            to="/admin/pages"
            title="Управление страницами"
            description="Просмотр и управление всеми страницами, созданными на платформе."
          />
          <AdminSectionLink
            to="/admin/moderation"
            title="Модерация публичных страниц"
            description="Проверка и модерация контента на публичных страницах."
          />
          <AdminSectionLink
            to="/admin/stats"
            title="Статистика по платформе"
            description="Обзор ключевых метрик использования платформы."
          />
          <AdminSectionLink
            to="/admin/logs"
            title="Просмотр логов"
            description="Доступ к системным логам и логам ошибок."
          />
          <AdminSectionLink
            to="/admin/security"
            title="Метрики безопасности"
            description="Мониторинг безопасности и инцидентов."
          />
          <AdminSectionLink
            to="/admin/settings"
            title="Настройки платформы"
            description="Глобальные настройки и конфигурация."
          />
        </div>
      </div>
    </StandardPageLayout>
  );
};

export default AdminPage;

// Панель администратора для служебных разделов
