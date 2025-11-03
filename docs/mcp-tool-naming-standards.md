<!-- Powered by BMAD™ Core -->

# MCP Tool Naming Standards

**Version:** 1.0
**Date:** 2025-11-02
**Purpose:** Authoritative reference for MCP tool naming conventions in Claude Code

---

## Official Naming Patterns

Claude Code uses **TWO different naming patterns** for MCP tools based on provider:

### ⚠️ SPECIAL CASE: Notion Tool Double Naming

Notion tools have a **unique double naming pattern** - both names work:

**Internal Registration:** `mcp__notion__notion-search`
**Invocation Name:** `notion-search` (simplified)

**Both are valid when calling tools:**

```javascript
// ✅ Preferred (simple name)
notion - search({ query: '...' });

// ✅ Also works (full name)
mcp__notion__notion - search({ query: '...' });
```

**Why the difference?**

- Official Anthropic MCPs get simplified invocation names
- Claude Code allows both full and simple names for Notion
- Documentation should use simple names for clarity

**Other MCPs:** MUST use full names - cannot be simplified

- ❌ Won't work: `fal-video({...})`
- ✅ Must use: `mcp__fal-video__execute_custom_model({...})`

**Rule of Thumb:**

- **Notion:** Use simple names (notion-search, notion-fetch)
- **Everything else:** Use mcp** prefix (mcp**fal-video\_\_execute_custom_model)

---

### Pattern A: Simple Names (Official Anthropic MCPs)

**Used by:** @notionhq/notion-mcp-server, other official Anthropic MCPs

**Format:** `toolname-with-hyphens`

**Examples:**

- `notion-search`
- `notion-fetch`
- `notion-create-pages`
- `notion-update-page`

**When to use:** Official Anthropic-provided MCPs (clean names, no namespacing needed)

### Pattern B: Prefixed Names (Third-Party MCPs)

**Used by:** Community MCPs, third-party providers

**Format:** `mcp__server-name__tool-name` (double underscores)

**Examples:**

- `mcp__fal-video__execute_custom_model`
- `mcp__nanobanana__generate_image`
- `mcp__cloudinary-asset-mgmt__upload-asset`
- `mcp__postiz__integrationSchedulePostTool`
- `mcp__exa__search`

**When to use:** All third-party MCPs (namespacing prevents conflicts)

---

## Complete Tool Reference

### Notion MCP (Simple Names)

```
notion-search
notion-fetch
notion-create-pages
notion-update-page
notion-move-pages
notion-create-database
notion-update-database
notion-create-comment
notion-get-comments
notion-duplicate-page
notion-get-teams
notion-get-users
```

### Image Generation (Prefixed Names)

```
mcp__nanobanana__generate_image
mcp__nanobanana__upload_file
mcp__nanobanana__show_output_stats

mcp__gpt-image-1__create_image
mcp__gpt-image-1__create_image_edit
```

### Video Generation (Prefixed Names)

**PRIMARY:**

```
mcp__fal-video__execute_custom_model
  ↳ Endpoint: "fal-ai/veo-3"
  ↳ Endpoint: "fal-ai/luma-dream-machine-ray2"
  ↳ Endpoint: "fal-ai/kling-video/v1.5/pro/text-to-video"
  ↳ Plus 19 more models

mcp__fal-video__list_available_models
```

**SPECIALIZED:**

```
mcp__heygen__generate_avatar_video
mcp__heygen__get_voices
mcp__heygen__get_avatar_groups
mcp__heygen__get_avatars_in_avatar_group
mcp__heygen__get_avatar_video_status
mcp__heygen__get_remaining_credits
```

**DEPRECATED (Backup only):**

```
mcp__veotools__generate_start
mcp__veotools__generate_get
mcp__veotools__list_models
mcp__veotools__plan_scenes
```

### Publishing (Prefixed Names)

**PRIMARY - Postiz (ALL Platforms):**

```
mcp__postiz__integrationList
mcp__postiz__integrationSchema
mcp__postiz__integrationSchedulePostTool
mcp__postiz__triggerTool
mcp__postiz__generateImageTool
mcp__postiz__generateVideoTool
```

**Direct Twitter API (Backup):**

```
mcp__mcp_twitter__create_twitter_post
mcp__mcp_twitter__reply_twitter_tweet
mcp__mcp_twitter__create_and_post_twitter_thread
mcp__mcp_twitter__get_last_tweet
```

