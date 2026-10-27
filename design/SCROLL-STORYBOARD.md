# Product overview and scrolling design

Source: Dean's product workshop. This replaces the earlier research/design/build project narrative. Phase 4 is being refined, including scroll tracking and motion. Scene previews still use labelled placeholders; final imagery and timing refinement belong to Phase 5. Figma is awaiting this revision because its Starter MCP call limit has been reached.

## Rules for the whole page

- The product name, headline, overview, role, and project links must be readable without completing an animation or scrolling through a sequence.
- Movement illustrates what each product does; it must not become a long technical case study. Each project occupies a viewport chapter; UNAFFI retains its featured layout without a separate sticky media runway.
- Retain the white/CV-blue theme, unnumbered sections, latest skills icons, and footer without contact details.
- Keep native scrolling, anchor navigation, and reverse-scroll behaviour. Hero and individual projects now use native viewport scroll snap, released at Skills. Wheel/trackpad chapter navigation uses a controlled transition; touch stays native. No autoplay video or continuous decorative loops.
- Timing and progress ranges below are proposed implementation starting points, to be tuned with actual content and assets. They are not fixed claims about a working prototype.

## Navigation

**Content:** Dean Marx; Frontend developer subtitle on desktop; Work; Skills; GitHub. Mobile shows Dean Marx and Menu +.

**Desktop:** compact sticky header, grouped Work/Skills navigation, blue active-section indicator, separate GitHub button. Show neither section as active while fully within the hero. Work covers all projects; Skills becomes active at the skills section. Keep the indicator stable at section boundaries. Reserve header space and account for anchor offsets.

**Mobile:** normal-flow header; menu opens a simple vertical panel. Selecting an anchor closes it. Support Escape and predictable focus. Menu content is navigation, not part of the scroll animation.

## Hero

**Required content**

> Complex products. Simple experiences.
>
> I’m Dean, a frontend developer with 10 years of experience in website and app development. I design and prototype in Figma, then build—with user experience first.
>
> Explore my work ↓

**States:** arrival → assembled blueprint → transition toward work.

**Movement:** headline, paragraph, and action enter with a restrained stagger, 600–900ms total. Interface layers settle into a coherent blueprint. During the final part of the desktop hero scroll, layers separate gently, roughly 16–32px in different directions; text remains stable. The CTA works immediately.

**Mobile:** faint 5–8% blueprint behind the upper-right of the text, static and partially cropped. Do not put an opaque illustration alongside a narrowed paragraph.

**Assets:** lightweight editable SVG/CSS blueprint; no photography needed.

## Project progress navigator

**Purpose:** show where the visitor is within Selected work, how many projects are still ahead, and the overall scrolling progress. This does not count scenes within a project.

| Active project | Desktop rail | Mobile strip | Remaining |
| --- | --- | --- | --- |
| UNAFFI | UNAFFI blue/current; FIMO and Budgit muted | UNAFFI · 1 of 3 | 2 projects ahead |
| FIMO | UNAFFI checked; FIMO blue/current; Budgit muted | FIMO · 2 of 3 | 1 project ahead |
| Budgit | UNAFFI and FIMO checked; Budgit blue/current | Budgit · 3 of 3 | 0 projects ahead |

**Desktop:** narrow sticky rail beside the projects, with project-name anchor links, status text, and thin vertical progress line. Its sticky bounds are the project section; it does not remain beside skills/footer. The main page mockup shows the UNAFFI state once; the storyboard shows all three states.

**Mobile:** compact sticky white strip within the section, below the top edge of the viewport. Current project/count left, remaining count right, thin blue horizontal progress line underneath. Allow wrapping for future long project titles. The normal-flow main header can scroll away; do not stack two large sticky headers.

**Progress:** a continuously updating measure of actual scroll distance through the project section, not a fraction derived from project count. Illustrative storyboard samples around 15%, 65%, and 90% do not define activation thresholds. The line reaches the end only on completing the section. Clamp to 0–1 and recompute on viewport/content size changes. Omit sticky progress if the whole section fits on screen.

**Data:** use the registered project list for names, anchors, totals and index; `projectsAhead = total - activeIndex - 1`. Derive active project from a consistent viewport boundary. Preserve state through section gaps, jump navigation and upward scrolling. Completed checks represent current position rather than permanent read tracking.

