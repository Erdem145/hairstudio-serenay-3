import { useEffect, useRef } from 'react';
import type { CSSProperties, JSX } from 'react';
import type { PlaceholderTone } from '../../data/types';
import styles from './ParallaxImage.module.css';

interface ParallaxImageProps {
  /** Pad naar een echte foto. Ontbreekt → kleurvlak-placeholder. */
  src?: string;
  /** Beschrijving. Leeg ('') = decoratief (verborgen voor screenreaders). */
  alt: string;
  tone: PlaceholderTone;
  /** CSS aspect-ratio van het (vaste) kader. */
  ratio?: string;
  /** Hoeveel het beeld bínnen het kader schuift, als fractie van de kaderhoogte (max ~0.2). */
  strength?: number;
  className?: string;
}

/**
 * Parallax-beeld volgens de "vast kader, schuivend beeld"-techniek.
 *
 * Het kader staat vast in de layout (overflow: hidden, vaste verhouding → geen
 * layout shift). De binnenlaag is hoger dan het kader en schuift op scroll —
 * dat geeft een duidelijk zichtbare parallax zónder gaten.
 *
 * - Alleen `transform: translate3d` op de binnenlaag (GPU).
 * - Meet het KADER (dat niet transformeert) → geen feedback-lus.
 * - Respecteert prefers-reduced-motion (dan staat het beeld stil, gecentreerd).
 */
export function ParallaxImage({
  src,
  alt,
  tone,
  ratio = '4 / 5',
  strength = 0.18,
  className,
}: ParallaxImageProps): JSX.Element {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner) return;
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
      inner.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
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

  const frameStyle = { aspectRatio: ratio } as CSSProperties;
  const decorative = alt === '';
  const semantics = decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': alt };

  return (
    <div ref={frameRef} className={`${styles.frame} ${className ?? ''}`} style={frameStyle}>
      <div ref={innerRef} className={styles.inner}>
        {src ? (
          <img src={src} alt={alt} loading="lazy" decoding="async" className={styles.img} />
        ) : (
          <div className={`${styles.placeholder} ${styles[tone]}`} {...semantics}>
            <span className={styles.glyph} aria-hidden="true">
              S
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
