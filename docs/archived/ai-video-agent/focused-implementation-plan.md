# AI Video Agent - FOCUSED Implementation Plan

**Created**: October 25, 2025
**Strategy**: Core 3 Workflows First, Then Expand
**Total Estimated Time**: 3-4 hours

---

## 🎯 SIMPLIFIED SCOPE

### Core Workflows (KEEP - Must Work Perfectly)

1. **Talking Head** (`generate-talking-head.yaml` + `talking-head-instructions.md`)
2. **Scene Generation** (`generate-scene.yaml` + `scene-generation-instructions.md`)
3. **Setup Avatars** (`setup-avatars.yaml` + `setup-avatars-instructions.md`)

### Removed (Build Later After Core Works)

- ~~Reels~~ (will recreate as enhanced wrapper around core)
- ~~YouTube Short~~ (will recreate)
- ~~YouTube~~ (will recreate)
- ~~TikTok~~ (will recreate)
- ~~Hybrid~~ (will add after merge feature)
- ~~Montage~~ (will add after fade feature)
- ~~Test Hooks~~ (will add for A/B testing)

**Philosophy**: Get 3 workflows production-ready, then expand methodically.

---

## 📊 CURRENT STATE (After Cleanup)

### Directory Structure (Clean)

```
ai-video-agent/
├── ai-video-agent.agent.yaml (UPDATED - simplified menu)
├── ai-video-agent-sidecar/
│   ├── config.yaml (5.6K - smart routing configured)
│   ├── instructions.md (15K - Virtual Film Producer added)
│   ├── platform-specs.yaml (2.9K - complete)
│   ├── video-prompting-templates.yaml (18K - comprehensive)
│   ├── consent/ (empty - for avatar consent artifacts)
│   └── outputs/
│       └── veo3/ (5 test videos - 15MB proof it works)
└── workflows/
    ├── generate-talking-head.yaml
    ├── talking-head-instructions.md (212 lines) ✅
    ├── generate-scene.yaml
    ├── scene-generation-instructions.md (182 lines) ❌ NEEDS FIXES
    ├── setup-avatars.yaml
    └── setup-avatars-instructions.md (39 lines) ⚠️ BASIC
```

**6 files total** (was 21 files)

---

## 🔍 CORE WORKFLOW ANALYSIS

### Workflow #1: Talking Head (COMPLETE ✅)

**File**: `talking-head-instructions.md` (212 lines)

**Status**: **95% PRODUCTION READY**

**What Works**:

- ✅ Full 8-step workflow
- ✅ Correct MCP tool names (all HeyGen tools)
- ✅ Platform specs loading
- ✅ Avatar/voice selection
- ✅ Script with hook timing
- ✅ Captions ON by default
- ✅ Cost estimation
- ✅ Video generation with polling
- ✅ Metadata saving
- ✅ Error handling

**MCP Tools Used** (ALL CORRECT):

```markdown
Line 26: mcp**heygen**list_avatars ✅
Line 31: mcp**heygen**list_voices ✅
Line 119: mcp**heygen**create_avatar_video ✅
Line 134: mcp**heygen**check_video_status ✅
```

**Minor Issues**:

- ⚠️ Uses generic `list_avatars` instead of `get_avatar_groups` + `get_avatars_in_avatar_group`
- ⚠️ Doesn't use config defaults (avatar/voice IDs)

**Fixes Needed**: (15 mins)

- [ ] Update to use default avatar/voice IDs from config
- [ ] Skip selection if defaults exist, just confirm

---

### Workflow #2: Scene Generation (BROKEN ❌)

**File**: `scene-generation-instructions.md` (182 lines)

**Status**: **40% BROKEN - CRITICAL FIXES REQUIRED**

**What's Good**:

- ✅ Good 8-step structure
- ✅ Platform specs loading
- ✅ Prompt crafting guidance
- ✅ Quality vs speed choice
- ✅ Resolution selection
- ✅ Cost estimation

**What's BROKEN**:

```markdown
Line 109: mcp**veo**video_story_generate ❌ DOESN'T EXIST
Line 122: mcp**veo**video_story_status ❌ DOESN'T EXIST
```

