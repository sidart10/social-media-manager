# LinkedIn Post + CAROUSEL - Wednesday Nov 6, 9:00 AM
**Topic**: How to Choose an AI Agent Platform: PM Decision Framework
**Voice Mode**: Analyst
**Priority**: ⭐ Priority 1
**Add-On**: 6-slide carousel (requires AI Image Generator)

---

## POST (Copy-Ready)

Choosing between AgentKit, Claude SDK, or Vertex AI for your AI agent? Here's the framework I use.

Most PMs approach this like a feature checklist. Wrong approach.

The right question isn't "which has more features?" It's "which aligns with your product trajectory?"

**Three decision criteria:**

**1. Control vs Speed tradeoff**

Where are you in the product lifecycle?

Early validation: Speed matters most
→ AgentKit (visual builder, 45-min first agent, managed runtime)

Scaling to production: Control matters most
→ Claude SDK (code-first, self-hosted, full customization)

Enterprise deployment: Integration matters most
→ Vertex AI (Google Cloud ecosystem, enterprise SLAs)

**2. Cost structure alignment**

AgentKit: Pay-per-token on GPT models (variable costs scale with usage)

Claude SDK: Flat API pricing (predictable costs, easier budgeting)

Vertex AI: Enterprise contracts (volume discounts, but minimum commitments)

Your burn rate tolerance determines which makes sense. Variable costs optimize for lean validation. Fixed costs optimize for scale predictability.

**3. Platform stickiness assessment**

This is a 3-5 year decision, not a quarterly one.

Once you build evals, custom tools, and integrations on a platform, switching costs are high. Think AWS migration - technically possible, economically painful.

Ramp saved 70% dev time with AgentKit, but they also built their entire eval framework there. Carlyle's 30% accuracy gain came from platform-specific optimization.

You're not just choosing a tool. You're choosing an ecosystem.

**Decision matrix:**

Validating → AgentKit (speed wins)
Scaling → Claude SDK (control wins)
Enterprise → Vertex AI (integration wins)

But the real answer depends on:
- Your team's technical depth
- Data residency requirements
- Existing cloud commitments
- Risk tolerance for vendor lock-in

**My recommendation:**

Start with AgentKit for validation. If it works, evaluate switching costs vs rebuild costs before scaling.

Or start with Claude SDK if you have engineering capacity and know you'll need customization.

Don't start with all three. Pick one, commit, then reassess at scale.

What platform are you choosing and why? Share your decision criteria below.

---

## CAROUSEL REQUIREMENTS (For AI Image Generator)

**Design System**: LinkedIn dark monochrome (professional tech aesthetic)
**Dimensions**: 1080x1080 per slide (square format)
**Slide Count**: 6 slides
**Style**: Minimalist, data-focused, decision-tree visual

### Slide 1: Title Card
**Content**:
- Title: "How to Choose Your AI Agent Platform"
- Subtitle: "A PM's Decision Framework"
- Author: "By sid | Lead AI PM at Samba TV"

**Visual**: Bold typography, clean background

---

### Slide 2: The Wrong Question
**Content**:
- Big X mark: "Which has more features?"
- Checkmark: "Which aligns with your product trajectory?"

**Visual**: Side-by-side comparison with visual hierarchy

---

### Slide 3: Decision Criteria
**Content**:
- "3 Core Criteria:"
- "1. Control vs Speed"
- "2. Cost Structure"
- "3. Platform Stickiness"

**Visual**: Numbered list with icons

---

### Slide 4: Platform Mapping
**Content**:
**Table format:**

| Platform | Best For | Tradeoff |
|----------|----------|----------|
| AgentKit | Validation | Speed over control |
| Claude SDK | Scaling | Control over ease |
| Vertex AI | Enterprise | Integration over flexibility |

**Visual**: Clean comparison table, color-coded

---

### Slide 5: Cost Models
**Content**:
- "AgentKit: Pay-per-token (variable)"
- "Claude SDK: Flat API (predictable)"
- "Vertex AI: Enterprise contracts (volume discounts)"
**Visual Element**: Cost curve graphs showing how each scales

**Visual**: Three mini-graphs showing cost trajectories

---

### Slide 6: Decision Framework
**Content**:
- "Pick ONE. Commit. Reassess at scale."
- Decision tree visual:
  - "Need speed?" → AgentKit
  - "Need control?" → Claude SDK
  - "Need enterprise?" → Vertex AI

**Visual**: Simple decision tree with arrows

---

## POST ANALYSIS

**Character Count**: 2143 chars (under 3000 ✓)
**Read Time**: ~2.5 minutes
**Structure**: Framework-heavy (your Analyst mode strength)

**Hook** (First 210 chars):
"Choosing between AgentKit, Claude SDK, or Vertex AI for your AI agent? Here's the framework I use.

Most PMs approach this like a feature checklist. Wrong approach.

The right question isn't "which has"

**Framework provided**:
- 3 decision criteria (control/speed, cost, stickiness)
- Decision matrix (validate/scale/enterprise)
- Real company examples (Ramp, Carlyle)

**Voice**: Analyst mode (systematic, framework-driven, strategic)

**Key Patterns Used**:
- "Wrong approach. Right question is..." (corrective framework)
- Systematic enumeration (3 criteria, 3 platforms)
- Economic transparency (cost structures as strategic consideration)
- Long-term thinking (3-5 year decision)
- Real data (Ramp 70%, Carlyle 30%)

---

## VISUAL STRATEGY

**Carousel Purpose**: Visual decision aid (saves, shares, references)

**Design Notes for AI Image Generator**:
- Dark monochrome (matches LinkedIn professional aesthetic)
- Minimal text per slide (visual > wordy)
- Data tables and decision trees (actionable)
- Consistent template across 6 slides
- Quote slide 4 table as "Save this for your next platform decision"

---

## POSTING STRATEGY

**Platform**: LinkedIn
**Time**: Wednesday 9 AM EST
**With**: 6-slide carousel

**Engagement Plan**:
1. Post with carousel
2. First comment: "DM me if you want to discuss your specific use case. Happy to share more insights from my testing."
3. Tag relevant thought leaders (optional): Product-focused AI accounts
4. Respond to every comment in first 2 hours
5. Share to LinkedIn groups: AI Product Management, Tech Leadership

**Hashtags**: #AI #ProductManagement #AgenticAI

---

## HANDOFF TO AI IMAGE GENERATOR

**Status**: Text complete ✅, Carousel specifications provided ✅
**Next Step**: Use `/ai-image-generator *carousel` with 6-slide requirements above

**Handoff Package**: Create `handoffs/wednesday-carousel-pm-framework.json` after all Wednesday content done

---

## METADATA

**Platform**: LinkedIn
**Format**: Long-form + 6-slide carousel
**Topic**: Platform decision framework for PMs
**Voice**: Analyst (frameworks, strategic, systematic)
**Carousel**: Yes (design specs provided)
**Estimated Engagement**: 3500-5000 views (carousel boosts 3x)
**Purpose**: Thought leadership, decision-making framework, high-save content
**Key Differentiation**: Framework for decision, not just feature comparison
