# Jarvis - Research Skills Testing Plan (FOCUSED)

**Created:** 2025-10-26
**Scope:** ONLY Research Skills (5 Skills)
**Total Tests:** 12 focused test cases
**Estimated Time:** 1.5-2 hours
**Estimated Cost:** ~$1.50-2.00

---

## 🎯 SKILLS BEING TESTED

### Research Skills ONLY (5 Skills):

1. **social-media-research** - social-media-mcp expert (Brave + Perplexity)
2. **youtube-research** - youtube-transcript expert
3. **profile-analysis** - apify multi-platform expert
4. **deep-web-research** - exa expert
5. **research-synthesizer** - Combines all research findings

**NOT Testing (Writing Skills):**

- ❌ voice-matcher (not built or needs refinement)
- ❌ platform-formatter (not built or needs refinement)
- ❌ evidence-tracker (not built or needs refinement)

---

## 🎯 WORKFLOWS BEING TESTED

### Research Workflows ONLY (4 workflows):

1. **research-topic** - Uses all research Skills
2. **analyze-profile** - Uses profile-analysis + research-synthesizer
3. **competitive-analysis** - Uses profile-analysis multiple times
4. **generate-ideas** - Uses research Skills for ideation

**NOT Testing (Writing Workflows):**

- ❌ write-posts (uses writing Skills - separate plan)
- ❌ write-scripts (uses writing Skills - separate plan)
- ⏸️ learn-voice (partially uses profile-analysis but also needs voice processing - may test partially)

---

## 📋 PHASE 1: Individual Research Skill Tests (45 min)

### Test 1: social-media-research - Trending Topics

**Trigger:**

```
"What's trending about AI automation on Twitter?"
```

**Expected Behavior:**

1. Claude recognizes: "trending", "AI automation", "Twitter"
2. Automatically invokes social-media-research Skill
3. Skill calls: `social-media-mcp/get_trending_topics(platform="twitter", category="tech")`
4. Returns: 5-10 trending topics related to AI automation

**Validation:**

- [ ] Skill invoked autonomously (keyword: "trending")
- [ ] social-media-mcp MCP called
- [ ] get_trending_topics tool used
- [ ] Returns trending topics list
- [ ] Hashtags included
- [ ] Volume/mention data present
- [ ] Results formatted clearly

**Time:** 2-3 min
**Cost:** $0

---

### Test 2: social-media-research - Full research_topic

**Trigger:**

```
"Research productivity apps - I need hashtags, key facts, and recent news"
```

**Expected Behavior:**

1. Claude recognizes: "research", "hashtags", "facts", "news"
2. Invokes social-media-research Skill
3. Skill calls: `social-media-mcp/research_topic(topic="productivity apps", includeHashtags=true, includeFacts=true, includeNews=true, includeTrends=true)`
4. Returns complete research package from Brave + Perplexity

**Validation:**

- [ ] Skill invoked with comprehensive research request
- [ ] research_topic called with ALL 4 parameters (includeHashtags, includeFacts, includeNews, includeTrends)
- [ ] Returns:
  - [ ] 5 hashtags
  - [ ] 5-10 facts (sentences with data/stats)
  - [ ] 5 recent news articles (last month)
  - [ ] 3+ trending topics
- [ ] Brave Search results included
- [ ] Perplexity results included (if available)
- [ ] All sources tracked
- [ ] Structured output created

**Time:** 4-5 min
**Cost:** $0 (uses your Brave + OpenAI keys)

---

### Test 3: youtube-research - Transcript Extraction

**Trigger:**

```
"Extract the transcript from this YouTube video: https://youtube.com/watch?v=dQw4w9WgXcQ"
```

**Expected Behavior:**

1. Claude detects YouTube URL
2. Invokes youtube-research Skill
3. Skill calls: `youtube-transcript/get_transcript(url="...", lang="en")`
4. Returns full transcript with timestamps

