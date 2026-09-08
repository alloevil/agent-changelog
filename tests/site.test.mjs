import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  BEGIN_MARK,
  END_MARK,
  featureLine,
  loadData,
  PAGES,
  renderArchive,
  renderPage,
  spliceArchive,
} from '../scripts/render-static.mjs';

// The repository root IS the source of the publish root: .github/workflows/deploy.yml
// copies an explicit allowlist of files into _site/ and uploads that. sitemap.xml,
// robots.txt and the allowlist are all hand-maintained, so they drift the moment a
// project page is added (see "Add a new project" in the README). These tests fail
// loudly when that happens — including when a page is in the sitemap but missing
// from the allowlist, which would publish a sitemap pointing at a 404.
//
// Three things to know before editing any of them:
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
//
// 3. The changelog on openclaw.html / hermes.html is rendered into the committed
//    HTML by scripts/render-static.mjs, because the in-page render engine only
//    fills #changelog when JavaScript runs and most LLM crawlers do not run it.
//    The archive tests below re-run the renderer and fail if the committed pages
//    have drifted from the committed *_data.js files: run `npm run render`.

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://alloevil.github.io/agent-changelog/';

const rootHtml = () =>
  readdirSync(ROOT)
    .filter((f) => f.endsWith('.html'))
    .sort();
const read = (name) => readFileSync(join(ROOT, name), 'utf-8');
const sitemapLocs = () => [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

// The files deploy.yml stages into _site/, read straight out of its `for f in …`
// loop so the test tracks the workflow instead of a second copy of the list.
const stagedFiles = () => {
  const workflow = read('.github/workflows/deploy.yml');
  const loop = workflow.match(/for f in ([\s\S]*?); do/);
  assert.ok(loop, 'deploy.yml no longer stages an explicit file allowlist');
  return loop[1]
    .replace(/\\\s*\n/g, ' ')
    .trim()
    .split(/\s+/);
};

// Same stripping the crawl-text measurement uses: no <script>, no <style>, no tags.
const visibleText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

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

describe('deploy allowlist', () => {
  it('stages every HTML page at the repository root', () => {
    const staged = new Set(stagedFiles());
    for (const file of rootHtml()) {
      assert.ok(staged.has(file), `${file} exists at the root but deploy.yml does not stage it`);
    }
  });

  it('stages the data files the project pages load', () => {
    const staged = new Set(stagedFiles());
    for (const page of PAGES) {
      assert.ok(staged.has(page.data), `${page.data} is loaded by ${page.html} but not staged`);
    }
  });

  it('stages a file for every URL in the sitemap', () => {
    const staged = new Set(stagedFiles());
    for (const loc of sitemapLocs()) {
      const file = loc === ORIGIN ? 'index.html' : loc.slice(ORIGIN.length);
      assert.ok(staged.has(file), `sitemap lists ${file}, which deploy.yml does not stage`);
    }
  });
});

describe('static release archive', () => {
  for (const page of PAGES) {
    it(`${page.html} matches a fresh render of ${page.data}`, () => {
      const { changed } = renderPage(page);
      assert.equal(changed, false, `${page.html} is stale — run \`npm run render\``);
    });

    it(`${page.html} renders the archive exactly once, and re-rendering is a no-op`, () => {
      const html = read(page.html);
      assert.equal(html.split(BEGIN_MARK).length - 1, 1);
      assert.equal(html.split(END_MARK).length - 1, 1);

      const block = renderArchive(loadData(page), page);
      assert.equal(spliceArchive(html, block), html);
      assert.equal(spliceArchive(spliceArchive(html, block), block), html);
    });

    it(`${page.html} carries real version entries in the raw HTML`, () => {
      const text = visibleText(read(page.html));
      const data = loadData(page);
      const newest = data[0].releases[0];

      assert.ok(text.includes(newest.version), `${newest.version} missing from the raw HTML`);
      assert.ok(text.includes(newest.date), `${newest.date} missing from the raw HTML`);
      for (const feature of newest.features.slice(0, 5)) {
        const line = featureLine(feature);
        assert.ok(text.includes(line), `feature line "${line}" missing from the raw HTML`);
      }

      // Every month and every tracked version is reachable without JavaScript.
      for (const month of data) {
        assert.ok(text.includes(month.month), `${month.month} missing from the raw HTML`);
        for (const release of month.releases) {
          assert.ok(text.includes(release.version), `${release.version} missing from the raw HTML`);
        }
      }
    });
  }
});

describe('crawlable text', () => {
  // Measured before this pass: index.html 303 chars, openclaw.html 154, hermes.html 153.
  for (const file of ['index.html', 'openclaw.html', 'hermes.html']) {
    it(`${file} has at least 800 characters of text with script and style stripped`, () => {
      const length = visibleText(read(file)).length;
      assert.ok(length >= 800, `${file} has only ${length} characters of text`);
    });
  }
});

describe('portfolio backlink', () => {
  it('links index.html to the portfolio hub', () => {
    assert.match(read('index.html'), /<a href="https:\/\/alloevil\.github\.io\/projects\/">更多项目<\/a>/);
  });
});
