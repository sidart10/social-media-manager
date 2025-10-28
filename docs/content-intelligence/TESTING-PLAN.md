# Jarvis - Comprehensive Testing Plan

**Created:** 2025-10-26
**Status:** Ready to Execute
**Total Tests:** 25 test cases across 7 workflows

---

## 🎯 Testing Strategy

### Phase 1: Individual Workflow Tests (7 workflows)

Test each workflow independently to verify core functionality

### Phase 2: Integration Tests (Workflow Chaining)

Test how workflows feed into each other

### Phase 3: System Tests (Cost, Voice, Error Handling)

Test cross-cutting concerns

### Phase 4: Real-World Scenarios

End-to-end user journeys

---

## 📋 Phase 1: Individual Workflow Tests

### Test 1: research-topic (Foundation Test)

**Purpose:** Verify multi-source research works

**Prerequisites:**

- MCP servers: exa-mcp, social-media-mcp, youtube-transcript, script-generation-mcp
- No cost (uses FREE or low-cost tools)

**Test Command:**

```
/jarvis
> research-topic
```

**Inputs:**

```
topic: "AI coding assistants"
depth: "standard"
focus_areas: ["trends", "examples", "data"]
output_format: "report"
max_youtube_videos: 3
```

**Expected Outputs:**

- ✅ Research brief markdown file created
- ✅ File location: `jarvis-sidecar/sessions/research-AI_coding_assistants-YYYY-MM-DD.md`
- ✅ Contains 5 finding categories:
  1. Trends & Timing
  2. Data & Statistics
  3. Examples & Case Studies
  4. Quotes & Expert Opinions
  5. Gaps & Opportunities
- ✅ 10-12 content angles generated
- ✅ All findings have source URLs
- ✅ YouTube examples have timestamps
- ✅ Confidence scores present

**Validation Criteria:**

- [ ] File created successfully
- [ ] All 5 categories populated
- [ ] At least 8 content angles generated
- [ ] All findings cite sources
- [ ] No errors during execution
- [ ] YouTube transcripts extracted (if examples requested)

**Estimated Time:** 3-5 minutes

---

### Test 2: analyze-profile - YouTube (FREE Test)

**Purpose:** Verify free YouTube analysis works

**Prerequisites:**

- youtube-mcp-server configured
- YouTube Data API key in .env

**Test Command:**

```
/jarvis
> analyze-profile
```

**Inputs:**

```
profile_url: "https://youtube.com/@ThePrimeagen"
platform: "auto-detect" (should detect YouTube)
window_days: 90
analysis_depth: "standard"
extract_transcripts: true
```

**Expected Outputs:**

- ✅ Profile summary markdown created
- ✅ Platform detected as "youtube"
- ✅ Channel details extracted (subscribers, views, bio)
- ✅ 50 recent videos analyzed
- ✅ Top 10 performers identified
- ✅ Patterns mined (hooks, topics, formats, timing)
- ✅ Top 5 transcripts analyzed
- ✅ 5-7 recommendations generated
- ✅ **Cost: $0** (using FREE YouTube API)
- ✅ Quota usage logged

**Validation Criteria:**

- [ ] Platform detection works
- [ ] Channel details correct
- [ ] Videos fetched (50)
- [ ] Top performers ranked correctly
- [ ] Hook patterns categorized
- [ ] Topic clusters identified (5-8)
- [ ] Transcript insights extracted
- [ ] Recommendations actionable
- [ ] NO cost incurred (FREE API used)
- [ ] Report file created

**Estimated Time:** 2-3 minutes

---

### Test 3: analyze-profile - Instagram (Apify Test)

**Purpose:** Verify Apify integration and cost tracking

**Prerequisites:**

- Apify MCP server configured
- APIFY_API_KEY in .env
- Apify account has credits

**Test Command:**

```
/jarvis
> analyze-profile
```

**Inputs:**

```
profile_url: "https://instagram.com/natfriedman"
platform: "auto-detect" (should detect Instagram)
window_days: 90
analysis_depth: "quick" (20 posts to minimize cost)
```

**Expected Behavior:**

1. Platform detected: Instagram
2. Display: "Instagram analysis requires Apify (no free API available)"
3. Search for actor: "instagram profile scraper"
4. Select: "apify/instagram-scraper"
5. Calculate cost: 20 posts × $0.50/1000 = **~$0.01**
6. Ask user: "Proceed with Apify? (~$0.01)"
7. User: "yes"
8. Execute actor
9. Display: "Instagram scraper running..."
10. Retrieve results from dataset
11. Parse 20 posts with engagement
12. **Log cost to memories.md**
13. Generate profile summary
14. Present findings

