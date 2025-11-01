# YouTube Thumbnail Prompt Templates

**Effective prompts for both creation modes**

---

## ⚠️ CRITICAL REQUIREMENTS (ALWAYS INCLUDE)

**For nanobanana (Mode B with user face):**
1. **Start with aspect ratio**: "16:9 widescreen landscape horizontal YouTube thumbnail layout"
2. **Specify exact text**: 'Bold text reading exactly "YOUR EXACT TITLE"'
3. **Use spatial terms**: "LEFT THIRD", "RIGHT SIDE", "horizontal composition"
4. **Add negative prompts**: "portrait orientation, vertical layout, 9:16, wrong text"

**For gpt-image-1 (Mode A no face):**
1. **Use size parameter**: `size: "1536x1024"`
2. **Specify exact text**: 'text reading exactly "YOUR EXACT TITLE"'
3. **Less spatial detail needed** (size guarantees aspect ratio)

---

## 🆕 Mode A: From Scratch Templates

### Template 1: Bold Text + Gradient Background
```
YouTube thumbnail with bold white text '[TITLE]' in impact font with thick black outline. Vibrant [color1]-[color2] gradient background (e.g., orange-blue, red-purple). High contrast, eye-catching, professional YouTube aesthetic. Text large and dominant, readable at small preview size (156×88px). Clean composition, no clutter.

Negative: small text, low contrast, boring, generic, cluttered, illegible, dull colors, faces (if not wanted)
```

**Example - Tech Tutorial:**
```
YouTube thumbnail with bold white text 'BUILD AI AGENTS' in impact font with black outline. Vibrant cyan-to-orange gradient background. Abstract circuit board pattern subtle in background. Small robot icon bottom-right. High contrast, tech aesthetic, eye-catching.

Negative: small text, low contrast, faces, cluttered, boring colors
```

---

### Template 2: Topic Visual + Text
```
YouTube thumbnail featuring [main subject/visual] prominently. Bold white text '[TITLE]' in impact font with black stroke, positioned [top/bottom/side] not blocking subject. Vibrant background in [colors], high contrast. Professional, eye-catching, curiosity-driven YouTube aesthetic.

Negative: small text, cluttered, low contrast, generic, boring, illegible at small size
```

**Example - Product Review:**
```
YouTube thumbnail featuring iPhone 16 Pro prominently centered. Bold yellow text 'WORTH IT?' in impact font with black stroke, positioned top. Dark background with vibrant blue-purple gradient. High contrast, tech product aesthetic, professional review style.

Negative: small text, boring colors, cluttered, low contrast, generic stock photo look
```

---

### Template 3: Abstract + Emotion Words
```
YouTube thumbnail with abstract [concept] visual. HUGE bold text '[EMOTIONAL HOOK]' in [color] impact font with outline. [Background description]. Curiosity-driven, high contrast, vibrant colors, professional YouTube aesthetic. Design should trigger [emotion - curiosity/excitement/surprise].

Negative: small text, subtle colors, low contrast, complex visuals, cluttered
```

**Example - Controversial Topic:**
```
YouTube thumbnail with abstract question mark visual. HUGE bold red text 'EVERYONE'S WRONG' in impact font with white outline. Dark background with dramatic lighting effect. High contrast, controversy-driven, attention-grabbing YouTube aesthetic.

Negative: small text, boring, low contrast, generic, subtle
```

---

## 📸 Mode B: With User Image Templates (CORRECTED)

### Template 1: Face Left, Text Right (CORRECTED FORMAT)
```
16:9 widescreen landscape horizontal YouTube thumbnail layout. Person from first image with [emotional expression - surprised/excited/curious/serious] expression positioned on LEFT THIRD of frame. Bold white text reading exactly '[YOUR EXACT TITLE]' in impact font with black stroke on RIGHT SIDE. Vibrant [color] background, high contrast between face and background, professional YouTube aesthetic, horizontal composition. Face close-up, expressive, prominent.

Negative: portrait orientation, vertical layout, 9:16 aspect ratio, small text, low contrast, boring expression, neutral face, mismatched lighting, small face, cluttered, text blocking face, wrong text, different wording
```

**Example - Tutorial Video (CORRECTED):**
```
16:9 widescreen landscape horizontal YouTube thumbnail layout. Person from first image with confident teaching expression positioned on LEFT THIRD. Bold white text reading exactly 'LEARN AI IN 10 MIN' in impact font with black stroke on RIGHT SIDE. Vibrant blue gradient background, high contrast, professional educational aesthetic, horizontal composition.

Negative: portrait orientation, vertical layout, 9:16, small text, boring expression, low contrast, cluttered, text blocking face, wrong text
```

---

### Template 2: Face Center, Text Top/Bottom
```
YouTube thumbnail: Person from first image with [expression] taking up center 60% of frame. Bold text '[TITLE]' positioned [top or bottom], impact font with outline for high contrast. Background color [specify] creates strong separation from subject. Face dominant, expression clear and engaging. Professional YouTube thumbnail aesthetic.

Negative: small text, small face, boring background, low contrast, neutral expression, cluttered
```

**Example - Reaction Video:**
```
YouTube thumbnail: Person from first image with shocked surprised expression (mouth open, eyes wide), filling center 60% of frame. Bold yellow text 'NO WAY!' positioned top, impact font with black outline. Bright red background creates dramatic effect. Face massive and expressive, high energy thumbnail.

Negative: small face, boring expression, small text, low contrast, neutral colors
```

---

### Template 3: Side-by-Side (Face + Subject)
```
YouTube thumbnail: Person from first image with [expression] in left half. [Subject/product/concept] in right half. Bold text '[TITLE]' overlaid [position]. Vibrant background, high contrast split composition. Both face and subject clearly visible. Professional YouTube review/comparison aesthetic.

Negative: cluttered, small elements, low contrast, boring colors, elements too small, text illegible
```

