# LCMBA website workflow

This is a static public website. It has no database, login, admin area, or server API.

## Local changes

- Work in this checkout on `main`.
- Batch approved edits locally and preview them here.
- Use `http://localhost:4173` as the stable unpublished preview. Start it with `npm run preview:local`. If it is already running, rebuild with `npm run build` to refresh it.
- Do not create branches, worktrees, forks, pull requests, or separate release tasks.
- Keep production unchanged until the user explicitly asks to release the current batch.

## Production release

Use this procedure for every production release.

- An explicit request such as `Release the current batch` authorizes that procedure. Do not ask the user to repeat approval, find another composer, use a terminal, or start another task.
- Commit the approved batch directly to `main`, run `npm run release:check`, and push that exact commit to the `origin` repository owned by `wrwebb`.
- GitHub Pages deploys pushes to `main` through `.github/workflows/pages.yml`. Do not create branches, forks, pull requests, worktrees, release tasks, or alternate hosting releases.
- Wait for the GitHub Pages deployment to succeed, then run `npm run verify:production` once before reporting the release as live.
- On any failure, report `NOT DEPLOYED`, the local SHA, the production SHA, and the failed stage. Do not retry, create another task, or use another checkout unless the user explicitly directs it.
