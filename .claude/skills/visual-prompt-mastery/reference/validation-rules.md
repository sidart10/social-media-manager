# Validation Rules & Quality Framework

Complete validation checklist for prompt quality assurance.

---

## 7-Pillar Quality Framework

Every generated prompt must be validated against these 7 pillars:

### Pillar 1: Completeness (1-10)

**Requirements:**

- [ ] scene section present
- [ ] subject section present
- [ ] composition section present
- [ ] lighting section present
- [ ] color_palette section present
- [ ] camera section present
- [ ] negative_prompt section present (10+ items)
- [ ] For video: timeline beats present

**Scoring:**

- 10: All sections present + rich details
- 8-9: All sections present + adequate details
- 6-7: Missing 1-2 optional sections
- < 6: Missing required sections

**Example Pass (10/10):**

```json
{
  "scene": {"description": "...", "mood": "...", "environment": "..."},
  "subject": {"type": "...", "appearance": "...", "pose": "..."},
  "composition": {"framing": "...", "aspect_ratio": "4:5"},
  "lighting": {"source": "...", "color_temp": "5200K"},
  "color_palette": {"primary": "#1E3A8A", "secondary": "#60A5FA"},
  "camera": {"focal_length_mm": 85, "aperture_f": 2.8, "iso": 400},
  "negative_prompt": ["item1", "item2", ..., "item10+"]
}
```

---

### Pillar 2: Technical Precision (1-10)

**Requirements:**

- [ ] Hex codes in #RRGGBB format (not color names)
- [ ] Camera focal length in mm (24, 35, 50, 85)
- [ ] Aperture in exact f-stops (f/1.8, f/2.8, f/5.6)
- [ ] ISO in exact values (100, 400, 800, 1600)
- [ ] White balance in Kelvin (5200K, 5600K)
- [ ] Shutter speed in fractions (1/200s, 1/1250s)
- [ ] No vague terms ("nice", "good", "pretty", "warm")

**Scoring:**

- 10: All specs exact, no vague terms
- 8-9: Specs exact, 1-2 minor imprecisions
- 6-7: Most specs exact, some vague terms
- < 6: Missing specs or mostly vague

**Example Pass (10/10):**

```json
{
  "color_palette": {
    "primary": "#1E3A8A",
    "secondary": "#60A5FA"
  },
  "camera": {
    "focal_length_mm": 85,
    "aperture_f": 2.8,
    "iso": 400,
    "white_balance_k": 5600
  },
  "lighting": {
    "color_temp": "5200K daylight"
  }
}
```

**Example Fail (4/10):**

```json
{
  "color_palette": {
    "primary": "blue",
    "secondary": "light blue"
  },
  "camera": {
    "focal_length": "medium",
    "aperture": "wide open",
    "iso": "low"
  },
  "lighting": {
    "color_temp": "warm"
  }
}
```

---

### Pillar 3: Platform Compliance (1-10)

**Requirements:**

- [ ] Aspect ratio matches platform
- [ ] Resolution appropriate
- [ ] Aesthetic matches platform culture
- [ ] Text handling appropriate
- [ ] File format suitable

**Platform Validation:**

**Instagram (4:5 or 1:1):**

```json
{
  "composition": {
    "aspect_ratio": "4:5"
  },
  "aesthetic": "creative vibrant trend-aware",
  "text_approach": "minimal use captions"
}
```

**LinkedIn (1:1 or 1.91:1):**

```json
{
  "composition": {
    "aspect_ratio": "1:1"
  },
  "aesthetic": "professional clean trustworthy",
  "text_approach": "quotes stats data allowed"
}
```

**YouTube Thumbnail (16:9):**

```json
{
  "composition": {
    "aspect_ratio": "16:9"
  },
  "aesthetic": "bold high-contrast CTR-optimized",
  "typography": {
    "size_pt": 72,
    "weight": "extra-bold",
    "words_max": 7
  }
}
```

**Scoring:**

- 10: Perfect platform match (aspect + aesthetic + text)
- 8-9: Aspect correct, aesthetic mostly appropriate
- 6-7: Aspect correct, aesthetic needs adjustment
- < 6: Wrong aspect ratio or completely wrong aesthetic

---

