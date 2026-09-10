# Houssam Nadir — Portfolio

Next.js (App Router, TypeScript) implementation of the `Portfolio v4.dc.html`
design from the Claude Design handoff bundle in the repo root (`../README.md`,
`../chats/chat1.md`, `../project/`).

## Stack

- Next.js 16 / React 19, no CSS framework — design tokens are plain CSS
  custom properties in `src/app/globals.css` (light/dark, ported 1:1 from the
  prototype's `oklch()` palette).
- Fonts via `next/font/google`: Space Grotesk (display), IBM Plex Sans (body),
  JetBrains Mono (data/labels).
- Product screenshots in the case studies use live third-party capture
  (`image.thum.io`) of carriv.com / app.studylumina.com / sanade.app — no
  static images or drag-drop upload, per the build decision made with the
  requester.

## Structure

- `src/data/content.ts` — all copy (case studies, thesis principles, skills,
  timeline, contact) extracted verbatim from the design file.
- `src/components/sections/*` — the seven page sections.
- `src/lib/backgroundEngine.ts` — the dual canvas background (hero light
  ribbons + topographic scroll field), ported from the prototype's inline
  script as a framework-agnostic module driven by a single `window`-level
  animation loop.
- `src/hooks/*` — reveal-on-scroll, scroll chrome (progress bar / active nav /
  spotlight), typing effect, theme.

## Commands

```
npm run dev     # local dev server
npm run build   # production build
npm run lint    # eslint
```

## Known gaps

- The design's "annexe" (build-spec appendix listing the palette/behaviors
  for Claude Code) was intentionally omitted — it was authoring metadata, not
  content for real visitors.
- Live screenshot capture depends on a free third-party service; if it's slow
  or down the preview area comes back empty. Swap `screenshotUrl()` in
  `src/lib/screenshot.ts` for static images if that becomes a problem.
