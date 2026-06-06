import type { PageSeo } from './types';

/**
 * Per-pagina SEO-metadata (title + description + pad). Wordt door de <Seo>-
 * component in de <head> gezet, inclusief Open Graph-varianten.
 *
 * Houd titels < ~60 tekens en omschrijvingen tussen ~120–160 tekens.
 */
export const pageSeo = {
  home: {
    title: 'Hairstudio Serenay — Dameskapsalon in Zandvoort',
    description:
      'Verfijnde dameskapsalon in Zandvoort. Knippen, kleuren, behandelingen en opsteken met persoonlijke aandacht. Bekijk onze diensten en openingstijden.',
    path: '/',
  },
  services: {
    title: 'Diensten & prijzen — Hairstudio Serenay',
    description:
      'Ontdek de diensten van Hairstudio Serenay: knippen, kleuren, behandelingen en styling & opsteken. Bekijk het overzicht en vraag naar de actuele tarieven.',
    path: '/diensten',
  },
  about: {
    title: 'Over ons — Hairstudio Serenay Zandvoort',
    description:
      'Maak kennis met Hairstudio Serenay, een persoonlijke dameskapsalon in Zandvoort gerund door moeder en dochter Suna en Serenay Sahan.',
    path: '/over-ons',
  },
  portfolio: {
    title: 'Portfolio — Hairstudio Serenay',
    description:
      'Een impressie van ons werk: coupes, kleuringen, behandelingen en opsteekkapsels van Hairstudio Serenay in Zandvoort.',
    path: '/portfolio',
  },
  contact: {
    title: 'Contact & route — Hairstudio Serenay Zandvoort',
    description:
      'Bel, app of bezoek Hairstudio Serenay aan de Tolweg 20 in Zandvoort. Bekijk onze openingstijden en vind de route naar de salon.',
    path: '/contact',
  },
  notFound: {
    title: 'Pagina niet gevonden — Hairstudio Serenay',
    description: 'Deze pagina bestaat niet (meer). Ga terug naar de homepagina van Hairstudio Serenay.',
    path: '/404',
  },
} as const satisfies Record<string, PageSeo>;

export type PageSeoKey = keyof typeof pageSeo;
