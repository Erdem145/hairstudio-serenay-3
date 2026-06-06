import type { JSX } from 'react';
import { Icon } from '../ui/Icon';
import styles from './Marquee.module.css';

interface MarqueeProps {
  /** Korte termen die langsschuiven (bijv. dienstnamen). */
  items: readonly string[];
}

/**
 * Sierlijke, oneindig schuivende ticker (puur CSS). Pauzeert bij hover en staat
 * stil bij prefers-reduced-motion. Decoratief → aria-hidden (de termen staan
 * elders betekenisvol op de pagina).
 */
export function Marquee({ items }: MarqueeProps): JSX.Element {
  // Vul aan zodat één groep breder is dan het scherm → naadloze loop.
  const filled = [...items, ...items, ...items];

  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {[0, 1].map((copy) => (
          <ul className={styles.group} key={copy}>
            {filled.map((item, index) => (
              <li className={styles.item} key={`${copy}-${index}-${item}`}>
                <span className={styles.term}>{item}</span>
                <Icon name="sparkles" size={15} className={styles.sep} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
