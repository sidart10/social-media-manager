# Epic 2: Notion Integration - Comprehensive Testing Guide

**Purpose:** Validate all Epic 2 acceptance criteria before marking complete
**Estimated Time:** 4-6 hours
**Prerequisites:** Notion MCP configured, Content Tracker database accessible

---

## Pre-Test Setup

### **1. Verify Notion MCP Configuration**

```bash
# Check if Notion MCP is in Claude Code settings
# Should see: notion server with authentication token
```

**Verify Access:**
- ✅ Notion integration has access to Content Dashboard
- ✅ Can read Content Tracker database
- ✅ Can write to Content Tracker, Keywords, Channels databases

---

### **2. Create Test Content in Notion**

**Create 3 test pages in Content Tracker:**

**Test Page 1: "Test - AI Agents Research"**
- Status: "Idea"
- Category: "Tech Insights"
- Priority: "2nd Priority"
- Channel: (empty)
- Keywords: (empty)

**Test Page 2: "Test - LinkedIn Post Draft"**
- Status: "Research"
- Category: "AI Products"
- Description: "Research complete, ready to write"

**Test Page 3: "Test - Post Ready for Visuals"**
- Status: "Editing"
- Content Text: "This is a test LinkedIn post about AI agents. No images yet."
- (Intentionally no .png/.jpg in Content Text)

---

## Test Suite 1: Story 5.1 (Status-Aware Triggering)

**Total Tests:** 6 | **Estimated Time:** 1 hour

### **Test 1.1: Jarvis Status Suggestions**

**Setup:**
- Ensure Test Page 1 exists with Status="Idea"
- Ensure Test Page 2 exists with Status="Research"

**Execution:**
```bash
# Invoke Jarvis
/jarvis
```

**Expected Output:**
```
📊 Found 2 content items in Notion:

  • 1 idea waiting for research
    Top 1: "Test - AI Agents Research"
    → Suggest: *research-topic or *generate-ideas

  • 1 item researched, ready to write
    Top 1: "Test - LinkedIn Post Draft"
    → Suggest: *write-post

📋 Jarvis Menu:
1. research-topic
2. analyze-profile
...
```

**Pass Criteria:**
- [ ] Query completes in <5 seconds
- [ ] Displays correct count (2 items)
- [ ] Shows correct titles
- [ ] Suggests relevant workflows
- [ ] Menu still displays (not forced to follow suggestions)

**If Fails:**
- Check Notion MCP authentication
- Check data_source_url matches Content Tracker
- Check Graveyard filter working

---

### **Test 1.2: Zoe Media Detection**

**Setup:**
- Ensure Test Page 3 exists with Status="Editing", no images in Content Text

**Execution:**
```bash
/zoe
# or /ai-image-generator (before Epic 3 merge)
```

**Expected Output:**
```
🎨 Found 1 post ready for visuals:

  Top 1: "Test - Post Ready for Visuals"
  → Suggest: *create-single-image for thumbnails

🎨 Zoe Menu:
1. create-single-image (SUGGESTED!)
...
```

**Pass Criteria:**
- [ ] Detects Status="Editing"
- [ ] Identifies content without media (no .png/.jpg in Content Text)
- [ ] Suggests create-single-image
- [ ] Menu displays

---

### **Test 1.3: Zoro Publish-Ready Detection**

**Setup:**
- Update Test Page 3: Add "Image: thumbnail-main.png" to Content Text (simulates media ready)

**Execution:**
```bash
/zoro
# or /social-posting-agent
```

**Expected Output:**
```
📤 Found 1 item ready for publishing:

  • 1 post with media ready:
    Top 1: "Test - Post Ready for Visuals"
    → Suggest: *schedule-post (Postiz multi-platform)

📤 Zoro Menu:
1. schedule-post (SUGGESTED!)
...
```

**Pass Criteria:**
- [ ] Detects Status="Editing"
- [ ] Identifies media present (finds .png in Content Text)
- [ ] Suggests schedule-post
- [ ] Menu displays

---

### **Test 1.4: Error Handling - Notion Unavailable**

**Setup:**
- Temporarily break Notion MCP (wrong token, disconnect network)

**Execution:**
```bash
/jarvis
```

