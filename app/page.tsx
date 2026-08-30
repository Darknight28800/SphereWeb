import Link from 'next/link';
import Icon from '@/components/Icon';
import CtaBand from '@/components/CtaBand';
import { Section, SectionHeading } from '@/components/Section';
import { projects, services, site } from '@/lib/site';

const featured = projects.filter((p) => ['trouve-ton-artisan', 'gdf', 'tpak'].includes(p.slug));

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 50% at 75% 15%, rgba(91,61,246,0.25), transparent 70%), radial-gradient(45% 40% at 10% 85%, rgba(34,211,238,0.14), transparent 70%)',
          }}
        />
        <div className="container-page relative py-20 sm:py-28">
          <div className="max-w-3xl animate-fade-up">
            <p className="eyebrow mb-4">{site.role}</p>
            <h1 className="text-4xl leading-tight sm:text-5xl md:text-6xl">
              SphereWeb, le centre de gravité de votre{' '}
              <span className="text-accent">projet web</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg prose-light">
              Je suis {site.legalName}, développeur freelance fullstack. J&apos;accompagne
              indépendants, artisans et petites structures dans la conception de leur site ou de leur
              application — de la première maquette à la mise en production.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Demander un devis
                <Icon name="arrow-right" className="h-4 w-4" />
              </Link>
              <Link href="/services" className="btn-ghost">
                Découvrir mes services
              </Link>
            </div>
          </div>

          <dl className="mt-16 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            {[
              ['A → Z', 'Cadrage, design, dev et mise en ligne'],
              ['Fullstack', 'React · Node.js · TypeScript'],
              ['Direct', 'Un seul interlocuteur, en français clair'],
            ].map(([term, desc]) => (
              <div key={term}>
                <dt className="font-heading text-xl font-semibold text-white">{term}</dt>
                <dd className="mt-1 text-sm text-white/55">{desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services */}
      <Section>
        <SectionHeading
          eyebrow="Services"
          title="Ce que je peux faire pour vous"
          intro="Trois façons de travailler ensemble, sans grille tarifaire : chaque projet fait l'objet d'un devis sur mesure."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <article key={s.key} className="card hover:border-brand/40">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 text-accent">
                <Icon name={s.icon} />
              </span>
              <h3 className="mt-5 text-lg">{s.title}</h3>
              <p className="mt-3 text-sm text-white/65">{s.short}</p>
              <Link
                href={`/services#${s.key}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2.5"
              >
                En savoir plus
                <Icon name="arrow-right" className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </Section>

      {/* Réalisations phares */}
      <Section tone="mist">
        <SectionHeading
          tone="mist"
          eyebrow="Portfolio"
          title="Quelques réalisations"
          intro="Des projets clients et des produits développés en propre."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}`}
              className="group rounded-2xl border border-navy/10 bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-navy">{p.name}</h3>
                {p.status && (
                  <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-medium text-neutraltxt">
                    {p.status}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-ink/70">{p.tagline}</p>
              <p className="mt-4 font-mono text-xs text-neutraltxt">{p.stack.join(' · ')}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-2.5">
                Voir le projet
                <Icon name="arrow-right" className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/portfolio" className="btn-primary">
            Tout le portfolio
          </Link>
        </div>
      </Section>

      {/* Méthode */}
      <Section>
        <SectionHeading
          eyebrow="Méthode"
          title="Un déroulé simple et lisible"
          intro="Vous savez à chaque étape où en est le projet et ce qui vous est demandé."
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['01', 'Échange', 'On clarifie le besoin, les objectifs et les contraintes.'],
            ['02', 'Devis', 'Je vous envoie une proposition chiffrée et un calendrier.'],
            ['03', 'Développement', 'Je livre par étapes, vous validez au fur et à mesure.'],
            ['04', 'Mise en ligne', 'Déploiement, tests multi-appareils, puis suivi.'],
          ].map(([num, title, desc]) => (
            <li key={num} className="card">
              <span className="font-mono text-sm text-accent">{num}</span>
              <h3 className="mt-3 text-base">{title}</h3>
              <p className="mt-2 text-sm text-white/60">{desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand />
    </>
  );
}
