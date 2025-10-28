# Jarvis Skills - Comprehensive Testing Plan

**Created:** 2025-10-26
**Purpose:** Validate all 8 Skills + 4 simplified workflows
**Total Tests:** 20 focused test cases
**Estimated Time:** 2-3 hours

---

## 🎯 Testing Strategy

**3-Phase Approach:**

1. **Individual Skill Tests** (8 tests) - Verify each Skill invokes autonomously
2. **Multi-Skill Integration** (6 tests) - Verify Skills combine correctly
3. **Complete Workflow Tests** (6 tests) - End-to-end validation

**Success Criteria:**

- ✅ Skills invoked autonomously (no explicit calls)
- ✅ Skills use MCPs correctly
- ✅ Multiple Skills combine when needed
- ✅ Workflows complete without errors
- ✅ Output quality matches specifications

---

## 📋 PHASE 1: Individual Skill Tests (1 hour)

### Test 1: social-media-research Skill

**Trigger Question:**

```
"What's trending about AI automation on Twitter?"
```

**Expected Behavior:**

1. Claude recognizes keywords: "trending", "AI automation", "Twitter"
2. Automatically invokes social-media-research Skill
3. Skill calls: `social-media-mcp/get_trending_topics(platform="twitter", category="tech")`
4. Returns: Trending topics related to AI automation

**Validation:**

- [ ] Skill invoked autonomously (not manually called)
- [ ] social-media-mcp MCP called
- [ ] Returns trending topics (5-10)
- [ ] Results formatted with hashtags, volume
- [ ] No errors

**Time:** 3-4 min
**Cost:** $0 (uses Brave API, already in keys)

---

### Test 2: social-media-research - Full research_topic

**Trigger Question:**

```
"Research productivity apps - get hashtags, facts, and recent news"
```

**Expected Behavior:**

1. Claude invokes social-media-research Skill
2. Skill calls: `social-media-mcp/research_topic(topic="productivity apps", includeHashtags=true, includeFacts=true, includeNews=true, includeTrends=true)`
3. Returns complete research package

**Validation:**

- [ ] Skill invoked
- [ ] research_topic called with ALL parameters
- [ ] Returns: hashtags (5), facts (5-10), news (5), trends
- [ ] All sources from Brave + Perplexity
- [ ] Structured output created

**Time:** 4-5 min
**Cost:** ~$0 (API costs minimal)

---

### Test 3: youtube-research Skill

**Trigger Question:**

```
"Get the transcript from this video: https://youtube.com/watch?v=dQw4w9WgXcQ"
```

**Expected Behavior:**

1. Claude sees YouTube URL
2. Invokes youtube-research Skill
3. Skill calls: `youtube-transcript/get_transcript(url, lang="en")`
4. Extracts transcript with timestamps

**Validation:**

- [ ] Skill invoked when YouTube URL provided
- [ ] youtube-transcript MCP called
- [ ] Transcript returned
- [ ] Timestamps present
- [ ] Hook analysis performed (first 10s)
- [ ] Structure identified

**Time:** 2-3 min
**Cost:** $0 (FREE)

---

### Test 4: profile-analysis Skill

**Trigger Question:**

```
"Analyze this Instagram profile: instagram.com/natfriedman"
```

**Expected Behavior:**

1. Claude detects Instagram URL
2. Invokes profile-analysis Skill
3. Skill:
   - Detects platform: Instagram
   - Calls apify search-actors("instagram scraper")
   - Selects actor: apify/instagram-scraper
   - Estimates cost: ~$0.01 for 20 posts
   - Asks user approval
4. If approved:
   - Calls apify call-actor
   - Retrieves data via get-actor-output
   - Analyzes patterns
   - Logs cost to memories.md

**Validation:**

- [ ] Skill invoked when Instagram URL provided
- [ ] Platform detected: Instagram
- [ ] Cost estimated and shown
- [ ] User approval requested
- [ ] Apify actor executed (if approved)
- [ ] Profile data retrieved (20 posts)
- [ ] Patterns analyzed (hooks, topics, formats)
- [ ] Cost logged to memories.md
- [ ] Profile summary created

