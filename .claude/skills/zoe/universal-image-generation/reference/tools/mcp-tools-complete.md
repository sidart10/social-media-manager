# MCP Tools Reference - Complete Guide

**How to call nanobanana and gpt-image-1 MCP tools for image generation**

---

## Tool 1: mcp**nanobanana**generate_image

**Provider**: Google Gemini 2.5 Flash Image (nano banana)
**Best for**: Speed, cost, editing, creative, volume

### Parameters

```typescript
{
  prompt: string (required, max 8192 chars)
    // Clear, detailed image description
    // Include: subject, composition, style, colors, mood
    // Example: "Professional LinkedIn post with dark background..."

  mode: "auto" | "generate" | "edit" (default: "auto")
    // "generate" - Create new image from text
    // "edit" - Modify existing image (requires input_image_path_1)
    // "auto" - Let tool decide based on inputs

  n: number (1-4, default: 1)
    // Number of images to generate
    // Higher n = more variations to choose from
    // Cost: n × $0.039

  negative_prompt: string (optional, max 1024 chars)
    // Things to AVOID in generation
    // Comma-separated list
    // Example: "cluttered, low contrast, amateur, cartoons"
    // Minimum 10 items recommended

  system_instruction: string (optional, max 512 chars)
    // Tone/style guidance for the model
    // Example: "Generate in photorealistic style with professional quality"

  input_image_path_1: string (optional)
    // Path to first input image (for editing or conditioning)
    // Use for: Edit mode, style reference, composition guide

  input_image_path_2: string (optional)
    // Path to second input image (for blending)
    // Use for: Multi-image composition

  input_image_path_3: string (optional)
    // Path to third input image (for complex blending)
    // Use for: Advanced multi-image scenes

  file_id: string (optional)
    // Files API file ID (e.g., "files/abc123")
    // Use for: Editing previously uploaded images
    // Alternative to input_image_path_1
}
```

### Returns

```json
{
  "images": [
    {
      "file_path": "/Users/sid/nanobanana-images/image_20251027_123456.png",
      "size_bytes": 1234567,
      "metadata": {
        "prompt": "...",
        "model": "gemini-2.5-flash-image",
        "timestamp": "2025-10-27T12:34:56Z"
      }
    }
  ]
}
```

### Usage Examples

**Example 1: Generate New Image**

```yaml
mcp__nanobanana__generate_image:
  prompt: 'Professional LinkedIn post with dark background (#0B0B0B), white text (56pt Inter font), green accent (#4ADE80), 12-column grid layout, AI agent architecture diagram with labeled components, high contrast, minimal design'
  mode: 'generate'
  negative_prompt: 'cluttered, busy backgrounds, low contrast, small fonts, stock photos, amateur design, gradients, drop shadows, 3D renders, light backgrounds, cartoons'
  n: 1
```

**Example 2: Edit Existing Image**

```yaml
mcp__nanobanana__generate_image:
  prompt: 'Blur background significantly while keeping main subject sharp and in focus, create depth of field effect'
  mode: 'edit'
  input_image_path_1: '/path/to/linkedin-post-original.png'
  n: 1
```

**Example 3: Blend Multiple Images**

```yaml
mcp__nanobanana__generate_image:
  prompt: 'Put person from first image into the office setting from second image, natural lighting and composition'
  mode: 'generate'
  input_image_path_1: '/path/to/person.jpg'
  input_image_path_2: '/path/to/office.jpg'
  n: 1
```

### Performance

- **Speed**: Faster than gpt-image-1
- **Cost**: $0.039 per image (fixed)
- **Quality**: 8.5/10 photorealism
- **Max resolution**: 2048×2048
- **Output location**: `~/nanobanana-images/`

---

## Tool 2: mcp**gpt-image-1**create_image

**Provider**: OpenAI DALL-E 3 (gpt-image-1)
**Best for**: Photorealism, text rendering, professional, complex compositions

### Parameters

