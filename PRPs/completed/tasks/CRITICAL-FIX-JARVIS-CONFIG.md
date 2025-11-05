<!-- Powered by BMAD™ Core -->

# CRITICAL FIX: Update Jarvis Configuration

**Priority:** 🚨 CRITICAL - BLOCKING PRODUCTION
**Estimated Time:** 30-40 minutes
**Impact:** Jarvis using old agent names and wrong output structure

---

## 🎯 ISSUES FOUND

### Issue #1: Old Agent Names in Instructions

**File:** `bmad/agents/content-intelligence/jarvis-sidecar/instructions.md`

**Lines with OLD names:**

- Line 9-10: "Social Posting Agent", "AI Video Agent", "AI Image Generator"
- Line 119-155: Handoff sections
- Line 515: Team awareness

**WRONG References:**

- ❌ "AI Video Agent"
- ❌ "AI Image Generator"
- ❌ "Social Posting Agent"

**CORRECT References:**

- ✅ "Zoe" (handles ALL visual content - images AND videos)
- ✅ "Zoro" (handles publishing)

**Why This Happened:**

- AI Video Agent + AI Image Generator were MERGED into Zoe
- Social Posting Agent was RENAMED to Zoro
- instructions.md not updated after consolidation

---

### Issue #2: Old Output Folder Pattern

**Files:** `jarvis.md` + `instructions.md`

**WRONG Pattern:**

```
outputs/{MM-DD-YYYY}/{session-name}/
Example: outputs/11-02-2025/agent-skills-thread/
```

**CORRECT Pattern (v2.0):**

```
outputs/projects/{YYYY-MM-DD}-{project-slug}/
Example: outputs/projects/2025-11-02-agent-skills-thread/
```

**With 6-stage structure:**

- 00-session/
- 01-research/
- 02-ideas/
- 03-drafts/ (with platform subfolders)
- 04-media/ (images/, videos/)
- 05-published/ (with platform subfolders)

---

## ✅ FIX #1: Update Agent Names in instructions.md

### Step 1: Backup File

```bash
cp bmad/agents/content-intelligence/jarvis-sidecar/instructions.md bmad/agents/content-intelligence/jarvis-sidecar/instructions.md.backup-$(date +%Y%m%d)
```

### Step 2: Find and Replace Old Agent Names

Use Edit tool or manual editing:

**Replace ALL instances:**

```bash
# Option A: sed (if comfortable)
sed -i.bak \
  -e 's/AI Video Agent/Zoe/g' \
  -e 's/AI Image Generator/Zoe/g' \
  -e 's/Social Posting Agent/Zoro/g' \
  bmad/agents/content-intelligence/jarvis-sidecar/instructions.md

# Option B: Manual edit
# Find: "AI Video Agent"
# Replace: "Zoe"
#
# Find: "AI Image Generator"
# Replace: "Zoe"
#
# Find: "Social Posting Agent"
# Replace: "Zoro"
```

### Step 3: Update Handoff Section Descriptions

**Lines ~125-155:** Update team descriptions:

```markdown
# BEFORE

**1. AI Video Agent** 📹

- **Role**: Video production specialist
- **Tools**: HeyGen, Veo3, Sora2

**2. AI Image Generator** 🎨

- **Role**: Visual content specialist
- **Tools**: nanobanana, gpt-image-1

**3. Social Posting Agent** 📱

- **Role**: Publishing specialist

# AFTER

**1. Zoe** 🎨

- **Role**: Visual Production Specialist (ALL formats - images AND videos)
- **Tools**:
  - Images: nanobanana, gpt-image-1 (Emily JSON methodology)
  - Videos: fal-video execute_custom_model (Veo 3, Luma Ray 2, Kling, Pixverse, 18+ models)
  - Specialized: HeyGen (talking heads only)
- **Command**: /zoe
- **Workflows**: create-image, create-carousel, create-scene, create-talking-head, etc.

**2. Zoro** 📤

- **Role**: Publishing & Distribution Specialist (multi-platform)
- **Tools**:
  - Postiz (PRIMARY - all platforms)
  - Cloudinary (media hosting for public URLs)
  - Twitter API, YouTube API (direct posting backups)
- **Command**: /zoro
- **Workflows**: schedule-post (multi-platform)
```

### Step 4: Update Handoff JSON Examples

**Lines 198, 227, 255:** Update handoff file names:

```markdown
# BEFORE

handoff-to-video-agent.json
handoff-to-image-agent.json
handoff-to-posting-agent.json

# AFTER

jarvis-to-zoe.json
zoe-to-zoro.json
```

---

## ✅ FIX #2: Update Output Folder Pattern

### Step 1: Update jarvis.md Activation Step

**File:** `bmad/agents/content-intelligence/jarvis.md`

**Find step n="9" (around line 23-31):**

