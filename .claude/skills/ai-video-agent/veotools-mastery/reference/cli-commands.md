# Veotools CLI Reference

> Complete command-line interface for veotools production workflows

## Installation

```bash
# Basic installation (CLI + SDK)
pip install veotools

# With MCP server support
pip install "veotools[mcp]"

# Development / contribution
pip install -e ".[dev,mcp]"
```

## Environment Setup

```bash
# Required: Gemini API key for planning and Veo access
export GEMINI_API_KEY="your-gemini-key-here"

# Optional: Use Daydreams Router as proxy
export VEO_PROVIDER="daydreams"
export DAYDREAMS_API_KEY="sk-router-..."
# export DAYDREAMS_BASE_URL="https://api-beta.daydreams.systems/v1"

# Optional: Custom output directory
export VEO_OUTPUT_DIR="/custom/path/to/outputs"
```

**Providers:**
- `VEO_PROVIDER="google"` (default) - Direct Google GenAI SDK
- `VEO_PROVIDER="daydreams"` - Proxy through Daydreams Router

---

## Core Commands

### 1. `veo plan-run` - Complete Story Pipeline

**One-command workflow**: Idea → Storyboard → Render → Stitch

```bash
veo plan-run \
  --idea "N64 Japanese retro explainer about the x402 protocol" \
  --scenes 5 \
  --save-plan output-plans/x402.json \
  --execute-model veo-3.0-generate-001 \
  --seed-last-frame \
  --seed-offset -0.25 \
  --aspect-ratio 16:9
```

**Flags:**
- `--idea TEXT` - Story concept/description (REQUIRED)
- `--scenes INT` - Number of scenes to generate (default: 4)
- `--save-plan PATH` - Save storyboard JSON for reuse
- `--execute-model MODEL` - Veo model to use for rendering
- `--seed-last-frame` - Use last frame of each clip to seed next clip
- `--seed-offset FLOAT` - Seconds before end to extract seed frame (default: -0.25)
- `--aspect-ratio RATIO` - Video format: 16:9 (landscape) or 9:16 (portrait)
- `--context TEXT` - Additional guidance for Gemini planning
- `--no-stitch` - Skip final video stitching (output individual clips only)

**Output:**
```
output-plans/x402.json           # Gemini storyboard (if --save-plan)
output/videos/video_abc123.mp4   # Individual scene clips
output/videos/stitched_xyz789.mp4 # Final stitched video
```

**Example:**
```bash
# Instagram Reels story (vertical format)
veo plan-run \
  --idea "Day in the life of an AI agent learning to code" \
  --scenes 6 \
  --aspect-ratio 9:16 \
  --execute-model veo-3.0-fast-generate-001 \
  --seed-last-frame
```

---

### 2. `veo plan` - Generate Storyboard Only

**Gemini-powered scene planning** without execution

```bash
veo plan \
  --idea "Retro travel vlog through cyber-Tokyo" \
  --scenes 4 \
  --save output-plans/vlog.json \
  --json \
  --context "Keep tone energetic and educational"
```

**Flags:**
- `--idea TEXT` - Story concept (REQUIRED)
- `--scenes INT` - Number of scenes (default: 4)
- `--save PATH` - Output JSON path
- `--json` - Format output as JSON (for piping to other tools)
- `--context TEXT` - Additional creative direction
- `--style TEXT` - Visual style guidance (e.g., "cinematic", "documentary")
- `--characters TEXT` - Character descriptions for consistency

**Output Structure:**
```json
{
  "idea": "Retro travel vlog through cyber-Tokyo",
  "style": "N64 retro aesthetic",
  "scenes": [
    {
      "scene_number": 1,
      "description": "Neon-lit street bustling with holographic billboards",
      "duration": 8,
      "camera_movement": "slow pan",
      "mood": "energetic, futuristic",
      "audio_notes": "synthwave music, street ambience"
    },
    ...
  ]
}
```

**Use Case:**
- Review/edit storyboard before rendering
- Iterate on creative direction
- Share plans with collaborators
- Use as input for custom workflows

---

### 3. `veo plan-execute` - Execute Existing Plan

**Render clips from saved storyboard**

```bash
veo plan-execute \
  --plan output-plans/vlog.json \
  --model veo-3.0-generate-001 \
  --seed-last-frame \
  --seed-offset -0.25 \
  --output-dir outputs/vlog-final
```

**Flags:**
- `--plan PATH` - JSON storyboard to execute (REQUIRED)
- `--model MODEL` - Veo model for rendering
- `--seed-last-frame` - Enable frame seeding
- `--seed-offset FLOAT` - Seed frame extraction offset
- `--output-dir PATH` - Custom output location
- `--scenes RANGE` - Render specific scenes only (e.g., `1-3`, `1,3,5`)
- `--no-stitch` - Skip final stitching
- `--stitch-only` - Only stitch (assumes clips already rendered)

