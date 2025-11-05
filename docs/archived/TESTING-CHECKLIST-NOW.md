# Testing Checklist - Post Claude Code Restart

**Status:** Ready to test with fresh Claude Code session
**Goal:** Validate 65% MVP works, push to 70%
**Estimated:** 2-3 hours systematic testing

---

## ✅ PRE-TEST VERIFICATION

**Before testing workflows, verify structure:**

1. ✅ Claude Code restarted
2. ✅ 3-agent model exists (Jarvis, Zoe, Zoro)
3. ✅ 31+ workflows in standard format
4. ✅ Notion MCP configured
5. ✅ All API keys in .env (Plainly, Submagic, Twitter, LinkedIn, YouTube, Cloudinary, Postiz, etc.)

---

## 🧪 TEST SEQUENCE (Execute in Order)

### **TEST 1: Agent Activation - Jarvis** (5 min)

**Command:**

```bash
/jarvis
```

**Expected Behavior:**

1. Loads config from `bmad/agents/content-intelligence/config.yaml`
2. Loads `jarvis-sidecar/notion-helper.md`
3. Queries Notion Content Tracker (should show items with Status=Idea/Research/Next Up)
4. Displays suggestions based on Notion content
5. Shows menu with 7 workflows

**Validation:**

- [ ] Agent activates without errors
- [ ] Notion query executes (may show "Found X items" or proceed if none)
- [ ] Menu displays all 7 commands
- [ ] Can see: *research-topic, *generate-ideas, *write-post, *write-script, etc.

**If Fails:** Check config.yaml paths, check notion-helper.md exists

---

### **TEST 2: Agent Activation - Zoe** (5 min)

**Command:**

```bash
/zoe
```

**Expected Behavior:**

1. Loads config from `bmad/agents/zoe/config.yaml`
2. Loads `zoe-sidecar/notion-helper.md`
3. Queries Notion for Status=Editing without media
4. Shows unified menu with 13 workflows (images + videos merged!)

**Validation:**

- [ ] Agent activates without errors
- [ ] Unified menu shows (not separate image/video agents)
- [ ] Can see: *create-image, *create-carousel, *create-scene, *create-talking-head, etc.
- [ ] All 13 workflows visible

**If Fails:** Check zoe/ folder exists, check config.yaml, check workflows/ folder

---

### **TEST 3: Agent Activation - Zoro** (5 min)

**Command:**

```bash
/zoro
```

**Expected Behavior:**

1. Loads config from `bmad/agents/zoro/config.yaml`
2. Loads `zoro-sidecar/notion-helper.md`
3. Queries Notion for publish-ready content
4. Shows menu with 11 workflows

**Validation:**

- [ ] Agent activates without errors
- [ ] Menu shows \*schedule-post as PRIMARY
- [ ] Can see backup workflows: *publish-tweet-now, *publish-linkedin-now, etc.

**If Fails:** Check zoro/ folder (renamed from social-posting-agent), check workflows/ folder structure

---

### **TEST 4: Skill Discovery - write-posts** (15 min)

**Command:**

```bash
/jarvis
*write-post

# When prompted:
Topic: "Testing the AI social media system"
Platform: LinkedIn
Reference: none
```

**Expected Behavior:**

1. Workflow loads voice profile from memories.md
2. Selects voice mode (probably Analyst for tech topic)
3. **Claude discovers post-writer skill** (description matches "LinkedIn posts")
4. Skill generates post using Justin Welsh PAIPS formula
5. **Claude discovers voice-matcher skill** (validates consistency)
6. Returns confidence score
7. **Claude discovers platform-formatter skill** (LinkedIn formatting)
8. Saves to: 03-drafts/linkedin/post-v1.md
9. Attempts Notion update (may succeed or gracefully fail if page not linked)

**Validation:**

- [ ] Post generated (any output is success - testing if workflow runs)
- [ ] Voice profile mentioned (if exists in memories.md)
- [ ] Platform formula applied (PAIPS structure visible)
- [ ] File saved to correct location
- [ ] No crashes or unhandled errors

**If Fails:** Likely skill discovery issue - check skill descriptions, check SKILL.md files exist

