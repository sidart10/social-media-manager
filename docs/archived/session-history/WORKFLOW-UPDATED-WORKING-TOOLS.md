# research-topic Workflow - Updated for Working Tools Only

**Date:** 2025-10-27
**Changes:** Removed broken research_topic, using only working MCPs

---

## What Changed

**Removed:**
- ❌ social-media-mcp/research_topic (broken - parameter bug)

**Now Uses:**
- ✅ social-media-mcp/get_trending_topics (works!)
- ✅ exa/deep_researcher_start (works!)
- ✅ exa/web_search_exa (works!)
- ✅ youtube-transcript/get_transcript (works if video has captions)

---

## Updated Flow

**Step 1:** Initialize
**Step 2:** Get trending topics (social-media-mcp/get_trending_topics)
**Step 3:** Deep web research (exa)
**Step 4:** YouTube examples (if user provides URLs)
**Step 5:** Synthesize into 5 categories
**Step 6:** Generate 10-12 content angles
**Step 7:** Save research brief using template
**Step 8:** Present results

**All using WORKING tools!**

---

## Template

**Uses:** `research-brief.md` template
**Fills:** All variables with actual research data
**Output:** Consistent, structured research brief

---

**Ready to test with working tools!**

Restart Claude Code and test `/jarvis:jarvis1 → research-topic` 🚀
