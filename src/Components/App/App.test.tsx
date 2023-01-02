import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { TrelloStateProvider } from '@hooks/reducer';
import { App } from './App';

test('Renders the Trello Clone App', () => {
  render(
    <TrelloStateProvider>
      <App />
    </TrelloStateProvider>,
  );
  const linkElement = screen.getByText(/Trello Clone/i);
  expect(linkElement).toBeInTheDocument();
});
