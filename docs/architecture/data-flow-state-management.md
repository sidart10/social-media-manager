# Data Flow & State Management

## Dual Storage Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      WORKFLOW EXECUTION                          │
└────────────┬────────────────────────────────┬───────────────────┘
             │                                │
             │ Complete Artifacts             │ Metadata & Status
             ▼                                ▼
    ┌────────────────────┐           ┌────────────────────┐
    │  LOCAL STORAGE     │           │  NOTION WORKSPACE   │
    │  outputs/          │           │  Content Tracker    │
    ├────────────────────┤           ├────────────────────┤
    │ • Research briefs  │           │ • Status workflow   │
    │ • Generated posts  │           │ • Publish dates     │
    │ • Images (PNG)     │           │ • Media URLs        │
    │ • Videos (MP4)     │           │ • Views/Likes       │
    │ • Handoff JSON     │           │ • Relations         │
    │ • Session metadata │           │   - Keywords        │
    │                    │           │   - Channels        │
    │ Git-tracked:       │           │   - Tasks           │
    │ • Voice profiles   │           │   - Notes (research)│
    │ • Agent memories   │           │                    │
    └────────────────────┘           └────────────────────┘
             │                                │
             │ Bidirectional Linking          │
             └────────────┬───────────────────┘
                          │
                          ▼
              Notion page property "local_files"
              contains URL to outputs/ folder
```

## Centralized Output Management

**Project-Centric Folder Structure (Story 7.6):**

```
outputs/
├── templates/
│   └── project-structure/      # Template for new projects (6 lifecycle stages)
│       ├── 00-session/
│       ├── 01-research/        # Shared across platforms
│       ├── 02-ideas/           # Shared across platforms
│       ├── 03-drafts/          # Platform-specific text
│       │   ├── linkedin/
│       │   ├── twitter/
│       │   ├── youtube/
│       │   ├── instagram/
│       │   ├── tiktok/
│       │   ├── substack/
│       │   └── facebook/
│       ├── 04-media/           # Platform-agnostic REUSABLE media
│       │   ├── images/
│       │   └── videos/
│       ├── 05-published/       # MERGED final + published (per platform)
│       │   ├── linkedin/
│       │   ├── twitter/
│       │   ├── youtube/
│       │   ├── instagram/
│       │   ├── tiktok/
│       │   ├── substack/
│       │   └── facebook/
│       └── handoffs/
│
└── projects/
    └── {YYYY-MM-DD}-{project-slug}/
        ├── 00-session/
        │   ├── metadata.json          # Project metadata
        │   ├── costs.json             # Cost tracking per workflow
        │   └── session-log.md         # Execution log
        ├── 01-research/
        │   ├── research-brief.md      # Deep research results
        │   └── competitive-analysis.md
        ├── 02-ideas/
        │   ├── idea-cards.md          # Generated content ideas
        │   └── hook-pack.md           # A/B testing hooks
        ├── 03-drafts/                 # Platform-specific text content
        │   ├── linkedin/
        │   │   ├── post-v1.md
        │   │   └── post-v2.md         # Iterations
        │   ├── twitter/
        │   │   └── thread-v1.md
        │   └── youtube/
        │       └── script-v1.md
        ├── 04-media/                  # Platform-agnostic REUSABLE media
        │   ├── images/
        │   │   ├── thumbnail-main.png        # Used for LinkedIn + Twitter
        │   │   ├── carousel-slide-01.png
        │   │   ├── carousel-slide-02.png
        │   │   └── metadata.json             # Tracks platform usage
        │   └── videos/
        │       ├── short-vertical.mp4        # Used for YouTube + Instagram
        │       ├── animated-diagram.mp4
        │       └── metadata.json
        ├── 05-published/              # MERGED final + published (per platform)
        │   ├── linkedin/
        │   │   ├── post.md                   # Final published version
        │   │   ├── url.md                    # https://linkedin.com/posts/...
        │   │   ├── publish-confirmation.json # Post ID, timestamp
        │   │   └── analytics-2025-11-06.md   # Performance tracking
        │   ├── twitter/
        │   │   ├── thread.md
        │   │   ├── urls.md                   # All tweet URLs
        │   │   └── analytics-2025-11-06.md
        │   └── youtube/
        │       ├── script.md
        │       ├── url.md
        │       └── analytics-2025-11-06.md
        └── handoffs/
            ├── jarvis-to-zoe.json     # Agent handoff packages
            └── zoe-to-zoro.json
