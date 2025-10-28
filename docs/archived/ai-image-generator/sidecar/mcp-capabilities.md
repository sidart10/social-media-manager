# MCP Server Capabilities - Feature Matrix

**Last Updated:** 2025-10-25
**Research Status:** ✅ Complete

This document details the exact capabilities of OpenAI gpt-image-1 and Google Gemini Nanobanana MCP servers for image generation and editing.

---

## 🎯 Quick Decision Guide

| Use Case                          | Recommended Provider | Why                                         |
| --------------------------------- | -------------------- | ------------------------------------------- |
| **Photorealistic generation**     | OpenAI gpt-image-1   | Better visual storytelling, detailed scenes |
| **Image editing (pixel-perfect)** | Gemini Nanobanana    | Best-in-class editing, targeted transforms  |
| **Character consistency**         | Both (equal)         | Both excel at maintaining likeness          |
| **Multi-turn refinement**         | Gemini Nanobanana    | Built for iterative editing                 |
| **Text rendering in images**      | OpenAI gpt-image-1   | Superior text accuracy                      |
| **Photo blending**                | Gemini Nanobanana    | Specialized feature                         |
| **Professional content**          | OpenAI gpt-image-1   | Better with complex compositions            |
| **Quick edits/transforms**        | Gemini Nanobanana    | Faster, more efficient                      |

---

## 🔵 OpenAI gpt-image-1

**Model ID:** `gpt-image-1`
**Released:** 2025
**Pricing:** Included in OpenAI API pricing

### ✅ Core Capabilities

#### 1. **Text-to-Image Generation**

- **Quality:** State-of-the-art photorealism
- **Strengths:**
  - Detailed scenes with accurate text
  - Complex compositions
  - Visual storytelling
  - Comic strips, storyboards
- **Resolutions:** 1024x1024, 1024x1536, 1536x1024
- **Formats:** PNG, JPEG, WebP

#### 2. **Image Editing / Inpainting**

- **Method:** Soft mask with total image recreation
- **How it works:**
  - Uses mask to identify edit area
  - Recreates entire image (not pixel replacement)
  - Blends changes with context
- **Best for:**
  - Large-area changes
  - Style consistency across image
  - Substantial modifications
- **Limitations:**
  - ⚠️ NOT pixel-perfect (recreates whole image)
  - ⚠️ Can introduce subtle inconsistencies in texture/shading
  - ⚠️ Sometimes overcompensates on minor edits
  - ⚠️ Edited area may look "pasted" rather than organic

#### 3. **Image Variations**

- Create similar versions of existing images
- Maintains style and composition
- Useful for A/B testing

#### 4. **Multi-Image Compositing**

- Combine multiple input images
- Text-based instructions for composition
- Advanced prompt control

#### 5. **Character Consistency**

- ✅ Top-notch likeness maintenance
- Excellent for storytelling across multiple images

### 📊 Technical Specifications (VERIFIED 2025-10-25)

| Feature             | Specification                                     |
| ------------------- | ------------------------------------------------- |
| **Supported Sizes** | **1024x1024, 1024x1536, 1536x1024, auto ONLY**    |
| Max Resolution      | 1536x1024 px                                      |
| Aspect Ratios       | 1:1 (1024x1024), 2:3 (1024x1536), 3:2 (1536x1024) |
| **Quality Values**  | **low, medium, high, auto ONLY** (NOT 'hd')       |
| Input Formats       | PNG, JPEG, WebP                                   |
| Output Formats      | PNG, JPEG, WebP                                   |
| Max Input Size      | 4MB                                               |
| **Generation Time** | **60-90 seconds average**                         |
| API Endpoint        | `/v1/images/generations`, `/v1/images/edits`      |

⚠️ **CRITICAL CONSTRAINTS:**

- ❌ Cannot generate arbitrary sizes (e.g., 1920x1080, 1792x1024)
- ❌ No true 16:9 support (use 1536x1024 as closest 3:2)
- ❌ No true 9:16 support (use 1024x1536 as closest 2:3)
- ✅ Use 'auto' size to let model decide based on prompt

### 💰 Pricing

- Included in OpenAI API subscription
- Pay-per-use model
- Varies by resolution

### 🔧 MCP Server Tools

Available via MCP servers:

- `generate_image` - Text-to-image generation
- `edit_image` - Inpainting with mask
- `create_variation` - Generate similar images
- `composite_images` - Combine multiple images

---

## 🟢 Google Gemini 2.5 Flash Image (Nanobanana)

**Model ID:** `gemini-2.5-flash-image` (nickname: nano-banana)
**Released:** August 2025
**Pricing:** $30.00 per 1M output tokens ($0.039 per image)

### ✅ Core Capabilities

#### 1. **Text-to-Image Generation**

- **Quality:** High-quality, state-of-the-art
- **Strengths:**
  - Fast generation
  - Cost-effective
  - Stylized content
  - Creative interpretations
- **Note:** Slightly behind OpenAI in photorealism

#### 2. **Pixel-Perfect Editing** ⭐ BEST-IN-CLASS

- **Method:** Targeted transformation with natural language
- **How it works:**
  - Edits specific elements WITHOUT affecting rest of scene
  - True pixel-level precision
  - No full image recreation
- **Best for:**
  - Minor adjustments
  - Targeted transformations
  - Background blur
  - Color corrections
  - Removing/adding specific objects
- **Examples:**
  - Blur background (keep subject sharp)
  - Remove stains/blemishes
  - Add color to black & white
  - Change single objects

#### 3. **Multi-Turn Editing** ⭐ UNIQUE

- Iterative refinement over multiple turns
- Conversational editing workflow
- Preserves previous changes
- Build complexity gradually

