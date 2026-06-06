import type { JSX } from 'react';
import { about, pageSeo } from '../data';
import { Seo } from '../components/seo/Seo';
import { Section } from '../components/ui/Section';
import { Container } from '../components/ui/Container';
import { Reveal } from '../components/ui/Reveal';
import { Icon } from '../components/ui/Icon';
import { MediaTile } from '../components/ui/MediaTile';
import { Parallax } from '../components/ui/Parallax';
import { SectionHeading } from '../components/ui/SectionHeading';
import { PageHeader } from '../components/sections/PageHeader';
import { TeamGrid } from '../components/sections/TeamGrid';
import { CtaBanner } from '../components/sections/CtaBanner';
import styles from './AboutPage.module.css';

export function AboutPage(): JSX.Element {
  return (
    <>
      <Seo page={pageSeo.about} />
      <PageHeader eyebrow={about.eyebrow} title={about.title} intro={about.lead} />

      {/* Verhaal + beeld */}
      <Section aria-labelledby="verhaal-titel">
        <Container className={styles.story}>
          <Reveal className={styles.storyMedia}>
            <Parallax speed={0.12}>
              <MediaTile alt="Sfeerbeeld van de salon" tone="clay" ratio="4 / 5" />
            </Parallax>
          </Reveal>
          <Reveal className={styles.storyCopy} delay={120}>
            <h2 id="verhaal-titel" className="visually-hidden">
              Ons verhaal
            </h2>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* Waarden */}
      <Section surface="sand" aria-labelledby="waarden-titel">
        <Container>
          <SectionHeading
            id="waarden-titel"
            eyebrow="Onze belofte"
            title="Waar we voor staan"
            align="center"
          />
          <ul className={styles.values}>
            {about.values.map((value, index) => (
              <Reveal as="li" key={value.title} delay={index * 70} className={styles.valueCard}>
                <span className={styles.valueIcon}>
                  <Icon name={value.icon} size={24} />
                </span>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueText}>{value.description}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Team */}
      <Section aria-labelledby="team-titel">
        <Container>
          <SectionHeading
            id="team-titel"
            eyebrow="Het team"
            title="Moeder en dochter"
            intro="Samen zorgen Suna en Serenay ervoor dat je je thuis voelt en stralend de deur uit gaat."
          />
          <div className={styles.team}>
            <TeamGrid />
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
