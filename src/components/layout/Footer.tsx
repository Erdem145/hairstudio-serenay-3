import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { navigation, openingHours, partner, site } from '../../data';
import { formatDayHours } from '../../lib/format';
import { assetUrl } from '../../lib/asset';
import { Icon } from '../ui/Icon';
import { Wordmark } from './Wordmark';
import styles from './Footer.module.css';

/** Schema.org-afkortingen voor openingstijden (microdata, CSP-veilig). */
const schemaDay: Record<string, string> = {
  Maandag: 'Mo',
  Dinsdag: 'Tu',
  Woensdag: 'We',
  Donderdag: 'Th',
  Vrijdag: 'Fr',
  Zaterdag: 'Sa',
  Zondag: 'Su',
};

export function Footer(): JSX.Element {
  const year = new Date().getFullYear();
  const { address, contact, socials } = site;

  return (
    <footer className={styles.footer} itemScope itemType="https://schema.org/HairSalon">
      {/* Structured data zonder inline script — gegenereerd uit de data-laag. */}
      <meta itemProp="name" content={site.name} />
      <meta itemProp="url" content={site.url} />
      <meta itemProp="image" content={`${site.url}/favicon.svg`} />
      <meta itemProp="priceRange" content="€€" />
      {openingHours.map((day) =>
        day.open && day.close ? (
          <meta
            key={day.day}
            itemProp="openingHours"
            content={`${schemaDay[day.day]} ${day.open}-${day.close}`}
          />
        ) : null,
      )}

      <div className={styles.inner}>
        <div className={styles.brand}>
          <Wordmark tone="light" />
          <p className={styles.description} itemProp="description">
            {site.description}
          </p>
          {socials.length > 0 && (
            <ul className={styles.socials}>
              {socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    itemProp="sameAs"
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
          <address
            className={styles.address}
            itemProp="address"
            itemScope
            itemType="https://schema.org/PostalAddress"
          >
            <span itemProp="streetAddress">{address.street}</span>
            <span>
              <span itemProp="postalCode">{address.postalCode}</span>{' '}
              <span itemProp="addressLocality">{address.city}</span>
            </span>
            <meta itemProp="addressCountry" content="NL" />
          </address>
          <ul className={styles.linkList}>
            <li>
              <a href={`tel:${contact.phoneHref}`} className={styles.link} itemProp="telephone">
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
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} className={styles.link} itemProp="email">
                  {contact.email}
                </a>
              </li>
            )}
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