**Examples:**
```bash
# Render only scenes 2-4
veo plan-execute --plan story.json --scenes 2-4

# Re-stitch existing clips
veo plan-execute --plan story.json --stitch-only

# Custom output location
veo plan-execute --plan story.json --output-dir ~/Desktop/my-video
```

---

### 4. `veo generate` - Single Clip Generation

**Low-level Veo API for ad hoc clips**

```bash
# Text-to-video
veo generate \
  --prompt "Sunset over cyberpunk cityscape with neon reflections" \
  --model veo-3.0-generate-001 \
  --aspect-ratio 16:9 \
  --output sunset-clip.mp4

# Image-to-video
veo generate \
  --prompt "Camera slowly zooms into futuristic building" \
  --image diagram.png \
  --model veo-3.0-generate-001 \
  --output diagram-animated.mp4

# Video-to-video continuation
veo generate \
  --prompt "Continue the motion as character walks forward" \
  --video scene1.mp4 \
  --model veo-3.0-generate-001 \
  --output scene2.mp4
```

**Flags:**
- `--prompt TEXT` - Motion/scene description (REQUIRED)
- `--model MODEL` - Veo model to use
- `--image PATH` - Input image for image-to-video
- `--video PATH` - Input video for video-to-video continuation
- `--aspect-ratio RATIO` - 16:9 or 9:16
- `--output PATH` - Output file path
- `--person-generation POLICY` - allow_all | allow_adult | disallow (default: allow_all)
- `--negative-prompt TEXT` - What to avoid in generation

**Person Generation Policies:**
- `allow_all` - Default for text-to-video
- `allow_adult` - Default for image/video-seeded clips
- `disallow` - No people in generation

---

### 5. `veo continue` - Video Continuation

**Extend existing video** with new prompt

```bash
veo continue \
  --video scene1.mp4 \
  --prompt "Character turns and walks toward camera" \
  --model veo-3.0-generate-001 \
  --output scene1-continued.mp4
```

**Use Case:**
- Extend a clip that ended too soon
- Create variations of the same starting point
- Build sequences without full storyboard

---

### 6. `veo list-models` - Discovery

**List available Veo models**

```bash
# List all models
veo list-models

# Include remote models (requires API call)
veo list-models --include-remote

# JSON output for scripting
veo list-models --json
```

**Output:**
```
Available Veo Models:
├─ veo-3.0-generate-001 (Veo 3.0 Standard)
│  ├─ Duration: 8s default
│  ├─ Generation time: ~120s
│  └─ Capabilities: audio, high quality
├─ veo-3.0-fast-generate-001 (Veo 3.0 Fast)
│  ├─ Duration: 8s default
│  ├─ Generation time: ~60s
│  └─ Capabilities: audio, fast iteration
└─ veo-2.0-generate-001 (Veo 2.0 Legacy)
   ├─ Duration: 5s default (customizable)
   ├─ Generation time: ~180s
   └─ Capabilities: duration control, fps control, enhance
```

---

### 7. `veo preflight` - Environment Diagnostics

**Validate setup before generation**

```bash
veo preflight
```

**Checks:**
- ✓ GEMINI_API_KEY is set and valid
- ✓ VEO_PROVIDER configuration
- ✓ Output directory writable
- ✓ FFmpeg installed (for stitching)
- ✓ API connectivity
- ✓ Model access permissions

**Output:**
```
Veotools Preflight Check
========================
✓ GEMINI_API_KEY: Set and valid
✓ VEO_PROVIDER: google (direct SDK)
✓ Output directory: /Users/sid/veotools/output (writable)
✓ FFmpeg: Installed (v6.0)
✓ API connectivity: Connected to Google GenAI
✓ Model access: veo-3.0-generate-001, veo-3.0-fast-generate-001

All systems ready for generation!
```

---

## Advanced Workflows

### Multi-Scene with Custom Editing

```bash
# 1. Generate storyboard
veo plan \
  --idea "Product demo video" \
  --scenes 5 \
  --save product-plan.json

# 2. Edit product-plan.json manually
#    - Adjust scene descriptions
#    - Change durations
#    - Add specific camera angles

# 3. Execute edited plan
veo plan-execute \
  --plan product-plan.json \
  --model veo-3.0-generate-001 \
  --seed-last-frame

# 4. Re-generate specific scene
veo generate \
  --prompt "Improved version of scene 3" \
  --model veo-3.0-generate-001 \
  --output output/videos/video_scene3_v2.mp4

# 5. Re-stitch with new clip (manual FFmpeg or re-execute)
```

### Iterative Scene Development

