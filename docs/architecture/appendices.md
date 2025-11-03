# Appendices

## Appendix A: Complete MCP Tool Inventory

**Notion MCP:**

- notion-search (query, filters, teamspace scoping)
- notion-fetch (page/database retrieval)
- notion-create-pages (bulk page creation)
- notion-update-page (property updates, content edits)
- notion-move-pages (parent reassignment)
- notion-create-database (schema definition)
- notion-update-database (schema updates)

**Postiz MCP:**

- integrationList (get connected accounts)
- integrationSchema (platform-specific requirements)
- integrationSchedulePostTool (queue future posts)
- generateImageTool (optional, we use Zoe instead)
- generateVideoTool (optional, we use Zoe instead)

**Exa MCP:**

- search (neural search, 10 auto + 5 similar results)

**Firecrawl MCP:**

- firecrawl_scrape (single URL scraping)
- firecrawl_crawl (multi-page crawling)
- firecrawl_map (sitemap discovery)

**Apify MCP:**

- fetch-actor-details (actor metadata)
- search-actors (actor discovery)
- call-actor (actor execution, two-step: info → call)

**nanobanana MCP:**

- generate_image (Gemini 2.5 Flash image generation)
- upload_file (Gemini Files API for large images)
- show_output_stats (usage statistics)

**gpt-image-1 MCP:**

- create_image (DALL-E 3 generation)
- create_image_edit (DALL-E 3 editing)

**veotools MCP:**

- list_models (available Veo models)
- generate_start (async video generation)
- generate_get (check job status)
- continue_video (video continuation + stitching)
- performance_start_trace (performance profiling)

**fal-video MCP:**

- luma_ray2 (Luma Dream Machine)
- kling_master_text (Kling 2.1 text-to-video)
- pixverse_text (Pixverse V4.5 text-to-video)
- ltx_video (LTX image-to-video)
- list_available_models (registry)

**HeyGen MCP:**

- get_remaining_credits (quota check)
- get_voices (available voice options)
- get_avatar_groups (avatar collections)
- get_avatars_in_avatar_group (avatar details)
- generate_avatar_video (talking head generation)
- get_avatar_video_status (job status)

**mcp-twitter MCP:**

- create_twitter_post (25k char posts, Premium)
- reply_twitter_tweet (threaded replies)
- get_last_tweet (profile retrieval)
- get_last_tweets_options (search with operators)
- create_and_post_twitter_thread (auto-linked threads)

**youtube-uploader-mcp:**

- authenticate (OAuth2 flow)
- accesstoken (token retrieval)
- channels (list user channels)
- refreshtoken (token refresh)
- upload_video (upload with metadata, auto-detect Shorts)

**social-media-mcp:**

- create_post (Brave + Perplexity, multi-platform scheduling)
- get_trending_topics (platform trends)
- research_topic (topic research with facts/news/hashtags)

## Appendix B: Glossary

**Agent:** User-facing persona-driven menu interface presenting numbered workflow options (custom term, ≈ Claude Code Slash Command)

**Workflow:** Multi-step process orchestrator with state management, YAML + external instructions.md (custom term, no direct Claude Code equivalent)

**Skill:** Autonomous expertise module Claude discovers via description matching (= Claude Code Agent Skill)

**MCP:** External tool integration (= Claude Code MCP Server)

**Notion Content Tracker:** Shared collaborative database for content status workflow (Idea → Research → Writing → Editing → Posted → Archived)

**Postiz:** PRIMARY multi-platform publishing hub for scheduled posts, unified queue management

**Enhanced Voice Profile v2.0:** User's rhetorical DNA extracted from 50+ historical posts across 10 dimensions (Argument Architecture, Voice Modes, Structural Frameworks, Proof Style, etc.) with ≥8/10 confidence

**Emily JSON Methodology:** 10-section structured image prompt format (scene, composition, lighting, color, typography, camera, mood, technical, style, brand) + 7-pillar quality evaluation framework (Clarity, Technical, Composition, Color, Typography, Professionalism, Accuracy)

**Handoff Package:** JSON coordination artifact between agents containing source/target agents, content type, platform specs, file paths, metadata (voice confidence, quality scores), Notion context

**Status-Driven Collaboration:** Architectural pattern where agents check Notion status before suggesting workflows and update status as work completes, enabling asynchronous coordination

**Model-Invoked Discovery:** Skill invocation pattern where Claude autonomously discovers and loads skills based on description matching (workflows don't explicitly call skills, Claude does via context analysis)

**Intelligent Tool Routing:** Cost-optimization strategy using tiered tool selection (free → low-cost → high-quality based on depth/quality parameters)

**Dual State Management:** Architectural pattern using local outputs/ for complete artifacts + Notion for metadata/status, enabling both comprehensive local storage and mobile-accessible collaborative state

**Organic Growth Model:** Extensibility approach where system grows through component addition (not modification), no central registries, pattern-based templates guide extension

## Appendix C: Related Documents

- [Product Requirements Document](./prd.md) - Complete functional/non-functional requirements, user stories, acceptance criteria
- [Project Brief](./brief.md) - Executive summary, goals, background context
- [Notion Content Dashboard Guide](./notion-content-dashboard.md) - Database schemas, property definitions, agent integration patterns
- [Postiz MCP Integration Guide](./postiz-mcp.md) - Publishing workflows, platform configurations, scheduling patterns

## Appendix D: Revision History

| Date       | Version | Changes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Author                    |
| ---------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| 2025-10-31 | 1.0     | Initial architecture document created                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Winston (Architect Agent) |
| 2025-11-05 | 1.1     | **CRITICAL ALIGNMENT UPDATES:** (1) Updated lifecycle from 7 stages to 6 stages (merged 05-final/ and 06-published/ into 05-published/), (2) Added platform subfolders to 03-drafts/ and 05-published/ (linkedin/, twitter/, youtube/, instagram/, tiktok/, substack/, facebook/), (3) Added platform-agnostic media philosophy section explaining 04-media/ reusability across platforms with cost efficiency examples, (4) Updated all legacy output path references from outputs/{date}/{session}/ to outputs/projects/{YYYY-MM-DD}-{slug}/, (5) Updated metadata.json schema to reflect platform-specific file_inventory structure. All changes align with PRD v1.0 requirements (FR52-55, Epic 7 Story 7.6). | BMad Builder              |

---

**End of Architecture Document**

This document will be sharded into modular docs (agent-architecture.md, workflow-architecture.md, skill-architecture.md, integration-architecture.md) in a future iteration for easier navigation while maintaining this comprehensive version as authoritative reference.
