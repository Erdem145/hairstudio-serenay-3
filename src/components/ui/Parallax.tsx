import type { JSX, ReactNode } from 'react';
import { useParallax } from '../../lib/useParallax';
import styles from './Parallax.module.css';

interface ParallaxProps {
  children: ReactNode;
  /** 0 = geen effect, 0.1–0.25 = subtiel. Negatief = omgekeerde richting. */
  speed?: number;
  className?: string;
}

/** Wrapper die zijn inhoud een subtiele parallax geeft bij het scrollen. */
export function Parallax({ children, speed = 0.15, className }: ParallaxProps): JSX.Element {
  const ref = useParallax<HTMLDivElement>(speed);
  return (
    <div ref={ref} className={`${styles.parallax} ${className ?? ''}`}>
      {children}
    </div>
  );
}
