import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { ViewModeProvider } from '../contexts/ViewModeContext';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <ViewModeProvider>
          <App />
        </ViewModeProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/умный бенто‑конструктор/i)).toBeInTheDocument();
  });
});
