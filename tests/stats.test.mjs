/**
 * stats.test.mjs
 * ----------------
 * The homepage cards state how many versions each tracked project has, and how
 * far back the data goes. Those numbers are hand-written in index.html while the
 * data lives in the *_data.js files, so they drift silently — index.html said
 * "32+ / 12" and "2026.1 / 2026.3" long after the files had 167 and 14 releases.
 *
 * This test reads both data files and fails when the cards stop matching them.
 * It also checks that each project's page loads the file this counts.
 */

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const INDEX = readFileSync(join(ROOT, 'index.html'), 'utf-8');

/** Evaluate a data file the way the browser does: it declares a const and exports it for Node. */
function loadData(file) {
  const source = readFileSync(join(ROOT, file), 'utf-8');
  const sandbox = { module: { exports: {} } };
  const fn = new Function('module', `${source}\nreturn module.exports;`);
  return fn(sandbox.module);
}

function statsOf(months) {
  const releases = months.flatMap((m) => m.releases);
  const dates = releases.map((r) => r.date).sort();
  return { releases: releases.length, first: dates[0], last: dates[dates.length - 1] };
}

describe('homepage cards match the data files', () => {
  const cases = [
    { file: 'openclaw_data.js', page: 'openclaw.html', name: 'OpenClaw' },
    { file: 'hermes_data.js', page: 'hermes.html', name: 'Hermes Agent' },
  ];

  for (const { file, page, name } of cases) {
    it(`${name}: card count and span come from ${file}`, () => {
      const stats = statsOf(loadData(file));
      assert.ok(stats.releases > 0, `${file} has no releases`);

      const card = INDEX.split(`<h2>${name}</h2>`)[1]?.split('</a>')[0];
      assert.ok(card, `no card for ${name} in index.html`);

      assert.match(
        card,
        new RegExp(`📦\\s*${stats.releases}\\s*版本`),
        `${name} card should say 📦 ${stats.releases} 版本 (from ${file})`,
      );

      // "2025.11 — 至今" covers the first release month of the file.
      const span = `${stats.first.slice(0, 4)}.${String(Number(stats.first.slice(5, 7)))}`;
      assert.ok(
        card.includes(`📅 ${span}`),
        `${name} card should start at ${span} (first release in ${file} is ${stats.first})`,
      );
    });

    it(`${name}: the page loads ${file}`, () => {
      const html = readFileSync(join(ROOT, page), 'utf-8');
      assert.ok(html.includes(file), `${page} should load ${file}`);
    });
  }
});