**Access:** all desktop names are real links with visible focus/current states. Reserve layout space, account for sticky offsets when jumping, and do not cover project copy or controls. Give the line an accessible label. Announce active-project changes only, not per-frame progress. Reduced motion updates the same information without easing. Hide the navigator outside Selected work.

## UNAFFI — featured product overview

**Required content**

> UNAFFI
>
> Find opportunities to play. Manage the business behind them.
>
> A sports platform connecting people with facilities and activities, while giving businesses the tools to manage listings, schedules, bookings, memberships, and payments. People can discover and book sporting opportunities, or organise free community activities for others to join.
>
> My role: Product design & frontend development
>
> Live site ↗ · Figma designs ↗

Supporting stack: Svelte, SvelteKit, Tailwind CSS, Node.js, Express, MongoDB, Mailgun, Capacitor. Distinguish product stack from personal skill level.

### Visual state: Discover & play

**Caption:** Find facilities, book and pay, or join community activities.

**Visual:** a real sports discovery/listings screen, with an optional booking detail crop. Show discovery breadth rather than only a three-click booking flow. Free community activity can be represented by a genuine activity listing if available.

### Visual state: Manage your business

**Caption:** Manage listings, schedules, bookings, memberships, and payments.

**Visual:** a manager-portal schedule or listings view, with an optional membership detail crop. Approvals, refunds, and booking metrics are supporting context; avoid cramming every feature into one screenshot.

**Persistent supporting line:** Anyone can organise free community activities. Memberships can include service benefits such as free court bookings.

### Behaviour

**Desktop:** equal prominence and comparable time for the two audiences. The overview remains a compact text block, with two short capability labels/captions. The media stays sticky only within this section. Discovery is shown first; a short crossfade and small transform bring in management as the section passes through view. Suggested local sequence: first state through ~40%, transition around 40–60%, second state thereafter. If the available content is too short for a useful sticky interval, use a local viewport transition rather than adding empty scrolling space.

Do not add research/design/build chapters, hide essential copy, pin the whole screen, or force visitors to wait for links. A subtle unnumbered indicator is sufficient; it must not imply the user needs to complete steps.

**Mobile:** two stacked images and captions in ordinary document flow, in the same priority. Each receives a brief entrance at most. No side-by-side tiny screenshots and no sticky sequence.

**Assets needed:** sports frontend overview; manager-portal overview; optional authentic community/membership detail. Until selected, all imagery must be labelled as a concept.

**Content limits:** do not use internal Player/Playmaker terminology, name payment vendors, or claim exact recurring-billing/failure/renewal mechanics. Monthly/requested payouts are factual background but not required overview copy.

## FIMO — generic project

**Required content**

> FIMO Polymer Clay Colour Recipe Generator
>
> From colour inspiration to a precise mixing recipe.
>
> Turns the FIMO True Colours mixing guide into a personalised recipe card. Choose a target colour and total clay weight to get precise mixing quantities—removing manual calculations and guesswork, and helping creators reduce waste.
>
> Code ↗

Stack: Svelte, Tailwind CSS, html2canvas-pro.

**States:** target colour + total weight → component mixing quantities → downloadable recipe card.

**Visual:** a chosen colour swatch and weight input lead to a genuine recipe output. On entering the viewport, component swatches separate slightly and the recipe card appears with a small upward movement/crossfade. Prefer one 500–800ms entrance sequence; if scroll-linked, bind it only to the image's passage through the viewport. No pinning or invented extra case-study chapters. Do not display fabricated ratios or gram values as actual tool output.

**Mobile:** same overview followed by a static final recipe composition or one brief reveal, then stack and Code link. Colour must not be the only way to identify recipe ingredients.

**Assets needed:** real colour/weight selection and downloadable recipe card. Clay imagery is optional supporting decoration. Avoid implying guaranteed zero waste.

## Budgit — generic project

**Required content**

> Budgit · Open-source personal project
>
> A clearer picture of household spending and savings.
>
> A personal finance app built around how I manage household money. It categorises income and expenses, tracks monthly budgets, and compares projected savings with actual savings after unexpected costs.
>
> Multiple households · Shared contributions · Flexible budget cycles · Backup & restore
>
> Built for my own household finances, and open source for anyone who wants to adapt it to theirs.
>
> Code ↗ · Figma designs ↗

