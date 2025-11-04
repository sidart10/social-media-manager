# Skill Reference Audit - Jarvis Workflows
**Date:** 2025-11-03
**Scope:** All 5 analyzed Jarvis workflows
**Available Skills:** content-writer, deep-web-research, research-synthesizer, profile-analysis, evidence-tracker, youtube-research

---

## Executive Summary

**Finding:** 3 of 5 workflows have **missing or inconsistent skill references**

✅ **research-topic** - Explicitly loads 2 skills correctly
❌ **competitive-analysis** - Should use profile-analysis skill (NOT referenced)
❌ **generate-ideas** - Should use research-synthesizer skill (NOT referenced)
❌ **write-posts** - Should explicitly load content-writer skill (autonomous discovery instead)
❌ **write-scripts** - Should explicitly load content-writer skill (autonomous discovery instead)

---

## Available Jarvis Skills (6 Total)

**Location:** `.claude/skills/jarvis/`

1. **content-writer** - Universal content generation (all platforms: LinkedIn, Twitter, YouTube, Instagram, Substack)
2. **deep-web-research** - Multi-tool research orchestrator (Exa, Apify, Archon, WebSearch, Firecrawl)
3. **research-synthesizer** - Synthesize multi-source findings into structured formats
4. **profile-analysis** - Analyze social media profiles across platforms
5. **evidence-tracker** - Track sources, citations, and provenance
6. **youtube-research** - YouTube-specific analysis

---

## Workflow Analysis

### 1. research-topic ✅ CORRECT

**Workflow:** `bmad/agents/content-intelligence/jarvis-sidecar/workflows/research-topic/`

**Skills Referenced:**
```xml
Line 65: <action>Load and follow {project-root}/.claude/skills/jarvis/deep-web-research/SKILL.md</action>
Line 126: <action>Load and follow {project-root}/.claude/skills/jarvis/research-synthesizer/SKILL.md</action>
```

**Status:** ✅ **EXCELLENT** - Explicitly loads skills with full path

**Pattern:**
- Hardcodes full path: `{project-root}/.claude/skills/jarvis/deep-web-research/SKILL.md`
- Does NOT use a `skills_folder` variable

**Skills Used:**
1. deep-web-research (Step 3)
2. research-synthesizer (Step 5)

**Missing:**
- No `skills_folder` variable in workflow.yaml
- Could optionally reference evidence-tracker for source tracking

---

### 2. competitive-analysis ❌ MISSING SKILL REFERENCE

**Workflow:** `bmad/agents/content-intelligence/jarvis-sidecar/workflows/competitive-analysis/`

**Current Approach:**
```xml
Line 76-78: For each profile URL in {your_profiles}:
    Analyze the profile completely...
<!-- Claude invokes profile-analysis Skill for each URL -->
```

**Problem:**
- Uses **HTML comments** to indicate skill usage: `<!-- Claude invokes profile-analysis Skill for each URL -->`
- Does NOT explicitly load the skill with `<action>Load and follow...`
- Relies on autonomous discovery (inconsistent with research-topic pattern)

**Should Be:**
```xml
<action>Load and follow {project-root}/.claude/skills/jarvis/profile-analysis/SKILL.md</action>

<action>For each profile URL in {your_profiles}:
  Execute profile analysis per SKILL.md instructions:
  - Profile URL: {url}
  - Analysis depth: comprehensive
  - Extract: content patterns, top performers, hooks, topics, formats, timing
</action>
```

**Skills It Should Use:**
1. ❌ **profile-analysis** (mentioned in comment but not loaded) - Step 2
2. ⚠️ **research-synthesizer** (could use for gap analysis synthesis) - Step 3-4

**Status:** ❌ **NEEDS FIX** - Should explicitly load profile-analysis skill

---

### 3. generate-ideas ❌ MISSING SKILL REFERENCES

**Workflow:** `bmad/agents/content-intelligence/jarvis-sidecar/workflows/generate-ideas/`

