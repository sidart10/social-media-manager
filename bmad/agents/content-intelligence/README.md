# Jarvis - Content Intelligence Agent

**Type:** Expert Agent with Claude Code Skills
**Status:** Production Ready (Testing Phase)
**Version:** 1.0.0
**Command:** `/jarvis` in `.claude/commands/jarvis/jarvis.md`

---

## Structure

```
content-intelligence/
├── jarvis.agent.yaml     # Agent source (YAML)
├── jarvis-sidecar/       # All agent resources
│   ├── config.yaml       # MCP configs, platform specs
│   ├── instructions.md   # Agent directives
│   ├── memories.md       # Voice profile, cost tracking
│   ├── workflows/        # 7 workflows (source of truth)
│   ├── knowledge/        # Reference materials
│   ├── outputs/          # Generated content
│   ├── sessions/         # Session logs
│   └── test-results/     # Testing data
└── README.md             # This file
```

**Compiled agent:** `.claude/commands/jarvis/jarvis.md`

---

## Quick Start

**Activate:** `/jarvis`

**Main Commands:**

1. research-topic - Deep multi-source research
2. analyze-profile - Profile analysis (Instagram, TikTok, Twitter, LinkedIn, YouTube)
3. generate-ideas - Evidence-backed Idea Cards
4. learn-voice - Build your voice profile
5. competitive-analysis - Multi-profile comparison
6. write-posts - Social posts (LinkedIn, Twitter, Instagram)
7. write-scripts - Video scripts (YouTube, Reels, TikTok)

---

## Skills Integration

**Jarvis uses 6 Claude Code Skills** (in `.claude/skills/jarvis/`):

**Content Generation:** content-writer (universal - all platforms, voice styles, formats)

**Research & Intelligence:** deep-web-research, research-synthesizer, youtube-research

**Analysis:** profile-analysis, evidence-tracker

**Strategy:** youtube-growth-mastery

Skills autonomously invoke when workflows execute.

---

## MCP Requirements

**Working:**

- apify (platform scraping)
- social-media-mcp (Brave + Perplexity)
- exa (deep research)
- youtube-transcript (transcripts)

**Setup:** `docs/content-intelligence/MCP-SETUP-GUIDE.md`

---

## Documentation

**All documentation:** `docs/content-intelligence/INDEX.md`

---

**Agent ready for testing!**
