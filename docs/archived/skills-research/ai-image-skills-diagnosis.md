# AI Image Generator Skills - Why They're Not Auto-Loading

**Date:** 2025-10-28
**Problem:** Skills exist but agent doesn't use them properly
**Root Cause:** Descriptions missing critical trigger keywords + "When to Use" sections

---

## The Problem

**You reported:**
> "AI agent isn't able to call them properly when asked and doesn't use the JSON prompting or best practices"

**This means:**
- ❌ Skills not auto-loading when they should
- ❌ Agent doing things manually instead of using skills
- ❌ Emily JSON methodology not being applied
- ❌ Quality framework not being used

**Root cause:** **Poor skill discovery!**

---

## From Anthropic Docs (Critical)

**Line 93 (agent-skills.md):**
> "The `description` field is **critical** for Claude to discover when to use your Skill. It should include **both what the Skill does and when Claude should use it.**"

**Line 203:**
> "Claude **autonomously decides** to use your Skill if it matches the request—you don't need to explicitly invoke it."

**The key:** Description must have **trigger keywords** that match user requests!

---

## Diagnosis of AI Image Generator Skills

### create-image Skill (Most Important)

**Current description:**
```yaml
description: Generate brand new images from text prompts using Emily's proven JSON methodology. Applies 7-pillar quality framework, intelligent tool selection (nanobanana or gpt-image-1), and professional standards. Use when workflow needs to create images from scratch for any platform.
```

**Analysis:**

**✅ Good parts:**
- Mentions "Emily's JSON methodology"
- Mentions "7-pillar quality framework"
- Says "Use when workflow needs"

**❌ Missing critical triggers:**
- Doesn't say "generate image"
- Doesn't say "create visual"
- Doesn't say "make picture"
- Doesn't mention specific platforms (Instagram, LinkedIn, YouTube)
- Says "workflow needs" (but user says "I need"!)

**User says:** "Create an Instagram post image"
**Skill triggers on:** "workflow needs to create images"
**Result:** MISMATCH! Skill doesn't load!

---

### The Fix for create-image

**Updated description:**
```yaml
description: Generate images from text prompts using Emily's JSON methodology and 7-pillar quality framework. Use when creating images, generating visuals, making graphics, designing social media posts (Instagram, LinkedIn, Twitter), YouTube thumbnails, or any image generation task. Applies proven prompting, intelligent tool selection (nanobanana/gpt-image-1), and professional quality standards.
```

**Changes:**
- ✅ Added: "creating images, generating visuals, making graphics"
- ✅ Added: Specific platforms (Instagram, LinkedIn, Twitter)
- ✅ Added: "image generation task"
- ✅ Removed: "workflow needs" (too indirect)
- ✅ Added: More trigger keywords

**Triggers:** creating, generating, making, images, visuals, graphics, Instagram, LinkedIn, Twitter, YouTube, thumbnails, social media

**Length:** 437/1024 chars (still good!)

---

### Other Skill Diagnosis

**edit-image:**
```yaml
description: Edit and refine existing images with pixel-perfect precision using nanobanana (Gemini). Best-in-class for targeted transformations (blur background, color correct, remove objects, enhance). Use when workflow needs to refine, correct, or transform existing generated or uploaded images.
```

**Problem:** "workflow needs" (too indirect!)

**Fix:**
```yaml
description: Edit and refine existing images with pixel-perfect precision using nanobanana. Use when editing images, refining visuals, correcting colors, blurring backgrounds, removing objects, enhancing photos, or transforming existing images. Best for targeted modifications without full regeneration.
```

---

**blend-images:**
```yaml
description: Compose and blend 2-3 images into unified scene using nanobanana's multi-image composition. Best for photo blending, scene reconstruction, creative mashups. Use when workflow needs to combine multiple source images into one cohesive output.
```

**Problem:** "workflow needs" again!

**Fix:**
```yaml
description: Compose and blend 2-3 images into unified scene using nanobanana. Use when combining images, blending photos, merging multiple pictures, creating photo mashups, compositing scenes, or fusing multiple visuals into one cohesive image.
```

---

## Pattern: All Skills Say "workflow needs"

**Problem:** User doesn't say "workflow needs"!

**User says:**
- "Create an image"
- "Generate a thumbnail"
- "Edit this photo"
- "Blend these images"

