import type { JSX } from 'react';
import { Reveal } from './Reveal';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  /** Kop-niveau voor een correcte heading-hiërarchie. Standaard h2. */
  as?: 'h1' | 'h2' | 'h3';
  /** id op de kop, voor koppeling via aria-labelledby. */
  id?: string;
}

/** Consistente sectiekop: eyebrow + titel + optionele introtekst. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  as: Heading = 'h2',
  id,
}: SectionHeadingProps): JSX.Element {
  return (
    <Reveal className={`${styles.heading} ${align === 'center' ? styles.center : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Heading id={id} className={styles.title}>
        {title}
      </Heading>
      {intro && <p className={styles.intro}>{intro}</p>}
    </Reveal>
  );
}
