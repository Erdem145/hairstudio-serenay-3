import type { JSX, ReactNode } from 'react';
import styles from './Container.module.css';

interface ContainerProps {
  children: ReactNode;
  /** 'default' = brede contentbreedte, 'narrow' = leesbreedte voor lopende tekst. */
  width?: 'default' | 'narrow';
  className?: string;
}

/** Centreert content en houdt een consistente maximale breedte + gutters aan. */
export function Container({ children, width = 'default', className }: ContainerProps): JSX.Element {
  const classes = [styles.container, width === 'narrow' && styles.narrow, className]
    .filter(Boolean)
    .join(' ');
  return <div className={classes}>{children}</div>;
}
