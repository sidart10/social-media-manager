<!-- Powered by BMAD™ Core -->

# Task 5: Update Tool Registry with Correct MCP Names

**Phase:** 1 (Critical Agent & Registry Fixes)
**Priority:** CRITICAL
**Estimated Time:** 30-40 minutes
**Dependencies:** None (independent update)

---

## 🎯 Objective

Update `.bmad-core/data/tool-registry.yaml` with correct MCP tool names, add `actual_tool_name` fields, and clarify video tool strategy.

---

## 📋 Context

**File:** `.bmad-core/data/tool-registry.yaml`

**Issues Found:**

1. Cloudinary tools use simple names (upload-asset) without full mcp\_\_ names
2. veotools reference needs deprecation status
3. Outdated note about Epic 2 (line ~473)
4. Missing `actual_tool_name` field for some tools

**Goal:** Ensure all tool references use VERIFIED names from system context

---

## ✅ Implementation Steps

### Step 1: Backup Registry

```bash
cp .bmad-core/data/tool-registry.yaml .bmad-core/data/tool-registry.yaml.backup-$(date +%Y%m%d)
```

### Step 2: Update Cloudinary Section

Find Cloudinary section (around lines 382-417) and add `actual_tool_name` fields:

```yaml
# BEFORE
tools:
  - name: upload-asset
    purpose: Upload media files and get public URLs

# AFTER
tools:
  - name: upload-asset
    actual_tool_name: mcp__cloudinary-asset-mgmt__upload-asset
    purpose: Upload media files and get public URLs

  - name: search-assets
    actual_tool_name: mcp__cloudinary-asset-mgmt__search-assets
    purpose: Find uploaded media assets

  - name: get-asset-details
    actual_tool_name: mcp__cloudinary-asset-mgmt__get-asset-details
    purpose: Get metadata for specific asset

# Update primary_tool reference
primary_tool: mcp__cloudinary-asset-mgmt__upload-asset  # (was: upload-asset)
```

### Step 3: Clarify fal-video Section

Find fal-video section (around lines 175-224) and add tool pattern example:

```yaml
# Add after primary_tool line
primary_tool: mcp__fal-video__execute_custom_model  # ✅ Already correct

# ADD tool usage pattern
tool_pattern: |
  mcp__fal-video__execute_custom_model({
    endpoint: "fal-ai/veo-3",      // or luma-ray-2, kling-master-text
    input_params: {
      prompt: "...",
      aspect_ratio: "16:9",
      duration: 5
    },
    category_hint: "video"
  })

# ADD model endpoint examples
available_endpoints:
  - "fal-ai/veo-3" - Google Veo 3 (b-roll, scenes)
  - "fal-ai/luma-dream-machine-ray2" - Cinematic quality
  - "fal-ai/kling-video/v1.5/pro/text-to-video" - Premium motion
  - "fal-ai/ltx-video" - Fast image-to-video
  - Plus 18+ more models
```

### Step 4: Deprecate veotools Reference

Find veotools entry (around lines 204-208) and mark deprecated:

```yaml
# UPDATE
- name: veotools
  provider: Google AI Studio
- strategy: "veotools-mastery skill will be renamed to video-generation to cover ALL fal models"
+ strategy: "DEPRECATED - Veo 3 accessible via fal-video. Use fal-video as primary, veotools as backup only."
+ status: deprecated
+ replacement: mcp__fal-video__execute_custom_model
+ migration_date: "2025-11-05"
+ reason: "fal-video provides Veo 3 PLUS 21 additional models in single interface"
```

### Step 5: Fix Epic 2 Outdated Note

Find and update (around line 473):

```yaml
# BEFORE
note: "Epic 2 greenfield work - agents not yet Notion-aware as of 2025-11-05"

# AFTER
note: "Epic 2 COMPLETE - All agents Notion-integrated with notion-helper.md as of 2025-11-01. Tools verified: notion-search, notion-fetch, notion-update-page, notion-create-pages."
```

---

## 🧪 Validation

### Test 1: YAML Valid

```bash
npm run validate:schemas
# Should pass with no errors
```

### Test 2: Tool Names Follow Patterns

```bash
# Check all primary_tool fields have correct prefixes
grep "primary_tool:" .bmad-core/data/tool-registry.yaml

# Notion should be simple (notion-search)
# Others should have mcp__ prefix
```

### Test 3: Cloudinary Tools Complete

```bash
# Verify actual_tool_name added
grep -A2 "name: upload-asset" .bmad-core/data/tool-registry.yaml | grep "actual_tool_name"
# Should show: actual_tool_name: mcp__cloudinary-asset-mgmt__upload-asset
```

### Test 4: veotools Marked Deprecated

```bash
grep -A5 "name: veotools" .bmad-core/data/tool-registry.yaml | grep "status:"
# Should show: status: deprecated
```

---

## ✅ Success Criteria

- [x] Cloudinary tools have `actual_tool_name` fields with mcp\_\_ prefix
- [x] fal-video has tool_pattern and available_endpoints documented
- [x] veotools marked as `status: deprecated` with replacement info
- [x] Epic 2 note updated to reflect completion
- [x] YAML validation passes
- [x] All tool names match verified patterns from system context

---

## 🔗 Related Tasks

**Previous:** Task 4 (Workflow registry)
**Next:** Task 15 (Slash command sync)
**Blocks:** Task 12 (Skill tool name verification uses this as reference)

---

## 📝 Notes

**Tool Name Patterns (Reference):**

- **Notion:** Simple names (notion-search, notion-fetch)
- **Cloudinary:** mcp**cloudinary-asset-mgmt**[tool]
- **fal-video:** mcp**fal-video**execute_custom_model
- **HeyGen:** mcp**heygen**generate_avatar_video
- **Postiz:** mcp**postiz**integrationSchedulePostTool

**Video Tool Priority:**

1. fal-video (PRIMARY - all video needs)
2. heygen (SPECIALIZED - talking heads only)
3. veotools (DEPRECATED - backup only)

**Estimated Actual Time:** 25-35 minutes
