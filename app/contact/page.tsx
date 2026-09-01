import Link from 'next/link';
import Icon from '@/components/Icon';
import ContactForm from '@/components/ContactForm';
import { Section } from '@/components/Section';
import { site } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Décrivez votre projet web : je vous réponds sous 48 h ouvrées avec un premier avis et les prochaines étapes.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <Section className="aura">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
        <div>
          <p className="eyebrow mb-4">
            <span className="text-white/30">00</span>
            <span className="h-px w-8 bg-white/15" aria-hidden="true" />
            <span>Contact</span>
          </p>
          <h1 className="text-3xl sm:text-4xl">Parlons de votre projet</h1>
          <p className="mt-4 prose-light">
            Quelques lignes sur votre besoin suffisent pour démarrer. Je vous réponds sous 48 h
            ouvrées avec un premier avis, les questions utiles et les prochaines étapes.
          </p>

          <div className="mt-8 space-y-4 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-3 text-white/75 hover:text-accent"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                <Icon name="mail" className="h-5 w-5" />
              </span>
              {site.email}
            </a>
            <p className="inline-flex items-center gap-3 text-white/75">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                <Icon name="map-pin" className="h-5 w-5" />
              </span>
              {site.location}
            </p>
          </div>

          <p className="mt-8 text-xs text-white/45">
            Les informations transmises servent uniquement à traiter votre demande. Voir la{' '}
            <Link href="/confidentialite" className="link-accent">
              politique de confidentialité
            </Link>
            .
          </p>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
