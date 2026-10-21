import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const production = process.argv.includes('--production');
const productionUrls = ['https://lcmba.org', 'https://www.lcmba.org'];
const head = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const status = execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim();
const content = JSON.parse(readFileSync(join(root, 'content', 'site-content.json'), 'utf8'));
const localManifest = JSON.parse(readFileSync(join(root, 'out', 'release.json'), 'utf8'));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(status === '', 'Commit the complete batch before releasing.');
assert(localManifest.commit_sha === head, 'The local build does not match the current commit.');

async function fetchFresh(url) {
  const target = new URL(url);
  target.searchParams.set('release_check', Date.now().toString());
  const response = await fetch(target, { cache: 'no-store', redirect: 'follow' });
  assert(response.ok, `${target.origin}${target.pathname} returned HTTP ${response.status}.`);
  return response;
}

if (production) {
  for (const baseUrl of productionUrls) {
    const manifest = await fetchFresh(`${baseUrl}/release.json`).then((response) => response.json());
    assert(manifest.commit_sha === head, `${baseUrl} serves commit ${manifest.commit_sha}, expected ${head}.`);
    await Promise.all([fetchFresh(`${baseUrl}/`), fetchFresh(`${baseUrl}/support`)]);

    const bikeParkResponse = await fetch(`${baseUrl}/bike-park?release_check=${Date.now()}`, {
      cache: 'no-store',
      redirect: 'follow',
    });
    const expectedBikeParkStatus = content.site.bikepark_show === 'yes' ? 200 : 404;
    assert(bikeParkResponse.status === expectedBikeParkStatus, `${baseUrl}/bike-park returned HTTP ${bikeParkResponse.status}, expected ${expectedBikeParkStatus}.`);
  }
}

console.log(`${production ? 'Production' : 'Local release'} verification passed for commit ${head}.`);
