import Link from 'next/link';
import { Section } from '@/components/Section';
import { LegalDoc, Placeholder } from '@/components/LegalDoc';
import { site } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Mentions légales',
  description:
    'Mentions légales du site sphereweb-dev.com — éditeur, hébergeur et propriété intellectuelle.',
  path: '/mentions-legales',
  noindex: true,
});

export default function LegalNoticePage() {
  return (
    <Section>
      <LegalDoc title="Mentions légales" updated="Août 2026">
        <h2>1. Éditeur du site</h2>
        <p>
          Le site {site.url} est édité par {site.legalName}, entrepreneur individuel exerçant sous le
          nom commercial «&nbsp;{site.name}&nbsp;».
        </p>
        <ul>
          <li>Statut : {site.status}</li>
          <li>
            Adresse : <Placeholder>adresse de l&apos;entreprise</Placeholder>
          </li>
          <li>
            SIRET : <Placeholder>numéro SIRET</Placeholder>
          </li>
          <li>
            N° TVA intracommunautaire :{' '}
            <Placeholder>le cas échéant / «&nbsp;TVA non applicable, art. 293 B du CGI&nbsp;»</Placeholder>
          </li>
          <li>
            E-mail : <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
          <li>Directeur de la publication : {site.legalName}</li>
        </ul>

        <h2>2. Hébergement</h2>
        <p>
          Le site est hébergé par Hostinger International Ltd — 61 Lordou Vironos Street, 6023 Larnaca,
          Chypre —{' '}
          <a href="https://www.hostinger.fr" target="_blank" rel="noreferrer">
            www.hostinger.fr
          </a>
          .
        </p>

        <h2>3. Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus de ce site (textes, éléments graphiques, logo, code) est la
          propriété de {site.legalName}, sauf mention contraire. Toute reproduction ou représentation
          totale ou partielle sans autorisation écrite préalable est interdite.
        </p>
        <p>
          Les noms et marques des projets présentés dans le portfolio restent la propriété de leurs
          titulaires respectifs et sont cités à titre d&apos;illustration.
        </p>

        <h2>4. Responsabilité</h2>
        <p>
          {site.legalName} s&apos;efforce d&apos;assurer l&apos;exactitude des informations diffusées
          sur ce site, sans pouvoir en garantir l&apos;exhaustivité. Les liens vers des sites tiers
          n&apos;engagent pas la responsabilité de l&apos;éditeur quant à leur contenu.
        </p>

        <h2>5. Données personnelles et cookies</h2>
        <p>
          Le traitement des données transmises via le formulaire de contact et l&apos;usage des
          cookies sont décrits dans la{' '}
          <Link href="/confidentialite">politique de confidentialité</Link>.
        </p>
      </LegalDoc>
    </Section>
  );
}
