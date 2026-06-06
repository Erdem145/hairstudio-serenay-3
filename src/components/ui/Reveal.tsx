import type { CSSProperties, ElementType, JSX, ReactNode } from 'react';
import { useReveal } from '../../lib/useReveal';

interface RevealProps {
  children: ReactNode;
  /** Semantisch element (standaard <div>). */
  as?: ElementType;
  /** Vertraging in ms — gebruik oplopende waarden voor een stagger-effect. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
  'aria-labelledby'?: string;
  'aria-label'?: string;
}

/**
 * Onthult content zacht bij het in beeld scrollen (transform + opacity).
 * Maakt gebruik van het centrale `.reveal`-systeem en respecteert
 * prefers-reduced-motion via de global CSS.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className,
  style,
  id,
  ...aria
}: RevealProps): JSX.Element {
  const { ref, isVisible } = useReveal<HTMLElement>();
  const classes = ['reveal', isVisible ? 'is-visible' : '', className ?? ''].filter(Boolean).join(' ');
  const mergedStyle = { ...style, '--reveal-delay': `${delay}ms` } as CSSProperties;

  return (
    <Tag ref={ref} id={id} className={classes} style={mergedStyle} {...aria}>
      {children}
    </Tag>
  );
}
