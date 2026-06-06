import type { GalleryImage } from './types';

/**
 * Portfolio / sfeerbeelden.
 *
 * Eigen foto's plaatsen? Zet de afbeelding in /public/images en vul `src` in
 * (bijv. '/images/portfolio/balayage-1.jpg'). Zolang `src` leeg is, toont de
 * galerij een stijlvolle kleurvlak-placeholder met de bijbehorende `tone`.
 * Houd de `alt`-tekst beschrijvend voor toegankelijkheid en SEO.
 */
export const portfolio: readonly GalleryImage[] = [
  {
    id: 'balayage-warm',
    alt: 'Warme balayage met zachte highlights, zijdelings gefotografeerd.',
    caption: 'Warme balayage',
    category: 'Kleuren',
    tone: 'terracotta',
  },
  {
    id: 'coupe-modern',
    alt: 'Moderne gelaagde coupe op schouderlengte.',
    caption: 'Gelaagde coupe',
    category: 'Knippen',
    tone: 'sand',
  },
  {
    id: 'opsteek-bruid',
    alt: 'Elegant opgestoken bruidskapsel met losse lokken.',
    caption: 'Bruidskapsel',
    category: 'Opsteken',
    tone: 'olive',
  },
  {
    id: 'glans-behandeling',
    alt: 'Glanzend, verzorgd haar na een glossing-behandeling.',
    caption: 'Glans & verzorging',
    category: 'Behandelingen',
    tone: 'clay',
  },
  {
    id: 'krullen-styling',
    alt: 'Natuurlijke krullen, vol en gedefinieerd gestyled.',
    caption: 'Krullen styling',
    category: 'Styling',
    tone: 'cream',
  },
  {
    id: 'highlights-koel',
    alt: 'Fijne highlights die het haar lichter en levendiger maken.',
    caption: 'Highlights',
    category: 'Kleuren',
    tone: 'ink',
  },
  {
    id: 'bob-strak',
    alt: 'Strakke bob-coupe met een gladde finish.',
    caption: 'Strakke bob',
    category: 'Knippen',
    tone: 'sand',
  },
  {
    id: 'opsteek-gala',
    alt: 'Verfijnd opsteekkapsel voor een galagelegenheid.',
    caption: 'Gala-opsteek',
    category: 'Opsteken',
    tone: 'terracotta',
  },
];
