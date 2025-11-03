# THE JOURNEY - Production Plan

**60-Second Cinematic Short Film**

## Project Overview

- **Film**: THE JOURNEY (Love, Death & Robots style)
- **Duration**: 60 seconds (9 scenes, 6-7s each)
- **Format**: 16:9 cinematic (1280x720)
- **Scenes**: 9 with extreme environment transitions
- **Challenge**: Character consistency across desert → canyon → forest → storm → snow → night → void → door
- **Production Date**: 2025-10-31

---

## Production Strategy

### Phase 1: Character Reference Generation

**Goal**: Create master visual anchor for character consistency

**Character Specification**:

- Male, 30s
- Weathered dark jacket (navy/charcoal)
- Worn brown leather boots
- Determined facial expression
- Short dark hair, stubble
- Medium build, athletic but not overly muscular
- Facing camera at 3/4 angle (reference pose)

**Tool**: Gemini 2.5 Flash Image (nanobanana) or Imagen 4
**Output**: `character-reference-master.png`
**Prompt**:

```
Photorealistic CGI character reference, male in his 30s, weathered dark navy jacket over dark shirt, worn brown leather boots, short dark hair, stubble beard, determined focused expression, medium athletic build, standing in neutral pose facing camera at 3/4 angle, Love Death and Robots visual style, high detail textures, cinematic lighting, 8k quality, full body shot
```

---

### Phase 2: Scene Key Frame Generation (9 Images)

**Goal**: Generate starting frame for each scene showing SAME character in each environment

Each image uses:

- Character reference as style guide
- Scene-specific environment
- Character positioned for motion (walking toward camera)

#### Scene 1 Key Frame: Desert Dawn

**Prompt**:

```
Photorealistic CGI, same male character from reference (30s, dark weathered jacket, worn boots, determined expression), walking toward camera across vast desert at golden hour sunrise, orange purple red sky, long shadows on sand dunes, mountains in distance, Love Death and Robots style, 8k, cinematic wide shot
```

**Output**: `scene1-keyframe-desert.png`

#### Scene 2 Key Frame: Desert Canyon

**Prompt**:

```
Photorealistic CGI, same male character (dark jacket, worn boots), walking through narrow red desert canyon under harsh midday sun, heat waves shimmer, stark shadows, sweat on face, towering canyon walls, Love Death and Robots style, 8k, medium shot
```

**Output**: `scene2-keyframe-canyon.png`

#### Scene 3 Key Frame: Forest Transition

**Prompt**:

```
Photorealistic CGI, same male character (dark jacket, worn boots), walking through lush green forest, tall ancient trees, filtered emerald light, moss and ferns, steady determined pace, Love Death and Robots style, 8k, tracking shot composition
```

**Output**: `scene3-keyframe-forest.png`

#### Scene 4 Key Frame: Storm

**Prompt**:

```
Photorealistic CGI, same male character (dark jacket, worn boots), walking through dark moody forest in heavy rain, storm clouds overhead, rain streaming down face and clothes, lightning visible in background, Love Death and Robots style, 8k, dramatic weather
```

**Output**: `scene4-keyframe-storm.png`

#### Scene 5 Key Frame: Winter

**Prompt**:

```
Photorealistic CGI, same male character (dark jacket, worn boots), walking through heavy snowfall in winter forest clearing, visible breath in cold air, snow on shoulders and hair, bare snow-covered trees, Love Death and Robots style, 8k, wide shot
```

**Output**: `scene5-keyframe-winter.png`

#### Scene 6 Key Frame: Night

**Prompt**:

```
Photorealistic CGI, same male character silhouette (dark jacket, worn boots), walking under vast starry night sky with visible Milky Way, endless dark plain, cosmic backdrop, subtle moonlight rim lighting on profile, Love Death and Robots style, 8k, low angle
```

**Output**: `scene6-keyframe-night.png`

#### Scene 7 Key Frame: The Abyss

**Prompt**:

```
Photorealistic CGI, same male character (dark jacket, worn boots), walking through infinite dark void, no ground no sky, tiny white light in far distance, figure lit by soft sourceless light, deep charcoal abyss with subtle gradients, Love Death and Robots style, 8k, existential
```

**Output**: `scene7-keyframe-abyss.png`

#### Scene 8 Key Frame: The Door

**Prompt**:

```
Photorealistic CGI, same male character (dark jacket, worn boots), approaching modern dark wood door with silver handle standing alone in void, door faintly glowing around edges, character stops and faces camera with knowing peaceful smile, Love Death and Robots style, 8k, medium shot
```

**Output**: `scene8-keyframe-door.png`

#### Scene 9 Key Frame: The Exit

**Prompt**:

```
Photorealistic CGI, open dark wood door with bright white light pouring out into dark void, male character has walked through (silhouette inside light), camera pulling back showing void becoming framed in perfect black square, Love Death and Robots style, 8k, extreme zoom out
```

**Output**: `scene9-keyframe-exit.png`