**Skills trigger on:**
- "workflow needs to create"
- "workflow needs to generate"
- "workflow needs to refine"

**MISMATCH!**

---

## The Solution

### Fix ALL AI Image Generator Skill Descriptions

**Remove:** "workflow needs"
**Add:** Direct action verbs users actually say

**Pattern:**
```yaml
# BAD
description: ... Use when workflow needs to {action} ...

# GOOD
description: ... Use when {action}ing, {synonym}ing, {variant}ing, or {related task} ...
```

---

### Add "When to Use" Sections

**From validation:** 6 of 8 skills missing "## When to Use" section!

**This section helps Claude understand triggers better!**

**Add to ALL skills:**
```markdown
## When to Use This Skill

Use this skill when:
- {User says this}
- {Or this}
- {Or this}

Triggers: {keyword}, {keyword}, {keyword}
```

---

## Immediate Fixes Needed

### Priority 1: create-image (CRITICAL)

**File:** `.claude/skills/ai-image-generator/create-image/SKILL.md`

**Fix description:**
```yaml
description: Generate images from text prompts using Emily's JSON methodology and 7-pillar quality framework. Use when creating images, generating visuals, making graphics, designing social media content, or any image generation task. Supports Instagram, LinkedIn, Twitter, YouTube thumbnails. Applies intelligent tool selection (nanobanana/gpt-image-1) and professional quality standards.
```

**Add section after line 10:**
```markdown
## When to Use This Skill

Use this skill when:
- Creating images from scratch
- Generating social media visuals
- Making graphics or illustrations
- Designing Instagram posts, LinkedIn content, Twitter images
- Creating YouTube thumbnails
- Any image generation task requiring Emily's JSON methodology

Triggers: create image, generate image, make image, design graphic, create visual, generate thumbnail

**Don't use for:**
- Editing existing images (use edit-image skill)
- Blending multiple images (use blend-images skill)
- Sid-specific images (use sid-ai-images skill)
```

---

### Priority 2: All Other AI Image Skills

**Apply same pattern to:**
- edit-image
- blend-images
- youtube-thumbnail-design
- linkedin-design
- platform-specs
- mcp-tool-selection
- sid-ai-images

**Changes for each:**
1. Remove "workflow needs" from description
2. Add direct action triggers
3. Add "## When to Use" section
4. Add trigger keyword list

**Effort:** 10 min per skill × 8 = 80 minutes

---

## Why This Matters

### Without Proper Triggers

**User:** "Create an Instagram post image"

**Claude thinks:**
- Scans skill descriptions
- Looks for "create" + "Instagram" + "image"
- Doesn't find match (skills say "workflow needs")
- Doesn't load create-image skill!
- Does it manually (no Emily JSON, no quality framework!)

**Result:** ❌ Skills wasted, poor quality output

---

### With Fixed Triggers

**User:** "Create an Instagram post image"

**Claude thinks:**
- Scans skill descriptions
- Finds create-image: "creating images... Instagram posts"
- **MATCH!** Auto-loads create-image skill
- Says: "Using create-image skill with Emily's JSON methodology..."
- Applies Emily JSON structure
- Uses 7-pillar quality framework
- Generates professional output

**Result:** ✅ Skills used, high quality!

---

## Testing the Fix

### Before Fix (Current State)

**Test query:**
```
Create a professional Instagram post image about AI automation
```

**Expected current behavior:**
```
Claude: "I'll create an Instagram post image...

[Manually generates without mentioning skills]
[No Emily JSON methodology applied]
[No 7-pillar evaluation]
```

**Skills not auto-loading!**

---

### After Fix (With Updated Descriptions)

**Same test query:**
```
Create a professional Instagram post image about AI automation
```

**Expected fixed behavior:**
```
Claude: "Using create-image skill with Emily's JSON methodology...

Loading video-scene.json template...
Populating JSON structure:
- scene_description
- composition_and_framing
- color_and_grade
[... Emily's process ...]

Using mcp-tool-selection skill to choose optimal tool...
Selected: nanobanana (creative, cost-effective)

Generating with nanobanana...

Evaluating with 7-pillar framework:
- Clarity: 9/10
- Technical Quality: 8/10
[... evaluation ...]

Overall: 8.5/10 - Professional quality!
```

