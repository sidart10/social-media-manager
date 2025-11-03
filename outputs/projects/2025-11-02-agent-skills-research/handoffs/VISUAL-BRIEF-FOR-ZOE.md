# Visual Production Brief: Agent Skills Twitter Thread

**To:** Zoe (Visual Production Specialist)
**From:** Jarvis (Content Intelligence)
**Date:** November 2, 2025
**Project:** Agent Skills Architecture Thread

---

## Context

I've created an 11-tweet Twitter thread about Anthropic's Agent Skills architecture. The content is solid (research-backed, voice-matched, production data included), but needs visuals to maximize engagement and clarity.

**Thread goal:** Explain Skills architecture to developers/AI engineers with mix of Anthropic's official diagrams + custom graphics that fit sid's brand.

---

## What I've Already Captured

**6 diagrams from Anthropic's engineering blog** (all saved to `04-media/images/`):

1. ✅ **04-progressive-disclosure-tiers.png** (77KB) - 3-tier architecture - **USE FOR TWEET 3**
2. ✅ **06-code-execution-hybrid.png** (256KB) - Code + LLM hybrid - **USE FOR TWEET 7**
3. ✅ 01-skills-intro-banner.png (265KB) - Hero image (backup)
4. ✅ 02-skill-md-anatomy.png (182KB) - SKILL.md structure (backup)
5. ✅ 03-bundle-additional-files.png (395KB) - File bundling (backup)
6. ✅ 05-context-window-trigger.png (259KB) - Context window sequence (backup)

**What this means:** We have 2 diagrams ready to use. Need 4 custom diagrams for other tweets.

---

## Custom Diagrams Needed (Priority Order)

### DIAGRAM 1: Token Efficiency Comparison (MUST-HAVE)

**For:** Tweet 4
**Concept:** Side-by-side showing old approach vs Skills approach

**Layout:**

```
┌──────────────────────┬──────────────────────┐
│   OLD APPROACH       │    WITH SKILLS       │
│   System Prompt      │     Metadata         │
│   Every Call         │    At Startup        │
│                      │                      │
│   2000 tokens    ❌  │   ~100 tokens    ✅  │
│                      │                      │
│   Bloated           │    Efficient         │
│   Full context      │   Load on-demand     │
│   every request     │   only when needed   │
└──────────────────────┴──────────────────────┘
        SAVINGS: 95% reduction in repetitive context
```

**Visual treatment:**

- Left side: Darker/heavier (red tint to show problem)
- Right side: Lighter/cleaner (green tint to show solution)
- **Big numbers:** "2000" vs "~100" should be the focal points
- Bottom banner: Highlight the 95% savings

**Why this matters:** This is the CORE efficiency argument - makes the abstract concept concrete with numbers.

---

### DIAGRAM 2: Comparison Table (MUST-HAVE)

**For:** Tweet 5
**Concept:** 4-way comparison of customization approaches

**Table content:**

```
┌──────────────┬────────────┬──────┬─────────────┬──────────┐
│              │   SKILLS   │ RAG  │FINE-TUNING │ PROMPTS  │
├──────────────┼────────────┼──────┼─────────────┼──────────┤
│Knowledge Type│ Procedures │Facts │  Behavior   │   Tone   │
│              │  (how to)  │(what)│ (patterns)  │  (guide) │
├──────────────┼────────────┼──────┼─────────────┼──────────┤
│Update Speed  │  Instant   │Fast  │   Weeks     │ Instant  │
│              │(edit file) │      │  (retrain)  │          │
├──────────────┼────────────┼──────┼─────────────┼──────────┤
│Capacity      │ Unbounded  │ OK   │   Fixed     │ Limited  │
│              │(filesystem)│      │  (weights)  │(context) │
├──────────────┼────────────┼──────┼─────────────┼──────────┤
│Composable    │     ✅     │  ⚠️   │      ❌     │    ❌    │
└──────────────┴────────────┴──────┴─────────────┴──────────┘
```

**Visual treatment:**

- Clean grid with borders
- **Highlight Skills column** (subtle orange accent or border)
- Checkmarks: ✅ green, ⚠️ orange, ❌ red
- Readable text size (mobile-friendly)
- Consider making this **1:1 square** for better mobile visibility

