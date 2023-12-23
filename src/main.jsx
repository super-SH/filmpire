import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/App';
import store from './app/store';
import { ColorModeProvider } from './utils/ToggleColorMode';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ColorModeProvider>
        <App />
      </ColorModeProvider>
    </Provider>
  </React.StrictMode>
);
