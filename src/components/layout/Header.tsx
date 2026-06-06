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
          data-open={menuOpen}
          aria-expanded={menuOpen}
          aria-controls="mobiel-menu"
          aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles.bars} aria-hidden="true" />
        </button>
      </div>

      {/* Altijd gemonteerd → onderbreekbare enter/exit-transities (emil-design-eng). */}
      <div className={styles.mobileMenu} data-open={menuOpen} id="mobiel-menu" aria-hidden={!menuOpen}>
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
            <Button href={site.contact.whatsappHref} variant="secondary" icon="whatsapp" iconPosition="start" fullWidth>
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
    </header>
  );
}
