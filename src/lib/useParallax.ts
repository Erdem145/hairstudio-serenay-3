import { useEffect, useRef } from 'react';

/**
 * Subtiele, performante parallax op scroll.
 *
 * - Beweegt het element met `transform: translate3d` (GPU, geen layout) — nooit
 *   width/height/top. Werkt cross-browser, óók op iOS Safari (i.t.t. CSS
 *   scroll-timelines).
 * - Respecteert `prefers-reduced-motion`: dan gebeurt er niets.
 * - rAF-throttled; rekent alleen wanneer het element in de buurt van de viewport is.
 *
 * `speed`: hoeveel het element "achterblijft". 0 = geen effect, 0.1–0.25 = subtiel.
 * Negatieve waarde keert de richting om (handig voor een tweede laag → diepte).
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.15) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) return;

    let frame = 0;
    let ticking = false;

    const update = (): void => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;

      // Sla over wanneer het element ver buiten beeld is (goedkoop).
      if (rect.bottom < -viewport * 0.5 || rect.top > viewport * 1.5) return;

      // -1 (net onder beeld) .. 0 (gecentreerd) .. 1 (net boven beeld)
      const center = rect.top + rect.height / 2;
      const progress = (center - viewport / 2) / (viewport / 2 + rect.height / 2);
      const offset = -progress * speed * 100;
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const onScroll = (): void => {
      if (!ticking) {
        ticking = true;
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.cancelAnimationFrame(frame);
      el.style.transform = '';
    };
  }, [speed]);

  return ref;
}
