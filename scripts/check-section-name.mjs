// Runs after every build (`postbuild`). The section name is added by theme overrides in
// src/theme/: if a Docusaurus upgrade stops using them, the build still passes and the
// name just disappears, so check the generated pages and fail the build here instead.
import {existsSync, readFileSync} from 'node:fs';

const sections = JSON.parse(readFileSync('src/data/docSections.json', 'utf8'));
const markers = ['data-section-sidebar', 'data-section-breadcrumb'];
const errors = [];

for (const {label, pages} of sections) {
  for (const page of pages.map((route) => `build/${route}/index.html`)) {
    if (!existsSync(page)) {
      errors.push(`${page}: page not found`);
      continue;
    }
    const html = readFileSync(page, 'utf8');
    for (const marker of markers) {
      const tag = html.match(new RegExp(`<a[^>]*${marker}[^>]*>([^<]*)</a>`));
      if (tag?.[1] !== label) {
        errors.push(`${page}: no "${label}" link with ${marker}`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`Section name check failed, see the theme overrides in src/theme/:\n${errors.join('\n')}`);
  process.exit(1);
}
console.log(`Section name check passed for ${sections.length} sections.`);
