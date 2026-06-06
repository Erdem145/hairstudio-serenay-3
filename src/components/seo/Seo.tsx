import { site } from '../../data';
import type { PageSeo } from '../../data/types';
import { useDocumentMeta } from '../../lib/useDocumentMeta';

interface SeoProps {
  page: PageSeo;
}

/**
 * Zet per-pagina SEO-metadata (title, description, canonical, Open Graph).
 * Rendert niets — het werkt uitsluitend op de <head>.
 */
export function Seo({ page }: SeoProps): null {
  const canonical = `${site.url}${page.path}`;
  useDocumentMeta({
    title: page.title,
    description: page.description,
    canonical,
    ogImage: page.ogImage ? `${site.url}${page.ogImage}` : undefined,
  });
  return null;
}
