# Technical Assumptions

## Critical Terminology Clarification

**This PRD uses custom terminology that differs from standard Claude Code concepts. Understanding this distinction is essential:**

**OUR SYSTEM:**
- **"Agents"** = Custom persona-driven menu interfaces (bmad/agents/) that present numbered workflow options to users. These are slash command handlers with personality. Example: `/jarvis` shows Jarvis persona + menu of 7 workflows.
- **"Workflows"** = Custom YAML+XML process orchestrators (workflow.yaml + instructions.md) that manage multi-step processes, state management, file I/O, user interaction, and Notion updates. These are user-invoked via agent menus.
- **"Skills"** = Claude Code Agent Skills (.claude/skills/) - model-invoked autonomous expertise that Claude discovers based on description matching. These contain methodologies, not processes.

**STANDARD CLAUDE CODE:**
- **Slash Commands** = User-invoked commands (type `/command` to trigger)
- **Agent Skills** = Model-invoked capabilities (Claude autonomously uses when relevant)
- **"Agents"** = Not a native concept (our custom orchestration layer)
- **"Workflows"** = Not a native concept (our custom YAML+XML system)

**KEY DIFFERENCE:**
- **Slash Commands** (Claude Code) ≈ **Our Agents** (user explicitly invokes)
- **Agent Skills** (Claude Code) = **Our Skills** (model autonomously discovers)
- **Our Workflows** = Custom orchestration layer between agents and skills

**INVOCATION MODEL:**
- User invokes Agent (`/jarvis`) → User-driven
- Agent presents menu of Workflows → User selects
- Workflow executes steps creating context → Process-driven
- Claude discovers Skills based on context → Model-driven
- Skills execute with tool access → Autonomous

**Why this matters:** When PRD says "workflow creates context for skill discovery," it means workflow steps provide rich task descriptions that Claude uses to autonomously match and load relevant skills. Workflows don't explicitly call skills—Claude does that automatically based on description matching.

---

## Agent Architecture & Workflow Mapping

**AGENT 1: JARVIS (Content Intelligence Lead)**

**Role:** Research, strategy, content creation, voice consistency
**Workflows Owned:**
1. `research-topic` - Deep research on any topic
   - **Triggers Skills:** deep-web-research (via context: "research {topic}" + depth parameter), research-synthesizer (via context: "synthesize findings into categories")
   - **Updates Notion:** Status Idea→Research, adds research URL to Notes relation

2. `analyze-profile` - Analyze creator profiles for insights
   - **Triggers Skills:** profile-analysis (via context: "analyze {platform} profile {url}"), evidence-tracker (via context: "track top performing posts")
   - **Updates Notion:** Creates child content for competitive analysis

3. `competitive-analysis` - Multi-profile comparison
   - **Triggers Skills:** profile-analysis (via context: "analyze profiles" repeated for your + competitors), research-synthesizer (via context: "identify gaps and strategic opportunities")
   - **Updates Notion:** Links to Keywords DB with focus keywords

4. `generate-ideas` - Create evidence-backed content ideas
   - **Triggers Skills:** deep-web-research (via context: "research {seed_topic}" if no research file), research-synthesizer (via context: "generate idea cards with hooks and outlines")
   - **Updates Notion:** Creates new pages in Content Tracker with Status="Idea", sets Category and Priority

5. `learn-voice` - Extract writing voice from historical content
   - **Triggers Skills:** voice-matcher (via context: "analyze {post_count} posts and extract rhetorical DNA")
   - **Updates Notion:** Saves voice profile version to memories.md (not Notion)

6. `write-post` - Generate social media posts
   - **Triggers Skills:** post-writer (via context: "generate {platform} post about {topic} using {voice_profile}"), voice-matcher (via context: "validate voice consistency"), platform-formatter (via context: "format for {platform} specs")
   - **Updates Notion:** Status Research→Writing→Editing, saves Content Text field, sets Publish Date

