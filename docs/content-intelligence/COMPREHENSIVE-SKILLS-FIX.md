# ULTRATHINK: Comprehensive Skills Quality Audit & Fixes

**Date:** 2025-10-27
**Status:** Critical Issues Found & Fixed

---

## 🔍 WHAT I DISCOVERED

### Problem 1: Apify MCP Not Configured ✅ FIXED

**Issue:** Apify was referenced in Jarvis config but not actually added to Claude Code
**Impact:** profile-analysis Skill couldn't work (no Instagram/TikTok/Twitter scraping)
**Fix:** Added Apify MCP with Bearer token authentication
**Status:** ✓ Connected

```
apify: https://mcp.apify.com/?tools=actors,docs,apify/instagram-scraper,clockworks/tiktok-scraper,apidojo/twitter-scraper-lite (HTTP) - ✓ Connected
```

---

### Problem 2: Skills Written as Documentation, Not Instructions ⏳ FIXING

**Issue:** Skills formatted like API reference docs with code blocks, tables, formatted sections
**Impact:** Claude can't parse formatted blocks as executable instructions
**Error:** "use_mcp_tool is not defined" when trying to invoke MCPs

**Example of BAD format (current):**

````markdown
### Step 1: Call research_topic

**Tool:** social-media-mcp/research_topic

**Parameters:**

```javascript
{
  topic: "{user's topic}",
  includeHashtags: true
}
```
````

**Apify MCP Flow:**

```
Tool: apify/search-actors
Query: "{platform} profile scraper"
```

````

**Why this fails:**
- Formatted code blocks confuse Claude
- Looks like documentation to read, not instructions to execute
- "Tool:" and "Parameters:" are descriptive, not imperative

---

## ✅ CORRECT SKILL FORMAT

**Based on Anthropic template + best practices:**

```yaml
---
name: skill-name
description: What it does and when to use it. Specific trigger keywords.
---

# Skill Name

## Instructions

Direct, imperative instructions in natural language:

1. When user asks about {trigger}, use the {mcp-name} {tool-name} tool with parameter1, parameter2, parameter3.

2. Take the results and organize them by category.

3. Present findings clearly with source URLs and confidence scores.

## Example

Input: user asks "X"
Output: {what you return}

## Error Handling

If tool fails: do this
If no results: do that
````

**Key principles:**

- ✅ Natural language, imperative voice
- ✅ Direct instructions ("Use the tool", "Organize", "Present")
- ✅ No code blocks in instructions (only in examples)
- ✅ No tables in instructions (only in examples/reference)
- ✅ Simple, scannable format

---

## 📋 SKILLS THAT NEED FIXING

All 8 Skills have documentation format issues. Priority order:

### CRITICAL (Need MCPs - Fix First):

1. **social-media-research** ⏸️ Partially fixed
   - Removed formatted blocks from Step 1
   - Still has markdown templates in Step 2
   - NEED: Simplify entire instruction section

2. **profile-analysis** ❌ Not fixed
   - Has tables, code blocks, formatted sections throughout
   - NEED: Complete rewrite to natural language

3. **youtube-research** ⏸️ Partially fixed
   - Better than others but still has some formatting
   - NEED: Minor cleanup

4. **deep-web-research** ❌ Not fixed
   - Similar issues to profile-analysis
   - NEED: Simplify

### MEDIUM (Processing Skills):

5. **research-synthesizer** ❌ Not fixed
6. **voice-matcher** ❌ Not fixed
7. **platform-formatter** ❌ Not fixed
8. **evidence-tracker** ❌ Not fixed

---

## 🔧 FIXING STRATEGY

### Quick Fix (30-45 min) - **RECOMMENDED**

**Simplify just the 4 MCP-using Skills:**

- social-media-research
- profile-analysis
- youtube-research
- deep-web-research

**New format:**

```markdown
## Instructions

1. Use {mcp-name} {tool-name} tool with parameters x, y, z

2. Organize results into categories

3. Present clearly with sources

4. If tool fails, log error and use fallback
```

**Result:** MCPs work, Skills invoke correctly

---

### Complete Fix (2-3 hours)

**Rewrite all 8 Skills properly:**

- Natural language throughout
- No formatted blocks in instructions
- Examples separate from instructions
- Reference sections at end

**Result:** Production-quality Skills

---

## 🚀 IMMEDIATE ACTION PLAN

**I'll fix the 4 critical Skills NOW (30 min):**

1. ✅ Apify MCP configured (just did)
2. ⏳ Simplify social-media-research
3. ⏳ Simplify profile-analysis
4. ⏳ Simplify youtube-research
5. ⏳ Simplify deep-web-research

**Then restart + test**

**After that works, we can refine the processing Skills (research-synthesizer, etc.)**

---

**Should I execute the Quick Fix now?** (30-45 min to fix all 4 MCP Skills)
