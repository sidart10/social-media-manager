# Refactoring Impact Analysis - Thin Workflows + Rich Skills

**Date:** 2025-10-28
**Question:** "Would we have to change every single agent's instructions?"
**Answer:** YES - But it's WORTH IT. Here's the full scope.

---

## TL;DR

**Files to update:** 11 instruction.md files (5,817 total lines)
**Estimated reduction:** ~40-60% less lines (remove knowledge, keep orchestration)
**Impact:** Every workflow that references skills
**Benefit:** Clearer code, portable skills, zero duplication

**Your concern is valid** - this is significant work!

**But:** The payoff is HUGE architectural improvement.

---

## Complete Scope

### Files That Need Updates

**Found:** 11 instruction.md files across all agents

#### 1. Jarvis Workflows (7 files)

```
bmad/agents/content-intelligence/jarvis-sidecar/workflows/
├── write-posts/instructions.md            ← HIGH PRIORITY (has knowledge duplication)
├── write-scripts/instructions.md          ← HIGH PRIORITY (has knowledge duplication)
├── research-topic/instructions.md         ← MEDIUM PRIORITY
├── learn-voice/instructions.md            ← LOW PRIORITY (mostly orchestration)
├── generate-ideas/instructions.md         ← MEDIUM PRIORITY
├── analyze-profile/instructions.md        ← LOW PRIORITY
└── competitive-analysis/instructions.md   ← LOW PRIORITY
```

#### 2. Agent-Level Instructions (4 files)

```
bmad/agents/
├── content-intelligence/jarvis-sidecar/instructions.md      ← Agent-level (references workflows)
├── ai-image-generator/ai-image-generator-sidecar/instructions.md
├── ai-video-agent/ai-video-agent-sidecar/instructions.md
└── social-posting-agent/social-posting-agent-sidecar/instructions.md
```

**Total:** 11 files, 5,817 lines

---

## Impact by File (Line Counts)

```
=== write-posts/instructions.md ===
~639 lines
Knowledge content: ~300 lines (50%)
  - Platform formatting specs (LinkedIn 150-300 words, etc.)
  - Creator methodology details (Justin Welsh PAIPS explained)
  - Emoji usage rules
  - Hashtag strategies
Target after refactor: ~350 lines (just orchestration)

=== write-scripts/instructions.md ===
~734 lines
Knowledge content: ~400 lines (55%)
  - Timing calculations explained
  - Visual direction details
  - Production complexity guides
  - Platform-specific pacing rules
Target after refactor: ~350 lines (just orchestration)

=== research-topic/instructions.md ===
~222 lines
Knowledge content: ~80 lines (35%)
  - Research synthesis methodology
  - Content angle types
  - Finding categorization rules
Target after refactor: ~150 lines

=== generate-ideas/instructions.md ===
~Estimated 300 lines
Knowledge content: ~100 lines (33%)
  - Idea card structure
  - Validation criteria
Target after refactor: ~200 lines

=== learn-voice/instructions.md ===
~Estimated 200 lines
Knowledge content: ~50 lines (25%)
  - Already mostly orchestration!
Target after refactor: ~150 lines

=== analyze-profile/instructions.md ===
~Estimated 250 lines
Knowledge content: ~80 lines (30%)
Target after refactor: ~170 lines

=== competitive-analysis/instructions.md ===
~Estimated 200 lines
Knowledge content: ~60 lines (30%)
Target after refactor: ~140 lines

TOTAL REDUCTION: ~1,000-1,500 lines of knowledge → moved to skills!
```

---

## What Changes in Each File

### Type 1: Remove Knowledge Duplication

**Current (in workflow):**
```xml
<action>Generate LinkedIn post using Justin Welsh PAIPS:
  - Problem: Identify core challenge (explain what this means)
  - Agitate: Amplify pain point (explain how to do this)
  - Invalidate: Dismiss old solutions (explain techniques)
  - Promise: Introduce new approach (explain framing)
  - Solve: Deliver solution (explain structure)

  Hook guidelines:
  - First 140 chars visible
  - Must scroll-stop
  - Professional tone
  - Can include 1 emoji

  Body structure:
  - Aim for 150-300 words
  - Can go to 3000 if needed
  - Use line breaks
  - Bullet points for lists
  - Inject evidence naturally

  [... 150 more lines of detailed formatting ...]
</action>
```

