# Prompt Templates for Sid AI Images

**Scenario-specific prompt templates for generating personalized images**

**Your Model Details:**

- **Trigger Word**: "Sid" or "SIDAI"
- **LoRA Weights**: https://v3b.fal.media/files/b/zebra/Jujtmkl_X-v5x0KxjM3gm_pytorch_lora_weights.safetensors
- **Training Steps**: 2971 (well-trained, tested 2025-10-28)

---

## Template Structure

All prompts should follow this structure:

```
[Trigger Word] [Main Description] [Technical Specs] [Quality Keywords]

Trigger: "Sid" or "photo of Sid"
Main: Scenario, clothing, setting, action
Technical: Camera, lighting, composition
Quality: photorealistic, high detail, professional
```

---

## Professional Headshots

### LinkedIn Headshot (Corporate)

**Prompt Template:**

```
Sid, professional LinkedIn headshot, [ATTIRE], [BACKGROUND], soft studio lighting from camera left at 45 degrees, subtle fill light camera right, head and shoulders composition, [EXPRESSION], shot on Canon 85mm f/1.8 lens at f/2.8, shallow depth of field, photorealistic, high detail, natural skin texture, professional corporate quality
```

**Variables:**

- **ATTIRE**: navy blazer with white shirt | charcoal suit | business casual | smart casual
- **BACKGROUND**: neutral gray background | soft gradient background | professional office blur
- **EXPRESSION**: confident smile | professional serious | approachable friendly

**Example 1 - Classic Corporate:**

```
Sid, professional LinkedIn headshot, navy blazer with white dress shirt, neutral gray background (#808080), soft studio lighting from camera left at 45 degrees, subtle fill light camera right, head and shoulders composition centered, confident professional smile, shot on Canon 85mm f/1.8 lens at f/2.8, shallow depth of field, photorealistic, high detail, natural skin texture, professional corporate quality, commercial headshot standard
```

**Negative Prompt:**

```
amateur lighting, harsh shadows, overexposed, underexposed, blurry, out of focus, low resolution, casual clothing, distracting background, cluttered, unnatural pose, awkward expression, heavy filters, over-processed, low quality, artifacts, noise, cartoon, illustration, CGI, watermarks, logos, text overlays
```

---

### Creative Professional

**Prompt Template:**

```
Sid, creative professional portrait, [ATTIRE], [SETTING], natural window light from [DIRECTION], [MOOD] atmosphere, environmental portrait style, [COMPOSITION], shot on [CAMERA], photorealistic, authentic, professional quality
```

**Example - Tech Entrepreneur:**

```
Sid, creative professional portrait, black turtleneck sweater, modern minimalist office with glass walls, natural window light from left side, confident innovative atmosphere, environmental portrait style with office context visible in background, three-quarter view composition, shot on Sony A7IV 50mm f/1.4, photorealistic, authentic, professional quality
```

---

## Social Media Content

### Instagram Portrait (Lifestyle)

**Prompt Template:**

```
Sid, lifestyle portrait for Instagram, [ATTIRE], [LOCATION], [LIGHTING] lighting, [MOOD] vibe, candid natural pose, Instagram aesthetic, [COLOR_TONE] tones, photorealistic, high quality
```

**Example 1 - Coffee Shop Casual:**

```
Sid, lifestyle portrait for Instagram, casual denim jacket over white t-shirt, urban coffee shop with industrial interior, warm natural window lighting from right, relaxed friendly vibe, candid natural pose with coffee cup, Instagram aesthetic, warm earthy tones with slight desaturation, photorealistic, high quality, authentic moment
```

**Example 2 - Outdoor Adventure:**

```
Sid, lifestyle portrait for Instagram, outdoor athletic wear, urban park with trees in background, golden hour natural lighting, energetic positive vibe, candid walking pose, Instagram aesthetic, vibrant colors with warm sunset tones, photorealistic, high quality, authentic lifestyle
```

**Negative Prompt:**

```
stiff formal pose, studio lighting, corporate attire, boring background, over-processed, heavy filters, artificial, low quality, stock photo aesthetic, unnatural, posed
```

---

### Twitter/X Profile Picture

**Prompt Template:**

