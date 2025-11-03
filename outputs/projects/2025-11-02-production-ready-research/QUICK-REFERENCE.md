# Production-Ready System - Quick Reference

**For:** Rapid PRP development
**Date:** 2025-11-02

---

## VERIFIED MCP TOOL NAMES (Copy-Paste Ready)

### Images

```
mcp__nanobanana__generate_image
mcp__gpt-image-1__create_image
```

### Videos

```
mcp__fal-video__execute_custom_model  ⭐ PRIMARY (22+ models)
mcp__heygen__generate_avatar_video    (Talking heads only)
```

### Publishing

```
mcp__postiz__integrationSchedulePostTool  (Multi-platform)
mcp__mcp_twitter__create_twitter_post
mcp__youtube-uploader-mcp__upload_video
```

### Research

```
mcp__exa__search
mcp__firecrawl__firecrawl_search  ⭐ MOST POWERFUL
mcp__apify__search-actors
```

### Storage

```
mcp__cloudinary-asset-mgmt__upload-asset  ⭐ CRITICAL for public URLs
```

---

## CRITICAL GAPS TO FIX

### 1. Missing Agent Files

```bash
❌ bmad/agents/zoe/zoe.md
❌ bmad/agents/zoro/zoro.md
```

### 2. Registry Cleanup

- Remove duplicate entries (agent manifest lines 6-7, workflow manifest 16-17)
- Fix standalone/ path references (non-existent directory)

### 3. Validation Tests

- Agent activation tests
- MCP tool availability checks
- End-to-end workflow tests

---

## FILE PATTERNS

### Agent File

```xml
<?xml version="1.0" encoding="UTF-8"?>
<agent>
  <identity>
    <name>agent-name</name>
    <display_name>Display Name</display_name>
  </identity>
  <persona>
    <who_i_am>...</who_i_am>
    <how_i_communicate>...</how_i_communicate>
    <what_i_believe>...</what_i_believe>
  </persona>
  <sidecar_location>
    <path>bmad/agents/{module}/{name}-sidecar</path>
  </sidecar_location>
  <capabilities>
    <workflows>...</workflows>
    <skills>...</skills>
  </capabilities>
</agent>
```

### Workflow File

```yaml
name: workflow-name
description: 'Description'
author: 'Agent Name'

config_source: '{agent-folder}/config.yaml'
output_folder: '{config_source}:output_folder'

mcp_tools_required:
  - tool_name: [function1, function2]

inputs:
  - param1: 'Description (required)'

outputs:
  - output1: 'What gets created'

template: false
instructions: '{installed_path}/instructions.md'
```

### Output Structure

```
outputs/projects/{YYYY-MM-DD}-{slug}/
├── 00-session/
├── 01-research/
├── 02-ideas/
├── 03-drafts/{platform}/
├── 04-media/{images|videos}/
└── 05-published/{platform}/
```

---

## QUALITY GATES

```bash
npm run lint              # Must pass with 0 warnings
npm run format:check      # Must pass
npm run test              # All tests pass
npm run validate:schemas  # All YAML valid
```

---

## KEY DECISIONS MADE

1. **Video Tool:** fal-video execute_custom_model (PRIMARY)
2. **Agent Location:** Modular (bmad/agents/{module}/{agent}.md)
3. **Output Structure:** V2.0 Project-centric with 6 lifecycle folders
4. **Registry Approach:** Clean rebuild from filesystem scan

---

**Full Research:** See PRODUCTION-READY-RESEARCH-FINDINGS.md
