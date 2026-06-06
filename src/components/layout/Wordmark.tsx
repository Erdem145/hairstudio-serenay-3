import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../../data';
import styles from './Wordmark.module.css';

interface WordmarkProps {
  /** Lichte variant voor donkere achtergronden (footer). */
  tone?: 'default' | 'light';
}

/** Tekstueel logo (wordmark) van de salon, linkt naar de homepagina. */
export function Wordmark({ tone = 'default' }: WordmarkProps): JSX.Element {
  const [prefix, ...rest] = site.name.split(' ');
  const accent = rest.join(' ');

  return (
    <Link
      to="/"
      className={`${styles.wordmark} ${tone === 'light' ? styles.light : ''}`}
      aria-label={`${site.name} — naar homepagina`}
    >
      <span className={styles.prefix}>{prefix}</span>
      <span className={styles.accent}>{accent}</span>
    </Link>
  );
}
