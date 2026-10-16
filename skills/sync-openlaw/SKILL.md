---
name: sync-openlaw
description: 从 OpenClaw GitHub Releases 同步最新的 changelog，翻译成中文，更新 index.html 页面并推送到 GitHub 部署。当用户说"同步 changelog"、"更新 openlaw"、"拉取最新 release"、"同步 openclaw 更新"时使用此 skill。
user-invocable: true
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
---

# Sync OpenLaw Changelog

从 OpenClaw GitHub Releases 拉取最新的版本信息，翻译为中文 changelog 条目，更新数据文件（`openclaw_data.js`，Hermes 为 `hermes_data.js`），重新生成首页卡片数字，并安全地推送到 GitHub 部署。

## 执行步骤

### 第 1 步：获取最新 release

运行以下命令获取 OpenClaw 的最新 releases：

```bash
export PATH="/tmp/gh_2.67.0_linux_amd64/bin:$PATH"
gh release list --repo openclaw/openclaw --limit 10
```

对比 `openclaw_data.js` 中已有的版本号（搜索 `version:`），找出尚未收录的新 release。

### 第 2 步：获取 release 详情

对每个新 release，获取完整内容：

```bash
gh release view <tag> --repo openclaw/openclaw --json publishedAt,body
```

### 第 3 步：翻译为中文 changelog

将 release body 翻译为中文 changelog 条目。规则：

- `### Breaking` 区段 → tag 为 `Breaking`
- `### Changes` 区段 → tag 为 `新功能`
- `### Fixes` 区段 → tag 为 `修复`
- 每条变更只保留关键信息，提炼为简洁的中文标题 + 摘要 + 详情
- 每个 release 只选取最具代表性的 2-8 条亮点，不需要翻译每一条
- 版本号、日期从 release 的 tag_name 和 publishedAt 获取
- 保持专业术语（如 SDK、API、MCP、OAuth 等）不翻译

### 第 4 步：更新数据文件

将新 release 添加到 `openclaw_data.js` 的 `CHANGELOG_DATA` 数组中（Hermes 同理更新 `hermes_data.js`；不要再改 `index.html` 里的数据）对应的月份分组下：

- 如果该月份已存在（如 "2026 年 4 月"），直接在 `releases` 数组中添加
- 如果是新月份，在数组顶部（最新月份在前）创建新的月份分组
- 格式必须与现有条目完全一致

### 第 5 步：重新生成卡片数字

```bash
node scripts/update-stats.mjs   # 按数据文件重写 index.html 卡片和 assets/hero.svg 的版本数
npm test                        # 卡片与数据不一致时会失败
```

### 第 6 步：安全推送到 GitHub（禁止 force push）

```bash
git add openclaw_data.js hermes_data.js index.html assets/hero.svg
git commit -m "sync: update changelogs (<版本号>)"
git pull --rebase origin master          # 先基于最新 master，避免覆盖别人的提交
node scripts/update-stats.mjs            # rebase 后数据可能变了，再生成一次
git diff --quiet -- index.html assets/hero.svg || { git add index.html assets/hero.svg; git commit -m "chore: regenerate card stats"; }
git push origin HEAD:master              # 绝对不要加 --force / -f / --force-with-lease
gh workflow run stats.yml --repo alloevil/agent-changelog --ref master   # 兜底：再按数据重算一次卡片
```

- `git pull --rebase` 有冲突时停下来报告，不要用 `--force` 或 `reset --hard` 解决。
- `git push` 被拒（non-fast-forward）时，重复 `git pull --rebase` 再推，不要 force。master 有分支保护，force push 会被拒绝。

push 后 GitHub Actions 会自动部署到 GitHub Pages。

## 数据格式参考

```javascript
// 月份分组结构
{
  month: "2026 年 4 月",
  monthId: "2026-04",
  releases: [
    {
      version: "v2026.4.6",
      date: "2026-04-06",
      features: [
        { title: "功能名称", tag: "新功能", summary: "一句话描述", detail: "详细说明" },
        { title: "优化项", tag: "优化", summary: "一句话描述", detail: "详细说明" },
        { title: "修复项", tag: "修复", summary: "一句话描述", detail: "详细说明" },
        { title: "破坏性变更", tag: "Breaking", summary: "一句话描述", detail: "详细说明" }
      ]
    }
  ]
}
```

## 注意事项

- `gh` CLI 路径：`/tmp/gh_2.67.0_linux_amd64/bin/gh`
- GitHub 仓库：`alloevil/agent-changelog`（默认分支 `master`）
- OpenClaw 仓库：`openclaw/openclaw`
- 翻质量很重要——直接机翻效果差，需要理解功能后重新用中文表述
- 如果 release body 内容过多，优先翻译 Breaking 和重要 Changes
