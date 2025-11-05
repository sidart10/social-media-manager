# Blend Images - Usage Examples

**Real-world multi-image composition scenarios**

---

## Example 1: Person + Office Background

**Scenario**: Need professional LinkedIn headshot in office setting but don't have office photo

**Inputs**:

- Image 1: User's headshot (clean background)
- Image 2: Professional office environment (stock photo or real)

**Goal**: Natural composite of person in office

**Blend Workflow**:

```yaml
mcp__nanobanana__generate_image:
  prompt: 'Composite person from first image into office environment from second image. Position person at desk in foreground, office background behind. Natural lighting integration - match lighting direction (window light from left in office). Match color temperature and shadows. Person should look naturally present in the office, not pasted. Photorealistic, seamless composition, professional quality.'
  mode: 'generate'
  input_image_path_1: '/photos/headshot.jpg'
  input_image_path_2: '/photos/office-background.jpg'
  negative_prompt: 'cut-out appearance, pasted look, mismatched lighting, different color temperatures, artificial composition, visible edges, halo around subject, green screen artifacts'
  n: 1
```

**Result**:

- Person naturally integrated into office
- Lighting matches (window light consistent)
- Professional LinkedIn profile photo
- Cost: $0.039
- Time: ~30 seconds

**Use case**: Professional headshots, LinkedIn profiles, team photos

---

## Example 2: Product + Lifestyle Setting

**Scenario**: Have product photo on white background, want it in lifestyle context

**Inputs**:

- Image 1: Product (coffee maker on white)
- Image 2: Kitchen lifestyle scene

**Goal**: Product naturally placed in real kitchen

**Blend Workflow**:

```yaml
mcp__nanobanana__generate_image:
  prompt: 'Place coffee maker from first image onto the kitchen counter in second image. Position on right side of counter. Match lighting from kitchen scene (natural window light). Product should cast realistic shadow on counter. Natural integration, looks like product belongs in kitchen. Maintain product detail and sharpness. Photorealistic lifestyle product photography.'
  mode: 'generate'
  input_image_path_1: '/products/coffee-maker-white-bg.png'
  input_image_path_2: '/lifestyle/kitchen-scene.jpg'
  negative_prompt: 'floating product, no shadow, mismatched lighting, different color temperature, artificial placement, pasted appearance'
  n: 1
```

**Result**:

- Product naturally placed in kitchen
- Realistic shadows and lighting match
- Lifestyle product shot for marketing
- No need for expensive photoshoot

**Use case**: E-commerce, product marketing, lifestyle content

---

## Example 3: Creative Composite (3 Images)

**Scenario**: Create surreal art combining dog, owner, and fantasy basketball court

**Inputs**:

- Image 1: Dog portrait
- Image 2: Owner photo
- Image 3: Basketball court

**Goal**: Creative composition for social media

**Blend Workflow**:

```yaml
mcp__nanobanana__generate_image:
  prompt: 'Create fun creative composition: Place person from second image and dog from first image together on the basketball court from third image. Position them mid-court as if playing together. Match lighting across all elements (outdoor court lighting). Consistent shadows on court surface. Playful, fun, Instagram-worthy creative composite. Natural integration despite surreal concept.'
  mode: 'generate'
  input_image_path_1: '/photos/dog.jpg'
  input_image_path_2: '/photos/owner.jpg'
  input_image_path_3: '/photos/basketball-court.jpg'
  negative_prompt: 'artificial, pasted appearance, mismatched scale, different lighting on subjects, inconsistent shadows, poor composition'
  n: 1
```

**Result**:

- Creative, fun composite
- Natural integration despite surreal concept
- Instagram-worthy content
- Engagement-worthy post

**Use case**: Creative social content, fun personal posts, pet content

---

## Example 4: Before/After Split Screen

**Scenario**: Show product transformation (before/after in one image)

**Inputs**:

- Image 1: Before state
- Image 2: After state

**Goal**: Split-screen comparison

**Blend Workflow**:

```yaml
mcp__nanobanana__generate_image:
  prompt: "Create split-screen composition: Left half shows 'before' state from first image, right half shows 'after' state from second image. Clean vertical dividing line down center. Add subtle labels 'BEFORE' on left and 'AFTER' on right in sans-serif font. Balanced composition, same scale on both sides, clear comparison."
  mode: 'generate'
  input_image_path_1: '/photos/before.jpg'
  input_image_path_2: '/photos/after.jpg'
  negative_prompt: 'mismatched scale, uneven split, different color grading on each side (unless intentional), poor alignment'
  n: 1
```

**Result**:

- Clear before/after comparison
- Professional split-screen design
- Great for transformation content

**Use case**: Transformations, product improvements, progress tracking

---

## Example 5: Brand Collage

**Scenario**: Combine logo, product, and lifestyle scene for brand story

**Inputs**:

- Image 1: Company logo (transparent PNG)
- Image 2: Product shot
- Image 3: Lifestyle/office scene

**Goal**: Cohesive brand composition

**Blend Workflow**:

```yaml
mcp__nanobanana__generate_image:
  prompt: 'Create professional brand composition: Lifestyle scene from third image as background, product from second image positioned prominently in foreground right, company logo from first image subtly placed top-left (20% opacity watermark). Natural, cohesive brand story. Professional, clean, lifestyle brand aesthetic. Product hero positioning, logo tasteful not intrusive.'
  mode: 'generate'
  input_image_path_1: '/brand/logo.png'
  input_image_path_2: '/products/product.jpg'
  input_image_path_3: '/lifestyle/office.jpg'
  negative_prompt: 'cluttered, busy, logo too large, product looks pasted, mismatched lighting, amateur composition'
  n: 1
```

**Result**:

- Cohesive brand visual
- Product hero shot with context
- Professional marketing asset

**Use case**: Brand stories, about pages, marketing materials

---

## Blending Tips

### 1. Lighting Consistency is Critical

Always mention: "match lighting from [source image]" in prompt

### 2. Specify Element Sources Clearly

"Person from first image", "background from second image"

### 3. Scale Matters

Ensure subjects are appropriate relative sizes

### 4. Natural Integration

Mention: "natural, seamless, not pasted, photorealistic"

### 5. Use Negatives

Prevent common composition failures

---

## Blending vs Creating

### When to Blend:

✅ Have perfect source images to combine
✅ Specific elements from each wanted
✅ Creative composition from existing assets
✅ Cost-effective (reuse existing photos)

### When to Create New:

❌ No good source images
❌ Simpler to generate fresh
❌ Need perfect cohesion (all generated together)

---

**For blending techniques, see:** `blending-techniques.md`
**For multi-image composition details, see:** `multi-image-composition.md`
**For MCP parameters, see:** `mcp-tools-reference.md`
