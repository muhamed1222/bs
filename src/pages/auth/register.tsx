import React from 'react';
import { Navigation } from '@/shared/components/Navigation';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/dashboard');
  };

  const handleError = (error: string) => {
    // Здесь можно добавить отображение ошибки
    console.error(error);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Регистрация
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Или{' '}
            <Link
              href="/auth/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              войдите, если у вас уже есть аккаунт
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <RegisterForm
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 