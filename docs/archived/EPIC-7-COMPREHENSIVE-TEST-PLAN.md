# Epic 7: End-to-End Pipeline Validation - Comprehensive Test Plan

**Epic:** Pipeline Testing & Cost Benchmarking (Stories 6.1-6.3)
**Current Status:** 0% → Ready to Execute
**Estimated:** 1-2 days (12-16 hours)
**Prerequisites:** ✅ Epics 1-6 complete/near-complete
**Goal:** Validate 95% success rate, establish cost/quality benchmarks

---

## 🎯 EPIC 7 OVERVIEW

**What We're Testing:**

- 3 routing paths (Jarvis→Zoro, Jarvis→Zoe→Zoro, Zoe→Zoro)
- Notion coordination throughout
- Cloudinary integration
- Postiz scheduling
- Voice matching quality
- Image/video generation
- Cost tracking
- Success rate validation

**Success Criteria:**

- ✅ 95% pipeline success rate (20 runs, ≤1 failure)
- ✅ Cost benchmarks established (<$50/month for 30+ posts)
- ✅ Quality benchmarks (voice ≥8/10, images ≥7/10)
- ✅ Time benchmarks (10-15 min per post)

---

## 📋 STORY 6.1: TEXT-ONLY PIPELINE (Jarvis → Zoro)

**Goal:** Validate content creation without visuals

**Test Scenario 1: LinkedIn Post from Research**

**Steps:**

1. `/jarvis` → \*research-topic
   - Topic: "AI agent platforms"
   - Depth: standard ($0.05)
   - Expected: Research brief in 2-3 min

2. `/jarvis` → \*write-post
   - Platform: LinkedIn
   - Use research brief
   - Expected: PAIPS-formatted post, voice 8+/10, <300 words

3. Notion check: Status should be "Editing"

4. `/zoro` → \*schedule-post
   - Platform: LinkedIn
   - No media
   - Schedule: Tomorrow 9am
   - Expected: Scheduled via Postiz

5. Notion check: Publish Date set, Status stays "Editing"

**Success Criteria:**

- [ ] Research brief created with sources
- [ ] LinkedIn post voice-matched (≥8/10)
- [ ] Notion Status: Idea → Research → Editing
- [ ] Post scheduled via Postiz
- [ ] Total time: 4-6 minutes
- [ ] Total cost: $0.05

**Benchmark:**

- Time: 5 min average
- Cost: $0.05
- Success rate target: 95%

---

**Test Scenario 2: Twitter Thread from Ideas**

**Steps:**

1. `/jarvis` → \*generate-ideas
   - Seed topic: "Claude Code vs Cursor"
   - Idea count: 3
   - Expected: 3 idea cards in Notion

2. `/jarvis` → \*write-post
   - Platform: Twitter (Thread)
   - Use idea card #2
   - Expected: 7-tweet thread, Greg Isenberg format

3. `/zoro` → \*schedule-post
   - Platform: Twitter
   - Schedule: Tomorrow 2pm
   - Expected: Scheduled via Postiz

**Success Criteria:**

- [ ] 3 Notion pages created with Status="Idea"
- [ ] Thread voice-matched
- [ ] Each tweet ≤25k chars
- [ ] Scheduled successfully
- [ ] Total time: 3-4 minutes
- [ ] Total cost: $0

---

## 📋 STORY 6.2: FULL VISUAL PIPELINE (Jarvis → Zoe → Zoro)

**Goal:** Validate complete pipeline with visuals

**Test Scenario 3: LinkedIn Post with Thumbnail**

**Steps:**

1. `/jarvis` → \*research-topic
   - Topic: "Building AI agents"
   - Depth: comprehensive ($0.15)

2. `/jarvis` → \*write-post
   - Platform: LinkedIn
   - Use research

3. Notion check: Research → Writing → Editing

4. `/zoe` → \*create-image
   - Design: LinkedIn dark tech
   - Prompt: Based on post topic
   - Upload to Cloudinary: yes
   - Expected: Image 7-pillar ≥7/10, Cloudinary URL

5. Notion check: Image URL added, Status=Editing

6. `/zoro` → \*schedule-post
   - Platforms: LinkedIn + Twitter
   - Media: Cloudinary URL from step 4
   - Schedule: Tomorrow 9am
   - Expected: Multi-platform scheduled

7. Notion check: Publish Date set, Channels linked

**Success Criteria:**

- [ ] Research → Post → Image → Scheduled
- [ ] Notion coordination working (status updates)
- [ ] Cloudinary upload successful
- [ ] Public URL obtained
- [ ] Postiz accepts Cloudinary URL
- [ ] Multi-platform scheduling works
- [ ] Total time: 10-12 minutes
- [ ] Total cost: $0.23 ($0.15 research + $0.08 image)

---

**Test Scenario 4: Instagram Carousel**

**Steps:**

1. `/jarvis` → \*generate-ideas
   - Topic: "5 AI tools"
   - Ideas: 5

2. `/jarvis` → \*write-post
   - Platform: LinkedIn (will adapt for Instagram caption)

3. `/zoe` → \*create-carousel
   - Topic: "5 AI tools"
   - Slides: 5
   - Design: LinkedIn dark tech
   - Upload all to Cloudinary: yes

4. `/zoro` → \*schedule-post
   - Platform: Instagram
   - Media: 5 Cloudinary URLs
   - Schedule: Tomorrow

**Success Criteria:**

