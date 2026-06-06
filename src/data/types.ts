/**
 * Centrale type-definities voor de volledige content-laag van Hairstudio Serenay.
 *
 * Alle teksten, prijzen, openingstijden, team- en contactgegevens worden via deze
 * interfaces getypeerd en in `src/data/*` ingevuld. Componenten bevatten GEEN
 * hardcoded content — ze lezen uitsluitend uit deze data-laag.
 */

/** Toegestane namen voor de inline SVG-iconenset (zie components/ui/Icon.tsx). */
export type IconName =
  | 'phone'
  | 'whatsapp'
  | 'instagram'
  | 'mail'
  | 'mapPin'
  | 'clock'
  | 'scissors'
  | 'sparkles'
  | 'palette'
  | 'crown'
  | 'arrowRight'
  | 'arrowUpRight'
  | 'menu'
  | 'close'
  | 'chevronLeft'
  | 'chevronRight'
  | 'star'
  | 'heart'
  | 'leaf'
  | 'check';

/* ── Site & contact ──────────────────────────────────────────────────────── */

export interface Address {
  readonly street: string;
  readonly postalCode: string;
  readonly city: string;
  readonly country: string;
}

export interface ContactDetails {
  /** Weergavevorm, NL-notatie, bijv. "06 34192433". */
  readonly phoneDisplay: string;
  /** Internationale vorm voor de tel:-link, bijv. "+31634192433". */
  readonly phoneHref: string;
  /** Volledige WhatsApp-deeplink (wa.me). */
  readonly whatsappHref: string;
  /** E-mailadres. `null` zolang de eigenaar dit nog niet heeft ingevuld. */
  readonly email: string | null;
}

export interface SocialLink {
  readonly platform: string;
  readonly label: string;
  readonly href: string;
  readonly icon: IconName;
}

export interface SiteInfo {
  readonly name: string;
  readonly shortName: string;
  readonly tagline: string;
  readonly taglineAlternatives: readonly string[];
  readonly description: string;
  /** Canoniek productie-domein (uit env, met fallback). */
  readonly url: string;
  readonly address: Address;
  readonly contact: ContactDetails;
  readonly socials: readonly SocialLink[];
}

/* ── Navigatie ───────────────────────────────────────────────────────────── */

export interface NavLink {
  readonly label: string;
  readonly to: string;
}

/* ── Openingstijden ──────────────────────────────────────────────────────── */

export interface OpeningDay {
  readonly day: string;
  /** Openingstijd "HH:MM", of `null` wanneer gesloten. */
  readonly open: string | null;
  /** Sluitingstijd "HH:MM", of `null` wanneer gesloten. */
  readonly close: string | null;
}

/* ── Diensten & prijzen ──────────────────────────────────────────────────── */

/**
 * - `fixed`      : vaste prijs (gebruik `amount`).
 * - `from`       : vanaf-prijs (gebruik `amount`).
 * - `range`      : prijsbereik (gebruik `amount` t/m `amountMax`).
 * - `on-request` : prijs op aanvraag (geen bedrag).
 */
export type PriceKind = 'fixed' | 'from' | 'range' | 'on-request';

export interface ServicePrice {
  readonly kind: PriceKind;
  /** Bedrag in hele of halve euro's, bijv. 35 of 32.5. */
  readonly amount?: number;
  /** Bovengrens bij `kind: 'range'`. */
  readonly amountMax?: number;
}

export interface ServiceItem {
  readonly name: string;
  readonly description?: string;
  readonly price: ServicePrice;
}

export interface ServiceGroup {
  /** Slug, gebruikt als anker-id op de dienstenpagina. */
  readonly id: string;
  readonly title: string;
  readonly intro?: string;
  readonly icon: IconName;
  readonly items: readonly ServiceItem[];
}

/* ── Team ────────────────────────────────────────────────────────────────── */

export interface TeamMember {
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly imageAlt: string;
  /** Pad naar foto in /public/images. Leeg laten = sfeervolle placeholder-tegel. */
  readonly image?: string;
  /** Tint voor de placeholder-tegel wanneer er nog geen foto is. */
  readonly tone: PlaceholderTone;
}

/* ── Over ons ────────────────────────────────────────────────────────────── */

export interface ValueItem {
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
}

export interface AboutContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly lead: string;
  readonly paragraphs: readonly string[];
  readonly values: readonly ValueItem[];
}

/* ── Portfolio / galerij ─────────────────────────────────────────────────── */

export type PlaceholderTone = 'terracotta' | 'sand' | 'olive' | 'clay' | 'cream' | 'ink';

export interface GalleryImage {
  readonly id: string;
  readonly alt: string;
  readonly caption: string;
  readonly category: string;
  /** Pad naar foto in /public/images. Leeg laten = kleurvlak-placeholder. */
  readonly src?: string;
  readonly tone: PlaceholderTone;
}

/* ── SEO ─────────────────────────────────────────────────────────────────── */

export interface PageSeo {
  readonly title: string;
  readonly description: string;
  /** Route-pad, gebruikt voor canonical & og:url. */
  readonly path: string;
  /** Optioneel pad naar een Open Graph-afbeelding in /public. */
  readonly ogImage?: string;
}
