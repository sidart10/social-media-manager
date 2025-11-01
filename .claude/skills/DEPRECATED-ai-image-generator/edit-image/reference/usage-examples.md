# Edit Image - Usage Examples

**Real-world editing scenarios using nanobanana's pixel-perfect capabilities**

---

## Example 1: LinkedIn Post - Blur Background

**Scenario**: Generated LinkedIn post with product, but background distracting

**Input**: `linkedin-product.png` (1536×1024, professional product shot)
**Issue**: Background too detailed, draws eye away from product
**Goal**: Create depth, focus on product

**Edit Workflow**:
```yaml
mcp__nanobanana__generate_image:
  prompt: "Blur background significantly using strong gaussian blur effect, equivalent to f/1.4 shallow depth of field, while keeping the main product completely sharp and in perfect focus. Create strong visual separation, professional depth of field look."
  mode: "edit"
  input_image_path_1: "/outputs/linkedin-product.png"
  n: 1
```

**Result**:
- Background: Beautifully blurred (bokeh effect)
- Product: Crystal sharp, untouched
- Effect: Professional depth, eye goes straight to product
- Time: ~20 seconds
- Cost: $0.039

**Quality**: Subject perfectly preserved (nanobanana's pixel-perfect strength!)

---

## Example 2: Instagram Story - Fix Color Cast

**Scenario**: Instagram story has yellow color cast from indoor lighting

**Input**: `instagram-story-yellow.png` (1024×1536, vertical)
**Issue**: Colors look yellowish, not natural
**Goal**: Neutral white balance, natural colors

**Edit Workflow**:
```yaml
mcp__nanobanana__generate_image:
  prompt: "Remove yellow color cast, adjust white balance to neutral 5500K daylight temperature. Make colors natural and balanced, preserve skin tones, enhance overall color accuracy without oversaturation."
  mode: "edit"
  input_image_path_1: "/outputs/instagram-story-yellow.png"
  n: 1
```

**Result**:
- Colors: Natural, balanced, no yellow cast
- Skin tones: Preserved accurately
- Overall: Professional, Instagram-ready
- Time: ~20 seconds

**Before/After**: Dramatically improved, looks professional now

---

## Example 3: Twitter Post - Remove Watermark

**Scenario**: Stock image has watermark that needs removal

**Input**: `twitter-quote-watermarked.png` (1536×1024)
**Issue**: Watermark in bottom-right corner
**Goal**: Clean removal, seamless fill

**Edit Workflow**:
```yaml
mcp__nanobanana__generate_image:
  prompt: "Remove the watermark text from bottom-right corner. Fill the area naturally by extending the background texture and matching lighting. Seamless, invisible removal with no artifacts or visible edits."
  mode: "edit"
  input_image_path_1: "/outputs/twitter-quote-watermarked.png"
  n: 1
```

**Result**:
- Watermark: Completely gone
- Fill: Natural, matches background
- Quality: No visible editing artifacts
- Perfect: Clean professional image

**Nanobanana Excellence**: Pixel-perfect removal, better than OpenAI's soft-mask approach

---

## Example 4: Multi-Turn Refinement (Iterative)

**Scenario**: Product photo needs multiple improvements

**Input**: `product-photo-raw.png`
**Goal**: Professional product shot through iterative editing

**Turn 1 - Background**:
```yaml
mcp__nanobanana__generate_image:
  prompt: "Blur background with f/2.8 depth of field, keep product sharp"
  mode: "edit"
  input_image_path_1: "product-photo-raw.png"
# Save as: turn1-background.png
```

**Turn 2 - Color**:
```yaml
mcp__nanobanana__generate_image:
  prompt: "Enhance colors: boost product color saturation by 20%, keep background desaturated for contrast"
  mode: "edit"
  input_image_path_1: "turn1-background.png"
# Save as: turn2-color.png
```

**Turn 3 - Sharpness**:
```yaml
mcp__nanobanana__generate_image:
  prompt: "Sharpen product details, enhance edge definition, increase micro-contrast. Professional crisp look."
  mode: "edit"
  input_image_path_1: "turn2-color.png"
# Save as: turn3-final.png
```

**Total**:
- Edits: 3 turns
- Time: ~1 minute total
- Cost: 3 × $0.039 = $0.117
- Result: Professional product photo

**Why Multi-Turn**: Each edit focused, better control, builds complexity gradually

---

## Example 5: Instagram Post - Add Text Overlay

**Scenario**: Great image but needs text added

**Input**: `instagram-photo.png` (1024×1024, lifestyle photo)
**Issue**: No text, needs motivational quote
**Goal**: Add text overlay while preserving photo

**Edit Workflow**:
```yaml
mcp__nanobanana__generate_image:
  prompt: "Add white text overlay in top third: 'Start Before You're Ready' in bold 48pt sans-serif font. Add semi-transparent dark gradient overlay (50% opacity) behind text for readability. Text should be clearly legible, high contrast, professional."
  mode: "edit"
  input_image_path_1: "/outputs/instagram-photo.png"
  n: 2  # Generate 2 variations (text placement options)
```

**Result**:
- Variation 1: Text top-center with gradient bar
- Variation 2: Text top-left with full gradient
- User picks best
- Time: ~30 seconds for both

**Alternative Approach**: Use create-image skill to regenerate with text specified in JSON (better text quality with gpt-image-1)

---

## Comparison: Edit vs Regenerate

### Same Scenario Different Approaches

**Scenario**: LinkedIn post background too busy

**Approach A: Edit (Recommended)**
```yaml
# Edit existing image
mcp__nanobanana__generate_image with mode="edit"
Time: ~20 seconds
Cost: $0.039
Risk: Low (targeted change only)
Result: Same image, blurred background
```

**Approach B: Regenerate**
```yaml
# Create new image from scratch
mcp__gpt-image-1__create_image with updated prompt
Time: ~75 seconds
Cost: Higher
Risk: Medium (might lose good elements)
Result: Completely new image (may be different)
```

**Verdict**: Edit wins for targeted changes!

---

## When Editing FAILS

### Scenario: Edit Too Complex

**Attempt**:
```yaml
prompt: "Blur background, change text color to green, remove logo, add border, adjust contrast, change product angle"
# Too many changes at once!
```

**Result**: Inconsistent, poor quality, some changes missed

**Solution**: Either:
1. **Multi-turn editing** (one change per turn)
2. **Regenerate** from scratch with all requirements in JSON

**Rule**: If 3+ major changes needed, regenerate is often better

---

## Edit + Regenerate Hybrid

**Strategy**: Use both approaches strategically

**Workflow**:
1. Generate base with gpt-image-1 (high quality)
2. Edit with nanobanana (targeted improvements)
3. Result: Best of both worlds

**Example**:
```
Step 1: gpt-image-1 generates LinkedIn post (photorealistic quality)
Step 2: nanobanana blurs background (pixel-perfect precision)
Step 3: nanobanana adds subtle vignette (final polish)

Total cost: $0.08 + $0.039 + $0.039 = $0.158
Result: Professional, polished, perfect
```

---

## Summary: Common Edits

| Edit Type | Difficulty | Speed | Success Rate |
|-----------|-----------|-------|--------------|
| Blur background | Easy | Fast | 95%+ |
| Color correction | Easy | Fast | 90%+ |
| Remove small object | Medium | Fast | 85%+ |
| Add simple element | Medium | Fast | 80%+ |
| Enhance sharpness | Easy | Fast | 95%+ |
| Lighting adjust | Easy | Fast | 90%+ |
| Style transfer | Hard | Medium | 70%+ |
| Complex multi-edit | Hard | Slow | 60%+ (use multi-turn) |

---

**For decision guide, see:** `when-to-edit-vs-regenerate.md`
**For nanobanana editing capabilities, see:** `nanobanana-editing.md`
**For complete MCP parameters, see:** `mcp-tools-reference.md`
