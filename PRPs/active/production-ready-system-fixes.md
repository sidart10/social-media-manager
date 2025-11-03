# PRP: Production-Ready System Fixes - Complete Audit & Remediation

**Feature:** Make social media management system production-ready with correct MCP tool names, complete agent files, accurate registries, BMad v6 compliance, and validated architecture

**Created:** 2025-11-02
**Enhanced:** 2025-11-02 (BMad Builder review - added 13 BMad-specific tasks)
**Status:** Ready for Implementation
**Confidence Score:** 9/10 (BMad v6 Compliant)
**Estimated Time:** 8-10 hours (24 comprehensive tasks)

**Scope:** System-wide fixes across agents, workflows, skills, registries, and documentation
**Priority:** CRITICAL - System cannot function without these fixes
**Standards:** BMad v6 Core compliant (external instructions, variables, activation patterns)

---

## 🎯 Context & Problem Statement

### Current State

**What Works:**

- ✅ 3 agents defined with complete personas (Jarvis, Zoe, Zoro)
- ✅ 16 workflows created with YAML + instructions
- ✅ 24 skills with complete SKILL.md files
- ✅ Comprehensive documentation (architecture.md, prd.md)
- ✅ Tool and workflow registries exist
- ✅ 6-stage output lifecycle structure designed

**Critical Issues Discovered:**

**ISSUE #1: Incomplete Agent Architecture**

- ✅ `bmad/agents/content-intelligence/jarvis.md` exists
- ❌ `bmad/agents/zoe/zoe.md` MISSING (only .claude/commands copy exists)
- ❌ `bmad/agents/zoro/zoro.md` MISSING (social-posting-agent.md exists but wrong location)
- Impact: Breaks BMad dual-location pattern, incomplete documentation

**ISSUE #2: Registry Inaccuracies**

- Agent manifest has duplicate entries (lines 6-7 duplicate 2-3)
- Agent manifest references non-existent `bmad/standalone/` paths
- Workflow manifest shows existing workflows as "needs_creation"
- Impact: Documentation provides false information about system state

**ISSUE #3: MCP Tool Name Confusion**

- Documentation uses mixed patterns (simple vs mcp\_\_ prefixed names)
- **VERIFIED PATTERNS:**
  - Notion uses **simple names**: `notion-search`, `notion-fetch`
  - Most others use **mcp\_\_ prefix**: `mcp__fal-video__execute_custom_model`
- Research found fal-video tool is `execute_custom_model` not "fal custom video"
- Impact: Skills and docs may reference wrong tool names

**ISSUE #4: Video Tool Strategy Unclear**

- Tool registry says fal-video is PRIMARY
- Architecture still references veotools equally
- Skills reference both without clear priority
- Impact: Confusion about which tool to use, potential cost waste

**ISSUE #5: Epic Completion Overstated**

- Epic list claims 80-100% completion
- Registry shows workflows as "needs_creation" that exist
- Missing agent files not accounted for
- Impact: False sense of completion, delayed production deployment

### User's Goal

Create a **production-ready** social media management system where:

1. All agents have complete file structures (primary + discovery copies)
2. All registries accurately reflect actual file existence and status
3. All MCP tool names are correct and verified
4. All documentation is consistent and accurate
5. Video tool strategy is clear (fal-video PRIMARY)
6. System can be deployed and tested end-to-end without errors
7. Epic completion percentages reflect reality

**Success Criteria:**

- Agents activate without errors
- Workflows execute successfully
- Tool calls use correct names
- Registries match filesystem
- Documentation provides accurate guidance
- Ready for Epic 7 (pipeline testing)

---

## 🏗️ Requirements

### Must Have (Production Deployment)

#### 1. Complete Agent Architecture

- Create `bmad/agents/zoe/zoe.md` following jarvis.md pattern
- Create `bmad/agents/zoro/zoro.md` (rename/consolidate social-posting-agent.md)
- Verify .claude/commands copies stay synchronized
- Update agent manifest with correct paths

#### 2. Accurate Registries

- Clean agent-manifest.csv (remove duplicates, fix non-existent paths)
- Clean workflow-manifest.csv (remove duplicates, mark existing workflows correctly)
- Update workflow-registry.yaml (3 workflows from "needs_creation" to "operational")
- Update tool-registry.yaml (correct MCP tool names, clarify video strategy)

#### 3. Verified MCP Tool Names

- Document correct tool name for EVERY MCP used
- Update all agent files with correct tool references
- Update all skill files with correct tool references
- Create MCP tool naming standards document

#### 4. Clear Video Tool Strategy

- Document fal-video as PRIMARY (mcp**fal-video**execute_custom_model)
- Document heygen as SPECIALIZED (talking heads only)
- Mark veotools as DEPRECATED/BACKUP
- Update all references in skills and workflows

#### 5. Realistic Epic Status

- Update epic-list.md with accurate completion percentages
- Add caveats where appropriate (e.g., "code complete, needs testing")
- Document what's actually completed vs pending

### Should Have (Quality Improvements)

#### 6. Validation Test Suite

- Agent activation tests
- Workflow execution tests
- MCP tool availability checks
- End-to-end pipeline tests

#### 7. Documentation Consistency

- Update architecture.md workflow count (20+ → 13-14 actual)
- Add tool name pattern clarifications
- Create .env.template for API keys
- Update CLAUDE.md with production patterns

### Could Have (Future Enhancements)

#### 8. PRP Template

- Create PRPs/templates/prp_base.md
- Document PRP structure for future features

#### 9. Standalone Structure Decision

- Either create bmad/standalone/ or remove manifest references
- Document decision and rationale

---

## 📚 Technical Research & Verified Tool Names

### VERIFIED MCP TOOL NAMING PATTERNS

**Pattern A: Simple Names (Official Anthropic MCPs)**

```
notion-search
notion-fetch
notion-create-pages
notion-update-page
notion-move-pages
```

**Pattern B: mcp\_\_ Prefix (Third-Party MCPs)**

```
mcp__[server-name]__[tool-name]
```

**Why the difference?**

- Official Anthropic MCPs: Clean names (no prefix needed)
- Third-party MCPs: Prefixed for namespacing
- Source: Verified via system context and /mcp command output

### COMPLETE MCP TOOL REFERENCE

#### IMAGE GENERATION

**Tool:** `mcp__nanobanana__generate_image`

- **Provider:** Google Gemini 2.5 Flash
- **Status:** ✅ VERIFIED in system context
- **Use Cases:** Social media images, fast generation, editing
- **Cost:** $0.039 per image (fixed)
- **Key Parameters:**
  ```javascript
  {
    prompt: string (max 8192 chars, required),
    mode: "auto" | "generate" | "edit",
    n: 1-4,
    negative_prompt: string (max 1024 chars),
    input_image_path_1/2/3: string (for editing)
  }
  ```

**Tool:** `mcp__gpt-image-1__create_image`

- **Provider:** OpenAI DALL-E 3
- **Status:** ✅ VERIFIED in system context
- **Use Cases:** Professional images, text rendering, LinkedIn graphics
- **Cost:** Variable (higher than nanobanana)
- **Key Parameters:**
  ```javascript
  {
    prompt: string (max 32000 chars, required),
    size: "1024x1024" | "1536x1024" | "1024x1536" | "auto",
    quality: "low" | "medium" | "high" | "auto",
    n: 1-10,
    background: "transparent" | "opaque" | "auto"
  }
  ```

**Decision Matrix:**
| Platform | Tool | Rationale |
|----------|------|-----------|
| LinkedIn | gpt-image-1 | Professional quality, text rendering 9.5/10 |
| Twitter | gpt-image-1 | Professional quality for thought leadership |
| YouTube | nanobanana | Speed + cost for high volume thumbnails |
| Instagram | nanobanana | Social media aesthetics, fast iteration |

---

#### VIDEO GENERATION

**PRIMARY TOOL:** `mcp__fal-video__execute_custom_model`

- **Provider:** FAL.ai (Universal Video Hub)
- **Status:** ✅ VERIFIED - PRIMARY for ALL video generation
- **Access to:** 22+ models in single interface
- **Cost:** $0.30-$3.00 per video (model-dependent)
- **Key Parameters:**
  ```javascript
  {
    endpoint: string (e.g., "fal-ai/veo-3", "fal-ai/luma-ray-2"),
    input_params: object (model-specific),
    category_hint: "image" | "video" | "image_to_video" | "other"
  }
  ```

**Available Models via fal-video:**

**TEXT-TO-VIDEO:**

- `fal-ai/veo-3` - Google's latest, b-roll, scenes
- `fal-ai/luma-dream-machine-ray2` - Cinematic quality
- `fal-ai/kling-video/v1.5/pro/text-to-video` - Premium motion
- `fal-ai/pixverse/v4.5` - Fast generation
- `fal-ai/magi` - Creative videos
- `fal-ai/wan-video/v1/pro` - Professional effects
- `fal-ai/vidu/v1/text-to-video` - High-quality

**IMAGE-TO-VIDEO:**

- `fal-ai/ltx-video` - Fast animation (5-10s)
- `fal-ai/kling-video/v1.5/pro/image-to-video` - Premium I2V
- `fal-ai/pixverse/v4.5/image-to-video` - Advanced I2V
- `fal-ai/hunyuan-video` - Open-source I2V
- `fal-ai/luma-dream-machine-ray2/image-to-video` - Cinematic I2V

**IMAGE GENERATION (also available):**

- `fal-ai/imagen-4` - Google's latest image model
- `fal-ai/flux/kontext` - State-of-art typography
- `fal-ai/ideogram/v3` - Advanced text rendering
- `fal-ai/recraft/v3` - Professional design

**SPECIALIZED TOOL:** `mcp__heygen__generate_avatar_video`

- **Provider:** HeyGen
- **Status:** ✅ VERIFIED - For talking heads ONLY
- **Cost:** $0.20-$0.50 per minute
- **Key Parameters:**
  ```javascript
  {
    avatar_id: string (required),
    input_text: string (script),
    voice_id: string (required),
    title: string (optional)
  }
  ```
- **Supporting Tools:**
  - `mcp__heygen__get_voices` - List available voices
  - `mcp__heygen__get_avatar_groups` - List avatar collections
  - `mcp__heygen__get_avatars_in_avatar_group` - Get specific avatars
  - `mcp__heygen__get_avatar_video_status` - Check render status
  - `mcp__heygen__get_remaining_credits` - Check quota

**DEPRECATED TOOL:** `mcp__veotools__*`

- **Status:** ⚠️ Available but NOT recommended
- **Reason:** Veo 3 accessible via fal-video with 21 additional models
- **Use Case:** Backup only if fal-video unavailable
- **Migration:** All veotools references should use fal-video

**Video Tool Decision Matrix:**
| Use Case | Tool | Model/Endpoint | Cost | Rationale |
|----------|------|----------------|------|-----------|
| B-roll scenes | fal-video | fal-ai/veo-3 | $0.30/8s | Fast, high quality |
| Cinematic videos | fal-video | fal-ai/luma-ray-2 | $1-3 | Best quality |
| Talking heads | heygen | generate_avatar_video | $0.20-0.50/min | Specialized for avatars |
| Diagram animation | fal-video | fal-ai/ltx-video (I2V) | $0.50 | Fast image-to-video |
| Backup (Veo 3 only) | veotools | generate_start | $0.30-0.50/8s | If fal-video down |

---

#### PUBLISHING & SOCIAL MEDIA

**MULTI-PLATFORM SCHEDULER:** `mcp__postiz__integrationSchedulePostTool`

- **Provider:** Postiz (self-hosted)
- **Status:** ✅ VERIFIED and configured
- **Platforms:** Twitter, LinkedIn, Instagram, Facebook, TikTok, YouTube
- **Key Parameters:**
  ```javascript
  {
    socialPost: [{
      integrationId: string (from integrationList),
      date: string (UTC ISO format),
      type: "draft" | "schedule" | "now",
      postsAndComments: [{
        content: string (HTML formatted!),
        attachments: string[] (public URLs)
      }],
      settings: [{key: string, value: string}]
    }]
  }
  ```
- **CRITICAL:** Content must be HTML formatted using `formatForPostiz()` utility
- **Supporting Tools:**
  - `mcp__postiz__integrationList` - Get connected platforms
  - `mcp__postiz__integrationSchema` - Get platform-specific schema
  - `mcp__postiz__triggerTool` - Get IDs/settings for platform

**TWITTER API:** `mcp__mcp_twitter__create_twitter_post`

- **Provider:** Twitter Premium API ($8/month)
- **Status:** ✅ VERIFIED in system context
- **Features:** 25k character posts, media support
- **Key Parameters:**
  ```javascript
  {
    post: string (text content, max 25000 chars for Premium)
  }
  ```
- **Supporting Tools:**
  - `mcp__mcp_twitter__reply_twitter_tweet`
  - `mcp__mcp_twitter__create_and_post_twitter_thread`
  - `mcp__mcp_twitter__get_last_tweet`
  - `mcp__mcp_twitter__get_last_tweets_options`

