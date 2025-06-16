import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProfileEditor } from '../ProfileEditor';
import { Profile } from '@/shared/types';

// Мокаем хуки
jest.mock('../../hooks/useProfile', () => ({
  useProfile: () => ({
    profile: mockProfile,
    updateProfile: jest.fn().mockResolvedValue(undefined),
    error: null,
  }),
}));

jest.mock('@/features/blocks/hooks/useBlocks', () => ({
  useBlocks: () => ({
    blocks: [],
    addBlock: jest.fn(),
    updateBlock: jest.fn(),
    deleteBlock: jest.fn(),
    reorderBlocks: jest.fn(),
  }),
}));

const mockProfile: Profile = {
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

describe('ProfileEditor', () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('рендерит форму редактирования профиля', () => {
    render(
      <ProfileEditor
        profile={mockProfile}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByLabelText(/заголовок/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/описание/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/обложка/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/тема/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/макет/i)).toBeInTheDocument();
  });

  it('вызывает onSave при сохранении', async () => {
    render(
      <ProfileEditor
        profile={mockProfile}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.change(screen.getByLabelText(/заголовок/i), {
      target: { value: 'Updated Title' },
    });

    fireEvent.click(screen.getByRole('button', { name: /сохранить/i }));

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalled();
    });
  });

  it('вызывает onCancel при отмене', () => {
    render(
      <ProfileEditor
        profile={mockProfile}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /отмена/i }));

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('отображает ошибку при неудачном сохранении', async () => {
    const mockError = new Error('Save failed');
    jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ProfileEditor
        profile={mockProfile}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.change(screen.getByLabelText(/заголовок/i), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByRole('button', { name: /сохранить/i }));

    await waitFor(() => {
      expect(screen.getByText(/ошибка/i)).toBeInTheDocument();
    });
  });
}); 