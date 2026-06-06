import { useRef, useState } from 'react';
import type { JSX } from 'react';
import { portfolio } from '../../data';
import { usePresence } from '../../lib/usePresence';
import { MediaTile } from '../ui/MediaTile';
import { Reveal } from '../ui/Reveal';
import { Lightbox } from './Lightbox';
import styles from './PortfolioGrid.module.css';

interface PortfolioGridProps {
  /** Beperk het aantal getoonde tegels (bijv. een teaser op de homepagina). */
  limit?: number;
}

/** Galerij met klikbare tegels die de afbeelding in een lightbox vergroten. */
export function PortfolioGrid({ limit }: PortfolioGridProps = {}): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const images = limit ? portfolio.slice(0, limit) : portfolio;
  const count = images.length;

  // Houd de lightbox gemonteerd tijdens de exit-animatie (duur = --dur-slow).
  const { mounted, open: shown } = usePresence(isOpen, 300);

  const open = (index: number, element: HTMLButtonElement): void => {
    triggerRef.current = element;
    setActiveIndex(index);
    setIsOpen(true);
  };
  const close = (): void => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };
  const prev = (): void => setActiveIndex((i) => (i - 1 + count) % count);
  const next = (): void => setActiveIndex((i) => (i + 1) % count);

  return (
    <>
      <ul className={styles.grid}>
        {images.map((image, index) => (
          <Reveal as="li" key={image.id} delay={(index % 4) * 50}>
            <button
              type="button"
              className={styles.tile}
              onClick={(event) => open(index, event.currentTarget)}
              aria-label={`${image.caption} — vergroot weergave`}
            >
              <MediaTile
                {...(image.src ? { src: image.src } : {})}
                alt={image.alt}
                tone={image.tone}
                ratio="4 / 5"
                className={styles.media}
              />
              <span className={styles.overlay}>
                <span className={styles.category}>{image.category}</span>
                <span className={styles.caption}>{image.caption}</span>
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      {mounted && (
        <Lightbox
          images={images}
          index={activeIndex}
          open={shown}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}