### Pillar 4: Negative Prompts (1-10)

**Requirements:**

- [ ] Minimum 10 items
- [ ] Specific to aesthetic (not generic)
- [ ] Includes quality gates (watermark, low quality, blurry)
- [ ] Includes technical anti-patterns (distorted anatomy, artifacts)
- [ ] Includes style exclusions (if lo-fi, exclude "professional")

**Scoring:**

- 10: 15+ items, highly specific, comprehensive
- 8-9: 10-14 items, good specificity
- 6-7: 10 items but generic
- < 6: < 10 items or missing critical exclusions

**Example Excellent (10/10):**

```json
"negative_prompt": [
  "professional photography",
  "studio lighting",
  "posed expressions",
  "high quality camera",
  "sharp focus everywhere",
  "modern smartphone",
  "clean polished look",
  "watermark",
  "text overlay",
  "fake aesthetic",
  "unrealistic proportions",
  "distorted anatomy",
  "compression artifacts",
  "oversaturated colors",
  "harsh shadows"
]
```

**Example Poor (4/10):**

```json
"negative_prompt": [
  "bad",
  "ugly",
  "low quality",
  "blurry",
  "watermark"
]
```

---

### Pillar 5: Specificity (1-10)

**Avoid Vague Terms:**

- ❌ "woman in room"
- ✅ "adult Korean woman in gaming corner with blue-themed PC setup"

- ❌ "nice lighting"
- ✅ "window light from camera-left 45° angle 5200K with white bounce fill"

- ❌ "blue color"
- ✅ "#1E3A8A corporate blue for primary, #60A5FA light blue for accents"

**Requirements:**

- [ ] Subject described in 3+ attributes minimum
- [ ] Environment described specifically
- [ ] Lighting has source + direction + quality
- [ ] Colors are hex codes
- [ ] Camera specs are exact values
- [ ] No abstract terms without concrete details

**Scoring:**

- 10: Every element specific, no vague terms
- 8-9: Mostly specific, 1-2 vague terms
- 6-7: Mix of specific and vague
- < 6: Mostly vague descriptions

---

### Pillar 6: Pattern Matching (1-10)

**Requirements:**

- [ ] Matches proven pattern from Emily's 30 examples
- [ ] Uses engagement-validated structure
- [ ] Follows successful aesthetic approach
- [ ] Incorporates reusable elements

**Pattern Match Quality:**

- **Exact match:** Using Y2K pattern for Y2K request
- **Close match:** Using K-Beauty pattern for professional portrait
- **Adapted match:** Using editorial pattern for corporate headshot
- **No match:** Creating entirely new structure (risky)

**Scoring:**

- 10: Exact or close match to high-engagement example (1,000+ likes)
- 8-9: Adapted from proven pattern (400+ likes)
- 6-7: Loosely based on patterns
- < 6: Not using proven patterns

---

### Pillar 7: Tool Selection Appropriateness (1-10)

**Requirements:**

- [ ] Tool matches use case
- [ ] Tool capabilities align with needs
- [ ] Cost-effective for volume
- [ ] Quality appropriate for platform

**Tool Validation:**

**gpt-image-1 appropriate when:**

- Professional/corporate content (LinkedIn)
- Text rendering required (thumbnails, quotes)
- Photorealism critical (headshots)
- Quality > speed

**nanobanana appropriate when:**

- Creative/social content (Instagram, Twitter)
- Volume needed (carousels, variants)
- Speed important (iterations)
- Image editing/blending

**veotools appropriate when:**

- Video generation
- Audio/dialogue sync needed
- Cinematic quality
- 8-30 second duration

**Scoring:**

- 10: Perfect tool for use case + rationale clear
- 8-9: Good tool choice, minor alternatives viable
- 6-7: Tool works but suboptimal choice
- < 6: Wrong tool for use case

---

## Overall Quality Scoring

### Score Calculation

```
Overall Score = (
  Completeness +
  Technical Precision +
  Platform Compliance +
  Negative Prompts +
  Specificity +
  Pattern Matching +
  Tool Selection
) / 7
```

### Score Interpretation

**10/10 - Emily-Level Quality:**

- All pillars score 10
- Matches proven high-engagement pattern
- Perfect technical execution
- Ready for immediate use
- Save as reusable template

