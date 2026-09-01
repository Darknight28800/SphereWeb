import Link from 'next/link';
import Icon from './Icon';
import { site } from '@/lib/site';

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
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy-700 via-navy-800 to-navy p-8 sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-brand/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
          />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
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
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-3 self-start rounded-xl border border-white/10 bg-navy/50 px-4 py-3 text-sm text-white/70 transition-colors hover:border-accent hover:text-accent"
            >
              <Icon name="mail" className="h-5 w-5" />
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