---

### Phase 3: Video Generation (Image-to-Video with Veo)

**Goal**: Animate each key frame with motion prompts from script

**Model**: `veo-3.0-generate-001` (high quality, 8s default)
**Aspect Ratio**: 16:9
**Method**: Image-to-video using key frames as input

#### Scene 1: Dawn - The Beginning (7s)

**Input Image**: `scene1-keyframe-desert.png`
**Motion Prompt**:

```
Character walks steadily toward camera across desert, slow camera push in from wide to medium shot, golden hour light, long shadows move subtly, smooth determined walking pace, photorealistic Love Death and Robots style
```

**Output**: `scene1-dawn-7s.mp4`

#### Scene 2: Midday - The Harsh Sun (6s)

**Input Image**: `scene2-keyframe-canyon.png`
**Motion Prompt**:

```
Character walks steadily through canyon toward camera, static medium shot, heat waves shimmer visibly, harsh sunlight, sweat glistens, unwavering determined pace, photorealistic style
```

**Output**: `scene2-midday-6s.mp4`

#### Scene 3: Forest Transition - The Shift (7s)

**Input Image**: `scene3-keyframe-forest.png`
**Motion Prompt**:

```
Character walks steadily through forest, camera tracks alongside at medium distance, filtered green light, ambient forest motion (leaves, ferns sway gently), steady pace, photorealistic style
```

**Output**: `scene3-forest-7s.mp4`

#### Scene 4: Storm - The Test (7s)

**Input Image**: `scene4-keyframe-storm.png`
**Motion Prompt**:

```
Character walks steadily through heavy rain, rain streams down dramatically, lightning flashes illuminate scene, thunder implied, undeterred expression, front-facing medium shot, volumetric rain effects
```

**Output**: `scene4-storm-7s.mp4`

#### Scene 5: Winter - The Cold (7s)

**Input Image**: `scene5-keyframe-winter.png`
**Motion Prompt**:

```
Character walks through heavy snowfall, visible breath clouds in cold air, snow falls continuously, wide shot showing isolation, soft ethereal lighting, steady determined pace through white landscape
```

**Output**: `scene5-winter-7s.mp4`

#### Scene 6: Night - The Darkness (7s)

**Input Image**: `scene6-keyframe-night.png`
**Motion Prompt**:

```
Character silhouette walks under vast starry sky, Milky Way visible above, low angle looking up showing both man and stars, subtle moonlight rim lighting, cosmic scale, anamorphic lens aesthetic
```

**Output**: `scene6-night-7s.mp4`

#### Scene 7: The Abyss - Approaching the Threshold (7s)

**Input Image**: `scene7-keyframe-abyss.png`
**Motion Prompt**:

```
Character walks through infinite void toward tiny distant white light, slow zoom in toward light, figure lit by sourceless light, existential atmosphere, deep charcoal gradients, approaching mysterious destination
```

**Output**: `scene7-abyss-7s.mp4`

#### Scene 8: The Door - The Moment (6s)

**Input Image**: `scene8-keyframe-door.png`
**Motion Prompt**:

```
Character reaches door and stops for first time, turns to camera with knowing peaceful smile breaking fourth wall, then turns and opens door releasing bright white light, walks through, door stays open, dramatic lighting transition
```

**Output**: `scene8-door-6s.mp4`

#### Scene 9: The Exit - The Revelation (6s)

**Input Image**: `scene9-keyframe-exit.png`
**Motion Prompt**:

```
Continuous extreme zoom out from open door with white light, revealing void is contained in perfect black square, infinite zoom showing square becoming smaller in deeper darkness, mind-bending perspective, metaphysical revelation
```

**Output**: `scene9-exit-6s.mp4`

---

### Phase 4: Frame Seeding Enhancement (Optional)

**Goal**: Use last frame of each scene to guide next scene for motion continuity

**Method**:

- Extract frame at t=-0.25s from Scene N
- Use as additional visual reference when generating Scene N+1
- Helps maintain motion flow between scenes

**Example**:

```bash
# Extract last frame of Scene 1
ffmpeg -i scene1-dawn-7s.mp4 -ss 00:00:06.75 -vframes 1 scene1-lastframe.png

# Use scene1-lastframe.png + scene2-keyframe-canyon.png as dual reference for Scene 2
```

**Note**: This is optional since environment changes are intentionally drastic. Character key frames are more important for consistency.

---

### Phase 5: Stitching & Final Assembly

**Goal**: Combine all 9 scenes into single 60-second film

**Method**: FFmpeg concat with audio preservation