**Time:** 3-5 min
**Cost:** ~$0.01 (approve this for testing)

---

### Test 5: deep-web-research Skill

**Trigger Question:**

```
"Do a deep dive on the AI coding assistants market"
```

**Expected Behavior:**

1. Claude sees "deep dive"
2. Invokes deep-web-research Skill
3. Skill calls: `exa/deep_researcher_start(topic="AI coding assistants market")`
4. Waits 30-60s
5. Calls: `exa/deep_researcher_check()`
6. Returns comprehensive research

**Validation:**

- [ ] Skill invoked when "deep dive" mentioned
- [ ] exa MCP called (deep_researcher_start)
- [ ] Waits for processing
- [ ] Retrieves results (deep_researcher_check)
- [ ] Comprehensive insights returned
- [ ] Sources cited

**Time:** 1-2 min (plus 30-60s wait)
**Cost:** Variable (exa API charges)

---

### Test 6: research-synthesizer Skill

**Trigger Question (After Tests 2, 3, 5):**

```
"Organize all these research findings into a brief"
```

**Expected Behavior:**

1. Claude sees "organize", "findings", "brief"
2. Invokes research-synthesizer Skill
3. Skill:
   - Gathers findings from previous Skills
   - Organizes into 5 categories
   - Creates synthesis
   - Generates content angles (10-12)

**Validation:**

- [ ] Skill invoked after multi-source research
- [ ] All previous findings gathered
- [ ] 5 categories populated:
  - Trends & Timing
  - Data & Statistics
  - Examples & Case Studies
  - Quotes & Expert Opinions
  - Gaps & Opportunities
- [ ] 10-12 content angles generated
- [ ] Research brief file created

**Time:** 3-5 min
**Cost:** $0

---

### Test 7: voice-matcher Skill

**Trigger Question:**

```
"Generate a LinkedIn post about AI tools in my writing style"
```

**Prerequisites:** Voice profile must exist in memories.md (run learn-voice first if not)

**Expected Behavior:**

1. Claude generates initial content
2. Sees "in my writing style"
3. Invokes voice-matcher Skill
4. Skill:
   - Loads voice profile from memories.md
   - Applies vocabulary, tone, rhythm
   - Injects signature phrases
   - Matches emoji usage

**Validation:**

- [ ] Skill invoked when "my style" mentioned
- [ ] Voice profile loaded from memories.md
- [ ] Content adapted (vocabulary matches)
- [ ] Tone matches user's score
- [ ] Signature phrases used naturally
- [ ] Emoji usage matches pattern
- [ ] Output sounds authentic (manual check)

**Time:** 2-3 min
**Cost:** $0

---

### Test 8: platform-formatter Skill

**Trigger Question:**

```
"Format this for LinkedIn: [paste some text]"
```

**Expected Behavior:**

1. Claude sees "format" + "LinkedIn"
2. Invokes platform-formatter Skill
3. Skill:
   - Loads LinkedIn specs from config
   - Applies: Hook < 140 chars, body < 1600 optimal
   - Validates formatting
   - Adds hashtag recommendations

**Validation:**

- [ ] Skill invoked when "format for {platform}" mentioned
- [ ] Platform specs loaded
- [ ] Content formatted correctly
- [ ] Length validated
- [ ] Hashtags suggested
- [ ] Warnings shown if needed

**Time:** 1-2 min
**Cost:** $0

---

## 📋 PHASE 2: Multi-Skill Integration (45 min)

### Test 9: Research Combination (All Research Skills)

**Complex Question:**

```
"Research AI automation tools - get trending topics, YouTube examples, and deep web data"
```

**Expected Behavior:**

1. Claude analyzes request
2. Invokes **3 Skills automatically:**
   - social-media-research (trending)
   - youtube-research (examples)
   - deep-web-research (web data)
