// Post-build stap voor GitHub Pages (en andere statische hosts zonder rewrites).
//
// GitHub Pages kent geen server-side rewrites. Door dist/index.html ook als
// dist/404.html neer te zetten, serveert GitHub Pages bij een directe deeplink
// (bijv. /hairstudio-serenay-3/contact) gewoon de SPA. React Router leest daarna
// de URL en toont de juiste pagina. Dit werkt zónder inline script, zodat de
// strikte Content-Security-Policy (script-src 'self') intact blijft.
import { copyFileSync, writeFileSync, existsSync } from 'node:fs';

const dist = 'dist';

copyFileSync(`${dist}/index.html`, `${dist}/404.html`);

// .nojekyll voorkomt dat GitHub Pages de output door Jekyll haalt.
if (!existsSync(`${dist}/.nojekyll`)) {
  writeFileSync(`${dist}/.nojekyll`, '');
}

console.log('postbuild: dist/404.html + dist/.nojekyll aangemaakt (GitHub Pages SPA-fallback).');
