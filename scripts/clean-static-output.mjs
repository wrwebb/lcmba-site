import { readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const projectRoot = process.cwd();
const contentPath = join(projectRoot, 'content', 'site-content.json');
const content = JSON.parse(readFileSync(contentPath, 'utf8'));

if (content.site?.bikepark_show !== 'yes') {
  rmSync(join(projectRoot, 'out', 'bike-park.html'), { force: true });
  rmSync(join(projectRoot, 'out', 'bike-park.txt'), { force: true });
  rmSync(join(projectRoot, 'out', 'bike-park'), { recursive: true, force: true });
}