```bash
# Create concat file
echo "file 'scene1-dawn-7s.mp4'" > concat-list.txt
echo "file 'scene2-midday-6s.mp4'" >> concat-list.txt
echo "file 'scene3-forest-7s.mp4'" >> concat-list.txt
echo "file 'scene4-storm-7s.mp4'" >> concat-list.txt
echo "file 'scene5-winter-7s.mp4'" >> concat-list.txt
echo "file 'scene6-night-7s.mp4'" >> concat-list.txt
echo "file 'scene7-abyss-7s.mp4'" >> concat-list.txt
echo "file 'scene8-door-6s.mp4'" >> concat-list.txt
echo "file 'scene9-exit-6s.mp4'" >> concat-list.txt

# Stitch
ffmpeg -f concat -safe 0 -i concat-list.txt -c copy THE-JOURNEY-FINAL.mp4
```

**Output**: `THE-JOURNEY-FINAL.mp4` (60 seconds)

---

### Phase 6: Metadata & Handoff

**Goal**: Document production and create handoff package

**Metadata JSON**:

```json
{
  "film_title": "THE JOURNEY",
  "duration_seconds": 60,
  "format": "16:9 cinematic (1280x720)",
  "style": "Love, Death & Robots - Photorealistic CGI",
  "production_date": "2025-10-31",
  "scenes": 9,
  "model": "veo-3.0-generate-001",
  "generation_method": "image-to-video with character reference",
  "character_spec": "Male 30s, dark weathered jacket, worn boots, determined",
  "total_generation_time": "[TBD]",
  "estimated_cost": "[TBD]",
  "output_path": "outputs/10-31-2025/cinematic-short-journey/THE-JOURNEY-FINAL.mp4"
}
```

---

## File Structure

```
outputs/10-31-2025/cinematic-short-journey/
├── scripts/
│   └── THE-JOURNEY-cinematic-script.md
├── assets/
│   ├── character-reference-master.png
│   ├── scene1-keyframe-desert.png
│   ├── scene2-keyframe-canyon.png
│   ├── scene3-keyframe-forest.png
│   ├── scene4-keyframe-storm.png
│   ├── scene5-keyframe-winter.png
│   ├── scene6-keyframe-night.png
│   ├── scene7-keyframe-abyss.png
│   ├── scene8-keyframe-door.png
│   └── scene9-keyframe-exit.png
├── videos/
│   ├── scene1-dawn-7s.mp4
│   ├── scene2-midday-6s.mp4
│   ├── scene3-forest-7s.mp4
│   ├── scene4-storm-7s.mp4
│   ├── scene5-winter-7s.mp4
│   ├── scene6-night-7s.mp4
│   ├── scene7-abyss-7s.mp4
│   ├── scene8-door-6s.mp4
│   ├── scene9-exit-6s.mp4
│   └── THE-JOURNEY-FINAL.mp4
├── metadata/
│   ├── production-metadata.json
│   ├── veo-jobs.json
│   └── cost-tracking.json
├── PRODUCTION-PLAN.md (this file)
└── README.md
```

---

## Estimated Costs

**Image Generation** (10 images @ $0.04 each with Imagen 4 Fast):

- Character reference: 1 image
- Scene key frames: 9 images
- **Total images**: 10 × $0.04 = **$0.40**

**Video Generation** (9 clips @ $0.30-0.50 each with Veo 3.0):

- 9 scenes × 6-7 seconds each
- Model: veo-3.0-generate-001 (high quality)
- **Total videos**: 9 × $0.40 (avg) = **$3.60**

**Estimated Total Cost**: **$4.00 - $5.00**

---

## Estimated Timeline

- **Character Reference**: 1 minute
- **Scene Key Frames**: 10 minutes (9 images)
- **Video Generation**: 18-20 minutes (9 clips × 120s each = ~1080s = 18 min)
- **Stitching**: 2 minutes
- **Metadata**: 5 minutes

**Total Production Time**: **35-40 minutes**

---

## Quality Control Checkpoints

### After Character Reference:

✓ Character matches Love, Death & Robots aesthetic
✓ Weathered dark jacket clearly visible
✓ Determined expression captured
✓ High-quality render suitable as reference

### After Key Frames:

✓ Same character appearance in all 9 frames
✓ Environment correctly represented per script
✓ Character positioned properly for motion
✓ Lighting appropriate for each scene

### After Video Generation:

✓ Motion matches script descriptions
✓ Character consistency maintained
✓ 6-7 second duration per scene
✓ No artifacts or generation errors
✓ Cinematic quality achieved

### After Stitching:

✓ 60-second total duration
✓ All scenes present in correct order
✓ No glitches at transition points
✓ Audio preserved (if generated by Veo)
✓ Final file playable and high quality

---

## Next Steps

1. **Approve Production Plan** - User review and approval
2. **Generate Character Reference** - Start Phase 1
3. **Generate Scene Key Frames** - Start Phase 2 (can be done in parallel)
4. **Generate Videos** - Start Phase 3 (sequential with job tracking)
5. **Stitch Final Film** - Phase 5
6. **Create Metadata** - Phase 6
7. **Handoff to Social Posting Agent** - Final step

---

**Status**: AWAITING USER APPROVAL
**Next Action**: Proceed with Phase 1 (Character Reference) upon approval
