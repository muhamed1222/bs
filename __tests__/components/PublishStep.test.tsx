import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PublishStep } from '../../components/portfolio/PublishStep';

describe('PublishStep Component', () => {
  const mockOnNext = jest.fn();
  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('рендерит кнопку публикации', () => {
    render(<PublishStep onNext={mockOnNext} onBack={mockOnBack} />);

    expect(screen.getByText(/опубликовать/i)).toBeInTheDocument();
  });

  test('показывает состояние загрузки при публикации', async () => {
    render(<PublishStep onNext={mockOnNext} onBack={mockOnBack} />);

    fireEvent.click(screen.getByText(/опубликовать/i));

    expect(screen.getByText(/публикация/i)).toBeInTheDocument();
    expect(screen.getByText(/подождите/i)).toBeInTheDocument();
  });

  test('показывает успешное сообщение после публикации', async () => {
    render(<PublishStep onNext={mockOnNext} onBack={mockOnBack} />);

    fireEvent.click(screen.getByText(/опубликовать/i));

    await waitFor(() => {
      expect(screen.getByText(/портфолио успешно опубликовано/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/https:\/\/basis\.io\/portfolio\/john-doe/i)).toBeInTheDocument();
  });

  test('вызывает onBack при нажатии на кнопку назад', () => {
    render(<PublishStep onNext={mockOnNext} onBack={mockOnBack} />);

    fireEvent.click(screen.getByText(/назад/i));

    expect(mockOnBack).toHaveBeenCalled();
  });
}); 