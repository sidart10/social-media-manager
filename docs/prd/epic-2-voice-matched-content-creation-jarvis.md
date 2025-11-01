# Epic 2: Voice-Matched Content Creation (JARVIS)

**Epic Goal:** Generate social media posts and video scripts that authentically match user's voice through Enhanced Voice Profile v2.0, eliminating generic AI voice and maintaining consistency across platforms and content types.

## Story 2.1: Voice Profile Learning from Historical Content

**User Story:**
As a content creator,
I want the system to analyze 50+ of my historical posts across platforms,
so that it extracts my rhetorical DNA and can generate content that sounds exactly like me.

**Acceptance Criteria:**

1. User invokes Jarvis → `*learn-voice` workflow
2. Workflow prompts for: profile_urls[] (Twitter, LinkedIn, YouTube), post_count (minimum 50 recommended)
3. **Step 1 (Multi-Platform Content Collection):**
   - Twitter: Uses scraper_one/x-profile-posts-scraper ($0.02-0.04 for 100 tweets)
   - LinkedIn: Uses apimaestro/linkedin-profile-posts ($0.10-0.15 for 50 posts)
   - YouTube: Uses starvibe/youtube-transcripts ($0.05/video) if video content
4. **Step 2 (Rhetorical Analysis):**
   - Extracts **10 dimensions**:
     1. **Argument Architecture** - Opening styles (Observation → Question, Thesis → Context, Story Hook), Qualification patterns (Caveat/Nuance/Counter), Proof structures (Example-first, Data-driven, Personal experience), Closing patterns (Action CTA, Question CTA, Forward-looking)
     2. **Voice Modes** - Identifies 5 distinct modes: Analyst (tech breakdowns), Casual (personal stories), Community Protector (empathetic), Satirist (tongue-in-cheek), Enthusiast (energy + urgency)
     3. **Structural Frameworks** - Patterns: Eras/Phases storytelling, Comparative analysis, Numbered lists, "What sets this apart" framing
     4. **Proof Style** - Specificity ratio (Gmail/Notion/GitHub vs "various tools"), Personal experience % (~15% of content), Data density (stats per 100 words), Enumeration preference (numbered vs bulleted)
     5. **Humor & Satire Mechanics** - Techniques: Hypothetical scenarios (Bezos on vacation), Tongue-in-cheek tone, Self-deprecation patterns
     6. **Emotional Range** - Analytical (default 60%), Empathetic (15%), Energetic (10%), Satirical (10%), Earnest (5%)
     7. **Closing Patterns** - CTA frequency, Question vs statement endings, Forward-looking vs reflective
     8. **Parenthetical Usage** - Frequency, purpose (clarification vs tangent vs humor)
     9. **Cultural Voice** - Code-switching patterns, immigrant perspective references if present
     10. **Comparative Lens** - How often "X vs Y" structures used, comparison depth
5. **Step 3 (Voice Mode Extraction):**
   - Analyst mode: For tech breakdowns, product reviews, industry analysis
   - Casual mode: For personal stories, community posts, behind-the-scenes
   - Community Protector mode: For empathetic support, addressing struggles
   - Satirist mode: For tongue-in-cheek takes, calling out absurdities
   - Enthusiast mode: For genuine excitement, recommendations, discoveries
6. **Step 4 (Enhanced Voice Profile v2.0 Creation):**
   - Saves to `jarvis-sidecar/memories.md` with version number
   - Includes: Overall confidence score (posts analyzed / 100 = confidence %), 10 dimensions with examples, 5 voice modes with triggers, Signature phrases, Platform adaptations (LinkedIn more professional, Twitter more casual)
7. Minimum 50 posts required for ≥7/10 confidence, 75+ posts for ≥8/10, 100+ posts for ≥9/10
8. Voice profile includes real examples: "As someone who's been there..." (personal proof), "Gmail, not email. Notion, not note-taking app." (specificity), "What sets this apart is..." (structural framework)
9. Cost: Twitter $0.02-0.04, LinkedIn $0.10-0.15, YouTube $0.05/video (total ~$0.17-0.24 for multi-platform)
10. Execution time: 3-5 minutes for 50-100 posts

---

## Story 2.2: Platform-Optimized Post Generation with Voice Matching

**User Story:**
As a content creator,
I want to generate social media posts for specific platforms that sound authentically like me,
so that I maintain voice consistency while optimizing for each platform's format and audience.

**Acceptance Criteria:**

1. User invokes Jarvis → `*write-post` workflow (**NEW DEVELOPMENT:** Workflow does not exist yet, needs creation following Jarvis standardized pattern with external instructions.md)
2. Workflow prompts for: topic, platform (LinkedIn/Twitter/Substack), style (optional override), target_length
3. **Step 1 (Load Voice Profile):**
   - Reads Enhanced Voice Profile v2.0 from memories.md
   - Selects voice mode based on topic: tech analysis → Analyst, personal story → Casual, community support → Community Protector
