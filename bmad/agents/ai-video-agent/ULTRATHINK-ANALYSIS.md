# AI Video Agent ULTRATHINK Analysis

**Date**: October 25, 2025
**Analysis Type**: Deep Implementation Review

---

## 🔍 EXECUTIVE SUMMARY

### Overall Status: ⚠️ **PARTIALLY IMPLEMENTED - NEEDS CRITICAL UPDATES**

**Current State**: The AI Video Agent has excellent architecture and documentation, BUT the workflows are using **outdated MCP tool names** and **not leveraging the enhanced prompting system** we just built.

**Risk Level**: 🔴 HIGH - Workflows will fail when executed because tool names don't match actual MCP servers.

---

## 📊 DETAILED FINDINGS

### ✅ **What's GOOD (Working)**

1. **MCP Servers Connected** ✓
   - HeyGen: ✓ Connected
   - Veo3: ✓ Connected
   - Sora2: ✓ Connected
   - All tools available and functional

2. **Agent Architecture** ✓
   - Well-structured `ai-video-agent.agent.yaml`
   - Clear menu commands
   - Good persona definition
   - Critical actions documented

3. **Sidecar Resources** ✓
   - `config.yaml` - Updated with smart routing
   - `instructions.md` - Enhanced with Virtual Film Producer
   - `platform-specs.yaml` - Complete platform data
   - `video-prompting-templates.yaml` - NEW comprehensive templates
   - Your avatar/voice IDs configured

4. **Documentation** ✓
   - README.md is clear and comprehensive
   - UPGRADE-SUMMARY.md documents improvements
   - File structure is organized

---

### ❌ **What's BROKEN (Critical Issues)**

#### **ISSUE #1: WRONG MCP TOOL NAMES** 🔴 CRITICAL

**Location**: All workflow instruction files

**Problem**: Workflows reference tools that DON'T EXIST:

```yaml
# What workflows say:
mcp__veo__video_story_generate     ❌ DOES NOT EXIST
mcp__veo__video_story_status       ❌ DOES NOT EXIST

# What actually exists:
mcp__veo3__generate_video          ✅ CORRECT
mcp__veo3__generate_video_from_image ✅ CORRECT
mcp__veo3__list_generated_videos   ✅ CORRECT
mcp__veo3__get_video_info          ✅ CORRECT
```

**Impact**: **ALL scene generation workflows will fail immediately**

**Files Affected**:

- `workflows/scene-generation-instructions.md` (lines 109, 122)
- `workflows/generate-scene.yaml`
- Potentially others

---

#### **ISSUE #2: NOT USING SORA 2 AT ALL** 🟡 HIGH PRIORITY

**Problem**: Despite having Sora 2 MCP connected and configured, ZERO workflows use it.

**What's Missing**:

- No Sora 2 generation workflows
- No smart routing logic (Veo vs Sora2)
- No video merging workflows (Sora2's `merge_videos`)
- No fade animation workflows (Sora2's `create_fade_animation`)

**Impact**: Missing premium cinematic quality option, can't merge videos, can't use 12s duration

---

#### **ISSUE #3: ENHANCED PROMPTING NOT INTEGRATED** 🟡 HIGH PRIORITY

**Problem**: We created comprehensive `video-prompting-templates.yaml` with Virtual Film Producer methodology, but NO workflows use it.

**What Workflows Should Do**:

```
User input: "city at sunset"

Workflow should:
1. Load video-prompting-templates.yaml
2. Apply Virtual Film Producer structure
3. Enhance to: "[Scene] | [Camera] | [Lighting] | [Color] | [Technical]"
4. Generate with enhanced prompt
```

**What Workflows Actually Do**:

```
User input: "city at sunset"

Workflow:
1. Pass directly to Veo with no enhancement
2. Get mediocre results
```

**Impact**: Subpar video quality, not using professional filmmaking techniques

---

#### **ISSUE #4: NO ASPECT RATIO PARAMETER** 🟡 MEDIUM PRIORITY

**Problem**: Workflows don't pass aspect ratio to Veo 3, even though we confirmed it supports 9:16 and 16:9.

**Current Code** (scene-generation-instructions.md):

```markdown
<action>- aspectRatio: {aspect_ratio}</action>
```

**Problem**: This is just documentation, not actual tool invocation. The real Veo3 MCP tool doesn't have an `aspectRatio` parameter—the aspect ratio must be specified **in the prompt text** or we need to check if there's a different parameter name.

**Impact**: All Veo3 videos default to 16:9, even when user requests 9:16 vertical

---

#### **ISSUE #5: IMAGE-TO-VIDEO WORKFLOW MISSING** 🟠 MEDIUM

**Problem**: We have `mcp__veo3__generate_video_from_image` and `mcp__sora2__create_fade_animation` tools, but no workflows use them.

**Missing Workflows**:

- Animate user's photo
- Create parallax effects
- Bring static images to life

**Impact**: Can't use your face photo from earlier request

---

#### **ISSUE #6: MONTAGE/HYBRID WORKFLOWS ARE STUBS** 🟠 MEDIUM

**Problem**: `generate-montage.yaml` and `generate-hybrid.yaml` exist but instructions are incomplete.

**Current State**:

- Files exist
- Instructions are partial
- No actual MCP tool calls
- No merge logic

**Impact**: Can't combine talking head + b-roll, can't create sequences

---

### ⚠️ **What's INCOMPLETE (Medium Priority)**

1. **Platform Quick Commands**
   - `reels`, `youtube-short`, `tiktok`, `youtube` workflows exist
   - But they don't implement smart routing
   - Don't use enhanced prompting
   - Reference wrong tool names

2. **Test Hooks Workflow**
   - `test-hooks.yaml` exists
   - Instructions incomplete
   - No A/B testing logic

3. **Setup Avatars Workflow**
   - `setup-avatars.yaml` exists
   - Basic functionality only
   - No consent artifact management

---

## 🎯 ROOT CAUSE ANALYSIS

### Why This Happened:

1. **MCP Server Evolution**: The original design used a custom "veo-mcp-server" with different tool names. When we switched to the official `mcp-veo3` server, tool names changed, but workflows weren't updated.

2. **Sora 2 Added Later**: Workflows were built before Sora 2 MCP was available. Now it's connected but not integrated.

3. **Enhanced Prompting Added Last**: The Virtual Film Producer methodology and templates were created today but aren't wired into workflows.

4. **Image-to-Video Discovered Late**: We just found the `generate_video_from_image` capabilities during testing.

---

## 📋 REQUIRED FIXES (Priority Order)

### 🔴 **CRITICAL (DO FIRST)**

#### Fix #1: Update All MCP Tool Names

**Files to Update**:

- `workflows/scene-generation-instructions.md`
- Any other workflows calling Veo tools

**Changes**:

```markdown
# OLD (BROKEN):

mcp**veo**video_story_generate
mcp**veo**video_story_status

# NEW (CORRECT):

mcp**veo3**generate_video

# Note: Veo3 generate_video is BLOCKING - no separate status call needed
```

**Verification**: Grep all workflow files for `mcp__veo__` and replace with `mcp__veo3__`

---

#### Fix #2: Determine Veo 3 Aspect Ratio Method

**Problem**: We confirmed Veo 3 supports 9:16 and 16:9, but unclear how to specify it.

**Options to Test**:

1. **In prompt text**: "Shot in 9:16 vertical format"
2. **Separate parameter**: Check MCP tool signature for `aspect_ratio` or `size` parameter
3. **Model variant**: Different model names for different ratios?

**Action**: Test Veo3 generation with explicit aspect ratio request

---

### 🟡 **HIGH PRIORITY (DO NEXT)**

#### Fix #3: Integrate Sora 2 Routing

**Files to Create/Update**:

- Update `scene-generation-instructions.md` to ask: "Fast (Veo) or Cinematic (Sora2)?"
- Create `workflows/generate-scene-sora2-instructions.md`
- Wire smart routing logic from `config.yaml`

**Logic**:

```
IF user says "cinematic" OR "high-quality" OR "premium":
  → Route to Sora 2 (mcp__sora2__create_video)
ELSE:
  → Route to Veo 3 (mcp__veo3__generate_video)
```

---

#### Fix #4: Integrate Enhanced Prompting

**Files to Update**:

- All generation workflows

**Add to Each Workflow**:

```markdown
<step n="X" goal="Enhance Prompt">
<action>Load {agent-folder}/ai-video-agent-sidecar/video-prompting-templates.yaml</action>
<action>Apply Virtual Film Producer structure:</action>
<action>- Scene Description: {user_input}</action>
<action>- Camera Movement: Suggest based on scene type</action>
<action>- Lighting: Suggest based on mood</action>
<action>- Color & Tone: Suggest based on platform</action>
<action>- Technical Format: Set based on platform aspect ratio</action>

<action>Enhanced prompt: "[Scene] | [Camera] | [Lighting] | [Color] | [Technical]"</action>

<ask>Use enhanced prompt or keep original? [enhanced/original]</ask>
</step>
```

---

#### Fix #5: Build Video Merge Workflow

**File to Create**: `workflows/merge-videos-instructions.md`

**Flow**:

1. List generated videos (Veo3, Sora2, HeyGen)
2. User selects which to merge
3. Use `mcp__sora2__merge_videos`
4. Deliver merged result

**Use Case**: Talking head + b-roll, or multiple scenes sequenced

---

### 🟠 **MEDIUM PRIORITY (Do After Critical)**

#### Fix #6: Build Image-to-Video Workflows

**Files to Create**:

- `workflows/animate-image-veo3-instructions.md` (Veo3 image-to-video)
- `workflows/animate-image-sora2-instructions.md` (Sora2 fade animation)

**Veo3 Flow**:

```
1. User provides image path
2. Ask: "What motion?" (dolly-in, pan, parallax, etc.)
3. Build enhanced prompt: "[Motion] | [Cinematic Enhancement] | [Technical]"
4. Call mcp__veo3__generate_video_from_image
5. Deliver result
```

**Sora2 Flow**:

```
1. User provides image path
2. Ask: "Fade type?" (in, out, in-out)
3. Ask: "Duration?" (default 3s)
4. Call mcp__sora2__create_fade_animation
5. Deliver result
```

---

#### Fix #7: Complete Montage/Hybrid Workflows

**Files to Update**:

- `workflows/montage-instructions.md`
- `workflows/hybrid-instructions.md`

**Add Real Logic**:

- Use Sora2 merge_videos for stitching
- Use Sora2 create_fade_animation for transitions
- Sequence multiple clips properly

---

#### Fix #8: Wire Platform Quick Commands

**Files to Update**:

- `workflows/reels-instructions.md`
- `workflows/youtube-short-instructions.md`
- `workflows/tiktok-instructions.md`
- `workflows/youtube-instructions.md`

**Ensure Each**:

1. Loads correct platform specs
2. Uses enhanced prompting
3. Implements smart routing (Veo vs Sora2)
4. Has correct tool names
5. Saves metadata properly

---

### 🟢 **LOW PRIORITY (Polish)**

#### Fix #9: Implement Test Hooks

**File**: `workflows/test-hooks-instructions.md`

**Logic**:

1. User provides base script
2. Generate 3 variations with different hooks
3. Use HeyGen for all 3
4. Deliver for A/B testing

---

#### Fix #10: Enhance Setup Avatars

**File**: `workflows/setup-avatars-instructions.md`

**Add**:

- Consent artifact storage
- Voice matching recommendations
- Preview avatar samples

---

## 🔧 TECHNICAL SPECIFICATIONS

### Correct MCP Tool Signatures

#### HeyGen Tools:

```
mcp__heygen__get_avatar_groups()
mcp__heygen__get_avatars_in_avatar_group(group_id)
mcp__heygen__get_voices()  # Large response
mcp__heygen__generate_avatar_video(avatar_id, voice_id, input_text, title)
mcp__heygen__get_avatar_video_status(video_id)
mcp__heygen__get_remaining_credits()
```

#### Veo 3 Tools:

```
mcp__veo3__generate_video(prompt, model='veo-3.0-generate-preview')
mcp__veo3__generate_video_from_image(prompt, image_path, model='veo-3.0-generate-preview')
mcp__veo3__list_generated_videos(output_dir=None)
mcp__veo3__get_video_info(video_path)
```

**Important**: `generate_video` is BLOCKING - no separate status polling needed

#### Sora 2 Tools:

```
mcp__sora2__create_video(prompt, model='sora-2', size='1280x720', seconds='8')
mcp__sora2__get_video_status(video_id)
mcp__sora2__list_videos(limit=20, after=None)
mcp__sora2__delete_video(video_id)
mcp__sora2__merge_videos(video_urls, output_path='merged_video.mp4')
mcp__sora2__create_fade_animation(image_path, duration=3, fade_type='in', output_path='fade_animation.mp4')
```

**Important**: `create_video` returns video_id, then poll with `get_video_status`

---

## 📊 IMPLEMENTATION SCORECARD

| Component                      | Status       | Score | Notes                       |
| ------------------------------ | ------------ | ----- | --------------------------- |
| **MCP Servers**                | ✅ Connected | 10/10 | All 3 servers working       |
| **Agent Definition**           | ✅ Good      | 9/10  | Well-structured             |
| **Configuration**              | ✅ Updated   | 9/10  | Smart routing added         |
| **Instructions**               | ✅ Enhanced  | 9/10  | Virtual Film Producer added |
| **Templates**                  | ✅ Created   | 10/10 | Comprehensive prompting     |
| **Workflows - Tool Names**     | ❌ Broken    | 2/10  | Wrong MCP tool names        |
| **Workflows - Sora2**          | ❌ Missing   | 0/10  | Not integrated              |
| **Workflows - Prompting**      | ❌ Missing   | 1/10  | Not using templates         |
| **Workflows - Merging**        | ❌ Stub      | 2/10  | Not implemented             |
| **Workflows - Image-to-Video** | ❌ Missing   | 0/10  | Not built                   |
| **Platform Commands**          | ⚠️ Partial   | 4/10  | Exist but incomplete        |
| **Documentation**              | ✅ Good      | 8/10  | Clear and organized         |

**Overall Score**: **5.4/10** - Good foundation, critical execution gaps

---

## 🎯 RECOMMENDED ACTION PLAN

### Phase 1: **CRITICAL FIXES** (1-2 hours)

1. ✅ Fix all MCP tool names (grep & replace)
2. ✅ Test Veo3 aspect ratio specification
3. ✅ Update scene generation workflow with correct tools
4. ✅ Test end-to-end scene generation

**Success Criteria**: Can generate a Veo3 video from agent menu

---

### Phase 2: **SORA 2 INTEGRATION** (2-3 hours)

1. ✅ Create Sora2 scene generation workflow
2. ✅ Implement smart routing (Veo vs Sora2)
3. ✅ Create video merge workflow
4. ✅ Test end-to-end Sora2 generation + merge

**Success Criteria**: Can generate cinematic Sora2 video and merge with Veo3 b-roll

---

### Phase 3: **ENHANCED PROMPTING** (2-3 hours)

1. ✅ Wire video-prompting-templates.yaml into workflows
2. ✅ Add prompt enhancement step to all generation workflows
3. ✅ Test with basic input → enhanced output
4. ✅ Compare quality with/without enhancement

**Success Criteria**: Basic prompts auto-enhance with Virtual Film Producer structure

---

### Phase 4: **IMAGE-TO-VIDEO** (1-2 hours)

1. ✅ Build Veo3 image-to-video workflow
2. ✅ Build Sora2 fade animation workflow
3. ✅ Test with your face photo
4. ✅ Integrate into menu

**Success Criteria**: Can animate user's photo with motion or fade

---

### Phase 5: **PLATFORM COMMANDS** (2-3 hours)

1. ✅ Update all platform quick commands
2. ✅ Ensure smart routing works
3. ✅ Add enhanced prompting
4. ✅ Test each platform command end-to-end

**Success Criteria**: Can use *reels, *youtube-short, \*tiktok commands successfully

---

### Phase 6: **POLISH** (2-3 hours)

1. ✅ Complete montage/hybrid workflows
2. ✅ Implement test-hooks workflow
3. ✅ Enhance setup-avatars workflow
4. ✅ Final testing across all commands

**Success Criteria**: All menu items functional

---

## 🚨 IMMEDIATE NEXT STEPS

### What To Do RIGHT NOW:

1. **Fix MCP Tool Names** (15 minutes)

   ```bash
   # Find all broken references
   grep -r "mcp__veo__" workflows/

   # Replace with correct names
   sed -i 's/mcp__veo__video_story_generate/mcp__veo3__generate_video/g' workflows/*.md
   sed -i 's/mcp__veo__video_story_status//g' workflows/*.md  # Remove, not needed
   ```

2. **Test Veo3 Aspect Ratio** (10 minutes)
   - Generate 9:16 video with explicit prompt: "Shot in 9:16 vertical format"
   - Check if it actually generates vertical
   - If not, investigate MCP tool parameters

3. **Create Sora2 Workflow** (30 minutes)
   - Copy `scene-generation-instructions.md`
   - Modify to use `mcp__sora2__create_video`
   - Add polling with `mcp__sora2__get_video_status`
   - Test end-to-end

4. **Wire Enhanced Prompting** (30 minutes)
   - Add prompt enhancement step to scene generation
   - Test with basic input
   - Verify quality improvement

**Total Time to Minimum Viable**: ~90 minutes

---

## 💡 RECOMMENDATIONS

### Architecture Improvements:

1. **Centralized Tool Router**
   - Create `workflows/lib/route-provider.md`
   - Logic: User request → Best provider
   - Called by all workflows

2. **Shared Prompt Enhancer**
   - Create `workflows/lib/enhance-prompt.md`
   - Load templates
   - Apply Virtual Film Producer
   - Called by all generation workflows

3. **Metadata Standards**
   - Ensure all workflows save consistent JSON
   - Include provider, cost, settings, timestamps
   - Enable tracking and analytics

4. **Testing Harness**
   - Create `workflows/test-all-workflows.md`
   - Runs through each workflow
   - Validates outputs
   - Catches regressions

---

## ✅ VALIDATION CHECKLIST

Before marking as "COMPLETE":

### Critical Functionality:

- [ ] Can generate HeyGen talking head (with correct avatar/voice)
- [ ] Can generate Veo3 scene (text-to-video)
- [ ] Can generate Sora2 scene (text-to-video)
- [ ] Can generate 9:16 vertical video
- [ ] Can generate 16:9 horizontal video
- [ ] Can merge multiple videos
- [ ] Can animate static image

### Enhanced Features:

- [ ] Smart routing works (Veo vs Sora2)
- [ ] Enhanced prompting applies Virtual Film Producer
- [ ] Platform quick commands work (*reels, *tiktok, etc.)
- [ ] Cost estimation shows before generation
- [ ] Metadata saves with every video

### Quality:

- [ ] No MCP tool name errors
- [ ] All workflows complete successfully
- [ ] Generated videos match requested specs
- [ ] Enhanced prompts produce better quality

---

## 📈 SUCCESS METRICS

**Before Fixes**:

- Workflows: 0% functional (wrong tool names)
- MCP Integration: 30% (servers connected, not used properly)
- Enhanced Prompting: 0% (not integrated)
- Overall: **Broken**

**After Fixes**:

- Workflows: 100% functional
- MCP Integration: 90% (all tools properly used)
- Enhanced Prompting: 95% (automated enhancement)
- Overall: **Production Ready**

---

## 🎬 CONCLUSION

**Current State**: The AI Video Agent has **excellent architecture** but **broken execution**. It's like having a Ferrari with the wrong fuel—all the pieces are there, but they don't work together yet.

**Good News**: All fixes are **mechanical updates**, not architectural changes. The hard design work is done.

**Estimated Time to Fix**: **6-10 hours** spread across 6 phases

**Priority**: 🔴 **HIGH** - This agent is a core capability for social media content generation. Should be prioritized.

**Next Action**: Execute Phase 1 (Critical Fixes) immediately.

---

**Ready to fix this and make it production-ready?** 🚀