**Validation:**

- [ ] Skill invoked when YouTube URL provided
- [ ] youtube-transcript MCP called
- [ ] Transcript text returned
- [ ] Timestamps present for all segments
- [ ] Hook analysis performed (first 10 seconds)
- [ ] Structure identified (if recognizable)
- [ ] Quotes extracted (if requested)
- [ ] Formatted output

**Time:** 2-3 min
**Cost:** $0 (FREE)

---

### Test 4: profile-analysis - Instagram Profile

**Trigger:**

```
"Analyze this Instagram profile: instagram.com/natfriedman - quick analysis only"
```

**Expected Behavior:**

1. Claude detects Instagram URL
2. Invokes profile-analysis Skill
3. Skill process:
   - Detects platform: Instagram
   - Calls apify search-actors("instagram profile scraper")
   - Selects actor: apify/instagram-scraper
   - Calculates cost: 20 posts × $0.50/1000 = ~$0.01
   - Displays cost breakdown
   - Asks: "Proceed? [yes/no]"
4. If approved:
   - Calls apify call-actor
   - Waits for completion (20-60s)
   - Calls apify get-actor-output
   - Retrieves 20 posts with engagement
   - Analyzes patterns (hooks, topics, formats, timing)
   - Logs cost to memories.md
5. Creates profile summary

**Validation:**

- [ ] Skill invoked when Instagram URL provided
- [ ] Platform detected correctly: Instagram
- [ ] Apify search-actors called
- [ ] Actor selected: apify/instagram-scraper
- [ ] Cost estimated: ~$0.01
- [ ] Cost displayed to user clearly
- [ ] User approval requested
- [ ] If approved:
  - [ ] call-actor executed
  - [ ] Dataset retrieved
  - [ ] 20 posts fetched
  - [ ] Engagement data present (likes, comments)
  - [ ] Pattern analysis completed:
    - [ ] Hook types categorized (%)
    - [ ] Topic clusters identified (5-8)
    - [ ] Format distribution calculated
    - [ ] Posting times extracted
  - [ ] Top 10 posts ranked by engagement
  - [ ] Cost logged to memories.md
  - [ ] Monthly total updated
- [ ] Profile summary created
- [ ] Recommendations generated (5-7)

**Time:** 3-5 min
**Cost:** ~$0.01 (APPROVE for testing)

---

### Test 5: deep-web-research - exa Deep Researcher

**Trigger:**

```
"Do a deep dive into the AI coding assistants market"
```

**Expected Behavior:**

1. Claude recognizes: "deep dive", "market" (comprehensive research)
2. Invokes deep-web-research Skill
3. Skill calls: `exa/deep_researcher_start(topic="AI coding assistants market")`
4. Displays: "Deep research initiated... (30-60s)"
5. Waits 30-60 seconds
6. Calls: `exa/deep_researcher_check()`
7. Returns comprehensive AI-powered research

**Validation:**

- [ ] Skill invoked when "deep dive" mentioned
- [ ] exa MCP called
- [ ] deep_researcher_start executed
- [ ] Wait period implemented
- [ ] deep_researcher_check called
- [ ] Comprehensive results returned
- [ ] Includes:
  - [ ] Key insights (10+)
  - [ ] Data points
  - [ ] Expert perspectives
  - [ ] Related topics
- [ ] Sources cited
- [ ] Organized output

**Time:** 1-2 min + 30-60s wait
**Cost:** ~$0.10-0.50 (exa API charges)

---

### Test 6: deep-web-research - Quick Web Search

**Trigger:**

```
"Quick web search on automation tools"
```

**Expected Behavior:**

1. Claude recognizes: "web search" (not deep dive)
2. Invokes deep-web-research Skill
3. Skill calls: `exa/web_search_exa(query="automation tools", maxResults=10)`
4. Returns: 10 web results quickly

**Validation:**

