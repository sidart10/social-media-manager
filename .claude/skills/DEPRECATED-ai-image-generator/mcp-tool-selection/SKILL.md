---
name: mcp-tool-selection
description: Intelligent selection between nanobanana (Gemini) and gpt-image-1 (DALL-E 3) for image generation. Use when choosing image generation tool, deciding between providers, optimizing for quality vs speed vs cost, or need guidance on nanobanana vs gpt-image-1 selection. Analyzes use case, platform, and requirements.
---

# MCP Tool Selection

## Purpose

Choose the optimal image generation MCP tool (nanobanana vs gpt-image-1) based on task requirements, quality needs, speed constraints, and budget considerations.

## When to Use This Skill

Use this skill when:
- Choosing between image generation tools
- Deciding nanobanana vs gpt-image-1
- Optimizing for quality vs speed vs cost
- Need tool recommendation
- Comparing Gemini vs DALL-E capabilities
- Unsure which MCP tool to use

Triggers: choose tool, select tool, nanobanana vs gpt-image, which tool, tool selection, Gemini vs DALL-E

**Automatically referenced by:** create-image skill for intelligent routing

## Instructions

When selecting an image generation provider:

1. **Analyze the use case** against the decision matrix:
   - Is it new image generation or editing?
   - Quality priority: photorealism vs speed?
   - Budget constraints?
   - Need text rendering in image?
   - Need pixel-perfect edits?

   **For complete decision logic, see:** `reference/decision-matrix.md`

2. **Apply selection rules** (quick reference):
   - **New photorealistic images** → gpt-image-1 (OpenAI)
   - **Image editing/refinement** → nanobanana (Gemini)
   - **Text in images** → gpt-image-1 (OpenAI)
   - **Speed + budget** → nanobanana (Gemini)
   - **Professional/commercial** → gpt-image-1 (OpenAI)
   - **Iterative refinement** → nanobanana (Gemini)

3. **Consider hybrid approach** when appropriate:
   - Generate base with gpt-image-1 → Refine with nanobanana
   - Best of both worlds: quality + precision

   **For cost/speed/quality analysis, see:** `reference/cost-speed-quality-analysis.md`

4. **Return selection** with reasoning:
   - Selected tool: `mcp__gpt-image-1__create_image` OR `mcp__nanobanana__generate_image`
   - Why: Brief explanation based on use case
   - Alternative: When the other tool might be better

**For real-world selection examples, see:** `reference/usage-examples.md`

## Reference Documentation

This skill includes comprehensive MCP tool comparison:

- **`reference/decision-matrix.md`** - Complete feature comparison, when to use which tool
- **`reference/usage-examples.md`** - 5 real scenarios with tool selection reasoning
- **`reference/cost-speed-quality-analysis.md`** - Performance metrics, pricing, speed comparisons

**For individual tool mastery:**
- nanobanana details: `../nanobanana-mastery/SKILL.md`
- gpt-image-1 details: `../gpt-image-mastery/SKILL.md`

## Example

**Workflow asks:** "Generate LinkedIn carousel with professional dark aesthetic"

**You analyze:**
- Use case: New image generation
- Platform: LinkedIn (professional)
- Style: Dark tech aesthetic
- Text: Likely has text overlays
- Quality: High (enterprise-grade)

**You select:** `gpt-image-1` (OpenAI)

**Reasoning:** LinkedIn requires professional quality with accurate text rendering. OpenAI excels at complex compositions with text. Nanobanana would be secondary choice for any touch-ups.

**See reference/usage-examples.md Example 1 for complete scenario.**
