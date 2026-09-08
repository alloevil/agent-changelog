#!/usr/bin/env node

/**
 * render-static.mjs
 * -----------------
 * Renders the committed changelog data into a static, crawlable archive section
 * inside openclaw.html and hermes.html.
 *
 * Why this exists: both project pages build their changelog from JavaScript at
 * runtime (`#changelog` starts empty and is filled by the in-page render
 * engine), so a fetcher that does not execute JavaScript — which is most LLM and
 * answer-engine crawlers — sees a page with no changelog on it at all. The data
 * is committed as `*_data.js`, so there is no reason to render it at request
 * time: the archive is rendered into the committed HTML, which keeps what ships
 * identical to what the repository contains. tests/site.test.mjs re-runs this
 * renderer and fails if the committed pages have drifted.
 *
 * The archive is written between two marker comments and is replaced, never
 * appended, so running the renderer any number of times yields the same file.
 *
 * Usage:
 *   node scripts/render-static.mjs           # rewrite the archive in place
 *   node scripts/render-static.mjs --check   # exit 1 if any page is stale
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export const BEGIN_MARK =
  '<!-- BEGIN release-archive: rendered by scripts/render-static.mjs (npm run render) — do not edit by hand -->';
export const END_MARK = '<!-- END release-archive -->';

/** The generated block is inserted straight after the JS mount point, still inside <main>. */
const ANCHOR = '<div id="changelog"></div>';

export const PAGES = [
  {
    html: 'openclaw.html',
    data: 'openclaw_data.js',
    varName: 'CHANGELOG_DATA',
    project: 'OpenClaw',
    upstream: 'https://github.com/openclaw/openclaw/releases',
    upstreamLabel: 'openclaw/openclaw',
  },
  {
    html: 'hermes.html',
    data: 'hermes_data.js',
    varName: 'RELEASES_DATA',
    project: 'Hermes Agent',
    upstream: 'https://github.com/NousResearch/hermes-agent/releases',
    upstreamLabel: 'NousResearch/hermes-agent',
  },
];

// Mirrors TAG_MAP / CAT_ORDER in the in-page render engine, so a line in the
// archive carries the same label and the same colour a visitor sees above it.
const TAG_CLASS = {
  新功能: 'tag-new',
  新增: 'tag-new',
  优化: 'tag-opt',
  修复: 'tag-fix',
  安全: 'tag-break',
  变更: 'tag-opt',
  Breaking: 'tag-break',
};
const TAG_LABEL = { Breaking: 'BREAKING' };
const CAT_ORDER = ['Breaking', '安全', '新增', '新功能', '修复', '优化', '变更'];

export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * The one-line text for a feature. Identical to the string the in-page engine
 * puts in a compact row (`f.summaryZh || f.title`), so the static archive shows
 * the same words a human reads and never becomes a separate, hidden copy.
 */
export function featureLine(feature) {
  return feature.summaryZh || feature.title || feature.summary || '';
}

export function countFeatures(releases) {
  return releases.reduce((total, release) => total + (release.features?.length || 0), 0);
}

/** Group a release's features by tag, in the display order the page uses. */
export function groupByTag(features) {
  const groups = new Map();
  for (const feature of features || []) {
    const tag = feature.tag || '新功能';
    if (!groups.has(tag)) groups.set(tag, []);
    groups.get(tag).push(feature);
  }
  const known = CAT_ORDER.filter((tag) => groups.has(tag));
  const unknown = [...groups.keys()].filter((tag) => !CAT_ORDER.includes(tag));
  return [...known, ...unknown].map((tag) => [tag, groups.get(tag)]);
}

export function loadData(page) {
  const source = readFileSync(join(ROOT, page.data), 'utf-8');
  // Same way claims.json's repro commands read these files: they are plain JS
  // declaring one array literal, guarded so `module` may be undefined.
  const data = new Function(`${source}\n;return ${page.varName};`)();
  if (!Array.isArray(data)) {
    throw new Error(`${page.data} does not declare ${page.varName} as an array`);
  }
  return data;
}

