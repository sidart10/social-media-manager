# Epic 7: System Maturity & Tool Optimization

**Epic Goal:** Standardize all workflows to external instructions.md format, consolidate documentation into ARCHITECTURE.md, and establish tool evolution process for continuous cost/quality optimization as the agentic ecosystem matures.

## Story 7.1: Workflow Format Standardization

**User Story:**
As a developer maintaining the agent system,
I want all workflows to use consistent format (external instructions.md, standard YAML schema),
so that I can debug, modify, and extend workflows predictably.

**Acceptance Criteria:**

1. **Jarvis workflows:** ✅ Already standardized (7 workflows use external instructions.md with XML workflow engine)
2. **Zoro workflows:** ❌ Need migration (10 workflows use embedded instructions as multi-line strings with JavaScript examples)
   - Migrate to: `bmad/agents/zoro/zoro-sidecar/workflows/{workflow-name}/instructions.md`
   - Extract embedded JavaScript to separate example files
   - Use same XML workflow engine as Jarvis
3. **Zoe workflows:** ⚠️ Partially standardized
   - Image workflows: Use embedded YAML with inline steps (acceptable for simple workflows)
   - Video workflows: Some reference instructions.md that don't exist (need creation)
4. Standard workflow structure enforced:
   ```
   {workflow-name}/
   ├── workflow.yaml          # Metadata, config, skill references
   ├── instructions.md        # Executable workflow steps (XML format)
   └── template.md           # Output template (optional)
   ```
5. All workflows validated against create-workflow template compliance
6. workflow.yaml schema consistent: name, description, instructions path, template path, standalone flag, skills array
7. Migration preserves functionality (before/after testing confirms same behavior)
8. Documentation updated: workflow-creation-guide.md reflects standardized patterns
9. Estimated effort: 2-3 days for 10 Zoro workflows + 4 Zoe video workflows
10. Success criteria: 100% of workflows follow standard format, zero format-related bugs

---

## Story 7.2: Tool Performance Tracking & Optimization

**User Story:**
As a cost-conscious content creator,
I want the system to track tool performance (cost, quality, speed, reliability) and suggest optimizations,
so that I continuously improve cost efficiency as usage patterns emerge.

**Acceptance Criteria:**

1. System maintains tool performance log: `.bmad-core/data/tool-performance.json`
2. **Tracked metrics per tool:**
   - **Apify actors:** Cost per execution, success rate, average runtime, data quality score
   - **Image models:** Cost per image, average quality score (7-pillar), generation time, failure rate
   - **Video models:** Cost per second, generation time, quality assessment, aspect ratio compliance
3. **After each tool usage:**
   - Logs: tool_name, timestamp, cost, duration, quality_score (if applicable), success (true/false), error_message (if failed)
4. **Monthly optimization report:**
   - Identifies: Most expensive tools, lowest quality tools, slowest tools, highest failure rates
   - Suggests: "Switch from Actor A to Actor B (same quality, 40% cheaper)", "nanobanana achieving 8.5/10 quality, consider using more often vs gpt-image-1"
5. **Tool substitution process:**
   - When better tool identified → Update skill tool mapping (e.g., deep-web-research switches from apify/instagram-scraper to better-scraper/instagram)
   - Workflows calling skill unaffected (abstraction layer protects them)
6. Performance data includes comparison baselines:
   - "Current: scraper_one/x-profile-posts-scraper $0.02/100 tweets, 95% success"
   - "Alternative: apidojo/twitter-scraper-lite $0.01/100 tweets, 88% success"
   - Recommendation: "Keep current (reliability > cost savings)"
7. Tool evolution documented in ARCHITECTURE.md with changelog: "Oct 2025: Using Actor X. Dec 2025: Switched to Actor Y (reason)."
8. User can view tool performance dashboard: "Show tool stats" command
9. Estimated effort: 2-3 days to build tracking system + 1 day/month for optimization reviews
10. Success criteria: Cost reduced 15-25% over 3 months through tool optimization while maintaining quality thresholds

---

## Story 7.3: Consolidated Architecture Documentation

**User Story:**
As a developer extending the agent system,
I want a single authoritative ARCHITECTURE.md document,
so that I understand the complete system without hunting through scattered files.

**Acceptance Criteria:**

