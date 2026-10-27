# Development

Use Node 24 (`nvm use`) and npm. The repository is on `portfolio`. Phases 1–3 are complete; Phase 4 motion and scroll tracking are under active refinement. Final assets and the accessibility/performance audit are Phase 5. See `PORTFOLIO_SPEC.md`.

```sh
npm ci
npm run dev
```

```sh
npm run check     # JSON validation, focused validator checks, lint, TypeScript
npm run build     # Validate content, type-check, generate dist/
npm run size      # Raw/gzip/Brotli totals for built JavaScript and CSS
npm run preview  # Serve the production build locally
```

The current official Vite React/TypeScript template uses Oxlint. Tailwind and its Vite plugin are build-only dependencies; CSS-first configuration lives in `src/styles/theme.css`. There is no Tailwind JS config. Motion is installed, with a shared reduced-motion policy; selective animation features loaded through LazyMotion.

## Adding a project

Edit `src/content/projects.json` and add one ordered entry. Do not add a wrapper component for an ordinary project. Order drives the project list, anchors, current/total count and remaining count. Use `template: "generic"` or `"featured"`.

Required fields: `id`, `template`, `title`, `headline`, `summary`, `stack`, `links`, `highlights`, `media`. Optional fields: `navigationLabel`, `role`, `status`, `supportingText`. Arrays can be empty except `stack`. Use a short `navigationLabel` for long titles; the full title still appears in the project heading.

- IDs are unique lowercase hyphenated anchor identifiers, e.g. `my-project`.
- Links contain `label` and an HTTPS `href`; do not include credentials or contact details.
- Highlights contain a `title` and `description`.
- Media items contain `id`, root-relative `src` under `/images/`, meaningful `alt`, intrinsic `width`/`height`, and optional `caption`. Add the actual file under `public/images/`. Empty media arrays are intentional until real project imagery is selected.

Run `npm run check` after editing. The JSON schema in `src/features/projects/schema.ts` is the single contract, with TypeScript types derived from it. Ajv and schema tooling run only at build/check time; they are not browser dependencies. The browser content entry point relies on validated builds rather than duplicating validation at runtime.

The template renderer selects `ProjectCard` or `FeaturedProject` from JSON. Navigation names, totals and remaining counts derive from the same array. Selection follows native scrolling and anchor jumps. Progress measures actual section distance independently of project counts. A genuinely new reusable animation behaviour may need a code extension; normal content, links, images and project additions do not.

Every project uses one shared `ProjectPreview` on desktop, mobile and reduced-motion views. Set `media` to an empty array until imagery is selected, or supply exactly one dimensioned image with alt text and an optional caption. Multiple images fail content validation. There are no image scenes, carousel controls or scroll-driven image swaps.

`npm run test:projects` exercises rendering with fourth-project fixtures for both templates, optional fields/media, and navigation counts/reordering. It uses Vite's existing JSX transform and React's static renderer only for tests, adding no runtime dependencies. The actual JSON also passed a temporary fourth-entry browser check; the fixture is not retained in content.

## Site and skills content

Site identity/navigation/build credit live in `src/content/site.ts`; the five skill groups and CV self-assessment inputs live in `src/content/skills.ts`. Skill experience tags derive from a shared helper (80+ Core, 65–79 Confident, otherwise Working knowledge). Final label approval remains a release task; numeric scores are not rendered. Icons are lightweight inline SVG paths in one shared component. The hero is code-native SVG with no image request.

The desktop header is CSS sticky. The project rail/phone strip is also sticky but bounded by Selected work; anchor offsets account for those surfaces. A shared passive scroll scheduler updates Motion progress values and discrete project/section state; project state changes only at boundaries. Hero and project motion use Motion hooks, while shared entrances leave essential copy accessible. Reduced-motion and mobile media queries select static previews. The mobile menu is a normal inline navigation panel, not a modal: keyboard access uses native links/buttons and Escape returns focus to its toggle. Viewport overrides used for review were reset afterwards.

## Production performance

- Keep generated design images under `design/`; never import them into the application.
- The first scaffold uses the system font stack, with no font network request. Final typeface choice and self-hosted subsets are a later asset decision.
- Use responsive, compressed real screenshots with dimensions. Keep essential copy in HTML, not embedded in screenshots.
- Prefer native scrolling and CSS sticky; isolate Motion features. Avoid a router, UI kit, runtime CMS or continuous animation loops for this one-page site.
- Compare bundle sizes at phase boundaries. `docs/PERFORMANCE.md` records the foundation baseline; compressed bytes are not a substitute for Lighthouse/device testing.
- Validate production output before release. GitHub Pages deployment is Phase 6; nothing has been published by scaffolding.

