# Agent Architecture

## Agent Definition Model

Agents are **persona-driven menu interfaces** that present numbered workflow options to users. They are NOT autonomous actors—they are interaction shells that delegate to workflows.

**Agent Components:**

```
bmad/agents/{agent-name}/
├── {agent-name}.md              # Agent persona definition (in bmad/)
├── config.yaml                   # Agent configuration
└── {agent-name}-sidecar/
    ├── memories.md               # Persistent preferences, voice profiles, API tracking
    └── workflows/
        ├── {workflow-1}/
        │   ├── workflow.yaml
        │   ├── instructions.md   # External (not embedded in YAML)
        │   └── template.md
        └── {workflow-2}/
            └── ...

.claude/commands/{agent-name}/
└── {agent-name}.md              # Duplicate for Claude Code discovery
```

**Agent Persona Structure:**

```markdown
# Agent Name (e.g., Jarvis - Content Intelligence Lead)

# Persona
- Role: [Primary function]
- Style: [Communication approach]
- Focus: [Core responsibilities]

# Available Commands
1. *workflow-1 - [Description]
2. *workflow-2 - [Description]
...

# Agent Activation
[Greeting message + auto-display command menu]
```

## Agent Roster

### Jarvis (Content Intelligence Lead)

**Role:** Research, strategy, content creation, voice consistency guardian

**Workflows Owned (7):**
1. `research-topic` - Deep research with intelligent tool routing (WebSearch → Exa → Apify based on depth)
2. `analyze-profile` - Social media profile analysis (Instagram, TikTok, Twitter, LinkedIn, YouTube)
3. `competitive-analysis` - Multi-profile comparison for gap identification
4. `generate-ideas` - Evidence-backed content ideas with hook packs
5. `learn-voice` - Extract rhetorical DNA from 50+ historical posts (Enhanced Voice Profile v2.0)
6. `write-post` - Platform-optimized posts (LinkedIn PAIPS, Twitter threads, Substack essays) **[NEW - NEEDS CREATION]**
7. `write-script` - Video scripts with timestamps, scene descriptions, thumbnail concepts **[NEW - NEEDS CREATION]**

**Skills Triggered (via context creation):**
- deep-web-research (intelligent tool routing: WebSearch/Exa/Firecrawl/Apify)
- post-writer (Justin Welsh PAIPS, Greg Isenberg threads, Paul Graham essays)
- video-script-writer (Ali Abdaal Top 5, MKBHD reviews, YouTube chapters)
- profile-analysis (platform scraping + engagement pattern analysis)
- voice-matcher (10-dimensional rhetorical analysis + confidence scoring)
- platform-formatter (character limits, hashtags, threading)
- research-synthesizer (5 categories: Trends, Data, Quotes, Examples, Gaps)
- evidence-tracker (source quality scoring, citation linking)
- youtube-growth-mastery, youtube-thumbnail-mastery, social-media-research, youtube-research

**Notion Integration:**
- Checks Status: Idea, Research, Next Up
- Updates Status: Idea → Research → Writing → Editing
- Sets Properties: Publish Date, Content Text, Category, Priority, Focus Keywords
- Creates Relations: Links to Keywords DB, Notes DB (research sources)

**Handoff Patterns:**
- Text-only path: Jarvis writes → suggests Zoro (Status: Editing → Posted)
- With visuals path: Jarvis writes → suggests Zoe (Status stays Editing until visuals added)

---

### Zoe (Visual Production Specialist)

**Role:** Image and video creation using Emily JSON methodology (7-pillar quality ≥7/10) and Veo/HeyGen for videos

**Workflows Owned (7):**
1. `create-single-image` - Platform-optimized images (LinkedIn dark tech, YouTube CTR thumbnails, Instagram graphics)
2. `create-carousel` - Multi-slide carousels (2-10 images) with consistent design system
3. `edit-image` - Image refinement (blur, color correction, object removal, style transfer)
4. `blend-images` - Composite 2-3 images with intelligent blending
5. `create-talking-head` - HeyGen avatar videos with consent verification
6. `create-scene` - B-roll generation and diagram animation via Veo 3
7. `create-cinematic-sequence` - Multi-scene video with stitching and transitions

