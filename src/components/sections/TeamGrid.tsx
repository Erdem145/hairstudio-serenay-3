import type { JSX } from 'react';
import { team } from '../../data';
import { MediaTile } from '../ui/MediaTile';
import { Reveal } from '../ui/Reveal';
import styles from './TeamGrid.module.css';

/** Toont het team met foto (of placeholder), naam, rol en korte bio. */
export function TeamGrid(): JSX.Element {
  return (
    <ul className={styles.grid}>
      {team.map((member, index) => (
        <Reveal as="li" key={member.name} delay={index * 80} className={styles.item}>
          <MediaTile
            {...(member.image ? { src: member.image } : {})}
            alt={member.imageAlt}
            tone={member.tone}
            ratio="4 / 5"
            className={styles.photo}
          />
          <div className={styles.body}>
            <span className={styles.role}>{member.role}</span>
            <h3 className={styles.name}>{member.name}</h3>
            <p className={styles.bio}>{member.bio}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