**Should Be**:

```markdown
Line 109: mcp**veo3**generate_video ✅
Line 122: REMOVE (Veo3 is blocking, no separate status call) ✅
```

**Missing**:

- ❌ No Sora2 integration (only Veo3)
- ❌ No smart routing between providers
- ❌ No enhanced prompting (Virtual Film Producer)
- ❌ Aspect ratio not passed to tool

**Fixes Needed**: (90 mins)

1. Fix MCP tool names
2. Add Sora2 path
3. Implement smart routing
4. Wire enhanced prompting
5. Solve aspect ratio specification

---

### Workflow #3: Setup Avatars (BASIC ⚠️)

**File**: `setup-avatars-instructions.md` (39 lines)

**Status**: **60% BASIC - NEEDS ENHANCEMENT**

**What Works**:

- ✅ Correct MCP tools

```markdown
Line 6: mcp**heygen**get_avatar_groups ✅
Line 9: mcp**heygen**get_avatars_in_avatar_group ✅
```

**What's Missing**:

- ⚠️ No consent artifact storage
- ⚠️ No voice matching
- ⚠️ No config file updates
- ⚠️ Very basic (only 39 lines)

**Fixes Needed**: (30 mins)

- [ ] Add consent verification UI
- [ ] Save consent artifacts to `consent/` folder
- [ ] Auto-match voices to avatars
- [ ] Update config.yaml with selected defaults
- [ ] Add preview/test generation

---

## 📋 3-PHASE FOCUSED PLAN

---

### **PHASE 1: FIX CRITICAL ISSUES** (Est. 1.5 hours) 🔴

**Goal**: Make all 3 core workflows functional

#### Task 1.1: Fix Scene Generation Tool Names (30 mins)

**File**: `workflows/scene-generation-instructions.md`

**Changes Required**:

1. **Line 109**: Replace broken tool call

   ```markdown
   # OLD:

   <action>Call MCP tool: mcp**veo**video_story_generate with parameters</action>

   # NEW:

   <action>Call MCP tool: mcp**veo3**generate_video</action>
   <action>Params: prompt={scene_prompt}, model={model_choice}</action>
   <action>NOTE: This is a BLOCKING call - returns video_path directly when complete</action>
   ```

2. **Lines 119-142**: Remove/replace polling logic

   ```markdown
   # DELETE ENTIRE SECTION (Lines 119-142) - Veo3 doesn't need polling

   # REPLACE WITH:

   <action>Wait for generation to complete (60-90 seconds)...</action>
   <action>Receive response: {video_path, filename, model, prompt, generation_time, file_size, aspect_ratio}</action>

   <check if="video_path exists">
     <action>Display: "✅ Scene generated!"</action>
     <action>Display: "📁 Video saved: {video_path}"</action>
     <action>Display: "⏱️ Generated in {generation_time} seconds"</action>
   </check>

   <check if="error in response">
     <action>Display: "❌ Generation failed: {error}"</action>
     <ask>Retry with revised prompt? [y/n]</ask>
     <check if="retry == 'y'">
       <goto step="2"/>
     </check>
   </check>
   ```

3. **Aspect Ratio Investigation**:
   - [ ] Test: Does `mcp__veo3__generate_video` accept `aspect_ratio` parameter?
   - [ ] Test: Include "Shot in 9:16 vertical format" in prompt
   - [ ] Document working method
   - [ ] Update workflow with solution

4. **Metadata Update** (Step 8):

   ```markdown
   # Update metadata structure:

   - video_url → video_path (Veo3 returns local path, not URL)
   - job_id → REMOVE (Veo3 doesn't use job IDs)
   - Add: file_size, generation_time (from Veo3 response)
   ```

**Testing**:

- [ ] Generate 16:9 scene with Veo3
- [ ] Generate 9:16 scene with Veo3
- [ ] Verify aspect ratio correct
- [ ] Check metadata saved

---

#### Task 1.2: Update Talking Head with Config Defaults (15 mins)

**File**: `workflows/talking-head-instructions.md`

**Enhancement**: Auto-use your Sid Dani avatar/voice

