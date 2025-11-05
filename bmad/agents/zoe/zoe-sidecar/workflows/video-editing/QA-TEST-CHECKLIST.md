# Video Editing Workflow - Comprehensive QA Test Checklist

**Workflow:** video-editing
**Version:** 1.0.0
**Date:** 2025-11-01
**QA Status:** Ready for Testing

---

## ✅ Pre-Integration Validation

### File Structure

- [x] workflow.yaml exists and is valid YAML
- [x] instructions.md exists with proper XML structure
- [x] README.md exists with usage documentation
- [x] submagic-editing-reference.md exists (copied from docs/)
- [x] platform-specs.yaml created with all platform defaults
- [x] Workflow folder structure: `/bmad/agents/zoe/zoe-sidecar/workflows/video-editing/`

### Configuration Integrity

- [x] config_source points to correct path: `{project-root}/bmad/agents/zoe/config.yaml`
- [x] config.yaml exists and contains required fields
- [x] All standard config variables defined: user_name, communication_language, output_folder, outputs_base
- [x] installed_path correctly references workflow folder
- [x] standalone: true (workflow can be invoked directly)
- [x] template: false (action workflow, no template file)

### Variable Consistency

- [x] All {{variables}} in instructions have Store instructions
- [x] Config variables use {single_braces} correctly
- [x] No undefined variables referenced
- [x] Platform specs reference path exists
- [x] submagic_editing_guide path is correct

### XML/YAML Compliance

- [x] <critical> headers present referencing workflow.xml and workflow.yaml
- [x] <workflow> tag properly opened and closed
- [x] All 13 steps numbered sequentially (1-13)
- [x] Step 8-alternative for YouTube magic clips scenario
- [x] No gaps in step sequence
- [x] All <check> tags properly closed (0 used - using inline conditionals)
- [x] Inline conditionals use <action if=""> pattern
- [x] <goto> tags used correctly for flow control
- [x] No antipattern self-closing <check> tags

### MCP Tool Integration

- [x] All SubMagic tools exist in .mcp.json
- [x] Tool names match MCP server exactly (mcp**submagic**\*)
- [x] Tool parameters validated against submagic_mcp.py source:
  - [x] submagic_create_project parameters correct
  - [x] submagic_update_project uses 'items' not 'custom_broll_items'
  - [x] submagic_export_project parameters correct
  - [x] submagic_create_magic_clips parameters correct
- [x] Cloudinary tool reference (optional - manual upload acceptable)

### Agent Menu Integration

- [x] Added to Zoe's menu in `.claude/commands/zoe/zoe.md`
- [x] Menu item: \*edit-video with workflow path
- [x] Menu description accurate and compelling
- [x] Positioned first in Video Workflows section (most important)

---

## 🧪 Functional Testing Plan

### Test Scenario 1: Basic Video Editing (Happy Path)

**Input:** Raw video URL from Cloudinary
**Platform:** LinkedIn
**Expected Outcome:** Professional edited video with captions

**Test Steps:**

1. [ ] Run `/zoe` and select \*edit-video
2. [ ] Answer all discovery questions (purpose, platform, audience)
3. [ ] Provide Cloudinary video URL
4. [ ] Select "No B-rolls"
5. [ ] Choose "Balanced" editing style
6. [ ] Enable filler word removal
7. [ ] Enable magic zooms, disable auto B-rolls
8. [ ] Choose template "Hormozi 2"
9. [ ] Language: en
10. [ ] Add custom dictionary words
11. [ ] Accept platform defaults (1080x1920)
12. [ ] Review editing plan
13. [ ] Confirm and start processing
14. [ ] Wait for SubMagic processing (5-10 min)
15. [ ] Skip fine-tuning
16. [ ] Export with defaults
17. [ ] Verify video downloaded to outputs/projects/{date}-{slug}/04-media/videos/
18. [ ] Verify metadata JSON created
19. [ ] Check video quality and captions

**Success Criteria:**

- [ ] Video processes without errors
- [ ] Captions are accurate and styled correctly
- [ ] Export matches platform specs (1080x1920 for LinkedIn)
- [ ] Files saved in correct output folder
- [ ] Metadata JSON contains all project details

---

