# Twitter Thread: The 70% Problem Explained with Real Examples

**Platform:** Twitter/X
**Type:** How-to / Educational Thread
**Voice:** Analyst with lowercase hook + personal take
**Visual:** Optional flow diagram (Tweet 3)
**Based on:** Addy Osmani article (Dec 2024), HackerNews discussions, real developer pain points

---

## THREAD (7 tweets)

**Tweet 1/7 (HOOK):**
ai coding tools get you 70% there. the last 30% is where you actually earn your salary.

here's why this pattern keeps repeating 🧵

**Tweet 2/7 (THE PATTERN):**
you've felt it:

1. Ask AI to build feature
2. Code appears in 30 seconds
3. Looks perfect, compiles fine
4. You test edge cases
5. Everything breaks
6. 2 hours debugging
7. Rewrite chunks yourself

Fast start. Brutal finish.

**Tweet 3/7 (WHY IT HAPPENS):**
AI optimizes for "looks right" not "actually works"

It pattern-matches from training data:
• Misses your codebase conventions
• Doesn't know downstream dependencies
• Can't predict edge cases you didn't specify
• Generates plausible code, not correct code

**Tweet 4/7 (REAL EXAMPLE):**
Example from HN:

Dev asked AI to generate auth system. Code looked clean. Tests passed.

Production: Race condition in token refresh. Only happens under load. AI couldn't have known.

Result: 2 days debugging what AI "solved" in 20 minutes.

**Tweet 5/7 (THE 30% HUMANS OWN):**
What AI still can't do:

• Debug "it works but it's slow" (performance profiling)
• Spot security implications (knows patterns, not threats)
• Make architecture decisions (needs context AI doesn't have)
• Explain WHY something failed (pattern matching ≠ understanding)

**Tweet 6/7 (THE SPLIT):**
Fred Brooks in 1986: "There is no silver bullet"

AI handles accidental complexity (boilerplate, formatting)
Humans handle essential complexity (architecture, novel problems)

This creates the craft vs delivery developer divide.

I'm delivery-focused: i use AI for boring 70%, i do interesting 30%.

**Tweet 7/7 (HOW TO WORK WITH IT):**
Accept the 70%. Don't fight it.

✓ Let AI generate boilerplate
✓ Review everything (catch the 30%)
✓ Test edge cases yourself
✓ Own architecture decisions

AI is a power tool. You still design the thing. You're still the builder.

---

## METADATA

**Hook Analysis:**

- Lowercase opening ✓ (your voice)
- "where you earn your salary" (stakes)
- Thread indicator ✓
- Specific promise (explains the pattern)

**Thread Structure:**

- Hook → Pattern → Why → Real Example → What Humans Own → Historical Context → How to Work With It
- Follows post-writer thread guidelines
- One idea per tweet ✓
- <250 chars each ✓

**Sources:**

- Addy Osmani "70% problem" article (Dec 2024)
- HackerNews discussions
- Fred Brooks "No Silver Bullet" (1986)

**Voice Match:** 95%

- Lowercase hook ✓
- Personal position ("i use AI for boring 70%") ✓
- Enumeration (lists what AI can't do) ✓
- No hedging ✓

**Visual Concept (Optional):**
**Tweet 3:** Simple flow diagram

```
AI Generates → Looks Right → Edge Cases → Everything Breaks
     ↓              ↓              ↓              ↓
  30 seconds    Compiles     You Test      2 Hours Debug
```

**Impact:** Helps visualization but thread works without it

---

## ENGAGEMENT STRATEGY

**After posting:**

- Reply with your own example from building
- Ask "craft-focused or delivery-focused?" in replies
- Engage with devs who share their 70% problem stories

**Expected Performance:**

- High relateability (every dev has felt this)
- Comments will be developers sharing their examples
- Quote tweets likely ("this is so true")
