import type { CSSProperties, JSX } from 'react';
import type { PlaceholderTone } from '../../data/types';
import { assetUrl } from '../../lib/asset';
import styles from './MediaTile.module.css';

interface MediaTileProps {
  /** Pad naar een echte foto. Ontbreekt → stijlvolle kleurvlak-placeholder. */
  src?: string;
  /** Beschrijvende tekst. Leeg ('') = decoratief (wordt verborgen voor screenreaders). */
  alt: string;
  tone: PlaceholderTone;
  /** CSS aspect-ratio, bijv. '4 / 5'. Reserveert ruimte → voorkomt layout shift. */
  ratio?: string;
  className?: string;
}

/**
 * Toont een echte foto (lazy-loaded, met gereserveerde verhouding) óf — zolang
 * de eigenaar nog geen foto heeft toegevoegd — een sfeervolle placeholder-tegel.
 *
 * EIGEN FOTO'S: plaats het bestand in /public/images en vul `src` in de
 * bijbehorende data (team.ts of portfolio.ts).
 */
export function MediaTile({ src, alt, tone, ratio = '4 / 5', className }: MediaTileProps): JSX.Element {
  const style = { aspectRatio: ratio } as CSSProperties;
  const wrapperClass = [styles.tile, className ?? ''].filter(Boolean).join(' ');

  if (src) {
    return (
      <div className={wrapperClass} style={style}>
        <img src={assetUrl(src)} alt={alt} loading="lazy" decoding="async" className={styles.image} />
      </div>
    );
  }

  const semantics = alt === '' ? { 'aria-hidden': true } : { role: 'img', 'aria-label': alt };
  return (
    <div className={`${wrapperClass} ${styles.placeholder} ${styles[tone]}`} style={style} {...semantics}>
      <span className={styles.glyph} aria-hidden="true">
        S
      </span>
    </div>
  );
}
