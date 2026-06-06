import type { JSX } from 'react';
import { about, pageSeo, site } from '../data';
import { Seo } from '../components/seo/Seo';
import { Section } from '../components/ui/Section';
import { Container } from '../components/ui/Container';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import { ParallaxImage } from '../components/ui/ParallaxImage';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Icon } from '../components/ui/Icon';
import { Hero } from '../components/sections/Hero';
import { StatementBand } from '../components/sections/StatementBand';
import { ServicesPreview } from '../components/sections/ServicesPreview';
import { PortfolioGrid } from '../components/sections/PortfolioGrid';
import { HoursCard } from '../components/sections/HoursCard';
import { CtaBanner } from '../components/sections/CtaBanner';
import styles from './HomePage.module.css';

export function HomePage(): JSX.Element {
  return (
    <>
      <Seo page={pageSeo.home} />
      <Hero />

      {/* Welkom / korte introductie */}
      <Section aria-labelledby="welkom-titel">
        <Container className={styles.split}>
          <Reveal className={styles.splitCopy}>
            <span className="eyebrow">Welkom</span>
            <h2 id="welkom-titel">{about.lead}</h2>
            <p className={styles.paragraph}>{about.paragraphs[0]}</p>
            <Button to="/over-ons" variant="ghost" icon="arrowRight">
              Lees ons verhaal
            </Button>
          </Reveal>
          <Reveal className={styles.splitMedia} delay={120}>
            <ParallaxImage
              src="/images/sfeer/welkom.jpg"
              alt="Sfeerbeeld van Hairstudio Serenay"
              tone="olive"
              ratio="4 / 5"
              strength={0.18}
            />
          </Reveal>
        </Container>
      </Section>

      {/* Diensten */}
      <Section surface="sand" aria-labelledby="diensten-titel">
        <Container>
          <SectionHeading
            id="diensten-titel"
            eyebrow="Wat we doen"
            title="Onze diensten"
            intro="Van een frisse coupe tot een feestelijke opsteek — ontdek wat we voor je kunnen betekenen."
            align="center"
          />
          <div className={styles.servicesWrap}>
            <ServicesPreview />
          </div>
          <Reveal className={styles.centerCta}>
            <Button to="/diensten" size="lg" icon="arrowRight">
              Alle diensten &amp; prijzen
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* Sfeerband met achtergrond-parallax */}
      <StatementBand />

      {/* Portfolio-teaser */}
      <Section aria-labelledby="werk-titel">
        <Container>
          <SectionHeading
            id="werk-titel"
            eyebrow="Portfolio"
            title="Een greep uit ons werk"
            intro="Een impressie van coupes, kleuringen en opsteekkapsels. Bekijk de volledige galerij."
          />
          <div className={styles.servicesWrap}>
            <PortfolioGrid limit={4} />
          </div>
          <Reveal className={styles.centerCta}>
            <Button to="/portfolio" variant="secondary" size="lg" icon="arrowRight">
              Bekijk het portfolio
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* Bezoek plannen: openingstijden + contact */}
      <Section surface="sand" aria-labelledby="bezoek-titel">
        <Container>
          <SectionHeading
            id="bezoek-titel"
            eyebrow="Langskomen"
            title="Plan je bezoek"
            intro="We zitten aan de Tolweg 20 in Zandvoort. Bel of app gerust voor een afspraak."
          />
          <div className={styles.visit}>
            <Reveal>
              <HoursCard />
            </Reveal>
            <Reveal delay={120} className={styles.visitPanel}>
              <div className={styles.address}>
                <span className={styles.addressIcon}>
                  <Icon name="mapPin" size={22} />
                </span>
                <div>
                  <p className={styles.addressLine}>{site.address.street}</p>
                  <p className={styles.addressLine}>
                    {site.address.postalCode} {site.address.city}
                  </p>
                </div>
              </div>
              <p className={styles.panelText}>
                Vragen over een behandeling of de mogelijkheden? Neem gerust contact op — we
                helpen je graag verder.
              </p>
              <div className={styles.panelActions}>
                <Button href={`tel:${site.contact.phoneHref}`} icon="phone" iconPosition="start" fullWidth>
                  Bel {site.contact.phoneDisplay}
                </Button>
                <Button
                  href={site.contact.whatsappHref}
                  variant="secondary"
                  icon="whatsapp"
                  iconPosition="start"
                  fullWidth
                >
                  WhatsApp ons
                </Button>
                <Button to="/contact" variant="ghost" icon="arrowRight">
                  Naar contact &amp; route
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
