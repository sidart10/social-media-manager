# Social Media Manager

AI-powered social media content creation and publishing system with specialized agents for research, content creation, visual production, video generation, and multi-platform publishing.

[![GitHub](https://img.shields.io/badge/GitHub-sidart10-blue?logo=github)](https://github.com/sidart10/social-media-manager)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)

**🎯 End-to-End Content Pipeline** • **🤖 Specialized AI Agents** • **📱 Multi-Platform Publishing**

---

## What is This?

A comprehensive AI-powered social media management system that handles the complete content creation pipeline:

**Research → Strategy → Content Creation → Visual Production → Video Generation → Publishing**

Built with specialized agents, Claude Code skills, and integrated MCP servers for maximum automation and quality.

---

## 🤖 Agent Architecture

### Team Structure (Updated 2025-11-02)

```
Jarvis (Content Intelligence - Team Head)
    ↓ coordinates
├── Zoe (Visual Production - Images + Videos)
└── Zoro (Publishing & Distribution - Multi-Platform)
```

**3-Agent System** (streamlined from original 4-agent architecture):

- **Jarvis**: Research, strategy, content creation
- **Zoe**: ALL visual production (images AND videos - consolidated)
- **Zoro**: Publishing via Postiz (unified multi-platform)

### Available Agents

#### **1. Jarvis** - Content Intelligence Team Head 🎯

**Command**: `/jarvis`
**Location**: `bmad/agents/content-intelligence/`

**Role:** Research, strategy, and content creation with evidence-backed intelligence

**Capabilities**:

- Deep web research (Exa, Apify, Firecrawl, WebSearch)
- Profile analysis across ALL platforms (Twitter, Instagram, TikTok, LinkedIn, YouTube)
- Competitive intelligence and gap analysis
- Evidence-backed idea generation
- Post writing (LinkedIn, Twitter/X threads, Substack newsletters)
- Video script writing (YouTube, Shorts, Reels, TikTok)
- Voice profile matching (Enhanced v2.0 - learns your authentic writing style)
- Team coordination (hands off to Zoe for visuals, Zoro for publishing)

**12 Specialized Skills**:

- deep-web-research (intelligent tool routing by depth)
- profile-analysis (multi-platform scraping)
- post-writer (platform-specific formulas: PAIPS, Greg Isenberg, Paul Graham)
- video-script-writer (Ali Abdaal, MKBHD methodologies)
- platform-formatter (validation + optimization)
- voice-matcher (consistency scoring)
- research-synthesizer (multi-source organization)
- social-media-research (trend detection)
- youtube-research (video analysis)
- youtube-growth-mastery (optimization strategies)
- youtube-thumbnail-mastery (CTR psychology)
- evidence-tracker (source attribution)

**7 Workflows**: research-topic, analyze-profile, competitive-analysis, generate-ideas, learn-voice, write-posts, write-scripts

---

#### **2. Zoe** - Visual Production Specialist (Images + Videos) 🎨

**Command**: `/zoe`
**Location**: `bmad/agents/zoe/`

**Role:** ALL visual content production (consolidated image + video specialist)

**Capabilities**:

**Images:**

- Emily JSON methodology with structured 10+ section prompts
- 7-pillar quality evaluation (≥7/10 required for publication)
- Platform design systems (LinkedIn dark monochrome, YouTube CTR thumbnails)
- Tool selection logic (nanobanana for social, gpt-image-1 for professional)
- Carousels, single images, thumbnails

**Videos:**

- fal-video execute_custom_model (PRIMARY - 22+ models: Veo 3, Luma Ray 2, Kling, Pixverse)
- Text-to-video and image-to-video generation
- HeyGen talking heads (specialized avatar videos)
- Platform optimization (16:9 YouTube, 9:16 Shorts/Reels)

**Integration:**

- Cloudinary upload for public URLs (required for Postiz)
- Notion status tracking
- Quality scoring and metadata

**9+ Specialized Skills**:

- create-image (Emily JSON orchestrator)
- edit-image (pixel-perfect editing)
- blend-images (multi-image compositing)
- video-generation (fal-video model selection)
- platform-specs (aspect ratios, limits)
- linkedin-design (dark tech aesthetic)
- youtube-thumbnail-design (MrBeast 6 pillars, Thomas Frank AIDA)
- mcp-tool-selection (intelligent routing)

**8 Workflows**: create-single-image, create-carousel, create-scene, create-talking-head, setup-avatars, edit-image, blend-images, video-editing

**MCP Tools**:

- nanobanana (Gemini 2.5 Flash images)
- gpt-image-1 (OpenAI DALL-E 3 professional images)
- fal-video (Universal video hub - PRIMARY)
- heygen (Talking head avatars - SPECIALIZED)
- cloudinary (Media hosting)

---

#### **3. Zoro** - Publishing & Distribution Specialist 📤

**Command**: `/zoro`
**Location**: `bmad/agents/zoro/`

**Role:** Multi-platform publishing EXCLUSIVELY via Postiz (NO direct APIs)

**Capabilities**:

**Publishing (Postiz ONLY):**

- Multi-platform scheduling (Twitter, LinkedIn, Instagram, Facebook, TikTok, YouTube)
- Twitter threads via postsAndComments array (automatic threading!)
- Immediate posting (type: "now") OR scheduled posting (type: "schedule")
- Platform validation (character limits, media formats)
- HTML formatting via formatForPostiz() utility

**Media Handling:**

- Cloudinary integration (uploads media, gets public URLs)
- Public HTTPS URLs required for Postiz (not local paths)
- Images AND videos supported (including YouTube videos!)

**Integration:**

- Notion status updates (Editing → Posted)
- Platform URL auto-extraction from Postiz response
- Analytics tracking (Views, Likes, Comments)

**1 Primary Workflow**: schedule-post (handles everything)

**MCP Tools**:

- postiz (PRIMARY and ONLY publishing tool)
- cloudinary (Media hosting for public URLs)
- notion (Status tracking)

**Publishing Policy:** Postiz ONLY for ALL platforms. NO Twitter MCP, NO LinkedIn MCP, NO YouTube MCP, NO exceptions.

---

## 🎨 Skills Architecture

All domain knowledge lives in Claude Code skills organized by agent:

```
.claude/skills/
├── jarvis/                    (12 skills - research, writing, analysis)
├── zoe/                       (9-11 skills - images + videos)
├── visual-prompt-mastery/     (1 skill - Emily methodology)
└── skill-creator/             (1 skill - skill development)

Total: 24 specialized skills
```

**Key Update (2025-11-02):** AI Image Generator + AI Video Agent skills consolidated under zoe/ directory

---

## 🚀 Quick Start

### Prerequisites

- Node.js v20+
- Claude Code CLI
- GitHub account (for pushing outputs)
- API keys configured:
  - OpenAI (for gpt-image-1)
  - Google AI (for nanobanana, veotools)
  - HeyGen (for avatar videos)
  - Twitter/LinkedIn/YouTube (for posting)

### Usage

**1. Start Jarvis (Content Intelligence)**:

```bash
/jarvis
```

**2. Research a topic**:

```
Select: *research-topic
Enter topic: "AI automation trends 2025"
```

**3. Generate content**:

```
Select: *write-post
Platform: LinkedIn
Topic: Based on research findings
```

**4. Create visuals** (if needed):

```bash
/zoe
# Select: *create-image or *create-carousel or *create-scene
```

**5. Publish**:

```bash
/zoro
# Select: *schedule-post (handles ALL platforms via Postiz)
```

---

## 📁 Project Structure

```
social-media-manager/
├── .claude/
│   ├── commands/              # Slash command definitions
│   │   ├── jarvis/
│   │   ├── ai-image-generator/
│   │   ├── ai-video-agent/
│   │   └── social-posting-agent/
│   └── skills/                # 24 specialized skills
│       ├── jarvis/
│       ├── ai-image-generator/
│       ├── ai-video-agent/
│       ├── visual-prompt-mastery/
│       └── skill-creator/
├── bmad/
│   ├── agents/                # Agent configurations
│   │   ├── content-intelligence/    # Jarvis agent
│   │   ├── ai-image-generator/      # Image agent
│   │   ├── ai-video-agent/          # Video agent
│   │   └── social-posting-agent/    # Publishing agent
│   └── modules/               # Platform API clients
│       ├── twitter-api-client/
│       └── linkedin-api-client/
├── outputs/                   # Generated content by date
│   └── {MM-DD-YYYY}/
│       └── {session-name}/
│           ├── posts/
│           ├── images/
│           ├── videos/
│           ├── research/
│           └── handoff-*.json
└── scripts/                   # Utility scripts
```

---

## 🔧 Configuration

### Agent Configuration

Each agent has a sidecar folder with:

- `config.yaml` - API keys, user settings, platform specs
- `instructions.md` - Private agent directives
- `memories.md` - Learning log and context
- Platform-specific templates and references

**Example**: `bmad/agents/content-intelligence/jarvis-sidecar/config.yaml`

### MCP Servers (Updated 2025-11-02)

**Currently Configured (3):**

- **postiz** (Multi-platform publishing - PRIMARY)
- **plainly** (Video templates)
- **submagic** (Video captions, editing)

**Required for Full Functionality (12+):**

**Research & Scraping**:

- exa (neural search)
- firecrawl (web scraping)
- apify (Instagram, TikTok, Twitter scraping)

**Content Generation**:

- nanobanana (Gemini 2.5 Flash images)
- gpt-image-1 (OpenAI DALL-E 3 images)
- fal-video (PRIMARY video - 22+ models)
- heygen (Talking head avatars)

**Publishing**:

- postiz (PRIMARY and ONLY - all platforms)
- cloudinary (Media hosting - CRITICAL for public URLs)

**Infrastructure**:

- notion (Knowledge management, status tracking)

**Publishing Policy:** Postiz ONLY for all platform publishing. No direct Twitter/LinkedIn/YouTube API MCPs.

---

## 💡 Key Features

### Content Intelligence (Jarvis)

- **Smart Research**: Auto-selects tools based on depth (free → low-cost → paid)
- **Voice Matching**: Learns your writing style and applies it to all content
- **Platform Optimization**: Formats content for specific platform algorithms
- **Evidence Tracking**: Every recommendation backed by sources with URLs

### Visual Production (AI Image Generator)

- **Emily JSON Methodology**: Structured prompting for high-quality images
- **7-Pillar Quality Framework**: Comprehensive evaluation system
- **Platform Design Systems**: LinkedIn dark monochrome, YouTube CTR-optimized
- **Intelligent Tool Routing**: Auto-selects best MCP tool for the use case

### Video Production (AI Video Agent)

- **Multi-Provider Routing**: HeyGen for talking heads, Veo for scenes, Sora for cinematic
- **Enhanced Prompting**: Virtual Film Producer methodology with cinematic terminology
- **Platform Optimization**: Automatic aspect ratio, duration, caption defaults
- **Consent Management**: Avatar verification and ethical AI production

### Publishing (Social Posting Agent)

- **Multi-Platform**: Twitter, LinkedIn, YouTube native API posting
- **Rate Limiting**: Smart throttling and quota management
- **Validation**: Platform-specific character limits and format checking
- **Cost Tracking**: Transparent API usage monitoring

---

## 📊 Workflow Examples

### Example 1: LinkedIn Post with Carousel

```bash
# 1. Research topic
/jarvis
2  # Select research-topic
Topic: "AI infrastructure trends"

# 2. Generate post
/jarvis
7  # Select write-post
Platform: LinkedIn

# 3. Create carousel images
/zoe
2  # Select create-carousel
Platform: LinkedIn, slides: 5, style: dark tech monochrome

# 4. Publish
/zoro
2  # Select schedule-post
Platform: LinkedIn, type: now or schedule
# Zoro uploads to Cloudinary → Posts via Postiz
```

### Example 2: Twitter Thread with Diagrams

```bash
# 1. Research + Write
/jarvis
2  # research-topic
7  # write-post (Twitter thread format)

# 2. Create diagrams
/zoe
2  # create-single-image (repeat for 3 diagrams)
Platform: Twitter, style: light educational

# 3. Publish thread
/zoro
2  # schedule-post
Platform: Twitter (X)
# Zoro builds postsAndComments array (auto-threads!)
# Attaches diagrams to specific tweets
# Posts via Postiz - proper threaded structure!
```

---

## 🎯 Output Management (v2.0 Structure)

**Updated:** 2025-11-02 - New 6-stage project lifecycle structure

All outputs saved to project-centric structure:

```
outputs/projects/
└── {YYYY-MM-DD}-{project-slug}/
    ├── 00-session/             # metadata.json, session-log.md
    ├── 01-research/            # Research briefs (shared across platforms)
    ├── 02-ideas/               # Idea cards, hook packs (shared)
    ├── 03-drafts/              # Platform-specific content
    │   ├── linkedin/
    │   ├── twitter/
    │   ├── youtube/
    │   ├── instagram/
    │   └── tiktok/
    ├── 04-media/               # Platform-agnostic REUSABLE media
    │   ├── images/             # ONE thumbnail for multiple platforms!
    │   │   └── metadata.json   # Tracks which platforms use each asset
    │   └── videos/
    │       └── metadata.json
    ├── 05-published/           # Published content per platform
    │   ├── linkedin/           # post.md, url.md, publish-confirmation.json
    │   ├── twitter/
    │   └── youtube/
    └── handoffs/               # Agent coordination
        ├── jarvis-to-zoe.json
        └── zoe-to-zoro.json
```

**Benefits:**

- **Media Reusability**: One image serves LinkedIn + Twitter + Instagram
- **Platform Agnostic**: Assets named by purpose (thumbnail-main.png), not platform
- **Clear Lifecycle**: Idea → Research → Draft → Media → Published
- **Cost Efficiency**: Track which platforms reuse assets

**Metadata tracking**: Every stage includes JSON metadata with:

- Generation parameters
- Quality scores
- Cost tracking
- Source attribution
- Timestamps
- Platform usage (for media reusability)

---

## 🔐 Security & Privacy

- API keys stored in gitignored config files
- Generated content stays local
- User prompts remain private
- No telemetry or tracking
- Full data ownership

---

## 📈 Cost Optimization

**Tiered Approach**:

1. **Free tier**: WebSearch, WebFetch, Firecrawl (with caching)
2. **Low cost**: Exa (~$0.05-0.15/search), Social Media MCP
3. **Paid tier**: Apify (~$0.40-0.50/1k results) - requires user approval

**Automatic Cost Tracking**: All API usage logged in `memories.md` with monthly totals

---

## 🛠️ Technology Stack

**Framework**: Custom agent architecture with Claude Code skills
**Language**: JavaScript/Node.js (API clients), Python (formatters, utilities)
**AI Models**: Claude 3.5 Sonnet (agents), GPT-4, Gemini 2.5 Flash
**Infrastructure**: MCP protocol for tool integration
**APIs**: Twitter Premium, LinkedIn, YouTube, HeyGen, Veo, OpenAI, Google AI

---

## 📚 Documentation

- **Agent Instructions**: See `bmad/agents/{agent-name}/{agent-name}-sidecar/instructions.md`
- **Skills Reference**: Each skill has `SKILL.md` with usage patterns
- **Workflow Guides**: `bmad/agents/{agent-name}/workflows/`
- **Output Standards**: `outputs/README.md`

---

## 🤝 Contributing

This is a personal project but open to collaboration. Feel free to:

- Report issues
- Suggest features
- Share improvements

---

## 📜 License

MIT License - See LICENSE for details

---

## 🔗 Related Projects

- **BMad Method** - Software development framework this architecture is inspired by
- **Claude Code** - The AI IDE powering the agents
- **MCP Protocol** - Tool integration standard

---

**Built for autonomous social media content creation with human oversight and quality control.**

---

## 🏗️ Recent Updates (2025-11-02)

**Phase 7: Production-Ready System Fixes**

- ✅ Agent consolidation: AI Video + AI Image → Zoe (visual specialist)
- ✅ Agent rename: Social Posting → Zoro (publishing specialist)
- ✅ Output structure: v2.0 with 6-stage project lifecycle
- ✅ Workflow fixes: BMad v6 compliance (external instructions, proper variables)
- ✅ Publishing policy: Postiz-only (no direct API MCPs)
- ✅ Thread support: Documented postsAndComments array threading
- ✅ Tool names: Verified all MCP references correct
- ✅ Registries: Cleaned duplicates, fixed phantom paths

**Production Status:** 90% complete (27/30 tasks) - Ready for testing

_Last updated: November 2, 2025_
