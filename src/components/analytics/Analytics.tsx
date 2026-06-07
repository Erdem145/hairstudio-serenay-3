import { useEffect } from 'react';

/**
 * Cookieloze, privacyvriendelijke bezoekersstatistieken via Cloudflare Web
 * Analytics. Plaatst géén cookies en verzamelt geen persoonsgegevens → geen
 * extra toestemming/cookiebanner nodig onder de AVG.
 *
 * Opt-in: laadt alleen wanneer `VITE_CF_BEACON_TOKEN` is ingevuld (zie .env.example).
 * Zonder token gebeurt er niets, dus dit is veilig om altijd te laten staan.
 *
 * De beacon-origin staat toegestaan in de CSP (script-src + connect-src) in
 * index.html en public/_headers.
 */
export function Analytics(): null {
  useEffect(() => {
    const token = import.meta.env.VITE_CF_BEACON_TOKEN;
    if (!token) return;
    if (document.querySelector('script[data-cf-beacon]')) return;

    const script = document.createElement('script');
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.defer = true;
    script.setAttribute('data-cf-beacon', JSON.stringify({ token }));
    document.body.appendChild(script);
  }, []);

  return null;
}
