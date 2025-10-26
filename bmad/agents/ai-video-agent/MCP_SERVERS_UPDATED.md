# AI Video Agent - MCP Servers Updated ✅

**Updated**: 2025-10-25
**Status**: Production-Ready MCP Integration

---

## 🎯 What Changed

### Removed ❌
- **Custom Veo MCP server** (our TypeScript implementation)
- Old placeholder Sora reference

### Added ✅
- **Public Veo 3 MCP server** (`uvx mcp-veo3`) - Community-maintained
- **Public Sora 2 MCP server** (`npx sora-2-mcp-server`) - Community-maintained
- Complete tool documentation for all three providers

---

## 🚀 Current MCP Server Setup

### 1. HeyGen MCP Server ✅
**Command**: `uvx heygen-mcp`
**Status**: ✓ Connected
**Purpose**: Talking head avatar videos with your face and voice

**Available Tools**:
- `mcp__heygen__get_avatar_groups` - List avatar collections
- `mcp__heygen__get_avatars_in_avatar_group` - Get avatars in a group
- `mcp__heygen__get_voices` - List available voices
- `mcp__heygen__generate_avatar_video` - Create talking head video
- `mcp__heygen__get_avatar_video_status` - Check render status

**Your Avatars**:
- "Sid Dani" (private avatar) ✓
- "Matthew" (public kit)
- 2x "Photo Avatar" groups

---

### 2. Veo 3 MCP Server ✅
**Command**: `uvx mcp-veo3 --output-dir [path]`
**Status**: ✓ Connected
**Purpose**: Text-to-video and image-to-video generation via Google Gemini

**Available Tools**:
- `mcp__veo3__generate_video` - Create video from text prompt
- `mcp__veo3__generate_video_from_image` - Animate images with motion
- `mcp__veo3__list_generated_videos` - List all generated videos
- `mcp__veo3__get_video_info` - Get video metadata

**Models Available**:
- `veo-3.0-generate-preview` (highest quality)
- `veo-3.0-fast-generate-preview` (faster, for drafts)
- `veo-2.0-generate-001` (previous generation)

**Output Directory**: `/bmad/agents/ai-video-agent/ai-video-agent-sidecar/outputs/veo3/`

---

### 3. Sora 2 MCP Server ✅
**Command**: `npx -y sora-2-mcp-server`
**Status**: ✓ Connected
**Purpose**: Cinematic quality video generation via OpenAI Sora 2

**Available Tools**:
- `mcp__sora2__create_video` - Create video from text prompt
- `mcp__sora2__get_video_status` - Check generation status
- `mcp__sora2__list_videos` - List all videos
- `mcp__sora2__delete_video` - Remove video
- `mcp__sora2__merge_videos` - Stitch multiple clips with fade transitions
- `mcp__sora2__create_fade_animation` - Turn images into video with fades

**Models Available**:
- `sora-2` (standard quality)
- `sora-2-pro` (premium quality)

**Sizes Supported**:
- `1280x720` (landscape HD)
- `720x1280` (vertical portrait)
- `1792x1024` (widescreen)
- `1024x1792` (tall vertical)

**Durations**: 4s, 8s, or 12s

**Important**: Includes watermark and C2PA provenance - must be preserved!

---

## 📊 Provider Comparison

| Feature | HeyGen | Veo 3 | Sora 2 |
|---------|--------|-------|--------|
| **Type** | Talking heads | Generated scenes | Cinematic video |
| **Best For** | Your face on camera | B-roll, concepts | Premium quality |
| **Duration** | Unlimited (script-based) | Flexible | 4s, 8s, 12s |
| **Quality** | Authentic avatar | Good-Excellent | Cinematic |
| **Speed** | 2-4 min | Fast model available | Varies |
| **Cost** | ~$0.30/min | Medium | Higher |
| **Consent** | Required | Not needed | Not needed |
| **Watermark** | No | No | Yes (C2PA) |
| **Best Use** | Personal brand, thought leadership | Quick b-roll, stock footage | Premium content |

---

## 🎯 Smart Routing Logic

The agent now routes based on:

**User wants their face?** → **HeyGen**
- Authentic avatar
- Voice cloning
- Personal brand content

**User wants fast b-roll?** → **Veo 3**
- Quick generation
- Can animate images
- Good quality, lower cost

**User wants cinematic quality?** → **Sora 2**
- Superior visual quality
- Longer duration options (up to 12s)
- Premium results

**User wants to stitch clips?** → **Sora 2 merge_videos**
- FFmpeg-based merging
- Fade transitions
- Multi-clip assembly

---

## ✅ Configuration Updates Applied

### config.yaml
```yaml
providers:
  default_scene_generation: veo3  # Changed from 'veo'

  veo3:  # New section
    enabled: true
    model: 'veo-3.0-fast-generate-preview'
    default_aspect_ratio: '16:9'
    output_dir: './outputs/veo3'

  sora2:  # New section
    enabled: true
    model: 'sora-2'
    default_size: '1280x720'
    default_seconds: '4'

mcp_servers:
  veo3:  # Updated from 'veo'
    server_name: 'veo3'
    tool_prefix: 'mcp__veo3__'
    tools: [generate_video, generate_video_from_image, list_generated_videos, get_video_info]

  sora2:  # New
    server_name: 'sora2'
    tool_prefix: 'mcp__sora2__'
    tools: [create_video, get_video_status, list_videos, delete_video, merge_videos, create_fade_animation]
```

### instructions.md
- ✅ Added complete Veo 3 tool documentation
- ✅ Added complete Sora 2 tool documentation
- ✅ Updated routing logic for all three providers
- ✅ Added watermark preservation notes for Sora 2

### ai-video-agent.agent.yaml
- ✅ Updated persona to mention all three providers
- ✅ Updated critical_actions with correct tool names
- ✅ Updated menu descriptions
- ✅ Added Sora 2 watermark requirements

---

## 🧪 Ready to Test

All three MCP servers are connected and documented. To test:

### Test HeyGen (Talking Head)
```bash
# List your avatars
mcp__heygen__get_avatar_groups

# You should see "Sid Dani" avatar available
```

### Test Veo 3 (Scene Generation)
```bash
# Generate a simple test scene
mcp__veo3__generate_video
prompt: "A peaceful ocean wave at sunset"
aspect_ratio: "16:9"
model: "veo-3.0-fast-generate-preview"
```

### Test Sora 2 (Cinematic)
```bash
# Generate premium video
mcp__sora2__create_video
prompt: "A golden retriever puppy playing in grass"
model: "sora-2"
size: "1280x720"
seconds: "4"
```

---

## 📝 Next Steps

1. ✅ **MCP Servers**: All installed and connected
2. ✅ **Configuration**: Updated with correct tool names
3. ✅ **Documentation**: Complete tool reference in instructions.md
4. 🔜 **Test Generation**: Try creating videos with each provider
5. 🔜 **Update Workflows**: Modify workflow files to use correct tool names
6. 🔜 **Push to GitHub**: Commit these MCP server updates

---

## 🎬 Three-Provider Power

Your AI Video Agent now has:

**Speed** → Veo 3 Fast (quick b-roll)
**Quality** → Sora 2 Pro (cinematic content)
**Authenticity** → HeyGen (your face and voice)

Plus merge/stitch capabilities via Sora 2!

---

**Ready to test or shall we push these updates to GitHub?** 🚀