**Expected Output:**
```
⚠️ Couldn't check Notion (network/auth issue), showing standard menu

📋 Jarvis Menu:
1. research-topic
...
```

**Pass Criteria:**
- [ ] Doesn't crash or hang
- [ ] Displays error message
- [ ] Shows standard menu (graceful degradation)
- [ ] Agent still functional

---

### **Test 1.5: Empty Results (No Content Found)**

**Setup:**
- Archive all test pages (set Graveyard=true) or delete

**Execution:**
```bash
/jarvis
```

**Expected Output:**
```
📋 Jarvis Menu:
1. research-topic
...
```

**Pass Criteria:**
- [ ] No crash when zero results
- [ ] Proceeds directly to standard menu
- [ ] No confusing messages

---

### **Test 1.6: Query Performance**

**Execution:**
- Time the Notion query in Test 1.1

**Pass Criteria:**
- [ ] Query completes in <5 seconds
- [ ] No noticeable lag before menu displays

**If Slow:**
- Consider caching results for 60 seconds
- Or make query async (show menu immediately, update with suggestions)

---

## Test Suite 2: Story 5.2 (Agent Status Updates)

**Total Tests:** 8 | **Estimated Time:** 2 hours

### **Test 2.1: research-topic Status Update**

**Setup:**
- Test Page 1 with Status="Idea"

**Execution:**
```bash
/jarvis
*research-topic
# Provide topic: "Test topic"
# Depth: quick (free)
# Complete workflow
```

**Expected:**
- Research brief generated locally
- At end: "✅ Notion updated: Idea → Research"
- Check Notion: Test Page 1 Status should be "Research"

**Pass Criteria:**
- [ ] Status transitions from "Idea" to "Research"
- [ ] Transition logged to session-log.md
- [ ] No errors during update
- [ ] If Notion fails, workflow still completes

---

### **Test 2.2: generate-ideas Page Creation**

**Execution:**
```bash
/jarvis
*generate-ideas
# Seed topic: "AI automation"
# Idea count: 3
# Use research file: none
# Complete workflow
```

**Expected:**
- 3 idea cards generated locally
- At end: "📊 Notion Summary: Created 3 of 3 pages"
- Check Notion: 3 new pages with Status="Idea", linked to Channel, linked to Keywords

