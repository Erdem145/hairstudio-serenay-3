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
/** Site-brede standaard-deelafbeelding wanneer een pagina er zelf geen opgeeft. */
const DEFAULT_OG_IMAGE = '/images/sfeer/hero-1.jpg';

export function Seo({ page }: SeoProps): null {
  const canonical = `${site.url}${page.path}`;
  useDocumentMeta({
    title: page.title,
    description: page.description,
    canonical,
    // Absolute URL incl. base-path (site.url bevat het deploy-domein) → crawlers
    // kunnen het beeld ophalen, ook op de GitHub Pages-subpath.
    ogImage: `${site.url}${page.ogImage ?? DEFAULT_OG_IMAGE}`,
  });
  return null;
}
