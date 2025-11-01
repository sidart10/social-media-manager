---
name: generating-sid-images
description: Generate personalized images of Sid in various scenarios using custom-trained FAL LoRA model. Use when creating Sid headshots, Sid profile photos, Sid in thumbnails, personalized Sid content, or images featuring Sid specifically. Applies Emily's JSON methodology and 7-pillar quality framework for consistent professional results.
---
# Sid AI Images

## Purpose

Generate personalized images of Sid in various scenarios using a custom-trained model on FAL. This skill enables consistent, on-brand image generation for professional headshots, social media content, creative scenarios, and video thumbnails.

## When to Use This Skill

Use this skill when:

- Creating Sid's professional headshots
- Generating Sid's profile photos
- Making video thumbnails featuring Sid
- Creating personalized Sid content
- Need images of Sid in specific scenarios
- Sid-specific imagery for personal branding

Triggers: Sid image, Sid headshot, Sid photo, Sid thumbnail, personalized Sid content, image of Sid, Sid profile picture

**Don't use for:**

- Generic images without Sid (use create-image skill)
- Images of other people

## Instructions

When workflow needs to generate a personalized image of Sid:

1. **Verify model is trained**:

   - Check if custom model endpoint is available on FAL
   - If not trained yet, see `reference/model-training-guide.md`
   - Model endpoint will be in format: `fal-ai/YOUR_USERNAME/sid-custom-model`
2. **Select scenario type**:

   - **Professional headshots**: LinkedIn, business photos, corporate
   - **Social media content**: Instagram posts, Twitter avatars, profile pics
   - **Creative scenarios**: Different settings, outfits, backgrounds, activities
   - **Video thumbnails**: YouTube thumbnails, video covers

   **For scenario-specific templates, see:** `reference/prompt-templates.md`
