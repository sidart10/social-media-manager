# AI Image Generator Agent - Implementation Roadmap
**Date:** 2025-10-25
**Status:** Agent validated, MCP working, workflows needed

Based on validation feedback and MCP testing, here's the complete roadmap to production.

---

## ✅ **Completed (Phase 1)**

### Agent Foundation
- ✅ Agent YAML created and schema-validated
- ✅ Persona defined (Visual Content Producer & Platform Strategist)
- ✅ Menu structure with 10 commands
- ✅ Expert agent with sidecar resources
- ✅ Dark monochrome tech design system defined

### MCP Integration
- ✅ OpenAI gpt-image-1 MCP server installed & working
- ✅ Nanobanana (Gemini) MCP server installed & working
- ✅ Correct tool names identified and verified
- ✅ API keys configured
- ✅ Test images generated successfully

### Documentation
- ✅ MCP_CAPABILITIES.md - Provider features & constraints
- ✅ MCP_WORKING_CONFIG.md - Working configuration guide
- ✅ MCP_QUICK_REFERENCE.md - Tool usage examples
- ✅ best-practices-framework.md - Emily's quality standards
- ✅ IMPLEMENTATION_LEARNINGS.md - Issue analysis
- ✅ platform-specs.yaml - Platform requirements

### Templates
- ✅ TEST-linkedin-carousel-ai-agents.json - AI architecture (dark design)
- ✅ linkedin-carousel-ai-browsers.json - Product showcases
- ✅ Aspect ratio flexibility added
- ✅ Design system fully documented

### Test Results
- ✅ Generated 2 carousels (6 images total) via direct API
- ✅ MCP test images generated successfully
- ✅ Proved workflows function end-to-end

---

## 🚧 **In Progress (Phase 2)**

### Agent Instructions Update
- 🔄 Update tool names (generate_image → create_image)
- 🔄 Add MCP file location handling
- 🔄 Update generation workflow with working MCP
- 🔄 Add copy step (MCP folder → agent outputs/)

---

## 📋 **TODO (Phase 3) - Workflow Implementation**

### Priority 1: Core Generation Workflows (CRITICAL)

**1.1 Create generate-carousel.yaml**
```yaml
Purpose: Generate 2-10 image carousel sets
Status: Referenced in menu but file doesn't exist
Dependencies:
  - JSON template system
  - MCP tools (working)
  - Metadata generation
Steps:
  1. User input (topic, count, platform)
  2. Load/create template
  3. Validate specs
  4. Generate each slide via MCP
  5. Copy to agent outputs/
  6. Create metadata files
  7. Generate carousel summary
```

**1.2 Create generate-single.yaml**
```yaml
Purpose: Generate one optimized image
Status: Referenced in menu but doesn't exist
Simpler version of carousel workflow:
  1. User input (prompt, platform)
  2. Load template or create on-the-fly
  3. Validate
  4. Generate via MCP
  5. Save with metadata
```

**1.3 Create generate-batch.yaml**
```yaml
Purpose: Multiple variants of same concept
Status: Referenced in menu but doesn't exist
Uses: Creating A/B test options
Steps:
  1. User prompt
  2. Apply diversity parameter (0-1)
  3. Generate N variants
  4. Dedupe similar images
  5. Present options
```

### Priority 2: Platform-Specific Workflows

**2.1 Create generate-instagram.yaml**
```yaml
Quick preset for Instagram
Loads: Instagram specs from platform-specs.yaml
Defaults:
  - aspect_ratio: "1:1" or "4:5"
  - size: 1024x1024 or 1024x1536
  - style: Vibrant, engaging
```

**2.2 Create generate-twitter.yaml**
```yaml
Quick preset for X/Twitter
Defaults:
  - aspect_ratio: "16:9" → 1536x1024
  - style: Bold, high-contrast
```

**2.3 Create generate-linkedin.yaml**
```yaml
Quick preset for LinkedIn (most important!)
Defaults:
  - aspect_ratio: "16:9" → 1536x1024
  - design: Dark monochrome tech aesthetic
  - templates: Professional diagram/carousel templates
```

### Priority 3: Advanced Features