Stack: Svelte, SvelteKit, Tailwind CSS, Capacitor, SQLite. No live-app link or hosted-service claim.

**States:** monthly budget progress → projected versus actual savings.

**Visual:** start with recognisable budget progress, then bring in a paired savings comparison. This should explain the impact of unexpected costs, rather than switching between generic bar charts. Use actual anonymised screens or clearly labelled illustrative data; never show private household finances. Progress rings can animate once on entry using SVG strokes; savings cards use opacity/transforms. Budget completion percentages are product data, separate from the prohibition on numeric skill ratings.

**Desktop:** short local 500–800ms sequence or viewport-linked crossfade without pinning. Keep both comparison labels available in the final state. No looping bars or mandatory hover interaction.

**Mobile:** static combined budget/savings composition, with one optional entrance. Keep labels legible and stack/code/design links visible.

**Assets needed:** anonymised monthly budget overview and projected/actual savings comparison. Optional household selector crop if it supports the overview.

### Verified background, not additional page sections

Expense categories: Variable (budgeted groceries/fuel/utilities), Incidental (unplanned spending), Fixed (regular subscriptions/rent/insurance). Income categories: Salary, Once-off, Interest. Variable expenses have configurable budgets and progress indicators. Projected savings excludes incidental costs; actual savings includes them. Multiple households can contain multiple contributing members. Each household can set a budget-cycle start day and warning/danger thresholds. Backup/restore supports local and Google Drive JSON exports of SQLite data. Preserve these facts for future copy; do not turn them into a feature manual on the portfolio.

## Skills

**Content:** “Skills & tools” / “The craft behind the interface.” Frontend and UX first, AI-assisted development next, Backend then QA. Keep the agreed skill inventory and Core/Confident/Working knowledge tags; final individual labels still need review. Icons: code window, wireframe/cursor, single sparkle, server stack without arrows, clipboard check.

**Movement:** short group entrances, roughly 200–350ms, at most a small stagger. No sticky section, rotating skill clouds, counters, progress bars, or hidden skill content. Mobile stacks groups; reduced motion is immediately static.

## Footer

**Content:** Dean Marx; Frontend development & product design; GitHub; Back to top; copyright; “Built with React, TypeScript, Vite, Tailwind CSS & Motion.”

**Behaviour:** static closing section. Back to top is a real anchor; any smooth scrolling respects reduced motion. No public contact details or contact invitation.

## Accessibility and performance for every sequence

- Reduced motion: show complete, useful content immediately, including both UNAFFI product views in document flow. No hero separation, scrubbing, stagger, or animated charts.
- Summary, links, and captions remain real HTML, not text baked into images. Never make understanding dependent on animation, hover, colour, or precise scroll position.
- Use CSS sticky for desktop preview positioning, Motion for local opacity/transforms, and IntersectionObserver for active states where practical. Avoid per-frame React state updates.
- Images have dimensions and responsive compressed sources. Lazy-load below-the-fold media. No heavy global animation engine, video background, or WebGL dependency.
- Reverse scrolling returns predictably to the previous visual. Anchor jumps, keyboard scrolling, browser back/forward restoration, and viewport resizing must preserve readable states.

## Figma application checklist — pending access

1. Keep the existing hero, latest navbar, skills, footer, and icons; do not recreate unrelated design work.
2. Replace UNAFFI research/design/build chapters on desktop, mobile, and storyboard with the compact overview and two equal product views above.
3. Replace FIMO overview and storyboard captions with the manual-math-to-personalised-recipe story.
4. Replace generic Budgit analytics preview with budget progress and projected/actual savings. Preserve Code and Figma links and add the open-source personal-project status.
5. Expand the storyboard to cover navigation, hero, all three projects, skills, footer, mobile, and reduced-motion behaviour, with required text/assets beside each state.
6. Verify readable text, matched audience prominence, no clipping, no fabricated product metrics, no exposed financial/contact data, and no research/design/build narrative remaining in the product summaries.