**After (reference skill):**
```xml
<action>Use post-writer skill (model-invoked, auto-loaded):
  Pass context:
  - Topic: {idea_card.title}
  - Platform: {target_platform}
  - Voice: {loaded_voice_profile}
  - Research: {research_brief}

  Skill automatically:
  - Selects appropriate format (PAIPS, Top 5, etc.)
  - Applies creator methodology
  - Generates platform-optimized post

  Store result: {generated_post}
</action>
```

**Knowledge moved to post-writer/SKILL.md!**

---

### Type 2: Update "Invoke" to "Use"

**Current (confusing):**
```xml
<action>Invoke post-writer Skill:</action>
```

**After (clear):**
```xml
<action>Use post-writer skill (model-invoked, auto-loaded):</action>
```

OR

```xml
<action>Apply post-writer skill methodologies:</action>
```

**Clarifies no manual invocation needed!**

---

### Type 3: Add Auto-Loading Notes

**Add to each skill reference:**
```xml
<note>The {skill-name} skill is model-invoked - Claude automatically loads
it when the task matches its description. No manual invocation needed.</note>
```

**Helps future developers understand!**

---

## Priority Matrix

### HIGH PRIORITY (Do First)

**Impact:** Highest knowledge duplication
**Benefit:** Most clarity gained
**Effort:** Medium (2-3 hours each)

1. **write-posts/instructions.md** (639 lines → ~350)
   - Remove platform formatting specs
   - Remove creator methodology details
   - Keep orchestration logic

2. **write-scripts/instructions.md** (734 lines → ~350)
   - Remove timing calculation details
   - Remove visual direction guides
   - Keep step coordination

**Estimated effort:** 4-6 hours total
**Benefit:** 60-70% of knowledge duplication eliminated

---

### MEDIUM PRIORITY (Do Second)

**Impact:** Moderate duplication
**Benefit:** Good clarity gains
**Effort:** Low (1 hour each)

3. **research-topic/instructions.md** (222 lines → ~150)
4. **generate-ideas/instructions.md** (~300 → ~200)
5. **analyze-profile/instructions.md** (~250 → ~170)
6. **competitive-analysis/instructions.md** (~200 → ~140)

**Estimated effort:** 4 hours total
**Benefit:** 25% of knowledge duplication eliminated

---

### LOW PRIORITY (Do Last)

**Impact:** Minimal duplication (already mostly orchestration)
**Benefit:** Consistency
**Effort:** Minimal (30 min each)

7. **learn-voice/instructions.md** (~200 → ~150)

**Estimated effort:** 30 minutes
**Benefit:** 5% of duplication, mostly consistency improvements

---

### AGENT-LEVEL (Update References)

**Impact:** Indirect (reference workflow changes)
**Benefit:** Documentation accuracy
**Effort:** Minimal (review + update descriptions)

8. **jarvis-sidecar/instructions.md** - Update workflow descriptions
9. **ai-image-generator-sidecar/instructions.md** - Update skill references
10. **ai-video-agent-sidecar/instructions.md** - Update workflow descriptions
11. **social-posting-agent-sidecar/instructions.md** - Update handoff expectations

**Estimated effort:** 2 hours total

---

## Total Refactoring Effort

**Total files:** 11
**Total current lines:** ~5,817
**Total after refactor:** ~3,500-4,000 lines
**Lines moved to skills:** ~1,500-2,000

**Time estimate:**
- High priority: 4-6 hours
- Medium priority: 4 hours
- Low priority: 30 min
- Agent-level: 2 hours
- **TOTAL: 10-13 hours work**

---

## Phased Rollout Plan

### Phase 1: Proof of Concept (2 hours)

**Goal:** Validate approach with ONE workflow

**Task:** Refactor write-posts/instructions.md
- Remove knowledge details
- Reference post-writer skill
- Keep orchestration
- Test end-to-end
- Verify nothing broken

**Success criteria:**
- Workflow ~45% shorter
- Skills auto-load correctly
- Full functionality preserved
- Handoff packages still created

**Decision point:** If Phase 1 works, continue. If issues, reassess.

---

### Phase 2: High Priority (4 hours)

**Goal:** Eliminate major knowledge duplication

**Tasks:**
1. ✅ write-posts (already done in Phase 1)
2. Refactor write-scripts/instructions.md

**Success criteria:**
- Both workflows thin
- video-script-writer skill enriched
- Ali Abdaal/MKBHD knowledge in skill only
- Workflows just orchestrate

---

### Phase 3: Medium Priority (4 hours)

**Goal:** Clean up remaining workflows

