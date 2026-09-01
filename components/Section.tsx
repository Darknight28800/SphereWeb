import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  tone?: 'navy' | 'panel' | 'mist';
  id?: string;
}

const toneMap: Record<NonNullable<SectionProps['tone']>, string> = {
  navy: 'bg-navy',
  panel: 'bg-navy-800/40',
  mist: 'bg-mist text-ink',
};

export function Section({ children, className = '', tone = 'navy', id }: SectionProps) {
  return (
    <section id={id} className={`${toneMap[tone]} py-16 sm:py-24 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  /** Index affiché en tête de libellé, ex. "01". */
  index?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: 'navy' | 'mist';
  center?: boolean;
}

/** En-tête de section : libellé indexé monospace + titre + intro. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  tone = 'navy',
  center = false,
}: SectionHeadingProps) {
  const dark = tone !== 'mist';
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-2xl`}>
      {eyebrow && (
        <p
          className={`eyebrow mb-4 ${center ? 'justify-center' : ''} ${
            dark ? '' : 'text-brand'
          }`}
        >
          {index && <span className={dark ? 'text-white/30' : 'text-ink/40'}>{index}</span>}
          <span className={`h-px w-8 ${dark ? 'bg-white/15' : 'bg-ink/20'}`} aria-hidden="true" />
          <span>{eyebrow}</span>
        </p>
      )}
      <h2 className={`text-2xl sm:text-[2rem] ${dark ? '' : 'text-navy'}`}>{title}</h2>
      {intro && (
        <p className={`mt-4 text-base ${dark ? 'prose-light' : 'text-ink/80'}`}>{intro}</p>
      )}
    </div>
  );
}
