---
name: post-writer
description: Generate high-engagement social media posts for LinkedIn, X/Twitter (single tweets, threads, long-form), and Substack using proven formulas from Justin Welsh, Greg Isenberg, deedydas, and Paul Graham. Creates complete posts with hooks, formatting, and CTAs based on real creator methodology and 2025 best practices.
---

# Post Writer - Intelligent Post Generation Orchestrator

## Purpose

Automatically generates platform-optimized social media posts using proven viral formulas. You specify WHAT to write about and which platform, the skill handles all formatting, hooks, and optimization internally.

## Available Platforms (Auto-Routed)

**LinkedIn Posts**

- Justin Welsh PAIPS formula (Problem → Agitate → Intrigue → Positive → Solution)
- Justin Welsh "Relatable Enemy" (viral formula: 4.7M impressions)
- Top 5 List format
- Storytelling format
- Data-driven format

**Twitter/X Single Tweets**

- Greg Isenberg question style (thought-provoking, trailing questions)
- Deedydas data-driven (analysis + insights)
- Quote + commentary
- Image commentary (minimal text)
- Bold claim format

**Twitter/X Threads**

- 7-tweet listicle (most popular)
- Before-After-Bridge story
- How-to guide
- Surprising facts
- Contrarian take

**Twitter/X Long-Form**

- Analytical (data + insights)
- Storytelling (narrative arc)
- How-to guide (step-by-step)
- Contrarian (challenge conventional wisdom)

**Substack Newsletters**

- Paul Graham essay style
- Conversational insight
- Personal story
- How-to guide

**The skill intelligently routes based on**:

- Platform specified (LinkedIn | Twitter | Substack)
- Content type (single | thread | long-form | newsletter)
- Style preference (viral | educational | personal | data-driven)
- Audience and topic

## Instructions

When user requests post generation, the skill automatically:

### 1. Determine Platform and Format

**Quick Format Selection**:

- "Write LinkedIn post" → LinkedIn posts
- "Write tweet" → Twitter single tweet
- "Write Twitter thread" → Twitter thread (7 tweets)
- "Write Twitter long-form" → Twitter long-form article
- "Write Substack newsletter" → Substack newsletter

**Auto-detect from context**:

- Professional topic + short → LinkedIn
- Quick observation → Twitter single
- Multi-step guide → Twitter thread
- Deep analysis → Twitter long-form or Substack

### 2. Load Appropriate Prompt Template

**Internal routing (automatic)**:

```
IF platform == "LinkedIn":
  IF style == "viral" → prompts/linkedin-post.md (PAIPS or Enemy formula)
  IF style == "listicle" → prompts/linkedin-post.md (Top 5 format)
  IF style == "story" → prompts/linkedin-post.md (Storytelling format)

IF platform == "Twitter" AND format == "single":
  IF style == "question" → prompts/twitter-single-tweet.md (Greg Isenberg)
  IF style == "data" → prompts/twitter-single-tweet.md (Deedydas)
  IF style == "minimal" → prompts/twitter-single-tweet.md (Image commentary)

IF platform == "Twitter" AND format == "thread":
  → prompts/twitter-thread.md (auto-select listicle, story, how-to, etc.)

IF platform == "Twitter" AND format == "long-form":
  → prompts/twitter-long-form.md (analytical, story, how-to, contrarian)

IF platform == "Substack":
  → prompts/substack-newsletter.md (Paul Graham, conversational, etc.)
```

### 3. Generate Complete Post

**Automatically produces**:

- Platform-optimized hook
- Formatted content (line breaks, bullets, emojis)
- CTAs and engagement prompts
- Hashtags (if platform appropriate)
- Metadata (character count, engagement analysis)
- Visual suggestions
- Posting strategy

### 4. Quality Checks (Built-in)

**Auto-validates**:

- Character limits per platform
- Hook strength (first 210 chars LinkedIn, first 280 Twitter)
- Formatting optimization
- Engagement elements present
- Voice consistency

### 5. Output Complete Package

**Returns**:

- Copy-ready post
- Performance analysis
- Alternative versions
- Posting recommendations
- Visual suggestions

## Tool Routing Logic (Internal - Auto-Executed)

