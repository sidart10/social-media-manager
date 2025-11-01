# THE JOURNEY - Veo Execution Plan with Character Consistency
**Date**: 2025-10-31
**Status**: Ready for execution

---

## 🎯 Critical Requirement: CHARACTER CONSISTENCY

Your JSON specifies these character references:
- `character-ref-front.png`
- `character-ref-3quarter.png`
- `character-ref-profile.png`

**Character Description**:
> "Male in his 30s with dark weathered navy jacket, worn brown leather boots, short dark hair, stubble beard, determined focused expression, medium athletic build - the traveler"

---

## 🚨 MANDATORY STEP 1: Generate Character References

We MUST create the character reference images first to ensure consistency across all 9 scenes.

### Option A: Generate with gpt-image-1 (Fastest)
```bash
# Use gpt-image-1 MCP to generate 3 character reference shots
```

**Prompt for Reference Images**:
```
Photorealistic character reference sheet for CGI film. Male character in his 30s:
- Dark weathered navy blue jacket (worn, tactical style)
- Brown worn leather boots (hiking style)
- Short dark brown hair, stubble beard
- Determined, focused expression
- Medium athletic build, weathered traveler appearance
- Neutral grey background
- Three views: [front / 3-quarter / side profile]
- Cinematic lighting, Love Death and Robots CGI style
- High detail, consistent character model
```

### Option B: Use Existing Character Generation Tool
If you have a preferred character generation system, use that.

### Option C: Manual Upload
If you have existing character images, place them in:
```
outputs/10-31-2025/cinematic-short-journey/
├── character-ref-front.png
├── character-ref-3quarter.png
└── character-ref-profile.png
```

---

## 🎬 STEP 2: Veo Scene Generation Strategy

### Character Consistency Method

**Veo supports image-to-video for character consistency:**

For each scene, we'll use `veo generate` with:
1. **Input image**: Character reference (front, 3-quarter, or profile depending on scene)
2. **Prompt**: The detailed Emily-style prompt from JSON
3. **Seed frame continuity**: `--seed-last-frame` for scene transitions

### Scene-by-Scene Character Reference Selection

| Scene | Reference Image | Why |
|-------|----------------|-----|
| 1 (Dawn) | character-ref-front.png | Walking toward camera, front view needed |
| 2 (Midday) | character-ref-profile.png | Side tracking shot, profile view |
| 3 (Forest) | character-ref-front.png | Walking toward camera, front centered |
| 4 (Storm) | character-ref-front.png | Front-facing dramatic shot |
| 5 (Winter) | character-ref-front.png | Wide shot but front orientation |
| 6 (Night) | character-ref-profile.png | Low angle silhouette, profile works |
| 7 (Abyss) | character-ref-3quarter.png | Following from behind, 3/4 back view |
| 8 (Door) | character-ref-front.png | Turns to face camera, front view critical |
| 9 (Exit) | character-ref-3quarter.png | Door/void zoom, any angle works |

---

## 🎥 STEP 3: Veo Generation Commands

### Method 1: Using veo CLI with Image Input (Recommended)

```bash
export GEMINI_API_KEY="AIzaSyAEG0CJK65dfRX9j4_ph4CbJxAET25r0zo"

# Scene 1 - Dawn
veo generate \
  --from-image outputs/10-31-2025/cinematic-short-journey/character-ref-front.png \
  --prompt "Cinematic wide establishing shot, 16:9 aspect ratio, 7 seconds duration. Using the character in the reference image: male in dark weathered navy jacket and worn brown boots walking steadily toward camera across vast desert at golden hour sunrise. Epic scale with rolling sand dunes, warm orange purple red sky, distant mountains silhouetted. Low angle 0.8m height, slow dolly-in push from extreme wide to wide shot. Deep focus T4.0, character and desert sharp. Long dramatic shadows across dunes, heat shimmer beginning. Traveler centered in frame, boots on sand, determined expression. Love Death and Robots stylized CGI quality. Smooth cinematic stabilization. 24mm wide lens look." \
  --model veo-3.0-generate-preview \
  --aspect-ratio 16:9 \
  --duration 7

# Scene 2 - Midday (can seed from Scene 1's last frame)
veo continue \
  --video outputs/10-31-2025/cinematic-short-journey/scene-1-dawn.mp4 \
  --prompt "Cinematic medium tracking shot, 16:9, 6 seconds. Using same character: male in dark jacket walking through narrow red desert canyon. Camera-left 3m away tracking alongside at 1.5m height, smooth lateral movement. Harsh midday sun overhead creating stark vertical shadows, heat waves rippling visibly. Sweat glistening on face, shirt collar darkening with moisture. T2.8 selective focus on character, canyon walls softer. Traveler walking frame-right, camera shows profile, unwavering pace despite oppressive heat. Red canyon walls towering, brutal lighting, dust kicked by boots. 35mm standard lens. Love Death Robots CGI style." \
  --model veo-3.0-generate-preview \
  --extract-at -0.5

# Scene 3 - Forest Transition
veo continue \
  --video outputs/10-31-2025/cinematic-short-journey/scene-2-midday.mp4 \
  --prompt "Cinematic surreal transition shot, 16:9, 7 seconds. Using same character in dark jacket walking forward as reality SEAMLESSLY SHIFTS around him. Wide static shot 4m in front at 1.8m height, tripod-locked camera. Character walks from red canyon which MORPHS MID-STRIDE into lush green forest. Canyon walls flow into tall ancient trees, sand becomes moss-covered ground, harsh sun transitions to filtered emerald forest light. Character never breaks stride, centered frame, surreal acceptance. T5.6 balanced focus, environment and character sharp. Magical realism transformation, impossible but smooth. 40mm moderate wide. Love Death Robots stylized CGI." \
  --model veo-3.0-generate-preview
```

