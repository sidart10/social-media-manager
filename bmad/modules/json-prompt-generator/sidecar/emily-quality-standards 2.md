# Emily Quality Standards - 7-Pillar Benchmark System

**Shared Quality Framework for All BMAD Content Generation**
**Source**: Emily's photorealistic and professional content methodology
**Version**: 1.0
**Date**: October 25, 2025

---

## 🎯 PURPOSE

This framework ensures consistent, high-quality output across ALL content types:

- Images (photorealistic, professional, diagrams)
- Videos (cinematic sequences, scenes, animations)
- Future modalities (audio, 3D, interactive)

**Used By**:

- AI Image Generator Agent
- AI Video Agent
- Future agents

---

## 📐 CORE PRINCIPLES (Universal)

### 1. JSON-First Approach

- ✅ ALL prompts must be structured as comprehensive JSON
- ✅ Minimum 10 major sections per prompt
- ✅ No ambiguity - every detail explicitly specified
- ✅ Template-driven workflow (load → populate → generate)

### 2. Negative Prompts Are Mandatory

- ✅ Minimum 10 negative prompt items
- ✅ Cover common AI failures (artifacts, anatomical errors, quality issues)
- ✅ Content-type-specific exclusions
- ✅ Platform-specific exclusions

### 3. Technical Precision

