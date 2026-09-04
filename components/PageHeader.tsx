import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface PageHeaderProps {
  /** Index de la page, ex. "01". */
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  /** Actions (boutons) sous l'intro. */
  children?: ReactNode;
}

/**
 * En-tête de page — cadrage éditorial premium, pleine largeur : barre méta
 * monospace, libellé indexé, grand titre display, intro. Utilisé en tête des
 * pages internes (Services, Portfolio, À propos, Contact, pages légales…).
 */
export default function PageHeader({ index, eyebrow, title, intro, children }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-white/10 bg-navy">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 aura opacity-80" />

      <div className="relative z-10 border-b border-white/[0.07]">
        <div className="container-page flex items-center justify-between py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-white/35">
          <span className="text-white/55">SphereWeb</span>
          <span className="hidden sm:block">{eyebrow}</span>
          <span>§&nbsp;{index}</span>
        </div>
      </div>

      <div className="container-page relative z-10 py-20 sm:py-28 lg:py-32">
        <Reveal>
          <p className="eyebrow mb-6">
            <span className="text-white/30">§&nbsp;{index}</span>
            <span
              className="h-px w-12 bg-gradient-to-r from-accent to-transparent"
              aria-hidden="true"
            />
            <span>{eyebrow}</span>
          </p>
          <h1 className="font-heading text-[clamp(2.6rem,6vw,4.75rem)] font-bold leading-[1.0] tracking-[-0.04em]">
            {title}
          </h1>
          {intro && (
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65">{intro}</p>
          )}
          {children && (
            <div className="mt-10 flex flex-wrap items-center gap-4">{children}</div>
          )}
        </Reveal>
      </div>
    </header>
  );
}
