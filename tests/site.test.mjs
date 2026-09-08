import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

// The repository root IS the publish root: .github/workflows/deploy.yml uploads
// path '.' to GitHub Pages. sitemap.xml and robots.txt are hand-maintained, so
// they drift the moment a project page is added (see "Add a new project" in the
// README). These tests fail loudly when that happens.

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