**Current Approach:**
```xml
Line 71: <action>Perform quick research on {seed_topic}...</action>
Line 75: <!-- Claude invokes social-media-research Skill automatically -->
Line 79: <!-- Claude invokes deep-web-research Skill automatically -->
Line 82: <!-- Claude invokes evidence-tracker Skill automatically -->
```

**Problem:**
- Uses **HTML comments** to indicate which skills Claude should discover
- Does NOT explicitly load any skills
- Inconsistent with research-topic pattern
- Relies on "magic" autonomous discovery

**Should Be:**
```xml
<step n="2" goal="Gather intelligence (if no research file)">
  <check if="research_loaded == false">

    <check if="use_trends == true">
      <action>Load and follow {project-root}/.claude/skills/jarvis/social-media-research/SKILL.md</action>
      <action>Get trending topics related to {seed_topic} per SKILL.md instructions</action>
    </check>

    <action>Load and follow {project-root}/.claude/skills/jarvis/deep-web-research/SKILL.md</action>
    <action>Execute quick research on {seed_topic} per SKILL.md instructions with depth=quick</action>

    <action>Load and follow {project-root}/.claude/skills/jarvis/evidence-tracker/SKILL.md</action>
    <action>Track all sources per SKILL.md instructions</action>

  </check>
</step>

<step n="4" goal="Generate Idea Cards using research-synthesizer">
  <action>Load and follow {project-root}/.claude/skills/jarvis/research-synthesizer/SKILL.md</action>

  <action>Synthesize research into {idea_count} Idea Cards per SKILL.md instructions:
    - Input: Research findings from step 2
    - Output format: Structured idea cards with hooks, outlines, evidence
    - Quality: Each card must include all 6 components (title, outline, evidence, platform, CTA, metadata)
  </action>
</step>
```

**Skills It Should Use:**
1. ❌ **deep-web-research** (mentioned in comment, not loaded) - Step 2
2. ❌ **social-media-research** (mentioned in comment, not loaded) - Step 2
3. ❌ **evidence-tracker** (mentioned in comment, not loaded) - Step 2
4. ❌ **research-synthesizer** (NOT mentioned at all, but should be used for card generation) - Step 4

**Status:** ❌ **NEEDS MAJOR FIX** - Should explicitly load 4 skills

---

### 4. write-posts ❌ INCONSISTENT PATTERN

**Workflow:** `bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-posts/`

**Current Approach:**
```xml
Line 8: <critical>This workflow triggers content-writer skill via context creation</critical>
Line 145: **Claude will autonomously discover content-writer skill**
```

**Problem:**
- Relies on "autonomous discovery" via rich context
- Has `skills_folder` variable defined but doesn't use it
- Inconsistent with research-topic explicit loading pattern

**Should Be:**
```xml
<step n="3" goal="Generate post content using content-writer skill">
  <action>Load and follow {skills_folder}/content-writer/SKILL.md</action>

  <action>Generate {platform} post per SKILL.md instructions:
    - Platform: {platform}
    - Topic: {topic}
    - Voice mode: {voice_mode}
    - Formula: {formula}
    - Reference material: {reference_file content if provided}
  </action>
</step>
```

**Skills It Should Use:**
1. ❌ **content-writer** (mentioned but relies on discovery, not explicit load) - Step 3

**Status:** ⚠️ **NEEDS IMPROVEMENT** - Should explicitly load using {skills_folder} variable

**Benefit of Fix:**
- Uses the `skills_folder` variable (eliminates bloat finding!)
- More consistent with other workflows
- More explicit and maintainable

---

### 5. write-scripts ❌ INCONSISTENT PATTERN

**Workflow:** `bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-scripts/`

**Current Approach:**
```xml
Line 8: <critical>Triggers content-writer skill (handles YouTube scripts...)</critical>
Line 66: **Claude discovers content-writer skill**
```

**Problem:** Same as write-posts - relies on autonomous discovery

