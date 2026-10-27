# Production bundle baseline

Phase 1 scaffold, measured 26 October 2026 using Node 24.19.0, Vite 8.3.5, React 19.3.1, Tailwind CSS 4.3.3, and Motion 14.6.0.

| Output | Raw | gzip | Brotli |
| --- | ---: | ---: | ---: |
| JavaScript | 216.99 KiB | 67.42 KiB | 57.97 KiB |
| CSS | 7.85 KiB | 2.55 KiB | 2.19 KiB |
| Total JS/CSS | 224.84 KiB | 69.98 KiB | 60.16 KiB |

Measured with `npm run build` followed by `npm run size`. The report uses Node gzip/Brotli compression and binary KiB, so results can differ from Vite's decimal-kB report. Compressed sizes estimate transfer cost; the production host determines actual content encoding.

This is a minimal semantic shell with React, a shared Motion reduced-motion policy, and no loaded project images or fonts. It is not the finished portfolio and is not a Lighthouse/Core Web Vitals result. HTML, images, fonts and server behaviour are excluded from the table.

Tailwind scans only `src/`, avoiding accidental utility generation from design handoff documents. Theme tokens are CSS-first. Ajv and JSON-schema typing tools are build-only; project JSON is not rendered or imported by the shell yet. Generated concepts stay out of `public/` and `dist/`.

Track size after each phase. Real images, font choice, project rendering and Motion features will change this baseline. Before release, test production output on mobile and desktop, inspect network waterfalls and long tasks, and record Lighthouse conditions and results. Target LCP ≤2.5s, CLS ≤0.1, INP ≤200ms; field validation follows real traffic. No speed score is claimed by scaffolding.

## Phase 2 — data-driven project templates

| Output | Raw | gzip | Brotli |
| --- | ---: | ---: | ---: |
| JavaScript | 227.23 KiB | 70.63 KiB | 60.68 KiB |
| CSS | 13.74 KiB | 3.52 KiB | 3.04 KiB |
| Total JS/CSS | 240.97 KiB | 74.15 KiB | 63.72 KiB |

Increase from the foundation: 4.17 KiB gzip for the three project overviews, shared templates, labelled placeholders, technology/link rendering and anchor-selection navigation. No runtime dependencies added and no image/font requests introduced. Scroll observers and animation sequences are not present yet. The four-project fixtures run only in tests and are not shipped.

## Phase 3 — responsive visual page

| Output | Raw | gzip | Brotli |
| --- | ---: | ---: | ---: |
| JavaScript | 238.88 KiB | 73.87 KiB | 63.66 KiB |
| CSS | 22.92 KiB | 5.08 KiB | 4.40 KiB |
| Total JS/CSS | 261.80 KiB | 78.94 KiB | 68.06 KiB |

Increase from Phase 2: 4.79 KiB gzip for the responsive navbar/menu, SVG hero, five skills groups/icons, complete footer and layout refinement. No new dependencies, external fonts or project image requests. Sticky positioning uses CSS; actual scroll tracking and Motion sequences remain Phase 4. Browser review covered narrow phones, tablet and desktop with no document horizontal overflow; no live-site speed score is claimed.

## Phase 4 — motion and measured scrolling

| Output | Raw | gzip | Brotli |
| --- | ---: | ---: | ---: |
| Main JavaScript | 295.74 KiB | 94.40 KiB | 81.46 KiB |
| Motion features chunk | 42.46 KiB | 16.10 KiB | 14.73 KiB |
| CSS | 24.25 KiB | 5.47 KiB | 4.76 KiB |
| Total JS/CSS | 362.46 KiB | 115.97 KiB | 100.95 KiB |

Increase from Phase 3: 37.03 KiB gzip for Motion rendering/scroll features, shared progress scheduling, project scene transitions and entrances. LazyMotion separates animation features into an asynchronous chunk loaded by the provider on mount; this is not an interaction-deferred download. Totals include both chunks. No new dependencies, project images or fonts.

Progress updates use Motion values, with React state changing only at discrete boundaries. Native scrolling and CSS sticky retain page flow; overlapping scene grids reserve their space. Mobile and reduced-motion views use static previews. Browser checks found no console warnings/errors or tested-width horizontal overflow. These are functional checks, not measured CLS or Lighthouse results. Production profiling and actual-device reduced-motion validation remain Phase 5, together with real asset selection and compression.

Phase 4 viewport-chapter revision: 363.34 KiB raw / 116.22 KiB gzip / 101.23 KiB Brotli total JS/CSS. Native CSS snapping adds no dependencies; a shared-scroll subscriber releases it at Skills. Checks and production build pass. These sizes supersede the previous Phase 4 measurement.

