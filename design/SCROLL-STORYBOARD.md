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

Temporarily hide UNAFFI’s Figma designs link; retain its Live site link and all other projects’ links. JSON does not support comments, so remove the entry from active content and retain its restoration URL here: https://www.figma.com/design/JBJeWjlsVfhJgrkoazlcdz/UNAFFI---Design-Library?node-id=591-54012

Mobile project separators: use the same semantic border colour and thin rule as skill groups between adjacent projects below the desktop breakpoint. Apply through the shared list so future projects inherit the separation; no rule before the first or after the last project, and no desktop dividers. Retain existing project padding and scroll offsets.

Mobile project spacing: use 32px bottom padding before each divider and 24px top padding after it, matching the skills grid’s 32px gap and group’s 24px border-to-content inset. Preserve tablet and desktop spacing.

Little Clay Things links: remove the Code button as requested. Display only Figma designs and the password-required preview with its existing note. A repository URL in source background material does not imply a public portfolio link.
