import { useEffect } from 'react';
import { openingHours, site } from '../../data';

/**
 * Site-brede structured data (schema.org/HairSalon) als JSON-LD.
 *
 * JSON-LD is het door Google aanbevolen formaat en levert rijke resultaten op
 * (kaartpin, openingstijden, belknop) — belangrijk voor lokale vindbaarheid.
 *
 * CSP-veilig: het injecterende script komt uit de eigen bundle (`script-src 'self'`),
 * en een `application/ld+json`-blok is *data*, geen uitvoerbare code — dat valt niet
 * onder `script-src` en wordt dus niet geblokkeerd. Gegenereerd uit de data-laag,
 * zodat adres/tijden/telefoon nooit kunnen afwijken van de rest van de site.
 */

const SCHEMA_ID = 'ld-hairsalon';

/** NL-dagnaam → schema.org dagnaam. */
const dayToSchema: Record<string, string> = {
  Maandag: 'Monday',
  Dinsdag: 'Tuesday',
  Woensdag: 'Wednesday',
  Donderdag: 'Thursday',
  Vrijdag: 'Friday',
  Zaterdag: 'Saturday',
  Zondag: 'Sunday',
};

function buildSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    name: site.name,
    description: site.description,
    url: site.url,
    image: `${site.url}/images/sfeer/hero-1.jpg`,
    telephone: site.contact.phoneHref,
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressCountry: 'NL',
    },
    // TODO eigenaar: vul exacte coördinaten in voor een kaartpin in Google.
    // (maps.google.com → rechtsklik op de salon → coördinaten kopiëren.)
    // geo: { '@type': 'GeoCoordinates', latitude: 52.3705, longitude: 4.5333 },
    openingHoursSpecification: openingHours
      .filter((day) => day.open && day.close)
      .map((day) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${dayToSchema[day.day]}`,
        opens: day.open,
        closes: day.close,
      })),
    sameAs: site.socials.map((social) => social.href),
  };
}

/** Injecteert de JSON-LD eenmalig in de <head>. Rendert zelf niets. */
export function StructuredData(): null {
  useEffect(() => {
    let el = document.getElementById(SCHEMA_ID) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.id = SCHEMA_ID;
      el.type = 'application/ld+json';
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(buildSchema());
  }, []);

  return null;
}
