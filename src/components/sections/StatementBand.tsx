import type { JSX } from 'react';
import { site } from '../../data';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { ParallaxBg } from '../ui/ParallaxBg';
import styles from './StatementBand.module.css';

/**
 * Full-bleed sfeerband met een groot woordmerk dat op de achtergrond parallaxt
 * achter een centrale quote. Alle tekst komt uit de data-laag.
 */
export function StatementBand(): JSX.Element {
  const statement = site.taglineAlternatives[1] ?? site.tagline;

  return (
    <section className={styles.band} aria-label={`Over ${site.name}`}>
      <ParallaxBg strength={0.22} className={styles.bg}>
        <span className={styles.monogram}>{site.shortName}</span>
      </ParallaxBg>
      <Container className={styles.inner}>
        <Reveal>
          <span className={`eyebrow ${styles.eyebrow}`}>{site.name}</span>
          <p className={styles.quote}>{statement}</p>
        </Reveal>
      </Container>
    </section>
  );
}
