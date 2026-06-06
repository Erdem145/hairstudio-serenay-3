import { useEffect, useRef } from 'react';
import type { JSX } from 'react';
import type { GalleryImage } from '../../data/types';
import { Icon } from '../ui/Icon';
import { MediaTile } from '../ui/MediaTile';
import styles from './Lightbox.module.css';

interface LightboxProps {
  images: readonly GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * Toegankelijke lightbox: pijltjestoetsen navigeren, Escape sluit, focus blijft
 * binnen de dialoog. Modaal blijft gecentreerd (transform-origin center).
 */
export function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps): JSX.Element {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const image = images[index];

  // Bij openen: scroll vergrendelen en focus naar de sluitknop (eenmalig).
  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Toetsenbordbediening: Escape sluit, pijltjes navigeren, Tab blijft binnen de dialoog.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case 'Tab': {
          // Eenvoudige focus-trap binnen de dialoog.
          const focusables = dialogRef.current?.querySelectorAll<HTMLElement>('button');
          if (!focusables || focusables.length === 0) break;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
          break;
        }
        default:
          break;
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!image) return <></>;

  return (
    <div
      className={styles.backdrop}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={`Afbeelding ${index + 1} van ${images.length}: ${image.caption}`}
      >
        <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label="Sluiten">
          <Icon name="close" size={24} />
        </button>

        <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={onPrev} aria-label="Vorige afbeelding">
          <Icon name="chevronLeft" size={28} />
        </button>

        <div className={styles.media}>
          {image.src ? (
            <img className={styles.image} src={image.src} alt={image.alt} />
          ) : (
            <MediaTile alt={image.alt} tone={image.tone} ratio="3 / 4" className={styles.placeholder} />
          )}
          <figcaption className={styles.caption}>
            <span className={styles.category}>{image.category}</span>
            <span className={styles.captionText}>{image.caption}</span>
            <span className={styles.counter}>
              {index + 1} / {images.length}
            </span>
          </figcaption>
        </div>

        <button type="button" className={`${styles.nav} ${styles.next}`} onClick={onNext} aria-label="Volgende afbeelding">
          <Icon name="chevronRight" size={28} />
        </button>
      </div>
    </div>
  );
}
