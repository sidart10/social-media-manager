# Usage Examples - Sid AI Images

**Complete real-world scenarios from request to final image**

**Your LoRA Model:**

- **Trigger Word**: "Sid"
- **LoRA URL**: https://v3b.fal.media/files/b/zebra/Jujtmkl_X-v5x0KxjM3gm_pytorch_lora_weights.safetensors
- **Training Steps**: 2500 (well-trained)

---

## Example 1: Professional LinkedIn Headshot

### Scenario

Need a professional headshot for LinkedIn profile update.

### Requirements

- Professional corporate appearance
- Neutral background
- High quality for profile picture
- Suitable for circular crop

### Step-by-Step

**1. Select Template**

- From prompt-templates.md: "LinkedIn Headshot (Corporate)"

**2. Customize Prompt**

```
Sid, professional LinkedIn headshot, navy blazer with white dress shirt, neutral gray background (#808080), soft studio lighting from camera left at 45 degrees, subtle fill light camera right, head and shoulders composition centered, confident professional smile, shot on Canon 85mm f/1.8 lens at f/2.8, shallow depth of field, photorealistic, high detail, natural skin texture, professional corporate quality, commercial headshot standard
```

**3. Prepare Negative Prompt**

```
amateur lighting, harsh shadows, overexposed, underexposed, blurry, out of focus, low resolution, casual clothing, distracting background, cluttered, unnatural pose, awkward expression, heavy filters, over-processed, low quality, artifacts, noise, cartoon, illustration, CGI, watermarks, logos, text overlays
```

**4. Call FAL LoRA (Using FLUX + LoRA)**

```yaml
mcp__fal-video__execute_custom_model:
  endpoint: 'fal-ai/flux-lora'
  category_hint: 'image'
  input_params:
    prompt: 'Sid, professional LinkedIn headshot, navy blazer with white dress shirt, neutral gray background (#808080), soft studio lighting from camera left at 45 degrees, subtle fill light camera right, head and shoulders composition centered, confident professional smile, shot on Canon 85mm f/1.8 lens at f/2.8, shallow depth of field, photorealistic, high detail, natural skin texture, professional corporate quality, commercial headshot standard'
    negative_prompt: 'amateur lighting, harsh shadows, overexposed, underexposed, blurry, out of focus, low resolution, casual clothing, distracting background, cluttered, unnatural pose, awkward expression, heavy filters, over-processed, low quality, artifacts, noise, cartoon, illustration, CGI, watermarks, logos, text overlays'
    loras: [{ 'path': 'https://v3b.fal.media/files/b/zebra/Jujtmkl_X-v5x0KxjM3gm_pytorch_lora_weights.safetensors', 'scale': 0.85 }]
    num_images: 2
    guidance_scale: 7.5
    num_inference_steps: 30
    image_size: 'square_hd'
    seed: 42
```

**5. Evaluate Result (7-Pillar)**

- Clarity: 9/10 - Very clear, professional
- Technical Quality: 9/10 - Sharp, no artifacts
- Composition: 8/10 - Well-centered
- Likeness: 9/10 - Accurate representation
- Scenario Accuracy: 9/10 - Matches corporate headshot
- Professionalism: 9/10 - Enterprise-grade
- Prompt Accuracy: 9/10 - All elements present

**Overall: 8.9/10** - Excellent, ready for LinkedIn

**6. Save Metadata**

```json
{
  "use_case": "LinkedIn headshot",
  "prompt": "Sid, professional LinkedIn headshot...",
  "model": "flux-lora",
  "lora_url": "https://v3b.fal.media/files/b/zebra/Jujtmkl_X-v5x0KxjM3gm_pytorch_lora_weights.safetensors",
  "parameters": {
    "guidance_scale": 7.5,
    "steps": 30,
    "seed": 42,
    "lora_scale": 0.85
  },
  "quality_score": 8.9,
  "file_path": "outputs/sid-headshots/linkedin-professional-001.png",
  "timestamp": "2025-10-28T10:30:00Z"
}
```

---

## Example 2: Instagram Lifestyle Post

### Scenario

Create casual Instagram post for personal brand, coffee shop theme.

### Requirements

- Casual, authentic vibe
- Lifestyle aesthetic
- Instagram-worthy composition
- Square format (1:1)

### Step-by-Step

**1. Select Template**

- From prompt-templates.md: "Instagram Portrait (Lifestyle)" - Coffee Shop Casual

