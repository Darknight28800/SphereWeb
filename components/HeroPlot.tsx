import Image from 'next/image';

/**
 * Visuel du hero : la sphère de marque « relevée » sur un plan technique —
 * cadre, axes gradués, réticule et point coté (0,0). Décoratif.
 */
export default function HeroPlot({ className = '' }: { className?: string }) {
  const ticks = [-2, -1, 1, 2];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative mx-auto aspect-square w-full max-w-[420px] ${className}`}
    >
      <svg viewBox="0 0 400 400" className="h-full w-full">
        <defs>
          <pattern id="hp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Trame + cadre */}
        <rect x="40" y="40" width="320" height="320" fill="url(#hp-grid)" />
        <rect
          x="40"
          y="40"
          width="320"
          height="320"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1"
        />

        {/* Coins réticule */}
        {[
          [40, 40],
          [360, 40],
          [40, 360],
          [360, 360],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`} stroke="#22D3EE" strokeWidth="1.25">
            <line x1={x - 6} y1={y} x2={x + 6} y2={y} />
            <line x1={x} y1={y - 6} x2={x} y2={y + 6} />
          </g>
        ))}

        {/* Axes */}
        <line x1="40" y1="200" x2="360" y2="200" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        <line x1="200" y1="40" x2="200" y2="360" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />

        {/* Graduations + libellés */}
        {ticks.map((t) => {
          const gx = 200 + t * 64;
          const gy = 200 - t * 64;
          return (
            <g key={t} fontFamily="var(--font-jetbrains-mono), monospace" fontSize="9" fill="rgba(255,255,255,0.35)">
              <line x1={gx} y1="196" x2={gx} y2="204" stroke="rgba(255,255,255,0.25)" />
              <line x1="196" y1={gy} x2="204" y2={gy} stroke="rgba(255,255,255,0.25)" />
              <text x={gx} y="218" textAnchor="middle">{t}</text>
              <text x="214" y={gy + 3}>{-t}</text>
            </g>
          );
        })}

        {/* Points relevés */}
        <circle cx="120" cy="128" r="2.5" fill="rgba(255,255,255,0.55)" />
        <circle cx="288" cy="150" r="2.5" fill="#7b62f8" />
        <circle cx="150" cy="286" r="2.5" fill="rgba(255,255,255,0.4)" />

        {/* Réticule central */}
        <circle cx="200" cy="200" r="58" fill="none" stroke="rgba(34,211,238,0.35)" strokeWidth="1" strokeDasharray="3 4" />
        <line x1="128" y1="200" x2="272" y2="200" stroke="rgba(34,211,238,0.5)" strokeWidth="1" />
        <line x1="200" y1="128" x2="200" y2="272" stroke="rgba(34,211,238,0.5)" strokeWidth="1" />

        {/* Étiquette cotée */}
        <line x1="248" y1="152" x2="300" y2="110" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <text
          x="300"
          y="104"
          fontFamily="var(--font-jetbrains-mono), monospace"
          fontSize="10"
          fill="#22D3EE"
        >
          centre de gravité
        </text>
        <text
          x="300"
          y="118"
          fontFamily="var(--font-jetbrains-mono), monospace"
          fontSize="9"
          fill="rgba(255,255,255,0.4)"
        >
          (0, 0)
        </text>
      </svg>

      {/* Sphère de marque au centre du plan */}
      <div className="absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2">
        <Image src="/logo-sphere.png" alt="" fill sizes="120px" className="object-contain" priority />
      </div>
    </div>
  );
}
