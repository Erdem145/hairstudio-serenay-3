import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieConsent } from './CookieConsent';
import { ScrollToTop } from './ScrollToTop';

/** Gemeenschappelijke paginastructuur: header, hoofdinhoud, footer en consent. */
export function Layout(): JSX.Element {
  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#hoofdinhoud">
        Naar inhoud springen
      </a>
      <Header />
      <main id="hoofdinhoud">
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