**Why this matters:** Core educational value - this table answers "when do I use each approach?"

---

### DIAGRAM 3: Skills + MCP Relationship (SHOULD-HAVE)

**For:** Tweet 6
**Concept:** Show they're complementary, not competitive

**Layout:**

```
┌────────────────┐          ┌────────────────┐
│      MCP       │          │     SKILLS     │
│                │          │                │
│ External World │◄────────►│Internal        │
│                │          │Knowledge       │
│                │          │                │
│ • GitHub       │          │ • Procedures   │
│ • Databases    │          │ • Workflows    │
│ • APIs         │          │ • Patterns     │
└────────────────┘          └────────────────┘
        │                           │
        └──────────┬────────────────┘
                   ▼
        ┌──────────────────────┐
        │   WORKING TOGETHER   │
        │                      │
        │ MCP: Database access │
        │ Skills: Query rules  │
        │ Result: Efficient    │
        │         queries      │
        └──────────────────────┘
```

**Visual treatment:**

- Two distinct boxes (MCP left, Skills right)
- **Connection arrows** showing they work together (not compete)
- Middle box shows concrete example
- Orange accent for connection lines
- Clean, technical diagram

**Why this matters:** Clarifies common confusion - people think Skills vs MCP, but it's Skills + MCP.

---

### DIAGRAM 4: Sid's 12 Skills Ecosystem (SHOULD-HAVE)

**For:** Tweet 9
**Concept:** Show sid's actual implementation (personal proof)

**Layout:**

```
                ┌──────────────────┐
                │  JARVIS AGENT    │
                │   (12 Skills)    │
                └────────┬─────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
   ┌────────┐      ┌──────────┐    ┌──────────┐
   │RESEARCH│      │ STRATEGY │    │ CREATION │
   └────────┘      └──────────┘    └──────────┘
       │                │               │
       │                │               │
  • deep-web        • research-    • post-writer
  • youtube         • evidence-    • video-script
  • profile-          tracker      • voice-matcher
  • social-media                     (77 posts, 8/10)
                                   • platform-
                                     formatter
                                   • thumbnail-
                                     mastery
                                   • youtube-
                                     growth

         Result: Generic LLM → Domain Expert
```

**Visual treatment:**

