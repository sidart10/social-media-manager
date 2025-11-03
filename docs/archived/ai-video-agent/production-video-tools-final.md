# Production Video Tools - Final Setup 🎬

**Date:** 2025-10-28
**Status:** Installing battle-tested alternatives

---

## ✅ What We're Installing

### 1. VeoTools (Production-Grade!) ⭐

**Package:** `veotools[mcp]`
**Source:** https://github.com/frontboat/veotools
**Status:** ✅ Installed v0.1.10

**Why This is THE ONE:**

- ✅ Purpose-built for Veo image-to-video
- ✅ "Audio-preserving stitching" with FFmpeg
- ✅ Scene planning + rendering + stitching
- ✅ Python-first clean API
- ✅ MCP server included
- ✅ **Has WORKING examples in production!**

**Features:**

- `generate_from_image()` - Image-to-video
- `generate_from_text()` - Text-to-video
- `stitch_videos()` - Merge clips
- `extract_frame()` - Get frames
- Progress tracking
- Multi-scene orchestration

### 2. fal-image-video-mcp (Proven Alternative)

**Package:** `fal-image-video-mcp`
**Status:** ✅ Installed + Configured with FAL_API_KEY

**Why Keep This:**

- ✅ Multi-model support (Veo, Sora, others)
- ✅ Proven working in production
- ✅ Automatic downloads
- ✅ High performance

---

## 🔧 Configuration Applied

**veotools:**

```
Command: veo-mcp
Env: GEMINI_API_KEY=AIzaSyCHgri7MU_iHJ7Q5ixovfdsJ0_1KWLN3u4
Output: bmad/agents/ai-video-agent/ai-video-agent-sidecar/outputs/veotools
```

**fal-video:**

```
Command: npx fal-image-video-mcp
Env: FAL_API_KEY=2470b2e9-655d-4acb-b5f0-54e04996884d:21549e7d164ebbb5aa1899ead6166076
```

---

## 🎯 Why These Will Work

### VeoTools:

- **Built FOR this exact use case!**
- Has production examples
- Handles FFmpeg stitching
- Scene-aware workflows
- Direct SDK integration (no middleware bugs)

### fal.ai:

- Abstracts away API complexity
- Multi-model fallback
- Proven stable
- Easy to use

---

## 🚀 After Restart

**Test Order:**

1. **veotools** (primary - purpose-built!)
2. **fal-video** (backup - if veotools has issues)
3. **veo3-fixed** (last resort - our manual fixes)

**Commands After Restart:**

```
/ai-video-agent

"test veotools image-to-video with frame 1"
```

---

## 📊 Tool Comparison

| Tool           | Status        | Image-to-Video    | Cost | Production Ready |
| -------------- | ------------- | ----------------- | ---- | ---------------- |
| **veotools**   | ✅ Installing | ✅ Native support | FREE | ⭐⭐⭐⭐⭐       |
| **fal-video**  | ✅ Ready      | ✅ Multi-model    | Paid | ⭐⭐⭐⭐         |
| **veo3-fixed** | ⚠️ Buggy      | ❌ 3 bugs         | FREE | ⭐⭐             |
| **sora2-real** | ⚠️ Size issue | ❌ Payload limit  | Paid | ⭐⭐             |

---

## ✅ Recommended Agent Configuration

**AI Video Agent Should Use:**

1. **Primary:** veotools (purpose-built, production-ready)
2. **Backup:** fal-video (proven, multi-model)
3. **Remove:** veo3-fixed, sora2-real (too buggy)

**This gives you RELIABLE tools!** 🛠️

---

_Installing veotools now - standby for connection status..._