1. Create `docs/ARCHITECTURE.md` consolidating:
   - Agent roster (Jarvis, Zoe, Zoro) with roles and workflows
   - Workflow inventory (20+ workflows) with purpose, skills invoked, Notion integration
   - Skill inventory (24+ skills) with tools orchestrated, cost/quality profiles
   - Tool hierarchy (MCP servers, Apify actors, API clients) with when to use each
   - Notion integration (Content Tracker schema, status workflow, agent coordination patterns)
   - Postiz integration (scheduling, analytics, platform support)
   - Extensibility guidelines (when to create agent vs workflow vs skill)
2. **Architecture diagrams (Mermaid):**
   - System overview: User → Agents → Workflows → Skills → Tools → Platforms
   - Agent coordination: Jarvis→Zoe→Zoro routing with Notion status
   - Notion status workflow: Idea→Research→Writing→Editing→Posted
   - Example end-to-end pipeline: Research→Write→Image→Publish
3. **Decision trees:**
   - When to create new agent vs add workflow to existing
   - When to create skill vs call MCP directly
   - When to create workflow vs extend existing workflow
4. **Tool selection matrices:**
   - Apify actors by platform (Instagram, Twitter, LinkedIn, YouTube, TikTok)
   - Image models by use case (professional vs social, cost vs quality)
   - Video models by format (talking head, b-roll, cinematic)
5. Deprecates scattered docs: Points to ARCHITECTURE.md as source of truth
6. Linked from README.md as primary onboarding document
7. Maintained via doc-maintenance workflow (auto-updates as system evolves)
8. Estimated effort: 1-2 days to create comprehensive ARCHITECTURE.md
9. Success criteria: New developer can onboard and add agent/workflow/skill in <4 hours using only ARCHITECTURE.md

---

## Story 7.4: Tool Evolution Process & Performance Tracking

**User Story:**
As a cost-conscious content creator,
I want a documented process for evaluating and switching tools (Apify actors, image models, video providers),
so that I continuously optimize cost/quality without breaking workflows or requiring manual research.

**Acceptance Criteria:**

1. Create `.bmad-core/data/tool-registry.yaml` with complete tool inventory and performance tracking:
   ```yaml
   tools:
     apify_actors:
       - name: scraper_one/x-profile-posts-scraper
         purpose: Twitter profile scraping for voice learning and profile analysis
         used_by_skills: [profile-analysis, deep-web-research]
         used_by_workflows: [learn-voice, analyze-profile]
         current_since: 2025-10-31
         cost_per_use: $0.02-0.04
         typical_usage: "100 tweets per execution"
         success_rate: 95%
         quality_score: 8.5/10
         avg_runtime: 30-45 seconds
         alternatives_considered:
           - name: apidojo/twitter-scraper-lite
             cost_per_use: $0.01
             success_rate: 88%
             quality_score: 7.5/10
             decision: "Keep current - reliability more important than 50% cost savings"
         next_review_date: 2025-12-31
         notes: "Proven reliable across 50+ executions, consistent data quality"

     image_models:
       - name: nanobanana (Gemini 2.5 Flash)
         purpose: Social media image generation (YouTube, Instagram)
         used_by_skills: [create-image]
         used_by_workflows: [create-single-image, create-carousel]
         current_since: 2025-10-31
         cost_per_image: $0.039
         success_rate: 98%
         quality_score: 8.5/10 (7-pillar average)
         avg_runtime: 10-15 seconds
         alternatives_considered:
           - name: gpt-image-1 (DALL-E 3)
             cost_per_image: $0.04-0.08
             quality_score: 9.5/10
             decision: "Use both - nanobanana for volume, gpt-image-1 for professional"
         next_review_date: 2025-11-30
         notes: "Monitor new models: Imagen 4, FLUX Kontext Pro, Midjourney API if released"
   ```

2. **Monthly tool review process:**
   - First week of month: Generate performance report from tool-registry.yaml
   - Compare current tools against alternatives
   - Decision criteria:
     - Switch if: (same quality AND 20%+ cost reduction) OR (same cost AND 15%+ quality improvement) OR (current success rate <90%)
     - Keep if: Reliability high (>95%) even if alternatives slightly cheaper
     - Test if: New tool emerges with significantly better specs

