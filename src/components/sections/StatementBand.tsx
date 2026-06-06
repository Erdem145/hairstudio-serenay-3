import type { JSX } from 'react';
import { site } from '../../data';
import { assetUrl } from '../../lib/asset';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { ParallaxBg } from '../ui/ParallaxBg';
import styles from './StatementBand.module.css';

/**
 * Full-bleed sfeerband: een sfeerfoto parallaxt op de achtergrond achter een
 * centrale quote. Tekst komt uit de data-laag; de foto is een PLACEHOLDER
 * (vervangbaar via /public/images/sfeer/statement.jpg).
 */
export function StatementBand(): JSX.Element {
  const statement = site.taglineAlternatives[1] ?? site.tagline;

  return (
    <section className={styles.band} aria-label={`Over ${site.name}`}>
      <ParallaxBg strength={0.22} className={styles.bg}>
        <img
          className={styles.bgImg}
          src={assetUrl('/images/sfeer/statement.jpg')}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </ParallaxBg>
      <div className={styles.scrim} aria-hidden="true" />
      <Container className={styles.inner}>
        <Reveal>
          <span className={`eyebrow ${styles.eyebrow}`}>{site.name}</span>
          <p className={styles.quote}>{statement}</p>
        </Reveal>
      </Container>
    </section>
  );
}