**Changes**:

1. **Step 2**: Add config check

   ```markdown
   <step n="2" goal="Avatar & Voice Selection">
   <action>Load config from {config_source}</action>
   <action>Check for default_avatar_id and default_voice_id</action>

   <check if="defaults exist">
     <action>Display: "Using your configured avatar: Sid Dani"</action>
     <action>Display: "Using your configured voice: Sid Dani cloned voice"</action>
     <ask response="use_defaults">Use defaults? [y/n]</ask>

     <check if="use_defaults == 'y'">
       <action>Set selected_avatar_id = default_avatar_id</action>
       <action>Set selected_voice_id = default_voice_id</action>
       <goto step="3"/>
     </check>
   </check>

   # If no defaults or user wants to choose:

   <action>Call MCP tool: mcp**heygen**get_avatar_groups</action>
   <action>Display available avatars...</action>

   # ... rest of existing logic

   </step>
   ```

**Testing**:

- [ ] Generate talking head (should auto-use Sid Dani)
- [ ] Confirm correct avatar/voice used
- [ ] Test manual selection path

---

#### Task 1.3: Enhance Setup Avatars Workflow (30 mins)

**File**: `workflows/setup-avatars-instructions.md`

**Expand from 39 lines to ~80 lines**

**Add**:

1. **Consent Verification**:

   ```markdown
   <step n="3" goal="Verify Consent">
   <action>For each selected avatar:</action>
   <ask response="consent_verified">Do you have consent/ownership for avatar '{avatar_name}'? [y/n]</ask>

   <check if="consent_verified == 'y'">
     <action>Create consent artifact: consent/{avatar_id}_consent.json</action>
     <action>Include: avatar_id, avatar_name, consent_date, verified_by</action>
   </check>

   <check if="consent_verified == 'n'">
     <action>Display: "⚠️ Cannot use this avatar without consent. Skipping."</action>
   </check>
   </step>
   ```

2. **Save to Config**:

   ```markdown
   <step n="4" goal="Save Defaults">
   <ask response="selected_default_avatar">Which avatar as default?</ask>
   <ask response="selected_default_voice">Which voice as default?</ask>

   <action>Update config.yaml:</action>
   <action> providers.heygen.default_avatar_id = {selected_default_avatar}</action>
   <action> providers.heygen.default_voice_id = {selected_default_voice}</action>

   <action>Display: "✅ Defaults saved to config"</action>
   </step>
   ```

**Testing**:

- [ ] Run setup-avatars workflow
- [ ] Verify consent artifacts saved
- [ ] Verify config.yaml updated
- [ ] Test defaults work in talking head workflow

---

#### Task 1.4: Validation Testing (15 mins)

**Run End-to-End Tests**:

1. **Test Talking Head**:

   ```
   Input: "Test script about AI for 30 seconds"
   Expected: Video generated with Sid Dani avatar/voice
   ```

2. **Test Scene Generation (Veo3)**:

   ```
   Input: "Futuristic city at night" for 16:9
   Expected: Video generated in landscape format
   ```

3. **Test Scene Generation (9:16)**:
   ```
   Input: "Tech office" for 9:16 vertical
   Expected: Video generated in vertical format
   ```

**Success Criteria**:

- ✅ No MCP tool errors
- ✅ Videos generate successfully
- ✅ Correct aspect ratios
- ✅ Metadata saves properly

**Deliverable**: 3 working core workflows

---

### **PHASE 2: SORA 2 INTEGRATION** (Est. 1 hour) 🟡

**Goal**: Add cinematic quality option to scene generation

#### Task 2.1: Add Sora2 to Scene Generation (45 mins)

**File**: `workflows/scene-generation-instructions.md`

**Insert New Step After Platform Selection**:

