# Portfolio website specification

Status: Phases 1–3 complete. Phase 4 is under active motion and viewport-chapter refinement.
Branch: `portfolio`.

Editable Figma design: [Dean Marx — Portfolio](https://www.figma.com/design/1cNN1sblRCTmVqNHnqjEay). Desktop and mobile frame links and design limitations are recorded in `design/FIGMA.md`. The latest product-overview revision is in `design/SCROLL-STORYBOARD.md` and generated images; Figma is awaiting sync because its Starter MCP call limit was reached. Foundation scaffolding is now authorised; the visual page is a later phase.

## Current media direction — single preview per project

Latest direction supersedes earlier multi-scene image sequences: each project has exactly one preview image on every viewport and reduced-motion setting. Use one labelled placeholder until its final asset is selected. A composite image may show multiple product capabilities within that single asset. Keep product copy, chapter scrolling and shared project progress. Remove image pagination and image-state transitions. JSON media accepts zero or one image; visualSequence is removed.

## Goal

Replace the README-based GitHub website with a fast, responsive one-page portfolio that communicates Dean Marx's frontend development, product design, and end-to-end delivery experience. Preserve the README's substance while improving hierarchy and readability.

## Agreed direction

- React, TypeScript, Vite, Tailwind CSS, and Motion for React.
- GitHub Pages hosting at `deanwmarx.github.io`, deployed through GitHub Actions.
- Original light editorial concept: oversized typography, generous whitespace, fine dividers, a blueprint-style hero illustration, and blue emphasis.
- Use the supplied CV theme tokens. Main colours: white background, `#0066CC` primary, `#0B141C` headings, `#3B4751` body text, `#536776` supporting text, `#F6F8F9` surfaces, `#D6DCE1` borders, and `#ECF9FF` tinted panels. Use orange sparingly; reserve status colours for functional feedback.
- Normal browser scrolling with purposeful animation and a fully readable reduced-motion experience.
- No backend, routing library, CMS, contact form service, or runtime data fetching required for the first release.

## Page content and structure

1. Header: Dean Marx, Work, Skills, GitHub.
2. Hero: “Complex products. Simple experiences.” Existing introduction condensed around ten years of experience, frontend development, and UX-first delivery. Explore-work anchor and lightweight blueprint illustration.
3. Selected work: UNAFFI featured project followed by generic FIMO and Budgit projects.
4. Skills: technologies grouped by capability, with descriptive experience labels and supporting evidence.
5. Footer: name, professional summary, GitHub, back-to-top link, copyright, and build credit. No public contact details or contact links anywhere on the site, including metadata and downloadable assets. Recipients already have Dean's contact information. No CV download in the current scope.

Sections are being agreed in order: header, hero, projects, skills, footer. Projects present high-level product purpose and capabilities, rather than detailed research/design/engineering narratives. Role and technology remain supporting information.

### Header — approved

- Slim, white header aligned to the main page container, with generous horizontal spacing and a thin grey bottom divider.
- Left: “Dean Marx” in bold dark text, linking to the top of the page.
- Desktop: name with a small “Frontend developer” subtitle. Work and Skills form a quiet light-grey navigation group with a blue active-section indicator; GitHub is a separate primary-blue button. No About or Approach navigation item.
- Latest motion design supersedes the original non-sticky header: use a compact sticky desktop header during the scrolling story. Active state follows section visibility; no fabricated continuous progress within short sections. Reserve header height and anchor offsets to prevent jumps and obscured headings.
- No permanent text-link underlines in the navigation group. Provide distinct hover and keyboard focus states. No blocking header entrance animation.
- Mobile: name left, bordered “Menu +” button right. The button opens a simple vertical panel containing the same links. Selecting a section closes the menu. Keep mobile navigation in normal document flow.
- Menu button exposes its expanded state and panel relationship; support keyboard operation, Escape to close, and predictable focus handling. Reduced motion must not affect usability.

### Hero — approved

- Follow the original light editorial concept. Desktop uses two columns, with the text slightly wider than the blueprint illustration.
- Headline: “Complex products.” in dark ink, followed by “Simple experiences.” in primary blue `#0066CC`.
- Supporting copy: “I’m Dean, a frontend developer with 10 years of experience in website and app development. I design and prototype in Figma, then build—with user experience first.”
- Primary action: “Explore my work” with a down arrow, linking to selected work.
- Desktop illustration: lightweight layered interface panels connected by fine blue lines, built as SVG/CSS where practical.
- Viewport-height hero, vertically centred beneath the desktop header. Each project is its own viewport chapter.
- Mobile: single-column text with a compact, faint blueprint behind it, positioned toward the upper-right and partially cropped. Start around 5–8% opacity and adjust after visual review. Keep dense detail away from the supporting paragraph; the decoration must not compromise text contrast or capture pointer events. Treat it as decorative for assistive technology.
- Motion: short stagger for headline, introduction, and action; target 600–900ms total initial reveal. Desktop blueprint assembles, settles, then its layers gently separate as the visitor scrolls toward work. Keep displacement small and text stable. Mobile blueprint stays static. No continuous loops or scroll hijacking. Reduced-motion users see the completed composition immediately.

### Projects — approved working design

- Open with a thin divider and “Selected work”, without a section number. UNAFFI uses the featured template; FIMO and Budgit use the generic template. Refine image composition once real assets are chosen.
- Featured introduction: project name, product headline and overview, small role line, and separate visible Live site and Figma designs links. All essential copy and links are readable without completing the visual sequence.
- UNAFFI gives sports discovery and business management equal weight. Its two primary visual states are “Discover & play” and “Manage your business”. Community-organised free activities and membership benefits remain supporting context across the overview, not a third equally long technical chapter.
- Featured desktop: a concise overview beside a larger sticky product preview that crossfades between the two views as the section scrolls. No research/design/build chapters, forced scroll runway, or booking-only narrative. Do not duplicate the full overview beneath every state.
- Featured mobile: the two product views and short captions stack in normal document flow, with equal visual prominence. Finish with a compact technology list.
- Generic projects use full-width horizontal rows separated by thin rules, rather than the original concept's small side-by-side cards. Desktop: title, description, technologies, and labelled links on the left; a main image or composed desktop/mobile image on the right.
- Generic mobile order: title and description, image, technologies, links. Use subtle entrance reveals; elaborate scrollytelling belongs to featured projects.
- FIMO clearly describes target colour, total clay weight, mixing ratios, and recipe download. Budgit exposes separate Code and Figma designs links.
- Both layouts remain reusable through configured project components as described below.

### Project progress navigator — approved

- Visible only while scrolling through Selected work. Counts actual projects, not visual states, screenshots, or UNAFFI transitions.
- Desktop: slim sticky rail alongside the project section. Lists UNAFFI, FIMO, Budgit as real anchors; active project is blue, completed projects have a check, future projects are muted. Include current index/total and projects ahead. Thin vertical line tracks overall section scroll progress.
- Mobile: compact sticky white strip inside the project section, below the viewport top edge, with current name and count (e.g. “UNAFFI · 1 of 3”), “2 projects ahead”, and a thin horizontal progress line. It is not another permanent global navigation bar.
- Derive names, total, current position, and remaining count from the registered project list. Adding a project must not require changing navigator markup.
- Remaining means projects after the current one: 2 on UNAFFI, 1 on FIMO, 0 on Budgit. Use singular “1 project ahead”. Completed markers update when returning upwards; they are location indicators, not stored reading history.
- Progress is actual clamped scroll progress through Selected work, independent of project index: unequal project heights must not force equal thirds. Define start when the section top reaches the sticky offset, and end when the section bottom reaches the viewport bottom; recompute after resize/image layout changes. If the section fits in one viewport, omit the sticky progress UI rather than dividing by a zero/negative range.
- Use project top boundaries crossing a consistent viewport activation line to update the active item; retain the first/last item at section edges. Keep status stable in gaps. Anchor jumps and reverse scrolling must update both status and line.
- Rail/strip leave when Selected work ends; no overlap with skills or footer. Reserve space and account for desktop navbar and mobile status-strip anchor offsets. Do not trap scroll or cover copy/links.
- Reduced motion retains the information without easing. Expose named project navigation with current item semantics; provide an accessible progress label. Avoid announcing per-frame updates to screen readers; announce project changes at most.

### Project content

**UNAFFI — featured:** “Find opportunities to play. Manage the business behind them.” A sports platform connecting people with facilities and activities, while giving businesses the tools to manage listings, schedules, bookings, memberships, and payments. People can discover and book sporting opportunities, or organise free community activities for others to join. Equal weight for B2C discovery and B2B management. Business features include booking approvals/rejections, refunds, booking metrics, and memberships with service benefits such as free court bookings. Monthly or requested payouts are supporting product facts, not main overview copy. Do not name payment vendors or assume exact recurring billing/failure/renewal behaviour. Role and full project stack remain supporting information. Live site and Figma links retained.

**FIMO — generic:** title “FIMO Polymer Clay Colour Recipe Generator”; headline “From colour inspiration to a precise mixing recipe.” Turns the FIMO True Colours leporello into a personalised recipe card. Select a target colour and total clay weight in grams to obtain precise mixing quantities and download the recipe as an image. Emphasise removing manual calculations and guesswork and helping reduce waste for creators of different skill levels, rather than guaranteeing zero waste. Retain code link and stack.

**Budgit — generic:** label “Open-source personal project”; headline “A clearer picture of household spending and savings.” Built around Dean's household finances: categorise income and expenses, track monthly budgets, and compare projected savings with actual savings after unexpected costs. Supporting capabilities: multiple households and members contributing to a shared pool, configurable budget cycle start day, budget warning/danger thresholds, and local/Google Drive backup and restore. Budget progress and projected/actual savings are the primary visuals. Both GitHub/Code and Figma links remain public so others can fork/adapt the project; do not imply a publicly hosted app or add a live-app link. Retain SvelteKit/Capacitor/SQLite context.

### Skills — approved working design

- Working direction: editorial capability map integrated into the full-page references in `design/concepts/portfolio-desktop.png` and `design/concepts/portfolio-mobile.png`.
- Remove decorative numbering from all main page sections and all skill categories. Use typography, spacing, dividers, and icons for hierarchy. Category headings align with their content edges; supporting sentences sit directly below. Frontend and UX Design use identical header geometry; reserve space at the right for icons. No empty number gutter remains.
- Top-right primary-blue outline icons on all five panels: Frontend code window; UX Design wireframe interface with a clear cursor (the pen-tool treatments were not legible); AI-assisted development a single four-point sparkle, explicitly requested in the latest review; Backend server stack without arrows; QA Testing clipboard with checkmark. Keep stroke weight consistent, with reserved space to avoid heading and subtitle collisions. Figma uses 48px desktop and 28px mobile. Treat icons as decorative.
- Section label “Skills & tools”; heading “The craft behind the interface.”
- Priority: Frontend and UX Design share the prominent first row; AI-assisted development follows in a full-width pale-blue band; Backend and QA Testing follow as quieter groups, Backend first. Stack in the same order on mobile.
- Keep category headings and relevant supporting sentences; remove redundant uppercase category eyebrows and their decorative rules. Keep the overall section label. Use open editorial layouts rather than boxed cards.
- Frontend supporting text: “Build thoughtful interfaces.” UX Design: “Shape the experience.” AI-assisted development: “Specifications, tools, and considered execution.”
- Use simple text rows, thin dividers, dark headings, muted supporting copy, and small blue accents. No large logo grid, percentage bars, or public numeric ratings.
- Each skill has a compact experience tag: Core, Confident, or Working knowledge. Individual assignments remain provisional pending review. Use wrapping layouts and readable tags on small screens, without clipping or squeezing long names. Include short supporting context only where verified; do not invent project evidence for skills absent from the README.
- Store the supplied self-assessments as source data for editorial reference. Final descriptive labels need review; scores are not externally verified proficiency measurements. Next.js remains a portfolio skill rather than this site's framework.
- Supplied CV data, preserving names and scores:
  - Frontend: React, Next.js (70); TypeScript (75); JavaScript (80); Tailwind CSS (85); HTML, CSS (90); Svelte, SvelteKit (80).
  - UX Design: Figma (85); Prototyping (85); User Research (80).
  - QA Testing: Jest (60); React Testing Library (50); Manual Testing (80); Test-Driven Development (60).
  - Backend: Node.js, Express (65); PHP (55); MySQL (70); MongoDB (50); Laravel (60); Code Igniter (50).
  - AI: Claude Code (75); Github Copilot (75); Specification-Driven Development (70); OpenAPI Contracts (supports SDD) (60).
- Reveal each group subtly; labels remain static and readable. Reduced motion shows the final layout immediately.

### Footer — approved

- White background, thin top divider, muted text, and blue link interactions. No entrance animation.
- Left: “Dean Marx” and “Frontend development & product design.”
- Right: GitHub with external arrow and “Back to top” with upward arrow.
- Bottom: copyright and “Built with React, TypeScript, Vite, Tailwind CSS & Motion.”
- No email, telephone, contact form, contact invitation, or other public contact information. Do not introduce these in later implementation phases.

## Engineering rules — required

1. Do not duplicate implementation. When a pattern appears twice, extract an appropriately named shared component, hook, or utility. Keep abstractions focused; do not create a generic framework for hypothetical reuse.
2. Tailwind uses its CSS-first configuration. Theme tokens and custom utilities belong in `src/styles/theme.css` and CSS entry files, not a JavaScript/TypeScript Tailwind config. The Vite plugin is build integration only.
3. Use conventional React/Vite/TypeScript organisation: application entry under `src/app`, site-wide UI in `src/components`, project-specific behaviour in `src/features/projects`, editable content in `src/content`, and CSS in `src/styles`. Add hooks/utilities/assets folders only when used. Public static assets belong under `public`.
4. Consider production speed from the foundation: minimal dependencies, no UI/router/CMS framework, no runtime schema-validation package, no generated concept images in the production bundle, compressed dimensioned images when added, and selective Motion imports. Track compressed production output at each milestone; validate actual browser performance before release.
5. All project-specific information belongs in one ordered JSON file, `src/content/projects.json`. Adding an ordinary project means adding one JSON entry and optional media assets, without writing a wrapper component or modifying the renderer. A custom component is necessary only for a genuinely new visual behaviour not supported by either template.
6. Use a single project schema as the source of truth for validation and TypeScript types. Validate JSON during content checks/build, catching duplicate IDs, invalid links, missing required fields and wrong template names before deployment. Do not allow HTML, executable code, or Tailwind class names inside content JSON.
7. Work phase by phase. Each phase ends with its completion checks and recorded status; completing scaffolding does not authorise jumping ahead to final UI, deployment, merge or publication.

## Reusable project architecture

Two reusable templates: `ProjectCard` (generic) and `FeaturedProject`. A shared list renderer selects a template from the validated `template` field. Templates accept data; they do not hardcode UNAFFI/FIMO/Budgit names or contain project-specific branches. Share media, links, stack lists, capability text, and sequence primitives whenever they repeat.

The ordered JSON array drives rendered order, project navigation, total count and remaining count. Common data: stable `id`, `template`, title, headline, summary, optional status/role, stack, labelled links, highlights, and optional media/visual sequence. Media supports source, alt text, width, height, and optional caption. Empty media arrays are valid while real imagery is pending. Featured highlights communicate capabilities, not development-process chapters. Essential copy is independent of animation.

```text
src/
  app/                 # App and application-wide providers
  components/          # Shared layout and reusable site UI, when introduced
  content/
    projects.json      # Single source of project content and ordering
  features/
    projects/
      schema.ts        # Validation schema; derive TS types here
      index.ts         # Typed content entry point
      components/      # ProjectCard, FeaturedProject, list/media/links in Phase 2
  styles/
    index.css          # Tailwind import, global base/accessibility rules
    theme.css          # CSS-first CV theme tokens
  main.tsx
public/                # Public static assets; no generated mockups
scripts/               # Build-time content checks
```

JSON example shape:

```json
{
  "id": "new-project",
  "template": "generic",
  "title": "New project",
  "headline": "A concise product benefit.",
  "summary": "Who it serves and what it does.",
  "stack": ["React"],
  "links": [{ "label": "Code", "href": "https://github.com/example/project" }],
  "highlights": [],
  "media": [],
  "visualSequence": []
}
```

Project-scoped optional sequences use data-selected behaviours implemented through reusable primitives, rather than JSX embedded in JSON. Templates must handle absent optional content cleanly. Future custom sequences are implementation extensions, not a requirement for routine additions.

## Animation specification

- Motion is a central part of the design, not a final layer of generic reveals. Review key scroll states alongside page layouts before implementing sequences. The current product-focused states and all section content/behaviour are specified in `design/SCROLL-STORYBOARD.md`. The older Figma storyboard is static and awaiting revision; neither it nor generated images constitute a live scroll-linked prototype.
- Hero: brief staggered opacity/transform entrance; blueprint layers assemble, settle, and gently separate during desktop scroll exit. No blocking intro or continuous loop.
- Generic projects retain reusable templates with configurable optional visual sequences. FIMO: target colour and weight → component mixing quantities → recipe card. Budgit: monthly budget progress → projected versus actual savings. These are short local transitions with no full-screen pinning, not additional featured templates. Use actual assets when selected; illustrative ratios or chart values must not be presented as real project data.
- Featured project: desktop uses CSS sticky media alongside the concise product overview. UNAFFI transitions between sports discovery and manager portal with equal emphasis; community activities and memberships appear as supporting context. No research/design/build chapters or mandatory scroll to understand the product. Keep sequence bounded to content; no artificial long scroll runway.
- Mobile: naturally stacked product views and short captions, with brief reveals. No sticky scroll sequence required.
- Controls: CSS colour, underline, focus, and arrow transitions.
- Reduced motion: remove transforms, scrubbing, and decorative sequences; show all text and relevant media in document flow.
- Clean up observers and subscriptions. Avoid per-frame React state updates, scroll hijacking, global smooth-scroll libraries, and unnecessary layout animation.

## Imagery

Current build references are `design/concepts/portfolio-desktop.png`, `design/concepts/portfolio-mobile.png`, and `design/concepts/scroll-storyboard.png`. They include product-overview content, project progress rail/status strip, and all three active-project states. Only these three images are retained. Generation prompt summaries and known visual deviations are recorded in `design/concepts/README.md`. Follow the written specification for exact content, icon placement, responsive stacking, and mobile blueprint opacity.

The Figma file currently contains the older process-focused project story. The latest product-focused revision is documented in `design/SCROLL-STORYBOARD.md` and the product-overview images in `design/concepts/`. Figma could not be updated because the Starter MCP tool call limit was reached. Do not treat the old Figma research/design/build story as authoritative. The new generated images remain visual references; the written specification governs exact copy and behaviour.

Actual project imagery is undecided. Mockup-generated interfaces are not production screenshots and must not be presented as actual work.

Candidates: UNAFFI sports discovery and manager-portal screens with equal prominence; FIMO colour/weight selection paired with the real recipe output; Budgit budget progress and projected/actual savings, including mobile where available. Use clearly labelled concepts/placeholders until actual media is selected. Missing media must not block layout work or produce broken images. Final image selection is a release prerequisite.

Use responsive, pre-compressed images with explicit dimensions and meaningful alt text. Lazy-load below-the-fold media. Implement the blueprint hero as lightweight SVG/CSS where practical.

## Phases and completion criteria

### Phase 1 — Foundation, theme, and content contract (complete)

- Scaffold React + TypeScript with Vite and npm lockfile; keep the official template’s Oxlint setup and configure Node 24 LTS.
- Integrate Tailwind through the Vite plugin and CSS-first theme files; preserve the supplied CV palette.
- Install Motion and establish the reduced-motion policy without building scroll sequences yet.
- Create the standard folder layout, minimal semantic app shell, and developer instructions.
- Add the three approved project overviews to JSON with a central schema, derived types, and a build-time validator. Keep the existing README content as source context.

Done when dependency installation succeeds; content validation, lint, type checking and production build pass; a local browser smoke check renders the shell; production compressed bundle sizes are recorded. No final project templates or animation sequences are required in this phase.

Completion evidence: React/TypeScript/Vite scaffold installed; Node 24 pinned; CSS-first Tailwind CV palette and source scanning configured; Motion reduced-motion provider; semantic shell verified in the local browser; three JSON project overviews validated against a shared schema with derived types; focused validator checks pass, including an additional project, duplicate IDs, unknown templates, credential-bearing URLs, missing media references and unsafe paths. `npm run check`, `npm run build`, and `npm run size` pass. JS/CSS baseline: 69.98 KiB gzip / 60.16 KiB Brotli; details in `docs/PERFORMANCE.md`. No final templates, scroll behaviour, merge or deployment performed.

### Phase 2 — Reusable project templates and project navigation (complete)

Build shared links, media, stack, generic/featured templates, and one data-driven project list. Add the desktop progress rail and mobile status strip with an initially static active state, deriving all labels/counts from JSON. Use clearly labelled media placeholders. Add a temporary fourth JSON entry during validation to prove that templates/order/navigation extend without code edits; remove that temporary entry afterwards.

Done when all approved summaries/links render, missing optional media is handled, no duplicated project markup remains, and another generic or featured entry works through JSON alone. Verify the data contract and any nontrivial navigation calculations with focused checks.

Completion evidence: shared project frame, overview, highlights, technology list, external links, media and gallery components; separate generic and featured templates chosen by the JSON `template` field. The browser renders all three high-level product overviews, including both UNAFFI audiences and Budgit's Code/Figma links. Empty media yields labelled placeholders; real media uses dimensions, alt text and lazy loading. JSON can include an optional `navigationLabel` (FIMO uses this) without changing the full title.

The desktop rail/mobile navigation skeleton derives names, index/total and remaining count from content and updates selected state on anchor clicks. It intentionally does not claim scroll tracking, completion checks, sticky behaviour or measured progress yet; those belong to Phases 3/4. Tests cover a fourth generic and featured project, optional fields/real media, both UNAFFI capabilities, reordered content, unknown selections, empty lists and remaining-count grammar. A temporary fourth entry was also inserted into the actual JSON, verified in the browser and removed. Checks/build pass; total JS/CSS is 74.15 KiB gzip, 63.72 KiB Brotli. No new runtime dependencies.

### Phase 3 — Complete responsive visual page (complete)

Implement the agreed navbar/mobile menu, hero/blueprint, product layouts, skills, footer and the responsive project navigator. Review the three current reference images together with the written storyboard. No process-focused project chapters. Keep actual media placeholders until selected.

Done when desktop and narrow-mobile visual reviews pass, keyboard/focus/menu navigation work, no horizontal overflow occurs, all essential summaries/links are visible without motion, and no public contact details appear.

Completion evidence: responsive navbar with grouped desktop links and GitHub button; inline mobile Menu + panel with expanded/control semantics, Escape/focus handling, and close-on-navigation; fluid hero with lightweight decorative SVG blueprint and faint static mobile background; refined generic/featured projects with labelled media placeholders; all five prioritised skill groups with consistent outline icons and descriptive tags; complete footer with build credit and working top anchor. Shared presentation components retain JSON-driven project content. CSS bounds the desktop rail/mobile strip to Selected work; selected-project state still changes on clicks only, with scroll activation/progress reserved for Phase 4.

Browser reviewed at 320, 390, 768 and 1440 viewport widths plus the default desktop viewport. No document horizontal overflow at the tested widths; a minimum-body-width issue was fixed. Verified menu open/close, Escape returning focus, Skills navigation closing the menu, project navigation, project-rail boundary before Skills, and Back to top. All content remains visible without animations. `npm run check`, production build and size report pass. JS/CSS: 78.94 KiB gzip / 68.06 KiB Brotli; no new dependencies or image/font requests. Real imagery, final font and proficiency-label approval remain Phase 5 tasks.

### Phase 4 — Motion and scroll behaviour (in progress)

Implement hero assembly/exit; UNAFFI discovery-to-management sticky sequence; short FIMO colour-to-recipe and Budgit budget-to-savings sequences; project count/remaining/progress updates; active navigation and subtle skill entrances. Use reusable hooks/primitives. Respect reverse scroll, anchor jumps, viewport resizing and reduced motion.

Done when actual section progress is independent of project count, all active states update reliably, sticky bounds do not leak into Skills, mobile stays native and readable, and no scroll traps, per-frame React state churn or animation-induced layout shifts remain.

Completion evidence: shared passive scroll scheduling and Motion values drive measured section progress, with React updates only at project/scene/section boundaries. Desktop has blueprint assembly/exit, project scene crossfades, a bounded featured preview, reversible project completion marks, remaining counts and active Work/Skills navigation. Shared subtle entrances apply to hero copy and skills. Mobile uses native scrolling with static project previews; reduced-motion preferences disable decorative movement and preserve readable content. Grid-overlaid scenes reserve space rather than changing page height. Sections that fit the viewport do not get a sticky progress treatment.

Browser checks covered desktop and 390px mobile, anchor jumps, native scrolling, reverse navigation, progress completion and the navigator leaving before Skills. No horizontal overflow or console warnings/errors observed. Focused geometry and static fallback checks, lint, type checking and production build pass. OS-level reduced-motion emulation was unavailable; preference handling is implemented in media queries, Motion configuration and CSS, with actual-device audit retained for Phase 5. Total JS/CSS: 115.97 KiB gzip / 100.95 KiB Brotli. No new dependencies. Scene transitions currently operate on labelled placeholders; real screenshot composition and timing require selected assets in Phase 5. No merge or deployment.

### Phase 5 — Final assets, accessibility, SEO, and speed

Replace concepts/placeholders with selected real and anonymised project media. Finalise skill labels, typography, metadata, social preview and favicon. Audit contrast, landmarks, focus, labels, alt text, image dimensions and responsive delivery. Measure production build and browser performance; optimise actual bottlenecks rather than adding speculative tooling.

Done when meaningful checks and production visual review pass; record Lighthouse performance/accessibility/SEO results under stated conditions (target 90+), and aim for LCP ≤2.5s, CLS ≤0.1 and INP ≤200ms. Field INP validation requires real traffic. Investigate bundle growth from the Phase 1 baseline. No external font stylesheet, oversized project image or unnecessary animation package should block first render.

### Phase 6 — GitHub Pages release

Add GitHub Actions that install from the lockfile, validate content, lint/type-check/build, upload `dist/`, and deploy using Pages. Use base `/` for `deanwmarx.github.io`. Confirm the production branch and release timing; review `portfolio` before merging/publishing. Configure Pages when release is authorised.

Done when deployment succeeds, assets/anchors/links resolve at the root, and the published desktop/mobile page is checked. No merge or publication as part of scaffolding.

## Decisions remaining

- Final screenshots and image treatment for each project.
- Confirmation of skill labels, especially React and Next.js.
- Final UNAFFI discovery/management visual composition after reviewing real assets.
- Font choice.
- Production release branch and timing.

These do not block Phase 1. Progress to later phases one milestone at a time; outstanding media and final skill labels must be resolved before release.

## Phase 4 revision — viewport chapters

Latest user direction supersedes the earlier continuous-scroll layout: hero and each individual project have a minimum height of one viewport (minus the sticky desktop header). Native mandatory vertical scroll snap aligns chapters; each project is a stopping point. Selected work is a grouping label rather than a separate empty screen. Project count/progress remain data-driven.

Skills is the final snap destination and releases snapping for normal Skills/footer scrolling. Returning above Skills restores the story behaviour. Reduced-motion users retain normal scrolling. Use minimum height rather than fixed height: content exceeding the screen can be read before advancing, particularly on phones or short screens. Wheel/trackpad chapter changes use a controlled Motion transition; touch scrolling stays native. Never clip essential content. Featured media no longer has a separate sticky runway inside the viewport chapter.

Verified desktop project alignment (FIMO 912px chapter in a 1000px viewport beneath an 88px header), snapping between projects, Skills disabling snap and allowing free scrolling, and 390px mobile without horizontal overflow. The hero is 844px tall in the 844px phone viewport. Phase 4 remains open for further visual/interaction refinement.

Phase 4 timing revision: wheel/trackpad transitions between fitting chapters take 1.15 seconds with cubic-bezier easing (.65, 0, .35, 1). Trailing wheel momentum is suppressed during the transition. Tall chapters scroll naturally within their content. Pointer, keyboard, resizing and reduced-motion preference changes cancel an active transition. Anchor links use the same gentle 1.15-second transition, cancelling any previous transition; reduced-motion navigation stays immediate. Native touch snap timing remains browser-controlled. Verified hero-to-UNAFFI landing and Skills navigation with normal scrolling released.

Link-navigation correction: the earlier “no smooth scroll” message was an observation of the bug, not a request for instant links. Internal anchors now share the wheel transition, update the URL without a native jump, wait for mobile menu closure before measuring, and focus the destination at completion without scrolling it again. Modified clicks retain native behaviour.

Project previews have no pagination dots or carousel-style indicators. Scene changes remain scroll-driven; the shared project navigator is the sole project-progress UI.

Skills return fix: upward gestures at the free-scroll boundary ease back into the final project using the shared 1.15-second transition. Native snapping is disabled for wheel-controlled scrolling so re-entering the story cannot trigger a competing abrupt snap. A boundary-crossing fallback also handles native scroll inputs. Reduced-motion remains immediate.

Mobile/tablet project landings reserve the measured sticky progress-strip height plus 16px breathing room, in addition to the tablet header where present. The same CSS scroll margin is used by native snap, direct anchors and Motion navigation. The strip is measured with ResizeObserver so wrapping labels and viewport changes retain clearance.

Project chapters use whitespace rather than separator rules. The sticky mobile progress strip has no outer borders, leaving only the actual progress track. Retain measured strip-height clearance plus 16px to protect project headings.

Landing-spacing refinement: reduce extra mobile/tablet clearance above project chapters from 16px to 4px beyond the measured progress strip. Project vertical padding is 20px on phones and 32px on tablets (desktop remains 56px). This supersedes earlier 16px clearance notes; viewport chapter sizing and readable sticky-strip clearance remain.

Project alignment: top-align chapter content instead of vertically centring shorter projects. Desktop chapter padding and sidebar sticky position share the 56px content inset below the header; remove the sidebar’s additional vertical padding. The first chapter and sidebar retain their shared 112px inset for the Selected work heading.

First-project heading fix: reserve the first chapter’s 112px inset through the same CSS variable used by its Tailwind padding, so utility-layer padding cannot override the room reserved for Selected work. Later chapter/sidebar alignment remains 56px.

Desktop project progress is integrated into the navigation list: a thin vertical track connects the project markers, with measured scroll progress filling it blue. Current project uses a blue dot and earlier projects show checks. Remove the standalone bar below the list. Keep current/total and remaining counts above; mobile retains its horizontal strip.

Project-count label: desktop uses “Project · 1 of 3”; mobile/tablet retain the current project name in the compact progress strip.

Remaining-project count is mobile/tablet only; desktop shows the Project/current/total label and integrated navigation track without the “projects ahead” line.

## Phase 4 — semantic themes

User-authorised theme refinement adds System/Light/Dark selection, defaulting to System. Explicit choices persist in localStorage; System clears the override and follows live OS changes. The switcher is always visible in the desktop header and appears inside the mobile menu. A small pre-app script applies the effective theme before React/CSS render to avoid an incorrect-theme flash. Storage restrictions do not prevent switching in the current tab.

CSS-only colour setup follows palette → semantic roles → Tailwind utilities. Raw CV colours remain private `--palette-*` values in `src/styles/theme.css`; default Tailwind colours are disabled. Components use background/foreground, card, muted/muted-foreground, border/input/ring, primary/primary-foreground/primary-hover, secondary/secondary-foreground and accent/accent-foreground/accent-border. Old grey/primary-numbered/secondary-numbered classes have been migrated throughout the page and SVG fills. Dark mode uses charcoal/near-black surfaces with the same blue hue adjusted for legibility.

Validation: theme logic tests cover default/system changes, persistence, explicit overrides, resetting to System, cross-tab storage events, subscriptions, invalid preferences and blocked storage. Browser review confirms Dark survives reload, Light restores the original palette, and the switcher works at 320px inside the mobile menu without document overflow. System media-query changes are covered in unit tests; OS emulation is unavailable in this browser tool. All checks and production build pass. This remains Phase 4; no release or Phase 5 audit is implied.

Theme-control refinement: replace the select with a transparent icon button in the desktop and mobile header. Show sun in light mode and moon in dark mode, with an accessible action label for switching to the opposite theme. Default still follows the system until the first explicit toggle; toggles persist the chosen light/dark override. The dropdown/System-reset UI is removed.

Mobile opening chapter: header and hero share the first viewport. Measure the normal-flow header and subtract it from the hero minimum height; apply the same height as the hero snap margin so returning to the hero lands at page top, rather than creating a separate header-to-hero stop. Desktop sticky-header behaviour is unchanged.

Work-entry regression fix: Selected work heading is now the explicit first Work snap stop; the first article no longer competes as another snap point. Wheel chapter targets and first-project links resolve to the Work introduction through a shared destination helper, while later projects retain their own offsets. This prevents native snapping from overriding the Explore my work landing. Regression checks cover first-project mapping, reordering and unchanged later/Skills targets. Mobile browser check confirms the heading remains visible at 25px after link-animation completion.

Mobile menu control: a transparent 44px icon button replaces the labelled Menu/Close box. Three hamburger strokes transform into a cross over 280ms using transform/opacity; reduced motion switches immediately. Accessible Open menu/Close menu labels, aria-expanded/controls, Escape focus return and close-on-navigation remain.

Icon consistency: animated menu strokes now use the same shared SVG frame as sun/moon and the other icons (32px viewBox, 1.6 stroke, rounded caps/joins), displayed at 24px. Both header controls use the same muted resting colour and blue hover. Hamburger-to-cross morph and reduced-motion support remain.

Mobile navigation now opens as a compact absolute-positioned overlay below the header, replacing the inline expanding panel. Opening/closing does not change header/hero dimensions or scroll offsets. Use a 200ms fade/8px entrance with reduced-motion support, a themed surface and subtle shadow. Dismiss on link selection (including GitHub), outside pointer, Escape (returns focus), tabbing outside the header, or switching to desktop. Hidden mobile navigation is inert and excluded from assistive technology; desktop navigation remains in flow. No body scroll lock or modal focus trap.

Final-project mobile status: show “Skills & tools next” instead of “0 projects ahead”. Earlier projects retain their remaining-project counts. Desktop continues to hide this status line.

Mobile scrolling decision: disable native snap and custom wheel/boundary-triggered section transitions on mobile/tablet and touch-first devices. Chapter snapping is restricted to widths >=1024px with a fine pointer and hover. Mobile retains smooth explicit anchor navigation, progress tracking and readable section spacing; scrolling upward from Skills no longer triggers an automatic return on mobile. This supersedes earlier mobile snap requirements.

Link interaction refinement: shared ActionLink renders SVG down/up/external arrows. Hover and keyboard focus nudge arrows 3px in their navigation direction; pressing advances them 6px with subtle 0.98 scale feedback and eased return. Colour/underline changes transition over 200ms. Reduced-motion removes transforms. Every ExternalLink opens in a new tab with noopener/noreferrer and an accessible new-tab hint; internal section links keep existing smooth in-page navigation. Footer back-to-top uses the same icon treatment.

## Stronger hero and skills motion — Phase 4 refinement

- Hero blueprint panels assemble from visibly separated positions (up to 64–77 SVG units), staggered over roughly 1.1s. Desktop fine-pointer hover separates layers further and applies spring-smoothed tilt, up to about 4.5 degrees. No continuous loop. Mobile keeps its faint background treatment and entrance without pointer tilt.
- The blue headline phrase receives one 1.5-second highlight sweep on its first entry only. Supporting copy stays steady; text is never hidden pending animation.
- Skill groups reveal upward by 32px over 600ms, staggered as they become visible. Hover raises a group 4px, strengthens its blue accent, and tilts/scales its icon. Individual rows get a blue inset accent and tinted surface; labels stay in place.
- A shared IntersectionObserver entry policy only re-arms after the entire section exits. Returning hero uses an 18px/420ms settle; returning skills use a 14px/360ms lighter stagger. Partial scroll movements never re-arm. Below-fold skill groups wait for their own visibility, without hidden content while waiting.
- Reduced-motion removes movement and the headline sweep; skill hover colour feedback remains. No per-frame React state for pointer motion: use Motion values/springs.
- Validation: entry-policy regression covers the visibility threshold, partial exits, full exits and repeated returns. Browser observed second-entry counts for both sections, unchanged Skills count after partial scrolling, working pointer tilt/card feedback and no 390px overflow or console warnings/errors. Checks, production build and size report pass. OS reduced-motion emulation remains unavailable; preference guards and CSS static fallbacks are implemented.

Skill-row refinement: individual skills now only ease their name colour to blue on hover. Remove row background fills, inset accent lines, row dividers and the group bottom-shadow rule so lines cannot clash with experience tags. Group entrance/lift/icon feedback remains.

Experience tags inside an accented skills group use the card surface with a subtle inset accent-border ring, distinguishing them from the surrounding accent panel in both themes without changing layout. Other skill groups keep their existing tinted tags.

Internal arrow-link consistency: Back to top and Explore my work both use a visible primary/35 underline with an 8px offset, strengthening to primary on hover.

Action-link sizing cleanup: ActionLink now owns all text/primary/outline appearances, a fixed 44px border-box height, 20px text line height, 8px icon gap and a shared 4px underline offset. ExternalLink only supplies external direction; no separate styling definitions. Hero/footer text links use identical geometry. This supersedes the earlier 8px internal-only underline offset.

Skills entrance sequencing: Motion reveals the heading first (20px/450ms), then Frontend/UX with a 70ms stagger. Each group approaches from 24px over 500ms; its skill names and tags follow together with 40ms row staggering. AI enters as one panel before its rows. Lower groups wait for their own visibility. Re-entry uses half-distance, shorter heading/group motion; individual rows do not replay. Complete section exit is still required to re-arm. No scale/blur on text, no hidden content while waiting, and reduced-motion uses static variants/CSS.

Skills double-jump fix: prepare heading/group starting positions on initial mount and only reset after the entire section is off-screen. Enter animations now target a single settled value, rather than keyframes that reset already-visible content. Rows use opacity-only first-entry staggering with no independent vertical movement; replays keep rows fully opaque. A shared armed state synchronises preparation with section exit. This supersedes the earlier vertical row stagger.

Deep-link entrance fix: load Motion domAnimation synchronously through LazyMotion before the page mounts. The prior asynchronous feature import could miss controls.start on a direct #skills reload and leave content at its prepared opacity. Keep the selective domAnimation feature set and reduced-motion policy; remove the unused async loader.

Skills fade simplification: replace all Skills entrance translations and nested row fades with one gradual opacity-only fade per heading/group (850ms first entry, 450ms replay). Wait for 160ms of scroll quiet before starting so it does not compete with anchor navigation or momentum. Enable group/icon hover movement only once the fade finishes. Rows remain fully opaque relative to their group with no separate animation. Earlier multi-stage slide/stagger descriptions are superseded.

Current Skills entrance correction: use one standard combined fade-up per heading/group, opacity 0→1 and translateY 24px→0 over 600ms. Return visits use 12px/400ms. Prepare off-screen, then animate to one settled target; no keyframe reset, nested row animation, or scroll-idle timer. Reduced-motion is immediately opaque with zero translation. This supersedes the opacity-only entrance; the scroll-settle hook was removed.

Typography refinement (Phase 4): use Source Code Pro throughout, matching the CV, with `var(--font-source-code-pro), monospace`. Self-host the Latin variable WOFF2 font with font-display: swap; CSS theme owns font tokens.

Hero typography sizing: size the headline against its text-column width (9cqi, bounded to 24–64px), keeping each phrase on one line at standard desktop and mobile widths with Source Code Pro. Preserve the explicit line break and highlight sweep.

Heading hierarchy refinement: section h2 headings scale from 22–32px, project h3 titles from 18–24px, and skill-category h3 headings from 18–20px. Keep lower levels smaller than the responsive hero; shared CSS classes own these scales.

Desktop project counter: use 12px non-wrapping text to keep “Project · 3 of 3” on one line within the navigation rail. Mobile status retains its existing sizing and wrapping.

Eyebrow typography: all section labels and project-status eyebrows display uppercase through shared CSS, including Featured project, Skills & tools, and Open-source personal project. Keep source content in its natural case.

Continuous-scroll project separators: below 1024px, show a 1px semantic-border divider between adjacent projects. No extra divider before the first project or on the sticky progress strip. Desktop chapter layout remains without project separators. This supersedes the earlier blanket removal of separators.

Shared heading scale trial: CSS theme tokens interpolate consistently from 320px to 1024px: H1 24–48px, H2 20–32px, H3 18–24px. Project and skill-category headings share H3 sizing/1.25 line-height; hero keeps 1.1 line-height and explicit phrase break. Supersedes column-relative H1 and independent category sizing.

Shared-scale verification: widen desktop hero text/image columns to 1.4fr/1fr so the 48px H1 remains two lines at 1024px. Verified one line per phrase at 320px and 390px mobile widths.

Desktop blueprint grid contrast: raise background grid opacity from 14% to 32% at widths >=1024px, keeping thin strokes, existing panel animation, and theme blue. Mobile grid remains unchanged pending a separate design direction.

Project entrance trial: each preview reveals once over 750ms, left-to-right on desktop (>=1024px), bottom-to-top below that breakpoint. Trigger at 20% preview visibility. The image stays still; a 48px blue rule beneath its title draws in synchronously. Shared per-project Motion controls connect title and preview; returning visits stay revealed. Text remains static, reduced motion immediately shows the completed preview/rule.

Project soft-focus revision supersedes clip reveals: enter from above (-24px) on initial load/downward scrolling, from below (+24px) on upward scrolling. Fade opacity 0→1, scale .98→1, desktop blur 4px→0; no mobile blur. First visit 700ms, subsequent visits 500ms. Re-arm only after the full preview leaves view; trigger at 15% visibility. Title rule shares the timing. Reduced motion shows everything immediately.

Project visibility refinement: start the soft-focus entrance at >=35% preview visibility after 120ms without scrolling, so smooth chapter navigation does not consume the animation. Increase travel to 48px, scale .95→1, desktop blur 6px→0, first-entry duration 1000ms/replay 700ms, with a gentler ease. Keep directional entry, full-exit rearming, static text and reduced-motion support.

Project timing correction: start immediately at 35% preview visibility while scrolling continues. Remove scroll-idle scheduling and all entrance timers. Keep the stronger 48px soft-focus entrance, 1000ms first visit/700ms replay, and full-exit rearming. Supersedes the previous scroll-settle delay.

Project/chapter synchronisation: cap preview and title-rule duration to the remaining active section-scroll duration. The scroll controller shares its deadline and completion/cancellation signal; active reveals settle exactly when navigation finishes. Native scrolling keeps the immediate viewport entrance. No delay or per-frame React state.

Project title cleanup: remove decorative blue title rules and their animation/component/CSS. Retain the synchronised directional soft-focus preview entrance.

Project-title pulse trial: stationary H3 text briefly transitions foreground→primary blue→foreground alongside the preview entrance. First visit up to 600ms, replay up to 400ms, capped by remaining reveal duration so it finishes with navigation. No underline, character cascade or layout movement. Reduced motion uses static foreground.

Title pulse correction: remove colour animation entirely. Once section navigation or native scroll ends, a fully visible project title makes one subtle scale pulse 1→1.018→1 over 420ms, retaining its normal text colour. Re-arm on a full title exit; no pulse during scrolling, no layout reflow, no reduced-motion pulse. Preview timing remains synchronised with section navigation.

Title pulse alignment: fit each H3 to its text width (constrained to its column) and scale from its centre. Keep resting text left-aligned; the pulse expands evenly around the title rather than extending only to the right.

## Blueprint guide line — Phase 4 trial

Add a decorative SVG guide line from hero to footer in the outer page gutter. It draws with whole-page scroll progress and retracts on reverse scroll, with a crosshair at the hero, a dimension/interface fragment at Work, a grid at Skills and a finished corner at the footer. Measured section positions drive right-angle route turns; resizing/content changes remeasure geometry. Keep the guide separate from project navigation with no labels/counts/dots. Replace the faint mobile hero illustration; preserve the desktop right-column blueprint. Theme blue at restrained visible contrast, pointer-inert and aria-hidden. Motion values handle scroll drawing without per-frame React state; reduced motion shows a static, quieter drawing.

Blueprint side alternation: hero starts on the left, Work runs down the right, Skills returns left, footer finishes right. Cross-page right-angle connections follow section boundary whitespace/dividers, never pass through copy. SVG geometry spans the page; fragment timings account for horizontal path distance as well as vertical distance.

Blueprint detail refinement: add repeated short 45-degree gutter jogs and distribute measurement ticks, dimension brackets and construction diamonds through longer section runs (roughly every 300px). Preserve alternating sides and cross-page section-boundary connections. Shared route geometry also calculates true diagonal/horizontal path lengths for fragment timing. Details remain decorative, scroll-linked and outside reading areas.

Blueprint viewport correction: replace whole-page percentage drawing with local SVG segment/fragment progress. Each begins drawing at 80% viewport height and completes at 35%, keeping motion visible at mobile and desktop heights. Cross-section connections now vary: stepped bevel at Work, angled shallow notch at Skills, double offset at Footer. Remove standalone Work/Skills/Footer section borders and mobile project dividers; preserve internal skill-group rules and navigation structure. Motion values still avoid per-frame React state; reduced motion remains static.

Blueprint continuity fix: render the guide as one continuous SVG path with a single drawing head. Map measured section/detail positions at 60% viewport height to cumulative path length; preserve on-screen drawing while preventing disconnected segments from appearing ahead. Angles, alternating sides and local fragment drawing remain.

Project availability badges: UNAFFI “Live”, FIMO “Ready to run”, Budgit “Personal use”. Place a compact, static text badge beside the title baseline, wrapping beneath long titles rather than squeezing them. Live uses the blue accent; other states use a quiet neutral surface. Keep editorial context (Featured project/Open-source personal project) separately above the title. JSON `status` uses the optional enum live/ready-to-run/in-development/prototype/personal-use/archived; `contextLabel` holds editorial text. A source-code link does not imply hosted availability. No animated status indicator.

Status alignment refinement: vertically centre the badge with the title rather than aligning their different text baselines. Maintain a 12px horizontal gap and left-align the badge when it wraps beneath a long title.

Blueprint fragment replacement: replace the tall nested dimension bracket with a compact registration square and short side ticks attached to the main route. This mark fades in with scrolling instead of independently drawing its strokes, keeping attention on the continuous guide.

Blueprint motif variation: expand the detail vocabulary to ten construction motifs (ruler ticks, survey target, arc, offset tiles, angle study, diamond, hatch, axes, steps and corner frame). Use varied 250–410px spacing and continue the sequence across sections instead of restarting a three-mark cycle. Replace the tiny registration square with a legible 16px circular survey target and crosshair. All secondary details now fade in as complete shapes, leaving stroke-drawing emphasis on the continuous main route.

Blueprint symbol correction: replace the arrow-axis motif with a small isometric construction tile. Mirror the footer’s nested corner geometry so its vertical edges sit on the right; move the upright checkmark inside the left side of that corner.

Integrated blueprint details: convert all ten in-between motifs into connected route geometry. The single drawing head traverses calibration notches, inspection loops, curved bends, offset chambers, angular folds and stepped runs; no separately fading symbols remain along the section gutters. Preserve the hero/Work/Skills/footer boundary marks and crossings. Path-length timing includes the integrated geometry.

Blueprint composition correction: remove all repeating inline motifs/jogs from the main guide; keep long calm gutter runs and varied cross-section turns. Reintroduce the ten blueprint symbols as separate fade-in details on the opposite outer margin, with varied spacing, size and deterministic outward offsets on wide screens. At mobile widths scale details to fit the reserved gutter; never scatter into content. Section boundary marks remain on the guide. This supersedes integrated line motifs.

Blueprint angle restoration: retain shallow 6px offsets with 45-degree bevels along longer gutter runs, matching the earlier technical-drawing character. Keep the varied section crossings and scattered outer-margin symbols; do not restore symbol-shaped inline excursions or zigzag graph motifs.

Blueprint bend variation: replace the fixed plateau on every run with stable irregular placement, 3–6px depths, differing directions, lengths and occasional two-level shoulders, plus some untouched straight runs. Keep transitions at 45 degrees and constrain all offsets to the outer gutters. Geometry remains deterministic across rerenders; no random reshuffling while scrolling.

Desktop blueprint studies: add sparse larger grid panels, dimensioned interface outlines, isometric constructions and arc studies in the outer margins at >=1024px. Scale them to the actual space outside the content container; alternate placement with varied scroll positions. Use quiet scroll-linked fades and static reduced-motion rendering. Mobile direction remains under review.

Desktop density/mobile simplification: fill desktop outer margins with a denser irregular mix of blueprint studies and small symbols, often on both sides. Vary scale, position and rotation within ±38° so orientation-sensitive details remain readable. Compute safe rotated bounding radii from available gutter width; no overlap with content. Seeded placement stays stable. Below 1024px remove all scattered decorations, keeping only the continuous guide and four section-boundary marks.

Blueprint repetition correction: replace repeated choices from a four-study/ten-symbol library with 32 individually composed blueprint drawings. Shuffle a deck without replacement and stop when exhausted; never repeat a composition on the page. Keep size/rotation/position variation and safe outskirts placement. Mobile selection confirmed: only section-transition connections and boundary marks, with no long vertical gutter guide or scattered decorations below 1024px.

Symbol-library revision: restore the earlier ten lightweight symbols and four original blueprint studies, with six complementary simple symbols, in a reusable 20-asset library. Scatter these with balanced usage rather than a fixed cycle. Repeated assets must be at least 1400px apart vertically and separated by eight other placements. Keep stable irregular rotations/scale and safe outer-margin bounds. Remove the superseded 32-composition library. Mobile remains section-transition details only.

Desktop density increase: expand the restored lightweight library from 20 to 32 symbols, preserving the earlier shapes. Reduce scatter intervals to irregular 75–135px runs and populate both margins more frequently. Keep repeat exclusion (1400px/eight placements), varied safe rotations and explicit collision checks. Mobile remains transition-only.

Hero symbol placement: add two sparse symbols within the desktop right column while preserving its animated blueprint. On mobile, place up to three symbols in measured whitespace above/below the entire copy/CTA block, omitting them if there is insufficient room. Keep non-hero mobile scattering disabled. Replace the raised central section-profile symbol with a bevelled frame. Hero details use the shared symbol library, gentle one-time fades and reduced-motion support.

Responsive desktop scattering refinement: reduce placements on laptop-width screens, with irregular 165–275px intervals and fewer paired left/right symbols. Wider outer margins allow somewhat more placements, but larger drawings reserve extra clear space. Broaden size variation: mostly smaller/medium symbols with occasional full-size accents. Preserve repeat exclusion, safe rotated bounds and collision checks; mobile and hero placement stay unchanged.

Mobile hero detail refinement: remove the survey target, replace its upper-right position with an arc, and add a smaller offset-tile detail above plus a hatched panel below. Show up to five varied symbols only where measured whitespace permits; preserve text/CTA clearance and existing sparse desktop hero details.

Mobile target removal correction: hide the separate hero-start crosshair from the global blueprint layer below 1024px as well as removing the survey-target hero decoration. Mobile hero contains no target/crosshair symbols; desktop start marker remains.

Mobile section-divider simplification: replace all animated guide/transition paths with static straight blue separators at Work, Skills and Footer boundaries. Add only two short irregular clusters of ruler ticks per divider, leaving most of each line clear. Remove all global section symbols below 1024px. Keep the separate decorative mobile hero symbols around the copy. Desktop guide and scattered symbols remain unchanged.

Blueprint guide weight: increase the desktop continuous guide from 1px to 2px. Keep decorative symbol strokes and mobile separator weights unchanged.

## Additional project — Little Clay Things

Append a generic project after Budgit: custom Shopify theme for handcrafted polymer-clay jewellery, keychains and fridge magnets. Status: In development; not launched. Describe Figma design and merchant-configurable sections/reorderable blocks at a high level. Stack: Shopify Liquid, Tailwind CSS, Alpine.js, BlazeSlider. Retain Code and Figma links plus a clearly labelled password-required development preview. Never store or publish the preview password in content, documentation, source or assets. Use the existing single-image placeholder until imagery is chosen. Ordered JSON drives the new fourth navigation item and all counts. Figma review unavailable due Starter-plan MCP limit; overview verified against the user-supplied README and authenticated storefront preview. Phase 4 remains under refinement; no later phase is started.

Preview access note: Little Clay Things preview link includes “Ask me for the password to access the preview.” Store this as optional link `note` data and render it beneath the relevant link through shared ProjectLinks. No public contact details or password are added.

First project image: use the supplied Little Clay Things storefront screenshot, encoded as a 1600×786 WebP (~78 KiB). Shared ProjectMedia keeps the browser chrome for both real images and placeholders. Display the full screenshot at its natural aspect ratio, without cropping or a second mobile image; retain explicit dimensions, descriptive alt text and lazy loading. Other projects keep their existing browser placeholders.

## Budgit phone showcase — approved exception to single screenshot

Budgit is mobile-only. Replace its browser placeholder with one phone-framed media area and five explicit view buttons: Overview, Transactions, Budgets, Members, New month. Use the five supplied screenshots, compressed to dimensioned WebP assets; preserve complete screens without cropping. Dashboard is the default. Show short capability captions below the phone. Select views with buttons and a 220ms crossfade; no autoplay, swipe interception or scroll-linked screen changes. Keep the old view until the next image decodes; latest click wins, failed loads retain the old view with a retry message. Reduced motion switches immediately. Controls wrap on mobile and retain keyboard focus/pressed state.

Optional JSON `showcase: { type: "phone", views: [...] }` configures this reusable presentation. Views include stable id, label, src, alt, dimensions and caption. A project may use browser media or a phone showcase, never both. Build-time validation checks IDs, assets and paths; browser validation dependencies remain excluded. The ordered project array and overview templates remain shared. All other projects retain their existing single browser-framed preview.

Phone OS framing: shared PhoneFrame adds decorative Android-style chrome outside each app screenshot: static 9:41 time, signal/Wi-Fi/battery indicators above, and back/home/recent-apps icons below. These simulated controls are aria-hidden and noninteractive; app navigation remains untouched. No real device state, notifications or extra timers.

FIMO preview image: use the supplied True Colours recipe calculator screenshot inside the shared browser frame. Preserve the full screenshot, including swatches, weight input, recipe and preparation instructions. Serve a dimensioned 1600px-wide WebP with descriptive alt text and lazy loading.

FIMO screenshot selection: replace the initial pastel-yellow image with the supplied pastel yellow-orange example showing a three-ingredient recipe. Keep the full screenshot and existing browser frame.

UNAFFI responsive preview: show the supplied sports-discovery desktop screenshot in the shared browser frame, with a smaller mobile screenshot overlaid at its lower-right in the shared Android-style phone frame. Preserve both full images and OS chrome; serve dimensioned lazy-loaded WebP assets. Optional `mobileMedia` data configures the reusable device-pair layout, requires one browser image and is incompatible with a phone showcase. Validate both asset paths and IDs at build time. This adds two device views within one preview area without pagination or duplicate mobile markup.

Little Clay Things mobile companion: add the supplied mobile storefront screenshot through `mobileMedia`, using the shared browser/Android-phone device-pair presentation. Keep the full mobile screenshot and existing desktop preview; serve a dimensioned lazy-loaded WebP. No new rendering component is needed.

Browser preview framing: neutral light-grey desktop browser chrome, with tab, window controls, back/forward/reload icons and a noninteractive address bar, independent of the portfolio theme. Little Clay Things mobile adds a compact browser address bar inside its Android phone frame. UNAFFI mobile and Budgit remain app-style OS-only previews. Browser addresses are content data; FIMO is labelled Local preview because it has no public deployment. Decorative chrome is aria-hidden and never acts as navigation.

Compact browser framing: reduce desktop chrome to roughly 37px and mobile browser chrome to 21px, retaining the address bar and browser cues while prioritising screenshot space.

Little Clay Things desktop browser tab title: “Little Clay Things - Shop”. Keep the storefront domain in the separate address bar; optional browserTitle content configures the tab independently.

Fullscreen previews: every screenshot opens a shared native modal dialog with fit-to-screen initial sizing, 1–5× zoom, wheel/pinch zoom, drag pan, double-click zoom/reset, keyboard +/−/0 and arrow panning. Escape/Close dismisses and restores trigger focus; native dialog traps focus and makes the page inert. Lock background scrolling. Show raw screenshots for inspection, without simulated device chrome. Budgit opens the currently selected screenshot. Preserve lazy loading in page previews and add no viewer dependency. Phase 4 refinement.

Preview affordance: shared screenshot trigger shows an expand icon and a subtle 15% black overlay on hover or keyboard-visible focus, with a 200ms colour/opacity transition (instant under reduced motion). Keep the icon visible on touch devices and the zoom cursor on pointer devices.

Preview hover refinement: explicitly layer a centred expand icon and 22% dim overlay above image/animation stacking contexts. Use shared CSS hover/focus-visible selectors; keep a small corner icon on touch.

FIMO desktop browser tab title: “FIMO True Colours - Recipe Calculator”. The address bar retains Local preview.

Budgit mobile showcase: place the wrapping labelled view selector above the phone; cap the whole phone at approximately 55svh by deriving its width from the screenshot ratio and subtracting OS/frame height. Preserve the complete image, tap-to-expand and the caption immediately below. Keep desktop phone/caption/selector ordering and dimensions. Share one selector and phone render across breakpoints.

Budgit mobile sizing refinement: increase the phone height budget from 55svh to 62svh for better readability, retaining the selector above, caption below, full screenshot and desktop dimensions.

Budgit short-desktop layout: at widths ≥768px and viewport heights ≤900px, move the shared selector above the phone and caption below. Bound phone height by 62svh and available viewport space (reserve 340px for header/section offset, controls, caption and gaps; minimum 240px). Tighten showcase gaps to 12px. Taller desktops retain the original larger presentation; mobile sizing remains unchanged.

Budgit laptop sizing correction: keep the selector above the phone, but remove the restrictive viewport-minus-340px budget. Allow the phone approximately 76svh (up to its existing desktop width cap). Prioritise a readable screenshot; the caption may require ordinary scrolling. Mobile dimensions remain unchanged.

Budgit short-desktop caption placement: show selector, then caption, then phone. Keep the larger phone dimensions; the explanation stays beside the controls instead of falling below the viewport. Mobile and tall-desktop ordering remain unchanged.

Budgit short-desktop phone height: reduce the allowance slightly from 76svh to 70svh to bring the bottom of the preview into view. Keep selector/caption above and mobile sizing unchanged.

Desktop phone-showcase navigation: add previous/next icon buttons beside the phone at widths ≥768px when multiple views exist. Reuse the existing decoded-image selection flow; wrap from last to first and first to last. Keep labelled selectors and captions synchronised, accessible button names, keyboard focus and 44px targets. Single-image companion phones do not show inactive arrows. Mobile layout remains unchanged.

Budgit automatic views: cycle every five seconds while at least half the showcase is visible. Pause on hover, keyboard focus, hidden tab or open fullscreen dialog; reduced-motion users get manual selection. Provide Pause/Play. Manual view selection stops autoplay until Play is chosen. Reuse decoded-image selection and clean up timers on exit/unmount.

Phase 4 preview maintenance: extract and test zoom/pan bounds, accounting for intrinsic image size on large viewports; clear cancelled pointer tracking; centralise manual showcase selection and name the autoplay interval. Wait for pending image decoding before scheduling another automatic change. Expand preview dispatch for readability. Preserve existing presentation, controls, content and responsive dimensions.

Remove the visible Play/Pause button as requested. Retain five-second automatic cycling, hover/focus/fullscreen/visibility pauses, reduced-motion support, and manual selection stopping autoplay for the mounted showcase. Arrows and labelled selectors remain.

Mobile separators: replace ruler tick clusters with continuous blue separators featuring a shallow offset and 45-degree corners. Vary the offset position, length and direction deterministically between sections. Retain section gap positioning, no mobile drawing animation or symbols; desktop blueprint line stays unchanged.

Mobile footer: compact left-aligned identity, then a full-width action row with GitHub left and Back to top right; copyright and smaller wrapping build credits below. Reduce stacked skills/footer spacing: skills bottom padding 32px, no footer top margin, footer content starts 40px below its boundary. Preserve room for the angled separator and existing desktop layout. No contact information added.

Desktop footer spacing: remove the additional footer top margin and reduce skills bottom padding to 40px; footer content starts 40px below its boundary. Keep desktop layout and blueprint separator clearance, with mobile spacing unchanged.

Header job title: “Frontend Developer | UI/UX Designer”. Keep the existing responsive header presentation.

Preview selection fix: disable text selection throughout browser/phone frames, showcase controls, screenshot triggers and the fullscreen portal, including descendants and WebKit support. Disable native screenshot dragging. Keep double-click zoom, pointer panning, focus and keyboard controls.

GitHub Pages setup (requested): add a checked build and Pages deployment workflow for portfolio pushes, using Node 24 and publishing only dist/. Deployment permissions are isolated to the deploy job; action revisions are pinned. See docs/DEPLOYMENT.md for Pages settings and environment branch access. Local workflow preparation is complete; no push, merge or publication performed, and hosted workflow/live verification remains pending. This does not complete the broader Phase 5 audit.

Temporarily hide UNAFFI’s Figma designs link; retain its Live site link and all other projects’ links. JSON does not support comments, so remove the entry from active content and retain its restoration URL here: https://www.figma.com/design/JBJeWjlsVfhJgrkoazlcdz/UNAFFI---Design-Library?node-id=591-54012