**8-9/10 - Professional Quality:**

- Most pillars score 8-9
- Minor improvements possible
- Good platform fit
- Acceptable for publication
- Use as-is

**6-7/10 - Acceptable Quality:**

- All pillars pass minimum (6+)
- Some improvements needed
- Will generate usable output
- Consider iteration
- Use for testing/drafts

**< 6/10 - Needs Revision:**

- One or more pillars fail (< 6)
- Missing required elements
- Technical issues present
- DO NOT USE - revise first
- Address specific pillar failures

---

## Validation Workflow

### Pre-Generation Validation

**Step 1: Structure Check**

```python
required_sections = [
  'scene', 'subject', 'composition',
  'lighting', 'color_palette', 'camera', 'negative_prompt'
]

for section in required_sections:
    if section not in prompt:
        return (False, f"Missing required section: {section}")
```

**Step 2: Technical Check**

```python
# Check hex codes
for color in prompt['color_palette'].values():
    if not re.match(r'^#[0-9A-F]{6}$', color):
        return (False, f"Invalid hex code: {color}")

# Check camera specs
camera_required = ['focal_length_mm', 'aperture_f', 'iso']
for spec in camera_required:
    if spec not in prompt['camera']:
        return (False, f"Missing camera spec: {spec}")
    if not isinstance(prompt['camera'][spec], (int, float)):
        return (False, f"{spec} must be numeric exact value")
```

**Step 3: Negative Prompt Check**

```python
if len(prompt['negative_prompt']) < 10:
    return (False, f"Need 10+ negative prompts, got {len(prompt['negative_prompt'])}")
```

**Step 4: Platform Check**

```python
platform_aspects = {
  'instagram': ['4:5', '1:1'],
  'linkedin': ['1:1', '1.91:1'],
  'youtube': ['16:9'],
  'tiktok': ['9:16']
}

if prompt['composition']['aspect_ratio'] not in platform_aspects[platform]:
    return (False, f"Wrong aspect ratio for {platform}")
```

### Post-Generation Validation

**After MCP tool generates image/video:**

1. **Visual Quality Check**
   - [ ] Subject clearly visible
   - [ ] Composition as specified
   - [ ] Colors match palette
   - [ ] No artifacts or distortions
   - [ ] Platform requirements met

2. **Engagement Prediction**
   - [ ] Compare to Emily's similar examples
   - [ ] Score against engagement formula
   - [ ] Estimate likes potential (< 100, 100-500, 500-1000, 1000+)

3. **Iteration Decision**
   - Score ≥ 9: Perfect, publish
   - Score 7-8: Good, publish or minor tweaks
   - Score 5-6: Acceptable, consider regeneration
   - Score < 5: Regenerate with improvements

---

## Common Validation Failures

### Failure 1: Missing Negative Prompts

**Symptom:** Prompt has < 10 negative items
**Impact:** Quality issues, common failures appear
**Fix:** Add platform-specific negatives from library

### Failure 2: Vague Color Descriptions

**Symptom:** "blue" instead of "#1E3A8A"
**Impact:** Inconsistent colors, unmet expectations
**Fix:** Convert to hex codes using color library

### Failure 3: Imprecise Camera Specs

**Symptom:** "wide angle" instead of "24mm"
**Impact:** Unpredictable results, no reusability
**Fix:** Specify exact focal length, aperture, ISO

### Failure 4: Wrong Aspect Ratio

**Symptom:** 16:9 for Instagram post
**Impact:** Cropped in feed, poor presentation
**Fix:** Use platform-specs.md for correct ratios

### Failure 5: Platform Aesthetic Mismatch

**Symptom:** Casual Y2K for LinkedIn professional
**Impact:** Low engagement, platform algorithm penalizes
**Fix:** Match aesthetic to platform culture

---

## Validation Checklists by Pattern

### Social/Selfie Validation

**Specific Checks:**

- [ ] Full-body framing specified ("HEAD-TO-SHOES")
- [ ] Mirror or selfie composition clear
- [ ] Camera device specified (iPhone era, smartphone)
- [ ] Lo-fi texture elements present (grain, artifacts)
- [ ] Everyday wardrobe (not overly styled)
- [ ] Environmental authenticity (clutter OK)
- [ ] Negative prompts exclude professional polish

