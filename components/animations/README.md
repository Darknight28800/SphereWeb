# components/animations/

Boîte à outils d'animation du site. Tout est **client-side**, **respecte
`prefers-reduced-motion`** et reste compatible avec un déploiement Node sur
Hostinger (aucune dépendance serveur).

| Fichier | Rôle | Dépendance |
|---|---|---|
| `FadeInCard.tsx` | Apparition fondu + glissement au scroll (bidirectionnel) | framer-motion |
| `SmoothScroll.tsx` | Défilement fluide global (inertie) + synchro ScrollTrigger | lenis + gsap |
| `useGsapScope.ts` | Hook : animations GSAP scopées, nettoyage auto | gsap |
| `ScrollParallax.tsx` | Parallaxe d'une couche au scroll | gsap/ScrollTrigger |
| `HeroBackground3D.tsx` + `HeroScene.tsx` | Élément 3D discret du hero (lazy, desktop only) | three + @react-three/fiber + drei |
| `LedBorderCard.tsx` | Bordure lumineuse tournante autour d'une carte | CSS pur |
| `MetalCard.tsx` | Reflet métallisé au survol | CSS pur |
| `LedBand.tsx` | Bande LED animée (accent section / CTA) | CSS pur |

CSS associé : bloc « Effets décoratifs » à la fin de `app/globals.css`
(`.led-border`, `.metal-glare`, `.led-band`, `.led-cta`, `@property --led-angle`).

## Exemples minimaux

### FadeInCard

```tsx
import FadeInCard from '@/components/animations/FadeInCard';

<div className="grid gap-5 sm:grid-cols-3">
  {items.map((it, i) => (
    <FadeInCard key={it.id} delay={i * 0.08} spring className="glass-panel">
      {/* … */}
    </FadeInCard>
  ))}
</div>
```

### SmoothScroll (déjà monté dans `app/layout.tsx`)

```tsx
import SmoothScroll from '@/components/animations/SmoothScroll';
// <SmoothScroll>{children}</SmoothScroll>

// Aller vers une ancre en scroll lissé :
import { useLenis } from '@/components/animations/SmoothScroll';
const lenis = useLenis();
lenis?.scrollTo('#contact', { offset: -80 });
```

### GSAP ScrollTrigger

```tsx
'use client';
import { gsap } from 'gsap';
import { useGsapScope } from '@/components/animations/useGsapScope';

export default function Section() {
  const ref = useGsapScope<HTMLDivElement>(() => {
    gsap.from('.line', {
      yPercent: 30, opacity: 0, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 78%' },
    });
  });
  return <div ref={ref}><p className="line">…</p><p className="line">…</p></div>;
}
```

### Élément 3D du hero

```tsx
import HeroBackground3D from '@/components/animations/HeroBackground3D';

<section className="relative overflow-hidden">
  <HeroBackground3D className="pointer-events-none absolute inset-0 opacity-70" />
  <div className="relative z-10">{/* contenu hero */}</div>
</section>
```

### Bordure LED / carte métallisée / bande LED

```tsx
import LedBorderCard from '@/components/animations/LedBorderCard';
import MetalCard from '@/components/animations/MetalCard';
import LedBand from '@/components/animations/LedBand';

<LedBorderCard className="p-6">…offre mise en avant…</LedBorderCard>

<MetalCard as={Link} href="/portfolio/x" className="glass-panel group flex flex-col">…</MetalCard>

<LedBand className="mx-auto mt-6 max-w-[120px]" />
<Link href="/contact" className="btn-primary led-cta">Demander un devis</Link>
```