**Pass Criteria:**
- [ ] 3 new Notion pages created
- [ ] All have Status="Idea"
- [ ] Channel relations linked (e.g., "LinkedIn & X" if platform=LinkedIn)
- [ ] Keywords linked (new keywords created if didn't exist)
- [ ] Page URLs saved to metadata.json

---

### **Test 2.3: Transition Validation (Forward-Only)**

**Setup:**
- Create test page with Status="Posted"

**Execution:**
```bash
# Try to run research-topic on this page
# (Should fail - can't go Posted → Research)
```

**Expected:**
- Validation prevents invalid transition
- Error: "Cannot transition Posted → Research"
- Workflow continues with local outputs only

**Pass Criteria:**
- [ ] Invalid transitions blocked
- [ ] Error message clear
- [ ] Workflow doesn't crash

---

### **Test 2.4: User Manual Override**

**Setup:**
- Manually set Test Page 1 Status to "Writing" in Notion (skip "Research")

**Execution:**
```bash
# Agent sees Status="Writing" (not following normal flow)
# Should respect user's manual choice
```

**Pass Criteria:**
- [ ] Agent doesn't force status back to "Research"
- [ ] Agent respects manually-set status
- [ ] Collaborative model working

---

### **Test 2.5: Cloudinary Upload (create-single-image)**

**Execution:**
```bash
/zoe
*create-single-image
# Create LinkedIn image
# Choose: Upload to Cloudinary? yes
```

**Expected:**
- Image generated locally
- Uploaded to Cloudinary
- URL returned: https://res.cloudinary.com/.../image.png
- Notion updated with URL
- Status stays "Editing"

**Pass Criteria:**
- [ ] Cloudinary upload succeeds
- [ ] Public URL obtained
- [ ] Notion updated with URL
- [ ] Image accessible via URL (test in browser)

---

### **Test 2.6: Carousel Cloudinary Upload**

**Execution:**
```bash
/zoe
*create-carousel
# Topic: "AI tools"
# Slide count: 3
# Upload to Cloudinary? yes
```

**Expected:**
- 3 slides generated
- All 3 uploaded to Cloudinary
- Notion updated with all 3 URLs
- cloudinary_urls.json saved

**Pass Criteria:**
- [ ] All 3 slides uploaded
- [ ] 3 public URLs obtained
- [ ] Notion has all URLs
- [ ] No duplicates or errors

---

### **Test 2.7: schedule-post End-to-End**

**Setup:**
- Have test content with Status="Editing"
- Have image in 04-media/images/test-thumbnail.png

**Execution:**
```bash
/zoro
*schedule-post
# Platforms: LinkedIn, Twitter
# Content: "Test post for validation"
# Media: 04-media/images/test-thumbnail.png
# Schedule: tomorrow 9am UTC
```

**Expected Flow:**
1. Uploads test-thumbnail.png to Cloudinary → Gets URL
2. Queries Postiz integrations → Shows connected accounts
3. Validates content for LinkedIn + Twitter → Passes
4. Schedules via Postiz → Success for both platforms
5. Saves to 05-published/linkedin/ and 05-published/twitter/
6. Updates Notion: Publish Date = tomorrow 9am, Status stays "Editing"
7. Links to Channels: "LinkedIn & X"

**Pass Criteria:**
- [ ] Cloudinary upload works
- [ ] Postiz scheduling succeeds
- [ ] Content saved to both platform folders
- [ ] Notion updated correctly
- [ ] Can view in Postiz dashboard
- [ ] Channels linked

---

### **Test 2.8: Concurrent Updates (Race Condition Test)**

**Setup:**
- Single Notion page

**Execution:**
```bash
# Simulate: Jarvis updates Content Text, Zoe adds image URL simultaneously
# (Hard to test without parallel execution, conceptual test)
```

**Expected:**
- Both updates succeed (last-write-wins for properties)
- No data loss
- No errors

**Pass Criteria:**
- [ ] No race condition errors
- [ ] Both updates persist
- [ ] Notion handles concurrent writes

---

## Test Suite 3: Story 5.3 (Relational Data)

**Total Tests:** 5 | **Estimated Time:** 1.5 hours

### **Test 3.1: Channel Linking**

**Execution:**
- Run generate-ideas with platform="LinkedIn"
- Check created Notion page

**Expected:**
- Page linked to "LinkedIn & X" channel via Channel relation

**Pass Criteria:**
- [ ] Channel relation exists
- [ ] Correct channel ("LinkedIn & X" for LinkedIn platform)
- [ ] Can click relation in Notion to view channel

---

### **Test 3.2: Keyword Creation (New)**

**Execution:**
- Run generate-ideas with keywords: ["brand new keyword 12345", "another unique keyword"]

**Expected:**
- 2 new pages created in Keywords DB
- Both linked to content via Focus Keywords relation

**Pass Criteria:**
- [ ] New keywords created in Keywords DB
- [ ] Keywords linked to content page
- [ ] Can navigate: Content → Keywords

---

### **Test 3.3: Keyword Finding (Existing)**

**Execution:**
- Manually create keyword "ai agents" in Keywords DB
- Run generate-ideas with keyword "ai agents"

**Expected:**
- Finds existing keyword (doesn't create duplicate)
- Links to existing keyword page

**Pass Criteria:**
- [ ] No duplicate keywords created
- [ ] Links to existing keyword
- [ ] find_or_create_keyword() find logic works

---

### **Test 3.4: Analytics Tracking**

**Execution:**
- Run schedule-post
- After "publication" (or simulate), add analytics
- Enter: Views=150, Likes=12, Comments=3

**Expected:**
- Notion page updated with Views=150, Likes=12, Comments=3
- View Performance calculated: "Okay" (50-200 views)
- Status updated to "Posted"

**Pass Criteria:**
- [ ] Numeric properties updated
- [ ] Performance tier calculated correctly
- [ ] Status transitions to "Posted"

---

### **Test 3.5: Multi-Channel Linking**

**Execution:**
- Run schedule-post with platforms: [LinkedIn, Twitter, Facebook]

**Expected:**
- Single Notion page linked to "LinkedIn & X" channel AND "Facebook" channel (multi-relation)

**Pass Criteria:**
- [ ] Multiple channel relations work
- [ ] Both channels visible in Notion page
- [ ] No errors or duplicates

---

## Test Suite 4: Integration Testing

**Total Tests:** 3 | **Estimated Time:** 1.5 hours

### **Test 4.1: Full Content Pipeline (End-to-End)**

**Scenario:** Idea → Research → Generated Content → Visuals → Published

**Execution:**
1. Create Notion page: "E2E Test - AI Agents Post", Status="Idea"
2. Run `/jarvis` → Should suggest *research-topic
3. Run `*research-topic` → Status should become "Research"
4. Run `*generate-ideas` (using research) → Creates new ideas with Status="Idea"
5. Run `*write-post` (when created) → Status becomes "Writing" → "Editing"
6. Run `/zoe` → Should suggest *create-single-image
7. Run `*create-single-image` → Uploads to Cloudinary, adds URL to Notion
8. Run `/zoro` → Should suggest *schedule-post
9. Run `*schedule-post` → Schedules via Postiz, updates Notion

**Pass Criteria:**
- [ ] Each step transitions status correctly
- [ ] All Notion updates succeed
- [ ] Cloudinary URLs work
- [ ] Postiz scheduling works
- [ ] End state: Status="Posted" (or "Editing" with future Publish Date)

---

### **Test 4.2: Error Recovery**

**Scenario:** Notion becomes unavailable mid-workflow

**Execution:**
1. Start research-topic workflow
2. Disconnect network or break Notion MCP mid-workflow
3. Complete workflow

**Expected:**
- Research continues
- Local outputs saved
- Error logged: "Notion update failed"
- Display: "⚠️ Notion unavailable - continuing with local outputs"
- Workflow completes successfully

**Pass Criteria:**
- [ ] Workflow doesn't crash
- [ ] Local outputs still saved
- [ ] Error message displayed
- [ ] User can continue working

---

### **Test 4.3: Performance Under Load**

**Execution:**
1. Create 10 ideas via generate-ideas
2. Measure time for Notion page creation

**Expected:**
- Each page creation <3 seconds
- Total time for 10 pages <30 seconds
- No timeouts or rate limit errors

**Pass Criteria:**
- [ ] Reasonable performance
- [ ] No Notion rate limiting
- [ ] All 10 pages created successfully

---

## Test Suite 5: Edge Cases

**Total Tests:** 5 | **Estimated Time:** 1 hour

### **Test 5.1: Notion Page Not Linked (Local-Only Project)**

**Execution:**
- Run research-topic without Notion page linked (metadata.notion.page_url is empty or null)

**Expected:**
- Displays: "ℹ️ No Notion page linked (local-only project)"
- Workflow continues normally
- All outputs saved locally
- No errors

**Pass Criteria:**
- [ ] Works without Notion
- [ ] Clear message to user
- [ ] No crashes

---

### **Test 5.2: Invalid Platform Name**

**Execution:**
- Run generate-ideas with platform="TikTok" (if channel doesn't exist)

**Expected:**
- Page created successfully
- Channel linking fails gracefully
- Warning: "⚠️ Channel not found: TikTok (create in Notion)"
- Page still created (partial success)

**Pass Criteria:**
- [ ] Doesn't block page creation
- [ ] Clear warning message
- [ ] User can add channel manually later

---

### **Test 5.3: Duplicate Keyword Handling**

**Execution:**
- Create keyword "test keyword" in Keywords DB
- Run generate-ideas with keyword "test keyword" twice

**Expected:**
- First time: Links to existing
- Second time: Still links to same (no duplicate)
- Only 1 keyword page exists

**Pass Criteria:**
- [ ] No duplicate keywords
- [ ] find_or_create_keyword() find logic works
- [ ] Relation appends (doesn't replace)

---

### **Test 5.4: Long Content Text (Notion Limit)**

**Execution:**
- Run generate-ideas with very long description (>2000 chars)

**Expected:**
- Notion API may reject (property length limit)
- Error handling catches this
- Page created with truncated description or error logged

**Pass Criteria:**
- [ ] Doesn't crash
- [ ] Error handled gracefully
- [ ] Either truncates or fails gracefully

---

### **Test 5.5: Special Characters in Titles**

**Execution:**
- Create idea with title: "Test: How "AI" Works & Why It Matters"

**Expected:**
- Notion page created with proper escaping
- Title displays correctly in Notion
- No parsing errors

**Pass Criteria:**
- [ ] Special chars handled (quotes, colons, ampersands)
- [ ] Title readable in Notion
- [ ] No errors

---

## Acceptance Criteria Validation

### **Story 5.1: Status-Aware Triggering**

- [ ] AC1: All 3 agents check Notion before menu → **Test 1.1, 1.2, 1.3**
- [ ] AC2: Jarvis suggests for Idea/Research/Next Up → **Test 1.1**
- [ ] AC3: Zoe suggests for Editing without media → **Test 1.2**
- [ ] AC4: Zoro suggests for Editing with media → **Test 1.3**
- [ ] AC5: Query uses correct filters (Status, Graveyard=false) → **Test 1.1-1.3**
- [ ] AC6: Top 3 titles displayed → **Test 1.1-1.3**
- [ ] AC7: User can override suggestions → **All tests**
- [ ] AC8: Execution time <5 seconds → **Test 1.6**

---

### **Story 5.2: Agent Status Updates**

- [ ] AC1: Jarvis workflows update status → **Test 2.1, 2.2**
- [ ] AC2: Zoe workflows update status → **Test 2.5, 2.6**
- [ ] AC3: Zoro workflows update status → **Test 2.7**
- [ ] AC4: Each update includes agent name, timestamp → **Test 2.1**
- [ ] AC5: Updates are immediate (not batch) → **Test 2.1**
- [ ] AC6: Notion failures don't block workflows → **Test 4.2**
- [ ] AC7: User manual overrides respected → **Test 2.4**
- [ ] AC8: Execution time 1-2 seconds per update → **Test 1.6**
- [ ] AC9: Status transition rules enforced → **Test 2.3**
- [ ] AC10: Transition logging works → **Test 2.1**
- [ ] AC11: Invalid status handling → **Test 5.4**
- [ ] AC12: Concurrent updates handled → **Test 2.8**

---

### **Story 5.3: Relational Data**

- [ ] AC1: generate-ideas creates relational links → **Test 3.1, 3.2**
- [ ] AC2: Keywords searched/created → **Test 3.2, 3.3**
- [ ] AC3: Channels linked → **Test 3.1**
- [ ] AC4: Analytics tracked → **Test 3.4**
- [ ] AC5: Relations use page URLs → **All relational tests**
- [ ] AC6: No orphan references → **Test 3.2**
- [ ] AC7: Linking failures don't block → **Test 5.2**

---

## Test Results Template

**Use this template to record results:**

```markdown
# Epic 2 Test Results

**Date:** YYYY-MM-DD
**Tester:** Sid
**Environment:** Production Notion database

## Test Results Summary

| Test ID | Test Name | Result | Notes |
|---------|-----------|--------|-------|
| 1.1 | Jarvis Status Suggestions | ✅ PASS | Query in 2.3s, suggestions accurate |
| 1.2 | Zoe Media Detection | ✅ PASS | Detected missing media correctly |
| ... | ... | ... | ... |

## Issues Found

1. **Issue:** [Description]
   - **Severity:** High/Medium/Low
   - **Impact:** [What breaks]
   - **Fix:** [Solution]

## Overall Assessment

- **Story 5.1:** PASS/FAIL
- **Story 5.2:** PASS/FAIL
- **Story 5.3:** PASS/FAIL

**Epic 2 Ready for Production:** YES/NO
```

---

## Quick Test (30 Minutes)

**If time-constrained, run these minimum tests:**

1. ✅ Test 1.1: Jarvis suggestions
2. ✅ Test 2.1: research-topic status update
3. ✅ Test 2.2: generate-ideas page creation
4. ✅ Test 2.5: Cloudinary upload
5. ✅ Test 4.1: Full pipeline

**Minimum Viable Testing:** 5 tests cover critical paths

---

🧙 **Testing guide complete! Shall the Builder:**
1. **Run tests NOW** (validate with real Notion database)?
2. **Skip to Epic 2 completion docs** (mark as done, test later)?
3. **Continue building** (add more features before testing)?

**Your command, Sid!**
