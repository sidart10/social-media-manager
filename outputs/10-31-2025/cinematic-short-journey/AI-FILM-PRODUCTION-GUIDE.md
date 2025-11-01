# AI Film Production Guide: Multi-Scene Character Consistency
## The Complete Workflow for Creating Cinematic AI Films with FAL Veo 3.1

**Based on Production**: THE JOURNEY (64-second cinematic short)
**Date**: October 31, 2025
**Result**: 8 scenes, same character, extreme environment changes, professional quality

---

## Table of Contents

1. [Overview & Core Concept](#overview)
2. [Character Consistency Strategy](#character-consistency)
3. [Cloudinary Setup for Image Hosting](#cloudinary-setup)
4. [FAL Custom Models - Complete Guide](#fal-custom-models)
5. [Emily's Prompt Engineering Methodology](#emily-methodology)
6. [Shot Variety & Cinematography Planning](#cinematography)
7. [Last Frame Seeding for Motion Continuity](#frame-seeding)
8. [Production Workflow: Step-by-Step](#production-workflow)
9. [Audio Generation & Replacement](#audio)
10. [Stitching & Final Assembly](#stitching)
11. [Best Practices & Troubleshooting](#best-practices)

---

## <a name="overview"></a>1. Overview & Core Concept

### The Challenge
Creating multi-scene AI videos where the **same character** appears across **drastically different environments** while maintaining:
- Visual consistency (same face, body, clothing)
- Motion continuity (smooth transitions between scenes)
- Professional cinematography (varied shot compositions)
- Cohesive storytelling (not random disconnected clips)

### The Solution
A **four-pillar approach**:

1. **Character Reference Pack** (3 views) - Visual anchor for consistency
2. **FAL Veo 3.1 Reference-to-Video** - Multi-image conditioning for character lock
3. **Last Frame Seeding** - Extract final frame → use as reference for next scene
4. **Structured Prompt Engineering** - Emily's methodology with timeline beats

### What This Workflow Produces
- 8-10 scene cinematic films (40-80 seconds)
- Same character across all scenes
- Professional varied cinematography
- Synchronized audio or custom music
- Broadcast-quality 1080p output

---

## <a name="character-consistency"></a>2. Character Consistency Strategy

### Why Character Consistency Matters

**The Problem**: Each AI video generation is independent. Without explicit guidance, Scene 1's character will look completely different from Scene 2's character, even with identical text descriptions.

**The Solution**: Multi-image reference conditioning.

### Step 1: Create Character Reference Pack

Generate **3 views of the same character** in neutral lighting and background:

#### View 1: Front Facing
```
Stylized CGI character portrait, [character description], standing in
neutral pose facing camera directly (front view), Love Death and Robots
visual style, artistic CGI rendering, clean neutral gray background,
full body shot, professional character design, 8k quality
```

**Character Description Template**:
```
[Gender] in [age range], [clothing: jacket type/color, pants, footwear],
[hair: length/color/style], [facial hair], [expression], [build type]
```

**Example**:
```
Male in his 30s, dark weathered navy jacket, worn brown leather boots,
short dark hair, stubble beard, determined focused expression, medium
athletic build
```

#### View 2: Three-Quarter Angle
```
Stylized CGI character portrait, [same character description], standing
at 3/4 angle (three-quarter view showing face and body), Love Death and
Robots visual style, artistic CGI rendering, clean neutral gray background,
full body shot, professional character design, 8k quality
```

#### View 3: Side Profile
```
Stylized CGI character portrait, [same character description], standing
in profile view (side view), Love Death and Robots visual style, artistic
CGI rendering, clean neutral gray background, full body shot, professional
character design, 8k quality
```

### Why 3 Views?

- **Front**: Facial features, frontal clothing details, proportions
- **3/4 Angle**: Most common pose in motion, shows depth and structure
- **Profile**: Side silhouette, nose/chin/forehead profile, walking gait

FAL Veo 3.1 accepts **up to 3 reference images** - use all 3 for maximum consistency.

### Step 2: Generate References

**Tool**: Gemini 2.5 Flash Image (Nano Banana) or GPT Image 1

```javascript
// Using nanobanana MCP
{
  "prompt": "[View 1 prompt above]",
  "n": 1
}
```

**Critical**: Generate these **before** any scene work. These become your visual bible.

### Step 3: Save & Organize

```
project/
├── assets/
│   ├── character-ref-front.png
│   ├── character-ref-3quarter.png
│   └── character-ref-profile.png
```

**File naming convention**: Keep consistent, descriptive names. You'll reference these repeatedly.

---

## <a name="cloudinary-setup"></a>3. Cloudinary Setup for Image Hosting

### Why Cloudinary?

FAL Veo 3.1's `reference-to-video` endpoint requires **publicly accessible HTTP/HTTPS URLs**. It cannot accept:
- ❌ Local file paths (`file:///...`)
- ❌ Google Files API URLs (`files/abc123`)
- ❌ Base64 data URIs (too large)

Cloudinary provides:
- ✅ Public HTTPS URLs
- ✅ Fast CDN delivery
- ✅ Free tier (25GB storage, 25GB bandwidth/month)
- ✅ Permanent hosting (no expiration)

### Setup Steps

#### 1. Get Cloudinary Credentials

If using Cloudinary MCP server, credentials are already configured. Otherwise:
- Sign up at cloudinary.com
- Get: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

#### 2. Upload Character References

**Using Cloudinary MCP**:

```javascript
// Upload each reference image
{
  "resourceType": "image",
  "uploadRequest": {
    "file": "file:///absolute/path/to/character-ref-front.png",
    "folder": "your-project-name",
    "public_id": "character-ref-front",
    "overwrite": true
  }
}
```

**Response includes**:
```json
{
  "secureUrl": "https://res.cloudinary.com/YOUR_CLOUD/image/upload/v123456789/your-project/character-ref-front.png"
}
```

**Save these URLs** - you'll use them for every scene generation.

#### 3. Upload Strategy

**For a typical film production**:

```
Upload to Cloudinary:
├── character-ref-front.png → Get URL 1
├── character-ref-3quarter.png → Get URL 2
├── character-ref-profile.png → Get URL 3
├── scene1-lastframe.png → Get URL 4 (after Scene 1 completes)
├── scene2-lastframe.png → Get URL 5 (after Scene 2 completes)
└── ... and so on
```

**Folder organization**:
```javascript
{
  "folder": "films/project-name",  // Groups all assets together
  "public_id": "descriptive-name"   // Clean URL-friendly identifier
}
```

### Cloudinary URL Pattern

```
https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{folder}/{public_id}.{format}

Example:
https://res.cloudinary.com/dnezawwer/image/upload/v1761902736/the-journey/character-ref-front.png
```

**These URLs are permanent and globally accessible** - perfect for FAL.

---

## <a name="fal-custom-models"></a>4. FAL Custom Models - Complete Guide

### What is `execute_custom_model`?

FAL's MCP server includes a powerful tool that lets you call **any FAL endpoint** directly, even if there's no dedicated wrapper function.

**Tool signature**:
```javascript
mcp__fal-video__execute_custom_model
```

**Parameters**:
- `endpoint` (required) - FAL model endpoint (e.g., "fal-ai/veo3.1/reference-to-video")
- `input_params` (required) - JSON object with model-specific parameters
- `category_hint` (optional) - "image_to_video", "image", "video", "other"

### Finding FAL Endpoints

**Method 1**: Browse FAL Models
- Visit: https://fal.ai/models
- Search for model (e.g., "Veo 3.1")
- Click model → "API" tab
- Endpoint shown at top: `fal-ai/veo3.1/reference-to-video`

**Method 2**: Check Documentation
- https://docs.fal.ai
- Model reference pages list endpoints

**Method 3**: Use MCP list_available_models (if available)

### Veo 3.1 Reference-to-Video Endpoint

**Endpoint**: `fal-ai/veo3.1/reference-to-video`

**Required Parameters**:
```javascript
{
  "image_urls": [
    "https://url-to-reference-1.png",
    "https://url-to-reference-2.png",
    "https://url-to-reference-3.png"  // Up to 3 images
  ],
  "prompt": "Detailed video description with camera movement, action, timeline"
}
```

**Optional Parameters**:
```javascript
{
  "duration": "8s",           // Fixed at 8 seconds
  "resolution": "1080p",      // Options: "720p" or "1080p"
  "generate_audio": true      // true = $0.40/s, false = $0.20/s
}
```

### Complete FAL Custom Model Call Example

```javascript
{
  "endpoint": "fal-ai/veo3.1/reference-to-video",
  "category_hint": "image_to_video",
  "input_params": {
    "image_urls": [
      "https://res.cloudinary.com/YOUR_CLOUD/image/upload/v123/project/character-ref-front.png",
      "https://res.cloudinary.com/YOUR_CLOUD/image/upload/v123/project/character-ref-3quarter.png",
      "https://res.cloudinary.com/YOUR_CLOUD/image/upload/v123/project/character-ref-profile.png"
    ],
    "prompt": "Using the provided character images for the traveler: Stylized CGI male in dark jacket walking across desert at golden hour. Low angle dolly-in shot, 24mm lens, orange sky, long shadows. Timeline: 0-2.5s establish wide desert scale, 2.5-5s character grows in frame walking steadily, 5-8s hold on determined expression.",
    "duration": "8s",
    "resolution": "1080p",
    "generate_audio": true
  }
}
```

### Response Structure

```json
{
  "video": {
    "url": "https://v3b.fal.media/files/b/animal/ABC123_output.mp4",
    "localPath": "/Users/you/Downloads/fal_fal_ai_veo3_1_reference_to_video_TIMESTAMP.mp4"
  },
  "raw_output": {
    "video": {
      "url": "...",
      "content_type": "video/mp4",
      "file_name": "output.mp4",
      "file_size": 8187965
    }
  }
}
```

**The video is automatically downloaded** to `/Users/you/Downloads/` and also available at the `url` for streaming.

### Cost Calculation

**Veo 3.1 Pricing** (as of October 2025):
- With audio: **$0.40 per second**
- Without audio: **$0.20 per second**

**Examples**:
- 8-second clip with audio: 8 × $0.40 = **$3.20**
- 8-scene film (64s) with audio: 64 × $0.40 = **$25.60**
- 8-scene film (64s) no audio: 64 × $0.20 = **$12.80**

**Budget for a 60-second film**: ~$24-30 (with audio and images)

---

## <a name="emily-methodology"></a>5. Emily's Prompt Engineering Methodology

### The Problem with Vague Prompts

**Vague prompt** (❌ Poor results):
```
"A man walking through the desert"
```

**Result**: Generic, random camera angle, unclear motion, inconsistent quality.

### Emily's Structured Approach

**Based on 30+ engagement-validated examples** from Emily (@IamEmily2050), structured video prompts follow this format:

#### Core Structure

```json
{
  "shot": {
    "type": "wide_establishing_low_angle",
    "camera_position": "low to ground 0.8m height looking slightly up",
    "camera_motion_primary": "slow dolly-in push from extreme wide to wide",
    "lens": "24mm wide-angle",
    "stabilization": "gimbal-stable smooth cinematic",
    "aperture_look": "T4.0 deep focus"
  },
  "subject": {
    "character": "Using the provided images: male 30s in dark jacket walking toward camera",
    "blocking": "walking from distance toward camera centered in frame",
    "mood": "epic determined beginning-of-journey energy"
  },
  "scene": {
    "environment": "vast desert landscape with rolling sand dunes",
    "time_of_day": "golden hour sunrise",
    "weather": "clear dry heat beginning to build",
    "lighting": "warm sunrise key from camera-right casting long shadows"
  },
  "visual_details": {
    "beats": [
      {
        "time": "0.0-2.5s",
        "action": "Establish epic desert scale: distant figure small against vast dunes",
        "physics": "sand particles drift in morning breeze, long shadows stretch"
      },
      {
        "time": "2.5-5.0s",
        "action": "Traveler grows larger in frame, steady walking pace unwavering",
        "physics": "cloth micro-movement from breeze, sand compresses under boots"
      },
      {
        "time": "5.0-8.0s",
        "action": "Camera settles on wide shot, gaze fixed on horizon",
        "physics": "breath visible in cool morning air, jacket settles"
      }
    ]
  }
}
```

### Converting JSON to FAL Prompt

**The prompt parameter needs to be a single string** that includes all this information in natural language:

```
Using the provided character images for the traveler: Stylized CGI male
in his 30s with dark weathered jacket and worn boots walking steadily
toward camera across vast desert at golden hour sunrise. Low angle shot
from 0.8m height looking slightly up, slow dolly-in push from extreme
wide to wide shot, 24mm wide-angle lens. Orange purple red sky background,
long dramatic shadows stretching across sand dunes, distant mountains
silhouetted. Love Death and Robots visual style, epic determined energy.
Timeline beats: 0-2.5s establish epic desert scale with distant traveler
figure small against vast dunes, sunrise breaks over mountains painting
sky in oranges and purples, camera begins slow push-in, sand particles
drift in morning breeze. 2.5-5s traveler grows larger in frame, steady
unwavering walking pace, boots creating footprints in sand, jacket flutters
in desert wind. 5-8s camera settles on wide shot showing full body,
traveler continues forward with gaze fixed on horizon, determined expression
visible, sunrise light catches face, hold on steady advance.
```

### Key Elements of Effective Prompts

#### 1. Character Reference Signal
**ALWAYS start with**: `"Using the provided character images for [character name]:"`

This tells Veo 3.1 to use your reference images for character appearance.

#### 2. Camera Specifications
- **Shot type**: wide, medium, close, extreme wide, etc.
- **Camera position**: height (in meters), distance, angle
- **Camera motion**: dolly-in, dolly-out, tracking, crane-up, tilt, static, zoom
- **Lens**: 18mm (ultra-wide), 24mm (wide), 35mm (standard), 50mm (portrait), 85mm (tight portrait)
- **Stabilization**: gimbal-stable, handheld, tripod-locked, dolly-smooth

#### 3. Environment & Lighting
- **Environment**: Specific location details
- **Time of day**: Sunrise, midday, golden hour, blue hour, night
- **Weather**: Clear, rain, snow, storm, fog, etc.
- **Lighting**: Key light direction, fill light, color temperature, shadows

#### 4. Timeline Beats (Critical!)

Divide the 8 seconds into **3 beats**:
- **0-2.5s**: Establish the scene
- **2.5-5s**: Development/action
- **5-8s**: Resolution/hold

For each beat, specify:
- **Action**: What happens visually
- **Physics**: How materials/elements behave (cloth movement, particle drift, breath clouds, etc.)

#### 5. Style Reference
- Mention aesthetic: "Love Death and Robots visual style"
- Or: "Blade Runner aesthetic", "Studio Ghibli style", "photorealistic", etc.

### Common Mistakes to Avoid

❌ **Too vague**: "A person walking"
✅ **Specific**: "Male 30s in dark jacket walking toward camera, boots on sand, determined expression"

❌ **No camera specs**: "Show the desert"
✅ **Detailed camera**: "Low angle 0.8m height, 24mm lens, slow dolly-in from extreme wide to wide"

❌ **Static description**: "Man in desert"
✅ **Timeline beats**: "0-2.5s establish scale, 2.5-5s character grows in frame, 5-8s hold on expression"

❌ **Ignoring physics**: "Walking across sand"
✅ **Physics notes**: "Boots compress sand, jacket flutters in breeze, footprints trail behind"

---

## <a name="cinematography"></a>6. Shot Variety & Cinematography Planning

### The Importance of Varied Shots

**Don't use the same composition for every scene!**

A film with all medium close-ups becomes monotonous. Professional cinematography uses varied shot types to:
- Create visual rhythm
- Emphasize different emotional beats
- Show scale vs intimacy
- Guide viewer attention

### Shot Type Library

#### Wide Shots (Establishing)

**Extreme Wide Shot (EWS)**
```
Camera position: 8m+ away, high angle 4m height
Lens: 18mm ultra-wide
Purpose: Show scale, isolation, environment dominance
Example: "Extreme wide shot very high and distant 8m away at 4m height, slow crane-up and pull-back, 18mm ultra-wide lens"
```

**Wide Shot (WS)**
```
Camera position: 4-6m away, 1.5-2m height
Lens: 24mm wide
Purpose: Establish environment, show full body in context
Example: "Wide shot 4m in front at 1.8m height, tripod-locked completely still, 24mm wide lens"
```

**Low Angle Wide**
```
Camera position: 0.5-1m height, looking up
Lens: 24-28mm
Purpose: Epic feel, character empowerment, grandeur
Example: "Low angle shot from 0.8m height looking slightly up, slow dolly-in, 24mm wide-angle"
```

#### Medium Shots (Storytelling)

**Medium Shot (MS)**
```
Camera position: 3-4m away, 1.5-1.7m height (eye level)
Lens: 35mm standard or 50mm portrait
Purpose: Character + environment balanced, main storytelling shot
Example: "Medium shot 3m away at 1.6m height, slow push-in, 50mm portrait lens"
```

**Medium Tracking**
```
Camera position: 3m to side, moving with character
Lens: 35mm
Purpose: Dynamic energy, journey feeling, parallel action
Example: "Medium tracking shot from camera-left 3m away at 1.5m height, smooth lateral tracking, 35mm standard lens"
```

**Medium Dolly Following**
```
Camera position: 3m behind character, following
Lens: 35mm
Purpose: POV following, mystery, approaching something
Example: "Medium dolly shot 3m behind character at 1.7m height following from rear, slow dolly-forward, 35mm lens"
```

#### Close Shots (Emotion)

**Medium Close-Up (MCU)**
```
Camera position: 2m away, 1.6m height
Lens: 50-85mm portrait
Purpose: Emotion, facial details, intimate moments
Example: "Medium close-up 2m away at 1.6m height, tripod-locked, 85mm portrait lens"
```

#### Special Shots (Impact Moments)

**Static Transition Shot**
```
Camera: Completely locked, environment changes around character
Purpose: Surreal moments, reality shifts, magical transitions
Example: "Wide static shot 4m in front at 1.8m height, tripod-locked completely still, 40mm lens, environment transforms around character"
```

**Low Angle Tilt-Up**
```
Camera: Very low, tilts upward during shot
Purpose: Reveal scale, cosmic wonder, vertical reveal
Example: "Low angle shot very low 0.5m above ground looking up at 30-degree angle, slow tilt-up from character to sky, 28mm wide lens"
```

**Extreme Zoom-Out**
```
Camera: Starts close, pulls back infinitely
Purpose: Perspective shift, revelation, mind-bending scale
Example: "Camera starts 50mm perspective ends ultra-wide, continuous extreme zoom-out, motion-control smooth infinite pullback"
```

### Shot Composition Planning for 8-Scene Film

**Create variety and rhythm**:

1. **Wide low angle** (establish scale) → Epic beginning
2. **Medium tracking** (dynamic energy) → Journey feeling
3. **Wide static** (surreal moment) → Reality shift
4. **Medium front push-in** (intensity) → Conflict/test
5. **Extreme wide crane** (isolation) → Vulnerability
6. **Side tracking transition** (environment change) → Continuity
7. **Medium dolly to static** (emotional beat) → Connection
8. **Extreme zoom-out** (revelation) → Mind-bending finale

**Pattern**: Wide → Medium → Wide → Medium → Extreme Wide → Medium → Medium → Extreme

This creates **visual rhythm** - alternating scale for pacing.

---

## <a name="frame-seeding"></a>7. Last Frame Seeding for Motion Continuity

### The Concept

**Frame seeding** = Using the final frame of Scene N as an **additional reference image** for Scene N+1.

### Why It Works

1. **Character in motion**: Last frame shows character mid-stride
2. **Pose continuity**: Next scene starts from similar pose
3. **Environment transition**: Can show environment starting to change
4. **Veo understands**: "Continue this motion" implicitly

### The Workflow

#### Step 1: Generate Scene N

```javascript
// Scene 1: Desert
{
  "image_urls": [
    "character-ref-front.png",
    "character-ref-3quarter.png",
    "character-ref-profile.png"
  ],
  "prompt": "[Scene 1 prompt with timeline beats]"
}
```

**Output**: `scene1-dawn-8s.mp4`

#### Step 2: Extract Last Frame

**At t=7.75s** (0.25s before end):

```bash
ffmpeg -i scene1-dawn-8s.mp4 -ss 00:00:07.75 -vframes 1 scene1-lastframe.png -y
```

**Why 7.75s, not 8.0s?**
- Last frame (8.0s) may be mid-motion blur
- 7.75s is usually cleaner, natural "lead-in" for next clip
- Provides smooth visual bridge

#### Step 3: Upload to Cloudinary

```javascript
{
  "resourceType": "image",
  "uploadRequest": {
    "file": "file:///path/to/scene1-lastframe.png",
    "folder": "your-project/frames",
    "public_id": "scene1-lastframe"
  }
}
```

**Get**: `https://res.cloudinary.com/.../scene1-lastframe.png`

#### Step 4: Use as 3rd Reference for Scene N+1

```javascript
// Scene 2: Canyon
{
  "image_urls": [
    "character-ref-front.png",      // Character consistency
    "character-ref-3quarter.png",   // Character consistency
    "scene1-lastframe.png"          // Motion continuity ⭐
  ],
  "prompt": "[Scene 2 prompt starting from Scene 1's end position]"
}
```

### Advanced: 4-Image Reference Strategy

FAL Veo 3.1 accepts **up to 3 images**, but you can strategically choose which 3:

**Option A: 3 Character Views** (maximum character consistency)
```
[front, 3quarter, profile]
```
Use for: First scene, scenes where character looks very different

**Option B: 2 Character + 1 Last Frame** (balanced)
```
[front, 3quarter, scene-N-lastframe]
```
Use for: Most scenes, standard workflow

**Option C: 1 Character + 2 Context** (environment-heavy)
```
[3quarter, scene-N-lastframe, environment-reference]
```
Use for: Scenes where environment is drastically different

### Frame Extraction Timing Options

- **-0.1s**: Very tight continuity (risky if motion blur)
- **-0.25s**: ⭐ Recommended standard
- **-0.5s**: More continuity room, smoother transitions
- **-1.0s**: Longer lead-in for slow-paced scenes

### Automated Frame Seeding Loop

```bash
#!/bin/bash
# Automated scene generation with frame seeding

SCENES=("scene1" "scene2" "scene3" "scene4")
PROMPTS=("prompt1.txt" "prompt2.txt" "prompt3.txt" "prompt4.txt")

CHAR_REF_1="https://res.cloudinary.com/.../character-ref-front.png"
CHAR_REF_2="https://res.cloudinary.com/.../character-ref-3quarter.png"
CHAR_REF_3="https://res.cloudinary.com/.../character-ref-profile.png"

# First scene uses 3 character references
LAST_FRAME_URL=""

for i in "${!SCENES[@]}"; do
  SCENE=${SCENES[$i]}
  PROMPT_FILE=${PROMPTS[$i]}

  # Determine reference images
  if [ $i -eq 0 ]; then
    # First scene: 3 character views
    IMAGE_URLS="[\"$CHAR_REF_1\",\"$CHAR_REF_2\",\"$CHAR_REF_3\"]"
  else
    # Subsequent scenes: 2 character views + last frame
    IMAGE_URLS="[\"$CHAR_REF_1\",\"$CHAR_REF_2\",\"$LAST_FRAME_URL\"]"
  fi

  # Generate video (use your MCP tool here)
  echo "Generating $SCENE with refs: $IMAGE_URLS"
  # ... FAL custom model call ...

  # Extract last frame
  ffmpeg -i ${SCENE}.mp4 -ss 00:00:07.75 -vframes 1 ${SCENE}-lastframe.png -y

  # Upload to Cloudinary
  # ... cloudinary upload ...
  # Get LAST_FRAME_URL for next iteration
done
```

---

## <a name="production-workflow"></a>8. Production Workflow: Step-by-Step

### Pre-Production (20-30 minutes)

#### Phase 1: Script Analysis
1. Break script into **8-10 scenes** (each ~6-8 seconds)
2. Identify **key story beats** per scene
3. Note **environment changes** (desert → forest → snow, etc.)
4. Plan **emotional arc** (determination → struggle → revelation)

#### Phase 2: Shot Planning
Create shot variety matrix:

| Scene | Environment | Shot Type | Camera Motion | Lens | Emotional Beat |
|-------|-------------|-----------|---------------|------|----------------|
| 1 | Desert dawn | Wide low angle | Dolly-in | 24mm | Epic beginning |
| 2 | Canyon heat | Medium tracking | Lateral track | 35mm | Harsh test |
| 3 | Forest | Wide static | Locked | 40mm | Surreal shift |
| 4 | Storm | Medium front | Push-in | 50mm | Intense struggle |
| 5 | Winter | Extreme wide | Crane-up | 18mm | Isolation |
| 6 | Night aurora | Side tracking | Parallel motion | 35mm | Wonder |
| 7-8 | Void to door | Medium dolly to static | Follow then lock | 35-50mm | Revelation |
| 9 | Zoom reveal | Extreme wide | Infinite zoom-out | 50-18mm | Mind-bend |

**Avoid**: Using same shot type repeatedly (3+ medium shots in a row)
**Goal**: Alternate between wide/medium/close for rhythm

#### Phase 3: Character Design
1. **Write detailed character description** (use template from Section 2)
2. **Generate 3-view reference pack** with image AI
3. **Upload all 3 to Cloudinary** immediately
4. **Save URLs** in a reference document

**Reference Doc Template**:
```markdown
## Character References
- Front: https://res.cloudinary.com/.../character-ref-front.png
- 3/4: https://res.cloudinary.com/.../character-ref-3quarter.png
- Profile: https://res.cloudinary.com/.../character-ref-profile.png

Copy these for every FAL call!
```

### Production (30-40 minutes for 8 scenes)

#### Scene 1: First Generation

**No last frame available**, use 3 character references:

```javascript
{
  "endpoint": "fal-ai/veo3.1/reference-to-video",
  "category_hint": "image_to_video",
  "input_params": {
    "image_urls": [
      "[Character front URL]",
      "[Character 3/4 URL]",
      "[Character profile URL]"
    ],
    "prompt": "[Emily-style prompt for Scene 1]",
    "duration": "8s",
    "resolution": "1080p",
    "generate_audio": true
  }
}
```

**Wait time**: ~3-4 minutes for generation

**When complete**:
1. Video auto-downloads to `/Downloads/fal_fal_ai_veo3_1_reference_to_video_TIMESTAMP.mp4`
2. Move to project folder: `mv /Downloads/fal_*.mp4 videos/scene1.mp4`
3. Extract last frame: `ffmpeg -i videos/scene1.mp4 -ss 00:00:07.75 -vframes 1 assets/scene1-lastframe.png -y`
4. Upload to Cloudinary, get URL
5. Save URL for Scene 2

#### Scene 2: With Frame Seeding

```javascript
{
  "endpoint": "fal-ai/veo3.1/reference-to-video",
  "category_hint": "image_to_video",
  "input_params": {
    "image_urls": [
      "[Character front URL]",
      "[Character 3/4 URL]",
      "[Scene 1 last frame URL]"  // ⭐ Motion continuity
    ],
    "prompt": "[Emily-style prompt for Scene 2 continuing from Scene 1]",
    "duration": "8s",
    "resolution": "1080p",
    "generate_audio": true
  }
}
```

**Repeat for all subsequent scenes**.

### Parallel Generation Strategy

If you have **budget and want speed**, generate multiple scenes in parallel:

**Scenes 1-3**: Can run simultaneously (no dependencies)
**Scenes 4-6**: Start after 1-3 complete, can run parallel
**Scenes 7-9**: Final batch in parallel

**Trade-off**:
- **Serial** (one at a time): Uses last frame seeding, slower (40 min), cheaper
- **Parallel** (3 at once): Faster (15 min), no frame seeding between batches, higher cost

**Recommended**: Hybrid - generate in batches of 2-3 with partial seeding.

### Post-Production (5-10 minutes)

#### Step 1: Organize Files

```bash
# Move all downloaded videos to project
mv /Downloads/fal_*.mp4 videos/

# Rename descriptively
mv fal_fal_ai_veo3_1_reference_to_video_2025-10-31T09-28-36.mp4 scene1-dawn-8s.mp4
mv fal_fal_ai_veo3_1_reference_to_video_2025-10-31T09-32-35.mp4 scene2-canyon-8s.mp4
# ... etc
```

#### Step 2: Create Concat List

```bash
# Create text file listing all scenes in order
cat > concat-list.txt << EOF
file 'scene1-dawn-8s.mp4'
file 'scene2-canyon-8s.mp4'
file 'scene3-forest-8s.mp4'
file 'scene4-storm-8s.mp4'
file 'scene5-winter-8s.mp4'
file 'scene6-night-8s.mp4'
file 'scene7-8-void-to-door-8s.mp4'
file 'scene9-finale-8s.mp4'
EOF
```

#### Step 3: Stitch Scenes

```bash
ffmpeg -f concat -safe 0 -i concat-list.txt -c copy FILM-FINAL.mp4 -y
```

**Flags explained**:
- `-f concat`: Use concatenation demuxer
- `-safe 0`: Allow any file paths
- `-i concat-list.txt`: Input file list
- `-c copy`: Copy streams without re-encoding (fast, lossless)
- `-y`: Overwrite if exists

**Result**: Single stitched film with all scenes in order, preserving quality.

---

## <a name="audio"></a>9. Audio Generation & Replacement

### Option 1: Keep Veo's Native Audio

Veo 3.1 generates **synchronized audio** automatically:
- Ambient sounds (wind, rain, footsteps)
- Environmental audio (thunder, snow ambience)
- Atmospheric soundscapes

**When to use**: If Veo's audio matches your vision, keep it (no extra work needed).

### Option 2: Generate Custom Music with FAL

**Endpoint**: `fal-ai/minimax-music/v2`

**For instrumental atmospheric music**:

```javascript
{
  "endpoint": "fal-ai/minimax-music/v2",
  "category_hint": "other",
  "input_params": {
    "prompt": "Dark atmospheric ambient instrumental, sparse minimal soundscape, building tension, cinematic suspense, True Detective style, slow tempo 60 BPM, droning synthesizers, haunting mood, no vocals, purely instrumental",
    "lyrics_prompt": "[Instrumental]\n[No lyrics]\n[Atmospheric ambient piece]"
  }
}
```

**Output**: MP3 file (~48-60 seconds typically)

**Download**:
```bash
curl -L "[FAL audio URL from response]" -o atmospheric-music.mp3
```

### Option 3: Replace Audio Entirely

**If music is shorter than video, loop it**:

```bash
ffmpeg -stream_loop 1 -i atmospheric-music.mp3 -i FILM-FINAL.mp4 \
  -c:v copy -map 1:v:0 -map 0:a:0 -shortest \
  FILM-WITH-LOOPED-MUSIC.mp4 -y
```

**Flags explained**:
- `-stream_loop 1`: Repeat audio once (plays 2x total)
- `-i atmospheric-music.mp3`: Input audio (loops)
- `-i FILM-FINAL.mp4`: Input video
- `-c:v copy`: Copy video without re-encoding
- `-map 1:v:0`: Use video from second input (the video file)
- `-map 0:a:0`: Use audio from first input (the music file)
- `-shortest`: End when shortest stream ends (video length)

### Option 4: Mix Veo Audio + Music

**Keep atmospheric Veo sounds, add music underneath**:

```bash
ffmpeg -i FILM-FINAL.mp4 -i atmospheric-music.mp3 \
  -filter_complex "[0:a]volume=0.3[a0];[1:a]volume=0.7[a1];[a0][a1]amix=inputs=2:duration=shortest[aout]" \
  -map 0:v -map "[aout]" -c:v copy \
  FILM-MIXED-AUDIO.mp4 -y
```

**Mix levels**:
- `[0:a]volume=0.3`: Veo ambient at 30%
- `[1:a]volume=0.7`: Music at 70%

Adjust volumes as needed (0.0 = silent, 1.0 = full volume, 2.0 = double volume).

### Audio Fade In/Out

**Add 2s fade-in, 3s fade-out**:

```bash
ffmpeg -i FILM-FINAL.mp4 -i music.mp3 \
  -filter_complex "[1:a]afade=t=in:st=0:d=2,afade=t=out:st=61:d=3[a]" \
  -map 0:v -map "[a]" -c:v copy -shortest \
  FILM-FADED-MUSIC.mp4 -y
```

---

## <a name="stitching"></a>10. Stitching & Final Assembly

### Basic Concatenation

**When all videos have same**:
- Codec (H.264)
- Resolution (1920×1080)
- Frame rate (24 fps)
- Audio settings

Use `-c copy` for **fast lossless stitching**:

```bash
ffmpeg -f concat -safe 0 -i concat-list.txt -c copy OUTPUT.mp4 -y
```

### Re-encoding (If Needed)

**If videos have different specs**, force re-encode:

```bash
ffmpeg -f concat -safe 0 -i concat-list.txt \
  -c:v libx264 -preset medium -crf 18 \
  -c:a aac -b:a 256k \
  OUTPUT.mp4 -y
```

**Flags**:
- `-c:v libx264`: H.264 video codec
- `-preset medium`: Balance speed/quality
- `-crf 18`: Quality (18 = visually lossless, 23 = default, lower = better)
- `-c:a aac`: AAC audio codec
- `-b:a 256k`: Audio bitrate

**Trade-off**: Slower (~30s for 60s video) but ensures compatibility.

### Trimming Scenes to Exact Duration

**If Scene 1 is 8s but you want 7s**:

```bash
ffmpeg -i scene1-dawn-8s.mp4 -t 7 -c copy scene1-dawn-7s.mp4 -y
```

**Multiple trims**:
```bash
ffmpeg -i scene1.mp4 -t 7 -c copy scene1-trimmed.mp4 -y
ffmpeg -i scene2.mp4 -t 6 -c copy scene2-trimmed.mp4 -y
ffmpeg -i scene3.mp4 -t 7 -c copy scene3-trimmed.mp4 -y
# Then concat trimmed versions
```

### Verifying Stitched Output

```bash
# Check duration and specs
ffmpeg -i FILM-FINAL.mp4 2>&1 | grep -E "Duration|Stream"

# Example output:
# Duration: 00:01:04.03
# Stream #0:0: Video: h264, yuv420p, 1920x1080, 24 fps
# Stream #0:1: Audio: aac, 48000 Hz, stereo, 256 kb/s
```

### Common Stitching Issues

**Issue**: "Non-monotonous DTS in output stream"
**Solution**: Force re-encode or use `-fflags +genpts`

**Issue**: Audio desync after stitching
**Solution**: Ensure all clips have same audio sample rate (48000 Hz)

**Issue**: Black frames between scenes
**Solution**: Videos have different resolutions - normalize first

---

## <a name="best-practices"></a>11. Best Practices & Troubleshooting

### Character Consistency Best Practices

#### ✅ DO:

**1. Use Specific, Detailed Character Descriptions**
```
Bad:  "A man with a jacket"
Good: "Male in his 30s, dark weathered navy jacket with visible wear
       on elbows, worn brown leather boots with scuffing, short dark
       hair cropped close, 3-day stubble beard, determined focused
       expression with slight furrow between eyebrows, medium athletic
       build approximately 180cm tall"
```

**2. Generate All 3 Reference Views Before Starting**

Don't generate references during production. Create your character bible first.

**3. Use Consistent Wording Across All Prompts**

Pick phrases and stick with them:
- ✅ "Using the provided character images for the traveler"
- ✅ "Same male in dark jacket and worn boots"

Don't vary: "the guy", "the person", "him", "the traveler" randomly.

**4. Mention Clothing/Accessories in Every Prompt**

Even though references show clothing, reinforce in text:
- "dark weathered jacket" (visible in references)
- "worn brown boots" (visible in references)

This anchors Veo's attention to those visual details.

**5. Use Last Frame Seeding for Motion Continuity**

Extract at `-0.25s` and upload to Cloudinary for next scene's 3rd reference.

#### ❌ DON'T:

**1. Change Character Description Between Scenes**

```
Bad:
Scene 1: "Male with dark jacket"
Scene 2: "Guy in navy coat"
Scene 3: "Man wearing outerwear"
```

Inconsistent descriptions confuse the model.

**2. Skip Reference Images**

```
Bad: Only text description, no reference images
```

Text-only prompts will generate different characters every time.

**3. Use Only 1 Reference Image**

Veo 3.1 supports up to 3 - use at least 2, ideally all 3 for first scene.

**4. Generate References with Busy Backgrounds**

Clean neutral backgrounds let Veo focus on character, not environment.

**5. Use Photorealistic Style for Stylized Content**

```
Bad:  "Photorealistic man in desert"
Good: "Stylized CGI man in desert, Love Death and Robots visual style"
```

Match your style descriptor to your actual desired aesthetic.

### Shot Variety Best Practices

#### Create a Shot List First

**Before generating**, plan all shots:

```markdown
1. Wide low angle - Epic scale
2. Medium tracking - Dynamic energy
3. Wide static - Surreal moment
4. Medium push-in - Intensity
5. Extreme wide - Isolation
6. Low angle tilt - Cosmic wonder
7. Medium dolly - Approach
8. Extreme zoom - Revelation
```

**Pattern recognition**: Wide → Medium → Wide → Medium (alternating creates rhythm)

#### Lens Choice Matters

- **18mm ultra-wide**: Extreme scale, distortion, epic landscapes
- **24mm wide**: Standard establishing shots, environments
- **35mm standard**: Neutral perspective, most versatile
- **50mm portrait**: Character focus, natural perspective
- **85mm tight portrait**: Emotion, facial detail, shallow DOF

**Don't use 50mm for everything** - vary lenses based on scene intent.

#### Camera Motion Vocabulary

**Primary motion** (choose ONE per shot):
- `slow dolly-in push` - Approaching, intensifying
- `slow dolly-out pull` - Revealing, distancing
- `lateral tracking` - Following, journey, parallel motion
- `crane-up` - Revealing scale, elevation
- `crane-down` - Descending, grounding
- `tilt-up` - Vertical reveal, looking to sky
- `tilt-down` - Focus shift, looking down
- `zoom-in` - Attention focus, subjective
- `zoom-out` - Revelation, objective scale
- `tripod-locked static` - Stability, observation, emotional hold
- `handheld` - Energy, intimacy, documentary feel

**Avoid multiple motions**: "Dolly-in while tilting up and panning left" = confusing, rarely works well.

**Emily's rule**: **One primary motion per shot**.

### Prompt Engineering Best Practices

#### Timeline Beat Structure

**Always divide 8 seconds into 3 beats**:

```
0.0-2.5s (2.5s) → Establish / Setup
2.5-5.0s (2.5s) → Development / Action
5.0-8.0s (3.0s) → Resolution / Hold
```

**Why this structure**?
- Matches natural rhythm of perception
- Gives Veo clear temporal guidance
- Creates beginning-middle-end within each scene
- Final beat slightly longer for satisfying closure

#### Physics Notes Are Critical

**Bad** (no physics):
```
"2.5-5s: Character walks forward"
```

**Good** (with physics):
```
"2.5-5s: Character walks forward, boots compress sand creating footprints,
jacket flutters in desert breeze showing cloth weight, distant dunes show
parallax movement as camera advances"
```

Physics notes help Veo understand:
- Material properties (cloth movement, sand compression)
- Environmental forces (wind, rain, gravity)
- Spatial relationships (parallax, depth)
- Temporal progression (shadows moving, particles drifting)

#### Environment Transition Prompts

**For surreal transitions** (Scene 3 desert-to-forest example):

```
"0-2.5s: Traveler walks from canyon environment, red walls visible,
camera static, character centered.

2.5-4.5s: Reality shifts, canyon walls morph into tall ancient trees,
sand becomes moss-covered forest floor, filtered green light replaces
harsh sun, character never breaks stride, surreal seamless impossible
transition.

4.5-8s: Fully in forest now, lush ferns surround path, filtered emerald
light, tall trees tower above, traveler continues same pace, hold on
surreal acceptance."
```

**Key phrases**:
- "reality shifts", "morphs into", "becomes", "transitions to"
- "character never breaks stride" (maintains motion continuity)
- "seamless impossible transition" (sets surreal expectation)

### Troubleshooting

#### Problem: Character Looks Different in Scene 2

**Diagnosis**:
1. ❓ Did you use 3 reference images?
2. ❓ Did you start prompt with "Using the provided character images for..."?
3. ❓ Did you use same character description wording?

**Solution**:
- Verify all 3 Cloudinary URLs are accessible (paste in browser)
- Check prompt starts with reference signal phrase
- Use exact same character descriptor as Scene 1

#### Problem: Jarring Transition Between Scenes

**Diagnosis**:
1. ❓ Did you extract and use last frame from previous scene?
2. ❓ Is prompt continuity clear (mentions connection to previous environment)?

**Solution**:
- Extract last frame at `-0.25s` (not `-0.1s` too tight, not `-0.5s` too early)
- Upload to Cloudinary
- Use as 3rd reference in next scene
- Mention transition in prompt: "continuing from previous scene's final moment"

#### Problem: FAL Returns "ValidationError: Unprocessable Entity"

**Common causes**:
1. **Image URLs not accessible** - Test each URL in browser first
2. **Prompt too long** - Veo 3.1 has character limits (~2000 chars)
3. **Invalid duration** - Must be exactly "8s" as string
4. **Invalid resolution** - Must be "720p" or "1080p" as string

**Solutions**:
- Verify all URLs return 200 OK
- Simplify prompt (remove timeline beats if desperate, but loses quality)
- Double-check duration format: `"8s"` not `8` or `"8"`
- Use lowercase resolution: `"1080p"` not `"1080P"`

#### Problem: Music Doesn't Match Video Length

**Diagnosis**: Generated music is 48s but video is 64s

**Solutions**:

**A. Loop music**:
```bash
ffmpeg -stream_loop 1 -i music.mp3 -i video.mp4 \
  -c:v copy -map 1:v -map 0:a -shortest \
  output.mp4 -y
```

**B. Generate longer music**:
MiniMax Music typically generates ~48-60s. For longer, consider:
- Generate 2 variations, crossfade them
- Use external music library
- Generate + extend technique

**C. Trim video to match music**:
```bash
ffmpeg -i video.mp4 -t 48 -c copy video-trimmed.mp4 -y
```

#### Problem: Video File Size Too Large

**64-second 1080p video = 100-150 MB** is normal.

**If you need smaller**:

```bash
# Compress to ~50% size with minimal quality loss
ffmpeg -i LARGE-VIDEO.mp4 \
  -c:v libx264 -crf 23 -preset medium \
  -c:a aac -b:a 192k \
  COMPRESSED-VIDEO.mp4 -y
```

**CRF values**:
- 18 = Visually lossless (~100 MB for 60s)
- 23 = High quality (~50 MB for 60s) ⭐ Recommended
- 28 = Medium quality (~30 MB for 60s)

---

## Complete Production Checklist

### Pre-Production
- [ ] Write script with 8-10 scene breakdown
- [ ] Plan shot variety (wide, medium, close alternating)
- [ ] Create detailed character description
- [ ] Generate 3-view character reference pack
- [ ] Upload all 3 references to Cloudinary
- [ ] Save Cloudinary URLs in reference doc
- [ ] Create Emily-style JSON prompts for all scenes
- [ ] Verify shot variety (no 3+ consecutive similar shots)

### Production
- [ ] Generate Scene 1 with 3 character references
- [ ] Wait ~3-4 minutes, download completes
- [ ] Move to `videos/scene1.mp4`
- [ ] Extract last frame: `ffmpeg -i scene1.mp4 -ss 7.75 -vframes 1 scene1-lastframe.png`
- [ ] Upload last frame to Cloudinary, get URL
- [ ] Generate Scene 2 with [char1, char2, scene1-lastframe]
- [ ] Repeat: extract frame → upload → use for next scene
- [ ] Continue for all scenes
- [ ] Verify all scenes downloaded and renamed

### Post-Production
- [ ] Create concat-list.txt with all scenes in order
- [ ] Stitch: `ffmpeg -f concat -safe 0 -i concat-list.txt -c copy FINAL.mp4`
- [ ] Verify duration and quality
- [ ] Generate or source atmospheric music
- [ ] Replace audio: `ffmpeg -stream_loop 1 -i music.mp3 -i FINAL.mp4 ...`
- [ ] Create final version with music
- [ ] Test playback on target platform
- [ ] Create metadata documentation
- [ ] Archive project files

### Quality Control
- [ ] Same character visible in all scenes?
- [ ] Transitions feel smooth (not jarring)?
- [ ] Shot variety creates visual rhythm?
- [ ] Audio matches mood and pacing?
- [ ] Final duration matches target (60s)?
- [ ] No encoding artifacts or glitches?
- [ ] File size appropriate for platform (<150 MB)?

---

## Quick Reference Commands

### Extract Last Frame
```bash
ffmpeg -i input.mp4 -ss 00:00:07.75 -vframes 1 output.png -y
```

### Upload to Cloudinary (via MCP)
```javascript
{
  "resourceType": "image",
  "uploadRequest": {
    "file": "file:///absolute/path/to/image.png",
    "folder": "project-name",
    "public_id": "descriptive-name",
    "overwrite": true
  }
}
```

### Generate Video with FAL Veo 3.1
```javascript
{
  "endpoint": "fal-ai/veo3.1/reference-to-video",
  "category_hint": "image_to_video",
  "input_params": {
    "image_urls": ["URL1", "URL2", "URL3"],
    "prompt": "[Emily-style structured prompt]",
    "duration": "8s",
    "resolution": "1080p",
    "generate_audio": true
  }
}
```

### Stitch Videos
```bash
# Create concat-list.txt first, then:
ffmpeg -f concat -safe 0 -i concat-list.txt -c copy OUTPUT.mp4 -y
```

### Replace Audio
```bash
# Loop music to match video length
ffmpeg -stream_loop 1 -i music.mp3 -i video.mp4 \
  -c:v copy -map 1:v:0 -map 0:a:0 -shortest \
  output.mp4 -y
```

### Generate Atmospheric Music with FAL
```javascript
{
  "endpoint": "fal-ai/minimax-music/v2",
  "category_hint": "other",
  "input_params": {
    "prompt": "Dark atmospheric ambient instrumental, True Detective style, 60 BPM, droning synthesizers, haunting, no vocals",
    "lyrics_prompt": "[Instrumental]\n[No lyrics]\n[Atmospheric ambient piece]"
  }
}
```

---

## Real Production Example: THE JOURNEY

### Film Specs
- **Scenes**: 8 (originally planned 9, combined 7-8)
- **Duration**: 64 seconds
- **Character**: Male 30s, dark jacket, boots, determined expression
- **Environments**: Desert → Canyon → Forest → Storm → Winter → Aurora Night → Void → Door → Truman Zoom
- **Style**: Love, Death & Robots - Stylized CGI

### What Worked

✅ **3-view character pack** - Same face/body across all 8 drastically different environments
✅ **Last frame seeding** - Smooth motion continuity between scenes
✅ **Emily's timeline beats** - 0-2.5s, 2.5-5s, 5-8s structure improved generation quality dramatically
✅ **Shot variety** - 8 different camera approaches prevented monotony
✅ **Cloudinary hosting** - Permanent public URLs worked flawlessly with FAL
✅ **FAL custom models** - Direct endpoint access gave full control

### What Didn't Work (Lessons Learned)

❌ **Generating separate images per scene** - Created 9 different characters, not consistency
❌ **Calling it "photorealistic"** - Love, Death & Robots is stylized CGI, not photorealistic
❌ **Using same shot type repeatedly** - Initial plan had too many similar medium shots
❌ **Ignoring character references** - Generated refs but then didn't use them as base
❌ **Overly complex prompts** - Scene 7 first attempt failed with 500+ char timeline (simplified to 200 chars, worked)

### Key Breakthrough Moments

1. **User caught the mistake**: "Every image has a different man - you generated the reference but didn't use it!"
   - **Fix**: Use reference as BASE, edit environment around character

2. **Realized style mismatch**: "Love Death & Robots isn't photorealistic - it's stylized CGI!"
   - **Fix**: Changed prompt style from "photorealistic" to "stylized CGI"

3. **Discovered FAL custom models**: User showed `execute_custom_model` tool
   - **Fix**: Direct access to Veo 3.1 endpoint with full parameter control

4. **Cloudinary solution**: User suggested "upload images to Cloudinary"
   - **Fix**: Uploaded character refs + last frames to Cloudinary for public URLs

### Actual Prompts Used (Abbreviated)

**Scene 1** (Wide low angle):
```
Using the provided character images for the traveler: Stylized CGI male
in dark jacket walking toward camera across desert at golden hour sunrise.
Low angle 0.8m height, slow dolly-in, 24mm wide lens. Orange purple sky,
long shadows on dunes. Timeline beats: 0-2.5s establish epic scale...
```

**Scene 2** (Medium tracking, with Scene 1 last frame):
```
Using the provided character images for the traveler: Stylized CGI same
male in dark jacket walking through canyon under harsh sun. Medium tracking
from camera-left 3m away, smooth lateral tracking, 35mm lens. Heat waves
shimmer, stark shadows. Timeline beats: 0-2s tracking establishes...
```

**Scene 6** (Side tracking transition, with Scene 5 last frame):
```
Using the provided character images: Stylized CGI same male in dark jacket
walking as cold snowy landscape transitions to cold night with aurora borealis.
Side tracking moving left of character 3m away, smooth lateral, 35mm lens.
Snow continues but sky darkens, auroras emerge. Timeline: 0-2.5s walking
through snow as daylight fades, aurora hints appearing...
```

**Pattern**: Each scene references previous via last frame, maintains character via 3-view pack.

---

## Production Budget Estimator

### Per-Scene Costs (FAL Veo 3.1)

| Scene Duration | With Audio | Without Audio |
|----------------|------------|---------------|
| 8 seconds | $3.20 | $1.60 |
| 6 seconds | $2.40 | $1.20 |
| 4 seconds | $1.60 | $0.80 |

### Complete Film Budgets

**60-second film** (8 scenes × 7.5s avg):
- With audio: ~$24-26
- Without audio: ~$12-13
- Character refs (3 images): ~$0.12
- Music generation: ~$0.50
- **Total**: $25-30 (with audio + music)

**90-second film** (12 scenes × 7.5s avg):
- With audio: ~$36-40
- Without audio: ~$18-20
- **Total**: $37-45

**Budget rule**: ~$0.40-0.50 per second of final video (with audio + assets)

### Time Estimates

| Task | Time (8 scenes) |
|------|-----------------|
| Character ref generation | 2-3 min |
| Upload refs to Cloudinary | 1 min |
| Prompt writing (Emily-style) | 15-20 min |
| Scene generation (sequential) | 28-32 min (3.5-4 min each) |
| Frame extraction + uploads | 8-10 min |
| Stitching | 1-2 min |
| Music generation | 2-3 min |
| Audio replacement | 1-2 min |
| **Total** | **58-73 minutes** |

**Production time rule**: ~7-9 minutes per scene (including all steps)

---

## Advanced Techniques

### Multi-Character Scenes

**For 2 characters interacting**:

1. Generate **3-view reference pack for each character** (6 images total)
2. Upload all to Cloudinary
3. Use **character A's 3 views** for their close-ups
4. Use **character B's 3 views** for their close-ups
5. Use **both sets** (best 3 combined) for wide shots showing both

**Prompt strategy**:
```
Using the provided character images for character A and character B:
Stylized CGI, character A (male in dark jacket) talking with character B
(female in red coat) in coffee shop. Medium two-shot, 50mm lens. Timeline:
0-2.5s character A speaks and gestures, 2.5-5s character B responds with
smile, 5-8s both laugh together.
```

### Environment Reference Images

**For consistent locations across scenes**:

Generate environment reference (empty scene):
```
Coffee shop interior, warm lighting, wooden tables, window with street view,
cozy atmosphere, no people, Love Death and Robots style
```

Upload to Cloudinary, use as 3rd reference (alongside 2 character refs) for all scenes in that location.

### Dynamic Camera Movements

**For complex camera work**, break into primary + secondary:

```
Primary motion: slow dolly-in
Secondary motion: subtle arc-left during dolly (combine smoothly)
```

**Emily's rule**: Keep secondary motion minimal (<10% of total motion).

**Example**:
```
"Medium shot 4m away, slow dolly-in with subtle 5-degree arc-left,
combined into single smooth motion, 35mm lens"
```

### Color Grading in Prompts

**Lighting color temperature**:
```
"Warm sunrise key light (3200K golden orange) from camera-right,
cool fill light (5600K blue-grey) from camera-left, creates contrast
between warm and cool tones"
```

**Color palette specification**:
```
"Orange purple red sky (#FF6B35, #8B5FBF, #D32F2F), golden sand (#F4A460),
deep shadows (#1A1A1A)"
```

Hex codes give Veo precise color targets.

---

## Workflow Automation Script Template

```bash
#!/bin/bash
# AI Film Production Automation

PROJECT="your-project-name"
TOTAL_SCENES=8
CLOUDINARY_FOLDER="films/$PROJECT"

# Cloudinary credentials (set these)
export CLOUDINARY_CLOUD_NAME="your-cloud"
export CLOUDINARY_API_KEY="your-key"
export CLOUDINARY_API_SECRET="your-secret"

# Character references (upload these first manually)
CHAR_REF_1="https://res.cloudinary.com/$CLOUDINARY_CLOUD_NAME/image/upload/v.../character-ref-front.png"
CHAR_REF_2="https://res.cloudinary.com/$CLOUDINARY_CLOUD_NAME/image/upload/v.../character-ref-3quarter.png"
CHAR_REF_3="https://res.cloudinary.com/$CLOUDINARY_CLOUD_NAME/image/upload/v.../character-ref-profile.png"

# Scene prompts (create these files with your prompts)
PROMPTS=(
  "prompts/scene1.txt"
  "prompts/scene2.txt"
  "prompts/scene3.txt"
  # ... etc
)

LAST_FRAME_URL=""

for i in $(seq 1 $TOTAL_SCENES); do
  echo "=== Generating Scene $i ==="

  # Determine reference images
  if [ $i -eq 1 ]; then
    # First scene: 3 character views
    IMAGE_URLS="[\"$CHAR_REF_1\",\"$CHAR_REF_2\",\"$CHAR_REF_3\"]"
  else
    # Subsequent scenes: 2 character + last frame
    IMAGE_URLS="[\"$CHAR_REF_1\",\"$CHAR_REF_2\",\"$LAST_FRAME_URL\"]"
  fi

  # Read prompt from file
  PROMPT=$(cat "${PROMPTS[$i-1]}")

  echo "Generating video with FAL Veo 3.1..."
  # Use your MCP tool here to call FAL
  # (This would be done via Claude Code MCP interface)

  # After video generates, move it
  LATEST_VIDEO=$(ls -t ~/Downloads/fal_fal_ai_veo3_1_*.mp4 | head -1)
  mv "$LATEST_VIDEO" "videos/scene${i}.mp4"

  # Extract last frame
  ffmpeg -i "videos/scene${i}.mp4" -ss 00:00:07.75 -vframes 1 \
    "assets/scene${i}-lastframe.png" -y

  # Upload to Cloudinary (pseudo-code, use actual MCP call)
  echo "Uploading frame to Cloudinary..."
  # cloudinary_upload "assets/scene${i}-lastframe.png" → get URL
  # LAST_FRAME_URL="[returned Cloudinary URL]"

  echo "Scene $i complete!"
  echo ""
done

# Stitch all scenes
echo "=== Stitching Final Film ==="
> concat-list.txt
for i in $(seq 1 $TOTAL_SCENES); do
  echo "file 'scene${i}.mp4'" >> concat-list.txt
done

ffmpeg -f concat -safe 0 -i concat-list.txt -c copy FINAL-FILM.mp4 -y

echo "✅ Production complete: FINAL-FILM.mp4"
```

---

## Platform-Specific Optimization

### YouTube (16:9 Native)
- ✅ Use as-is (1080p 16:9)
- Thumbnail: Choose emotional beat frame (smile, revelation)
- Description: Include technical details (AI-generated, tools used)

### Instagram Reels (9:16)
**Crop center**:
```bash
ffmpeg -i FILM-16x9.mp4 \
  -vf "crop=ih*9/16:ih:(iw-ih*9/16)/2:0" \
  -c:a copy \
  FILM-9x16.mp4 -y
```

### TikTok (9:16)
Same as Instagram. Consider:
- Adding captions (80% watch muted)
- Stronger hook in first 1.5 seconds
- Faster pacing (consider 6s scenes instead of 8s)

### LinkedIn (16:9)
- ✅ Use as-is
- Add professional context in caption
- Mention AI tools for tech audience

---

## Cost Optimization Strategies

### 1. Audio Toggle

**With audio**: $0.40/s = $3.20 per 8s scene
**Without audio**: $0.20/s = $1.60 per 8s scene

**Savings**: 50% on video generation

**When to skip audio**:
- You're adding custom music anyway
- Testing workflow / iterating on prompts
- Low-budget project

**When to keep audio**:
- Veo's ambient sounds enhance atmosphere
- You want to mix Veo audio + music
- Professional quality requirement

### 2. Resolution Toggle

**1080p**: Standard pricing
**720p**: May be cheaper (check FAL pricing)

**When to use 720p**:
- Mobile-first platforms (Instagram, TikTok)
- Testing iterations
- Budget constraints

**When to use 1080p**:
- YouTube (desktop viewers)
- Professional distribution
- Future-proofing

### 3. Scene Duration

**8-second scenes** = Standard
**6-second scenes** = 25% cost savings
**4-second scenes** = 50% cost savings but very fast pacing

**Recommendation**: Use 6-7s per scene for balance.

### 4. Iterative Refinement

**Don't generate all scenes at full quality first!**

**Workflow**:
1. Generate Scene 1 at **720p, no audio** (~$1.60)
2. Review quality and character consistency
3. If approved, generate remaining scenes at **1080p with audio**
4. If not, adjust prompts and regenerate Scene 1

**Savings**: Catch issues early before spending $25 on full production.

---

## Version History & Updates

**v1.0** - October 31, 2025
- Initial guide based on THE JOURNEY production
- FAL Veo 3.1 reference-to-video workflow
- Character consistency via 3-view pack + frame seeding
- Emily's structured prompt methodology
- Cloudinary hosting integration
- FFmpeg stitching and audio replacement

**Future additions**:
- Multi-character scene techniques
- Advanced audio mixing strategies
- Platform-specific export presets
- Batch production automation scripts

---

## Credits & References

**Production**: THE JOURNEY (64-second cinematic short)
**Methodology**: Emily (@IamEmily2050) structured prompt approach
**Tools**: FAL Veo 3.1, Nano Banana, Cloudinary, FFmpeg, MiniMax Music
**Style Inspiration**: Love, Death & Robots (Netflix)
**Technique**: Last frame seeding for continuity

---

**This guide is replicable.** Follow these steps to create your own multi-scene AI films with consistent characters and professional quality.

**Total production time**: ~1 hour for 60-second film
**Total production cost**: ~$25-30
**Output quality**: Broadcast-ready 1080p with audio
