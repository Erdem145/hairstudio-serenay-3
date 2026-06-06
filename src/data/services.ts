import type { ServiceGroup } from './types';

/**
 * Diensten, gegroepeerd in vier categorieën.
 *
 * PRIJZEN INVULLEN
 * ----------------
 * Elke dienst heeft een `price`-object. De prijzen worden later door de eigenaar
 * ingevuld. Op dit moment staat alles op `{ kind: 'on-request' }` → de site toont
 * dan netjes "Op aanvraag". Zo worden er geen verzonnen tarieven getoond.
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
    title: 'Knippen',
    icon: 'scissors',
    intro: 'Een coupe die bij jóu past — afgestemd op je haar, gezicht en stijl.',
    items: [
      { name: 'Knippen & föhnen', description: 'Wassen, knippen en stylen.', price: { kind: 'on-request' } },
      { name: 'Knippen (zonder föhnen)', description: 'Wassen en knippen.', price: { kind: 'on-request' } },
      { name: 'Pony bijknippen', price: { kind: 'on-request' } },
      { name: 'Föhnen & stylen', description: 'Voor een verzorgde finish.', price: { kind: 'on-request' } },
    ],
  },
  {
    id: 'kleuren',
    title: 'Kleuren',
    icon: 'palette',
    intro: 'Van een subtiele opfrissing tot een volledige transformatie.',
    items: [
      { name: 'Uitgroei bijwerken', description: 'Kleur op de aanzet.', price: { kind: 'on-request' } },
      { name: 'Volledige kleuring', price: { kind: 'on-request' } },
      { name: 'Highlights / folies', description: 'Gedeeltelijk of volledig.', price: { kind: 'on-request' } },
      { name: 'Balayage', description: 'Natuurlijk uitgewerkte verloopkleur.', price: { kind: 'on-request' } },
      { name: 'Toner / glossing', description: 'Verfijnt en laat de kleur stralen.', price: { kind: 'on-request' } },
    ],
  },
  {
    id: 'behandelingen',
    title: 'Behandelingen',
    icon: 'sparkles',
    intro: 'Verzorging die je haar gezond, zacht en glanzend houdt.',
    items: [
      { name: 'Verzorgende haarmasker-behandeling', price: { kind: 'on-request' } },
      { name: 'Keratine-behandeling', description: 'Voor gladder, beter handelbaar haar.', price: { kind: 'on-request' } },
      { name: 'Hoofdhuidbehandeling', price: { kind: 'on-request' } },
    ],
  },
  {
    id: 'styling-opsteken',
    title: 'Styling & Opsteken',
    icon: 'crown',
    intro: 'Voor een bruiloft, gala of een avond uit — net dat beetje extra.',
    items: [
      { name: 'Opsteekkapsel', description: 'Voor elke gelegenheid.', price: { kind: 'on-request' } },
      { name: 'Bruidskapsel', description: 'Inclusief overleg vooraf.', price: { kind: 'on-request' } },
      { name: 'Proefkapsel', price: { kind: 'on-request' } },
      { name: 'Krullen / golven stylen', price: { kind: 'on-request' } },
    ],
  },
];
