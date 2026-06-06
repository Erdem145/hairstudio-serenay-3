/**
 * Barrel-export voor de volledige content-laag. Componenten importeren content
 * via `import { site, serviceGroups, ... } from '../data'`.
 */
export * from './types';
export { site } from './site';
export { navigation } from './navigation';
export { openingHours } from './hours';
export { serviceGroups } from './services';
export { team } from './team';
export { about } from './about';
export { portfolio } from './portfolio';
export { pageSeo } from './seo';
export type { PageSeoKey } from './seo';