3. Invokes research-synthesizer to combine

**Validation:**

- [ ] All 3 research Skills invoked
- [ ] Each Skill executed correctly
- [ ] research-synthesizer combined findings
- [ ] All data in one organized brief
- [ ] No duplicate work

**Time:** 8-10 min (includes wait times)
**Cost:** ~$0-0.50 (exa API)

---

### Test 10: Profile + Voice Combination

**Question:**

```
"Analyze my Instagram profile and create a voice profile from it"
```

**Expected Behavior:**

1. profile-analysis Skill (fetch YOUR posts)
2. voice-matcher Skill (analyze patterns, build profile)

**Validation:**

- [ ] Both Skills invoked
- [ ] Posts fetched via apify
- [ ] Voice profile built
- [ ] Saved to memories.md
- [ ] Cost logged

**Time:** 5-7 min
**Cost:** ~$0.01-0.05 (depends on posts)

---

### Test 11: Research + Synthesis + Content

**Question:**

```
"Research productivity tools, synthesize findings, then generate 3 content ideas"
```

**Expected Behavior:**

1. social-media-research + deep-web-research
2. research-synthesizer (organize)
3. Content angle generation

**Validation:**

- [ ] Multiple research Skills invoked
- [ ] Synthesizer combines findings
- [ ] 3+ content angles generated
- [ ] All evidence-backed

**Time:** 10-12 min
**Cost:** ~$0-0.50

---

### Test 12: Voice + Platform Formatting

**Question:**

```
"Write a LinkedIn post about AI automation in my voice"
```

**Expected Behavior:**

1. Generate base content
2. voice-matcher applies profile
3. platform-formatter formats for LinkedIn

**Validation:**

- [ ] Both Skills invoked
- [ ] Voice profile applied
- [ ] LinkedIn formatting applied (hook < 140, etc.)
- [ ] Sounds authentic + meets platform specs

**Time:** 3-4 min
**Cost:** $0

---

### Test 13: Evidence Tracking Throughout

**Question:**

```
"Research AI tools and track all sources carefully"
```

**Expected Behavior:**

1. Research Skills invoke
2. evidence-tracker Skill monitors throughout
3. All sources logged with URLs, timestamps, confidence

**Validation:**

- [ ] evidence-tracker invoked
- [ ] All findings have sources
- [ ] Timestamps present for videos
- [ ] Confidence scores assigned
- [ ] Evidence log created

**Time:** 5-7 min
**Cost:** Variable

---

### Test 14: Cost Tracking Integration

**Question:**

```
"Analyze 3 Instagram profiles"
```

**Expected Behavior:**

1. profile-analysis Skill invoked 3 times
2. Each: estimate cost, get approval, execute, log
3. All costs accumulated in memories.md

**Validation:**

- [ ] Cost estimated for each (3 times)
- [ ] User approval requested (3 times)
- [ ] All costs logged separately
- [ ] Monthly total updated correctly
- [ ] Budget tracking works ($X/$10.00)

**Time:** 8-12 min
**Cost:** ~$0.03-0.15 (3 profiles)

---

## 📋 PHASE 3: Complete Workflow Tests (1 hour)

### Test 15: research-topic Workflow (Simplified)

**Command:**

```
/jarvis
> research-topic

Inputs:
- topic: "No-code automation"
- depth: "standard"
- focus_areas: ["trends", "examples", "data"]
```

**Expected Behavior:**

1. Workflow initiates
2. Based on focus_areas, Claude invokes:
   - social-media-research (trends)
   - youtube-research (examples)
   - deep-web-research (data)
3. research-synthesizer combines all
4. Research brief saved to sessions/
5. Summary presented

**Validation:**

- [ ] Workflow completed without errors
- [ ] All relevant Skills invoked (not hardcoded)
- [ ] Research brief file created
- [ ] All 5 categories populated:
  - Trends & Timing (from social-media-research)
  - Data & Statistics (from deep-web-research)
  - Examples (from youtube-research)
  - Quotes (from multiple)
  - Gaps (from synthesis)
