import type { JSX } from 'react';
import { pageSeo, site } from '../data';
import { Seo } from '../components/seo/Seo';
import { Section } from '../components/ui/Section';
import { Container } from '../components/ui/Container';
import { Reveal } from '../components/ui/Reveal';
import { Icon } from '../components/ui/Icon';
import { PageHeader } from '../components/sections/PageHeader';
import { ServiceList } from '../components/sections/ServiceList';
import { CtaBanner } from '../components/sections/CtaBanner';
import styles from './ServicesPage.module.css';

export function ServicesPage(): JSX.Element {
  return (
    <>
      <Seo page={pageSeo.services} />
      <PageHeader
        eyebrow="Diensten & prijzen"
        title="Onze diensten"
        intro="Knippen, kleuren, behandelingen en styling & opsteken — afgestemd op jouw wensen en haartype."
      />

      <Section>
        <Container width="narrow">
          <Reveal className={styles.note}>
            <Icon name="sparkles" size={22} className={styles.noteIcon} />
            <p>
              De tarieven worden binnenkort toegevoegd. Vraag gerust naar de actuele prijzen —
              bel ons op{' '}
              <a className={styles.noteLink} href={`tel:${site.contact.phoneHref}`}>
                {site.contact.phoneDisplay}
              </a>{' '}
              of stuur een{' '}
              <a
                className={styles.noteLink}
                href={site.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp-bericht
              </a>
              .
            </p>
          </Reveal>

          <div className={styles.list}>
            <ServiceList />
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
