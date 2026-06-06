import { useState } from 'react';
import type { JSX } from 'react';
import { getMapsConsent, setMapsConsent } from '../../lib/consent';
import { Button } from '../ui/Button';
import styles from './CookieConsent.module.css';

/**
 * Minimalistische AVG-melding. Verschijnt alleen zolang de bezoeker nog geen
 * keuze heeft gemaakt. De enige externe inhoud is Google Maps (contactpagina);
 * die laadt pas na expliciete toestemming. Er worden geen tracking-cookies gezet.
 */
export function CookieConsent(): JSX.Element | null {
  const [decided, setDecided] = useState(() => getMapsConsent() !== null);

  if (decided) return null;

  const choose = (value: 'granted' | 'denied'): void => {
    setMapsConsent(value);
    setDecided(true);
  };

  return (
    <div
      className={styles.banner}
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-titel"
      aria-describedby="consent-tekst"
    >
      <div className={styles.content}>
        <h2 id="consent-titel" className={styles.title}>
          Cookies &amp; privacy
        </h2>
        <p id="consent-tekst" className={styles.text}>
          We gebruiken geen tracking. Alleen de kaart op onze contactpagina laadt inhoud van
          Google Maps. Wil je die kaart kunnen bekijken?
        </p>
      </div>
      <div className={styles.actions}>
        <Button onClick={() => choose('granted')} size="md">
          Kaart toestaan
        </Button>
        <Button onClick={() => choose('denied')} variant="secondary" size="md">
          Weigeren
        </Button>
      </div>
    </div>
  );
}
