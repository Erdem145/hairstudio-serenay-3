import type { JSX } from 'react';
import { site } from '../../data';
import type { IconName } from '../../data/types';
import { buildMapsDirectionsUrl, formatAddressLine } from '../../lib/format';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import styles from './ContactInfo.module.css';

interface Channel {
  icon: IconName;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

/** Overzicht van alle contactmogelijkheden als aanklikbare kaarten. */
export function ContactInfo(): JSX.Element {
  const { contact, address, socials } = site;
  const instagram = socials[0];

  const channels: Channel[] = [
    {
      icon: 'phone',
      label: 'Bellen',
      value: contact.phoneDisplay,
      href: `tel:${contact.phoneHref}`,
    },
    {
      icon: 'whatsapp',
      label: 'WhatsApp',
      value: 'Stuur ons een bericht',
      href: contact.whatsappHref,
      external: true,
    },
    ...(instagram
      ? [
          {
            icon: instagram.icon,
            label: instagram.platform,
            value: instagram.label,
            href: instagram.href,
            external: true,
          } satisfies Channel,
        ]
      : []),
    ...(contact.email
      ? [{ icon: 'mail', label: 'E-mail', value: contact.email, href: `mailto:${contact.email}` } satisfies Channel]
      : []),
    {
      icon: 'mapPin',
      label: 'Adres & route',
      value: formatAddressLine(address),
      href: buildMapsDirectionsUrl(address),
      external: true,
    },
  ];

  return (
    <ul className={styles.grid}>
      {channels.map((channel, index) => (
        <Reveal as="li" key={channel.label} delay={index * 50}>
          <ChannelCard channel={channel} />
        </Reveal>
      ))}
    </ul>
  );
}

function ChannelCard({ channel }: { channel: Channel }): JSX.Element {
  const body = (
    <>
      <span className={styles.iconBadge}>
        <Icon name={channel.icon} size={22} />
      </span>
      <span className={styles.text}>
        <span className={styles.label}>{channel.label}</span>
        <span className={styles.value}>{channel.value}</span>
      </span>
      {channel.href && <Icon name="arrowUpRight" size={18} className={styles.arrow} />}
    </>
  );

  if (!channel.href) {
    return <div className={styles.card}>{body}</div>;
  }

  const safety = channel.external ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {};
  return (
    <a className={`${styles.card} ${styles.linkCard}`} href={channel.href} {...safety}>
      {body}
    </a>
  );
}
