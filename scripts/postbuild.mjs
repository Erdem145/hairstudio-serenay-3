// Post-build stap voor GitHub Pages (en andere statische hosts zonder rewrites).
//
// 1) SPA-fallback: GitHub Pages kent geen server-side rewrites. Door
//    dist/index.html ook als dist/404.html neer te zetten, serveert GitHub Pages
//    bij een directe deeplink (bijv. /hairstudio-serenay-3/contact) gewoon de SPA.
//    React Router leest daarna de URL en toont de juiste pagina. Dit werkt zónder
//    inline script, zodat de strikte CSP (script-src 'self') intact blijft.
//
// 2) Open Graph-deelafbeelding: social-scrapers (WhatsApp, Facebook, LinkedIn)
//    voeren geen JavaScript uit, dus de client-side <Seo> bereikt ze niet. We
//    injecteren daarom een absolute og:image/og:url in de statische HTML. De
//    deploy-URL komt uit VITE_SITE_URL (zelfde fallback als src/data/site.ts).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const dist = 'dist';

const SITE_URL = (process.env.VITE_SITE_URL ?? 'https://www.hairstudioserenay.nl').replace(
  /\/$/,
  '',
);
const OG_TAGS = [
  `<meta property="og:url" content="${SITE_URL}/" />`,
  `<meta property="og:image" content="${SITE_URL}/images/sfeer/hero-1.jpg" />`,
  `<meta property="og:image:alt" content="Hairstudio Serenay — dameskapsalon in Zandvoort" />`,
].join('\n    ');

let html = readFileSync(`${dist}/index.html`, 'utf8');
if (!html.includes('property="og:image"')) {
  html = html.replace('</head>', `    ${OG_TAGS}\n  </head>`);
  writeFileSync(`${dist}/index.html`, html);
}

// index.html (incl. de zojuist toegevoegde OG-tags) dient ook als 404-fallback.
writeFileSync(`${dist}/404.html`, html);

// .nojekyll voorkomt dat GitHub Pages de output door Jekyll haalt.
if (!existsSync(`${dist}/.nojekyll`)) {
  writeFileSync(`${dist}/.nojekyll`, '');
}

console.log(
  `postbuild: og:image (${SITE_URL}) geïnjecteerd + dist/404.html + dist/.nojekyll aangemaakt.`,
);