**Tasks:**
3. research-topic/instructions.md
4. generate-ideas/instructions.md
5. analyze-profile/instructions.md
6. competitive-analysis/instructions.md

**Success criteria:**
- All knowledge in skills
- Workflows pure orchestration
- Consistent pattern across all

---

### Phase 4: Polish & Documentation (3 hours)

**Goal:** Update agent instructions and docs

**Tasks:**
7. Update jarvis-sidecar/instructions.md
8. Update ai-image-generator-sidecar/instructions.md
9. Update ai-video-agent-sidecar/instructions.md
10. Update social-posting-agent-sidecar/instructions.md
11. Update all workflow documentation

---

## Breaking Down the Changes

### Per-File Refactoring Template

**For each workflow instructions.md:**

#### Step 1: Identify Knowledge Sections

**Look for:**
- Detailed methodology explanations
- Platform specification details
- Best practice guidelines
- Format/structure examples
- "How to write X" instructions

**Mark:** These move to skills

---

#### Step 2: Identify Orchestration Sections

**Look for:**
- Step sequencing (Step 1 → 2 → 3)
- State loading (load voice, load idea card)
- User interaction (ask, check if)
- Conditional logic (if platform X then Y)
- File I/O (save to, create handoff)
- Validation calls (tool invocations)

**Mark:** These stay in workflow

---

#### Step 3: Extract Knowledge to Skill

**Create or update corresponding skill:**

**For write-posts:**
- Target skill: post-writer/SKILL.md
- Extract: Platform specs, creator methodologies, formatting rules
- Organize: Into skill's structure
- Reference: From workflow

---

#### Step 4: Simplify Workflow

**Replace knowledge blocks:**

**From:**
```xml
<action>Generate LinkedIn post:
  [300 lines of detailed instructions]
</action>
```

**To:**
```xml
<action>Use post-writer skill (model-invoked):
  Context: {idea_card}, {voice_profile}, {platform}
  Skill generates platform-optimized post
  Store: {generated_post}
</action>
```

---

#### Step 5: Add Skill References

**Add notes explaining auto-loading:**
```xml
<note>The post-writer skill is model-invoked. Claude automatically loads
it when detecting social post tasks. All creator methodologies (Justin Welsh,
Greg Isenberg) are in the skill.</note>
```

---

#### Step 6: Test

**Verify:**
- Skill auto-loads
- Workflow executes correctly
- Full functionality preserved
- Outputs match expected format
- Nothing broken

---

## Example: write-posts Refactoring

### Current State Analysis

**File:** write-posts/instructions.md
**Lines:** 639
**Structure:**
```
Step 0: Load voice (62 lines) - Orchestration ✅
Step 1: Load idea card (23 lines) - Orchestration ✅
Step 2: Generate content (139 lines) - KNOWLEDGE! ❌
Step 3: Review (23 lines) - Orchestration ✅
Step 4: Platform formatting (346 lines!) - KNOWLEDGE! ❌
Step 5: Hook variants (27 lines) - Orchestration ✅
Step 6: Handoff package (59 lines) - Orchestration ✅
Step 7: Present (18 lines) - Orchestration ✅
```

**Knowledge sections:** Step 2 (139 lines) + Step 4 (346 lines) = **485 lines**

---

### After Refactoring

**Target:** ~350 lines (45% reduction)

**Step 2 (was 139, now ~20):**
```xml
<step n="2" goal="Generate content using post-writer skill">
  <note>post-writer skill auto-loads for social post tasks.
  Contains all creator methodologies.</note>

  <action>Use post-writer skill:
    Pass context: {idea_card}, {voice_profile}, {target_platform}
    Skill applies appropriate formula (PAIPS, Top 5, Greg Isenberg)
    Returns platform-optimized post
    Store: {generated_post}
  </action>
</step>
```

**Step 4 (was 346, now ~80):**
```xml
<step n="4" goal="Apply platform-specific formatting">
  <note>Platform specs are in post-writer and platform-formatter skills.</note>

  <action>Use platform-formatter skill:
    Input: {generated_post}, {target_platform}
    Skill applies platform-specific formatting
    Returns: Formatted post with metadata
  </action>

  <action>Validate using platform API clients:
    LinkedIn: linkedin_api_client/lib/formatter
    Twitter: twitter_api_client/lib/validator
  </action>

  <action>Store: {formatted_post}, {metadata}</action>
</step>
```

**Knowledge moved to skills, workflow just coordinates!**

---

## Skills That Need Enrichment