```markdown
<step n="2" goal="Quality Level Selection">
<action>Explain provider options:</action>
<action>1. Veo 3 - Fast generation (~60-90s), standard quality, good for b-roll</action>
<action>2. Sora 2 - Cinematic quality (~2-5 min), premium, includes C2PA watermark</action>

<ask response="quality_level">Choose provider: [veo3/sora2]</ask>

<check if="quality_level == 'sora2' OR user_prompt contains 'cinematic|premium|high-quality'">
  <action>Set provider = 'sora2'</action>
  <action>Set model = 'sora-2'</action>

<action>Ask platform from previous step to determine size:</action>
<check if="aspect_ratio == '9:16'">
<ask response="sora_size">Vertical size? [720x1280/1024x1792]</ask>
</check>
<check if="aspect_ratio == '16:9'">
<ask response="sora_size">Horizontal size? [1280x720/1792x1024]</ask>
</check>

<ask response="sora_duration">Duration? [4s/8s/12s]</ask>

<action>Set use_sora2 = true</action>
<goto step="3"/>
</check>

<check if="quality_level == 'veo3'">
  <action>Set provider = 'veo3'</action>
  <action>Continue with existing Veo3 workflow</action>
</check>

<template-output>provider, quality_level, sora_size, sora_duration</template-output>
</step>
```

**Update Generation Step**:

```markdown
<step n="6" goal="Generate Video">

<check if="provider == 'veo3'">
  <!-- Existing Veo3 logic with FIXED tool names -->
  <action>Call MCP tool: mcp__veo3__generate_video</action>
  <action>Params: prompt={final_prompt}, model={model_choice}</action>
  <action>Receive: {video_path, filename, generation_time, file_size, aspect_ratio}</action>
  <action>Display: "✅ Video generated: {video_path}"</action>
</check>

<check if="provider == 'sora2'">
  <action>Call MCP tool: mcp__sora2__create_video</action>
  <action>Params: prompt={final_prompt}, model='sora-2', size={sora_size}, seconds={sora_duration}</action>
  <action>Receive: {video_id}</action>
  <action>Display: "Sora 2 generation queued. Video ID: {video_id}"</action>

  <!-- Polling logic -->

<action>Poll every 10 seconds with mcp**sora2**get_video_status({video_id})</action>
<action>Display progress: "{progress}% complete"</action>

  <check if="status == 'completed'">
    <action>Get video URL from response data</action>
    <action>Download video to outputs/sora2/ folder</action>
    <action>Display: "✅ Cinematic video ready! (C2PA watermark present)"</action>
  </check>
</check>

<template-output>video_path_or_url, provider_used, generation_time</template-output>
</step>
```

**Testing**:

- [ ] Generate Veo3 scene (fast path)
- [ ] Generate Sora2 scene (cinematic path)
- [ ] Verify quality difference
- [ ] Confirm watermark on Sora2

---

#### Task 2.2: Smart Routing Keywords (15 mins)

**Auto-detect quality level from user input**:

```markdown
<step n="2" goal="Quality Level Detection">
<action>Analyze user's original request for keywords:</action>

<check if="user_request contains 'cinematic|premium|high-quality|hero shot|epic'">
  <action>Auto-set provider = 'sora2'</action>
  <action>Display: "Detected cinematic quality request - routing to Sora 2"</action>
  <ask>Confirm Sora 2 (premium, ~$1-2 cost)? [y/n]</ask>
  <check if="confirmed == 'n'">
    <action>Set provider = 'veo3'</action>
  </check>
</check>

<check if="user_request contains 'fast|quick|draft|b-roll'">
  <action>Auto-set provider = 'veo3'</action>
  <action>Display: "Routing to Veo 3 for fast generation"</action>
</check>

<check if="no keywords matched">
  <ask response="quality_level">Quality: [veo3-fast / sora2-cinematic]</ask>
</check>
</step>
```

**Testing**:

- [ ] Test: "Create CINEMATIC city video" → Routes to Sora2
- [ ] Test: "Create FAST office video" → Routes to Veo3
- [ ] Test: "Create city video" → Asks user

---

### **PHASE 3: ENHANCED PROMPTING** (Est. 1 hour) 🟡

**Goal**: Wire Virtual Film Producer into scene generation

#### Task 3.1: Add Prompt Enhancement Step (45 mins)

**File**: `workflows/scene-generation-instructions.md`

**Insert After User Provides Prompt** (after current step 2):

