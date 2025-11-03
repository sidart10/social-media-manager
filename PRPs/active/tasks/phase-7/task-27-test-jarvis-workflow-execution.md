<!-- Powered by BMAD™ Core -->

# Task 27: Test Jarvis Workflow Execution

**Phase:** 7 (Jarvis Critical Fixes - URGENT)
**Priority:** 🚨 CRITICAL VALIDATION
**Estimated Time:** 20-30 minutes
**Dependencies:** Task 25, Task 26 (Jarvis fixes complete)

---

## 🎯 Objective

Validate that Jarvis workflows execute properly with correct output structure and proper workflow orchestration.

---

## 📋 Context

**After Tasks 25 & 26:**

- ✅ Agent names updated (Zoe, Zoro)
- ✅ Output patterns updated (v2.0)
- ✅ Workflow variables fixed
- ✅ Folder creation steps added

**Now we need to PROVE it works!**

---

## ✅ Test Scenarios

### Test 1: research-topic Workflow (Primary Test)

**Trigger Properly:**

```bash
/jarvis
2  # Select menu number 2 (research-topic)
# OR
*research-topic  # Type exact trigger
```

**Provide Inputs:**

- Topic: "test topic"
- Depth: "quick" (free, fast test)
- Focus: "all"

**Expected Behavior:**

1. **Workflow loads:**
   - ✅ Displays: "Research Session Started"
   - ✅ Shows: Topic, Depth, Focus
   - ✅ Mentions: Using Exa, social-media-mcp

2. **Creates proper folder structure:**

   ```
   outputs/projects/2025-11-02-test-topic/
   ├── 00-session/
   │   └── metadata.json
   ├── 01-research/
   │   └── research-brief.md  ← PRIMARY OUTPUT
   ├── 02-ideas/
   ├── 03-drafts/
   │   ├── linkedin/
   │   ├── twitter/
   │   └── ...
   ├── 04-media/
   │   ├── images/
   │   └── videos/
   ├── 05-published/
   └── handoffs/
   ```

3. **Executes all workflow steps:**
   - Step 0: Create folder structure
   - Step 1: Initialize session
   - Step 2: Gather trending topics
   - Step 3: Deep research (loads deep-web-research skill)
   - Step 4: Find examples (if applicable)
   - Step 5: Synthesize findings
   - Step 6: Save research brief to 01-research/

4. **Research brief contains:**
   - Executive summary
   - Key findings by category
   - Source URLs with timestamps
   - Content angles (10+)
   - Cost breakdown

5. **Does NOT:**
   - ❌ Create outputs/11-02-2025/ (old pattern)
   - ❌ Skip research brief step
   - ❌ Go straight to content creation
   - ❌ Use flat structure

---

### Test 2: Natural Language vs Workflow Trigger

**Test A: Natural Language (Inline)**

```bash
/jarvis
# Type: "do research on AI"
```

**Expected:**

- ⚠️ May execute inline (not workflow)
- ⚠️ May skip some steps
- Should still create correct output location (from Step 9)

**Test B: Proper Trigger (Workflow)**

```bash
/jarvis
2  # OR *research-topic
```

**Expected:**

- ✅ Loads workflow.xml
- ✅ Executes all steps
- ✅ Creates complete structure
- ✅ Saves research brief

**Comparison:** Workflow trigger should be MORE comprehensive!

---

### Test 3: Output Location Validation

After any test:

```bash
# Check where files were created
find outputs -name "research-brief.md" -type f | head -5

# Should show:
# outputs/projects/2025-11-02-{slug}/01-research/research-brief.md

# Should NOT show:
# outputs/11-02-2025/...
```

---

### Test 4: Metadata Tracking

```bash
# Check session metadata created
cat outputs/projects/2025-11-02-test-topic/00-session/metadata.json

# Should contain:
# {
#   "project_id": "2025-11-02-test-topic",
#   "topic": "test topic",
#   "created_at": "ISO timestamp",
#   "agent": "jarvis",
#   "workflow": "research-topic"
# }
```

---

## 🧪 Validation Checklist

**After running research-topic workflow:**

- [ ] Folder created: `outputs/projects/YYYY-MM-DD-{slug}/`
- [ ] Has 6 stage folders: 00-session through 05-published
- [ ] metadata.json in 00-session/
- [ ] research-brief.md in 01-research/
- [ ] Research brief has all sections (findings, sources, angles)
- [ ] Cost tracked in brief
- [ ] NO folder created in outputs/MM-DD-YYYY/ (old pattern)
- [ ] Workflow executed all steps (not inline)
- [ ] deep-web-research skill was loaded and used

---

## ✅ Success Criteria

**Workflow Execution:**

- [x] Loads workflow.xml (orchestrator)
- [x] Executes all steps in order
- [x] Loads skills when specified (deep-web-research, research-synthesizer)
- [x] Creates complete output structure

**Output Structure:**

- [x] Uses v2.0 pattern: outputs/projects/{YYYY-MM-DD}-{slug}/
- [x] Creates all 6 stage folders
- [x] Saves research to 01-research/
- [x] Creates metadata.json in 00-session/

**Quality:**

- [x] Research brief comprehensive (not just outline)
- [x] Skills were actually used (not skipped)
- [x] Evidence-backed findings
- [x] Ready for next phase (write-post or generate-ideas)

---

## 🔗 Dependencies

**Requires:**

- ✅ Task 25: Agent name fixes (COMPLETED)
- ✅ Task 26: Workflow variable fixes (MUST COMPLETE FIRST)

**Blocks:**

- Production use of Jarvis
- Epic 7 testing
- Real content creation

---

## 📝 Testing Notes

**If Test Fails:**

1. Check which step failed
2. Verify workflow.yaml variables resolved
3. Check if workflow.xml was loaded
4. Validate bash commands use correct date format
5. Review error messages

**If Test Passes:**

- ✅ Jarvis workflows are PRODUCTION-READY
- ✅ Can proceed to test other workflows (write-post, generate-ideas)
- ✅ Ready for Epic 7 end-to-end testing

---

**Estimated Time:** 20-30 minutes (testing + documentation)
**Priority:** 🚨 VALIDATION GATE
**Status:** ⬜ Ready after Task 26 complete
