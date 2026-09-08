import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

// The repository root IS the publish root: .github/workflows/deploy.yml uploads
// path '.' to GitHub Pages. sitemap.xml and robots.txt are hand-maintained, so
// they drift the moment a project page is added (see "Add a new project" in the
// README). These tests fail loudly when that happens.
//
// Two things to know before editing either file:
//
// 1. Our robots.txt is ADVISORY, not authoritative. The Robots Exclusion
//    Protocol is origin-scoped at the root path, and this site is a subpath of
//    alloevil.github.io, so compliant crawlers read
//    https://alloevil.github.io/robots.txt and never this repo's copy. Both the
//    Sitemap: directive and the Disallow: line here are advisory only; anything
//    that must actually be excluded has to be added to the origin's root
//    robots.txt, which lives in the alloevil/alloevil.github.io repository.
//    Keep this file anyway: it is the fleet convention, some tools and AI
//    crawlers do probe subpaths, and it becomes authoritative if this site ever
//    moves to its own domain.
//
// 2. The sitemap is PAGES ONLY. Assets — assets/screenshot.png, assets/hero.svg,
//    favicon.ico, the *_data.js files — all resolve 200 but are not pages, and
//    padding the sitemap with them dilutes it. Do not add them; the first test
//    below enforces this by comparing against *.html at the root and nothing else.

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://alloevil.github.io/agent-changelog/';

const rootHtml = () => readdirSync(ROOT).filter((f) => f.endsWith('.html')).sort();
const read = (name) => readFileSync(join(ROOT, name), 'utf-8');
const sitemapLocs = () => [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

describe('sitemap.xml', () => {
  it('lists every HTML page published from the repository root', () => {
    // index.html is canonicalized to the trailing-slash directory URL.
    const expected = rootHtml()
      .map((f) => (f === 'index.html' ? ORIGIN : ORIGIN + f))
      .sort();
    assert.deepEqual([...sitemapLocs()].sort(), expected);
  });

  it('lists no URL without a file behind it', () => {
    const onDisk = new Set(rootHtml());
    for (const loc of sitemapLocs()) {
      assert.ok(loc.startsWith(ORIGIN), `${loc} is not under ${ORIGIN}`);
      const rest = loc.slice(ORIGIN.length);
      if (rest === '') continue; // home, served by index.html
      assert.ok(onDisk.has(rest), `sitemap lists ${rest}, which does not exist at the root`);
    }
  });
});

describe('robots.txt', () => {
  it('points crawlers at the sitemap', () => {
    assert.match(read('robots.txt'), new RegExp(`^Sitemap: ${ORIGIN}sitemap\\.xml$`, 'm'));
  });
});