```
USER REQUEST: "Write LinkedIn post about AI tools"
  ↓
DETECT: Platform=LinkedIn, Topic=AI tools, Format=standard
  ↓
ROUTE TO: prompts/linkedin-post.md
  ↓
SELECT STYLE: Top 5 listicle (works well for tools)
  ↓
GENERATE: Complete post with PAIPS or Top 5 structure
  ↓
OUTPUT: Copy-ready LinkedIn post + metadata

USER REQUEST: "Write a Twitter thread about my journey from 0 to 10K followers"
  ↓
DETECT: Platform=Twitter, Format=thread, Type=personal story
  ↓
ROUTE TO: prompts/twitter-thread.md
  ↓
SELECT STRUCTURE: Before-After-Bridge (7 tweets)
  ↓
GENERATE: Complete thread with hook, progression, CTA
  ↓
OUTPUT: 7 copy-ready tweets + analysis

USER REQUEST: "Write a tweet about AI"
  ↓
DETECT: Platform=Twitter, Format=single, Topic=tech
  ↓
ROUTE TO: prompts/twitter-single-tweet.md
  ↓
SELECT STYLE: Deedydas data-driven OR Greg question (depends on angle)
  ↓
GENERATE: Single tweet <280 chars
  ↓
OUTPUT: Copy-ready tweet + alternatives

USER REQUEST: "Write Substack essay on writing"
  ↓
DETECT: Platform=Substack, Format=newsletter, Topic=creative
  ↓
ROUTE TO: prompts/substack-newsletter.md
  ↓
SELECT STYLE: Paul Graham essay techniques
  ↓
GENERATE: Complete newsletter with subject line, body, P.S.
  ↓
OUTPUT: Copy-ready newsletter + Notes promotion suggestions
```

**The skill handles fallbacks automatically** - if style unclear, defaults to proven high-engagement format.

## Usage

**From Jarvis workflows** - just invoke the skill:

```xml
<action>Use post-writer skill:
  - Topic: "AI infrastructure spending 2025"
  - Platform: LinkedIn
  - Style: data-driven
</action>
```

**Direct invocation examples**:

```
"Use post-writer skill to write LinkedIn post about productivity tools"

"Write a Twitter thread about how I built my first SaaS"

"Generate Substack newsletter on the future of AI agents"
```

**The skill figures out**:

- Which prompt template to use
- What format works best
- How to structure the hook
- Platform-specific optimizations
- Engagement tactics

## No Manual Formula Selection Needed

**Before** (manual):

```
Read prompts/linkedin-post.md
Understand PAIPS formula
Apply PAIPS to topic manually
Format for LinkedIn
Add hashtags
```

**After** (automatic):

```
"Use post-writer skill for LinkedIn post about burnout"
```

The skill handles all the complexity internally, applying Justin Welsh PAIPS formula automatically.

## Proven Formulas Available

### LinkedIn (from prompts/linkedin-post.md)

- **PAIPS**: Proven 276k impressions, 371 comments
- **Relatable Enemy**: Proven 4.7M impressions, 50k engagements
- **Top 5 Lists**: Highly shareable
- **Storytelling**: 22x more memorable
- **Data-Driven**: Builds credibility

### Twitter Single (from prompts/twitter-single-tweet.md)

- **Greg Isenberg Question**: 2,862 likes proven
- **Deedydas Data**: 1,407 likes proven
- **Image Commentary**: 6,323 likes ("yeah" + image)

### Twitter Threads (from prompts/twitter-thread.md)

- **7-Tweet Formula**: Beats 94% failure rate
- **Before-After-Bridge**: High viral potential
- **Listicle**: Most popular format

### Twitter Long-Form (from prompts/twitter-long-form.md)

- **First 280 chars hook** + expanded depth
- **2+ min read time** = algorithmic boost
- **500-2500 characters** optimal

### Substack (from prompts/substack-newsletter.md)

- **Paul Graham Techniques**: Self-riffing, strategic vocabulary
- **Welcome Notes**: 60-70% open rates
- **Substack Notes**: Discovery engine

## Reference Files

### Prompts

- **[prompts/linkedin-post.md](prompts/linkedin-post.md)** - Complete LinkedIn generation system (PAIPS, Enemy, Top 5, etc.)
- **[prompts/twitter-single-tweet.md](prompts/twitter-single-tweet.md)** - Single tweet generation (Greg, Deedy, etc.)
- **[prompts/twitter-thread.md](prompts/twitter-thread.md)** - Thread generation (7-tweet formula, Before-After-Bridge)
- **[prompts/twitter-long-form.md](prompts/twitter-long-form.md)** - Long-form article generation
- **[prompts/substack-newsletter.md](prompts/substack-newsletter.md)** - Newsletter generation (Paul Graham essay style)

### Best Practices