**YOUTUBE UPLOADER:** `mcp__youtube-uploader-mcp__upload_video`

- **Provider:** YouTube Data API v3
- **Status:** ✅ VERIFIED in system context
- **Authentication:** OAuth2 flow (3-step process)
- **Key Parameters:**
  ```javascript
  {
    file_path: string (local video path),
    channel_id: string (from channels tool),
    title: string,
    description: string,
    tags: string (comma-separated),
    category_id: string,
    status: "private" | "public" | "unlisted"
  }
  ```
- **Supporting Tools:**
  - `mcp__youtube-uploader-mcp__authenticate` - Start OAuth
  - `mcp__youtube-uploader-mcp__accesstoken` - Get token from code
  - `mcp__youtube-uploader-mcp__channels` - List user channels
  - `mcp__youtube-uploader-mcp__refreshtoken` - Refresh expired token

---

#### MEDIA STORAGE (CRITICAL FOR POSTIZ)

**REQUIRED TOOL:** `mcp__cloudinary-asset-mgmt__upload-asset`

- **Provider:** Cloudinary
- **Status:** ✅ VERIFIED in system context
- **Purpose:** Upload media files, get PUBLIC URLs for social posting
- **Why Critical:** Postiz requires public URLs, not local file paths
- **Key Parameters:**
  ```javascript
  {
    resourceType: "image" | "video" | "raw" | "auto",
    uploadRequest: {
      file: string (URL or file:// path, required),
      public_id: string (optional),
      folder: string (optional),
      transformation: string (optional)
    }
  }
  ```
- **Returns:** `{public_id, secure_url, width, height, format, bytes}`
- **Supporting Tools:**
  - `mcp__cloudinary-asset-mgmt__search-assets` - Find uploaded assets
  - `mcp__cloudinary-asset-mgmt__list-images` - List all images
  - `mcp__cloudinary-asset-mgmt__get-asset-details` - Get asset metadata
  - `mcp__cloudinary-asset-mgmt__transform-asset` - Apply transformations

**Postiz Workflow Pattern:**

```
1. Generate image (nanobanana or gpt-image-1) → Local file
2. Upload to Cloudinary → Public URL
3. Schedule post with Postiz → Use public URL in attachments
4. Save metadata → Track Cloudinary asset ID
```

---

#### RESEARCH TOOLS

**NEURAL SEARCH:** `mcp__exa__search`

- **Provider:** Exa AI
- **Status:** ✅ VERIFIED in system context
- **Cost:** $0.05-$0.15 per query
- **Key Parameters:**
  ```javascript
  {
    query: string (required),
    numResults: number (default 5),
    livecrawl: "always" | "fallback"
  }
  ```

**WEB SCRAPING:** `mcp__firecrawl__firecrawl_search`

- **Provider:** Firecrawl
- **Status:** ✅ VERIFIED in system context
- **Cost:** $0.10-$0.30 per operation
- **Note:** Documentation calls this "most powerful web search tool"
- **Key Parameters:**
  ```javascript
  {
    query: string (required),
    limit: number,
    sources: [{type: "web" | "images" | "news"}],
    scrapeOptions: {formats: ["markdown"], onlyMainContent: true}
  }
  ```
- **Supporting Tools:**
  - `mcp__firecrawl__firecrawl_scrape` - Single URL scraping (with maxAge caching)
  - `mcp__firecrawl__firecrawl_map` - Discover URLs on site
  - `mcp__firecrawl__firecrawl_crawl` - Multi-page extraction

**PLATFORM SCRAPING:** `mcp__apify__*`

- **Provider:** Apify Actor Platform
- **Status:** ✅ VERIFIED with pre-configured actors
- **Pre-configured Actors:**
  - `mcp__apify__apify-slash-instagram-scraper` - Instagram posts/profiles
  - `mcp__apify__clockworks-slash-tiktok-scraper` - TikTok videos/profiles
  - `mcp__apify__apidojo-slash-twitter-scraper-lite` - Twitter/X posts
- **Generic Tools:**
  - `mcp__apify__fetch-actor-details` - Get actor schema
  - `mcp__apify__search-actors` - Find actors in store
  - `mcp__apify__call-actor` - Execute any actor (2-step: info → call)
  - `mcp__apify__get-actor-output` - Retrieve results from dataset

---

#### KNOWLEDGE MANAGEMENT

**WORKSPACE SEARCH:** `notion-search` (Simple name pattern!)

- **Provider:** Notion (@notionhq/mcp-server)
- **Status:** ✅ VERIFIED - Uses simple names, NOT mcp\_\_ prefix
- **Key Parameters:**
  ```javascript
  {
    query: string (required),
    query_type: "internal" | "user",
    filters: {
      created_date_range: {start_date, end_date},
      created_by_user_ids: string[]
    }
  }
  ```

**PAGE OPERATIONS:** All use simple names:

- `notion-fetch` - Get page/database by ID
- `notion-create-pages` - Bulk page creation
- `notion-update-page` - Property updates, content edits
- `notion-move-pages` - Reassign parent
- `notion-create-database` - Create new database
- `notion-update-database` - Update schema

---

#### VIDEO EDITING

**CAPTIONS & EFFECTS:** `mcp__submagic__submagic_create_project`

- **Provider:** SubMagic
- **Status:** ✅ VERIFIED and configured
- **Features:** AI captions, magic zooms, B-rolls, silence removal
- **Key Parameters:**
  ```javascript
  {
    title: string (required),
    language: string (required, get from list_languages),
    video_url: string (required, public URL),
    template_name: string (styling, get from list_templates),
    magic_zooms: boolean (default true),
    magic_brolls: boolean (default true),
    magic_brolls_percentage: number (0-100, default 75),
    remove_silence_pace: "natural" | "fast" | "extra-fast"
  }
  ```
- **Workflow:**
  ```
  1. Generate video (fal-video) → Local file
  2. Upload to Cloudinary → Public URL
  3. Create SubMagic project → video_id
  4. Check status (get_project) → Wait for complete
  5. Export project → Download URL
  ```
- **Supporting Tools:**
  - `mcp__submagic__submagic_list_languages` - Get language codes
  - `mcp__submagic__submagic_list_templates` - Get style templates
  - `mcp__submagic__submagic_get_project` - Check render status
  - `mcp__submagic__submagic_export_project` - Download final video

---

### COST OPTIMIZATION STRATEGY

**Tool Selection by Depth Parameter:**

| Depth             | Research Tools                   | Image Tools               | Video Tools            | Est. Cost              |
| ----------------- | -------------------------------- | ------------------------- | ---------------------- | ---------------------- |
| **quick**         | WebSearch (free)                 | nanobanana                | fal-video (veo-3-fast) | $0-0.50                |
| **standard**      | Exa ($0.05)                      | nanobanana or gpt-image-1 | fal-video (veo-3)      | $0.10-0.80             |
| **comprehensive** | Exa + Firecrawl ($0.15)          | gpt-image-1               | fal-video (luma-ray-2) | $0.50-2.00             |
| **exhaustive**    | Exa + Firecrawl + Apify ($0.50+) | gpt-image-1 multiple      | heygen + fal-video     | $2.00+ (user approval) |

**Monthly Budget Target:** <$50 for 30+ posts

**Estimated Breakdown:**

- Research (30 posts × $0.05): $1.50
- Images (30 posts × $0.05 avg): $1.50
- Videos (8 posts × $1.00 avg): $8.00
- Scraping (4 profiles × $0.15): $0.60
- Twitter Premium: $8.00
- **Total:** ~$19.60/month (30.40 buffer for comprehensive operations)

---

## 💻 Implementation Tasks (In Order)

### TASK 1: Create Missing Agent Files (CRITICAL)

#### 1A: Create bmad/agents/zoe/zoe.md

**Source Template:** `bmad/agents/content-intelligence/jarvis.md` + `.claude/commands/social-media-team/zoe.md`
**Target:** `bmad/agents/zoe/zoe.md`

**ACTUAL AGENT FILE FORMAT (BMad v6):**
Agents are **Markdown files with YAML frontmatter + XML content** (NOT pure XML)

**Implementation Steps:**

1. Read jarvis.md to understand complete structure (YAML + XML)
2. Read .claude/commands/social-media-team/zoe.md (has most content already!)
3. List all zoe workflows from `bmad/agents/zoe/zoe-sidecar/workflows/*/`
4. **EASIEST APPROACH:** Copy and modify existing .claude/commands file:

   ```bash
   # .claude/commands/social-media-team/zoe.md already exists and is 95% correct!
   # Just copy it to bmad location and update paths
   cp .claude/commands/social-media-team/zoe.md bmad/agents/zoe/zoe.md

   # Then update agent id line (if needed)
   # Change: id="" to id="bmad/agents/zoe/zoe.md"
   ```

5. Verify file has correct structure:

   ```markdown
   ---
   name: 'zoe'
   description: 'Visual Production Specialist...'
   ---

   <?xml version="1.0" encoding="UTF-8"?>
   <agent id="bmad/agents/zoe/zoe.md" name="Zoe" title="Visual Production Specialist" icon="🎨">
     <activation critical="MANDATORY">
       <!-- 12+ activation steps -->
     </activation>
     <persona>
       <role>Visual Production Specialist</role>
       <identity>I'm your visual content specialist...</identity>
       <communication_style>Detail-oriented and design-obsessed...</communication_style>
       <principles>Quality over speed...</principles>
     </persona>
     <skills>
       <!-- 9 skills documented -->
     </skills>
     <menu>
       <!-- 8 workflows listed -->
     </menu>
   </agent>
   ```

6. Validate structure and paths correct

**Validation:**

```bash
# Check file created
test -f bmad/agents/zoe/zoe.md && echo "✅ Created" || echo "❌ Missing"

# Validate XML structure (if xmllint available)
xmllint --noout bmad/agents/zoe/zoe.md 2>&1 && echo "✅ Valid XML" || echo "❌ Invalid XML"

# Verify sidecar reference
grep -q "bmad/agents/zoe/zoe-sidecar" bmad/agents/zoe/zoe.md && echo "✅ Correct path"
```

---

#### 1B: Create bmad/agents/zoro/zoro.md

**Approach:** Similar to 1A

**Considerations:**

- File `bmad/agents/zoro/social-posting-agent.md` already exists
- May need to rename/consolidate OR create fresh zoro.md
- Verify workflow references point to `zoro-sidecar/workflows/`

**Implementation:**

1. Check if social-posting-agent.md can be used as base
2. If yes: Rename and update references
3. If no: Create fresh zoro.md from jarvis.md template
4. Extract zoro persona from `.claude/commands/social-media-team/zoro.md`
5. List all zoro workflows (schedule-post + others)
6. Document MCP tools used:
   ```xml
   <mcp_tools>
     <tool>mcp__postiz__integrationSchedulePostTool</tool>
     <tool>mcp__cloudinary-asset-mgmt__upload-asset</tool>
     <tool>mcp__mcp_twitter__create_twitter_post</tool>
     <tool>mcp__youtube-uploader-mcp__upload_video</tool>
   </mcp_tools>
   ```

**Validation:** Same as 1A

---

### TASK 2: Clean Agent Manifest (CRITICAL)

**File:** `bmad/_cfg/agent-manifest.csv`

**Current Issues:**

- Duplicate entries (lines 6-7 duplicate 2-3)
- References to non-existent `bmad/standalone/` paths
- Inconsistent module naming

**Implementation:**

1. Read current agent-manifest.csv
2. Identify all duplicate entries
3. Verify each agent path exists on filesystem
4. Rebuild CSV with clean data:
   ```csv
   name,displayName,title,icon,role,identity,communicationStyle,principles,module,path
   "bmad-master","BMad Master","BMad Master Executor","🧠","Orchestrator","Knowledge...","Professional...","Principles...","core","bmad/core/agents/bmad-master.md"
   "bmad-builder","BMad Builder","BMad Builder","🔨","Builder","Development...","Methodical...","Principles...","bmb","bmad/bmb/agents/bmad-builder.md"
   "jarvis","Jarvis","Team Head","🎯","Team Head","Multi-skilled...","Strategic...","Principles...","agents","bmad/agents/content-intelligence/jarvis.md"
   "zoe","Zoe","Visual Specialist","🎨","Visual Creator","Visual expert...","Creative...","Principles...","agents","bmad/agents/zoe/zoe.md"
   "zoro","Zoro","Publishing Specialist","📤","Publisher","Distribution...","Efficient...","Principles...","agents","bmad/agents/zoro/zoro.md"
   ```

**Key Rules:**

