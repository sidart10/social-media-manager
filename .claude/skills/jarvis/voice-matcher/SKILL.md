---
name: voice-matcher
description: Apply user's voice profile to generated content by matching vocabulary, sentence structure, tone, emoji usage, and signature phrases. Load voice profile from jarvis-sidecar/memories.md. Use when generating content (posts, scripts, captions) that needs to sound authentic, not AI-generated.
allowed-tools: Read, Edit
---

# Voice Matcher Skill

## Purpose

Apply the user's authentic voice characteristics to generated content to ensure it sounds natural and not AI-generated.

## When to Use This Skill

Invoke when:

- Generating social media posts
- Writing video scripts
- Creating captions or descriptions
- User asks content to "sound like me" or "match my voice"
- Part of write-posts, write-scripts workflows
- After research is complete and content needs to be drafted

## Instructions

### Step 1: Load Voice Profile

**Read:** jarvis-sidecar/memories.md

**Extract Voice Profile section:**

- Vocabulary patterns
- Sentence structure preferences
- Tone markers
- Signature phrases
- Emoji usage
- Hook preferences
- Platform-specific variations

**If voice profile not populated:**

- Display: "Voice profile not yet created. Run /learn-voice workflow to analyze your existing content and build your voice profile."
- Suggest: Use default professional tone until profile available
- Note in output: "Using generic voice - will improve after voice profile created"

### Step 2: Analyze Generated Content

**For the content to be voice-matched:**

- Identify current characteristics:
  - Vocabulary level (formal/casual/technical)
  - Sentence length and structure
  - Tone (authoritative/friendly/conversational)
  - Emoji presence/absence
  - Hook style
  - Personal touches

### Step 3: Apply Voice Characteristics

**Vocabulary Matching:**

- Replace generic words with user's preferred terms
- Match technical vs. casual language mix
- Use signature phrases where appropriate
- Examples:
  - Generic: "utilize" → User: "use"
  - Generic: "amazing" → User: "solid"

**Sentence Structure:**

- Match user's preferred sentence length
- Apply punctuation style (periods vs. dashes vs. ellipses)
- Replicate paragraph breaks pattern
- Use short vs. long sentences based on profile

**Tone Markers:**

- Apply user's characteristic tone words
- Match enthusiasm level
- Replicate questioning style
- Use contractions if user does (don't vs. do not)

**Signature Phrases:**

- Inject user's common openers ("Here's the thing:", "Real talk:")
- Use their characteristic transitions
- Apply their typical closers

**Emoji Usage:**

- Match frequency (heavy/moderate/light/none)
- Use similar emoji types
- Replicate placement patterns (inline vs. end of line)

**Hook Preferences:**

- If user prefers question hooks, use questions
- Match their hook complexity
- Replicate their attention-grabbing style

**Platform Variations:**

- Apply platform-specific voice adjustments
- Twitter: User's Twitter-specific patterns
- LinkedIn: User's professional voice variations
- YouTube: User's video script style

### Step 4: Validation Check

**Compare transformed content against profile:**

- Does it use user's vocabulary?
- Does sentence structure match?
- Is tone consistent with profile?
- Are signature phrases present?
- Is emoji usage aligned?

**If mismatches found:**

- Make additional adjustments
- Prioritize most distinctive voice markers

### Step 5: Output Matched Content

**Return content with:**

- Voice-matched text
- Note which characteristics were applied
- Confidence score (how well it matches profile)

**Format:**

```markdown
# Voice-Matched Content

[Content here with voice applied]

---

**Voice Characteristics Applied:**

- Vocabulary: {user's style}
- Sentence structure: {pattern applied}
- Tone: {tone markers used}
- Signature phrases: {phrases included}
- Emoji: {usage pattern}

**Voice Match Confidence:** {score}/10
```

## Example

**Original Content (Generic AI):**
"Artificial intelligence is revolutionizing the workplace. Organizations are utilizing AI to automate tasks and enhance productivity. This amazing technology is transforming how we work."

**Voice-Matched Content (User's Style):**
"AI is changing work fast. Companies are using AI to automate stuff and boost productivity. This tech is solid for how we get things done."

**Applied:**

- Vocabulary: "utilize" → "use", "amazing" → "solid"
- Sentence structure: Shorter, punchier
- Tone: More casual, direct
- Removed formal constructions

## Quality Standards

- Must reference actual voice profile data
- Cannot invent voice characteristics not in profile
- If profile incomplete, note which elements are default
- Voice match confidence must be justified
- Platform-specific adjustments must be applied

## Edge Cases

**No voice profile exists:**

- Use professional default
- Note limitation clearly
- Suggest running /learn-voice

**Partial voice profile:**

- Apply available characteristics
- Note which elements are default
- Lower confidence score

**Platform not in profile:**

- Use closest platform match
- Apply general voice characteristics
- Note adaptation in output
