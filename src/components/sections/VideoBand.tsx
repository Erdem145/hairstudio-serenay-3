import { useEffect, useRef } from 'react';
import type { JSX } from 'react';
import { partner } from '../../data';
import { assetUrl } from '../../lib/asset';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import styles from './VideoBand.module.css';

/**
 * Full-bleed band met een self-hosted, gedempte achtergrondvideo (geen externe
 * embed → CSP/AVG-veilig) en de L'Oréal-partnervermelding eroverheen.
 *
 * - Speelt alleen af wanneer in beeld (IntersectionObserver) en pauzeert daarbuiten.
 * - `preload="metadata"` + poster → laadt het bestand pas bij gebruik.
 * - Respecteert prefers-reduced-motion: dan blijft de video staan op de poster.
 */
export function VideoBand(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            void video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.band} aria-label={partner.label}>
      <video
        ref={videoRef}
        className={styles.video}
        poster={assetUrl('/images/sfeer/verhaal.jpg')}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={assetUrl('/video/salon.mp4')} type="video/mp4" />
      </video>
      <div className={styles.scrim} aria-hidden="true" />

      <Container className={styles.inner}>
        <Reveal className={styles.content}>
          <span className={`eyebrow ${styles.eyebrow}`}>{partner.label}</span>
          <p className={styles.text}>{partner.description}</p>
          <span className={styles.logoChip}>
            <img className={styles.logo} src={assetUrl(partner.logo)} alt={partner.alt} loading="lazy" />
          </span>
        </Reveal>
      </Container>
    </section>
  );
}
