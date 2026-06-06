import type { OpeningDay } from './types';

/**
 * Openingstijden in NL-notatie, maandag-eerst. Gesloten dagen hebben
 * `open`/`close` op `null`. Aanpassen? Wijzig hier de tijden.
 */
export const openingHours: readonly OpeningDay[] = [
  { day: 'Maandag', open: null, close: null },
  { day: 'Dinsdag', open: '09:00', close: '15:00' },
  { day: 'Woensdag', open: '09:00', close: '15:00' },
  { day: 'Donderdag', open: '09:00', close: '17:00' },
  { day: 'Vrijdag', open: '09:00', close: '17:00' },
  { day: 'Zaterdag', open: '09:00', close: '15:00' },
  { day: 'Zondag', open: null, close: null },
];
