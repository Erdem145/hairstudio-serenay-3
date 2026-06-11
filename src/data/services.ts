import type { ServiceGroup } from './types';

/**
 * Diensten, gegroepeerd in vier categorieën.
 *
 * PRIJZEN
 * -------
 * De tarieven zijn vanaf-prijzen, aangeleverd door de eigenaar (juni 2026).
 * De uiteindelijke prijs hangt af van haarlengte, -dikte en gewenst resultaat.
 *
 * Mogelijke prijsvormen (zie ook src/data/types.ts):
 *   { kind: 'fixed', amount: 35 }              → "€ 35,-"
 *   { kind: 'from', amount: 45 }               → "vanaf € 45,-"
 *   { kind: 'range', amount: 40, amountMax: 70 } → "€ 40,- – € 70,-"
 *   { kind: 'on-request' }                     → "Op aanvraag"
 */
export const serviceGroups: readonly ServiceGroup[] = [
  {
    id: 'knippen',
    title: 'Knippen & Föhnen',
    icon: 'scissors',
    intro: 'Een coupe die bij jóu past — afgestemd op je haar, gezicht en stijl.',
    items: [
      { name: 'Knippen', description: 'Wassen, knippen en stylen.', price: { kind: 'from', amount: 35 } },
      { name: 'Föhnen', description: 'Wassen, föhnen en stylen voor een verzorgde finish.', price: { kind: 'from', amount: 37.5 } },
    ],
  },
  {
    id: 'kleuren',
    title: 'Kleuren',
    icon: 'palette',
    intro: 'Van een subtiele opfrissing tot een volledige transformatie.',
    items: [
      { name: 'Verven', description: 'Volledige kleuring of uitgroei bijwerken.', price: { kind: 'from', amount: 52 } },
      { name: 'Spoeling', description: 'Zachte kleurspoeling die geleidelijk uitwast.', price: { kind: 'from', amount: 49 } },
      { name: 'Highlights', description: 'Lichte accenten met folies.', price: { kind: 'from', amount: 65 } },
      { name: 'Babylights', description: 'Extra fijne, subtiele highlights.', price: { kind: 'from', amount: 60 } },
      { name: 'Balayage', description: 'Natuurlijk uitgewerkte verloopkleur.', price: { kind: 'from', amount: 75 } },
      { name: 'Toner', description: 'Verfijnt en laat de kleur stralen.', price: { kind: 'from', amount: 30 } },
    ],
  },
  {
    id: 'behandelingen',
    title: 'Behandelingen',
    icon: 'sparkles',
    intro: 'Verzorging die je haar gezond, zacht en glanzend houdt.',
    items: [
      { name: 'Permanenten', description: 'Blijvende krul of extra volume.', price: { kind: 'from', amount: 90 } },
      { name: 'Verzorging', description: 'Verzorgende behandeling voor gezond, glanzend haar.', price: { kind: 'from', amount: 10 } },
    ],
  },
  {
    id: 'styling-opsteken',
    title: 'Styling & Opsteken',
    icon: 'crown',
    intro: 'Voor een bruiloft, gala of een avond uit — net dat beetje extra.',
    items: [
      { name: 'Bruidskapsel', description: 'Inclusief overleg vooraf.', price: { kind: 'from', amount: 150 } },
      { name: 'Extensions', description: 'Prijs per stuk.', price: { kind: 'from', amount: 4.5 } },
    ],
  },
];
