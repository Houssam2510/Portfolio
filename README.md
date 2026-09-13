<div align="center">

<img src="src/app/icon.svg" alt="Houssam Nadir" width="72" />

# Portfolio — Houssam Nadir

### Une page, deux langues, zéro framework CSS

**Le code de [houssam-nadir.me](https://houssam-nadir.me) : une page statique bilingue, dont tout le contenu vit dans deux fichiers et toute la couleur dans des tokens `oklch()`.**

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-16.3-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![CSS](https://img.shields.io/badge/CSS-aucun%20framework-264de4?logo=css3&logoColor=white)](src/app/globals.css)
[![oklch](https://img.shields.io/badge/couleur-oklch%28%29-FFB225)](src/app/globals.css)
[![WCAG](https://img.shields.io/badge/contraste-WCAG%20AA-3fb950)](src/app/globals.css)
[![i18n](https://img.shields.io/badge/i18n-FR%20%2F%20EN-44528a)](src/i18n/config.ts)

**[houssam-nadir.me](https://houssam-nadir.me)** · [🇫🇷 Français](#-français) · [🇬🇧 English](#-english)

</div>

---

<details open>
<summary><h2 id="-français">&nbsp;🇫🇷&nbsp;&nbsp;Français</h2></summary>

<br/>

## Le parti pris

Un portfolio est un produit dont le contenu change bien plus souvent que le code. Celui-ci est donc construit autour d'une seule contrainte : **modifier le portfolio ne doit jamais vouloir dire toucher à un composant.**

| Décision | Ce que ça donne |
| --- | --- |
| 📝 **Le contenu est une donnée** | Études de cas, thèse, chiffres, compétences, parcours, contact : tout est dans [`src/data/`](src/data/), typé. Mettre le portfolio à jour = éditer `content.fr.ts` / `content.en.ts` (et `cases.*.ts`). Aucun texte en dur dans un composant. |
| 🎨 **Aucun framework CSS** | Les tokens de design sont des propriétés CSS personnalisées dans [`src/app/globals.css`](src/app/globals.css), en `oklch()`, déclinées en thème clair **et** sombre. Le reste est en styles au niveau du composant. Rien à purger, rien à configurer. |
| 🌗 **Palette Ambre CRT** | Ambre sur charbon chaud. Tous les couples texte/fond sont vérifiés au ratio de contraste **WCAG AA au minimum** — pas à l'œil. |
| 🎞 **Un seul `requestAnimationFrame`** | Deux canvas — rubans lumineux derrière le nom, champ topographique pour le reste de la page — pilotés par **une seule** boucle d'animation ([`src/lib/backgroundEngine.ts`](src/lib/backgroundEngine.ts)). Deux boucles concurrentes, c'est deux fois le coût et un micro-décalage visible. |
| 🌍 **Deux langues, deux URLs** | La racine ne sert aucune page : chaque langue vit sous son préfixe (`/fr`, `/en`) pour avoir une URL partageable et un `hreflang` propre. Le middleware négocie l'`Accept-Language` du visiteur, français par défaut. `sitemap.ts` déclare chaque page comme la traduction de l'autre. |
| ⚡ **Statique** | Rendu statique, aucune base, aucune API. `opengraph-image.tsx`, `robots.ts` et `sitemap.ts` sont générés à la construction. |

## Les sections, dans l'ordre

`Hero` → `Thesis` → `CaseStudies` → `Numbers` → `Skills` → `Timeline` → `Contact`

Par-dessus : un en-tête qui se rétracte au scroll, une barre de progression de lecture, une **palette de commandes** (⌘K) pour sauter d'une section à l'autre, un bouton de thème, et une révélation au scroll.

## 🛠 Stack

| Couche | Technologie |
| --- | --- |
| **Framework** | Next.js 16 (App Router) · React 19 · TypeScript strict |
| **Styles** | CSS pur — tokens `oklch()`, thèmes clair/sombre, **pas** de Tailwind ni de CSS-in-JS |
| **Polices** | `next/font/google` — Space Grotesk (titres), IBM Plex Sans (texte), JetBrains Mono (données et étiquettes) |
| **Animation** | Canvas 2D, une boucle `requestAnimationFrame` partagée |
| **i18n** | Middleware maison (`/fr`, `/en`), négociation `Accept-Language`, `hreflang` dans le sitemap |
| **SEO** | `opengraph-image.tsx` généré, `robots.ts`, `sitemap.ts`, URL canonique |
| **Sécurité** | CSP déclarée dans `next.config.ts` |

## 🚀 Démarrer

```bash
git clone https://github.com/Houssam2510/Portfolio.git
cd Portfolio
npm install

npm run dev        # http://localhost:3000 → redirige vers /fr ou /en
npm run build      # build de production
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## 📁 Structure

```
src/
├── app/
│   ├── [locale]/          layout, page, HomeClient, opengraph-image.tsx
│   ├── globals.css        TOUS les tokens de design (oklch, clair + sombre)
│   ├── icon.svg
│   ├── robots.ts          sitemap.ts
├── components/
│   ├── …                  chrome : en-tête, palette de commandes, barre de progression
│   └── sections/          Hero, Thesis, CaseStudies, Numbers, Skills, Timeline, Contact
├── data/
│   ├── content.fr.ts      ← LE fichier à éditer (et son jumeau .en.ts)
│   ├── cases.fr.ts        ← les études de cas (et cases.en.ts)
│   └── types.ts
├── hooks/                 thème, révélation au scroll, effet machine à écrire, index
├── i18n/                  config des locales + ContentProvider
├── lib/                   moteur de fond, URL du site, capture d'écran
└── middleware.ts          négociation de langue, redirection de la racine
```

## Configuration

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL publique du site : URL canonique, métadonnées OpenGraph, `robots.txt`, `sitemap.xml`. À définir dans l'environnement de déploiement — sans elle, ces URLs pointent vers `http://localhost:3000`. |

## Points connus

Deux compromis assumés, documentés plutôt que tus :

- **Les aperçus des études de cas sont capturés par un service tiers** (`image.thum.io`) sur carriv.com, app.studylumina.com et sanade.app. `SiteScreenshot` affiche un état de chargement puis un repli vers le site réel si la capture échoue, mais la dépendance reste externe. Pour s'en affranchir : remplacer `screenshotUrl()` dans [`src/lib/screenshot.ts`](src/lib/screenshot.ts) par des images statiques servies depuis `public/`.
- **La CSP autorise `'unsafe-inline'`** pour les scripts et les styles, parce que le thème est appliqué par un script inline avant le premier paint et que la mise en forme repose sur des attributs `style`. Sortir les styles inline vers des CSS Modules permettrait de resserrer cette directive.

</details>

<details>
<summary><h2 id="-english">&nbsp;🇬🇧&nbsp;&nbsp;English</h2></summary>

<br/>

## The premise

A portfolio is a product whose content changes far more often than its code. So this one is built around a single constraint: **updating the portfolio must never mean touching a component.**

| Decision | What it buys |
| --- | --- |
| 📝 **Content is data** | Case studies, thesis, numbers, skills, timeline, contact: all of it lives in [`src/data/`](src/data/), typed. Updating the portfolio = editing `content.fr.ts` / `content.en.ts` (and `cases.*.ts`). No copy is hard-coded in a component. |
| 🎨 **No CSS framework** | Design tokens are custom CSS properties in [`src/app/globals.css`](src/app/globals.css), in `oklch()`, defined for light **and** dark. The rest is component-level styling. Nothing to purge, nothing to configure. |
| 🌗 **Amber CRT palette** | Amber on warm charcoal. Every text/background pair is verified against **WCAG AA or better** contrast ratios — not eyeballed. |
| 🎞 **One `requestAnimationFrame`** | Two canvases — light ribbons behind the name, a topographic field for the rest of the page — driven by **one** animation loop ([`src/lib/backgroundEngine.ts`](src/lib/backgroundEngine.ts)). Two competing loops means twice the cost and a visible micro-drift. |
| 🌍 **Two languages, two URLs** | The root serves no page: each language lives under its own prefix (`/fr`, `/en`) so the URL is shareable and `hreflang` is clean. The middleware negotiates the visitor's `Accept-Language`, defaulting to French. `sitemap.ts` declares each page as the other's translation. |
| ⚡ **Static** | Statically rendered, no database, no API. `opengraph-image.tsx`, `robots.ts` and `sitemap.ts` are generated at build time. |

## The sections, in order

`Hero` → `Thesis` → `CaseStudies` → `Numbers` → `Skills` → `Timeline` → `Contact`

On top of them: a header that retracts on scroll, a reading-progress bar, a **command palette** (⌘K) to jump between sections, a theme toggle, and scroll-triggered reveals.

## 🛠 Tech stack

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js 16 (App Router) · React 19 · strict TypeScript |
| **Styling** | Plain CSS — `oklch()` tokens, light/dark themes, **no** Tailwind, no CSS-in-JS |
| **Fonts** | `next/font/google` — Space Grotesk (headings), IBM Plex Sans (body), JetBrains Mono (data and labels) |
| **Animation** | Canvas 2D, a single shared `requestAnimationFrame` loop |
| **i18n** | Hand-rolled middleware (`/fr`, `/en`), `Accept-Language` negotiation, `hreflang` in the sitemap |
| **SEO** | Generated `opengraph-image.tsx`, `robots.ts`, `sitemap.ts`, canonical URL |
| **Security** | CSP declared in `next.config.ts` |

## 🚀 Getting started

```bash
git clone https://github.com/Houssam2510/Portfolio.git
cd Portfolio
npm install

npm run dev        # http://localhost:3000 → redirects to /fr or /en
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## 📁 Project structure

```
src/
├── app/
│   ├── [locale]/          layout, page, HomeClient, opengraph-image.tsx
│   ├── globals.css        EVERY design token (oklch, light + dark)
│   ├── icon.svg
│   ├── robots.ts          sitemap.ts
├── components/
│   ├── …                  chrome: header, command palette, progress bar
│   └── sections/          Hero, Thesis, CaseStudies, Numbers, Skills, Timeline, Contact
├── data/
│   ├── content.fr.ts      ← THE file to edit (and its .en.ts twin)
│   ├── cases.fr.ts        ← the case studies (and cases.en.ts)
│   └── types.ts
├── hooks/                 theme, scroll reveal, typewriter, section index
├── i18n/                  locale config + ContentProvider
├── lib/                   background engine, site URL, screenshots
└── middleware.ts          language negotiation, root redirect
```

## Configuration

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | The site's public URL: canonical link, OpenGraph metadata, `robots.txt`, `sitemap.xml`. Set it in the deployment environment — without it, those URLs point at `http://localhost:3000`. |

## Known trade-offs

Two deliberate compromises, documented rather than hidden:

- **Case-study previews are captured by a third-party service** (`image.thum.io`) for carriv.com, app.studylumina.com and sanade.app. `SiteScreenshot` shows a loading state and falls back to the real site if the capture fails, but the dependency stays external. To remove it: replace `screenshotUrl()` in [`src/lib/screenshot.ts`](src/lib/screenshot.ts) with static images served from `public/`.
- **The CSP allows `'unsafe-inline'`** for scripts and styles, because the theme is applied by an inline script before first paint and the layout relies on `style` attributes. Moving inline styles to CSS Modules would let that directive be tightened.

</details>

---

<div align="center">

<sub>© Houssam Nadir — génie informatique, Polytechnique Montréal.</sub>

</div>