- ✅ Exact dimensions specified (e.g., 1920x1080px, not "landscape")
- ✅ Color values as hex codes (e.g., #1A73E8, not "blue")
- ✅ Typography with exact specs (font, size, weight, spacing)
- ✅ Camera specs for photorealism (lens, aperture, ISO)

### 4. Iterative Refinement

- ✅ Generate → Critique → Refine workflow
- ✅ Use 7-pillar quality benchmark system
- ✅ Document issues and corrections
- ✅ Save successful prompts as templates

---

## 🎨 THE 7-PILLAR QUALITY BENCHMARK SYSTEM

**Rate EVERY generated output on these 7 pillars (1-10 scale):**

### Pillar 1: **Clarity** (1-10)

**Definition**: Message/subject understood in <3 seconds

**Evaluation Criteria**:

- ✅ Clear focal point or primary message
- ✅ No visual ambiguity
- ✅ Subject/purpose immediately obvious
- ✅ Hierarchy guides eye to key information

**Scoring Guide**:

- **9-10**: Message instantly clear, zero confusion
- **7-8**: Clear with minimal effort
- **5-6**: Requires 3-5 seconds to understand
- **3-4**: Confusing, multiple possible interpretations
- **1-2**: Unclear, ambiguous, fails to communicate

---

### Pillar 2: **Technical Quality** (1-10)

**Definition**: No artifacts, proper resolution, clean execution

**Evaluation Criteria**:

- ✅ Resolution appropriate for platform
- ✅ No compression artifacts, banding, or pixelation
- ✅ Sharp where intended, properly blurred where intended
- ✅ No glitches, rendering errors, or AI failures
- ✅ Proper color space and bit depth

**Scoring Guide**:

- **9-10**: Flawless technical execution
- **7-8**: Minor imperfections, barely noticeable
- **5-6**: Visible artifacts but acceptable
- **3-4**: Obvious quality issues
- **1-2**: Severe technical problems

---

### Pillar 3: **Composition** (1-10)

**Definition**: Visual balance, effective framing, professional layout

**Evaluation Criteria**:

- ✅ Rule of thirds respected (or intentionally broken)
- ✅ Visual balance and weight distribution
- ✅ Effective use of negative space
- ✅ Clean hierarchy (primary → secondary → tertiary)
- ✅ Proper margins and breathing room

**Scoring Guide**:

- **9-10**: Gallery-quality composition
- **7-8**: Well-composed, professional
- **5-6**: Acceptable but could improve
- **3-4**: Poor balance, awkward framing
- **1-2**: Composition fails completely

---

### Pillar 4: **Color Accuracy** (1-10)

**Definition**: Matches specified palette, harmonious relationships

**Evaluation Criteria**:

- ✅ Matches specified hex codes/palette
- ✅ WCAG contrast standards met (accessibility)
- ✅ Harmonious color relationships (complementary, analogous, etc.)
- ✅ No unexpected color casts or shifts
- ✅ Appropriate saturation for use case

**Scoring Guide**:

- **9-10**: Perfect color execution
- **7-8**: Colors match intent, minor variations
- **5-6**: Close but some color drift
- **3-4**: Wrong palette or poor harmony
- **1-2**: Colors completely off

---

### Pillar 5: **Typography/Text** (1-10)

**Definition**: Legible, hierarchical, error-free

**Evaluation Criteria**:

- ✅ Legible at intended viewing size
- ✅ Proper hierarchy (size, weight, spacing)
- ✅ No spelling or grammatical errors
- ✅ Appropriate font choices for context
- ✅ Adequate contrast (text vs background)

**Scoring Guide**:

- **9-10**: Perfect typography, editorial-quality
- **7-8**: Professional, clean, legible
- **5-6**: Adequate but could improve
- **3-4**: Hard to read, poor hierarchy
- **1-2**: Illegible or major errors

**Note**: For video/images without text, score N/A or based on visual clarity

---

### Pillar 6: **Professionalism** (1-10)

**Definition**: Enterprise-grade appearance, polished execution

**Evaluation Criteria**:

- ✅ Enterprise/professional-grade appearance
- ✅ No amateur elements (Comic Sans, clip-art, etc.)
- ✅ Consistent style throughout
- ✅ Platform-appropriate aesthetic
- ✅ Polished, refined, intentional

**Scoring Guide**:

- **9-10**: Gallery/portfolio worthy
- **7-8**: Professional, business-ready
- **5-6**: Acceptable but not polished
- **3-4**: Amateur appearance
- **1-2**: Unprofessional, unusable

---

### Pillar 7: **Accuracy to Prompt** (1-10)

**Definition**: All specified elements present, matches intent

**Evaluation Criteria**:

- ✅ All specified elements/subjects present
- ✅ Details match JSON specifications
- ✅ Style matches description
- ✅ No hallucinated or unwanted elements
- ✅ Technical specs honored (camera, lighting, color)

**Scoring Guide**:

- **9-10**: Perfect prompt adherence
- **7-8**: All key elements present, minor variations
- **5-6**: Most elements correct, some missing
- **3-4**: Significant deviations from prompt
- **1-2**: Doesn't match prompt at all

---

## 📊 OVERALL SCORING

### Calculation:

```
Overall Score = Average of all 7 pillars
(Sum of scores) / 7 = Final Score
```

### Interpretation:

**9-10**: **EXCEPTIONAL** - Publish immediately, portfolio-worthy

- No changes needed
- Represents Emily-quality standard
- Save prompt as template for reuse

**7-8**: **GOOD** - Professional quality, minor tweaks may improve

- Acceptable for publication
- Consider refinements for perfection
- Document what worked

**5-6**: **ACCEPTABLE** - Functional but needs refinement

- Usable but not optimal
- Identify weak pillars
- Regenerate with improvements

**Below 5**: **REGENERATE** - Does not meet quality standards

- Identify failure points
- Update prompt with specificity
- Try different approach or provider

---

## 🔄 ITERATIVE REFINEMENT WORKFLOW

### Standard Quality Check Process:

```
1. Generate content (image, video, etc.)
2. Run 7-pillar evaluation
3. Calculate overall score
4. If score >= 8: Deliver with metadata
5. If score 5-7: Document issues → Update prompt → Regenerate
6. If score < 5: Major revision needed → Rethink approach
7. Save successful prompts as templates
```

### Refinement Strategy by Pillar:

**Low Clarity (Pillar 1)**:

- Add: Stronger focal point
- Add: Clearer hierarchy
- Remove: Distracting elements

**Low Technical Quality (Pillar 2)**:

- Increase: Resolution specification
- Add: Quality keywords ("sharp", "crisp", "high-fidelity")
- Check: Provider capabilities (try different tool)

**Low Composition (Pillar 3)**:

- Add: Rule of thirds specification
- Add: Negative space requirements
- Add: Alignment instructions

**Low Color Accuracy (Pillar 4)**:

- Use: Exact hex codes, not color names
- Add: Color relationships (complementary, analogous)
- Specify: Saturation and contrast levels

**Low Typography (Pillar 5)**:

- Specify: Font name, size, weight explicitly
- Add: Contrast requirements (WCAG AA/AAA)
- Add: Letter-spacing and line-height

**Low Professionalism (Pillar 6)**:

- Add negatives: "amateur", "clip-art", "cheesy"
- Reference: Professional aesthetic styles
- Check: Platform appropriateness

**Low Prompt Accuracy (Pillar 7)**:

- Increase: Specificity in JSON prompt
- Add: More detailed descriptions
- Use: Technical terminology
- Add: "MUST include X" statements

---

## 📋 QUALITY CHECKLIST (Pre-Generation)

**Before generating, ensure**:

- [ ] JSON template loaded or created
- [ ] All required sections populated (minimum 10)
- [ ] Negative prompts included (minimum 10 items)
- [ ] Technical specs explicit (dimensions, colors, typography)
- [ ] Provider selected based on use case
- [ ] Quality standards defined

**After generating, verify**:

- [ ] Run 7-pillar evaluation
- [ ] Score >= 7 for publication
- [ ] Save metadata with results
- [ ] Document learnings
- [ ] Update template library if exceptional

---

## 🎯 MINIMUM QUALITY GATES

**For Production Use**:

- Overall score must be >= 7.0
- No individual pillar below 5
- Technical Quality must be >= 7
- Professionalism must be >= 7

**For Premium/Portfolio Use**:

- Overall score must be >= 8.5
- All pillars >= 7
- At least 4 pillars at 9+

**For Client/Brand Work**:

- Overall score must be >= 9.0
- All pillars >= 8
- Zero technical quality issues
- Perfect prompt accuracy

---

## 📚 EXAMPLES OF SCORING

### Example 1: LinkedIn Carousel Slide

**Generated**: Dark tech carousel with product name, icon, features

**Scores**:

- Clarity: 9 (message instant - product name and features clear)
- Technical Quality: 9 (crisp, no artifacts, perfect resolution)
- Composition: 9 (12-column grid, clean alignment, generous spacing)
- Color Accuracy: 10 (exact hex codes matched: #0B0B0B, #FFFFFF, #4ADE80)
- Typography: 8 (Inter font correct, minor letter-spacing variation)
- Professionalism: 10 (enterprise-grade, portfolio-worthy)
- Prompt Accuracy: 9 (all elements present, colors exact)

**Overall**: **9.1** → EXCEPTIONAL, publish immediately

---

### Example 2: Photorealistic Portrait

**Generated**: Fashion portrait in snow with specific styling

**Scores**:

- Clarity: 9 (subject clear, composition strong)
- Technical Quality: 8 (minor skin smoothing, otherwise excellent)
- Composition: 9 (rule of thirds, beautiful framing)
- Color Accuracy: 8 (close to specified, slight warmth shift)
- Typography: N/A (no text)
- Professionalism: 9 (editorial-quality)
- Prompt Accuracy: 7 (pose slightly different than specified)

**Overall**: **8.3** → GOOD, professional quality, minor tweaks possible

**Refinement**: Specify "preserve skin texture, no smoothing" more strongly

---

### Example 3: Video Scene

**Generated**: Stone age hands chiseling tool

**Scores**:

- Clarity: 9 (action clear, focal point obvious)
- Technical Quality: 9 (sharp, proper depth of field)
- Composition: 8 (good framing, could use more negative space)
- Color Accuracy: 9 (earthy tones match, fire orange correct)
- Typography: N/A
- Professionalism: 9 (cinematic quality)
- Prompt Accuracy: 8 (lighting slightly softer than specified)

**Overall**: **8.7** → EXCEPTIONAL, ready for sequence

---

## 🔧 IMPLEMENTATION NOTES

### For Image Agent:

- Continue using best-practices-framework.md for detailed guidance
- Reference this shared document for 7-pillar scoring
- Maintain current template system (working great!)

### For Video Agent:

- Use this document for quality evaluation
- Apply 7-pillar system to generated images before animation
- Reference for JSON prompt standards

### For Future Agents:

- Use this as universal quality framework
- Adapt pillar definitions if needed for specific modality
- Maintain consistent scoring methodology

---

**This is the shared quality standard for ALL BMAD content generation.** 🎯

_Last updated: 2025-10-25_
