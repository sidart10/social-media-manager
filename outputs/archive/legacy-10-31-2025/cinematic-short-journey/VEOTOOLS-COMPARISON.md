# Veotools MCP Server Comparison

**Analysis Date**: 2025-10-31
**GitHub Repo**: https://github.com/frontboat/veotools.git

---

## Current Installation vs GitHub Version

### ✅ What We Currently Have (MCP Tools)

| Tool                                     | Description                         | Status  |
| ---------------------------------------- | ----------------------------------- | ------- |
| `mcp__veotools__preflight`               | Environment/model diagnostics       | ✅ Have |
| `mcp__veotools__version`                 | Package version info                | ✅ Have |
| `mcp__veotools__list_models`             | Discover available Veo models       | ✅ Have |
| `mcp__veotools__cache_create_from_files` | Create cached content from files    | ✅ Have |
| `mcp__veotools__cache_get`               | Get cached content metadata         | ✅ Have |
| `mcp__veotools__cache_list`              | List cached entries                 | ✅ Have |
| `mcp__veotools__cache_update`            | Update cache TTL/expiry             | ✅ Have |
| `mcp__veotools__cache_delete`            | Delete cache entry                  | ✅ Have |
| `mcp__veotools__plan_scenes`             | **Generate scene plan with Gemini** | ✅ Have |
| `mcp__veotools__generate_start`          | Start video generation job          | ✅ Have |
| `mcp__veotools__generate_get`            | Get generation job status/result    | ✅ Have |
| `mcp__veotools__generate_cancel`         | Cancel running job                  | ✅ Have |
| `mcp__veotools__continue_video`          | Video continuation with stitching   | ✅ Have |

**Total**: 13 MCP tools

---

### 🆕 What GitHub Repo Offers (Additional Features)

#### CLI Commands (Not in MCP)

| Command            | Purpose                             | Available in MCP?          |
| ------------------ | ----------------------------------- | -------------------------- |
| `veo plan`         | Generate/save storyboard JSON       | ⚠️ Partial (`plan_scenes`) |
| `veo plan-execute` | Render clips + stitch from plan     | ❌ Missing                 |
| `veo plan-run`     | One-command: plan → render → stitch | ❌ Missing                 |
| `veo generate`     | Low-level text-to-video             | ✅ Have (`generate_start`) |
| `veo continue`     | Low-level video extension           | ✅ Have (`continue_video`) |
| `veo list-models`  | Display model variants              | ✅ Have                    |
| `veo preflight`    | Diagnostics                         | ✅ Have                    |

#### Python API Functions (May Not Be Exposed in MCP)

| Function Category    | Functions                                                                    | In MCP?                       |
| -------------------- | ---------------------------------------------------------------------------- | ----------------------------- |
| **Scene Planning**   | `generate_scene_plan()`, `SceneWriter`                                       | ✅ `plan_scenes`              |
| **Plan Execution**   | `execute_scene_plan()`                                                       | ❌ Missing                    |
| **Video Generation** | `generate_from_text()`, `generate_from_image()`, `generate_from_video()`     | ✅ `generate_start`           |
| **Media Analysis**   | `extract_frame()`, `extract_frames()`, `get_video_info()`                    | ❌ Missing                    |
| **Video Stitching**  | `stitch_videos()`, `stitch_with_transitions()`, `create_transition_points()` | ⚠️ Partial (`continue_video`) |
| **Workflow API**     | `Bridge` (fluent multi-step API)                                             | ❌ Missing                    |

---

## 🔍 Feature Gap Analysis

### Critical Missing Features

#### 1. **Plan Execution (`execute_scene_plan`)**

- **What it does**: Takes a generated plan and automatically executes all scenes
- **Current workaround**: We have `plan_scenes` to create plan, but must manually loop through scenes with `generate_start`
- **Impact**: **HIGH** - This is what makes "one-command story generation" possible
- **Example use case**: Our "THE JOURNEY" script needs 9 scenes - with `execute_scene_plan`, this would be one call instead of 9

#### 2. **Video Stitching Functions**

- **What they do**:
  - `stitch_videos()` - Combine multiple clips with audio preservation
  - `stitch_with_transitions()` - Add transitions between clips
  - `create_transition_points()` - Define smooth transition timing
- **Current workaround**: `continue_video` has some stitching, but limited
- **Impact**: **HIGH** - Critical for multi-scene films like "THE JOURNEY"
- **Example use case**: After generating 9 scenes, we need to stitch them into one 60-second film

#### 3. **Media Analysis Functions**

- **What they do**:
  - `extract_frame()` - Pull specific frame from video
  - `extract_frames()` - Extract multiple frames
  - `get_video_info()` - Get duration, resolution, metadata
- **Current workaround**: None available
- **Impact**: **MEDIUM** - Useful for frame-accurate editing and seed frame extraction
- **Example use case**: Extract final frame of Scene 1 to seed Scene 2 (continuity)

#### 4. **Bridge Workflow API**

- **What it does**: Fluent API for chaining multi-step video generation
- **Current workaround**: Manual orchestration
- **Impact**: **MEDIUM** - Nice to have for complex workflows
- **Example use case**: `Bridge.idea(prompt).plan().execute().stitch().export()`

#### 5. **One-Command Story Generation (`plan-run`)**

