import type { JSX } from 'react';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  intro?: string;
}

/** Consistente kop bovenaan de subpagina's: eyebrow + H1 + introtekst. */
export function PageHeader({ eyebrow, title, intro }: PageHeaderProps): JSX.Element {
  return (
    <header className={styles.header}>
      <Container>
        <Reveal className={styles.inner}>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className={styles.title}>{title}</h1>
          {intro && <p className={styles.intro}>{intro}</p>}
        </Reveal>
      </Container>
    </header>
  );
}