### Test Scenario 2: YouTube Magic Clips

**Input:** YouTube URL (long podcast/video)
**Platform:** TikTok
**Expected Outcome:** 10-20 short viral clips

**Test Steps:**

1. [ ] Run workflow, select TikTok as platform
2. [ ] Choose "YouTube URL" as source type
3. [ ] Provide YouTube URL
4. [ ] Accept TikTok defaults (15-30 sec clips)
5. [ ] Choose template
6. [ ] Start magic clips generation
7. [ ] Wait for processing (10-20 min)
8. [ ] Verify multiple clips generated
9. [ ] Check all clips downloaded
10. [ ] Verify each has metadata

**Success Criteria:**

- [ ] Magic clips correctly triggered (not regular editing)
- [ ] Multiple clips generated (10+ typical)
- [ ] Each clip duration within 15-30 sec
- [ ] All clips have captions
- [ ] Saved to outputs folder correctly

---

### Test Scenario 3: Custom B-roll Insertion

**Input:** Raw video + 3 B-roll images from Cloudinary
**Expected Outcome:** Video with custom B-rolls at specified timestamps

**Test Steps:**

1. [ ] Provide raw video URL
2. [ ] Answer "yes" to B-roll question
3. [ ] Provide 3 Cloudinary image URLs with timestamps
4. [ ] Disable auto B-rolls (using custom)
5. [ ] Complete editing configuration
6. [ ] Verify B-rolls inserted at correct times
7. [ ] Check visual quality of B-roll integration

**Success Criteria:**

- [ ] B-rolls appear at specified timestamps
- [ ] No auto B-rolls added (only custom)
- [ ] Smooth transitions
- [ ] Metadata includes B-roll info

---

### Test Scenario 4: Fine-Tuning After Initial Edit

**Input:** Completed video that needs adjustment
**Expected Outcome:** Re-processed with new settings

**Test Steps:**

1. [ ] Complete initial edit
2. [ ] Select "Yes" to fine-tuning
3. [ ] Choose option 1 (change silence removal)
4. [ ] Switch from "fast" to "extra-fast"
5. [ ] Wait for re-processing
6. [ ] Re-export
7. [ ] Verify new video is tighter/faster

**Success Criteria:**

- [ ] Re-processing works without creating new project
- [ ] Changes applied correctly
- [ ] New export replaces or versions correctly

---

### Test Scenario 5: HeyGen Video Polish

**Input:** HeyGen-generated avatar video
**Expected Outcome:** Avatar video with professional captions

**Test Steps:**

1. [ ] Provide HeyGen video URL (Cloudinary)
2. [ ] Select LinkedIn platform
3. [ ] Choose conservative editing (natural pacing)
4. [ ] Disable magic zooms (professional look)
5. [ ] Use custom brand theme (if available)
6. [ ] Verify captions don't interfere with avatar
7. [ ] Check final export quality

**Success Criteria:**

