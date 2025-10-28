# ULTRATHINK Analysis: PRP Critical Revisions Needed

**Analyzed:** PRPs/content-intelligence-agent-workflows.md
**Date:** 2025-10-26
**Status:** Major revisions required before implementation

---

## 🚨 CRITICAL ISSUES IDENTIFIED

### 1. SCOPE & WORKFLOW COUNT (HIGH PRIORITY)

**Issue:** PRP says "5 core workflows" but we now need **7 workflows**

**Current PRP:**

- analyze-profile
- generate-ideas
- write-script (singular)
- competitive-analysis
- research-topic

**Actual Requirements:**

- analyze-profile
- generate-ideas
- **write-posts** (social media posts)
- **write-scripts** (video scripts)
- competitive-analysis
- research-topic
- **learn-voice** (MISSING from PRP entirely!)

**Impact:** Major - learn-voice is critical for voice-adaptive writing

---

### 2. APIFY INTEGRATION NOT PROPERLY DESIGNED (CRITICAL)

**Issue:** PRP treats MCPs as separate tools, doesn't leverage Apify as master gateway

**Current PRP Approach:**

```yaml
mcp_tools_required:
  - linkedin-mcp: [tools...]
  - youtube-mcp-server: [tools...]
  - exa-mcp: [tools...]
```

**Problem:**

- Doesn't show Twitter via Apify
- Doesn't show Instagram via Apify
- Doesn't show TikTok via Apify
- Missing cost-optimization tier system
- No Apify MCP tool syntax (search-actors, call-actor)

**What's Missing:**

**Platform Coverage Gaps:**

- ❌ Twitter profile analysis (via Apify)
- ❌ Instagram profile analysis (via Apify)
- ❌ TikTok profile analysis (via Apify)

**Cost Optimization Missing:**

- No decision tree (Free → Paid)
- No cost estimation steps
- No user approval for paid calls
- No cost logging

**Apify MCP Tool Syntax Missing:**
According to Apify docs, the actual tools are:

- `search-actors` - Find relevant actors
- `fetch-actor-details` - Get actor requirements
- `call-actor` - Execute actor with inputs
- `get-actor-output` - Retrieve results

**We're NOT using** `apify_mcp.twitter_scraper(...)` - that's wrong syntax!

**Correct Approach:**

```xml
<step n="1" goal="Find right actor">
  <action>Call search-actors with query: "twitter profile scraper"</action>
  <action>Review results, select: "xtdata/twitter-x-scraper"</action>
</step>

<step n="2" goal="Get actor details">
  <action>Call fetch-actor-details for "xtdata/twitter-x-scraper"</action>
  <action>Understand required inputs (profile_url, max_tweets, etc.)</action>
</step>

<step n="3" goal="Estimate cost">
  <action>Calculate: 50 tweets × $0.40/1000 = $0.02</action>
  <ask>This will cost ~$0.02 from Apify. Proceed? [yes/no]</ask>
</step>

<step n="4" goal="Execute actor">
  <action>Call call-actor with:
    - actor_id: "xtdata/twitter-x-scraper"
    - inputs: {profile_url: "...", max_tweets: 50}
  </action>
  <action>Receive run_id and dataset_id</action>
</step>

<step n="5" goal="Retrieve results">
  <action>Call get-actor-output with dataset_id</action>
  <action>Parse results (tweets, engagement, profile data)</action>
  <action>Log cost in memories.md</action>
</step>
```

---

### 3. PLATFORM COVERAGE INCOMPLETE (HIGH PRIORITY)

**Issue:** analyze-profile workflow only covers LinkedIn & YouTube

**Current PRP analyze-profile:**

```xml
<check if="platform == 'linkedin'">...</check>
<check if="platform == 'youtube'">...</check>
<check if="platform == 'twitter'">
  <note>Twitter analysis requires custom implementation</note>
</check>
```

**Missing Entirely:**

- ❌ Instagram logic
- ❌ TikTok logic
- ❌ Proper Twitter implementation (via Apify)

**What Should Be There:**

