import type { GalleryImage } from './types';

/**
 * Portfolio / sfeerbeelden.
 *
 * LET OP: de huidige `src`-foto's zijn TIJDELIJKE placeholders (themed stock).
 * Vervang ze door eigen foto's: zet het bestand in /public/images/portfolio/
 * en pas het `src`-pad + de `alt`-tekst aan. Laat je `src` weg, dan toont de
 * galerij een stijlvolle kleurvlak-placeholder met de bijbehorende `tone`.
 */
export const portfolio: readonly GalleryImage[] = [
  {
    id: 'balayage-warm',
    alt: 'Warme balayage met zachte highlights, zijdelings gefotografeerd.',
    caption: 'Warme balayage',
    category: 'Kleuren',
    src: '/images/portfolio/balayage-warm.jpg',
    tone: 'terracotta',
  },
  {
    id: 'coupe-modern',
    alt: 'Moderne gelaagde coupe op schouderlengte.',
    caption: 'Gelaagde coupe',
    category: 'Knippen',
    src: '/images/portfolio/coupe-modern.jpg',
    tone: 'sand',
  },
  {
    id: 'opsteek-bruid',
    alt: 'Elegant opgestoken bruidskapsel met losse lokken.',
    caption: 'Bruidskapsel',
    category: 'Opsteken',
    src: '/images/portfolio/opsteek-bruid.jpg',
    tone: 'olive',
  },
  {
    id: 'glans-behandeling',
    alt: 'Glanzend, verzorgd haar na een glossing-behandeling.',
    caption: 'Glans & verzorging',
    category: 'Behandelingen',
    src: '/images/portfolio/glans-behandeling.jpg',
    tone: 'clay',
  },
  {
    id: 'krullen-styling',
    alt: 'Natuurlijke krullen, vol en gedefinieerd gestyled.',
    caption: 'Krullen styling',
    category: 'Styling',
    src: '/images/portfolio/krullen-styling.jpg',
    tone: 'cream',
  },
  {
    id: 'highlights-koel',
    alt: 'Fijne highlights die het haar lichter en levendiger maken.',
    caption: 'Highlights',
    category: 'Kleuren',
    src: '/images/portfolio/highlights-koel.jpg',
    tone: 'ink',
  },
  {
    id: 'bob-strak',
    alt: 'Strakke bob-coupe met een gladde finish.',
    caption: 'Strakke bob',
    category: 'Knippen',
    src: '/images/portfolio/bob-strak.jpg',
    tone: 'sand',
  },
  {
    id: 'opsteek-gala',
    alt: 'Verfijnd opsteekkapsel voor een galagelegenheid.',
    caption: 'Gala-opsteek',
    category: 'Opsteken',
    src: '/images/portfolio/opsteek-gala.jpg',
    tone: 'terracotta',
  },
];
