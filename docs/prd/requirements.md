# Requirements

## Functional

**Content Intelligence & Research:**

- FR1: The system must support deep research on any topic using intelligent tool routing (free WebSearch → low-cost Exa neural search → comprehensive Exa+Firecrawl+Apify) with user-specified depth levels (quick, standard, comprehensive, exhaustive)
- FR2: All research outputs must include cited sources with URLs, timestamps, and reliability scores (high/medium/low) to enable verification and transparency
- FR3: The system must analyze social media profiles (Instagram, TikTok, Twitter, LinkedIn, YouTube) to extract posting patterns, content themes, engagement metrics, and audience insights
- FR4: The system must perform competitive analysis comparing multiple creator profiles to identify content gaps, differentiation opportunities, and strategic positioning

**Content Generation & Voice:**

- FR5: The system must learn and maintain user voice profiles from historical content (minimum 50 posts for ≥7/10 confidence, 75+ posts for ≥8/10 confidence) with support for multiple voice modes (primary, professional, casual, technical, humorous)
- FR6: The system must generate social media posts optimized for specific platforms (LinkedIn PAIPS formula <300 words, Twitter threads with Greg Isenberg questions, Substack essays with Paul Graham style) while maintaining learned voice consistency
- FR7: The system must generate video scripts with embedded timestamp markers, scene descriptions, thumbnail concepts, and platform-specific formatting (YouTube descriptions with chapters, Short-form hooks)
- FR8: All generated content must achieve minimum quality thresholds before handoff: voice confidence ≥8/10, research backing ≥3 credible sources, platform compliance 100%

**Visual Production:**

- FR9: The system must generate images optimized for platform specifications (LinkedIn 1200x627 dark monochrome, YouTube thumbnails 1280x720 CTR-optimized, Instagram 1080x1080 square, Twitter 1200x675)
- FR10: Image generation must support multiple modes: single image, multi-slide carousels (2-10 images), image editing (blur, color correction, object removal), and image blending (2-3 image compositing)
- FR11: All images must be evaluated using the Emily JSON 7-pillar quality framework (composition, color theory, typography, visual hierarchy, emotional impact, brand consistency, platform optimization) with scores ≥7/10 required for publication
- FR12: The system must generate videos in multiple formats: talking head (HeyGen avatars with consent verification), b-roll scenes (Veo 3, Fal-Video), and cinematic sequences (multi-scene stitching with transitions)
- FR13: Video generation must support platform-specific optimization: 9:16 vertical (Instagram Reels, YouTube Shorts, TikTok), 16:9 horizontal (YouTube, LinkedIn), and square 1:1 (Instagram feed)
- FR14: Videos must include optional captions (defaulted ON), platform-appropriate aspect ratios, and duration constraints (YouTube Shorts ≤3 min auto-detected, Instagram Reels ≤90 sec, TikTok ≤10 min)

**Multi-Platform Publishing:**

- FR15: The system must publish to Twitter Premium API with support for: 25,000 character posts, 1-4 images per post, video attachments, and threaded replies (auto-linked parent-child relationships)
- FR16: The system must publish to LinkedIn API with support for: text posts, single image posts, multi-image carousels (2-20 images), PDF carousels (multi-page documents), and video posts
- FR17: The system must publish to YouTube Data API v3 with support for: regular videos with full metadata (title, description, tags, category), and auto-detected Shorts (9:16 aspect ratio, ≤3 min duration)
- FR18: The system must validate all content before publishing: character limits (Twitter 25k Premium/280 standard, LinkedIn 3000), media formats (PNG/JPG/MP4), file sizes (Twitter 5MB images/512MB video, LinkedIn 8MB images/200MB video), and hashtag counts (LinkedIn ≤3 optimal, Twitter no hard limit)
- FR19: The system must track and enforce API rate limits: Twitter Premium 1500 posts/month, LinkedIn 150 posts/day, YouTube 6 uploads/day, with warnings at 80% utilization and blocking at 100%
- FR20: The system must support multi-platform scheduling via Postiz MCP for queued posting across Twitter, LinkedIn, Instagram, Facebook, and TikTok

**Agent Coordination & Handoffs:**

- FR21: Agents must communicate via standardized JSON handoff packages containing: source agent, target agent, content type, platform specs, file paths, metadata (voice version, quality scores, timestamps)
- FR22: Handoff packages must be validated against JSON schema before agent transition to prevent coordination failures
- FR23: All agent outputs must be saved to centralized outputs/{date}/{session}/ directory structure with session metadata, preventing scattered files across agent folders
- FR24: Workflows must support pause/resume functionality, saving progress at each step to prevent data loss during long-running processes (research, multi-image generation)

**Workflow System:**