**3.1 Image Editing Workflow**
```yaml
Purpose: Edit existing images
Tool: mcp__nanobanana__generate_image with mode="edit"
Steps:
  1. User uploads image
  2. Describe desired changes
  3. Generate edit prompt
  4. Apply via Nanobanana
  5. Compare before/after
```

**3.2 Quality Critique System**
```yaml
Purpose: Score generated images with 7-pillar system
Steps:
  1. Load generated image
  2. Evaluate against benchmarks
  3. Score 1-10 on each pillar
  4. Provide feedback
  5. Offer regeneration if score < 7
```

**3.3 Caption & Alt-Text Generation**
```yaml
Purpose: Generate platform-aware captions
Steps:
  1. Analyze image content
  2. Extract key elements
  3. Generate caption (platform length limits)
  4. Generate alt-text (accessibility)
  5. Suggest hashtags
```

---

## 📊 **TODO (Phase 4) - Template Library Expansion**

### Additional Templates Needed:

**4.1 Photorealistic Templates (Emily's Style)**
```
- photorealistic-portrait.json (fashion/editorial)
- product-shot.json (e-commerce)
- lifestyle-scene.json (environmental portraits)
```

**4.2 Professional Content Templates**
```
- workflow-diagram-3-step.json
- workflow-diagram-5-step.json
- ai-framework-visualization.json
- tutorial-guide.json
- comparison-infographic.json
- data-visualization.json
```

**4.3 Platform-Specific Templates**
```
- instagram-square-post.json
- instagram-story.json
- instagram-reel-cover.json
- twitter-thread.json
- linkedin-article-header.json
```

---

## 🎯 **TODO (Phase 5) - Agent Enhancements**

### 5.1 Menu Actions Implementation
**From Validation:**
- ✅ help and exit need action fields
- Add proper action definitions
- Test menu trigger resolution

### 5.2 Virtual Expert System
```yaml
Implement modular expert pipeline:
  - Content Strategist (analyzes request)
  - Visual Designer (colors, typography)
  - Diagram Architect (technical visuals)
  - Photography Director (photorealistic)
  - Image Editor (transformations)

Create: virtual-experts-system.yaml in sidecar
```

### 5.3 Critique System
```yaml
Create: critique-system.yaml in sidecar
7-Pillar Scoring:
  1. Clarity
  2. Technical Quality
  3. Composition
  4. Color Accuracy
  5. Typography
  6. Professionalism
  7. Prompt Accuracy

Automated evaluation + recommendations
```

---

## 🔧 **TODO (Phase 6) - Technical Improvements**

### 6.1 Metadata Enhancement
```
Current: No metadata saved
Needed: JSON file with every image
Format: {filename}_metadata.json
Contents:
  - Full prompt
  - Generation params
  - Provider & model
  - Timestamp
  - File sizes
  - Quality scores
```

### 6.2 File Organization
```
Current: MCP saves to default folders
Needed: Copy to agent outputs/ with proper structure

outputs/
├── {topic_name}/
│   ├── slide1.png
│   ├── slide1_metadata.json
│   ├── slide2.png
│   ├── slide2_metadata.json
│   └── CAROUSEL_SUMMARY.md
```

### 6.3 Progress Indicators
```
Add to workflows:
  - "Generating Slide 1 of 3... (est. 3 seconds)"
  - Progress bar or percentage
  - Real-time status updates
```

### 6.4 Error Handling
```
Graceful failures:
  - MCP timeout → retry once
  - Rate limit → wait and retry
  - Invalid params → validate first
  - File save error → check permissions
```

---

## 📚 **TODO (Phase 7) - Documentation & Testing**

### 7.1 Usage Guides
```
- Quick Start Guide (5 min to first carousel)
- Template Customization Guide
- Design System Handbook
- Troubleshooting FAQ
```

### 7.2 Example Gallery
```
Create examples folder:
  - Example carousels (before/after)
  - Template variations
  - Quality comparisons (OpenAI vs Gemini)
  - Style showcases
```

### 7.3 Testing Suite
```
Test scenarios:
  - All menu commands
  - Each platform preset
  - Error conditions
  - Edge cases (very long prompts, etc.)
  - Both providers
```

---

## 🚀 **Immediate Next Actions (This Week)**

### Task 1: Fix Agent Instructions ✅ IN PROGRESS
- [x] Update MCP tool names (create_image vs generate_image)
- [ ] Add file location handling
- [ ] Update generation workflow examples
- [ ] Remove outdated fallback sections

### Task 2: Implement Core Workflows 🎯 PRIORITY
- [ ] generate-carousel.yaml (CRITICAL)
- [ ] generate-single.yaml
- [ ] generate-linkedin.yaml (most used)

### Task 3: Test End-to-End 🧪
- [ ] Activate compiled agent
- [ ] Test *create-carousel command
- [ ] Verify MCP integration
- [ ] Check file outputs
- [ ] Validate metadata creation

### Task 4: Visual Quality Review 👁️
- [ ] Review AI Agent Architecture carousel (3 slides)
- [ ] Score with 7-pillar system
- [ ] Document what works/fails
- [ ] Refine templates

### Task 5: Create Missing Templates 📄
- [ ] Photorealistic portrait template
- [ ] Workflow diagram template (3-step)
- [ ] Instagram story template

---

## 📊 **Prioritization Matrix**

### MUST HAVE (Week 1):
1. ✅ MCP working
2. 🔄 Agent instructions updated
3. ❌ Core workflows (carousel, single, linkedin)
4. ❌ Metadata generation
5. ❌ End-to-end test

### SHOULD HAVE (Week 2):
6. ❌ All platform workflows
7. ❌ Quality critique system
8. ❌ Caption generation
9. ❌ Template library (5+ templates)
10. ❌ Usage documentation

### NICE TO HAVE (Week 3+):
11. ❌ Image editing workflow
12. ❌ Virtual expert system
13. ❌ A/B testing features
14. ❌ Caching system
15. ❌ Cost tracking

---

## 🎯 **Success Criteria**

**Phase 2 Complete When:**
- ✅ Agent instructions fully updated
- ✅ 3 core workflows implemented
- ✅ End-to-end carousel generation works via agent
- ✅ Metadata saved with every image
- ✅ Visual quality validated

**Phase 3 Complete When:**
- ✅ All 6 platform workflows working
- ✅ Quality critique system functional
- ✅ 10+ templates in library
- ✅ Documentation complete
- ✅ Agent ready for daily use

**Production Ready When:**
- ✅ All workflows tested
- ✅ Error handling robust
- ✅ Documentation comprehensive
- ✅ Templates validated
- ✅ Performance optimized

---

## 💪 **Current State**

**What Works:**
- ✅ MCP servers (OpenAI + Gemini)
- ✅ Agent structure validated
- ✅ Templates created
- ✅ Design system defined
- ✅ Direct API fallback (proven)

**What's Needed:**
- ❌ Workflow YAML files
- ❌ Agent instructions final update
- ❌ Metadata system
- ❌ File organization
- ❌ End-to-end testing

**Blockers:**
- None! MCP is working
- Ready to build workflows

---

## 📝 **Detailed Task Breakdown**

### TASK 1: Update Agent Instructions (30 min)

**File:** `ai-image-generator-sidecar/instructions.md`

**Changes:**
```
Line ~20: Tool name → mcp__gpt-image-1__create_image
Line ~23: Tool name → mcp__nanobanana__generate_image (already correct)
Line ~150: Update Step 4 with MCP as primary (not fallback)
Line ~175: Add file copy step after MCP generation
Line ~570: Update tool reference section
```

**Validation:**
- All tool names correct
- MCP marked as primary method
- Fallback clearly secondary
- Examples use working tools

---

### TASK 2: Create generate-carousel.yaml (1 hour)

**Location:** `workflows/generate-carousel.yaml`

**Structure:**
```yaml
name: generate-carousel
description: Generate 2-10 image carousel for social media

config_source: "{agent-folder}/ai-image-generator-sidecar/config.yaml"
template_folder: "{agent-folder}/ai-image-generator-sidecar/templates"
output_folder: "{agent-folder}/ai-image-generator-sidecar/outputs"

instructions:
  - step: 1
    goal: "Gather user requirements"
    actions:
      - ask: "What's your carousel topic?"
      - ask: "How many slides? (2-10)"
      - ask: "Platform? (instagram/linkedin/twitter)"
      - ask: "Use existing template or create new?"

  - step: 2
    goal: "Load or create template"
    actions:
      - if: user selected existing template
        action: Read template from templates/ folder
      - else: Create new template based on requirements
      - action: Parse template JSON
      - action: Validate specs

  - step: 3
    goal: "Confirm generation settings"
    actions:
      - action: Show summary (topic, count, platform, size, design)
      - action: Estimate time (count × 3 seconds)
      - ask: "Proceed with generation? [y/n]"

  - step: 4
    goal: "Generate images via MCP"
    actions:
      - action: Create output folder mkdir -p
      - for-each: slide in template.slides
        actions:
          - action: Construct full prompt
          - action: Map aspect ratio to size
          - action: Call mcp__gpt-image-1__create_image
          - action: Copy from MCP location to agent outputs/
          - action: Create metadata JSON
          - action: Show progress "✅ Slide {N} of {total} complete!"

  - step: 5
    goal: "Create carousel summary"
    actions:
      - action: Generate CAROUSEL_SUMMARY.md
      - action: List all files
      - action: Calculate total size
      - action: Show completion message

  - step: 6
    goal: "Quality review & next steps"
    actions:
      - ask: "Review images? [y/n]"
      - if yes: Run quality critique
      - action: "Offer: Regenerate, Edit, Caption, or Post"
```

---

### TASK 3: Create generate-single.yaml (30 min)

**Simplified version of carousel:**
```yaml
name: generate-single
description: Generate one optimized image

instructions:
  - step: 1: Get prompt & platform
  - step: 2: Select/create template
  - step: 3: Confirm settings
  - step: 4: Generate via MCP
  - step: 5: Save with metadata
  - step: 6: Quality review
```

---

### TASK 4: Create generate-linkedin.yaml (45 min)

**LinkedIn-optimized quick workflow:**
```yaml
name: generate-linkedin
description: Quick LinkedIn carousel with dark tech aesthetic

Presets:
  - aspect_ratio: "16:9"
  - size: "1536x1024"
  - design: "dark_monochrome_tech"
  - template: "linkedin-carousel-tech-default"

Faster workflow with LinkedIn defaults
```

---

### TASK 5: Implement Metadata System (45 min)

**Create:** `generate_metadata()` function in workflows

**Metadata Template:**
```json
{
  "slide_number": 1,
  "template_used": "template.json",
  "topic": "AI Agent Architecture",
  "prompt_full": "complete prompt with negatives",
  "provider": "openai",
  "model": "gpt-image-1",
  "tool_used": "mcp__gpt-image-1__create_image",
  "size": "1536x1024",
  "aspect_ratio_requested": "16:9",
  "aspect_ratio_actual": "3:2",
  "quality": "high",
  "output_format": "png",
  "timestamp": "ISO-8601",
  "generation_time_seconds": 2.5,
  "file_path_mcp": "~/Pictures/gpt-image-1/...",
  "file_path_agent": "outputs/carousel/slide1.png",
  "file_size_bytes": 2097152,
  "file_size_mb": 2.0,
  "quality_score": {
    "clarity": 0,
    "technical_quality": 0,
    "composition": 0,
    "color_accuracy": 0,
    "typography": 0,
    "professionalism": 0,
    "prompt_accuracy": 0,
    "overall": 0,
    "reviewed": false
  },
  "design_system": "dark_monochrome_tech",
  "accent_color": "#4ADE80"
}
```

**Save with Write tool after each generation**

---

### TASK 6: File Organization System (30 min)

**Workflow Addition:**
```yaml
After MCP generation:
  1. MCP saves to: ~/Pictures/gpt-image-1/gpt-images/image-{timestamp}.png
  2. Copy to agent: outputs/{topic}/slide{N}.png
  3. Rename for clarity
  4. Create metadata JSON
  5. Update carousel summary

Commands:
  - Bash: mkdir -p {agent_output_folder}
  - Bash: cp {mcp_path} {agent_path}/slide{N}.png
  - Write: {agent_path}/slide{N}_metadata.json
```

---

### TASK 7: Visual Quality Validation (1 hour)

**Review Generated Carousels:**

**AI Agent Architecture (3 slides):**
```
Location: outputs/ai-agent-architecture/
Files: slide1_title.png, slide2_components.png, slide3_workflow.png

Review Checklist:
  - [ ] Text legibility (WCAG AAA contrast)
  - [ ] Typography matches specs (Inter font, sizes)
  - [ ] Colors match palette (#0B0B0B, #FFFFFF, etc.)
  - [ ] Layout follows 12-column grid
  - [ ] Icons rendered correctly
  - [ ] Feature cards visible
  - [ ] No artifacts or quality issues
  - [ ] Professional appearance
  - [ ] Consistent across slides

7-Pillar Scores:
  - Clarity: ?/10
  - Technical Quality: ?/10
  - Composition: ?/10
  - Color Accuracy: ?/10
  - Typography: ?/10
  - Professionalism: ?/10
  - Prompt Accuracy: ?/10

Overall: ?/10

Actions:
  - If < 7: Refine prompts and regenerate
  - If 7-8: Minor tweaks optional
  - If 9-10: Perfect, use as template example
```

---

### TASK 8: Template Refinement (1 hour)

**Based on Visual Review:**

```
1. Identify what AI follows well:
   - Color hex codes?
   - Typography specs?
   - Layout precision?
   - Negative prompts effectiveness?

2. Identify what AI ignores:
   - Specific font weights?
   - Exact pixel measurements?
   - Subtle design details?

3. Refine templates:
   - Emphasize specs that work
   - Simplify or remove ignored specs
   - Add more negatives for common failures
   - Test refined templates

4. Create "Validated Templates" folder:
   - Mark templates as tested
   - Include example outputs
   - Document quality scores
```

---

### TASK 9: Provider Comparison (30 min)

**Test Same Prompt with Both Providers:**

```yaml
Test Case: Generate same slide with OpenAI and Nanobanana

Slide: "AI Agent Architecture" title slide

Compare:
  - Quality (which looks better?)
  - Speed (already know: both ~3 sec)
  - File size (Nanobanana smaller)
  - Text rendering (which is clearer?)
  - Color accuracy
  - Layout precision

Document findings:
  - When to use OpenAI
  - When to use Nanobanana
  - Update provider routing logic
```

---

### TASK 10: Agent Compilation & Testing (45 min)

**Compile Agent:**
```bash
# Run BMAD installer
# Select "Compile Agents"
# Verify .md file created
```

**Test Agent:**
```bash
# Activate agent
/ai-image-agent

# Should show:
- Menu with 10 commands
- Professional greeting
- Ready for input

# Test each command:
*help → Shows menu
*presets → Lists platform specs
*config → Shows configuration
*create-carousel → Runs workflow (when implemented)
*exit → Exits gracefully
```

---

## 🎨 **QUICK WINS (Do First)**

### Week 1 Sprint:

**Day 1:**
- ✅ Fix agent instructions (MCP tool names)
- ✅ Create generate-carousel.yaml
- ✅ Create metadata system

**Day 2:**
- Create generate-single.yaml
- Create generate-linkedin.yaml
- Test workflows

**Day 3:**
- Visual quality review
- Template refinement
- Provider comparison

**Day 4:**
- Compile agent
- End-to-end testing
- Bug fixes

**Day 5:**
- Documentation updates
- Create usage examples
- Prepare for daily use

---

## 📈 **Success Metrics**

**Technical:**
- ✅ MCP servers working
- ❌ 3+ workflows implemented
- ❌ Metadata saved with every image
- ❌ Agent fully functional

**Quality:**
- ❌ Templates validated (7+ score)
- ❌ Visual output reviewed
- ❌ Provider comparison complete

**Usability:**
- ❌ Agent activates correctly
- ❌ Commands work as expected
- ❌ Outputs organized properly
- ❌ Documentation complete

---

## 🎯 **CURRENT PRIORITY: Workflows**

**The agent is validated and MCP is working.**

**The ONLY blocker is: Workflow YAML files don't exist yet.**

**Once workflows are created:**
- Agent becomes fully functional
- Can generate carousels via commands
- Complete end-to-end system working

---

**Ready to build the workflows, sid?** That's the final piece to make this agent production-ready! 🚀