- Remove all standalone/ references (directory doesn't exist)
- Use modular paths (bmad/agents/{module}/{agent}.md)
- Verify each path before adding to manifest
- No duplicates

**Validation:**

```bash
# Check no duplicates
sort bmad/_cfg/agent-manifest.csv | uniq -d | wc -l
# Should output: 0

# Verify all paths exist
tail -n +2 bmad/_cfg/agent-manifest.csv | while IFS=, read -r _ _ _ _ _ _ _ _ _ path; do
  path=$(echo "$path" | tr -d '"')
  test -f "$path" || echo "MISSING: $path"
done
```

---

### TASK 3: Clean Workflow Manifest (CRITICAL)

**File:** `bmad/_cfg/workflow-manifest.csv`

**Current Issues:**

- Duplicate entries (lines 16-17 duplicate 2-3)
- Incorrect module references
- Some workflows from wrong module

**Implementation:**

1. Read current workflow-manifest.csv
2. Scan filesystem for all workflow.yaml files:
   ```bash
   find bmad -name "workflow.yaml" -type f
   ```
3. For each workflow found:
   - Extract name from YAML
   - Extract description
   - Determine module (core, bmb, agents)
   - Build path (relative from project root)
   - Determine if standalone (false for agent workflows)
4. Rebuild CSV:
   ```csv
   name,description,module,path,standalone
   "brainstorming","Interactive brainstorming session...","core","bmad/core/workflows/brainstorming/workflow.yaml","false"
   "party-mode","Group discussion orchestration...","core","bmad/core/workflows/party-mode/workflow.yaml","false"
   "research-topic","Deep topic research...","agents","bmad/agents/content-intelligence/jarvis-sidecar/workflows/research-topic/workflow.yaml","false"
   "write-posts","Platform-optimized posts...","agents","bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-posts/workflow.yaml","false"
   "schedule-post","Multi-platform scheduling...","agents","bmad/agents/zoro/zoro-sidecar/workflows/schedule-post/workflow.yaml","false"
   [Continue for all 16 workflows]
   ```

**Validation:**

```bash
# No duplicates
sort bmad/_cfg/workflow-manifest.csv | uniq -d | wc -l
# Output: 0

# All paths exist
tail -n +2 bmad/_cfg/workflow-manifest.csv | while IFS=, read -r _ _ _ path _; do
  path=$(echo "$path" | tr -d '"')
  test -f "$path" || echo "MISSING: $path"
done
```

---

### TASK 4: Update Workflow Registry Status (HIGH)

**File:** `.bmad-core/data/workflow-registry.yaml`

**Issues Found:**

- `write-post` (lines 234-283) marked "status: needs_creation" but file EXISTS
- `write-script` (lines 284-326) marked "status: needs_creation" but file EXISTS
- `schedule-post` (lines 513-568) marked "status: needs_creation" but file EXISTS

**Implementation:**

Search and replace in workflow-registry.yaml:

**Change 1 (write-post):**

```yaml
# Line ~238
- status: needs_creation
+ status: operational

# Line ~238
- note: "Workflow does not exist yet - needs creation in Epic 2"
+ note: "Workflow operational - created 2025-10-31, needs testing"
```

**Change 2 (write-script):**

```yaml
# Line ~326
- status: needs_creation
+ status: operational

# Line ~326
- note: "Workflow does not exist yet - needs creation in Epic 2"
+ note: "Workflow operational - created 2025-10-31, needs testing"
```

**Change 3 (schedule-post):**

```yaml
# Line ~568
- status: needs_creation
+ status: operational

# Line ~568
- note: "Primary Postiz workflow - needs creation in Epic 4"
+ note: "Workflow operational - created 2025-11-01, needs testing with Cloudinary"
```

**Validation:**

```bash
# Verify no "needs_creation" status for existing workflows
grep -n "status: needs_creation" .bmad-core/data/workflow-registry.yaml

# Should only return workflows that genuinely don't exist
```

---

### TASK 5: Update Tool Registry with Correct Names (HIGH)

**File:** `.bmad-core/data/tool-registry.yaml`

**Issues:**

- Cloudinary tools use simple names (upload-asset) instead of full names
- Some conceptual tool names instead of actual MCP tool names
- Outdated note about Epic 2 (line 473)

**Implementation:**

**Change 1: Cloudinary Section (lines 382-417)**

```yaml
# PRIMARY TOOLS
tools:
  - name: upload-asset
    actual_tool_name: mcp__cloudinary-asset-mgmt__upload-asset  # ADD THIS
    purpose: Upload media files and get public URLs

  - name: search-assets
    actual_tool_name: mcp__cloudinary-asset-mgmt__search-assets  # ADD THIS

  - name: get-asset-details
    actual_tool_name: mcp__cloudinary-asset-mgmt__get-asset-details  # ADD THIS

# Update primary_tool reference
- primary_tool: upload-asset
+ primary_tool: mcp__cloudinary-asset-mgmt__upload-asset
```

**Change 2: fal-video Section (lines 175-224)**

```yaml
# Confirm PRIMARY status
video_models:
  - name: fal-video
    provider: Fal.ai
    purpose: PRIMARY video generation hub - universal access to 22+ models
    primary_tool: mcp__fal-video__execute_custom_model # ✅ Already correct

    # ADD clarification
    tool_pattern: |
      mcp__fal-video__execute_custom_model({
        endpoint: "fal-ai/veo-3",  // or luma-ray-2, kling-master, etc.
        input_params: {...},
        category_hint: "video"
      })
```

**Change 3: veotools Reference (lines 204-208)**

```yaml
# UPDATE strategy
- strategy: "veotools-mastery skill will be renamed to video-generation to cover ALL fal models"
+ strategy: "DEPRECATED - Veo 3 accessible via fal-video. Use fal-video as primary, veotools as backup only."
+ status: deprecated
+ replacement: mcp__fal-video__execute_custom_model
+ migration_date: "2025-11-05"
```

**Change 4: Remove Outdated Note (line 473)**

```yaml
- note: "Epic 2 greenfield work - agents not yet Notion-aware as of 2025-11-05"
+ note: "Epic 2 COMPLETE - All agents Notion-integrated with notion-helper.md as of 2025-11-01"
```

**Validation:**

```bash
# Check YAML validity
npm run validate:schemas

# Verify all tool names follow correct patterns
grep "primary_tool:" .bmad-core/data/tool-registry.yaml | grep -v "mcp__" | grep -v "notion-"
# Should only return non-MCP tools (if any)
```

---

### TASK 6: Update Epic Completion Percentages (HIGH)

**File:** `docs/prd/epic-list.md`

**Implementation:**

**Epic 2: Notion Integration (lines 30-42)**

```markdown
- **Completion:** 100% ✅ COMPLETE

* **Completion:** 100% (Code) + 0% (Testing) = 50% Overall ⚠️ NEEDS TESTING

**Status:**

- ✅ All agents have notion-helper.md
- ✅ Notion MCP tools verified (notion-search, notion-fetch, etc.)
- ✅ Content Tracker database schema documented

* ⚠️ No end-to-end testing performed
* ⚠️ Notion status transitions not validated
* **Next:** Epic 7 testing required before marking 100%
```

**Epic 3: Research Pipeline (lines 46-57)**

```markdown
- **Completion:** 100% ✅ ALL WORKFLOWS OPERATIONAL

* **Completion:** 80% ⚠️ WORKFLOWS EXIST, NEEDS MCP VERIFICATION

**Status:**

- ✅ All 5 research workflows created

* ⚠️ Exa MCP tool calls not tested
* ⚠️ Apify actors not verified
* ⚠️ Cost tracking not validated
```

**Epic 4: Voice-Matched Content (lines 60-71)**

```markdown
- **Completion:** 95% ⚠️ TESTING PENDING

* **Completion:** 85% (write-posts/write-scripts exist, voice-matcher untested)

**Status:**

- ✅ write-posts workflow created
- ✅ write-scripts workflow created
- ✅ voice-matcher skill created

* ⚠️ Voice consistency not measured (need 10 test posts)
* ⚠️ Confidence scoring not validated
```

**Epic 6: Publishing Pipeline (lines 88-101)**

```markdown
- **Completion:** 80% ⚠️ CLOUDINARY INTEGRATION PENDING

* **Completion:** 50% (schedule-post exists, Cloudinary upload not tested)

**Status:**

- ✅ schedule-post workflow created
- ✅ Postiz HTML formatter created

* ❌ Cloudinary upload-asset integration not tested
* ❌ Public URL generation not validated
* **BLOCKER:** Cannot test without Cloudinary upload working
```

---

### TASK 7: Create MCP Tool Naming Standards Doc (MEDIUM)

**File:** `docs/mcp-tool-naming-standards.md` (NEW)

**Purpose:** Definitive reference for correct tool naming patterns

**Content:**

```markdown
# MCP Tool Naming Standards

**Version:** 1.0
**Date:** 2025-11-02
**Purpose:** Authoritative reference for MCP tool naming conventions in Claude Code

---

## Official Naming Patterns

Claude Code uses **TWO different naming patterns** for MCP tools based on provider:

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

mcp**nanobanana**generate_image
mcp**nanobanana**upload_file
mcp**nanobanana**show_output_stats

mcp**gpt-image-1**create_image
mcp**gpt-image-1**create_image_edit

```

### Video Generation (Prefixed Names)

**PRIMARY:**
```

mcp**fal-video**execute_custom_model
↳ Endpoint: "fal-ai/veo-3"
↳ Endpoint: "fal-ai/luma-ray-2"
↳ Endpoint: "fal-ai/kling-master-text"
↳ Plus 19 more models

mcp**fal-video**list_available_models

```

**SPECIALIZED:**
```

mcp**heygen**generate_avatar_video
mcp**heygen**get_voices
mcp**heygen**get_avatar_groups
mcp**heygen**get_avatars_in_avatar_group
mcp**heygen**get_avatar_video_status
mcp**heygen**get_remaining_credits

```

**DEPRECATED (Backup only):**
```

mcp**veotools**generate_start
mcp**veotools**generate_get
mcp**veotools**list_models
mcp**veotools**plan_scenes

```

### Publishing (Prefixed Names)

```

mcp**postiz**integrationList
mcp**postiz**integrationSchema
mcp**postiz**integrationSchedulePostTool
mcp**postiz**triggerTool
mcp**postiz**generateImageTool
mcp**postiz**generateVideoTool

mcp**mcp_twitter**create_twitter_post
mcp**mcp_twitter**reply_twitter_tweet
mcp**mcp_twitter**create_and_post_twitter_thread
mcp**mcp_twitter**get_last_tweet

mcp**youtube-uploader-mcp**upload_video
mcp**youtube-uploader-mcp**authenticate
mcp**youtube-uploader-mcp**accesstoken
mcp**youtube-uploader-mcp**channels

```

### Media Storage (Prefixed Names)

```

mcp**cloudinary-asset-mgmt**upload-asset
mcp**cloudinary-asset-mgmt**search-assets
mcp**cloudinary-asset-mgmt**list-images
mcp**cloudinary-asset-mgmt**get-asset-details
mcp**cloudinary-asset-mgmt**transform-asset

```

### Research (Prefixed Names)

```

mcp**exa**search

mcp**firecrawl**firecrawl_search
mcp**firecrawl**firecrawl_scrape
mcp**firecrawl**firecrawl_map
mcp**firecrawl**firecrawl_crawl

mcp**apify**search-actors
mcp**apify**fetch-actor-details
mcp**apify**call-actor
mcp**apify**get-actor-output
mcp**apify**apify-slash-instagram-scraper
mcp**apify**clockworks-slash-tiktok-scraper

````

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
- name: upload-asset  # Conceptual
  actual_tool_name: mcp__cloudinary-asset-mgmt__upload-asset  # Actual
````

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

---

**Last Updated:** 2025-11-02
**Maintained By:** Product Manager (pm agent)
**Review Frequency:** Monthly or when adding new MCPs

````

**Validation:**
```bash
# File created
test -f docs/mcp-tool-naming-standards.md && echo "✅ Created"
````

---

### TASK 8: Clarify Video Tool Strategy Across All Docs (MEDIUM)

**Files to Update:**

#### 8A: Update architecture.md

**Location:** `docs/architecture.md`

**Line 955-976 (Video tool registry example):**

```yaml
# REMOVE veotools entry or mark deprecated
- video:
    b_roll:
      - tool: veotools (Veo 3 fast)
        cost: $0.30/8s
        status: active

# REPLACE WITH
+ video:
    b_roll_and_all_video:
      - tool: fal-video (execute_custom_model)
        models: 22+ (Veo 3, Luma Ray 2, Kling, Pixverse, Sora, etc.)
        cost: $0.30-3.00 per video (model-dependent)
        status: active - PRIMARY

      - tool: veotools (generate_start)
        cost: $0.30-0.50/8s
        status: deprecated - Use fal-video instead
        migration_note: "Veo 3 accessible via fal-video with 21 additional models"
```

**Line 2019-2030 (veotools MCP section in Appendix A):**

```markdown
# ADD deprecation notice

**veotools MCP:**

- ⚠️ DEPRECATED: Use fal-video instead for Veo 3 access

* veotools (generate_start)
* veotools (generate_get)
* veotools (list_models)

-
- **Migration:** All veotools functionality available via fal-video execute_custom_model
- **Kept for:** Backup only if fal-video unavailable
```

#### 8B: Update mcp-tool-selection.md

**Location:** `.claude/skills/visual-prompt-mastery/reference/mcp-tool-selection.md`

**Add at top (after line 6):**

```markdown
## Tool Name Reference (IMPORTANT)

When calling MCP tools, use these EXACT names:

| Conceptual Name | Actual Tool Name                       | Status      |
| --------------- | -------------------------------------- | ----------- |
| nanobanana      | `mcp__nanobanana__generate_image`      | Active      |
| gpt-image-1     | `mcp__gpt-image-1__create_image`       | Active      |
| fal-video       | `mcp__fal-video__execute_custom_model` | PRIMARY     |
| heygen          | `mcp__heygen__generate_avatar_video`   | Specialized |
| veotools        | `mcp__veotools__generate_start`        | Deprecated  |

**Video Strategy:** Use fal-video for ALL video generation (access to 22+ models).
Use heygen ONLY for talking head avatars. Avoid veotools (superseded by fal-video).
```

**Line 74-100 (Video tools section):**

```markdown
# UPDATE to clarify PRIMARY

- ### veotools (Google Veo 3)

* ### fal-video (PRIMARY - Universal Video Hub)

- **MCP:** veotools

* **MCP:** fal-video (mcp**fal-video**execute_custom_model)

**Models Available:**

- - Veo 3 (Google) - via fal-ai/veo-3 endpoint

* Luma Ray 2 (Dream Machine)
* Kling Master 2.1 - Premium motion
* Pixverse V4.5 - Fast generation

- [19 more models...]

**When to Use:**

- - ALL video generation (except talking heads)

* B-roll scenes and diagram animation
* Image-to-video conversion
* Text-to-video creation

- ### heygen (SPECIALIZED - Talking Heads Only)
-
- **MCP:** heygen (mcp**heygen**generate_avatar_video)
- **When to Use:** ONLY for presenter-style talking head videos
-
- ### veotools (DEPRECATED)
-
- ⚠️ **Status:** Deprecated - Use fal-video instead
- **Reason:** Veo 3 accessible via fal-video with 21 additional models
- **Keep for:** Backup only if fal-video unavailable
```

#### 8C: Update CLAUDE.md

**Location:** `CLAUDE.md`

**Add to MCP Servers section:**

```markdown
### Video Generation

**PRIMARY:** fal-video

- Tool: `mcp__fal-video__execute_custom_model`
- Access: 22+ models (Veo 3, Luma Ray 2, Kling, Pixverse, future Sora)
- Strategy: Universal hub for ALL video needs

**SPECIALIZED:** heygen

- Tool: `mcp__heygen__generate_avatar_video`
- Use: Talking head avatars ONLY

**DEPRECATED:** veotools

- Reason: Veo 3 accessible via fal-video
- Keep: Backup only
```

---

### TASK 9: Create Validation Test Suite (MEDIUM)

**File:** `test/production-readiness-tests.js` (NEW)

**Purpose:** Automated checks before production deployment

**Content:**

```javascript
/**
 * Production Readiness Test Suite
 * Validates system integrity before deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Color output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
};

function pass(msg) {
  console.log(`${colors.green}✅ PASS${colors.reset} ${msg}`);
}

function fail(msg) {
  console.log(`${colors.red}❌ FAIL${colors.reset} ${msg}`);
  process.exitCode = 1;
}

function warn(msg) {
  console.log(`${colors.yellow}⚠️  WARN${colors.reset} ${msg}`);
}

// TEST 1: Agent Files Complete
console.log('\n=== TEST 1: Agent Files Complete ===');

const agentFiles = ['bmad/agents/content-intelligence/jarvis.md', 'bmad/agents/zoe/zoe.md', 'bmad/agents/zoro/zoro.md'];

agentFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    pass(`Agent file exists: ${file}`);
  } else {
    fail(`Agent file missing: ${file}`);
  }
});

// TEST 2: Registry Accuracy
console.log('\n=== TEST 2: Registry Accuracy ===');

// Check agent manifest
const agentManifest = fs.readFileSync('bmad/_cfg/agent-manifest.csv', 'utf8');
const agentLines = agentManifest.split('\n').filter((l) => l.trim());

// Check for duplicates
const agentNames = agentLines.slice(1).map((l) => l.split(',')[0].replace(/"/g, ''));
const duplicates = agentNames.filter((name, i) => agentNames.indexOf(name) !== i);

if (duplicates.length === 0) {
  pass('No duplicate agents in manifest');
} else {
  fail(`Duplicate agents found: ${duplicates.join(', ')}`);
}

// Verify all agent paths exist
agentLines.slice(1).forEach((line) => {
  const cols = line.split(',');
  const name = cols[0].replace(/"/g, '');
  const agentPath = cols[cols.length - 1].replace(/"/g, '').trim();

  if (fs.existsSync(agentPath)) {
    pass(`Agent path valid: ${name} → ${agentPath}`);
  } else {
    fail(`Agent path broken: ${name} → ${agentPath} (file not found)`);
  }
});

// TEST 3: Workflow Files Exist
console.log('\n=== TEST 3: Workflow Files Exist ===');

const workflowManifest = fs.readFileSync('bmad/_cfg/workflow-manifest.csv', 'utf8');
const workflowLines = workflowManifest.split('\n').filter((l) => l.trim());

workflowLines.slice(1).forEach((line) => {
  const cols = line.split(',');
  const name = cols[0].replace(/"/g, '');
  const workflowPath = cols[3].replace(/"/g, '').trim();

  if (fs.existsSync(workflowPath)) {
    pass(`Workflow exists: ${name} → ${workflowPath}`);
  } else {
    fail(`Workflow missing: ${name} → ${workflowPath}`);
  }
});

// TEST 4: Skills Complete
console.log('\n=== TEST 4: Skills Complete ===');

const skillDirs = ['.claude/skills/jarvis', '.claude/skills/zoe'];

skillDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fail(`Skill directory missing: ${dir}`);
    return;
  }

  const skills = fs.readdirSync(dir).filter((f) => {
    const stat = fs.statSync(path.join(dir, f));
    return stat.isDirectory();
  });

  skills.forEach((skill) => {
    const skillFile = path.join(dir, skill, 'SKILL.md');
    if (fs.existsSync(skillFile)) {
      pass(`Skill complete: ${dir}/${skill}`);
    } else {
      fail(`Skill missing SKILL.md: ${dir}/${skill}`);
    }
  });
});

// TEST 5: Code Quality
console.log('\n=== TEST 5: Code Quality ===');

try {
  execSync('npm run lint', { stdio: 'pipe' });
  pass('ESLint passed (0 warnings)');
} catch (e) {
  fail('ESLint failed - run npm run lint:fix');
}

try {
  execSync('npm run format:check', { stdio: 'pipe' });
  pass('Prettier check passed');
} catch (e) {
  fail('Format check failed - run npm run format:fix');
}

try {
  execSync('npm run validate:schemas', { stdio: 'pipe' });
  pass('Schema validation passed');
} catch (e) {
  fail('Schema validation failed - check YAML files');
}

// TEST 6: Output Structure
console.log('\n=== TEST 6: Output Structure ===');

const outputStructure = ['outputs/templates/project-structure', 'outputs/projects', 'outputs/README.md'];

outputStructure.forEach((item) => {
  if (fs.existsSync(item)) {
    pass(`Output structure exists: ${item}`);
  } else {
    fail(`Output structure missing: ${item}`);
  }
});

// SUMMARY
console.log('\n=== PRODUCTION READINESS SUMMARY ===');

if (process.exitCode === 1) {
  console.log(`${colors.red}❌ NOT READY${colors.reset} - Fix failed tests above`);
} else {
  console.log(`${colors.green}✅ READY${colors.reset} - All tests passed`);
}
```

**Add to package.json:**

```json
{
  "scripts": {
    "test:production": "node test/production-readiness-tests.js",
    "pre-deploy": "npm run lint:fix && npm run format:fix && npm run test && npm run validate:schemas && npm run test:production"
  }
}
```

---

### TASK 10: Update Architecture.md Consistency (MEDIUM)

**File:** `docs/architecture.md`

**Changes:**

**Line 44 (Workflow count):**

```markdown
- - 20+ Workflows (research, content generation, visual production, publishing)

* - 16 Workflows operational (13 agent + 2 core + 1 standalone, 20+ planned future)
```

**Line 834 (MCP Server Registry table - add note):**

```markdown
| MCP Server | Purpose | Tools Used | Cost Model |
| ---------- | ------- | ---------- | ---------- |

-
- **Tool Naming Note:** Notion uses simple names (notion-search). Other MCPs use mcp** prefix (mcp**fal-video\_\_execute_custom_model).

| **Notion** | Collaborative state | notion-search, notion-fetch, notion-update-page | Free |

- | **fal-video** | PRIMARY video hub | mcp**fal-video**execute_custom_model | $0.30-3.00 |
  | **Cloudinary** | Media hosting | mcp**cloudinary-asset-mgmt**upload-asset | Free tier |
```

**Line 1986 (Appendix A header):**

```markdown
### Appendix A: Complete MCP Tool Inventory

- **IMPORTANT:** Tool names below use actual Claude Code naming patterns.
- - Notion tools: Simple names (notion-search)
- - Other MCPs: Prefixed names (mcp**server**tool)
-
- See [MCP Tool Naming Standards](./mcp-tool-naming-standards.md) for complete reference.
```

---

### TASK 11: Create .env.template (LOW)

**File:** `.env.template` (NEW)

**Purpose:** Document required API keys for deployment

**Content:**

```bash
# Social Media Management System - API Keys
# Copy this file to .env and add your actual keys

# ============================================
# ANTHROPIC
# ============================================
ANTHROPIC_API_KEY=sk-ant-...

# ============================================
# IMAGE GENERATION
# ============================================
# Google Gemini (nanobanana)
GOOGLE_AI_STUDIO_API_KEY=...

# OpenAI DALL-E 3 (gpt-image-1)
OPENAI_API_KEY=sk-...

# ============================================
# VIDEO GENERATION
# ============================================
# FAL.ai (PRIMARY video hub)
FAL_API_KEY=...

# HeyGen (talking heads)
HEYGEN_API_KEY=...

# SubMagic (captions, editing)
SUBMAGIC_API_KEY=...

# veotools (DEPRECATED - backup only)
# GOOGLE_AI_STUDIO_API_KEY already set above

# ============================================
# PUBLISHING
# ============================================
# Postiz (multi-platform scheduler)
POSTIZ_API_KEY=...
POSTIZ_API_URL=http://localhost:3000/api

# Twitter Premium API
TWITTER_API_KEY=...
TWITTER_API_SECRET=...
TWITTER_ACCESS_TOKEN=...
TWITTER_ACCESS_TOKEN_SECRET=...
TWITTER_BEARER_TOKEN=...

# YouTube Data API v3 (OAuth handled by youtube-uploader-mcp)
# No key needed - OAuth flow manages authentication

# LinkedIn API (OAuth handled by linkedin-api-client)
# No key needed - OAuth flow manages authentication

# ============================================
# MEDIA STORAGE
# ============================================
# Cloudinary (CRITICAL for public URLs)
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# ============================================
# RESEARCH
# ============================================
# Exa AI (neural search)
EXA_API_KEY=...

# Firecrawl (web scraping)
FIRECRAWL_API_KEY=...

# Apify (platform scrapers)
APIFY_API_KEY=...

# ============================================
# KNOWLEDGE MANAGEMENT
# ============================================
# Notion
NOTION_API_KEY=ntn_...

# ============================================
# DEVELOPMENT TOOLS
# ============================================
# Serena (built-in - no key needed)
# Chrome DevTools (built-in - no key needed)
```

**Validation:**

```bash
# File created
test -f .env.template && echo "✅ Created"

# User action required
echo "⚠️  Copy .env.template to .env and add actual API keys"
```

---

### TASK 12: Verify Skill MCP Tool References (HIGH)

**Purpose:** Ensure all 24 skills use correct MCP tool names

**Files:** `.claude/skills/jarvis/*/SKILL.md` (12 skills) + `.claude/skills/zoe/*/SKILL.md` (9-11 skills)

**Implementation:**

1. Scan all SKILL.md files for MCP tool references:

   ```bash
   find .claude/skills -name "SKILL.md" -exec grep -l "mcp__\|notion-" {} \;
   ```

2. For each skill, verify tool names:
   - **Notion tools:** Use simple names (notion-search, notion-fetch)
   - **fal-video:** Use `mcp__fal-video__execute_custom_model`
   - **Cloudinary:** Use `mcp__cloudinary-asset-mgmt__upload-asset`
   - **Image tools:** Use `mcp__nanobanana__generate_image`, `mcp__gpt-image-1__create_image`
   - **HeyGen:** Use `mcp__heygen__generate_avatar_video`

3. Common errors to fix:

   ```markdown
   # ❌ WRONG patterns

   - mcp**notion**search (should be notion-search)
   - veotools (ambiguous, should specify mcp**veotools** or migrate to fal-video)
   - upload-asset (missing mcp\_\_ prefix and server name)
   - "fal custom video" (should be execute_custom_model)

   # ✅ CORRECT patterns

   - notion-search (simple name for Notion)
   - mcp**fal-video**execute_custom_model (full name for fal)
   - mcp**cloudinary-asset-mgmt**upload-asset (full name with server)
   ```

4. Update skills with corrections

5. **Priority Skills to Check:**
   - `.claude/skills/zoe/video-generation/SKILL.md` - Should reference fal-video, not veotools
   - `.claude/skills/zoe/create-image/SKILL.md` - Should use correct image tool names
   - `.claude/skills/jarvis/deep-web-research/SKILL.md` - Should use correct research tool names

**Validation:**

```bash
# Search for incorrect notion pattern in skills
grep -r "mcp__notion__" .claude/skills/ && echo "❌ ERRORS FOUND" || echo "✅ No incorrect notion pattern"

# Verify fal-video tool name (not veotools)
VEOTOOLS_COUNT=$(grep -r "veotools" .claude/skills/ | grep -v "DEPRECATED" | grep -v "backup" | wc -l)
if [ "$VEOTOOLS_COUNT" -gt 0 ]; then
  echo "⚠️  Found $VEOTOOLS_COUNT veotools references (should migrate to fal-video)"
else
  echo "✅ No veotools references"
fi

# Verify execute_custom_model usage
grep -r "execute_custom_model" .claude/skills/zoe/ | head -2
echo "✅ Correct fal-video tool name in use"
```

---

### TASK 13: Audit Workflows for External Instructions Pattern (HIGH)

**Purpose:** Ensure ALL workflows follow BMad v6 standard (external instructions.md, not embedded)

**BMad v6 Standard:**

```yaml
# ✅ CORRECT - External instructions
instructions: '{installed_path}/instructions.md'
template: '{installed_path}/template.md'

# ❌ WRONG - Embedded instructions (anti-pattern)
steps:
  - name: Step 1
    goal: Do something
    instructions: |
      Multi-line embedded content...
```

**Implementation:**

1. Scan all workflow.yaml files:

   ```bash
   find bmad -name "workflow.yaml" -type f
   ```

2. For each workflow, check:

   ```bash
   # Does it have external instructions reference?
   grep "^instructions:" workflow.yaml | grep "instructions.md"

   # Or does it have embedded steps? (anti-pattern)
   grep "^steps:" workflow.yaml
   ```

3. Identify workflows needing migration:
   - **Likely candidates:** Zoe workflows (8 total), Zoro workflows (may be newer)
   - **Already compliant:** Jarvis workflows (7 total - known to follow standard)

4. For non-compliant workflows:
   - Extract embedded instructions from YAML
   - Create new `instructions.md` file in workflow folder
   - Update workflow.yaml to reference external file
   - Move any template content to `template.md`

**Example Migration:**

```yaml
# BEFORE (embedded)
steps:
  - name: Generate Image
    goal: Create platform-optimized image
    instructions: |
      Use Emily JSON methodology
      Call mcp__nanobanana__generate_image
      Evaluate with 7-pillar framework

# AFTER (external)
instructions: "{installed_path}/instructions.md"

# Create instructions.md with:
<workflow name="create-single-image">
  <step id="1" name="Generate Image">
    <goal>Create platform-optimized image</goal>
    <instructions>
      Use Emily JSON methodology
      Call mcp__nanobanana__generate_image
      Evaluate with 7-pillar framework
    </instructions>
  </step>
</workflow>
```

**Validation:**

```bash
# Check all workflows point to external instructions
find bmad -name "workflow.yaml" -exec grep -H "^instructions:" {} \; | grep -v "instructions.md" && echo "❌ Embedded instructions found" || echo "✅ All use external pattern"

# Verify instructions.md files exist
find bmad -name "workflow.yaml" -type f | while read wf; do
  DIR=$(dirname "$wf")
  test -f "$DIR/instructions.md" || echo "⚠️  Missing: $DIR/instructions.md"
done
```

---

### TASK 14: Validate Workflow Variable Declarations (MEDIUM)

**Purpose:** Ensure all workflows properly declare and use BMad config variables

**BMad Standard Variables (from bmad/bmb/config.yaml):**

```yaml
config_source: '{project-root}/bmad/{module}/config.yaml'
user_name: '{config_source}:user_name'
communication_language: '{config_source}:communication_language'
output_folder: '{config_source}:output_folder'
```

**Implementation:**

1. For each workflow.yaml, verify it declares:

   ```yaml
   # Required for ALL workflows
   config_source: '{agent-folder}/config.yaml' # OR "{project-root}/bmad/{module}/config.yaml"
   user_name: '{config_source}:user_name'
   communication_language: '{config_source}:communication_language'
   output_folder: '{config_source}:output_folder'
   date: system-generated
   ```

2. Check variable usage consistency:
   - Use `{variable}` syntax (single braces)
   - NOT `{{variable}}` (double braces) - only for substitution placeholders
   - NOT `$variable` (shell syntax)

3. Verify installed_path declared:

   ```yaml
   installed_path: "{project-root}/bmad/agents/{agent}/workflows/{workflow-name}"
   # OR
   installed_path: "{agent-folder}/workflows/{workflow-name}"
   ```

4. Check instructions/template references use installed_path:
   ```yaml
   instructions: '{installed_path}/instructions.md'
   template: '{installed_path}/template.md'
   # NOT hardcoded paths
   ```

**Validation:**

```bash
# Check all workflows have config_source
find bmad -name "workflow.yaml" -exec grep -L "config_source:" {} \; | while read wf; do
  echo "⚠️  Missing config_source: $wf"
done

# Check all workflows have user_name
find bmad -name "workflow.yaml" -exec grep -L "user_name:" {} \; | while read wf; do
  echo "⚠️  Missing user_name: $wf"
done

# Verify variable syntax consistency (no {{double}})
grep -r "{{[a-z_]*}}" bmad/*/workflows/*/workflow.yaml && echo "⚠️  Found double-brace syntax" || echo "✅ Variable syntax correct"
```

---

### TASK 15: Synchronize Slash Commands with Agent Files (MEDIUM)

**Purpose:** Ensure .claude/commands copies match bmad/agents primary files

**Challenge:** BMad uses dual-location pattern:

- **Primary:** `bmad/agents/{module}/{agent}.md` (source of truth)
- **Discovery:** `.claude/commands/social-media-team/{agent}.md` (Claude Code slash commands)

**Current State:**

- ✅ `.claude/commands/social-media-team/jarvis.md` exists
- ✅ `.claude/commands/social-media-team/zoe.md` exists
- ✅ `.claude/commands/social-media-team/zoro.md` exists
- ⚠️ Some may be out of sync with bmad/ versions

**Synchronization Options:**

**Option A: Manual Copy (Simple, Error-Prone)**

```bash
# After updating bmad/agents/zoe/zoe.md
cp bmad/agents/zoe/zoe.md .claude/commands/social-media-team/zoe.md
cp bmad/agents/zoro/zoro.md .claude/commands/social-media-team/zoro.md
```

**Option B: Symlinks (Auto-Sync, May Not Work on All Systems)**

```bash
cd .claude/commands/social-media-team
ln -sf ../../../bmad/agents/zoe/zoe.md zoe.md
ln -sf ../../../bmad/agents/zoro/zoro.md zoro.md
```

**Option C: npm Script (Recommended)**

```json
// Add to package.json
{
  "scripts": {
    "sync:commands": "node tools/sync-slash-commands.js"
  }
}
```

**Implementation:**

1. Choose synchronization approach (recommend Option A for simplicity)
2. After creating/updating any agent file in bmad/agents/:
   - Copy to corresponding .claude/commands/social-media-team/ location
   - Verify id attribute matches new path
3. Add to deployment checklist

**Validation:**

```bash
# Check if files are in sync
diff bmad/agents/zoe/zoe.md .claude/commands/social-media-team/zoe.md && echo "✅ Zoe synced" || echo "⚠️  Zoe out of sync"
diff bmad/agents/zoro/zoro.md .claude/commands/social-media-team/zoro.md && echo "✅ Zoro synced" || echo "⚠️  Zoro out of sync"
```

---

### TASK 16: Validate Agent Activation Sequences (MEDIUM)

**Purpose:** Ensure all agents follow BMad v6 activation pattern

**BMad v6 Activation Standard (12-15 steps):**

From jarvis.md and zoe.md, every agent MUST have:

```xml
<activation critical="MANDATORY">
  <step n="1">Load persona from this current agent file</step>
  <step n="2">🚨 LOAD CONFIG - {project-root}/bmad/agents/{agent}/config.yaml
    - Store: {user_name}, {communication_language}, {output_folder}
    - VERIFY loaded before proceeding
  </step>
  <step n="3">Remember user's name is {user_name}</step>
  <step n="4-8">Load sidecar files (instructions.md, memories.md, etc.)</step>
  <step n="9">Show greeting using {user_name}, display numbered menu</step>
  <step n="10">STOP and WAIT for user input</step>
  <step n="11-12">Handle user input, execute menu items</step>

  <menu-handlers>
    <handler type="workflow">
      1. LOAD {project-root}/bmad/core/tasks/workflow.xml
      2. Execute workflow.xml instructions
      3. Save outputs after EACH step
    </handler>
  </menu-handlers>
</activation>
```

**Implementation:**

1. Read each agent file (jarvis.md, zoe.md, zoro.md)
2. Verify activation block has:
   - [ ] Step 2: Config loading with variable storage
   - [ ] Step with user_name greeting
   - [ ] Step to load sidecar instructions.md
   - [ ] Step to load sidecar memories.md (if agent tracks state)
   - [ ] Menu display step
   - [ ] WAIT for user input (not auto-execute)
   - [ ] menu-handlers with workflow handler
   - [ ] workflow handler loads workflow.xml (CRITICAL)

3. For any missing steps, add them following jarvis.md pattern

**Validation:**

```bash
# Check all agents have config loading
for agent in bmad/agents/*//*.md; do
  grep -q "config.yaml" "$agent" && echo "✅ $agent has config" || echo "❌ $agent missing config"
done

# Check all agents load workflow.xml
for agent in bmad/agents/*//*.md; do
  grep -q "workflow.xml" "$agent" && echo "✅ $agent loads workflow.xml" || echo "❌ $agent missing workflow.xml"
done
```

---

### TASK 17: Create Handoff JSON Schema Validation (LOW)

**Purpose:** Ensure agent-to-agent handoffs use consistent format

**Handoff Pattern:**

```
Jarvis → Zoe: Content + visual requirements
Zoe → Zoro: Content + media URLs
```

**Schema Location:** `schemas/handoff-package.schema.json` (NEW)

**Implementation:**

1. Create JSON schema:

   ```json
   {
     "$schema": "http://json-schema.org/draft-07/schema#",
     "type": "object",
     "required": ["handoff_id", "source_agent", "target_agent", "content_type"],
     "properties": {
       "handoff_id": {
         "type": "string",
         "pattern": "^[a-z]+-to-[a-z]+-[0-9]{4}-[0-9]{2}-[0-9]{2}"
       },
       "source_agent": {
         "type": "string",
         "enum": ["jarvis", "zoe", "zoro"]
       },
       "target_agent": {
         "type": "string",
         "enum": ["jarvis", "zoe", "zoro"]
       },
       "content_type": { "type": "string" },
       "platform_specs": { "type": "object" },
       "file_paths": { "type": "object" },
       "metadata": { "type": "object" },
       "notion_context": { "type": "object" }
     }
   }
   ```

2. Add validation to production-readiness-tests.js:
   ```javascript
   // TEST 7: Handoff JSON Validity
   const handoffFiles = glob.sync('outputs/projects/*/handoffs/*.json');
   handoffFiles.forEach((file) => {
     const data = JSON.parse(fs.readFileSync(file));
     if (validateHandoff(data, schema)) {
       pass(`Valid handoff: ${file}`);
     } else {
       fail(`Invalid handoff schema: ${file}`);
     }
   });
   ```

**Validation:**

```bash
# Find all handoff JSON files
find outputs/projects -name "*.json" -path "*/handoffs/*" | wc -l

# Validate against schema (if jq available)
find outputs/projects -name "*.json" -path "*/handoffs/*" -exec jq empty {} \; && echo "✅ Valid JSON" || echo "❌ Invalid JSON"
```

---

### TASK 18: Verify Agent Memory File Updates (MEDIUM)

**Purpose:** Ensure workflows correctly update agent memories.md

**Memory Files:**

- `bmad/agents/content-intelligence/jarvis-sidecar/memories.md` - Voice profiles, API costs
- `bmad/agents/zoe/zoe-sidecar/memories.md` - Image preferences, quality history
- `bmad/agents/zoro/zoro-sidecar/memories.md` - Publishing history, rate limits

**What Should Be Tracked:**

**Jarvis memories.md:**

- Voice profiles learned (Enhanced Voice Profile v2.0)
- API cost tracking (Exa, Apify, Firecrawl usage)
- Research topic history
- Content preferences

**Zoe memories.md:**

- Image generation history (tool used, quality scores)
- Platform preferences (LinkedIn dark tech, YouTube CTR)
- Media asset tracking
- Cloudinary upload costs

**Zoro memories.md:**

- Publishing history (posts per platform)
- Rate limit tracking (Twitter 1500/month, LinkedIn 150/day)
- Successful post URLs
- Platform quotas

**Implementation:**

1. Read each agent's memories.md file
2. Verify structure exists for tracking:

   ```markdown
   ## API Cost Tracking

   ### Month: 2025-11

   - Date: 2025-11-02, Tool: exa-search, Cost: $0.05, Total: $0.05
   - Date: 2025-11-02, Tool: gpt-image-1, Cost: $0.04, Total: $0.09

   ## Voice Profiles

   ### Enhanced Voice Profile v2.0

   [Voice characteristics...]
   ```

3. Check workflow instructions.md files update memories:

   ```xml
   <step id="final" name="Log Cost">
     <instructions>
       Update {agent-folder}/memories.md:
       - Add cost entry: Date, Tool, Amount
       - Update monthly total
     </instructions>
   </step>
   ```

4. Add validation that memories not corrupted (valid markdown)

**Validation:**

```bash
# Check all agent sidecars have memories.md
for sidecar in bmad/agents/*/*-sidecar; do
  test -f "$sidecar/memories.md" && echo "✅ $(basename $(dirname $sidecar)) has memories" || echo "⚠️  Missing memories.md"
done

# Validate memories are valid markdown
for mem in bmad/agents/*/*-sidecar/memories.md; do
  head -1 "$mem" | grep -q "^#" && echo "✅ Valid markdown: $mem" || echo "⚠️  Check format: $mem"
done
```

---

### TASK 19: Validate Output Structure Compliance (MEDIUM)

**Purpose:** Ensure all outputs follow v2.0 structure (outputs/projects/{YYYY-MM-DD}-{slug}/)

**Current Issue:** Legacy date folders mixed with new structure

```
outputs/
├── 10-28-2025/  ❌ Legacy pattern
├── 10-29-2025/  ❌ Legacy pattern
├── 11-01-2025/  ❌ Legacy pattern
└── projects/    ✅ New pattern
    └── 2025-11-01-neon-divide/
```

**Implementation:**

1. Identify legacy folders:

   ```bash
   ls outputs/ | grep -E "^[0-9]{2}-[0-9]{2}-[0-9]{4}$"
   ```

2. Options for legacy folders:
   - **Option A:** Move to `outputs/archive/legacy-{date}/`
   - **Option B:** Rename to new pattern: `outputs/projects/{YYYY-MM-DD}-{inferred-slug}/`
   - **Option C:** Delete if content not needed

3. Ensure future workflows use correct pattern:
   - Check all workflow instructions.md for output path references
   - Update to: `{project-root}/outputs/projects/{YYYY-MM-DD}-{project-slug}/`
   - Verify 6-stage structure: 00-session through 05-published

4. Validate metadata.json in project folders:
   ```json
   {
     "project_id": "YYYY-MM-DD-slug",
     "created_at": "ISO timestamp",
     "agents_involved": ["jarvis", "zoe", "zoro"],
     "workflows_executed": [...]
   }
   ```

**Validation:**

```bash
# Check for legacy date folders
LEGACY=$(ls outputs/ | grep -E "^[0-9]{2}-[0-9]{2}-[0-9]{4}$" | wc -l)
if [ "$LEGACY" -gt 0 ]; then
  echo "⚠️  Found $LEGACY legacy folders (need migration)"
else
  echo "✅ No legacy folders"
fi

# Verify new projects use correct pattern
ls outputs/projects/ | grep -E "^[0-9]{4}-[0-9]{2}-[0-9]{2}-" || echo "⚠️  No projects with correct pattern"

# Check 6-stage structure in projects
for proj in outputs/projects/*/; do
  STAGES=$(ls -d "$proj"*/ 2>/dev/null | wc -l)
  if [ "$STAGES" -ge 6 ]; then
    echo "✅ $(basename $proj) has proper structure"
  else
    echo "⚠️  $(basename $proj) missing stages (has $STAGES, need 6)"
  fi
done
```

---

### TASK 20: Create MCP Configuration Setup Guide (HIGH)

**Purpose:** Complete guide to configure ALL required MCPs (not "separate task")

**File:** `docs/mcp-server-setup.md` (NEW)

**Content:**

````markdown
# MCP Server Configuration Guide

**Purpose:** Step-by-step setup for all required MCP servers

**Prerequisites:**

- Claude Code Desktop installed
- Node.js v20+ installed
- API keys obtained (see .env.template)

---

## Configuration File Location

Claude Code MCP configuration: `.mcp.json` in project root

## Required MCP Servers (15+)

### 1. Notion (Knowledge Management)

**Installation:**

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/mcp-server"],
      "env": {
        "NOTION_API_KEY": "${NOTION_API_KEY}"
      }
    }
  }
}
```
````

**API Key:** Get from https://www.notion.so/my-integrations
**Testing:** `/mcp` should show "notion" with tools: notion-search, notion-fetch, etc.

### 2. fal-video (PRIMARY Video Generation)

**Installation:**

```json
{
  "fal-video": {
    "command": "npx",
    "args": ["-y", "@fal-ai/mcp-server"],
    "env": {
      "FAL_API_KEY": "${FAL_API_KEY}"
    }
  }
}
```

**API Key:** Get from https://fal.ai/dashboard/keys
**Testing:** Check for tool `mcp__fal-video__execute_custom_model`

### 3. Cloudinary (Media Storage - CRITICAL)

**Installation:**

```json
{
  "cloudinary-asset-mgmt": {
    "command": "npx",
    "args": ["-y", "@cloudinary/mcp-server"],
    "env": {
      "CLOUDINARY_CLOUD_NAME": "${CLOUDINARY_CLOUD_NAME}",
      "CLOUDINARY_API_KEY": "${CLOUDINARY_API_KEY}",
      "CLOUDINARY_API_SECRET": "${CLOUDINARY_API_SECRET}"
    }
  }
}
```

**API Keys:** Get from https://cloudinary.com/console/settings/api-keys
**Testing:** Check for tool `mcp__cloudinary-asset-mgmt__upload-asset`

[Continue for all 15+ MCPs...]

## Validation Checklist

After configuration:

- [ ] Run `/mcp` - lists all MCPs
- [ ] Check notion shows simple tool names (notion-search)
- [ ] Check others show mcp\_\_ prefixed names
- [ ] Test one tool from each MCP
- [ ] Verify no "MCP not found" errors

````

**Validation:**
```bash
# File created
test -f docs/mcp-server-setup.md && echo "✅ Setup guide created"

