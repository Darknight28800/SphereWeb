import type { ReactNode } from 'react';

/**
 * Gabarit de page légale. Le style typographique est géré ici pour éviter
 * de dépendre du plugin @tailwindcss/typography.
 */
export function LegalDoc({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="text-3xl sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-white/40">Dernière mise à jour : {updated}</p>
      <div
        className="mt-10 space-y-4 text-white/75 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4
          [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white
          [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-white
          [&_li]:ml-1 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6"
      >
        {children}
      </div>
    </article>
  );
}

/** Marque un contenu à compléter avant mise en production. */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded bg-amber-300/20 px-1.5 py-0.5 text-amber-200">[À compléter — {children}]</mark>
  );
}
