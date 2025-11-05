# YouTube Thumbnail Creation Modes

**Mode A (From Scratch) vs Mode B (With Your Image) - Complete Guide**

---

## 🎯 Two Flexible Approaches

### Mode A: Create From Scratch

**No user image needed** - Pure AI generation

### Mode B: With Your Image

**User provides image** - AI composes into thumbnail

**Both modes create effective thumbnails! Choice depends on your needs.**

---

## 🆕 Mode A: Create From Scratch

### When to Use

✅ **Topic doesn't need your face:**

- Abstract concepts ("How AI Works")
- Tutorial/how-to (tool-focused)
- Brand-only content
- Tech explanations
- Animation/graphics-only videos

✅ **Don't have good photo:**

- No quality headshot available
- Lighting/quality issues with photos
- Prefer generated aesthetic

✅ **Fast iteration:**

- Testing different concepts quickly
- High volume thumbnail creation
- Quick turnaround needed

✅ **Generic/universal appeal:**

- Broad audience content
- Not personal brand building
- Topic over personality

### How It Works

```yaml
mcp__nanobanana__generate_image:
  prompt: "YouTube thumbnail for [topic]. Bold white text '[TITLE]' in impact font with black outline. Vibrant orange-blue gradient background. Abstract tech visual elements. Eye-catching, high contrast, curiosity-driven. Professional YouTube aesthetic."
  mode: 'generate'
  negative_prompt: 'small text, low contrast, boring, face (if not wanted), cluttered, illegible, dull colors, generic'
  n: 1
```

**Result**: Complete thumbnail generated from text only

### Advantages

- ✅ No photo needed (works for any content)
- ✅ Faster (one-step generation)
- ✅ Fully customizable (AI creates everything)
- ✅ Consistent aesthetic possible
- ✅ No photo quality concerns

### Limitations

- ⚠️ Misses 40% CTR boost from faces
- ⚠️ Less personal branding
- ⚠️ Harder to build audience recognition
- ⚠️ No "human connection"

---

## 📸 Mode B: With Your Image

### When to Use

✅ **Personal branding important:**

- Building audience recognition
- "You" are the brand
- Commentary/reaction content
- Educational (teacher/instructor persona)

✅ **Face thumbnails proven:**

- Existing successful channel uses faces
- Audience expects to see you
- "Talking head" video style
- Personal vlogs/experiences

✅ **Have quality photo:**

- Good headshot available
- Well-lit, expressive photo
- Professional or engaging image
- Various expressions to choose from

✅ **Higher CTR priority:**

- Willing to use faces for 40% boost
- Competitive niche (need edge)
- Growth-focused

### How It Works

```yaml
mcp__nanobanana__generate_image:
  prompt: "YouTube thumbnail: Person from first image with surprised excited expression, positioned left third. Bold white text 'AI AGENTS EXPLAINED' in impact font with black outline, right side. Vibrant orange-blue gradient background. High contrast, eye-catching, professional YouTube aesthetic. Face should be prominent and expressive."
  mode: 'generate'
  input_image_path_1: '/Users/sid/photos/headshot-excited.jpg'
  negative_prompt: 'small text, low contrast, boring expression, mismatched lighting, pasted appearance, cluttered, small face, neutral emotion'
  n: 1
```

**Result**: Your face composited into professional YouTube thumbnail with text

### Advantages

- ✅ 40% better CTR (proven by studies!)
- ✅ Personal branding (audience recognizes you)
- ✅ Emotional connection
- ✅ Human element (builds trust)
- ✅ Stands out (face among generic thumbnails)

### Limitations

- ⚠️ Need quality photos (good lighting, expressions)
- ⚠️ Photo library management
- ⚠️ Slightly more complex (two inputs)
- ⚠️ May feel repetitive (same face every video)

---

## 🔄 Workflow for Both Modes

### Mode A Workflow (From Scratch)

**Step 1**: Gather video topic and title
**Step 2**: Select YouTube thumbnail design style
**Step 3**: Construct prompt with:

- Bold text (video title or hook - 3-7 words)
- Background style (gradient, abstract, topic-relevant)
- Visual elements (icons, shapes, topic imagery)
- Color scheme (vibrant, high contrast)

**Step 4**: Generate with nanobanana (mode: "generate", no input image)
**Step 5**: Validate (readable at 156×88px mobile size?)
**Step 6**: Export and upload

**Time**: ~30 seconds
**Cost**: $0.039

---

### Mode B Workflow (With Your Image)

**Step 1**: Gather video topic and title
**Step 2**: Ask user: "Provide path to your image"
**Step 3**: Verify image exists and quality
**Step 4**: Ask: "What emotion/expression?" (surprised, excited, curious, serious)
**Step 5**: Construct prompt with:

- Person from input image (with specified emotion)
- Position (left or right third)
- Bold text (video title - 3-7 words)
- Background (vibrant, complementary to face)
- Composition (face prominent, text readable)

**Step 6**: Generate with nanobanana (mode: "generate", input_image_path_1: user photo)
**Step 7**: Validate (face expressive? text readable?)
**Step 8**: Export and upload

**Time**: ~40 seconds
**Cost**: $0.039

