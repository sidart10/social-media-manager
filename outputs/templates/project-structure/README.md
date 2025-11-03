# Project Structure Template

This is the **template** structure copied to every new content project.

**Usage:**
When a workflow creates a new project, it copies this entire folder structure to:
`outputs/projects/{YYYY-MM-DD}-{project-slug}/`

**6 Lifecycle Stages:**

- `00-session/` - Session metadata, logs, Notion linking
- `01-research/` - Research outputs (shared across platforms)
- `02-ideas/` - Content ideas (shared across platforms)
- `03-drafts/` - Platform-specific text drafts (linkedin/, twitter/, youtube/, instagram/, tiktok/, substack/, facebook/)
- `04-media/` - Platform-agnostic visual content (images/, videos/ - REUSABLE across platforms)
- `05-published/` - Published content per platform (linkedin/, twitter/, etc. with URLs + analytics)
- `handoffs/` - Agent coordination packages

**Key Design Principles:**

- **Stages 01-02:** Shared research and ideas (platform-agnostic)
- **Stage 03:** Platform-specific text (LinkedIn post differs from Twitter thread)
- **Stage 04:** Platform-agnostic media (one thumbnail serves multiple platforms)
- **Stage 05:** Platform-specific published (each platform tracks own URLs + analytics)

**Media Reusability:**
Generate `thumbnail-main.png` once in 04-media/images/, reference from:

- 05-published/linkedin/post.md
- 05-published/twitter/thread.md
- 05-published/facebook/post.md

**All folders created even if empty** (provides consistent structure).

**See:** outputs/README.md for complete documentation and examples
