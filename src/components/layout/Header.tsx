import { useEffect, useRef, useState } from 'react';
import type { JSX } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navigation, site } from '../../data';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';
import { Wordmark } from './Wordmark';
import styles from './Header.module.css';

export function Header(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const { pathname } = useLocation();

  // Subtiele achtergrond zodra de bezoeker scrollt.
  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sluit het mobiele menu bij een routewissel.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Scroll-lock + Escape-afsluiting + focus wanneer het menu open is.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = (): void => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Wordmark />

        <nav className={styles.desktopNav} aria-label="Hoofdnavigatie">
          <ul className={styles.navList}>
            {navigation.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button href={`tel:${site.contact.phoneHref}`} variant="secondary" size="md" icon="phone" iconPosition="start">
            Bel ons
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className={styles.menuToggle}
          aria-expanded={menuOpen}
          aria-controls="mobiel-menu"
          aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={26} />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu} id="mobiel-menu">
          <nav aria-label="Mobiele navigatie">
            <ul className={styles.mobileList}>
              {navigation.map((link, index) => (
                <li key={link.to}>
                  <NavLink
                    ref={index === 0 ? firstLinkRef : undefined}
                    to={link.to}
                    end={link.to === '/'}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.mobileActions}>
            <Button href={`tel:${site.contact.phoneHref}`} icon="phone" iconPosition="start" fullWidth>
              Bel {site.contact.phoneDisplay}
            </Button>
            <Button href={site.contact.whatsappHref} variant="secondary" icon="whatsapp" iconPosition="start" fullWidth>
              WhatsApp
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