```xml
<check if="platform == 'twitter'">
  <check if="profile is user's own">
    <action>Use twitter-api-client (FREE)</action>
  </check>
  <check if="profile is competitor">
    <action>Use Apify actor: xtdata/twitter-x-scraper</action>
    <action>Estimate cost: ~$0.02 for 50 tweets</action>
    <ask>Proceed with Apify? [yes/no]</ask>
  </check>
</check>

<check if="platform == 'instagram'">
  <action>Use Apify actor: apify/instagram-scraper</action>
  <action>Estimate cost: ~$0.05 for 100 posts</action>
  <ask>Proceed with Apify? [yes/no]</ask>
  <action>Execute and parse results</action>
</check>

<check if="platform == 'tiktok'">
  <action>Use Apify actor: clockworks/tiktok-scraper</action>
  <action>Estimate cost: ~$0.50 per profile</action>
  <ask>Proceed with Apify? [yes/no]</ask>
  <action>Execute and parse results</action>
</check>
```

---

### 4. LEARN-VOICE WORKFLOW COMPLETELY MISSING (CRITICAL)

**Issue:** PRP doesn't include learn-voice workflow specification

**What's Needed:**

**File: `workflows/learn-voice/workflow.yaml`**

```yaml
name: learn-voice
description: 'Analyze user content to build personalized voice profile'
author: 'Jarvis'

# Variables
config_source: '{agent-folder}/config.yaml'
output_folder: '{config_source}:output_folder'
date: system-generated

# MCP Tools Required
mcp_tools_required:
  - apify_mcp: "For fetching user's public posts"

# Custom Modules
custom_modules:
  - twitter_api_client: 'Fetch YOUR Twitter posts (free)'
  - linkedin_api_client: 'Fetch YOUR LinkedIn posts (free)'

# Inputs
inputs:
  - user_twitter_handle: 'Your Twitter @handle (optional)'
  - user_linkedin_profile: 'Your LinkedIn URL (optional)'
  - user_youtube_channel: 'Your YouTube channel (optional)'
  - min_posts_to_analyze: 'default: 20'

# Outputs
outputs:
  - voice_profile: 'Comprehensive writing style analysis'
  - signature_phrases: 'Commonly used expressions'
  - platform_variations: 'How voice changes per platform'

template: false
instructions: '{installed_path}/instructions.md'

# Voice profile saved to memories
default_output_file: '{agent-folder}/memories.md'
```

**File: `workflows/learn-voice/instructions.md`**

