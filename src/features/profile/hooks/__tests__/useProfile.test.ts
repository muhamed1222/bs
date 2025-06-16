import { renderHook, act } from '@testing-library/react-hooks';
import { useProfile } from '../useProfile';
import { Profile } from '@/shared/types';

// Мокаем API
jest.mock('@/shared/api/client', () => ({
  api: {
    profiles: {
      update: jest.fn().mockResolvedValue({}),
      publish: jest.fn().mockResolvedValue({}),
      unpublish: jest.fn().mockResolvedValue({}),
    },
  },
}));

describe('useProfile', () => {
  const mockInitialProfile: Profile = {
    id: '1',
    userId: 'user1',
    title: 'Test Profile',
    description: 'Test Description',
    slug: 'test-profile',
    coverImage: 'test.jpg',
    isPublished: false,
    blocks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    theme: 'light',
    layout: 'grid',
  };

  const mockOnProfileChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('инициализируется с начальным профилем', () => {
    const { result } = renderHook(() =>
      useProfile({ initialProfile: mockInitialProfile })
    );

    expect(result.current.profile).toEqual(mockInitialProfile);
  });

  it('обновляет профиль', async () => {
    const { result } = renderHook(() =>
      useProfile({
        initialProfile: mockInitialProfile,
        onProfileChange: mockOnProfileChange,
      })
    );

    const updatedProfile = {
      ...mockInitialProfile,
      title: 'Updated Title',
    };

    await act(async () => {
      await result.current.updateProfile(updatedProfile);
    });

    expect(result.current.profile).toEqual(updatedProfile);
    expect(mockOnProfileChange).toHaveBeenCalledWith(updatedProfile);
  });

  it('публикует профиль', async () => {
    const { result } = renderHook(() =>
      useProfile({
        initialProfile: mockInitialProfile,
        onProfileChange: mockOnProfileChange,
      })
    );

    await act(async () => {
      await result.current.publishProfile();
    });

    expect(result.current.profile?.isPublished).toBe(true);
  });

  it('снимает с публикации', async () => {
    const publishedProfile = {
      ...mockInitialProfile,
      isPublished: true,
    };

    const { result } = renderHook(() =>
      useProfile({
        initialProfile: publishedProfile,
        onProfileChange: mockOnProfileChange,
      })
    );

    await act(async () => {
      await result.current.unpublishProfile();
    });

    expect(result.current.profile?.isPublished).toBe(false);
  });

  it('обрабатывает ошибки при обновлении', async () => {
    const mockError = new Error('Update failed');
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() =>
      useProfile({
        initialProfile: mockInitialProfile,
        onProfileChange: mockOnProfileChange,
      })
    );

    await act(async () => {
      await result.current.updateProfile(mockInitialProfile);
    });

    expect(result.current.error).toBeTruthy();
  });
}); 