# Character Reference Regeneration Plan

## Fixing 3D Clay → 2D Hand-Drawn Ghibli Aesthetic

**Problem Identified**: Current references look like **3D clay/stop-motion figures**, not **2D hand-drawn Ghibli animation**

---

## What Studio Ghibli Actually Is

### ✅ Ghibli Characteristics (What to Include):

**Visual Style:**

- **2D hand-drawn animation** (NOT 3D CGI)
- **Watercolor-inspired backgrounds and rendering**
- **Soft expressive line work** with variable weight
- **Painterly aesthetic** with visible brush strokes
- **Gentle pastel color palette** - desaturated, harmonious tones
- **Simple character designs** - round soft faces, big kind eyes
- **Atmospheric effects** - dust motes, light shafts, soft gradients
- **Traditional animation cel style**

**Color Approach:**

- Desaturated greens with blue undertones
- Atmospheric blues (cerulean to pale periwinkle)
- Warm honey-tinted browns (not dark browns)
- Creams instead of pure whites
- Soft diffusion at color boundaries
- Watercolor transparency and layering

**Line Work:**

- Variable weight emphasizing volume
- Confident single-stroke execution
- Open linework (forms suggested, not completely outlined)
- Individual eyebrow hair strokes
- Clean flowing lines, NOT hyper-detailed

**Character Design:**

- Simple expressive faces
- Round soft features
- Big kind eyes with concentric color variations
- Realistic body proportions (1:6 head-to-body for adults)
- Age-appropriate features
- Simple clean costumes

### ❌ What to AVOID (What I Was Doing Wrong):

- ❌ "3D CGI" or "Stylized CGI"
- ❌ "Photorealistic" or "rendered"
- ❌ "Clay figure" or "stop-motion"
- ❌ High-saturation flat commercial colors
- ❌ Hyper-detailed realistic textures
- ❌ Hard edges everywhere
- ❌ Pure blacks (use deep blues/purples)
- ❌ Mechanical uniformity
- ❌ Overly detailed complexity

---

## Corrected Prompt Formula

### Base Structure for 2D Ghibli Character Reference:

```
2D hand-drawn animation character design, [character description],
watercolor-inspired painting style, soft expressive line work with
variable weight, gentle pastel color palette, simple round features,
traditional animation cel aesthetic, painterly brushwork visible,
atmospheric soft lighting, Japanese animation style in the spirit of
hand-drawn classics, clean neutral background with subtle watercolor
wash, full body character sheet, professional character design turnaround
```

### Critical Keywords:

**INCLUDE**:

- "2D hand-drawn animation"
- "watercolor-inspired"
- "soft expressive line work"
- "gentle pastel palette"
- "painterly"
- "traditional animation cel"
- "Japanese animation aesthetic"
- "simple round features"

**EXCLUDE/REPLACE**:

- Remove: "3D CGI" → Use: "2D hand-drawn"
- Remove: "photorealistic" → Use: "painterly watercolor"
- Remove: "rendered" → Use: "painted"
- Remove: "Studio Ghibli" → Use: "Japanese animation in hand-drawn classics spirit"

---

## Character Reference Templates (Corrected)

### Father Young (35-40 years) - Front View

```
2D hand-drawn animation character design, handsome South Asian male
in his late 30s with warm gentle expression, soft brown eyes with kind
crow's feet smile lines, thick dark eyebrows, clean-shaven with light
stubble, wavy black hair, cream-colored kurta with rolled sleeves showing
strong forearms, dark brown loose pants, worn leather chappals, carpenter's
weathered hands with visible calluses, simple silver watch on wrist.
Standing in neutral front-facing pose, character turnaround reference.
Watercolor-inspired painting style with soft color diffusion, gentle
pastel earth tones, expressive variable-weight line work, painterly
aesthetic with visible brushwork, traditional animation cel style, clean
neutral background with subtle warm watercolor wash (cream to pale gold
gradient). Japanese animation style inspired by hand-drawn animation
classics, simple round facial features, atmospheric soft natural lighting,
full body visible head to feet, professional character design sheet.
```

### Father Young - 3/4 View

```
[Same character description], standing at three-quarter angle showing
face and body structure, character turnaround reference pose. [Same
technical specs about watercolor, line work, etc.]
```

### Father Young - Profile View

```
[Same character description], standing in side profile view showing
silhouette and proportions, character turnaround reference pose. [Same
technical specs]
```

### Key Differences from Failed Prompts:

| Old (3D Clay)                 | New (2D Ghibli)                         |
| ----------------------------- | --------------------------------------- |
| "Stylized CGI"                | "2D hand-drawn animation"               |
| "photorealistic textures"     | "watercolor-inspired painting"          |
| "8k quality rendered"         | "painterly with visible brushwork"      |
| "professional 3D model"       | "traditional animation cel style"       |
| "Love Death and Robots style" | "Japanese animation classics aesthetic" |
| High-saturation colors        | Gentle pastel desaturated tones         |
| Hard detailed edges           | Soft expressive line work               |

---

## Generation Strategy

### Phase 1: Test with ONE Character First

**Don't regenerate all 18 at once!**

Generate **Father Young - Front View** only, review quality:

- ✓ Does it look 2D hand-drawn (not 3D)?
- ✓ Watercolor aesthetic visible?
- ✓ Soft pastel colors (not vibrant)?
- ✓ Simple expressive features (not hyper-detailed)?
- ✓ Clean line work (not rendered edges)?

**If approved** → Generate remaining 17 references
**If not approved** → Adjust prompt and retry

### Phase 2: Complete Father Young (3 views)

Front → 3/4 → Profile

### Phase 3: Test Father Middle (Aged Version)

