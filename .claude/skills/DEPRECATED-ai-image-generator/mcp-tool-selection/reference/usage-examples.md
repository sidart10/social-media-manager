# MCP Tool Selection - Usage Examples

**Real-world scenarios showing tool selection reasoning**

---

## Example 1: LinkedIn Professional Carousel

**User Request:** "Create LinkedIn carousel about AI agents with professional dark aesthetic"

**Workflow Analysis:**
- **Use case**: New image generation (text-to-image)
- **Platform**: LinkedIn (professional)
- **Content**: Likely has text overlays, diagrams
- **Style**: Dark tech aesthetic (high contrast, clean)
- **Quality**: Enterprise-grade expected
- **Volume**: 5-7 slides

**Selection Process:**

1. Check: Is it editing? → **NO** (new generation)
2. Check: Text in images? → **YES** (carousel with labels/text)
3. Check: Platform requirements? → **LinkedIn** (professional quality)
4. Check: Budget vs quality? → **Quality priority** (client-facing)

**Selected Tool:** `gpt-image-1` (OpenAI)

**Reasoning:**
- LinkedIn demands professional photorealistic quality
- Text overlays are critical (titles, labels, stats)
- OpenAI's text rendering is superior
- Complex compositions need OpenAI's strength
- Cost justified for professional deliverable

**Alternative Consideration:**
- Could use nanobanana for slides 3-5 (speed)
- But consistency across carousel favors single tool
- Stick with gpt-image-1 for all slides

**Implementation:**
```yaml
provider: gpt-image-1
size: "1536x1024"  # Closest to 16:9 for LinkedIn
quality: "high"
output_format: "png"
```

**Result:** Professional 5-slide carousel, text perfectly rendered, consistent dark aesthetic

---

## Example 2: Instagram Quick Post (Volume)

**User Request:** "Generate 10 Instagram posts this week about productivity tips"

**Workflow Analysis:**
- **Use case**: New image generation (text-to-image)
- **Platform**: Instagram (social, creative)
- **Content**: Inspirational quotes, tips
- **Style**: Vibrant, eye-catching
- **Quality**: Good enough (not enterprise-critical)
- **Volume**: 10 images

**Selection Process:**

1. Check: Is it editing? → **NO** (new generation)
2. Check: Text in images? → **YES** (quotes/tips)
3. Check: Platform requirements? → **Instagram** (creative > photorealistic)
4. Check: Volume + budget? → **HIGH VOLUME** (10 images)
5. Check: Speed priority? → **YES** (weekly posting)

**Selected Tool:** `nanobanana` (Gemini)

**Reasoning:**
- Volume matters: 10 images × $0.039 = $0.39 (vs higher OpenAI cost)
- Instagram accepts creative/stylized content
- Speed allows rapid iteration
- Text rendering good enough for social quotes
- Budget-friendly for regular posting

**Alternative Consideration:**
- First 2-3 with gpt-image-1 to test quality
- If nanobanana text issues, upgrade specific images

**Implementation:**
```yaml
provider: nanobanana
prompt: "Instagram post with [quote], vibrant colors, modern design"
quality: "medium"
n: 1  # Generate one at a time for variety
```

**Result:** 10 Instagram posts generated quickly, cost-effective, good engagement

---

## Example 3: Refining Generated Image

**User Request:** "The LinkedIn post looks great but blur the background to focus on the main element"

**Workflow Analysis:**
- **Use case**: Image editing (refinement)
- **Platform**: LinkedIn
- **Content**: Existing generated image needs adjustment
- **Edit type**: Background blur (targeted transformation)
- **Quality**: Must maintain original quality

**Selection Process:**

1. Check: Is it editing? → **YES** ✅
2. STOP → **nanobanana** (Gemini) automatically selected

**Selected Tool:** `nanobanana` (Gemini)

**Reasoning:**
- Editing = Gemini's best-in-class strength
- Pixel-perfect precision needed
- Background blur is targeted transformation
- Won't affect main subject (unlike OpenAI recreation)
- Gemini excels at this exact use case

**Why NOT gpt-image-1:**
- OpenAI would recreate entire image
- Risk of introducing artifacts/inconsistencies
- Not pixel-perfect (soft mask approach)
- Could alter main subject unintentionally

