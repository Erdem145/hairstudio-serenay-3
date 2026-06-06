import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Self-hosted lettertypes (geen externe CDN → AVG-proof + strakke CSP).
import '@fontsource-variable/cormorant';
import '@fontsource-variable/cormorant/wght-italic.css';
import '@fontsource-variable/inter';

import './styles/tokens.css';
import './styles/global.css';
import { App } from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root-element #root niet gevonden in index.html');
}

// Basename = het Vite-`base`-pad zonder trailing slash. Hierdoor werkt routing
// zowel op de root ('/') als onder een GitHub Pages-subpad ('/hairstudio-serenay-3').
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