3. **Load JSON template** (Emily's methodology):

   - Read: `bmad/modules/json-prompt-generator/templates/video-scene.json`
   - Adapt for static image generation
   - **Critical**: Include trigger word/phrase from model training
4. **Populate JSON template** with scenario details:

   - **scene_description**: Setting, environment, mood
   - **subject_and_action**: Sid in specific pose/action
   - **composition_and_framing**: Layout, aspect ratio, focal point
   - **lighting_design**: Natural light, studio light, outdoor, etc.
   - **color_and_grade**: Color palette matching scenario
   - **style_guidance**: Photorealistic, professional, casual, etc.
   - **negative_prompt**: 10+ items (mandatory)
5. **Construct prompt with trigger word**:

   - Start with trigger word from training (e.g., "SIDAI" or "photo of SIDAI")
   - Add detailed scenario description
   - Include technical specs (lighting, composition)
   - Specify clothing, setting, mood
   - Add quality keywords

   **Example**: "Photo of SID AI, professional LinkedIn headshot, navy blue blazer, white shirt, neutral gray background, soft studio lighting from camera left, shallow depth of field, Canon 85mm f/1.8, photorealistic, high detail, corporate professional"
6. **Call FAL LoRA endpoint** using execute_custom_model:

   ```yaml
   mcp__fal-video__execute_custom_model:
     endpoint: "fal-ai/flux-lora"  # ✅ TESTED & CONFIRMED WORKING
     category_hint: "image"
     input_params:
       prompt: "{constructed_prompt_with_trigger_word}"
       loras: [
         {
           "path": "https://v3b.fal.media/files/b/zebra/Jujtmkl_X-v5x0KxjM3gm_pytorch_lora_weights.safetensors",
           "scale": 1
         }
       ]
       num_images: 1
       guidance_scale: 3.5
       num_inference_steps: 28
       image_size: "square_hd"  # or "landscape_4_3", "portrait_4_3", "landscape_16_9"
   ```

   **IMPORTANT**:

   - Must use `fal-ai/flux-lora` endpoint (NOT `fal-ai/flux/dev`)
   - Performance: ~5 seconds per image (correct timing for LoRA inference)
   - Downloads to: `/Users/sid/Downloads/`
   - Default guidance_scale: 3.5 (not 7.5 for FLUX LoRA)

   **For complete FAL tool reference, see:** `reference/fal-custom-model-workflow.md`
7. **Run 7-pillar quality evaluation** (MANDATORY):

   - Clarity (1-10): Subject clear and recognizable?
   - Technical Quality (1-10): Sharp, no artifacts?
   - Composition (1-10): Good balance and framing?
   - Likeness (1-10): Accurately represents Sid?
   - Scenario Accuracy (1-10): Matches requested scenario?
   - Professionalism (1-10): Appropriate quality level?
   - Prompt Accuracy (1-10): All elements present?

   **Overall score = Average of 7 pillars**
8. **Apply quality gates**:

   - Score < 7: Regenerate with adjusted parameters
   - Score 7-8: Good, acceptable for use
   - Score 9+: Exceptional, save prompt as template
9. **Save metadata** with generation:

   - Prompt used (including trigger word)
   - Model endpoint
   - Generation parameters
   - Quality scores
   - Use case/scenario
   - File path

**For real-world usage examples, see:** `reference/usage-examples.md`

## Reference Documentation

This skill includes comprehensive documentation:

- **`reference/fal-custom-model-workflow.md`** - Complete FAL execute_custom_model tool guide
- **`reference/model-training-guide.md`** - How to train custom model on FAL
- **`reference/prompt-templates.md`** - Scenario-specific prompt templates
- **`reference/usage-examples.md`** - Real-world scenarios with complete flows

**External References:**

- JSON Prompt Generator Module: `bmad/modules/json-prompt-generator/`
- Quality Framework: `../create-image/reference/quality-framework.md`
- Emily's JSON Methodology: `../create-image/reference/emily-json-methodology.md`

## Example

**Workflow asks:** "Create professional LinkedIn headshot for Sid"

**You execute:**

1. **Verify**: Custom model trained and endpoint available
2. **Scenario**: Professional headshot
3. **Load template**: video-scene.json (adapted)
4. **Populate JSON**:

   ```json
   {
     "scene_description": {
       "environment": "Professional photo studio, neutral gray background",
       "mood": "Confident, approachable, professional"
     },
     "subject_and_action": {
       "subject": "Sid in professional business attire",
       "action": "Facing camera, slight smile, professional pose"
     },
     "composition_and_framing": {
       "aspect_ratio": "4:3",
       "resolution": "1024x768",
       "framing": "Head and shoulders, centered"
     },
     "lighting_design": {
       "style": "Studio lighting, three-point setup",
       "key_light": "Soft diffused light from camera left 45 degrees",
       "fill_light": "Subtle fill from camera right"
     },
     "style_guidance": {
       "style": "Professional corporate photography",
       "quality": "High-end commercial headshot"
     },
     "negative_prompt": [
       "amateur lighting, harsh shadows",
       "overexposed, underexposed",
       "blurry, out of focus, low resolution",
       "casual clothing, unprofessional appearance",
       "distracting background, cluttered",
       "unnatural pose, awkward expression",
       "heavy filters, over-processed",
       "low quality, artifacts, noise",
       "cartoon, illustration, CGI",
       "watermarks, logos, text overlays"
     ]
   }
   ```
5. **Construct prompt**:

   ```
   Photo of SIDAI, professional LinkedIn headshot, navy blue blazer, white shirt,
   neutral gray background (#808080), soft studio lighting with three-point setup,
   key light from camera left at 45 degrees, subtle fill light,
   head and shoulders composition centered, slight smile,
   confident and approachable expression, shot on Canon 85mm f/1.8 lens at f/2.8,
   shallow depth of field, photorealistic, high detail, natural skin texture,
   professional corporate quality, commercial headshot standard
   ```
6. **Call FAL**:

   ```yaml
   mcp__fal-video__execute_custom_model:
     endpoint: "fal-ai/sidchaudhuri/sid-custom-model"
     category_hint: "image"
     input_params:
       prompt: "{prompt_above}"
       negative_prompt: "amateur lighting, harsh shadows, overexposed, underexposed, blurry, out of focus, low resolution, casual clothing, distracting background, unnatural pose, heavy filters, low quality, artifacts, cartoon, watermarks"
       num_images: 1
       guidance_scale: 7.5
       num_inference_steps: 30
       image_size: "landscape_4_3"
   ```
7. **Evaluate**: 7-pillar scoring (target 8.5+)
8. **Result**: Professional LinkedIn headshot ready for use

**See reference/usage-examples.md for more complete scenarios.**

## Notes

- **Trigger word is critical**: Always include the trigger word/phrase from model training
- **Model must be trained first**: See model-training-guide.md for training workflow
- **Consistency**: Use similar prompts for consistent results across scenarios
- **Quality over quantity**: Generate fewer high-quality images vs many mediocre ones
- **Save successful prompts**: Build a library of proven prompts for different scenarios
