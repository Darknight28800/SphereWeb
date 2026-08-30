import Link from 'next/link';
import Icon from '@/components/Icon';
import CtaBand from '@/components/CtaBand';
import { Section, SectionHeading } from '@/components/Section';
import { services } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Services',
  description:
    "Sites vitrines, applications web sur mesure et maintenance. Chaque projet fait l'objet d'un devis sur mesure, sans grille tarifaire.",
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <Section>
        <SectionHeading
          eyebrow="Services"
          title="Sites, applications et suivi technique"
          intro="Je présente mes services sans grille tarifaire : chaque projet est différent, chaque devis l'est aussi. Vous m'exposez votre besoin, je vous réponds avec une proposition claire."
        />

        <div className="mt-16 space-y-16">
          {services.map((s, i) => (
            <article
              key={s.key}
              id={s.key}
              className="grid scroll-mt-24 gap-8 border-t border-white/10 pt-12 lg:grid-cols-[1fr_1.3fr]"
            >
              <div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 text-accent">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <p className="mt-4 font-mono text-xs text-neutraltxt">
                  {String(i + 1).padStart(2, '0')} / 03
                </p>
                <h2 className="mt-2 text-2xl">{s.title}</h2>
                <p className="mt-4 prose-light">{s.description}</p>
              </div>
              <ul className="grid gap-3 self-start rounded-2xl border border-white/10 bg-navy-800 p-6">
                {s.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-white/75">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow mb-3">Bon à savoir</p>
            <h2 className="text-2xl text-navy sm:text-3xl">Pas de devis ? Pas de projet.</h2>
            <p className="mt-4 text-ink/80">
              Le premier échange et le devis sont gratuits et sans engagement. Je ne démarre rien tant
              que le périmètre, le calendrier et le budget ne sont pas validés par écrit.
            </p>
          </div>
          <Link href="/contact" className="btn-primary justify-self-start lg:justify-self-end">
            Décrire mon projet
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <CtaBand title="Un besoin qui ne rentre dans aucune case ?" />
    </>
  );
}
