import Link from 'next/link';
import Icon from '@/components/Icon';
import CtaBand from '@/components/CtaBand';
import { ProjectThumb } from '@/components/ProjectMedia';
import { Section, SectionHeading } from '@/components/Section';
import { projects } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Portfolio',
  description:
    'Réalisations SphereWeb : Trouve Ton Artisan, TPAK, GDF et Nexus. Projets clients et produits développés en propre.',
  path: '/portfolio',
});

export default function PortfolioPage() {
  return (
    <>
      <Section>
        <SectionHeading
          eyebrow="Portfolio"
          title="Réalisations"
          intro="Des projets menés pour des clients et des produits que je développe et maintiens moi-même."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}`}
              className="group card flex flex-col hover:border-brand/40"
            >
              <ProjectThumb project={p} className="mb-5" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl">{p.name}</h2>
                  <p className="mt-1 text-sm text-white/40">{p.type}</p>
                </div>
                {p.status && (
                  <span className="shrink-0 rounded-full border border-white/15 px-2.5 py-1 text-xs font-medium text-white/60">
                    {p.status}
                  </span>
                )}
              </div>
              <p className="mt-4 text-sm text-white/70">{p.tagline}</p>
              <p className="mt-auto pt-5 font-mono text-xs text-neutraltxt">{p.stack.join(' · ')}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:gap-2.5">
                Détail du projet
                <Icon name="arrow-right" className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Votre projet pourrait être le prochain"
        text="Sites vitrines, applications métier, produits SaaS : si le sujet vous ressemble, écrivez-moi."
      />
    </>
  );
}
