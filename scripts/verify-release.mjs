import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const production = process.argv.includes('--production');
const repository = 'wrwebb/lcmba-site';
const head = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const status = execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim();
const localManifest = JSON.parse(readFileSync(join(root, 'out', 'release.json'), 'utf8'));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(status === '', 'Commit the complete batch before releasing.');
assert(localManifest.commit_sha === head, 'The local build does not match the current commit.');

function githubJson(endpoint) {
  return JSON.parse(execFileSync('gh', ['api', endpoint], { encoding: 'utf8' }));
}

if (production) {
  const [deployment] = githubJson(`repos/${repository}/deployments?environment=github-pages&per_page=1`);
  assert(deployment, `No GitHub Pages deployment exists for ${repository}.`);
  assert(deployment.ref === 'main', `GitHub Pages deployed ${deployment.ref}, expected main.`);
  assert(deployment.sha === head, `GitHub Pages deployed ${deployment.sha}, expected ${head}.`);

  const [deploymentStatus] = githubJson(`repos/${repository}/deployments/${deployment.id}/statuses`);
  assert(deploymentStatus, `GitHub Pages deployment ${deployment.id} has no status.`);
  assert(
    deploymentStatus.state === 'success',
    `GitHub Pages deployment ${deployment.id} is ${deploymentStatus.state}, expected success.`,
  );
}

console.log(`${production ? 'Production' : 'Local release'} verification passed for commit ${head}.`);