**Quality Gates:**

- Aspect ratio: 4:5 or 4:3 (Y2K)
- Camera simulation: iPhone 4/5 era OR smartphone
- Texture: Grain/noise specified
- Imperfections: Intentional (blur, artifacts)

### Professional/Editorial Validation

**Specific Checks:**

- [ ] Professional camera system specified (Canon, Sony, etc.)
- [ ] Complete lighting setup (key, fill, rim)
- [ ] Exact lens specifications (RF 85mm f/1.2L)
- [ ] Color space specified (sRGB, AdobeRGB)
- [ ] Post-processing notes included
- [ ] Clean composition (rule of thirds, negative space)
- [ ] Negative prompts exclude amateur elements

**Quality Gates:**

- Camera: Full specs (brand, model, lens, settings)
- Lighting: Three-point or specified setup
- Color: Hex codes + color space
- Precision: All values exact (not ranges)

### Creative/Artistic Validation

**Specific Checks:**

- [ ] Unique concept clearly described
- [ ] Cultural references specific (Ghibli, kawaii, Y2K)
- [ ] Innovative composition approach
- [ ] Storytelling elements present
- [ ] Multiple subjects have IDs (if applicable)
- [ ] Style hints included (not flat, stylized approach)
- [ ] Creative freedom while maintaining structure

**Quality Gates:**

- Uniqueness: Not generic scenario
- Specificity: Cultural refs named (not just "anime style")
- Structure: Still follows JSON completeness
- Innovation: Technical or conceptual

### Cinematic/Video Validation

**Specific Checks:**

- [ ] Timeline beats defined (0-2.5s, 2.5-5s, 5-8s)
- [ ] Single camera motion specified (NO combinations)
- [ ] Physics per beat ("hair shifts with breeze")
- [ ] Shot type clear (wide, medium, close)
- [ ] Lens specified (24mm, 35mm, 85mm equiv)
- [ ] Stabilization noted (gimbal, slider, handheld)
- [ ] Aperture/shutter for cinematic look

**Quality Gates:**

- Duration: 8 seconds with 3 beats
- Motion: ONE camera move only
- Physics: Realistic per element
- Technical: Cinematic specs (1/48s shutter, f/2.8)

---

## Validation Scoring System

### Score Calculation Formula

```
pillar_scores = [
  completeness_score,      # /10
  technical_precision,      # /10
  platform_compliance,      # /10
  negative_prompts_quality, # /10
  specificity_level,        # /10
  pattern_match_score,      # /10
  tool_selection_score      # /10
]

overall_score = sum(pillar_scores) / 7
```

### Validation Gates

**Gate 1: Minimum Viable (Score ≥ 6)**

- All required sections present
- Basic technical specs included
- Negative prompts ≥ 10 items
- Platform aspect ratio correct
- **Action:** Can generate, but expect iterations

**Gate 2: Professional Standard (Score ≥ 8)**

- All pillars ≥ 8
- Technical precision high
- Pattern-matched to Emily's examples
- Platform-optimized
- **Action:** Generate with confidence

**Gate 3: Emily-Level Excellence (Score = 10)**

- All pillars = 10
- Matches high-engagement pattern (1,000+ likes)
- Perfect technical execution
- Engagement-optimized
- **Action:** Save as reusable template

---

## Quick Validation Checklist

Before generating any visual, verify:

### Structural Validation (30 seconds)

- [ ] 7+ JSON sections present
- [ ] Nested structure appropriate for complexity
- [ ] Aspect ratio specified
- [ ] Negative prompt exists

### Technical Validation (1 minute)

- [ ] All hex codes start with #
- [ ] Camera specs are numbers (24, 2.8, 400, 5600)
- [ ] No vague adjectives ("nice", "good", "warm" without K value)
- [ ] Negative prompts ≥ 10 items

### Platform Validation (30 seconds)

- [ ] Aspect ratio matches target platform
- [ ] Aesthetic appropriate (casual vs professional)
- [ ] Text handling matches platform
- [ ] MCP tool selection appropriate

### Pattern Validation (1 minute)

