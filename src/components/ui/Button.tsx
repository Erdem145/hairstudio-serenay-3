import type { JSX, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { IconName } from '../../data/types';
import { Icon } from './Icon';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconPosition?: 'start' | 'end';
  fullWidth?: boolean;
  /** Aangepaste kleuren voor gebruik op een donkere achtergrond. */
  onDark?: boolean;
  className?: string;
  /** Interne route → rendert als react-router <Link>. */
  to?: string;
  /** Externe of protocol-URL (http, tel:, mailto:, wa.me) → rendert als <a>. */
  href?: string;
  /** Forceer nieuw tabblad. Standaard automatisch voor externe http-links. */
  newTab?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
  'aria-label'?: string;
}

/**
 * Eén knop-component voor links (intern/extern) én acties. Externe links in een
 * nieuw tabblad krijgen automatisch rel="noopener noreferrer".
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'end',
  fullWidth = false,
  onDark = false,
  className,
  to,
  href,
  newTab,
  type = 'button',
  onClick,
  'aria-label': ariaLabel,
}: ButtonProps): JSX.Element {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    onDark ? styles.onDark : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && iconPosition === 'start' && <Icon name={icon} size={18} className={styles.icon} />}
      <span>{children}</span>
      {icon && iconPosition === 'end' && <Icon name={icon} size={18} className={styles.icon} />}
    </>
  );

  if (to !== undefined) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  if (href !== undefined) {
    const isHttp = href.startsWith('http');
    const openNew = newTab ?? isHttp;
    const safety = openNew ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {};
    return (
      <a href={href} className={classes} aria-label={ariaLabel} {...safety}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