```
Sid, profile picture portrait, [ATTIRE], [BACKGROUND], [LIGHTING] lighting, [EXPRESSION], close-up headshot composition optimized for small circular crop, sharp focus on face, photorealistic, high detail
```

**Example - Professional Tech:**

```
Sid, profile picture portrait, casual tech industry attire (hoodie or t-shirt), clean solid color background (#1DA1F2 blue or neutral gray), soft even lighting, friendly approachable smile, close-up headshot composition optimized for small circular crop, sharp focus on face, photorealistic, high detail, works at small size
```

---

## Creative Scenarios

### Tech Workspace

**Prompt Template:**

```
Sid, working at [WORKSPACE_TYPE], [ACTIVITY], [TECH_SETUP], wearing [ATTIRE], [EXPRESSION], [LIGHTING] lighting, tech startup aesthetic, shallow depth of field, professional photography, authentic tech culture
```

**Example 1 - Coding Focus:**

```
Sid, working at modern tech workspace, coding on laptop with intense focus, dual monitors displaying code and terminal windows, wearing comfortable hoodie, concentrated expression, warm desk lamp lighting with ambient office glow, tech startup aesthetic, shallow depth of field with monitors slightly blurred, professional photography, authentic tech culture, photorealistic
```

**Example 2 - Video Call:**

```
Sid, during video conference call, speaking to camera (laptop webcam perspective), single monitor visible, wearing casual business top, engaged speaking expression, ring light providing even illumination, home office setup with bookshelf background, professional remote work aesthetic, photorealistic, high quality
```

**Negative Prompt:**

```
messy workspace, poor lighting, outdated technology, formal corporate office, suit and tie, cluttered desk, unnatural pose, stock photo, artificial staging, low quality
```

---

### Podcast/Content Creator

**Prompt Template:**

```
Sid, podcast recording setup, [MIC_TYPE] microphone in frame, wearing [ATTIRE], [EXPRESSION], [SETTING], professional podcast lighting, content creator aesthetic, [COMPOSITION]
```

**Example:**

```
Sid, podcast recording setup, professional large diaphragm microphone (Shure SM7B) in foreground, wearing casual comfortable hoodie, speaking animatedly into mic, modern home studio with acoustic panels and warm LED lighting, professional podcast lighting with key and fill, content creator aesthetic, over-shoulder composition showing both Sid and mic, photorealistic, high production value
```

---

### Presentation/Speaking

**Prompt Template:**

```
Sid, [SPEAKING_CONTEXT], [GESTURE], wearing [ATTIRE], [SETTING], professional event lighting, [COMPOSITION], dynamic moment, photorealistic, conference photography style
```

**Example:**

```
Sid, giving tech presentation on stage, gesturing with hands to emphasize point, wearing smart casual attire (blazer over t-shirt), modern conference stage with large screen behind showing presentation slides, professional event lighting with stage spots, medium shot composition showing upper body and gesture, dynamic speaking moment captured, photorealistic, conference photography style, high quality
```

---

## Video Thumbnails

### YouTube Thumbnail (High Energy)

**Prompt Template:**

```
Sid, YouTube thumbnail portrait, [GESTURE], [EXPRESSION], wearing [ATTIRE], [BACKGROUND], high contrast dramatic lighting, eye-catching composition, [COLOR_SCHEME], optimized for 1280×720, professional thumbnail quality
```

**Example 1 - Pointing Gesture:**

```
Sid, YouTube thumbnail portrait, pointing directly at camera with excited gesture, energetic surprised expression with wide eyes, wearing bright colored hoodie (red or yellow), clean solid color background (#FFFFFF white or #000000 black), high contrast dramatic lighting from front, eye-catching centered composition, vibrant saturated colors, optimized for 1280×720, professional thumbnail quality, attention-grabbing, clear focal point
```

**Example 2 - Reaction Thumbnail:**

```
Sid, YouTube thumbnail portrait, hands up in surprised reaction gesture, shocked amazed expression with open mouth, wearing bold colored shirt, gradient background (dark to light), dramatic side lighting creating highlights, dynamic off-center composition with space for text, high saturation colors, optimized for 1280×720, professional thumbnail quality, viral-worthy, emotion-focused
```

**Negative Prompt:**

```
boring expression, low energy, dull colors, poor lighting, soft focus, low contrast, subtle composition, formal attire, busy background, amateur, small details, low saturation, generic stock photo
```