**Continue this pattern for all 9 scenes...**

---

### Method 2: Manual Scene-by-Scene (More Control)

Generate each scene individually without automatic stitching:

1. Use `veo generate --from-image` for scenes requiring fresh character consistency
2. Use `veo continue` for scenes that should flow from previous scene
3. Manually verify each scene before moving to next
4. Stitch later with FFmpeg or Veo's stitch command

---

### Method 3: Automated Plan Execution (Requires JSON Conversion)

Convert the Emily-style JSON to Veo's plan format:

```json
{
  "scenes": [
    {
      "prompt": "Scene 1 full prompt here...",
      "duration": 7,
      "model": "veo-3.0-generate-preview",
      "character_reference": "character-ref-front.png"
    },
    ...
  ]
}
```

Then execute:
```bash
veo plan-execute \
  --plan outputs/10-31-2025/cinematic-short-journey/veo-plan.json \
  --seed-last-frame
```

---

## 📋 Emily-Style Prompt Conversion

For each scene, we need to convert the structured JSON into a single prompt string for Veo:

### Scene 1 Example (Full Conversion):

**From JSON structure** → **To Veo prompt**:

```
Cinematic wide establishing shot, 16:9 aspect ratio, 7 seconds duration.
Using the character in the reference image: male in his 30s with dark weathered navy jacket, worn brown leather boots, short dark hair, stubble beard, determined expression, medium athletic build walking steadily toward camera across vast desert landscape.

SHOT: Low angle 0.8m height looking slightly up at character approaching. Slow dolly-in push from extreme wide to wide. 24mm wide-angle lens. Gimbal-stable smooth cinematic movement. T4.0 aperture deep focus keeping desert and character sharp.

ENVIRONMENT: Golden hour sunrise, vast desert with rolling sand dunes, distant mountains silhouetted. Clear dry heat. Warm sunrise key light from camera-right casting long dramatic shadows across dunes. Soft golden fill, orange purple red sky background.

ACTION BEATS:
0.0-2.5s: Epic desert scale established - distant traveler small against vast dunes, sunrise breaks over mountains painting sky in deep oranges and purples, camera begins slow push-in. Sand particles drift in morning breeze, long shadows stretch, heat shimmer beginning.

2.5-5.0s: Traveler grows larger in frame, steady unwavering walking pace, boots creating footprints in sand, jacket flutters slightly in desert wind. Cloth micro-movement from breeze, sand compresses under boots, distant dunes show parallax movement.

5.0-7.0s: Camera settles on wide shot showing full body, traveler continues forward, gaze fixed on horizon, determined expression visible, sunrise light catches face. Breath visible in cool morning air, jacket settles, sand trail behind him.

STYLE: Love Death and Robots stylized photorealistic CGI, cinematic lighting, epic determined beginning-of-journey energy. High detail, atmospheric, dramatic.
```

---

## ⚠️ Character Consistency Best Practices

### Using Veo's Image-to-Video:

1. **Always reference the same character images** - Keep using the 3 reference PNGs
2. **Mention "same character" in prompts** - "Using the character from reference image..."
3. **Describe clothing consistently** - "dark weathered navy jacket, worn brown boots"
4. **Use seed frames between scenes** - `--seed-last-frame` or `veo continue`
5. **Keep lighting descriptions consistent** - Don't radically change character appearance

### Veo Limitations to Know:

- Veo is excellent at maintaining character appearance WITHIN a scene
- Character consistency BETWEEN scenes requires:
  - Using reference images for each generation
  - Seed frame continuity (last frame of Scene N → first frame of Scene N+1)
  - Consistent prompt descriptions (clothing, build, features)

---

## 🎯 Recommended Execution Flow

### Phase 1: Character Setup (10 minutes)
1. Generate 3 character reference images (front, 3-quarter, profile)
2. Save to output folder
3. Verify character matches description

### Phase 2: Scene Generation (30-45 minutes per scene = 4-6 hours total)
1. Start with Scene 1 using front reference
2. Generate and save
3. Extract last frame for Scene 2 seed
4. Generate Scene 2 using profile reference + Scene 1 seed
5. Continue pattern through Scene 9
6. Each scene: ~30-45 min generation time

### Phase 3: Stitching (15 minutes)
1. Use veo's built-in stitching OR
2. FFmpeg manual stitch with overlap trim

### Total Time: 5-7 hours (mostly waiting for generation)

---

## 💰 Cost Estimate

- Character references (3 images): ~$0.30 (via gpt-image-1)
- Veo 3.0 Generate: ~$0.60/second
- Total video: 60 seconds × $0.60 = **$36.00**
- Gemini planning: ~$0.10
- **Total: ~$36.40**

---

## 🚀 Ready to Execute?

**Next immediate action:**

1. Generate the 3 character reference images
2. Come back and I'll help execute all 9 scenes with character consistency

**Or let Video Agent handle it:**

Hand off this execution plan + Emily JSON + character references to Video Agent who will:
1. Generate character references
2. Loop through all 9 scenes
3. Use appropriate reference image per scene
4. Apply seed frame continuity
5. Stitch final video

---

## 📄 Files Ready

- ✅ Emily-style JSON with detailed prompts
- ✅ Character description specified
- ⏳ Character reference images (need to generate)
- ✅ Veo tools installed and working
- ✅ API key configured

**Status: Ready to begin once character references are created**
