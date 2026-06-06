import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, JSX } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navigation, openingHours, site } from '../../data';
import { formatAddressLine, getOpenStatus } from '../../lib/format';
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
  const status = getOpenStatus(openingHours);
  const instagram = site.socials.find((social) => social.platform === 'Instagram');

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

    const scrollY = window.scrollY;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = (): void => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.menuOpen : ''}`}
      >
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
            <Button
              href={`tel:${site.contact.phoneHref}`}
              variant="secondary"
              size="md"
              icon="phone"
              iconPosition="start"
            >
              Bel ons
            </Button>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className={styles.menuToggle}
            data-open={menuOpen}
            aria-expanded={menuOpen}
            aria-controls="mobiel-menu"
            aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={styles.bars} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Overlay BEWUST buiten <header>: een gescrolde header heeft backdrop-filter,
          en dat maakt een containing block voor position:fixed-kinderen. Binnen de
          header zou het menu daardoor inklappen tot de headerhoogte. Als sibling
          blijft het altijd t.o.v. het scherm gepositioneerd. */}
      <div
        className={styles.mobileMenu}
        data-open={menuOpen}
        id="mobiel-menu"
        aria-hidden={!menuOpen}
        style={{ '--n': navigation.length } as CSSProperties}
      >
        <nav className={styles.mobileNav} aria-label="Mobiele navigatie">
          <ul className={styles.mobileList}>
            {navigation.map((link, index) => (
              <li key={link.to} style={{ '--i': index } as CSSProperties}>
                <NavLink
                  ref={index === 0 ? firstLinkRef : undefined}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
                  }
                >
                  <span>{link.label}</span>
                  <Icon name="arrowUpRight" size={22} className={styles.mobileLinkIcon} />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.mobileFooter}>
          <div className={styles.mobileMeta}>
            <span className={`${styles.statusPill} ${status.isOpen ? styles.open : styles.closed}`}>
              <span className={styles.dot} aria-hidden="true" />
              {status.label}
            </span>
            <span className={styles.mobileAddress}>
              <Icon name="mapPin" size={16} />
              {formatAddressLine(site.address)}
            </span>
          </div>
          <div className={styles.mobileActions}>
            <Button href={`tel:${site.contact.phoneHref}`} icon="phone" iconPosition="start" fullWidth>
              Bel {site.contact.phoneDisplay}
            </Button>
            <Button
              href={site.contact.whatsappHref}
              variant="secondary"
              icon="whatsapp"
              iconPosition="start"
              fullWidth
            >
              WhatsApp ons
            </Button>
            {instagram && (
              <a
                className={styles.mobileSocial}
                href={instagram.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="instagram" size={20} />
                {instagram.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
