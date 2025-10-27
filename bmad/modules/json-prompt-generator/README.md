# JSON Prompt Generator Module 📝

**BMAD Shared Module** - Emily-Quality Structured Prompts

Generate professional JSON prompts for images and videos with technical precision and quality control.

---

## 🎯 What It Does

Creates structured JSON prompts that maintain Emily's quality standards:

- Technical precision (camera specs, lighting ratios, color values)
- Comprehensive negative prompts (prevent AI failures)
- Visual consistency across sequences
- **Flexible scene count** (3 scenes or 20 scenes, your choice)

---

## 📁 Templates Available

### 1. **video-scene.json** - Single Shot

Use for: Individual scenes, key frames, single shots

```
Contains: Scene description, camera specs, lighting, color grading, negatives
Size: ~150 lines of structured JSON
```

### 2. **video-sequence.json** - Multi-Scene (FLEXIBLE)

Use for: Story arcs, evolution videos, tutorials, timelines

```
Contains:
  - Global consistency settings (apply to ALL scenes)
  - Flexible scenes array (add 3, 10, or 20 scenes)
  - Color evolution (gradual palette shift)
  - Transition specifications
Size: ~250 lines + scenes array
```

**Key Feature**: Scene count is DYNAMIC - template supports any number!

---

## 🔄 How It Works

### Quick Start:

**Step 1**: Copy template

```bash
cp templates/video-sequence.json my-video-prompt.json
```

**Step 2**: Populate fields

```
- Set scene_count (3, 5, 10, 20, etc.)
- Fill global_consistency (lens, color evolution, style)
- For each scene: Fill scene-specific details
- Colors gradually shift from start → end palette
```

**Step 3**: Convert to text (if needed)

```
Use: workflows/convert-json-to-text.yaml
Input: my-video-prompt.json
Output: Natural language text prompt
```

**Step 4**: Generate

```
For images: Use with nanobanana or gpt-image-1
For videos: Use with Sora2 or Veo3
```

---

## 🎬 Example: Evolution Video

**Concept**: "Evolution of human tools from stone age to AI"

**Using Flexible Template**:

1. Set `scene_count: 4`
2. Set global color evolution: Earthy browns → Vibrant cyan/orange
3. Fill 4 scenes:
   - Scene 1: Stone age (fire, chiseling)
   - Scene 2: Medieval (workshop, metal tools)
   - Scene 3: Modern (desk, computer)
   - Scene 4: Future (AI, holograms)

4. Each scene inherits:
   - Same lens (50mm Prime)
   - Same grain (Heavy 35mm)
   - Same framing style (close-ups on hands)
   - Colors shift gradually per scene

**Result**: Coherent 12-second video with visual consistency

---

## 🏗️ Module Structure

```
json-prompt-generator/
├── json-prompt-generator.module.yaml  # Module definition
├── README.md                          # This file
├── sidecar/
│   └── conversion-rules.md            # JSON → Text conversion guide
├── templates/
│   ├── video-scene.json               # Single scene template
│   └── video-sequence.json            # Flexible multi-scene template
└── workflows/
    └── convert-json-to-text.yaml      # Conversion workflow
```

---

## ✅ Used By

- **AI Video Agent** - Generate cinematic sequences with Emily-quality
- **AI Image Generator** - (Future integration)
- **Future Agents** - Audio, 3D, etc.

---

## 🚀 Quick Reference

**Want 3 scenes?** Add 3 entries to scenes array
**Want 20 scenes?** Add 20 entries to scenes array
**Want consistency?** Set global_consistency (applies to all)
**Want variety?** Adjust scene-specific details

**It's that simple!**
