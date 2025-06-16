import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomizeStep } from '../../components/portfolio/CustomizeStep';

describe('CustomizeStep Component', () => {
  const mockOnNext = jest.fn();
  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('рендерит все настройки кастомизации', () => {
    render(<CustomizeStep onNext={mockOnNext} onBack={mockOnBack} />);

    expect(screen.getByText(/цветовая схема/i)).toBeInTheDocument();
    expect(screen.getByText(/шрифт/i)).toBeInTheDocument();
    expect(screen.getByText(/отступы/i)).toBeInTheDocument();
    expect(screen.getByText(/анимации/i)).toBeInTheDocument();
  });

  test('вызывает onNext с выбранными настройками', () => {
    render(<CustomizeStep onNext={mockOnNext} onBack={mockOnBack} />);

    // Выбираем цветовую схему
    fireEvent.click(screen.getByText(/тёмная/i));

    // Выбираем шрифт
    fireEvent.click(screen.getByText(/inter/i));

    // Выбираем отступы
    fireEvent.click(screen.getByText(/compact/i));

    // Включаем анимации
    fireEvent.click(screen.getByLabelText(/включить анимации/i));

    fireEvent.click(screen.getByText(/продолжить/i));

    expect(mockOnNext).toHaveBeenCalledWith(
      expect.objectContaining({
        colorScheme: 'dark',
        font: 'inter',
        spacing: 'compact',
        animations: true,
      })
    );
  });

  test('вызывает onBack при нажатии на кнопку назад', () => {
    render(<CustomizeStep onNext={mockOnNext} onBack={mockOnBack} />);

    fireEvent.click(screen.getByText(/назад/i));

    expect(mockOnBack).toHaveBeenCalled();
  });
}); 