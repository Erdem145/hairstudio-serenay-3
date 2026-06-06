import type { JSX } from 'react';
import { pageSeo } from '../data';
import { Seo } from '../components/seo/Seo';
import { Section } from '../components/ui/Section';
import { Container } from '../components/ui/Container';
import { Reveal } from '../components/ui/Reveal';
import { PageHeader } from '../components/sections/PageHeader';
import { PortfolioGrid } from '../components/sections/PortfolioGrid';
import { InstagramTeaser } from '../components/sections/InstagramTeaser';
import { CtaBanner } from '../components/sections/CtaBanner';
import styles from './PortfolioPage.module.css';

export function PortfolioPage(): JSX.Element {
  return (
    <>
      <Seo page={pageSeo.portfolio} />
      <PageHeader
        eyebrow="Portfolio"
        title="Een impressie van ons werk"
        intro="Klik op een beeld om het te vergroten. Binnenkort vervangen we deze sfeerbeelden door eigen foto's uit de salon."
      />

      <Section>
        <Container>
          <PortfolioGrid />
          <Reveal>
            <p className={styles.note}>
              De getoonde beelden zijn tijdelijke placeholders. Volg ons op Instagram voor de
              nieuwste looks.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section surface="sand" aria-label="Instagram">
        <Container>
          <InstagramTeaser />
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
