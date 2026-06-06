import type { TeamMember } from './types';

/**
 * Het team. Suna en Serenay Sahan — moeder en dochter.
 *
 * Eigen foto's toevoegen? Plaats de afbeelding in /public/images en zet het pad
 * in `image` (bijv. '/images/suna.jpg'). Zonder `image` toont de site een
 * sfeervolle placeholder-tegel.
 */
export const team: readonly TeamMember[] = [
  {
    name: 'Suna Sahan',
    role: 'Kapster & eigenaar',
    // TODO eigenaar: vervang deze placeholder door een persoonlijke tekst.
    bio: 'Suna is het hart van de salon. Met jarenlange ervaring en een warm oog voor detail zorgt ze ervoor dat iedere klant zich op haar gemak voelt en stralend de deur uit gaat.',
    imageAlt: 'Portretfoto van Suna Sahan, kapster en eigenaar van Hairstudio Serenay.',
    // PLACEHOLDER-foto — vervang door een eigen portret van Suna.
    image: '/images/team/suna.jpg',
    tone: 'terracotta',
  },
  {
    name: 'Serenay Sahan',
    role: 'Kapster',
    // TODO eigenaar: vervang deze placeholder door een persoonlijke tekst.
    bio: 'Serenay combineert vakmanschap met een frisse, eigentijdse blik. Van een natuurlijke balayage tot een verfijnd opsteekkapsel — ze denkt graag met je mee naar de look die bij je past.',
    imageAlt: 'Portretfoto van Serenay Sahan, kapster bij Hairstudio Serenay.',
    // PLACEHOLDER-foto — vervang door een eigen portret van Serenay.
    image: '/images/team/serenay.jpg',
    tone: 'olive',
  },
];
