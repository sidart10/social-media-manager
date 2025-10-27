# JSON to Text Conversion Rules

**Purpose**: Convert structured JSON prompts into natural language for AI generators
**Version**: 1.0

---

## 🎯 CONVERSION STRATEGY

### Core Principle:

**Preserve ALL details from JSON while creating natural, readable text**

### Output Format:

**5-Component Pipe-Separated Structure**:

```
[Scene Description] | [Camera Movement & Technical] | [Lighting] | [Color & Grade] | [Output Format]
```

---

## 📐 CONVERSION MAPPING

### Component 1: Scene Description

**JSON Sources**:

- `scene_description.environment`
- `subject_and_action.action`
- `subject_and_action.action_specifics`

**Conversion**:

```
JSON:
  environment: "Dark cave interior with fire flickering on walls"
  action: "Chiseling stone tool"
  action_specifics: "Mid-strike moment, chips flying"

TEXT:
  "Dark cave interior with fire flickering on rough stone walls, ancient hands chiseling stone tool with primitive hammer, mid-strike moment with stone chips flying"
```

**Rules**:

- Combine environment + subject + action
- Keep sensory details
- Active voice
- Present tense

---

### Component 2: Camera Movement & Technical

**JSON Sources**:

- `cinematography.shot_type`
- `cinematography.camera_movement`
- `cinematography.lens.type`
- `cinematography.lens.aperture_f`
- `cinematography.iso`

**Conversion**:

```
JSON:
  shot_type: "Extreme Close-Up"
  camera_movement: "Static with subtle handheld shake"
  lens.type: "50mm Prime"
  lens.aperture_f: 2.8
  iso: 1600

TEXT:
  "Extreme close-up shot with static camera and subtle handheld shake for organic feel, shot on 50mm prime lens at f/2.8, ISO 1600"
```

**Rules**:

- Lead with shot type
- Add camera movement
- Include lens specs (focal length, aperture)
- Mention ISO if notable

---

### Component 3: Lighting

**JSON Sources**:

- `lighting_design.lighting_style`
- `lighting_design.key_light.source`
- `lighting_design.key_light.quality`
- `lighting_design.key_light.position`
- `lighting_design.mood`

**Conversion**:

```
JSON:
  lighting_style: "Chiaroscuro"
  key_light.source: "Fire (2700K warm orange)"
  key_light.quality: "Hard with flicker"
  key_light.position: "Camera-right, 45-degree angle"
  mood: "Dramatic, primal"

TEXT:
  "Dramatic chiaroscuro lighting from single fire source (2700K warm orange), hard flickering light from camera-right at 45-degree angle creating deep shadows and primal atmosphere"
```

**Rules**:

- Start with lighting style
- Name source and color temp
- Describe quality (hard/soft)
- Include position/direction
- End with mood/effect

---

### Component 4: Color & Grade

**JSON Sources**:

- `color_and_grade.color_grading.grade_style`
- `color_and_grade.color_palette.color_names`
- `color_and_grade.color_grading.contrast`
- `color_and_grade.film_emulation.grain_intensity`

**Conversion**:

```
JSON:
  grade_style: "Desaturated earthy tones with selective warm accents"
  color_names: ["deep brown", "black", "fire orange"]
  contrast: "High (crushed blacks)"
  grain_intensity: "Heavy"

TEXT:
  "Desaturated earthy color palette (deep browns, blacks) with warm orange fire accents, high contrast with crushed blacks, heavy 35mm film grain for ancient texture"
```

**Rules**:

- Lead with color palette description
- Include dominant colors
- Mention contrast level
- Add film grain/aesthetic
- Include purpose/mood

---

### Component 5: Output Format

**JSON Sources**:

- `composition_and_framing.aspect_ratio`
- `technical_output.resolution`
- `cinematography.lens.type`
- `visual_style_mandate.realism_level`

**Conversion**:

```
JSON:
  aspect_ratio: "16:9"
  resolution: "1920x1080"
  lens.type: "50mm Prime"
  realism_level: "Photorealistic"

TEXT:
  "Shot on 50mm prime lens in cinematic 16:9 aspect ratio, 1920x1080 photorealistic quality"
```

**Rules**:

- Include lens summary
- State aspect ratio
- Mention resolution/quality target
- End with realism level

---

## 🔄 COMPLETE CONVERSION EXAMPLE

### Input (JSON):

```json
{
  "scene_description": {
    "environment": "Dark cave interior with fire",
    "subject_action": "Chiseling stone tool"
  },
  "cinematography": {
    "shot_type": "Extreme Close-Up",
    "camera_movement": "Static with handheld shake",
    "lens": { "type": "50mm", "aperture_f": 2.8 },
    "iso": 1600
  },
  "lighting_design": {
    "lighting_style": "Chiaroscuro",
    "key_light": { "source": "Fire 2700K", "position": "Camera-right" }
  },
  "color_and_grade": {
    "grade_style": "Desaturated earthy",
    "grain_intensity": "Heavy"
  },
  "composition": {
    "aspect_ratio": "16:9",
    "resolution": "1920x1080"
  }
}
```

### Output (Text):

```
Dark cave interior with fire flickering on rough stone walls, ancient hands chiseling stone tool with primitive hammer, mid-strike moment with stone chips flying | Extreme close-up shot with static camera and subtle handheld shake, shot on 50mm prime lens at f/2.8, ISO 1600 | Dramatic chiaroscuro lighting from single fire source (2700K warm orange), hard flickering light from camera-right creating deep shadows | Desaturated earthy color palette with warm orange fire accents, high contrast with crushed blacks, heavy 35mm film grain | Shot on 50mm prime in cinematic 16:9 aspect ratio, 1920x1080 photorealistic quality
```

---

## ✅ NEGATIVE PROMPTS (Separate)

**JSON Source**: `negative_prompt` array

**Conversion**: Join array with commas

```
JSON:
  negative_prompt: [
    "modern elements",
    "cartoon style",
    "low quality"
  ]

TEXT (if supported by generator):
  "modern elements, cartoon style, low quality"
```

**Note**: Sora2/Veo3 don't explicitly support negative prompts in API, but include in metadata

---

## 🎬 USAGE IN WORKFLOWS

```markdown
<step goal="Convert JSON to Text">
  <action>Load populated JSON prompt</action>
  <action>Apply conversion rules:</action>
  <action>1. Extract scene description</action>
  <action>2. Build camera/technical component</action>
  <action>3. Build lighting component</action>
  <action>4. Build color/grade component</action>
  <action>5. Build output format component</action>
  <action>6. Combine with pipe separators</action>

<action>Result: {converted_text_prompt}</action>

<action>Display BEFORE (JSON) and AFTER (Text) for user review</action>
</step>
```

---

**Conversion rules complete - simple and effective!**
