import type { Address, OpeningDay, ServicePrice } from '../data/types';

/** Euro-notatie in NL-stijl: hele bedragen als "€ 35,-", anders "€ 32,50". */
function formatEuro(amount: number): string {
  const hasCents = !Number.isInteger(amount);
  const formatted = amount.toLocaleString('nl-NL', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  });
  return hasCents ? `€ ${formatted}` : `€ ${formatted},-`;
}

/** Zet een prijs om naar leesbare tekst, ongeacht de prijsvorm. */
export function formatPrice(price: ServicePrice): string {
  switch (price.kind) {
    case 'fixed':
      return price.amount === undefined ? 'Op aanvraag' : formatEuro(price.amount);
    case 'from':
      return price.amount === undefined ? 'Op aanvraag' : `vanaf ${formatEuro(price.amount)}`;
    case 'range':
      return price.amount === undefined || price.amountMax === undefined
        ? 'Op aanvraag'
        : `${formatEuro(price.amount)} – ${formatEuro(price.amountMax)}`;
    case 'on-request':
      return 'Op aanvraag';
  }
}

/** Toont de openingstijd van één dag, of "Gesloten". */
export function formatDayHours(day: OpeningDay): string {
  if (day.open === null || day.close === null) return 'Gesloten';
  return `${day.open} – ${day.close}`;
}

export interface OpenStatus {
  isOpen: boolean;
  label: string;
}

/**
 * Bepaalt of de salon nú open is, op basis van de lokale tijd van de bezoeker.
 * De datarray staat maandag-eerst; JS-getDay() is zondag-eerst (0). We mappen dat.
 */
export function getOpenStatus(hours: readonly OpeningDay[], now: Date = new Date()): OpenStatus {
  const mondayFirstIndex = (now.getDay() + 6) % 7;
  const today = hours[mondayFirstIndex];

  if (!today || today.open === null || today.close === null) {
    return { isOpen: false, label: 'Nu gesloten' };
  }

  const current = now.getHours() * 60 + now.getMinutes();
  const [openH, openM] = today.open.split(':').map(Number);
  const [closeH, closeM] = today.close.split(':').map(Number);
  const openMin = (openH ?? 0) * 60 + (openM ?? 0);
  const closeMin = (closeH ?? 0) * 60 + (closeM ?? 0);

  const isOpen = current >= openMin && current < closeMin;
  return { isOpen, label: isOpen ? 'Nu geopend' : 'Nu gesloten' };
}

/** Eenregelig adres, bijv. "Tolweg 20, 2042 EL Zandvoort". */
export function formatAddressLine(address: Address): string {
  return `${address.street}, ${address.postalCode} ${address.city}`;
}

/** Keyless Google Maps-embed-URL (geen API-key nodig). */
export function buildMapsEmbedUrl(address: Address): string {
  const query = encodeURIComponent(`${formatAddressLine(address)}, ${address.country}`);
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

/** Link naar Google Maps-routebeschrijving (opent in nieuw tabblad). */
export function buildMapsDirectionsUrl(address: Address): string {
  const query = encodeURIComponent(`${formatAddressLine(address)}, ${address.country}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
}