```typescript
{
  prompt: string (required, max 32000 chars)
    // Detailed image description
    // Can be VERY long and detailed
    // Supports complex, multi-paragraph descriptions

  size: "1024x1024" | "1536x1024" | "1024x1536" | "auto"
    // CRITICAL: Only these 4 sizes supported
    // "auto" lets model decide based on prompt
    // 1536x1024 = closest to 16:9 (actually 3:2)
    // 1024x1536 = closest to 9:16 (actually 2:3)

  quality: "low" | "medium" | "high" | "auto" (default: "auto")
    // "high" for professional/commercial
    // "medium" for social media
    // "low" for testing/prototypes

  output_format: "png" | "jpeg" | "webp" (default: "png")
    // PNG: Best for graphics/text (no compression)
    // JPEG: Smaller files, photos
    // WebP: Modern format, good compression

  n: number (1-10, default: 1)
    // Number of variations
    // More options to choose from
    // Cost increases with n

  background: "transparent" | "opaque" | "auto"
    // Transparency support
    // Use "transparent" for logos, graphics with cutouts

  output_compression: number (0-100, default: auto)
    // JPEG/WebP quality (higher = better quality, larger file)

  moderation: "low" | "auto"
    // Content filtering level
}
```

### Returns

```json
{
  "file_paths": ["/Users/sid/Pictures/gpt-image-1/gpt-images/image_20251027_123456.png"],
  "metadata": {
    "model": "gpt-image-1",
    "size": "1536x1024",
    "quality": "high",
    "timestamp": "2025-10-27T12:34:56Z"
  }
}
```

### Usage Examples

**Example 1: Professional LinkedIn Post**

```yaml
mcp__gpt-image-1__create_image:
  prompt: "Professional LinkedIn carousel slide with dark monochrome tech aesthetic. Deep black background (#0B0B0B). Large white heading 'AI Agent Architecture' in Inter font weight 300, 56pt. Diagram showing 5 connected components: Memory, Planning, Tools, Execution, Monitoring. Green accent color (#4ADE80) for connections. 12-column grid layout with generous spacing (35% negative space). High contrast (WCAG AAA). Clean, minimal, enterprise-grade quality."
  size: '1536x1024'
  quality: 'high'
  output_format: 'png'
  n: 1
```

**Example 2: Instagram Square Post**

```yaml
mcp__gpt-image-1__create_image:
  prompt: "Vibrant Instagram feed post, square format. Bright, colorful gradient background (coral #FF6B6B to peach #FFB4A2). Bold white text 'Your Journey Starts Today' in modern sans-serif 48pt. Motivational quote aesthetic, clean composition, rule of thirds, mobile-optimized, eye-catching, Instagram-worthy."
  size: '1024x1024'
  quality: 'high'
  output_format: 'png'
  n: 1
```

**Example 3: Photorealistic Portrait**

```yaml
mcp__gpt-image-1__create_image:
  prompt: 'Professional headshot portrait, adult Asian female, business casual attire, natural smile. Shot on Canon R5 with 85mm f/1.2 lens at f/2.8 for sharp subject and soft background bokeh. Studio lighting: key light camera-left at 45 degrees (soft, diffused), subtle fill light camera-right. White background, clean and professional. ISO 400, 1/200s shutter. Photorealistic, high detail, natural skin texture (no smoothing), professional corporate headshot quality.'
  size: '1024x1024'
  quality: 'high'
  output_format: 'png'
  n: 1
```

### Performance

- **Speed**: 60-90 seconds per image
- **Cost**: Variable (higher than nanobanana)
- **Quality**: 9.5/10 photorealism
- **Max resolution**: 1536×1024
- **Output location**: `~/Pictures/gpt-image-1/gpt-images/`

---

## Comparison Table

| Feature                | nanobanana          | gpt-image-1            | When to Use                  |
| ---------------------- | ------------------- | ---------------------- | ---------------------------- |
| **Prompt length**      | 8192 chars          | 32000 chars            | GPT for complex descriptions |
| **Negative prompts**   | Native support      | Include in main prompt | Nanobanana cleaner           |
| **System instruction** | Yes (512 chars)     | No                     | Nanobanana for tone control  |
| **Multiple images**    | 1-4                 | 1-10                   | GPT for more variations      |
| **Edit mode**          | Yes (best-in-class) | No native edit         | Nanobanana for editing       |
| **Multi-image input**  | Yes (3 images)      | No                     | Nanobanana for blending      |
| **Size flexibility**   | Any aspect ratio    | Only 3 sizes           | Nanobanana for custom        |
| **Transparency**       | Via prompt          | Native support         | GPT for transparent PNGs     |
| **Speed**              | Faster              | 60-90s                 | Nanobanana for quick         |
| **Cost**               | $0.039/image        | Higher                 | Nanobanana for volume        |
| **Photorealism**       | 8.5/10              | 9.5/10                 | GPT for top quality          |
| **Text rendering**     | 7/10                | 9.5/10                 | GPT for text accuracy        |

