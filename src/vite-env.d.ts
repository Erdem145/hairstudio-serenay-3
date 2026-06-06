/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canoniek productie-domein (zie .env.example). */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Self-hosted lettertypes via @fontsource (CSS-only packages, geen eigen types).
declare module '@fontsource-variable/cormorant';
declare module '@fontsource-variable/cormorant/wght-italic.css';
declare module '@fontsource-variable/inter';