---

### Tutorial Thumbnail (Educational)

**Prompt Template:**

```
Sid, educational tutorial thumbnail, [GESTURE], thoughtful [EXPRESSION], wearing [ATTIRE], [BACKGROUND], clear even lighting, professional composition, trustworthy aesthetic
```

**Example:**

```
Sid, educational tutorial thumbnail, gesturing to explain concept with open hand, thoughtful professional expression with slight smile, wearing casual tech industry attire (solid color shirt), clean minimalist background with subtle tech elements, clear even lighting emphasizing clarity, centered composition with negative space for title text, professional trustworthy aesthetic, optimized for 1280×720, educational content style
```

---

## Advanced Scenarios

### Before/After Comparison

**Prompt Template:**

```
Sid, [CONTEXT] before/after concept, [SIDE] side of comparison, [STATE], [VISUAL_DIFFERENCE], professional photography, comparison content style
```

**Example - Fitness Journey:**

```
Sid, fitness transformation after side of comparison, fit athletic build in workout attire, confident proud posture, gym setting with equipment visible, professional photography with consistent lighting as before photo, comparison content style showing positive progress, photorealistic, motivational
```

---

### Action/Dynamic

**Prompt Template:**

```
Sid, [ACTION] in motion, dynamic [ACTIVITY], wearing [ATTIRE], [LOCATION], motion-blur background, frozen action photography, [ENERGY] energy, sports/action photography style
```

**Example - Running:**

```
Sid, running in motion, dynamic sprint with arms pumping, wearing athletic running gear, urban street or park trail, motion-blur background showing speed, frozen action photography with sharp subject, high energy active vibe, sports photography style with dramatic angle, photorealistic, professional action shot
```

---

## Negative Prompt Library

### Universal Negatives (Use with all prompts)

```
low quality, poor quality, low resolution, blurry, out of focus, soft focus, bokeh on subject, artifacts, compression artifacts, noise, grainy, pixelated, distorted, deformed, disfigured, amateur, unprofessional
```

### Professional/Corporate Negatives

```
casual clothing, messy appearance, poor posture, unflattering angle, harsh shadows, overexposed, underexposed, distracting background, cluttered, unprofessional, candid snapshot, smartphone photo quality
```

### Creative/Social Negatives

```
stiff pose, formal corporate, studio backdrop, artificial staging, overly posed, stock photo aesthetic, generic, boring, low energy, dull colors, heavy filters, over-processed, Instagram filters
```

### Technical Quality Negatives

```
wrong anatomy, extra fingers, missing fingers, extra limbs, missing limbs, unnatural proportions, weird face, distorted face, asymmetrical face, CGI, 3D render, cartoon, illustration, painting, drawing, sketch, anime
```

---

## Parameter Recommendations by Scenario

### Professional Headshots

```yaml
guidance_scale: 7.5-8.5
num_inference_steps: 30-35
image_size: "landscape_4_3" or "square_hd"
```

### Social Media Content

```yaml
guidance_scale: 6.5-7.5
num_inference_steps: 25-30
image_size: "square_hd" for Instagram, "portrait_4_3" for stories
```

### Video Thumbnails

```yaml
guidance_scale: 8.0-9.0
num_inference_steps: 30-35
image_size: 'landscape_16_9'
```

### Creative Scenarios

```yaml
guidance_scale: 6.0-7.5
num_inference_steps: 30-40
image_size: varies by scenario
```

---

## Prompt Construction Tips

**DO:**

- Always start with trigger word "Sid"
- Be specific about clothing, setting, lighting
- Include camera/lens specs for professional feel
- Add quality keywords at end
- Use comprehensive negative prompts

**DON'T:**

- Use vague descriptions
- Forget trigger word
- Skip negative prompts
- Use conflicting styles
- Over-complicate with too many elements

---

## Testing New Prompts

**Workflow:**

1. Start with template
2. Generate with default parameters
3. Evaluate result (7-pillar framework)
4. Adjust guidance_scale if needed
5. Refine prompt based on results
6. Save successful prompts to library

---

**For model usage instructions, see:** `fal-custom-model-workflow.md`
**For complete examples, see:** `usage-examples.md`
**For model training details, see:** `model-training-guide.md`
