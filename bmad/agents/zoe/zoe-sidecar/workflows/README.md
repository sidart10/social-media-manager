# Zoe Workflows - Visual Production Specialist

This folder contains all visual production workflows for the Zoe agent. All workflows follow BMAD v6 conventions with folder-based structure.

## Workflow Structure (BMAD v6)

All workflows use the standard folder-based pattern:

```
{workflow-name}/
├── workflow.yaml         # Configuration and metadata
├── instructions.md       # Workflow logic (XML format)
└── checklist.md          # Validation criteria (optional)
```

## Available Workflows

### Image Generation Workflows

**create-images/** - Unified workflow for 1 or multiple images (v3.0)

- **Menu Triggers:** `*create-images` (new), `*create-image` (alias), `*create-carousel` (alias)
- **Modes:** Single (1 image) or Carousel (2-10 images) - auto-routes based on count
- **Purpose:** LinkedIn, YouTube thumbnails, Instagram, Twitter, Sid images, data viz charts/graphs
- **Skills:** universal-image-generation (27 style guides), edit-image, blend-images
- **MCP Tools:** gpt-image-1 (professional/data-viz), nanobanana (social/speed), fal (Sid LoRA)
- **Quality:** Emily JSON methodology, 7-pillar evaluation, WCAG 2.1 (data viz)
- **Features:** Intelligent routing, template support (carousel), backward-compatible aliases
- **Output:** `outputs/projects/{date}-{slug}/04-media/images/` (single: filename.png, carousel: slideNN.png)

**create-single-image/** - DEPRECATED (use create-images instead)

- Replaced by unified create-images workflow
- Kept temporarily for backward compatibility

**create-carousel/** - DEPRECATED (use create-images instead)

- Replaced by unified create-images workflow
- Kept temporarily for backward compatibility

**edit-image/** - Edit and transform existing images

- **Menu Trigger:** `*edit-image`
- **Purpose:** Blur background, remove objects, style transfer, color correction
- **MCP Tools:** nanobanana (pixel-perfect editing)
- **Features:** 8 editing presets, multi-turn refinement, before/after tracking
- **Output:** `outputs/projects/{date}-{slug}/04-media/images/{filename}_edited.png`

**blend-images/** - Composite 2-3 images with natural blending

- **Menu Trigger:** `*blend-images`
- **Purpose:** Photo composition, product mashups, creative blends
- **MCP Tools:** nanobanana (multi-image mode)
- **Features:** Conversational blending, multi-turn refinement
- **Output:** `outputs/projects/{date}-{slug}/04-media/images/blended-{timestamp}.png`

### Video Generation Workflows

**video-editing/** - Professional video editing with SubMagic

- **Menu Trigger:** `*edit-video`
- **Purpose:** Comprehensive video editing (captions, B-rolls, zooms, silence removal)
- **MCP Tools:** SubMagic (all features), Cloudinary (upload)
- **Features:** Auto-captions (100+ languages), magic clips from YouTube, viral optimization
- **Output:** `outputs/projects/{date}-{slug}/04-media/videos/`

**create-scene/** - Generate b-roll scenes or animated diagrams

- **Menu Trigger:** `*create-scene`
- **Purpose:** 8-second video clips for b-roll, diagram animation
- **MCP Tools:** fal-video (Veo 3, Luma Ray 2, Kling)
- **Features:** Text-to-video, image-to-video, aspect ratio optimization
- **Output:** `outputs/projects/{date}-{slug}/04-media/videos/scene_{date}.mp4`

**create-talking-head/** - Generate avatar spokesperson videos

- **Menu Trigger:** `*create-talking-head`
- **Purpose:** Professional talking head videos with HeyGen
- **MCP Tools:** HeyGen (avatars + voices)
- **Features:** Consent verification, custom backgrounds, captions, platform optimization
- **Output:** `outputs/projects/{date}-{slug}/04-media/videos/talking-head_{date}.mp4`

**create-cinematic-sequence/** - Multi-scene cinematic videos

- **Menu Trigger:** `*create-cinematic`
- **Purpose:** Story-driven videos with multiple scenes
- **MCP Tools:** fal-video + nanobanana (keyframe generation)
- **Features:** JSON sequence definition, image generation, animation, merging
- **Output:** `outputs/projects/{date}-{slug}/04-media/videos/{concept}_final.mp4`

**cinematic-film-production/** - Advanced film production pipeline

- **Menu Trigger:** `*create-film`
- **Purpose:** Complete production from storyboard to final cut
- **MCP Tools:** Full suite (fal-video, nanobanana, SubMagic)
- **Features:** Storyboarding, scene planning, generation, editing, post-production
- **Output:** `outputs/projects/{date}-{slug}/04-media/videos/film_{title}.mp4`

**setup-avatars/** - Configure HeyGen avatars and voices

- **Menu Trigger:** `*setup-avatars`
- **Purpose:** One-time setup for avatar/voice defaults
- **MCP Tools:** HeyGen (get_avatar_groups, get_voices)
- **Features:** Consent verification, default configuration
- **Output:** Updates `config.yaml` with defaults

## Configuration

All workflows load configuration from:

```yaml
config_source: '{project-root}/bmad/agents/zoe/config.yaml'
```

Key variables:

- `user_name`: Your name for personalization
- `communication_language`: english
- `outputs_base`: {project-root}/outputs/projects
- `template_folder`: Location of reusable JSON templates

## Output Management (Epic 1 Story 7.6)

All workflows follow the 6-stage lifecycle:

```
outputs/projects/{YYYY-MM-DD}-{project-slug}/
├── 00-session/           # Project metadata, session logs
├── 01-research/          # Research briefs (from Jarvis)
├── 02-ideas/             # Content ideas (from Jarvis)
├── 03-drafts/            # Platform-specific text (from Jarvis)
├── 04-media/             # PLATFORM-AGNOSTIC REUSABLE MEDIA
│   ├── images/           # Zoe generates here
│   │   ├── thumbnail-main.png
│   │   ├── carousel-slide-{N}.png
│   │   └── metadata.json
│   └── videos/           # Zoe generates here
│       ├── short-vertical.mp4
│       └── metadata.json
└── 05-published/         # Final published content (from Zoro)
```

### Platform-Agnostic Naming

**Philosophy:** Generate once, reuse across platforms

Examples:

- ✅ `thumbnail-main.png` (used for LinkedIn + Twitter + Facebook)
- ✅ `short-vertical.mp4` (used for YouTube Shorts + Instagram Reels + TikTok)
- ❌ `thumbnail-linkedin.png` (implies can't reuse)

Metadata tracks platform usage:

```json
{
  "filename": "thumbnail-main.png",
  "used_in_platforms": ["linkedin", "twitter", "facebook"]
}
```

## Cloudinary Integration (Epic 2)

All workflows include optional Cloudinary upload:

- **Why:** Postiz requires public HTTPS URLs (not local file paths)
- **When:** Step 8 or 8.5 in each workflow asks "Upload to Cloudinary?"
- **Result:** Public URL added to Notion for publishing workflows

## Notion Integration (Epic 2 Story 5)

Workflows update Notion Content Tracker:

- **Status:** Kept at "Editing" (media added, ready for publishing)
- **Properties:** Description field with image/video URLs
- **Session Log:** Timestamped agent actions

## Skills Auto-Loading

Workflows create context that triggers skills:

- **Image workflows** → `universal-image-generation` (27 style guides), `linkedin-design` (legacy), `edit-image`, `blend-images` skills
- **Video workflows** → `video-generation` skill
- **Artistic workflows** → `canvas-design`, `algorithmic-art` skills (if creating programmatic art)
- **All workflows** → `platform-specs`, `mcp-tool-selection` skills

## MCP Tool Selection Logic

### Images

- **LinkedIn, Twitter:** gpt-image-1 ($0.04-0.08) - professional quality, text rendering
- **YouTube, Instagram:** nanobanana ($0.039) - speed, cost, social media volume
- **Photorealistic:** gpt-image-1 (best quality)

### Videos

- **Talking heads:** HeyGen ($0.20-0.50/min) - high-quality avatars
- **B-roll/scenes:** fal-video Veo 3 ($0.30/8s) - fast iteration
- **Cinematic:** fal-video Luma Ray 2 ($1-3) - production quality
- **Editing:** SubMagic ($0.08-0.15/min) - captions, zooms, polish

## Testing Workflows

To test a workflow:

1. Activate Zoe: `/zoe`
2. Select menu item by number or text trigger
3. Follow prompts
4. Verify outputs save to correct location
5. Check Cloudinary upload works (if selected)
6. Verify Notion updates (if page linked)

## Invocation

All workflows have `standalone: true` - can be invoked:

- Via Zoe menu: `/zoe` → select number
- Via text trigger: `/zoe` → type `*create-image` (or other trigger)
- Directly from other workflows: `<invoke-workflow path="...">`
- Skills auto-load based on context (universal-image-generation routes to appropriate style)

## Version History

### v3.0 (November 3, 2025) - Workflow Consolidation

**Major change:** Unified image generation workflows

- ✅ Created `create-images/` (unified single + carousel)
- ✅ Deprecated `create-single-image/` and `create-carousel/`
- ✅ Backward-compatible aliases (*create-image, *create-carousel still work)
- ✅ Intelligent routing based on image count
- ✅ Integrated with universal-image-generation skill (27 style guides)
- ✅ Single maintenance point for all image generation

**Benefits:**

- Simpler user experience (one entry point)
- Less confusion (workflow decides routing automatically)
- Easier maintenance (update once vs twice)
- Same functionality preserved (nothing lost)

### v2.0 (November 1, 2025) - BMAD v6 Migration

**Converted from standalone YAMLs to BMAD v6 folder structure:**

- `generate-single.yaml` → `create-single-image/`
- `generate-carousel.yaml` → `create-carousel/`
- `generate-edit-image.yaml` → `edit-image/`
- `generate-scene.yaml` → `create-scene/`
- `generate-talking-head.yaml` → `create-talking-head/`

### v1.0 (Pre-November 2025) - Initial Implementation

- Standalone YAML files
- Direct MCP tool calls in workflows
- No folder structure
- `setup-avatars.yaml` → `setup-avatars/` (minimal conversion)

**New workflows created:**

- `blend-images/` (menu referenced but didn't exist)

**Config paths updated:**

- Old: `{project-root}/bmad/agents/ai-image-generator/config.yaml`
- New: `{project-root}/bmad/agents/zoe/config.yaml`

**Output paths standardized:**

- Old: `{outputs_folder}/single-images/`
- New: `{outputs_base}/{current_date}-{project_slug}/04-media/{images|videos}/`

## Production Status

**READY:**

- ✅ create-single-image (most used, tested)
- ✅ video-editing (SubMagic integration, tested)
- ✅ create-talking-head (HeyGen integration, tested)

**NEEDS TESTING:**

- ⏳ create-carousel (converted, needs functional test)
- ⏳ edit-image (converted, needs functional test)
- ⏳ blend-images (NEW, needs test)
- ⏳ create-scene (converted, needs functional test)
- ⏳ create-cinematic-sequence (converted, needs test)
- ⏳ cinematic-film-production (already structured, needs test)
- ⏳ setup-avatars (converted, needs functional test)

## Support

For issues or questions:

- Workflow errors: Check `bmad/core/tasks/workflow.xml` execution engine
- Config issues: Verify `bmad/agents/zoe/config.yaml` loads correctly
- MCP issues: Check `.mcp.json` server configuration
- Path issues: Ensure `{project-root}` resolves correctly

Last Updated: November 1, 2025
