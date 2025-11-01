# Apify Actor Integration - Update Complete

**Date:** November 1, 2025
**Agent:** Jarvis (Content Intelligence) + BMad Builder
**Session:** Strategic system-wide Apify actor verification and integration
**Status:** ✅ COMPLETE

---

## What Was Done

Surgically updated 8 critical files across skills, workflows, and configuration to integrate verified, tested Apify actors from today's research session.

---

## Files Updated (8 Total)

### TIER 1: Core Tool References ✅

**1. `.claude/skills/jarvis/profile-analysis/reference/apify-tools.md`**
- ✅ Replaced ALL outdated actor references
- ✅ Added 6 verified actors with exact parameters
- ✅ Added decision matrix (voice analysis vs bulk analysis)
- ✅ Added LinkedIn support (`datadoping/linkedin-profile-posts-scraper`)
- ✅ Added AI transcript actors (`sian.agency`, `tictechid`)
- ✅ Updated all costs to match tested pricing
- ✅ Added complete flow examples with real test data
- ✅ Referenced source: `verified-apify-actors.md`

**2. `.claude/skills/jarvis/youtube-research/reference/youtube-transcript-tool.md`**
- ✅ Replaced `karamelo/youtube-transcripts` → `dz_omar/youtube-transcript-metadata-extractor`
- ✅ Updated parameter format (`urls` → `youtubeUrl` as array of objects)
- ✅ Updated cost (was $0.01, now FREE with $0.009 platform fee)
- ✅ Updated performance metrics (100% success rate verified)
- ✅ Added comparison table marking old actor as OUTDATED
- ✅ Updated integration examples with correct parameters
- ✅ Referenced real test: Karpathy 3.5hr video

---

### TIER 2: Workflow Instructions ✅

**3. `bmad/agents/content-intelligence/jarvis-sidecar/workflows/learn-voice/instructions.md`**
- ✅ Twitter: Verified `apidojo/twitter-scraper-lite` (existing reference kept)
- ✅ LinkedIn: Updated to `datadoping/linkedin-profile-posts-scraper` ✅ VERIFIED
- ✅ YouTube: Updated to `dz_omar/youtube-transcript-metadata-extractor` ✅ VERIFIED
- ✅ Updated cost estimates (LinkedIn $0.06, YouTube FREE)
- ✅ Updated parameter formats for all actors

**4. `bmad/agents/content-intelligence/jarvis-sidecar/workflows/analyze-profile/instructions.md`**
- ✅ No changes needed (delegates to profile-analysis skill which was updated)

---

### TIER 3: Skill Files ✅

**5. `.claude/skills/jarvis/profile-analysis/SKILL.md`**
- ✅ Updated example to reference `apify/instagram-scraper` (verified)
- ✅ Added note about AI transcript actor for voice learning
- ✅ Added reference to `apify-tools.md` for complete actor list

**6. `.claude/skills/jarvis/youtube-research/SKILL.md`**
- ✅ Updated description to reference `dz_omar/youtube-transcript-metadata-extractor`
- ✅ Updated parameter format in instructions
- ✅ Updated cost (FREE instead of $0.01)
- ✅ Added "Why This Actor?" section with verification date
- ✅ Updated example with real test data (Karpathy video)

---

### TIER 4: Configuration Files ✅

**7. `bmad/agents/content-intelligence/jarvis-sidecar/config.yaml`**
- ✅ Added `youtube-research` to skill_mcp_mapping
- ✅ Updated `profile-analysis` mapping with all 6 verified actors
- ✅ Added platform breakdown (YouTube, Instagram bulk/transcript, TikTok bulk/transcript, LinkedIn)
- ✅ Added costs for each actor
- ✅ Referenced verified actors document

**8. `bmad/agents/content-intelligence/jarvis-sidecar/instructions.md`**
- ✅ Added YouTube actor to Tier 1 - Free section
- ✅ Added LinkedIn, Instagram bulk, TikTok bulk to Tier 2 - Low Cost
- ✅ Created new Tier 3 - Premium AI Transcripts section
- ✅ Added reference to verified actors document
- ✅ Added re-verification reminder (quarterly)

---

## Key Changes Summary

### Actor Replacements:

| Platform | OLD (Untested) | NEW (Verified ✅) | Cost Change |
|----------|----------------|-------------------|-------------|
| YouTube | `karamelo/youtube-transcripts` | `dz_omar/youtube-transcript-metadata-extractor` | $0.01 → FREE |
| Instagram (bulk) | Generic reference | `apify/instagram-scraper` | Confirmed $0.003/post |
| Instagram (transcript) | NOT AVAILABLE | `sian.agency/instagram-ai-transcript-extractor` | NEW: $0.025/reel |
| TikTok (bulk) | Generic reference | `clockworks/tiktok-scraper` | Confirmed $0.01/video |
| TikTok (transcript) | NOT AVAILABLE | `tictechid/anoxvanzi-Transcriber` | NEW: $0.15/video |
| LinkedIn | `dev_fusion` or `apimaestro` | `datadoping/linkedin-profile-posts-scraper` | NEW: $0.001/post |

### New Capabilities Added:

1. **Instagram AI Transcripts** - Can now extract spoken words from Instagram Reels (not just captions)
2. **TikTok AI Transcripts** - Can now extract spoken words from TikTok videos
3. **LinkedIn Support** - Full LinkedIn post scraping including carousel images
4. **YouTube FREE** - YouTube transcripts now completely free (was $0.01)

---

## Integration Points

