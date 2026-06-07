// Post-build stap voor GitHub Pages (en andere statische hosts zonder rewrites).
//
// 1) GitHub Pages kent geen server-side rewrites. Door dist/index.html ook als
//    dist/404.html neer te zetten, serveert GitHub Pages bij een directe deeplink
//    (bijv. /hairstudio-serenay-3/contact) gewoon de SPA. React Router leest daarna
//    de URL en toont de juiste pagina. Dit werkt zónder inline script, zodat de
//    strikte Content-Security-Policy (script-src 'self') intact blijft.
// 2) sitemap.xml + robots.txt genereren met de juiste (deploy-)base-URL voor SEO.
import { copyFileSync, writeFileSync, existsSync } from 'node:fs';

const dist = 'dist';

copyFileSync(`${dist}/index.html`, `${dist}/404.html`);

// .nojekyll voorkomt dat GitHub Pages de output door Jekyll haalt.
if (!existsSync(`${dist}/.nojekyll`)) {
  writeFileSync(`${dist}/.nojekyll`, '');
}

// ── sitemap.xml + robots.txt ──────────────────────────────────────────────────
// Base-URL = hetzelfde domein dat de build gebruikt voor canonical/OG (VITE_SITE_URL).
// In CI zet de workflow deze env; lokaal vallen we terug op de huidige live-URL.
const baseUrl = (process.env.VITE_SITE_URL ?? 'https://erdem145.github.io/hairstudio-serenay-3')
  .replace(/\/$/, '');

// Houd dit gelijk aan de routes in src/App.tsx (404 hoort niet in de sitemap).
const routes = ['/', '/diensten', '/over-ons', '/portfolio', '/contact'];
const lastmod = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((path) => `  <url>\n    <loc>${baseUrl}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
  .join('\n')}
</urlset>
`;
writeFileSync(`${dist}/sitemap.xml`, sitemap);

const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
writeFileSync(`${dist}/robots.txt`, robots);

console.log(
  `postbuild: 404.html, .nojekyll, sitemap.xml + robots.txt aangemaakt (base: ${baseUrl}).`,
);