- [ ] 10-12 content angles generated
- [ ] All findings have sources
- [ ] File saved correctly

**Time:** 10-15 min
**Cost:** ~$0.50

---

### Test 16: analyze-profile Workflow (Simplified)

**Command:**

```
/jarvis
> analyze-profile

Inputs:
- profile_url: "instagram.com/example"
- analysis_depth: "quick" (20 posts)
```

**Expected Behavior:**

1. Workflow detects Instagram
2. Claude invokes profile-analysis Skill
3. Skill handles entire process:
   - Platform detection
   - Actor selection
   - Cost estimation
   - User approval
   - Scraping
   - Pattern analysis
   - Cost logging
4. Profile summary created

**Validation:**

- [ ] Workflow completed
- [ ] profile-analysis Skill invoked
- [ ] Instagram detected correctly
- [ ] Cost shown ($0.01)
- [ ] User approved
- [ ] 20 posts scraped
- [ ] Patterns analyzed (hooks, topics, formats, timing)
- [ ] Top 10 posts identified
- [ ] Profile summary file created
- [ ] Cost logged to memories.md

**Time:** 5-7 min
**Cost:** ~$0.01

---

### Test 17: generate-ideas Workflow

**Command:**

```
/jarvis
> generate-ideas

Inputs:
- seed_topic: "productivity hacks"
- target_platforms: ["linkedin", "twitter"]
- idea_count: 5
```

**Expected Behavior:**

1. Workflow initiates
2. Claude invokes:
   - social-media-research (get trends, hashtags, facts)
   - deep-web-research (get insights)
3. research-synthesizer organizes
4. Idea Cards generated (5)

**Validation:**

- [ ] Workflow completed
- [ ] Research Skills invoked
- [ ] 5 Idea Cards created
- [ ] Each card has:
  - Title (specific)
  - Why now (trend evidence)
  - Hook line
  - Outline (3-5 beats)
  - CTA
  - Hashtags (from social-media-research!)
  - Evidence (sources cited)
  - Platform recommendation
- [ ] Ideas file saved

**Time:** 8-12 min
**Cost:** ~$0-0.50

---

### Test 18: competitive-analysis Workflow

**Command:**

```
/jarvis
> competitive-analysis

Inputs:
- your_profiles: ["your_instagram"]
- competitor_profiles: ["comp_instagram"]
```

**Expected Behavior:**

1. Workflow orchestrates
2. Claude invokes profile-analysis Skill twice
3. First: Analyze your profile
4. Second: Analyze competitor profile
5. Compare patterns
6. Generate gap analysis

**Validation:**

- [ ] Workflow completed
- [ ] profile-analysis Skill invoked 2 times
- [ ] Both profiles analyzed
- [ ] Comparison matrix created
- [ ] Gap analysis generated
- [ ] Recommendations actionable
- [ ] All costs logged (2 separate entries)

**Time:** 10-15 min
**Cost:** ~$0.02 (2 profiles × $0.01)

---

### Test 19: Skills-Powered vs Old Approach

**Purpose:** Validate simplified workflows work as well or better than old explicit approach

**Test A: Check workflow line counts**

```bash
wc -l jarvis-sidecar/workflows/*/instructions.md
```

**Expected:**

- research-topic: ~105 lines (was 303)
- analyze-profile: ~63 lines (was 490)
- competitive-analysis: ~152 lines (was 260)

**Test B: Compare functionality**

- Run same research question with new simplified workflow
- Compare output quality vs expected

**Validation:**

- [ ] Code reduction confirmed (50-80%)
- [ ] Functionality same or better
- [ ] No features lost
- [ ] Quality maintained or improved

**Time:** 5-10 min

---

### Test 20: Error Handling & Graceful Degradation

**Test A: Missing voice profile**

