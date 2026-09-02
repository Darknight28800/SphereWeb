'use client';

import { useEffect } from 'react';

const SWEEP = 10_000; // ms — durée d'un balayage de bout en bout
const GAP = 6_000; // ms — pause entre deux balayages
const CYCLE = SWEEP + GAP;
const BEAM_W = 190; // px — doit correspondre à la largeur du ::before (globals.css)
const SELECTOR = '.glass-panel, .beam-target';

/**
 * Un unique « jet de lumière » traverse tout l'écran de gauche à droite en
 * ~10 s, puis marque une pause de 6 s avant de recommencer. Il n'est rendu
 * visible que sur les panneaux (via --beam-x / --beam-o). Si le curseur
 * survole un panneau, le faisceau s'y estompe (retour progressif à la sortie).
 */
export default function CardBeam() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const loop = (now: number) => {
      const phase = now % CYCLE;
      const sweeping = phase < SWEEP;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const beamX = sweeping ? -BEAM_W + (phase / SWEEP) * (vw + BEAM_W * 2) : -999999;

      const els = document.querySelectorAll<HTMLElement>(SELECTOR);
      for (const el of els) {
        const r = el.getBoundingClientRect();
        const onScreen = r.bottom > 0 && r.top < vh && r.width > 0;
        const localX = beamX - r.left;
        const across = sweeping && localX > -BEAM_W && localX < r.width;
        const hovered = el.matches(':hover');
        el.style.setProperty('--beam-x', `${localX}px`);
        el.style.setProperty('--beam-o', onScreen && across && !hovered ? '1' : '0');
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}
