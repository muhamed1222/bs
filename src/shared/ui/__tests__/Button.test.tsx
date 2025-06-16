import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('рендерит кнопку с текстом', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('вызывает onClick при клике', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test Button</Button>);

    fireEvent.click(screen.getByText('Test Button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('применяет primary стиль', () => {
    render(<Button variant="primary">Test Button</Button>);
    const button = screen.getByText('Test Button');
    expect(button).toHaveClass('bg-blue-600');
  });

  it('применяет secondary стиль', () => {
    render(<Button variant="secondary">Test Button</Button>);
    const button = screen.getByText('Test Button');
    expect(button).toHaveClass('bg-gray-200');
  });

  it('применяет outline стиль', () => {
    render(<Button variant="outline">Test Button</Button>);
    const button = screen.getByText('Test Button');
    expect(button).toHaveClass('border-2');
  });

  it('применяет small размер', () => {
    render(<Button size="sm">Test Button</Button>);
    const button = screen.getByText('Test Button');
    expect(button).toHaveClass('px-3 py-1.5 text-sm');
  });

  it('применяет medium размер', () => {
    render(<Button size="md">Test Button</Button>);
    const button = screen.getByText('Test Button');
    expect(button).toHaveClass('px-4 py-2 text-base');
  });

  it('применяет large размер', () => {
    render(<Button size="lg">Test Button</Button>);
    const button = screen.getByText('Test Button');
    expect(button).toHaveClass('px-6 py-3 text-lg');
  });

  it('применяет дополнительные классы', () => {
    render(<Button className="custom-class">Test Button</Button>);
    const button = screen.getByText('Test Button');
    expect(button).toHaveClass('custom-class');
  });

  it('отображает индикатор загрузки', () => {
    render(<Button isLoading>Test Button</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  it('отключает кнопку при isLoading', () => {
    render(<Button isLoading>Test Button</Button>);
    const button = screen.getByText('Test Button');
    expect(button).toBeDisabled();
  });

  it('отключает кнопку при disabled', () => {
    render(<Button disabled>Test Button</Button>);
    const button = screen.getByText('Test Button');
    expect(button).toBeDisabled();
  });

  it('не вызывает onClick при disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Test Button
      </Button>
    );

    fireEvent.click(screen.getByText('Test Button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
}); 