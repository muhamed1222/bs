import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import App from '../App';
import { ViewModeProvider } from '../contexts/ViewModeContext';
import { I18nProvider } from '../contexts/I18nContext';

describe('routes configuration', () => {
  it('renders 404 page for unknown routes', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/unknown']}>
          <ViewModeProvider>
            <I18nProvider>
              <App />
            </I18nProvider>
          </ViewModeProvider>
        </MemoryRouter>
      );
    });
    expect(
      screen.getByRole('heading', { name: /404 - Page Not Found/i })
    ).toBeInTheDocument();
  });
});
