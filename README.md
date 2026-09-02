# SphereWeb — site officiel

Site vitrine de **SphereWeb**, la marque de David Antoina, développeur freelance fullstack
(micro-entreprise, Eure-et-Loir · 28).

> « SphereWeb, le centre de gravité de votre projet web. »

Référence du projet : [`docs/Charte_SphereWeb.docx`](docs/Charte_SphereWeb.docx) (v2.0 — Août 2026).

Décisions postérieures à la charte :
- **Next.js** (la charte prévoyait React + Vite). L'« API interne Node/Express » du formulaire
  de contact est une **Route Handler Next** (`app/api/contact/route.ts`).
- Domaine officiel : **`sphereweb-dev.com`** (la charte mentionnait `sphere-web.com`).
- Hébergement : **Hostinger** mutualisé Business avec application Node.js (la charte mentionnait IONOS).
- E-mail de contact : `david-antoina@sphereweb-dev.com`.

## Stack

| Couche | Choix |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript |
| Style | Tailwind CSS (palette et typo de la charte) |
| Polices | `next/font` — Poppins (titres), Inter (texte), JetBrains Mono (code) |
| SEO | Metadata API, `app/sitemap.ts`, `app/robots.ts` |
| Formulaire contact | Route Handler `app/api/contact` → nodemailer → SMTP |
| Démo IA (`/demo`) | Route Handler `app/api/generate` → API Anthropic (Claude Sonnet) → aperçu HTML en iframe sandboxée |
| Hébergement | Hostinger mutualisé (Business) avec application Node.js — domaine `sphereweb-dev.com` |

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
├─ components/              Header, Footer, Logo, Icon, Section, CtaBand, ContactForm, ProjectMedia, LegalDoc
├─ scripts/gen-icons.mjs    Génération du jeu d'icônes + image OG (sharp)
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

# Config e-mail : copier et renseigner les identifiants SMTP
cp .env.example .env.local

