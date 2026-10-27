# Portfolio development rules

- Read `PORTFOLIO_SPEC.md` and `design/SCROLL-STORYBOARD.md` before changing product content or behaviour. Current build images live in `design/concepts/`; Figma is an older reference.
- Work on `portfolio`, one phase at a time. Do not merge, publish, or start later phases unless requested. Phases 1–3 are complete. Phase 4 is under active design refinement; do not start Phase 5 without instruction.
- No duplicated implementation: extract a focused component, hook, or utility when a pattern appears twice. Share rendering; keep product facts in data.
- Configure Tailwind in CSS (`src/styles/theme.css`), never a JavaScript/TypeScript Tailwind config. The Vite plugin only integrates the compiler.
- Follow the existing app/components/content/features/styles structure. Create folders when used, not as empty speculative architecture.
- All routine project additions use `src/content/projects.json`. The ordered array also drives navigation/counts. Add a component only for a new reusable presentation behaviour. Never put JSX, HTML, CSS classes, or executable content in JSON.
- `src/features/projects/schema.ts` is the single source of the project data contract and derived TypeScript types. Validation runs at build time; do not bundle Ajv or other content validation tools into browser code.
- Keep the production bundle lean. Do not import design/concept images, development tooling, backend dependencies, a router, or a UI framework into the app. Use dimensioned compressed media, selective Motion imports, and native scrolling. No per-frame React state updates.
- Keep product overviews high-level. UNAFFI discovery and management have equal weight. Budgit is an open-source personal project with Code and Figma links; no hosted-app claim. No public contact information.
- Respect reduced motion, keyboard navigation, semantic structure, visible focus, and static access to essential content.
- Run `npm run check`, `npm run build`, and `npm run size` for each implementation milestone. Add focused checks for nontrivial behaviour, not tests that only repeat JSX or static styles.
- Preserve README source content and existing user edits. Record phase completion and material limitations in the spec.
