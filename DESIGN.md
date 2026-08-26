# SCANNER — système de design

Portfolio de Houssam Nadir. Une seule idée gouverne tout : **ses trois outils
regardent dans un système qu'on ne voit pas et rendent un verdict vérifiable.**
Carriv scanne un CV contre une offre. StudyLumina scanne une préparation à un
examen. CSPM-Lite scanne un compte AWS. Le site est l'appareil.

## Couleur — quatre rôles, aucun chevauchement

| Token | Hex | Rôle — et uniquement celui-là |
|---|---|---|
| `--color-void` | `#05070A` | le noir de l'appareil éteint |
| `--color-carbon` / `--color-panel` | `#0A0F14` / `#0E151B` | surfaces, consoles |
| `--color-grid` / `--color-edge` | `#17232C` / `#223140` | trames, filets, cadres |
| `--color-ice` | `#E6F0F2` | le texte |
| `--color-dim` / `--color-mute` | `#8397A0` / `#55666F` | texte secondaire, tertiaire |
| `--color-flux` | `#00E5A0` | **ce que le scan trouve** — liens, verdicts, faisceau |
| `--color-alert` | `#FF7A1A` | **ce qui est critique** — rare, jamais décoratif |

Le vert vient du choix fait au banc d'essai (`#00706A`, vert instrument, sur fond
clair). Sur fond noir il devient phosphore : même famille, même rôle.

**La règle du verdict.** Tout chiffre rendu par un scan passe par le composant
`Verdict` : phosphore, souligné d'un filet, chiffres tabulaires. Un chiffre en
phosphore veut dire « relevé », jamais « argument ». Aucun autre texte n'a le
droit d'être en phosphore sauf un lien, qui est une action.

## Typographie — trois rôles

- **Nippo** 400/500/700, auto-hébergée (Fontshare). Grotesque technique large.
  Titres, verdicts. `word-spacing: 0.06em` — sans ça elle colle les mots.
- **Supreme** 400/500, auto-hébergée. Corps de texte, lisible sur fond noir.
- **JetBrains Mono** 400/500 (`next/font/google`). Étiquettes, relevés,
  métadonnées : tout ce que la machine écrit.

## Mise en page

Colonne unique de 86rem. Filets à `edge/40`. Équerres aux angles des consoles
(`.bracket`), **aucun coin arrondi nulle part** — un appareil n'a pas de coins
arrondis. Les sections sont numérotées `00`–`05` parce que ce sont les étapes
d'un scan : l'ordre porte de l'information. C'est le seul endroit du site où un
numéro apparaît.

## L'élément signature — le champ

Une seule scène WebGL, fixée derrière toute la page, pilotée par le défilement.
24 000 points (7 000 sous 900 px) qui passent par cinq états, définis dans
`lib/field.ts` :

```
00 SURFACE        une coque sous le faisceau — l'objet qu'on va scanner
01 NAPPE          la coque s'ouvre à plat : la surface d'analyse
02 GRAPPES        trois amas — Carriv, StudyLumina, CSPM-Lite
03 BRIN           les amas s'étirent en chronologie verticale
04 CONSTELLATION  les points se posent sur le VRAI graphe de dépendances
```

Un faisceau balaie la scène en continu ; ce qu'il traverse s'allume en phosphore.
Un point sur cent est ambre — les constats critiques d'un rapport.

Contraintes tenues :
- positions **précalculées** avec un xorshift32 graine fixe : deux chargements
  donnent exactement la même image, aucune simulation physique au runtime ;
- **un seul draw call** pour les points (`THREE.Points` + `ShaderMaterial`) ;
- les tampons ne sont recopiés qu'au **franchissement d'un état**, jamais par frame ;
- l'état du scan vit **hors de React** (`lib/scan.ts`) : le défilement ne
  déclenche aucun rendu React ;
- `frameloop="never"` quand l'onglet est masqué ;
- Three.js est **différé** — jamais dans le bundle initial ;
- `prefers-reduced-motion` → aucun canvas, champ statique en CSS.

Le champ **recule** (opacité −52 %) à partir de l'état 02 : le spectacle
appartient à l'ouverture, ensuite c'est le contenu qui doit se lire. Un masque
en dégradé protège la colonne de texte.

## Auto-critique

Trois choses que j'aurais produites pour n'importe quel portfolio, et que j'ai
remplacées :

1. **Un nuage de particules décoratif.** Remplacé par un champ qui encode le
   contenu réel : le dernier état est le graphe de dépendances de son travail,
   avec ses vraies arêtes, et il existe en version texte navigable au clavier.
2. **Une grille de « compétences » avec des pourcentages.** Supprimée. Venant de
   quelqu'un dont les trois outils rendent des scores calculés, une note
   auto-attribuée serait une contradiction ouverte. La taille du texte porte la
   maîtrise, rien d'autre.
3. **Des captures d'écran génériques dans des mockups.** Remplacées par des
   consoles qui montrent la *sortie réelle* de chaque outil — score ATS avec
   mots-clés manquants, ERS ventilé, constats CIS — explicitement étiquetées
   « reconstitution » tant qu'aucune capture réelle n'est déposée.

## Écarts assumés par rapport au brief initial

- **GSAP + ScrollTrigger et Motion ne sont pas installés.** Le pilotage du scan
  tient en une trentaine de lignes (`components/Scroller.tsx`) et les révélations
  passent par un `IntersectionObserver`. Économie : ~90 Ko gzip pour un résultat
  identique. Le budget JS du §7 était non négociable.
- **`antialias: true`** plutôt que `antialias: false` + SMAA : sans passe de
  post-processing, le MSAA du contexte coûte moins cher qu'un pipeline complet
  pour une scène de points et de lignes.
- **Next.js 16** (le brief disait 15) : c'est la version courante.

## Ce que le site ne fait pas

Il n'invente rien. Toute section dont le contenu n'existe pas encore n'est pas
rendue, ou affiche explicitement qu'elle est à écrire. Voir `content/TODO.md`.
