import { useEffect, useRef } from 'react';
import type { JSX, ReactNode } from 'react';
import styles from './ParallaxBg.module.css';

interface ParallaxBgProps {
  /** Hoeveel de achtergrondlaag schuift, als fractie van de sectiehoogte (max ~0.25). */
  strength?: number;
  /** Styling van de laag zelf (gradient/patroon). */
  className?: string;
  /** Optionele inhoud in de laag (bijv. een groot woordmerk). */
  children?: ReactNode;
}

/**
 * Parallaxende achtergrondlaag. Plaats als directe child van een sectie met
 * `position: relative; overflow: hidden`. De laag is groter dan de sectie en
 * schuift trager dan de content die eroverheen scrollt → klassieke
 * achtergrond-parallax, zonder gaten.
 *
 * - Meet de SECTIE (parent, niet getransformeerd) → geen feedback-lus.
 * - Alleen `transform: translate3d` (GPU); decoratief (aria-hidden).
 * - Respecteert prefers-reduced-motion.
 */
export function ParallaxBg({ strength = 0.2, className, children }: ParallaxBgProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = ref.current;
    const frame = layer?.parentElement;
    if (!layer || !frame) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    let raf = 0;

    const update = (): void => {
      ticking = false;
      const rect = frame.getBoundingClientRect();
      const viewport = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewport) return;

      const center = rect.top + rect.height / 2;
      const progress = (center - viewport / 2) / (viewport / 2 + rect.height / 2); // -1..1
      const shift = -progress * strength * rect.height;
      layer.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
    };

    const onScroll = (): void => {
      if (!ticking) {
        ticking = true;
        raf = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <div ref={ref} aria-hidden="true" className={`${styles.layer} ${className ?? ''}`}>
      {children}
    </div>
  );
}