```xml
<workflow>
<critical>This workflow analyzes user's content to build authentic voice profile</critical>

<step n="1" goal="Gather user's content">
  <ask>I'll analyze your writing to match your authentic voice.

  Provide your profile URLs:
  - Twitter: @handle or URL
  - LinkedIn: Profile URL
  - YouTube: Channel URL (if you create videos)

  I need at least 20 posts total to build accurate profile.
  </ask>

  <action>Store provided URLs</action>
</step>

<step n="2" goal="Fetch posts cost-efficiently">

  <check if="twitter_handle provided">
    <check if="handle matches user's account">
      <action>Use twitter-api-client to fetch YOUR posts (FREE)</action>
      <action>Fetch last 30 tweets with createTweet history</action>
      <note>Cost: $0 (using your API)</note>
    </check>

    <check if="handle is different account">
      <action>Use Apify: xtdata/twitter-x-scraper</action>
      <action>Estimate: $0.02 for 50 tweets</action>
      <ask>Use Apify to fetch tweets? ~$0.02 [yes/no]</ask>
    </check>
  </check>

  <check if="linkedin_url provided">
    <action>Use linkedin-mcp.get_saved_posts OR fetch_and_save_linkedin_posts</action>
    <action>Fetch last 30 posts</action>
    <note>Cost: RapidAPI charges apply</note>
  </check>

  <check if="youtube_channel provided">
    <action>Use youtube-mcp-server.get_channel_videos(channel_id, 10)</action>
    <action>For videos, use youtube-transcript.get_transcript</action>
    <action>Analyze spoken voice from transcripts</action>
    <note>Cost: FREE</note>
  </check>

  <action>Total posts collected: {{post_count}}</action>

  <check if="post_count < 20">
    <ask>Only collected {{post_count}} posts. Need 20+ for accuracy.
    Options:
    1. Continue anyway (lower confidence)
    2. Provide more profile URLs
    3. Cancel and gather more posts first
    </ask>
  </check>
</step>

<step n="3" goal="Analyze writing patterns">
  <action>Extract vocabulary patterns:
    - Technical term frequency
    - Complexity level (simple/moderate/advanced)
    - Jargon vs accessible language ratio
    - Common word choices
  </action>

  <action>Analyze sentence structure:
    - Average sentence length
    - Short vs long sentence ratio
    - Variation pattern (monotone vs varied)
    - Rhythm (staccato, flowing, mixed)
  </action>

  <action>Identify tone markers:
    - Formal vs casual language
    - Humor presence (jokes, sarcasm, self-deprecation)
    - Enthusiasm markers (exclamation points, caps, energetic words)
    - Personal vs professional voice
  </action>

  <action>Extract signature phrases:
    - Repeated expressions ("here's the thing", "super useful")
    - Transition words ("so", "but", "and")
    - Filler patterns
    - Opening/closing phrases
  </action>

  <action>Analyze emoji usage:
    - Frequency (never/rare/moderate/heavy)
    - Placement (beginning/middle/end)
    - Types (professional/playful/specific meanings)
  </action>

  <action>Identify hook preferences:
    - Question hooks: X%
    - Number hooks: Y%
    - Story hooks: Z%
    - Statement hooks: W%
    - Pattern: Which type user naturally gravitates to
  </action>
</step>

<step n="4" goal="Detect platform variations">
  <action>Compare writing across platforms:</action>

  <action>**Twitter vs LinkedIn:**
    - Formality difference
    - Length difference
    - Tone shift
  </action>

  <action>**Written vs Spoken (if YouTube):**
    - How spoken voice differs from written
    - Conversational markers in videos
    - Teaching mode vs casual mode
  </action>
</step>

<step n="5" goal="Build voice profile">
  <action>Compile comprehensive voice profile:</action>

  <action>**Voice Profile Structure:**

    # Voice Profile: {{user_name}}

    **Analyzed:** {{date}}
    **Sources:** {{twitter_count}} Twitter + {{linkedin_count}} LinkedIn + {{youtube_count}} YouTube
    **Total Posts:** {{total_count}}
    **Confidence:** {{confidence_score}}/10

    ## Writing Characteristics

    **Vocabulary Level:** {{vocab_level}}
    **Sentence Structure:** {{sentence_pattern}}
    **Average Sentence Length:** {{avg_sentence_length}} words
    **Tone:** {{tone_description}}

    ## Signature Elements

    **Common Phrases:**
    {{#signature_phrases}}
    - "{{phrase}}" (used {{frequency}} times)
    {{/signature_phrases}}

    **Transition Words:** {{transition_words}}
    **Opening Style:** {{opening_style}}
    **Closing Style:** {{closing_style}}

    **Hook Preferences:**
    - Question: {{question_pct}}%
    - Number: {{number_pct}}%
    - Story: {{story_pct}}%
    - Statement: {{statement_pct}}%

    **Natural Hook Style:** {{preferred_hook_type}}

    **Emoji Usage:**
    - Frequency: {{emoji_frequency}}
    - Placement: {{emoji_placement}}
    - Types: {{emoji_types}}

    **Humor Style:** {{humor_style}}

    ## Platform Variations

    **Twitter:** {{twitter_voice_notes}}
    **LinkedIn:** {{linkedin_voice_notes}}
    **YouTube:** {{youtube_voice_notes}}

    ## Voice Matching Guidelines

    When writing as {{user_name}}:
    - {{guideline_1}}
    - {{guideline_2}}
    - {{guideline_3}}
    - {{guideline_4}}
    - {{guideline_5}}

    ## Example Transformations

    **Generic AI:**
    "This tool can help you save time by automating workflows."

    **In {{user_name}}'s Voice:**
    "{{user_voice_example}}"

    ---
    *Voice profile will improve as more content is analyzed*
  </action>

  <action>Save voice profile to memories.md under "Voice Profile" section</action>
  <action>Update memories.md: voice_profile_status = "complete"</action>
</step>

<step n="6" goal="Present results">
  <action>**Present to user:**

    ✅ Voice Profile Complete!

    **Analyzed:**
    - {{total_posts}} posts across {{platform_count}} platforms

    **Key Characteristics:**
    - Vocabulary: {{vocab_level}}
    - Tone: {{tone}}
    - Hook Preference: {{hook_type}}
    - Signature Phrase: "{{top_phrase}}"

    **Confidence:** {{confidence}}/10

    📄 Full Profile: Saved to memories.md

    **Next Steps:**
    - Use /write-posts or /write-scripts
    - Content will now match YOUR authentic voice
    - Profile improves as I analyze more of your content
  </action>
</step>

</workflow>
```

