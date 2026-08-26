# Prompt à donner à Claude Design

> Copie tout ce qui suit la ligne, tel quel.

---

Tu es directeur artistique dans un studio réputé pour donner à chaque client une
identité qu'on ne peut confondre avec aucune autre. Ce client a déjà rejeté trois
propositions. **Lis la section « Ce qui a déjà été rejeté » avant de dessiner quoi
que ce soit** — reproduire l'une d'elles est le seul échec qu'on ne rattrape pas.

Je veux une planche de design pour un portfolio personnel. Pas du code : des
écrans, dessinés avec conviction.

## Le client

```
Houssam Nadir · Montréal, Québec
Baccalauréat en génie informatique, Polytechnique Montréal · diplomation déc. 2027
Moyenne cumulative 3,65 (hiver 2026)
Cours : cybersécurité (A) · systèmes répartis et infonuagique (B+) · systèmes
        d'exploitation · bases de données · C/C++ · Python
Depuis oct. 2024 : représentant de marque Qualcomm / Snapdragon PC,
        Channel Partners LLC — expliquer une technologie en face à face,
        plusieurs fois par jour, à des gens qui ne sont pas ingénieurs
Certification : Advent of Cyber, TryHackMe (déc. 2025)
Langues : français, anglais, arabe
Courriel : houssam.nadir@outlook.com
```

**Ce n'est pas un portfolio d'étudiant. C'est le portfolio d'un fondateur qui est
encore étudiant.** Deux SaaS payants en production, plus un outil de sécurité.
Cette distinction gouverne chaque décision.

## La thèse

Ses trois outils font le même geste : **regarder dans un système qu'on ne voit
pas, et rendre un verdict vérifiable.**

- Carriv regarde un CV contre une offre → rend un score ATS et les mots-clés manquants
- StudyLumina regarde une préparation à un examen → rend un score 0–100 par chapitre
- CSPM-Lite regarde un compte AWS → rend des failles classées par criticité

Les trois s'interdisent la même chose : inventer. Le portfolio doit tenir cette
promesse — un site qui gonflerait ses accomplissements contredirait les trois
produits sur lesquels il repose.

Tu peux garder cette thèse ou en proposer une meilleure, mais il en faut une, et
tout doit en découler.

## Les trois produits — contenu réel, à composer tel quel

**CARRIV** · en production, payant · carriv.com
> Un CV taillé pour chaque offre, sans rien inventer.

Un CV générique se fait filtrer par les ATS avant qu'un humain le lise. Carriv
reformule les vraies expériences pour l'offre collée, rédige la lettre, et rend
un score ATS avec les mots-clés couverts et manquants — en une trentaine de
secondes. Le moteur ne peut rien ajouter que le profil ne contienne déjà :
compétence absente, il la demande au lieu de la supposer.
Chiffres réels : ~30 s · pack 10 = 6 $ USD · pack 25 = 11 $ USD · 3 essais sans
carte · FR et EN. Pile : SvelteKit, JavaScript, MongoDB, Stripe, extension Chrome.

**STUDYLUMINA** · en production, freemium payant, v2.1 · studylumina.com
> Sache que tu es prêt. Avant le jour de l'examen.

L'étudiant dépose ses PDF de cours. Le système détecte les chapitres, génère
quiz et flashcards, et calcule un Exam Readiness Score **en code, à partir des
tentatives réelles — jamais généré par un modèle de langage**, donc explicable
chapitre par chapitre. Le tuteur ne répond que depuis les documents déposés,
avec citation.
Chiffres réels : score 0–100 · 14 $/mois · gratuit 3 cours et 10 questions/jour ·
50+ cours · FR et EN. Pile : Next.js, TypeScript, React, PostgreSQL, Prisma, Docker.

**CSPM-LITE** · outil en ligne de commande
> Un scan de posture cloud qui bloque la mise en production quand il trouve une
> faille critique.

Analyse un compte AWS et détecte les mauvaises configurations : buckets S3
publics, ports SSH ouverts au monde, utilisateurs sans MFA. L'évaluation est
alignée sur le CIS Benchmark, donc chaque constat a une criticité comparable au
lieu d'une opinion. Rapports JSON et HTML, et un contrôle CI/CD qui **bloque**
l'intégration dès qu'une faille critique apparaît.
Pile : Python, AWS, CIS Benchmark, CI/CD.

## Ce que la planche doit contenir