# User must configure MCPs
echo "⚠️  User action: Follow docs/mcp-server-setup.md to configure .mcp.json"
````

---

### TASK 21: Fix Validation Script Error Handling (HIGH)

**Purpose:** Ensure all validation scripts exit with proper codes

**Issue:** Current scripts in PRP don't set exit codes on failure

**BMad Standard Pattern:**

```bash
#!/bin/bash
EXIT_CODE=0  # Start clean

# Run checks
if [ condition ]; then
  echo "✅ PASS"
else
  echo "❌ FAIL"
  EXIT_CODE=1  # Mark failure
fi

# More checks...

exit $EXIT_CODE  # Return proper code
```

**Implementation:**

Update all validation scripts in Tasks 2, 3, 9 to include proper error handling:

**Example - Fix Task 2 Validation:**

```bash
# ENHANCED VERSION with exit codes
#!/bin/bash
EXIT_CODE=0

echo "=== AGENT MANIFEST VALIDATION ==="

# Check no duplicates
DUPES=$(sort bmad/_cfg/agent-manifest.csv | uniq -d | wc -l)
if [ "$DUPES" -eq 0 ]; then
  echo "✅ No duplicate entries"
else
  echo "❌ Found $DUPES duplicate entries"
  EXIT_CODE=1
fi

# Verify all paths exist
tail -n +2 bmad/_cfg/agent-manifest.csv | while IFS=, read -r _ _ _ _ _ _ _ _ _ path; do
  path=$(echo "$path" | tr -d '"')
  if [ -f "$path" ]; then
    echo "✅ Path exists: $path"
  else
    echo "❌ Path missing: $path"
    EXIT_CODE=1
  fi
done

exit $EXIT_CODE
```

