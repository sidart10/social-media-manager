# youtube-research - Analysis Patterns

**How to analyze YouTube transcripts for insights**

---

## Pattern 1: Hook Analysis (First 10 Seconds)

**Goal:** Identify what grabs attention

**Method:**

1. Extract first 3-5 segments (~10 seconds total)
2. Concatenate into hook text
3. Categorize hook type

**Hook Types:**

**Question Hook:**

```
"Ever wonder why some people succeed with automation and others fail?"
Keywords: "Ever wonder", "Have you", "What if", "Why do"
```

**Number Hook:**

```
"5 AI tools that will change how you work forever"
Keywords: Starts with digit, "X ways", "X things"
```

**Story Hook:**

```
"When I started using AI agents, I had no idea it would 10x my productivity"
Keywords: "When I", "Last week", "I tried", personal narrative
```

**Statement Hook:**

```
"Everything you know about productivity is wrong"
Keywords: Bold claim, controversial, definitive
```

**Assessment:**

- Strong: Creates curiosity, relatable problem, specific promise
- Medium: Interesting but not compelling
- Weak: Generic, vague, no hook

---

## Pattern 2: Structure Identification

**Goal:** Understand video organization

**Method:**

1. Scan transcript for transition markers
2. Identify topic changes
3. Map time allocation

**Transition Markers:**

- "First...", "Second...", "Third..." (listicle structure)
- "Now let's...", "Next up..." (sequential)
- "But here's the thing..." (pivot points)
- "To wrap up...", "In conclusion..." (ending markers)

**Common Structures:**

**Problem → Solution → Demo:**

```
0:00-1:00: Problem stated
1:00-5:00: Solution explained
5:00-8:00: Demo/walkthrough
8:00-9:00: Results + CTA
```

**Listicle (X Ways To...):**

```
0:00-0:30: Hook + intro
0:30-1:30: Way #1
1:30-2:30: Way #2
2:30-3:30: Way #3
...
8:30-9:00: Summary + CTA
```

**Tutorial (Step-by-step):**

```
0:00-1:00: What you'll learn
1:00-3:00: Step 1 with demo
3:00-5:00: Step 2 with demo
5:00-7:00: Step 3 with demo
7:00-8:00: Troubleshooting
8:00-9:00: Summary + CTA
```

---

## Pattern 3: Quote Extraction

**Goal:** Find memorable, quotable phrases

**Method:**

1. Scan for impactful sentences
2. Look for data/stats
3. Find expert attributions
4. Extract key insights

**What makes a good quote:**

- Contains data: "73% of developers..."
- Actionable insight: "The secret is to start small"
- Expert wisdom: "As [expert] taught me..."
- Counterintuitive: "More automation actually increases creativity"

**Format:**

```
"Quote text with full context" - {timestamp}

Example:
"Start with one repetitive task, not your entire workflow" - 3:15
```

---

## Pattern 4: Teaching Style Analysis

**Goal:** Understand how they explain concepts

**Assess:**

**Complexity:**

- Beginner: Explains basics, assumes no knowledge
- Intermediate: Assumes foundational understanding
- Advanced: Deep technical, industry jargon

**Approach:**

- Demo-heavy: Shows tools, screens, walkthroughs (60%+ demo time)
- Theory-first: Explains concepts before showing (40%+ explanation)
- Story-driven: Personal narrative throughout (30%+ personal stories)
- Data-driven: Stats, research, studies (20%+ data references)

**Examples Used:**

- Specific tools named (Zapier, Make.com, etc.)
- Real workflows shown
- Case studies referenced
- Personal experiences shared

---

## Pattern 5: Engagement Tactics

**CTA Analysis:**

```
Where: Usually last 30 seconds
Types:
- "Subscribe for more {topic} content"
- "Drop a comment if you've experienced this"
- "Check out my other video on..."
- "Grab the free template in description"

Effectiveness markers:
- Specific (tells exact action)
- Valuable (offers something)
- Easy (low friction)
```

**Retention Hooks:**

```
Throughout video:
- "But wait, there's more..."
- "The real magic happens when..."
- "Here's where it gets interesting..."

Purpose: Keep viewer watching
```

---

## Output Format

**After analyzing transcript:**

```markdown
# YouTube Analysis: {Video Title}

**URL:** {url}
**Duration:** {mm:ss}
**Transcript:** Available ✓

## Hook (0:00-0:10)

"{hook_text}"

- Type: {question|number|story|statement}
- Effectiveness: {strong|medium|weak}
- Why: {brief analysis}

## Structure

- Intro: 0:00-{time} ({purpose})
- Point 1: {time}-{time} ({topic})
- Point 2: {time}-{time} ({topic})
- CTA: {time}-end ({cta_text})

## Key Quotes

- "{quote}" ({timestamp}) - {context}
- "{quote}" ({timestamp}) - {context}

## Teaching Style

- Complexity: {level}
- Approach: {demo|theory|story|data}
- Examples: {what_they_showed}

## Patterns Observed

{recurring_elements}
```

---

**For tool reference, see:** `youtube-transcript-tool.md`
**For workflow integration, see:** `workflow-integration.md`
