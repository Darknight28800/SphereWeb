import type { Metadata } from 'next';
import { site } from './site';

const BASE_URL = site.url;

/**
 * Fabrique les métadonnées d'une page à partir d'un titre et d'une description.
 * Le suffixe « — SphereWeb » et l'URL canonique sont ajoutés automatiquement.
 */
export function pageMetadata(options: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  type?: 'website' | 'article';
}): Metadata {
  const { title, description, path, noindex, type = 'website' } = options;
  const url = `${BASE_URL}${path === '/' ? '' : path}`;

  return {
    title,
    description,
    alternates: { canonical: url || '/' },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      title: `${title} — ${site.name}`,
      description,
      url: url || BASE_URL,
      siteName: site.name,
      locale: 'fr_FR',
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — ${site.name}`,
      description,
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}
