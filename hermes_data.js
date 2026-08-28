const RELEASES_DATA = [
  {
    "month": "2026 年 8 月",
    "monthId": "2026-08",
    "releases": [
      {
        "version": "v2026.8.27",
        "date": "2026-08-27",
        "features": [
          {
            "title": "同意授权的本地浏览器档案浏览",
            "tag": "新增",
            "summary": "使用默认 Chromium 配置文件进行本地浏览，Windows 带关闭审批流程",
            "detail": "Consent-gated real-profile browsing: use your default Chromium profile for local browsing, with Windows close-with-approval flow",
            "summaryZh": "同意授权后可用默认 Chromium 档案本地浏览"
          },
          {
            "title": "桌面端独立窗口与 SSH 远程更新引擎",
            "tag": "新增",
            "summary": "桌面浏览器获得独立操作系统窗口，新增托管 SSH 远程更新引擎和 fleet 配置文件轨道",
            "detail": "Desktop Browser gets its own OS window plus a managed SSH remote-update engine and fleet profile rail",
            "summaryZh": "桌面浏览器独立窗口 + SSH 远程更新 + fleet 管理"
          },
          {
            "title": "远程 MCP 目录大规模扩展（50+ 供应商）",
            "tag": "新增",
            "summary": "新增 50+ 经实时验证的供应商托管 MCP 服务器，含 Cloudflare、Grafana Cloud、Better Stack、Railway 等",
            "detail": "Large remote MCP catalog expansion: 50+ live-verified vendor-hosted servers including Cloudflare, Grafana Cloud, Better Stack, Railway",
            "summaryZh": "MCP 目录扩展至 50+ 供应商服务器"
          },
          {
            "title": "Web 搜索/提取 TTL 缓存与 lean-tail 压缩",
            "tag": "新增",
            "summary": "web_search/web_extract 结果支持 TTL 缓存，lean-tail 压缩成为默认策略",
            "detail": "TTL result caching for web_search/web_extract; lean-tail compression as the default",
            "summaryZh": "Web 工具 TTL 缓存 + lean-tail 压缩默认开启"
          },
          {
            "title": "多查询工具搜索与词干提取",
            "tag": "新增",
            "summary": "tool_search 支持多查询并发搜索和词干提取匹配",
            "detail": "Multi-query tool_search with stemming",
            "summaryZh": "工具搜索支持多查询和词干提取"
          },
          {
            "title": "OS 钥匙链加密存储密钥",
            "tag": "新增",
            "summary": "可选使用操作系统钥匙链加密存储密钥，告别每次启动 macOS 钥匙链弹窗",
            "detail": "Opt-in OS-keychain encryption for stored secrets — no more per-launch macOS Keychain prompts",
            "summaryZh": "密钥可选存储在 OS 钥匙链，免去反复弹窗"
          },
          {
            "title": "更新器暂停网关替代强杀",
            "tag": "优化",
            "summary": "更新器通过控制套接字暂停网关，而非直接强杀进程树",
            "detail": "Updaters pausing gateways over the control socket instead of tree-killing them",
            "summaryZh": "更新时暂停网关而非强杀进程"
          },
          {
            "title": "不安全的就地更新拒绝（Phase 3）",
            "tag": "安全",
            "summary": "镜像/包管理安装场景下拒绝不安全的就地更新",
            "detail": "Image/package-managed installs refusing unsafe in-place updates (#91277 Phase 3)",
            "summaryZh": "镜像/包管理安装拒绝不安全就地更新"
          },
          {
            "title": "Cron 持久化事件确认与代码偏差检测",
            "tag": "优化",
            "summary": "Cron 持久化事件确认，代码版本偏差时给出更清晰的失败提示",
            "detail": "Cron durable-incident acks and clearer code-skew failures",
            "summaryZh": "Cron 事件确认持久化 + 代码偏差失败提示优化"
          },
          {
            "title": "Slack 链接预展控制",
            "tag": "新增",
            "summary": "支持控制 Slack 消息中链接的预展展开行为",
            "detail": "Slack link-unfurl controls",
            "summaryZh": "Slack 链接预展可控"
          },
          {
            "title": "共享 Docker 容器身份与终端环境后端",
            "tag": "新增",
            "summary": "支持共享 Docker 容器身份；终端环境改为可插拔后端架构",
            "detail": "Shared Docker container identities; pluggable terminal environment backends",
            "summaryZh": "Docker 容器共享身份 + 可插拔终端后端"
          },
          {
            "title": "新增模型：GLM-5.3-Flash、MiniMax M3/H3",
            "tag": "新增",
            "summary": "模型选择器新增 GLM-5.3-Flash、MiniMax M3 免费版和 MiniMax H3 Max 视频模型",
            "detail": "New models in pickers: GLM-5.3-Flash, MiniMax M3 free, MiniMax H3 Max video",
            "summaryZh": "新增 GLM-5.3-Flash、MiniMax M3/H3 模型"
          }
        ]
      },
      {
        "version": "v2026.8.19",
        "date": "2026-08-21",
        "features": [
          {
            "title": "Bot Mode 群组房间线程与可折叠对话摘要",
            "tag": "新增",
            "summary": "Bot Mode 新增群组房间线程支持、可折叠对话摘要、blob-face 头像以及 PDF/文件拖拽附件",
            "detail": "Bot Mode group-room threads, foldable conversation summaries, blob-face avatars, and PDF/file attachments with drag & drop",
            "summaryZh": "Bot Mode 支持群组线程、折叠摘要、头像和文件附件"
          },
          {
            "title": "无密钥 Web 层",
            "tag": "新增",
            "summary": "5 供应商免费轮换与环形故障转移，全新安装无需任何密钥即可使用 Web 搜索",
            "detail": "Keyless web tier with 5-vendor free rotation and ring failover; web search works on fresh installs with zero keys",
            "summaryZh": "零密钥 Web 搜索，5 供应商自动轮换"
          },
          {
            "title": "CLI 体验优化",
            "tag": "优化",
            "summary": "新增模糊 /model 选择器、Ctrl+P 命令面板、更丰富的 /status 输出",
            "detail": "CLI polish wave: fuzzy /model picker, Ctrl+P command palette, richer /status",
            "summaryZh": "CLI 新增模糊模型选择器、命令面板和增强状态"
          },
          {
            "title": "执行纪律与运行时卡顿防护",
            "tag": "优化",
            "summary": "基于 Composio 评估发现，增强执行纪律和运行时卡顿防护机制",
            "detail": "Execution-discipline and runtime stall guards from the Composio eval findings",
            "summaryZh": "执行纪律增强与运行时卡顿防护"
          },
          {
            "title": "桌面端性能优化",
            "tag": "优化",
            "summary": "Bot Mode 采用 paint-first 水合、合成器旋转动画，两个渲染器均启用 React Compiler",
            "detail": "Desktop perf work: paint-first Bot Mode hydration, compositor spinners, React Compiler in both renderers",
            "summaryZh": "桌面端 paint-first 水合 + React Compiler 双渲染器"
          },
          {
            "title": "Cron 任务持久记忆与推理力度",
            "tag": "新增",
            "summary": "Cron 任务获得持久记忆能力和按任务独立的推理力度设置",
            "detail": "Cron jobs gaining persistent memory and per-job reasoning effort",
            "summaryZh": "Cron 任务支持持久记忆和独立推理力度"
          },
          {
            "title": "hermes update 收据与 fleet --plan 验证",
            "tag": "新增",
            "summary": "更新命令生成收据记录，fleet --plan 支持验证检查",
            "detail": "hermes update receipts and fleet --plan verification",
            "summaryZh": "更新收据与 fleet 计划验证"
          },
          {
            "title": "hermes worktree list/prune",
            "tag": "新增",
            "summary": "新增 worktree 列表和清理命令",
            "detail": "hermes worktree list/prune",
            "summaryZh": "worktree 列表与清理命令"
          },
          {
            "title": "opencode-free 零认证 Provider",
            "tag": "新增",
            "summary": "新增无需认证的 opencode-free provider",
            "detail": "The opencode-free zero-auth provider",
            "summaryZh": "零认证 opencode-free provider"
          }
        ]
      },
      {
        "version": "v2026.8.18",
        "date": "2026-08-18",
        "features": [
          {
            "title": "桌面端 Glass/半透明表面与标签式侧边栏",
            "tag": "新增",
            "summary": "桌面端新增 matte glass、frost picker、macOS 预选效果；侧边栏改为 SESSIONS|BOTS 标签式布局，支持按 Bot 隐藏/显示",
            "detail": "Desktop glass/translucency surface work (matte glass, frost picker, macOS pre-select); tabbed SESSIONS|BOTS sidebar with per-bot hide/unhide",
            "summaryZh": "桌面端 Glass 半透明效果 + 标签式 SESSIONS|BOTS 侧边栏"
          },
          {
            "title": "Bot Mode 群聊修复与 NVIDIA SkillEvaluator",
            "tag": "修复",
            "summary": "修复 Bot Mode 群聊中长时间成员轮次、Markdown 渲染和跨机器路由问题；技能安装时新增 NVIDIA SkillEvaluator Tier 1 安全扫描（许可证 + 安全检查）",
            "detail": "Bot Mode group-chat fixes (long-running member turns, Markdown rendering, cross-machine routing); NVIDIA SkillEvaluator Tier 1 advisory scanning on skill installs",
            "summaryZh": "Bot Mode 群聊修复 + NVIDIA 技能安全扫描"
          },
          {
            "title": "Cron 媒体发送加固与 SessionDB 修复",
            "tag": "优化",
            "summary": "Cron 媒体发送加固：可配置超时、手动运行附件、错过触发提醒；SessionDB 事件循环线程和争用修复",
            "detail": "Cron media-send hardening (configurable timeout, manual-run attachments, missed-fire surfacing); SessionDB event-loop-thread and contention fixes",
            "summaryZh": "Cron 媒体发送可配置超时 + SessionDB 争用修复"
          },
          {
            "title": "hermes update 分支诚实检测与看板原生通知",
            "tag": "优化",
            "summary": "hermes update 修正了停放分支的诚实检测；看板新增原生操作系统通知",
            "detail": "hermes update parked-branch honesty; kanban native OS notifications",
            "summaryZh": "update 停放分支检测修正 + 看板原生通知"
          }
        ]
      },
      {
        "version": "v2026.8.16.2",
        "date": "2026-08-17",
        "features": [
          {
            "title": "MCP 2.x SDK 迁移与 Bot Mode 插件",
            "tag": "新增",
            "summary": "完成 MCP 2.x SDK 迁移并支持 2026-07-28 无状态协议；新增内置 Bot Mode（hermes-bots）插件，包含核心队友协议",
            "detail": "MCP 2.x SDK migration with 2026-07-28 stateless protocol support; bundled Bot Mode (hermes-bots) plugin with core teammate protocol",
            "summaryZh": "MCP 2.x SDK 迁移 + 内置 Bot Mode 插件"
          },
          {
            "title": "CommandCode 提供者插件与运行时加固",
            "tag": "新增",
            "summary": "新增 CommandCode 提供者插件；Python 子进程运行时所有权加固（PYTHONHOME/PYTHONPATH 隔离）；Cua Driver 0.20 运行时合约",
            "detail": "CommandCode provider plugin; subprocess Python runtime ownership hardening (PYTHONHOME/PYTHONPATH isolation); Cua Driver 0.20 runtime contracts",
            "summaryZh": "新增 CommandCode 插件 + Python 运行时隔离加固"
          },
          {
            "title": "Cron 调度器自愈与会话交接修复",
            "tag": "修复",
            "summary": "Cron 调度器自愈（EMFILE 恢复、过期 claim 协调、卡住任务重置）；修复会话交接数据丢失；看板 worktree/dispatch 修复",
            "detail": "Cron scheduler self-heal (EMFILE recovery, stale-claim reconciliation, wedged-job re-arm); session handoff data-loss fixes; kanban worktree/dispatch fixes",
            "summaryZh": "Cron 调度器自愈 + 会话交接数据丢失修复"
          },
          {
            "title": "生态侦察移植（安全扫描、回滚等）",
            "tag": "新增",
            "summary": "移植生态侦察成果：插件安装安全扫描、/worktree、/rollback 手动编辑保留、UTF-16 文件读取、Gemini 3 tool-call ID 保留等",
            "detail": "Ports from ecosystem scout: plugin install security scanning, /worktree, /rollback hand-edit preservation, UTF-16 file reads, Gemini 3 tool-call ID preservation",
            "summaryZh": "移植插件安全扫描、UTF-16 读取等多项生态改进"
          }
        ]
      },
      {
        "version": "v2026.8.16",
        "date": "2026-08-16",
        "features": [
          {
            "title": "v0.20.2 补丁发布",
            "tag": "修复",
            "summary": "滚动整合 v0.20.1 以来约 397 个 PR、967 次提交的修复和改进，涵盖桌面端、CLI、网关等全方位",
            "detail": "Patch release rolling up ~397 PRs and ~967 commits since v0.20.1, spanning desktop app (multi-gateway Connections registry, profile-scoped refreshes, MCP health checks), CLI (Windows update probes, Kitty keyboard protocol), gateway (persisted model routes, /loop completion, Telegram DM topics), prompt caching for LiteLLM Claude, cron hardening, and auth resolution.",
            "summaryZh": "v0.20.2 补丁：整合 397 个 PR，桌面端/CLI/网关全面修复"
          },
          {
            "title": "多网关 Connections 注册表",
            "tag": "新增",
            "summary": "桌面端支持多网关连接注册，配置文件范围刷新，MCP 健康检查和深度链接",
            "detail": "Desktop app gains multi-gateway Connections registry, profile-scoped refreshes, MCP health checks and deep links.",
            "summaryZh": "桌面端多网关连接管理、MCP 健康检查"
          },
          {
            "title": "CLI 与网关稳定性增强",
            "tag": "优化",
            "summary": "Windows 更新探测、Kitty 键盘协议支持、Telegram DM 话题、持久化模型路由等",
            "detail": "CLI improvements including Windows update probes, Kitty keyboard protocol, chat -c hardening. Gateway gains persisted model routes, /loop completion, Telegram DM topics.",
            "summaryZh": "CLI Kitty 键盘协议、网关持久化模型路由、Telegram DM 话题"
          }
        ]
      },
      {
        "version": "v2026.8.13",
        "date": "2026-08-13",
        "features": [
          {
            "title": "v0.20.1 稳定性修补版本发布",
            "tag": "修复",
            "summary": "自 v0.20.0 以来合并约 656 个 PR、1,444 次提交，涵盖桌面应用、网关平台、安装器、工具系统和 Provider 目录的广泛稳定性修复",
            "detail": "Patch release rolling up ~656 merged PRs since v0.20.0 with stabilization-and-fixes across desktop app, gateway platforms, installers, tool system, and provider catalogs.",
            "summaryZh": "v0.20.1 修补版本，656 个 PR 广泛修复桌面、网关、工具等子系统"
          }
        ]
      },
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

if (typeof module !== 'undefined') module.exports = RELEASES_DATA;