**Expected Outputs:**

- ✅ Cost estimate shown BEFORE execution
- ✅ User approval requested
- ✅ Actor executed successfully
- ✅ 20 Instagram posts retrieved
- ✅ Engagement data present (likes, comments)
- ✅ Top 10 performers identified
- ✅ Patterns mined
- ✅ **Cost logged to memories.md:**
  ```
  - [2025-10-26] apify/instagram-scraper: $0.01 (20 posts)
  - Monthly total: $0.01
  ```
- ✅ Profile summary created

**Validation Criteria:**

- [ ] Cost estimated correctly before execution
- [ ] User approval requested
- [ ] Apify MCP tools called correctly (search-actors, call-actor, get-actor-output)
- [ ] Instagram data retrieved
- [ ] Cost logged to memories.md
- [ ] Monthly total updated
- [ ] Profile analysis complete
- [ ] No errors

**Estimated Time:** 3-4 minutes
**Estimated Cost:** ~$0.01

---

### Test 4: learn-voice (Critical for Writing)

**Purpose:** Build voice profile from user's content

**Prerequisites:**

- User has public profiles (Twitter, LinkedIn, or YouTube)
- MCP servers for those platforms

**Test Command:**

```
/jarvis
> learn-voice
```

**Inputs:**

```
user_twitter_handle: "your_handle" (if you have Twitter)
user_linkedin_url: "https://linkedin.com/in/your-profile"
user_youtube_channel: "https://youtube.com/@your-channel" (optional)
min_posts_required: 20
include_video_voice: true
```

**Expected Behavior:**

1. Workflow asks for profile URLs
2. Fetches content using cost-optimized approach:
   - LinkedIn: Use linkedin-mcp (RapidAPI cost)
   - Twitter: Offer Apify (~$0.02) OR manual paste
   - YouTube: FREE (youtube-mcp-server + youtube-transcript)
3. Analyzes 20+ posts total
4. Extracts patterns:
   - Vocabulary level
   - Sentence structure
   - Tone score (1-10)
   - Signature phrases
   - Emoji usage
   - Hook preferences
   - Platform variations
5. Builds comprehensive voice profile
6. Saves to memories.md
7. Updates voice_profile_status = "complete"

**Expected Outputs:**

