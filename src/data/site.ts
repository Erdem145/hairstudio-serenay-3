import type { SiteInfo } from './types';

/**
 * Kerngegevens van de salon: naam, taglines, adres, contact en social media.
 *
 * Wil de eigenaar iets wijzigen (bijv. e-mailadres of een nieuw telefoonnummer)?
 * Pas het hier aan — het wordt automatisch overal op de site doorgevoerd.
 */

// Canoniek domein. Komt uit .env (VITE_SITE_URL) met een veilige fallback.
const SITE_URL = (import.meta.env.VITE_SITE_URL ?? 'https://www.hairstudioserenay.nl').replace(
  /\/$/,
  '',
);

export const site: SiteInfo = {
  name: 'Hairstudio Serenay',
  shortName: 'Serenay',
  tagline: 'Verfijnd haar, met hart voor het vak.',
  taglineAlternatives: [
    'Waar moeder en dochter jouw stijl tot leven brengen.',
    'Jouw moment van rust en stijl, in hartje Zandvoort.',
  ],
  description:
    'Hairstudio Serenay is een verfijnde dameskapsalon in Zandvoort. Knippen, kleuren, behandelingen en opsteken — met persoonlijke aandacht en oog voor detail.',
  url: SITE_URL,
  address: {
    street: 'Tolweg 20',
    postalCode: '2042 EL',
    city: 'Zandvoort',
    country: 'Nederland',
  },
  contact: {
    phoneDisplay: '06 34192433',
    phoneHref: '+31634192433',
    whatsappHref: 'https://wa.me/31634192433',
    // TODO eigenaar: vul hier het e-mailadres in (bijv. 'info@hairstudioserenay.nl').
    // Zolang dit `null` is, toont de site netjes "binnenkort beschikbaar".
    email: null,
  },
  socials: [
    {
      platform: 'Instagram',
      label: '@hairstudioserenay',
      href: 'https://www.instagram.com/hairstudioserenay/',
      icon: 'instagram',
    },
  ],
};