- **[best-practices-reference.md](best-practices-reference.md)** - Complete research compilation from Justin Welsh, Twitter formulas, Paul Graham, Substack strategies

### Examples

- **[examples/linkedin-justin-welsh-paips.md](examples/linkedin-justin-welsh-paips.md)** - PAIPS formula in action
- **[examples/twitter-thread-listicle.md](examples/twitter-thread-listicle.md)** - 7-tweet listicle example
- **[examples/twitter-single-greg-isenberg.md](examples/twitter-single-greg-isenberg.md)** - Greg Isenberg question style

## Integration with Jarvis Agent

This skill is invoked by Jarvis when:

- User asks to "write a post"
- Workflow triggers post generation
- Content creation pipeline needs platform-formatted output

**Jarvis workflow integration**:

```yaml
# In workflow step
- action: 'use_skill'
  skill: 'post-writer'
  parameters:
    topic: '{{research_topic}}'
    platform: 'LinkedIn'
    style: 'viral'
    key_points: '{{research_findings}}'
```

## Quality Standards

### Every LinkedIn post includes:

- Hook in first 210 characters (above fold)
- 3-line formatting with spacing
- <200 words total
- 1-3 emojis for emphasis
- Strong CTA
- 3-5 hashtags

### Every Twitter single tweet includes:

- Hook in first line (<280 chars total)
- Line breaks for readability (if multi-line)
- Authentic voice
- Optional: Image suggestion
- Optional: 1-2 hashtags max

### Every Twitter thread includes:

- Hook with tension + curiosity
- 7 tweets (5-10 range)
- <250 chars per tweet
- One idea per tweet
- Visual break suggestions
- Clear CTA

### Every Twitter long-form includes:

- Hook in first 280 chars (compels "Show more")
- Total 500-2500 characters
- Formatting (headings, bold, line breaks)
- Images throughout
- Conversational tone
- Engagement prompt at end

### Every Substack newsletter includes:

- Curiosity-driven subject line
- Immediate hook in opening
- Conversational tone
- Section breaks
- Natural flow
- Optional CTA

## Performance Expectations

Based on proven formulas:

- **LinkedIn**: 82% read beyond first 2 lines (beat industry avg)
- **Twitter Single**: >200 likes (viral threshold)
- **Twitter Thread**: >10 retweets (beat 94% failure rate)
- **Twitter Long-Form**: 2+ min read time (algorithmic boost)
- **Substack**: >60% open rate (optimize subject + hook)

## Examples

### Example 1: LinkedIn Post Generation

**User request:** "Write LinkedIn post about creator burnout"

**Skill execution:**

1. Detects: Platform=LinkedIn, Topic=burnout, Audience=creators
2. Routes to: prompts/linkedin-post.md
3. Selects: PAIPS formula (problem-solution works for burnout)
4. Generates: Complete post with hook, agitation, solution
5. Returns: Copy-ready post + metadata

**Output:** See [examples/linkedin-justin-welsh-paips.md](examples/linkedin-justin-welsh-paips.md)

### Example 2: Twitter Thread Generation

**User request:** "Write Twitter thread about 5 AI tools that save time"

**Skill execution:**

1. Detects: Platform=Twitter, Format=thread, Type=listicle
2. Routes to: prompts/twitter-thread.md
3. Selects: 7-tweet listicle structure
4. Generates: Hook + 5 tools (one per tweet) + CTA
5. Returns: 7 copy-ready tweets

**Output:** See [examples/twitter-thread-listicle.md](examples/twitter-thread-listicle.md)

### Example 3: Twitter Single Tweet

**User request:** "Write thought-provoking tweet about AI and education"

**Skill execution:**

1. Detects: Platform=Twitter, Format=single, Style=philosophical
2. Routes to: prompts/twitter-single-tweet.md
3. Selects: Greg Isenberg question format
4. Generates: Multi-line question with trailing thought
5. Returns: Copy-ready tweet + alternatives

**Output:** See [examples/twitter-single-greg-isenberg.md](examples/twitter-single-greg-isenberg.md)

## Notes

- This skill uses **direct Claude prompting with proven templates**
- Prompts based on **real creator formulas** (Justin Welsh 4.7M impressions, Greg Isenberg 2.8K likes)
- Incorporates **2025 engagement data** from platform analysis
- Simple, reliable, and produces **complete, formatted posts**
- **No multi-agent complexity** - just working prompts that follow proven patterns

---

_Generated posts are platform-optimized and ready to publish._