**Priority:** Build this workflow FIRST (before write-posts/write-scripts)

---

### 3. COST TRACKING COMPLETELY ABSENT (HIGH PRIORITY)

**Issue:** No cost estimation, no logging, no transparency

**Missing from ALL workflows:**

**Before ANY Apify call:**

```xml
<step n="X" goal="Estimate and approve cost">
  <action>Calculate estimated cost:
    - Actor: {{actor_name}}
    - Units: {{units_to_process}}
    - Rate: ${{cost_per_unit}}
    - Total: ${{estimated_cost}}
  </action>

  <ask>This will cost approximately ${{estimated_cost}} from Apify credits.

  Current month spend: ${{month_total}}
  Budget: $10.00/month

  Proceed? [yes/no/tell me more]
  </ask>

  <check if="user says no">
    <action>Cancel workflow</action>
    <action>Suggest: "Free alternative: {{free_option}}"</action>
  </check>
</step>
```

**After EVERY API call:**

```xml
<action>Log API usage to memories.md:
  - Date: {{date}}
  - Tool: {{tool_name}}
  - Units: {{units_used}}
  - Cost: ${{actual_cost}}
  - Total month: ${{updated_total}}
</action>
```

**Add to EVERY workflow that uses paid APIs**

---

### 4. VOICE-AWARENESS MISSING FROM WRITE WORKFLOWS (CRITICAL)

**Issue:** write-script doesn't check for or use voice profile

**Current write-script (PRP lines ~1100-1200):**

- Loads idea card ✓
- Calls script-generation-mcp ✓
- Formats for platform ✓
- **MISSING:** Load voice profile!
- **MISSING:** Check if voice profile exists!
- **MISSING:** Voice-adapt the output!

**What MUST Be Added:**

**At beginning of write-posts and write-scripts:**

```xml
<step n="0" goal="Load voice profile">
  <action>Check if voice profile exists in memories.md</action>

  <check if="voice profile not found">
    <ask>I haven't learned your writing voice yet!

    Options:
    1. Run /learn-voice first (recommended - 5 min)
    2. Write in generic style for now
    3. I can use patterns from your Idea Card request

    What would you prefer?
    </ask>

    <check if="user selects option 1">
      <action>Pause this workflow</action>
      <action>Run learn-voice workflow</action>
      <action>Resume after voice profile complete</action>
    </check>
  </check>

  <check if="voice profile exists">
    <action>Load voice profile from memories.md</action>
    <action>Extract:
      - Vocabulary level
      - Sentence patterns
      - Signature phrases
      - Hook preferences
      - Emoji usage
      - Platform variations
    </action>
    <action>Store in workflow context for use in all steps</action>
  </check>
</step>
```

**After script-generation-mcp generates base:**

```xml
<step n="X" goal="Voice-adapt generated content">
  <action>Review generated script against voice profile</action>

  <action>Adjust vocabulary:
    - Replace generic terms with user's preferred words
    - Match complexity level
    - Use signature phrases where natural
  </action>

  <action>Adjust sentence structure:
    - Match user's rhythm (short/long/varied)
    - Apply user's transition style
  </action>

  <action>Adjust tone:
    - Apply humor style (if user uses it)
    - Match formality level
    - Inject personality markers
  </action>

  <action>Adjust emoji usage:
    - Match user's frequency
    - Match placement patterns
    - Use types user favors
  </action>

  <action>Result: Script that sounds like {{user_name}} wrote it, not AI</action>
</step>
```