```markdown
<step n="3" goal="Enhance Prompt with Virtual Film Producer">
<action>Load {agent-folder}/ai-video-agent-sidecar/video-prompting-templates.yaml</action>

<action>Analyze user prompt: "{scene_prompt}"</action>
<action>Check if already enhanced (contains camera/lighting/technical terms)</action>

<check if="prompt is basic (< 50 words, no '|' separators)">
  <action>Display: "I can enhance your prompt with professional filmmaking terminology..."</action>

<action>Build enhanced prompt using Virtual Film Producer structure:</action>
<action>1. Scene Description: {scene_prompt}</action>
<action>2. Camera Movement: [Auto-suggest]</action>
<action> - Static scenes → Slow dolly-in or crane shot</action>
<action> - Action scenes → Tracking shot or handheld</action>
<action> - Product/object → Slow orbit or push-in</action>
<action>3. Lighting: [Auto-suggest based on scene]</action>
<action> - Outdoor day → Natural sunlight, golden hour</action>
<action> - Indoor → Three-point lighting, soft diffused</action>
<action> - Night/dark → Low-key, dramatic backlight</action>
<action> - Tech/futuristic → Neon accents, volumetric light</action>
<action>4. Color & Tone: [Auto-suggest based on platform]</action>
<action> - Social media (9:16) → Vibrant, teal & orange, high contrast</action>
<action> - YouTube (16:9) → Cinematic, desaturated, film grain</action>
<action>5. Technical Format:</action>
<action> - Lens: 35mm or 50mm prime</action>
<action> - Aspect ratio: {aspect_ratio} from platform</action>
<action> - Quality: 1080p HD or 4K photorealistic</action>

<action>Enhanced prompt:</action>
<action>"{scene_prompt} | {camera_movement} | {lighting} | {color_tone} | {technical_format}"</action>

<action>Display BEFORE and AFTER:</action>
<action>ORIGINAL: {scene_prompt}</action>
<action>ENHANCED: {enhanced_prompt}</action>

<ask response="use_enhancement">Use enhanced prompt? [y/n/edit]</ask>

  <check if="use_enhancement == 'y'">
    <action>Set final_prompt = enhanced_prompt</action>
  </check>

  <check if="use_enhancement == 'edit'">
    <ask response="custom_changes">What to change in enhanced prompt?</ask>
    <action>Apply modifications to enhanced_prompt</action>
    <action>Set final_prompt = modified_prompt</action>
  </check>

  <check if="use_enhancement == 'n'">
    <action>Set final_prompt = scene_prompt</action>
  </check>
</check>

<check if="prompt is already enhanced">
  <action>Display: "Prompt looks detailed already - using as-is"</action>
  <action>Set final_prompt = scene_prompt</action>
</check>

<template-output>final_prompt, enhancement_applied</template-output>
</step>
```

**Renumber subsequent steps** (+1 to all step numbers)

**Testing**:

- [ ] Input: "city at sunset" → Should offer enhancement
- [ ] Verify enhanced prompt has all 5 components
- [ ] Generate video with enhanced prompt
- [ ] Compare quality vs basic prompt

---

#### Task 3.2: Create Example Enhancements (15 mins)

**Add to Scene Generation Workflow** (reference section):

```markdown
<reference section="Enhancement Examples">

Example 1: Basic → Enhanced
BASIC: "city at sunset"
ENHANCED: "City skyline at golden hour with sun setting behind skyscrapers, warm orange light reflecting off glass buildings | Slow crane shot rising from street level to reveal full skyline, smooth and majestic | Golden hour backlight with warm side-lighting on buildings, creating dramatic silhouettes | Warm orange and teal color grading with high contrast and subtle film grain | Shot on 35mm lens in 16:9 aspect ratio, 1080p HD photorealistic"

Example 2: Vertical Social Media
BASIC: "person coding at desk"
ENHANCED: "Close-up of hands typing code on laptop, blue screen glow illuminating face in dark room, modern tech aesthetic | Slow push-in from medium shot to extreme close-up on fingers, steady and professional | Low-key lighting with cyan screen glow as key light, cool blue tones | Teal and orange color grade with desaturated background and high contrast | Shot on 50mm prime lens in 9:16 vertical format for social media, 1080p"

Example 3: Cinematic Landscape
BASIC: "mountain landscape"
ENHANCED: "Vast mountain range at dawn with mist rolling through valleys, lone pine silhouette in foreground | Slow dolly-forward revealing layers of mountains with parallax effect, epic and serene | Soft morning backlight creating rim effect on mist, volumetric light rays | Desaturated cool blue palette with subtle warm highlights, heavy film grain for organic feel | Shot on 35mm lens in cinematic 21:9 aspect ratio, 4K photorealistic"

</reference>
```

