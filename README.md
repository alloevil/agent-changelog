<p align="center">
  <img src="./assets/hero.svg?v=20260915c" width="100%" alt="Agent Changelog — track version updates and evolution of AI agent frameworks like OpenClaw and Hermes Agent">
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
  <a href="#development">Development</a>
</p>

---

## What it does

Agent Changelog tracks version updates for major AI agent frameworks. `scripts/sync.mjs` pulls OpenClaw's GitHub Releases, parses the Highlights section out of the release notes and rewrites `openclaw_data.js` — the data file the pages load; the pages themselves are static HTML/CSS/JS.

**The sync is manual, not scheduled.** There is no cron anywhere in this repo: run the `Sync Changelog` workflow (`workflow_dispatch`) or the `skills/sync-openlaw` skill, then commit — GitHub Pages deploys on push. Hermes has no fetch script at all; its `hermes_data.js` is maintained by hand.

---

## Projects

| Project | Source | Versions | Time Span |
|------|------|--------|----------|
| **OpenClaw** | [openclaw/openclaw](https://github.com/openclaw/openclaw) | 167 | 2025.11 — 2026.9 |
| **Hermes Agent** | [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 14 | 2026.7 — 2026.9 |

Counts are read off the committed data files (`openclaw_data.js`: 167 releases, 2025-11-25 → 2026-09-10; `hermes_data.js`: 14 releases, 2026-07-01 → 2026-09-07) and a test (`tests/stats.test.mjs`) fails if the homepage cards stop matching them.

---

## Preview

<details>
<summary><b>Click to expand screenshots</b></summary>

**OpenClaw changelog page** — month sections, per-release features with the parsed tags

![OpenClaw changelog page](assets/screenshot.png)

</details>

---

## How it works

```
  ┌──────────────────┐
  │  GitHub Releases │
  │  API             │
  │  (OpenClaw only) │
  └────────┬─────────┘
           ▼
  ┌──────────────────┐
  │  Parse release   │
  │  notes & extract │
  │  Highlights      │
  └────────┬─────────┘
           ▼
  ┌──────────────────┐
  │  Rewrite         │
  │  openclaw_data.js│
  │  (run on demand) │
  └────────┬─────────┘
           ▼
  ┌──────────────────┐
  │  GitHub Pages    │
  │  (deploy on push)│
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
└── .github/            # GitHub Actions (Pages deploy on push; manual sync)
```

---

## Development

### Local preview

```bash
git clone https://github.com/alloevil/agent-changelog.git
cd agent-changelog
open index.html
```

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

---

## Contributing

Contributions welcome! Especially:

- 📡 Add tracking for more AI agent frameworks
- 🎨 Improve the HTML/CSS design
- 🐛 Fix bugs in release note parsing
- 📖 Improve documentation

---

<p align="center">
  <a href="https://github.com/oil-oil/beautify-github-readme"><img src="./assets/readme/made-with-beautify.svg" width="300" alt="README made with beautify-github-readme"></a>
</p>

## License

[MIT](LICENSE)

---

<p align="center">
  <sub>⭐ Star this repo if you find it useful!</sub>
</p>
