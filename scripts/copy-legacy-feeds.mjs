// Feed readers do not follow the HTML redirects from /news to /blog:
// keep a copy of the blog feeds at the old /news address. Runs after `docusaurus build`.
import {copyFile, mkdir} from 'node:fs/promises';
import path from 'node:path';

const build = path.resolve('build');
await mkdir(path.join(build, 'news'), {recursive: true});
for (const file of ['rss.xml', 'rss.xsl', 'rss.css', 'atom.xml', 'atom.xsl', 'atom.css']) {
  await copyFile(path.join(build, 'blog', file), path.join(build, 'news', file));
}
console.log('Legacy feeds copied to build/news.');
