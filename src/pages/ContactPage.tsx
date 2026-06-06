import type { JSX } from 'react';
import { pageSeo } from '../data';
import { Seo } from '../components/seo/Seo';
import { Section } from '../components/ui/Section';
import { Container } from '../components/ui/Container';
import { Reveal } from '../components/ui/Reveal';
import { PageHeader } from '../components/sections/PageHeader';
import { ContactInfo } from '../components/sections/ContactInfo';
import { HoursCard } from '../components/sections/HoursCard';
import { MapEmbed } from '../components/sections/MapEmbed';
import styles from './ContactPage.module.css';

export function ContactPage(): JSX.Element {
  return (
    <>
      <Seo page={pageSeo.contact} />
      <PageHeader
        eyebrow="Contact & route"
        title="Kom langs of neem contact op"
        intro="Je vindt ons aan de Tolweg 20 in Zandvoort. Bel, app of bekijk hieronder de route."
      />

      <Section>
        <Container>
          <div className={styles.layout}>
            <div className={styles.column}>
              <Reveal>
                <h2 className={styles.heading}>Hoe je ons bereikt</h2>
              </Reveal>
              <ContactInfo />
            </div>
            <div className={styles.column}>
              <Reveal>
                <h2 className={styles.heading}>Openingstijden</h2>
              </Reveal>
              <Reveal delay={80}>
                <HoursCard />
              </Reveal>
            </div>
          </div>

          <div className={styles.mapSection}>
            <Reveal>
              <h2 className={styles.heading}>Route</h2>
            </Reveal>
            <Reveal delay={80}>
              <MapEmbed />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
