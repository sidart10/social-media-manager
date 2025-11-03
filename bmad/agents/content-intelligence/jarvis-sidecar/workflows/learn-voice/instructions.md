# Learn Voice Workflow Instructions (Enhanced v2.0)

<workflow>
<critical>This workflow MUST complete before write-posts or write-scripts can generate authentic content</critical>
<critical>Prioritize FREE tools (user's own APIs) over paid tools</critical>
<critical>v2.0 captures RHETORICAL DNA, not just surface patterns</critical>

<step n="1" goal="Gather user's profile URLs">
  <ask>I'll analyze your writing to capture your authentic voice - not just patterns, but your rhetorical DNA!

Please provide your profile URLs (need at least 1, ideally 2-3):

1. Twitter: Your @handle or profile URL
2. LinkedIn: Your profile URL
3. YouTube: Your channel URL (I'll analyze your spoken voice too)

Optional: URL to a writer whose style you'd like to blend (e.g., debarghyadas.com)

Note: I need at least {min_posts_required} posts total for accurate analysis. For deep rhetorical DNA extraction, 50+ posts recommended.

Provide URLs (one per line or comma-separated):
</ask>

<action>Parse provided URLs</action>
<action>Extract platforms and handles</action>
<action>Store: {platforms_provided}, {handles}, {reference_voice_url}</action>

<template-output>profiles_collected</template-output>
</step>

<step n="2" goal="Fetch YOUR content (cost-optimized)">
  <action>Display: "Fetching your content using free APIs where possible..."</action>

  <!-- TWITTER - Use built-in Twitter scraper if available -->
  <check if="twitter_handle provided">
    <action>Display: "📱 Twitter: Fetching your posts..."</action>

    <!-- Use apidojo/twitter-scraper-lite (verified, reliable) -->
    <action>Display: "Using Apify Twitter Scraper Lite (FREE tier available)"</action>
    <action>Use Apify: apidojo/twitter-scraper-lite</action>
    <action>Parameters:
      - twitterHandles: ["{handle}"]
      - maxItems: 100
      - sort: "Latest"
    </action>

    <action>Store tweets for analysis</action>
    <action>Display: "✓ Fetched {tweet_count} tweets"</action>
    <action>Log cost: ~$0.02-0.04</action>

  </check>

  <!-- LINKEDIN - Use verified NO COOKIES scraper -->
  <check if="linkedin_url provided">
    <action>Display: "💼 LinkedIn: Fetching your posts..."</action>

    <action>Extract username from LinkedIn URL (e.g., /in/siddani/ → siddani)</action>
    <action>Use Apify: datadoping/linkedin-profile-posts-scraper ✅ VERIFIED</action>
    <action>Parameters:
      - profiles: ["{linkedin_username}"]
      - max_posts: 50  // minimum 10, get 50 for good sample
    </action>

    <action>Store posts for analysis</action>
    <action>Display: "✓ Fetched {post_count} LinkedIn posts"</action>
    <action>Log cost: ~$0.06 (50 posts × $1.20/1000)</action>

  </check>

  <!-- YOUTUBE - Use FREE verified transcript extractor -->
  <check if="youtube_channel or youtube_video provided">
    <action>Display: "🎥 YouTube: Fetching video transcripts..."</action>

    <action>Use Apify: dz_omar/youtube-transcript-metadata-extractor ✅ VERIFIED</action>
    <action>Parameters:
      - youtubeUrl: [{"url": "{video_url}"}]  // Analyze 1-3 videos for speaking voice
      - cleaningLevel: "mild"
      - includeTimestamps: true
    </action>

    <action>Store transcripts for analysis</action>
    <action>Display: "✓ Fetched transcripts from {video_count} YouTube videos"</action>
    <action>Log cost: FREE (platform fee ~$0.009 per video)</action>

    <note>YouTube transcripts analyze your SPOKEN voice:
      - Speaking rhythm and pace (words per minute)
      - Natural transitions ("but", "however", "so")
      - Teaching patterns (step-by-step vs story-driven)
      - Conversational markers ("um", "you know", "so", "right?")
      - Filler words and verbal tics
      - Pacing variations

      This helps adapt scripts to match how you actually speak!
    </note>

  </check>

  <!-- REFERENCE VOICE (Optional blend) -->
  <check if="reference_voice_url provided">
    <action>Display: "🎨 Fetching reference voice for blending..."</action>

    <action>Use WebFetch or Exa to extract writing samples from reference URL</action>
    <action>Target: 20-30 representative samples</action>
    <action>Store reference samples separately</action>
    <action>Display: "✓ Reference voice samples collected"</action>

  </check>

<action>Total posts collected: {total_posts}</action>

  <check if="total_posts < min_posts_required">
    <ask>⚠️  Only collected {total_posts} posts. Need {min_posts_required}+ for accurate rhetorical DNA analysis.

    Options:
    1. Continue anyway (lower confidence score)
    2. Provide more profile URLs
    3. Reduce min_posts_required threshold

    Select: [1/2/3]
    </ask>

  </check>

<template-output>content_collected</template-output>
</step>

<step n="2.5" goal="Filter for authentic content (NEW v2.0)">
  <action>Display: "Filtering for your authentic writing (removing AI-generated content)..."</action>

<action>**AI-Generated Content Detection:** - Check timestamps: Recent posts (last 2 weeks) might be AI-generated - Analyze style consistency: Sudden pattern changes indicate AI - User confirmation: Ask user to confirm which recent posts are theirs
</action>

  <ask if="recent_posts_detected">
I found {recent_post_count} posts from the last 2 weeks. Some might be AI-generated (by me or other tools).

Recent posts:
{#recent_posts}

- "{post_preview_50_chars}" ({date})
  {/recent_posts}

Which of these did YOU actually write? (Enter numbers, e.g., "1,3,5" or "all" or "none"):
</ask>

<action>Filter out AI-generated content based on user response</action>
<action>Separate posts by length: - Short (< 150 chars): Casual voice candidates - Medium (150-500 chars): Mixed voice - Long (> 500 chars): Deep analysis candidates
</action>

<action>Display: "✓ Filtered to {authentic_post_count} authentic posts"</action>
<action>Display: " - Short: {short_count} | Medium: {medium_count} | Long: {long_count}"</action>

<template-output>authentic_content_filtered</template-output>
</step>

<step n="3" goal="Surface Pattern Analysis (LEGACY - Keep)">
  <action>Display: "Running surface pattern analysis..."</action>

<action>**1. Vocabulary Analysis:**

- Count technical terms (AI, API, LLM, model, inference, context, eval, etc.)
- Calculate complexity: simple (< 10%), moderate (10-30%), advanced (> 30%)
- Map jargon vs accessible ratio
- Create word frequency map (top 50 words)
- Note specialized vocabulary clusters
  </action>

<action>**2. Sentence Structure Analysis:**

- Calculate average sentence length (words)
- Distribution:
  • Short (< 10 words): X%
  • Medium (10-20 words): Y%
  • Long (> 20 words): Z%
- Identify rhythm pattern:
  • Staccato: > 50% short sentences
  • Flowing: > 50% long sentences
  • Varied: Mixed distribution (most engaging)
- Track sentence complexity (simple/compound/complex)
  </action>

<action>**3. Tone Marker Extraction:**

- Formality indicators:
  • Formal: "Furthermore", "Utilize", "Accordingly"
  • Casual: "Plus", "Use", "So"
- Enthusiasm markers:
  • Exclamation points per post
  • Energetic words: "amazing", "excited", "energizing"
  • Superlatives: "most", "best", "biggest"
- Personal vs analytical:
  • First-person: "I think", "I believe", "I'm"
  • Third-person: "Research shows", "Studies indicate"
- Calculate tone score: 1-10 (1=very formal, 10=very casual)
  </action>

<action>**4. Signature Phrase Extraction:**

- Find phrases used 3+ times across all posts
- Common transitions:
  • "here's the thing"
  • "don't get me wrong"
  • "it seems like"
  • "what sets this apart"
- Opening patterns (first sentence analysis)
- Closing patterns (last sentence analysis)
- Filler patterns: "actually", "basically", "literally"
- Create ranked list by frequency
  </action>

<action>**5. Emoji Usage Analysis:**

- Count emoji frequency per post:
  • Never: 0 emojis
  • Rare: < 0.5 per post
  • Moderate: 1-2 per post
  • Heavy: 3+ per post
- Placement pattern: beginning|middle|end|scattered
- Type preferences:
  • Professional: 📊📈💼
  • Energy: ⚡️🚀💡
  • Playful: 🎉😊👍
- Single vs multiple emoji per post
- Functional vs decorative usage
  </action>

<action>**6. Hook Preference Identification:**

- Categorize opening lines of user's posts:
  • Question hooks: "What did it miss?"
  • Number hooks: "5 reasons why..."
  • Story hooks: "Last week, I..."
  • Statement hooks: "Anthropic is the most confident company"
  • Bold declaration: "AI stopped being software"
- Calculate distribution percentages
- Identify natural tendency (most frequent type)
  </action>

<template-output>surface_patterns_complete</template-output>
</step>

<step n="4" goal="Rhetorical DNA Analysis (NEW v2.0)">
  <action>Display: "Extracting rhetorical DNA - this is where your essence lives..."</action>

<action>**DIMENSION 1: Argument Architecture**

Analyze HOW user builds arguments (structure, not just content):

**Multi-Act Detection:**

- **Act 1 (Opening):** Thesis, question, or story?
  • Count: Thesis openings (bold declarations)
  • Count: Question openings
  • Count: Story/anecdote openings
  • Identify most common

- **Act 2 (Qualification):** Presence of hedges/acknowledgments
  • Search for: "don't get me wrong", "it seems like", "I believe"
  • Frequency: Never | Rare | Common | Always
  • Purpose: Shows intellectual honesty vs absolutism

- **Act 3 (Proof):** How user supports claims
  • Framework-driven: Numbered lists, eras, phases
  • Data-driven: Statistics, percentages, multipliers
  • Example-driven: Specific instances, case studies
  • Enumeration: Lists items exhaustively (Gmail, Notion, GitHub)
  • Identify dominant proof style

- **Act 4 (Closing):** How user ends posts
  • Reframed thesis: Returns to opening with new insight
  • Action CTA: "Let's get to work"
  • Question: Leaves reader thinking
  • Forward-looking: "The future is..."
  • Calculate distribution

**Output:** Argument architecture formula (e.g., "Bold thesis → Qualification → Framework proof → Action close")
</action>

<action>**DIMENSION 2: Voice Mode Detection**

Identify distinct voice modes based on content type, length, and topic:

**Classification Criteria:**

- Post length (chars)
- Capitalization pattern (proper vs lowercase)
- Topic type (tech analysis vs personal vs community)
- Structural complexity
- Emotional tone

**Detect Modes:**

**Mode 1: Analyst**

- Triggers: Long posts (> 500 chars) about tech/product analysis
- Capitalization: Proper
- Structure: Framework-driven, numbered lists
- Proof: Enumerated features, named companies
- Energy: Confident but qualified
- Count posts matching this pattern

**Mode 2: Casual**

- Triggers: Short posts (< 150 chars), quick observations
- Capitalization: Often lowercase
- Structure: Simple observation, minimal setup
- Proof: Direct experience, no elaborate evidence
- Energy: Conversational, insider
- Count posts matching this pattern

**Mode 3: Community Protector**

- Triggers: Immigration, scams, community issues
- Capitalization: Proper
- Structure: Personal experience → Frustration → Action steps
- Proof: Personal data ("I receive X calls"), community sources
- Energy: Protective, emotional, actionable
- Count posts matching this pattern

**Mode 4: Satirist**

- Triggers: Calling out hype, exposing absurdity
- Capitalization: Proper (makes satire subtle)
- Structure: Over-the-top praise → Escalating absurdity → Deadpan close
- Proof: Hyperbolic claims as fact
- Energy: Deadpan, trusts reader intelligence
- Count posts matching this pattern

**Mode 5: Enthusiast**

- Triggers: Product launches, announcements, milestones
- Capitalization: Proper
- Structure: Build momentum → Peak excitement → Action CTA
- Proof: Specific tools/features listed
- Energy: High, genuine, infectious
- Count posts matching this pattern

**Mode Distribution:**

- Calculate % for each mode
- Identify default mode (most frequent)
- Create decision tree: When to use which mode

**Output:** Voice mode map with triggers and switching rules
</action>

<action>**DIMENSION 3: Structural Frameworks**

Extract frameworks user uses to organize complex information:

**Framework Types:**

- **Eras/Phases Framework:**
  • Search for: "Era of", "Phase 1", numbered evolution
  • Example: "1. Era of Turing test, 2. Era of reasoning, 3. Agents"
  • Frequency: Never | Rare | Common

- **Comparative Structure:**
  • Search for: "X vs Y", "while X does Y, Z does W"
  • Example: "Google uses TPUs, everyone else tied to NVIDIA"
  • Frequency and pattern

- **Numbered Lists:**
  • Count posts with 1, 2, 3... structure
  • Purpose: Action steps | Proof points | Features
  • Usage percentage

- **"What Sets This Apart" Differentiators:**
  • Search for: "what sets this apart", "differentiator", "unique"
  • Frequency: How often user identifies competitive advantage
  • Pattern: Always explains why X is different from Y

**Output:** Framework preference hierarchy
</action>

<action>**DIMENSION 4: Proof Style Analysis**

Analyze HOW user backs up claims:

**Specificity Ratio:**

- Count named entities (companies, tools, people) vs generic terms
  • Named: "Gmail, Notion, GitHub, Google Sheets"
  • Generic: "various tools", "many platforms"
- Calculate ratio: Named / Total mentions
- High ratio (> 80%) = Specificity obsession
- Low ratio (< 40%) = Abstract thinker

**Personal Experience Frequency:**

- Count first-person proof markers:
  • "I am using", "I receive", "I've found"
- Percentage of posts with personal experience
- When user uses personal vs impersonal proof

**Data Citation Patterns:**

- Count posts with:
  • Numbers: "10 months", "$315B", "8x increase"
  • Percentages: "80% growth", "16% drop"
  • Multipliers: "20x", "10x"
- Data density: Numbers per 100 words
- Precision level: Exact vs approximate

**Enumeration vs Summarization:**

- Does user list every item or summarize?
  • Enumerator: "Amazon, Microsoft, Google, Meta" (lists all 4)
  • Summarizer: "Big 4 tech companies" (summarizes)
- Calculate enumeration preference percentage

**Output:** Proof style formula (e.g., "High specificity, personal experience, data-heavy, enumeration preferred")
</action>

<action>**DIMENSION 5: Humor & Satire Mechanics**

Detect humor patterns and satirical techniques:

**Satire Detection:**

- Search for hyperbolic language:
  • "perfect", "100%", "completely shattered", "end of development"
- Escalating absurdity patterns:
  • "gold standard, platinum standard, whatever-is-better-than-gold"
- Deadpan closers:
  • "Pack it up, folks", "thanks for playing"
- Count satirical posts vs total
- Calculate satire frequency

**Humor Type:**

- Deadpan vs Explicit:
  • Deadpan: No LOL, no wink emoji, trust reader
  • Explicit: Clear humor markers
- Irony vs Sarcasm vs Wit
- Self-deprecation presence

**Humor Topics:**

- When does user deploy humor?
  • Hype cycles (DeepSeek satire)
  • Industry culture
  • Tech trends
- When does user stay serious?
  • Community protection
  • Career milestones
  • Technical analysis

**Output:** Humor profile (frequency, type, topics, delivery style)
</action>

<action>**DIMENSION 6: Emotional Range Mapping**

Map emotional expression patterns:

**Enthusiasm Markers:**

- Amplifying language:
  • "most energizing thing I can imagine"
  • "best thing I can do"
  • "most exciting yet"
- Exclamation points (frequency and placement)
- Energy emojis (⚡️) at closings
- Calculate enthusiasm intensity by post type

**Frustration/Disappointment Markers:**

- Moral clarity language:
  • "deeply disappointing"
  • "unfortunate", "frustrating"
- When frustration appears (community issues, scams)
- How user expresses frustration (direct vs implicit)

**Qualification/Hedging Markers:**

- "Don't get me wrong"
- "It seems like"
- "I believe" vs "This is"
- Shows intellectual humility
- Frequency across posts

**Protective Language:**

- Community warnings: "Heads-up, everyone"
- Empowerment closings: "help stop the cycle"
- Collective pronouns: "we", "us", "our community"
- When user adopts protector role

**Output:** Emotional range profile with triggers for each emotion type
</action>

<action>**DIMENSION 7: Closing Mechanics**

Analyze how user ends posts (critical for energy and CTA):

**CTA Types:**

- **Action CTAs:**
  • "Let's get to work. ⚡️"
  • "Let's build"
  • Calculate frequency

- **Question CTAs:**
  • "I'd love to hear your thoughts"
  • "How do you see this transforming..."
  • Calculate frequency

- **Forward-Looking Statements:**
  • "The possibilities are immense"
  • "The future is being shaped here"
  • "every chapter keeps getting better"
  • Calculate frequency

- **Empowerment Closings:**
  • "help stop the cycle"
  • Community action encouragement

**Energy Punctuation:**

- ⚡️ placement and frequency
- Single emoji as punctuation vs decoration
- When user uses energy markers vs when they don't

**Closing Formula:**

- Most common closing type
- Platform variations (LinkedIn vs Twitter closings)
- Content-type variations (analysis vs announcement)

**Output:** Closing playbook by content type
</action>

<action>**DIMENSION 8: Parenthetical Analysis**

Analyze use of parentheses and asides:

**Frequency:**

- Count parentheticals per post
- Distribution: Never | Rare (< 1 per post) | Common (1-2) | Heavy (3+)

**Content Type in Parentheses:**

- Technical details:
  • "(often relying heavily on platforms like ComfyUI)"
- Examples:
  • "(e.g., @siddani09)"
- Qualifications:
  • "(don't get me wrong)"
- Asides:
  • "(this is wild)"
- Calculate what goes in parens most often

**Function:**

- Depth-adding: Provides technical detail without breaking flow
- Tangent: Side thought
- Qualifier: Hedges main claim
- Example: Concrete instance
- Identify primary function

**Output:** Parenthetical usage guide (when, what, how often)
</action>

<action>**DIMENSION 9: Cultural Voice & Code-Switching**

Detect cultural identity markers and bilingual elements:

**Community-Specific Language:**

- Immigration terminology: "F1, CPT, OPT, H1B, STEM"
- Indian tech diaspora references
- "fellow Indians", "immigrant community"
- Insider vs outsider framing

**Bilingual Elements:**

- Hindi/English mixing (if present)
- Cultural references
- When code-switching happens (topic-dependent?)

**Insider Perspective:**

- Does user speak AS immigrant or ABOUT immigration?
- Community protector voice activation
- "Heads-up, everyone" vs "They should..."

**Reference Voice Blending (if provided):**

- Extract similar patterns from reference voice
- Identify complementary elements to blend
- Note: Keep user's core voice, enhance with reference patterns

**Output:** Cultural voice markers and code-switching triggers
</action>

<action>**DIMENSION 10: Comparative Lens**

Analyze how user frames competitive/strategic analysis:

**X vs Y Comparison Frequency:**

- Count direct comparisons:
  • "Google uses TPUs, everyone else uses NVIDIA"
  • "Anthropic vs other labs"
- Calculate comparison density (comparisons per 100 words)

**Competitive Framing:**

- "What sets this apart" pattern frequency
- How user identifies differentiators
- Strategic advantage language:
  • "major differentiator", "unique strength", "cost advantage"

**Enumeration for Contrast:**

- Lists competitors individually:
  • "Amazon: 8x. Microsoft: 20x. Google: 15x. Meta: 20x."
- Never summarizes when can enumerate
- Shows mastery through exhaustive listing

**Strategic Thinking Markers:**

- Product thinking language
- Business model analysis
- Cost/pricing discussions
- Moat identification

**Output:** Comparative lens profile (how user analyzes competition)
</action>

<template-output>rhetorical_dna_extracted</template-output>
</step>

<step n="5" goal="Detect platform variations">
  <check if="multiple platforms provided">
    <action>Compare writing style across platforms</action>

    <action>**Twitter vs LinkedIn (if both available):**
      - Formality difference (tone score delta)
      - Length difference (avg words per post)
      - Emoji usage difference
      - Topic difference (professional vs personal)
      - Capitalization pattern (proper vs lowercase)
      - Voice mode distribution (which modes appear on which platform)
      - Note: "On LinkedIn, user is X% more formal and uses Analyst mode Y% more"
    </action>

    <action>**Written vs Spoken (if YouTube available):**
      - Vocabulary in videos vs posts
      - Sentence complexity difference
      - Conversational markers in videos ("um", "you know", "right?")
      - Teaching mode indicators
      - Explanation style (patient vs concise)
      - Note: "Spoken voice is more [casual/explanatory/energetic]"
    </action>

  </check>

  <check if="only one platform">
    <action>Note: "Single platform analyzed - voice profile based on {platform} only"</action>
    <action>Suggest: "For more accurate profile, provide LinkedIn/Twitter/YouTube URLs"</action>
  </check>

<template-output>platform_variations_detected</template-output>
</step>

<step n="6" goal="Build Enhanced Voice Profile (v2.0)">
  <action>Compile all findings into comprehensive voice DNA profile</action>

<action>**Enhanced Voice Profile Format (v2.0):**

# Voice Profile: {user_name} (Enhanced v2.0)

**Status:** Complete ✅
**Analyzed:** {date}
**Sources:** {platform_breakdown}
**Total Posts:** {total_posts} ({long_form_count} long-form, {casual_count} casual)
**Confidence Score:** {confidence}/10
(20-30 posts: 6/10, 30-50 posts: 7/10, 50-100 posts: 8/10, 100+ posts: 9/10)
**Version:** 2.0 (Rhetorical DNA Enabled)

---

## PART 1: Surface Patterns (Legacy Analysis)

**Vocabulary Level:** {vocab_level} (simple|moderate|advanced)

- Technical term density: {tech_term_pct}%
- Jargon vs Accessible: {jargon_ratio}
- Power words: {top_10_words}

**Sentence Structure:** {sentence_pattern} (staccato|flowing|varied)

- Average length: {avg_length} words
- Short (< 10): {short_pct}% | Medium (10-20): {med_pct}% | Long (> 20): {long_pct}%
- Rhythm: {rhythm_description}

**Tone Score:** {tone_score}/10 (1=formal, 10=casual)
**Overall Tone:** {tone_description}

**Emoji Usage:**

- Frequency: {emoji_freq} (never|rare|moderate|heavy)
- Placement: {emoji_placement}
- Types: {emoji_types}
- Function: {emoji_function} (punctuation|decoration|energy)

---

## PART 2: Rhetorical DNA (NEW - v2.0)

### Argument Architecture

**Your Formula:** {argument_formula}

**Multi-Act Structure:**

- **Act 1 (Opening):** {opening_type} ({opening_pct}% of posts)
  - Pattern: {opening_pattern_description}
  - Example: "{opening_example}"

- **Act 2 (Qualification):** {qualification_type}
  - Frequency: {qualification_freq}
  - Markers: {qualification_phrases}
  - Example: "{qualification_example}"

- **Act 3 (Proof):** {proof_type}
  - Style: {proof_style_description}
  - Tools: {proof_tools} (frameworks|data|enumeration|examples)
  - Example: "{proof_example}"

- **Act 4 (Closing):** {closing_type} ({closing_pct}% of posts)
  - Pattern: {closing_pattern_description}
  - Example: "{closing_example}"

---

### Voice Modes (Content-Based Switching)

**Mode Distribution:**

1. **{mode_1_name}:** {mode_1_pct}% of content
2. **{mode_2_name}:** {mode_2_pct}% of content
3. **{mode_3_name}:** {mode_3_pct}% of content
4. **{mode_4_name}:** {mode_4_pct}% of content
5. **{mode_5_name}:** {mode_5_pct}% of content

**Default Mode:** {default_mode} (most frequent)

---

#### Mode 1: {MODE_NAME_1}

**Triggers:**

- Content type: {trigger_content_1}
- Length: {trigger_length_1}
- Topic: {trigger_topic_1}

**Characteristics:**

- Capitalization: {cap_pattern_1}
- Structure: {structure_1}
- Proof style: {proof_1}
- Energy: {energy_1}
- Closing: {closing_1}

**Example:**
"{example_post_1}"

**When to Use:**
{usage_guide_1}

---

#### Mode 2: {MODE_NAME_2}

**Triggers:**

- Content type: {trigger_content_2}
- Length: {trigger_length_2}
- Topic: {trigger_topic_2}

**Characteristics:**

- Capitalization: {cap_pattern_2}
- Structure: {structure_2}
- Proof style: {proof_2}
- Energy: {energy_2}
- Closing: {closing_2}

**Example:**
"{example_post_2}"

**When to Use:**
{usage_guide_2}

---

#### Mode 3: {MODE_NAME_3}

**Triggers:**

- Content type: {trigger_content_3}
- Length: {trigger_length_3}
- Topic: {trigger_topic_3}

**Characteristics:**

- Capitalization: {cap_pattern_3}
- Structure: {structure_3}
- Proof style: {proof_3}
- Energy: {energy_3}
- Closing: {closing_3}

**Example:**
"{example_post_3}"

**When to Use:**
{usage_guide_3}

---

#### Mode 4: {MODE_NAME_4}

**Triggers:**

- Content type: {trigger_content_4}
- Length: {trigger_length_4}
- Topic: {trigger_topic_4}

**Characteristics:**

- Capitalization: {cap_pattern_4}
- Structure: {structure_4}
- Proof style: {proof_4}
- Energy: {energy_4}
- Closing: {closing_4}

**Example:**
"{example_post_4}"

**When to Use:**
{usage_guide_4}

---

#### Mode 5: {MODE_NAME_5}

**Triggers:**

- Content type: {trigger_content_5}
- Length: {trigger_length_5}
- Topic: {trigger_topic_5}

**Characteristics:**

- Capitalization: {cap_pattern_5}
- Structure: {structure_5}
- Proof style: {proof_5}
- Energy: {energy_5}
- Closing: {closing_5}

**Example:**
"{example_post_5}"

**When to Use:**
{usage_guide_5}

---

### Structural Frameworks

**Framework Preferences:**

1. **{framework_1}:** Used in {fw_1_pct}% of long posts
   - Example: "{fw_1_example}"
2. **{framework_2}:** Used in {fw_2_pct}% of long posts
   - Example: "{fw_2_example}"
3. **{framework_3}:** Used in {fw_3_pct}% of posts
   - Example: "{fw_3_example}"

**Primary Framework:** {primary_framework}

**"What Sets This Apart" Pattern:**

- Frequency: {differentiator_freq}
- Usage: {differentiator_usage_description}
- Example: "{differentiator_example}"

---

### Proof Style

**Specificity Obsession:** {specificity_ratio}% named entities vs generics

**Formula:**

- Named entities: {named_pct}% (Gmail, Notion, GitHub vs "various tools")
- Personal experience: {personal_exp_pct}% of posts
- Data citations: {data_citation_pct}% of posts
- Enumeration preference: {enumeration_pct}% (list all vs summarize)

**Proof Hierarchy:**

1. {proof_hierarchy_1}
2. {proof_hierarchy_2}
3. {proof_hierarchy_3}

**Data Style:**

- Precision: {data_precision} (exact|approximate)
- Density: {numbers_per_100_words} numbers per 100 words
- Types: {data_types} (percentages, multipliers, absolute numbers)

---

### Humor & Satire

**Humor Frequency:** {humor_freq} ({satirical_post_count}/{total_posts} posts)

**Type:** {humor_type}

- Deadpan satire: {deadpan_pct}%
- Ironic commentary: {irony_pct}%
- Self-deprecation: {selfdep_pct}%

**Satirical Technique:**

- Hyperbolic setup: "{hyperbole_example}"
- Escalating absurdity: "{escalation_example}"
- Deadpan delivery: No wink emoji, trust reader

**Humor Topics:**

- Appears when: {humor_triggers}
- Avoided when: {serious_topics}

---

### Emotional Range

**Enthusiasm Markers:**

- Frequency: {enthusiasm_freq}
- Amplifiers: {enthusiasm_amplifiers}
- Peak words: {peak_words} ("most exciting", "best thing")

**Frustration Expression:**

- Frequency: {frustration_freq}
- Markers: {frustration_markers}
- Triggers: {frustration_topics}

**Qualification/Hedging:**

- "Don't get me wrong": {hedge_1_count} times
- "It seems like": {hedge_2_count} times
- "I believe": {hedge_3_count} times
- Function: Shows intellectual honesty, not weakness

**Protective Language:**

- Community warnings: {protection_count} posts
- Empowerment closings: {empowerment_count} posts
- Collective voice: {collective_pct}%

---

### Closing Patterns

**CTA Distribution:**

- Action: {action_cta_pct}% ("Let's get to work. ⚡️")
- Question: {question_cta_pct}% ("I'd love to hear your thoughts")
- Forward-looking: {forward_cta_pct}% ("The future is...")
- Empowerment: {empower_cta_pct}% ("help stop the cycle")

**Energy Markers:**

- ⚡️ usage: {energy_emoji_count}/{total_posts} posts
- Placement: {energy_placement} (always end, never middle)
- When used: {energy_triggers}

**Default Closing:** {default_closing_type}

---

### Parenthetical Usage

**Frequency:** {paren_freq} per post

**Content Types:**

- Technical details: {tech_detail_pct}%
- Examples: {example_pct}%
- Qualifications: {qual_pct}%
- Asides: {aside_pct}%

**Function:** {paren_function}

- Adds depth without density
- Preserves main claim accessibility
- Shows expertise in aside

**Example:**
"{paren_example}"

---

### Cultural Voice

**Community Identity:**

- Speaks AS: {speaks_as} (immigrant|insider|community member)
- Topics: {community_topics}
- Language: {community_language_markers}

**Bilingual Elements:**

- Frequency: {bilingual_freq}
- Type: {bilingual_type}
- Context: {bilingual_context}

**Insider Framing:**

- {insider_description}

---

### Comparative Lens

**Comparison Frequency:** {comparison_freq} comparisons per post

**Pattern:**

- Direct X vs Y: {direct_comparison_pct}%
- Implicit positioning: {implicit_comparison_pct}%
- Strategic differentiation: {differentiation_pct}%

**"What Sets Apart" Usage:**

- Frequency: {sets_apart_freq}
- Always identifies competitive advantage
- Never describes in isolation

**Formula:** {comparison_formula}

**Example:**
"{comparison_example}"

---

## PART 3: Signature Elements (Enhanced)

**Transition Phrases (Ranked by Frequency):**
{#top_transitions}

1. "{transition_phrase}" - {count} times
   {/top_transitions}

**Opening Patterns:**
{#opening_patterns}

- {pattern_type}: {pattern_pct}% - "{example}"
  {/opening_patterns}

**Closing Patterns:**
{#closing_patterns}

- {pattern_type}: {pattern_pct}% - "{example}"
  {/closing_patterns}

**Rhetorical Devices:**
{#rhetorical_devices}

- {device_name}: {frequency} - "{example}"
  {/rhetorical_devices}

---

## PART 4: Platform Variations

{#twitter}
**Twitter:**

- Tone: {twitter_tone}
- Length: {twitter_avg_words} words avg
- Capitalization: {twitter_cap_pattern}
- Dominant mode: {twitter_mode}
- Style notes: {twitter_style_notes}
  {/twitter}

{#linkedin}
**LinkedIn:**

- Tone: {linkedin_tone}
- Length: {linkedin_avg_words} words avg
- Capitalization: {linkedin_cap_pattern}
- Dominant mode: {linkedin_mode}
- Style notes: {linkedin_style_notes}
  {/linkedin}

{#youtube}
**YouTube (Spoken):**

- Delivery: {youtube_delivery}
- Teaching style: {teaching_approach}
- Conversational markers: {spoken_patterns}
- Pace: {speaking_pace}
- Dominant mode: {youtube_mode}
  {/youtube}

---

## PART 5: Voice Matching Guidelines (Enhanced)

### When writing as {user_name}, ALWAYS:

1. **{guideline_1_title}:** {guideline_1_description}
2. **{guideline_2_title}:** {guideline_2_description}
3. **{guideline_3_title}:** {guideline_3_description}
4. **{guideline_4_title}:** {guideline_4_description}
5. **{guideline_5_title}:** {guideline_5_description}
6. **{guideline_6_title}:** {guideline_6_description}
7. **{guideline_7_title}:** {guideline_7_description}
8. **{guideline_8_title}:** {guideline_8_description}

### DO:

{#do_patterns}

- {pattern}
  {/do_patterns}

### DON'T:

{#dont_patterns}

- {pattern}
  {/dont_patterns}

---

## PART 6: Mode Selection Decision Tree

**Content Type Decision Tree:**

```
Is it a quick observation/reaction?
├─ YES → Use CASUAL mode (lowercase, < 150 chars)
└─ NO → Continue...

Is it about tech/product analysis?
├─ YES → Use ANALYST mode (proper caps, frameworks, enumeration)
└─ NO → Continue...

Is it about community/immigration/scams?
├─ YES → Use COMMUNITY PROTECTOR mode (emotional honesty, action steps)
└─ NO → Continue...

Is it satirizing hype/calling out absurdity?
├─ YES → Use SATIRIST mode (hyperbole, escalation, deadpan)
└─ NO → Continue...

Is it an announcement/milestone/excitement?
└─ YES → Use ENTHUSIAST mode (momentum building, energy close)
```

---

## PART 7: Example Transformations

### Example 1: Tech Analysis

**Generic AI voice:**
"{generic_example_1}"

**{user_name}'s authentic voice:**
"{authentic_example_1}"

**Why different:**

- {reason_1_1}
- {reason_1_2}
- {reason_1_3}

---

### Example 2: Quick Take

**Generic AI voice:**
"{generic_example_2}"

**{user_name}'s authentic voice:**
"{authentic_example_2}"

**Why different:**

- {reason_2_1}
- {reason_2_2}

---

### Example 3: Community Post

**Generic AI voice:**
"{generic_example_3}"

**{user_name}'s authentic voice:**
"{authentic_example_3}"

**Why different:**

- {reason_3_1}
- {reason_3_2}
- {reason_3_3}

---

## PART 8: Reference Voice Integration (Optional)

{#reference_voice}
**Reference Writer:** {reference_name}
**Style Elements Blended:**
{#blended_elements}

- {element_name}: {element_description}
  {/blended_elements}

**Blending Strategy:**

- Keep core {user_name} voice: {core_elements}
- Enhance with {reference_name} patterns: {enhancement_elements}
- Avoid: {avoid_elements}

**Result:**
{user_name}'s authentic voice enhanced with {specific_blend_description}
{/reference_voice}

---

## PART 9: Quality Metrics

**Sample Size:** {total_posts} posts
**Content Diversity:** {platform_count} platforms, {mode_count} voice modes detected
**Analysis Depth:** {dimensions_analyzed}/16 dimensions analyzed
**Long-Form Posts:** {long_form_count} (need 5+ for deep analysis)
**Confidence:** {confidence}/10

{#confidence < 7}
⚠️ **Limited Sample Warning:**

- Need more posts for higher confidence
- Some patterns may not be statistically significant
- Run /learn-voice again after 50+ new posts
  {/confidence}

{#confidence >= 8}
✅ **High Confidence:**

- Large sample size ({total_posts} posts)
- Multiple voice modes detected
- Clear rhetorical patterns identified
- Ready for authentic content generation
  {/confidence}

---

## PART 10: Content Generation Implications

**What This Unlocks:**

✅ **/write-posts** - Posts that match your exact voice mode for each platform
✅ **/write-scripts** - Scripts with your argument architecture and energy
✅ **Mode-aware generation** - Automatically selects voice mode based on content type
✅ **Rhetorical consistency** - Maintains your proof style and structural frameworks
✅ **Authentic closings** - Uses your actual CTA patterns

**Voice-Aware Features:**

- Auto-detects when to use Analyst vs Casual mode
- Applies your qualification patterns ("don't get me wrong")
- Uses your proof hierarchy (specifics > generics)
- Maintains your closing energy formulas
- Preserves your emotional range

---

_Voice profile improves with more content. Run /learn-voice again after 50+ new posts._
_Last updated: {date}_
_Version: 2.0 (Rhetorical DNA)_

  </action>

<action>Save enhanced voice profile to memories.md (replace "Voice Profile" section)</action>
<action>Update voice_profile_status in memories.md: "complete_v2"</action>
<action>Update voice_profile_version: "2.0"</action>
<action>Update voice_profile_date: {date}</action>
<action>Update confidence_score: {confidence}</action>
<action>Add rhetorical_dna_enabled: true</action>

<template-output>voice_profile_enhanced_saved</template-output>
</step>

<step n="7" goal="Present results to user">
  <action>Display:

✅ Voice Profile v2.0 Complete - Rhetorical DNA Captured!

**Analyzed:**

- {total_posts} posts across {platform_count} platforms
- {long_form_count} long-form posts for deep analysis
- {twitter_count} Twitter + {linkedin_count} LinkedIn + {youtube_count} YouTube

**Your Writing DNA:**

- **Vocabulary:** {vocab_level} ({tech_term_pct}% technical)
- **Tone:** {tone_description} ({tone_score}/10)
- **Sentence rhythm:** {sentence_pattern}
- **Argument structure:** {argument_formula}
- **Proof style:** {proof_style_summary}
- **Dominant voice mode:** {default_mode}

**Voice Modes Detected:**
{#voice_modes}

- {mode_name}: {mode_pct}% of content
  {/voice_modes}

**Rhetorical Signature:**

- Opening: {opening_signature}
- Qualification: {qualification_signature}
- Closing: {closing_signature}

**Confidence:** {confidence}/10
{#confidence < 7}
⚠️ Based on limited sample ({total_posts} posts). Profile will improve with more content.
{/confidence}

{#confidence >= 8}
✅ High confidence - {total_posts} posts analyzed across multiple modes.
{/confidence}

**NEW in v2.0:**
✅ Voice mode detection (5 modes identified)
✅ Argument architecture mapping
✅ Rhetorical DNA extraction
✅ Proof style analysis
✅ Humor mechanics captured
✅ Emotional range profiled
✅ Mode-specific templates generated

📄 Full Enhanced Profile: Saved to memories.md (Voice Profile section)

**What This Unlocks:**
✅ /write-posts - Automatically selects correct voice mode
✅ /write-scripts - Matches your argument architecture
✅ Mode-aware generation - Casual vs Analyst vs Satirist
✅ Authentic closings - Your actual CTA patterns
✅ Rhetorical consistency - Maintains your proof style

**Next Steps:**

- Test enhanced voice with /write-posts or /write-scripts
- Voice mode will auto-select based on content type
- Re-run /learn-voice after 50+ new posts to refine

**Cost for this analysis:** ${total_cost}

  </action>

<template-output>workflow_complete</template-output>
</step>

</workflow>
