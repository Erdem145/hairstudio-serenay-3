import type { NavLink } from './types';

/** Hoofdnavigatie. De volgorde bepaalt zowel het menu als de footer-links. */
export const navigation: readonly NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Diensten', to: '/diensten' },
  { label: 'Over ons', to: '/over-ons' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Contact', to: '/contact' },
];