---

### **PHASE 4: VALIDATION & DOCUMENTATION** (Est. 30 mins) 🟢

**Goal**: Ensure everything works, document the system

#### Task 4.1: Complete End-to-End Testing (20 mins)

**Test Matrix**:

| Test                        | Input                    | Expected Output            | Pass/Fail |
| --------------------------- | ------------------------ | -------------------------- | --------- |
| **Talking Head - Auto**     | "Test script"            | Uses Sid Dani avatar/voice | [ ]       |
| **Talking Head - Custom**   | Choose different avatar  | Uses selected avatar       | [ ]       |
| **Scene Veo3 - 16:9**       | "City scene" for YouTube | 16:9 landscape video       | [ ]       |
| **Scene Veo3 - 9:16**       | "Tech scene" for Reels   | 9:16 vertical video        | [ ]       |
| **Scene Sora2 - Cinematic** | "CINEMATIC mountain"     | Premium quality, watermark | [ ]       |
| **Enhanced Prompting**      | "sunset" → Enhanced      | 5-component prompt         | [ ]       |
| **Setup Avatars**           | Configure defaults       | Config updated             | [ ]       |
| **Queue Status**            | Check all jobs           | Shows Veo3 + Sora2 jobs    | [ ]       |

**Document Results**: Pass/fail for each test

---

#### Task 4.2: Update Implementation Plan (10 mins)

- [ ] Mark Phase 1-3 as complete
- [ ] Update success metrics
- [ ] Document any issues found
- [ ] Create "What's Next" section for Phase 2 expansion

---

## 📊 SIMPLIFIED SUCCESS METRICS

### Current State (After Cleanup):

- **Workflows Total**: 3 (was 10)
- **Workflows Functional**: 1/3 (33%)
- **MCP Tool Names**: 50% correct (Talking Head ✓, Scene ❌)
- **Enhanced Prompting**: 0% integrated
- **Sora2 Integration**: 0%

### After Phase 1 (Critical Fixes):

- **Workflows Functional**: 3/3 (100%) ✅
- **MCP Tool Names**: 100% correct ✅
- **Enhanced Prompting**: 0%
- **Sora2 Integration**: 0%

### After Phase 2 (Sora2):

- **Workflows Functional**: 3/3 (100%) ✅
- **MCP Tool Names**: 100% correct ✅
- **Enhanced Prompting**: 0%
- **Sora2 Integration**: 100% ✅
- **Smart Routing**: 100% ✅

### After Phase 3 (Enhanced Prompting):

- **Workflows Functional**: 3/3 (100%) ✅
- **MCP Tool Names**: 100% correct ✅
- **Enhanced Prompting**: 100% ✅
- **Sora2 Integration**: 100% ✅
- **Smart Routing**: 100% ✅
- **Overall**: **95% PRODUCTION READY** ✅

---

## 🎯 EXECUTION TIMELINE

### **Sprint Approach** (3-4 hours, one session)

**Hour 1**: Phase 1 Tasks 1.1 + 1.2

- Fix scene generation tool names
- Update talking head with defaults
- Test both workflows

**Hour 2**: Phase 1 Tasks 1.3 + 1.4 + Phase 2 Task 2.1

- Enhance setup avatars
- Validate core workflows
- Start Sora2 integration

**Hour 3**: Phase 2 Task 2.2 + Phase 3 Task 3.1

- Complete Sora2 smart routing
- Integrate enhanced prompting

**Hour 4**: Phase 3 Task 3.2 + Phase 4

