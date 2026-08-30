import Link from 'next/link';
import Logo from './Logo';
import Icon from './Icon';
import { nav, site } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-white/60">{site.baseline}</p>
            <p className="mt-4 text-sm text-white/50">
              {site.legalName} — {site.role}
              <br />
              {site.status} · {site.location}
            </p>
          </div>

          <nav aria-label="Pied de page — navigation">
            <h2 className="font-heading text-sm font-semibold text-white">Navigation</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link href={item.to} className="text-white/60 hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-heading text-sm font-semibold text-white">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-white/60 hover:text-accent"
                >
                  <Icon name="mail" className="h-4 w-4" />
                  {site.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-white/60">
                <Icon name="map-pin" className="h-4 w-4" />
                {site.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name} — {site.legalName}. Tous droits réservés.
          </p>
          <div className="flex gap-5">
            <Link href="/mentions-legales" className="hover:text-white/70">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-white/70">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
