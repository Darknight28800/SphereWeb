'use client';

/**
 * FadeInCard — apparition douce d'un bloc à l'entrée dans le viewport
 * (fondu + glissement + léger ressort), avec framer-motion.
 *
 * - Bidirectionnel par défaut (réapparaît/disparaît au scroll) ; `once` pour figer.
 * - Respecte `prefers-reduced-motion` (aucun déplacement, fondu instantané).
 * - `direction` : d'où vient la card. `delay` en secondes (effet cascade manuel).
 *
 * Exemple minimal dans une page (Server Component qui importe ce Client Component) :
 *
 *   import FadeInCard from '@/components/animations/FadeInCard';
 *
 *   <div className="grid gap-5 sm:grid-cols-3">
 *     {items.map((it, i) => (
 *       <FadeInCard key={it.id} delay={i * 0.08} className="glass-panel">
 *         <h3>{it.title}</h3>
 *         <p>{it.text}</p>
 *       </FadeInCard>
 *     ))}
 *   </div>
 */

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const MOTION_TAGS = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  section: motion.section,
} as const;

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface FadeInCardProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'section';
  /** Délai avant apparition, en secondes. */
  delay?: number;
  /** Durée de l'animation, en secondes. */
  duration?: number;
  direction?: Direction;
  /** Distance du glissement, en pixels. */
  distance?: number;
  /** N'animer qu'une seule fois (ne pas rejouer au re-scroll). */
  once?: boolean;
  /** Ajoute un léger effet de ressort. */
  spring?: boolean;
}

const offset = (dir: Direction, d: number) => {
  switch (dir) {
    case 'up':
      return { y: d };
    case 'down':
      return { y: -d };
    case 'left':
      return { x: d };
    case 'right':
      return { x: -d };
    default:
      return {};
  }
};

export default function FadeInCard({
  children,
  className,
  as = 'div',
  delay = 0,
  duration = 0.5,
  direction = 'up',
  distance = 24,
  once = false,
  spring = false,
}: FadeInCardProps) {
  const reduce = useReducedMotion();
  const MotionTag = MOTION_TAGS[as];

  const from = reduce ? {} : offset(direction, distance);

  const variants: Variants = {
    hidden: { opacity: 0, ...from },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: spring
        ? { type: 'spring', stiffness: 260, damping: 24, delay }
        : { duration, ease: [0.22, 1, 0.36, 1], delay },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.2, once, margin: '0px 0px -8% 0px' }}
    >
      {children}
    </MotionTag>
  );
}