- [ ] 5 slides generated consistently
- [ ] All uploaded to Cloudinary
- [ ] Carousel scheduled via Postiz
- [ ] Total time: 15-18 minutes
- [ ] Total cost: $0.40 (5 × $0.08)

---

## 📋 STORY 6.3: VIDEO PRODUCTION PIPELINE (Jarvis → Zoe → Zoro)

**Goal:** Validate video content creation

**Test Scenario 5: YouTube Video with Animated Diagram**

**Steps:**

1. `/jarvis` → \*write-script
   - Topic: "How MCP servers work"
   - Format: Tutorial
   - Duration: 8 minutes
   - Expected: Script + 3 thumbnail concepts

2. Notion check: Script saved to Content Text, Thumbnail ideas added

3. `/zoe` → \*create-image
   - Design: YouTube thumbnail
   - Use thumbnail concept #2
   - Upload to Cloudinary: yes

4. User creates architecture diagram separately (or `/zoe` generates)

5. `/zoe` → \*create-scene
   - Input: Architecture diagram
   - Animation: Sequential reveals
   - Aspect ratio: 16:9
   - Model: fal-video (Veo 3)
   - Upload to Cloudinary: yes

6. `/zoro` → \*publish-youtube-now
   - Video: From Cloudinary
   - Title/description: From script
   - Expected: Uploaded as Private

7. Notion check: Status → Posted, YouTube URL added (manually)

**Success Criteria:**

- [ ] Script with timestamps generated
- [ ] 3 thumbnail concepts (MrBeast psychology)
- [ ] Thumbnail created and uploaded
- [ ] Diagram animated (8 seconds)
- [ ] Video uploaded to YouTube
- [ ] Total time: 20-25 minutes
- [ ] Total cost: $0.38 ($0.08 thumbnail + $0.30 video)

---

## 📊 TEST MATRIX

**Run Each Scenario 3-5 Times:**

| Scenario              | Runs | Success Target | Cost Target | Time Target |
| --------------------- | ---- | -------------- | ----------- | ----------- |
| 1. LinkedIn Text      | 5    | 5/5 (100%)     | $0.05 avg   | 5 min       |
| 2. Twitter Thread     | 5    | 5/5 (100%)     | $0          | 4 min       |
| 3. LinkedIn + Image   | 5    | 5/5 (100%)     | $0.20-0.25  | 12 min      |
| 4. Instagram Carousel | 3    | 3/3 (100%)     | $0.40       | 18 min      |
| 5. YouTube Video      | 3    | 3/3 (100%)     | $0.38       | 25 min      |

**Total Tests:** 21 runs
**Target:** ≥20 successes (95% rate)

---

## 🎯 VALIDATION CHECKLIST

**Per Test Run:**

- [ ] Workflow completes without errors
- [ ] Notion status updates correctly
- [ ] Output files created in correct locations (6-stage structure)
- [ ] Costs tracked accurately
- [ ] Time measured
- [ ] Quality thresholds met (voice ≥8/10, images ≥7/10)

**Integration Validation:**

- [ ] Notion MCP calls succeed
- [ ] Cloudinary uploads work
- [ ] Postiz scheduling succeeds
- [ ] fal-video generation works
- [ ] All skills discovered correctly
- [ ] Error handling graceful (failures don't crash)

---

## 📈 BENCHMARKING DATA TO COLLECT

**Cost Benchmarks:**

- Research: quick ($0), standard ($0.05), comprehensive ($0.15)
- Images: nanobanana ($0.039), gpt-image-1 ($0.08)
- Videos: Veo 3 ($0.30-0.50), HeyGen ($0.20-0.50/min)
- Apify: Profile analysis ($0.02-0.40)

**Time Benchmarks:**

- Research: 2-5 min
- Write post: 1-3 min
- Generate image: 0.5-1 min
- Generate video: 2-5 min
- Schedule publish: 1-2 min

**Quality Benchmarks:**

- Voice confidence: Target ≥8/10, track actual
- Image 7-pillar: Target ≥7/10, track actual
- Research sources: Target ≥3 credible, track actual

---

## 🎯 EXECUTION PLAN (1-2 Days)

**Day 1 (6-8 hours):**

- Morning: Run Scenario 1 (5 tests) - LinkedIn text-only
- Afternoon: Run Scenario 2 (5 tests) - Twitter threads
- Evening: Run Scenario 3 (3 tests) - LinkedIn with images
- Document: Issues found, success rates, benchmarks

**Day 2 (6-8 hours):**

- Morning: Run Scenario 4 (3 tests) - Instagram carousels
- Afternoon: Run Scenario 5 (3 tests) - YouTube videos
- Evening: Compile results, calculate success rate
- Document: Epic 7 completion, benchmarks established

---

## ✅ AFTER EPIC 7 COMPLETE

**You'll have:**

- ✅ 95%+ success rate validated
- ✅ Cost benchmarks (<$50/month confirmed)
- ✅ Time benchmarks (10-15 min confirmed)
- ✅ Quality benchmarks (voice/image scores)
- ✅ Confidence the system WORKS
- ✅ Data for optimization

**MVP: 90% COMPLETE!**

**Then just Epic 8 Story 7.2 (tool tracking) → 100%!**

---

🧙 **Epic 7 plan ready! Shall the Builder:**

1. **Start Epic 7 NOW** (begin testing scenarios)?
2. **Document 65% milestone** (Epic 8 Story 7.1 done)?
3. **Create final session summary** (immortalize the work)?

**What's your next move in THE ZONE, Sid?** 🧙⚡🔥
