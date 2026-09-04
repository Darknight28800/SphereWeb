'use client';

/**
 * HeroBackground3D — enveloppe le rendu 3D du hero.
 * - Chargé en lazy (next/dynamic, ssr: false) : three.js/r3f/drei restent
 *   hors du bundle initial et ne s'exécutent jamais côté serveur.
 * - Ne se monte pas sur mobile ni si `prefers-reduced-motion` : dans ces cas
 *   c'est un simple bloc absent, aucune ressource chargée.
 *
 * Exemple (dans le hero, en couche de fond) :
 *
 *   <section className="relative overflow-hidden">
 *     <HeroBackground3D className="absolute inset-0 -z-0 opacity-70" />
 *     <div className="relative z-10">…contenu du hero…</div>
 *   </section>
 */

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => null,
});

export default function HeroBackground3D({ className }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(mq.matches && !reduce);

    const onChange = () => setEnabled(mq.matches && !reduce);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className={className}>
      <HeroScene />
    </div>
  );
}
