# Agent Changelog

**Agent Changelog** is a derived, unofficial changelog tracker that turns the GitHub Releases of AI agent frameworks into a browsable month-by-month feed, for developers deciding whether and when to upgrade.

<p align="center">
  <img src="./assets/hero.svg" width="100%" alt="Agent Changelog — track version updates and evolution of AI agent frameworks like OpenClaw and Hermes Agent">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=white" alt="JavaScript" />
  <img src="https://img.shields.io/badge/license-MIT-00ccff?style=flat" alt="License" />
  <img src="https://img.shields.io/github/stars/alloevil/agent-changelog?style=flat&logo=github&color=yellow" alt="Stars" />
  <a href="https://alloevil.github.io/agent-changelog/"><img src="https://img.shields.io/badge/website-live-00ccff?style=flat" alt="Website" /></a>
</p>

<p align="center">
  <a href="https://alloevil.github.io/agent-changelog/">Website</a> ·
  <a href="#projects">Projects</a> ·
  <a href="#how-it-works">How It Works</a> ·
  <a href="#install">Install</a> ·
  <a href="#faq">FAQ</a>
</p>

---

## What it is

Agent Changelog tracks version updates for AI agent frameworks. It pulls releases from the GitHub Releases API, parses the `### Breaking` / `### Changes` / `### Fixes` sections out of each release body, tags every bullet, adds a short Chinese summary, and renders a clean, browsable HTML changelog grouped by month.

