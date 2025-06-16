import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../../components/Header';
import { ViewModeProvider } from '../../contexts/ViewModeContext';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ViewModeProvider>
        {component}
      </ViewModeProvider>
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  it('рендерит логотип и навигационные элементы', () => {
    renderWithRouter(<Header />);
    
    // Проверяем наличие логотипа
    expect(screen.getByText('Basis')).toBeInTheDocument();
    
    // Проверяем наличие кнопок авторизации
    expect(screen.getByText('Войти')).toBeInTheDocument();
    expect(screen.getByText('Регистрация')).toBeInTheDocument();
  });

  it('переключает режим просмотра между десктопным и мобильным', () => {
    renderWithRouter(<Header />);
    
    const desktopButton = screen.getByLabelText('Desktop view');
    const mobileButton = screen.getByLabelText('Mobile view');
    
    // По умолчанию десктопный режим активен
    expect(desktopButton).toHaveAttribute('aria-pressed', 'true');
    expect(mobileButton).toHaveAttribute('aria-pressed', 'false');
    
    // Переключаем на мобильный режим
    fireEvent.click(mobileButton);
    expect(desktopButton).toHaveAttribute('aria-pressed', 'false');
    expect(mobileButton).toHaveAttribute('aria-pressed', 'true');
    
    // Переключаем обратно на десктопный режим
    fireEvent.click(desktopButton);
    expect(desktopButton).toHaveAttribute('aria-pressed', 'true');
    expect(mobileButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('содержит корректные ссылки для авторизации', () => {
    renderWithRouter(<Header />);
    
    const loginLink = screen.getByText('Войти').closest('a');
    const signupLink = screen.getByText('Регистрация').closest('a');
    
    expect(loginLink).toHaveAttribute('href', '/auth?action=login');
    expect(signupLink).toHaveAttribute('href', '/auth?action=signup');
  });
}); 