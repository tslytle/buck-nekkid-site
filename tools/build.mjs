// Static site build: renders src/ + public/ into dist/.
// No dependencies — Node built-ins only, so a Cloudflare Pages build cannot
// fail on an install step.

import { cp, mkdir, rm, writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import path from 'node:path';

import { products, FORM_ACCESS_KEY, ORIGIN } from '../src/site.mjs';
import { setAssets } from '../src/assets.mjs';
import { homePage, productPage, thanksPage, notFoundPage } from '../src/pages.mjs';

const fingerprint = (contents) =>
  createHash('sha256').update(contents).digest('hex').slice(0, 8);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const write = async (relPath, contents) => {
  const target = path.join(dist, relPath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, contents, 'utf8');
  return { relPath, bytes: Buffer.byteLength(contents) };
};

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0b2a52"/>
  <path d="M6 44c5 0 5-4 10-4s5 4 10 4 5-4 10-4 5 4 10 4 5-4 10-4" fill="none" stroke="#4fc3f0" stroke-width="4" stroke-linecap="round"/>
  <path d="M6 54c5 0 5-4 10-4s5 4 10 4 5-4 10-4 5 4 10 4 5-4 10-4" fill="none" stroke="#4fc3f0" stroke-width="4" stroke-linecap="round" opacity=".6"/>
  <text x="32" y="30" font-family="Georgia, serif" font-size="26" font-weight="700" fill="#ffcb2b" text-anchor="middle">BN</text>
</svg>
`;

function sitemap(urls) {
  const body = urls
    .map((u) => `  <url>\n    <loc>${ORIGIN}${u.loc}</loc>\n    <priority>${u.priority}</priority>\n  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

async function main() {
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });

  const written = [];

  // Fingerprint the CSS and JS first — the pages need their hashed names, and
  // the hash is what lets these be cached immutably without hiding a deploy.
  const css = await readFile(path.join(root, 'src/styles.css'), 'utf8');
  const js = await readFile(path.join(root, 'src/main.js'), 'utf8');
  const cssName = `styles.${fingerprint(css)}.css`;
  const jsName = `main.${fingerprint(js)}.js`;
  setAssets({ css: `/${cssName}`, js: `/${jsName}` });

  written.push(await write(cssName, css));
  written.push(await write(jsName, js));
  written.push(await write('favicon.svg', favicon));

  // Pages (rendered after setAssets so they reference the hashed filenames)
  written.push(await write('index.html', homePage()));
  for (const p of products) {
    written.push(await write(`${p.slug}.html`, productPage(p)));
  }
  written.push(await write('thanks.html', thanksPage()));
  written.push(await write('404.html', notFoundPage()));

  // SEO
  written.push(
    await write(
      'sitemap.xml',
      sitemap([
        { loc: '/', priority: '1.0' },
        ...products.map((p) => ({ loc: `/${p.slug}.html`, priority: '0.8' })),
      ])
    )
  );
  written.push(
    await write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`)
  );

  // Cache policy. The CSS and JS carry a content hash in their filename, so
  // they can be cached forever — a change produces a new URL. Everything
  // unfingerprinted (HTML, images) must revalidate, otherwise a deploy stays
  // invisible to anyone who already has the old copy.
  written.push(
    await write(
      '_headers',
      [
        '/styles.*.css',
        '  Cache-Control: public, max-age=31536000, immutable',
        '',
        '/main.*.js',
        '  Cache-Control: public, max-age=31536000, immutable',
        '',
        '/images/*',
        '  Cache-Control: public, max-age=3600, stale-while-revalidate=86400',
        '',
        '/*.html',
        '  Cache-Control: public, max-age=0, must-revalidate',
        '',
        '/*',
        '  X-Content-Type-Options: nosniff',
        '  Referrer-Policy: strict-origin-when-cross-origin',
        '  X-Frame-Options: SAMEORIGIN',
        '',
      ].join('\n')
    )
  );

  // Static copies
  await cp(path.join(root, 'public'), dist, { recursive: true });

  const pages = written.filter((w) => w.relPath.endsWith('.html'));
  const total = pages.reduce((n, p) => n + p.bytes, 0);
  console.log(`Built ${pages.length} pages into dist/ (${(total / 1024).toFixed(0)} KB of HTML)`);
  for (const p of pages) {
    console.log(`  ${p.relPath.padEnd(26)} ${(p.bytes / 1024).toFixed(1).padStart(6)} KB`);
  }

  if (FORM_ACCESS_KEY.startsWith('REPLACE_WITH')) {
    console.log(
      '\n  ⚠  Web3Forms access key is still a placeholder — forms will not deliver.\n' +
        '     Set it in src/site.mjs (or the WEB3FORMS_KEY env var) before going live.'
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
