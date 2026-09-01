import Image from 'next/image';

/**
 * Visuel du hero : la sphère de marque au centre de gravité,
 * entourée d'orbites en rotation lente. Décoratif.
 */
export default function OrbitViz({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative mx-auto aspect-square w-full max-w-[440px] ${className}`}
    >
      {/* Halo */}
      <div className="absolute inset-[12%] rounded-full bg-brand/25 blur-3xl" />

      {/* Orbites statiques */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="orbit-stroke" x1="0" y1="0" x2="400" y2="400">
            <stop offset="0" stopColor="#22D3EE" stopOpacity="0.35" />
            <stop offset="1" stopColor="#5B3DF6" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="196" fill="none" stroke="url(#orbit-stroke)" strokeWidth="1" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <circle cx="200" cy="200" r="104" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      </svg>

      {/* Points en orbite */}
      <div className="absolute inset-0 animate-orbit-slow motion-reduce:animate-none">
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(34,211,238,0.6)]" />
      </div>
      <div className="absolute inset-[11.5%] animate-orbit-reverse motion-reduce:animate-none">
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-400 shadow-[0_0_10px_2px_rgba(123,98,248,0.55)]" />
      </div>
      <div className="absolute inset-[26%] animate-orbit motion-reduce:animate-none">
        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/70" />
      </div>

      {/* Sphère centrale */}
      <div className="absolute inset-[34%] animate-float motion-reduce:animate-none">
        <Image
          src="/logo-sphere.png"
          alt=""
          fill
          sizes="180px"
          className="object-contain drop-shadow-[0_0_30px_rgba(91,61,246,0.5)]"
          priority
        />
      </div>
    </div>
  );
}
