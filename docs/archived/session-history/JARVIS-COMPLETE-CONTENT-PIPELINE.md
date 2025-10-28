# Jarvis - Complete Content Creation Pipeline

**How Research → Ideas → Writing All Connects**

---

## 🔄 THE COMPLETE FLOW

### Stage 1: Research & Intelligence Gathering

```
USER: "Research AI automation tools"
  ↓
JARVIS: /research-topic workflow
  ↓
SKILLS: social-media-research, deep-web-research, youtube-research
  ↓
MCPs: get_trending_topics, exa/web_search, youtube-transcript
  ↓
OUTPUT: research-brief.md
  - Trending topics & hashtags
  - Data & statistics
  - Expert quotes
  - YouTube examples
  - Gaps & opportunities
  - 10-12 content angles
```

**File created:** `sessions/research-AI_automation_tools-2025-10-27.md`

---

### Stage 2: Idea Generation (Uses Research)

```
USER: "Generate ideas from this research"
  ↓
JARVIS: /generate-ideas workflow
  ↓
INPUT: research-brief.md (from Stage 1)
  ↓
PROCESS:
  - Extracts top content angles from research
  - Pulls hashtags from research
  - Uses data/stats as evidence
  - References quotes from research
  ↓
OUTPUT: idea-cards.md
  - 5-10 Idea Cards
  - Each has:
    • Title (from content angle)
    • Hook (from research insights)
    • Outline (3-5 beats using research data)
    • Evidence (sources from research)
    • Hashtags (from trending research)
    • Platform recommendation
```

**File created:** `sessions/idea-cards-AI_automation-2025-10-27.md`

---

### Stage 3A: Writing Posts (Uses Ideas + Research)

```
USER: "Write LinkedIn post from Idea Card #3"
  ↓
JARVIS: /write-posts workflow
  ↓
INPUT:
  - idea-card.md (specific idea)
  - research-brief.md (evidence)
  - voice-profile (from memories.md)
  ↓
GENERATION OPTIONS:

Option A: AutoGen Skill
  - Multi-agent collaboration
  - Title_Agent, Hook_Agent, Content_Agent, Tone_Agent
  - Uses research data as context
  - Applies voice profile
  - Platform-specific formatting
  ↓
Option B: social-media-mcp create_post
  - Uses GPT-5/Sonnet 4.5
  - Q&A mode for context
  - Platform formatting
  - (But conversational overhead)
  ↓
OUTPUT: LinkedIn post
  - Hook (< 140 chars from idea)
  - Body (uses research evidence)
  - CTA (from idea card)
  - Hashtags (from research)
  - In YOUR voice (from voice profile)
```

**File created:** `outputs/linkedin-post-AI_automation-2025-10-27.md`

---

### Stage 3B: Writing Scripts (Uses Ideas + Research)

```
USER: "Write 90s YouTube script from Idea Card #2"
  ↓
JARVIS: /write-scripts workflow
  ↓
INPUT:
  - idea-card.md (specific idea)
  - research-brief.md (evidence, examples)
  - voice-profile (from memories.md)
  - platform: youtube
  - duration: 90s
  ↓
GENERATION: AutoGen Skill
  - Master_Agent: Determines reel vs video (based on duration)
  - Research_Agent: Uses research-brief data
  - Title_Agent: Creates title
  - Intro_Hook_Agent: 8-word hook (or 5s for reels)
  - Content_Agent: Main points (uses research examples)
  - Tone_Agent: Applies MKBHD/conversational style
  - Spoken_English_Agent: Adds "um", "you know" (natural)
  - Outro_Agent: CTA
  - Reviewer_Agent: Fact-checks against research
  ↓
OUTPUT: YouTube script
  - 0:00-0:05 HOOK (from Intro_Hook_Agent)
  - 0:05-0:15 INTRO (sets up topic)
  - 0:15-1:20 CONTENT (main points with research data)
  - 1:20-1:30 OUTRO (CTA)
  - [Visual cues]
  - [B-roll suggestions]
  - Quotes with timestamps (from research)
```

**File created:** `outputs/youtube-script-90s-AI_automation-2025-10-27.md`

---

## 🎯 HOW WRITING STYLE WORKS

### Different Post Types & Styles

**The AutoGen system handles this via:**

#### For LinkedIn (Professional):
```python
platform = "linkedin"
tone = "professional and data-driven"
audience = "CTOs and engineering leaders"

→ Tone_Agent applies:
  - Professional language
  - Data-driven arguments
  - Formal structure
  - Industry terminology
```

#### For Twitter (Casual):
```python
platform = "twitter"
tone = "casual and conversational"
audience = "developers"

→ Tone_Agent applies:
  - Shorter sentences
  - Casual language
  - Direct communication
  - Dev-friendly terms
```

#### For Reels/TikTok (Engaging):
```python
platform = "reels"
tone = "MKBHD-style casual"
audience = "general tech enthusiasts"

→ Tone_Agent_Reel applies:
  - 8-word hook
  - Fast-paced content
  - Spoken English (um, like, you know)
  - Engaging CTA
```

---

### User Voice Profile Integration

**From learn-voice workflow:**
```
memories.md contains:
- Vocabulary level (simple/moderate/advanced)
- Sentence pattern (short/varied/flowing)
- Tone score (1-10, formal to casual)
- Signature phrases ("here's the thing", "super useful")
- Emoji usage (never/rare/moderate)
```

