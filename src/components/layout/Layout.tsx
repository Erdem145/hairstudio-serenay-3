import type { JSX } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieConsent } from './CookieConsent';
import { ScrollToTop } from './ScrollToTop';
import styles from './Layout.module.css';

/** Gemeenschappelijke paginastructuur: header, hoofdinhoud, footer en consent. */
export function Layout(): JSX.Element {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#hoofdinhoud">
        Naar inhoud springen
      </a>
      <Header />
      <main id="hoofdinhoud">
        {/* key per route → zachte entree-transitie bij paginawissel. */}
        <div key={location.pathname} className={styles.page}>
          <Outlet />
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