7. `write-script` - Generate video scripts with thumbnails
   - **Triggers Skills:** video-script-writer (via context: "generate {format} script for {duration} minute video"), youtube-thumbnail-mastery (via context: "suggest 3 CTR-optimized thumbnail concepts")
   - **Updates Notion:** Saves script to Content Text, thumbnail concepts to "Thumbnail ideas" property

**Jarvis Skill Dependencies:**
- deep-web-research, post-writer, video-script-writer, profile-analysis, voice-matcher, platform-formatter, research-synthesizer, evidence-tracker, youtube-growth-mastery, youtube-thumbnail-mastery, social-media-research, youtube-research

---

**AGENT 2: ZOE (Visual Production Specialist - Images + Videos Merged)**

**Role:** All visual content creation (images, videos, graphics, animations)
**Workflows Owned:**
1. `create-single-image` - Generate single optimized image
   - **Triggers Skills:** create-image (via context: "generate {design_choice} image for {platform}"), platform-specs (via context loading platform requirements), linkedin-design or youtube-thumbnail-design (via design choice context)
   - **Updates Notion:** Adds image URL to page, keeps Status="Editing"

2. `create-carousel` - Generate multi-slide carousel (2-10 images)
   - **Triggers Skills:** create-image (via context: "generate slide {n} of carousel about {topic}"), linkedin-design (via context: "LinkedIn carousel dark tech aesthetic")
   - **Updates Notion:** Adds all image URLs to page media property

3. `edit-image` - Modify existing images
   - **Triggers Skills:** edit-image (via context: "edit image at {path} to {edit_prompt}")
   - **Updates Notion:** Replaces image URL with edited version

4. `blend-images` - Composite 2-3 images
   - **Triggers Skills:** blend-images (via context: "composite {image_count} images with {blend_description}")
   - **Updates Notion:** Adds blended image URL

5. `create-talking-head` - Generate HeyGen avatar video
   - **Triggers Skills:** None (direct HeyGen MCP call, no skill needed for simple avatar generation)
   - **Updates Notion:** Adds video URL, sets Status="Posted" when complete

6. `create-scene` - Generate b-roll or diagram animation
   - **Triggers Skills:** veotools-mastery (via context: "animate diagram/generate b-roll using Veo 3 with {aspect_ratio}")
   - **Updates Notion:** Adds video URL

7. `create-cinematic-sequence` - Multi-scene video with stitching
   - **Triggers Skills:** veotools-mastery (via context: "plan multi-scene cinematic video"), create-image (via context: "generate keyframe images for scenes"), veotools-mastery (via context: "animate scenes and merge")
   - **Updates Notion:** Adds final video URL

**Zoe Skill Dependencies:**
- create-image, edit-image, blend-images, veotools-mastery, platform-specs, linkedin-design, youtube-thumbnail-design, mcp-tool-selection, generating-sid-images

---

**AGENT 3: ZORO (Publishing & Distribution Specialist)**

**Role:** Multi-platform publishing, validation, scheduling via Postiz, analytics tracking
**Workflows Owned:**

**Publishing Strategy:** ALL scheduling done via Postiz MCP for multi-platform consistency and unified queue management. Direct APIs (Twitter, LinkedIn, YouTube) used only for immediate "post now" operations when Postiz not needed.

1. `schedule-post` - Schedule content for future posting across platforms
   - **Triggers Skills:** None (direct Postiz MCP integration)
   - **Platforms Supported:** Twitter, LinkedIn, Instagram, Facebook, TikTok, YouTube
   - **Updates Notion:** Sets future Publish Date, Status stays "Editing" until Postiz auto-publishes at scheduled time, then requires manual update to "Posted"

2. `publish-tweet-now` - Immediate Twitter posting (bypass Postiz for urgent posts)
   - **Triggers Skills:** None (direct Twitter API via mcp-twitter or custom twitter-api-client module)
   - **Updates Notion:** Status Editing→Posted, sets Publish Date to now(), prompts for Views/Likes tracking

3. `publish-linkedin-now` - Immediate LinkedIn posting (bypass Postiz for urgent posts)
   - **Triggers Skills:** None (direct LinkedIn API via custom linkedin-api-client module)
   - **Updates Notion:** Updates Posted status, tracks Channel relation