All verified actors are now referenced in:

1. **Skills** → Load and use correct actors automatically
2. **Workflows** → Execute with verified parameters
3. **Config** → Central registry of available actors
4. **Instructions** → Cost tiers and optimization strategy

---

## Source of Truth

**Master Reference:** `outputs/11-01-2025/apify-research-session/verified-apify-actors.md`

This document contains:
- All 6 verified actors with test results
- Exact input parameters
- Actual costs from testing
- Real-world examples (Karpathy, Sarthak, MrBeast, Satya, Justin)
- Success rates and ratings
- Use cases for each actor

**All references across the system point back to this source document.**

---

## Verification Status

**Test Date:** November 1, 2025
**Platforms Tested:** YouTube, Instagram, TikTok, LinkedIn
**Actors Tested:** 6
**Success Rate:** 100% (all 6 actors worked as expected)
**Total Test Cost:** $0.242

**Next Verification:** February 1, 2026 (quarterly re-verification recommended)

---

## What This Enables

### For /learn-voice Workflow:
- ✅ YouTube transcripts (FREE)
- ✅ LinkedIn posts ($0.06 for 50 posts)
- ✅ Twitter posts (existing capability)
- ✅ Optional: Instagram AI transcripts for short-form voice

### For /analyze-profile Workflow:
- ✅ YouTube content analysis
- ✅ Instagram Reels (captions + optional AI transcripts)
- ✅ TikTok videos (captions + optional AI transcripts)
- ✅ LinkedIn posts + carousel images
- ✅ Twitter posts (existing)

### For /research-topic Workflow:
- ✅ YouTube video content extraction (FREE)
- ✅ Cross-platform competitive intelligence
- ✅ Multi-source content synthesis

---

## Cost Optimization Strategy

**Embedded in all updated files:**

1. **Always prioritize FREE tools:**
   - YouTube transcripts (dz_omar) - $0
   - WebSearch, WebFetch - $0

2. **Use low-cost for bulk:**
   - LinkedIn ($0.001/post)
   - Instagram captions ($0.003/post)
   - TikTok captions ($0.01/video)

3. **Use premium AI transcripts selectively:**
   - Instagram Reels: Only for voice learning high-value content
   - TikTok: Only when caption is minimal and voice needed
   - Always warn user before using

---

## Files NOT Updated (Intentionally)

**Why not updated:**

- `profile-analysis/reference/usage-examples.md` - Examples are conceptual, not actor-specific
- `profile-analysis/reference/cost-examples.md` - Cost formulas still valid
- Other skills (post-writer, video-script-writer, etc.) - Don't directly call Apify
- Workflow YAML files - Reference skills which were updated

**These files inherit the updates through skill references.**

---

## Breaking Changes

### None - Backwards Compatible

All updates are additive or corrective:
- ✅ Old actor names marked OUTDATED (not removed)
- ✅ New actors added alongside
- ✅ Comparison tables show migration path
- ✅ Skills degrade gracefully if old actors still referenced

---

## Testing Checklist

Before using updated system, verify:

- [ ] YouTube transcript extraction works (test with any public video)
- [ ] Instagram bulk scraping works (test with public profile)
- [ ] Instagram AI transcript works (test with public reel)
- [ ] TikTok scraping works (test with @mrbeast or similar)
- [ ] LinkedIn scraping works (test with public profile)
- [ ] Cost logging works (check memories.md updates)
- [ ] All skills reference updated apify-tools.md correctly

---

## Rollback Plan (If Needed)

**If any actor fails:**

1. Check: `outputs/11-01-2025/apify-research-session/verified-apify-actors.md`
2. Verify actor name spelling matches exactly
3. Check Apify MCP connection: `claude mcp list`
4. Try alternative actor from verified list
5. If all fail: Use manual research as fallback

**Old actor references preserved in documentation for emergency fallback.**

---

## Next Actions

1. **Test the updated system:**
   - Run `/jarvis` → `*analyze-profile` with Instagram URL
   - Run `/jarvis` → `*learn-voice` to verify multi-platform scraping

2. **Monitor for issues:**
   - Track any actor failures
   - Log costs to verify pricing matches
   - Update verified-actors.md if discrepancies found

3. **Schedule re-verification:**
   - Set reminder for February 1, 2026
   - Re-test all 6 actors
   - Update if any APIs changed

---

## Impact Summary

**Before Update:**
- ❌ YouTube actor (karamelo) - untested, possibly wrong parameters
- ❌ Instagram - no AI transcript capability
- ❌ TikTok - no AI transcript capability
- ❌ LinkedIn - untested actor reference
- ⚠️ Mixed actor references across files (inconsistent)

**After Update:**
- ✅ YouTube actor (dz_omar) - VERIFIED, FREE, 100% success
- ✅ Instagram - dual option (bulk captions OR AI transcript)
- ✅ TikTok - dual option (bulk captions OR AI transcript)
- ✅ LinkedIn - VERIFIED, cheap ($0.001/post), supports carousels
- ✅ All references consistent across entire system
- ✅ Decision matrices for actor selection
- ✅ Cost tier system embedded

**System Reliability:** Dramatically improved
**Cost Certainty:** All costs tested and verified
**Capability Expansion:** +3 new platforms/features (LinkedIn, Instagram transcripts, TikTok transcripts)

---

**Update completed:** November 1, 2025, 7:10 PM
**Updated by:** BMad Builder (orchestrated by Jarvis)
**Verification source:** `outputs/11-01-2025/apify-research-session/verified-apify-actors.md`
