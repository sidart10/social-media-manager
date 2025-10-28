---
name: platform-specs
description: Centralized specifications for social media platforms (LinkedIn, Instagram, Twitter, etc.). Provides optimal image sizes, aspect ratios, design guidelines, and platform-specific best practices. Use when workflow needs platform requirements.
---

# Platform Specifications

## Purpose

Provide centralized, authoritative platform specifications for image generation workflows. Eliminates repetition and ensures consistency across all image generation tasks.

## Instructions

When workflow needs platform-specific requirements:

1. **Identify target platform** from user input or workflow context:
   - LinkedIn (professional/business)
   - Instagram (social/creative)
   - Twitter/X (news/conversation)
   - Custom/multi-platform

   **For complete platform comparison, see:** `reference/platform-comparison.md`

2. **Retrieve specifications** for selected platform:
   - Optimal image sizes
   - Recommended aspect ratios
   - MCP tool size mappings
   - Design aesthetic guidelines
   - Content best practices

   **For detailed specs by platform:**
   - LinkedIn: `reference/linkedin-specs.md`
   - Instagram: `reference/instagram-specs.md`
   - Twitter: `reference/twitter-specs.md`

3. **Apply design system** based on platform:
   - LinkedIn → Dark monochrome tech aesthetic
   - Instagram → Vibrant, engaging visuals
   - Twitter → Bold, concise, high-contrast

   **For design systems, see:** `reference/design-systems.md`

4. **Map to MCP tool constraints**:
   - Translate platform requirements to supported sizes
   - Handle aspect ratio limitations
   - Select quality/format settings

5. **Return platform configuration**:
   - Recommended size (e.g., "1536x1024")
   - Aspect ratio (e.g., "16:9" or "closest: 3:2")
   - Design system name
   - Platform-specific guidelines

**For complete specs and mappings, see reference documentation.**

## Reference Documentation

This skill includes comprehensive platform knowledge:

- **`reference/platform-comparison.md`** - Side-by-side comparison of all platforms
- **`reference/linkedin-specs.md`** - Complete LinkedIn image requirements
- **`reference/instagram-specs.md`** - Complete Instagram image requirements
- **`reference/twitter-specs.md`** - Complete Twitter/X image requirements
- **`reference/design-systems.md`** - Platform-specific aesthetic guidelines

## Example

**Workflow asks:** "Get specifications for LinkedIn carousel"

**You retrieve:**
- **Platform**: LinkedIn
- **Content type**: Carousel
- **Optimal size**: 1536×1024px (closest to 16:9)
- **Aspect ratio**: 3:2 (best available for LinkedIn landscape)
- **Design system**: Dark monochrome tech
- **Aesthetic**:
  - Background: #0B0B0B (deep black)
  - Text: #FFFFFF (white) / #D4D4D4 (light gray)
  - Font: Inter, weight 300
  - Layout: 12-column grid, generous spacing

**See reference/linkedin-specs.md for complete details.**
