# Système de design

Portfolio de Houssam Nadir. Une seule idée gouverne le contenu : **ses trois
outils regardent dans un système qu'on ne voit pas et rendent un verdict
vérifiable.** Carriv scanne un CV contre une offre, StudyLumina scanne une
préparation à un examen, CSPM-Lite scanne un compte AWS.

Le parti pris visuel est l'inverse du sujet : le site ne joue pas à
l'instrument futuriste. **Une carte de relief qui respire en fond, et
par-dessus, du texte, de l'air, et presque rien d'autre.**

## Couleur

| Token | Hex | Rôle |
|---|---|---|
| `--color-ground` | `#0B0C0E` | le fond, peint sur `<html>` |
| `--color-raise` | `#131417` | consoles |
| `--color-line` / `--color-line-soft` | `#23252B` / `#191B20` | filets |
| `--color-paper` | `#EDECE9` | le texte — blanc chaud, pas un blanc bleuté |
| `--color-muted` / `--color-faint` | `#9D9D98` / `#6B6B68` | secondaire, tertiaire |
| `--color-accent` | `#00E5A0` | trois fois par écran, pas trente |
| `--color-warn` | `#FF8A3D` | une criticité dans un rapport, jamais du décor |

L'accent sert exactement à quatre choses : le point d'état d'un produit en
production, un lien au survol, l'anneau de focus clavier, et les crêtes du
relief. Nulle part ailleurs.

## Typographie

- **Sentient** 300/400, auto-hébergée (Fontshare). Serif contemporaine : titres,
  chiffres, tout ce qui compte. Toujours en `font-weight: 300`, jamais en capitales.
- **Switzer** 400/500, auto-hébergée. Corps de texte et la seule étiquette du
  site (`.label` — 0,75 rem, 0,09 em, capitales).
- **JetBrains Mono** 400. **Uniquement à l'intérieur des consoles produit**,
  là où c'est une machine qui écrit. Nulle part ailleurs.

Pas de numérotation de sections, pas d'équerres, pas de trames, pas de cadres.
Ces devices avaient été essayés puis retirés : ils ajoutaient du bruit sans rien
dire de vrai.

## Le fond — la carte de relief

`components/three/ReliefField.tsx`. Une nappe de 58 lignes de niveau, 190
segments chacune, dont la hauteur est calculée dans le vertex shader à partir
d'une somme de sinusoïdes non harmoniques. Une bande de lecture glisse dessus en
continu et éclaire ce qu'elle traverse ; les crêtes prennent l'accent.

Au dernier écran, **les nœuds du vrai graphe de dépendances se posent sur la
carte** — Carriv, StudyLumina, CSPM-Lite, leurs piles et les principes partagés
— reliés par leurs vraies arêtes. Le fond finit par dire quelque chose de vrai
au lieu de décorer.

Contraintes tenues :
- **un seul draw call** pour toute la nappe (une `LineSegments` unique) ;
- rien n'est recalculé côté CPU : seule l'horloge avance ;
- l'état du défilement vit **hors de React** (`lib/scan.ts`) — le scroll ne
  déclenche aucun rendu React ;
- `frameloop="never"` quand l'onglet est masqué ;
- Three.js est **différé** — jamais dans le bundle initial ;
- `prefers-reduced-motion` → aucun canvas, dégradé statique.

Un masque en dégradé fait reculer le fond là où le texte vit. Le relief
s'aplanit à mesure qu'on descend : la page se calme en même temps qu'elle se lit.

## Ce qui a été essayé puis jeté

1. **Une direction claire, « instrument de mesure »** (fond gris-os, filet ambre
   sous chaque chiffre). Cohérente, mais froide, et le client ne s'y reconnaissait pas.
2. **Une direction sombre « HUD »** : étiquettes monospace partout, équerres,
   trames, relevé de scan en direct, titres capitales en grotesque technique.
   Trop de signaux : du décor ajouté à du décor. Retirée en bloc.
3. **Un champ de 24 000 points** morphant en cinq états. Malgré l'éclairage
   directionnel, un nuage de points minuscules ne lit jamais autre chose que de
   la brume. Remplacé par les lignes de niveau, qui lisent immédiatement.

## Écarts assumés par rapport au brief initial

- **GSAP + ScrollTrigger et Motion ne sont pas installés.** Le pilotage tient en
  une trentaine de lignes (`components/Scroller.tsx`) et les révélations passent
  par un `IntersectionObserver`. Économie : ~90 Ko gzip.
- **Next.js 16** (le brief disait 15) : c'est la version courante.

## Ce que le site ne fait pas

Il n'invente rien. Toute section dont le contenu n'existe pas encore n'est pas
rendue, ou dit explicitement qu'elle reste à écrire. Voir `content/TODO.md`.
