'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Intervalle entre chaque enfant, en secondes. */
  gap?: number;
  as?: 'div' | 'ol' | 'ul';
}

/**
 * Conteneur qui fait apparaître ses <StaggerItem> en cascade quand il entre
 * dans le viewport — et les fait disparaître quand il en sort.
 */
export function Stagger({ children, className, gap = 0.09, as = 'div' }: StaggerProps) {
  const MotionTag = motion[as] as ElementType;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.15, margin: '0px 0px -6% 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap } },
      }}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
  id?: string;
  /** Léger soulèvement au survol (cartes). */
  hover?: boolean;
}

export function StaggerItem({ children, className, as = 'div', id, hover = false }: StaggerItemProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as ElementType;

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  };

  return (
    <MotionTag
      id={id}
      className={className}
      variants={variants}
      whileHover={
        hover && !reduce ? { y: -4, transition: { duration: 0.2, ease: 'easeOut' } } : undefined
      }
    >
      {children}
    </MotionTag>
  );
}
