# Captures d'écran des projets

Déposer ici les visuels de chaque projet, un sous-dossier par `slug` :

```
public/portfolio/
├─ trouve-ton-artisan/
│  ├─ 01.png   ← image principale (grande, ratio 16/9 idéalement)
│  ├─ 02.png
│  └─ 03.png
├─ tpak/
├─ gdf/
└─ nexus/
```

Formats conseillés : PNG ou WebP, largeur 1600 px, < 400 Ko chacune.

Ensuite, décommenter / compléter le tableau `images` du projet concerné dans
[`lib/site.ts`](../../lib/site.ts) :

```ts
images: [
  { src: '/portfolio/gdf/01.png', alt: 'Tableau de bord financier de GDF' },
  { src: '/portfolio/gdf/02.png', alt: 'Écran de création de facture' },
],
```

Tant que `images` est vide, un visuel de remplacement aux couleurs de la marque
s'affiche automatiquement (liste + page détail).