Viewport chapters: `useStorySnap` enables native document scroll snap above Skills and releases it at Skills. CSS sizes the hero/project chapters using minimum viewport height, preserving overflow content. Reduced-motion disables snap. Wheel/trackpad chapter transitions use the existing Motion dependency; touch scrolling stays native.

Phase 4 timing revision: wheel/trackpad transitions between fitting chapters take 1.15 seconds with cubic-bezier easing (.65, 0, .35, 1). Trailing wheel momentum is suppressed during the transition. Tall chapters scroll naturally within their content. Pointer, keyboard, resizing and reduced-motion preference changes cancel an active transition. Anchor links use the same gentle 1.15-second transition, cancelling any previous transition; reduced-motion navigation stays immediate. Native touch snap timing remains browser-controlled. Verified hero-to-UNAFFI landing and Skills navigation with normal scrolling released.

Link-navigation correction: the earlier “no smooth scroll” message was an observation of the bug, not a request for instant links. Internal anchors now share the wheel transition, update the URL without a native jump, wait for mobile menu closure before measuring, and focus the destination at completion without scrolling it again. Modified clicks retain native behaviour.

## Colour themes

Use semantic colour roles from `src/styles/theme.css`, not raw palette shades or fixed white/black classes for theme-dependent UI. The file owns raw `--palette-*` CV colours, light/dark role values, CSS dark variant and inline Tailwind utility mapping. Tailwind default colours are disabled. `public/theme.js` is the single preference store and pre-render theme bootstrap loaded by `index.html`; `ThemeSwitcher` subscribes through React useSyncExternalStore. Keep theme logic here rather than duplicating it in React effects. Preferences are System (default), Light and Dark. Run `npm run test:theme` for preference regressions. The size reporter includes all built JS/CSS, including the bootstrap outside assets/.

Theme-control refinement: replace the select with a transparent icon button in the desktop and mobile header. Show sun in light mode and moon in dark mode, with an accessible action label for switching to the opposite theme. Default still follows the system until the first explicit toggle; toggles persist the chosen light/dark override. The dropdown/System-reset UI is removed.

Mobile navigation now opens as a compact absolute-positioned overlay below the header, replacing the inline expanding panel. Opening/closing does not change header/hero dimensions or scroll offsets. Use a 200ms fade/8px entrance with reduced-motion support, a themed surface and subtle shadow. Dismiss on link selection (including GitHub), outside pointer, Escape (returns focus), tabbing outside the header, or switching to desktop. Hidden mobile navigation is inert and excluded from assistive technology; desktop navigation remains in flow. No body scroll lock or modal focus trap.

Mobile scrolling decision: disable native snap and custom wheel/boundary-triggered section transitions on mobile/tablet and touch-first devices. Chapter snapping is restricted to widths >=1024px with a fine pointer and hover. Mobile retains smooth explicit anchor navigation, progress tracking and readable section spacing; scrolling upward from Skills no longer triggers an automatic return on mobile. This supersedes earlier mobile snap requirements.

Section entrances use `useSectionEntry` with the pure state policy in `src/lib/section-entry.ts`. Re-arm only on complete section exit. Shared `Reveal` plays each visible skill group at most once per entry; replay is shorter/lighter. Hero highlight plays only on the first entry; pointer tilt uses Motion values rather than React state. `npm run test:entrances` covers replay policy.

Skills sequencing now uses Motion variants in shared Reveal/RevealItem components: heading/group profiles, a 40ms first-entry row stagger after the group settles, and static child variants on replay. Group visibility still gates animation; the section entry observer only re-arms after full exit. Reduced-motion applies static parent/child variants.

Skills jump regression: useSectionEntry exposes its armed state so Reveal prepares offsets only on mount/full section exit. Entrance variants target settled scalar values; rows use opacity only and never reset their Y coordinate after the panel settles. Tests assert partial scrolling cannot re-arm visible content.

Deep-link entrance fix: load Motion domAnimation synchronously through LazyMotion before the page mounts. The prior asynchronous feature import could miss controls.start on a direct #skills reload and leave content at its prepared opacity. Keep the selective domAnimation feature set and reduced-motion policy; remove the unused async loader.

Current Skills entrance policy supersedes the earlier row staggering: Reveal animates opacity only. useScrollSettled waits for 160ms of scroll quiet before an entrance starts; each group fades as one unit (850ms first entry / 450ms replay). data-settled enables hover movement after completion. No nested row component or entrance translations remain.

Current Skills entrance correction: use one standard combined fade-up per heading/group, opacity 0→1 and translateY 24px→0 over 600ms. Return visits use 12px/400ms. Prepare off-screen, then animate to one settled target; no keyframe reset, nested row animation, or scroll-idle timer. Reduced-motion is immediately opaque with zero translation. This supersedes the opacity-only entrance; the scroll-settle hook was removed.
