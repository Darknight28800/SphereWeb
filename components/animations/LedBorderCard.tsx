'use client';

/**
 * LedBorderCard — carte entourée d'une bordure lumineuse qui tourne
 * (effet LED / glow), violet-indigo → cyan électrique. CSS pur (voir
 * `.led-border` dans app/globals.css : @property + conic-gradient animé).
 *
 * Le halo tournant est purement décoratif et se fige si `prefers-reduced-motion`.
 *
 * Exemple :
 *
 *   <LedBorderCard className="p-6">
 *     <h3>Offre mise en avant</h3>
 *     <p>…</p>
 *   </LedBorderCard>
 *
 * `className` s'applique au contenu intérieur (padding, fond, etc.).
 * `glass` (défaut true) reprend le style verre dépoli du site.
 */

import type { ReactNode } from 'react';

interface LedBorderCardProps {
  children: ReactNode;
  className?: string;
  glass?: boolean;
}

export default function LedBorderCard({ children, className = '', glass = true }: LedBorderCardProps) {
  return (
    <div className="led-border h-full">
      <div
        className={`relative h-full rounded-2xl ${
          glass ? 'border border-white/10 bg-navy-800/80 backdrop-blur-xl' : ''
        } ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
