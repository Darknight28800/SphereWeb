import { site } from '@/lib/site';

interface LogoProps {
  withWordmark?: boolean;
  className?: string;
  /** Taille de la sphère en pixels. */
  size?: number;
}

/**
 * Logo SphereWeb — version vectorielle provisoire (sphère + « S »)
 * aux couleurs de la charte (§2.1 / §2.3).
 * À remplacer par les fichiers SVG définitifs (clair / foncé) dès réception.
 */
export default function Logo({ withWordmark = true, className = '', size = 34 }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        role="img"
        aria-label={withWordmark ? undefined : `${site.name} logo`}
        aria-hidden={withWordmark ? true : undefined}
        className="shrink-0"
      >
        <defs>
          <linearGradient id="sw-sphere" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#22D3EE" />
            <stop offset="0.55" stopColor="#5B3DF6" />
            <stop offset="1" stopColor="#4c30e0" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="29" fill="url(#sw-sphere)" />
        <circle cx="32" cy="32" r="29" fill="none" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1.5" />
        {/* Reflet */}
        <ellipse cx="24" cy="20" rx="11" ry="7" fill="#ffffff" opacity="0.18" />
        {/* « S » stylisé */}
        <path
          d="M42 22c-3-3.4-7.6-5-12-4.4-5.2.7-9 4.3-9 8.7 0 4.6 3.7 7 10.4 8.7 6 1.5 8 2.8 8 5.4 0 2.7-2.9 4.7-6.9 4.7-3.7 0-7-1.6-9.5-4.4"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </svg>
      {withWordmark && (
        <span className="font-heading text-lg font-bold tracking-tight text-white">
          Sphere<span className="text-accent">Web</span>
        </span>
      )}
    </span>
  );
}
