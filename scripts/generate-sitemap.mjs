// Generates public/sitemap.xml from the component catalog and example sites.
// Run: npm run sitemap (also runs automatically as part of build:app).
// Parses the data modules with regexes so no TS toolchain is needed.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_URL = 'https://rite.fargone.sh';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const componentsSrc = readFileSync(join(root, 'src/data/components.ts'), 'utf8');
const names = [...componentsSrc.matchAll(/^\s*c\('([^']+)'/gm)].map((m) => m[1]);

const examplesSrc = readFileSync(join(root, 'src/data/examples.ts'), 'utf8');
const siteIds = [...examplesSrc.matchAll(/^\s*id:\s*'([^']+)'/gm)].map((m) => m[1]);

const urls = [
  { loc: `${SITE_URL}/`, changefreq: 'weekly', priority: '1.0' },
  { loc: `${SITE_URL}/examples`, changefreq: 'weekly', priority: '0.8' },
  ...siteIds.map((id) => ({
    loc: `${SITE_URL}/examples/${encodeURIComponent(id)}`,
    changefreq: 'monthly',
    priority: '0.7',
  })),
  ...names.map((name) => ({
    loc: `${SITE_URL}/c/${encodeURIComponent(name)}`,
    changefreq: 'monthly',
    priority: '0.6',
  })),
];

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join('\n') +
  `\n</urlset>\n`;

writeFileSync(join(root, 'public/sitemap.xml'), xml);
console.log(`sitemap.xml: ${urls.length} urls (${names.length} components, ${siteIds.length} example sites)`);