- FR25: All workflows must use external instructions.md files (no embedded YAML or JavaScript code blocks) following standardized XML workflow format
- FR26: Workflows must support conditional execution based on context (skip UI Goals section if no UX requirements, skip video generation if text-only post)
- FR27: Workflows must provide clear user guidance at each step, explaining what's happening and what input is needed (no implicit behavior)
- FR28: Workflows must implement error handling patterns for common failures (API timeouts, rate limits, cost thresholds, invalid inputs) with graceful degradation (fallback to free tools when paid APIs fail)

**System Extensibility:**

- FR29: New agents must be addable by creating single .md definition file in .claude/commands/ and bmad/agents/ without modifying existing agents or central registries
- FR30: New skills must be addable by creating folder with SKILL.md in .claude/skills/{agent}/ following standardized structure (Purpose, Instructions, Reference Documentation, Examples)
- FR31: New workflows must be addable by following create-workflow template (workflow.yaml + instructions.md + template.md) without breaking existing workflows
- FR32: Skills must be composable—any workflow can invoke any skill, enabling mix-and-match reuse as needs evolve
- FR33: The system must provide clear guidelines for extensibility decisions: when to create new agent vs add workflow to existing agent, when to create skill vs call MCP directly, when to create workflow vs extend existing workflow

**Workflow Architecture & Quality:**

- FR34: Each agent must document which workflows it owns with clear descriptions (e.g., Jarvis: research-topic, write-post, analyze-profile, competitive-analysis, generate-ideas, learn-voice, write-scripts)
- FR35: Each workflow must document which skills it triggers (via context creation) and at which steps, enabling transparency about skill discovery patterns (e.g., research-topic workflow step 2 creates context "research {topic} with depth={depth}" triggering deep-web-research skill, step 3 creates context "synthesize findings" triggering research-synthesizer skill)
- FR36: Workflows must define clear success criteria and validation checkpoints at each step to ensure quality before proceeding (e.g., research must have ≥3 credible sources before writing step begins)
- FR37: Workflows must support both linear execution (step 1→2→3) and conditional branching (if content-type=text-only, skip visual generation steps) based on runtime context
- FR38: The system must maintain a workflow registry (Story 7.5) documenting purpose, owner agent, skills triggered (via context creation), and example use cases for each workflow to support discovery and reuse

**Tool Selection & Specificity:**

- FR39: The system must document specific tool choices for each use case with rationale: Apify actors (apify/instagram-scraper for Instagram, clockworks/tiktok-scraper for TikTok, apidojo/twitter-scraper-lite for Twitter), image models (nanobanana/Gemini 2.5 for cost, gpt-image-1/DALL-E 3 for quality), video providers (HeyGen for avatars, Veo 3 for b-roll, Fal-Video for cinematic)
- FR40: Skills that orchestrate multiple tools must implement intelligent routing based on parameters (e.g., deep-web-research skill routes: depth=quick→WebSearch free, depth=standard→Exa $0.05, depth=comprehensive→Exa+Firecrawl+Apify, depth=exhaustive→all tools with user approval)
- FR41: Tool selection criteria must be explicit and evolvable: current choices documented as "best practice as of [date]" with mechanism to update as new tools emerge or pricing/quality changes
- FR42: The system must track tool performance metrics (cost, quality, reliability, speed) to inform optimization decisions as usage patterns mature

**Notion Integration & Collaborative State:**

- FR43: The system must integrate with Notion Content Tracker database to manage content workflow status (Idea → Research → Next Up → Writing → Editing → Posted → Archived) with agents updating status as they complete work
- FR44: Agents must be status-aware: Jarvis checks for content in "Research" or "Next Up" status, Zoe checks for content in "Editing" status needing visuals, Zoro checks for content in "Posted" status ready to publish
- FR45: The system must create Notion pages for each content piece with proper relations: linked to Channel (My Channels DB), Keywords (Keywords DB), and Tasks (Action Items DB) to maintain relational integrity
- FR46: Agents must update Notion metadata as they work: Jarvis sets Publish Date and Next Actions, Zoe adds thumbnail URLs to page properties, Zoro updates Views/Likes/Comments after publishing

**Postiz Integration & Scheduling:**

- FR47: The system must use Postiz MCP as PRIMARY scheduling mechanism for all platforms (Twitter, LinkedIn, Instagram, Facebook, TikTok, YouTube) with future publish dates, providing unified queue management and multi-platform consistency
- FR48: Zoro agent must support BOTH scheduled posting via Postiz MCP (primary, recommended) and immediate "post now" operations via direct APIs (Twitter Premium API, LinkedIn API, YouTube Data API) for urgent content that can't wait for scheduled time, with user selecting mode at publish time

**Tool Evolution & Optimization:**

- FR49: Tool choices (Apify actors, image models, video providers) must be documented as "current best practice" with explicit acknowledgment they will evolve based on cost/quality/reliability data as system matures
- FR50: The system must support tool substitution without workflow changes: if apify/instagram-scraper becomes unreliable, workflows must adapt to use alternative scrapers by updating skill tool mapping, not rewriting workflow logic
- FR51: Skills must abstract tool complexity: workflows invoke "deep-web-research skill" not "call Exa API directly"—this enables skill to improve tool selection over time without breaking workflow callers