---

## 🎨 Image Requirements for Mode B

### Your Photo Should Have:

**Lighting:**

- Well-lit face (no harsh shadows)
- Even exposure (not over/underexposed)
- Clear facial features visible

**Expression:**

- Expressive emotion (not neutral!)
- Clear, exaggerated (reads at small size)
- Genuine (not forced)

**Quality:**

- Sharp focus (not blurry)
- High resolution (minimum 500px)
- Clean background (easier to composite)
- No weird artifacts

**Format:**

- JPG, PNG, WebP supported
- Under 20MB (nanobanana limit)

### Photo Library Strategy

**Create expression library:**

- Excited/surprised (tech reveals, breakthroughs)
- Curious/intrigued (mysteries, questions)
- Confident/authoritative (tutorials, education)
- Concerned/worried (problems, warnings)
- Laughing/joyful (entertainment, fun content)

**Shoot once, reuse many times!**

- Take 10-20 headshots with different expressions
- Save in organized folder
- Reuse for different video types
- Consistent branding across channel

---

## 🔀 Hybrid Approach

**Strategy: Use BOTH modes strategically**

**Mode A for:**

- Tech tutorials (tool-focused)
- Abstract concepts
- Brand announcements
- Quick updates

**Mode B for:**

- Personal commentary
- Reactions/reviews
- "How I did X" stories
- Educational (instructor-led)

**Benefit**: Variety in thumbnails while maintaining quality!

---

## 💡 Decision Guide

### Ask These Questions:

**1. Is this about YOU or the TOPIC?**

- You/personal → Mode B (with face)
- Topic/abstract → Mode A (from scratch)

**2. Do you have a good photo?**

- Yes, quality shot → Mode B
- No, or not relevant → Mode A

**3. What's your channel style?**

- Personal brand (MrBeast style) → Mode B
- Educational/corporate → Either works
- Tech/tutorial → Mode A often sufficient

**4. What's your goal?**

- Build personal brand → Mode B
- Fast high-volume → Mode A
- Maximum CTR → Mode B (if you have good photos)

---

## 📊 Examples

### Example: Tech Tutorial

**Topic**: "How to Build AI Agents"

**Mode A** (Topic-focused):

```
Prompt: "YouTube thumbnail with bold text 'BUILD AI AGENTS' in white impact font with black outline. Dark tech background with circuit board pattern. Abstract AI/robot icon. Vibrant cyan and orange accents. High contrast, professional tech aesthetic."

Result: Clean tech thumbnail, topic-focused
CTR: Good (baseline)
```

**Mode B** (Personal):

```
Input: Your headshot (confident expression)
Prompt: "YouTube thumbnail: Person from first image with confident teaching expression, left third. Bold text 'BUILD AI AGENTS' right side. Dark tech circuit background, cyan-orange accents. Face prominent, professional tech aesthetic."

Result: Your face + topic, personal brand
CTR: Better (face boost!)
```

**Verdict**: Mode B if you're building personal instructor brand, Mode A if corporate/brand-focused

---

### Example: Product Review

**Topic**: "iPhone 16 Pro Review"

**Mode A** (Product-focused):

```
Prompt: "YouTube thumbnail with iPhone 16 Pro prominent. Bold text 'WORTH IT?' in impact font. Vibrant background, high contrast. Product clear and detailed."

Result: Product-first thumbnail
Good for: Established channels, SEO-focused
```

**Mode B** (Reviewer personality):

```
Input: Your photo (thoughtful/evaluating expression)
Prompt: "Person from first image holding/next to iPhone 16 Pro, thoughtful expression. Bold text 'WORTH IT?' High contrast, vibrant colors, professional review aesthetic."

Result: You + product, personality-driven
Good for: Personal review channels, building brand
```

**Verdict**: Mode B for personal review channels (MKBHD style)

---

## 🎯 Best Practices by Mode

### Mode A Best Practices

- Focus on topic clarity (what's the video about?)
- Bold, large text (main hook)
- Relevant visual elements (don't just use abstract)
- High contrast, vibrant colors
- Professional aesthetic

### Mode B Best Practices

- Choose appropriate expression for video mood
- Position face prominently (40-60% of frame)
- Text doesn't block face
- Background complements face (contrast)
- Consistent photo quality across videos
- Lighting on face matches thumbnail aesthetic

---

## 🔧 Tool Usage

**Mode A:**

```yaml
mcp__nanobanana__generate_image:
  prompt: '[Complete thumbnail description]'
  mode: 'generate'
  # No input_image_path needed
```

**Mode B:**

```yaml
mcp__nanobanana__generate_image:
  prompt: '[Thumbnail with person from first image...]'
  mode: 'generate'
  input_image_path_1: '/path/to/your/photo.jpg'
```

**Why nanobanana for both:**

- Fast ($0.039 per thumbnail)
- Mode A: Good generation quality
- Mode B: ONLY tool with multi-image input
- High volume friendly (create many thumbnails)

---

**For YouTube specifications, see:** `youtube-specs.md`
**For design best practices, see:** `design-best-practices.md`
**For prompt examples, see:** `prompt-templates.md`
