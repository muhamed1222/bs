import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import App from '../App';
import { ViewModeProvider } from '../contexts/ViewModeContext';

describe('routes configuration', () => {
  it('renders 404 page for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <ViewModeProvider>
          <App />
        </ViewModeProvider>
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { name: /404 - Page Not Found/i })
    ).toBeInTheDocument();
  });
});