- [ ] Skill invoked for web search (not deep research)
- [ ] exa web_search_exa called (not deep_researcher)
- [ ] 10 results returned
- [ ] Each has: title, URL, snippet, date
- [ ] Sources recent (prefer last 3 months)
- [ ] Formatted clearly

**Time:** 2-3 min
**Cost:** ~$0.05 (exa API)

---

### Test 7: research-synthesizer - Combine Findings

**Setup:** Run Tests 2, 3, 6 first to gather research

**Trigger:**

```
"Organize all these research findings into a comprehensive brief"
```

**Expected Behavior:**

1. Claude recognizes: "organize", "findings", "brief"
2. Invokes research-synthesizer Skill
3. Skill:
   - Gathers findings from previous Skills (social-media-research, youtube-research, deep-web-research)
   - Organizes into 5 categories
   - Creates synthesis
   - Generates content angles

**Validation:**

- [ ] Skill invoked after multi-source research
- [ ] All previous findings gathered correctly
- [ ] 5 categories created and populated:
  - [ ] Trends & Timing (from social-media-research)
  - [ ] Data & Statistics (from all sources)
  - [ ] Examples & Case Studies (from youtube-research)
  - [ ] Quotes & Expert Opinions (from all)
  - [ ] Gaps & Opportunities (from synthesis)
- [ ] Executive summary created (3-5 key points)
- [ ] 10-12 content angles generated
- [ ] All angles have:
  - [ ] Title (specific)
  - [ ] Description
  - [ ] Platform recommendation
  - [ ] Supporting research cited
- [ ] Research brief file created
- [ ] All evidence tracked

**Time:** 5-7 min
**Cost:** $0 (synthesis only)

---

## 📋 PHASE 2: Multi-Skill Integration Tests (30 min)

### Test 8: Full Multi-Source Research

**Trigger:**

```
"Research AI automation - get trending topics, YouTube examples, and deep web data"
```

**Expected Behavior:**

1. Claude analyzes complex request
2. **Automatically invokes 3 Skills:**
   - social-media-research (trending topics)
   - youtube-research (examples)
   - deep-web-research (web data)
3. **Then invokes:**
   - research-synthesizer (combines all)

**Validation:**

- [ ] All 4 Skills invoked automatically
- [ ] Executed in logical order (research first, synthesis last)
- [ ] No duplicate work
- [ ] Data shared between Skills correctly
- [ ] Final synthesis includes findings from all 3 sources
- [ ] Complete research brief created
- [ ] All categories populated

**Time:** 12-15 min (includes wait times)
**Cost:** ~$0.50-1.00 (exa + potential social-media costs)

---

### Test 9: Profile Analysis for Voice Building

**Trigger:**

```
"Fetch my posts from Instagram to analyze my writing style"
```

**Expected Behavior:**