**2. Customize Prompt**

```
Sid, lifestyle portrait for Instagram, casual denim jacket over white t-shirt, urban coffee shop with industrial interior, warm natural window lighting from right, relaxed friendly vibe, candid natural pose with coffee cup in hand, Instagram aesthetic, warm earthy tones with slight desaturation, photorealistic, high quality, authentic moment
```

**3. Prepare Negative Prompt**

```
stiff formal pose, studio lighting, corporate attire, boring background, over-processed, heavy filters, artificial, low quality, stock photo aesthetic, unnatural, posed, professional headshot style, business attire, cluttered
```

**4. Call FAL LoRA**

```yaml
mcp__fal-video__execute_custom_model:
  endpoint: 'fal-ai/flux-lora'
  category_hint: 'image'
  input_params:
    prompt: 'Sid, lifestyle portrait for Instagram, casual denim jacket over white t-shirt, urban coffee shop with industrial interior, warm natural window lighting from right, relaxed friendly vibe, candid natural pose with coffee cup in hand, Instagram aesthetic, warm earthy tones with slight desaturation, photorealistic, high quality, authentic moment'
    negative_prompt: 'stiff formal pose, studio lighting, corporate attire, boring background, over-processed, heavy filters, artificial, low quality, stock photo aesthetic, unnatural, posed, professional headshot style, business attire, cluttered'
    loras: [{ 'path': 'https://v3b.fal.media/files/b/zebra/Jujtmkl_X-v5x0KxjM3gm_pytorch_lora_weights.safetensors', 'scale': 0.9 }]
    num_images: 3
    guidance_scale: 6.5
    num_inference_steps: 30
    image_size: 'square_hd'
```

**5. Generate Multiple Variations**
Result: 3 different casual poses in coffee shop setting

- Pick best option for authentic, natural look

**6. Quality Evaluation**

- Clarity: 8/10 - Clear lifestyle shot
- Technical Quality: 8/10 - Good quality
- Composition: 9/10 - Instagram-worthy
- Likeness: 9/10 - Natural representation
- Scenario Accuracy: 9/10 - Perfect coffee shop vibe
- Professionalism: 8/10 - Appropriate for social
- Prompt Accuracy: 8/10 - Matches request

**Overall: 8.4/10** - Great for Instagram post

---

## Example 3: YouTube Thumbnail (Tech Tutorial)

### Scenario

Create engaging thumbnail for YouTube video: "How I Built an AI Agent"

### Requirements

- High energy, attention-grabbing
- Clear focal point (face + expression)
- Space for text overlay
- 16:9 aspect ratio
- Works at small sizes

### Step-by-Step

**1. Select Template**

- From prompt-templates.md: "YouTube Thumbnail (High Energy)" - Pointing Gesture

**2. Customize Prompt**

```
Sid, YouTube thumbnail portrait, pointing directly at camera with excited gesture, energetic surprised expression with wide eyes, wearing bright red hoodie, clean solid white background (#FFFFFF), high contrast dramatic lighting from front and sides, eye-catching centered composition with slight headroom for text, vibrant saturated colors, optimized for 1280×720, professional thumbnail quality, attention-grabbing, clear focal point, high energy vibe
```

**3. Prepare Negative Prompt**

```
boring expression, low energy, dull colors, poor lighting, soft focus, low contrast, subtle composition, formal attire, busy background, amateur, small details, low saturation, generic stock photo, professional headshot style, calm expression, muted tones
```

**4. Call FAL LoRA**

```yaml
mcp__fal-video__execute_custom_model:
  endpoint: 'fal-ai/flux-lora'
  category_hint: 'image'
  input_params:
    prompt: 'Sid, YouTube thumbnail portrait, pointing directly at camera with excited gesture, energetic surprised expression with wide eyes, wearing bright red hoodie, clean solid white background (#FFFFFF), high contrast dramatic lighting from front and sides, eye-catching centered composition with slight headroom for text, vibrant saturated colors, optimized for 1280×720, professional thumbnail quality, attention-grabbing, clear focal point, high energy vibe'
    negative_prompt: 'boring expression, low energy, dull colors, poor lighting, soft focus, low contrast, subtle composition, formal attire, busy background, amateur, small details, low saturation, generic stock photo, professional headshot style, calm expression, muted tones'
    loras: [{ 'path': 'https://v3b.fal.media/files/b/zebra/Jujtmkl_X-v5x0KxjM3gm_pytorch_lora_weights.safetensors', 'scale': 0.85 }]
    num_images: 4
    guidance_scale: 8.5
    num_inference_steps: 35
    image_size: 'landscape_16_9'
```

