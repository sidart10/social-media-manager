# AI Video Agent 📹

**Video Content Engineer & Algorithm Expert**

Social media video generation agent that orchestrates AI-powered video creation across HeyGen (talking heads), Veo (scene generation), and image stitching for platform-optimized content.

---

## What It Does

The AI Video Agent is your production coordinator for creating videos optimized for Instagram Reels, YouTube Shorts, TikTok, and other social platforms. It intelligently routes between different AI video providers based on your needs:

- **Talking Head Videos** (HeyGen) - Your face and voice on camera
- **Generated Scenes** (Veo) - B-roll, conceptual footage, backgrounds
- **Image Montages** - Stitch images into video sequences
- **Hybrid Content** - Mix multiple sources into cohesive videos

### Platform Intelligence

Built-in optimization for:
- Instagram Reels (9:16, <90s, captions, 1.5s hook)
- YouTube Shorts (9:16, <60s, 3s hook)
- TikTok (9:16, 1s hook critical)
- YouTube Standard (16:9, chapters, longer form)
- LinkedIn, Twitter/X

---

## Quick Start

### 1. Activate the Agent
```
Call: ai-video-agent
```

### 2. Setup Avatars (First Time)
```
Command: *setup-avatars
```
This will:
- List your HeyGen avatars
- Verify consent for each
- Configure defaults

### 3. Generate Your First Video

**Talking Head for Instagram Reels:**
```
Command: *reels
```

**B-Roll Scene:**
```
Command: *create-scene
```

**See All Commands:**
```
Command: *help
```

---

## Core Commands

### Primary Generation
- `*create-talking-head` - Generate avatar video with HeyGen
- `*create-scene` - Generate video scene with Veo (text-to-video)
- `*create-montage` - Stitch images into video sequence
- `*create-hybrid` - Mix talking head + scenes + images

### Platform Quick Commands
- `*reels` - Instagram Reels optimized (9:16, captions, hook@1.5s)
- `*youtube-short` - YouTube Shorts optimized (9:16, hook@3s)
- `*youtube` - YouTube standard (16:9, longer form)
- `*tiktok` - TikTok optimized (9:16, hook@1s)

### Production Management
- `*test-hooks` - A/B test 3 different video opens
- `*queue-status` - Show all rendering jobs
- `*setup-avatars` - Configure avatars with consent
- `*preview` - See settings and cost before generating
- `*platforms` - List all platform specs

---

## How It Works

### Smart Provider Routing

The agent automatically routes to the best tool:

**Want your face on camera?** → **HeyGen**
- Authentic avatar with your likeness
- Voice cloning
- Natural speech pacing
- ~$0.30 per minute

**Want generated b-roll/scenes?** → **Veo**
- Text-to-video generation
- Up to 8 seconds per clip
- 720p/1080p options
- ~$0.30-1.00 per clip

**Want image sequences?** → **Montage Workflow**
- Stitch images with transitions
- Add motion and effects
- Export as video

### Platform Optimization

The agent knows what performs on each platform:

**Instagram Reels:**
- 9:16 vertical
- Hook in first 1.5 seconds
- Captions ON (80% watch muted)
- 30-60s sweet spot

**YouTube Shorts:**
- 9:16 vertical
- Hook in first 3 seconds
- <60 seconds
- Retention is everything

**TikTok:**
- 9:16 vertical
- Hook in first 1 second (fastest)
- 7-15s = highest engagement
- Sound/music critical

---

## MCP Server Integration

This agent uses three MCP servers:

### 1. HeyGen MCP Server ✓
- **Status**: Installed and connected
- **Purpose**: Talking head avatar videos
- **Tools**: list_avatars, list_voices, create_avatar_video, check_video_status

### 2. Veo MCP Server (Custom) ✓
- **Status**: Installed and connected
- **Purpose**: Text-to-video scene generation
- **Tools**: video_story_generate, video_story_status
- **Location**: `/veo-mcp-server/`

### 3. Existing Image Servers ✓
- gpt-image-1 (OpenAI)
- nanobanana (Gemini)

All API keys configured in `/.env`

---

## File Structure

```
bmad/agents/ai-video-agent/
├── ai-video-agent.agent.yaml          # Agent definition
├── README.md                          # This file
├── workflows/                         # Generation workflows
│   ├── generate-talking-head.yaml
│   ├── talking-head-instructions.md
│   ├── generate-scene.yaml
│   └── scene-generation-instructions.md
└── ai-video-agent-sidecar/           # Agent resources
    ├── config.yaml                    # API keys, settings
    ├── instructions.md                # Critical directives
    ├── platform-specs.yaml            # Platform requirements
    ├── outputs/                       # Generated videos
    └── consent/                       # Avatar consent artifacts
```

