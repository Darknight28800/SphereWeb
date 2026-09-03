'use client';

/**
 * MetalCard — carte avec reflet métallisé qui balaie la surface au survol
 * (effet « shine »). CSS pur (voir `.metal-glare` dans app/globals.css).
 * Inerte si `prefers-reduced-motion`.
 *
 * - Sans `href` : rend un <div>.
 * - Avec `href` : rend un <Link> Next (carte entièrement cliquable).
 *
 * Exemple :
 *
 *   <MetalCard href="/portfolio/mon-projet" className="glass-panel group flex flex-col">
 *     <h3>Mon projet</h3>
 *     <p>…</p>
 *   </MetalCard>
 */

import Link from 'next/link';
import type { ReactNode } from 'react';

interface MetalCardProps {
  children: ReactNode;
  className?: string;
  /** Si fourni, la carte devient un lien Next vers cette URL. */
  href?: string;
}

export default function MetalCard({ children, className = '', href }: MetalCardProps) {
  const inner = (
    <>
      {children}
      <span className="metal-glare" aria-hidden="true" />
    </>
  );

  const classes = `metal-card group relative overflow-hidden ${className}`;

  return href ? (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  ) : (
    <div className={classes}>{inner}</div>
  );
}