export function renderArchive(data, page) {
  const releases = data.flatMap((month) => month.releases || []);
  const range =
    data.length > 1 ? `${data[data.length - 1].month} — ${data[0].month}` : (data[0]?.month ?? '');

  const out = [
    BEGIN_MARK,
    '<section class="ra" id="release-archive">',
    `<h2>${esc(page.project)} 全部版本归档</h2>`,
    `<p class="ra-intro">本站为 ${esc(page.project)} 收录的全部版本条目：${releases.length} 个版本、${countFeatures(releases)} 项变更，覆盖 ${esc(range)}。内容与上方交互式视图一致，但不依赖 JavaScript——按月份分组，点开任一月份即可读到该月每个版本的发布日期与逐条变更。</p>`,
    `<p class="ra-intro">数据同步自 <a href="${esc(page.upstream)}" target="_blank" rel="noopener">${esc(page.upstreamLabel)} 的 GitHub Releases</a>，由 <code>scripts/sync.mjs</code> 解析后写入 <code>${esc(page.data)}</code>。本站是非官方的衍生整理，不由 ${esc(page.project)} 发布或背书；上游发布页面为权威来源，两者不一致时以上游为准。</p>`,
  ];

  for (const [index, month] of data.entries()) {
    const monthReleases = month.releases || [];
    out.push(`<details class="ra-month"${index === 0 ? ' open' : ''}>`);
    out.push(
      `<summary>${esc(month.month)} <span>${monthReleases.length} 个版本 · ${countFeatures(monthReleases)} 项变更</span></summary>`,
    );
    for (const release of monthReleases) {
      const features = release.features || [];
      out.push(
        `<article class="ra-release"><h3>${esc(release.version)} <time datetime="${esc(release.date)}">${esc(release.date)}</time> <span>${features.length} 项变更</span></h3>`,
      );
      for (const [tag, items] of groupByTag(features)) {
        out.push(
          `<div class="ra-cat"><i class="feature-tag ${TAG_CLASS[tag] || 'tag-new'}">${esc(TAG_LABEL[tag] || tag)}</i><ul>`,
        );
        for (const feature of items) out.push(`<li>${esc(featureLine(feature))}</li>`);
        out.push('</ul></div>');
      }
      out.push('</article>');
    }
    out.push('</details>');
  }

  out.push('</section>', END_MARK);
  return out.join('\n');
}

/**
 * Put `block` into `html`: replace an existing archive if the markers are
 * already there, otherwise insert it after the mount point. Idempotent — the
 * markers are part of `block`, so a second call replaces what the first wrote.
 */
export function spliceArchive(html, block) {
  const begin = html.indexOf(BEGIN_MARK);
  const end = html.indexOf(END_MARK);
  if (begin !== -1 && end > begin) {
    return html.slice(0, begin) + block + html.slice(end + END_MARK.length);
  }
  if (begin !== -1 || end !== -1) {
    throw new Error('unbalanced release-archive markers — fix the page by hand first');
  }
  const at = html.indexOf(ANCHOR);
  if (at === -1) {
    throw new Error(`no ${ANCHOR} anchor and no archive markers to replace`);
  }
  const cut = at + ANCHOR.length;
  return `${html.slice(0, cut)}\n${block}${html.slice(cut)}`;
}

/** Render one page without writing it. */
export function renderPage(page) {
  const path = join(ROOT, page.html);
  const current = readFileSync(path, 'utf-8');
  const expected = spliceArchive(current, renderArchive(loadData(page), page));
  return { path, file: page.html, current, expected, changed: expected !== current };
}

export function renderAll({ check = false, log = () => {} } = {}) {
  const stale = [];
  for (const page of PAGES) {
    const result = renderPage(page);
    if (result.changed) {
      stale.push(result.file);
      if (!check) writeFileSync(result.path, result.expected, 'utf-8');
    }
    const state = result.changed ? (check ? 'STALE' : 'archive rewritten') : 'archive up to date';
    log(`  ${result.file}: ${state}`);
  }
  return stale;
}

const invokedDirectly =
  process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedDirectly) {
  const check = process.argv.includes('--check');
  const stale = renderAll({ check, log: console.log });
  if (check && stale.length > 0) {
    console.error(`stale static archive: ${stale.join(', ')} — run \`npm run render\``);
    process.exit(1);
  }
}
