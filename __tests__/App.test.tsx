import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { ViewModeProvider } from '../contexts/ViewModeContext';
import { I18nProvider } from '../contexts/I18nContext';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <ViewModeProvider>
          <I18nProvider>
            <App />
          </I18nProvider>
        </ViewModeProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/умный бенто‑конструктор/i)).toBeInTheDocument();
  });
});