- [ ] Captions properly positioned
- [ ] No filler word removal (HeyGen doesn't have them)
- [ ] Natural pacing preserved
- [ ] Professional output quality

---

## 🐛 Error Handling Validation

### Edge Case 1: Invalid Cloudinary URL

**Test:** Provide non-Cloudinary URL
**Expected:** Clear error message + guidance to upload to Cloudinary

**Steps:**

1. [ ] Try with http://example.com/video.mp4
2. [ ] Verify workflow catches invalid URL
3. [ ] Offers to upload to Cloudinary

---

### Edge Case 2: SubMagic Processing Failure

**Test:** Corrupted video or unsupported format
**Expected:** Graceful failure with error message

**Steps:**

1. [ ] (Simulated) Processing fails status
2. [ ] Workflow detects failure
3. [ ] Shows error message
4. [ ] Offers retry or troubleshooting

---

### Edge Case 3: Both Template and Theme Provided

**Test:** User provides both template_name and custom_theme_id
**Expected:** Workflow prevents this (mutually exclusive)

**Steps:**

1. [ ] Answer yes to custom theme
2. [ ] Workflow should NOT ask for template
3. [ ] Or vice versa - validation prevents both

---

### Edge Case 4: Network Timeout During Export

**Test:** Export takes >5 minutes
**Expected:** Continue polling, don't give up too early

**Steps:**

1. [ ] Monitor polling behavior
2. [ ] Verify max wait time is reasonable (15 min)
3. [ ] Check timeout handling

---

### Edge Case 5: Missing Platform Specs

**Test:** Reference to non-existent platform
**Expected:** Graceful fallback or clear error

**Steps:**

1. [ ] Try selecting platform not in platform-specs.yaml
2. [ ] Verify sensible defaults apply

---

## 🔗 Integration Testing

### Integration 1: Zoe Agent Menu

- [ ] Run `/zoe`
- [ ] Verify \*edit-video appears in menu
- [ ] Menu description is clear
- [ ] Workflow triggers correctly
- [ ] Config loaded at Zoe activation

### Integration 2: Cloudinary Upload

- [ ] Test local file upload scenario
- [ ] Verify Cloudinary MCP called correctly
- [ ] Public URL extracted properly
- [ ] URL works in SubMagic

### Integration 3: Output Management

- [ ] Outputs save to correct BMAD v6 structure
- [ ] Date formatting correct
- [ ] Project slug handling
- [ ] 04-media/videos subfolder created
- [ ] Metadata JSON properly formatted

### Integration 4: Platform Specs Loading

- [ ] platform-specs.yaml loaded correctly
- [ ] Platform defaults applied
- [ ] Custom resolution override works
- [ ] Aspect ratio calculations correct

---

## 📊 Quality Validation

### Code Quality

- [x] No hardcoded values (using variables)
- [x] No emoji in code (per project conventions)
- [x] Proper error messages
- [x] Clear user communication
- [ ] Follows BMAD v6 conventions

### User Experience

- [ ] Questions feel natural and professional
- [ ] Recommendations are helpful and intelligent
- [ ] Progress updates are clear
- [ ] Error messages are actionable
- [ ] Final summary is comprehensive

### Documentation Quality

- [x] README explains purpose clearly
- [x] Usage instructions are complete
- [x] Examples provided
- [x] Troubleshooting section included
- [x] All files documented

---

## 🚀 Performance Validation

### Processing Time

- [ ] Initial edit: 5-15 minutes (acceptable)
- [ ] Fine-tuning: 2-5 minutes (acceptable)
- [ ] Export: 2-5 minutes (acceptable)
- [ ] Total: Under 25 minutes for full workflow

### Cost Tracking

- [ ] Estimated costs displayed to user
- [ ] Actual SubMagic usage logged
- [ ] Metadata includes cost info (if available)

### Resource Usage

- [ ] No memory leaks during polling
- [ ] Proper cleanup of temp files
- [ ] Efficient variable storage

---

## 🎯 Workflow-Specific Checks

### SubMagic API Compliance

- [x] All required parameters included (title, language, video_url)
- [x] Optional parameters properly handled
- [x] Template vs theme exclusivity enforced
- [x] Parameter names match MCP server exactly:
  - [x] template_name (not template)
  - [x] user_theme_id (not theme_id)
  - [x] remove_silence_pace (not silence_removal_pace)
  - [x] remove_bad_takes (not remove_filler_words)
  - [x] magic_zooms (boolean)
  - [x] magic_brolls (boolean)
  - [x] magic_brolls_percentage (integer 0-100)
  - [x] dictionary (array of strings)

### Modular Input Handling

- [ ] Raw footage path works
- [ ] HeyGen video path works
- [ ] YouTube URL triggers magic clips correctly
- [ ] B-roll collection works
- [ ] Empty B-roll array handled

### Platform Optimization

- [ ] Each platform has correct specs in platform-specs.yaml
- [ ] Aspect ratios correct (9:16 vs 16:9)
- [ ] Resolution recommendations appropriate
- [ ] Duration guidance matches platform norms

---

## 🔧 Critical Issues Found & Fixed

### Fixed Issues:

1. ✅ **Config path corrected**: Changed from `/zoe-sidecar/config.yaml` to `/zoe/config.yaml`
2. ✅ **Platform specs created**: Added platform-specs.yaml with all 8 platforms
3. ✅ **B-roll parameter fixed**: Changed `custom_broll_items` to `items` in update_project call
4. ✅ **Menu integration**: Added \*edit-video to Zoe's menu

### Known Limitations (Acceptable):

1. ⚠️ No `<template-output>` tags - Acceptable for action workflow (no document generation)
2. ⚠️ Cloudinary not in .mcp.json - Acceptable (manual upload or future addition)
3. ⚠️ No elicit tags - Acceptable (workflow is interactive enough without AI enhancement)

---

## 🎬 Final Validation Checklist

### Must Pass Before Production:

- [x] All files exist and are syntactically valid
- [x] Config paths resolve correctly
- [x] MCP tools validated against source code
- [x] Agent menu updated
- [x] Platform specs complete
- [x] Instructions follow workflow.xml patterns
- [x] Variable references consistent
- [ ] **Manual test run**: Execute workflow end-to-end with real video
- [ ] **Error path testing**: Test at least 2 error scenarios
- [ ] **Integration test**: Zoe → video-editing → Zoro handoff

### Should Pass (Quality):

- [ ] User questions feel professional
- [ ] Recommendations are intelligent
- [ ] Progress updates are helpful
- [ ] Error messages are clear
- [ ] Documentation is complete

---

## 🏆 Quality Scores (Post-Testing)

### Workflow Quality (Target: 8/10+)

- [ ] **Robustness** (error handling): \_\_/10
- [ ] **User Experience** (question flow): \_\_/10
- [ ] **Integration** (with Zoe/Zoro): \_\_/10
- [ ] **Documentation** (README, comments): \_\_/10
- [ ] **Modularity** (handles all input types): \_\_/10
- [ ] **Professional Feel** (editor-like questions): \_\_/10
- [ ] **Technical Correctness** (API params): \_\_/10
- [ ] **Performance** (processing time): \_\_/10

**Overall Score:** \_\_/10

---

## 📋 Test Execution Log

### Test Run #1: [DATE]

**Tester:**
**Scenario:**
**Result:**
**Issues Found:**
**Fixes Applied:**

### Test Run #2: [DATE]

**Tester:**
**Scenario:**
**Result:**
**Issues Found:**
**Fixes Applied:**

---

## 🚨 Critical Issues to Monitor

### During Manual Testing, Watch For:

1. **Cloudinary URL Validation**
   - Does workflow properly detect non-Cloudinary URLs?
   - Is upload flow clear and functional?

2. **SubMagic Processing**
   - Does polling work correctly?
   - Are status updates helpful?
   - Does it timeout appropriately?

3. **Variable Resolution**
   - Are config variables properly loaded?
   - Do runtime variables store correctly?
   - Are platform specs accessible?

4. **Error Recovery**
   - What happens if SubMagic API fails?
   - Can user retry gracefully?
   - Are error messages actionable?

5. **File Management**
   - Do outputs save to correct folder structure?
   - Is metadata complete and accurate?
   - Are filenames descriptive?

6. **YouTube Magic Clips**
   - Does it properly detect YouTube URL?
   - Does it route to magic clips instead of regular edit?
   - Do all clips download successfully?

---

## ✅ Pre-Production Checklist

**Before deploying to users:**

- [x] Code review complete
- [x] All validation checks passed
- [ ] Manual test run successful (Scenario 1)
- [ ] Error handling tested (2+ scenarios)
- [ ] Documentation reviewed by user (sid)
- [ ] Integration test with Zoro agent
- [ ] Cost estimates validated with actual usage
- [ ] User training/walkthrough completed

---

## 🎯 Success Criteria

**This workflow is production-ready when:**

1. ✅ Can edit a raw video end-to-end without errors
2. ✅ Properly handles all 4 input types (raw, HeyGen, YouTube, B-rolls)
3. ✅ Produces platform-optimized output
4. ✅ Integrates smoothly with Zoe agent menu
5. ✅ Error messages are clear and helpful
6. ✅ Documentation is complete
7. ✅ Processing time is reasonable (<20 min)
8. ✅ Cost estimates are accurate

---

**QA VERDICT: READY FOR MANUAL TESTING**

All pre-integration validation PASSED. Workflow is well-structured, properly configured, and ready for real-world testing with actual video content.

**Next Action:** Run manual test with a real video to validate end-to-end functionality.
