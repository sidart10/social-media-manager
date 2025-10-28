---
name: linkedin-design
description: Professional dark monochrome tech design system for LinkedIn content. Provides specs, aesthetics, captions, and best practices for LinkedIn posts and carousels. Use when creating LinkedIn content, B2B professional images, or dark tech aesthetic.
---

# LinkedIn Design

## Purpose

Complete design system and content strategy for professional LinkedIn posts and carousels. Provides dark monochrome tech aesthetic, posting best practices, caption generation, and engagement optimization.

## Instructions

When creating LinkedIn content:

1. **Apply dark monochrome tech design system**:
   - Background: #0B0B0B (deep black)
   - Text: #FFFFFF (white) primary, #D4D4D4 (light gray) secondary
   - Accent: #4ADE80 (green) or project-specific
   - Typography: Inter font, weight 300
   - Layout: 12-column grid, generous spacing (35-60% negative space)
   - Texture: Subtle noise overlay 0.03 opacity (optional)

   **For complete design system, see:** `reference/design-system.md`

2. **Use LinkedIn-optimized specifications**:
   - **Aspect ratio**: 16:9 (landscape) or 1:1 (square)
   - **MCP size**: 1536×1024 (closest to 16:9) or 1024×1024 (square)
   - **Format**: PNG (best for graphics/text)
   - **Quality**: High (enterprise-grade)
   - **WCAG**: AAA compliance (7:1 contrast minimum)

3. **Generate professional captions**:
   - Structure: Hook → Value → Key points → CTA
   - Length: 150-300 characters ideal (max 3000)
   - Tone: Professional but approachable
   - Include data/statistics (performs well on LinkedIn)

   **For caption templates and strategy, see:** `reference/content-strategy.md`

4. **Apply LinkedIn best practices**:
   - **Carousels**: 3-7 slides recommended (sweet spot 3-5)
   - **First slide**: Critical hook (stops the scroll)
   - **Posting times**: Tuesday-Thursday, 8-10am or 12-2pm
   - **Hashtags**: 3-5 relevant, mix of broad and niche
   - **Engagement**: Respond to comments in first hour (algorithm boost)

   **For complete best practices, see:** `reference/carousel-best-practices.md`

5. **Generate alt-text for accessibility**:
   - Max 125 characters per image
   - Describe: Visual elements, key text, message
   - Example: "Dark slide showing AI architecture with 5 green-connected components"

6. **Provide posting guide**:
   - Best times to post
   - How to upload carousel (order matters!)
   - Engagement tactics
   - Performance expectations

**This skill auto-loads when workflows detect LinkedIn context!**

## Reference Documentation

This skill includes comprehensive LinkedIn expertise:

- **`reference/design-system.md`** - Complete dark monochrome tech aesthetic (colors, typography, layout)
- **`reference/content-strategy.md`** - Caption generation, hashtags, posting times, engagement tactics
- **`reference/carousel-best-practices.md`** - LinkedIn carousel optimization (slide count, hooks, CTAs)

**Related Skills:**
- `../create-image/` - Uses this design system when generating LinkedIn images
- `../mcp-tool-selection/` - LinkedIn → gpt-image-1 (professional quality)

## Example

**Workflow creating LinkedIn carousel:**

**Workflow asks**: "Which design? 1) LinkedIn 2) Instagram 3) Custom"

**User picks**: "1" (LinkedIn)

**Claude auto-loads**: linkedin-design skill

**Skill provides**:
- Dark tech color palette (#0B0B0B, #FFFFFF, #4ADE80)
- Inter font specifications
- 12-column grid layout
- Caption structure (Hook → Value → CTA)
- Posting best practices

**Workflow executes**: Creates carousel with LinkedIn design system automatically

**Result**: Professional LinkedIn carousel with dark tech aesthetic, professional captions, optimized for engagement

**See reference/ for complete LinkedIn design specifications and content strategy.**