```bash
# Fast iterations
veo generate \
  --prompt "Hero shot of product" \
  --model veo-3.0-fast-generate-001 \
  --output test-v1.mp4

# Refine prompt, regenerate
veo generate \
  --prompt "Hero shot of product with dramatic lighting" \
  --model veo-3.0-fast-generate-001 \
  --output test-v2.mp4

# Final quality render
veo generate \
  --prompt "Hero shot of product with dramatic lighting and slow zoom" \
  --model veo-3.0-generate-001 \
  --output final-hero.mp4
```

### Batch Processing

```bash
# Generate storyboards for multiple videos
for idea in "Video 1 idea" "Video 2 idea" "Video 3 idea"; do
  veo plan \
    --idea "$idea" \
    --save "plan-$(echo $idea | sed 's/ /-/g').json"
done

# Execute all plans
for plan in plan-*.json; do
  veo plan-execute \
    --plan "$plan" \
    --model veo-3.0-fast-generate-001
done
```

---

## Output Structure

```
output/
├── videos/
│   ├── video_abc123.mp4        # Individual scene clips
│   ├── video_def456.mp4
│   ├── video_ghi789.mp4
│   └── stitched_xyz789.mp4     # Final stitched video
├── frames/
│   ├── seed_frame_scene1.png   # Auto-extracted seed frames
│   ├── seed_frame_scene2.png
│   └── custom_extracts/
├── ops/
│   ├── job_abc123.json         # Job metadata
│   ├── models.json             # Cached model list
│   └── execution_log.json      # Execution tracking
└── plans/
    └── story_xyz.json          # Saved storyboards
```

---

## Common Patterns

### YouTube Explainer Video
```bash
veo plan-run \
  --idea "Explaining how quantum computing works" \
  --scenes 6 \
  --aspect-ratio 16:9 \
  --execute-model veo-3.0-generate-001 \
  --seed-last-frame \
  --context "Educational, clear visuals, avoid technical jargon"
```

### Instagram Reels Story
```bash
veo plan-run \
  --idea "Morning routine of a productivity expert" \
  --scenes 5 \
  --aspect-ratio 9:16 \
  --execute-model veo-3.0-fast-generate-001 \
  --seed-last-frame \
  --context "Fast-paced, energetic, relatable"
```

### Product Demo
```bash
veo plan-run \
  --idea "New smartphone features showcase" \
  --scenes 4 \
  --aspect-ratio 16:9 \
  --execute-model veo-3.0-generate-001 \
  --seed-last-frame \
  --context "Professional, sleek, modern aesthetic"
```

---

## Tips & Best Practices

### Performance Optimization:
1. **Use fast models for iterations**: `veo-3.0-fast-generate-001`
2. **Test with fewer scenes**: Start with 3-4 scenes
3. **Enable frame seeding**: Smoother transitions = better final video
4. **Set seed offset wisely**: -0.25s to -0.5s works best

### Quality Improvement:
1. **Detailed prompts**: More description = better results
2. **Consistent style**: Mention style in --context for scene planning
3. **Review storyboard**: Edit plan before executing
4. **Iterate on key scenes**: Re-generate important scenes at higher quality

### Cost Management:
1. **Fast models for testing**: ~50% faster generation
2. **Batch similar content**: Amortize planning overhead
3. **Reuse storyboards**: Tweak and re-execute instead of re-planning
4. **Selective rendering**: Use --scenes flag to render specific scenes only

---

## Troubleshooting

### "API key not found"
```bash
# Verify key is set
echo $GEMINI_API_KEY

# Set if missing
export GEMINI_API_KEY="your-key-here"

# Test with preflight
veo preflight
```

### "FFmpeg not found"
```bash
# Install FFmpeg (macOS)
brew install ffmpeg

# Install FFmpeg (Ubuntu)
sudo apt-get install ffmpeg

# Verify
ffmpeg -version
```

### "Model not accessible"
```bash
# List available models
veo list-models --include-remote

# Use accessible model
veo generate --model veo-3.0-fast-generate-001 ...
```

### "Generation failed"
- Check prompt complexity (simplify if too complex)
- Verify image/video paths exist
- Try different model
- Check API quota/limits

---

## Related Commands

### External Tools:
```bash
# Extract specific frame from video
ffmpeg -i video.mp4 -ss 00:00:05 -vframes 1 frame.png

# Convert aspect ratio
ffmpeg -i input.mp4 -vf "scale=1280:720" output.mp4

# Concatenate videos manually
ffmpeg -f concat -i filelist.txt -c copy output.mp4
```

### Python SDK Equivalent:
```bash
# CLI
veo generate --prompt "..." --output clip.mp4

# Python SDK
import veotools as veo
result = veo.generate_from_text(prompt="...", output_path="clip.mp4")
```

---

## Next Steps

- **Python SDK**: See `reference/python-sdk.md` for programmatic access
- **Multi-Scene Workflows**: See `reference/multi-scene-workflows.md` for advanced patterns
- **MCP Integration**: See `reference/mcp-integration.md` for Claude Code usage
- **Examples**: See `reference/examples/` for complete workflows