---

## Decision Logic (Quick Reference)

```python
def select_tool(use_case, platform, has_text, quality_priority, budget_priority):
    # Platform-specific defaults
    if platform == "LinkedIn" and has_text:
        return "gpt-image-1"  # Professional + text = OpenAI

    if platform == "Instagram" and budget_priority == "high":
        return "nanobanana"  # Volume posting = Gemini

    # Use case trumps all
    if use_case == "editing":
        return "nanobanana"  # ALWAYS Gemini for edits

    if use_case == "blending":
        return "nanobanana"  # Only Gemini supports multi-input

    # Quality vs Speed tradeoff
    if quality_priority == "critical":
        return "gpt-image-1"

    if budget_priority == "high" or speed_priority == "high":
        return "nanobanana"

    # Safe default
    return "gpt-image-1"
```

---

## Error Handling

### nanobanana Errors

**Error: "Invalid prompt length"**

- Cause: Prompt > 8192 chars
- Fix: Shorten prompt, remove redundancy
- Or: Split into multiple images

**Error: "Invalid mode"**

- Cause: mode not "auto", "generate", or "edit"
- Fix: Use correct mode value

**Error: "Input image not found"**

- Cause: input_image_path_1 doesn't exist
- Fix: Verify file path, use absolute path

### gpt-image-1 Errors

**Error: "Invalid size"**

- Cause: Size not in [1024x1024, 1536x1024, 1024x1536, auto]
- Fix: Use only supported sizes
- CRITICAL: No true 16:9 support!

**Error: "Invalid quality"**

- Cause: Used "hd" instead of "high"
- Fix: Use "low", "medium", "high", or "auto" only

**Error: "Prompt too long"**

- Cause: > 32000 chars
- Fix: Shorten (very rare - limit is generous)

---

## Best Practices

### For Both Tools

**Prompt Construction:**

- Be specific and detailed
- Include technical specs
- Describe lighting, colors, composition
- Specify what you DON'T want (negatives)

**Quality Keywords:**

- "Professional", "high-quality", "enterprise-grade"
- "Sharp", "crisp", "high-fidelity"
- "Photorealistic", "detailed", "polished"

### Nanobanana-Specific

**Leverage system_instruction:**

```yaml
system_instruction: 'Generate in photorealistic style with professional quality. Maintain high contrast and clean composition.'
```

**Use negative_prompt properly:**

```yaml
negative_prompt: 'cluttered, busy, low contrast, small fonts, amateur design, cartoons, CGI, stock photos, gradients, drop shadows'
```

**For editing, be specific:**

```yaml
prompt: 'Blur background using gaussian blur, f/2.8 equivalent depth of field, keep subject sharp'
# NOT: "make it better"
```

### GPT-Image-1-Specific

**Include negatives in main prompt:**

```yaml
prompt: 'Professional design with dark background. Avoid: cluttered layouts, low contrast, small text, amateur appearance, cartoons, stock photos.'
```

**Specify text carefully:**

```yaml
prompt: "Bold white text reading 'AI Agents' in Inter font, 56pt size, weight 300, centered on dark background"
# Text rendering is GPT's strength
```

---

## Output Handling

### nanobanana Output

**Location**: `~/nanobanana-images/`
**Naming**: `image_YYYYMMDD_HHMMSS.png`
**Action**: Copy to your workflow output folder

### gpt-image-1 Output

**Location**: `~/Pictures/gpt-image-1/gpt-images/`
**Naming**: `image_YYYYMMDD_HHMMSS.png`
**Action**: Copy to your workflow output folder

### Workflow Pattern

```yaml
<action>Generate image via MCP</action>
<action>Extract file_path from result</action>
<action>Copy: cp "{mcp_file_path}" "{workflow_output}/image.png"</action>
<action>Save metadata alongside image</action>
```

