import type { Partner } from './types';

/**
 * Merkpartner. Hairstudio Serenay is officieel L'Oréal-partner.
 *
 * Het logo is het officiële L'Oréal-woordmerk (public domain wordmark). Wil de
 * eigenaar een specifieke variant (bijv. "L'Oréal Professionnel")? Vervang dan
 * /public/images/partners/loreal.svg volgens de merkrichtlijnen van L'Oréal.
 */
export const partner: Partner = {
  name: "L'Oréal",
  label: "Officieel L'Oréal partner",
  logo: '/images/partners/loreal.svg',
  alt: "L'Oréal",
  description:
    "Als officieel L'Oréal-partner werken we met professionele producten voor kleuringen en verzorging van topkwaliteit — zodat jouw haar er op z'n best uitziet.",
};
