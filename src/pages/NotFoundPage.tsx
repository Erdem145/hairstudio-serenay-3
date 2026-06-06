import type { JSX } from 'react';
import { pageSeo } from '../data';
import { Seo } from '../components/seo/Seo';
import { Section } from '../components/ui/Section';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import styles from './NotFoundPage.module.css';

export function NotFoundPage(): JSX.Element {
  return (
    <>
      <Seo page={pageSeo.notFound} />
      <Section>
        <Container className={styles.wrap}>
          <span className="eyebrow">Foutje</span>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>Deze pagina bestaat niet (meer)</h1>
          <p className={styles.text}>
            Mogelijk is de link verouderd of verkeerd getypt. Ga terug naar de homepagina of
            bekijk onze diensten.
          </p>
          <div className={styles.actions}>
            <Button to="/" icon="arrowRight">
              Naar de homepagina
            </Button>
            <Button to="/diensten" variant="secondary">
              Bekijk diensten
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