Latest chapter behaviour and verification are recorded in `PORTFOLIO_SPEC.md`, under “Phase 4 revision — viewport chapters”. Oversized chapters remain readable; reduced-motion disables snapping.

Phase 4 timing revision: wheel/trackpad transitions between fitting chapters take 1.15 seconds with cubic-bezier easing (.65, 0, .35, 1). Trailing wheel momentum is suppressed during the transition. Tall chapters scroll naturally within their content. Pointer, keyboard, resizing and reduced-motion preference changes cancel an active transition. Anchor links use the same gentle 1.15-second transition, cancelling any previous transition; reduced-motion navigation stays immediate. Native touch snap timing remains browser-controlled. Verified hero-to-UNAFFI landing and Skills navigation with normal scrolling released.

Link-navigation correction: the earlier “no smooth scroll” message was an observation of the bug, not a request for instant links. Internal anchors now share the wheel transition, update the URL without a native jump, wait for mobile menu closure before measuring, and focus the destination at completion without scrolling it again. Modified clicks retain native behaviour.

## Current media direction — single preview per project

Latest direction supersedes the image sequences above: one static project preview on all screen sizes, with a placeholder until selected. A single composite may cover multiple capabilities. No scene swaps, pagination or hidden mobile image variants. Chapter navigation and project progress remain.

Project chapters use whitespace rather than separator rules. The sticky mobile progress strip has no outer borders, leaving only the actual progress track. Retain measured strip-height clearance plus 16px to protect project headings.

Landing-spacing refinement: reduce extra mobile/tablet clearance above project chapters from 16px to 4px beyond the measured progress strip. Project vertical padding is 20px on phones and 32px on tablets (desktop remains 56px). This supersedes earlier 16px clearance notes; viewport chapter sizing and readable sticky-strip clearance remain.

Project alignment: top-align chapter content instead of vertically centring shorter projects. Desktop chapter padding and sidebar sticky position share the 56px content inset below the header; remove the sidebar’s additional vertical padding. The first chapter and sidebar retain their shared 112px inset for the Selected work heading.

Desktop project progress is integrated into the navigation list: a thin vertical track connects the project markers, with measured scroll progress filling it blue. Current project uses a blue dot and earlier projects show checks. Remove the standalone bar below the list. Keep current/total and remaining counts above; mobile retains its horizontal strip.

Theme refinement: support system-default Light/Dark themes using semantic CSS tokens. Desktop theme selector sits in the header; mobile selector is inside Menu. Dark surfaces use charcoal and near-black with blue accents; chapter navigation, focus and reduced-motion behaviour remain available in either theme.

Theme-control refinement: replace the select with a transparent icon button in the desktop and mobile header. Show sun in light mode and moon in dark mode, with an accessible action label for switching to the opposite theme. Default still follows the system until the first explicit toggle; toggles persist the chosen light/dark override. The dropdown/System-reset UI is removed.

Work-entry regression fix: Selected work heading is now the explicit first Work snap stop; the first article no longer competes as another snap point. Wheel chapter targets and first-project links resolve to the Work introduction through a shared destination helper, while later projects retain their own offsets. This prevents native snapping from overriding the Explore my work landing. Regression checks cover first-project mapping, reordering and unchanged later/Skills targets. Mobile browser check confirms the heading remains visible at 25px after link-animation completion.

Mobile menu control: a transparent 44px icon button replaces the labelled Menu/Close box. Three hamburger strokes transform into a cross over 280ms using transform/opacity; reduced motion switches immediately. Accessible Open menu/Close menu labels, aria-expanded/controls, Escape focus return and close-on-navigation remain.

Icon consistency: animated menu strokes now use the same shared SVG frame as sun/moon and the other icons (32px viewBox, 1.6 stroke, rounded caps/joins), displayed at 24px. Both header controls use the same muted resting colour and blue hover. Hamburger-to-cross morph and reduced-motion support remain.

Mobile navigation now opens as a compact absolute-positioned overlay below the header, replacing the inline expanding panel. Opening/closing does not change header/hero dimensions or scroll offsets. Use a 200ms fade/8px entrance with reduced-motion support, a themed surface and subtle shadow. Dismiss on link selection (including GitHub), outside pointer, Escape (returns focus), tabbing outside the header, or switching to desktop. Hidden mobile navigation is inert and excluded from assistive technology; desktop navigation remains in flow. No body scroll lock or modal focus trap.

