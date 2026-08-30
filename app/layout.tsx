import type { Metadata, Viewport } from 'next';
import { Inter, Poppins, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { site } from '@/lib/site';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-poppins',
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'SphereWeb — Développeur web freelance fullstack',
    template: '%s — SphereWeb',
  },
  description: `${site.baseline} Sites vitrines, applications web sur mesure et maintenance par ${site.legalName}, développeur freelance fullstack en ${site.location}.`,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  manifest: '/site.webmanifest',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B1120',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </div>
      </body>
    </html>
  );
}