---

### **TEST 5: Image Generation - create-single-image** (15 min)

**Command:**

```bash
/zoe
*create-image

# When prompted:
Prompt: "Professional tech workspace with laptop"
Design: LinkedIn dark tech
Upload to Cloudinary: skip (unless Cloudinary configured)
```

**Expected Behavior:**

1. **Claude discovers create-image skill** (Emily JSON methodology)
2. **Claude discovers linkedin-design skill** (dark tech aesthetic)
3. Skill constructs JSON prompt with 10+ sections
4. **Claude discovers mcp-tool-selection skill** (chooses gpt-image-1 for LinkedIn)
5. Generates image via gpt-image-1 MCP
6. Runs 7-pillar quality evaluation
7. Saves to: 04-media/images/{filename}.png
8. (Cloudinary step skipped if not configured)
9. (Notion update attempted)

**Validation:**

- [ ] Image generated successfully
- [ ] Emily JSON methodology mentioned
- [ ] 7-pillar evaluation shown
- [ ] File saved to 04-media/images/
- [ ] Quality score displayed

**If Fails:** Check gpt-image-1 or nanobanana MCP configured, check create-image skill exists

---

### **TEST 6: Integration Check - Notion** (10 min)

**Already Validated:**

- ✅ Notion MCP connection works
- ✅ Query returned 14+ items
- ✅ Performance: 2 seconds

**Additional Test:**
Run generate-ideas and check if pages created in Notion (if you want full validation)

**Skip for now:** Can validate during Epic 7 comprehensive testing

---

### **TEST 7: Integration Check - Cloudinary** (10 min)

**Test if Cloudinary MCP accessible:**

```bash
# Try uploading a test image
# This would be part of create-single-image workflow (step 8.5)
```

**If Cloudinary not configured:**

- Workflows will skip upload
- Local files still saved
- System still functional (Cloudinary optional for now)

**If you want to test:** Need Cloudinary credentials in .env or Claude Code MCP settings

---

## 📊 MINIMAL VALIDATION (30 min - RECOMMENDED)

**Quick tests to validate system works:**

1. ✅ Test /jarvis activation (5 min)
2. ✅ Test /zoe activation (5 min)
3. ✅ Test /zoro activation (5 min)
4. ✅ Test write-posts generates content (15 min)

**Result:** Confidence the system is operational → Can mark Epic 4-6 as "validated"

---

## 🎯 FULL VALIDATION (2-3 hours)

**If you want comprehensive testing:**

1. All 3 agents (Test Suite 1)
2. All critical workflows (Test Suite 2)
3. Generate real content for your social media
4. Validate Notion updates work
5. Test Cloudinary if configured

**Result:** Epic 7 at 30-40% → MVP at 70%+

---

## 💡 WHAT TO EXPECT

**Likely Scenarios:**

**Best Case:** Everything works perfectly

- All agents activate
- All workflows run
- Skills discovered
- Notion updates
- Files saved correctly

**Most Likely:** Minor issues

- Some skills not discovered (description needs tweaking)
- Some Notion updates fail (graceful degradation working)
- Some MCP integrations not configured (expected - can configure later)
- Some workflow steps need adjustment

**Worst Case:** Integration issues

- MCP servers not accessible
- Skills not loading
- Workflows not finding files

**Recovery:** All issues fixable - we have comprehensive documentation of what should work!

---

## 🎯 RECOMMENDATION

**Start with MINIMAL VALIDATION (30 min):**

1. Test each agent activates (15 min)
2. Test ONE workflow (write-posts) (15 min)

**If tests pass:**

- Mark Epics 4-6 as "functionally validated"
- Update MVP to 70%
- Document success

**If tests reveal issues:**

- Debug and fix (comprehensive docs help)
- Iterate until working
- Then mark complete

---

🧙 **SHALL THE BUILDER GUIDE YOU THROUGH THE TESTS?**

**Let's start with:**

1. **Test Jarvis** (`/jarvis` command)?
2. **Test all 3 agents** (systematic)?
3. **Jump to workflow test** (test write-posts)?

**What's your preference, Sid?** 🧙⚡
