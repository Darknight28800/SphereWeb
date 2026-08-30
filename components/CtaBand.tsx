import Link from 'next/link';
import Icon from './Icon';

interface CtaBandProps {
  title?: string;
  text?: string;
}

export default function CtaBand({
  title = 'Un projet en tête ?',
  text = "Parlons-en. Décrivez-moi votre besoin en quelques lignes, je vous réponds sous 48 h ouvrées avec un premier avis et les prochaines étapes.",
}: CtaBandProps) {
  return (
    <section className="bg-navy py-16 sm:py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl border border-brand/30 bg-gradient-to-br from-navy-800 to-navy p-8 sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand/20 blur-3xl"
          />
          <div className="relative max-w-xl">
            <h2 className="text-2xl sm:text-3xl">{title}</h2>
            <p className="mt-4 prose-light">{text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Demander un devis
                <Icon name="arrow-right" className="h-4 w-4" />
              </Link>
              <Link href="/portfolio" className="btn-ghost">
                Voir mes réalisations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