- ✅ Voice profile section added to memories.md
- ✅ Contains:
  - Writing characteristics
  - Signature elements (top phrases)
  - Hook preferences (% distribution)
  - Platform variations (if multiple platforms)
  - Voice matching guidelines (5+ rules)
  - Example transformations (generic vs user's voice)
- ✅ Confidence score (6-9/10 depending on sample size)
- ✅ Cost logged (if Apify used)

**Validation Criteria:**

- [ ] Profile URLs parsed correctly
- [ ] Content fetched (20+ posts minimum)
- [ ] Vocabulary level identified
- [ ] Tone score calculated (1-10)
- [ ] Signature phrases extracted (top 3-5)
- [ ] Emoji pattern detected
- [ ] Hook preference distribution calculated
- [ ] Voice profile saved to memories.md
- [ ] voice_profile_status = "complete"
- [ ] Confidence score reasonable

**Estimated Time:** 5-10 minutes
**Estimated Cost:** $0-0.05 (depending on platforms)

**CRITICAL:** This must complete before write-posts/write-scripts tests!

---

### Test 5: generate-ideas

**Purpose:** Generate evidence-backed Idea Cards

**Prerequisites:**

- research-topic completed (optional but recommended)
- MCP servers: social-media-mcp, exa-mcp, script-generation-mcp

**Test Command:**

```
/jarvis
> generate-ideas
```

**Inputs:**

```
seed_topic: "AI automation tools"
target_platforms: ["linkedin", "twitter", "youtube"]
idea_count: 5
style: "mixed"
use_trends: true
use_research_file: "[path to research-topic output]" (if available)
```

**Expected Outputs:**

- ✅ Idea Cards file created
- ✅ 5 Idea Cards generated
- ✅ Each card has:
  - Specific title
  - Why now (trend evidence)
  - Hook line (ready to use)
  - Outline (3-5 beats)
  - CTA
  - Hashtags
  - Evidence (source links)
  - Platform recommendation
  - Confidence score
- ✅ Hook pack (10+ templates)
- ✅ Content calendar (7-14 days)

**Validation Criteria:**

- [ ] All 5 ideas generated
- [ ] Each idea has complete structure
- [ ] Evidence links present
- [ ] Platform recommendations make sense
- [ ] Hook pack created
- [ ] Calendar distributes ideas logically
- [ ] File saved successfully

**Estimated Time:** 4-6 minutes

---

### Test 6: competitive-analysis

**Purpose:** Multi-profile comparison

**Prerequisites:**

- analyze-profile working
- Multiple profile URLs available

**Test Command:**

```
/jarvis
> competitive-analysis
```

**Inputs:**

```
your_profiles: ["your_youtube_channel"]
competitor_profiles: ["competitor1_youtube", "competitor2_linkedin"]
comparison_metrics: "all"
generate_action_plan: true
```

**Expected Behavior:**

1. Invokes analyze-profile for your profile
2. Invokes analyze-profile for each competitor
3. Builds comparison matrix
4. Identifies gaps
5. Generates 3 strategies
6. Creates 7-day action plan

**Expected Outputs:**

- ✅ Comparison matrix (side-by-side metrics)
- ✅ Gap analysis (topics, formats, hooks, timing)
- ✅ 3 differentiation strategies
- ✅ 7-day content plan (specific ideas)
- ✅ Cost summary (total for all profile analyses)

**Validation Criteria:**

- [ ] All profiles analyzed
- [ ] Comparison matrix complete
- [ ] Gaps identified clearly
- [ ] Strategies actionable
- [ ] 7-day plan specific (not generic)
- [ ] Total cost tracked

**Estimated Time:** 10-15 minutes (analyzes 3 profiles)
**Estimated Cost:** Variable (depends on platforms)

---

### Test 7: write-posts - LinkedIn

**Purpose:** Verify voice-aware LinkedIn post generation

**Prerequisites:**

- ✅ learn-voice completed (voice profile exists)
- ✅ generate-ideas completed (has Idea Card to use)

**Test Command:**

```
/jarvis
> write-posts
```

**Inputs:**

```
idea_card_id: "1" (from generate-ideas output)
target_platform: "linkedin"
tone_override: null (use voice profile)
inject_evidence: true
generate_hook_variants: true
```

**Expected Behavior:**

1. Check voice profile exists → FOUND
2. Load voice profile characteristics
3. Set voice_aware_mode = true
4. Load Idea Card data
5. Call script-generation-mcp to generate base
6. Apply voice adaptation:
   - Vocabulary matching
   - Sentence structure
   - Tone adjustment
   - Emoji application
7. Format for LinkedIn (hook < 140, body < 1600 optimal)
8. Validate with linkedin-api-client/lib/formatter
9. Generate 3 hook variants
10. Create handoff package JSON
11. Save post + handoff package

**Expected Outputs:**

- ✅ LinkedIn post file: `outputs/linkedin-post-YYYY-MM-DD.md`
- ✅ Handoff package: `outputs/linkedin-post-handoff-YYYY-MM-DD.json`
- ✅ Post structure:
  - Hook line (< 140 chars)
  - Body (800-1600 chars)
  - Evidence citations
  - CTA
  - Hashtags (3-5)
- ✅ Hook variants (3 alternatives)
- ✅ Voice-adapted (**sounds like YOU**)
- ✅ Handoff JSON valid

**Validation Criteria:**

- [ ] Voice profile loaded successfully
- [ ] voice_aware_mode = true
- [ ] Generated content matches voice characteristics
- [ ] Hook < 140 chars
- [ ] Body length optimal (800-1600 chars)
- [ ] Evidence injected naturally
- [ ] 3 hook variants generated
- [ ] Handoff JSON structure correct
- [ ] Files saved successfully
- [ ] **Manual check:** Does it sound like you wrote it?

**Estimated Time:** 3-4 minutes

---

### Test 8: write-posts - Twitter (Long-Form)

**Purpose:** Verify Twitter long-form generation

**Inputs:**

```
idea_card_id: "2"
target_platform: "twitter"
format_preference: "long-form"
inject_evidence: true
```

**Expected Outputs:**

- ✅ Single long-form Twitter post
- ✅ Length: 500-2500 chars
- ✅ Structure: Hook para → Main content → CTA
- ✅ Line breaks for readability
- ✅ Voice-adapted
- ✅ Evidence citations
- ✅ Validated (< 25000 chars)

**Validation:**

- [ ] Format choice presented (long-form selected)
- [ ] Single post generated (not thread)
- [ ] Validation passed
- [ ] Voice-adapted correctly
- [ ] Handoff package JSON created

---

### Test 9: write-posts - Twitter (Thread)

**Purpose:** Verify Twitter thread generation

**Inputs:**

```
idea_card_id: "3"
target_platform: "twitter"
format_preference: "thread"
```

**Expected Outputs:**

- ✅ Twitter thread (multiple tweets)
- ✅ Tweet 1: Hook + thread indicator
- ✅ Tweets 2-N: Main points (one beat per tweet)
- ✅ Final tweet: CTA + summary
- ✅ Thread numbering (1/X, 2/X, etc.)
- ✅ Each tweet validated
- ✅ Voice-adapted

**Validation:**

- [ ] Thread generated (not long-form)
- [ ] 3-7 tweets created (depends on idea complexity)
- [ ] Thread numbering present
- [ ] Each tweet stands alone
- [ ] All tweets validated
- [ ] Voice-adapted

---

### Test 10: write-posts - Instagram

**Purpose:** Verify Instagram caption generation

**Inputs:**

```
idea_card_id: "4"
target_platform: "instagram"
```

**Expected Outputs:**

- ✅ Instagram caption
- ✅ Hook (first 125 chars) works standalone
- ✅ Full caption with line breaks
- ✅ Emojis (2-5 strategically placed)
- ✅ Hashtags (5-10 optimal)
- ✅ CTA (Instagram-specific: "Double-tap", "Save", "Tag")
- ✅ Voice-adapted

**Validation:**

- [ ] Hook < 125 chars
- [ ] Full caption complete
- [ ] 2-5 emojis used (unless voice profile says fewer)
- [ ] 5-10 hashtags
- [ ] Instagram-specific CTA
- [ ] Voice-adapted

---

### Test 11: write-scripts - YouTube

**Purpose:** Verify YouTube script with timing

**Prerequisites:**

- Voice profile exists
- Idea Card available

**Inputs:**

```
idea_card_id: "5"
target_platform: "youtube"
duration: 90
include_visual_direction: true
generate_variants: true
```

**Expected Outputs:**

- ✅ YouTube script file
- ✅ Timing markers (0:00, 0:05, 0:15, etc.)
- ✅ Hook (0:00-0:05)
- ✅ Intro (0:05-0:15)
- ✅ Main points with timestamps
- ✅ CTA (last 10s)
- ✅ Visual direction for each section
- ✅ B-roll suggestions
- ✅ On-screen text markers
- ✅ Thumbnail ideas (3 options)
- ✅ Production complexity rating
- ✅ Hook variants (3)
- ✅ Handoff package JSON

**Validation:**

- [ ] Timing adds up to ~90s (±3s)
- [ ] Visual direction detailed
- [ ] B-roll suggestions specific
- [ ] Thumbnail ideas described
- [ ] Hook variants generated
- [ ] Handoff JSON complete
- [ ] Voice-adapted

**Estimated Time:** 4-5 minutes

---

### Test 12: write-scripts - Reels

**Purpose:** Verify fast-paced Reels script

**Inputs:**

```
idea_card_id: "6"
target_platform: "reels"
duration: 60
```

**Expected Outputs:**

- ✅ Reels script with beat-by-beat timing
- ✅ Hook (0:00-0:03) - 3s non-negotiable
- ✅ 4-5 fast beats (~12s each)
- ✅ CTA (last 5s)
- ✅ Visual direction per beat
- ✅ Text overlay suggestions
- ✅ Music tempo recommendation
- ✅ Camera work notes
- ✅ Cut frequency (every 3-4s)
- ✅ Platform tips (Reels-specific)

**Validation:**

- [ ] 3-second hook enforced
- [ ] Fast pacing (beats 10-15s each)
- [ ] Visual direction detailed
- [ ] Music recommendations present
- [ ] Cut frequency calculated
- [ ] Platform tips specific to Reels

**Estimated Time:** 4-5 minutes

---

## 📋 Phase 2: Integration Tests (Workflow Chaining)

### Test 13: Full Content Creation Pipeline

**Purpose:** Test complete research → idea → writing flow

**Steps:**

```
1. /research-topic
   topic: "No-code automation"
   depth: "standard"
   → Save research file path

2. /generate-ideas
   seed_topic: "No-code automation"
   use_research_file: "[path from step 1]"
   idea_count: 3
   → Save idea card IDs

3. /write-posts
   idea_card_id: "1"
   target_platform: "linkedin"
   → Generate LinkedIn post

4. /write-scripts
   idea_card_id: "2"
   target_platform: "youtube"
   duration: 90
   → Generate YouTube script
```

**Expected:**

- ✅ research-topic output feeds into generate-ideas
- ✅ Idea Cards reference research findings
- ✅ write-posts uses Idea Card structure
- ✅ write-scripts uses Idea Card structure
- ✅ Evidence preserved through entire chain
- ✅ All outputs voice-adapted
- ✅ All costs tracked

**Validation:**

- [ ] Research findings appear in Idea Cards
- [ ] Idea Card data appears in posts/scripts
- [ ] Evidence links preserved
- [ ] Voice consistent across outputs
- [ ] No data loss in handoffs

**Estimated Time:** 15-20 minutes

---

### Test 14: Competitive Analysis → Ideas → Content

**Purpose:** Test analysis-driven content creation

**Steps:**

```
1. /competitive-analysis
   your_profiles: ["your_linkedin"]
   competitor_profiles: ["comp1_linkedin", "comp2_linkedin"]
   → Get gap analysis + 7-day plan

2. /generate-ideas
   seed_topic: "[topic from gap analysis]"
   → Generate ideas to fill gaps

3. /write-posts
   idea_card_id: "[gap-filling idea]"
   target_platform: "linkedin"
   → Create content that addresses gap
```

**Expected:**

- ✅ Gap analysis identifies topic gaps
- ✅ Ideas generated specifically address gaps
- ✅ Content created fills identified gap
- ✅ Strategic reasoning preserved

**Validation:**

- [ ] Gaps clearly identified
- [ ] Ideas target gaps
- [ ] Content aligns with strategy
- [ ] Evidence-backed throughout

**Estimated Time:** 20-25 minutes

---

## 📋 Phase 3: System Tests

### Test 15: Cost Tracking Accuracy

**Purpose:** Verify cost estimation and logging works

**Steps:**

```
1. Check initial state in memories.md
   - Note starting monthly total

2. Run analyze-profile (Instagram - paid)
   - Verify cost estimate shown
   - Approve
   - Note estimated cost

3. After completion, check memories.md
   - Verify cost logged
   - Verify monthly total updated
   - Match estimate vs actual

4. Run another paid workflow
   - Verify monthly total accumulates correctly
```

**Validation:**

- [ ] Cost estimated before execution
- [ ] Estimate matches actual (within 10%)
- [ ] Cost logged to memories.md correctly
- [ ] Monthly total updates
- [ ] Budget tracking works

---

### Test 16: Voice-Awareness Quality

**Purpose:** Verify generated content sounds authentic

**Steps:**

```
1. Run learn-voice (if not done)
   → Build voice profile

2. Generate 3 posts with write-posts:
   - LinkedIn post
   - Twitter long-form
   - Instagram caption

3. Manual review:
   - Do they sound like YOU?
   - Are signature phrases used naturally?
   - Is tone consistent with your style?
   - Are emojis used correctly?
```

**Validation:**

- [ ] Voice profile loaded in each workflow
- [ ] Content uses your vocabulary level
- [ ] Sentence structure matches yours
- [ ] Tone matches your score
- [ ] Signature phrases appear naturally
- [ ] Emoji usage matches your pattern
- [ ] **Manual check:** Sounds authentic (not generic AI)

---

### Test 17: Error Handling - MCP Unavailable

**Purpose:** Test graceful degradation

**Steps:**

```
1. Simulate MCP failure:
   - Temporarily disable exa-mcp
   - Run research-topic

2. Expected behavior:
   - Workflow detects exa-mcp unavailable
   - Logs warning
   - Continues with available tools
   - Completes with partial results
   - Informs user of limitation

3. Re-enable MCP and verify normal operation resumes
```

**Validation:**

- [ ] Failure detected gracefully
- [ ] Workflow doesn't crash
- [ ] Continues with available tools
- [ ] User informed of limitation
- [ ] Partial results still useful

---

### Test 18: Error Handling - Quota Exceeded

**Purpose:** Test fallback when free quota exceeded

**Steps:**

```
1. Run analyze-profile (YouTube) multiple times
   - Intentionally exceed 10k unit quota (or simulate)

2. Expected behavior:
   - Primary tool (youtube-mcp-server) reports quota exceeded
   - Workflow offers Apify fallback
   - Shows cost estimate
   - Asks user approval
   - Falls back if approved
```

**Validation:**

- [ ] Quota exceeded detected
- [ ] Fallback offered
- [ ] Cost shown
- [ ] User choice respected
- [ ] Fallback executes if approved

---

### Test 19: Error Handling - User Declines Cost

**Purpose:** Test workflow exit when user declines

**Steps:**

```
1. Run analyze-profile (Instagram)
2. When cost shown, select "no"
3. Expected: Workflow exits gracefully with message
```

**Validation:**

- [ ] Workflow exits without error
- [ ] Clear message why (user declined cost)
- [ ] No partial/broken output created
- [ ] No cost logged

---

## 📋 Phase 4: Real-World Scenarios

### Test 20: First-Time User Journey

**Scenario:** New user, no voice profile

**Steps:**

```
1. User: /write-posts (without running learn-voice first)
2. Expected: Workflow detects no voice profile
3. Offers 3 options (learn-voice / neutral / idea card only)
4. User selects: "1" (learn-voice)
5. Expected: Pauses write-posts, runs learn-voice, resumes
6. Completes write-posts with voice profile

---
user: Let me verify the output structure
7. Result: Voice-adapted post created
```

**Validation:**

- [ ] No voice profile detected
- [ ] Options presented
- [ ] learn-voice invoked
- [ ] write-posts resumed after
- [ ] Final output voice-adapted

---

### Test 21: Content Creator Daily Workflow

**Scenario:** User wants to create week's content

**Steps:**

```
Day 1: Research
- /research-topic topic="AI productivity"
- Review angles

Day 2: Competitive Intel
- /analyze-profile url="competitor"
- Note patterns

Day 3: Ideation
- /generate-ideas seed_topic="AI productivity"
- Review 10 Idea Cards

Day 4-7: Content Creation
- /write-posts for Ideas 1, 3, 5 (LinkedIn, Twitter, Instagram)
- /write-scripts for Ideas 2, 4 (YouTube, Reels)

Week total: 5 pieces of content ready for Social Posting Agent
```

**Validation:**

- [ ] All workflows complete successfully
- [ ] Content variety (3 posts, 2 scripts)
- [ ] All voice-adapted
- [ ] Evidence preserved
- [ ] Handoff packages created for all
- [ ] Total cost tracked
- [ ] Time efficient (< 2 hours for week's content)

---

### Test 22: Multi-Platform Campaign

**Scenario:** Single idea, multiple platforms

**Steps:**

```
1. /generate-ideas
   → Get 1 strong Idea Card

2. /write-posts idea_card_id="1" target_platform="linkedin"
   → LinkedIn post

3. /write-posts idea_card_id="1" target_platform="twitter" format_preference="long-form"
   → Twitter long-form

4. /write-posts idea_card_id="1" target_platform="instagram"
   → Instagram caption

5. /write-scripts idea_card_id="1" target_platform="youtube" duration="90"
   → YouTube script

6. /write-scripts idea_card_id="1" target_platform="reels" duration="60"
   → Reels script
```

**Expected:**

- ✅ Same core idea adapted 5 different ways
- ✅ Each format appropriate for platform
- ✅ All voice-adapted
- ✅ Cross-platform content package ready

**Validation:**

- [ ] Core message consistent across platforms
- [ ] Format adapted appropriately
- [ ] Platform-specific optimizations applied
- [ ] All pieces work together as campaign

---

## 📋 Test Execution Checklist

### Pre-Test Setup

- [ ] Compile Jarvis agent (BMAD installer)
- [ ] Verify MCP servers configured:
  - [ ] apify_mcp
  - [ ] youtube-mcp-server
  - [ ] youtube-transcript
  - [ ] linkedin-mcp
  - [ ] exa-mcp
  - [ ] social-media-mcp
  - [ ] script-generation-mcp
- [ ] Verify API keys in .env:
  - [ ] APIFY_API_KEY
  - [ ] YOUTUBE_API_KEY
  - [ ] (LinkedIn, Twitter, etc.)
- [ ] Check Apify credits available
- [ ] Prepare test data:
  - [ ] Sample profile URLs (yours + competitors)
  - [ ] Test topics

---

### Test Execution Order

**Day 1: Foundation & Analysis (Free/Low-Cost)**

1. Test 1: research-topic ✓
2. Test 2: analyze-profile (YouTube - FREE) ✓
3. Test 4: learn-voice ✓ (CRITICAL - do early!)
4. Test 5: generate-ideas ✓

**Day 2: Paid Tests (Apify) - Budget: $0.50** 5. Test 3: analyze-profile (Instagram - ~$0.01) ✓ 6. Test 3: analyze-profile (Twitter - ~$0.02) ✓ 7. Test 3: analyze-profile (TikTok - ~$0.50) ✓ 8. Test 6: competitive-analysis ✓

**Day 3: Writing Tests (Voice-Aware)** 9. Test 7: write-posts (LinkedIn) ✓ 10. Test 8: write-posts (Twitter long-form) ✓ 11. Test 9: write-posts (Twitter thread) ✓ 12. Test 10: write-posts (Instagram) ✓ 13. Test 11: write-scripts (YouTube) ✓ 14. Test 12: write-scripts (Reels) ✓

**Day 4: Integration & System Tests** 15. Test 13: Full pipeline ✓ 16. Test 14: Competitive → Ideas → Content ✓ 17. Test 15: Cost tracking accuracy ✓ 18. Test 16: Voice-awareness quality ✓ 19. Test 17-19: Error handling ✓

**Day 5: Real-World Scenarios** 20. Test 20: First-time user journey ✓ 21. Test 21: Daily workflow ✓ 22. Test 22: Multi-platform campaign ✓

---

## 📊 Success Metrics

### Must Pass (Critical)

- ✅ All 7 workflows execute without errors
- ✅ Cost tracking accurate (estimate matches actual within 10%)
- ✅ Voice-adapted content sounds authentic
- ✅ ALL platforms work (Twitter, Instagram, TikTok, LinkedIn, YouTube)
- ✅ Handoff packages valid for downstream agents
- ✅ Evidence preserved through workflow chains

### Should Pass (Important)

- ✅ Error handling graceful (no crashes)
- ✅ Fallback chains work
- ✅ Execution time reasonable (< 5 min per workflow)
- ✅ Output quality high (professional-grade)
- ✅ BMAD compliance (XML format correct)

### Nice to Have

- ✅ Cost under $1.00 for full test suite
- ✅ All tests complete in < 8 hours
- ✅ Documentation accurate
- ✅ Zero bugs found

---

## 🔧 Test Execution Template

For each test, document:

```markdown
### Test X: [Workflow Name] - [Scenario]

**Executed:** [Date/Time]
**Duration:** [Actual time]
**Cost:** [Actual cost]

**Status:** ✅ PASS | ⚠️ PARTIAL | ❌ FAIL

**Results:**

- [What happened]
- [Outputs created]
- [Observations]

**Issues Found:**

- [Any bugs, errors, or unexpected behavior]

**Validation:**

- [✅/❌] Criterion 1
- [✅/❌] Criterion 2
- [✅/❌] Criterion 3

**Notes:**

- [Additional observations]
- [Improvements needed]
```

---

## 🎯 Testing Goals

**By End of Testing:**

1. ✅ All 7 workflows validated as working
2. ✅ Cost tracking proven accurate
3. ✅ Voice-awareness proven effective
4. ✅ ALL platforms confirmed functional
5. ✅ Integration with other agents validated
6. ✅ Error handling confirmed robust
7. ✅ Real-world scenarios tested
8. ✅ Documentation confirmed accurate
9. ✅ Bugs identified and fixed
10. ✅ Jarvis ready for production use

---

## 📁 Test Results Storage

**Create:** `jarvis-sidecar/test-results/`

**Files:**

- `test-execution-log.md` - Running log of all tests
- `test-results-summary.md` - Final summary
- `bugs-found.md` - Issues discovered
- `sample-outputs/` - Example outputs from each workflow

---

## 🚀 Ready to Start Testing?

**Recommended Starting Point:**

```
Test 1: research-topic
- Simplest workflow
- No cost
- No dependencies
- Quick validation (3-5 min)
- Establishes baseline
```

**Then:**

```
Test 4: learn-voice
- Creates voice profile (needed for later tests)
- Small cost if using Apify
- One-time setup
```

**Then proceed through rest of test plan systematically.**

---

_Complete testing plan with 22 test cases_
_Estimated total time: 6-8 hours_
_Estimated total cost: < $1.00_
_Ready to execute!_