---

## Complete Usage Example

### Scenario: LinkedIn Professional Post

**Step 1: Select Tool**

```
Platform: LinkedIn
Has text: Yes
Quality: Professional
→ Selected: gpt-image-1
```

**Step 2: Construct Parameters**

```yaml
Tool: mcp__gpt-image-1__create_image
Parameters:
  prompt: "Professional LinkedIn post graphic with dark monochrome tech aesthetic. Deep black background (#0B0B0B). Large white heading 'The Future of AI Agents' in Inter font, weight 300, 56pt, centered upper third. Subheading 'Building Autonomous Systems' in light gray (#D4D4D4), 28pt, centered below. Abstract tech diagram in center showing connected nodes with green accent (#4ADE80). 12-column grid layout with 96px horizontal margins, 35% negative space. High contrast (WCAG AAA 7:1 ratio). Clean, minimal, enterprise-grade, professional quality. No gradients, no drop shadows, no decorative elements. Photorealistic rendering."
  size: '1536x1024'
  quality: 'high'
  output_format: 'png'
  n: 1
```

**Step 3: Execute**

```bash
Result = mcp__gpt-image-1__create_image(...)
```

**Step 4: Handle Output**

```bash
file_path = Result.file_paths[0]
cp "{file_path}" "outputs/linkedin-ai-agents/slide1.png"
```

**Step 5: Create Metadata**

```json
{
  "tool_used": "gpt-image-1",
  "prompt": "...",
  "size": "1536x1024",
  "quality": "high",
  "generation_time_seconds": 75,
  "file_path": "outputs/linkedin-ai-agents/slide1.png"
}
```

---

## Tool Selection Decision Tree

```
START
  ↓
What's the use case?
  EDITING → nanobanana (stop here)
  BLENDING → nanobanana (stop here)
  CREATING NEW → Continue
  ↓
Platform?
  LinkedIn + text → gpt-image-1
  Instagram + volume → nanobanana
  Twitter + text → gpt-image-1
  Custom → Continue
  ↓
Priority?
  Quality critical → gpt-image-1
  Speed + budget → nanobanana
  Not sure → gpt-image-1 (safer)
```

---

## Advanced Techniques

### Batch Generation (nanobanana)

**Generate 4 variations:**

```yaml
mcp__nanobanana__generate_image:
  prompt: 'Instagram post about productivity tips, vibrant colors, clean design'
  n: 4 # Get 4 variations
  negative_prompt: 'cluttered, dark, busy, text-heavy'
```

**Result**: 4 different interpretations, pick best
**Cost**: 4 × $0.039 = $0.156

### Multi-Turn Editing (nanobanana)

**Turn 1: Generate base**

```yaml
mode: 'generate'
prompt: 'Professional headshot, clean background'
```

**Turn 2: Refine background**

```yaml
mode: 'edit'
input_image_path_1: 'turn1_result.png'
prompt: 'Blur background more, f/1.4 depth of field'
```

**Turn 3: Final touch**

```yaml
mode: 'edit'
input_image_path_1: 'turn2_result.png'
prompt: 'Enhance subject sharpness, increase contrast slightly'
```

---

## Integration with Emily's JSON

### From JSON to MCP Call

**JSON Structure:**

```json
{
  "scene_description": {...},
  "composition_and_framing": {
    "resolution": "1536x1024"
  },
  "color_and_grade": {
    "color_palette": {
      "hex_codes": ["#0B0B0B", "#FFFFFF", "#4ADE80"]
    }
  },
  "negative_prompt": ["item1", "item2", ...]
}
```

**Convert to nanobanana:**

```yaml
mcp__nanobanana__generate_image:
  prompt: '{converted_text_from_json}'
  negative_prompt: '{joined_negatives_array}'
  n: 1
```

**Convert to gpt-image-1:**

```yaml
mcp__gpt-image-1__create_image:
  prompt: '{converted_text_with_negatives_included}'
  size: '{size_from_json}'
  quality: 'high'
  output_format: 'png'
  n: 1
```

---

**For tool selection logic, see:** `tool-selection.md`
**For usage examples, see:** `usage-examples.md`
**For Emily's JSON method, see:** `emily-json-methodology.md`
