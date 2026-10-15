#!/usr/bin/env node

/**
 * update-stats.mjs
 * ----------------
 * Rewrites every published release count (the two homepage cards in index.html
 * and the footer line in assets/hero.svg) and the cards' start month from the
 * data files, so the numbers can no longer drift behind a sync.
 *
 * Usage: node scripts/update-stats.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const PROJECTS = [
  { name: 'OpenClaw', file: 'openclaw_data.js' },
  { name: 'Hermes Agent', file: 'hermes_data.js' },
];

export function loadData(file) {
  const source = readFileSync(join(ROOT, file), 'utf-8');
  const sandbox = { module: { exports: {} } };
  const fn = new Function('module', `${source}\nreturn module.exports;`);
  return fn(sandbox.module);
}

export function statsOf(months) {
  const releases = months.flatMap((m) => m.releases);
  const dates = releases.map((r) => r.date).sort();
  return { releases: releases.length, first: dates[0] };
}

export function spanOf(firstDate) {
  return `${firstDate.slice(0, 4)}.${Number(firstDate.slice(5, 7))}`;
}

/** Rewrite one project's card (between its <h2> and the closing </a>). */
export function updateCard(html, name, stats) {
  const start = html.indexOf(`<h2>${name}</h2>`);
  if (start === -1) throw new Error(`no card for ${name} in index.html`);
  const end = html.indexOf('</a>', start);
  const card = html
    .slice(start, end)
    .replace(/📦\s*\d+\s*版本/, `📦 ${stats.releases} 版本`)
    .replace(/📅 \d{4}\.\d{1,2}/, `📅 ${spanOf(stats.first)}`);
  return html.slice(0, start) + card + html.slice(end);
}

export function updateHero(svg, counts) {
  return svg
    .replace(/OpenClaw \d+/g, `OpenClaw ${counts.OpenClaw}`)
    .replace(/Hermes Agent \d+/g, `Hermes Agent ${counts['Hermes Agent']}`);
}

export function main() {
  const indexPath = join(ROOT, 'index.html');
  const heroPath = join(ROOT, 'assets', 'hero.svg');
  let html = readFileSync(indexPath, 'utf-8');
  const counts = {};
  for (const { name, file } of PROJECTS) {
    const stats = statsOf(loadData(file));
    counts[name] = stats.releases;
    html = updateCard(html, name, stats);
  }
  writeFileSync(indexPath, html, 'utf-8');
  writeFileSync(heroPath, updateHero(readFileSync(heroPath, 'utf-8'), counts), 'utf-8');
  console.log(
    `Published counts: OpenClaw ${counts.OpenClaw}, Hermes Agent ${counts['Hermes Agent']}`,
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
