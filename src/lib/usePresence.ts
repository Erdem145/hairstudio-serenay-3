import { useEffect, useRef, useState } from 'react';

/**
 * Houdt een component gemonteerd tijdens zijn exit-animatie, zodat sluiten net
 * zo soepel verloopt als openen (i.p.v. abrupt unmounten).
 *
 * Gebruik:
 *   const { mounted, open } = usePresence(isOpen, 300);
 *   if (!mounted) return null;
 *   return <div data-open={open} ...>  // CSS stuurt enter/exit op [data-open]
 *
 * `durationMs` moet overeenkomen met de CSS-transitieduur van de exit.
 */
export function usePresence(
  isOpen: boolean,
  durationMs = 300,
): { mounted: boolean; open: boolean } {
  const [mounted, setMounted] = useState(isOpen);
  const [open, setOpen] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // Twee frames wachten zodat de gesloten staat eerst geschilderd wordt
      // en de enter-transitie daadwerkelijk afspeelt.
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(() => setOpen(true));
      });
      return () => cancelAnimationFrame(rafRef.current);
    }

    setOpen(false);
    const timer = setTimeout(() => setMounted(false), durationMs);
    return () => clearTimeout(timer);
  }, [isOpen, durationMs]);

  return { mounted, open };
}