**5. Generate Variations**
Result: 4 high-energy options

- Review for best expression and composition
- Select most engaging for thumbnail use

**6. Post-Process**

- Add text overlay: "How I Built an AI Agent"
- Verify readable at small size
- Check contrast for text visibility

**7. Quality Evaluation**

- Clarity: 10/10 - Crystal clear at small size
- Technical Quality: 9/10 - Sharp, vibrant
- Composition: 9/10 - Perfect for text overlay
- Likeness: 9/10 - Recognizable
- Scenario Accuracy: 10/10 - Perfect thumbnail energy
- Professionalism: 8/10 - Appropriate for YouTube
- Prompt Accuracy: 9/10 - All elements present

**Overall: 9.1/10** - Excellent thumbnail

---

## Example 4: Tech Workspace Scene

### Scenario

Create authentic photo of Sid coding for blog post header or Twitter post.

### Requirements

- Tech/startup aesthetic
- Realistic workspace setting
- Shows coding activity
- Professional but authentic

### Step-by-Step

**1. Select Template**

- From prompt-templates.md: "Tech Workspace" - Coding Focus

**2. Customize Prompt**

```
Sid, working at modern tech workspace, coding on laptop with intense focus, dual monitors displaying code editor with Python code and terminal windows, wearing comfortable dark gray hoodie, concentrated expression with slight furrow in brow, warm desk lamp lighting from left with ambient office glow, tech startup aesthetic with minimalist desk setup, shallow depth of field with monitors slightly blurred in background, professional photography, authentic tech culture, photorealistic, high quality, natural moment
```

**3. Prepare Negative Prompt**

```
messy workspace, poor lighting, outdated technology, formal corporate office, suit and tie, cluttered desk, unnatural pose, stock photo, artificial staging, low quality, gaming setup, RGB lights, toys on desk, busy background, distracting elements
```

**4. Call FAL LoRA**

```yaml
mcp__fal-video__execute_custom_model:
  endpoint: 'fal-ai/flux-lora'
  category_hint: 'image'
  input_params:
    prompt: 'Sid, working at modern tech workspace, coding on laptop with intense focus, dual monitors displaying code editor with Python code and terminal windows, wearing comfortable dark gray hoodie, concentrated expression with slight furrow in brow, warm desk lamp lighting from left with ambient office glow, tech startup aesthetic with minimalist desk setup, shallow depth of field with monitors slightly blurred in background, professional photography, authentic tech culture, photorealistic, high quality, natural moment'
    negative_prompt: 'messy workspace, poor lighting, outdated technology, formal corporate office, suit and tie, cluttered desk, unnatural pose, stock photo, artificial staging, low quality, gaming setup, RGB lights, toys on desk, busy background, distracting elements'
    loras: [{ 'path': 'https://v3b.fal.media/files/b/zebra/Jujtmkl_X-v5x0KxjM3gm_pytorch_lora_weights.safetensors', 'scale': 0.9 }]
    num_images: 2
    guidance_scale: 7.0
    num_inference_steps: 30
    image_size: 'landscape_4_3'
```

**5. Quality Evaluation**

- Clarity: 8/10 - Clear workspace scene
- Technical Quality: 9/10 - Professional quality
- Composition: 9/10 - Great depth of field
- Likeness: 9/10 - Natural Sid
- Scenario Accuracy: 9/10 - Authentic tech workspace
- Professionalism: 9/10 - Blog-worthy
- Prompt Accuracy: 8/10 - Most elements present

**Overall: 8.7/10** - Perfect for blog header

---

## Example 5: Multiple Scenarios for Content Series

### Scenario

Create 5 consistent images for LinkedIn carousel about "A Day in My Life as a Developer"

### Requirements

- Consistent style across all images
- Different scenarios (morning, work, break, evening, night)
- Same person (Sid), same day aesthetic
- Professional quality

### Step-by-Step

**1. Plan Consistent Parameters**

```yaml
# Use same base settings for all
guidance_scale: 7.5
num_inference_steps: 30
image_size: 'square_hd'
lora_scale: 0.85

# Consistent style keywords
style_base: 'photorealistic, natural lighting, professional quality, lifestyle photography'
```

**2. Generate Each Scene**

