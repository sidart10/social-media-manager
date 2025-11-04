# Quality Framework - Emily's 7-Pillar System

**Source**: `bmad/modules/json-prompt-generator/sidecar/emily-quality-standards.md`

This file references Emily's complete 7-pillar quality evaluation system.

---

## 🎯 The 7 Pillars

Every generated image MUST be scored 1-10 on these criteria:

### Pillar 1: Clarity (1-10)
**Definition**: Message/subject understood in <3 seconds

**Scoring:**
- 9-10: Instantly clear
- 7-8: Clear with minimal effort
- 5-6: Requires 3-5 seconds
- 3-4: Confusing
- 1-2: Unclear

### Pillar 2: Technical Quality (1-10)
**Definition**: No artifacts, proper resolution, clean execution

**Scoring:**
- 9-10: Flawless
- 7-8: Minor imperfections
- 5-6: Visible but acceptable
- 3-4: Obvious issues
- 1-2: Severe problems

### Pillar 3: Composition (1-10)
**Definition**: Visual balance, effective framing, professional layout

**Scoring:**
- 9-10: Gallery-quality
- 7-8: Professional
- 5-6: Acceptable
- 3-4: Poor balance
- 1-2: Composition fails

### Pillar 4: Color Accuracy (1-10)
**Definition**: Matches specified palette, harmonious relationships

**Scoring:**
- 9-10: Perfect color execution
- 7-8: Matches intent, minor variations
- 5-6: Close but some drift
- 3-4: Wrong palette
- 1-2: Colors completely off

### Pillar 5: Typography (1-10)
**Definition**: Legible, hierarchical, error-free

**Scoring:**
- 9-10: Editorial-quality
- 7-8: Professional, clean
- 5-6: Adequate
- 3-4: Hard to read
- 1-2: Illegible

**Note**: N/A if no text in image

### Pillar 6: Professionalism (1-10)
**Definition**: Enterprise-grade appearance, polished execution

**Scoring:**
- 9-10: Portfolio-worthy
- 7-8: Business-ready
- 5-6: Acceptable but not polished
- 3-4: Amateur
- 1-2: Unprofessional

### Pillar 7: Prompt Accuracy (1-10)
**Definition**: All specified elements present, matches intent

**Scoring:**
- 9-10: Perfect adherence
- 7-8: All key elements present
- 5-6: Most correct, some missing
- 3-4: Significant deviations
- 1-2: Doesn't match prompt

---

## 📊 Overall Scoring

```
Overall Score = (Sum of 7 pillars) / 7
```

### Quality Gates

**< 7.0**: **REGENERATE**
- Does not meet quality standards
- Identify failure points
- Update JSON prompt
- Try different approach/provider

**7.0-8.4**: **GOOD**
- Acceptable for publication
- Professional quality
- Consider refinements for perfection
- Document what worked

**8.5-8.9**: **EXCELLENT**
- High-quality output
- Client-ready
- Save prompt as template

**9.0+**: **EXCEPTIONAL**
- Portfolio-worthy
- Emily-quality standard
- Save as gold standard template
- Reuse for similar projects

---

## 🔄 Evaluation Workflow

```yaml
<step goal="Run 7-pillar evaluation">
  <action>Display generated image to user</action>

  <ask>Rate on 7 pillars (1-10 each):

  1. Clarity: Message clear in <3 seconds?
  2. Technical Quality: Sharp, no artifacts?
  3. Composition: Good balance, hierarchy?
  4. Color Accuracy: Matches hex codes?
  5. Typography: Legible, professional? (or N/A)
  6. Professionalism: Enterprise-grade?
  7. Prompt Accuracy: All elements present?
  </ask>

  <action>Calculate: overall = sum / 7 (or 6 if typography N/A)</action>

  <action>Display: "Overall Score: {overall}/10"</action>

  <check if="overall < 7">
    <action>Analyze weak pillars</action>
    <action>Suggest improvements to JSON prompt</action>
    <ask>Regenerate with improvements? [y/n]</ask>
  </check>

  <check if="overall >= 9">
    <action>Show: "EXCEPTIONAL quality! Save this prompt as template."</action>
  </check>

  <action>Update metadata JSON with quality scores</action>
</step>
```

---

## 📋 Refinement Guide

### If Clarity Low (< 7):
- **Fix**: Simplify composition
- **Fix**: Strengthen focal point
- **Fix**: Remove distracting elements
- **JSON update**: Adjust subject_and_content.visual_hierarchy

### If Technical Quality Low (< 7):
- **Fix**: Add quality keywords ("sharp", "high-fidelity", "crisp")
- **Fix**: Increase resolution specification
- **Fix**: Try different provider
- **JSON update**: Add to negative_prompt: "blurry, low quality, artifacts"

### If Composition Low (< 7):
- **Fix**: Specify rule of thirds explicitly
- **Fix**: Add negative space requirements
- **Fix**: Define clear alignment
- **JSON update**: Enhance composition_and_framing section

### If Color Accuracy Low (< 7):
- **Fix**: Use EXACT hex codes (not color names)
- **Fix**: Specify color relationships
- **Fix**: Add color accuracy to negative prompts
- **JSON update**: Be more specific in color_and_grade.hex_codes

### If Typography Low (< 7):
- **Fix**: Specify font name, size, weight explicitly
- **Fix**: Add WCAG contrast requirements
- **Fix**: Include letter-spacing, line-height
- **JSON update**: Complete typography section with all specs

### If Professionalism Low (< 7):
- **Fix**: Add negatives: "amateur", "clip-art", "cheesy"
- **Fix**: Reference professional aesthetic examples
- **Fix**: Verify platform appropriateness
- **JSON update**: Strengthen style specifications

### If Prompt Accuracy Low (< 7):
- **Fix**: Increase specificity in all JSON sections
- **Fix**: Use technical terminology
- **Fix**: Add "MUST include X" statements
- **JSON update**: Add more detail to subject descriptions

---

## 💾 Save Successful Prompts

When score ≥ 9:

```yaml
<action>Save JSON prompt as template:</action>
<action>Location: bmad/agents/ai-image-generator/ai-image-generator-sidecar/templates/</action>
<action>Naming: {platform}-{type}-{topic}.json</action>
<action>Example: linkedin-carousel-ai-agents.json</action>
<action>Include metadata: Score, date, platform, use case</action>
```

---

**For complete quality standards, see:**
`bmad/modules/json-prompt-generator/sidecar/emily-quality-standards.md`

**This framework ensures consistent Emily-quality across ALL image generation!** 🎯