- [ ] Matches Emily's pattern category
- [ ] Uses proven structural approach
- [ ] Incorporates engagement drivers
- [ ] Technical precision matches or exceeds example

**Total Time:** ~3 minutes for complete validation
**Pass Threshold:** All checks green OR max 2 yellow flags

---

## Validation Error Messages

### Error: Missing Required Section

```
Validation Failed: Missing required section 'lighting'
Severity: CRITICAL
Fix: Add lighting section with source, quality, color_temp
Example:
{
  "lighting": {
    "source": "window light from left",
    "quality": "soft diffused",
    "color_temp": "5200K"
  }
}
```

### Error: Invalid Hex Code

```
Validation Failed: Color "blue" must be hex format
Severity: HIGH
Fix: Convert to #RRGGBB format
Examples:
- "blue" → "#1E3A8A"
- "light blue" → "#60A5FA"
- "red" → "#EF4444"
```

### Error: Insufficient Negative Prompts

```
Validation Failed: Only 5 negative prompts, need minimum 10
Severity: HIGH
Fix: Add platform-specific negatives
For Instagram casual: ["professional photography", "studio lighting", "posed", ...]
For LinkedIn professional: ["amateur", "casual", "messy", ...]
```

### Error: Wrong Aspect Ratio

```
Validation Failed: 16:9 aspect ratio for Instagram post
Severity: CRITICAL
Fix: Instagram posts require 4:5 or 1:1
Current: "aspect_ratio": "16:9"
Correct: "aspect_ratio": "4:5"
```

### Error: Vague Camera Specs

```
Validation Failed: Camera focal length "medium" must be exact
Severity: MEDIUM
Fix: Specify exact mm value
Examples:
- Wide angle: 24mm or 28mm
- Standard: 35mm or 50mm
- Portrait: 85mm or 105mm
- Telephoto: 135mm or 200mm
```

---

## Quality Improvement Workflow

### When Score < 8 (Needs Improvement)

**Step 1: Identify Failing Pillars**

```
Scores:
- Completeness: 9/10 ✓
- Technical Precision: 6/10 ← LOW
- Platform Compliance: 9/10 ✓
- Negative Prompts: 10/10 ✓
- Specificity: 7/10 ← MEDIUM
- Pattern Match: 8/10 ✓
- Tool Selection: 9/10 ✓

Overall: 8.0/10
Focus on: Technical Precision, Specificity
```

**Step 2: Address Each Low Pillar**

**Technical Precision (6/10 → 10/10):**

- Find: "warm lighting" → Change to: "lighting: {color_temp: '5200K'}"
- Find: "blue colors" → Change to: "#1E3A8A, #60A5FA"
- Find: "wide angle" → Change to: "focal_length_mm: 24"

**Specificity (7/10 → 10/10):**

- Find: "woman" → Change to: "adult Korean woman in her 20s"
- Find: "room" → Change to: "modern bedroom with white furniture and plants"
- Find: "good pose" → Change to: "standing weight on left hip hand on hip"

**Step 3: Re-Validate**

- Run validation again
- Check all pillars now ≥ 8
- If overall ≥ 8, proceed
- If still < 8, iterate

### When Score 8-9 (Good Quality)

**Optional Improvements:**

- Compare to top performer in category
- Add 1-2 more specific details
- Enhance negative prompts (15+ items)
- Reference photographer/artist styles

**Decision:** Publish as-is OR improve to 10/10

### When Score = 10 (Excellent)

**Actions:**

- Generate visual content
- Save prompt as template
- Tag with pattern category
- Note engagement after posting
- Add to success library

---

## Validation Tools (Conceptual)

### Automated Validation Functions

**validate_structure(prompt_json) → (bool, list[issues])**

- Checks all required sections present
- Returns issues list if incomplete

**validate_technical_precision(prompt_json) → (score, list[issues])**

- Verifies hex codes format
- Checks camera specs are exact
- Returns precision score

**validate_negative_prompts(prompt_json) → (score, list[suggestions])**

- Counts items (must be ≥ 10)
- Checks specificity
- Suggests additions

**validate_platform_compliance(prompt_json, platform) → (bool, list[issues])**

- Checks aspect ratio
- Validates aesthetic match
- Returns compliance report

