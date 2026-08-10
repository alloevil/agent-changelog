const RELEASES_DATA = [
  {
    "month": "2026 年 8 月",
    "monthId": "2026-08",
    "releases": [
      {
        "version": "v2026.8.3",
        "date": "2026-08-03",
        "features": [
          {
            "title": "实时对话式语音，支持打断",
            "tag": "新增",
            "summary": "Hermes 现在逐句流式说话，你可以中途打断它，它会停下来听你说；忙碌感知静音检测避免抢话",
            "detail": "Streaming conversational voice with barge-in: Hermes speaks clause-by-clause, you can interrupt mid-sentence, and busy-aware silence detection prevents talking over you.",
            "summaryZh": "实时流式语音对话，支持中途打断和智能静音检测"
          },
          {
            "title": "唤醒词与免手控制",
            "tag": "新增",
            "summary": "支持自定义开放词汇唤醒词，检测在设备端运行，说 stop 可结束语音聊天",
            "detail": "Open-vocabulary wake words run on-device with no audio leaving your machine. Multi-profile voice routing and stop ends voice chat on every surface.",
            "summaryZh": "设备端唤醒词检测，自定义唤醒短语，支持免手操作"
          },
          {
            "title": "全平台语音支持",
            "tag": "新增",
            "summary": "WhatsApp、飞书、钉钉、LINE、QQ 等平台发语音消息即可转录并回复；STT 全面可配置",
            "detail": "Voice notes on WhatsApp, Feishu, DingTalk, LINE, QQ etc. are transcribed and answered. STT is fully configurable with unified language resolution.",
            "summaryZh": "多平台语音消息统一转录和自动 TTS 回复"
          },
          {
            "title": "可溯源引用的事实核查研究",
            "tag": "新增",
            "summary": "新的 grounded-citations 技能让研究中的每个论断都有可验证的来源引用，支持文档/声明事实核查",
            "detail": "The grounded-citations skill produces research where every claim is backed by a verifiable source. Fact-checking mode verifies any document or claim.",
            "summaryZh": "研究输出自带可验证引用，支持事实核查模式"
          },
          {
            "title": "出站 Webhook —— 主动推送事件",
            "tag": "新增",
            "summary": "Hermes 现在可以向任意 HTTP 端点推送带 HMAC 签名的生命周期事件，无需轮询",
            "detail": "Outbound signed webhooks push session activity, turn completions, and tool events to any HTTP endpoint with HMAC signature verification.",
            "summaryZh": "带签名的出站 Webhook，主动推送生命周期事件"
          },
          {
            "title": "桌面端升级为平台：Artifacts + 插件 SDK",
            "tag": "新增",
            "summary": "桌面端支持 Artifacts（沙箱化实时预览）、插件 SDK（看板为首个插件）、全局快捷键快速输入窗口",
            "detail": "Desktop now renders artifacts with sandboxed live preview, ships a plugin SDK with Kanban as founding plugin, and adds a global-hotkey quick-entry window.",
            "summaryZh": "桌面端支持 Artifacts 实时预览和插件 SDK"
          },
          {
            "title": "A2A v1.0 代理间通信协议",
            "tag": "新增",
            "summary": "内置 A2A 协议插件，Hermes 可发现、对话和被其他 A2A 兼容代理驱动",
            "detail": "A new bundled plugin implements the Agent-to-Agent protocol v1.0 for discovery and communication between compatible agents.",
            "summaryZh": "内置 A2A v1.0 协议，支持多代理互通"
          },
          {
            "title": "CLI 高级用户命令集",
            "tag": "新增",
            "summary": "!command 直接执行 shell 命令、/init 自动生成 AGENTS.md、/diff 查看变更、/context 分析上下文、/focus 精简输出",
            "detail": "New CLI commands: !command for shell, /init to generate AGENTS.md, /diff for changes, /context to inspect context window, /focus for reduced output view.",
            "summaryZh": "一批 CLI 新命令：!shell、/init、/diff、/context、/focus"
          },
          {
            "title": "中途纠正代理方向 —— Redirects",
            "tag": "新增",
            "summary": "代理运行中输入修正指令，当前 turn 会重定向而非从头开始，保留已有工作进度",
            "detail": "Type a correction while the agent works and the active turn is redirected with work in flight preserved.",
            "summaryZh": "运行中输入修正即可重定向，无需停止重来"
          },
          {
            "title": "工具自修复能力",
            "tag": "优化",
            "summary": "截断终端输出自动溢出到文件、patch 检测已应用编辑、write_file 验证磁盘内容、搜索空结果自动探查；迭代上限 90 提升至 500",
            "detail": "Self-recovery sweep: truncated output spills to file, patch detects already-applied edits, write_file verifies content, searches probe near-misses. Iteration limit raised 90 to 500.",
            "summaryZh": "工具自动检测并修复常见失败，迭代上限提升至 500"
          },
          {
            "title": "智能压缩深度重构",
            "tag": "优化",
            "summary": "支持按 turn 微压缩、保证 N 条用户消息尾部存活、进度感知超时、幽灵技能防护；阈值可按模型配置",
            "detail": "Per-turn micro-compaction, guaranteed user-message tail, progress-aware timeouts, ghost-skill defense. Thresholds configurable per-model and in absolute tokens.",
            "summaryZh": "上下文压缩支持微压缩和按模型配置阈值"
          },
          {
            "title": "智能审批升级",
            "tag": "优化",
            "summary": "hermes approvals suggest 从历史生成白名单建议，连续拒绝断路器阻止异常循环，新增 Docker 守护进程重定向审批",
            "detail": "Smart approvals suggest allowlists from history, consecutive-denial circuit breaker stops misbehaving loops, new Docker daemon-redirect approval gate.",
            "summaryZh": "审批历史自动学习白名单，新增连续拒绝断路器"
          },
          {
            "title": "全平台性能提升",
            "tag": "优化",
            "summary": "冷启动约 14 秒降至约 1.8 秒、SDK 懒加载、config 读取提速 54 倍、桌面端 60fps 流式渲染",
            "detail": "Cold start dropped from ~14s to ~1.8s, heavy SDKs lazy-load, config reads 54x faster, desktop shipped 60fps streaming with zero idle CPU.",
            "summaryZh": "冷启动降至 1.8 秒，桌面端 60fps 流式渲染"
          }
        ]
      }
    ]
  },
  {
    "month": "2026 年 7 月",
    "monthId": "2026-07",
    "releases": [
      {
        "version": "v2026.7.7",
        "date": "2026-07-08",
        "features": [
          {
            "title": "v0.18.1 补丁发布",
            "tag": "修复",
            "summary": "汇总 v0.18.0 以来 660+ PR，含 Windows 安装器自愈、仪表盘/网关修复",
            "detail": "Patch release with ~660 PRs — installer self-healing, dashboard/gateway fixes, WhatsApp pairing, MCP fixes.",
            "summaryZh": "v0.18.1 补丁：660+ PR 汇总，Windows 安装器自愈等"
          }
        ]
      },
      {
        "version": "v2026.7.7.2",
        "date": "2026-07-08",
        "features": [
          {
            "title": "WhatsApp Baileys 依赖修复",
            "tag": "修复",
            "summary": "Baileys 从 git commit 改为 npm 发布版 7.0.0-rc13，修复 Docker 构建",
            "detail": "Unpin Baileys from git commit, use published npm release for reliable Docker builds.",
            "summaryZh": "WhatsApp 依赖改为 npm 发布版，修复 Docker 构建"
          }
        ]
      },
      {
        "version": "v2026.7.20",
        "date": "2026-07-20",
        "features": [
          {
            "title": "首 token 延迟降低 ~80%",
            "tag": "优化",
            "summary": "冷启动从 ~4.3s 降至 ~0.9s，推理模型默认实时流式输出思考过程",
            "detail": "Cold-start dropped from ~4.3s to ~0.9s across all platforms. Reasoning models stream thinking live by default.",
            "summaryZh": "冷启动 ~4.3s→~0.9s，推理模型实时流式思考"
          },
          {
            "title": "桌面端性能大改 — 20+ 性能 PR",
            "tag": "优化",
            "summary": "Markdown 渲染 14 倍提速，虚拟化 diff 视图，会话切换不再卡顿",
            "detail": "14x less splitter CPU, virtualized diffs, snappy session switching, stopped per-token re-renders.",
            "summaryZh": "桌面端 14 倍渲染提速，会话切换丝滑"
          },
          {
            "title": "终端内管理订阅",
            "tag": "新增",
            "summary": "/subscription 和 /topup 命令，无需离开终端即可管理 Nous 订阅",
            "detail": "Full subscription management in TUI/CLI with preview, scheduled changes, and undo.",
            "summaryZh": "终端内直接管理 Nous 订阅和充值"
          },
          {
            "title": "智能审批成为默认",
            "tag": "优化",
            "summary": "LLM 独立评估标记命令，支持用户自定义拒绝规则",
            "detail": "LLM reviewer assesses flagged commands. User-defined deny rules block even under yolo mode.",
            "summaryZh": "LLM 自动评估命令安全性，减少手动审批"
          },
          {
            "title": "密码管理器集成",
            "tag": "新增",
            "summary": "SecretSource 接口支持 Bitwarden 和 1Password 密钥获取",
            "detail": "Pluggable SecretSource interface with Bitwarden and 1Password providers.",
            "summaryZh": "Bitwarden/1Password 密钥无缝集成"
          },
          {
            "title": "子代理实时监控 + 持久化",
            "tag": "新增",
            "summary": "delegate_task 返回实时日志，后台结果持久化不丢失",
            "detail": "Live transcript files for delegate_task, durable background completions via ownership-checked ledger.",
            "summaryZh": "子代理实时日志 + 后台结果持久化"
          },
          {
            "title": "响应投递持久化账本",
            "tag": "修复",
            "summary": "最终响应记录在持久账本中，网关崩溃后自动重发",
            "detail": "Durable delivery-obligation ledger in state.db, redelivered on next boot.",
            "summaryZh": "网关崩溃后自动重发已完成的回复"
          },
          {
            "title": "新模型与提供商",
            "tag": "新增",
            "summary": "Fireworks AI、DeepInfra、GPT-5.6、grok-4.5、kimi-k3、claude-sonnet-5",
            "detail": "New first-class providers and latest frontier models end-to-end.",
            "summaryZh": "新增 Fireworks/DeepInfra 及 GPT-5.6 等最新模型"
          },
          {
            "title": "推理深度 max/ultra 级别",
            "tag": "新增",
            "summary": "按模型、槽位、任务精细控制推理努力程度",
            "detail": "New max/ultra reasoning effort levels with per-model/Slot/task overrides.",
            "summaryZh": "推理深度可精细到模型/槽位/任务级别"
          },
          {
            "title": "全面会话导出",
            "tag": "新增",
            "summary": "导出为 Markdown/HTML/HF trace 等格式，支持密钥脱敏",
            "detail": "Sessions export to Markdown, HTML, HF-ready trace with --redact.",
            "summaryZh": "会话导出支持多种格式 + 密钥脱敏"
          }
        ]
      },
      {
        "version": "v2026.7.30",
        "date": "2026-07-30",
        "features": [
          {
            "title": "v0.19.1 补丁发布",
            "tag": "修复",
            "summary": "汇总自 v0.19.0 以来的 1000+ PR，覆盖网关、语音、桌面端和安装器的 bug 修复与加固",
            "detail": "Patch release rolling up ~1,000+ PRs since v0.19.0. Bug-fix and salvage waves across gateway, voice subsystem, desktop app, and installer, plus continued platform work (Buzz/Nostr channel, FLUX3 video generation, Telegram media reliability).",
            "summaryZh": "v0.19.1 补丁：1000+ PR 汇总，网关/语音/桌面端稳定性修复"
          }
        ]
      },
      {
        "version": "v2026.7.1",
        "date": "2026-07-01",
        "features": [
          {
            "title": "P0/P1 清零计划 —— 100% 解决",
            "tag": "修复",
            "summary": "团队在 12 天内关闭了全部 P0（3 个 issue + 8 个 PR）和 P1（493 个 issue + 188 个 PR），总计约 692 个高优先级项",
            "detail": "Closed every P0 and P1 issue/PR across the entire repo in 12 days: 3 P0 issues + 8 P0 PRs + 493 P1 issues + 188 P1 PRs = ~692 items. P0/P1 count is now 0.",
            "summaryZh": "12 天清零全部 P0/P1，约 692 个高优先级项全部解决"
          },
          {
            "title": "Mixture-of-Agents 升级为一等公民模型",
            "tag": "新增",
            "summary": "MoA 预设现在作为可选模型出现在所有模型选择器中，每个参考模型的推理过程独立展示，聚合答案实时流式输出",
            "detail": "MoA presets appear as selectable models alongside Claude/GPT/Grok. Each reference model reasoning shown, final answer streams live.",
            "summaryZh": "MoA 预设成为可选模型，多模型推理过程可视化"
          },
          {
            "title": "代理自验证 —— 完成意味着已证明",
            "tag": "新增",
            "summary": "/goal 获得完成合约功能：定义完成标准，代理通过实际运行检查来验证工作是否完成",
            "detail": "/goal gained completion contracts: define what done looks like and the agent judges completion against actual verification evidence.",
            "summaryZh": "/goal 完成合约：用实际检查证明工作完成"
          },
          {
            "title": "/learn —— 描述即技能",
            "tag": "新增",
            "summary": "运行 /learn，Hermes 将其提炼为可复用技能并自动写入标准文件",
            "detail": "/learn distills a reusable skill from anything you point it at and writes it to standards automatically.",
            "summaryZh": "/learn 一键将任意内容提炼为可复用技能"
          },
          {
            "title": "/journey —— 可视化代理记忆时间线",
            "tag": "新增",
            "summary": "CLI/TUI 新增 /journey 学习时间线，桌面端新增可交互径向记忆图谱，可查看编辑删除代理积累的知识",
            "detail": "/journey shows a learning timeline of accumulated memories and skills. Desktop adds a playable radial memory graph.",
            "summaryZh": "/journey 可视化代理记忆，桌面端新增记忆图谱"
          },
          {
            "title": "后台扇出 —— 并行委派不阻塞",
            "tag": "新增",
            "summary": "delegate_task 支持后台并行运行多个子代理，完成后汇总为单次回复",
            "detail": "delegate_task fans out multiple subagents in the background. Chat is never blocked, results come back as one consolidated turn.",
            "summaryZh": "后台并行委派多个子代理，结果自动汇总"
          },
          {
            "title": "桌面端编程项目支持",
            "tag": "新增",
            "summary": "桌面端新增按配置文件管理的 Projects 侧边栏，含代码轨道、审查面板、Git worktree 管理",
            "detail": "Desktop gained per-profile Projects with sidebar, coding rail, review pane, git worktree management, and agent-facing project tools.",
            "summaryZh": "桌面端新增 Projects 管理，含代码/审查/Git 工作流"
          },
          {
            "title": "规模部署能力 —— 缩容至零与排空协调",
            "tag": "新增",
            "summary": "Gateway 支持空闲时休眠和重启迁移前优雅排空，不丢弃进行中的对话",
            "detail": "Gateway can go dormant when idle and quiesce cleanly before restart/migration without dropping in-flight conversations.",
            "summaryZh": "Gateway 支持空闲休眠和优雅重启，不中断对话"
          }
        ]
      }
    ]
  }
];

if (typeof module !== "undefined") module.exports = RELEASES_DATA;