**Should Be:**
```xml
<step n="2" goal="Generate script using content-writer skill">
  <action>Load and follow {skills_folder}/content-writer/SKILL.md</action>

  <action>Generate {format} YouTube script per SKILL.md instructions:
    - Format: {format}
    - Duration: {duration} minutes
    - Topic: {topic}
    - Voice: Sid's authentic (DEFAULT)
  </action>
</step>
```

**Skills It Should Use:**
1. ❌ **content-writer** (mentioned but not explicitly loaded) - Step 2

**Status:** ⚠️ **NEEDS IMPROVEMENT** - Should explicitly load using {skills_folder} variable

---

## Pattern Comparison

### ✅ GOOD Pattern (research-topic)

```xml
<action>Load and follow {project-root}/.claude/skills/jarvis/deep-web-research/SKILL.md</action>
```

**Characteristics:**
- Explicit path
- Clear instruction to "Load and follow"
- Unambiguous skill invocation

### ❌ BAD Pattern #1 (competitive-analysis, generate-ideas)

```xml
<action>Perform analysis...</action>
<!-- Claude invokes profile-analysis Skill automatically -->
```

**Problems:**
- HTML comments as implementation notes
- No explicit skill loading
- Assumes "magic" autonomous discovery
- Not following established pattern

### ❌ BAD Pattern #2 (write-posts, write-scripts)

```xml
<critical>This workflow triggers content-writer skill via context creation</critical>
...
**Claude will autonomously discover content-writer skill**
```

**Problems:**
- Relies on "rich context" for discovery
- Has `skills_folder` variable but doesn't use it
- Inconsistent with research-topic

---

## Recommended Fixes

### Priority 1: competitive-analysis (CRITICAL)

**Add explicit skill loading:**

```xml
<step n="2" goal="Analyze all profiles using profile-analysis skill">
  <action>Load and follow {project-root}/.claude/skills/jarvis/profile-analysis/SKILL.md</action>

  <action>For each profile URL in {your_profiles}:
    Execute profile analysis per SKILL.md instructions:
    - Profile URL: {url}
    - Mark as: "yours"
    - Extract: content patterns, top performers, hooks, topics, formats, timing
  </action>

  <action>For each profile URL in {competitor_profiles}:
    Execute profile analysis per SKILL.md instructions:
    - Profile URL: {url}
    - Mark as: "competitor"
    - Extract: same data as your profiles for comparison
  </action>

  <action>Track total cost across all analyses</action>
</step>
```

**Additional:**
- Add `skills_folder` variable to workflow.yaml
- Could also use research-synthesizer for step 3-4 (gap analysis)

---

### Priority 2: generate-ideas (CRITICAL)

**Add explicit skill loading for all 4 skills:**

```xml
<step n="2" goal="Gather intelligence using research skills">
  <check if="research_loaded == false">

    <check if="use_trends == true">
      <action>Load and follow {project-root}/.claude/skills/jarvis/social-media-research/SKILL.md</action>
      <action>Get trending topics per SKILL.md instructions</action>
    </check>

    <action>Load and follow {project-root}/.claude/skills/jarvis/deep-web-research/SKILL.md</action>
    <action>Execute quick research with depth=quick per SKILL.md instructions</action>

    <action>Load and follow {project-root}/.claude/skills/jarvis/evidence-tracker/SKILL.md</action>
    <action>Track sources per SKILL.md instructions</action>
  </check>
</step>

<step n="4" goal="Generate Idea Cards using research-synthesizer">
  <action>Load and follow {project-root}/.claude/skills/jarvis/research-synthesizer/SKILL.md</action>

  <action>Synthesize research into {idea_count} Idea Cards per SKILL.md instructions</action>
</step>
```

**Additional:**
- Add `skills_folder` variable to workflow.yaml
- Use variable: `{skills_folder}/deep-web-research/SKILL.md`

---

### Priority 3: write-posts & write-scripts (IMPORTANT)

**Make them consistent with research-topic pattern:**

