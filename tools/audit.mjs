// Post-build check: every local href/src resolves, every page has the SEO
// basics, and no placeholder survived. Exits non-zero on failure.
import { readdir, readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const problems = [];
const warnings = [];
const note = (page, msg) => problems.push(`${page}: ${msg}`);
const warn = (page, msg) => warnings.push(`${page}: ${msg}`);

// The home page title and description are specified verbatim in the design
// handoff. They exceed Google's display width, which truncates them in search
// results but breaks nothing — warn rather than fail.
const SPEC_MANDATED_LENGTH = new Set(['index.html']);

// Search engines see decoded text, so measure lengths after unescaping —
// otherwise a single "&" counts as five characters.
const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–');

const exists = async (p) => {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
};

const files = (await readdir(dist)).filter((f) => f.endsWith('.html'));
const pageSet = new Set(files);
let checkedRefs = 0;

for (const file of files) {
  const html = await readFile(path.join(dist, file), 'utf8');

  // --- reference integrity ---
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|data:|#)/.test(ref)) continue;
    checkedRefs++;
    const clean = ref.split('#')[0].split('?')[0];
    if (!clean) continue;
    const target = path.join(dist, clean.replace(/^\//, ''));
    if (!(await exists(target))) note(file, `broken reference -> ${ref}`);
  }

  // --- internal page links point at pages that exist ---
  for (const ref of refs) {
    const m = /^\/([a-z0-9-]+\.html)$/.exec(ref);
    if (m && !pageSet.has(m[1])) note(file, `link to missing page -> ${ref}`);
  }

  // --- SEO / correctness basics ---
  const titleMatch = /<title>([^<]*)<\/title>/.exec(html);
  const title = titleMatch ? decode(titleMatch[1]) : '';
  if (!title.trim()) note(file, 'missing <title>');
  else if (title.length > 70) {
    (SPEC_MANDATED_LENGTH.has(file) ? warn : note)(
      file,
      `title is ${title.length} chars (>70, truncated in search results)`
    );
  }

  const descMatch = /<meta name="description" content="([^"]*)"/.exec(html);
  const desc = descMatch ? decode(descMatch[1]) : '';
  if (!desc.trim()) note(file, 'missing meta description');
  else if (desc.length > 165) {
    (SPEC_MANDATED_LENGTH.has(file) ? warn : note)(
      file,
      `description is ${desc.length} chars (>165, truncated in search results)`
    );
  }

  const h1s = [...html.matchAll(/<h1[\s>]/g)].length;
  if (h1s !== 1) note(file, `expected exactly one <h1>, found ${h1s}`);

  // --- alt text on every image ---
  for (const tag of html.match(/<img\b[^>]*>/g) || []) {
    if (!/\salt="/.test(tag)) note(file, `<img> without alt: ${tag.slice(0, 90)}`);
  }

  // --- forms ---
  for (const form of html.match(/<form\b[\s\S]*?<\/form>/g) || []) {
    if (!/name="access_key"/.test(form)) note(file, 'form missing access_key');
    if (/REPLACE_WITH/.test(form)) note(file, 'form still has the placeholder access key');
    if (!/name="botcheck"/.test(form)) note(file, 'form missing honeypot');
  }

  // --- leftovers from the design handoff ---
  if (/cdn\.durable\.co/.test(html)) note(file, 'still hot-links cdn.durable.co');
  if (/\.dc\.html/.test(html)) note(file, 'still links to a .dc.html design file');
  if (/YOUR_FORM_ID/.test(html)) note(file, 'leftover YOUR_FORM_ID placeholder');
  if (/\{\{/.test(html)) note(file, 'unrendered {{ template token }}');
}

console.log(`Audited ${files.length} pages, ${checkedRefs} local references.`);

if (warnings.length) {
  console.log(`
${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  ! ${w}`);
}

if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  process.exit(1);
}
console.log('No problems found.');
