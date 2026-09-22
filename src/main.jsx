import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './theme/ThemeContext.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
   <ThemeProvider>
        <Provider store={store}>
          <App />
        </Provider>
        </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
