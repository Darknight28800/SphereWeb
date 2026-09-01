import Link from 'next/link';
import Icon from '@/components/Icon';
import CtaBand from '@/components/CtaBand';
import Reveal from '@/components/Reveal';
import OrbitViz from '@/components/OrbitViz';
import { ProjectThumb } from '@/components/ProjectMedia';
import { Section, SectionHeading } from '@/components/Section';
import { projects, services, site } from '@/lib/site';

const featured = projects.filter((p) => ['trouve-ton-artisan', 'gdf', 'tpak'].includes(p.slug));

const proof: [string, string][] = [
  ['A → Z', 'Cadrage, design, développement et mise en ligne'],
  ['Fullstack', 'React · Node.js · TypeScript'],
  ['Direct', 'Un seul interlocuteur, en français clair'],
];

const steps: [string, string, string][] = [
  ['01', 'Échange', 'On clarifie le besoin, les objectifs et les contraintes.'],
  ['02', 'Devis', 'Je vous envoie une proposition chiffrée et un calendrier.'],
  ['03', 'Développement', 'Je livre par étapes, vous validez au fur et à mesure.'],
  ['04', 'Mise en ligne', 'Déploiement, tests multi-appareils, puis suivi.'],
];

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
              'radial-gradient(55% 45% at 78% 12%, rgba(91,61,246,0.28), transparent 70%), radial-gradient(45% 40% at 8% 88%, rgba(34,211,238,0.12), transparent 70%)',
          }}
        />
        <div className="container-page relative grid gap-12 py-20 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
          <div className="animate-fade-up">
            <p className="eyebrow mb-5">{site.role}</p>
            <h1 className="text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
              SphereWeb, le centre de gravité de votre{' '}
              <span className="text-gradient">projet web</span>.
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

            <dl className="mt-14 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 hairline-top pt-8 sm:grid-cols-3">
              {proof.map(([term, desc]) => (
                <div key={term}>
                  <dt className="font-heading text-lg font-semibold text-white">{term}</dt>
                  <dd className="mt-1 text-sm text-white/55">{desc}</dd>
                </div>
              ))}
            </dl>
          </div>

          <OrbitViz className="hidden lg:block" />
        </div>
      </section>

      {/* Services */}
      <Section className="surface-dots">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Ce que je peux faire pour vous"
            intro="Trois façons de travailler ensemble, sans grille tarifaire : chaque projet fait l'objet d'un devis sur mesure."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.key} delay={i * 90}>
              <article className="card h-full">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 text-accent ring-1 ring-inset ring-brand/20">
                  <Icon name={s.icon} />
                </span>
                <h3 className="mt-5 text-lg">{s.title}</h3>
                <p className="mt-3 text-sm text-white/65">{s.short}</p>
                <Link
                  href={`/services#${s.key}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-all hover:gap-2.5"
                >
                  En savoir plus
                  <Icon name="arrow-right" className="h-4 w-4" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Réalisations phares */}
      <Section className="bg-navy-800/40">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Portfolio"
              title="Quelques réalisations"
              intro="Des projets clients et des produits que je développe et maintiens moi-même."
            />
            <Link
              href="/portfolio"
              className="hidden items-center gap-1.5 text-sm font-medium text-accent hover:gap-2.5 sm:inline-flex"
            >
              Tout le portfolio
              <Icon name="arrow-right" className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <Link href={`/portfolio/${p.slug}`} className="group card flex h-full flex-col">
                <ProjectThumb project={p} className="mb-5" />
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg">{p.name}</h3>
                  {p.status && (
                    <span className="shrink-0 rounded-full border border-white/15 px-2.5 py-1 text-xs font-medium text-white/60">
                      {p.status}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-white/65">{p.tagline}</p>
                <p className="mt-auto pt-4 font-mono text-xs text-neutraltxt">{p.stack.join(' · ')}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 sm:hidden">
          <Link href="/portfolio" className="btn-primary w-full">
            Tout le portfolio
          </Link>
        </div>
      </Section>

      {/* Méthode */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Méthode"
            title="Un déroulé simple et lisible"
            intro="Vous savez à chaque étape où en est le projet et ce qui vous est demandé."
          />
        </Reveal>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([num, title, desc], i) => (
            <Reveal key={num} delay={i * 80} as="li">
              <div className="card h-full">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/30 font-mono text-sm text-accent">
                  {num}
                </span>
                <h3 className="mt-4 text-base">{title}</h3>
                <p className="mt-2 text-sm text-white/60">{desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaBand />
    </>
  );
}
