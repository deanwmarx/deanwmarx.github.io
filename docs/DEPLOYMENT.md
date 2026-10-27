# GitHub Pages

The Pages workflow builds and deploys the `portfolio` branch. It uses Node 24,
installs the lockfile with `npm ci`, runs checks, builds Vite, reports bundle size,
and uploads only `dist/`. Generated output stays out of Git.

## One-time setup

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Commit and push `.github/workflows/deploy.yml` and the portfolio source to
   `portfolio`.
4. Open **Actions → Deploy portfolio to GitHub Pages** to follow the run.

If the `github-pages` environment restricts deployment branches, allow `portfolio`
under **Settings → Environments → github-pages**. Keep existing approval rules.

Successful deployment serves https://deanwmarx.github.io/. Vite's `base: '/'`
matches this user-site repository. No custom token or repository secret is needed.

Subsequent pushes to `portfolio` rebuild and deploy automatically. For a manual
run, use **Run workflow** and select `portfolio` (GitHub may only expose manual
dispatch after the workflow also exists on the default branch).

Local verification remains `npm run check`, `npm run build`, `npm run size`, then
`npm run preview` to inspect the generated site. Local checks do not deploy.

The workflow has been prepared locally; its first hosted run and live-site check
remain pending until the repository settings are configured and changes pushed.
