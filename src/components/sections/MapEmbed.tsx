import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import { site } from '../../data';
import {
  buildMapsDirectionsUrl,
  buildMapsEmbedUrl,
  formatAddressLine,
} from '../../lib/format';
import { CONSENT_EVENT, getMapsConsent, setMapsConsent } from '../../lib/consent';
import type { ConsentValue } from '../../lib/consent';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';
import styles from './MapEmbed.module.css';

/**
 * Google Maps-embed achter AVG-toestemming. De iframe wordt pas geladen nadat
 * de bezoeker toestemming geeft (via de cookiemelding of de knop hieronder).
 * De iframe draait in een restrictieve sandbox en laadt lazy.
 */
export function MapEmbed(): JSX.Element {
  const [consent, setConsent] = useState<ConsentValue | null>(() => getMapsConsent());

  // Synchroniseer met de globale cookiemelding.
  useEffect(() => {
    const handler = (event: Event): void => {
      const value = (event as CustomEvent<ConsentValue>).detail;
      setConsent(value);
    };
    window.addEventListener(CONSENT_EVENT, handler);
    return () => window.removeEventListener(CONSENT_EVENT, handler);
  }, []);

  const addressLine = formatAddressLine(site.address);
  const directionsUrl = buildMapsDirectionsUrl(site.address);

  if (consent === 'granted') {
    return (
      <figure className={styles.figure}>
        <iframe
          className={styles.iframe}
          src={buildMapsEmbedUrl(site.address)}
          title={`Locatie van ${site.name} op Google Maps`}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
        <figcaption className="visually-hidden">{addressLine}</figcaption>
      </figure>
    );
  }

  return (
    <div className={styles.placeholder}>
      <span className={styles.mapIcon}>
        <Icon name="mapPin" size={28} />
      </span>
      <h3 className={styles.title}>Bekijk ons op de kaart</h3>
      <p className={styles.text}>
        De kaart laadt inhoud van Google Maps. Geef toestemming om de kaart hier te tonen, of
        open de routebeschrijving direct in Google Maps.
      </p>
      <div className={styles.actions}>
        <Button onClick={() => setMapsConsent('granted')} icon="mapPin" iconPosition="start">
          Kaart laden
        </Button>
        <Button href={directionsUrl} variant="secondary" icon="arrowUpRight">
          Routebeschrijving
        </Button>
      </div>
    </div>
  );
}