4. `publish-youtube-now` - Immediate YouTube upload (bypass Postiz for video uploads)
   - **Triggers Skills:** None (direct YouTube Data API v3 via youtube-uploader-mcp)
   - **Updates Notion:** Updates Posted status, prompts user to manually add YouTube URL for analytics tracking
   - **Note:** YouTube videos uploaded as Private by default for safety, user changes to Public in YouTube Studio

5. `check-rate-limits` - Validate Postiz quotas and direct API limits
   - **Triggers Skills:** None (queries Postiz MCP integration stats and agent memories)
   - **Shows:** Postiz scheduled posts count, Twitter/LinkedIn/YouTube API limits remaining
   - **Updates Notion:** N/A (informational only)

**Zoro Skill Dependencies:**
- None (Zoro is pure API/MCP integration layer, no autonomous skills needed—validation and formatting logic embedded in workflow steps)

---

## Skill → Tool Mapping

**deep-web-research Skill:**
- **Tools Used:** WebSearch (free), Exa (neural search, $0.05-0.15), Firecrawl (web scraping with caching), Apify (platform scrapers)
- **Apify Actors:** apify/instagram-scraper, clockworks/tiktok-scraper, apidojo/twitter-scraper-lite, apify/youtube-scraper
- **Routing Logic:** depth=quick→WebSearch only, depth=standard→Exa, depth=comprehensive→Exa+Firecrawl, depth=exhaustive→Exa+Firecrawl+Apify (user approval required)
- **Tool Evolution:** Current Apify actors documented as best practice (Oct 2025). If better scrapers emerge or current ones become unreliable, skill will update tool selection. Workflows calling this skill unaffected by tool changes.

**post-writer Skill:**
- **Tools Used:** None (pure Claude generation using learned voice + platform formulas)
- **Methodologies:** Justin Welsh PAIPS (LinkedIn), Greg Isenberg questions (Twitter), Paul Graham essays (Substack)
- **Tool Evolution:** May add MCP tools for grammar checking, SEO optimization, or A/B testing in future iterations

**video-script-writer Skill:**
- **Tools Used:** None (pure Claude generation using scriptwriting methodologies)
- **Methodologies:** Ali Abdaal storytelling, MKBHD review structure, YouTube chapter timestamps
- **Tool Evolution:** May integrate youtube-research skill for trending format analysis

**profile-analysis Skill:**
- **Tools Used:** Apify (platform scrapers), social-media-mcp (Brave + Perplexity for trends)
- **Apify Actors:** apify/instagram-scraper (profile + posts + metrics), clockworks/tiktok-scraper (profile + videos), apidojo/twitter-scraper-lite (tweets + profile)
- **Tool Evolution:** May add direct platform APIs (Instagram Graph API, TikTok Research API) if access granted. Current scrapers work but may need replacement as platforms change anti-bot measures.

**voice-matcher Skill:**
- **Tools Used:** None (pure Claude analysis of historical content)
- **Data Source:** User's 77+ historical posts analyzed for patterns
- **Tool Evolution:** May integrate sentiment analysis MCP or stylometry tools for deeper voice profiling

**create-image Skill:**
- **Tools Used:** nanobanana (Gemini 2.5 Flash, $0.002-0.004/image), gpt-image-1 (DALL-E 3, $0.04-0.08/image)
- **Tool Selection:** Default to nanobanana for cost efficiency, use gpt-image-1 when quality >cost priority or when specific DALL-E features needed
- **Tool Evolution:** Monitor new models (Imagen 4, Midjourney API if released, FLUX Kontext Pro via fal-video). Update based on quality/cost benchmarks.

**edit-image Skill:**
- **Tools Used:** nanobanana (edit mode), gpt-image-1 (edit mode)
- **Tool Evolution:** May add Cloudinary transformation API for programmatic edits (crop, resize, filters)

**blend-images Skill:**
- **Tools Used:** nanobanana (multi-image input mode)
- **Tool Evolution:** May add custom compositing if nanobanana blending quality insufficient

