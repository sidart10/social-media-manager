# ULTRATHINK: Workflow ↔ Skills Integration Audit

**Date:** 2025-10-27
**Purpose:** Verify workflows properly reference Skills

---

## 🔍 WHAT I'M CHECKING

**For each workflow:**

1. Does it mention the Skills by name?
2. Are natural language instructions clear enough for Claude to invoke Skills?
3. Is there proper cohesion between orchestration (workflow) and execution (Skills)?

---

## Workflow 1: research-topic

**Location:** `jarvis-sidecar/workflows/research-topic/instructions.md`

**Current Instructions:**

```xml
<step n="2" goal="Conduct comprehensive research">
  <action>Research {topic} using all available sources based on focus areas and depth.</action>

  <check if="'trends' in focus_areas">
    <action>Get trending topics, hashtags, current facts, and recent news about {topic}. Use Brave Search and Perplexity AI to extract comprehensive trend data with full parameter support.</action>
    <!-- Claude invokes social-media-research Skill automatically -->
  </check>

  <check if="'examples' in focus_areas">
    <action>Find YouTube videos about {topic} and extract how they explain it, structure patterns, quotes with timestamps, and teaching approaches. Analyze up to {max_youtube_videos} videos.</action>
    <!-- Claude invokes youtube-research Skill automatically -->
  </check>

  <check if="depth == 'comprehensive'">
    <action>Conduct deep web research for comprehensive insights, data points, expert quotes, case studies, and company intelligence. Use AI-powered deep researcher for thorough analysis.</action>
    <!-- Claude invokes deep-web-research Skill automatically -->
  </check>
</step>
```

**Analysis:**

- ✅ Has natural language that SHOULD trigger Skills
- ✅ Has comments indicating which Skill should invoke
- ⚠️ BUT: Instructions are generic ("Research {topic}") - might not trigger Skills

**Issue:** The instructions say "Get trending topics" but don't explicitly mention:

- social-media-mcp tool names
- Specific MCP actions
- Skill names

**Question:** Will Claude connect "Get trending topics" → social-media-research Skill?

**Answer:** MAYBE - depends on Skill description matching

---

## Workflow 2: analyze-profile

**Current Instructions:**

```xml
<step n="2" goal="Fetch content using cost-optimized approach">
  <action>Set max_posts based on {analysis_depth}...</action>

  <check if="platform == 'instagram'">
    <action>Display: "Instagram analysis requires Apify..."</action>
    <action>Tool: apify_mcp/search-actors</action>
    <action>Query: "instagram profile scraper"</action>
    ...
  </check>
</step>
```

**Analysis:**

- ❌ Has EXPLICIT MCP calls (Tool: apify_mcp/search-actors)
- ❌ Does NOT rely on Skills
- ❌ Hardcoded MCP invocation

**Issue:** This workflow does NOT use profile-analysis Skill! It calls apify directly!

**This is the OLD workflow pattern** (before Skills)

---

## 🚨 CRITICAL FINDING

**research-topic workflow:**

- Uses natural language (might trigger Skills)
- Has comments about Skills
- But: Generic instructions may not match Skill descriptions

**analyze-profile workflow:**

- Still has explicit MCP calls
- Does NOT use Skills at all
- Needs to be updated!

---

## ✅ HOW THEY SHOULD WORK

### research-topic (Needs Minor Adjustment)

**Current:**

```xml
<action>Get trending topics, hashtags, current facts, and recent news about {topic}.</action>
```

**Better (More Explicit Skill Trigger):**

```xml
<action>Research {topic} for social media - get trending topics, hashtags, facts, and news using Brave Search and Perplexity AI.</action>
```

**Why better:**

- Mentions "social media" (matches Skill description)
- Mentions "Brave Search and Perplexity" (matches what Skill does)
- More likely to trigger social-media-research Skill

---

### analyze-profile (Needs Complete Rewrite)

**Current (WRONG - explicit MCP calls):**

```xml
<check if="platform == 'instagram'">
  <action>Tool: apify_mcp/search-actors</action>
  <action>Query: "instagram profile scraper"</action>
  <action>Tool: apify_mcp/call-actor</action>
  ...
</check>
```

**Should Be (Skills-based):**

```xml
<step n="2" goal="Analyze profile">
  <action>Analyze the {platform} profile at {profile_url} using Apify scrapers. Detect platform, select appropriate actor, calculate cost, get user approval, scrape posts, analyze patterns, and create summary.</action>
  <!-- Claude invokes profile-analysis Skill automatically -->
</step>
```

**Why:**

- Natural language instruction
- Mentions "Apify scrapers" (matches Skill description)
- Mentions key actions (matches what Skill does)
- Lets Skill handle all MCP logic

---

## 📋 REQUIRED FIXES

### Fix 1: Update research-topic Workflow (5 min)

**Make instructions more Skill-friendly:**

- Add explicit trigger keywords from Skill descriptions
- More specific about what tools to use
- Clear enough for Claude to match to Skills

### Fix 2: Rewrite analyze-profile Workflow (15 min)

**Remove explicit MCP calls, add natural language:**

- Current: 490 lines of MCP logic
- Should be: ~100 lines of orchestration
- Let profile-analysis Skill handle MCP details

### Fix 3: Check Other Workflows (10 min)

- generate-ideas
- competitive-analysis
- learn-voice

**Ensure they use natural language that triggers Skills**

---

## 🎯 RECOMMENDATION

**Before testing, fix the workflows to properly invoke Skills:**

1. **research-topic:** Enhance trigger language (5 min)
2. **analyze-profile:** Complete rewrite to Skills-based (15 min)
3. **Other workflows:** Quick review (10 min)

**Total:** 30 min to ensure workflow ↔ Skills cohesion

**THEN test** - otherwise workflows will call MCPs directly (bypassing Skills and their comprehensive reference docs)!

---

**Want me to fix the workflows now to properly trigger Skills?** (30 min)

This ensures the 2000+ lines of Skill reference docs we just created actually get used!
