# Current build references

Only the three current images are retained:

| Image | Purpose |
| --- | --- |
| `portfolio-desktop.png` | Complete desktop layout with a project progress rail |
| `portfolio-mobile.png` | Mobile direction with the sticky project status strip |
| `scroll-storyboard.png` | Project visual transitions and UNAFFI/FIMO/Budgit progress states |

For exact content and behaviour, follow `../SCROLL-STORYBOARD.md` and `../../PORTFOLIO_SPEC.md`. Figma is an older reference awaiting sync because its Starter MCP call limit was reached.

## Image generation

Generated and edited with the built-in image tool. Final prompt set:

- Desktop: preserve the white/CV-blue full-page product-overview design; add a slim sticky Selected work rail with UNAFFI/FIMO/Budgit anchors, active/completed/future states, current index/total, remaining projects, and actual section scroll progress. Keep rail out of hero/skills/footer.
- Mobile: preserve product summaries and stacked UNAFFI views; add a compact status strip reading “UNAFFI · 1 of 3” / “2 projects ahead”, with a thin progress line. It appears only within Selected work. Retain all projects, skill tags, and footer.
- Storyboard: preserve hero, UNAFFI discovery/management, FIMO recipe, Budgit budgets/savings, and responsive guidance; add all three project-progress states, showing completed checks, active names, remaining counts, anchor navigation, reverse-scroll updates, and reduced-motion behaviour.

## Implementation notes

These are visual concepts, not production screenshots or a working animation prototype. Actual project images remain to be selected. Do not infer product features, financial values, or proficiency claims from generated UI.

Follow the written specification where generated artwork drifts: mobile generic projects must stack image beneath description; skill rows and tags must remain legible; Backend uses a server-stack icon rather than the database-shaped mobile symbol; mobile hero blueprint is static at 5–8% opacity. Keep icons at the agreed top-right position within each skills group. Preserve copy and individual skill labels from the specification, not generated lettering.

The progress UI appears once in a full-page image to represent its sticky position. It persists alongside all three projects in the running site, then leaves before Skills. It counts projects, not internal visual states. Storyboard percentages are sample scroll positions, not equal-third project thresholds.

Superseded image variations have been removed from this folder. Original image-tool outputs remain outside the repository in the tool's generated-image storage.