3. **Tool migration process when switching:**
   - Step 1: Identify replacement tool (e.g., new Apify actor for Instagram)
   - Step 2: Update skill tool mapping (e.g., profile-analysis skill switches to new actor)
   - Step 3: Test with 5 different workflows using that skill
   - Step 4: Validate 95% success rate maintained
   - Step 5: Deploy if passing, rollback if failing
   - Step 6: Update tool-registry.yaml with change log

4. **Changelog tracking in tool-registry.yaml:**
   ```yaml
   changelog:
     - date: 2025-12-15
       tool: scraper_one/x-profile-posts-scraper
       change: "Switched from apify/twitter-scraper to scraper_one"
       reason: "Original actor deprecated by Apify, scraper_one more reliable (95% vs 78% success)"
       affected_skills: [profile-analysis, deep-web-research]
       affected_workflows: [learn-voice, analyze-profile]
       validation: "Tested with 10 profiles, success rate 95%, quality maintained"
   ```

5. **Performance metrics tracked per tool usage:**
   - Log to: `.bmad-core/data/tool-performance-log.jsonl` (append-only)
   - Each entry: `{timestamp, tool_name, cost, duration_seconds, success, quality_score, error_message}`
   - Monthly aggregation: Calculate avg cost, avg quality, success rate, avg runtime

6. **Automated optimization suggestions:**
   - System analyzes performance log monthly
   - Flags: "nanobanana averaging 8.8/10 quality (target 8.5), consider using more often vs gpt-image-1"
   - Flags: "apify/instagram-scraper failing 15% of time, investigate alternatives"

7. **Tool evolution visible in ARCHITECTURE.md:**
   - Section: "Tool Selection History" with changelog
   - Example: "Oct 2025: Using scraper_one/x-profile-posts-scraper. Dec 2025: Switched to better-twitter-scraper (reason: 40% faster, same quality)."

8. **User-facing tool stats command:**
   - User can ask: "Show me tool performance stats"
   - Displays: Cost breakdown by tool this month, quality scores, success rates, recommendations

9. Estimated effort: 2-3 days to build tracking system + 4 hours/month for optimization reviews
10. Success criteria: Cost reduced 15-25% over 3 months through tool optimization while maintaining quality thresholds (≥8/10 voice, ≥7/10 images)

---

## Story 7.5: Workflow Registry Creation

**User Story:**
As a developer discovering system capabilities,
I want a machine-readable registry of all workflows with metadata and dependencies,
so that I can understand what workflows exist, which skills they trigger, and how they integrate with Notion.

**Acceptance Criteria:**

1. Create `.bmad-core/data/workflow-registry.yaml` with comprehensive workflow inventory:
   ```yaml
   workflows:
     research-topic:
       agent_owner: jarvis
       file_path: bmad/agents/content-intelligence/jarvis-sidecar/workflows/research-topic/
       purpose: "Deep research on any topic with intelligent tool routing based on depth parameter"
       skills_triggered:
         - deep-web-research: "Triggered by step context 'research {topic} with depth={depth}'"
         - research-synthesizer: "Triggered by step context 'synthesize findings into 5 categories'"
         - youtube-research: "Conditionally triggered if focus_areas includes YouTube"
       tools_used: [Exa, WebSearch, Firecrawl, Apify]
       inputs:
         - topic: "Research topic (string, required)"
         - depth: "quick/standard/comprehensive/exhaustive (string, default: standard)"
         - focus_areas: "Optional focus areas (array of strings)"
       outputs:
         - research_brief: "outputs/{date}/{session}/research/{topic-slug}.md"
         - content_angles: "10-12 specific angles embedded in brief"
       notion_updates:
         - status: "Idea→Research"
         - properties: "Adds research brief URL to Notes relation"
       cost_range: "$0 (quick) to $0.50+ (exhaustive)"
       avg_duration: "2-5 minutes"
       success_rate: 98%
       example_use_case: "User wants data-backed research before creating content on trending AI topic"
       dependencies: "Requires Exa MCP configured, Apify optional for exhaustive depth"

     write-post:
       agent_owner: jarvis
       file_path: bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-post/
       purpose: "Generate platform-optimized social media posts with voice matching and quality validation"
       skills_triggered:
         - post-writer: "Triggered by 'generate {platform} post about {topic}'"
         - voice-matcher: "Triggered by 'validate voice consistency against profile'"
         - platform-formatter: "Triggered by 'format for {platform} specifications'"
       tools_used: []  # Pure Claude generation, no external tools
       inputs:
         - topic: "Post topic or idea card reference"
         - platform: "LinkedIn/Twitter/Substack"
         - style: "Optional formula override (PAIPS/Top5/Thread)"
       outputs:
         - post_file: "outputs/{date}/{session}/posts/{platform}-{topic}.md"
         - metadata: "Voice confidence score, word count, platform specs"
       notion_updates:
         - status: "Research→Writing→Editing"
         - properties: "Saves post to Content Text, sets Publish Date estimate"
       cost_range: "$0"
       avg_duration: "1-3 minutes"
       success_rate: 92%
       example_use_case: "User has idea card from generate-ideas, wants LinkedIn post in their voice"
       dependencies: "Requires voice profile in memories.md (run learn-voice first)"
   ```

