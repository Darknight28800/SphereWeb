'use client';

/**
 * useGsapScope — exécute des animations GSAP (y compris ScrollTrigger) dans un
 * scope propre, avec nettoyage automatique (gsap.context) et respect de
 * `prefers-reduced-motion`.
 *
 * Retourne une ref à poser sur l'élément conteneur ; les sélecteurs passés à
 * gsap dans `effect` sont automatiquement limités à cet élément.
 *
 * Exemple :
 *
 *   'use client';
 *   import { gsap } from 'gsap';
 *   import { ScrollTrigger } from 'gsap/ScrollTrigger';
 *   import { useGsapScope } from '@/components/animations/useGsapScope';
 *
 *   export default function Section() {
 *     const ref = useGsapScope<HTMLDivElement>(() => {
 *       gsap.from('.reveal-line', {
 *         yPercent: 40, opacity: 0, stagger: 0.1, ease: 'power3.out',
 *         scrollTrigger: { trigger: ref.current, start: 'top 75%' },
 *       });
 *     });
 *     return (
 *       <div ref={ref}>
 *         <p className="reveal-line">…</p>
 *         <p className="reveal-line">…</p>
 *       </div>
 *     );
 *   }
 */

import { useLayoutEffect, useRef, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapScope<T extends HTMLElement>(
  effect: (scope: RefObject<T | null>) => void,
  deps: unknown[] = [],
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => effect(ref), ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
