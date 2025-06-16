import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BlockCreator } from '../BlockCreator';
import { Block } from '@/shared/types';

describe('BlockCreator', () => {
  it('рендерит кнопку создания блока', () => {
    const onCreate = jest.fn();
    render(<BlockCreator onCreate={onCreate} />);

    expect(screen.getByRole('button', { name: /добавить блок/i })).toBeInTheDocument();
  });

  it('отображает меню выбора типа блока при клике на кнопку', () => {
    const onCreate = jest.fn();
    render(<BlockCreator onCreate={onCreate} />);

    const button = screen.getByRole('button', { name: /добавить блок/i });
    fireEvent.click(button);

    expect(screen.getByText(/текстовый блок/i)).toBeInTheDocument();
    expect(screen.getByText(/ссылка/i)).toBeInTheDocument();
    expect(screen.getByText(/изображение/i)).toBeInTheDocument();
  });

  it('вызывает onCreate с новым текстовым блоком', () => {
    const onCreate = jest.fn();
    render(<BlockCreator onCreate={onCreate} />);

    const button = screen.getByRole('button', { name: /добавить блок/i });
    fireEvent.click(button);

    const textBlockButton = screen.getByText(/текстовый блок/i);
    fireEvent.click(textBlockButton);

    expect(onCreate).toHaveBeenCalledWith(expect.objectContaining({
      type: 'text',
      content: { text: '' },
    }));
  });

  it('вызывает onCreate с новой ссылкой', () => {
    const onCreate = jest.fn();
    render(<BlockCreator onCreate={onCreate} />);

    const button = screen.getByRole('button', { name: /добавить блок/i });
    fireEvent.click(button);

    const linkButton = screen.getByText(/ссылка/i);
    fireEvent.click(linkButton);

    expect(onCreate).toHaveBeenCalledWith(expect.objectContaining({
      type: 'link',
      content: { url: '', text: '' },
    }));
  });

  it('вызывает onCreate с новым изображением', () => {
    const onCreate = jest.fn();
    render(<BlockCreator onCreate={onCreate} />);

    const button = screen.getByRole('button', { name: /добавить блок/i });
    fireEvent.click(button);

    const imageButton = screen.getByText(/изображение/i);
    fireEvent.click(imageButton);

    expect(onCreate).toHaveBeenCalledWith(expect.objectContaining({
      type: 'image',
      content: { url: '', alt: '' },
    }));
  });

  it('закрывает меню после выбора типа блока', () => {
    const onCreate = jest.fn();
    render(<BlockCreator onCreate={onCreate} />);

    const button = screen.getByRole('button', { name: /добавить блок/i });
    fireEvent.click(button);

    const textBlockButton = screen.getByText(/текстовый блок/i);
    fireEvent.click(textBlockButton);

    expect(screen.queryByText(/текстовый блок/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ссылка/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/изображение/i)).not.toBeInTheDocument();
  });

  it('закрывает меню при клике вне его', () => {
    const onCreate = jest.fn();
    render(<BlockCreator onCreate={onCreate} />);

    const button = screen.getByRole('button', { name: /добавить блок/i });
    fireEvent.click(button);

    fireEvent.mouseDown(document.body);

    expect(screen.queryByText(/текстовый блок/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ссылка/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/изображение/i)).not.toBeInTheDocument();
  });
}); 