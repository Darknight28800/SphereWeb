import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  tone?: 'navy' | 'mist';
  id?: string;
}

export function Section({ children, className = '', tone = 'navy', id }: SectionProps) {
  const toneClass = tone === 'mist' ? 'bg-mist text-ink' : 'bg-navy';
  return (
    <section id={id} className={`${toneClass} py-16 sm:py-24 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: 'navy' | 'mist';
  center?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = 'navy',
  center = false,
}: SectionHeadingProps) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-2xl`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className={`text-2xl sm:text-3xl ${tone === 'mist' ? 'text-navy' : ''}`}>{title}</h2>
      {intro && (
        <p className={`mt-4 text-base ${tone === 'mist' ? 'text-ink/80' : 'prose-light'}`}>{intro}</p>
      )}
    </div>
  );
}