---

### 5. RIGID TEMPLATES VS ADAPTIVE DESIGN (MEDIUM PRIORITY)

**Issue:** PRP has rigid time allocations and structures

**Current PRP (lines 1172-1178):**

```
60s script: 15s per point (4 points max)
90s script: 20s per point (4-5 points)
3min script: 30s per point (5-6 points)
```

**Problem:** Too formulaic! Content should adapt to:

- Topic complexity (some need more setup, less points)
- User's teaching style (some explain fast, some slow)
- Audience level (beginners need more context)
- Evidence density (research-heavy vs opinion-driven)

**Better Approach:**

```xml
<action>Load duration-specific GUIDELINES (not rules):
  - 60s: ~4 main points (adjust if topic needs more/less)
  - 90s: ~4-5 points (flexible based on complexity)
  - 3min: ~5-7 points (adapt to content density)
</action>

<action>Adjust timing based on:
  - Hook complexity (some hooks need 10s to land)
  - Evidence injection (quotes take longer to deliver)
  - User's natural pacing (from voice profile)
  - Content type (tutorial vs opinion)
</action>

<action>Generate script, THEN review pacing</action>
<action>Adjust if feels rushed or dragging</action>
<action>Provide reasoning: "Giving Point 2 extra time because..."</action>
```

---

### 6. TWITTER PLATFORM LOGIC OUTDATED (MEDIUM PRIORITY)

**Issue:** PRP assumes threads are default for Twitter

**Current PRP (lines ~1374+):**

```xml
<check if="target_platform == 'twitter'">
  <action>Transform base_script into Twitter thread format</action>
  ...
</check>
```

**Problem:** We discussed that **long-form posts are winning now**, but the PRP only generates threads!

**Better Approach:**

```xml
<check if="target_platform == 'twitter'">
  <action>Analyze content length and type</action>

  <check if="content length < 2000 chars AND user has Premium">
    <action>Recommend long-form post format</action>
    <ask>Twitter trend: Long-form posts performing better than threads.

    Options:
    1. Single long-form post (~{{char_count}} chars)
    2. Traditional thread ({{tweet_count}} tweets)
    3. Generate both and I'll pick

    What's your preference?
    </ask>
  </check>

  <check if="content length > 2000 OR user prefers thread">
    <action>Generate thread format</action>
  </check>

  <action>Explain reasoning: "Using {{format}} because {{reason}}"</action>
</check>
```

---

### 7. WORKFLOW DEPENDENCY ORDER WRONG (MEDIUM PRIORITY)

**Issue:** Task checklist doesn't reflect dependencies

**Current PRP Task Order (lines ~2220+):**

```
Task 4-7: analyze-profile
Task 8-11: generate-ideas
Task 12-15: write-script
Task 16-19: competitive-analysis
Task 20-23: research-topic
```

**Problem:**

- learn-voice should be built FIRST (write workflows depend on it)
- Simpler workflows should come before complex ones
- competitive-analysis depends on analyze-profile (should come after)

**Correct Dependency Order:**

**Phase 1: Foundation (No Dependencies)**

1. research-topic (simplest - just research)

**Phase 2: Analysis (Uses Phase 1)** 2. analyze-profile (uses research for context)

