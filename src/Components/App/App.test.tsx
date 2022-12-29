import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppStateProvider } from '../AppStateContext';
import { App } from './App';

test('renders learn react link', () => {
  render(
    <AppStateProvider>
      <App />
    </AppStateProvider>,
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
