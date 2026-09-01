import Image from 'next/image';

/**
 * Visuel du hero : la sphère de marque, grand format, en rotation lente,
 * posée sur un halo diffus et une orbite discrète. Purement décoratif.
 */
export default function HeroSphere({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative mx-auto aspect-square w-full max-w-[480px] ${className}`}
    >
      {/* Halo */}
      <div className="absolute inset-[10%] rounded-full bg-brand/30 blur-3xl" />
      <div className="absolute inset-[22%] rounded-full bg-accent/10 blur-2xl" />

      {/* Orbite discrète (contre-rotation) */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full motion-safe:animate-spin-reverse"
      >
        <circle
          cx="200"
          cy="200"
          r="188"
          fill="none"
          stroke="rgba(59,180,255,0.18)"
          strokeWidth="1"
          strokeDasharray="2 7"
        />
      </svg>

      {/* Sphère en rotation */}
      <div className="absolute inset-[4%] motion-safe:animate-spin-slow">
        <Image
          src="/logo-sphere.png"
          alt=""
          fill
          sizes="480px"
          priority
          className="object-contain drop-shadow-[0_0_45px_rgba(91,61,246,0.5)]"
        />
      </div>
    </div>
  );
}
