import React from 'react';
import { Navigation } from '@/shared/components/Navigation';
import { ProfileEditor } from '@/features/profile/components/ProfileEditor';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { useRouter } from 'next/router';
import { Profile } from '@/shared/types';

export default function EditorPage() {
  const router = useRouter();
  const { profile, updateProfile, publishProfile, unpublishProfile } = useProfile();

  const handleSave = async (updatedProfile: Profile) => {
    try {
      await updateProfile(updatedProfile);
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
    }
  };

  const handleCancel = () => {
    router.push('/dashboard');
  };

  if (!profile) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Загрузка профиля...
                </h2>
              </div>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <main className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProfileEditor
              profile={profile}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 