# FAL Custom Model Workflow

**How to use mcp__fal-video__execute_custom_model for personalized image generation**

---

## Overview

The `execute_custom_model` tool allows you to run any FAL model by specifying the endpoint directly. This is perfect for custom-trained models like Sid's personalized image generator.

---

## Tool: mcp__fal-video__execute_custom_model

### Purpose

Execute custom FAL models that aren't in the standard registry. Ideal for:
- Custom-trained LoRA models (use `fal-ai/flux-lora` endpoint)
- Fine-tuned models
- Personal model endpoints
- Experimental models

**✅ TESTED & CONFIRMED**: `fal-ai/flux-lora` endpoint works with custom LoRA weights

### Parameters

```typescript
{
  endpoint: string (required)
    // FAL model endpoint path
    // Format: "fal-ai/USERNAME/model-name"
    // Example: "fal-ai/sidchaudhuri/sid-custom-model"

  input_params: object (required)
    // Model-specific parameters
    // Varies by model type
    // Common params for image models:
    {
      prompt: string,
      negative_prompt?: string,
      num_images?: number (1-4),
      guidance_scale?: number (1-20),
      num_inference_steps?: number (20-50),
      image_size?: string,
      seed?: number
    }

  category_hint: string (default: "other")
    // Output type hint for proper handling
    // Options: "image" | "video" | "image_to_video" | "other"
    // Use "image" for Sid AI Images
}
```

### Returns

```json
{
  "output": {
    "images": [
      {
        "url": "https://fal.media/files/...",
        "file_name": "sid_headshot_001.png",
        "width": 1024,
        "height": 768
      }
    ]
  },
  "metadata": {
    "endpoint": "fal-ai/sidchaudhuri/sid-custom-model",
    "inference_time_ms": 2500,
    "seed": 42
  }
}
```

---

## Input Parameters for Custom Image Models

### Core Parameters

**prompt** (required)
- Main text description
- **Critical**: Must include trigger word from training
- Example: "Photo of SIDAI in business attire"
- Max length: Usually 512-1024 tokens (model dependent)

**negative_prompt** (optional but recommended)
- Things to avoid in generation
- Comma-separated list
- Example: "blurry, low quality, amateur, artifacts"
- Minimum 10 items recommended

**num_images** (optional, default: 1)
- Number of images to generate
- Range: 1-4 (model dependent)
- Higher n = more variations
- Cost increases linearly

**guidance_scale** (optional, default: 7.5)
- How closely to follow the prompt
- Range: 1-20
- Lower (3-5): More creative, less literal
- Medium (7-9): Balanced (recommended)
- Higher (12-20): Very literal, may over-saturate

**num_inference_steps** (optional, default: 30)
- Quality vs speed tradeoff
- Range: 20-50
- Lower (20-25): Faster, less refined
- Medium (30-35): Balanced (recommended)
- Higher (40-50): Slower, more refined

**image_size** (optional, default varies)
- Output dimensions
- Common options:
  - "square_hd": 1024×1024
  - "landscape_4_3": 1024×768
  - "landscape_16_9": 1024×576
  - "portrait_4_3": 768×1024
  - "portrait_16_9": 576×1024
- Check model documentation for supported sizes

**seed** (optional)
- Random seed for reproducibility
- Use same seed + prompt = same image
- Omit for random results

---

## Usage Examples

### Example 1: Professional LinkedIn Headshot

```yaml
mcp__fal-video__execute_custom_model:
  endpoint: "fal-ai/sidchaudhuri/sid-custom-model"
  category_hint: "image"
  input_params:
    prompt: "Photo of SIDAI, professional LinkedIn headshot, navy blue blazer, white shirt, neutral gray background, soft studio lighting from camera left, shallow depth of field, Canon 85mm f/1.8, photorealistic, high detail, corporate professional"
    negative_prompt: "amateur lighting, harsh shadows, overexposed, blurry, low resolution, casual clothing, distracting background, unnatural pose, heavy filters, artifacts, cartoon, watermarks"
    num_images: 1
    guidance_scale: 7.5
    num_inference_steps: 30
    image_size: "landscape_4_3"
    seed: 42
```

**Expected result**: Professional headshot suitable for LinkedIn

---

### Example 2: Casual Instagram Post

```yaml
mcp__fal-video__execute_custom_model:
  endpoint: "fal-ai/sidchaudhuri/sid-custom-model"
  category_hint: "image"
  input_params:
    prompt: "Photo of SIDAI, casual outdoor portrait, wearing denim jacket and white t-shirt, urban coffee shop background, natural daylight, shallow depth of field, candid relaxed expression, Instagram aesthetic, warm tones"
    negative_prompt: "formal clothing, studio lighting, stiff pose, over-processed, filters, low quality, blurry, artificial, corporate"
    num_images: 2
    guidance_scale: 6.5
    num_inference_steps: 30
    image_size: "square_hd"
```

**Expected result**: 2 casual Instagram-worthy portraits

---

### Example 3: YouTube Thumbnail (Expressive)

```yaml
mcp__fal-video__execute_custom_model:
  endpoint: "fal-ai/sidchaudhuri/sid-custom-model"
  category_hint: "image"
  input_params:
    prompt: "Photo of SIDAI, energetic YouTube thumbnail portrait, pointing at camera, excited expression, wearing bright colored hoodie, clean white background, high contrast lighting, sharp focus, dynamic pose, enthusiastic vibe"
    negative_prompt: "boring expression, dark lighting, blurry, low energy, formal attire, dull colors, soft lighting, amateur"
    num_images: 3
    guidance_scale: 8.0
    num_inference_steps: 35
    image_size: "landscape_16_9"
```

