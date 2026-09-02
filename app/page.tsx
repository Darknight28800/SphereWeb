import Link from 'next/link';
import Icon from '@/components/Icon';
import CtaBand from '@/components/CtaBand';
import Reveal from '@/components/Reveal';
import { Stagger, StaggerItem } from '@/components/Stagger';
import HeroSphere from '@/components/HeroSphere';
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
      <section className="relative overflow-hidden border-b border-white/10 bg-navy">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 aura" />
        <div className="container-page relative grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 lg:py-28">
          <Stagger gap={0.12}>
            <StaggerItem>
              <p className="eyebrow mb-6">
                <span className="text-white/30">00</span>
                <span className="h-px w-8 bg-white/15" aria-hidden="true" />
                <span>{site.role}</span>
              </p>
            </StaggerItem>
            <StaggerItem>
              <h1 className="text-[2.6rem] leading-[1.05] sm:text-5xl md:text-[3.75rem]">
                Le centre de gravité de votre{' '}
                <span className="whitespace-nowrap border-b-2 border-brand pb-1 text-white">
                  projet web
                </span>
                .
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-7 max-w-xl text-lg prose-light">
                Je suis {site.legalName}, développeur freelance fullstack. J&apos;accompagne
                indépendants, artisans et petites structures dans la conception de leur site ou de
                leur application — de la première maquette à la mise en production.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Demander un devis
                  <Icon name="arrow-right" className="h-4 w-4" />
                </Link>
                <Link href="/services" className="btn-outline">
                  Voir les services
                </Link>
              </div>
            </StaggerItem>
            <StaggerItem>
              <dl className="mt-14 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-3">
                {proof.map(([term, desc]) => (
                  <div key={term}>
                    <dt className="font-mono text-sm font-medium uppercase tracking-wider text-accent">
                      {term}
                    </dt>
                    <dd className="mt-2 text-sm text-white/55">{desc}</dd>
                  </div>
                ))}
              </dl>
            </StaggerItem>
          </Stagger>

          <HeroSphere className="w-3/4 max-w-[260px] sm:max-w-[320px] lg:w-full lg:max-w-[480px]" />
        </div>
      </section>

      {/* Services */}
      <Section>
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="Services"
            title="Ce que je peux faire pour vous"
            intro="Trois façons de travailler ensemble, sans grille tarifaire : chaque projet fait l'objet d'un devis sur mesure."
          />
        </Reveal>
        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {services.map((s, i) => (
            <StaggerItem
              key={s.key}
              as="article"
              hover
              className="glass-panel glass-sheen h-full pt-8"
            >
              <span className="glass-tag">{String(i + 1).padStart(2, '0')}</span>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg">{s.title}</h3>
              <p className="mt-3 text-sm text-white/60">{s.short}</p>
              <Link href={`/services#${s.key}`} className="link-arrow mt-6">
                Détail
                <Icon name="arrow-right" className="h-3.5 w-3.5" />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Réalisations phares */}
      <Section tone="panel" className="border-y border-white/10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              index="02"
              eyebrow="Portfolio"
              title="Quelques réalisations"
              intro="Des projets clients et des produits que je développe et maintiens moi-même."
            />
            <Link href="/portfolio" className="link-arrow hidden sm:inline-flex">
              Tout le portfolio
              <Icon name="arrow-right" className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>
        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {featured.map((p) => (
            <StaggerItem key={p.slug} hover className="h-full">
              <Link
                href={`/portfolio/${p.slug}`}
                className="group glass-panel flex h-full flex-col"
              >
                <ProjectThumb project={p} className="mb-5" />
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg">{p.name}</h3>
                  {p.status && (
                    <span className="shrink-0 rounded-md border border-white/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/55">
                      {p.status}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-white/60">{p.tagline}</p>
                <p className="mt-auto pt-4 font-mono text-xs text-neutraltxt">
                  {p.stack.join(' · ')}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-10 sm:hidden">
          <Link href="/portfolio" className="btn-outline w-full">
            Tout le portfolio
          </Link>
        </div>
      </Section>

      {/* Méthode */}
      <Section>
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="Méthode"
            title="Un déroulé simple et lisible"
            intro="Vous savez à chaque étape où en est le projet et ce qui vous est demandé."
          />
        </Reveal>
        <Stagger as="ol" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([num, title, desc]) => (
            <StaggerItem
              key={num}
              as="li"
              hover
              className="glass-panel h-full border-l-2 border-l-brand/50"
            >
              <span className="font-mono text-xs tracking-widest text-accent">{num}</span>
              <h3 className="mt-3 text-base">{title}</h3>
              <p className="mt-2 text-sm text-white/55">{desc}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CtaBand />
    </>
  );
}
