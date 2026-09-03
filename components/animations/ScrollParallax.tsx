'use client';

/**
 * ScrollParallax — déplace verticalement son contenu au fil du scroll,
 * proportionnellement à la progression dans le viewport (GSAP ScrollTrigger).
 * Idéal pour des couches décoratives (halo du hero, image de fond de section)
 * ou une légère profondeur entre sections.
 *
 * - `speed` > 0 : la couche défile plus lentement (recule) ; < 0 : plus vite.
 * - Inerte si `prefers-reduced-motion`.
 *
 * Exemple :
 *
 *   <section className="relative overflow-hidden">
 *     <ScrollParallax speed={0.3} className="absolute inset-0 -z-10">
 *       <div className="aura h-[130%]" />
 *     </ScrollParallax>
 *     <h1>…</h1>
 *   </section>
 */

import type { ReactNode } from 'react';
import { gsap } from 'gsap';
import { useGsapScope } from './useGsapScope';

interface ScrollParallaxProps {
  children: ReactNode;
  className?: string;
  /** Amplitude relative du parallaxe (0.1 discret → 0.6 marqué). */
  speed?: number;
}

export default function ScrollParallax({ children, className, speed = 0.3 }: ScrollParallaxProps) {
  const ref = useGsapScope<HTMLDivElement>(
    (scope) => {
      const el = scope.current;
      if (!el) return;
      gsap.to(el, {
        yPercent: -speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    [speed],
  );

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}