- Add enhancement examples
- Complete end-to-end testing
- Final documentation

**Result**: Production-ready core system

---

### **Incremental Approach** (3 sessions)

**Session 1 (90 mins)**: Phase 1 Complete

- All critical fixes
- 3 working workflows
- No MCP errors

**Session 2 (60 mins)**: Phase 2 Complete

- Sora2 integrated
- Smart routing working

**Session 3 (60 mins)**: Phase 3 + Phase 4

- Enhanced prompting
- Full validation
- Production ready

---

## 🔧 TECHNICAL CHECKLIST

### Correct Tool Signatures (Reference)

#### HeyGen (Working ✅):

```
mcp__heygen__get_avatar_groups()
mcp__heygen__get_avatars_in_avatar_group(group_id)
mcp__heygen__get_voices()
mcp__heygen__generate_avatar_video(avatar_id, voice_id, input_text, title)
mcp__heygen__get_avatar_video_status(video_id)
```

#### Veo 3 (Need to Fix ❌):

```
mcp__veo3__generate_video(prompt, model)
# Returns: {video_path, filename, generation_time, file_size, aspect_ratio}
# BLOCKING CALL - no polling needed
# Aspect ratio: TBD (investigate in Phase 1)
```

#### Sora 2 (To Integrate 🟡):

```
mcp__sora2__create_video(prompt, model, size, seconds)
# Returns: {video_id, status: 'queued'}
# MUST POLL with get_video_status

mcp__sora2__get_video_status(video_id)
# Returns: {status, progress, video_url (when complete)}
# Poll until status == 'completed'

mcp__sora2__list_videos(limit, after)
# For queue-status command
```

---

## 🎬 FUTURE EXPANSION (After Core Works)

Once Phases 1-3 complete, we can add:

### Phase 5: Platform Wrappers (2 hours)

- Create `*reels` - wrapper around scene generation with Instagram specs
- Create `*youtube-short` - wrapper with YouTube Short specs
- Create `*tiktok` - wrapper with TikTok specs

### Phase 6: Advanced Features (3 hours)

- Image-to-video workflows (Veo3, Sora2 fade)
- Video merging (Sora2 merge_videos)
- Hybrid multi-source videos
- A/B hook testing

### Phase 7: Polish & Production (2 hours)

- Webhook support
- Batch generation
- Cost tracking dashboard
- Analytics integration

**Total Future Work**: ~7 hours (when ready)

---

## ✅ IMMEDIATE NEXT STEPS

**RIGHT NOW**:

1. **Execute Phase 1, Task 1.1** - Fix scene generation (30 mins)
   - Fix MCP tool names
   - Investigate aspect ratio
   - Test generation

2. **Execute Phase 1, Task 1.2** - Update talking head (15 mins)
   - Wire config defaults
   - Test with Sid Dani

3. **Execute Phase 1, Task 1.3** - Enhance setup (30 mins)
   - Add consent management
   - Save to config

4. **Execute Phase 1, Task 1.4** - Validate (15 mins)
   - End-to-end testing
   - Document results

**Total**: 90 minutes to working core

---

## 📁 FILES STATUS

### Created/Updated:

- ✅ `FOCUSED-IMPLEMENTATION-PLAN.md` (this file)
- ✅ `ai-video-agent.agent.yaml` (menu simplified to 8 items)
- ✅ Removed 14 workflow files (7 YAML + 7 instructions)

### Remaining Workflows (Clean):

- ✅ `generate-talking-head.yaml` + `talking-head-instructions.md`
- ❌ `generate-scene.yaml` + `scene-generation-instructions.md` (needs fixes)
- ⚠️ `setup-avatars.yaml` + `setup-avatars-instructions.md` (needs enhancement)

---

## 🚀 READY TO EXECUTE?

**Option 1**: **START PHASE 1 NOW** (I'll execute all 4 tasks in 90 mins)

**Option 2**: **REVIEW PLAN FIRST** (Read this doc, then proceed)

**Option 3**: **CUSTOM** (Pick specific tasks)

Which do you want? Let's make this work! 🎬