```
"Generate content in my voice" (but no voice profile exists)
```

**Expected:**

- voice-matcher Skill detects missing profile
- Offers to run learn-voice first
- Or continues with neutral voice

**Test B: MCP unavailable**

```
Temporarily disable exa MCP
Ask: "Deep research on AI"
```

**Expected:**

- deep-web-research Skill detects exa unavailable
- Logs warning
- Suggests alternative
- Graceful failure (not crash)

**Test C: User declines cost**

```
"Analyze this TikTok: tiktok.com/@user"
When cost shown: decline
```

**Expected:**

- profile-analysis Skill requests approval
- User declines
- Skill exits gracefully
- No cost logged
- Clear message why analysis incomplete

**Validation:**

- [ ] Missing dependencies handled gracefully
- [ ] MCP failures don't crash
- [ ] User choice respected
- [ ] Clear error messages
- [ ] Fallbacks offered when possible

**Time:** 10-15 min

---

## 🎯 QUICK TEST MATRIX

| Test # | Skill Tested          | Trigger                | MCP Used           | Time   | Cost  | Pass/Fail |
| ------ | --------------------- | ---------------------- | ------------------ | ------ | ----- | --------- |
| 1      | social-media-research | "what's trending"      | social-media-mcp   | 3 min  | $0    |           |
| 2      | social-media-research | "research X get facts" | social-media-mcp   | 5 min  | $0    |           |
| 3      | youtube-research      | YouTube URL            | youtube-transcript | 3 min  | $0    |           |
| 4      | profile-analysis      | Instagram URL          | apify              | 5 min  | $0.01 |           |
| 5      | deep-web-research     | "deep dive"            | exa                | 2 min  | $0.10 |           |
| 6      | research-synthesizer  | "organize findings"    | none               | 3 min  | $0    |           |
| 7      | voice-matcher         | "in my voice"          | none               | 2 min  | $0    |           |
| 8      | platform-formatter    | "format for LinkedIn"  | none               | 2 min  | $0    |           |
| 9      | Multi-research        | Complex research       | multiple           | 10 min | $0.50 |           |
| 10     | Profile + Voice       | "analyze + voice"      | apify              | 7 min  | $0.05 |           |
| 11     | Research + Content    | "research + ideas"     | multiple           | 12 min | $0.50 |           |
| 12     | Voice + Format        | "write in my voice"    | none               | 4 min  | $0    |           |
| 13     | Evidence tracking     | "track sources"        | multiple           | 7 min  | $0    |           |
| 14     | Cost tracking         | 3 profiles             | apify              | 12 min | $0.15 |           |
| 15     | research-topic        | Workflow               | multiple           | 15 min | $0.50 |           |
| 16     | analyze-profile       | Workflow               | apify              | 7 min  | $0.01 |           |
| 17     | generate-ideas        | Workflow               | multiple           | 12 min | $0.50 |           |
| 18     | competitive-analysis  | Workflow               | apify              | 15 min | $0.02 |           |
| 19     | Code reduction        | Validation             | none               | 10 min | $0    |           |
| 20     | Error handling        | Edge cases             | multiple           | 15 min | $0    |           |

**Total Time:** ~2.5 hours
**Total Cost:** ~$2.50-3.00

---

## ✅ PASS CRITERIA

### Individual Skills (Tests 1-8)

**Each Skill must:**

- ✅ Invoke autonomously (no explicit /skill-name call)
- ✅ Trigger on correct keywords
- ✅ Call appropriate MCP tools
- ✅ Handle MCP responses correctly
- ✅ Produce specified output format
- ✅ Handle errors gracefully

### Multi-Skill Integration (Tests 9-14)

**Skills must:**

- ✅ Combine automatically for complex questions
- ✅ Not duplicate work (efficient)
- ✅ Share data appropriately
- ✅ Work in correct sequence

### Workflows (Tests 15-18)

**Each workflow must:**

