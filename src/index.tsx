import React from 'react';
import ReactDOM from 'react-dom';
import { TrelloStateProvider } from '@hooks/reducer';
import { App } from '@components/App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <TrelloStateProvider>
      <App />
    </TrelloStateProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
