<!-- Powered by BMAD™ Core -->

# Task 12: Verify Skill MCP Tool References

**Phase:** 3 (Tool Names & MCP Setup)
**Priority:** HIGH
**Estimated Time:** 45-60 minutes
**Dependencies:** Task 5 (tool registry has correct names)

---

## 🎯 Objective

Audit all 24 skills for correct MCP tool references and fix any incorrect patterns.

---

## 📋 Context

**Skills to Check:** 24 total

- `.claude/skills/jarvis/` (12 skills)
- `.claude/skills/zoe/` (9-11 skills)
- `.claude/skills/` shared (2-3 skills)

**Common Errors:**

- ❌ mcp**notion**search (should be notion-search)
- ❌ veotools (ambiguous - should specify full name or migrate to fal-video)
- ❌ upload-asset (missing server prefix)

---

## ✅ Implementation Steps

### Step 1: Scan All Skills for MCP References

```bash
# Find all SKILL.md files
find .claude/skills -name "SKILL.md" > /tmp/skills.txt

# Search for MCP tool references
echo "=== MCP Tool References in Skills ==="
while read skill; do
  echo "--- $(dirname $skill | xargs basename) ---"
  grep -n "mcp__\|notion-" "$skill" | head -5
done < /tmp/skills.txt
```

### Step 2: Check for Incorrect Notion Pattern

```bash
# Should return NOTHING (no mcp__notion__)
grep -rn "mcp__notion__search\|mcp__notion__fetch\|mcp__notion__create" .claude/skills/

# If found, replace with simple names:
# mcp__notion__search → notion-search
# mcp__notion__fetch → notion-fetch
```

### Step 3: Check veotools References

```bash
# Find veotools mentions
grep -rn "veotools" .claude/skills/ | grep -v "DEPRECATED" | grep -v "backup"

# For each, decide:
# - Migrate to fal-video (PRIMARY)
# - Mark as deprecated/backup
# - Add full tool name: mcp__veotools__generate_start
```

### Step 4: Priority Skills to Check

**video-generation skill** (highest priority):

```bash
# Should reference fal-video, not veotools
cat .claude/skills/zoe/video-generation/SKILL.md | grep -i "fal-video\|veotools" | head -10

# Expected: mcp__fal-video__execute_custom_model
# Update if shows veotools without deprecation note
```

**create-image skill:**

```bash
# Should have correct image tool names
cat .claude/skills/zoe/create-image/SKILL.md | grep "mcp__nanobanana\|mcp__gpt-image-1" | head -5

# Expected: mcp__nanobanana__generate_image, mcp__gpt-image-1__create_image
```

**deep-web-research skill:**

```bash
# Should have correct research tool names
cat .claude/skills/jarvis/deep-web-research/SKILL.md | grep "mcp__exa\|mcp__firecrawl\|mcp__apify" | head -5

# Expected: mcp__exa__search, mcp__firecrawl__firecrawl_search, mcp__apify__call-actor
```

### Step 5: Update Incorrect References

For each skill with wrong tool names, update SKILL.md:

```markdown
# BEFORE

Use veotools to generate videos

# AFTER

Use mcp**fal-video**execute_custom_model (PRIMARY) with endpoint "fal-ai/veo-3"
Backup: mcp**veotools**generate_start (if fal-video unavailable)
```

---

## 🧪 Validation

### Test 1: No Incorrect Notion Pattern

```bash
grep -r "mcp__notion__" .claude/skills/ && echo "❌ ERRORS FOUND" || echo "✅ No incorrect notion pattern"
```

### Test 2: veotools References Minimal

```bash
VEOTOOLS_COUNT=$(grep -r "veotools" .claude/skills/ | grep -v "DEPRECATED" | grep -v "backup" | grep -v "superseded" | wc -l)

if [ "$VEOTOOLS_COUNT" -eq 0 ]; then
  echo "✅ No active veotools references (all migrated to fal-video)"
elif [ "$VEOTOOLS_COUNT" -le 3 ]; then
  echo "⚠️  Found $VEOTOOLS_COUNT veotools references (acceptable if marked as backup)"
else
  echo "❌ Found $VEOTOOLS_COUNT veotools references (should migrate to fal-video)"
fi
```

### Test 3: Correct fal-video Tool Name

```bash
# Should find execute_custom_model in video skills
grep -r "execute_custom_model" .claude/skills/zoe/ | wc -l
# Should be >0

# Should NOT find "fal custom video" (incorrect name)
grep -r "fal custom video" .claude/skills/ && echo "❌ Wrong tool name found" || echo "✅ Correct tool name"
```

### Test 4: Cloudinary Tools Have Full Names

```bash
# Should use mcp__cloudinary-asset-mgmt__ prefix
grep -r "cloudinary" .claude/skills/ | grep "upload-asset\|search-assets" | head -3
# Check if has mcp__ prefix
```

---

## ✅ Success Criteria

- [x] No mcp**notion** patterns in any skill
- [x] All Notion references use simple names (notion-search, notion-fetch)
- [x] video-generation skill uses mcp**fal-video**execute_custom_model
- [x] veotools references ≤3 and marked as backup/deprecated
- [x] Cloudinary tools use mcp**cloudinary-asset-mgmt** prefix
- [x] All image tools use correct names (mcp**nanobanana**generate_image, mcp**gpt-image-1**create_image)
- [x] Validation tests pass

---

## 🔗 Related Tasks

**Requires:** Task 5 (tool registry as reference)
**Next:** Task 22 (Notion naming doc)
**Validates:** Skill tool correctness

---

## 📝 Notes

**Skills Most Likely to Need Updates:**

1. `.claude/skills/zoe/video-generation/` - May reference veotools
2. `.claude/skills/zoe/mcp-tool-selection/` - May have outdated patterns
3. Any skill with Cloudinary references

**Tool Name Reference (Quick Lookup):**

- Notion: notion-search (simple)
- fal-video: mcp**fal-video**execute_custom_model
- HeyGen: mcp**heygen**generate_avatar_video
- Cloudinary: mcp**cloudinary-asset-mgmt**upload-asset
- nanobanana: mcp**nanobanana**generate_image
- gpt-image-1: mcp**gpt-image-1**create_image

**Estimated Actual Time:** 40-50 minutes