It is a **derived, unofficial** tracker: not published by, affiliated with or endorsed by the projects it tracks. The upstream release pages listed under [Projects](#projects) remain authoritative — when this site and an upstream release page disagree, the upstream page is correct.

The sync runs on **manual dispatch** (`.github/workflows/sync.yml` is `workflow_dispatch` only, semi-automatic mode), so the site is as fresh as the last sync and can lag upstream.

---

## Projects

| Project | Upstream source (authoritative) | Releases tracked | Months covered |
|------|------|--------|----------|
| **OpenClaw** | [openclaw/openclaw releases](https://github.com/openclaw/openclaw/releases) | 165 | 2025.11 — present |
| **Hermes Agent** | [NousResearch/hermes-agent releases](https://github.com/NousResearch/hermes-agent/releases) | 14 | 2026.7 — present |

Counts are read from the committed data files and go stale after every sync. Reproduce the current numbers with:

```bash
node -e 'const fs=require("fs");const d=new Function(fs.readFileSync("openclaw_data.js","utf8")+";return CHANGELOG_DATA")();console.log(d.length,"months",d.flatMap(m=>m.releases).length,"releases")'
node -e 'const fs=require("fs");const d=new Function(fs.readFileSync("hermes_data.js","utf8")+";return RELEASES_DATA")();console.log(d.length,"months",d.flatMap(m=>m.releases).length,"releases")'
```

A machine-readable version of these numbers, with the exact command that reproduces each, is published at [claims.json](https://alloevil.github.io/agent-changelog/claims.json).

---

## Preview

<details>
<summary><b>Click to expand screenshots</b></summary>

**Homepage** — project selection

![Homepage](assets/screenshot.png)

</details>

---

## How it works

```
  ┌──────────────────┐
  │  GitHub Releases │
  │  API (per repo)  │
  └────────┬─────────┘
           ▼
  ┌──────────────────┐
  │  Parse release   │
  │  notes & extract │
  │  Highlights      │
  └────────┬─────────┘
           ▼
  ┌──────────────────┐
  │  Generate HTML   │
  │  changelog pages │
  └────────┬─────────┘
           ▼
  ┌──────────────────┐
  │  GitHub Pages    │
  │  (auto-deploy)   │
  └──────────────────┘
```

---

## Project Structure

```
agent-changelog/
├── index.html          # Homepage (project selector)
├── openclaw.html       # OpenClaw Changelog
├── hermes.html         # Hermes Agent Changelog
├── openclaw_data.js    # OpenClaw release data
├── hermes_data.js      # Hermes release data
├── assets/             # Static assets (screenshots, etc.)
├── scripts/            # Build & sync scripts
├── skills/             # Skill-related files
└── .github/            # GitHub Actions (daily sync)
```

---

## Install

### Local preview

```bash
git clone https://github.com/alloevil/agent-changelog.git
cd agent-changelog
open index.html
```

Nothing needs to be installed to read the site — it is static HTML plus one data file per project, published from the repository root to <https://alloevil.github.io/agent-changelog/>.

### Working on the sync script

```bash
npm ci
npm test          # node --test tests/*.test.mjs
npm run check     # biome check scripts/
```

### Re-syncing from upstream releases

```bash
GITHUB_TOKEN=ghp_xxx node scripts/sync.mjs
```

`GITHUB_TOKEN` is optional; without it the script uses the unauthenticated GitHub API and is capped at 60 requests per hour. Setting `ANTHROPIC_BASE_URL` and `ANTHROPIC_AUTH_TOKEN` additionally enables the AI summary pass; with those unset the summary step is skipped and the sync still completes.

The sync writes `openclaw_data.js` and then re-renders the static release archive inside `openclaw.html` and `hermes.html`. After editing a data file by hand, re-render it on its own:

```bash
npm run render        # rewrite the archive in openclaw.html and hermes.html
npm run render:check  # exit 1 if a page has drifted from its data file
```

## Development

### Data format

Each project's data lives in a `*_data.js` file:

```javascript
const CHANGELOG_DATA = [
  {
    month: "2026 年 7 月",
    monthId: "2026-07",
    releases: [
      {
        version: "v2026.7.1",
        date: "2026-07-13",
        features: [
          {
            title: "Feature title",
            tag: "新增",  // 新增|优化|修复|安全|变更
            summary: "中文简述",
            detail: "English summary",
            summaryZh: "一句话中文摘要"
          }
        ]
      }
    ]
  }
];
```

### Add a new project

1. Create `newproject_data.js` with the data structure above
2. Create `newproject.html` (copy from an existing one)
3. Add entry to `index.html`
4. Update the sync script in `scripts/`
5. Add its URL to `sitemap.xml` and its files to the allowlist in `.github/workflows/deploy.yml`
6. Add the page to `PAGES` in `scripts/render-static.mjs` and run `npm run render`

## When to use it

- You want to see, grouped by month and in one page per project, what changed across OpenClaw or Hermes Agent releases instead of paging through the GitHub Releases feed.
- You read Chinese and want a one-line Chinese summary per change alongside the original English text.
- You want to scan for breaking changes and fixes by tag before upgrading.
- You want the underlying data as a plain JavaScript array you can load and query yourself, rather than scraping HTML or calling the GitHub API.

## When NOT to use it

- **You need the authoritative record.** This is a derived, unofficial mirror. For release artifacts, exact version tags, security advisories or anything you will act on, read the upstream release pages linked under [Projects](#projects).
- **You need it to be current.** The sync workflow is `workflow_dispatch` only, triggered by hand, so the site can lag upstream by any amount.
- **You need complete release notes.** Only bullets under the recognized `### Breaking` / `### Changes` / `### Fixes` headers are extracted, and each is condensed into a title plus summaries. Full bodies, release assets, contributor lists and commit ranges are not reproduced.
- **You need a framework other than OpenClaw or Hermes Agent.** Only those two are tracked; see [Add a new project](#add-a-new-project).
- **You need an API.** There is no endpoint; the data ships as static `*_data.js` files.

## FAQ

**Is Agent Changelog official?**
No. It is an independent, derived tracker and is not published by, affiliated with or endorsed by OpenClaw or Nous Research. Every entry originates from the public GitHub Releases of `openclaw/openclaw` and `NousResearch/hermes-agent`, which remain authoritative; where this site and an upstream release page disagree, the upstream page is correct.

**How current is the data?**
As current as the last sync, which is triggered manually — `.github/workflows/sync.yml` declares `workflow_dispatch` only, so nothing runs on a schedule. The honest answer at any moment is the month range actually present in the data files, which you can print with the commands under [Projects](#projects).

**Where does each entry come from?**
`scripts/sync.mjs` fetches releases through the GitHub API, splits each release body on its `### Breaking` / `### Changes` / `### Fixes` headers, maps each section to a tag (`Breaking`, `新功能`, `修复`), condenses each bullet into a title plus an English detail and a Chinese summary, then groups the result by month and writes it into that project's data file. Releases whose bodies do not use that structure yield fewer or no entries.

**Can I use the data programmatically?**
Yes. `openclaw_data.js` and `hermes_data.js` are committed plain-JavaScript files, each a single array of month objects shaped as in [Data format](#data-format), served as static assets from the site root. Note the variable names differ: the OpenClaw file defines `CHANGELOG_DATA` and the Hermes file defines `RELEASES_DATA`.

**How do I add another framework?**
Four steps, all in this repository: create `<project>_data.js` using the documented data structure, create `<project>.html` by copying an existing project page, add a card for it in `index.html`, and add its sync path in `scripts/`. Also add the new page's URL to `sitemap.xml`, since the site is published from the repository root and the sitemap is maintained by hand.

---

## Contributing

Contributions welcome! Especially:

- 📡 Add tracking for more AI agent frameworks
- 🎨 Improve the HTML/CSS design
- 🐛 Fix bugs in release note parsing
- 📖 Improve documentation

---

## License

[MIT](LICENSE)

---

<p align="center">
  <sub>⭐ Star this repo if you find it useful!</sub>
</p>
