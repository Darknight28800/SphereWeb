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

        {/* Partenariat — centré, ligne de séparation au-dessus.
            fond navy opaque (z-31) : les particules passent derrière le logo. */}
        <div className="mt-12 border-t border-white/10 pt-10">
          <div className="relative z-[31] mx-auto flex w-fit flex-wrap items-center justify-center gap-x-6 gap-y-4 bg-navy px-4 text-center">
            <span className="text-lg text-white/50">En partenariat avec</span>
            <a
              href={partner.url}
              target="_blank"
              rel="noreferrer"
              className="transition-opacity hover:opacity-80"
              aria-label={`${partner.name} — site web`}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={306}
                height={160}
                unoptimized
                className="h-16 w-auto sm:h-[4.5rem]"
              />
            </a>
          </div>
        </div>

        <div className="mt-10 space-y-3 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/40">
          <p>
            © {year} {site.name} — {site.legalName}. Tous droits réservés. Toute reproduction ou
            copie, même partielle, de ce site (contenus, code, design) est interdite sans
            autorisation écrite.
          </p>
          <p>
            Conçu &amp; développé avec <span className="text-accent">♥</span> en France.
          </p>
          <div className="flex gap-6 pt-1">
            <Link href="/mentions-legales" className="transition-colors hover:text-white/70">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="transition-colors hover:text-white/70">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