**AutoGen integration:**
```python
# Before generating, load voice profile
voice_profile = load_from_memories()

# Adjust Tone_Agent system message:
TONE_AGENT_PROMPT = f"""
    {base_prompt}

    CRITICAL: Match user's writing style:
    - Vocabulary: {voice_profile.vocab_level}
    - Sentence style: {voice_profile.sentence_pattern}
    - Tone: {voice_profile.tone_score}/10 casual
    - Use these phrases naturally: {voice_profile.signature_phrases}
    - Emoji usage: {voice_profile.emoji_pattern}
"""

# Now Tone_Agent generates in USER'S voice!
```

---

## 📊 RESEARCH → WRITING DATA FLOW

### What Research Provides:

**From research-brief.md:**
```markdown
## Key Facts
- "73% of developers automate < 20% of workflows" (DevSurvey)
- "AI automation market growing 28% YoY" (TechCrunch)

## Hashtags
#AIAutomation #ProductivityTools #NoCode

## YouTube Examples
- "Start with one repetitive task" - @creator (2:34)
- Demo-heavy approach works best

## Gaps
- Nobody covers automation for designers
```

### How Writing Uses It:

**write-posts workflow:**
```
Idea Card #3: "5 AI Tools That Automate Your Workflows"
↓
Loads research-brief.md
↓
AutoGen Content_Agent uses:
  - Fact: "73% automate < 20%" → Opening hook
  - Tools from research → The 5 tools to feature
  - Quote: "Start with one task" → Include in post
  - Hashtags: #AIAutomation → Use in post
↓
Generates LinkedIn post WITH evidence from research
```

**write-scripts workflow:**
```
Idea Card #2: "Why Most Developers Are Missing Out on Automation"
↓
Loads research-brief.md
↓
AutoGen agents use:
  - Stats from research → 0:15 mark "Did you know 73%..."
  - YouTube examples → Structure inspiration
  - Quotes → 1:20 mark "As expert said..."
  - Gaps → 2:00 mark "Here's what nobody talks about..."
↓
Generates script WITH research-backed content
```

---

## 🎨 DIFFERENT POST TYPES

**AutoGen can generate all these (via parameters):**

### Post Type 1: LinkedIn Article
```python
platform = "linkedin"
content_type = "educational"
length = "1600 chars"
tone = "professional"
structure = "hook → 3 points with data → CTA"
```

### Post Type 2: Twitter Thread
```python
platform = "twitter"
content_type = "thread"
length = "6 tweets"
tone = "conversational"
structure = "hook tweet → point tweets → summary + CTA"
```

### Post Type 3: Instagram Caption
```python
platform = "instagram"
content_type = "story-driven"
length = "300 words"
tone = "casual and engaging"
structure = "hook (125 chars) → story → value → CTA"
emoji_usage = "2-5 strategically placed"
```

### Script Type 1: YouTube (3-10 min)
```python
platform = "youtube"
duration = "90s" or "5min" or "10min"
tone = "MKBHD conversational"
structure = "hook → intro → 3-7 points → recap → CTA"
includes = ["timestamps", "B-roll suggestions", "visual cues"]
```

### Script Type 2: Reels/TikTok (30-90s)
```python
platform = "reels"
duration = "60s"
tone = "fast-paced engaging"
structure = "3s hook → 4-5 beats (12s each) → CTA"
spoken_style = "um, like, you know" (natural)
```

---

## 🔗 COMPLETE INTEGRATION

### How Everything Connects:

**Step 1: Research** (research-topic)
- Gathers: trends, data, quotes, examples
- Saves: research-brief.md

**Step 2: Ideation** (generate-ideas)
- Input: research-brief.md
- Process: Creates Idea Cards with:
  - Titles (from content angles)
  - Hooks (from research insights)
  - Evidence (from research data)
  - Hashtags (from research)
- Saves: idea-cards.md

**Step 3: Voice Learning** (learn-voice) - ONE TIME
- Analyzes YOUR content
- Extracts voice patterns
- Saves: voice profile in memories.md

**Step 4: Writing** (write-posts OR write-scripts)
- Input:
  - Idea Card (which one to create)
  - Research brief (for evidence)
  - Voice profile (for style)
  - Platform specs (for formatting)
- Process: AutoGen Skill
  - Loads all inputs
  - Research_Agent: Uses research data
  - Content_Agent: Uses idea outline + evidence
  - Tone_Agent: Applies voice profile + platform style
  - Reviewer_Agent: Validates facts against research
- Output: Platform-ready post/script in YOUR voice

---

## 📋 IMPLEMENTATION PLAN

**Package AutoGen as Skill (1-2 hours):**

1. **Create Skill structure** (10 min)
2. **Copy your AutoGen code** (10 min)
3. **Add voice profile integration** (20 min)
4. **Add research data loading** (20 min)
5. **Write SKILL.md** (20 min)
6. **Test** (30 min)

**Result:** Proven multi-agent script generation integrated with Jarvis research & voice systems!

---

**Want me to start packaging your AutoGen code as a Skill?**

This creates a complete pipeline: Research → Ideas → AutoGen Writing → Platform-ready content! 🚀