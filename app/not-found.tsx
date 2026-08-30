import Link from 'next/link';
import { Section } from '@/components/Section';

export default function NotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-lg py-16 text-center">
        <p className="font-mono text-sm text-accent">Erreur 404</p>
        <h1 className="mt-3 text-3xl sm:text-4xl">Cette page a quitté son orbite</h1>
        <p className="mt-4 prose-light">
          Le lien est peut-être obsolète, ou l&apos;adresse comporte une erreur.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn-primary">
            Retour à l&apos;accueil
          </Link>
          <Link href="/contact" className="btn-ghost">
            Me contacter
          </Link>
        </div>
      </div>
    </Section>
  );
}
