# LCMBA site operations

## Current architecture

- Static Next.js export. The production files are generated in `out/`.
- No database, login, admin area, or server API.
- Public text, links, switches, and image paths live in `content/site-content.json`.
- Public images live in `public/`.
- Support and contact submissions link to owner-controlled Google Forms.

## Routine changes

Make and preview as many local changes as needed in the current checkout on `main`. Keep production unchanged until you explicitly request a release. When the batch is ready, commit it once.

## Release the batch

Ask Codex: `Release the current batch.` That request authorizes the standard release. No separate terminal, composer, approval phrase, branch, fork, or release task is needed.

Codex will push the exact approved local batch to `main`. GitHub Pages will publish it automatically. Codex will wait for it to finish and check the live website. The result will be either `LIVE` or `NOT DEPLOYED`, with the exact commit and any failed stage.

No separate deployment key, branch, fork, pull request, or hosting task is needed.

## Time-sensitive item

The endorsements section is enabled for the November 3, 2026 election. Immediately after the election, set `endorsements.endorse_show` to `no` as the next local batch and follow the release workflow above.
