# Epic 6: End-to-End Pipeline Validation & Cost Benchmarking

**Epic Goal:** Validate 3 routing paths work reliably with real content, establish cost/quality/time benchmarks, and achieve 95% success rate target for production readiness.

## Story 6.1: Text-Only Pipeline (Jarvis → Zoro)

**User Story:**
As a content creator,
I want to go from topic to published LinkedIn/Twitter post without visuals,
so that I optimize for speed when images aren't needed.

**Acceptance Criteria:**

1. **Complete Pipeline Test:**
   - User: Provides topic "How MCP servers work"
   - Jarvis: `/jarvis` → `*research-topic` (depth=standard, $0.05, 2-3 min) → Research brief created
   - Jarvis: `*write-post` (platform=LinkedIn, style=PAIPS, $0, 1-2 min) → Post drafted, voice validated 8.5/10
   - Notion: Status updated Idea→Research→Writing→Editing, Content Text populated
   - Zoro: `/zoro` → `*linkedin-post-text` ($0, 20s) → Post published, Status→Posted
   - **Total Time:** 4-6 minutes | **Total Cost:** $0.05 | **Success:** Posted content live on LinkedIn
2. Handoff between Jarvis→Zoro uses Notion as coordination (no manual JSON copy-paste)
3. Pipeline succeeds without errors, manual intervention, or rework
4. Content quality validated: Voice 8+/10, research backed, platform compliant
5. Test with 5 different topics, achieve 95% success rate (1 failure allowed in 20 attempts across all pipelines)

---

## Story 6.2: Full Visual Pipeline (Jarvis → Zoe → Zoro)

**User Story:**
As a content creator,
I want to go from topic to published post with professional thumbnail,
so that I create complete visual content optimized for engagement.

**Acceptance Criteria:**

1. **Complete Pipeline Test:**
   - User: Provides topic "5 AI tools for productivity"
   - Jarvis: `/jarvis` → `*research-topic` (depth=comprehensive, $0.15, 3-5 min) → Research brief
   - Jarvis: `*write-post` (platform=LinkedIn, $0, 2 min) → Post drafted
   - Notion: Status→Editing, Content Text saved
   - Zoe: `/zoe` → `*create-single-image` (design=LinkedIn dark tech, $0.05, 45s) → Image generated, 7-pillar score 8.7/10
   - Notion: Image URL added to properties
   - Zoro: `/zoro` → `*linkedin-post-image` (post + image, $0, 25s) → Published
   - Notion: Status→Posted, Publish Date set
   - **Total Time:** 7-10 minutes | **Total Cost:** $0.20 | **Success:** LinkedIn post with professional image live
2. Handoffs: Jarvis suggests Zoe after writing, Zoe suggests Zoro after image generation
3. All Notion updates successful (status, content text, image URL, publish date)
4. Image meets quality threshold (≥7/10 on 7-pillar framework)
5. Test with 5 different topics across platforms (LinkedIn, Twitter, YouTube), achieve 95% success

---

## Story 6.3: Video Production Pipeline (Jarvis → Zoe → Zoro)

**User Story:**
As a YouTube creator,
I want to go from topic to uploaded video with animated diagram,
so that I create complete video content including visuals.

**Acceptance Criteria:**

1. **Complete Pipeline Test:**
   - User: Provides topic "How agents coordinate in social media system"
   - Jarvis: `*write-script` (format=Tutorial, duration=8min, $0, 3 min) → Script with 3 thumbnail concepts
   - Jarvis: Saves script to Notion Content Text, thumbnail ideas to properties
   - Zoe: `*create-single-image` (from thumbnail concept #2, design=YouTube, $0.08, 50s) → Thumbnail created
   - Zoe: User creates architecture diagram separately (or Zoe generates if workflow added)
   - Zoe: `*animate-diagram` (veo-3.1-fast, 16:9, $0.30, 2 min) → 8s animated diagram
   - Notion: Thumbnail URL + video URL added
   - Zoro: `*upload-youtube` (video=animated diagram, title/description from script, $0, 3 min) → Uploaded as Private
   - User: Changes to Public in YouTube Studio
   - **Total Time:** 10-15 minutes | **Total Cost:** $0.38 | **Success:** YouTube video with thumbnail uploaded
2. Validates script includes proper timestamps, chapter markers, scene descriptions
3. Thumbnail passes CTR evaluation (curiosity gap, readability, contrast)
4. Video meets platform specs (16:9, proper duration, captions if enabled)
5. Test with 3 video topics, achieve 95% success

---