**veotools-mastery Skill:**
- **Tools Used:** veotools (Veo 3 via Google AI Studio), fal-video (Veo 3, Luma Ray 2, Kling 2.1, Pixverse V4.5, Sora 2 via Fal.ai), heygen (talking head avatars)
- **Model Selection:** HeyGen for avatars ($0.20-0.50/min, high quality faces), Veo 3 for fast b-roll ($0.30-0.60/8sec), Fal-Video Luma/Kling for cinematic ($1-3/video)
- **Tool Evolution:** Video generation rapidly improving. Currently Veo 3 best quality/cost for b-roll, but Sora 2, Kling 3, and others launching. Skill will benchmark and update model preferences quarterly based on quality/cost/speed.

**youtube-thumbnail-mastery Skill:**
- **Tools Used:** None (strategic knowledge: MrBeast 6 pillars, Thomas Frank AIDA, CTR psychology)
- **Tool Evolution:** May integrate CTR prediction API or A/B testing data if available

**linkedin-design Skill:**
- **Tools Used:** None (design system knowledge: dark monochrome palette, typography rules, layout templates)
- **Tool Evolution:** May formalize into Figma templates or Cloudinary transformation presets

**research-synthesizer Skill:**
- **Tools Used:** None (pure Claude synthesis of research findings)
- **Tool Evolution:** May integrate citation management or fact-checking MCPs

**platform-formatter Skill:**
- **Tools Used:** None (formatting rules per platform)
- **Tool Evolution:** May add HTML-to-markdown converters or platform-specific preview generators

---

## Skill Discovery & Description Field Optimization

**How Claude Discovers Skills:**

Skills are **model-invoked**—Claude autonomously decides when to use them by matching current task context against skill descriptions. The `description` field in SKILL.md frontmatter is CRITICAL for discovery.

**Description Best Practices:**

Each skill must have discovery-optimized description including:
1. **What the skill does** (capabilities)
2. **When to use it** (trigger conditions)
3. **Key terms users/workflows mention** (discovery keywords)

**Examples from Current System:**

**post-writer skill:**
```yaml
---
name: post-writer
description: Generate platform-optimized social media posts using proven formulas (Justin Welsh PAIPS for LinkedIn, Greg Isenberg questions for Twitter, Paul Graham essays for Substack). Use when creating LinkedIn posts, Twitter threads, Substack essays, or any social media content requiring voice-matched writing.
---
```
**Triggers:** "LinkedIn post", "Twitter thread", "social media content", "voice-matched"

**deep-web-research skill:**
```yaml
---
name: deep-web-research
description: Multi-tool research orchestrator using Exa neural search, Apify platform scrapers, Firecrawl web scraping, and WebSearch. Intelligently routes between tools based on depth parameter (quick=free, comprehensive=paid). Use when researching topics, gathering web data, analyzing trends, or scraping social media platforms.
---
```
**Triggers:** "research", "web data", "Exa", "Apify", "scraping", "trends"

**veotools-mastery skill:**
```yaml
---
name: veotools-mastery
description: Google Veo 2.0/3.0/3.1 video generation expertise for animating diagrams, creating b-roll scenes, and image-to-video conversion. Knows model selection (veo-3.1-fast for iteration, veo-3.1-standard for quality), aspect ratio optimization (16:9 YouTube, 9:16 Shorts), and async job management. Use when generating videos from images, animating diagrams, or creating b-roll footage.
---
```
**Triggers:** "animate diagram", "video from image", "b-roll", "Veo"

**Avoiding Skill Conflicts:**

When skills have overlapping domains, use **distinct trigger terms** in descriptions:

**Problem:** Multiple research skills could conflict
**Solution:** Differentiate by domain

```yaml
# deep-web-research
description: Web scraping and neural search using Exa, Apify, Firecrawl. Use for general web research, trending topics, and data gathering.

# youtube-research
description: YouTube-specific research including video analysis, transcript extraction, retention patterns. Use when researching YouTube content, analyzing videos, or studying creator strategies.

# social-media-research
description: Platform trend analysis for Twitter, LinkedIn, Instagram using social-media-mcp and Brave/Perplexity. Use when tracking trending topics, viral content, or platform-specific trends.
```

