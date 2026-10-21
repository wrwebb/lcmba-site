import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const outDir = join(root, 'out');
const commit = execFileSync('git', ['rev-parse', 'HEAD'], {
  cwd: root,
  encoding: 'utf8',
}).trim();

const manifest = {
  schema_version: 1,
  commit_sha: commit,
};

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'release.json'), `${JSON.stringify(manifest, null, 2)}\n`);
