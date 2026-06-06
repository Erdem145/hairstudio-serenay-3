import type { JSX } from 'react';
import { serviceGroups } from '../../data';
import { formatPrice } from '../../lib/format';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import styles from './ServiceList.module.css';

/** Volledig diensten- en prijzenoverzicht, gegroepeerd per categorie. */
export function ServiceList(): JSX.Element {
  return (
    <div className={styles.groups}>
      {serviceGroups.map((group) => (
        <Reveal
          as="section"
          key={group.id}
          id={group.id}
          className={styles.group}
          aria-labelledby={`${group.id}-titel`}
        >
          <div className={styles.groupHeader}>
            <span className={styles.icon}>
              <Icon name={group.icon} size={26} />
            </span>
            <div>
              <h2 id={`${group.id}-titel`} className={styles.groupTitle}>
                {group.title}
              </h2>
              {group.intro && <p className={styles.groupIntro}>{group.intro}</p>}
            </div>
          </div>

          <ul className={styles.items}>
            {group.items.map((item) => (
              <li key={item.name} className={styles.item}>
                <div className={styles.itemMain}>
                  <span className={styles.itemName}>{item.name}</span>
                  {item.description && <span className={styles.itemDesc}>{item.description}</span>}
                </div>
                <span className={styles.price}>{formatPrice(item.price)}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
