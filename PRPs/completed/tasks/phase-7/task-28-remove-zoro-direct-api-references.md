<!-- Powered by BMAD™ Core -->

# Task 28: Remove ALL Direct API References from Zoro

**Phase:** 7 (Jarvis Critical Fixes - Extended to Zoro)
**Priority:** 🚨 CRITICAL
**Estimated Time:** 15-20 minutes
**Dependencies:** None
**Status:** ⬜ URGENT FIX NEEDED

---

## 🎯 Objective

Remove ALL references to Twitter MCP, LinkedIn MCP, YouTube MCP from Zoro configuration. Enforce POSTIZ-ONLY policy with NO exceptions.

---

## 📋 Context

**User's Clear Directive:**

> "NO mention of Twitter MCP, LinkedIn MCP, YouTube MCP. ONLY Postiz for publishing/scheduling."

**What Zoro Currently Says:**

- ❌ "BACKUP Publishing: Direct API workflows" (instructions.md line 15)
- ❌ "Twitter Premium API" (instructions.md line 17)
- ❌ "LinkedIn API" (instructions.md line 18)
- ❌ "YouTube Data API" (instructions.md line 19)
- ❌ "except YouTube (which uses youtube-uploader-mcp)" (zoro.md line 62)
- ❌ "Direct APIs (BACKUP)" (instructions.md line 71)

**Why This Causes Problems:**

- Zoro offers Twitter MCP as "Option A" to user
- Confuses user about what tool to use
- Violates Postiz-only policy
- Creates decision paralysis ("which should I use?")

---

## ✅ FIX #1: Update zoro.md (1 change)

**File:** `bmad/agents/zoro/zoro.md`

**Line 62 - Remove YouTube Exception:**

```xml
# ❌ WRONG (current):
- CRITICAL: Postiz is PRIMARY for all platforms except YouTube (which uses youtube-uploader-mcp)

# ✅ CORRECT (fixed):
- CRITICAL: Postiz ONLY for ALL platforms (Twitter, LinkedIn, Instagram, Facebook, TikTok, YouTube). NO direct APIs. NO exceptions.
```

---

## ✅ FIX #2: Update instructions.md (Remove BACKUP section)

**File:** `bmad/agents/zoro/zoro-sidecar/instructions.md`

**Lines 4, 10-22: REMOVE Backup Publishing Section:**

```markdown
# ❌ REMOVE THIS ENTIRE SECTION:

**PRIMARY Publishing:**

- Use schedule-post workflow for all multi-platform scheduling
- Cloudinary upload for public URLs
- Postiz integration for unified queue

**BACKUP Publishing:**

- Direct API workflows for immediate urgent posting
- Twitter Premium API (25k chars, 1500/month limit)
- LinkedIn API (3k chars, 150/day limit)
- YouTube Data API (6 uploads/day)

# ✅ REPLACE WITH:

**Publishing Policy (ABSOLUTE):**

- ONLY Postiz for ALL platforms (Twitter, LinkedIn, Instagram, Facebook, TikTok, YouTube)
- ONE workflow: schedule-post (handles everything)
- NO direct APIs (Twitter MCP, LinkedIn MCP, YouTube MCP)
- NO exceptions (even for urgent/breaking content)
- Postiz supports immediate posting (type: "now") AND scheduling (type: "schedule")
```

**Lines 51-65: REMOVE Rate Limits Section:**

```markdown
# ❌ REMOVE (mentions Twitter/LinkedIn/YouTube APIs):

## Rate Limits (CRITICAL)

**Twitter Premium:**

- Monthly: 1500 posts
  ...

# ✅ REPLACE WITH:

## Postiz Platform Limits

**Check Postiz Dashboard:**

- Visit: https://app.postiz.com/settings
- View: Connected accounts and posting quotas
- Each platform has own limits enforced by platform (not Postiz)
```

**Lines 68-72: REMOVE Workflow Priority:**

```markdown
# ❌ REMOVE:

## Workflow Priority

1. **schedule-post** (PRIMARY) - Use for all non-urgent posts
2. Direct APIs (BACKUP) - Use only for breaking news/urgent content

# ✅ REPLACE WITH:

## Publishing Workflow

**ONLY ONE WORKFLOW:** schedule-post

**Use for:**

- Scheduled posts (future dates)
- Immediate posts (type: "now")
- Single platform or multi-platform
- Text-only or with media (images/videos)
- All content types (tweets, threads, LinkedIn posts, YouTube videos)

**NO backup workflows. NO direct APIs. Postiz handles everything.**
```

---

## ✅ FIX #3: Add Postiz Immediate Posting Clarification

**Add to instructions.md after line 50:**

````markdown
## Postiz Posting Options

**Immediate Posting (Not Just Scheduling!):**

Postiz supports TWO posting types:

1. **type: "schedule"** - Future date/time
2. **type: "now"** - Posts immediately (no delay!)

**For urgent/breaking content:**

- Use schedule-post workflow
- Select type: "now"
- Postiz posts within seconds
- NO need for separate "immediate" workflows

**Example:**

```json
{
  "type": "now",  ← Posts immediately!
  "date": current_timestamp_utc
}
```
````

This eliminates any need for direct APIs!

````

---

## 🧪 Validation

### Test 1: No Direct API References

```bash
# Should return NOTHING:
grep -r "twitter.*API\|linkedin.*API\|youtube.*API\|mcp__mcp_twitter\|backup.*publish\|direct.*API" bmad/agents/zoro/

# Status: After fix should be EMPTY
````

### Test 2: Postiz-Only Policy Clear

```bash
# Should find ONLY Postiz references:
grep -r "Postiz\|postiz" bmad/agents/zoro/zoro.md bmad/agents/zoro/zoro-sidecar/instructions.md | wc -l

# Should be 10+
```

### Test 3: No "Backup" or "Except" Language

```bash
# Should return NOTHING:
grep -i "backup\|except\|alternative\|fallback" bmad/agents/zoro/zoro.md bmad/agents/zoro/zoro-sidecar/instructions.md

# Status: After fix should be EMPTY
```

---

## ✅ Success Criteria

- [x] NO mention of "Twitter MCP" anywhere in Zoro files
- [x] NO mention of "LinkedIn MCP" anywhere in Zoro files
- [x] NO mention of "YouTube MCP" or "youtube-uploader-mcp" anywhere
- [x] NO "BACKUP Publishing" section
- [x] NO "Direct API" references
- [x] NO "except YouTube" exceptions
- [x] ONLY "Postiz" for all publishing
- [x] Clarifies Postiz supports immediate posting (type: "now")
- [x] ONE workflow policy crystal clear

---

## 📝 Expected Behavior After Fix

**When User Asks to Publish:**

Zoro will ONLY say:

- ✅ "Use schedule-post workflow via Postiz"
- ✅ "Post immediately (type: now) or schedule for later"
- ✅ "Platforms: Twitter, LinkedIn, YouTube, Instagram, etc. via Postiz"

Zoro will NEVER say:

- ❌ "Option A: Post via Twitter MCP"
- ❌ "Use Twitter API for threads"
- ❌ "Direct posting for breaking news"
- ❌ "YouTube requires youtube-uploader-mcp"

**Zero Ambiguity. Zero Options. Postiz ONLY.**

---

## 🔗 Related

**Blocks:** Zoro production use
**Enables:** Clear publishing workflow
**Impact:** HIGH - User confusion eliminated

---

**Priority:** 🚨 CRITICAL
**Time:** 15-20 minutes
**Confidence:** 10/10 (simple removal of backup references)
