# Professional Video Editing Workflow

**Version:** 1.0.0
**Agent:** Zoe (Visual Production Specialist)
**Purpose:** Comprehensive AI-powered video editing using SubMagic

---

## Overview

This is **Zoe's most powerful workflow** - a professional video editing suite that asks all the right questions (like a real video editor would) to create perfectly polished, platform-optimized videos.

### What It Does

- Guides you through professional video editing workflow
- Asks detailed questions about purpose, audience, style, and technical specs
- Handles multiple input types (raw footage, HeyGen videos, YouTube URLs)
- Uses SubMagic's full editing suite (captions, zooms, B-rolls, silence removal)
- Manages Cloudinary URLs for all media assets
- Exports platform-optimized videos

### Key Features

**Modular Input Handling:**
- Raw video footage (Cloudinary URL)
- HeyGen avatar videos (Cloudinary URL)
- YouTube URLs (for magic clips)
- Custom B-roll images/videos (Cloudinary URLs)

**Professional Editing:**
- AI-powered captions (100+ languages)
- Magic zooms for emphasis
- Auto B-roll insertion
- Silence removal (3 levels: natural, fast, extra-fast)
- Filler word removal ("um", "uh", "like")
- Custom brand themes or pre-made templates

**Platform Optimization:**
- Platform-specific aspect ratios and resolutions
- Recommended durations per platform
- Export settings optimized for TikTok, Instagram, YouTube, LinkedIn, Twitter

---

## How to Use

### From Zoe Agent Menu

```bash
/zoe
# Select "Video Editing" from the workflow menu
```

### Direct Invocation

```bash
# Run the workflow directly
workflow bmad/agents/zoe/zoe-sidecar/workflows/video-editing
```

---

## Workflow Flow

### Phase 1: Project Discovery (Steps 1-2)
- Understand video purpose and goals
- Identify target platform and audience
- Define key message and desired action

### Phase 2: Source Content (Step 3)
- Gather video source (Cloudinary URL required)
- Collect B-roll assets if available
- Upload local files to Cloudinary if needed

### Phase 3: Editing Configuration (Steps 4-6)
- Define editing style (conservative, balanced, aggressive)
- Configure visual enhancements (zooms, B-rolls)
- Select caption style and branding

### Phase 4: Technical Specs (Step 7)
- Set resolution and aspect ratio
- Define target duration
- Platform-specific optimizations

### Phase 5: Processing (Steps 8-9)
- Create SubMagic project
- Monitor AI processing (5-15 minutes)
- Provide progress updates

### Phase 6: Fine-Tuning (Step 10 - Optional)
- Adjust silence removal
- Add/update custom B-rolls
- Toggle filler word removal

### Phase 7: Export & Delivery (Steps 11-13)
- Export with platform settings
- Download final video
- Save to outputs folder with metadata
- Present results and next steps

---

## Requirements

### MCP Tools Required
- `submagic` - Video editing and caption generation
- `cloudinary-asset-mgmt` - Media URL management

### Environment Variables
```bash
SUBMAGIC_API_KEY=sk-...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Plan Requirements
- SubMagic: Any plan (PRO for custom themes)
- Cloudinary: Free tier sufficient for most use cases

---

## Input Requirements

**CRITICAL:** All media must be accessible via Cloudinary HTTPS URLs.

### Video Source (Required)
One of:
- Cloudinary URL: `https://res.cloudinary.com/{cloud}/video/upload/{id}.mp4`
- YouTube URL: `https://youtube.com/watch?v=...` (for magic clips)
- Local file path (workflow will upload to Cloudinary)

### B-roll Assets (Optional)
- Cloudinary URLs for images or videos
- Timestamp information (when to insert)

### Custom Theme (Optional)
- SubMagic theme UUID (created in SubMagic UI)
- Requires PRO plan

---

## Output Structure

```
outputs/projects/{YYYY-MM-DD}-{project-slug}/04-media/videos/
├── edited-{platform}-{timestamp}.mp4
└── edited-{platform}-{timestamp}-metadata.json
```

### Metadata Includes
- Full project configuration
- Editing settings applied
- SubMagic project ID
- Processing times
- File paths and URLs
- Platform specifications

---

## Examples

### Example 1: Edit Raw Product Demo for TikTok
**Input:** Cloudinary URL of 2-minute raw footage
**Output:** 30-second TikTok-ready video with aggressive pacing, magic zooms, AI B-rolls
**Time:** 8 minutes
**Cost:** ~$0.15

### Example 2: Polish HeyGen Avatar for LinkedIn
**Input:** Cloudinary URL of HeyGen spokesperson video
**Output:** Professional LinkedIn video with branded captions, natural pacing
**Time:** 7 minutes
**Cost:** ~$0.12

### Example 3: Generate Viral Clips from Podcast
**Input:** YouTube URL of 45-minute podcast
**Output:** 15-20 TikTok-ready clips (15-30 seconds each)
**Time:** 18 minutes
**Cost:** ~$1.50-2.00

---

## Advanced Features

### Custom B-roll Insertion
Provide Cloudinary URLs of images/videos with exact timestamps for insertion.

### Brand Consistency
Create custom theme in SubMagic UI once, then reuse the UUID for all videos.

### Multi-Platform Optimization
Run workflow multiple times with same source, different platform settings for cross-posting.

### Iterative Refinement
Can re-edit with different settings using same SubMagic project (saves processing time).

---

## Limitations

**Cannot Edit via API:**
- Individual word/caption timing
- Caption positioning/sizing
- Font selection (must use custom themes)
- Animation styles

**Platform Constraints:**
- Magic clips only work with YouTube URLs
- SubMagic requires public HTTPS URLs (hence Cloudinary requirement)
- Processing time varies (2-15 minutes typical)

---

## Troubleshooting

**"SubMagic requires public URL"**
- Ensure video is uploaded to Cloudinary
- Use Cloudinary's secure HTTPS URL
- Don't use local file paths directly

**"Processing takes too long"**
- Normal for longer videos (10+ minutes)
- Magic clips can take 15-20 minutes
- Use webhooks instead of polling in production

**"Want different caption style"**
- Create custom theme in SubMagic UI
- Save theme UUID in workflow for reuse
- Or try different pre-made templates

---

## Next Steps After Editing

1. **Review** - Watch the video, check quality
2. **Re-edit** - Adjust settings if needed (step 10)
3. **Publish** - Use `/zoro` to schedule to platforms
4. **Batch Process** - Edit multiple videos with same settings
5. **Learn More** - Check `submagic-editing-reference.md` for advanced techniques

---

**Files in this workflow:**
- `workflow.yaml` - Configuration and metadata
- `instructions.md` - Step-by-step execution logic
- `submagic-editing-reference.md` - Complete SubMagic API guide
- `README.md` - This file

**Last Updated:** 2025-11-01
**Maintained by:** sid
