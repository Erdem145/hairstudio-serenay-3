import type { JSX } from 'react';
import { openingHours } from '../../data';
import { formatDayHours, getOpenStatus } from '../../lib/format';
import { Icon } from '../ui/Icon';
import styles from './HoursCard.module.css';

/** Kaart met de openingstijden; markeert vandaag en toont de actuele status. */
export function HoursCard(): JSX.Element {
  const now = new Date();
  const todayIndex = (now.getDay() + 6) % 7;
  const status = getOpenStatus(openingHours, now);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <Icon name="clock" size={20} className={styles.titleIcon} />
          Openingstijden
        </h3>
        <span className={`${styles.badge} ${status.isOpen ? styles.open : styles.closed}`}>
          <span className={styles.dot} aria-hidden="true" />
          {status.label}
        </span>
      </div>
      <ul className={styles.list}>
        {openingHours.map((day, index) => {
          const isToday = index === todayIndex;
          const isClosed = day.open === null;
          return (
            <li
              key={day.day}
              className={`${styles.row} ${isToday ? styles.today : ''}`}
              aria-current={isToday ? 'date' : undefined}
            >
              <span className={styles.day}>
                {day.day}
                {isToday && <span className={styles.todayTag}>Vandaag</span>}
              </span>
              <span className={isClosed ? styles.muted : styles.time}>{formatDayHours(day)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