npm run dev      # http://localhost:3000
```

## Build & déploiement

```bash
npm run build
npm run start    # sert le build en local (http://localhost:3000)
```

Le formulaire de contact nécessite un runtime Node (route `/api/contact` dynamique) :
un export 100 % statique n'est donc pas possible tel quel.

### Hostinger (mutualisé Business — application Node.js)

`next.config.mjs` active `output: 'standalone'` : `next build` produit un serveur autonome
dans `.next/standalone/`.

1. hPanel → **Site web → Avancé → Node.js** : créer l'application (version Node ≥ 20),
   dossier applicatif = racine du projet, fichier de démarrage = `server.js`
   (celui de `.next/standalone/`, à copier à la racine applicative lors du déploiement).
2. Déployer les fichiers (Git ou SFTP) : le dossier `.next/standalone/` **plus**
   `.next/static/` (à placer dans `.next/static/`) et `public/`.
3. Renseigner les variables d'environnement (`SMTP_*`, `MAIL_*`) dans l'interface Node.js de hPanel.
4. Redémarrer l'application depuis hPanel.

> Alternative de déploiement : builder en CI, puis `rsync` de `.next/standalone` + `.next/static` + `public`.

## Variables d'environnement

| Variable | Rôle |
|---|---|
| `SMTP_HOST` `SMTP_PORT` `SMTP_SECURE` | Serveur SMTP de la boîte (`smtp.hostinger.com`, 465, `true` si e-mail Hostinger) |
| `SMTP_USER` `SMTP_PASS` | Identifiants de la boîte mail |
| `MAIL_FROM` `MAIL_TO` | Expéditeur / destinataire des messages du formulaire |
| `ANTHROPIC_API_KEY` | Clé Console API Anthropic pour la démo `/demo` (voir ci-dessous) — vide = démo désactivée |

## Démo IA — génération de maquette (`/demo`)

Outil de lead-gen : le visiteur décrit son projet, l'API Claude renvoie une
**page d'accueil** HTML/CSS autonome, affichée dans une `<iframe sandbox>`.
Périmètre volontairement limité (une page, contenu fictif, pas de sous-pages) —
c'est une illustration de style.

**Fichiers**

| Chemin | Rôle |
|---|---|
| `lib/anthropic.ts` | Point de config centralisé : client Anthropic, modèle, garde `isGeneratorConfigured()` |
| `lib/generator/prompt.ts` | Prompt système strict + extraction/sécurisation du HTML (injection CSP) |
| `lib/generator/schema.ts` | Validation zod du corps de requête (brief ≤ 600 car., honeypot) |
| `lib/generator/quota.ts` | Quotas en mémoire (3/IP/jour + garde-fou global 150/jour) + journalisation JSON |
| `app/api/generate/route.ts` | Route Handler : quota → appel Claude en streaming → HTML |
| `components/SiteGenerator.tsx` | UI : exemples, champ éditable, chargement progressif, iframe, CTA |
| `components/generator/examples.ts` | 5 prompts d'exemple par secteur (frontend, pas de BDD) |

**Créer la clé API et plafonner les coûts**

1. Console Anthropic → <https://console.anthropic.com> → *Settings → API keys* → **Create key**.
   C'est une clé `sk-ant-…`, **distincte de l'abonnement claude.ai** (qui ne
   donne pas accès à l'API) et facturée séparément à l'usage.
2. Créditer le compte (*Billing*) : l'API fonctionne en prépayé.
3. **Plafond de dépense** : *Settings → Limits* → définir un *monthly spend limit*
   (ex. 10–20 $) et une alerte e-mail. C'est le garde-fou ultime en cas d'abus,
   en plus des quotas applicatifs de `lib/generator/quota.ts`.
4. Renseigner `ANTHROPIC_API_KEY` dans `.env.local` (dev) et dans
   hPanel → *Variables d'environnement* (prod). Vide → la démo répond
   « momentanément indisponible » sans planter.

**Coût indicatif** : modèle `claude-sonnet-5`, effort `low`, ~1 k tokens en
entrée + ~5–10 k en sortie (raisonnement léger + HTML) par génération
≈ **1 à 12 centimes** l'aperçu. Garde-fous : 3 essais/IP/jour + plafond global
150/jour dans `lib/generator/quota.ts`, + le plafond de dépense de la Console.

**Sécurité** : rendu uniquement en `<iframe sandbox="allow-scripts">` (jamais
injecté dans le DOM du site) ; CSP `default-src 'none'` injectée dans le
document généré → aucune requête réseau sortante possible depuis la maquette ;
validation du brief côté serveur ; aucune donnée personnelle transmise au LLM.

**Quotas** : en mémoire (process unique — OK pour Hostinger mono-instance).
Multi-instances → passer sur un store partagé (Redis / Upstash), même remarque
que pour `/api/contact`.

## Icônes de marque

Source : `assets/Logo-sphere.jpg` (PNG transparent 1024²), plus `assets/favicon.ico`.
`npm run icons` régénère `public/` : `favicon-16/32`, `apple-touch-icon`, `icon-192/512`, `og-image`.

## À compléter avant mise en production

- [x] ~~Logo + favicons~~ (fournis, `public/` généré via `npm run icons`)
- [x] ~~Mentions légales : SIRET, TVA~~ (adresse postale : sur demande, cf. page)
- [x] ~~Confidentialité : durée de conservation~~ (3 ans ; aucun analytics pour l'instant)
- [ ] Identifiants SMTP de la boîte `david-antoina@sphereweb-dev.com` (`.env.local` / hPanel Hostinger)
- [ ] `ANTHROPIC_API_KEY` + plafond de dépense pour la démo `/demo` (cf. § « Démo IA »)
- [ ] Liens profils Malt / Codeur.com (`lib/site.ts` → `site.profiles`)
- [ ] Captures d'écran des projets du portfolio (`public/portfolio/<slug>/`, cf. son README)
- [ ] URL publiques des projets en ligne (`lib/site.ts` → `project.url`)
- [ ] Page CGV si devis / paiements en ligne (Charte §4)
- [ ] Adresse postale complète dans les mentions légales si tu préfères l'afficher
- [ ] Éventuel outil d'audience sans cookie (Plausible / Matomo) — à décider
- [ ] Rate-limiting partagé (Redis/Upstash) si déploiement multi-instances (`app/api/contact/route.ts`)