---

## Configuration

### API Keys (`config.yaml`)
```yaml
api_keys:
  heygen_api_key: '${HEYGEN_API_KEY}'
  gemini_api_key: '${GEMINI_API_KEY}'
  openai_api_key: '${OPENAI_API_KEY}'
```

Keys loaded from project `.env` file.

### Provider Settings
```yaml
providers:
  default_talking_head: heygen
  default_scene_generation: veo

  heygen:
    caption_enabled: true  # Always ON by default

  veo:
    model: 'veo-3.1-generate-preview'  # or veo-3.1-fast-generate-preview
    default_resolution: '720p'
    default_duration_sec: '8'
```

### Cost Controls
```yaml
generation:
  auto_cost_estimate: true
  max_cost_per_video_usd: 5.0  # Safety limit
```

---

## Safety & Ethics

### Consent Verification
- **ALWAYS** verify avatar consent before HeyGen generation
- Un-consented avatars are BLOCKED
- Run `*setup-avatars` to configure consent

### Watermark Preservation
- **NEVER** strip C2PA metadata or watermarks
- Sora 2 videos include provenance - must be preserved
- Legal compliance non-negotiable

### Cost Guards
- Estimates shown before every generation
- Safety limit: $5.00 per video (configurable)
- User approval required for costs > $1.00

---

## Typical Workflow

### Example: Instagram Reel Talking Head

1. **Start**: `*reels`
2. **Platform confirmed**: Instagram Reels (9:16)
3. **Pick avatar**: From your consented list
4. **Pick voice**: Match to avatar style
5. **Script**: Agent estimates duration
6. **Hook reminder**: "First 1.5 seconds are critical"
7. **Captions**: ON by default
8. **Cost estimate**: Shows ~$0.40 for 30s video
9. **Generate**: Queues HeyGen job
10. **Poll status**: Updates every 5s
11. **Delivered**: Video URL + metadata saved
12. **Next**: Generate another, test hooks, or done

---

## Output Files

Every video generates two files:

### 1. Video File
```
reels_heygen_20251025_143022.mp4
```

### 2. Metadata JSON
```json
{
  "prompt": "Original script",
  "provider": "heygen",
  "platform": "instagram-reels",
  "duration_sec": 30,
  "resolution": "1080x1920",
  "aspect_ratio": "9:16",
  "captions_enabled": true,
  "avatar_id": "avatar_xyz",
  "voice_id": "voice_abc",
  "video_url": "https://...",
  "cost_usd": 0.42,
  "render_time_sec": 187,
  "consent_verified": true,
  "created_at": "2025-10-25T14:30:22Z"
}
```

---

## Troubleshooting

### "Un-consented avatar" Error
**Fix**: Run `*setup-avatars` to verify consent

### Video Generation Timeout
**Cause**: Complex videos can take 5-10 minutes
**Fix**: Check `*queue-status` - job may still be processing

### Cost Exceeded Limit
**Fix**: Adjust `max_cost_per_video_usd` in `config.yaml`

### MCP Server Not Connected
**Check**: `claude mcp list` should show:
- ✓ heygen
- ✓ veo

---

## Agent Personality

**Voice**: Data-driven platform expert who collaboratively solves creative problems with smart technical routing

**Example**:
*"Reels video - nice! That's 9:16 vertical for max retention. I'm thinking your face via HeyGen for authenticity, maybe layer some Veo b-roll behind you? Either way, captions ON since 80% watch muted. Hook needs to hit in 1.5 seconds. What's the core message we're delivering?"*

---

## Roadmap

**Current Features:**
- ✅ HeyGen talking head generation
- ✅ Veo scene generation
- ✅ Platform-specific optimization
- ✅ Cost estimation & guards
- ✅ Consent verification
- ✅ Queue management

**Coming Soon:**
- 🔜 Image-to-video montage stitching
- 🔜 Hybrid multi-source videos
- 🔜 A/B hook testing
- 🔜 Sora 2 integration (when API available)
- 🔜 Webhook support (async delivery)

---

## Credits

Built with:
- **HeyGen API** - Talking head avatars
- **Google Gemini Veo 3.1** - Text-to-video generation
- **Claude Agent SDK** - MCP orchestration
- **BMAD Framework** - Agent architecture

---

**Ready to create videos that stop the scroll?** 🎬

Call the agent: `ai-video-agent`