Mobile scrolling decision: disable native snap and custom wheel/boundary-triggered section transitions on mobile/tablet and touch-first devices. Chapter snapping is restricted to widths >=1024px with a fine pointer and hover. Mobile retains smooth explicit anchor navigation, progress tracking and readable section spacing; scrolling upward from Skills no longer triggers an automatic return on mobile. This supersedes earlier mobile snap requirements.

Link interaction refinement: shared ActionLink renders SVG down/up/external arrows. Hover and keyboard focus nudge arrows 3px in their navigation direction; pressing advances them 6px with subtle 0.98 scale feedback and eased return. Colour/underline changes transition over 200ms. Reduced-motion removes transforms. Every ExternalLink opens in a new tab with noopener/noreferrer and an accessible new-tab hint; internal section links keep existing smooth in-page navigation. Footer back-to-top uses the same icon treatment.

## Stronger hero and skills motion — Phase 4 refinement

- Hero blueprint panels assemble from visibly separated positions (up to 64–77 SVG units), staggered over roughly 1.1s. Desktop fine-pointer hover separates layers further and applies spring-smoothed tilt, up to about 4.5 degrees. No continuous loop. Mobile keeps its faint background treatment and entrance without pointer tilt.
- The blue headline phrase receives one 1.5-second highlight sweep on its first entry only. Supporting copy stays steady; text is never hidden pending animation.
- Skill groups reveal upward by 32px over 600ms, staggered as they become visible. Hover raises a group 4px, strengthens its blue accent, and tilts/scales its icon. Individual rows get a blue inset accent and tinted surface; labels stay in place.
- A shared IntersectionObserver entry policy only re-arms after the entire section exits. Returning hero uses an 18px/420ms settle; returning skills use a 14px/360ms lighter stagger. Partial scroll movements never re-arm. Below-fold skill groups wait for their own visibility, without hidden content while waiting.
- Reduced-motion removes movement and the headline sweep; skill hover colour feedback remains. No per-frame React state for pointer motion: use Motion values/springs.
- Validation: entry-policy regression covers the visibility threshold, partial exits, full exits and repeated returns. Browser observed second-entry counts for both sections, unchanged Skills count after partial scrolling, working pointer tilt/card feedback and no 390px overflow or console warnings/errors. Checks, production build and size report pass. OS reduced-motion emulation remains unavailable; preference guards and CSS static fallbacks are implemented.

Skills entrance sequencing: Motion reveals the heading first (20px/450ms), then Frontend/UX with a 70ms stagger. Each group approaches from 24px over 500ms; its skill names and tags follow together with 40ms row staggering. AI enters as one panel before its rows. Lower groups wait for their own visibility. Re-entry uses half-distance, shorter heading/group motion; individual rows do not replay. Complete section exit is still required to re-arm. No scale/blur on text, no hidden content while waiting, and reduced-motion uses static variants/CSS.

Skills double-jump fix: prepare heading/group starting positions on initial mount and only reset after the entire section is off-screen. Enter animations now target a single settled value, rather than keyframes that reset already-visible content. Rows use opacity-only first-entry staggering with no independent vertical movement; replays keep rows fully opaque. A shared armed state synchronises preparation with section exit. This supersedes the earlier vertical row stagger.

Skills fade simplification: replace all Skills entrance translations and nested row fades with one gradual opacity-only fade per heading/group (850ms first entry, 450ms replay). Wait for 160ms of scroll quiet before starting so it does not compete with anchor navigation or momentum. Enable group/icon hover movement only once the fade finishes. Rows remain fully opaque relative to their group with no separate animation. Earlier multi-stage slide/stagger descriptions are superseded.

Current Skills entrance correction: use one standard combined fade-up per heading/group, opacity 0→1 and translateY 24px→0 over 600ms. Return visits use 12px/400ms. Prepare off-screen, then animate to one settled target; no keyframe reset, nested row animation, or scroll-idle timer. Reduced-motion is immediately opaque with zero translation. This supersedes the opacity-only entrance; the scroll-settle hook was removed.