2. **Registry maintenance:**
   - Updated whenever new workflow created
   - Updated when workflow modified (skills triggered, outputs changed)
   - Versioned in git for history tracking

3. **Registry validation:**
   - All listed workflows must exist (file_path valid)
   - All listed skills must exist in .claude/skills/
   - cost_range and avg_duration match actual usage data from tool-performance-log

4. **Discovery interface:**
   - Developer can query: "What workflows trigger the post-writer skill?"
   - System reads registry: Returns [write-post, write-script (for captions)]
   - Developer can query: "What workflows update Notion status?"
   - System reads registry: Returns workflows with notion_updates defined

5. **Used by ARCHITECTURE.md:**
   - Workflow inventory section auto-generated from registry
   - Ensures documentation stays synchronized with actual workflows

6. **Integration with create-workflow meta-workflow:**
   - When new workflow created, auto-adds entry to registry
   - Prompts for: purpose, skills_triggered, inputs, outputs, notion_updates

7. Estimated effort: 1 day to create registry + populate for existing 20+ workflows
8. Success criteria: 100% of workflows documented in registry, auto-discovery working

---

## Story 7.6: Standardized Output Management System

**User Story:**
As a content creator managing multiple projects,
I want all workflow outputs organized in consistent project-centric folder structure with lifecycle tracking,
so that I can find any artifact (research, drafts, media, published content) quickly and understand project status at a glance.

**Acceptance Criteria:**

1. **Create template structure:** `outputs/templates/project-structure/` ✅ **CREATED**
   ```
   project-structure/
   ├── 00-session/
   │   ├── metadata.json.template
   │   └── session-log.md
   ├── 01-research/                    # Shared research across platforms
   ├── 02-ideas/                       # Shared ideas across platforms
   ├── 03-drafts/                      # Platform-specific text content
   │   ├── linkedin/
   │   ├── twitter/
   │   ├── youtube/
   │   ├── instagram/
   │   ├── tiktok/
   │   ├── substack/
   │   └── facebook/
   ├── 04-media/                       # Platform-agnostic (REUSABLE across platforms)
   │   ├── images/
   │   └── videos/
   ├── 05-published/                   # MERGED final + published (per platform)
   │   ├── linkedin/
   │   ├── twitter/
   │   ├── youtube/
   │   ├── instagram/
   │   ├── tiktok/
   │   ├── substack/
   │   └── facebook/
   └── handoffs/
   ```
   **Total Stages:** 6 (00-session through 05-published), not 7
   **Key Design:** Media in 04 is platform-agnostic (one thumbnail used for LinkedIn AND Twitter), drafts/published are platform-specific

2. **Create metadata schema:** `outputs/templates/metadata-template.json` ✅ **CREATED**
   - Includes: project{}, notion{}, workflow{}, costs{}, duration{}, file_inventory{drafts{platform}, media{images,videos}, published{platform}}, platforms_published{}
   - Platform-specific tracking in file_inventory and platforms_published
   - Validation rules for required fields