**Discovery Process in Workflows:**

When workflow step says: "Research {topic} with depth=comprehensive"

Claude's discovery process:
1. Analyzes context: task=research, depth=comprehensive, domain=web
2. Scans available skills for description matches
3. Finds: deep-web-research (description contains "research", "Exa", "Apify", "depth parameter")
4. Loads deep-web-research/SKILL.md
5. Executes skill instructions with available tools
6. Returns research results to workflow

**Workflow authors optimize for discovery by:**
- Using specific task terminology ("research" not "find stuff")
- Including parameters mentioned in skill descriptions ("depth=comprehensive" matches deep-web-research's "depth parameter")
- Providing rich context (topic, platform, format) that skills can match against

---

## Notion Integration Architecture

**Content Tracker Database:**
- **Data Source URL:** `collection://956447a76e7b4b2eafb1e4c9adfcbcf3`
- **Purpose:** Central hub for all content ideas, workflow status, and metadata
- **Status Workflow:** Idea → Research → Next Up → Writing → Editing → Posted → Archived
- **Agent Status Triggers:**
  - Jarvis: Reads from Idea/Research/Next Up, writes to Research/Writing/Editing
  - Zoe: Reads from Editing (no media), writes media URLs, keeps Editing status
  - Zoro: Reads from Posted (ready to publish), updates to Posted with Publish Date

**Key Properties Used by Agents:**
- **Name** (title) - Content title (Jarvis creates)
- **Status** (status) - Workflow stage (all agents update)
- **Channel** (relation) - Target platform(s) (Jarvis links, Zoro validates)
- **Category** (select) - Content category (Jarvis sets based on topic)
- **Priority** (select) - Urgency (Jarvis sets, user can override)
- **Publish Date** (date) - When published/scheduled (Jarvis estimates, Zoro confirms)
- **Content Text** (text) - Post body or script (Jarvis populates)
- **Thumbnail ideas, YouTube Title ideas** (text) - Platform-specific metadata (Jarvis from write-script)
- **Views, Likes, Comments** (number) - Performance metrics (Zoro prompts user to add after publishing)
- **Focus Keywords** (relation) - SEO keywords (Jarvis links from Keywords DB)
- **Notes** (relation) - Research sources (Jarvis links research brief pages)

**MCP Server:** Notion MCP (`@notionhq/notion-mcp-server`)
- **Authentication:** Integration token (ntn_***) stored in Claude Code MCP settings
- **Permissions:** Read content, Update content, Insert content
- **Shared With:** Content Dashboard page + all child databases

---

## Postiz Integration Architecture

**Purpose:** PRIMARY multi-platform publishing and scheduling hub
**Strategic Decision:** Use Postiz MCP as the unified publishing interface for all platforms (Twitter, LinkedIn, Instagram, Facebook, TikTok, YouTube), with direct APIs available only for urgent immediate posting when scheduling not appropriate.

**Primary Use Cases:**
1. **Schedule posts for future dates** (recommended default) - Queue content with optimal posting times
2. **Multi-platform distribution** - Post to multiple platforms simultaneously from single interface
3. **Unified queue management** - View all scheduled content in Postiz dashboard
4. **Analytics tracking** - Centralized performance metrics (Views/Likes/Comments) across platforms

**Integration Points:**
- **Primary Workflow:** `schedule-post` workflow (Zoro's main publishing interface)
  - Handles: Twitter, LinkedIn, Instagram, Facebook, TikTok, YouTube
  - User specifies: platforms[], post_content, media_paths[], schedule_date (future timestamp or "next-free-slot")
  - Postiz handles: Platform-specific formatting, media upload, queue management, auto-publishing at scheduled time
- **Backup Workflows:** `publish-{platform}-now` (immediate posting when scheduling not appropriate)
  - Use cases: Breaking news, urgent announcements, time-sensitive content
  - Trade-off: Loses unified queue, manual per-platform posting, no analytics aggregation
  - Advantage: Full API feature access (Twitter Premium 25k chars, LinkedIn carousels), lower latency

**Why Postiz Primary:**
- **Consistency:** All platforms use same publishing interface (no switching between Twitter API, LinkedIn API, YouTube API)
- **Batch efficiency:** Queue multiple posts across platforms in single session
- **Optimal timing:** Schedule for best engagement times without manual posting
- **Unified analytics:** All performance data in one dashboard
- **Less complexity:** One integration to maintain vs 3+ separate APIs

**MCP Server:** Postiz MCP (`mcp__postiz`)
- **Tools Available:**
  - integrationList: Get connected platform accounts
  - integrationSchema: Get platform-specific requirements (char limits, media formats)
  - integrationSchedulePostTool: Queue posts for future publishing
  - generateImageTool: Optional AI image generation (we use Zoe instead)
  - generateVideoTool: Optional AI video generation (we use Zoe instead)
- **Authentication:** Postiz API key + platform OAuth tokens managed via Postiz dashboard
- **Supported Platforms:** Twitter, LinkedIn, Instagram, Facebook, TikTok, YouTube, Pinterest, Reddit, Mastodon, Threads
- **Tool Evolution:** Postiz adding more platforms monthly. Workflows adapt as new capabilities emerge (e.g., Bluesky, Threads, new platforms).

---

## Repository Structure & Service Architecture

**Repository Type:** Modular Monorepo
**Structure:**
```
/
├── .claude/
│   ├── commands/               # Agent menu definitions
│   │   ├── jarvis/
│   │   │   └── jarvis.md       # Jarvis agent persona + menu
│   │   ├── zoe/               # (To be created by merging ai-image-generator + ai-video-agent)
│   │   │   └── zoe.md
│   │   └── zoro/              # (Rename from social-posting-agent)
│   │       └── zoro.md
│   └── skills/                # Skill knowledge modules (Claude Code Skills = autonomous VMs)
│       ├── jarvis/
│       │   ├── deep-web-research/
│       │   │   ├── SKILL.md
│       │   │   ├── reference/
│       │   │   └── examples/
│       │   ├── post-writer/
│       │   ├── video-script-writer/
│       │   └── ... (12 total skills)
│       ├── zoe/               # (Merged from ai-image-generator + ai-video-agent skills)
│       │   ├── create-image/
│       │   ├── video-generation/
│       │   ├── veotools-mastery/
│       │   └── ... (9 total skills)
│       └── shared/            # Skills usable by multiple agents
│           ├── visual-prompt-mastery/
│           └── skill-creator/
├── bmad/
│   ├── agents/                # Agent implementation + workflows
│   │   ├── jarvis/
│   │   │   ├── jarvis.md      # Agent definition
│   │   │   ├── config.yaml
│   │   │   ├── jarvis-sidecar/
│   │   │   │   ├── memories.md        # Voice profiles, preferences, API tracking
│   │   │   │   └── workflows/
│   │   │   │       ├── research-topic/
│   │   │   │       │   ├── workflow.yaml
│   │   │   │       │   ├── instructions.md
│   │   │   │       │   └── template.md
│   │   │   │       ├── write-post/
│   │   │   │       └── ... (7 workflows)
│   │   ├── zoe/               # (Merged agent)
│   │   │   ├── zoe.md
│   │   │   ├── zoe-sidecar/
│   │   │   │   └── workflows/
│   │   │   │       ├── create-single-image/
│   │   │   │       ├── create-talking-head/
│   │   │   │       └── ... (7 workflows)
│   │   └── zoro/
│   │       ├── zoro.md
│   │       ├── zoro-sidecar/
│   │       │   └── workflows/
│   │       │       ├── publish-tweet/
│   │       │       ├── publish-linkedin/
│   │       │       └── ... (6 workflows)
│   └── modules/               # Shared utilities
│       ├── twitter-api-client/    # Node.js Twitter Premium OAuth client
│       └── linkedin-api-client/   # Node.js LinkedIn OAuth client
├── docs/
│   ├── brief.md               # This Project Brief
│   ├── prd.md                 # This PRD
│   ├── notion-content-dashboard.md    # Notion DB schemas and agent integration guide
│   ├── postiz-mcp.md         # Postiz integration guide
│   └── content-intelligence/  # Research and session documentation
├── outputs/                   # Centralized output management (all agents write here)
│   └── {date}/
│       └── {session}/
│           ├── posts/
│           ├── research/
│           ├── images/
│           ├── videos/
│           └── handoffs/
└── .bmad-core/               # PM agent + workflow/agent creation templates
    ├── templates/
    └── tasks/
```

**Design Principles:**
- **Loose coupling:** Each agent folder is self-contained, can be added/removed independently
- **No central registry:** Agents discovered via .claude/commands/, skills via .claude/skills/, no manifest files to update
- **Dual location pattern:** Agent definitions in both .claude/commands/ (Claude Code reads) and bmad/agents/ (source of truth with workflows/config)
- **Skill organization by agent:** Skills grouped in agent-named folders (.claude/skills/jarvis/, .claude/skills/zoe/) for developer convenience and discoverability, NOT hard restrictions
  - **Critical:** Claude can discover and use ANY skill regardless of folder location—organization is a hint, not a boundary
  - Example: Zoe can use jarvis/voice-matcher if generating voice-matched image captions (Claude discovers based on description matching)
  - Example: Jarvis can use zoe/create-image if workflow step requires image generation (model-invoked, not agent-restricted)
  - Shared skills (visual-prompt-mastery, skill-creator) available to all agents
  - Organization pattern: Primary agent owner's folder, but cross-agent usage expected and encouraged

---

## Testing Requirements

**Testing Strategy:** Manual validation during MVP, automated testing in Phase 2

**MVP Testing Approach:**
1. **Unit testing:** Individual skill invocations (does post-writer generate content with voice >8/10?)
2. **Workflow testing:** End-to-end workflow execution (does research-topic complete all steps without errors?)
3. **Integration testing:** Agent handoffs (does Jarvis→Zoe→Zoro pipeline work with Notion status updates?)
4. **Tool testing:** Validate each Apify actor, image model, video provider works as expected
5. **Cost tracking:** Monitor actual vs estimated costs per workflow execution

**Test Artifacts:**
- Test session outputs in outputs/testing/{date}/
- Tool performance log (cost, speed, quality scores)
- Workflow success rate tracking (95% target)

**Testing Cadence:**
- **Daily:** Run 1-2 end-to-end pipelines with real content
- **Weekly:** Review cost data, update tool selection if needed
- **Monthly:** Audit workflow standardization compliance

---

## Additional Technical Assumptions

**Data Persistence Strategy:**
- **Transient (session):** outputs/{date}/{session}/ - cleared after 30 days or manually
- **Persistent (config):** agent memories.md, voice profiles, preferences - version controlled in git
- **Collaborative (Notion):** Content Tracker, channels, keywords, tasks - authoritative source, agents sync to it
- **Hybrid (handoffs):** JSON packages saved to outputs/ AND summarized in Notion page properties

**Tool Choice Philosophy:**
- **Free-first:** Always try WebSearch, WebFetch before paid APIs
- **Cost-conscious:** nanobanana ($0.002/image) before gpt-image-1 ($0.04/image) unless quality demands it
- **User-approved:** Operations >$1 require explicit confirmation (video generation, exhaustive research)
- **Documented & evolvable:** Current tool choices = "best practice as of [date]", explicit mechanism to update as ecosystem matures
- **Abstracted in skills:** Workflows don't call tools directly, skills handle tool orchestration and can optimize over time

**Notion vs Local Outputs Trade-off:**
- **Notion advantages:** Shared workspace, status-driven collaboration, mobile access (check status on phone), analytics (Views/Likes), relational data (Keywords, Channels)
- **Local outputs/ advantages:** Full artifacts (research briefs, multi-page content), version history (git tracked), no API dependencies, faster access
- **MVP Approach:** Use both—Notion for status/metadata/coordination, local for complete artifacts. Notion pages link to local files via URLs when needed.

---