**Skills auto-load and apply!**

---

## Complete Fix Script

### Fix All 8 Skills (80 minutes)

**For each skill:**

**1. Update description (remove "workflow needs", add triggers):**
```yaml
# Pattern
description: {what-it-does}. Use when {action1}, {action2}, {action3}, {specific-platforms}. {key-capabilities}.
```

**2. Add "When to Use" section:**
```markdown
## When to Use This Skill

Use this skill when:
- {Direct user request 1}
- {Direct user request 2}
- {Direct user request 3}
- {Platform-specific scenarios}

Triggers: {keyword}, {keyword}, {keyword}

**Don't use for:**
- {When other skill is better}
```

**3. Validate:**
```bash
node test/validate-skills.js --skill={skill-name}
```

**4. Test auto-loading:**
```
Say: "{test query}"
Expect: "Using {skill-name} skill..."
```

---

## The Real Problem

### Agent Instructions Override Skills

**From sidecar/instructions.md (710 lines):**

The agent instructions contain ALL the knowledge:
- Emily JSON methodology (lines 1-100)
- MCP tool selection (lines 12-65)
- Quality framework (lines 101-200)

**When agent runs:**
1. Loads sidecar/instructions.md (710 lines of knowledge)
2. Uses that knowledge directly
3. Never needs to load skills!
4. Skills sit unused!

**This is why skills aren't auto-loading!**

---

## The Double Fix Needed

### Fix 1: Improve Skill Descriptions (80 min)

**Make skills discoverable:**
- Better trigger keywords
- Direct action verbs
- Platform mentions
- "When to Use" sections

**This helps auto-loading!**

---

### Fix 2: Thin Agent Instructions (2 hours)

**Remove knowledge from instructions.md:**
- Delete Emily methodology (in create-image skill!)
- Delete tool selection logic (in mcp-tool-selection skill!)
- Delete quality framework (in create-image/reference!)

**Force agent to use skills:**
- "For image generation, use create-image skill"
- "For editing, use edit-image skill"
- "Skills contain all knowledge"

**This forces skill usage!**

---

## Recommended Action Plan

### Phase 1: Fix Skill Descriptions (Now - 80 min)

**Update all 8 AI Image Generator skills:**
1. create-image - Add triggers, "When to Use"
2. edit-image - Same
3. blend-images - Same
4. youtube-thumbnail-design - Same
5. linkedin-design - Same
6. platform-specs - Same
7. mcp-tool-selection - Same
8. sid-ai-images - Already has validation report!

**Result:** Skills discoverable and ready to auto-load

---

### Phase 2: Thin Agent Instructions (Next - 2 hours)

**Remove from sidecar/instructions.md:**
- Emily JSON methodology (lines 1-100)
- MCP tool guides (lines 12-65)
- Quality framework (lines 101-200)
- Platform specs (lines 201-400)

**Add:**
```markdown
## Skills Architecture

All knowledge in auto-loaded skills:
- create-image: Use for all image generation
- edit-image: Use for image editing
- blend-images: Use for composition
[... etc ...]

Reference skills, don't duplicate knowledge!
```

**Result:** Agent forces skill usage

---

### Phase 3: Test (30 min)

**Test queries:**
```
"Create an Instagram post image about AI"
→ Should auto-load create-image skill
→ Should apply Emily JSON
→ Should use 7-pillar evaluation

"Edit this image to blur the background"
→ Should auto-load edit-image skill
→ Should use nanobanana

"Blend these 3 images together"
→ Should auto-load blend-images skill
```

**Verify:** Claude mentions skill in each case!

---

## The Master's Analysis

**Your problem:** Skills not auto-loading properly

**Causes:**
1. ❌ Descriptions say "workflow needs" (users don't!)
2. ❌ Missing "When to Use" sections (poor discovery)
3. ❌ Agent instructions have ALL knowledge (doesn't need skills!)
4. ❌ Missing trigger keywords

**Solution:**
1. ✅ Fix skill descriptions (80 min)
2. ✅ Thin agent instructions (2 hours)
3. ✅ Test auto-loading (30 min)

**Total: 3.5 hours to fix**

---

Want The Master to fix the skill descriptions NOW? This will make them auto-load properly!