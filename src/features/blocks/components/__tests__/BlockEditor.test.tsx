import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BlockEditor } from '../BlockEditor';
import { Block } from '@/shared/types';

describe('BlockEditor', () => {
  const mockBlock: Block = {
    id: '1',
    type: 'text',
    content: { text: 'Test text block' },
    order: 0,
  };

  it('рендерит форму редактирования текстового блока', () => {
    const onSave = jest.fn();
    render(<BlockEditor block={mockBlock} onSave={onSave} />);

    expect(screen.getByLabelText(/текст/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /сохранить/i })).toBeInTheDocument();
  });

  it('рендерит форму редактирования ссылки', () => {
    const linkBlock: Block = {
      id: '2',
      type: 'link',
      content: { url: 'https://example.com', text: 'Test link' },
      order: 1,
    };

    const onSave = jest.fn();
    render(<BlockEditor block={linkBlock} onSave={onSave} />);

    expect(screen.getByLabelText(/url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/текст/i)).toBeInTheDocument();
  });

  it('рендерит форму редактирования изображения', () => {
    const imageBlock: Block = {
      id: '3',
      type: 'image',
      content: { url: 'https://example.com/image.jpg', alt: 'Test image' },
      order: 2,
    };

    const onSave = jest.fn();
    render(<BlockEditor block={imageBlock} onSave={onSave} />);

    expect(screen.getByLabelText(/url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/alt/i)).toBeInTheDocument();
  });

  it('вызывает onSave с обновленными данными при сохранении', () => {
    const onSave = jest.fn();
    render(<BlockEditor block={mockBlock} onSave={onSave} />);

    const textInput = screen.getByLabelText(/текст/i);
    fireEvent.change(textInput, { target: { value: 'Updated text' } });

    const saveButton = screen.getByRole('button', { name: /сохранить/i });
    fireEvent.click(saveButton);

    expect(onSave).toHaveBeenCalledWith({
      ...mockBlock,
      content: { text: 'Updated text' },
    });
  });

  it('вызывает onCancel при отмене', () => {
    const onCancel = jest.fn();
    render(<BlockEditor block={mockBlock} onSave={() => {}} onCancel={onCancel} />);

    const cancelButton = screen.getByRole('button', { name: /отмена/i });
    fireEvent.click(cancelButton);

    expect(onCancel).toHaveBeenCalled();
  });

  it('отображает ошибки валидации', () => {
    const onSave = jest.fn();
    render(<BlockEditor block={mockBlock} onSave={onSave} />);

    const textInput = screen.getByLabelText(/текст/i);
    fireEvent.change(textInput, { target: { value: '' } });

    const saveButton = screen.getByRole('button', { name: /сохранить/i });
    fireEvent.click(saveButton);

    expect(screen.getByText(/поле обязательно/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it('применяет стили к блоку', () => {
    const blockWithStyles: Block = {
      ...mockBlock,
      style: {
        backgroundColor: '#f0f0f0',
        textColor: '#333',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
      },
    };

    const onSave = jest.fn();
    render(<BlockEditor block={blockWithStyles} onSave={onSave} />);

    expect(screen.getByLabelText(/цвет фона/i)).toHaveValue('#f0f0f0');
    expect(screen.getByLabelText(/цвет текста/i)).toHaveValue('#333');
    expect(screen.getByLabelText(/скругление/i)).toHaveValue('8px');
    expect(screen.getByLabelText(/отступы/i)).toHaveValue('16px');
    expect(screen.getByLabelText(/внешние отступы/i)).toHaveValue('8px');
  });
}); 