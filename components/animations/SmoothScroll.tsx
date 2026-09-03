'use client';

/**
 * SmoothScroll — défilement fluide (inertie) sur tout le site, via Lenis.
 * Synchronise aussi GSAP ScrollTrigger pour que les timelines liées au scroll
 * restent parfaitement calées.
 *
 * - Monté une seule fois dans app/layout.tsx (englobe #app-shell).
 * - Désactivé si `prefers-reduced-motion` : on retombe sur le scroll natif.
 * - N'ajoute aucun wrapper visuel (Lenis agit sur window).
 *
 * Utilitaire fourni : `useLenis()` pour récupérer l'instance (ex. scroll vers ancre).
 *
 *   const lenis = useLenis();
 *   <button onClick={() => lenis?.scrollTo('#contact')}>Aller au contact</button>
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    setLenis(instance);

    // Pont Lenis <-> GSAP : le ticker GSAP fait avancer Lenis,
    // et ScrollTrigger se met à jour à chaque frame de scroll lissé.
    instance.on('scroll', ScrollTrigger.update);
    const onTick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      instance.off('scroll', ScrollTrigger.update);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
