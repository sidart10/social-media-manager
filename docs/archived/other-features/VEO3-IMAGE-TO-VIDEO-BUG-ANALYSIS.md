# Veo3 Image-to-Video Bug Analysis & Fix Plan

**Date:** 2025-10-28
**Issue:** Veo3 MCP Server `generate_video_from_image` tool is failing

## 🐛 Error Details

```
Error: Image-to-video generation failed:
Video generation failed:
Files.upload() got an unexpected keyword argument 'path'
```

## 🔍 Root Cause Analysis

**The Problem:**
The Veo3 MCP server is calling Google's Gemini `Files.upload()` API with a `path` parameter, but the actual API doesn't accept that parameter name.

**Google Gemini Files API Correct Usage:**

```python
# WRONG (what Veo3 MCP is doing):
Files.upload(path="/path/to/image.png")

# CORRECT (what it should be):
Files.upload(file="/path/to/image.png")
# OR
Files.upload(file=<file_object>)
```

## 📊 Current Capabilities

### Veo3 MCP Server

- ✅ `generate_video` (text-to-video) - **WORKS**
- ❌ `generate_video_from_image` (image-to-video) - **BROKEN**
- ✅ `list_generated_videos` - Works
- ✅ `get_video_info` - Works

### Sora2 MCP Server

- ✅ `create_video` (text-to-video) - Works
- ❌ **No image-to-video capability**
- ✅ `merge_videos` - Works
- ✅ `create_fade_animation` - Works (but not real motion)

## 🎯 Fix Options

### Option 1: Fix Veo3 MCP Server (RECOMMENDED)

**Complexity:** Medium
**Impact:** Permanent fix, enables image-to-video with real motion
**Steps:**

1. Locate Veo3 MCP server source code
2. Find the `generate_video_from_image` function
3. Fix the `Files.upload()` call parameter from `path=` to `file=`
4. Test the fix
5. Restart MCP server

### Option 2: Use Alternative Tools

**Complexity:** Low
**Impact:** Workaround, not a real fix
**Options:**

- RunwayML Gen-2 (external service, $$$)
- Pika Labs (external service, $$$)
- Use only text-to-video (doesn't maintain exact model)

### Option 3: Enhance Sora2 for Image-to-Video

**Complexity:** High
**Impact:** Would add capability to Sora2
**Not Feasible:** Sora2 API doesn't support image-to-video yet

## 🔧 Fix Plan: Option 1 (Detailed)

### Step 1: Locate Veo3 MCP Server

Veo3 is likely running via Claude's MCP infrastructure. Possible locations:

- NPM global packages
- Python packages (via pip/uv)
- Claude's built-in MCP servers
- Custom installation in project

**Search Commands:**

```bash
# Find npm packages
npm list -g | grep veo

# Find python packages
pip list | grep veo
uv pip list | grep veo

# Search filesystem
find ~ -name "*veo*" -type f 2>/dev/null

# Check Claude MCP config
grep -i "veo" ~/.claude.json
```

### Step 2: Identify Source Code Location

The Veo3 MCP server is likely:

- A Node.js/TypeScript MCP server
- OR a Python MCP server

**Look for files:**

- `veo-mcp-server/` directory
- `mcp-veo/` directory
- Files with `veo` in name
- MCP server implementations in `~/.claude/mcp/` or similar

### Step 3: Fix the Bug

**File to find:** Something like `veo3-server.ts` or `veo3-server.py`

**Code to find (Python example):**

```python
# CURRENT BROKEN CODE:
result = Files.upload(
    path=image_path,  # ❌ WRONG PARAMETER
    mime_type="image/png"
)

# FIXED CODE:
result = Files.upload(
    file=image_path,  # ✅ CORRECT PARAMETER
    mime_type="image/png"
)
```

**OR (if using file object):**

```python
# Open file and upload
with open(image_path, 'rb') as f:
    result = Files.upload(
        file=f,
        mime_type="image/png"
    )
```

### Step 4: Test the Fix

After fixing:

```bash
# Restart Claude Code
# OR restart the MCP server if running separately

# Test the fix
claude mcp test veo3
```

### Step 5: Verify

Try the image-to-video generation again:

```python
mcp__veo3__generate_video_from_image(
    image_path="/path/to/image.png",
    prompt="Add motion"
)
```

## 🚨 Current Workaround

**Until the bug is fixed:**

1. **Use Veo3 Text-to-Video** (generate NEW videos similar to your images)
   - Won't be the exact model
   - But will have real motion
   - Fast generation (~60-90 seconds)

2. **Use Professional Video Editors**
   - CapCut: Ken Burns effects, transitions
   - Premiere Pro: More control
   - Actual motion but on static images

3. **Use External AI Services**
   - RunwayML Gen-2: Upload images, AI adds motion
   - Pika Labs: Similar to Runway
   - Cost: ~$0.50-1.00 per video

## 📝 Notes for Developer

**If you're fixing this yourself:**

1. The issue is in the Veo3 MCP server code
2. It's a simple parameter name bug in the Files.upload() call
3. Check Google Gemini Files API documentation for correct parameter names
4. The API likely expects `file=` not `path=`
5. May also need to handle file objects vs. file paths correctly

**Google Gemini Files API Reference:**
https://ai.google.dev/gemini-api/docs/file-uploading

## ✅ Success Criteria

Fix is successful when:

- ✅ `mcp__veo3__generate_video_from_image` doesn't throw parameter error
- ✅ Image files upload successfully to Gemini Files API
- ✅ Video generation starts and completes
- ✅ Output video shows motion based on prompt
- ✅ Generated video maintains the image's content/model

## 📞 Next Steps

**Immediate:**

1. Search for Veo3 MCP server source code
2. Locate the bug in the code
3. Apply the fix
4. Test with your beach sequence images

**Alternative:**

1. Use Veo3 text-to-video to generate NEW videos (not exact model)
2. Use professional video editor for motion effects
3. Wait for bug fix from Veo3 MCP maintainer

---

**Status:** DIAGNOSED - Ready to fix
**Severity:** Medium (workarounds available)
**Fix Time:** 15-30 minutes once source code is located