**Centralized Output Management:**

- FR52: All workflow outputs must be saved to standardized project-centric folder structure `outputs/projects/{YYYY-MM-DD}-{project-slug}/` with numbered lifecycle stages (00-session, 01-research, 02-ideas, 03-drafts, 04-media, 05-final, 06-published, handoffs/) enabling consistent organization, lifecycle tracking, and discoverability across all content projects
- FR53: All file names and folder names must use lowercase kebab-case format (e.g., `linkedin-post-ai-agents`, `research-brief.md`, `animated-diagram.mp4`) with no mixed case, underscores, or spaces to ensure consistency and prevent case-sensitivity issues across operating systems
- FR54: Each project folder must include `00-session/metadata.json` containing: Notion page URL, agents involved, workflows executed, skills triggered, costs breakdown, duration tracking, file inventory, and platform publishing status to enable bidirectional linking between local artifacts and Notion collaborative workspace
- FR55: Workflows must automatically create project folder structure from template (`outputs/templates/project-structure/`) if project doesn't exist, eliminating manual folder creation and ensuring structural consistency across all projects

## Non Functional

**Performance:**

- NFR1: Workflow execution must complete within reasonable timeframes: simple tasks <30 seconds (post formatting, validation), standard tasks <5 minutes (research + content generation), complex tasks <15 minutes (full pipeline with visuals)
- NFR2: Skill invocations must report progress for long-running operations (research >30 sec, image generation >30 sec, video generation >2 min) to provide user feedback
- NFR3: The system must minimize unnecessary file reads and API calls to stay within Claude Code context limits and reduce costs

**Cost Efficiency:**

- NFR4: Total monthly AI/API costs must remain under $50 for 30+ posts across platforms, with transparent tracking by service (Exa, Apify, Images, Videos)
- NFR5: The system must implement tiered tool selection prioritizing free options first (WebSearch before Exa, nanobanana before gpt-image-1) and requiring user approval for operations >$1
- NFR6: Cost per post must average <$1.50 across all content types (text-only $0.10-0.30, with images $0.50-1.00, with video $2-4)

**Reliability:**

- NFR7: The end-to-end pipeline (research → content → visuals → publish) must achieve 95% success rate without manual intervention or error recovery
- NFR8: The system must handle API failures gracefully with fallback options (free tools when paid fail, cached results when APIs timeout, user notification for unrecoverable errors)
- NFR9: All workflows must be resumable after interruption—state saved at each step, no loss of work if Claude Code crashes or user closes mid-session

**Quality & Consistency:**

- NFR10: Voice consistency must be validated on all generated text content with automatic flagging if confidence <8/10 for user review before publishing
- NFR11: All visual content (images, videos) must meet minimum quality thresholds (≥7/10 on Emily 7-pillar framework for images, platform optimization checks for videos) before handoff to publishing
- NFR12: Platform compliance must be enforced: character limits, media formats, file sizes, rate limits, hashtag counts—zero manual corrections required after validation

**Maintainability:**

- NFR13: All workflows must follow standardized format (external instructions.md, workflow.yaml with consistent YAML schema, template.md for outputs) to enable predictable behavior and easier debugging
- NFR14: Handoff packages between agents must use versioned JSON schemas with validation to prevent coordination failures when formats evolve
- NFR15: Documentation must be consolidated into single authoritative ARCHITECTURE.md with clear definitions, naming conventions, and extensibility guidelines to prevent knowledge fragmentation
- NFR16: The codebase must maintain clear separation of concerns: Agents (interface/persona), Workflows (process orchestration), Skills (reusable expertise), MCPs (external tools)—no mixing of responsibilities

**Security & Privacy:**

- NFR17: API keys must never be committed to git—stored in .env (gitignored) and referenced via MCP server configurations in Claude Code settings
- NFR18: User content must remain local in outputs/ directory with no transmission to third parties except when explicitly publishing to social platforms
- NFR19: The system must respect platform Terms of Service (no automation abuse, rate limit compliance, no prohibited content types)

**Extensibility & Evolution:**

- NFR20: The modular architecture must support organic growth—new agents/skills/workflows addable without modifying existing components, no central registries or dependency graphs required
- NFR21: Loose coupling must be maintained—agents coordinate via JSON handoffs (not direct calls), workflows invoke skills via natural language references (not hard dependencies), skills call MCPs via Claude Code platform (not direct imports)
- NFR22: Pattern documentation must enable confident extension—create-agent and create-workflow templates provide complete guidance for adding new components without consulting original developers
- NFR23: As the agentic ecosystem matures, skills and workflows must be refinable without breaking existing usage—versioning support for backward compatibility when patterns evolve

---
