import type { AboutContent } from './types';

/**
 * Inhoud van de "Over ons"-pagina.
 *
 * De lopende tekst (`lead` en `paragraphs`) is een placeholder; de eigenaar kan
 * dit later vervangen door het eigen verhaal van de salon.
 */
export const about: AboutContent = {
  eyebrow: 'Over ons',
  title: 'Een salon met een verhaal',
  // TODO eigenaar: vervang onderstaande placeholder-teksten door het eigen verhaal.
  lead: 'Hairstudio Serenay is een persoonlijke dameskapsalon in het hart van Zandvoort, gerund door moeder en dochter — Suna en Serenay Sahan.',
  paragraphs: [
    'Bij ons stap je binnen voor meer dan alleen een knipbeurt. We nemen de tijd om naar je te luisteren, geven eerlijk advies en werken met zorg en aandacht aan een resultaat waar je je helemaal in herkent.',
    'Of je nu komt voor een verfrissende coupe, een nieuwe kleur of een feestelijk opsteekkapsel: je bent bij ons in vertrouwde handen. We houden van ons vak en dat zie je terug in elk detail.',
    'Welkom bij Hairstudio Serenay — waar je even tot rust komt en stralend weer naar buiten loopt.',
  ],
  values: [
    {
      title: 'Persoonlijke aandacht',
      description: 'We nemen de tijd voor je en stemmen alles af op jouw wensen en haartype.',
      icon: 'heart',
    },
    {
      title: 'Vakmanschap',
      description: 'Jarenlange ervaring en oog voor detail, in elke behandeling.',
      icon: 'scissors',
    },
    {
      title: 'Eerlijk advies',
      description: 'Een look die bij je past en werkbaar is in je dagelijks leven.',
      icon: 'leaf',
    },
  ],
};