**calculate_overall_score(prompt_json, platform) → (score, breakdown)**

- Runs all 7 pillar validations
- Calculates weighted average
- Returns detailed breakdown

---

## Revision Strategies

### Quick Fixes (5 minutes)

**Fix 1: Add Missing Sections**

- Copy section template from prompt-patterns.md
- Populate with request-specific details
- Maintain JSON structure

**Fix 2: Convert to Hex Codes**

- Use color converter or reference table
- Replace all color names with #RRGGBB
- Update palette section

**Fix 3: Expand Negative Prompts**

- Load platform-specific negative list
- Add 5-10 items to reach minimum
- Include quality gates and style exclusions

### Deep Revisions (15-30 minutes)

**Revision 1: Pattern Mismatch**

- Load correct pattern from Emily's examples
- Re-structure prompt using pattern
- Preserve user's core request
- Apply pattern's engagement drivers

**Revision 2: Platform Incompatibility**

- Load platform specs
- Adjust aspect ratio
- Revise aesthetic approach
- Update tool selection

**Revision 3: Low Specificity**

- Add 2-3 specific details per section
- Replace vague terms with exact specs
- Include environmental context
- Specify subject attributes

---

## Validation Examples

### Example 1: Full Validation Pass

**Prompt:**

```json
{
  "scene": {
    "description": "modern minimalist office desk with laptop and notebooks",
    "mood": "professional focused productive",
    "time": "morning golden hour"
  },
  "subject": {
    "type": "flat lay composition overhead view",
    "elements": "laptop with code visible notebook with diagrams coffee in white ceramic mug"
  },
  "composition": {
    "aspect_ratio": "4:5",
    "framing": "overhead centered rule of thirds",
    "layout": "diagonal from top-left to bottom-right"
  },
  "lighting": {
    "source": "window light from camera-left",
    "quality": "soft diffused morning light",
    "color_temp": "5200K"
  },
  "color_palette": {
    "primary": "#1E3A8A",
    "secondary": "#60A5FA",
    "background": "#F8F9FA"
  },
  "camera": {
    "angle": "directly overhead 90 degrees",
    "focal_length_mm": 35,
    "aperture_f": 2.8,
    "iso": 400
  },
  "negative_prompt": [
    "cluttered",
    "messy",
    "dark",
    "harsh shadows",
    "watermark",
    "text overlay",
    "people visible",
    "low quality",
    "blurry",
    "distorted",
    "oversaturated",
    "artificial lighting"
  ]
}
```

**Validation Results:**

- Completeness: 10/10 (all sections present)
- Technical Precision: 10/10 (hex codes, exact specs)
- Platform Compliance: 10/10 (4:5 for Instagram)
- Negative Prompts: 10/10 (12 items, specific)
- Specificity: 9/10 (very specific)
- Pattern Match: 8/10 (adapted from editorial)
- Tool Selection: 9/10 (nanobanana for Instagram)
- **Overall: 9.4/10 - Excellent, proceed**

### Example 2: Validation Failure

**Prompt:**

```json
{
  "subject": "woman at desk",
  "colors": "blue and white",
  "camera": "wide angle",
  "lighting": "good natural light",
  "negative_prompt": ["bad", "ugly", "low quality"]
}
```

**Validation Results:**

- Completeness: 3/10 (missing 4 required sections)
- Technical Precision: 2/10 (no hex, no exact specs)
- Platform Compliance: 0/10 (no aspect ratio)
- Negative Prompts: 3/10 (only 3 items, generic)
- Specificity: 2/10 (all vague)
- Pattern Match: 0/10 (no pattern used)
- Tool Selection: 0/10 (not specified)
- **Overall: 1.4/10 - DO NOT USE, complete revision needed**

**Required Fixes:**

1. Add missing sections (scene, composition, look)
2. Convert colors to hex
3. Specify exact camera specs
4. Add 7+ more negative prompts
5. Specify aspect ratio
6. Make all descriptions specific
7. Match to appropriate pattern
8. Select MCP tool

---

**Validation Rules Version:** 1.0
**Framework:** 7-Pillar Quality System
**Minimum Pass Score:** 6/10
**Professional Standard:** 8/10
**Excellence Target:** 10/10
