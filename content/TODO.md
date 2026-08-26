# Ce qui manque avant la mise en ligne

Rien de ce qui suit n'est deviné. Tant qu'une réponse manque, la section
correspondante n'est pas rendue plutôt que d'être remplie de vraisemblable.

| # | Manque | Fichier | Bloque |
|---|---|---|---|
| 1 | **Ce que je referais autrement**, pour les trois projets | `content/projects.ts` → `retro` | **obligatoire** avant mise en ligne publique — un portfolio bâti sur trois outils qui refusent d'embellir ne peut pas s'en passer. StudyLumina est en v2 : que faisait mal la v1 ? |
| 2 | URL exacte du **LinkedIn** et du **GitHub** | `content/profile.ts` → `links` | section Contact, `sameAs` du JSON-LD |
| 3 | **Dates de mise en production** des trois projets | `content/timeline.ts` → `when` | trois entrées du Parcours affichent leur type mais pas leur date |
| 4 | Comment le **score ATS de Carriv** est calculé | `content/projects.ts` → `decisions` | c'est le pendant de l'ERS ; les deux expliqués côte à côte seraient le meilleur contenu du site |
| 5 | Ce que **« sécuritaire et confidentiel » veut dire chez Carriv** : chiffrement au repos, isolation par utilisateur, rétention, gestion des secrets | `content/projects.ts` | CSPM-Lite prouve déjà l'axe cybersécurité ; ces détails le prouveraient deux fois |
| 6 | **Captures réelles** des trois interfaces | `public/shots/` + `projects.ts` → `shot` | remplace les reconstitutions étiquetées |
| 7 | Le **domaine** définitif | `app/[locale]/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` | métadonnées, sitemap |

## Décisions prises en ton nom, à confirmer

- **Le numéro de téléphone du CV n'est pas sur le site.** Une adresse courriel sur
  une page indexée se filtre ; un numéro de téléphone, non. Il reste sur le CV que
  tu envoies. Dis-le si tu veux l'ajouter.
- Les **décisions techniques** listées dans `projects.ts` sont dérivées des
  positions publiques des produits et de ton CV, pas d'un entretien avec toi. À
  relire et enrichir : ce sont elles qu'un recruteur technique lira en premier.
