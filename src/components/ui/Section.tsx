import type { ElementType, JSX, ReactNode } from 'react';
import styles from './Section.module.css';

type Surface = 'default' | 'sand' | 'dark';

interface SectionProps {
  children: ReactNode;
  /** Achtergrondvariant; bepaalt afwisseling in het verticale ritme. */
  surface?: Surface;
  /** Semantisch element (standaard <section>). */
  as?: ElementType;
  id?: string;
  className?: string;
  'aria-labelledby'?: string;
  'aria-label'?: string;
}

/** Sectie-wrapper met consistent verticaal ritme en optionele achtergrond. */
export function Section({
  children,
  surface = 'default',
  as: Tag = 'section',
  id,
  className,
  ...aria
}: SectionProps): JSX.Element {
  const surfaceClass = surface === 'sand' ? styles.sand : surface === 'dark' ? styles.dark : '';
  const classes = [styles.section, surfaceClass, className].filter(Boolean).join(' ');
  return (
    <Tag id={id} className={classes} {...aria}>
      {children}
    </Tag>
  );
}