```

## 6-Stage Lifecycle Explained

**Philosophy:** Content progresses through 6 numbered stages from research to published, with platform-specific organization where content diverges and platform-agnostic storage where content is shared.

**Stage Breakdown:**

**00-session/** - Project Tracking & Coordination

- `metadata.json` - Complete project history (costs, duration, files, Notion linking)
- `session-log.md` - Timestamped execution log of all agent actions
- **When Created:** Automatically when project starts
- **Populated By:** All agents (append to log, update metadata)

**01-research/** - Shared Research (Platform-Agnostic)

- Research briefs, competitive analysis, sources
- **Philosophy:** Research is platform-agnostic—same research used for LinkedIn post, Twitter thread, YouTube video
- **Populated By:** Jarvis (research-topic, analyze-profile, competitive-analysis workflows)

**02-ideas/** - Shared Ideas (Platform-Agnostic)

- Idea cards, hook packs, content calendars
- **Philosophy:** Ideas are platform-agnostic—same idea adapted for different platforms in 03-drafts/
- **Populated By:** Jarvis (generate-ideas workflow)

**03-drafts/** - Platform-Specific Text Content

- **7 Platform Subfolders:** linkedin/, twitter/, youtube/, instagram/, tiktok/, substack/, facebook/
- Each platform folder contains iterative drafts: post-v1.md, post-v2.md, thread-v1.md, script-v1.md
- **Why Platform-Specific:** LinkedIn post (PAIPS, <300 words) differs from Twitter thread (questions, numbered tweets) differs from YouTube script (timestamps, scenes)
- **Multi-Content Per Platform:** LinkedIn can have post.md + carousel-post.md + video-post.md from same research
- **Populated By:** Jarvis (write-post, write-script workflows when created)

**04-media/** - Platform-Agnostic REUSABLE Media ⚡ **CRITICAL DESIGN**

- **2 Simple Subfolders:** images/, videos/
- **Philosophy:** Media is REUSABLE across platforms—generate once, reference from multiple platform folders
- **Naming Convention:**
  - ✅ Descriptive, not platform-specific: `thumbnail-main.png`, `short-vertical.mp4`
  - ✅ Platform variant suffix only if needed: `thumbnail-youtube.png` (CTR-optimized, different from main)
  - ❌ Never: `thumbnail-linkedin.png` (implies can't reuse for Twitter)
- **Metadata Tracking:** `04-media/images/metadata.json` and `04-media/videos/metadata.json` track `used_in_platforms: ["linkedin", "twitter"]` for each asset
- **Example:** Generate `thumbnail-main.png` once → Reference from 05-published/linkedin/, 05-published/twitter/, 05-published/facebook/
- **Cost Efficiency:** ONE generation ($0.08) serves THREE platforms vs THREE generations ($0.24)
- **Populated By:** Zoe (create-single-image, create-carousel, create-scene workflows)

**05-published/** - Published Content (MERGED Final + Published, Per Platform)

- **7 Platform Subfolders:** linkedin/, twitter/, youtube/, instagram/, tiktok/, substack/, facebook/
- Each platform folder contains:
  - `post.md` or `thread.md` or `script.md` (final published version)
  - `url.md` (platform URL: https://linkedin.com/posts/...)
  - `publish-confirmation.json` (post ID, timestamp, rate limits)
  - `analytics-YYYY-MM-DD.md` (performance tracking updated over time)
- **Philosophy:** "Final approved" = "Published" or "Scheduled to publish"—no intermediate limbo state
- **Media References:** Text files reference ../../../04-media/images/thumbnail-main.png (no duplication)
- **Status Mapping:**
  - Notion "Editing" ↔ Local has content in 03-drafts/ and 04-media/
  - Notion "Posted" ↔ Local has content in 05-published/ with URLs
- **Independent Lifecycles:** LinkedIn published, YouTube still drafting (each platform at different stage)
- **Populated By:** Zoro (schedule-post, publish-\*-now workflows)

**handoffs/** - Agent Coordination Packages

- JSON packages for agent handoffs (jarvis-to-zoe.json, zoe-to-zoro.json)
- handoff-log.md with timeline
- **Populated By:** All agents when creating handoffs

---

**Metadata JSON Schema:**

```json
{
  "project_id": "2025-10-31-ai-agents-linkedin-post",
  "notion_page_url": "https://notion.so/...",
  "created_at": "2025-10-31T10:15:00Z",
  "agents_involved": ["Jarvis", "Zoe", "Zoro"],
  "workflows_executed": [
    {
      "workflow": "research-topic",
      "agent": "Jarvis",
      "started_at": "2025-10-31T10:15:00Z",
      "completed_at": "2025-10-31T10:18:23Z",
      "cost": 0.05,
      "skills_triggered": ["deep-web-research", "research-synthesizer"]
    },
    {
      "workflow": "write-post",
      "agent": "Jarvis",
      "started_at": "2025-10-31T10:20:00Z",
      "completed_at": "2025-10-31T10:23:15Z",
      "cost": 0,
      "skills_triggered": ["post-writer", "voice-matcher", "platform-formatter"]
    },
    {
      "workflow": "create-single-image",
      "agent": "Zoe",
      "started_at": "2025-10-31T10:25:00Z",
      "completed_at": "2025-10-31T10:26:45Z",
      "cost": 0.04,
      "skills_triggered": ["create-image", "linkedin-design"]
    }
  ],
  "total_cost": 0.09,
  "total_duration_minutes": 12,
  "file_inventory": {
    "research": ["01-research/research-brief.md"],
    "drafts": {
      "linkedin": ["03-drafts/linkedin/post-v1.md", "03-drafts/linkedin/post-v2.md"],
      "twitter": ["03-drafts/twitter/thread-v1.md"],
      "youtube": [],
      "instagram": [],
      "tiktok": [],
      "substack": [],
      "facebook": []
    },
    "media": {
      "images": ["04-media/images/thumbnail-main.png"],
      "videos": []
    },
    "published": {
      "linkedin": ["05-published/linkedin/post.md", "05-published/linkedin/url.md"],
      "twitter": [],
      "youtube": [],
      "instagram": [],
      "tiktok": [],
      "substack": [],
      "facebook": []
    },
    "handoffs": ["handoffs/jarvis-to-zoe.json", "handoffs/zoe-to-zoro.json"]
  },
  "publishing_status": {
    "linkedin": {
      "published": true,
      "published_at": "2025-10-31T14:00:00Z",
      "post_url": "https://linkedin.com/posts/...",
      "views": 1250,
      "likes": 87,
      "comments": 12
    }
  }
}
```

**Naming Conventions:**

- **Folders:** lowercase-kebab-case (e.g., `linkedin-post-ai-agents`)
- **Files:** lowercase-kebab-case (e.g., `research-brief.md`, `animated-diagram.mp4`)
- **No mixed case, underscores, or spaces** (cross-platform consistency)

## Notion Content Tracker Schema

**Database:** Content Tracker
**Data Source URL:** `collection://956447a76e7b4b2eafb1e4c9adfcbcf3`