**Skills Triggered (via context creation):**
- create-image (Emily JSON 10-section methodology, 7-pillar quality evaluation)
- edit-image (pixel-perfect editing via nanobanana)
- blend-images (multi-image compositing)
- veotools-mastery (Veo 3 model selection: fast vs standard vs custom, aspect ratio optimization, async job management)
- platform-specs (aspect ratios: 16:9, 9:16, 1:1, resolution requirements per platform)
- linkedin-design (dark monochrome palette, typography rules, minimal aesthetic)
- youtube-thumbnail-design (MrBeast 6 pillars, Thomas Frank AIDA, CTR psychology)
- mcp-tool-selection (gpt-image-1 vs nanobanana decision logic)
- generating-sid-images (user-specific image generation patterns)

**Tool Selection Logic:**
- **Images:** gpt-image-1 ($0.04-0.08) for LinkedIn/Twitter professional, nanobanana ($0.039) for YouTube/Instagram social
- **Videos:** HeyGen ($0.20-0.50/min) for avatars, Veo 3 fast ($0.30/8s) for b-roll, Fal-Video ($1-3) for cinematic

**Notion Integration:**
- Checks Status: Editing (content ready, needs visuals)
- Keeps Status: Editing (doesn't move to Posted—that's Zoro's job)
- Adds Properties: Image URLs to media properties, thumbnail concepts to "Thumbnail ideas"

**Handoff Patterns:**
- Zoe adds visuals → suggests Zoro for publishing (Status stays Editing)
- Standalone visuals: Zoe creates → saves to Notion with "Posted" status → suggests Zoro

---

### Zoro (Publishing & Distribution Specialist)

**Role:** Multi-platform publishing via Postiz MCP (primary) and direct APIs (backup), validation, rate limiting, analytics tracking

**Workflows Owned (6+):**
1. `schedule-post` - PRIMARY: Multi-platform scheduling via Postiz MCP (Twitter, LinkedIn, Instagram, Facebook, TikTok, YouTube) **[NEW - NEEDS CREATION]**
2. `publish-tweet-now` - Immediate Twitter posting via direct API (bypass Postiz for urgent posts)
3. `publish-linkedin-now` - Immediate LinkedIn posting via direct API
4. `publish-youtube-now` - Immediate YouTube upload via YouTube Data API v3
5. `check-rate-limits` - Validate Postiz quotas and direct API limits
6. Additional: 10+ existing workflows for specific post types (linkedin-post-image, post-tweet-with-video, youtube-upload-short, etc.)

**Publishing Strategy:**
- **PRIMARY:** Postiz MCP for all scheduled posts (unified queue, multi-platform consistency, optimal timing)
- **BACKUP:** Direct APIs for immediate "post now" operations when scheduling not appropriate (breaking news, urgent announcements)

**Skills Triggered:**
- None (Zoro is pure API/MCP integration layer—validation and formatting logic embedded in workflow steps, no autonomous skills needed)

**Validation Checks (per platform):**
- **Twitter:** 25k chars Premium / 280 standard, 1-4 images (5MB each), video 512MB, rate limit 1500 posts/month Premium
- **LinkedIn:** 3000 chars, single image (8MB), multi-image carousel (2-20), PDF carousel, video 200MB, rate limit 150 posts/day
- **YouTube:** No text limit, video 128GB, auto-detect Shorts (9:16 + ≤3 min), rate limit 6 uploads/day

**Notion Integration:**
- Checks Status: Posted (ready to publish)
- Updates Status: Editing → Posted (after publishing)
- Sets Properties: Publish Date (actual publish time), future date if scheduled via Postiz
- Prompts User: Manually add Views/Likes/Comments after publishing (Notion doesn't auto-track)

**Handoff Patterns:**
- Final step: Zoro publishes → updates Notion Status to "Posted" → no further agent handoffs

---