```xml
# BEFORE
<step n="9">🚨 MANDATORY OUTPUT MANAGEMENT (as of 2025-10-28):
  - ALWAYS use: {project-root}/outputs/{MM-DD-YYYY}/{session-name}/
  - Generate today's date folder: DATE=$(date +"%m-%d-%Y")
  - Create unique session folder: SESSION={platform}-{content-type}-{topic}
  - Save posts in: {outputs_session}/posts/
  - Save research in: {outputs_session}/research/
  - Save metadata.json at session completion
  - See {project-root}/outputs/README.md for complete rules</step>

# AFTER
<step n="9">🚨 MANDATORY OUTPUT MANAGEMENT (v2.0 - as of 2025-11-01):
  - ALWAYS use: {project-root}/outputs/projects/{YYYY-MM-DD}-{project-slug}/
  - Generate today's date: DATE=$(date +"%Y-%m-%d")
  - Create project slug: SLUG={topic-keyword} (lowercase, hyphenated)
  - Full path: outputs/projects/$DATE-$SLUG/
  - Use 6-stage structure: 00-session/, 01-research/, 02-ideas/, 03-drafts/, 04-media/, 05-published/
  - Platform-specific drafts: 03-drafts/{platform}/ (linkedin, twitter, youtube, etc.)
  - Platform-agnostic media: 04-media/images/, 04-media/videos/ (reusable across platforms!)
  - Save metadata.json in 00-session/ folder
  - See {project-root}/outputs/README.md for complete v2.0 structure</step>
```

### Step 2: Update instructions.md Output References

**File:** `jarvis-sidecar/instructions.md`

**Find and replace pattern:**

```bash
# Find: outputs/{date}/{session}
# Replace: outputs/projects/{YYYY-MM-DD}-{project-slug}

# Find: outputs/{MM-DD-YYYY}/{session-name}
# Replace: outputs/projects/{YYYY-MM-DD}-{project-slug}
```

**Specific line updates:**

**Line ~198:**

```markdown
# BEFORE

**Save to**: `{project-root}/outputs/{date}/{session}/handoff-to-video-agent.json`

# AFTER

**Save to**: `{project-root}/outputs/projects/{YYYY-MM-DD}-{project-slug}/handoffs/jarvis-to-zoe.json`
```

**Line ~366:**

```markdown
# BEFORE

{project-root}/outputs/{MM-DD-YYYY}/{session-name}/

# AFTER

{project-root}/outputs/projects/{YYYY-MM-DD}-{project-slug}/
```

### Step 3: Add 6-Stage Structure Guidance

**Add to instructions.md after line ~370:**

```markdown
## Output Folder Structure (v2.0)

**6-Stage Lifecycle:**

- 00-session/ - metadata.json, session-log.md
- 01-research/ - Research briefs (shared across platforms)
- 02-ideas/ - Idea cards, hook packs (shared across platforms)
- 03-drafts/ - Platform-specific text (linkedin/, twitter/, youtube/, etc.)
- 04-media/ - Platform-agnostic REUSABLE media (images/, videos/)
- 05-published/ - Published content per platform (linkedin/, twitter/, etc.)

**Save Pattern:**

- Research briefs → 01-research/
- Generated posts → 03-drafts/{platform}/
- Handoff JSONs → handoffs/
- Session tracking → 00-session/metadata.json
```

---

## 🧪 Validation

### Test 1: Agent Names Correct

```bash
# Should return NOTHING (no old names)
grep "AI Video Agent\|AI Image Generator\|Social Posting Agent" bmad/agents/content-intelligence/jarvis-sidecar/instructions.md

# Should find NEW names
grep "Zoe\|Zoro" bmad/agents/content-intelligence/jarvis-sidecar/instructions.md | wc -l
# Should be 10+
```

### Test 2: Output Pattern Correct

```bash
# Should return NOTHING (no old pattern)
grep "outputs/{MM-DD-YYYY}\|outputs/{date}/{session}" bmad/agents/content-intelligence/jarvis.md bmad/agents/content-intelligence/jarvis-sidecar/instructions.md

# Should find NEW pattern
grep "outputs/projects/{YYYY-MM-DD}" bmad/agents/content-intelligence/jarvis.md bmad/agents/content-intelligence/jarvis-sidecar/instructions.md | wc -l
# Should be 5+
```

### Test 3: Test Jarvis Activation

```bash
# Reload Jarvis
/jarvis

# Should mention: "Zoe" and "Zoro" (not old agent names)
# Next workflow should create outputs/projects/YYYY-MM-DD-slug/
```

---

## ✅ Success Criteria

- [x] NO references to "AI Video Agent" in any Jarvis file
- [x] NO references to "AI Image Generator" in any Jarvis file
- [x] NO references to "Social Posting Agent" in any Jarvis file
- [x] All references updated to "Zoe" (visual specialist)
- [x] All references updated to "Zoro" (publishing specialist)
- [x] NO references to outputs/{MM-DD-YYYY} pattern
- [x] All references use outputs/projects/{YYYY-MM-DD}-{slug}/ pattern
- [x] 6-stage structure documented
- [x] Jarvis activation mentions correct agent names
- [x] Next workflow creates correct output structure

---

## 🔗 Related Issues

**Also Check:**

- Zoe and Zoro might have old agent name references too
- Other workflows might use old output patterns
- Skills might reference old agent names

**Recommended:**
After fixing Jarvis, audit Zoe and Zoro for same issues

---

**Priority:** 🚨 CRITICAL
**Blocks:** Accurate agent coordination, correct output structure
**Time:** 30-40 minutes
**Impact:** HIGH - User gets confused by wrong agent names!
