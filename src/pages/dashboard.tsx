import React from 'react';
import { Navigation } from '@/shared/components/Navigation';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { useRouter } from 'next/router';
import { Button } from '@/shared/ui/Button';

export default function DashboardPage() {
  const router = useRouter();
  const { profile, publishProfile, unpublishProfile } = useProfile();

  const handleEdit = () => {
    router.push('/editor');
  };

  const handlePublish = async () => {
    try {
      if (profile?.isPublished) {
        await unpublishProfile();
      } else {
        await publishProfile();
      }
    } catch (error) {
      console.error('Ошибка при публикации:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <main className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  Дашборд
                </h2>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4">
                <Button
                  variant="secondary"
                  onClick={handleEdit}
                >
                  Редактировать
                </Button>
                <Button
                  variant="primary"
                  className="ml-3"
                  onClick={handlePublish}
                >
                  {profile?.isPublished ? 'Снять с публикации' : 'Опубликовать'}
                </Button>
              </div>
            </div>

            {profile && (
              <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Информация о профиле
                  </h3>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Название
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {profile.title}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Описание
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {profile.description || 'Нет описания'}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Статус
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {profile.isPublished ? 'Опубликован' : 'Черновик'}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Количество блоков
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {profile.blocks.length}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 