#### 4. **Photo Blending** ⭐ UNIQUE

- Upload multiple photos
- Blend into new scene
- Natural composition
- Example: "Put me and my dog on a basketball court"

#### 5. **Character Consistency**

- ✅ Excellent likeness maintenance
- Specialized for people, pets
- Works across multiple images

#### 6. **Targeted Transformations**

- Change specific parts with natural language
- Non-destructive editing
- Maintains image quality

### 📊 Technical Specifications

| Feature        | Specification                           |
| -------------- | --------------------------------------- |
| Max Resolution | 2048x2048 px                            |
| Aspect Ratios  | Flexible (any ratio)                    |
| Input Formats  | PNG, JPEG, WebP                         |
| Output Formats | PNG, JPEG, WebP                         |
| Max Input Size | 20MB                                    |
| API Endpoint   | Gemini API, Google AI Studio, Vertex AI |

### 💰 Pricing

- $30.00 per 1M output tokens
- Each image = 1290 output tokens
- **Cost per image:** $0.039
- Free tier available for testing

### 🔧 MCP Server Tools

Available via MCP servers:

- `generate_image` - Text-to-image generation
- `edit_image` - Pixel-perfect editing
- `blend_photos` - Multi-image composition
- `refine_image` - Iterative improvements

### 📈 Performance Stats

- **500M+ images edited** (as of Sept 2025)
- **#1 rated image editing model** worldwide
- Expanding to Google Search, NotebookLM, Photos

---

## ⚔️ Head-to-Head Comparison

| Feature                   | OpenAI gpt-image-1 | Gemini Nanobanana | Winner |
| ------------------------- | ------------------ | ----------------- | ------ |
| **Photorealism**          | ⭐⭐⭐⭐⭐         | ⭐⭐⭐⭐          | OpenAI |
| **Visual Storytelling**   | ⭐⭐⭐⭐⭐         | ⭐⭐⭐            | OpenAI |
| **Text in Images**        | ⭐⭐⭐⭐⭐         | ⭐⭐⭐            | OpenAI |
| **Complex Compositions**  | ⭐⭐⭐⭐⭐         | ⭐⭐⭐⭐          | OpenAI |
| **Pixel-Perfect Editing** | ⭐⭐               | ⭐⭐⭐⭐⭐        | Gemini |
| **Image Manipulation**    | ⭐⭐⭐             | ⭐⭐⭐⭐⭐        | Gemini |
| **Multi-Turn Editing**    | ❌                 | ⭐⭐⭐⭐⭐        | Gemini |
| **Photo Blending**        | ⭐⭐⭐             | ⭐⭐⭐⭐⭐        | Gemini |
| **Character Consistency** | ⭐⭐⭐⭐⭐         | ⭐⭐⭐⭐⭐        | Tie    |
| **Speed**                 | ⭐⭐⭐⭐           | ⭐⭐⭐⭐⭐        | Gemini |
| **Cost**                  | ⭐⭐⭐             | ⭐⭐⭐⭐⭐        | Gemini |

---

## 🎯 Optimal Provider Selection Logic

### Use OpenAI gpt-image-1 when:

✅ Creating new images from scratch (text-to-image)
✅ Need photorealistic quality
✅ Complex scenes with multiple elements
✅ Text must be accurate in the image
✅ Professional/commercial content
✅ Storyboards, comics, narrative sequences
✅ Making large-area edits where full recreation is acceptable

### Use Gemini Nanobanana when:

✅ Editing existing images
✅ Need pixel-perfect precision
✅ Minor/targeted adjustments
✅ Background blur, color corrections
✅ Removing specific objects
✅ Blending multiple photos
✅ Iterative refinement needed
✅ Budget-conscious projects
✅ Need fast turnaround

### Hybrid Approach (Recommended):

1. **Generate with OpenAI** → High-quality base image
2. **Refine with Gemini** → Pixel-perfect touch-ups

---

## 🚨 Known Limitations

### OpenAI gpt-image-1

- ⚠️ Inpainting is NOT pixel-perfect (recreates entire image)
- ⚠️ Can introduce texture/shading inconsistencies
- ⚠️ May overcompensate on minor edits
- ⚠️ More expensive than Gemini
- ⚠️ No native multi-turn editing

### Gemini Nanobanana

- ⚠️ Slightly less photorealistic than OpenAI
- ⚠️ Text rendering not as accurate
- ⚠️ Complex compositions may be less detailed
- ⚠️ Newer model (less proven at scale)

---

## 🔧 MCP Server Setup

### OpenAI gpt-image-1

```json
{
  "mcpServers": {
    "gpt-image-1": {
      "command": "npx",
      "args": ["@cloudwerxlab/gpt-image-1-mcp"],
      "env": {
        "OPENAI_API_KEY": "sk-proj-..."
      }
    }
  }
}
```

### Gemini Nanobanana

```json
{
  "mcpServers": {
    "nanobanana": {
      "command": "uvx",
      "args": ["nanobanana-mcp-server@latest"],
      "env": {
        "GEMINI_API_KEY": "AIza..."
      }
    }
  }
}
```

---

## 📚 Resources

**OpenAI:**

- GitHub: https://github.com/SureScaleAI/openai-gpt-image-mcp
- Docs: https://platform.openai.com/docs/guides/images

**Gemini:**

- GitHub: https://github.com/zhongweili/nanobanana-mcp-server
- Docs: https://ai.google.dev/gemini-api/docs/image-generation
- Blog: https://developers.googleblog.com/en/introducing-gemini-2-5-flash-image/

---

**Last verified:** 2025-10-25
