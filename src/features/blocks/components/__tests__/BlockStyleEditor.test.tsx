import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BlockStyleEditor } from '../BlockStyleEditor';
import { BlockStyle } from '@/shared/types';

describe('BlockStyleEditor', () => {
  const mockStyle: BlockStyle = {
    backgroundColor: '#f0f0f0',
    textColor: '#333',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px',
  };

  it('рендерит все поля стилей', () => {
    const onChange = jest.fn();
    render(<BlockStyleEditor style={mockStyle} onChange={onChange} />);

    expect(screen.getByLabelText(/цвет фона/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/цвет текста/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/скругление/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/отступы/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/внешние отступы/i)).toBeInTheDocument();
  });

  it('вызывает onChange при изменении цвета фона', () => {
    const onChange = jest.fn();
    render(<BlockStyleEditor style={mockStyle} onChange={onChange} />);

    const input = screen.getByLabelText(/цвет фона/i);
    fireEvent.change(input, { target: { value: '#ffffff' } });

    expect(onChange).toHaveBeenCalledWith({
      ...mockStyle,
      backgroundColor: '#ffffff',
    });
  });

  it('вызывает onChange при изменении цвета текста', () => {
    const onChange = jest.fn();
    render(<BlockStyleEditor style={mockStyle} onChange={onChange} />);

    const input = screen.getByLabelText(/цвет текста/i);
    fireEvent.change(input, { target: { value: '#000000' } });

    expect(onChange).toHaveBeenCalledWith({
      ...mockStyle,
      textColor: '#000000',
    });
  });

  it('вызывает onChange при изменении скругления', () => {
    const onChange = jest.fn();
    render(<BlockStyleEditor style={mockStyle} onChange={onChange} />);

    const input = screen.getByLabelText(/скругление/i);
    fireEvent.change(input, { target: { value: '4px' } });

    expect(onChange).toHaveBeenCalledWith({
      ...mockStyle,
      borderRadius: '4px',
    });
  });

  it('вызывает onChange при изменении отступов', () => {
    const onChange = jest.fn();
    render(<BlockStyleEditor style={mockStyle} onChange={onChange} />);

    const input = screen.getByLabelText(/отступы/i);
    fireEvent.change(input, { target: { value: '8px' } });

    expect(onChange).toHaveBeenCalledWith({
      ...mockStyle,
      padding: '8px',
    });
  });

  it('вызывает onChange при изменении внешних отступов', () => {
    const onChange = jest.fn();
    render(<BlockStyleEditor style={mockStyle} onChange={onChange} />);

    const input = screen.getByLabelText(/внешние отступы/i);
    fireEvent.change(input, { target: { value: '4px' } });

    expect(onChange).toHaveBeenCalledWith({
      ...mockStyle,
      margin: '4px',
    });
  });

  it('использует значения по умолчанию, если стили не предоставлены', () => {
    const onChange = jest.fn();
    render(<BlockStyleEditor style={{}} onChange={onChange} />);

    expect(screen.getByLabelText(/цвет фона/i)).toHaveValue('#ffffff');
    expect(screen.getByLabelText(/цвет текста/i)).toHaveValue('#000000');
    expect(screen.getByLabelText(/скругление/i)).toHaveValue('0px');
    expect(screen.getByLabelText(/отступы/i)).toHaveValue('0px');
    expect(screen.getByLabelText(/внешние отступы/i)).toHaveValue('0px');
  });
}); 