1. Claude recognizes: Instagram + "my posts" (user's own account)
2. Invokes profile-analysis Skill
3. Skill fetches YOUR posts (not competitor)
4. Returns posts for voice analysis

**Validation:**

- [ ] profile-analysis Skill invoked
- [ ] Detects it's YOUR account (cost optimization opportunity)
- [ ] Fetches posts via apify
- [ ] Returns post texts (for voice analysis)
- [ ] Cost logged
- [ ] Posts ready for voice pattern extraction

**Note:** Voice pattern extraction would be done by voice-matcher Skill (not testing that today)

**Time:** 3-5 min
**Cost:** ~$0.01-0.05

---

### Test 10: Multi-Platform Profile Comparison

**Trigger:**

```
"Compare these two Instagram profiles: instagram.com/user1 and instagram.com/user2"
```

**Expected Behavior:**

1. Claude detects 2 Instagram URLs
2. Invokes profile-analysis Skill TWICE
3. First: Analyze user1
4. Second: Analyze user2
5. Compares results

**Validation:**

- [ ] profile-analysis invoked 2 times
- [ ] Both profiles analyzed
- [ ] Patterns extracted for both
- [ ] Comparison generated
- [ ] Cost logged for both (2 separate entries)
- [ ] Monthly total accumulates correctly

**Time:** 7-10 min
**Cost:** ~$0.02 (2 profiles)

---

### Test 11: Research with Evidence Tracking

**Trigger:**

```
"Research productivity tools and make sure to track all sources carefully"
```

**Expected Behavior:**

1. Claude invokes research Skills
2. Throughout research, tracks:
   - Source URLs for all findings
   - Timestamps for YouTube quotes
   - Publication dates for articles
   - Confidence scores for all data

**Validation:**

- [ ] Research Skills invoked
- [ ] All findings have source URLs
- [ ] Video quotes have timestamps
- [ ] Confidence scores assigned (high/medium/low)
- [ ] Evidence log created
- [ ] No unsourced claims

**Time:** 8-10 min
**Cost:** ~$0.50

---

### Test 12: Cost Tracking Across Multiple Skills

**Trigger:**

```
"Analyze 3 profiles: Instagram user1, TikTok user2, Twitter user3"
```

**Expected Behavior:**

1. profile-analysis Skill invoked 3 times (once per platform)
2. Each invocation:
   - Estimates cost
   - Asks approval
   - Executes if approved
   - Logs cost separately
3. All costs accumulate in memories.md

**Validation:**

- [ ] 3 separate cost estimates shown
- [ ] User approval requested 3 times
- [ ] 3 separate log entries in memories.md:
  - [ ] Instagram analysis: $0.01
  - [ ] TikTok analysis: $0.50
  - [ ] Twitter analysis: $0.02
- [ ] Monthly total: $0.53 (cumulative)
- [ ] Budget tracking: $0.53/$10.00

**Time:** 12-15 min
**Cost:** ~$0.53 (approve for testing)

---

## 📋 PHASE 3: Research Workflow Tests (45 min)

### Test 13: research-topic Workflow (Simplified)

**Command:**

```
/jarvis
> research-topic

Inputs:
- topic: "no-code automation platforms"
- depth: "standard"
- focus_areas: ["trends", "examples", "data"]
```

**Expected Behavior:**

1. Workflow initiates and sets context
2. **Claude autonomously invokes (based on focus_areas):**
   - social-media-research Skill (trends)
   - youtube-research Skill (examples)
   - deep-web-research Skill (data)
3. research-synthesizer combines all
4. Research brief saved
5. Summary presented

**Validation:**

- [ ] Workflow completed without errors
- [ ] Skills invoked based on focus_areas (not hardcoded)
- [ ] social-media-research executed (trends)
- [ ] youtube-research executed (examples)
- [ ] deep-web-research executed (data)
- [ ] research-synthesizer combined all
- [ ] Research brief file created: `sessions/research-no-code_automation_platforms-{date}.md`
- [ ] File contains:
  - [ ] All 5 categories populated
  - [ ] Trends & Timing (from social-media-research)
  - [ ] Data & Statistics (from deep-web-research + social-media-research facts)
  - [ ] Examples & Case Studies (from youtube-research)
  - [ ] Quotes & Expert Opinions (from all)
  - [ ] Gaps & Opportunities (from synthesis)
  - [ ] 10-12 content angles
  - [ ] Complete evidence log
  - [ ] Overall confidence score
- [ ] Summary displayed to user
- [ ] Next steps suggested

**Time:** 12-15 min
**Cost:** ~$0.50-1.00

---

### Test 14: analyze-profile Workflow

**Command:**

```
/jarvis
> analyze-profile

Inputs:
- profile_url: "instagram.com/example"
- platform: "auto" (should detect Instagram)
- analysis_depth: "quick" (20 posts)
```

**Expected Behavior:**

1. Workflow starts
2. Claude invokes profile-analysis Skill
3. Skill handles:
   - Platform detection
   - Apify actor selection
   - Cost calculation
   - User approval
   - Scraping execution
   - Pattern analysis
   - Cost logging
4. Profile summary created

**Validation:**

- [ ] Workflow completed
- [ ] profile-analysis Skill invoked
- [ ] Platform auto-detected: Instagram
- [ ] analysis_depth respected (20 posts)
- [ ] Cost shown and approved
- [ ] Profile summary file created
- [ ] Contains:
  - [ ] Profile overview (bio, followers, cadence)
  - [ ] Content strategy (mix, topics, hooks, timing)
  - [ ] Top 10 posts with URLs
  - [ ] Pattern analysis (hooks %, topics, formats)
  - [ ] 5-7 recommendations
  - [ ] Evidence log
  - [ ] Confidence score
- [ ] Cost logged to memories.md

**Time:** 5-7 min
**Cost:** ~$0.01

---

### Test 15: competitive-analysis Workflow

**Command:**

```
/jarvis
> competitive-analysis

Inputs:
- your_profiles: ["instagram.com/your_profile"]
- competitor_profiles: ["instagram.com/comp1", "instagram.com/comp2"]
```

**Expected Behavior:**

1. Workflow orchestrates
2. Claude invokes profile-analysis Skill 3 times:
   - Once for your profile
   - Once for competitor 1
   - Once for competitor 2
3. Compares all 3 profiles
4. Generates gap analysis
5. Creates action plan

**Validation:**

- [ ] Workflow completed
- [ ] profile-analysis Skill invoked 3 separate times
- [ ] All 3 profiles analyzed
- [ ] Comparison matrix created with:
  - [ ] Follower counts
  - [ ] Posting frequency
  - [ ] Content mix (% text/image/video)
  - [ ] Top topics
  - [ ] Hook types
  - [ ] Engagement rates
- [ ] Gap analysis generated:
  - [ ] Topic gaps identified
  - [ ] Format gaps identified
  - [ ] Hook gaps identified
  - [ ] Timing gaps identified
- [ ] 3 differentiation strategies created
- [ ] 7-day action plan with specific ideas
- [ ] All costs logged (3 entries)
- [ ] Total cost tracked

**Time:** 12-18 min (3 profiles)
**Cost:** ~$0.03 (3× $0.01)

---

### Test 16: generate-ideas Workflow (Research Focus)

**Command:**

```
/jarvis
> generate-ideas

Inputs:
- seed_topic: "AI productivity tools"
- target_platforms: ["linkedin", "youtube"]
- idea_count: 5
- use_trends: true
```

**Expected Behavior:**

1. Workflow initiates
2. Claude invokes:
   - social-media-research (trends, hashtags, facts)
   - deep-web-research (insights, data)
3. research-synthesizer organizes
4. 5 Idea Cards generated

**Validation:**

- [ ] Workflow completed
- [ ] social-media-research invoked (trends + hashtags)
- [ ] deep-web-research invoked (if needed for more data)
- [ ] 5 Idea Cards created
- [ ] Each card contains:
  - [ ] Specific title
  - [ ] Why now (trend evidence)
  - [ ] Hook line
  - [ ] Outline (3-5 beats)
  - [ ] CTA
  - [ ] Hashtags (from social-media-research!)
  - [ ] Evidence (sources cited)
  - [ ] Platform fit (linkedin or youtube)
  - [ ] Confidence score
- [ ] Idea Cards file saved

**Time:** 10-12 min
**Cost:** ~$0.50

---

## 📋 PHASE 4: Edge Cases & Error Handling (30 min)

### Test 17: Skill Not Available Scenario

**Test:** Temporarily rename a Skill folder to "disable" it

**Trigger:**

```
Rename: social-media-research → social-media-research-disabled
Ask: "What's trending about AI?"
```

**Expected Behavior:**

- Claude tries to invoke social-media-research
- Skill not found
- Falls back to alternative approach or asks user for help

**Validation:**

- [ ] Graceful handling (no crash)
- [ ] Clear message if Skill missing
- [ ] Fallback strategy offered

**Restore:** Rename back after test

**Time:** 5 min

---

### Test 18: MCP Unavailable Scenario

**Test:** Temporarily disable social-media-mcp

**Trigger:**

```
(With social-media-mcp disabled)
"Research AI tools and get trending topics"
```

**Expected Behavior:**

- social-media-research Skill invokes
- Tries to call social-media-mcp
- MCP unavailable
- Skill logs error
- Offers fallback or partial results

**Validation:**

- [ ] Skill handles MCP failure gracefully
- [ ] Error logged (not crashed)
- [ ] User informed clearly
- [ ] Fallback offered (use exa instead, or manual research)

**Restore:** Re-enable social-media-mcp after test

**Time:** 5 min

---

### Test 19: User Declines Cost

**Trigger:**

```
"Analyze this TikTok profile: tiktok.com/@user"
When cost shown (~$0.50): Select "no"
```

**Expected Behavior:**

- profile-analysis Skill invokes
- Detects TikTok
- Estimates cost: ~$0.50
- Asks approval
- User declines
- Skill exits gracefully

**Validation:**

- [ ] Cost estimated correctly
- [ ] User approval requested
- [ ] User choice respected
- [ ] Skill exits gracefully (no error)
- [ ] Clear message: "Analysis cancelled by user"
- [ ] No cost logged (user declined)
- [ ] No partial/broken output

**Time:** 2-3 min
**Cost:** $0 (declined)

---

### Test 20: Complex Multi-Platform Research

**Trigger:**

```
"I want to research 'automation tools' - get trending topics from Twitter, find YouTube tutorials, analyze 2 Instagram influencers in this space, and do deep web research on the market"
```

**Expected Behavior:**

1. Claude breaks down complex request
2. **Invokes ALL research Skills:**
   - social-media-research (Twitter trends)
   - youtube-research (tutorials)
   - profile-analysis (2 Instagram influencers)
   - deep-web-research (market analysis)
3. research-synthesizer combines everything
4. Creates massive research brief

**Validation:**

- [ ] All 5 research Skills invoked
- [ ] Correct Skills for each sub-task
- [ ] Skills execute in parallel where possible
- [ ] All data combined correctly
- [ ] Comprehensive brief created
- [ ] Handles complexity without confusion
- [ ] All costs tracked (Instagram profiles)

**Time:** 20-25 min
**Cost:** ~$1.50-2.00 (comprehensive test)

---

## ✅ PASS CRITERIA

### Individual Skills (Tests 1-7)

**Each Skill must:**

- ✅ Invoke autonomously on correct triggers
- ✅ Call appropriate MCP correctly
- ✅ Handle MCP responses properly
- ✅ Produce specified output format
- ✅ Track sources/evidence
- ✅ Handle errors gracefully

### Multi-Skill Integration (Tests 8-12)

**Skills must:**

- ✅ Combine automatically for complex questions
- ✅ Execute in logical sequence
- ✅ Share data efficiently
- ✅ No conflicts or duplicates
- ✅ Synthesis works correctly

### Workflows (Tests 13-16)

**Each workflow must:**

- ✅ Complete without errors
- ✅ Invoke correct Skills autonomously
- ✅ Respect user parameters (depth, focus_areas, etc.)
- ✅ Create expected output files
- ✅ Track costs accurately
- ✅ Present clear summaries

### Error Handling (Tests 17-19)

- ✅ No crashes
- ✅ Graceful degradation
- ✅ Clear user messages
- ✅ Fallbacks offered

### Complexity Handling (Test 20)

- ✅ Complex requests parsed correctly
- ✅ All relevant Skills invoked
- ✅ Results combined coherently

---

## 📊 TEST EXECUTION LOG

**Create:** `jarvis-sidecar/test-results/skills-testing/research-skills-test-log.md`

**Format for each test:**

```markdown
## Test {number}: {Skill/Workflow Name}

**Date:** {timestamp}
**Duration:** {actual_time}
**Cost:** {actual_cost}

**Trigger:**
"{exact question or command}"

**Skills Invoked:**

- {skill_1}: {yes/no}
- {skill_2}: {yes/no}
- {skill_3}: {yes/no}

**MCPs Called:**

- {mcp_name}/{tool_name}: {yes/no} ({success/fail})

**Outputs Created:**

- {file_path or data structure}

**Status:** ✅ PASS | ⚠️ PARTIAL | ❌ FAIL

**Issues:**

- {bugs, unexpected behavior, improvements needed}

**Validation:**
{checklist results}

**Quality:**

- Autonomous invocation: {yes/no}
- Output quality: {excellent|good|acceptable|poor}
- MCP integration: {working|issues}

---
```

---

## 🚀 RECOMMENDED EXECUTION ORDER

### Quick Validation (15 min) - Start Here

**Run these 3 tests first to validate foundation:**

1. **Test 1** - social-media-research trending (2 min, $0)
2. **Test 3** - youtube-research transcript (3 min, $0)
3. **Test 4** - profile-analysis Instagram (5 min, $0.01)

**If all 3 pass → Skills working, proceed with full testing**
**If any fail → Debug Skill invocation before continuing**

---

### Full Individual Skill Testing (30 min)

4. Test 2 - social-media-research full
5. Test 5 - deep-web-research deep dive
6. Test 6 - deep-web-research quick
7. Test 7 - research-synthesizer

---

### Integration & Workflows (1 hour)

8. Test 8 - Multi-source research
9. Test 9 - Profile for voice
10. Test 10 - Multi-platform comparison
11. Test 13 - research-topic workflow
12. Test 14 - analyze-profile workflow
13. Test 15 - competitive-analysis workflow
14. Test 16 - generate-ideas workflow

---

### Edge Cases & Final (30 min)

15. Test 11 - Evidence tracking
16. Test 12 - Cost tracking
17. Test 17 - Skill unavailable
18. Test 18 - MCP unavailable
19. Test 19 - User declines cost
20. Test 20 - Complex multi-platform

---

## 💡 SUCCESS METRICS

**Minimum Acceptable:**

- ✅ 80% of tests pass (16/20)
- ✅ All 5 Skills invoke correctly
- ✅ All 4 workflows complete
- ✅ Cost tracking accurate
- ✅ No crashes

**Target:**

- ✅ 90% of tests pass (18/20)
- ✅ All autonomous invocations work
- ✅ Multi-skill combinations seamless
- ✅ Output quality high

**Excellent:**

- ✅ 95%+ tests pass (19-20/20)
- ✅ Zero issues found
- ✅ All edge cases handled
- ✅ Production-ready

---

## 🎯 TESTING SHORTCUTS

### Minimal Testing (If time-constrained)

**Must-test (30 min):**

- Test 1: social-media-research
- Test 3: youtube-research
- Test 4: profile-analysis
- Test 7: research-synthesizer
- Test 13: research-topic workflow

**This validates:**

- All Skills invoke
- Skills combine
- Complete workflow works

---

### Comprehensive Testing (Full validation)

**All 20 tests (2-3 hours)**

- Proves production-readiness
- Identifies all edge cases
- Documents all behaviors

---

## 📋 QUICK REFERENCE

**Skills to Test:** 5 (research only)
**Workflows to Test:** 4 (research only)
**MCPs Used:** 4 (all working)
**Total Tests:** 20
**Time:** 2-3 hours
**Budget:** ~$2.00

**Start with:** Test 1 (simplest, $0, 2 min)

---

**Ready to begin testing the Research Skills?**

Start with Test 1: "What's trending about AI tools?" and validate autonomous invocation works!
