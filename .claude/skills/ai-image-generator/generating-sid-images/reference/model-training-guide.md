# FAL Model Training Guide

**How to train a custom model on FAL for personalized image generation**

---

## Overview

Training a custom model on FAL allows you to create a personalized AI that generates images of you in any scenario. This guide covers the complete training workflow.

---

## Prerequisites

### What You Need

1. **FAL Account**
   - Sign up at https://fal.ai
   - Set up payment method
   - Get API key

2. **Training Images**
   - Minimum: 10-15 images
   - Recommended: 20-30 images
   - Maximum: 50+ images for best results

3. **Image Requirements**
   - High resolution (1024×1024 minimum)
   - Good lighting and clarity
   - Variety of angles and expressions
   - Clean backgrounds preferred
   - No heavy filters or edits

---

## Training Image Collection

### Recommended Image Mix

**Variety is key for versatile model:**

**Angles (distribute across):**
- Front facing: 40%
- 3/4 view: 30%
- Side profile: 20%
- Various: 10%

**Expressions:**
- Neutral/professional: 40%
- Smiling: 30%
- Various emotions: 30%

**Lighting:**
- Soft natural light: 40%
- Studio lighting: 30%
- Various lighting: 30%

**Backgrounds:**
- Clean/neutral: 50%
- Indoor settings: 25%
- Outdoor settings: 25%

**Clothing:**
- Professional attire: 40%
- Casual wear: 40%
- Variety: 20%

### What to Include

**Must have:**
- Clear face in every shot
- Good focus and sharpness
- Variety of contexts
- Different distances (close-up, medium, full body)

**Avoid:**
- Blurry or low-quality images
- Heavy filters or editing
- Sunglasses or face coverings
- Group photos (crop to single person)
- Extreme angles or distortions

---

## Training Workflow

### Step 1: Prepare Training Data

**Organize images:**
```
training-data/
├── professional/
│   ├── headshot_001.jpg
│   ├── headshot_002.jpg
│   └── ...
├── casual/
│   ├── outdoor_001.jpg
│   ├── outdoor_002.jpg
│   └── ...
└── various/
    ├── misc_001.jpg
    └── ...
```

**Image preprocessing:**
- Crop to include face clearly
- Resize to 1024×1024 (FAL will handle this, but pre-processing helps)
- Ensure good lighting and clarity
- Remove any watermarks or text

---

### Step 2: Choose Training Method

**Option A: FAL Web Interface (Easiest)**

1. Go to https://fal.ai/dashboard
2. Navigate to "Train Model" or "Custom Models"
3. Upload images (drag & drop or select)
4. Configure training parameters (see below)
5. Start training

**Option B: FAL API (Advanced)**

```python
import fal_client

# Configure training
training_config = {
    "model_type": "flux-lora",  # or "sd15-lora", "sdxl-lora"
    "training_images": [...],    # Upload URLs or base64
    "trigger_word": "SIDAI",     # Your custom trigger word
    "num_epochs": 1000,          # Training iterations
    "learning_rate": 1e-4,       # Adjust for quality
}

# Start training
response = fal_client.train_model(training_config)
training_id = response['training_id']
```

---

### Step 3: Configure Training Parameters

**Model Type**
- **FLUX LoRA**: Best quality, slower (recommended)
- **SDXL LoRA**: Good balance
- **SD 1.5 LoRA**: Faster, lower quality

**Trigger Word**
- Choose unique word/phrase: "SIDAI", "SID123", "photo of SIDAI"
- Avoid common words
- Remember this for generation prompts

**Training Steps (Epochs)**
- Minimum: 500 steps
- Recommended: 1000-1500 steps
- Maximum: 2000+ steps (diminishing returns)

**Learning Rate**
- Default: 1e-4 (0.0001)
- Lower (1e-5): Slower, more stable
- Higher (5e-4): Faster, may overfit

**Batch Size**
- Default: 1
- Higher = faster but more memory
- Keep at 1 for most cases

**Resolution**
- 512×512: Faster, lower quality
- 1024×1024: Recommended balance
- Higher: Slower, marginal gains

---

### Step 4: Monitor Training

**Check training progress:**
- Loss curve should decrease
- Sample images should improve
- Overfitting check: Images shouldn't look identical to training data

**Training time:**
- 10-20 images: 20-40 minutes
- 20-30 images: 40-80 minutes
- 30+ images: 1-2 hours

---

### Step 5: Test Model

**Generate test images:**

```yaml
mcp__fal-video__execute_custom_model:
  endpoint: "fal-ai/YOUR_USERNAME/sid-custom-model"
  category_hint: "image"
  input_params:
    prompt: "Photo of SIDAI, professional headshot, neutral background"
    num_images: 4
    guidance_scale: 7.5
    num_inference_steps: 30
```

**Evaluate results:**
- Likeness: Does it look like you? (Target: 8+/10)
- Quality: Sharp, clear, no artifacts? (Target: 8+/10)
- Versatility: Works in different scenarios?
- Consistency: Similar results with similar prompts?

**If quality is poor:**
- Retrain with more images
- Adjust learning rate
- Increase training steps
- Review training data quality

---

## Training Tips & Best Practices

### Image Selection

**Do:**
- Use high-quality source images
- Include variety (angles, lighting, settings)
- Ensure clear face visibility
- Use recent photos (consistent appearance)

**Don't:**
- Use low-res or blurry images
- Include only one type of photo
- Use heavily filtered images
- Mix photos from different time periods (if appearance changed)

### Parameter Tuning

