import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { navigation, openingHours, partner, site } from '../../data';
import { formatDayHours } from '../../lib/format';
import { assetUrl } from '../../lib/asset';
import { Icon } from '../ui/Icon';
import { Wordmark } from './Wordmark';
import styles from './Footer.module.css';

/**
 * Site-footer. De structured data (schema.org/HairSalon) zit niet meer als
 * microdata hier, maar als rijke JSON-LD via de StructuredData-component.
 */
export function Footer(): JSX.Element {
  const year = new Date().getFullYear();
  const { address, contact, socials } = site;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Wordmark tone="light" />
          <p className={styles.description}>{site.description}</p>
          {socials.length > 0 && (
            <ul className={styles.socials}>
              {socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.shortName} op ${social.platform}`}
                  >
                    <Icon name={social.icon} size={20} />
                    <span>{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
          <div className={styles.partner}>
            <span className={styles.partnerLabel}>{partner.label}</span>
            <span className={styles.partnerChip}>
              <img
                className={styles.partnerLogo}
                src={assetUrl(partner.logo)}
                alt={partner.alt}
                loading="lazy"
              />
            </span>
          </div>
        </div>

        <nav className={styles.column} aria-label="Footernavigatie">
          <h2 className={styles.colTitle}>Navigatie</h2>
          <ul className={styles.linkList}>
            {navigation.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.column}>
          <h2 className={styles.colTitle}>Contact</h2>
          <address className={styles.address}>
            <span>{address.street}</span>
            <span>
              {address.postalCode} {address.city}
            </span>
          </address>
          <ul className={styles.linkList}>
            <li>
              <a href={`tel:${contact.phoneHref}`} className={styles.link}>
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={contact.whatsappHref}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </li>
            <li>
              {contact.email ? (
                <a href={`mailto:${contact.email}`} className={styles.link}>
                  {contact.email}
                </a>
              ) : (
                <span className={styles.muted}>E-mailadres volgt binnenkort</span>
              )}
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h2 className={styles.colTitle}>Openingstijden</h2>
          <ul className={styles.hoursList}>
            {openingHours.map((day) => {
              const closed = day.open === null;
              return (
                <li key={day.day} className={styles.hoursRow}>
                  <span>{day.day}</span>
                  <span className={closed ? styles.muted : undefined}>{formatDayHours(day)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          © {year} {site.name}. Alle rechten voorbehouden.
        </p>
        <p className={styles.muted}>Gemaakt met zorg in Zandvoort.</p>
      </div>
    </footer>
  );
}
