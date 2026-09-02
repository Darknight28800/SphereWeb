'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Décalage d'apparition en secondes (effet d'escalier). */
  delay?: number;
  as?: 'div' | 'li' | 'section' | 'article' | 'span';
  className?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Révèle son contenu en fondu ascendant à l'entrée dans le viewport,
 * et le masque quand il en sort (apparition / disparition au scroll).
 * Neutralisé si l'utilisateur a demandé des animations réduites.
 */
export default function Reveal({ children, delay = 0, as = 'div', className }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as ElementType;

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE, delay } },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.2, margin: '0px 0px -8% 0px' }}
    >
      {children}
    </MotionTag>
  );
}
