import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrollt naar boven bij een routewissel (of naar het anker als de URL een
 * hash bevat). Houdt de navigatie voorspelbaar — vereiste UX bij client-side routing.
 */
export function ScrollToTop(): null {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