3. **Update ALL workflows to use new platform-centric structure:**
   - **Jarvis workflows (5 existing):** research-topic, analyze-profile, competitive-analysis, generate-ideas, learn-voice
     - research-topic saves to: `{project}/01-research/research-brief.md` (shared across platforms)
     - generate-ideas saves to: `{project}/02-ideas/idea-cards.md` (shared across platforms)
   - **Jarvis workflows to create (2):** write-post, write-script
     - write-post saves to: `{project}/03-drafts/{platform}/post-v{n}.md` (platform subfolder, iterations)
     - write-script saves to: `{project}/03-drafts/youtube/script-v{n}.md` (YouTube subfolder)
   - **Zoe workflows (7):** create-single-image, create-carousel, edit-image, create-talking-head, create-scene, etc.
     - Images save to: `{project}/04-media/images/{descriptive-name}.png` (platform-agnostic, reusable)
     - Videos save to: `{project}/04-media/videos/{descriptive-name}.mp4` (platform-agnostic, reusable)
     - Metadata: `04-media/images/metadata.json` tracks which platforms each image used for
     - Naming: `thumbnail-main.png` (used everywhere) vs `thumbnail-youtube.png` (platform-specific variant)
   - **Zoro workflows:** schedule-post (primary), publish-{platform}-now (backup)
     - Published content saves to: `{project}/05-published/{platform}/post.md` (final version)
     - URLs save to: `{project}/05-published/{platform}/url.md` (platform links)
     - Analytics save to: `{project}/05-published/{platform}/analytics-{date}.md` (updated over time)
     - Confirmation saves to: `{project}/05-published/{platform}/publish-confirmation.json` (IDs, timestamps)

4. **Implement project slug generation logic:**
   ```python
   def generate_project_slug(notion_page_title=None, user_prompt=None):
       # Priority: Use Notion page title if available
       if notion_page_title:
           slug = notion_page_title.lower()
       else:
           # Prompt user for project name
           slug = user_prompt.lower()

       # Convert to kebab-case
       slug = slug.replace(" ", "-")
       slug = slug.replace("_", "-")
       # Remove special chars
       slug = re.sub(r'[^a-z0-9-]', '', slug)
       # Remove multiple dashes
       slug = re.sub(r'-+', '-', slug)
       # Truncate to 50 chars
       slug = slug[:50].strip('-')

       # Add date prefix
       date_prefix = datetime.now().strftime('%Y-%m-%d')
       return f"{date_prefix}-{slug}"
   ```

5. **Auto-folder creation in workflows:**
   - Check if `outputs/projects/{project-slug}/` exists
   - If not: Copy entire structure from `outputs/templates/project-structure/`
   - Creates all 6 lifecycle stages (00-05) with platform subfolders automatically
   - Initializes metadata.json from template with platform-specific tracking

