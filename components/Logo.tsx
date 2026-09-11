import Image from 'next/image';
import { site } from '@/lib/site';

interface LogoProps {
  withWordmark?: boolean;
  className?: string;
  /** Taille de la sphère en pixels. */
  size?: number;
}

/** Logo Kaylow Sphere — sphère (image de marque) + nom. */
export default function Logo({ withWordmark = true, className = '', size = 34 }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo-sphere.png"
        alt={withWordmark ? '' : site.name}
        width={size}
        height={size}
        priority
        className="shrink-0"
      />
      {withWordmark && (
        <span className="font-heading text-lg font-bold tracking-tight text-white">
          Kaylow <span className="text-accent">Sphere</span>
        </span>
      )}
    </span>
  );
}
