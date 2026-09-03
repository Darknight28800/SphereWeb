'use client';

/**
 * LedBand — fine bande lumineuse animée (dégradé violet ↔ cyan qui défile),
 * à utiliser comme accent : sous un titre de section, en séparateur, ou
 * au-dessus / en dessous d'un bloc CTA. CSS pur (`.led-band` dans globals.css).
 * Figée si `prefers-reduced-motion`.
 *
 * Exemple :
 *
 *   <LedBand className="mx-auto mt-6 max-w-[120px]" />
 *
 * Pour un bouton avec liseré LED animé, utiliser plutôt la classe `.led-cta` :
 *
 *   <Link href="/contact" className="btn-primary led-cta">Demander un devis</Link>
 */

export default function LedBand({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`led-band block ${className}`} />;
}
