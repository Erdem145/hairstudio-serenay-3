import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // GitHub Pages serveert deze projectsite vanaf een subpad
  // (https://<gebruiker>.github.io/<repo>/). Daarom moet de productie-build met
  // een `base` werken die overeenkomt met de repo-naam. Override desgewenst via
  // de env-variabele VITE_BASE (bijv. '/' bij een eigen domein of *.github.io root).
  const base =
    command === 'build' ? (process.env.VITE_BASE ?? '/hairstudio-serenay-3/') : '/';

  return {
    base,
    plugins: [react()],
    build: {
      // Geen sourcemaps in productie (kleinere bundel, geen broncode-lek).
      sourcemap: false,
      target: 'es2021',
    },
  };
});