**Phase 3: Voice Intelligence (Uses Phase 2)** 3. learn-voice (analyzes user's profile via analyze-profile)

**Phase 4: Strategy (Uses Phase 2)** 4. competitive-analysis (runs analyze-profile multiple times) 5. generate-ideas (can use research-topic + analyze-profile outputs)

**Phase 5: Creation (Uses Phase 3)** 6. write-posts (requires voice profile from learn-voice) 7. write-scripts (requires voice profile from learn-voice)

---

### 8. APIFY API CREDENTIALS UNCLEAR (LOW PRIORITY)

**Issue:** PRP doesn't explain how to configure Apify MCP

**Missing:**

```yaml
# How to set up Apify MCP server in Claude Code config

'mcpServers': { 'apify': { 'command': 'npx', 'args': ['-y', '@apify/mcp-server'], 'env': { 'APIFY_API_TOKEN': 'apify_api_...' } } }
```

**Should document:**

- How to install Apify MCP
- How to configure in Claude Code
- How to test connection
- How to troubleshoot

---

### 9. HANDOFF PACKAGE FORMAT NOT VALIDATED (MEDIUM PRIORITY)

**Issue:** JSON structure for Social Posting Agent hasn't been validated

**Current PRP shows:**

```json
{
  "content_type": "{{platform}}_script",
  "ready_for_agent": "social-posting-agent",
  "suggested_command": "/post-{{platform}}",
  ...
}
```

**Problem:** We don't know if Social Posting Agent expects this format!

**Action Needed:**

- Check Social Posting Agent workflows
- See what format they expect for inputs
- Align handoff JSON structure
- Test integration

---

### 10. WORKFLOW VARIABLE SYNTAX CONFUSION (HIGH PRIORITY)

**Issue:** Mixing BMAD variables with Mustache templates

**BMAD workflow.yaml variables:**

```yaml
config_source: '{agent-folder}/config.yaml'
output_folder: '{config_source}:output_folder'
user_name: '{config_source}:user_name'
date: system-generated # Becomes {{date}} in output
```

**Template files use:**

```markdown
# Generated on {{date}}

User: {{user_name}}
Topic: {{topic}}
```

**Workflow instructions.md use:**

```xml
<action>Load config from {agent-folder}/config.yaml</action>
<action>Generate output to {output_folder}/file-{{date}}.md</action>
```

**The PRP mixes these inconsistently!**

**Clarification Needed:**

- `{variable}` = BMAD system variables (resolved at workflow load)
- `{{variable}}` = Workflow runtime variables (resolved during execution)
- `{config_source}:key` = Load from config file

---

### 11. TEMPLATE FILES HAVE WRONG SYNTAX (MEDIUM PRIORITY)

**Issue:** Templates use Mustache `{{#loop}}` syntax

**Example (lines 668-685):**

```markdown
{{#top_posts}}

### {{rank}}. {{title}}

...
{{/top_posts}}
```

**Problem:** BMAD workflow engine doesn't use Mustache! It uses XML variable replacement.

**Correct Approach:**
Templates should be markdown with clear placeholder markers, filled in by workflow during execution, not Mustache loops.

**Or:** Use simple variable replacement:

```markdown
# Top Post 1: {top_post_1_title}

# Top Post 2: {top_post_2_title}
```

**Need to decide:** What template syntax does BMAD actually use?

---

### 12. NO ACTUAL APIFY MCP USAGE EXAMPLES (HIGH PRIORITY)

**Issue:** PRP shows pseudo-code, not real MCP integration

**What PRP Shows:**

```xml
<action>Call linkedin_mcp.fetch_and_save_linkedin_posts(username)</action>
```

**Real MCP syntax (based on how other MCPs work):**

```xml
<action>Invoke MCP tool: linkedin_mcp/fetch_and_save_linkedin_posts
  Parameters:
    - username: {{username}}
  Store result in: {{linkedin_posts_data}}
</action>
```

**For Apify, need:**

```xml
<action>Invoke MCP tool: apify/search-actors
  Parameters:
    - query: "twitter profile scraper"
  Store result in: {{actor_search_results}}
</action>

<action>Select actor from results: "xtdata/twitter-x-scraper"</action>

<action>Invoke MCP tool: apify/call-actor
  Parameters:
    - actor_id: "xtdata/twitter-x-scraper"
    - input:
        profile_url: {{twitter_url}}
        max_tweets: 50
  Store result in: {{run_info}}
</action>

<action>Extract dataset_id from {{run_info}}</action>

<action>Invoke MCP tool: apify/get-actor-output
  Parameters:
    - dataset_id: {{dataset_id}}
  Store result in: {{twitter_data}}
</action>

<action>Parse {{twitter_data}} for tweets, engagement, profile info</action>
```

**PRP needs real MCP invocation patterns, not pseudo-code!**

---

### 13. MISSING WORKFLOW INVOCATION SYNTAX (HIGH PRIORITY)

**Issue:** competitive-analysis invokes analyze-profile multiple times, but syntax not shown

**Current PRP (lines ~1605):**

```xml
<action>For each profile URL in list:</action>
<action>  Invoke analyze-profile workflow internally:</action>
<action>    - Pass: profile_url, platform, window_days=90</action>
```

**Problem:** How do you actually invoke a sub-workflow in BMAD XML?

**Need to research:** Check BMAD workflow.xml for sub-workflow invocation pattern

**Likely syntax:**

```xml
<invoke-workflow path="{agent-folder}/workflows/analyze-profile/workflow.yaml">
  <param name="profile_url" value="{{url}}" />
  <param name="platform" value="{{platform}}" />
  <param name="window_days" value="90" />
</invoke-workflow>
```

**Or simpler:**

```xml
<action>Run workflow: {agent-folder}/workflows/analyze-profile/workflow.yaml
  With inputs: profile_url={{url}}, platform={{platform}}, window_days=90
  Store output: {{profile_analysis_result}}
</action>
```

**PRP must show actual syntax!**

---

### 14. ERROR HANDLING TOO GENERIC (MEDIUM PRIORITY)

**Current PRP:**

```xml
<check if="MCP tool available">
  <action>Call MCP tool</action>
</check>

<check if="MCP tool unavailable">
  <action>Log warning</action>
  <action>Use fallback</action>
</check>
```

**Problem:** How do you CHECK if tool is available? What's the syntax?

**Need:**

```xml
<action>Test MCP tool availability: youtube-mcp-server/get_channel_details</action>

<check if="tool test succeeds">
  <action>Proceed with primary approach</action>
</check>

<check if="tool test fails">
  <action>Log error: "youtube-mcp-server unavailable: {{error_message}}"</action>

  <action>Try fallback: apify/youtube-scraper</action>
  <action>Estimate cost: ${{cost}}</action>
  <ask>Primary tool failed. Use Apify fallback (~${{cost}})? [yes/no]</ask>

  <check if="fallback also fails">
    <action>Present error: "Unable to analyze YouTube channel. Both primary and fallback failed."</action>
    <action>Suggest: "Check MCP server configurations or Apify credits"</action>
    <action>Exit workflow with error</action>
  </check>
</check>
```

---

### 15. AGENT FOLDER NAME INCONSISTENCY (LOW PRIORITY)

**Issue:** PRP says "content-intelligence-sidecar" but we created "jarvis-sidecar"

**Current PRP paths:**

```
bmad/agents/content-intelligence/
└── content-intelligence-sidecar/
```

**Actual structure:**

```
bmad/agents/content-intelligence/
├── jarvis.agent.yaml
└── jarvis-sidecar/
```

**Fix:** Update ALL paths in PRP to use "jarvis-sidecar"

---

### 16. WORKFLOW COUNT IN REQUIREMENTS SECTION (LOW PRIORITY)

**Current (line 56):** "5 Core Workflows"
**Should Be:** "7 Core Workflows"

**Update requirements section to list all 7:**

1. research-topic
2. analyze-profile
3. competitive-analysis
4. generate-ideas
5. learn-voice
6. write-posts
7. write-scripts

---

### 17. INSTALLED_PATH VARIABLE UNDEFINED (MEDIUM PRIORITY)

**Issue:** workflow.yaml uses `{installed_path}` but it's not defined

**Current PRP:**

```yaml
instructions: '{installed_path}/instructions.md'
```

**Problem:** Where is `installed_path` set? In workflow.yaml?

**Check existing workflows for pattern:**

```yaml
installed_path: '{agent-folder}/workflows/analyze-profile'
instructions: '{installed_path}/instructions.md'
```

**Or:**

```yaml
instructions: '{agent-folder}/workflows/analyze-profile/instructions.md'
```

**PRP needs to show complete workflow.yaml with ALL variables defined**

---

### 18. MISSING INTEGRATION TESTING WITH OTHER AGENTS (MEDIUM PRIORITY)

**Issue:** No test for handoff to Social Posting Agent

**Missing Test:**

```bash
# Integration Test: Jarvis → Social Posting Agent

1. Jarvis: /write-posts idea_card_id="1" target_platform="linkedin"
   Output: handoff-package.json

2. Social Posting Agent: Load handoff-package.json
   Execute: /post-linkedin with package data

3. Verify: Post published to LinkedIn successfully
```

**Need:**

- Test handoff format works
- Validate JSON structure
- Ensure no data loss in handoff

---

### 19. ACTUAL WORKFLOW FILE EXAMPLES MISSING (HIGH PRIORITY)

**Issue:** PRP shows workflow structure but not COMPLETE files

**Example:** analyze-profile/workflow.yaml shown but:

- Missing: How variables are resolved
- Missing: How MCP tools are actually called
- Missing: Complete end-to-end example

**Need:** At least ONE complete workflow.yaml + instructions.md + template as REFERENCE

**Suggest:** Build research-topic COMPLETELY in PRP as example, then others follow pattern

---

### 20. PLATFORM SPECS YAML NOT PROVIDED (MEDIUM PRIORITY)

**Issue:** config.yaml references platform specs, but structure not fully defined

**Current (in PRP):**

```yaml
platforms:
  youtube:
    script_lengths: [30, 60, 90, 180, 600]
```

**Missing:**

- Instagram platform specs
- TikTok platform specs
- Complete specs for all platforms
- How these specs are used in workflows

---

## 📊 SUMMARY OF REQUIRED REVISIONS

### CRITICAL (Must Fix)

1. ✅ Add learn-voice workflow (complete specification)
2. ✅ Integrate Apify properly (real tool syntax, all platforms)
3. ✅ Add cost tracking to ALL paid workflows
4. ✅ Add voice-awareness to write-posts and write-scripts
5. ✅ Show real MCP tool invocation syntax (not pseudo-code)
6. ✅ Fix platform coverage (add Instagram, TikTok to analyze-profile)

### HIGH PRIORITY (Should Fix)

7. ✅ Update workflow count (5 → 7)
8. ✅ Fix workflow names (write-script → write-posts + write-scripts)
9. ✅ Update agent name throughout (Jarvis not generic)
10. ✅ Correct task dependency order
11. ✅ Provide complete workflow.yaml examples with all variables

### MEDIUM PRIORITY (Nice to Fix)

12. ✅ Make templates adaptive, not rigid
13. ✅ Add Twitter long-form vs thread logic
14. ✅ Fix folder name inconsistency
15. ✅ Add integration testing with other agents
16. ✅ Define platform specs completely

### LOW PRIORITY (Can Fix Later)

17. Document Apify MCP setup
18. Clarify template syntax (Mustache vs BMAD variables)
19. Add troubleshooting guide

---

## 🎯 RECOMMENDED ACTION

**Option A: Complete Rewrite**

- Create new PRP from scratch with ALL fixes
- Use current PRP as reference but rebuild properly
- Estimated time: 2-3 hours

**Option B: Incremental Fixes**

- Fix critical issues first (1-6)
- Build one complete workflow as reference
- Fill in gaps as we implement

**Option C: Build Workflows Directly**

- Skip PRP updates
- Build workflows using our current knowledge
- Reference PRP for structure ideas only
- Document as we go

---

## 💡 MY RECOMMENDATION

**Option B + Live Implementation:**

1. **Fix Critical Issues in PRP** (30 min)
   - Add learn-voice spec
   - Fix Apify integration
   - Add cost tracking patterns
   - Update platform coverage

2. **Build ONE Complete Reference Workflow** (30 min)
   - Build research-topic completely (simplest)
   - Show exact syntax, tools, variables
   - This becomes the pattern for others

3. **Then Build Others Following Pattern** (2-3 hours)
   - learn-voice (needed for writing)
   - analyze-profile (core functionality)
   - generate-ideas
   - write-posts
   - write-scripts
   - competitive-analysis (orchestrator)

**This gives us:**

- ✅ Corrected PRP as reference
- ✅ One proven complete example
- ✅ Clear pattern to follow
- ✅ Faster implementation

---

_End of ULTRATHINK Analysis_
_20 critical issues identified_
_Recommendation: Fix critical issues, build reference workflow, then proceed_
