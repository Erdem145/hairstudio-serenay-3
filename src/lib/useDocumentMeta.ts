import { useEffect } from 'react';

export interface DocumentMeta {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string | undefined;
  ogType?: string | undefined;
}

/** Maakt of werkt een <meta>-tag bij (op basis van name of property). */
function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Maakt of werkt de canonical <link> bij. */
function upsertCanonical(href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Zet per-pagina <head>-metadata: title, description, canonical, Open Graph en
 * Twitter Card. Client-side (SPA); de statische defaults in index.html dienen
 * als fallback voor crawlers die geen JavaScript uitvoeren.
 */
export function useDocumentMeta(meta: DocumentMeta): void {
  const { title, description, canonical, ogImage, ogType = 'website' } = meta;

  useEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertCanonical(canonical);

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', ogType);
    upsertMeta('property', 'og:url', canonical);

    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);

    if (ogImage) {
      upsertMeta('property', 'og:image', ogImage);
      upsertMeta('name', 'twitter:image', ogImage);
      upsertMeta('name', 'twitter:card', 'summary_large_image');
    }
  }, [title, description, canonical, ogImage, ogType]);
}