**write-posts fix:**
```xml
<step n="3" goal="Generate post content using content-writer skill">
  <action>Load and follow {skills_folder}/content-writer/SKILL.md</action>

  <action>Generate {platform} post per SKILL.md instructions:
    - Platform: {platform}
    - Topic: {topic}
    - Voice mode: {voice_mode}
    - Formula: {formula}
    - Voice: Sid's authentic (DEFAULT from memories)
    - Reference: {reference_file} if provided
  </action>
</step>
```

**write-scripts fix:**
```xml
<step n="2" goal="Generate script using content-writer skill">
  <action>Load and follow {skills_folder}/content-writer/SKILL.md</action>

  <action>Generate {format} YouTube script per SKILL.md instructions:
    - Format: {format}
    - Duration: {duration} minutes
    - Topic: {topic}
    - Voice: Sid's authentic (DEFAULT from memories)
  </action>
</step>
```

**Benefit:** This would actually **USE** the `skills_folder` variable, eliminating the bloat issue!

---

## Summary Table

| Workflow | Should Use Skills | Currently References | Status | Fix Priority |
|----------|-------------------|---------------------|--------|--------------|
| research-topic | deep-web-research, research-synthesizer | ✅ Both explicit | ✅ CORRECT | None |
| competitive-analysis | profile-analysis, (research-synthesizer) | ❌ HTML comment only | ❌ BROKEN | HIGH |
| generate-ideas | deep-web-research, social-media-research, evidence-tracker, research-synthesizer | ❌ HTML comments only | ❌ BROKEN | HIGH |
| write-posts | content-writer | ⚠️ Autonomous discovery | ⚠️ WORKS BUT INCONSISTENT | MEDIUM |
| write-scripts | content-writer | ⚠️ Autonomous discovery | ⚠️ WORKS BUT INCONSISTENT | MEDIUM |

---

## Recommended Pattern (Standardize All Workflows)

### Option A: Use `skills_folder` Variable (More Portable)

**Add to workflow.yaml:**
```yaml
skills_folder: "{project-root}/.claude/skills/jarvis"
```

**Use in instructions.md:**
```xml
<action>Load and follow {skills_folder}/content-writer/SKILL.md</action>
```

**Pros:**
- Uses the variable (no bloat)
- More portable (can move workflows easier)
- Shorter paths in instructions

**Cons:**
- Adds dependency on variable resolution

---

### Option B: Hardcode Full Path (research-topic pattern)

**Use in instructions.md:**
```xml
<action>Load and follow {project-root}/.claude/skills/jarvis/deep-web-research/SKILL.md</action>
```

**Pros:**
- Explicit and unambiguous
- Matches research-topic pattern exactly
- No variable dependency

**Cons:**
- Longer paths
- Less portable
- `skills_folder` variable becomes actual bloat

---

## My Recommendation

**Use Option A (skills_folder variable) for consistency:**

1. **Keep `skills_folder` in write-posts & write-scripts** (already defined)
2. **Add `skills_folder` to competitive-analysis & generate-ideas**
3. **Update all 4 workflows** to use: `{skills_folder}/{skill-name}/SKILL.md`
4. **Keep research-topic as-is** (already working with explicit paths)

**Rationale:**
- Eliminates bloat (variable gets used!)
- More consistent across workflows
- Easier to maintain (change skills location once)
- More portable (workflows can move modules)

---

## Implementation Plan

### Phase 1: Fix competitive-analysis

**File:** `competitive-analysis/workflow.yaml`
```yaml
# Add after output_folder:
skills_folder: "{project-root}/.claude/skills/jarvis"
```

**File:** `competitive-analysis/instructions.md` (Line 75-89)
```xml
<step n="2" goal="Analyze all profiles using profile-analysis skill">
  <action>Load and follow {skills_folder}/profile-analysis/SKILL.md</action>

  <action>For each profile URL in {your_profiles}:
    Execute profile analysis per SKILL.md instructions:
    - Profile URL: {url}
    - Mark as: "yours"
    - Extract: content patterns, top performers, hooks, topics, formats, timing
  </action>

  <action>For each profile URL in {competitor_profiles}:
    Execute profile analysis per SKILL.md instructions:
    - Profile URL: {url}
    - Mark as: "competitor"
    - Extract: same data for comparison
  </action>

  <action>Track total cost across all analyses</action>
</step>
```

