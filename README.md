# Portfolio — Houssam Nadir

Portfolio personnel : page unique en français, Next.js (App Router) et
TypeScript. Génie informatique, Polytechnique Montréal.

## Stack

- **Next.js 16 / React 19**, rendu statique — une seule route (`/`).
- **Aucun framework CSS.** Les tokens de design sont des propriétés CSS
  personnalisées dans `src/app/globals.css` (thèmes clair et sombre en
  `oklch()`), le reste est en styles inline au niveau des composants.
- **Polices** via `next/font/google` : Space Grotesk (titres), IBM Plex Sans
  (texte), JetBrains Mono (données et étiquettes).
- **Fond animé** : deux canvas pilotés par une seule boucle `requestAnimationFrame`
  (`src/lib/backgroundEngine.ts`) — rubans lumineux derrière le nom, champ
  topographique pour le reste de la page.

## Structure

```
src/
  app/          layout, page, styles globaux, robots.ts, sitemap.ts
  components/   chrome (en-tête, palette, barre de progression) + sections/
  data/         content.ts — tout le contenu rédactionnel, en un seul endroit
  hooks/        thème, révélation au scroll, effet machine à écrire
  lib/          moteur de fond, URL du site, capture d'écran
```

Tout le contenu (études de cas, principes, compétences, parcours, contact) vit
dans `src/data/content.ts` : c'est le seul fichier à modifier pour mettre le
portfolio à jour.

## Développement

```bash
npm install
npm run dev        # serveur local
npm run build      # build de production
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Configuration

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL publique du site, utilisée pour l'URL canonique, les métadonnées OpenGraph, `robots.txt` et `sitemap.xml`. À définir dans l'environnement de déploiement — sans elle, ces URLs pointent vers `http://localhost:3000`. |

## Points connus

- Les aperçus des études de cas sont capturés à la volée par un service tiers
  (`image.thum.io`) sur carriv.com, app.studylumina.com et sanade.app. Si le
  service est lent ou indisponible, la zone d'aperçu reste vide. Pour s'en
  affranchir, remplacer `screenshotUrl()` dans `src/lib/screenshot.ts` par des
  images statiques servies depuis `public/`.
- Aucune image `og:image` n'est encore fournie : les cartes de partage
  s'afficheront sans visuel tant qu'un fichier ne sera pas ajouté et référencé
  dans `openGraph.images` (`src/app/layout.tsx`).