### Media Storage (Prefixed Names)

**CRITICAL for Postiz:**

```
mcp__cloudinary-asset-mgmt__upload-asset
mcp__cloudinary-asset-mgmt__search-assets
mcp__cloudinary-asset-mgmt__list-images
mcp__cloudinary-asset-mgmt__get-asset-details
mcp__cloudinary-asset-mgmt__transform-asset
```

### Research (Prefixed Names)

```
mcp__exa__search

mcp__firecrawl__firecrawl_search
mcp__firecrawl__firecrawl_scrape
mcp__firecrawl__firecrawl_map
mcp__firecrawl__firecrawl_crawl

mcp__apify__search-actors
mcp__apify__fetch-actor-details
mcp__apify__call-actor
mcp__apify__get-actor-output
mcp__apify__apify-slash-instagram-scraper
mcp__apify__clockworks-slash-tiktok-scraper
```

### Video Editing (Prefixed Names)

```
mcp__submagic__submagic_create_project
mcp__submagic__submagic_list_languages
mcp__submagic__submagic_list_templates
mcp__submagic__submagic_get_project
mcp__submagic__submagic_export_project
```

---

## Documentation Conventions

### In Conceptual/Narrative Docs

**Use:** Simple, readable names
**Example:** "Use notion-search to find content"
**Why:** Easier to read in prose

### In Code Examples & Agent Instructions

**Use:** Full MCP tool names
**Example:** `mcp__fal-video__execute_custom_model({...})`
**Why:** Prevents execution errors

### In Tool Registries

**Use:** Both (conceptual name + actual_tool_name field)
**Example:**

```yaml
- name: upload-asset # Conceptual
  actual_tool_name: mcp__cloudinary-asset-mgmt__upload-asset # Actual
```

---

## Common Mistakes

❌ **WRONG:** `mcp__notion__search` (Notion uses simple names)
❌ **WRONG:** `fal-video` (missing mcp** prefix)
❌ **WRONG:** `mcp_cloudinary_upload` (single underscore)
❌ **WRONG:** `cloudinary-upload-asset` (missing mcp** prefix)

✅ **CORRECT:** `notion-search` (simple name)
✅ **CORRECT:** `mcp__fal-video__execute_custom_model`
✅ **CORRECT:** `mcp__cloudinary-asset-mgmt__upload-asset`

---

## Video Tool Strategy

**PRIMARY:** fal-video for ALL video needs

- Universal hub: 22+ models in one interface
- Tool: `mcp__fal-video__execute_custom_model`
- Models: Veo 3, Luma Ray 2, Kling, Pixverse, and more
- Endpoints: "fal-ai/veo-3", "fal-ai/luma-ray-2", etc.

**SPECIALIZED:** heygen for talking heads ONLY

- Tool: `mcp__heygen__generate_avatar_video`
- Use case: Avatar presenter videos

**DEPRECATED:** veotools

- Status: Superseded by fal-video
- Reason: Veo 3 accessible via fal-video with 21 additional models
- Keep for: Backup only if fal-video unavailable

---

## Publishing Strategy

**PRIMARY:** Postiz for ALL platforms

- Tool: `mcp__postiz__integrationSchedulePostTool`
- Platforms: Twitter, LinkedIn, Instagram, Facebook, TikTok, **YouTube**, Pinterest, Reddit, Mastodon, Threads
- **CRITICAL:** Requires HTML-formatted content via `formatForPostiz()` utility
- **CRITICAL:** Requires public URLs from Cloudinary (not local file paths)

**Workflow Pattern:**

```
1. Generate content (Jarvis)
2. Create media (Zoe) → Local file
3. Upload to Cloudinary → Public URL
4. Format content as HTML
5. Schedule via Postiz → ALL platforms
```

---

## How to Find Tool Names

### Method 1: Use /mcp Command (Recommended)

```bash
/mcp
# Lists all available MCPs with their tools
```

### Method 2: Check System Context

- Available tools listed in Claude Code function descriptions
- Look for `mcp__` prefix pattern

### Method 3: Read MCP Documentation

- Notion: https://github.com/notionhq/notion-mcp-server
- Cloudinary: Package documentation
- FAL: https://fal.ai/docs
- Postiz: Via integrationSchema tool

---

**Last Updated:** 2025-11-02
**Maintained By:** BMad Builder
**Review Frequency:** Monthly or when adding new MCPs