4. **Step 2 (Trigger post-writer skill via context):**
   - Workflow step creates context: "Generate {platform} post about {topic} using {voice_profile}"
   - Claude autonomously discovers post-writer skill (description matches "LinkedIn posts", "social media", "voice-matched")
   - Skill loads and executes with platform formula:
   - **LinkedIn PAIPS Formula** (Justin Welsh):
     - P: Personal story or observation (1-2 sentences)
     - A: Agitate the problem (2-3 sentences)
     - I: Introduce solution with specificity (Gmail not email app)
     - P: Proof via example/data/personal experience
     - S: Simple next step CTA
     - Target: <300 words, 2-3 short paragraphs, 3 hashtags max
   - **Twitter Thread** (Greg Isenberg):
     - Tweet 1: Hook with question or bold claim
     - Tweets 2-6: Numbered insights with specificity
     - Tweet 7: Question CTA ("What's your take?")
     - Format: 280 chars per tweet standard, 25k chars if Premium
   - **Substack Essay** (Paul Graham):
     - Conversational, "What most people don't realize..." opening
     - Personal anecdotes, specific examples (no abstractions)
     - Meandering structure, builds to insight
     - Target: 800-1500 words
5. **Step 3 (Voice Validation via voice-matcher skill):**
   - Compares generated content against voice profile
   - Calculates confidence score across 10 dimensions
   - If score <8/10 → Flags for review with specific mismatches identified
   - If score ≥8/10 → Approved for publication
6. **Step 4 (Platform Formatting via platform-formatter skill):**
   - LinkedIn: Line breaks for readability, hashtag placement, call-out boxes if needed
   - Twitter: Thread numbering (1/7, 2/7...), character count per tweet, @mention formatting
   - Substack: H2 headers, pull quotes, email-friendly formatting
7. Workflow saves post to: `outputs/{date}/{session}/posts/{platform}-{topic-slug}.md`
8. Post includes metadata: platform, voice mode used, confidence score, word count, estimated engagement score
9. Post can be edited and regenerated (workflow supports multi-turn refinement)
10. Cost: $0 (pure Claude generation, no external API calls)
11. Execution time: 1-3 minutes depending on length

---

## Story 2.3: Video Script Generation with Thumbnail Concepts

**User Story:**
As a YouTube content creator,
I want to generate video scripts with embedded timestamps, scene descriptions, and thumbnail concepts,
so that I have production-ready scripts optimized for viewer retention and CTR.

**Acceptance Criteria:**

1. User invokes Jarvis → `*write-script` workflow (**NEW DEVELOPMENT:** Workflow does not exist yet, needs creation following Jarvis standardized pattern)
2. Workflow prompts for: topic, format (Ali Abdaal Top 5 / MKBHD Tech Review / Tutorial / Short-form), duration (target video length)
3. **Step 1 (Load Voice Profile & Select Format):**
   - Reads voice profile, selects mode (Analyst for tech, Enthusiast for recommendations)
   - **Ali Abdaal Top 5 Format**:
     - Hook (0:00-0:15): "Here are 5 X that Y..."
     - Intro (0:15-1:00): Why this matters, personal context
     - Items 1-5 (each 1-2 min): Title card, explanation, specific example, why it's useful
     - Outro (last 30s): Recap, CTA (like/subscribe/comment)
   - **MKBHD Tech Review**:
     - Cold open (0:00-0:30): Product in action, hook question
     - Specs overview (0:30-2:00): Key features, comparisons
     - Deep dive (2:00-8:00): Build quality, performance, user experience
     - Verdict (last 1-2 min): Who it's for, final recommendation
4. **Step 2 (Invoke video-script-writer skill):**
   - Generates full script with **timestamp markers** [00:15], [01:30], etc.
   - Includes **scene descriptions**: "B-roll: Close-up of keyboard typing", "Screen record: Demo of feature X"
   - Adds **chapter markers** for YouTube (00:00 Intro, 02:15 Feature 1, 04:30 Feature 2)
5. **Step 3 (Thumbnail Concept Generation via youtube-thumbnail-mastery skill):**
   - Generates 3 thumbnail concepts using:
     - MrBeast 6 Pillars: Readable text, expressive face, high contrast, vibrant colors, curiosity gap, pattern interruption
     - Thomas Frank AIDA: Attention (bold visual), Interest (compelling text), Desire (value prop), Action (implied CTR)
   - Each concept: Design description, text overlay, color palette, composition notes
6. **Step 4 (YouTube Metadata Generation):**
   - Title: 60-70 chars, keyword-rich, curiosity-driven
   - Description: First 150 chars (preview), chapter timestamps, links, hashtags
   - Tags: 15-20 relevant tags for SEO
7. Workflow saves script to: `outputs/{date}/{session}/scripts/{topic-slug}-script.md`
8. Script includes: Full narration with timestamps, scene descriptions, chapter markers, 3 thumbnail concepts, YouTube metadata
9. Cost: $0 (pure Claude generation)
10. Execution time: 2-4 minutes for 8-12 minute script

---

This is Epic 1 & Epic 2 with detailed stories, acceptance criteria based on actual implementation, mermaid diagrams, cost/time estimates, and tool specifics.

**Select 1-9 or just type your question/feedback:**

1. **Proceed to next epic** (Epic 3: Visual Content Production)

2. **Expand or Contract for Audience** - Add more technical details or simplify for readability?

3. **Explain Reasoning (CoT Step-by-Step)** - Walk through how I structured these stories from the workflow investigation

4. **Critique and Refine** - Review acceptance criteria for completeness, testability, and accuracy

5. **Analyze Logical Flow and Dependencies** - Validate story sequencing within epics

6. **Assess Alignment with Overall Goals** - Do these stories deliver on the 12 goals from Section 1?

7. **Identify Potential Risks and Unforeseen Issues** - What could break these workflows? What edge cases are missing?

8. **Challenge from Critical Perspective** - "Why 10 rhetorical dimensions for voice? Isn't that over-engineered?"

9. **Agile Team Perspective Shift** - Review from Developer (implementation effort), QA (testing complexity), User (value clarity) viewpoints

---