6. **Platform-agnostic media philosophy (04-media/):**
   - **CRITICAL:** Media is REUSABLE across platforms—one thumbnail can serve LinkedIn AND Twitter
   - **Naming convention:** Descriptive not platform-specific
     - ✅ `thumbnail-main.png` (used for LinkedIn, Twitter, Facebook)
     - ✅ `thumbnail-youtube.png` (YouTube-specific CTR variant if needed)
     - ✅ `short-vertical.mp4` (used for YouTube Shorts, Instagram Reels, TikTok)
     - ❌ `thumbnail-linkedin.png` (implies can't reuse elsewhere)
   - **Metadata tracking:** `04-media/images/metadata.json` tracks `used_in_platforms: ["linkedin", "twitter"]` for each image
   - **Example:** Single research project → Generate one main thumbnail in 04-media/images/ → Reference from 05-published/linkedin/, 05-published/twitter/, 05-published/facebook/

7. **Metadata updates throughout workflow:**
   - Step 1: Workflow starts → Update metadata.json: workflow_name added to workflows_executed[]
   - Step 3: Skill triggered → Update metadata.json: skill_name added to skills_triggered[]
   - Step 5: File saved to platform folder → Update metadata.json: file path added to file_inventory.drafts.{platform}[] or file_inventory.published.{platform}[]
   - Step 5: Media saved → Update metadata.json: file path added to file_inventory.media.images[] or media.videos[], track platforms it will be used for
   - Step 6: Cost incurred → Update metadata.json: costs{research/content/image/video} incremented
   - Final: Workflow ends → Update metadata.json: duration calculated

8. **Session log tracking with platform context:**
   - Append to `00-session/session-log.md` at each major step:
     ```markdown
     ## Session: 2025-11-05 - Multi-Platform AI Agents Post

     **14:15:00** - Jarvis: Started research-topic workflow (depth=comprehensive)
     **14:18:23** - Jarvis: Saved research-brief.md to 01-research/ (cost: $0.15, 12 sources)
     **14:19:45** - Jarvis: Started write-post workflow (platforms: LinkedIn, Twitter)
     **14:21:30** - Jarvis: Triggered post-writer skill (LinkedIn PAIPS formula, voice: 8.5/10)
     **14:22:15** - Jarvis: Saved post-v1.md to 03-drafts/linkedin/ (287 words)
     **14:23:00** - Jarvis: Adapted for Twitter (thread format, 7 tweets)
     **14:23:45** - Jarvis: Saved thread-v1.md to 03-drafts/twitter/
     **14:24:15** - Handoff: Jarvis → Zoe (create thumbnail for both platforms)
     **14:24:30** - Zoe: Started create-single-image (design=professional, reusable)
     **14:25:20** - Zoe: Saved thumbnail-main.png to 04-media/images/ (quality: 9.2/10, cost: $0.08)
     **14:25:35** - Zoe: Metadata updated (will be used for: linkedin, twitter)
     **14:26:00** - Handoff: Zoe → Zoro (schedule to both platforms)
     **14:27:15** - Zoro: Copied post.md + thumbnail-main.png to 05-published/linkedin/
     **14:27:30** - Zoro: Copied thread.md + thumbnail-main.png reference to 05-published/twitter/
     **14:28:00** - Zoro: Scheduled via Postiz: LinkedIn 2025-11-06 09:00, Twitter 2025-11-06 14:00
     **14:28:30** - Updated Notion: Status=Posted, Channels=[LinkedIn & X]
     **14:28:45** - Session complete. Total cost: $0.23, Total time: 14 minutes, Platforms: 2
     ```

8. **Bidirectional Notion linking:**
   - Local metadata.json includes: `"notion_page_url": "https://notion.so/..."`
   - Notion page includes property: `local_files_path` = "outputs/projects/2025-11-05-linkedin-post-ai-agents"
   - Enables: Click Notion link → opens local folder, Read metadata.json → get Notion page URL

9. **Archive strategy:**
   - Projects >90 days old moved to: `outputs/archive/YYYY-MM/`
   - Organized by month for manageable archival
   - Metadata.json includes `archived: true` flag

10. **Migration of existing outputs/{date}/ folders:**
    - Optional: Can migrate existing 10-28 through 11-05 folders
    - Or: Leave as legacy, new projects use new structure (recommended for MVP)
    - Future: Write migration script if needed

11. **Multi-platform publishing workflow:**
    - **Scenario:** Single research → LinkedIn post + Twitter thread + YouTube Short
    - **Process:**
      1. Jarvis research-topic → Saves to 01-research/research-brief.md
      2. Jarvis write-post (LinkedIn) → Saves to 03-drafts/linkedin/post-v1.md
      3. Jarvis write-post (Twitter) → Saves to 03-drafts/twitter/thread-v1.md
      4. Jarvis write-script (YouTube Short) → Saves to 03-drafts/youtube/short-script.md
      5. Zoe create-single-image → Saves to 04-media/images/thumbnail-main.png (REUSABLE!)
      6. Zoe create-scene (Short) → Saves to 04-media/videos/short-vertical.mp4 (REUSABLE!)
      7. Zoro schedule-post (all 3 platforms):
         - Copies post.md + references thumbnail-main.png → 05-published/linkedin/
         - Copies thread.md + references thumbnail-main.png → 05-published/twitter/
         - Copies short-script.md + references short-vertical.mp4 → 05-published/youtube/
         - Saves url.md to each platform folder after Postiz publishes
    - **Result:** ONE research, ONE thumbnail, ONE video → THREE platform publications efficiently organized

12. **Validation rules:**
    - Project slug must match: `^[a-z0-9-]{1,50}$` (lowercase, hyphens only, max 50 chars)
    - All 6 lifecycle stage folders present (00-session through 05-published) even if empty
    - All 7 platform subfolders present in 03-drafts/ and 05-published/ (linkedin, twitter, youtube, instagram, tiktok, substack, facebook)
    - metadata.json validates against schema with platform-specific file_inventory
    - All file names lowercase kebab-case with descriptive (not platform-specific) media names

13. Estimated effort: 2-3 days to create template + update all workflows + test multi-platform scenarios
14. Success criteria: 100% of new projects use standardized structure, zero orphaned files, all Notion pages linked to local folders, media reuse works across platforms (verified by metadata.json tracking)

---