---

### Phase 2: Fix generate-ideas

**File:** `generate-ideas/workflow.yaml`
```yaml
# Add after output_folder:
skills_folder: "{project-root}/.claude/skills/jarvis"
```

**File:** `generate-ideas/instructions.md` (Lines 69-91, 114-143)

**Step 2 fix:**
```xml
<step n="2" goal="Gather intelligence using research skills">
  <check if="research_loaded == false">

    <check if="use_trends == true">
      <action>Load and follow {skills_folder}/social-media-research/SKILL.md</action>
      <action>Get trending topics per SKILL.md instructions</action>
    </check>

    <action>Load and follow {skills_folder}/deep-web-research/SKILL.md</action>
    <action>Execute quick research with depth=quick per SKILL.md instructions</action>

    <action>Load and follow {skills_folder}/evidence-tracker/SKILL.md</action>
    <action>Track sources per SKILL.md instructions</action>
  </check>
</step>
```

**Step 4 fix (new step for research-synthesizer):**
```xml
<step n="4" goal="Generate Idea Cards using research-synthesizer skill">
  <action>Load and follow {skills_folder}/research-synthesizer/SKILL.md</action>

  <action>Synthesize research into {idea_count} Idea Cards per SKILL.md instructions:
    - Input: Research findings from step 2, competitor gaps from step 3
    - Structure: Title, Hook, Outline (3-7 beats), Evidence, Platform recommendation, CTA, Metadata
    - Quality: Specific (not generic), evidence-backed, platform-optimized
  </action>
</step>
```

---

### Phase 3: Fix write-posts & write-scripts (Already have skills_folder!)

**File:** `write-posts/instructions.md` (Line 117-120)
```xml
<step n="3" goal="Generate post content using content-writer skill">
  <action>Load and follow {skills_folder}/content-writer/SKILL.md</action>

  <action>Generate {platform} post per SKILL.md instructions with parameters:
    - Platform: {platform}
    - Topic: {topic}
    - Voice mode: {voice_mode}
    - Formula: {formula}
    - Voice: Sid's authentic (DEFAULT)
    - Reference: {reference_file} if provided
  </action>
</step>
```

**File:** `write-scripts/instructions.md` (Line 43-46)
```xml
<step n="2" goal="Generate script using content-writer skill">
  <action>Load and follow {skills_folder}/content-writer/SKILL.md</action>

  <action>Generate {format} YouTube script per SKILL.md instructions with parameters:
    - Format: {format}
    - Duration: {duration} minutes
    - Topic: {topic}
    - Voice: Sid's authentic (DEFAULT)
  </action>
</step>
```

---

## Benefits of Standardization

### Before Fixes:
- ❌ Inconsistent skill invocation (3 different patterns)
- ❌ HTML comments as implementation hints
- ❌ "Magic" autonomous discovery
- ❌ Unused `skills_folder` variable (bloat)

### After Fixes:
- ✅ Consistent pattern across all workflows
- ✅ Explicit skill loading (no guessing)
- ✅ `skills_folder` variable used (no bloat!)
- ✅ Maintainable (change skills location once)
- ✅ Self-documenting (clear what skills are used)

---

## Impact Summary

**Files to modify:** 6
- competitive-analysis/workflow.yaml (+1 line)
- competitive-analysis/instructions.md (~10 line restructure)
- generate-ideas/workflow.yaml (+1 line)
- generate-ideas/instructions.md (~20 line restructure)
- write-posts/instructions.md (~5 line restructure)
- write-scripts/instructions.md (~5 line restructure)

**Total effort:** 20-30 minutes

**Risk:** LOW (making implicit explicit, not changing behavior)

**Benefit:**
- Eliminates bloat from write-posts/write-scripts
- Makes all workflows consistent
- Fixes broken skill references in competitive-analysis and generate-ideas

---

**Ready to apply these fixes?**
