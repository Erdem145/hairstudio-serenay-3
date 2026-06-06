import type { JSX } from 'react';
import { site } from '../../data';
import type { PlaceholderTone } from '../../data/types';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';
import { MediaTile } from '../ui/MediaTile';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import styles from './InstagramTeaser.module.css';

/**
 * Instagram-teaser: stijlvolle placeholder-tegels die naar het profiel linken.
 * Bewust GEEN live feed-integratie (geen externe scripts/AVG-implicaties); de
 * eigenaar plaatst hier later eigen beelden of houdt het als verwijzing.
 */
const tones: readonly PlaceholderTone[] = ['terracotta', 'sand', 'olive', 'clay', 'cream', 'ink'];

export function InstagramTeaser(): JSX.Element | null {
  const instagram = site.socials.find((social) => social.platform === 'Instagram');
  if (!instagram) return null;

  return (
    <>
      <SectionHeading
        eyebrow="Instagram"
        title="Volg ons werk online"
        intro={`Bekijk de nieuwste looks op ${instagram.label}.`}
        align="center"
      />
      <ul className={styles.grid}>
        {tones.map((tone, index) => (
          <Reveal as="li" key={tone} delay={(index % 6) * 40}>
            <a
              className={styles.tile}
              href={instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Bekijk onze Instagram ${instagram.label}`}
            >
              <MediaTile alt="" tone={tone} ratio="1 / 1" className={styles.media} />
              <span className={styles.overlay} aria-hidden="true">
                <Icon name="instagram" size={26} />
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
      <Reveal className={styles.cta}>
        <Button href={instagram.href} variant="secondary" icon="instagram" iconPosition="start">
          {instagram.label}
        </Button>
      </Reveal>
    </>
  );
}