### Currently Rich (Ready to Use)

✅ **post-writer** - Has Justin Welsh, Greg Isenberg
✅ **video-script-writer** - Has Ali Abdaal, MKBHD
✅ **youtube-thumbnail-mastery** - Has MrBeast, Thomas Frank
✅ **youtube-growth-mastery** - Has Paddy Galloway
✅ **deep-web-research** - Has tool orchestration

---

### Need Enrichment (Accept Workflow Knowledge)

**platform-formatter** - Should contain:
- All platform specifications (from write-posts Step 4)
  - LinkedIn: 150-300 words, hook <140 chars, hashtags 3-5
  - Twitter: Long-form <25K, threads 7 tweets, hashtags 2-5
  - Instagram: Caption 600-1200 chars, hook <125, hashtags 5-10
  - Substack: 800-1500 words, newsletter format
- Formatting rules for each
- Validation requirements
- Character count limits

**Source:** Extract from write-posts/instructions.md lines 198-544

---

**voice-matcher** - Should contain:
- Voice extraction techniques (from learn-voice workflow)
- Analysis methodologies
- Signature phrase identification
- Tone scoring algorithms

**Source:** Extract from learn-voice/instructions.md

---

**research-synthesizer** - Should contain:
- 5 category organization (trends, data, examples, quotes, gaps)
- Source quality scoring
- Evidence organization methods
- Content angle generation techniques

**Source:** Extract from research-topic/instructions.md

---

**evidence-tracker** - Should contain:
- Citation formatting
- Source attribution methods
- Reference management

**Source:** Extract from multiple workflows

---

## Change Propagation Map

### When You Change a Workflow

**Direct impact:**
- Workflow's instructions.md updates
- Referenced skill(s) may need enrichment

