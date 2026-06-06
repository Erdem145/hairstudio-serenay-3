# Hairstudio Serenay — marketingwebsite

Een verfijnde, informatieve marketingwebsite voor dameskapsalon **Hairstudio Serenay**
in Zandvoort. De site toont diensten, prijzen, openingstijden, team, sfeerbeelden en
contactgegevens. Er is **geen** boekingssysteem — contact loopt via telefoon, WhatsApp
en Instagram.

## Inhoud

- [Techniek](#techniek)
- [Aan de slag](#aan-de-slag)
- [Projectstructuur](#projectstructuur)
- [Content aanpassen (voor de eigenaar)](#content-aanpassen-voor-de-eigenaar)
- [Designsysteem](#designsysteem)
- [Toegankelijkheid & SEO](#toegankelijkheid--seo)
- [Security](#security)
- [Deployen](#deployen)

## Techniek

- **Vite 6** + **React 18** + **TypeScript** (strict)
- **React Router** voor de pagina's
- **CSS Modules** + **design tokens** (CSS custom properties) — geen runtime CSS-framework
- **Self-hosted lettertypes** via `@fontsource` (Cormorant + Inter) — geen externe font-CDN
- Geen backend, geen database, geen formulieren met dataopslag

## Aan de slag

Vereisten: **Node.js 20+** en npm.

```bash
npm install        # dependencies installeren
npm run dev        # ontwikkelserver (http://localhost:5173)
npm run build      # typecheck + productie-build naar dist/
npm run preview    # de productie-build lokaal bekijken
npm run typecheck  # alleen de TypeScript-typecheck
```

De productie-build (`npm run build`) draait eerst de typecheck (`tsc -b`) en faalt bij
fouten. De output staat in `dist/` en is een statische site die overal te hosten is.

## Projectstructuur

```
src/
├── data/            # ► ALLE content (één centrale, getypeerde bron)
│   ├── types.ts        interfaces voor alle content
│   ├── site.ts         naam, taglines, adres, contact, social
│   ├── navigation.ts   menu-items
│   ├── hours.ts        openingstijden
│   ├── services.ts     diensten & prijzen (4 groepen)
│   ├── team.ts         teamleden
│   ├── about.ts        "Over ons"-tekst & waarden
│   ├── portfolio.ts    galerij-items
│   └── seo.ts          per-pagina meta (title/description)
├── lib/             # herbruikbare hooks/helpers (reveal, SEO-meta, consent, format)
├── styles/          # tokens.css (design tokens) + global.css
├── components/
│   ├── ui/             kleine bouwstenen (Button, Icon, Section, Reveal, MediaTile …)
│   ├── layout/         Header, Footer, Layout, CookieConsent, ScrollToTop
│   ├── seo/            Seo-component
│   └── sections/       paginasecties (Hero, ServiceList, PortfolioGrid, MapEmbed …)
└── pages/           # één bestand per route
```

**Belangrijk principe:** componenten bevatten geen hardcoded teksten. Alles komt uit
de `data/`-laag. Wil je iets wijzigen aan de inhoud, dan hoef je alleen daar te zijn.

## Content aanpassen (voor de eigenaar)

Alle teksten en gegevens staan in de map [`src/data/`](src/data/). De bestanden zijn
voorzien van uitleg in commentaar.

| Wat wil je wijzigen? | Bestand |
| --- | --- |
| Telefoon, WhatsApp, **e-mailadres**, Instagram, adres, taglines | [`src/data/site.ts`](src/data/site.ts) |
| Openingstijden | [`src/data/hours.ts`](src/data/hours.ts) |
| Diensten en **prijzen** | [`src/data/services.ts`](src/data/services.ts) |
| Team (Suna & Serenay) en hun foto's | [`src/data/team.ts`](src/data/team.ts) |
| "Over ons"-tekst en waarden | [`src/data/about.ts`](src/data/about.ts) |
| Portfolio / sfeerbeelden | [`src/data/portfolio.ts`](src/data/portfolio.ts) |
| Pagina-titels & SEO-omschrijvingen | [`src/data/seo.ts`](src/data/seo.ts) |

### Prijzen invullen

In `services.ts` heeft elke dienst een `price`. Nu staat alles op `on-request`
("Op aanvraag"). Voorbeelden om prijzen toe te voegen:

```ts
{ name: 'Knippen & föhnen', price: { kind: 'fixed', amount: 35 } }      // € 35,-
{ name: 'Highlights',       price: { kind: 'from',  amount: 65 } }      // vanaf € 65,-
{ name: 'Balayage',         price: { kind: 'range', amount: 90, amountMax: 140 } } // € 90,- – € 140,-
```

### E-mailadres invullen

In `site.ts` staat `email: null`. Vul het in zodra het bekend is:

```ts
email: 'info@hairstudioserenay.nl',
```

Zolang het `null` is, toont de site netjes "E-mailadres volgt binnenkort".

### Eigen foto's toevoegen

> De site staat nu vol met **tijdelijke, themed placeholder-foto's** (self-hosted in
> `public/images/`). Vervang ze door eigen, gelicentieerde foto's van de salon — overschrijf
> simpelweg de bestanden of pas de paden aan in `team.ts` / `portfolio.ts` en de
> sfeer-componenten.

1. Zet de afbeelding in [`public/images/`](public/images/) (zie `public/images/LEESMIJ.txt`).
2. Koppel het pad in `team.ts` (`image`) of `portfolio.ts` (`src`), bijvoorbeeld
   `'/images/suna.jpg'`.
3. Pas de `alt`-tekst aan zodat die de foto beschrijft (belangrijk voor toegankelijkheid
   en SEO).

Zonder foto toont de site automatisch een stijlvolle kleurvlak-placeholder.

## Designsysteem

- **Stijl:** *Nature Distilled* (warm-aards, editorial) — gekozen via de `ui-ux-pro-max`-skill,
  bewust afwijkend van de generieke salon-roze default. Verfijnd, vrouwelijk en niet kitscherig.
- **Palet (tokens in `src/styles/tokens.css`):** crème `#F7F1E7`, zand `#EFE6D6`,
  terracotta `#A04F2A`, olijf `#4C571F`, espresso-inkt `#2A2420`, goud-accent `#9A7B3F`.
  Alle tekst/achtergrond-combinaties voldoen aan **WCAG AA**.
- **Typografie:** *Cormorant* (display/serif) + *Inter* (body), self-hosted.
- **Animatie (volgens de `emil-design-eng`-filosofie):** één consistent systeem —
  custom ease-out `cubic-bezier(0.23,1,0.32,1)`, alleen `transform`/`opacity`,
  `scale(0.97)` bij indrukken, reveal-on-scroll met lichte stagger, en volledige
  ondersteuning voor `prefers-reduced-motion`.

## Toegankelijkheid & SEO

- Volledig Nederlandstalig, semantische HTML, correcte koppenhiërarchie.
- Zichtbare focus-states, "naar inhoud springen"-link, toetsenbordbediening
  (mobiel menu en lightbox incl. Escape/pijltjestoetsen en focus-trap).
- Alt-teksten op alle betekenisvolle beelden; status/kleur nooit als enige informatie.
- Mobile-first, getest op 375 / 768 / 1024 / 1440 px.
- Per-pagina `title`, `description`, canonical en Open Graph-tags (component `Seo`).
- Structured data (`schema.org/HairSalon`) via microdata in de footer — zónder inline
  script, zodat de strikte CSP behouden blijft.

## Security

### Content-Security-Policy (CSP)

De CSP staat zowel als **`<meta>`-tag** in [`index.html`](index.html) als — gezaghebbend —
als **HTTP-header** in [`public/_headers`](public/_headers) en
[`nginx.conf.example`](nginx.conf.example). De policy is **wildcard-vrij**:

```
default-src 'self'; base-uri 'self'; object-src 'none';
script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;
font-src 'self'; connect-src 'self'; frame-src https://www.google.com;
form-action 'self'; frame-ancestors 'none'; manifest-src 'self';
upgrade-insecure-requests
```

- **`script-src 'self'`** — strikt. Vite bundelt naar gehashte, externe scripts; er is
  geen inline JavaScript.
- **`style-src 'unsafe-inline'`** — *uitsluitend voor styles*, omdat React enkele
  dynamische waarden via het `style`-attribuut zet (stagger-vertraging, beeldverhouding,
  lightbox). Dit is nodig vanwege de stack en vormt een laag risico (geen scriptuitvoering).
- **`font-src 'self'`** — lettertypes zijn self-hosted (geen Google Fonts-CDN → AVG-proof).
- **`frame-src https://www.google.com`** — enkel de keyless Google Maps-embed.
- **`frame-ancestors 'none'`** + **`X-Frame-Options: DENY`** — anti-clickjacking. NB:
  `frame-ancestors` werkt niet via `<meta>`; daarom staat die in de headers.

### Aanbevolen security-headers

Meegeleverd in `public/_headers` (Netlify/Cloudflare) én `nginx.conf.example`:
`Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`,
`Permissions-Policy` (camera/microfoon/locatie uit), `X-Frame-Options`,
`Cross-Origin-Opener-Policy`.

### Google Maps & AVG

De kaart op de contactpagina is een eenvoudige `<iframe>`-embed **zonder API-key**, met
restrictief `sandbox`-attribuut en `loading="lazy"`. De iframe wordt **pas geladen na
expliciete cookie-/AVG-toestemming** (nette, minimalistische melding). Wie weigert, kan
nog steeds de routebeschrijving in een nieuw tabblad openen. De keuze wordt lokaal
(localStorage) bewaard; er worden **geen tracking-cookies** geplaatst.

### Externe links

Alle `target="_blank"`-links krijgen automatisch `rel="noopener noreferrer"`
(zie de `Button`-component en de footer/contactlinks).

### Geen secrets, geen formulieren

- Er staan **geen secrets** in de frontend. Eventuele configuratie loopt via `.env`
  (`import.meta.env`, prefix `VITE_`); `.env` staat in `.gitignore`. Zie `.env.example`.
  Let op: alles met prefix `VITE_` komt in de publieke bundel — zet er nooit geheimen in.
- Er is **geen formulier met dataopslag** en geen backend-endpoint. Daardoor is er
  **geen CSRF- of (server-side) injectie-risico**: er is simpelweg geen invoer die
  wordt verwerkt of opgeslagen.

### Onderhoud

Draai periodiek een security-audit van de dependencies:

```bash
npm audit
npm audit fix    # waar mogelijk automatisch oplossen
```

## Deployen

De site is volledig statisch (`dist/`).

### GitHub Pages (huidige setup)

De repo bevat een workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml))
die de site automatisch bouwt en publiceert.

**Eenmalig instellen:**

1. Push de code naar de `main`-branch van `Erdem145/hairstudio-serenay-3`.
2. Ga in de repo naar **Settings → Pages** en zet **Source** op **GitHub Actions**.
3. Klaar — bij elke push naar `main` verschijnt de site op
   **https://erdem145.github.io/hairstudio-serenay-3/**.

Waarom de extra configuratie? GitHub Pages serveert een *project*-site vanaf een subpad
(`/hairstudio-serenay-3/`). Daarom is geregeld:

- **`base`** in `vite.config.ts` (overschrijfbaar via de env-variabele `VITE_BASE`); de
  workflow zet die op `/hairstudio-serenay-3/`.
- **`basename`** van de router leest dat pad automatisch uit (`import.meta.env.BASE_URL`).
- **SPA-fallback** via `dist/404.html` (een kopie van `index.html`, aangemaakt door
  `scripts/postbuild.mjs`). Zo werken directe deeplinks zoals
  `…/hairstudio-serenay-3/contact`. Dit gebeurt **zonder inline script**, zodat de strikte
  CSP intact blijft.
- **`.nojekyll`** zodat GitHub Pages de build niet door Jekyll haalt.

> **Let op (GitHub Pages & headers):** GitHub Pages kan geen eigen HTTP-headers zetten.
> De **CSP werkt via de `<meta>`-tag** (in `index.html`) en blijft dus actief. De extra
> headers uit `public/_headers` / `nginx.conf.example` (HSTS, X-Frame-Options, enz.)
> gelden alléén bij Netlify/Cloudflare/Nginx. `github.io` staat zelf al op de
> HSTS-preloadlijst. Wil je álle headers afdwingen, host dan achter Cloudflare of Nginx.

**Eigen domein later?** Zet in de workflow `VITE_BASE` op `/` en `VITE_SITE_URL` op het
nieuwe domein, en voeg een `CNAME`-bestand toe in `public/`.

### Netlify / Cloudflare Pages

Build-command `npm run build`, publish-map `dist`. De bestanden `public/_headers`
(security-headers) en `public/_redirects` (SPA-fallback) worden automatisch meegenomen.
Zet hierbij `VITE_BASE=/` (root-deploy).

### Nginx (eigen server)

Serveer `dist/` en gebruik `nginx.conf.example` als basis (bevat alle security-headers en
de SPA-fallback `try_files … /index.html`). Zet `VITE_BASE=/` bij de build.

> Optioneel: voeg een Open Graph-afbeelding (1200×630) toe in `public/` en verwijs ernaar
> via het `ogImage`-veld in `src/data/seo.ts` voor mooiere previews op social media.