Format 1440 px de large pour le bureau, plus deux écrans en 390 px.

1. **Ouverture** — nom, positionnement, et le moment mémorable du site
2. **Positionnement** — trois ou quatre phrases à la première personne
3. **Un produit en pleine largeur** (prends Carriv) — état, nom, ce qu'il regarde,
   ce qu'il rend, les chiffres réels, et un aperçu de la sortie de l'outil
4. **Les trois produits ensemble** — la vue qui montre l'ampleur d'un coup d'œil
5. **Étude de cas** — haut de page + le bloc « décisions techniques » : une
   question, ce qui a été retenu, ce qui a été écarté, pourquoi
6. **Parcours** — une chronologie qui contient formation, emploi et mises en production
7. **Contact**
8. **Mobile 390 px** — l'ouverture et un produit

## Le niveau d'exigence

- Le moment d'ouverture doit être **mémorable et impossible à copier**, parce
  qu'il est ancré dans son contenu réel — pas dans un effet qu'on pourrait poser
  sur n'importe quel portfolio.
- La typographie porte la personnalité. Choisis un vrai couple de polices,
  disponibles sur Google Fonts ou Fontshare, et donne-leur une échelle avec de
  vrais contrastes de taille. Nomme-les.
- Prends **un** risque esthétique réel et dis lequel. Le reste reste discipliné.
- Pas de barres de compétences, pas de pourcentages auto-attribués, pas de nuage
  de logos : venant de quelqu'un dont les trois outils rendent des scores
  calculés, une note qu'on s'attribue soi-même est une contradiction ouverte.

## Ce qui a déjà été rejeté

**A — « Instrument de mesure », clair.** Fond gris-os `#E8E6DF`, encre noire,
filet ambre de 2 px sous chaque chiffre pour signifier « valeur mesurée »,
graduations de règle en bordure de section. Verdict du client : trop froid, il ne
s'y reconnaît pas.

**B — « HUD futuriste », sombre.** Étiquettes monospace en capitales partout,
équerres aux angles, trames de grille, sections numérotées `00`–`05`, relevé de
scan en direct dans la barre de navigation, titres en capitales dans un
grotesque technique très large. Verdict : **chargé**. Trop de signaux, du décor
posé sur du décor.

**C — Éditorial sombre.** Serif contemporaine en graisse fine, beaucoup d'air,
un fond WebGL de lignes de niveau qui ondulent, accent vert `#00E5A0`. Verdict :
propre mais **pas assez créatif**, et le texte devenait par endroits difficile à
lire par-dessus le fond animé.

Le client aime **l'idée d'un fond animé**. C'est le seul élément des trois
tentatives qu'il a explicitement voulu garder.

Évite aussi les défauts habituels : fond crème + serif + terracotta ; dégradé
violet→rose ; glassmorphism ; formes floues animées ; emoji en guise d'icônes ;
tout centré ; coins arrondis partout ; cartes à liseré coloré.

## Contraintes non négociables

- **Lisibilité.** Tout texte doit atteindre 4,5:1 de contraste sur ce qu'il y a
  derrière lui — y compris quand un fond animé ou une image passe dessous.
  Si ta direction met du texte sur une image, dessine explicitement le traitement
  qui garantit ce contraste, et donne les valeurs.
- **Bilingue FR/EN.** Le français est en moyenne 20 % plus long : les titres
  doivent tenir dans les deux langues.
- **Aucun chiffre inventé.** Seuls les chiffres listés ci-dessus existent. Pas de
  « 10 000 utilisateurs », pas de témoignage, pas de logo de client.
- Le vert `#00E5A0` est le seul accent hérité des tentatives précédentes. Tu peux
  le remplacer, mais dis pourquoi.

## Méthode

1. Écris **deux directions possibles, une phrase chacune**, et le risque que
   chacune prend.
2. Choisis la plus forte, dis pourquoi en deux phrases.
3. Donne les jetons : 4 à 6 couleurs avec leurs hex et le rôle de chacune,
   les polices avec leurs graisses, l'échelle typographique, la grille.
4. Dessine **tous** les écrans dans cette direction. Une seule chose, exécutée
   avec conviction — pas dix variantes.

## Critère final

Réponds par écrit avant de livrer : **si on retire le nom de Houssam de ces
écrans, restent-ils reconnaissables ?** Si non, l'élément d'ouverture n'est pas
assez ancré dans son contenu réel — reprends-le.