**Example - Tech Review:**
```
YouTube thumbnail: Person from first image with thoughtful evaluating expression in left half. MacBook Pro laptop in right half. Bold text 'M4 PRO REVIEW' across top in white impact font with black outline. Dark background with blue accent lighting. Split composition, both face and product prominent.

Negative: small face, small product, cluttered, low contrast, boring
```

---

## 🎨 Emotion-Specific Prompts (Mode B)

### Surprised/Shocked
```
Person from first image with extremely surprised expression - mouth wide open, eyebrows raised high, eyes wide. Conveys "I can't believe this" emotion clearly.
```

**Use for**: Surprising results, unexpected discoveries, shocking facts

---

### Excited/Enthusiastic
```
Person from first image with genuinely excited expression - big smile, energetic, enthusiastic. Conveys "this is amazing!" emotion.
```

**Use for**: Positive reviews, breakthroughs, good news, tutorials

---

### Curious/Intrigued
```
Person from first image with curious intrigued expression - raised eyebrow, slight smile, questioning look. Conveys "hmm, interesting" emotion.
```

**Use for**: Deep dives, investigations, analysis videos

---

### Serious/Authoritative
```
Person from first image with confident serious expression - direct gaze, professional, authoritative. Conveys expertise and credibility.
```

**Use for**: Educational content, professional advice, serious topics

---

### Concerned/Worried
```
Person from first image with concerned worried expression - furrowed brow, concerned look. Conveys "this is a problem" emotion.
```

**Use for**: Problem discussions, warnings, cautionary content

---

## 🎯 Background Combinations

### For Mode A (No Face)

**Gradient Backgrounds:**
```
- Orange-blue gradient (most popular YouTube combo)
- Red-purple gradient (dramatic, energetic)
- Cyan-magenta gradient (modern, tech)
- Yellow-green gradient (fresh, positive)
```

**Solid + Accent:**
```
- Dark background + vibrant text
- Bright background + dark text
- Bold color + contrasting elements
```

**Topic-Relevant:**
```
- Tech: Circuit boards, abstract data, futuristic
- Business: Clean professional, charts, growth arrows
- Creative: Artistic, colorful, dynamic
```

---

### For Mode B (With Face)

**Complementary to Face:**
```
- If face warm-toned → Cool background (blue, cyan, purple)
- If face cool-toned → Warm background (orange, red, yellow)
- Contrast is key (face should POP from background)
```

**Emotion-Matched:**
```
- Excited face → Vibrant energetic background
- Serious face → Professional clean background
- Curious face → Mysterious darker background
- Happy face → Bright positive background
```

---

## 🔧 Negative Prompts by Mode

### Mode A Negatives
```
"small text, low contrast, boring, generic, cluttered, illegible, dull colors, faces (if not wanted), subtle, text-heavy, complex visuals, hard to read at small size, professional corporate (too stiff for YouTube)"
```

### Mode B Negatives
```
"small text, low contrast, boring expression, neutral face, mismatched lighting, pasted appearance, artificial composition, small face, cluttered, text blocking face, bad lighting on subject, color mismatch, face too small, illegible text"
```

---

## 📊 Examples by Video Type

### Tech Tutorial (Mode A)
```
Topic: "Python API Tutorial"
Text: "PYTHON API"
Prompt: "YouTube thumbnail with bold white text 'PYTHON API' in impact font, black outline. Dark background with blue-green gradient. Small Python logo icon. Clean tech aesthetic, high contrast, eye-catching."
```

### Tech Tutorial (Mode B)
```
Topic: "Python API Tutorial"
User image: Confident teaching expression
Prompt: "Person from first image with confident expression, left third. Bold text 'PYTHON API' right side. Dark blue tech background. Face prominent, professional educational aesthetic."
```

---

### Product Review (Mode A)
```
Topic: "MacBook Pro M4 Review"
Prompt: "MacBook Pro M4 prominently displayed. Bold text 'M4 PRO REVIEW' in yellow impact font. Dark background, product spotlighted. High-end tech aesthetic."
```

### Product Review (Mode B)
```
Topic: "MacBook Pro M4 Review"
User image: Thoughtful evaluating expression
Prompt: "Person from first image thoughtfully looking at MacBook Pro M4 (right side). Bold text 'M4 PRO REVIEW' top. Face and product both prominent, professional review aesthetic."
```

---

## ✅ Quality Checklist

### For Both Modes
- [ ] Text is 3-7 words (readable)
- [ ] High contrast (vibrant colors)
- [ ] Readable at 156×88px (mobile test!)
- [ ] File under 2MB
- [ ] 1536×1024px or 1280×720px
- [ ] Not misleading (matches video content)

### Mode B Additional
- [ ] Face expressive (not neutral)
- [ ] Face prominent (40-60% of frame)
- [ ] Good lighting on face
- [ ] Face doesn't conflict with background
- [ ] Expression matches video mood

---

## 🚀 Quick Start

**Mode A - No Image:**
1. Video topic + hook text (3-7 words)
2. Choose vibrant color scheme
3. Generate with nanobanana (no input image)
4. Test at small size
5. Upload!

**Mode B - With Image:**
1. Pick photo with right emotion
2. Video topic + hook text (3-7 words)
3. Choose background (complements face)
4. Generate with nanobanana (input_image_path_1)
5. Test at small size
6. Upload!

**Both modes create effective thumbnails - choose based on your needs!**

---

**For specifications, see:** `youtube-specs.md`
**For best practices, see:** `design-best-practices.md`
**For mode selection, see:** `creation-modes.md`
