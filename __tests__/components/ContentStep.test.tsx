import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContentStep } from '../../components/portfolio/ContentStep';

describe('ContentStep Component', () => {
  const mockOnNext = jest.fn();
  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('рендерит все необходимые поля формы', () => {
    render(<ContentStep onNext={mockOnNext} onBack={mockOnBack} />);

    expect(screen.getByLabelText(/имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/должность/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/о себе/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/телефон/i)).toBeInTheDocument();
  });

  test('вызывает onNext с данными формы при отправке', () => {
    render(<ContentStep onNext={mockOnNext} onBack={mockOnBack} />);

    fireEvent.change(screen.getByLabelText(/имя/i), {
      target: { value: 'Иван Иванов' },
    });
    fireEvent.change(screen.getByLabelText(/должность/i), {
      target: { value: 'Разработчик' },
    });

    fireEvent.click(screen.getByText(/продолжить/i));

    expect(mockOnNext).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Иван Иванов',
        title: 'Разработчик',
      })
    );
  });

  test('вызывает onBack при нажатии на кнопку назад', () => {
    render(<ContentStep onNext={mockOnNext} onBack={mockOnBack} />);

    fireEvent.click(screen.getByText(/назад/i));

    expect(mockOnBack).toHaveBeenCalled();
  });
}); 