**Implementation:**
```yaml
provider: nanobanana
mode: "edit"
input_image_path: "linkedin-post-original.png"
prompt: "Blur background significantly, keep main element sharp and in focus"
```

**Result:** Perfect background blur, main element untouched, professional look enhanced

---

## Example 4: Hybrid Approach - Best of Both

**User Request:** "Create hero LinkedIn post for product launch announcement"

**Workflow Analysis:**
- **Use case**: Critical brand asset
- **Platform**: LinkedIn (professional)
- **Content**: Product showcase with text
- **Style**: Premium, polished
- **Stakes**: HIGH (launch announcement)
- **Budget**: No constraint (quality matters)

**Selection Process:**

1. Check: Is it critical? → **YES** (launch announcement)
2. Strategy: **HYBRID** approach for best result
3. Step 1: Generate with OpenAI (base quality)
4. Step 2: Refine with Gemini (polish)

**Selected Tools:** `gpt-image-1` THEN `nanobanana`

**Implementation Flow:**

**Step 1 - Generate:**
```yaml
provider: gpt-image-1
prompt: "Professional product showcase, dark background, product centered, text overlay '[Product Name] - Launching Soon', premium aesthetic, photorealistic"
size: "1536x1024"
quality: "high"
```

**Step 2 - Refine:**
```yaml
provider: nanobanana
mode: "edit"
input_image_path: "product-launch-base.png"
prompt: "Enhance contrast on product, slightly blur background, sharpen text overlay"
```

**Reasoning:**
- OpenAI: Best photorealistic base + text rendering
- Gemini: Pixel-perfect final touches
- Combines strengths of both tools
- Justified cost for launch asset

**Result:** Stunning hero image, perfect text, professional polish, client loved it

---

## Example 5: Quick Social Test (Speed Priority)

**User Request:** "I have a content idea - can you generate a quick visual to see if it works?"

**Workflow Analysis:**
- **Use case**: Rapid prototyping
- **Platform**: Not specified (testing)
- **Content**: Concept validation
- **Quality**: Good enough to evaluate
- **Speed**: CRITICAL (immediate feedback)
- **Budget**: Minimal (just testing)

**Selection Process:**

1. Check: Is it testing/prototyping? → **YES**
2. Check: Speed priority? → **YES**
3. Check: Quality requirements? → **Lower** (just validation)
4. Decision: **Speed + cost** > quality

**Selected Tool:** `nanobanana` (Gemini)

**Reasoning:**
- Faster generation (immediate feedback)
- Cost-effective for testing ($0.039)
- Good enough to validate concept
- Can upgrade to OpenAI if concept works
- No need for perfection in prototype stage

**Alternative Consideration:**
- If concept validated, regenerate with gpt-image-1
- Use Gemini for speed, OpenAI for final

**Implementation:**
```yaml
provider: nanobanana
prompt: "[concept description]"
quality: "medium"
```

**User sees result in seconds:**
- "Yes, this works!" → Regenerate with gpt-image-1 for final
- "No, different approach" → Iterate quickly with nanobanana

**Result:** Rapid iteration, validated 3 concepts in 5 minutes, selected best, finalized with OpenAI

---

## Summary: Selection Patterns

| Scenario | Tool | Why |
|----------|------|-----|
| **LinkedIn carousel** | gpt-image-1 | Professional + text rendering |
| **Instagram volume** | nanobanana | Cost + speed for regular posts |
| **Image editing** | nanobanana | ALWAYS - best-in-class precision |
| **Critical launch asset** | HYBRID | OpenAI base + Gemini polish |
| **Quick prototype** | nanobanana | Speed + cost for testing |

---

## Decision Framework Summary

```
High-stakes + text → gpt-image-1
Volume + budget → nanobanana
Editing → ALWAYS nanobanana
Testing/prototyping → nanobanana
Critical brand asset → HYBRID (both)
Not sure → gpt-image-1 (safer default)
```

---

**For complete decision logic, see:** `decision-matrix.md`
**For performance metrics, see:** `cost-speed-quality-analysis.md`