**For photorealistic results:**
- Model: FLUX LoRA
- Steps: 1000-1500
- Learning rate: 1e-4
- Resolution: 1024×1024

**For artistic/stylized:**
- Model: SDXL LoRA
- Steps: 800-1200
- Learning rate: 1e-4
- Experiment with style images in training set

### Trigger Word Strategy

**Good trigger words:**
- "SIDAI" - Unique, short
- "photo of SIDAI" - Natural in prompts
- "SID_v1" - Versioned

**Bad trigger words:**
- "person" - Too common
- "man" - Too generic
- "Sid" - Might conflict with common name

### Cost Optimization

**Training costs:**
- Typical: $5-15 per training run
- FLUX LoRA: Higher cost, best quality
- SD 1.5 LoRA: Lower cost, good quality

**Tips:**
- Start with fewer images (15-20)
- Test with lower steps first (500-800)
- Increase quality once base model works

---

## Post-Training Workflow

### 1. Model Deployment

After training completes:
- Model automatically deployed to your FAL endpoint
- Endpoint format: `fal-ai/YOUR_USERNAME/model-name`
- Ready to use immediately

### 2. Create Prompt Library

Build collection of tested prompts:

```yaml
professional-headshot:
  prompt: "Photo of SIDAI, professional LinkedIn headshot, navy blazer..."
  guidance_scale: 7.5
  steps: 30

casual-outdoor:
  prompt: "Photo of SIDAI, casual outdoor portrait, denim jacket..."
  guidance_scale: 6.5
  steps: 30

youtube-thumbnail:
  prompt: "Photo of SIDAI, energetic YouTube thumbnail, pointing..."
  guidance_scale: 8.0
  steps: 35
```

### 3. Quality Testing Matrix

Test model across scenarios:

| Scenario | Prompt | Quality | Likeness | Notes |
|----------|--------|---------|----------|-------|
| Professional headshot | {...} | 9/10 | 9/10 | Great |
| Casual outdoor | {...} | 8/10 | 8/10 | Good |
| Creative studio | {...} | 7/10 | 9/10 | Adjust lighting |

### 4. Iteration

**If results aren't satisfactory:**
- Add more training images
- Adjust training parameters
- Retrain model (version 2, 3, etc.)
- Keep versioned endpoints

---

## Advanced Training Techniques

### Multi-Concept Training

Train model to recognize multiple concepts:
- You + specific objects
- You + specific locations
- You + specific styles

### Style Transfer Training

Include stylized images in training:
- Add artistic renditions
- Include different art styles
- Train for specific aesthetic

### DreamBooth vs LoRA

**DreamBooth:**
- Full model fine-tuning
- Better quality
- More expensive
- Longer training

**LoRA (Recommended):**
- Lightweight adapter
- Good quality
- Cost-effective
- Faster training

---

## Troubleshooting

### Issue: Poor Likeness

**Causes:**
- Insufficient training images
- Low-quality source images
- Too few training steps

**Solutions:**
- Add 10-15 more high-quality images
- Increase training steps to 1500-2000
- Ensure training images are clear and varied

### Issue: Overfitting

**Symptoms:**
- Generated images look exactly like training images
- No variation or creativity
- Can't generalize to new scenarios

**Solutions:**
- Reduce training steps
- Lower learning rate
- Add more variety to training data

### Issue: Inconsistent Results

**Causes:**
- Insufficient training
- Poor prompt construction
- Low guidance scale

**Solutions:**
- Increase training steps
- Improve prompt specificity
- Adjust guidance_scale (7.5-8.5)

### Issue: Artifacts or Distortions

**Causes:**
- Low-quality training images
- Too high learning rate
- Insufficient training steps

**Solutions:**
- Review and replace poor training images
- Reduce learning rate to 5e-5
- Increase training steps

---

## Cost Estimation

### Training Costs

**One-time training:**
- FLUX LoRA: $10-20 per training
- SDXL LoRA: $5-10 per training
- SD 1.5 LoRA: $3-5 per training

**Retraining (if needed):**
- Budget for 2-3 training runs
- Total: $20-60 for initial setup

### Generation Costs

**Per image:**
- Typical: $0.01-0.05 per image
- Batch discounts may apply
- Much cheaper than training

### ROI Calculation

**Cost breakdown:**
- Training: $20 (one-time)
- 100 images: $2-5
- 1000 images: $20-50

**vs Professional Photography:**
- Single professional shoot: $500-2000
- Limited scenarios and settings
- Custom AI: Unlimited scenarios, one-time training cost

---

## Next Steps After Training

1. **Test model thoroughly**: Generate 20-30 test images across scenarios
2. **Build prompt library**: Save successful prompts
3. **Create usage examples**: Document what works best
4. **Integrate with workflows**: Add to ai-image-generator agent
5. **Maintain model**: Retrain periodically if appearance changes

---

## Resources

**FAL Platform:**
- Dashboard: https://fal.ai/dashboard
- Documentation: https://fal.ai/docs
- API Reference: https://fal.ai/docs/api

**Training References:**
- LoRA Training Guide: https://fal.ai/docs/lora-training
- DreamBooth Guide: https://fal.ai/docs/dreambooth
- Best Practices: https://fal.ai/docs/training-tips

**Community:**
- FAL Discord: Community support
- FAL Forums: Tips and examples
- GitHub: Example code

---

**For model usage after training, see:** `fal-custom-model-workflow.md`
**For scenario-specific prompts, see:** `prompt-templates.md`
**For complete examples, see:** `usage-examples.md`
