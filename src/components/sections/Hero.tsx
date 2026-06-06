import type { JSX } from 'react';
import { openingHours, site } from '../../data';
import { formatAddressLine, getOpenStatus } from '../../lib/format';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { ParallaxImage } from '../ui/ParallaxImage';
import styles from './Hero.module.css';

/** Hero van de homepagina: introductie, status en visuele blikvanger. */
export function Hero(): JSX.Element {
  const status = getOpenStatus(openingHours);

  return (
    <section className={styles.hero} aria-labelledby="hero-titel">
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <span className={`eyebrow ${styles.eyebrow}`}>
            <Icon name="leaf" size={16} />
            Dameskapsalon · {site.address.city}
          </span>

          <h1 id="hero-titel" className={styles.title}>
            {site.name}
          </h1>

          <p className={styles.tagline}>{site.tagline}</p>
          <p className={styles.lead}>{site.description}</p>

          <div className={styles.actions}>
            <Button to="/diensten" size="lg" icon="arrowRight">
              Bekijk onze diensten
            </Button>
            <Button href={`tel:${site.contact.phoneHref}`} variant="secondary" size="lg" icon="phone" iconPosition="start">
              Bel ons
            </Button>
          </div>

          <div className={styles.meta}>
            <span className={`${styles.statusPill} ${status.isOpen ? styles.open : styles.closed}`}>
              <span className={styles.dot} aria-hidden="true" />
              {status.label}
            </span>
            <span className={styles.location}>
              <Icon name="mapPin" size={16} />
              {formatAddressLine(site.address)}
            </span>
          </div>
        </div>

        <div className={styles.media} aria-hidden="true">
          {/* PLAATS HIER EIGEN FOTO'S: vul `src` in via de MediaTile (zie portfolio.ts/team.ts). */}
          {/* Vast kader, schuivend beeld → duidelijk zichtbare parallax. */}
          <ParallaxImage
            alt="Sfeerbeeld van de salon"
            tone="terracotta"
            ratio="4 / 5"
            strength={0.16}
            className={styles.tileFront}
          />
          <ParallaxImage
            alt="Detailbeeld kapsel"
            tone="sand"
            ratio="1 / 1"
            strength={0.18}
            className={styles.tileBack}
          />
        </div>
      </Container>
    </section>
  );
}
