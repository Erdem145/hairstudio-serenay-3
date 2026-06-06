import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { serviceGroups } from '../../data';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import styles from './ServicesPreview.module.css';

/** Vier dienstcategorieën als kaarten, elk linkend naar de dienstenpagina. */
export function ServicesPreview(): JSX.Element {
  return (
    <ul className={styles.grid}>
      {serviceGroups.map((group, index) => (
        <Reveal as="li" key={group.id} delay={index * 60}>
          <Link to={`/diensten#${group.id}`} className={styles.card}>
            <span className={styles.iconBadge}>
              <Icon name={group.icon} size={24} />
            </span>
            <h3 className={styles.title}>{group.title}</h3>
            {group.intro && <p className={styles.intro}>{group.intro}</p>}
            <span className={styles.more}>
              Bekijk
              <Icon name="arrowRight" size={16} className={styles.moreIcon} />
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
