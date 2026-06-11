import type { JSX } from 'react';
import type { IconName } from '../../data/types';

interface IconProps {
  name: IconName;
  /** Pixelgrootte (vierkant). Standaard 24. */
  size?: number;
  /**
   * Toegankelijk label. Aanwezig → het icoon krijgt role="img" met dit label.
   * Afwezig → het icoon is decoratief (aria-hidden) en wordt overgeslagen.
   */
  label?: string;
  className?: string;
}

/** SVG-paden per icoon — één consistente, monoline stroke-set (stroke-width 1.6). */
const paths: Record<IconName, JSX.Element> = {
  phone: (
    <path d="M3.5 5.5c0 8.3 6.7 15 15 15a2 2 0 0 0 2-2v-2.3a1 1 0 0 0-.8-1l-3.3-.7a1 1 0 0 0-1 .3l-1 1.2a12 12 0 0 1-5.2-5.2l1.2-1a1 1 0 0 0 .3-1l-.7-3.3a1 1 0 0 0-1-.8H5.5a2 2 0 0 0-2 2Z" />
  ),
  whatsapp: (
    <>
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <path d="m4.5 7 7.5 5.5L19.5 7" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="6.5" cy="17.5" r="2.5" />
      <path d="M8.6 8.4 20 18M8.6 15.6 20 6M11 12l-2.4 1.8" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3.5c.6 3.8 1.7 4.9 5.5 5.5-3.8.6-4.9 1.7-5.5 5.5-.6-3.8-1.7-4.9-5.5-5.5 3.8-.6 4.9-1.7 5.5-5.5Z" />
      <path d="M18 14.5c.3 1.7.8 2.2 2.5 2.5-1.7.3-2.2.8-2.5 2.5-.3-1.7-.8-2.2-2.5-2.5 1.7-.3 2.2-.8 2.5-2.5Z" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3.5a8.5 8.5 0 0 0 0 17c1.4 0 2-.9 2-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.8-1.6 1.7-1.6H16a4.5 4.5 0 0 0 4.5-4.5C20.5 6.6 16.7 3.5 12 3.5Z" />
      <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="10" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  crown: (
    <>
      <path d="M4 18h16M4.5 18l-1-9 4.5 3.5L12 6l4 6.5L20.5 9l-1 9" />
    </>
  ),
  arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  chevronLeft: <path d="m14 6-6 6 6 6" />,
  chevronRight: <path d="m10 6 6 6-6 6" />,
  star: (
    <path d="m12 4 2.3 4.9 5.2.7-3.8 3.6 1 5.3L12 16.9 7.3 18.5l1-5.3L4.5 9.6l5.2-.7L12 4Z" />
  ),
  heart: (
    <path d="M12 20s-7-4.6-7-9.4A3.6 3.6 0 0 1 12 8a3.6 3.6 0 0 1 7-1.4C19 11.4 12 20 12 20Z" />
  ),
  leaf: (
    <>
      <path d="M5 19c-1-7 4-13 14-13 0 10-6 15-13 14" />
      <path d="M5 19c3-5 6-7 10-8.5" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
};

/**
 * Eén consistente inline SVG-iconenset (geen emoji, geen externe iconfont).
 * Neemt de huidige tekstkleur over via `currentColor`.
 */
export function Icon({ name, size = 24, label, className }: IconProps): JSX.Element {
  const decorative = label === undefined;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': label })}
    >
      {paths[name]}
    </svg>
  );
}
