import { useState, useCallback } from 'react';
import { Profile } from '@/shared/types';

interface UseProfileProps {
  initialProfile?: Profile;
  onProfileChange?: (profile: Profile) => void;
}

export const useProfile = ({ initialProfile, onProfileChange }: UseProfileProps = {}) => {
  const [profile, setProfile] = useState<Profile | null>(initialProfile || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = useCallback(async (updatedProfile: Profile) => {
    try {
      setIsLoading(true);
      setError(null);

      // Здесь будет API-запрос для обновления профиля
      // const response = await api.updateProfile(updatedProfile);
      
      setProfile(updatedProfile);
      onProfileChange?.(updatedProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при обновлении профиля');
    } finally {
      setIsLoading(false);
    }
  }, [onProfileChange]);

  const publishProfile = useCallback(async () => {
    if (!profile) return;

    try {
      setIsLoading(true);
      setError(null);

      // Здесь будет API-запрос для публикации профиля
      // const response = await api.publishProfile(profile.id);
      
      setProfile({
        ...profile,
        isPublished: true,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при публикации профиля');
    } finally {
      setIsLoading(false);
    }
  }, [profile]);

  const unpublishProfile = useCallback(async () => {
    if (!profile) return;

    try {
      setIsLoading(true);
      setError(null);

      // Здесь будет API-запрос для снятия с публикации
      // const response = await api.unpublishProfile(profile.id);
      
      setProfile({
        ...profile,
        isPublished: false,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при снятии с публикации');
    } finally {
      setIsLoading(false);
    }
  }, [profile]);

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    publishProfile,
    unpublishProfile,
  };
}; 