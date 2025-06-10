import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PublishProfileButton } from '../components/PublishProfileButton';

const mockCheck = vi.fn();
const mockPublish = vi.fn();
const mockSuccess = vi.fn();
const mockError = vi.fn();

vi.mock('../services/profile', () => ({
  checkSlugUnique: (...args: unknown[]) => mockCheck(...args),
  publishProfile: (...args: unknown[]) => mockPublish(...args),
}));
vi.mock('../components/ToastProvider', () => ({
  useToast: () => ({ showSuccess: mockSuccess, showError: mockError }),
}));

beforeEach(() => {
  vi.restoreAllMocks();
  mockCheck.mockReset();
  mockPublish.mockReset();
  mockSuccess.mockReset();
  mockError.mockReset();
  vi.spyOn(window, 'confirm').mockReturnValue(true);
});

describe('PublishProfileButton', () => {
  it('publishes when slug is free', async () => {
    mockCheck.mockResolvedValue(true);
    mockPublish.mockResolvedValue(undefined);
    const { getByRole } = render(<PublishProfileButton slug="abc" data={{}} />);
    fireEvent.click(getByRole('button', { name: /опубликовать профиль/i }));
    await waitFor(() => expect(mockPublish).toHaveBeenCalled());
    expect(mockSuccess).toHaveBeenCalled();
  });

  it('shows error when slug taken', async () => {
    mockCheck.mockResolvedValue(false);
    const { getByRole } = render(<PublishProfileButton slug="abc" data={{}} />);
    fireEvent.click(getByRole('button', { name: /опубликовать профиль/i }));
    await waitFor(() => expect(mockError).toHaveBeenCalledWith('Слаг занят'));
  });
});
