import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { MorseSettingsProvider } from './contexts/MorseSettingsContext';
import { HistoryProvider } from './contexts/HistoryContext';
import { TranslatorProvider } from './contexts/TranslatorContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MorseSettingsProvider>
          <HistoryProvider>
            <TranslatorProvider>
              <App />
            </TranslatorProvider>
          </HistoryProvider>
        </MorseSettingsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);