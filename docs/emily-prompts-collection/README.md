# Emily's Complete Prompt Collection

**Source**: @IamEmily2050 (Twitter)
**Extracted**: October 28, 2025
**Total Prompts**: 30 Complete JSON Prompts

---

## What's Included

### Image Prompts (17 total) - Nano Banana

Located in: `image-prompts/`

**Highest Engagement**:

1. Y2K Mirror Selfie - **4,717 likes** - Lo-fi 2010s snapshot
2. High-Key Winking - **3,230 likes** - K-Beauty porcelain doll
3. Blue Selective Color - **2,986 likes** - B&W with color isolation
4. Mirror Selfie Restroom - **1,599 likes** (1,903 bookmarks!)
5. PC Corner Selfie - **1,479 likes** (1,634 bookmarks!)

### Video Prompts (13 total) - Veo3 Fast

Located in: `video-prompts/`

**Complete Cinematic Specifications**:

1. Donkey Baboon CCTV - **1,245 likes** - Night vision realism
2. Italian Siblings Singing - **579 likes** - First Veo3 test
3. Alpine Flower Macro - **416 likes** - 100mm macro with dew droplet
4. Concrete Corridor Students - **383 likes** - ARRI Alexa 35 specs + dialogue
5. Highland Stag - **338 likes** - Wildlife with breath vapor physics
6. Medieval Castle - **330 likes** - Epic landscape with storm
7. Nighttime Urban Wings - **314 likes** - Portrait with costume wings
8. Alien Coastline - **272 likes** - Sci-fi tessellated ocean
9. Mount Fuji Street - **266 likes** - Japanese summer cicadas
10. Western Fashion - **181 likes** - Veo3 vs Sora comparison
11. Biomech Eye - **169 likes** - Exploded lens assembly
12. B&W Noir City - **164 likes** - One-point perspective canal
13. Sci-Fi Craft - **134 likes** - Gothic hovering megastructure

---

## Files Structure

```
emily-prompts-collection/
├── INDEX.csv (this index with metadata)
├── README.md (this file)
├── image-prompts/
│   ├── 01-y2k-mirror-selfie.json
│   ├── 02-high-key-winking.json
│   ├── 03-blue-selective-color.json
│   ├── ... (17 total)
│   └── 17-pool-deck-90s.json
└── video-prompts/
    ├── 01-donkey-baboon-cctv.json
    ├── 02-italian-siblings.json
    ├── ... (13 total)
    └── 13-scifi-craft.json
```

---

## How to Use

### Quick Reference:

1. Open `INDEX.csv` in Excel/Google Sheets
2. Browse prompts by engagement, type, complexity
3. Find prompt you want → note the `json_file` path
4. Open that JSON file for complete prompt

### For Analysis:

- All prompts have complete JSON structure
- Compare image vs video patterns
- Study Emily's methodology evolution
- Extract reusable patterns

### For Veotools Integration:

- Video prompts show Emily's Veo3 mastery
- Image prompts show her Nano Banana patterns
- Both use same JSON methodology
- Can adapt image patterns for video

---

## Key Discoveries

### Emily's Universal JSON Structure:

```json
{
  "scene": {...},
  "subject": {...},
  "camera": {...},
  "lighting": {...},
  "cinematography": {...},
  "audio": {...},  // Video only
  "color_palette": {...},
  "physics_rules": [...],
  "visual_rules": [...],
  "negative_prompt": [...]
}
```

### Critical Components:

1. **Camera Specs**: Real equipment (Canon EOS R5, ARRI Alexa 35)
2. **Exact Technical Settings**: ISO, aperture, shutter, white balance (Kelvin)
3. **Hex Color Codes**: All colors as hex (#8B8B8B)
4. **Physics Rules**: How things move/behave
5. **Visual Rules**: What to include/exclude
6. **Negative Prompts**: 10+ items minimum
7. **Timeline Beats**: For video (0-2.5s, 2.5-5s, 5-8s)
8. **Audio Specs**: For video (ambience, foley, music, dialogue)

### Complexity Levels:

- **Simple**: 50-100 lines (cat portrait, basic scenes)
- **Medium**: 100-200 lines (standard portraits, simple videos)
- **Complex**: 200-400 lines (multi-subject, detailed environment)
- **Very Complex**: 400+ lines (extreme detail like eye anatomy, sci-fi scenes)

---

## Engagement Patterns

### What Gets High Engagement:

- **Relatable aesthetics**: Y2K, K-Beauty, mirror selfies
- **Complete workflows**: Multi-tool pipelines
- **Creative subjects**: Cat bus, donkey + baboon, emo cat
- **Technical mastery**: Selective color, complex lighting

### Model Distribution:

- **Nano Banana**: Used for all images
- **Veo3 fast**: Used for all videos
- **Post-processing**: Magnific, Lightroom, Topazlabs common

---

## Next Steps

1. **Analyze patterns** → Build universal framework
2. **Extract for veotools** → Video-specific JSON system
3. **Create templates** → Reusable prompt structures
4. **Auto-apply system** → Generate prompts automatically

---

## Data Collection Method

**Tools Used**:

- Apify: `scraping_solutions/twitter-x-scraper` (timeline scraping)
- Apify: `api-ninja/x-twitter-advanced-search` (filtered search)
- Search queries:
  - `from:IamEmily2050 (Veo OR Veo3)` → 50 results
  - `from:IamEmily2050 (Nano Banana OR Gemini) min_faves:150` → 50 results
  - `from:IamEmily2050 Sora` → 15 results (no complete prompts)

**Result**: 30 complete, high-quality JSON prompts ready for analysis

---

**Created**: October 28, 2025
**By**: Apify scraping + pattern analysis
**For**: Veotools skill JSON prompting framework
