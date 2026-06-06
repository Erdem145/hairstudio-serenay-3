import type { JSX } from 'react';
import { site } from '../../data';
import { Section } from '../ui/Section';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import styles from './CtaBanner.module.css';

interface CtaBannerProps {
  title?: string;
  text?: string;
}

/** Donkere afsluitende oproep met contactopties (telefoon + WhatsApp). */
export function CtaBanner({
  title = 'Klaar voor een frisse, nieuwe look?',
  text = 'Bel of app ons gerust voor een afspraak of advies. We denken graag met je mee.',
}: CtaBannerProps): JSX.Element {
  return (
    <Section surface="dark" aria-labelledby="cta-titel">
      <Container>
        <Reveal className={styles.inner}>
          <div className={styles.copy}>
            <h2 id="cta-titel" className={styles.title}>
              {title}
            </h2>
            <p className={styles.text}>{text}</p>
          </div>
          <div className={styles.actions}>
            <Button href={`tel:${site.contact.phoneHref}`} icon="phone" iconPosition="start" size="lg">
              Bel {site.contact.phoneDisplay}
            </Button>
            <Button
              href={site.contact.whatsappHref}
              variant="secondary"
              onDark
              icon="whatsapp"
              iconPosition="start"
              size="lg"
            >
              WhatsApp ons
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