**Expected result**: 3 high-energy thumbnail options

---

### Example 4: Creative Scenario - Tech Workspace

```yaml
mcp__fal-video__execute_custom_model:
  endpoint: "fal-ai/sidchaudhuri/sid-custom-model"
  category_hint: "image"
  input_params:
    prompt: "Photo of SIDAI, working at modern tech workspace, coding on laptop, dual monitors with code visible, wearing casual hoodie, focused expression, warm desk lamp lighting, tech startup office aesthetic, shallow depth of field, professional photography"
    negative_prompt: "messy desk, poor lighting, outdated tech, corporate office, suit and tie, cluttered background, unnatural pose, stock photo"
    num_images: 1
    guidance_scale: 7.0
    num_inference_steps: 30
    image_size: "landscape_4_3"
```

**Expected result**: Authentic tech workspace portrait

---

## Parameter Tuning Guide

### For Professional/Corporate Content

```yaml
guidance_scale: 7.5-8.5
num_inference_steps: 30-35
prompt_focus: "professional, high-quality, sharp, detailed"
negative_prompt_focus: "amateur, casual, artifacts, low quality"
```

### For Social Media Content

```yaml
guidance_scale: 6.0-7.5
num_inference_steps: 25-30
prompt_focus: "natural, authentic, candid, lifestyle"
negative_prompt_focus: "stiff, formal, over-processed, filters"
```

### For Creative/Artistic Content

```yaml
guidance_scale: 5.0-7.0
num_inference_steps: 30-40
prompt_focus: "creative, artistic, unique, expressive"
negative_prompt_focus: "boring, generic, stock photo, conventional"
```

### For High-Energy/Dynamic Content (Thumbnails)

```yaml
guidance_scale: 7.5-9.0
num_inference_steps: 30-35
prompt_focus: "dynamic, energetic, high contrast, eye-catching"
negative_prompt_focus: "boring, low energy, dull, subtle"
```

---

## Advanced Techniques

### Batch Generation with Variations

Generate multiple variations by running the same prompt multiple times:

```yaml
# Run 1
seed: 42
# Run 2
seed: 43
# Run 3
seed: 44
```

Or use `num_images: 3` in a single call.

### Prompt Weighting (if supported)

Some models support emphasis:
```
(SIDAI:1.2), professional headshot, (sharp focus:1.1)
```

### Resolution Upscaling

For print quality, generate at highest supported resolution:
```yaml
image_size: "square_hd"  # 1024×1024
# Then upscale externally if needed
```

---

## Error Handling

### Common Errors

**"Model not found"**
- Cause: Endpoint doesn't exist or isn't public
- Fix: Verify endpoint name, check model is deployed

**"Invalid parameters"**
- Cause: Input params don't match model schema
- Fix: Check model documentation for required params

**"Generation failed"**
- Cause: Prompt may trigger safety filters or be invalid
- Fix: Adjust prompt, remove problematic content

**"Timeout"**
- Cause: High inference steps or server load
- Fix: Reduce num_inference_steps, try again

---

## Best Practices

1. **Always include trigger word**: Start prompt with trained trigger phrase
2. **Be specific**: Detailed prompts = better results
3. **Use negative prompts**: Avoid unwanted elements
4. **Start with defaults**: guidance_scale: 7.5, steps: 30
5. **Generate variations**: Use num_images: 2-3 for options
6. **Save successful prompts**: Build a prompt library
7. **Test parameters**: Adjust guidance_scale and steps for your needs
8. **Consistent seed**: Use same seed for reproducible results

---

## Integration with Emily's JSON Methodology

### From JSON to FAL Call

**JSON Template:**
```json
{
  "scene_description": {...},
  "subject_and_action": {
    "subject": "Sid in professional attire"
  },
  "composition_and_framing": {
    "aspect_ratio": "4:3"
  },
  "negative_prompt": [...]
}
```

**Convert to FAL:**
```yaml
mcp__fal-video__execute_custom_model:
  endpoint: "fal-ai/sidchaudhuri/sid-custom-model"
  category_hint: "image"
  input_params:
    prompt: "Photo of SIDAI, {converted_from_json}"
    negative_prompt: "{joined_array}"
    image_size: "{size_from_aspect_ratio}"
    guidance_scale: 7.5
    num_inference_steps: 30
```

---

## Performance Characteristics

**Typical Generation Times:**
- Low steps (20-25): 2-3 seconds
- Medium steps (30-35): 3-5 seconds
- High steps (40-50): 5-8 seconds

**Cost:**
- Model-specific, check FAL pricing
- Typically $0.01-0.05 per image
- Batch generation may offer discounts

**Quality:**
- Depends on training data quality
- Fine-tuned models: 8-9/10 likeness
- Proper prompting: 9-10/10 scenario accuracy

---

## Output Handling

### Download Images

```python
# Images returned as URLs
image_url = result['output']['images'][0]['url']

# Download to local
import requests
response = requests.get(image_url)
with open('sid_headshot.png', 'wb') as f:
    f.write(response.content)
```

### Save Metadata

```json
{
  "endpoint": "fal-ai/sidchaudhuri/sid-custom-model",
  "prompt": "Photo of SIDAI...",
  "parameters": {
    "guidance_scale": 7.5,
    "num_inference_steps": 30,
    "seed": 42
  },
  "output": {
    "image_url": "https://fal.media/files/...",
    "file_path": "outputs/sid-headshots/linkedin-001.png"
  },
  "timestamp": "2025-10-28T10:30:00Z"
}
```

---

**For model training instructions, see:** `model-training-guide.md`
**For scenario-specific prompts, see:** `prompt-templates.md`
**For complete examples, see:** `usage-examples.md`
