# SphereWeb — site officiel

Site vitrine de **SphereWeb**, la marque de David Antoina, développeur freelance fullstack
(micro-entreprise, Eure-et-Loir · 28).

> « SphereWeb, le centre de gravité de votre projet web. »

Référence du projet : [`docs/Charte_SphereWeb.docx`](docs/Charte_SphereWeb.docx) (v2.0 — Août 2026).
La charte prévoyait React + Vite ; le projet est finalement bâti sur **Next.js** (décision
postérieure à la charte). L'« API interne Node/Express » du formulaire de contact est réalisée
par une **Route Handler Next** (`app/api/contact/route.ts`).

## Stack

| Couche | Choix |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript |
| Style | Tailwind CSS (palette et typo de la charte) |
| Polices | `next/font` — Poppins (titres), Inter (texte), JetBrains Mono (code) |
| SEO | Metadata API, `app/sitemap.ts`, `app/robots.ts` |
| Formulaire contact | Route Handler `app/api/contact` → nodemailer → SMTP IONOS |
| Hébergement | IONOS (offre Node.js) ou Vercel — domaine `sphere-web.com` |

## Arborescence

```
SphereWeb/
├─ app/
│  ├─ layout.tsx            En-tête / pied de page / polices / metadata globale
│  ├─ page.tsx              Accueil
│  ├─ services/             Services
│  ├─ portfolio/            Liste + [slug] (détail projet, SSG)
│  ├─ a-propos/             À propos
│  ├─ contact/              Page contact (formulaire = composant client)
│  ├─ mentions-legales/     Pages légales (noindex)
│  ├─ confidentialite/
│  ├─ api/contact/route.ts  API du formulaire (validation zod + anti-spam + e-mail)
│  ├─ sitemap.ts / robots.ts
│  └─ not-found.tsx
├─ components/              Header, Footer, Logo, Icon, Section, CtaBand, ContactForm, CookieConsent, LegalDoc
├─ lib/
│  ├─ site.ts               Contenu éditorial (source unique — textes, services, projets)
│  ├─ seo.ts                Fabrique de metadata par page
│  └─ mailer.ts             Envoi d'e-mail (nodemailer)
├─ public/                  favicon.svg, site.webmanifest
├─ assets/                  Fichiers source de marque (logo)
└─ docs/                    Charte de projet
```

## Démarrage

Prérequis : Node.js ≥ 20.

```bash
npm install

# Config e-mail : copier et renseigner les identifiants SMTP IONOS
cp .env.example .env.local

npm run dev      # http://localhost:3000
```

## Build & déploiement

```bash
npm run build
npm run start    # sert le build en local
```

Le formulaire de contact nécessite un runtime Node (route dynamique). Déploiement :

- **Vercel** : import du repo, renseigner les variables SMTP dans le dashboard.
- **IONOS (offre Node.js)** : `npm ci && npm run build && npm run start`, variables d'environnement
  définies côté hébergeur, reverse-proxy vers le port de `next start`.

Un export 100 % statique n'est pas possible tel quel à cause de la route `/api/contact`
(il faudrait déléguer l'envoi à un service tiers).

## Variables d'environnement

| Variable | Rôle |
|---|---|
| `SMTP_HOST` `SMTP_PORT` `SMTP_SECURE` | Serveur SMTP IONOS (`smtp.ionos.fr`, 587, `false`) |
| `SMTP_USER` `SMTP_PASS` | Identifiants de la boîte mail |
| `MAIL_FROM` `MAIL_TO` | Expéditeur / destinataire des messages du formulaire |

## À compléter avant mise en production

- [ ] Logo SVG définitif (versions claire / foncée) + favicons PNG (`favicon-32.png`, `favicon-192.png`, `favicon-512.png`, `apple-touch-icon.png`) et `og-image.png` dans `public/`
- [ ] Mentions légales : adresse, SIRET, TVA (`app/mentions-legales/page.tsx`)
- [ ] Confidentialité : durée de conservation, outil de mesure d'audience retenu
- [ ] Identifiants SMTP IONOS (`.env.local` / hébergeur)
- [ ] Liens profils Malt / Codeur.com (`lib/site.ts`)
- [ ] Captures d'écran des projets du portfolio
- [ ] Page CGV si devis / paiements en ligne (Charte §4)
- [ ] Brancher l'outil de mesure d'audience sur le consentement (`components/CookieConsent.tsx` → `hasAnalyticsConsent()`)
- [ ] Rate-limiting partagé (Redis/Upstash) si déploiement multi-instances (`app/api/contact/route.ts`)