- Clean hierarchy (top-down flow)
- **Three columns** for the three workflow phases
- Actual skill names (makes it authentic)
- **Highlight voice-matcher stats** in orange (77 posts, 8/10 confidence)
- Bottom banner with transformation statement
- Personal touch (these are sid's real skills)

**Why this matters:** Personal proof - shows this isn't theoretical, sid actually built this system.

---

## Style Guidelines (CRITICAL)

**Brand aesthetic:** Dark tech minimalism

**Color palette:**

- Background: #0E0E0E (pure black or near-black)
- Secondary backgrounds: #1a1a1a (boxes/cards)
- Text primary: #FFFFFF (white)
- Text secondary: #E5E5E5 (light gray)
- Accent: #D4A27F (orange/tan - use sparingly for highlights)
- Success: #4CAF50 (green for checkmarks)
- Warning: #FF9800 (orange for warnings)
- Error: #FF4444 (red for problems)

**Typography:**

- **Primary:** Inter, SF Pro, or similar clean sans-serif
- **Headings:** Bold (700 weight)
- **Body:** Regular (400 weight)
- **Code/technical:** JetBrains Mono or monospace
- **Size:** Must be readable on mobile (not too small)

**Design principles:**

- ❌ NO playful colors
- ❌ NO decorative elements
- ❌ NO consumer-y feel
- ✅ Professional
- ✅ Technical
- ✅ Authoritative
- ✅ Clean
- ✅ High contrast
- ✅ Data-focused

**Reference:** Developer documentation style, technical architecture diagrams, LinkedIn dark carousel aesthetic

---

## Specifications (All Custom Diagrams)

**Dimensions:**

- **Standard:** 1200×675 (16:9 for Twitter)
- **Alternative:** 1200×1200 (1:1 square for comparison table - better mobile visibility)

**Format:** PNG (high quality)

**File size:** Under 500KB per image (web-optimized)

**Naming:** custom-{number}-{description}.png

**Save location:** `outputs/projects/2025-11-02-agent-skills-research/04-media/images/`

---

## Optional Diagrams (If You Have Time/Energy)

### DIAGRAM 5: Production Stats Display

**For:** Tweet 8
**Concept:** Big number cards showing metrics
**Priority:** Low (data already in tweet text)
**Skip if:** Time-constrained

### DIAGRAM 6: Evolution Timeline

**For:** Tweet 11
**Concept:** Phase 1 → 2 → 3 → Future roadmap
**Priority:** Low (text close is strong enough)
**Skip if:** Want to ship faster

---

## Recommended Workflow

**Step 1:** Create the 2 MUST-HAVE diagrams first

- Token comparison (Tweet 4)
- Comparison table (Tweet 5)

**Step 2:** Create the 2 SHOULD-HAVE diagrams

- Skills + MCP relationship (Tweet 6)
- Sid's 12 skills ecosystem (Tweet 9)

**Step 3:** Assess time/energy

- If good momentum: Add stats display and/or timeline
- If ready to ship: Stop at 4 custom + 2 Anthropic = 6 total visuals

**Estimated time:**

- 2 MUST-HAVE: ~20-25 mins
- 2 SHOULD-HAVE: ~20-25 mins
- 2 NICE-TO-HAVE: ~20-25 mins
- **Total for all 6:** ~60-75 mins

**My recommendation:** Create the 4 priority diagrams (MUST + SHOULD), use 2 Anthropic diagrams = 6 visuals total across 11 tweets. This is solid visual density without over-investing.

---

## Visual Placement Map (Final Thread)

**When Zoe completes diagrams, here's the final map:**

1. **Tweet 1:** Text only
2. **Tweet 2:** Text only
3. **Tweet 3:** `04-progressive-disclosure-tiers.png` (Anthropic)
4. **Tweet 4:** `custom-01-token-comparison.png` (Zoe)
5. **Tweet 5:** `custom-02-comparison-table.png` (Zoe)
6. **Tweet 6:** `custom-03-skills-mcp-relationship.png` (Zoe)
7. **Tweet 7:** `06-code-execution-hybrid.png` (Anthropic)
8. **Tweet 8:** Text only (or custom stats if created)
9. **Tweet 9:** `custom-04-personal-skills-ecosystem.png` (Zoe)
10. **Tweet 10:** Text only
11. **Tweet 11:** Text only (or custom timeline if created)

**Visual density:** 4-6 images across 11 tweets = Optimal (not too sparse, not overwhelming)

---

## Success Metrics

**What makes these diagrams successful:**

✅ **Clarity:** Concept understandable in 3 seconds
✅ **Readability:** Text readable on mobile (not too small)
✅ **Brand match:** Dark tech aesthetic, professional
✅ **Data accuracy:** All numbers/labels correct per research
✅ **Mobile-optimized:** Works on phone screens
✅ **File size:** Under 500KB (loads fast)
✅ **Consistency:** All customs match each other stylistically

---

## Reference Materials for Zoe

**Research brief:** `01-research/research-brief.md`

- Contains all technical details
- All numbers verified
- Comparison framework explained

**Thread file:** `03-drafts/twitter/thread-agent-skills-architecture-v2.md`

- Complete thread text
- Shows exactly what each visual accompanies

**Visual strategy:** `02-ideas/visual-strategy.md`

- Tweet-by-tweet visual mapping
- Alternative approaches discussed

**Anthropic screenshots:** `04-media/images/`

- All 6 official diagrams captured
- Use as reference or direct inclusion

---

## Questions for Sid

**Before Zoe starts, confirm:**

1. **Approach:** Hybrid (4 custom diagrams) or Full suite (6 custom diagrams)?
2. **Timeline:** Need this today/tomorrow, or can take 2-3 days?
3. **Table format:** 16:9 wide or 1:1 square for comparison table?
4. **Personal ecosystem:** Include all 12 skill names or just highlights?

**My recommendations:**

1. Hybrid approach (4 customs + 2 Anthropic = 6 total)
2. 24-48 hour timeline (quality over speed)
3. 1:1 square for table (better mobile)
4. All 12 skills (shows the full system, builds credibility)

---

**Ready for handoff to Zoe?** Everything's documented, screenshots captured, specifications detailed.

Just need your go-ahead on the approach (hybrid vs full suite) and I'll ping Zoe!
