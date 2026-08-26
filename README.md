# Portfolio — Houssam Nadir

Site personnel bilingue (FR/EN). Next.js 16 · TypeScript strict · Tailwind v4 ·
React Three Fiber. Direction artistique et parti pris : voir [DESIGN.md](DESIGN.md).

## Lancer en local

```bash
npm install
npm run dev          # http://localhost:3000/fr
```

```bash
npm run build        # build de production
npx tsc --noEmit     # typage
npx eslint .         # lint
```

## Structure

```
app/
  [locale]/            pages : accueil, /projets/[slug], /cv, 404
  fonts.ts             Sentient + Switzer auto-hébergées, JetBrains Mono
  globals.css          TOUS les tokens (@theme). Aucun hex ailleurs.
components/
  sections/            Hero, Manifesto, Products, Path, Constellation, Contact
  three/               ReliefField (la carte de fond), FieldLayer (montage + repli)
  ui/                  primitives, consoles produit, relevé de scan
content/               le contenu, en TypeScript typé — voir ci-dessous
i18n/                  routing, navigation et chargement des messages
lib/
  scan.ts              l'état du défilement, hors de React
  tokens.ts            lecture des variables CSS pour le WebGL
messages/              fr.json · en.json — libellés d'interface uniquement
```

## Ajouter un projet en trois étapes

1. **Le contenu** — ajoute un objet au tableau `projects` dans
   [`content/projects.ts`](content/projects.ts). Le type `Project` impose tout ce
   qui est obligatoire : `scans` (ce que l'outil regarde), `returns` (ce qu'il
   rend), `problem`, `built`, `stack`, `measures`, `decisions`. Chaque chaîne
   existe en FR **et** en EN — le typage refuse une langue manquante.

2. **La console** — ajoute un cas dans
   [`components/ui/ProductPreview.tsx`](components/ui/ProductPreview.tsx) pour
   afficher la sortie réelle de l'outil, et référence-le par le champ `preview`.
   Ou dépose une vraie capture dans `public/shots/` et mets son chemin dans
   `shot` : elle remplace alors la reconstitution.

3. **La carte** — ajoute le nœud et ses arêtes dans
   [`content/graph.ts`](content/graph.ts) (`pos` sert à le poser sur le relief).
   Le fond, la liste texte accessible et le JSON-LD se mettent à jour tout seuls.

Rien d'autre à toucher : aucune donnée de contenu n'est écrite en dur dans un
composant.

## Ce qui reste à remplir

Voir [`content/TODO.md`](content/TODO.md). Tant qu'une réponse manque, la section
correspondante n'est pas rendue plutôt que d'être remplie de vraisemblable.

## Déploiement

Vercel, sans configuration. `metadataBase`, `sitemap.ts` et `robots.ts` pointent
vers `houssamnadir.com` — à changer dans `app/[locale]/layout.tsx`, `app/sitemap.ts`
et `app/robots.ts` si le domaine diffère.
