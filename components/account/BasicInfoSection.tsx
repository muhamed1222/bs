import React from 'react';
import SectionCard from './SectionCard';
import Spinner from '../../ui/Spinner';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';

interface Props {
  profileForm: { name: string; email: string; socialProfile: string };
  setProfileForm: (v: { name: string; email: string; socialProfile: string }) => void;
  userAvatar?: string;
  saving: { profile: boolean; avatar: boolean };
  success?: string;
  error?: string;
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
  onAvatarUpload: (file: File) => void;
}

const BasicInfoSection: React.FC<Props> = ({
  profileForm,
  setProfileForm,
  userAvatar,
  saving,
  success,
  error,
  onSave,
  onAvatarUpload,
}) => {
  return (
    <SectionCard title="Основная информация" loading={saving.profile} error={error}>
      {success && <SuccessMessage message={success} />}
      <form onSubmit={onSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Имя *
              </label>
              <input
                type="text"
                id="name"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="socialProfile" className="block text-sm font-medium text-gray-700">
                Профиль в соцсети
              </label>
              <input
                type="url"
                id="socialProfile"
                value={profileForm.socialProfile}
                onChange={(e) => setProfileForm({ ...profileForm, socialProfile: e.target.value })}
                placeholder="https://linkedin.com/in/username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              disabled={saving.profile}
              aria-busy={saving.profile}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {saving.profile && <Spinner size="h-4 w-4" className="mr-2" />}
              {saving.profile ? 'Сохранение...' : 'Сохранить изменения'}
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Аватар</label>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 overflow-hidden">
                  {userAvatar ? (
                    <img src={userAvatar} alt="Аватар пользователя" className="w-full h-full object-cover" />
                  ) : (
                    'Фото'
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onAvatarUpload(file);
                    }}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label htmlFor="avatar-upload" className="cursor-pointer text-sm text-indigo-600 hover:underline flex items-center">
                    {saving.avatar && <Spinner size="h-4 w-4" className="mr-1" />}
                    {saving.avatar ? 'Загрузка...' : 'Загрузить новый'}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </SectionCard>
  );
};

export default BasicInfoSection;
