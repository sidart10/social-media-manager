# System Overview

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                               │
│                    (Claude Code CLI via Agents)                      │
├─────────────────────────────────────────────────────────────────────┤
│  /jarvis          │  /zoe              │  /zoro                      │
│  Content Intel    │  Visual Production │  Publishing                 │
└─────┬─────────────┴──────────┬─────────┴─────────┬──────────────────┘
      │                        │                   │
      │ Workflow Orchestration │                   │
      ▼                        ▼                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    WORKFLOW LAYER (YAML + XML)                       │
│  research-topic   │  write-post        │  create-image              │
│  analyze-profile  │  write-script      │  create-talking-head       │
│  generate-ideas   │  learn-voice       │  schedule-post             │
└─────┬─────────────┴──────────┬─────────┴─────────┬──────────────────┘
      │                        │                   │
      │ Skill Discovery (Model-Invoked via Context Creation)
      ▼                        ▼                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    SKILL LAYER (Autonomous VMs)                      │
│  deep-web-research    │  create-image      │  Direct API/MCP        │
│  post-writer          │  veotools-mastery  │  (Zoro workflows)      │
│  voice-matcher        │  linkedin-design   │                        │
└─────┬─────────────────┴────────────┬─────┴────────────────────┬─────┘
      │                              │                          │
      │ Tool Selection & Execution   │                          │
      ▼                              ▼                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    TOOL/MCP LAYER                                    │
│  Notion (status)  │  Exa (research)   │  nanobanana (images)        │
│  Postiz (publish) │  Apify (scraping) │  veotools (videos)          │
│  Twitter API      │  Firecrawl (web)  │  HeyGen (avatars)           │
└─────┬─────────────┴───────────────────┴─────────────────────────────┘
      │
      │ Data Persistence
      ▼
┌─────────────────────────────────────────────────────────────────────┐
│               STATE MANAGEMENT (Dual Storage)                        │
│  Local: outputs/projects/{YYYY-MM-DD}-{slug}/  │  Collaborative: Notion DB      │
│  - Research briefs                  │  - Content status workflow     │
│  - Generated posts                  │  - Metadata & relations        │
│  - Images & videos                  │  - Performance metrics         │
│  - Handoff packages (JSON)          │  - Mobile-accessible state     │
└─────────────────────────────────────────────────────────────────────┘
```

## System Boundaries

**In Scope:**
- Content research and intelligence gathering
- AI-powered content generation (posts, scripts) with voice matching
- Visual content production (images, videos, carousels)
- Multi-platform publishing (Twitter, LinkedIn, YouTube, Instagram)
- Notion-based workflow coordination and status tracking
- Cost optimization through intelligent tool routing

**Out of Scope (for MVP):**
- Direct social media scheduling UI (delegated to Postiz)
- Real-time analytics dashboards (manual tracking in Notion)
- Multi-user collaboration (single creator use case)
- Automated A/B testing (manual testing by user)
- Video editing beyond generation (no post-processing)

---
