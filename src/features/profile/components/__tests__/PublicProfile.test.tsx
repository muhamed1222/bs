import React from 'react';
import { render, screen } from '@testing-library/react';
import { PublicProfile } from '../PublicProfile';
import { Profile } from '@/shared/types';

const mockProfile: Profile = {
  id: '1',
  userId: 'user1',
  title: 'Test Profile',
  description: 'Test Description',
  slug: 'test-profile',
  coverImage: 'test.jpg',
  isPublished: true,
  blocks: [
    {
      id: '1',
      type: 'text',
      content: { text: 'Test text block' },
      order: 0,
    },
    {
      id: '2',
      type: 'link',
      content: { url: 'https://example.com', text: 'Test link' },
      order: 1,
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
  theme: 'light',
  layout: 'grid',
};

describe('PublicProfile', () => {
  it('рендерит профиль с заголовком и описанием', () => {
    render(<PublicProfile profile={mockProfile} />);

    expect(screen.getByText(mockProfile.title)).toBeInTheDocument();
    expect(screen.getByText(mockProfile.description!)).toBeInTheDocument();
  });

  it('рендерит блоки в правильном порядке', () => {
    render(<PublicProfile profile={mockProfile} />);

    const blocks = screen.getAllByTestId('block');
    expect(blocks).toHaveLength(2);
    expect(blocks[0]).toHaveTextContent('Test text block');
    expect(blocks[1]).toHaveTextContent('Test link');
  });

  it('применяет тему оформления', () => {
    render(<PublicProfile profile={mockProfile} />);

    const container = screen.getByTestId('profile-container');
    expect(container).toHaveClass('theme-light');
  });

  it('применяет макет', () => {
    render(<PublicProfile profile={mockProfile} />);

    const container = screen.getByTestId('profile-container');
    expect(container).toHaveClass('layout-grid');
  });

  it('отображает обложку профиля', () => {
    render(<PublicProfile profile={mockProfile} />);

    const coverImage = screen.getByTestId('cover-image');
    expect(coverImage).toHaveAttribute('src', mockProfile.coverImage);
  });

  it('обрабатывает отсутствие описания', () => {
    const profileWithoutDescription = {
      ...mockProfile,
      description: undefined,
    };

    render(<PublicProfile profile={profileWithoutDescription} />);

    expect(screen.queryByTestId('profile-description')).not.toBeInTheDocument();
  });

  it('обрабатывает отсутствие обложки', () => {
    const profileWithoutCover = {
      ...mockProfile,
      coverImage: undefined,
    };

    render(<PublicProfile profile={profileWithoutCover} />);

    expect(screen.queryByTestId('cover-image')).not.toBeInTheDocument();
  });
}); 