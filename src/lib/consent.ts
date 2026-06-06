/**
 * Minimale AVG-cookie/consent-helper.
 *
 * De enige externe inhoud op deze site is de Google Maps-embed. Die wordt pas
 * geladen nadat de bezoeker daar expliciet toestemming voor geeft. We slaan die
 * keuze lokaal op (localStorage) — er worden geen tracking-cookies geplaatst.
 */

const STORAGE_KEY = 'serenay.consent.maps.v1';

export type ConsentValue = 'granted' | 'denied';

/** Custom event zodat componenten reageren op een wijziging in de keuze. */
export const CONSENT_EVENT = 'serenay:consent-change';

export function getMapsConsent(): ConsentValue | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function setMapsConsent(value: ConsentValue): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* localStorage kan geblokkeerd zijn (privémodus) — keuze geldt dan alleen deze sessie. */
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}
