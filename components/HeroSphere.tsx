import Image from 'next/image';

/**
 * Visuel du hero : la sphère de marque, grand format.
 * - rotation lente continue (35 s / tour)
 * - léger battement zoom / dézoom (cycle 6 s)
 * - halo de lumière derrière, synchronisé : il s'intensifie au zoom.
 * Purement décoratif ; toutes les animations sont coupées si
 * l'utilisateur a demandé des animations réduites (motion-safe).
 */
export default function HeroSphere({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative mx-auto aspect-square w-full ${className}`}
    >
      {/* Halo pulsé (s'intensifie quand la sphère zoome) */}
      <div className="absolute inset-[12%] rounded-full bg-brand/40 blur-3xl motion-safe:animate-glow" />
      <div className="absolute inset-[24%] rounded-full bg-accent/15 blur-2xl motion-safe:animate-glow" />

      {/* Rotation continue */}
      <div className="absolute inset-[4%] motion-safe:animate-spin-slow">
        {/* Battement zoom / dézoom */}
        <div className="relative h-full w-full motion-safe:animate-breathe">
          <Image
            src="/logo-sphere.png"
            alt=""
            fill
            sizes="480px"
            priority
            className="object-contain drop-shadow-[0_0_50px_rgba(91,61,246,0.55)]"
          />
        </div>
      </div>
    </div>
  );
}