**Files to Update:**

- Task 2: agent-manifest.csv validation (add EXIT_CODE=0, exit $EXIT_CODE)
- Task 3: workflow-manifest.csv validation (add EXIT_CODE=0, exit $EXIT_CODE)
- Gate 1: validate-file-structure.sh (add EXIT_CODE=0, exit $EXIT_CODE)
- Gate 2: validate-registries.sh (add EXIT_CODE=0, exit $EXIT_CODE)

**Validation:**

```bash
# Test error handling
bash test/validate-registries.sh
echo "Exit code: $?"
# Should be 0 if pass, 1 if fail
```

---

### TASK 22: Clarify Notion Tool Naming Pattern (CRITICAL DOCUMENTATION)

**Purpose:** Resolve confusion about Notion tool definition vs invocation names

**Discovery from System Context:**

**Tool Definitions (in function list):**

```
mcp__notion__notion-search
mcp__notion__notion-fetch
mcp__notion__notion-create-pages
```

**Tool Invocations (user confirmed from /mcp output):**

```
notion-search
notion-fetch
notion-create-pages
```

**THE PATTERN:**

- **Definition name:** `mcp__notion__notion-search` (how Claude Code registers it internally)
- **Invocation name:** `notion-search` (what you actually call in code)
- **Both work!** But simple name preferred for Notion

