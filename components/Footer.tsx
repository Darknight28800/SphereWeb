import Link from 'next/link';
import Image from 'next/image';
import Logo from './Logo';
import Icon from './Icon';
import { nav, partner, site } from '@/lib/site';

const colLabel = 'font-mono text-xs uppercase tracking-[0.2em] text-white/40';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm text-white/60">{site.baseline}</p>
            <p className="mt-5 font-mono text-xs leading-relaxed text-white/45">
              {site.legalName} — {site.role}
              <br />
              {site.status} · {site.location}
            </p>
          </div>

          <nav aria-label="Pied de page — navigation">
            <h2 className={colLabel}>Navigation</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link href={item.to} className="text-white/60 transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={colLabel}>Contact</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-white/60 transition-colors hover:text-accent"
                >
                  <Icon name="mail" className="h-4 w-4" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${partner.emailHref}`}
                  className="inline-flex items-center gap-2 text-white/60 transition-colors hover:text-accent"
                >
                  <Icon name="mail" className="h-4 w-4" />
                  {partner.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-white/60">
                <Icon name="map-pin" className="h-4 w-4" />
                {site.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Partenariat — ligne de séparation ; logo à la suite de la phrase.
            z-31 + fond opaque : les particules passent derrière. */}
        <div className="relative z-[31] mt-12 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-white/10 pt-8">
          <span className={colLabel}>En partenariat avec</span>
          <a
            href={partner.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 rounded-lg border border-white/10 bg-navy-800 px-3.5 py-2 transition-colors hover:border-accent/40"
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={150}
              height={24}
              unoptimized
              className="h-6 w-auto"
            />
            <span className="sr-only">{partner.name}</span>
            <Icon name="external" className="h-3.5 w-3.5 text-white/35" />
          </a>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 font-mono text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name} — {site.legalName}
          </p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="transition-colors hover:text-white/70">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="transition-colors hover:text-white/70">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
