// Страница авторизации
import React from 'react';
import StandardPageLayout from '../layouts/StandardPageLayout';
import AuthForm from '../components/auth/AuthForm';

const AuthPage: React.FC = () => (
  <StandardPageLayout title="Аутентификация">
    <AuthForm />
  </StandardPageLayout>
);

export default AuthPage;

// Страница входа, регистрации и восстановления пароля