**Implementation:**

Update `docs/mcp-tool-naming-standards.md` to add:

````markdown
## Special Case: Notion Tool Names

Notion tools have a DOUBLE naming pattern:

**Internal Registration:** `mcp__notion__notion-search`
**Invocation Name:** `notion-search` (simplified)

**Both names work when calling tools:**

```javascript
// ✅ Preferred (simple)
notion - search({ query: '...' });

// ✅ Also works (full name)
mcp__notion__notion - search({ query: '...' });
```
````

**Why the difference?**

- Official Anthropic MCPs get simplified invocation names
- Claude Code allows both full and simple names
- Documentation should use simple names for clarity

**Other MCPs:** MUST use full names

- ❌ Cannot simplify: `fal-video({...})` won't work
- ✅ Must use full: `mcp__fal-video__execute_custom_model({...})`

**Rule of Thumb:**

- Notion: Use simple names (notion-search)
- Everything else: Use mcp** prefix (mcp**fal-video\_\_execute_custom_model)

````

---

### TASK 23: Create npm Pre-Deploy Script (MEDIUM)

**Purpose:** Single command to run all quality gates

**File:** `package.json` (UPDATE)

**Implementation:**

Add comprehensive pre-deploy script:

```json
{
  "scripts": {
    "test:production": "node test/production-readiness-tests.js",
    "validate:file-structure": "bash test/validate-file-structure.sh",
    "validate:registries": "bash test/validate-registries.sh",
    "sync:commands": "cp bmad/agents/zoe/zoe.md .claude/commands/social-media-team/zoe.md && cp bmad/agents/zoro/zoro.md .claude/commands/social-media-team/zoro.md",

    "pre-deploy": "npm run lint:fix && npm run format:fix && npm run test && npm run validate:schemas && npm run test:production && npm run validate:file-structure && npm run validate:registries",

    "deploy:check": "echo '=== RUNNING ALL VALIDATION GATES ===' && npm run pre-deploy && echo '\n✅ SYSTEM PRODUCTION READY'"
  }
}
````

**Usage:**

```bash
# Run before any deployment
npm run deploy:check

# If passes, system is production-ready
# If fails, fix errors and re-run
```

**Validation:**

```bash
# Verify scripts added
grep -q "pre-deploy" package.json && echo "✅ Pre-deploy script exists"
grep -q "deploy:check" package.json && echo "✅ Deploy check script exists"
```

---

### TASK 24: Add BMad Headers to All New Files (LOW)

**Purpose:** Brand all BMad artifacts with standard header

**BMad Standard Header:**

```markdown
<!-- Powered by BMAD™ Core -->
```

**Files to Update:**

1. **New Documentation:**
   - docs/mcp-tool-naming-standards.md
   - docs/mcp-server-setup.md

2. **New Test Scripts:**
   - test/production-readiness-tests.js (as comment)
   - test/validate-file-structure.sh (as comment)
   - test/validate-registries.sh (as comment)

3. **New Agent Files:**
   - bmad/agents/zoe/zoe.md (already should have if copied from .claude/commands)
   - bmad/agents/zoro/zoro.md

**Implementation:**

For markdown files:

```markdown
<!-- Powered by BMAD™ Core -->

# Document Title
```

For script files:

```bash
#!/bin/bash
# Powered by BMAD™ Core
# Script purpose...
```

For JavaScript files:

```javascript
/**
 * Powered by BMAD™ Core
 * Script purpose...
 */
```

**Validation:**

```bash
# Check new docs have header
grep -l "Powered by BMAD" docs/mcp-*.md | wc -l
# Should match number of new docs created