**Properties Used by Agents:**

| Property                | Type                       | Agent Usage                            | Example                                         |
| ----------------------- | -------------------------- | -------------------------------------- | ----------------------------------------------- |
| **Name**                | Title                      | Jarvis creates, all read               | "AI Agents: The Future of Work"                 |
| **Status**              | Status                     | All update                             | Idea → Research → Writing → Editing → Posted    |
| **Channel**             | Relation (My Channels DB)  | Jarvis links, Zoro validates           | LinkedIn, Twitter, YouTube                      |
| **Category**            | Select                     | Jarvis sets based on topic             | AI & Tech, Career Growth, Personal              |
| **Priority**            | Select                     | Jarvis sets, user overrides            | High, Medium, Low                               |
| **Publish Date**        | Date                       | Jarvis estimates, Zoro confirms actual | 2025-11-05                                      |
| **Content Text**        | Long Text                  | Jarvis populates full post/script      | Full post body or video script                  |
| **Thumbnail ideas**     | Text                       | Jarvis (write-script) generates        | "3 CTR-optimized concepts with MrBeast pillars" |
| **YouTube Title ideas** | Text                       | Jarvis (write-script) generates        | "60-70 char keyword-rich titles"                |
| **Views**               | Number                     | Zoro prompts user to add post-publish  | 1250                                            |
| **Likes**               | Number                     | Zoro prompts user to add post-publish  | 87                                              |
| **Comments**            | Number                     | Zoro prompts user to add post-publish  | 12                                              |
| **Focus Keywords**      | Relation (Keywords DB)     | Jarvis links from research             | "AI agents", "automation", "productivity"       |
| **Notes**               | Relation (Action Items DB) | Jarvis links research briefs           | Research brief page URL                         |
| **local_files**         | URL                        | All agents add                         | Link to outputs/projects/{slug}/                |

**Status Workflow Transitions:**

```
User creates idea in Notion
    │
    ▼
[Idea] ──Jarvis: research-topic──▶ [Research] ──Jarvis: write-post──▶ [Writing]
    │                                                                       │
    │                                                                       ▼
    │                                                                  [Editing]
    │                                                                  ╱      ╲
    │                                                                 ╱        ╲
    │                                    Text-only: Jarvis suggests Zoro      Visuals needed: Jarvis suggests Zoe
    │                                                │                              │
    │                                                │                              ▼
    │                                                │                         Zoe: create-image
    │                                                │                              │
    │                                                │                              │ (Status stays Editing)
    │                                                │                              │
    │                                                │                         Zoe suggests Zoro
    │                                                │                              │
    │                                                ▼◀─────────────────────────────┘
    │                                           Zoro: publish
    │                                                │
    │                                                ▼
    └─────Manual archive after performance──▶  [Posted] ───Manual───▶ [Archived]
                 analysis complete
```

---