Ensure aging looks natural in 2D style, not jarring.

### Phase 4: Complete All 6 Characters × 3 Views

Total: 18 references

### Phase 5: Upload to Cloudinary

Replace existing URLs in character-references.json

---

## Color Palette Corrections

### Old Palettes (Too Saturated):

Scene 1 old colors:

```json
{
  "primary": "#F4D03F", // Too bright yellow
  "secondary": "#E67E22", // Too bright orange
  "accent": "#935116" // Too dark brown
}
```

### New Palettes (Ghibli-Appropriate):

Scene 1 new colors:

```json
{
  "primary": "#E8D5A8", // Soft cream (desaturated golden)
  "secondary": "#C9A36B", // Gentle tan (muted warm)
  "background": "#FAF6E8", // Warm off-white
  "accent": "#8B6F47" // Soft brown
}
```

**Pattern**: Desaturate by 30-40%, shift toward pastels, avoid pure whites/blacks.

---

## Negative Prompt for 2D Ghibli Characters

```json
"negative_prompt": [
  "3D rendering",
  "CGI",
  "clay figure",
  "stop motion",
  "photorealistic",
  "hyper-detailed textures",
  "hard edges",
  "mechanical precision",
  "oversaturated colors",
  "pure black",
  "pure white",
  "commercial anime style",
  "chibi",
  "overly detailed",
  "rendered shadows",
  "3D lighting",
  "glossy surfaces",
  "plastic look",
  "digital smoothness"
]
```

---

## Tool Selection

**Use Nano Banana (Gemini 2.5 Flash Image)**:

- ✅ Better at painterly/artistic styles
- ✅ Watercolor effects
- ✅ 2D aesthetic vs photorealism
- ✅ Creative freedom
- ✅ Lower cost for 18 references ($0.04 × 18 = $0.72)

**NOT gpt-image-1**:

- Tends toward photorealism
- Less artistic/painterly
- Better for realistic/professional content

---

## Example: Father Young Front View (Corrected)

**Full Prompt**:

```
2D hand-drawn animation character design, handsome South Asian male in
his late 30s with warm gentle expression, soft kind brown eyes with
subtle crow's feet smile lines, thick dark eyebrows, clean-shaven with
light stubble, wavy black hair, cream-colored kurta with rolled sleeves
showing strong forearms, dark brown loose pants, worn leather chappals,
carpenter's weathered hands, simple silver watch. Standing in neutral
front-facing pose, full body visible head to feet. Watercolor-inspired
painting style with soft color diffusion at edges, gentle pastel earth
tones (cream #E8D5A8, soft tan #C9A36B, warm off-white #FAF6E8), expressive
variable-weight line work with confident brush strokes, painterly aesthetic
with visible organic brushwork, traditional Japanese animation cel style,
simple round facial features, soft atmospheric natural lighting, clean
neutral background with subtle warm watercolor wash gradient. Hand-drawn
animation aesthetic inspired by classic Japanese animation films, NOT 3D
rendering, soft edges and gentle gradients, character design turnaround
reference sheet.
```

**Negative Prompt**:

```
3D rendering, CGI, clay figure, stop motion, photorealistic, hyper-detailed
textures, hard edges, mechanical precision, oversaturated colors, pure
black, pure white, commercial anime, chibi, overly detailed, rendered
shadows, 3D lighting, glossy surfaces, plastic look, digital smoothness,
Love Death and Robots style, realistic CGI
```

---

## Comparison: Old vs New

### Old Prompt (Generated Clay Figures):

```
"Stylized CGI character portrait, male in his 30s with dark weathered
navy jacket, worn brown leather boots... Love Death and Robots visual
style, artistic CGI rendering..."
```

**Result**: 3D clay/stop-motion looking figure ❌

### New Prompt (Proper 2D Ghibli):

```
"2D hand-drawn animation character design, South Asian male in his late
30s... watercolor-inspired painting style, soft expressive line work,
gentle pastel earth tones, painterly brushwork visible, traditional
Japanese animation cel style..."
```

**Expected Result**: Soft 2D hand-drawn character ✅

---

## Quality Validation Checklist

After generating Father Young - Front View, validate:

**2D Characteristics**:

- [ ] Looks flat/2D (not 3D modeled)
- [ ] Visible line work (not photographic edges)
- [ ] Painterly quality (not rendered)
- [ ] Soft edges (not hard CGI borders)

**Ghibli Aesthetic**:

- [ ] Watercolor feel (not digital smooth)
- [ ] Simple expressive face (not hyper-detailed)
- [ ] Gentle pastel colors (not vibrant/saturated)
- [ ] Soft atmospheric lighting (not harsh 3D lighting)
- [ ] Round gentle features (not angular realistic)

**Overall Feel**:

- [ ] Looks like it could be from Spirited Away / Totoro
- [ ] Hand-drawn warmth (not computer-generated cold)
- [ ] Inviting and gentle (not uncanny valley)

**If ANY checkbox fails** → Revise prompt before continuing

---

## Regeneration Timeline

**Estimated Time**: 25-30 minutes total

- Test 1 character (father young front): 2 min
- Review & adjust: 3 min
- Generate remaining 17 refs: 20 min
- Upload to Cloudinary: 5 min

**Estimated Cost**: $0.72 (18 images × $0.04)

---

## Next Step: APPROVAL REQUIRED

**Do NOT generate anything yet.**

Present to user:

1. Research findings (what Ghibli actually is)
2. Corrected prompt formula
3. Example father young front view prompt
4. Negative prompt list
5. Quality validation checklist

**Get user approval** before regenerating all 18 character references.

---

**Status**: PLANNING COMPLETE, AWAITING USER APPROVAL TO PROCEED
