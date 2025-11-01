# Repository Structure

```
social-media-manager/
├── .claude/
│   ├── commands/                    # Agent menu definitions (Claude Code reads)
│   │   ├── jarvis/
│   │   │   └── jarvis.md
│   │   ├── zoe/
│   │   │   └── zoe.md
│   │   └── zoro/
│   │       └── zoro.md
│   │
│   └── skills/                      # Skill knowledge modules (Claude Code Skills)
│       ├── jarvis/
│       │   ├── deep-web-research/
│       │   │   ├── SKILL.md
│       │   │   ├── reference/
│       │   │   └── examples/
│       │   ├── post-writer/
│       │   ├── video-script-writer/
│       │   ├── profile-analysis/
│       │   ├── voice-matcher/
│       │   ├── platform-formatter/
│       │   ├── research-synthesizer/
│       │   ├── evidence-tracker/
│       │   ├── youtube-growth-mastery/
│       │   ├── youtube-thumbnail-mastery/
│       │   ├── social-media-research/
│       │   └── youtube-research/
│       │
│       ├── zoe/
│       │   ├── create-image/
│       │   ├── edit-image/
│       │   ├── blend-images/
│       │   ├── veotools-mastery/
│       │   ├── platform-specs/
│       │   ├── linkedin-design/
│       │   ├── youtube-thumbnail-design/
│       │   ├── mcp-tool-selection/
│       │   └── generating-sid-images/
│       │
│       └── shared/                  # Cross-agent skills
│           ├── visual-prompt-mastery/
│           └── skill-creator/
│
├── bmad/
│   ├── agents/                      # Agent implementations (source of truth)
│   │   ├── jarvis/
│   │   │   ├── jarvis.md            # Agent definition
│   │   │   ├── config.yaml
│   │   │   └── jarvis-sidecar/
│   │   │       ├── memories.md      # Voice profiles, preferences, API tracking
│   │   │       └── workflows/
│   │   │           ├── research-topic/
│   │   │           │   ├── workflow.yaml
│   │   │           │   ├── instructions.md
│   │   │           │   └── template.md
│   │   │           ├── analyze-profile/
│   │   │           ├── competitive-analysis/
│   │   │           ├── generate-ideas/
│   │   │           ├── learn-voice/
│   │   │           ├── write-post/         # NEW - needs creation
│   │   │           └── write-script/       # NEW - needs creation
│   │   │
│   │   ├── zoe/
│   │   │   ├── zoe.md
│   │   │   ├── config.yaml
│   │   │   └── zoe-sidecar/
│   │   │       └── workflows/
│   │   │           ├── create-single-image/
│   │   │           ├── create-carousel/
│   │   │           ├── edit-image/
│   │   │           ├── blend-images/
│   │   │           ├── create-talking-head/
│   │   │           ├── create-scene/
│   │   │           └── create-cinematic-sequence/
│   │   │
│   │   └── zoro/
│   │       ├── zoro.md
│   │       ├── config.yaml
│   │       └── zoro-sidecar/
│   │           └── workflows/
│   │               ├── schedule-post/      # NEW - needs creation
│   │               ├── publish-tweet-now/
│   │               ├── publish-linkedin-now/
│   │               ├── publish-youtube-now/
│   │               ├── check-rate-limits/
│   │               └── [10+ specific post type workflows]
│   │
│   ├── modules/                     # Shared utilities
│   │   ├── twitter-api-client/      # Node.js Twitter Premium OAuth client
│   │   │   ├── index.js
│   │   │   ├── executor.js
│   │   │   ├── package.json
│   │   │   └── README.md
│   │   └── linkedin-api-client/     # Node.js LinkedIn OAuth client
│   │       ├── index.js
│   │       ├── package.json
│   │       └── README.md
│   │
│   └── tool-registry.yaml           # NEW - needs creation (Story 7.4)
│   └── workflow-registry.yaml       # NEW - needs creation (Story 7.5)
│
├── docs/
│   ├── brief.md                     # Project Brief
│   ├── prd.md                       # Product Requirements Document
│   ├── architecture.md              # THIS DOCUMENT
│   ├── notion-content-dashboard.md  # Notion DB schemas
│   ├── postiz-mcp.md                # Postiz integration guide
│   └── content-intelligence/        # Research docs
│
├── outputs/                         # Centralized output management (6-stage lifecycle)
│   ├── templates/
│   │   └── project-structure/       # Template for new projects
│   │       ├── 00-session/
│   │       ├── 01-research/
│   │       ├── 02-ideas/
│   │       ├── 03-drafts/           # Platform-specific (linkedin/, twitter/, youtube/, etc.)
│   │       ├── 04-media/            # Platform-agnostic (images/, videos/)
│   │       ├── 05-published/        # MERGED final+published (linkedin/, twitter/, youtube/, etc.)
│   │       └── handoffs/
│   │
│   └── projects/
│       └── {YYYY-MM-DD}-{project-slug}/
│           ├── 00-session/          # Session metadata
│           ├── 01-research/         # Research briefs (shared across platforms)
│           ├── 02-ideas/            # Content ideas (shared across platforms)
│           ├── 03-drafts/           # Platform-specific drafts (linkedin/, twitter/, youtube/, etc.)
│           ├── 04-media/            # Platform-agnostic REUSABLE media (images/, videos/)
│           ├── 05-published/        # MERGED final+published per platform (linkedin/, twitter/, youtube/, etc.)
│           └── handoffs/            # Agent handoff packages
│
└── .env                             # API keys (gitignored)
```

---