- **What it does**: Plan → Execute → Stitch in single command
- **Current workaround**: Must call `plan_scenes`, then loop `generate_start`, then manual stitching
- **Impact**: **HIGH** - This is the killer feature of the GitHub version
- **Example use case**: `veo plan-run --idea "THE JOURNEY" --scenes 9`

---

## 📊 Current Workflow vs Ideal Workflow

### Current Workflow (With Our MCP Tools)

```
1. Generate plan: mcp__veotools__plan_scenes(idea, scenes=9)
2. For each scene in plan:
   a. Call mcp__veotools__generate_start(scene_prompt)
   b. Poll mcp__veotools__generate_get(job_id) until complete
3. Manually download all 9 videos
4. Use external tool (FFmpeg, video editor) to stitch
5. Manual audio alignment
```

**Time**: ~2-3 hours (mostly manual work)
**Complexity**: HIGH
**Error-prone**: YES (manual stitching, audio sync issues)

### Ideal Workflow (With GitHub Repo Features)

```
1. Call execute_scene_plan(plan) or plan-run CLI
2. Wait for completion
3. Get stitched final video with perfect audio
```

**Time**: ~30 minutes (mostly waiting for rendering)
**Complexity**: LOW
**Error-prone**: NO (automated pipeline)

---

## 🎯 Recommendations

### Option 1: Install Full veotools Package (Recommended)

```bash
pip install "veotools[mcp]"

# Then update MCP config to use:
# veo-mcp (should auto-detect the new installation)
```

**Pros**:

- Get ALL features (plan execution, stitching, media analysis)
- One-command story generation
- Better maintained (official package on PyPI)
- CLI tools available for debugging

**Cons**:

- Need to update MCP server config
- Potential breaking changes if API differs

**Risk**: LOW (we can test before switching)

### Option 2: Keep Current + Manual Orchestration

Keep current MCP server, write wrapper functions to:

- Loop through plan scenes
- Call generate_start for each
- Download and stitch manually with FFmpeg

**Pros**:

- No changes needed
- Keep current working setup

**Cons**:

- Manual stitching required
- No audio-preserving pipeline
- Labor intensive for multi-scene projects
- Higher error rate

**Risk**: NONE (no changes)

### Option 3: Hybrid Approach

Install full veotools package but keep current MCP:

- Use MCP tools for scene-by-scene generation
- Use Python CLI (`veo plan-execute`) for stitching

**Pros**:

- Get stitching features
- Keep current MCP integration
- Best of both worlds

**Cons**:

- Need to install package anyway
- Still manual orchestration

---

## 🚀 Recommended Action Plan

### Phase 1: Install & Test (15 minutes)

```bash
# Install veotools with MCP support
pip install "veotools[mcp]"

# Verify installation
veo --version
veo list-models

# Test basic command
veo plan --idea "Test scene" --scenes 2 --json
```

### Phase 2: Update MCP Config (5 minutes)

```bash
# Check current veo-mcp location
which veo-mcp

# Update Claude MCP config if needed
# (Should auto-detect new installation)
claude mcp list
```

### Phase 3: Test "THE JOURNEY" Script (30 minutes)

```bash
# Test the full workflow with our 9-scene script
veo plan-run \
  --idea "Man walking through changing landscapes toward mysterious door" \
  --scenes 9 \
  --save-plan output-plans/the-journey.json \
  --execute-model veo-3.0-generate-001
```

### Phase 4: Compare Results

- Compare MCP output quality vs CLI
- Test audio preservation in stitched video
- Verify scene continuity

---

## 💡 Key Insight for "THE JOURNEY" Project

**This is exactly what we need!** The GitHub repo's `execute_scene_plan` + stitching pipeline is PERFECT for your 9-scene cinematic film:

1. We already created the detailed script
2. We can convert it to a proper scene plan JSON
3. Use `veo plan-execute` to render all 9 scenes automatically
4. Get stitched 60-second film with perfect audio
5. NO manual work

**Without these features**: We'd spend 2-3 hours manually generating, downloading, and stitching 9 scenes.

**With these features**: 30 minutes hands-off, automated pipeline.

---

## 🎬 Next Steps for Video Agent Handoff

If we upgrade to full veotools:

1. **Video Agent** receives THE JOURNEY script
2. Converts to proper scene plan format (or uses our detailed prompts)
3. Runs: `veo plan-execute --plan the-journey.json --model veo-3.0-generate-001 --seed-last-frame`
4. Waits for completion (~30 min)
5. Delivers: `output/videos/stitched_the_journey.mp4`

**Done.** No manual stitching, no audio sync issues, no frame continuity problems.

---

## Summary

| Capability              | Current MCP | GitHub Repo | Gap Impact |
| ----------------------- | ----------- | ----------- | ---------- |
| Scene Planning          | ✅          | ✅          | None       |
| Single Scene Generation | ✅          | ✅          | None       |
| Multi-Scene Execution   | ❌          | ✅          | **HIGH**   |
| Video Stitching         | ⚠️ Partial  | ✅ Full     | **HIGH**   |
| Audio Preservation      | ❌          | ✅          | **HIGH**   |
| Frame Extraction        | ❌          | ✅          | Medium     |
| One-Command Stories     | ❌          | ✅          | **HIGH**   |

**Recommendation**: **Install full veotools package** - The features you're missing (plan execution, stitching, audio preservation) are exactly what "THE JOURNEY" project needs.

**Installation risk**: LOW
**Benefit impact**: HIGH
**Time saved per project**: 2-3 hours

---

**Ready to upgrade?** I can help install and test the new version right now.