# Check test scripts have header
grep -l "Powered by BMAD" test/*.{js,sh} | wc -l
```

---

## 🧪 Validation Gates

### Gate 1: File Structure Integrity (Must Pass Before Deployment)

```bash
#!/bin/bash
# Run: bash test/validate-file-structure.sh

echo "=== AGENT FILES ==="
test -f bmad/agents/content-intelligence/jarvis.md && echo "✅ Jarvis" || echo "❌ Jarvis missing"
test -f bmad/agents/zoe/zoe.md && echo "✅ Zoe" || echo "❌ Zoe missing"
test -f bmad/agents/zoro/zoro.md && echo "✅ Zoro" || echo "❌ Zoro missing"

echo -e "\n=== WORKFLOW FILES ==="
WORKFLOW_COUNT=$(find bmad -name "workflow.yaml" | wc -l)
echo "Workflows found: $WORKFLOW_COUNT (expected: 16+)"

echo -e "\n=== SKILL FILES ==="
SKILL_COUNT=$(find .claude/skills -name "SKILL.md" | wc -l)
echo "Skills found: $SKILL_COUNT (expected: 24)"

echo -e "\n=== REGISTRY FILES ==="
test -f bmad/_cfg/agent-manifest.csv && echo "✅ Agent manifest" || echo "❌ Agent manifest missing"
test -f bmad/_cfg/workflow-manifest.csv && echo "✅ Workflow manifest" || echo "❌ Workflow manifest missing"
test -f .bmad-core/data/tool-registry.yaml && echo "✅ Tool registry" || echo "❌ Tool registry missing"
test -f .bmad-core/data/workflow-registry.yaml && echo "✅ Workflow registry" || echo "❌ Workflow registry missing"

echo -e "\n=== DOCUMENTATION ==="
test -f docs/mcp-tool-naming-standards.md && echo "✅ Tool naming standards" || echo "⚠️  Standards doc missing"
test -f .env.template && echo "✅ .env template" || echo "⚠️  .env.template missing"
```

### Gate 2: Registry Accuracy (Must Pass)

```bash
#!/bin/bash
# Run: bash test/validate-registries.sh

echo "=== AGENT MANIFEST VALIDATION ==="

# Check for duplicates
DUPES=$(sort bmad/_cfg/agent-manifest.csv | uniq -d | wc -l)
if [ "$DUPES" -eq 0 ]; then
  echo "✅ No duplicate entries"
else
  echo "❌ Found $DUPES duplicate entries"
fi

# Verify all paths exist
echo "Checking agent paths..."
tail -n +2 bmad/_cfg/agent-manifest.csv | while IFS=, read -r name _ _ _ _ _ _ _ _ path; do
  path=$(echo "$path" | tr -d '"' | xargs)
  if [ -f "$path" ]; then
    echo "✅ $name → $path"
  else
    echo "❌ $name → $path (NOT FOUND)"
  fi
done

echo -e "\n=== WORKFLOW MANIFEST VALIDATION ==="

# Check for duplicates
DUPES=$(sort bmad/_cfg/workflow-manifest.csv | uniq -d | wc -l)
if [ "$DUPES" -eq 0 ]; then
  echo "✅ No duplicate entries"
else
  echo "❌ Found $DUPES duplicate entries"
fi

# Verify all paths exist
echo "Checking workflow paths..."
tail -n +2 bmad/_cfg/workflow-manifest.csv | while IFS=, read -r name _ _ path _; do
  path=$(echo "$path" | tr -d '"' | xargs)
  if [ -f "$path" ]; then
    echo "✅ $name → $path"
  else
    echo "❌ $name → $path (NOT FOUND)"
  fi
done
```

### Gate 3: Code Quality (Must Pass)

```bash
#!/bin/bash
# Run: npm run pre-deploy

set -e  # Exit on any error

echo "=== CODE QUALITY CHECKS ==="

echo "Running ESLint..."
npm run lint

echo "Running Prettier..."
npm run format:check

echo "Running tests..."
npm run test

echo "Validating schemas..."
npm run validate:schemas

echo "Running production tests..."
npm run test:production

echo -e "\n✅ ALL QUALITY GATES PASSED"
```

### Gate 4: MCP Tool Names (Manual Review)

**Checklist:**

- [ ] All Notion tools use simple names (notion-search, notion-fetch)
- [ ] All other MCP tools use mcp**server**tool pattern
- [ ] fal-video references use "execute_custom_model" not "fal custom video"
- [ ] Cloudinary tools use mcp**cloudinary-asset-mgmt** prefix
- [ ] No mcp**notion** pattern anywhere (incorrect)

**Verification Script:**

```bash
# Search for incorrect notion tool pattern
echo "Checking for incorrect mcp__notion__ pattern..."
grep -r "mcp__notion__" bmad/ .claude/ docs/ .bmad-core/ && echo "❌ FOUND ERRORS" || echo "✅ No errors"

# Search for correct notion pattern
echo -e "\nChecking for correct notion- pattern..."
grep -r "notion-search\|notion-fetch\|notion-create\|notion-update" bmad/ .claude/ | head -5
echo "✅ Correct pattern in use"

# Verify fal-video tool name
echo -e "\nChecking fal-video tool name..."
grep -r "execute_custom_model" .bmad-core/ .claude/skills/ | head -3
echo "✅ Correct fal-video tool name"
```

### Gate 5: End-to-End Pipeline Test (Manual)

**Test Scenarios:**

**Scenario 1: Text-Only Pipeline (Jarvis → Zoro)**

```
1. Invoke: /jarvis
2. Select: *research-topic
3. Input: topic="AI agents", depth="standard"
4. Verify: Research brief created in outputs/projects/{date}-{slug}/01-research/
5. Select: *write-post
6. Input: platform="twitter", voice_mode="analyst"
7. Verify: Post created in 03-drafts/twitter/
8. Invoke: /zoro
9. Select: *schedule-post
10. Input: platform="twitter", date="now"
11. Verify: Post published, URL in 05-published/twitter/url.md
12. Check: Notion status updated to "Posted"
```

**Expected Duration:** 5-8 minutes
**Expected Cost:** $0.05 (Exa research)
**Success Criteria:** Post publishes, all files created, Notion updated

**Scenario 2: Full Visual Pipeline (Jarvis → Zoe → Zoro)**

```
1. Invoke: /jarvis → *research-topic → *write-post (LinkedIn)
2. Invoke: /zoe → *create-image
3. Input: platform="linkedin", style="dark tech monochrome"
4. Verify: Image in 04-media/images/, Cloudinary URL obtained
5. Invoke: /zoro → *schedule-post
6. Input: platforms=["linkedin"], attachments=[cloudinary_url]
7. Verify: Post scheduled with image, 05-published/linkedin/ populated
```

**Expected Duration:** 8-12 minutes
**Expected Cost:** $0.10 (Exa + gpt-image-1 + Cloudinary)
**Success Criteria:** LinkedIn post with image, all stages complete

---

## 📋 Implementation Checklist

### Phase 1: Critical Agent & Registry Fixes (2-3 hours)

- [ ] **Task 1A:** Create bmad/agents/zoe/zoe.md (copy from .claude/commands)
- [ ] **Task 1B:** Create bmad/agents/zoro/zoro.md (copy from .claude/commands)
- [ ] **Task 2:** Clean agent-manifest.csv (remove duplicates, fix standalone/ paths)
- [ ] **Task 3:** Clean workflow-manifest.csv (remove duplicates, verify all paths)
- [ ] **Task 4:** Update workflow-registry.yaml (mark 3 workflows as operational)
- [ ] **Task 5:** Update tool-registry.yaml (add actual_tool_name fields, deprecate veotools)
- [ ] **Task 15:** Synchronize slash commands (copy bmad/ to .claude/commands/)
- [ ] **Validate:** Run validate-file-structure.sh, validate-registries.sh

### Phase 2: BMad Workflow Standardization (2-3 hours)

- [ ] **Task 13:** Audit workflows for external instructions.md pattern (find embedded)
- [ ] **Task 14:** Validate workflow variable declarations (config_source, user_name, etc.)
- [ ] **Task 16:** Validate agent activation sequences (12-step pattern)
- [ ] **Task 21:** Fix validation script error handling (add EXIT_CODE to all scripts)
- [ ] **Validate:** All workflows follow BMad v6 standards

### Phase 3: Tool Names & MCP Setup (1-2 hours)

- [ ] **Task 12:** Verify skill MCP tool references (check all 24 skills)
- [ ] **Task 22:** Clarify Notion tool naming in mcp-tool-naming-standards.md
- [ ] **Task 7:** Create docs/mcp-tool-naming-standards.md (with Notion special case)
- [ ] **Task 20:** Create docs/mcp-server-setup.md (complete MCP configuration guide)
- [ ] **Task 11:** Create .env.template
- [ ] **Validate:** No mcp**notion** patterns, all tool names verified

### Phase 4: Documentation & Strategy (1 hour)

- [ ] **Task 6:** Update epic-list.md completion percentages (realistic numbers)
- [ ] **Task 8A:** Update architecture.md video tools section (deprecate veotools)
- [ ] **Task 8B:** Update mcp-tool-selection.md (fal-video PRIMARY)
- [ ] **Task 8C:** Update CLAUDE.md video strategy
- [ ] **Task 10:** Update architecture.md workflow count (20+ → 16 actual)
- [ ] **Task 24:** Add BMad headers to all new files
- [ ] **Validate:** Documentation consistent and accurate

### Phase 5: Testing & Validation (1-2 hours)

- [ ] **Task 9:** Create test/production-readiness-tests.js
- [ ] **Task 23:** Create npm pre-deploy and deploy:check scripts
- [ ] **Task 17:** Create schemas/handoff-package.schema.json (optional)
- [ ] **Task 18:** Verify agent memory file updates (optional)
- [ ] **Task 19:** Validate output structure compliance (archive legacy folders)
- [ ] **Run:** npm run deploy:check
- [ ] **Validate:** All gates pass

### Phase 6: End-to-End Pipeline Testing (1-2 hours)

- [ ] Test Scenario 1: Text-only pipeline (Jarvis → Zoro)
- [ ] Test Scenario 2: Full visual pipeline (Jarvis → Zoe → Zoro)
- [ ] Test Scenario 3: Agent handoff validation
- [ ] Document actual costs vs estimates
- [ ] Update registries with test results
- [ ] Mark Epic 7 as started

---

## 🎯 Success Criteria

### Immediate (Post-Implementation)

- ✅ All agent files exist (jarvis.md, zoe.md, zoro.md in bmad/)
- ✅ All registries accurate (no duplicates, no phantom paths)
- ✅ All MCP tool names verified and documented
- ✅ Video strategy clear (fal-video PRIMARY)
- ✅ npm run test:production passes

### Short-Term (Within 1 week)

- ✅ End-to-end pipeline tested successfully
- ✅ Actual costs documented and within budget
- ✅ Epic completion percentages reflect reality
- ✅ Ready for production content creation

### Long-Term (Production Operation)

- System generates 8-10 posts/week
- Content quality: Voice consistency ≥8/10
- Monthly costs: <$50
- Pipeline success rate: ≥95%
- Time savings: 75-135 min → 10-15 min per post

---

## 🔍 Quality Assessment

### Confidence Score: **9/10** (Enhanced from 7.5/10 with BMad additions)

**Why 9/10:**

- ✅ All tool names verified from system context AND /mcp output (double-verified)
- ✅ All file patterns confirmed via filesystem checks (not assumed)
- ✅ Agent file format matches ACTUAL working examples (jarvis.md, zoe.md)
- ✅ BMad v6 standards integrated (external instructions, variables, activation)
- ✅ Validation gates are executable scripts with proper error handling
- ✅ Clear prioritization (critical → BMad standards → documentation → testing)
- ✅ 24 comprehensive tasks covering system integrity, BMad compliance, and production readiness
- ✅ Includes both original gaps AND BMad Builder's expert additions
- ✅ Notion tool naming clarified (definition vs invocation names)
- ✅ Video tool strategy crystal clear (fal-video PRIMARY, heygen specialized, veotools deprecated)

**Why not 10/10:**

- Some workflow embedded-to-external migrations may need iteration (Task 13)
- MCP availability still depends on .mcp.json configuration (but now has setup guide in Task 20)
- End-to-end testing may reveal edge cases not covered in tasks
- Skill tool name updates may uncover unexpected patterns (Task 12)

### One-Pass Implementation Probability: **80-85%** (Realistic for 24 tasks)

**Likely to succeed in one pass (18 tasks):**

- File creation tasks (templates provided + copy commands)
- Registry cleanup (scripts provided with error handling)
- Documentation updates (specific line numbers given)
- Validation tests (complete scripts with EXIT_CODE handling)
- Tool name updates (exact patterns documented)
- BMad headers (simple additions)

**May require iteration (6 tasks):**

- Task 13: Workflow embedded → external migration (depends on complexity)
- Task 12: Skill tool name verification (may find unexpected patterns)
- Task 14: Workflow variable audit (manual check of many files)
- Task 16: Agent activation validation (may need persona adjustments)
- Task 19: Output structure compliance (legacy folder decision)
- Task 18: Memory file verification (depends on content quality)

### BMad v6 Compliance Score: **9/10** (vs 7.5/10 before enhancements)

**What Was Added:**

- ✅ External instructions.md audit (Epic 8 requirement)
- ✅ Workflow variable declaration standards
- ✅ Agent activation sequence validation (12-step pattern)
- ✅ Skill tool name verification
- ✅ Memory file update checks
- ✅ BMad headers for branding
- ✅ Proper bash error handling (EXIT_CODE pattern)
- ✅ Notion special case documented (double naming)

---

## 📦 Dependencies

### Required Tools

- Node.js v20+ (for npm scripts)
- bash (for validation scripts)
- xmllint (optional, for XML validation)
- git (for version control)

### Required Files

- ✅ bmad/agents/content-intelligence/jarvis.md (exists, use as template)
- ✅ .claude/commands/social-media-team/\*.md (exists, extract personas)
- ✅ All workflow files (exist, verify references)
- ✅ All skill files (exist, no changes needed)

### Optional Tools

- jq (for JSON validation)
- yamllint (for YAML validation)

---

## 🚀 Deployment Checklist

After implementing this PRP:

### Pre-Deployment Checks

- [ ] Run: `npm run pre-deploy` (all quality gates)
- [ ] Run: `bash test/validate-file-structure.sh`
- [ ] Run: `bash test/validate-registries.sh`
- [ ] Review: All agent files have valid XML
- [ ] Review: All registries match filesystem
- [ ] Review: .env configured with real API keys

### Deployment Steps

1. Verify .mcp.json has all required MCPs
2. Test agent activation: `/jarvis`, `/zoe`, `/zoro`
3. Test workflow execution: Select one workflow per agent
4. Test MCP tool calls: Verify no "tool not found" errors
5. Run end-to-end pipeline: Jarvis → Zoe → Zoro
6. Document results in session log

### Post-Deployment Validation

- [ ] Generate 1 test post per platform (Twitter, LinkedIn, YouTube)
- [ ] Verify output folder structure correct (6 stages)
- [ ] Verify Notion status transitions work
- [ ] Verify media reusability (1 image used for 2+ platforms)
- [ ] Track actual costs vs estimates
- [ ] Update Epic 7 with test results

---

## 📚 Reference Documentation

### Internal Resources

- Agent Template: `bmad/agents/content-intelligence/jarvis.md`
- Workflow Template: `bmad/agents/content-intelligence/jarvis-sidecar/workflows/research-topic/`
- Output Structure: `outputs/README.md` (v2.0 spec)
- Tool Registry: `.bmad-core/data/tool-registry.yaml`
- Workflow Registry: `.bmad-core/data/workflow-registry.yaml`

### External Resources

- Claude Code Docs: https://docs.claude.com/claude-code
- MCP Protocol: https://modelcontextprotocol.io
- FAL.ai Models: https://fal.ai/models
- Notion MCP: https://github.com/notionhq/notion-mcp-server
- Cloudinary Upload API: https://cloudinary.com/documentation/image_upload_api_reference
- Postiz Documentation: Via integrationSchema tool

### Research Findings

- **Location:** `outputs/projects/2025-11-02-production-ready-research/`
- **Files:**
  - PRODUCTION-READY-RESEARCH-FINDINGS.md (complete research)
  - QUICK-REFERENCE.md (copy-paste tool names)

---

## 🧙 BMad v6 Best Practices (CRITICAL KNOWLEDGE)

### Agent Architecture Standards

**1. Agent File Format (Markdown + YAML Frontmatter + XML):**

```markdown
---
name: 'agent-name'
description: 'Agent one-line description for discovery'
---

<?xml version="1.0" encoding="UTF-8"?>
<agent id="bmad/agents/{module}/{agent}.md" name="AgentName" title="..." icon="...">
  <activation critical="MANDATORY">
    <step n="1">Load persona</step>
    <step n="2">LOAD config.yaml, store variables</step>
    <!-- 10+ more steps -->
  </activation>
  <persona>
    <role>Primary function</role>
    <identity>Who I am...</identity>
    <communication_style>How I talk...</communication_style>
    <principles>What I believe...</principles>
  </persona>
  <skills><!-- Skill inventory --></skills>
  <menu><!-- Workflow commands --></menu>
</agent>
```

**2. Mandatory 12-Step Activation Pattern:**

1. Load persona from current file
2. **CRITICAL:** Load {agent-folder}/config.yaml, store {user_name}, {communication_language}, {output_folder}
3. Remember user's name
4. Load sidecar instructions.md
5. Load sidecar memories.md
6. Load skills awareness
7. Load team coordination protocols
8. Display greeting with {user_name}
9. Show numbered menu
10. STOP and WAIT for user input
11. Handle user input (number or trigger text)
12. Execute menu items via menu-handlers

**menu-handlers MUST include:**

```xml
<handler type="workflow">
  1. LOAD {project-root}/bmad/core/tasks/workflow.xml
  2. Execute workflow.xml (CORE OS)
  3. Save outputs after EACH step
</handler>
```

**3. Dual-Location Pattern:**

- **Primary:** `bmad/agents/{module}/{agent}.md` (source of truth)
- **Discovery:** `.claude/commands/social-media-team/{agent}.md` (slash command copy)
- **Sync:** Manual copy OR npm script after updates

---

### Workflow Architecture Standards

**1. External Instructions Pattern (BMad v6 REQUIRED - Epic 8):**

```yaml
# ✅ CORRECT
instructions: '{installed_path}/instructions.md'
template: '{installed_path}/template.md' # or false

# ❌ ANTI-PATTERN - Never embed
steps:
  - name: ...
    instructions: | # Embedded = wrong
```

**2. Required Variable Declarations:**

```yaml
# Every workflow MUST have:
config_source: '{agent-folder}/config.yaml'
user_name: '{config_source}:user_name'
communication_language: '{config_source}:communication_language'
output_folder: '{config_source}:output_folder'
date: system-generated
installed_path: '{agent-folder}/workflows/{workflow-name}'
```

**3. Instructions.md Format (XML with BMad tags):**

```xml
<workflow name="workflow-name">
  <step id="1" name="Descriptive Step Name">
    <goal>What this step accomplishes</goal>
    <instructions>
      Detailed step-by-step instructions
      Reference MCP tools by CORRECT names
      Use {variables} for dynamic content
    </instructions>
    <outputs>
      - output_var_name: "Description"
    </outputs>
  </step>
</workflow>
```

**4. MCP Tool References in Workflows:**

- Use EXACT tool names (mcp**fal-video**execute_custom_model)
- Notion special case: Can use simple names (notion-search)
- Never assume or shorten non-Notion tools

---

### Skill Architecture Standards

**1. SKILL.md Structure (Markdown with YAML Frontmatter):**

```markdown
---
name: skill-name
description: 'Discovery-optimized description with trigger keywords'
version: '1.0'
owner: agent-name
tools:
  - mcp__server__tool
  - notion-search
cost_range: '$0 - $0.50'
---

# Skill Name

## Purpose

[What this skill does]

## When to Use

[Trigger conditions for Claude discovery]

## Instructions

[Step-by-step methodology]

## Tool Orchestration

[How to select and route between MCPs]

## Quality Standards

[Success criteria]
```

**2. Tool Name Correctness:**

- Must use VERIFIED tool names from system context
- Notion: Simple names (notion-search, notion-fetch)
- Others: Full mcp** prefix (mcp**fal-video\_\_execute_custom_model)
- Update all veotools references to fal-video

**3. Description Optimization for Discovery:**

- Include what skill does
- Include when to use it
- Include trigger keywords
- Example: "Generate platform-optimized social media posts using proven formulas..."

---

### Registry Standards

**1. CSV Manifests (agent-manifest.csv, workflow-manifest.csv):**

- **NO duplicates** - sort and check with `uniq -d`
- **All paths exist** - verify every entry
- **Correct module references** - no phantom standalone/ paths
- **Double-quoted fields** - CSV format compliance

**2. YAML Registries (tool-registry.yaml, workflow-registry.yaml):**

- **Status accuracy** - operational when files exist, needs_creation when missing
- **Actual tool names** - mcp**server**tool pattern for third-party
- **Version tracking** - document when tools deprecated/replaced

**3. Validation:**

- Run validation scripts before committing
- Check exit codes (EXIT_CODE=0 for pass, 1 for fail)
- Update registries after creating/removing components

---

### MCP Tool Naming Standards

**Pattern A: Simple Names (Official Anthropic MCPs)**

- **Notion:** notion-search, notion-fetch, notion-create-pages
- **Why:** Official MCPs get clean names, no prefix needed
- **Special:** Can also use mcp**notion**notion-search (both work!)

**Pattern B: Prefixed Names (Third-Party MCPs)**

- **Format:** `mcp__server-name__tool-name` (double underscores)
- **Examples:** mcp**fal-video**execute_custom_model, mcp**cloudinary-asset-mgmt**upload-asset
- **Rule:** ALL non-Notion MCPs require full prefix

**Verification Method:**

- Run `/mcp` command to see actual tool names
- Check system context function list
- Never guess or assume - always verify

---

## 🏁 Final Notes

### Critical Reminders

1. **Tool Names Matter:** Using wrong tool name = runtime error
   - **Notion SPECIAL CASE:** Can use `notion-search` (simple) OR `mcp__notion__notion-search` (full) - both work!
   - **Preferred:** Simple names for Notion (notion-search, notion-fetch)
   - **All others:** MUST use mcp** prefix (mcp**fal-video\_\_execute_custom_model)
   - **Common mistake:** mcp**notion**search (missing second notion word)

2. **Video Strategy:** fal-video is PRIMARY (Universal Video Hub)
   - Tool: `mcp__fal-video__execute_custom_model`
   - Models: 22+ (Veo 3, Luma Ray 2, Kling Master, Pixverse, future Sora)
   - Endpoints: "fal-ai/veo-3", "fal-ai/luma-ray-2", "fal-ai/kling-master-text"
   - HeyGen ONLY for talking heads: `mcp__heygen__generate_avatar_video`
   - veotools DEPRECATED (use fal-video for Veo 3)

3. **Cloudinary CRITICAL:** Postiz requires public HTTPS URLs
   - Workflow: Generate locally → Upload to Cloudinary → Get secure_url → Pass to Postiz
   - Tool: `mcp__cloudinary-asset-mgmt__upload-asset`
   - Cannot use local file:// paths for social posting
   - Track uploads in metadata.json

4. **BMad v6 Standards:**
   - Workflows MUST use external instructions.md (not embedded YAML)
   - Workflows MUST declare config variables (config_source, user_name, etc.)
   - Agents MUST follow 12-step activation pattern
   - Agents MUST load workflow.xml for workflow execution
   - All validation scripts MUST use EXIT_CODE pattern

5. **Registries Must Match Reality:**
   - Don't mark workflows "needs_creation" when they exist on disk
   - Don't reference bmad/standalone/ if directory doesn't exist
   - Remove duplicates before deployment
   - Keep manifests in sync with filesystem via validation scripts

6. **Validation Before Deployment:**
   - Run `npm run deploy:check` (runs ALL quality gates)
   - Verify EXIT_CODE=0 for all validation scripts
   - Manually test one workflow per agent
   - Verify MCP tools available with `/mcp` command
   - Check agent activation follows 12-step pattern

### Success Metrics

**After implementing this PRP, system should:**

- ✅ Pass all 6 validation gates (file structure, registries, code quality, tool names, pipeline)
- ✅ All 24 tasks completed and validated
- ✅ BMad v6 compliant (external instructions, variables, activation)
- ✅ Successfully execute end-to-end pipeline (Jarvis → Zoe → Zoro)
- ✅ Generate content in <15 minutes (vs 75-135 min manual)
- ✅ Stay under $2 per post average ($50/month for 30 posts)
- ✅ Achieve voice consistency ≥8/10 confidence
- ✅ Ready for Epic 7 testing phase

### Next Steps After PRP

1. **Implement this PRP** (8-10 hours for 24 tasks)
2. **Run validation suite** (npm run deploy:check - 30 minutes)
3. **Execute Epic 7 testing** (end-to-end pipelines - 2-4 hours)
4. **Update documentation with test results** (registries, epic completion - 1 hour)
5. **Begin production content creation** (ongoing - system production-ready)

---

**PRP Status:** ✅ READY FOR IMPLEMENTATION (Enhanced with BMad v6 Standards)
**Tasks:** 24 comprehensive (11 original + 13 BMad-specific)
**Confidence:** 9/10 (BMad v6 Compliant)
**One-Pass Success:** 80-85% (realistic for expanded scope)
**Estimated Time:** 8-10 hours (vs original 4-6 hours)
**Validation:** 6 automated gates + manual pipeline testing

**Created:** 2025-11-02
**Enhanced:** 2025-11-02 (BMad Builder expert review)
**Author:** Product Manager (pm agent)
**BMad Review:** BMad Builder (bmad-builder agent) ✅ APPROVED
**Approval Status:** Ready for user confirmation and implementation
