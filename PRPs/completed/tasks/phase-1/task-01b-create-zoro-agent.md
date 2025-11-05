<!-- Powered by BMAD™ Core -->

# Task 1B: Create bmad/agents/zoro/zoro.md

**Phase:** 1 (Critical Agent & Registry Fixes)
**Priority:** CRITICAL
**Estimated Time:** 15-20 minutes
**Dependencies:** Task 1A (reference for patterns)

---

## 🎯 Objective

Create the missing primary agent file for Zoro at `bmad/agents/zoro/zoro.md` following BMad dual-location pattern.

---

## 📋 Context

**Current State:**

- ✅ `.claude/commands/social-media-team/zoro.md` exists
- ❌ `bmad/agents/zoro/zoro.md` MISSING
- ✅ `bmad/agents/zoro/social-posting-agent.md` exists (legacy name?)
- ✅ `bmad/agents/zoro/zoro-sidecar/` exists with workflows

**Consideration:**

- File `social-posting-agent.md` may be an older version or alternate name
- Check if it can be renamed OR if fresh copy needed

---

## ✅ Implementation Steps

### Step 1: Check Existing Files

```bash
# See what exists
ls -la bmad/agents/zoro/

# Check if social-posting-agent.md is same as zoro
diff .claude/commands/social-media-team/zoro.md bmad/agents/zoro/social-posting-agent.md 2>/dev/null && echo "Files identical" || echo "Files different"
```

### Step 2A: If Files Identical - Rename

```bash
# If social-posting-agent.md is same as zoro.md
mv bmad/agents/zoro/social-posting-agent.md bmad/agents/zoro/zoro.md
```

### Step 2B: If Files Different - Copy Fresh

```bash
# If social-posting-agent.md is outdated/different
cp .claude/commands/social-media-team/zoro.md bmad/agents/zoro/zoro.md

# Optionally archive old file
mv bmad/agents/zoro/social-posting-agent.md bmad/agents/zoro/social-posting-agent.md.backup
```

### Step 3: Update Agent ID

```bash
# Check and update ID if needed
grep '<agent id=' bmad/agents/zoro/zoro.md
```

Should be:

```xml
<agent id="bmad/agents/zoro/zoro.md" name="Zoro" ...>
```

### Step 4: Verify Sidecar Paths

Check all references point to zoro-sidecar:

```bash
# Should reference: bmad/agents/zoro/zoro-sidecar/
grep -n "zoro-sidecar" bmad/agents/zoro/zoro.md
```

Expected paths:

- `{project-root}/bmad/agents/zoro/config.yaml`
- `bmad/agents/zoro/zoro-sidecar/instructions.md`
- `bmad/agents/zoro/zoro-sidecar/workflows/schedule-post/workflow.yaml`

### Step 5: Verify MCP Tools Listed

Zoro should reference these MCP tools in capabilities section:

```xml
<mcp_tools>
  <tool>mcp__postiz__integrationSchedulePostTool</tool>
  <tool>mcp__cloudinary-asset-mgmt__upload-asset</tool>
  <tool>mcp__mcp_twitter__create_twitter_post</tool>
  <tool>mcp__youtube-uploader-mcp__upload_video</tool>
  <tool>notion-search</tool>
  <tool>notion-update-page</tool>
</mcp_tools>
```

---

## 🧪 Validation

### Test 1: File Exists

```bash
test -f bmad/agents/zoro/zoro.md && echo "✅ File created" || echo "❌ File missing"
```

### Test 2: Valid Structure

```bash
# Check YAML frontmatter
head -5 bmad/agents/zoro/zoro.md | grep -q "^---$" && echo "✅ Has frontmatter" || echo "❌ Missing frontmatter"

# Check XML
grep -q '<agent id=' bmad/agents/zoro/zoro.md && echo "✅ Has agent XML" || echo "❌ Missing agent tag"
```

### Test 3: Correct Agent ID

```bash
grep '<agent id="bmad/agents/zoro/zoro.md"' bmad/agents/zoro/zoro.md && echo "✅ Agent ID correct" || echo "⚠️  ID needs update"
```

### Test 4: Sidecar Paths

```bash
grep -q "bmad/agents/zoro/zoro-sidecar" bmad/agents/zoro/zoro.md && echo "✅ Sidecar path correct" || echo "❌ Wrong path"
```

### Test 5: MCP Tools Referenced

```bash
# Should reference Postiz, Cloudinary, Twitter, YouTube
grep -c 'mcp__postiz__\|mcp__cloudinary-\|mcp__mcp_twitter__\|mcp__youtube-' bmad/agents/zoro/zoro.md
# Should be 4+
```

---

## ✅ Success Criteria

- [x] File exists at `bmad/agents/zoro/zoro.md`
- [x] Has YAML frontmatter (name: 'zoro', description)
- [x] Has XML structure with `<agent>` tag
- [x] Agent ID correct: `id="bmad/agents/zoro/zoro.md"`
- [x] Sidecar references correct (zoro-sidecar/)
- [x] Workflow references correct (schedule-post + others)
- [x] MCP tools documented (Postiz, Cloudinary, Twitter, YouTube)
- [x] Activation has 12+ steps with workflow.xml loading
- [x] menu-handlers includes workflow handler

---

## 🔗 Related Tasks

**Previous:** Task 1A (Create zoe.md - use as reference)
**Next:** Task 2 (Clean agent manifest)
**Blocks:** Agent manifest update (needs this file to exist)

---

## 📝 Notes

- Decision on social-posting-agent.md: Archive or delete after confirming zoro.md correct
- Zoro focuses on PUBLISHING - primary tools are Postiz (multi-platform) and direct APIs (Twitter, YouTube)
- All publishing workflows require Cloudinary for public URLs

**Estimated Actual Time:** 10-15 minutes