- ✅ Complete without errors
- ✅ Invoke correct Skills autonomously
- ✅ Produce expected outputs
- ✅ Save files correctly
- ✅ Track costs accurately

### Code Quality (Test 19)

- ✅ 50-80% code reduction achieved
- ✅ No functionality lost
- ✅ Simplified = more maintainable

### Error Handling (Test 20)

- ✅ No crashes
- ✅ Graceful degradation
- ✅ Clear user communication
- ✅ Fallbacks work

---

## 📊 TEST EXECUTION LOG TEMPLATE

**For each test, document:**

```markdown
### Test {number}: {Skill/Workflow Name}

**Executed:** {date/time}
**Duration:** {actual_time}
**Cost:** {actual_cost}

**Trigger Used:**
"{exact question/command}"

**What Happened:**

- Skill invoked: {yes/no} (which Skill?)
- MCP called: {yes/no} (which MCP + tool?)
- Output created: {yes/no} (what file/format?)

**Status:** ✅ PASS | ⚠️ PARTIAL | ❌ FAIL

**Issues Found:**

- {any problems, bugs, unexpected behavior}

**Validation Checklist:**

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

**Quality Assessment:**

- Output quality: {excellent|good|acceptable|poor}
- Autonomous invocation: {yes|no|partial}
- MCP integration: {working|issues}

**Notes:**
{observations, improvements needed}
```

---

## 🚀 RECOMMENDED EXECUTION ORDER

### Day 1: Core Skills (1 hour)

**Morning:** Test Research Skills individually

1. Test 1: social-media-research trending
2. Test 2: social-media-research full research
3. Test 3: youtube-research
4. Test 5: deep-web-research
5. Test 6: research-synthesizer

**Afternoon:** Test Integration 6. Test 9: Multi-research combination

---

### Day 2: Profile & Workflows (1.5 hours)

**Morning:** Profile Analysis 7. Test 4: profile-analysis Instagram 8. Test 10: Profile + Voice combination 9. Test 14: Cost tracking (3 profiles)

**Afternoon:** Complete Workflows 10. Test 15: research-topic workflow 11. Test 16: analyze-profile workflow 12. Test 18: competitive-analysis

---

### Day 3: Content & Validation (30 min)

**Morning:** Content Skills 13. Test 7: voice-matcher 14. Test 8: platform-formatter 15. Test 12: Voice + Format combination

**Afternoon:** Validation 16. Test 19: Code reduction validation 17. Test 20: Error handling

---

## 📁 Test Results Storage

**Create:** `jarvis-sidecar/test-results/skills-testing/`

**Files:**

- `test-log.md` - Execution log for all tests
- `skills-validation-report.md` - Final validation summary
- `issues-found.md` - Bugs and problems
- `sample-outputs/` - Example outputs from each Skill

---

## 🎯 SUCCESS METRICS

**Must Achieve:**

- ✅ 8/8 Skills invoke autonomously (100%)
- ✅ 4/4 workflows complete successfully (100%)
- ✅ Multi-skill combination works (90%+)
- ✅ Cost tracking accurate (within 10%)
- ✅ Code reduction validated (50%+)
- ✅ Zero crashes (100%)

**Quality Metrics:**

- Output quality: Good or better (90%+)
- Autonomous invocation: Works consistently (90%+)
- MCP integration: All calls successful (95%+)
- Error handling: Graceful (100%)

---

## 💡 QUICK START

**To begin testing immediately:**

```bash
# Test 1: Simplest test
Just ask Claude: "What's trending about AI tools?"

Expected:
- social-media-research Skill invokes
- Returns trending topics
- No explicit /skill call needed

Time: 2 min
Cost: $0
```

**If Test 1 passes → All Skills likely working correctly**
**If Test 1 fails → Debug Skill descriptions/invocation**

---

**Start with Test 1 to validate the foundation, then proceed systematically!**

**Estimated completion:** 2-3 hours for all 20 tests
**Total budget needed:** ~$3.00 for complete validation