Phase 4 controlled wheel transition revision: 374.89 KiB raw / 118.96 KiB gzip / 103.94 KiB Brotli JS/CSS. Uses the existing Motion animation API, without new dependencies. Checks and production build pass. Anchor navigation retains computed scroll-behavior auto.

Phase 4 Skills return fix: 377.00 KiB raw / 119.42 KiB gzip / 104.44 KiB Brotli JS/CSS. Checks and production build pass. No new dependencies.

Phase 4 single-preview cleanup: removed scroll-image sequences, gallery variants and scene-index helpers. Total JS/CSS: 374.81 KiB raw / 118.83 KiB gzip / 103.84 KiB Brotli. Content validation rejects multiple images; shared rendering produces one preview per project.

## Phase 4 — system-default colour themes

27 October 2026: 381.05 KiB raw / 120.61 KiB gzip / 105.32 KiB Brotli total JS/CSS. Includes the 1.27 KiB raw / 0.56 KiB gzip / 0.47 KiB Brotli theme bootstrap in dist/theme.js; the report now scans all of dist rather than only assets/. The small same-origin bootstrap runs before the app to avoid an incorrect-theme flash. No dependencies, image or font downloads added. Semantic light/dark CSS tokens replace the previous shade utilities. Checks/build and theme preference tests pass; desktop and 320px mobile switching reviewed. This is not a Lighthouse measurement.

Phase 4 Work-entry regression fix: 381.68 KiB raw / 120.76 KiB gzip / 105.41 KiB Brotli JS/CSS, including theme bootstrap. Checks and production build pass; no dependencies added.

Phase 4 mobile-overlay menu: 383.88 KiB raw / 121.29 KiB gzip / 105.85 KiB Brotli total JS/CSS. No dependencies added. Browser comparison shows identical header height (88px), hero dimensions/position and scroll position before/after opening. Outside tap, Escape/focus return and Work-link dismissal pass; no console warnings/errors. Checks/build pass.

Phase 4 shared link feedback: 385.70 KiB raw / 121.76 KiB gzip / 106.45 KiB Brotli JS/CSS. Shared Motion link variants animate only transforms; hover colours use short CSS transitions. No dependencies added. Checks/build pass; external-link rendering checks cover target, rel and accessible new-tab hints. Browser confirms SVG hero arrow, keyboard feedback and smooth Work navigation without console errors.

Phase 4 stronger hero/skills interactions: 392.54 KiB raw / 123.85 KiB gzip / 108.09 KiB Brotli JS/CSS. Uses existing Motion springs/values plus shared section observers; no dependencies or media downloads added. Pointer motion does not set React state per frame; entrances use transform/opacity. Checks/build and replay-policy regression pass. Functional browser review confirms re-entry and partial-scroll behaviour, not a production frame-rate or Lighthouse audit.

Phase 4 skills entrance sequencing: 393.14 KiB raw / 124.03 KiB gzip / 108.16 KiB Brotli JS/CSS. Existing Motion variants coordinate heading, groups and first-entry row staggering. No dependencies added. Checks/build and entry-policy tests pass; browser verifies first entry and no hidden rows.

Phase 4 Skills double-jump fix: 393.19 KiB raw / 124.06 KiB gzip / 108.22 KiB Brotli JS/CSS. Prepared scalar entrance targets replace reset keyframes; rows use opacity-only staggering. No dependencies added. Checks/build and full-exit preparation tests pass. Preview server restarted to clear a stale hot-reload module during verification.

Phase 4 direct-Skills reload fix: synchronous selective domAnimation replaces the async feature loader. Total JS/CSS: 391.04 KiB raw / 122.32 KiB gzip / 106.52 KiB Brotli. Animation code is available before components mount; the extra feature request is removed. Desktop #skills reload reproduced the old stuck 0.55 opacity, then verified visible groups and rows settle at opacity 1 after the fix. Checks/build pass.

Phase 4 gradual Skills fades: 391.22 KiB raw / 122.35 KiB gzip / 106.61 KiB Brotli JS/CSS. Removed nested row animations and entrance translations; shared scroll scheduling detects quiet periods with state updates only at scroll start/end. Checks/build pass. Reload review confirms visible groups reach opacity 1 with no transforms and no console errors.

Phase 4 standard Skills fade-up: 390.86 KiB raw / 122.24 KiB gzip / 106.41 KiB Brotli JS/CSS. One opacity/translateY transition replaces idle scheduling; unused hook removed. Checks/build pass; direct #skills reload reaches opacity 1 and zero transform for visible groups.