**Scene 1: Morning Coffee**

```
Prompt: "Sid, morning coffee routine, pouring coffee into mug in modern kitchen, wearing comfortable morning hoodie, warm natural morning light from window, peaceful morning vibe, lifestyle photography, photorealistic, natural lighting, professional quality"
```

**Scene 2: Morning Standup**

```
Prompt: "Sid, participating in video call standup meeting, speaking to laptop camera, home office setup, engaged professional expression, soft natural window light, morning work mode, lifestyle photography, photorealistic, natural lighting, professional quality"
```

**Scene 3: Deep Work**

```
Prompt: "Sid, focused coding session at desk, wearing comfortable hoodie, intense concentration, dual monitors with code, afternoon natural light, productive work aesthetic, lifestyle photography, photorealistic, natural lighting, professional quality"
```

**Scene 4: Afternoon Walk**

```
Prompt: "Sid, walking outdoors for afternoon break, casual comfortable attire, urban park setting, natural daylight, refreshed energized expression, lifestyle photography, photorealistic, natural lighting, professional quality"
```

**Scene 5: Evening Planning**

```
Prompt: "Sid, evening planning session with notebook and laptop, reviewing work done, relaxed satisfied expression, warm desk lamp lighting as sun sets, end of day reflection, lifestyle photography, photorealistic, natural lighting, professional quality"
```

**3. Generate All Images**

```yaml
# Run 5 separate generations with same base params
# Each with scenario-specific prompt
# Keep consistent negative prompts
```

**4. Review for Consistency**

- Check lighting consistency
- Verify style matches across all
- Ensure same person representation
- Select best from each scenario

**5. Create Carousel**

- Arrange in story sequence
- Add text overlays if needed
- Export for LinkedIn carousel format

---

## Advanced Use Cases

### A/B Testing Social Content

**Generate variations:**

```yaml
# Same prompt, different seeds
seed: 42, 43, 44, 45, 46
# Test which performs best on social
# Track engagement metrics
# Use winning style for future posts
```

### Seasonal Content Planning

**Generate ahead:**

```
# Create 30 professional headshots with slight variations
# Different outfits, backgrounds, expressions
# Use throughout quarter
# Maintain consistency while avoiding repetition
```

### Multi-Platform Optimization

**Same shoot, different formats:**

```yaml
# LinkedIn: landscape_4_3, professional style
# Instagram: square_hd, lifestyle style
# Twitter: square_hd, casual style
# YouTube: landscape_16_9, energetic style

# Generate all from single photo concept
# Optimize each for platform
```

---

## Troubleshooting Examples

### Issue: Image doesn't look like Sid

**Solution:**

```yaml
# Increase LoRA scale
lora_scale: 0.9 # or even 0.95

# Ensure trigger word is present
prompt: 'Sid, ...' # Must start with trigger

# Increase guidance scale
guidance_scale: 8.0-8.5
```

### Issue: Image too generic/stock-photo-like

**Solution:**

```yaml
# Reduce guidance scale for more creativity
guidance_scale: 6.0-6.5

# Add more specific details to prompt
# Include unique identifiers (specific location, activity)

# Strengthen negative prompts
negative_prompt: '...stock photo, generic, boring, conventional...'
```

### Issue: Inconsistent quality across generations

**Solution:**

```yaml
# Use consistent seed for testing
seed: 42
# Keep parameters constant
# Only vary prompt content

# Review and save successful parameter combos
```

---

## Quick Reference: Common Scenarios

| Use Case          | Guidance Scale | Steps | Size                      | LoRA Scale |
| ----------------- | -------------- | ----- | ------------------------- | ---------- |
| LinkedIn Headshot | 7.5-8.5        | 30-35 | square_hd / landscape_4_3 | 0.85       |
| Instagram Post    | 6.5-7.5        | 25-30 | square_hd                 | 0.9        |
| Twitter Avatar    | 7.5-8.0        | 30    | square_hd                 | 0.85       |
| YouTube Thumbnail | 8.0-9.0        | 30-35 | landscape_16_9            | 0.85       |
| Tech Workspace    | 7.0-7.5        | 30    | landscape_4_3             | 0.9        |
| Casual Social     | 6.0-7.0        | 25-30 | varies                    | 0.9        |

---

**For prompt templates, see:** `prompt-templates.md`
**For model details, see:** `fal-custom-model-workflow.md`
**For training info, see:** `model-training-guide.md`