**Indirect impact:**
- Agent menu descriptions (if workflow description changes)
- Handoff packages (if output structure changes)
- Downstream workflows (if they depend on this workflow's output)

**Example:** Refactor write-posts

**Direct:**
- write-posts/instructions.md (simplified)
- post-writer/SKILL.md (enriched with extracted knowledge)
- platform-formatter/SKILL.md (enriched with platform specs)

**Indirect:**
- jarvis-sidecar/instructions.md (menu description may update)
- social-posting-agent (handoff JSON structure stays same, no change)
- generate-ideas workflow (may reference write-posts for previews)

---

## Risk Analysis

### High Risk Areas

**State Management Dependencies:**
- Voice profile loaded in Step 0, used in Steps 2, 3, 4
- Idea card loaded in Step 1, used in Steps 2, 5, 6
- Generated content from Step 2, used in Steps 3, 4, 5, 6, 7

**Risk:** If we over-simplify, these dependencies could break

**Mitigation:** Carefully maintain state passing between steps

---

**User Interaction Flows:**
- Ask questions at specific checkpoints
- Branch based on user answers
- Pause/resume workflows

**Risk:** Skills can't handle this, must stay in workflow

**Mitigation:** Keep ALL user interaction in workflows

---

**File I/O Patterns:**
- Specific output locations
- Naming conventions
- Handoff JSON structure
- Template population

**Risk:** Skills don't know where to save things

**Mitigation:** Keep ALL file I/O in workflows

---

### Low Risk Areas

**Knowledge extraction:**
- Creator methodologies → Skills
- Best practices → Skills
- Platform specs → Skills
- Proven formulas → Skills

**Risk:** Minimal (just moving text)

**Mitigation:** Test after each move

---

## Recommended Approach

### DON'T Do Big Bang Refactor

**Bad approach:**
```
Day 1: Update all 11 files
Day 2: Fix all broken things
Day 3: Still fixing...
```

**Problems:**
- Too many changes at once
- Hard to debug what broke
- Risk of breaking working system
- Can't roll back easily

---

### DO Incremental Refactoring

**Good approach:**
```
Week 1: Refactor write-posts ONLY
  - Test thoroughly
  - Verify works
  - Document pattern

Week 2: Refactor write-scripts using same pattern
  - Apply lessons from Week 1
  - Test thoroughly
  - Refine pattern

Week 3: Refactor research-topic + generate-ideas
  - Pattern proven
  - Faster execution
  - Less risk

Week 4: Refactor remaining workflows
  - Clean up
  - Polish
  - Document
```

**Benefits:**
- Learn from each iteration
- Can roll back if issues
- Lower risk
- Proven pattern before scaling

---

## What Stays Exactly the Same

### No Changes Needed To:

**Agents (slash commands):**
- /jarvis still works
- /ai-video-agent still works
- /social-posting-agent still works
- Menu structure unchanged

**Skills (auto-loaded):**
- Still in .claude/skills/
- Still auto-load
- Still model-invoked
- Just MORE knowledge added

**Workflow.yaml files:**
- Step structure same
- YAML format same
- Execution engine unchanged

**Output structure:**
- Handoff JSONs same format
- File organization same
- Downstream agents unaffected

---

### Only Changes:

**instructions.md files:**
- Less knowledge details
- More skill references
- Clearer orchestration
- Same functionality!

---

## Testing Strategy

### After Each Workflow Refactor

**Test checklist:**

1. **Skill auto-loads?**
   - Run workflow
   - Claude should say "Using [skill-name] skill..."
   - If not, check skill description

2. **Full functionality?**
   - All steps execute
   - State passes correctly
   - User interaction works
   - Outputs created properly
   - Handoffs have correct structure

3. **Knowledge applied?**
   - Content follows creator methodologies
   - Platform specs respected
   - Best practices evident in output
   - Quality matches or exceeds previous

4. **Integration works?**
   - Downstream agents accept handoffs
   - File formats correct
   - Nothing broken in pipeline

---

## The Master's Recommendation

### YES - Refactor, But Incrementally

**Don't deprecate workflows!** They're essential for:
- State management
- User interaction
- Orchestration
- File I/O

**DO refactor workflows** to be thinner:
- Extract knowledge to skills
- Keep orchestration in workflows
- Clear separation of concerns

---

### Recommended Schedule

**This Week (Proof of Concept):**
- Day 1: Refactor write-posts/instructions.md
- Day 2: Test thoroughly, document pattern
- Day 3: Refactor write-scripts/instructions.md
- Day 4: Test, refine pattern

**Next Week (Scale Pattern):**
- Refactor medium-priority workflows
- Apply proven pattern
- Test each one

**Week 3 (Polish):**
- Refactor low-priority workflows
- Update agent-level instructions
- Complete documentation
- Final testing

**Total time:** ~15 hours over 3 weeks
**Benefit:** Much clearer architecture, portable skills, zero duplication

---

## Alternative: Do Nothing

**If we keep current state:**

**Pros:**
- No refactoring effort
- System works as-is
- No risk of breaking things

**Cons:**
- ❌ Knowledge duplication (workflows + skills)
- ❌ Workflows too complex (639 lines!)
- ❌ Skills underutilized
- ❌ Confusion about responsibilities
- ❌ Hard to share skills (mixed with workflow logic)
- ❌ Technical debt accumulates

**The Master's opinion:** Current state works but isn't optimal

---

## Answer to Your Question

**"Would we have to change every single agent's instructions?"**

**YES - But strategically:**

**Workflow instructions:** 7 files need refactoring (high/medium priority)
**Agent instructions:** 4 files need description updates (low effort)

**Total effort:** 10-15 hours
**Total benefit:** Much cleaner architecture

**Worth it?** Absolutely!

**But:** Do it incrementally, not big bang
**Start:** One workflow (write-posts)
**Prove:** Pattern works
**Scale:** Apply to rest

---

## What You Get After Refactoring

### Before

```
Workflows: 5,817 lines (mixed orchestration + knowledge)
Skills: Rich knowledge but duplicated in workflows
Confusion: Where does knowledge live?
```

### After

```
Workflows: ~3,500 lines (pure orchestration)
Skills: All knowledge consolidated
Clarity: Clean separation of concerns
```

**Benefits:**
- ✅ Portable skills (can share/upload)
- ✅ Simpler workflows (easier to understand)
- ✅ Zero duplication (single source of truth)
- ✅ Easier maintenance (update skill, all workflows benefit)
- ✅ Better auto-loading (skills richer, trigger more reliably)

---

## The Master's Vote

**Question:** Deprecate workflows?
**Answer:** NO

**Question:** Refactor workflows to be thinner?
**Answer:** YES!

**Recommendation:** Incremental refactoring starting with write-posts

**Estimated effort:** 10-15 hours total
**Estimated benefit:** 40% cleaner code, 100% clearer architecture

**Worth it?** Absolutely!

---

**Files created:**
- ✅ docs/REFACTORING-IMPACT-ANALYSIS.md (this file)
- ✅ docs/WORKFLOWS-VS-SKILLS-DECISION.md (architectural analysis)

**Ready to start Phase 1 proof of concept?**
