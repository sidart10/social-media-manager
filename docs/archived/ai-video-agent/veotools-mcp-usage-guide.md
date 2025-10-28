# VeoTools MCP Server - Complete Usage Guide 🎬

**Date:** 2025-10-28
**Purpose:** Proper usage of veotools MCP for image-to-video

---

## 📋 VeoTools MCP Tools Available

Based on the MCP server code, here are ALL the tools exposed:

### 🔧 System Tools:
1. **`preflight()`** - Check environment & prerequisites
2. **`version()`** - Package and dependency versions
3. **`list_models(include_remote: bool)`** - Available Veo models

### 🎬 Generation Tools:
4. **`generate_start(prompt, model, aspect_ratio, ...)`** - Start video generation
5. **`generate_get(operation_name)`** - Get generation status/result
6. **`continue_video(operation_name, prompt, ...)`** - Extend existing video

### 🎨 Scene Planning Tools:
7. **`plan_scenes(...)`** - Generate Gemini scene plan
8. **`execute_plan(plan_json, model, ...)`** - Render from plan

### 📦 Cache Tools:
9. **`cache_create_from_files()`** - Create cached content
10. **`cache_get()`, `cache_list()`, `cache_update()`, `cache_delete()`

### 📹 Media Tools:
11. **`extract_frame(video_path, timestamp_sec)`** - Extract still frame
12. **`extract_frames(video_path, count, ...)`** - Extract multiple frames
13. **`get_video_info(video_path)`** - Video metadata
14. **`stitch_videos(video_paths, ...)`** - Merge clips

### 📁 Job Management:
15. **`job_list()`** - List all jobs
16. **`job_get(job_id)`** - Get job details
17. **`job_delete(job_id)`** - Delete job

---

## 🎯 Image-to-Video with VeoTools

**The KEY tool for your use case:**

### `generate_start()` - For Image-to-Video

**From the code:**
```python
@app.tool()
def generate_start(
    prompt: str,
    model: str | None = None,
    aspect_ratio: str | None = None,
    seed_image_path: str | None = None,     # ⭐ THIS IS IT!
    seed_video_path: str | None = None,
    last_frame_path: str | None = None,
    duration: int | None = None,
    person_generation: str | None = None
) -> dict:
    """Start a video generation job.

    Args:
        prompt: Text prompt for video generation
        seed_image_path: Path to image for image-to-video ⭐
        ...

    Returns: {operation_name, job_id, status}
    """
```

**Then poll with:**
```python
generate_get(operation_name=<name_from_start>)
```

---

## 🚀 How to Use for Your Beach Frames

### Step 1: Start Generation
```
Tool: mcp__veotools__generate_start

Parameters:
{
    "prompt": "Windswept hair flowing in ocean breeze, hand through hair, body sway, camera push-in",
    "seed_image_path": "/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/agents/ai-image-generator/ai-image-generator-sidecar/outputs/beach-sequence/frame1-opening-confident-pose.png",
    "model": "veo-3.0-generate-preview",
    "aspect_ratio": "9:16",
    "duration": 8
}
```

**Returns:**
```json
{
    "operation_name": "operations/abc123",
    "job_id": "job_xyz",
    "status": "processing"
}
```

### Step 2: Poll for Completion
```
Tool: mcp__veotools__generate_get

Parameters:
{
    "operation_name": "operations/abc123"
}
```

**Returns (when done):**
```json
{
    "status": "completed",
    "video_path": "output/videos/video_*.mp4",
    "duration": 8.0
}
```

---

## 💡 Key Parameters

**For Image-to-Video:**
- `prompt`: Motion description
- `seed_image_path`: ⭐ Your image file path
- `model`: "veo-3.0-generate-preview" or "veo-3.0-fast-generate-preview"
- `aspect_ratio`: "9:16" for vertical
- `duration`: 8 (seconds)
- `person_generation`: "allow_adult" (default for image-seeded)

**For Text-to-Video:**
- Same but omit `seed_image_path`

---

## 🔧 Environment Setup

**VeoTools reads from `.env` file OR environment variables:**

```bash
# Must be in working directory or parent
GEMINI_API_KEY=AIzaSyCHgri7MU_iHJ7Q5ixovfdsJ0_1KWLN3u4
VEO_OUTPUT_DIR=/path/to/output  # Optional
VEO_PROVIDER=google  # or "daydreams" for router
```

**Your .env has GEMINI_API_KEY:** ✅

---

## 🎬 Complete Workflow

### Animate 5 Beach Frames:

```python
# Frame 1
result1 = generate_start(
    prompt="Hair blowing, hand through hair, body sway, camera push-in",
    seed_image_path="frame1-opening-confident-pose.png",
    model="veo-3.0-generate-preview",
    aspect_ratio="9:16"
)
# Poll: generate_get(result1.operation_name)

# Frame 2
result2 = generate_start(
    prompt="Walking along water, foot splashing, graceful movement",
    seed_image_path="frame2-walking-waters-edge.png",
    ...
)

# ... Frame 3, 4, 5

# Stitch all together
final = stitch_videos(
    video_paths=[video1, video2, video3, video4, video5],
    output_path="beach-montage-final.mp4"
)
```

---

## ✅ VeoTools MCP Server Start Command

**Current MCP config should use:**
```bash
claude mcp add veotools \
  -e GEMINI_API_KEY=AIzaSyCHgri7MU_iHJ7Q5ixovfdsJ0_1KWLN3u4 \
  -- /Users/sid/.local/bin/veo-mcp
```

**Or with Python:**
```bash
claude mcp add veotools \
  -e GEMINI_API_KEY=AIzaSyCHgri7MU_iHJ7Q5ixovfdsJ0_1KWLN3u4 \
  -- /Users/sid/.local/pipx/venvs/veotools/bin/python -m veotools.server.mcp_server
```

---

## 🎯 After Restart - Exact Usage

**Test with your Frame 1:**
```
mcp__veotools__generate_start({
    "prompt": "Windswept hair flowing in ocean breeze, hand through hair gesture, confident body sway, slow camera push-in focusing on face, golden hour warm glow",
    "seed_image_path": "/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/agents/ai-image-generator/ai-image-generator-sidecar/outputs/beach-sequence/frame1-opening-confident-pose.png",
    "model": "veo-3.0-generate-preview",
    "aspect_ratio": "9:16",
    "duration": 8
})
```

**Then poll:**
```
mcp__veotools__generate_get({
    "operation_name": "<from_start_result>"
})
```

---

## 💰 Cost

**VeoTools uses Google Gemini API:**
- FREE tier available
- Veo 3 generation included
- No additional cost beyond Google quota

---

## 🚀 Production Usage Pattern

```
For each beach frame:
1. generate_start(seed_image_path=frame, prompt=motion)
2. Poll generate_get() until completed
3. Save video_path from result

After all 5 frames done:
4. stitch_videos(all_5_videos) → final montage!
```

**This is THE proper way to use veotools MCP!** ✅

---

_Complete VeoTools MCP usage documented!_ 🎯📚
