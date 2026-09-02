import Link from 'next/link';
import SiteGenerator from '@/components/SiteGenerator';
import { Section } from '@/components/Section';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Démo — testez votre futur site',
  description:
    "Décrivez votre projet et recevez en quelques secondes un aperçu de page d'accueil, généré pour illustrer un style et une ambiance.",
  path: '/demo',
});

export default function DemoPage() {
  return (
    <Section className="aura">
      <div className="max-w-2xl">
        <p className="eyebrow mb-4">
          <span className="text-white/30">00</span>
          <span className="h-px w-8 bg-white/15" aria-hidden="true" />
          <span>Démo</span>
        </p>
        <h1 className="text-3xl sm:text-4xl">Testez votre futur site en 30 secondes</h1>
        <p className="mt-4 prose-light">
          Décrivez votre activité, l&apos;ambiance recherchée et vos couleurs : en une trentaine de
          secondes, vous obtenez un aperçu de{' '}
          <strong className="text-white/90">page d&apos;accueil</strong>. C&apos;est une illustration
          de style — pas un site complet — pour vous donner une idée de direction.
        </p>
        <p className="mt-3 text-sm text-white/45">
          3 essais gratuits. Rendu propulsé par l&apos;IA, sans engagement.{' '}
          <Link href="/contact" className="link-accent">
            Un vrai projet ?
          </Link>
        </p>
      </div>

      <div className="mt-12">
        <SiteGenerator />
      </div>
    </Section>
  );
}
