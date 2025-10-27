# Write Posts Workflow Instructions

<workflow>
<critical>Load voice profile FIRST - content must match user's authentic voice</critical>
<critical>Be adaptive with platform guidelines - not rigid rules</critical>

<step n="0" goal="Load voice profile (MANDATORY)">
  <action>Check if voice profile exists in memories.md</action>

  <check if="voice profile NOT found">
    <action>Display: "⚠️  Voice profile not found!"</action>

    <ask>I haven't learned your writing voice yet. Your options:

    1. **Run /learn-voice first** (RECOMMENDED - 5-10 min)
       → Analyzes your content to match your authentic style

    2. **Write in neutral style for now**
       → Generic but functional (not personalized)

    3. **Use Idea Card voice cues only**
       → Limited personalization

    Which would you prefer? [1/2/3]
    </ask>

    <check if="option 1 selected">
      <action>Display: "Great choice! Voice-aware content is much more authentic."</action>
      <action>Pause this workflow</action>
      <action>Invoke workflow: {agent-folder}/workflows/learn-voice/workflow.yaml</action>
      <action>Wait for completion</action>
      <action>Resume this workflow with voice profile loaded</action>
    </check>

    <check if="option 2 OR 3 selected">
      <action>Display: "OK, proceeding without voice profile (content will be more generic)"</action>
      <action>Set voice_aware_mode = false</action>
      <action>Continue</action>
    </check>
  </check>

  <check if="voice profile EXISTS">
    <action>Load voice profile from memories.md</action>
    <action>Extract for use in this workflow:
      - vocab_level
      - sentence_pattern
      - tone_score
      - signature_phrases (top 5)
      - emoji_usage_pattern
      - hook_preference
      - platform_variations (if target_platform matches analyzed platform)
    </action>

    <action>Set voice_aware_mode = true</action>

    <action>Display: "✓ Voice profile loaded (Confidence: {voice_confidence}/10)"</action>
  </check>

  <template-output>voice_loaded</template-output>
</step>

<step n="1" goal="Load Idea Card">
  <action>Load idea_card data from {idea_card_id} OR {idea_card_file}</action>

  <action>Extract from Idea Card:
    - title
    - hook_line
    - outline (beats array)
    - cta
    - evidence_items (array)
    - style (tutorial|opinion|story|etc)
    - recommended_platforms
  </action>

  <action>Validate target_platform is in recommended_platforms</action>

  <check if="target_platform NOT recommended">
    <ask>⚠️  Idea Card recommends {recommended_platforms}, but you selected {target_platform}.

    This might not be optimal. Options:
    1. Continue with {target_platform} anyway
    2. Switch to {recommended_platforms[0]}
    3. Cancel and review Idea Card

    Select: [1/2/3]
    </ask>
  </check>

  <template-output>idea_card_loaded</template-output>
</step>

<step n="2" goal="Generate base content with AI">
  <action>Prepare inputs for content generation</action>

  <action>Build generation prompt:
    - Topic: {idea_card.title}
    - Keywords: {idea_card.hashtags} + key terms from outline
    - Style: {idea_card.style}
    - Tone: {tone_override} OR {voice_profile.tone_description}
    - Platform: {target_platform}
    - Context: {idea_card.why_now}
    - Outline: {idea_card.outline}
  </action>

  <action>**Generation Prompt for AI:**

    Generate a {target_platform} post based on this Idea Card:

    **Topic:** {idea_card.title}
    **Style:** {idea_card.style}
    **Tone:** {tone}

    **Hook to use:** {idea_card.hook_line}

    **Main points to cover:**
    {idea_card.outline as list}

    **Call-to-action:** {idea_card.cta}

    **Platform:** {target_platform}
    **Guidelines:**
    - {platform_specific_guidelines from config.yaml}

    Generate engaging content that covers all points naturally.
    Keep it conversational and authentic.
  </action>

  <action>Call AI API (OpenAI GPT-4 or Anthropic Claude):
    - Use OPENAI_API_KEY from environment
    - Model: gpt-4o or gpt-4-turbo
    - Temperature: 0.7 (creative but controlled)
    - Max tokens: 1000 for posts
  </action>

  <action>Receive generated content</action>

  <action>Display: "✓ Base content generated with AI"</action>

  <check if="inject_evidence == true">
    <action>For each main point in generated content:</action>
    <action>Find matching evidence from idea_card.evidence_items</action>
    <action>Inject quote or stat with attribution:
      - "As [Source] reported, [stat/quote]"
      - "According to research from [Source], X% of [group]..."
    </action>
    <action>Keep citations natural, not forced</action>
  </check>

  <template-output>base_content_generated</template-output>
</step>

<step n="3" goal="Apply voice adaptation (if voice profile loaded)">
  <check if="voice_aware_mode == true">
    <action>Display: "Adapting content to match your authentic voice..."</action>

    <action>**Vocabulary Matching:**
      - Review generated content vocabulary
      - Replace formal words with user's preferred terms
        Example: "utilize" → "use" (if user prefers simple)
      - Match technical density to {vocab_level}
      - Inject signature phrases where natural (don't force)
    </action>

    <action>**Sentence Structure Matching:**
      - Analyze generated sentence lengths
      - Adjust to match {sentence_pattern}:
        • If user writes staccato: Break long sentences
        • If user writes varied: Mix short + long
        • If user writes flowing: Combine short sentences
      - Match rhythm/pacing
    </action>

    <action>**Tone Adjustment:**
      - Check generated tone against {tone_score}
      - If too formal for user: Add casual elements
      - If too casual for user: Add professional markers
      - Apply humor style (if user uses humor)
      - Inject enthusiasm markers (if user is enthusiastic)
    </action>

    <action>**Emoji Application:**
      - Match {emoji_usage_pattern}:
        • Never: Remove all emojis
        • Rare: Keep 0-1 emoji
        • Moderate: Use 1-2 emojis
        • Heavy: Use 2-3+ emojis
      - Place according to {emoji_placement}
      - Use emoji types user favors
    </action>

    <action>Result: Content that sounds like {user_name} wrote it</action>

    <action>Display: "✓ Voice-adapted to match your style"</action>
  </check>

  <check if="voice_aware_mode == false">
    <action>Display: "ℹ️  Using neutral voice (run /learn-voice for personalization)"</action>
  </check>

  <template-output>voice_adapted</template-output>
</step>

<step n="4" goal="Format for target platform (Adaptive Guidelines)">
  <action>Load platform specs from config.yaml → platforms.{target_platform}</action>

  <!-- LINKEDIN POST -->
  <check if="target_platform == 'linkedin'">
    <action>Apply LinkedIn formatting (adaptive, not rigid)</action>

    <action>**Hook (First line, target < 140 chars):**
      - Use idea_card.hook_line OR voice-adapted version
      - Make it scroll-stopping
      - Professional but engaging (LinkedIn tone)
      - Can include 1 emoji if user's voice profile shows emoji usage
    </action>

    <action>**Body Structure:**
      - Aim for 150-300 words (~800-1600 chars optimal)
      - Can go up to 3000 if content demands it
      - Use line breaks between paragraphs (readability)
      - Structure:
        • Para 1: Expand hook (context/problem)
        • Para 2-4: Main points from idea_card.outline
        • Para 5: Wrap-up or forward-looking

      - Use bullets (•) or numbers if listing
      - Inject evidence naturally:
        "According to [Source], X% of professionals..."
    </action>

    <action>**CTA:**
      - Use idea_card.cta OR voice-adapted version
      - Make conversational (ask question OR request action)
      - Examples:
        • "What's been your experience with this?"
        • "Share this if you found it helpful"
    </action>

    <action>**Hashtags:**
      - Add 3-5 relevant hashtags at end
      - Mix broad (#AI) + niche (#NoCode)
      - Based on idea_card.hashtags
      - Don't overdo it (LinkedIn isn't Instagram)
    </action>

    <action>**Validation:**
      - Tool: linkedin_api_client/lib/formatter/formatPostText
      - Parameters: text={generated_post}
      - Check: warnings (length, hook truncation)

      - If warnings exist:
        • Display warnings to user
        • Ask if they want to adjust or proceed
    </action>

    <template-output>linkedin_post_formatted</template-output>
  </check>

  <!-- TWITTER POST (Adaptive: Long-form vs Thread) -->
  <check if="target_platform == 'twitter'">
    <action>Calculate content length from idea_card.outline</action>
    <action>Estimate total characters needed</action>

    <check if="format_preference == 'auto'">
      <ask>Twitter Format Decision:

      Content length: ~{estimated_chars} characters

      **Option 1: Long-form post** (current trend - higher engagement)
      - Single post up to 25,000 chars (you have Premium)
      - Better for: Opinions, stories, announcements
      - Engagement: Currently outperforming threads

      **Option 2: Thread** (classic format)
      - {estimated_thread_length} tweets
      - Better for: Step-by-step, lists, tutorials
      - Engagement: Still strong for educational content

      **Recommendation based on content:**
      {#idea_style == 'tutorial' OR 'story'}Thread format{/idea_style}
      {#idea_style == 'opinion' OR 'announcement'}Long-form post{/idea_style}

      Which format? [1 for long-form / 2 for thread / 3 for both]
      </ask>

      <action>Store user selection: {twitter_format}</action>
    </check>

    <!-- LONG-FORM POST -->
    <check if="twitter_format == 'long-form' OR format_preference == 'long-form'">
      <action>Generate single long-form Twitter post</action>

      <action>**Structure:**
        - Hook paragraph: Expand idea_card.hook_line into 2-3 punchy sentences
        - Main content: Transform idea_card.outline beats into flowing paragraphs
        - CTA paragraph: Use idea_card.cta, make engaging
        - Use line breaks generously (readability)
        - Target length: 500-2500 chars optimal (can go higher if content demands)
      </action>

      <action>Apply voice profile throughout:
        - Use signature phrases naturally
        - Match sentence rhythm
        - Apply tone score
        - Use appropriate emoji placement
      </action>

      <action>**Format for readability:**
        - Double line breaks between main sections
        - Use bullets (•) or numbers if listing
        - Bold key points if platform supports (usually doesn't show on Twitter)
        - Keep paragraphs short (2-4 sentences max)
      </action>

      <action>**Inject evidence:**
        - For each main point, add supporting stat or quote
        - Keep citations conversational:
          ✓ "Research shows 73% of developers..."
          ✗ "According to a study published in the Journal of..."
      </action>

      <action>**Validation:**
        - Tool: twitter_api_client/lib/validator/validateTweetRequest
        - Parameters: {text: {generated_post}}
        - Check: length < 25000 (Premium limit), no prohibited patterns
        - If validation fails: Shorten content or split into thread
      </action>

      <action>Display:
        ✓ Twitter long-form post created

        **Stats:**
        - Length: {char_count} characters
        - Format: Single post
        - Paragraphs: {paragraph_count}
        - Evidence citations: {citation_count}
        - Voice-adapted: {voice_aware_mode}

        **Current Trend:** Long-form posts outperforming threads (Oct 2025)
        **Posting Tip:** Weekday mornings (8-10am) for best reach
      </action>

      <action>Store final post text: {long_form_post}</action>
    </check>

    <!-- THREAD FORMAT -->
    <check if="twitter_format == 'thread' OR format_preference == 'thread'">
      <action>Generate Twitter thread</action>

      <action>**Tweet 1 (Hook):**
        - Use idea_card.hook_line
        - Add thread indicator: "A thread 🧵" OR "Here's what I learned... (1/X)"
        - Tease the value clearly
        - Length: Keep punchy (150-280 chars) even though Premium allows 25k
        - Apply voice profile
      </action>

      <action>**Tweets 2-N (Main Points):**
        - One idea_card.outline beat per tweet
        - For each beat:
          • Transform into 1-3 paragraph tweet
          • Add context, don't just list facts
          • Example:
            ✗ "Tool 1: Zapier"
            ✓ "Tool 1: Zapier\n\nAutomatically connects your apps. Set up a workflow once, it runs forever.\n\nSaved me ~5 hours last week on data entry alone."

          • Use line breaks for emphasis and readability
          • Inject evidence where relevant (quotes, stats)
          • Apply voice profile (vocabulary, sentence rhythm, tone)
          • Each tweet should stand alone (some people won't read full thread)
          • Length: Aim for 150-280 chars (can go longer but keep tight)
      </action>

      <action>**Structure by idea complexity:**
        - Simple idea: 3-4 tweets total
        - Medium idea: 5-7 tweets total
        - Complex idea: 8-12 tweets total
        - Don't artificially inflate thread length
      </action>

      <action>**Final Tweet (CTA):**
        - Summarize key takeaway in 1-2 sentences
        - Use idea_card.cta
        - Add engagement hook: "Retweet if this was helpful"
        - Can include link to profile, resource, or next thread
        - Apply voice profile
      </action>

      <action>**Thread Numbering:**
        - Add to END of each tweet: "1/{total}", "2/{total}", etc.
        - Helps readers track progress
        - Format: "X/Y" (clean, standard)
      </action>

      <action>**Validate each tweet:**
        - Tool: twitter_api_client/lib/validator/validateTweetRequest
        - For each tweet in thread:
          • Check text length (280 or 25k depending on user's account type)
          • Ensure no prohibited patterns
          • No media in text-only workflow
        - If any tweet fails validation: Split long tweet or shorten
      </action>

      <action>Display:
        ✓ Twitter thread created

        **Stats:**
        - Thread length: {tweet_count} tweets
        - Total characters: {total_chars}
        - Avg per tweet: {avg_chars} chars
        - Evidence citations: {citation_count}
        - Voice-adapted: {voice_aware_mode}
        - All tweets validated ✓

        **Thread Structure:**
        - Tweet 1: Hook + thread indicator
        - Tweets 2-{middle}: Main points
        - Tweet {final}: CTA + summary

        **Posting Tip:** Weekdays preferred, avoid Friday/Saturday evenings
      </action>

      <action>Store thread as array: {thread_tweets[]}</action>
    </check>

    <!-- GENERATE BOTH (if user requested) -->
    <check if="twitter_format == 'both'">
      <action>Generate BOTH long-form AND thread formats</action>
      <action>Follow both implementation paths above</action>
      <action>Present both to user</action>
      <ask>I've generated both formats:

      **Long-form:** {long_form_char_count} chars, single post
      **Thread:** {thread_tweet_count} tweets, {thread_total_chars} total chars

      Which would you like to use? [long-form / thread / save both]
      </ask>

      <check if="user selects one">
        <action>Use selected format for handoff package</action>
      </check>

      <check if="save both">
        <action>Save both formats to separate files</action>
        <action>Create handoff packages for both</action>
      </check>
    </check>

    <template-output>twitter_post_formatted</template-output>
  </check>

  <!-- INSTAGRAM CAPTION -->
  <check if="target_platform == 'instagram'">
    <action>Apply Instagram caption formatting</action>

    <action>**Hook (First 125 chars - visible before "...more"):**
      - Use idea_card.hook_line OR voice-adapted version
      - MUST work standalone (many users won't tap "more")
      - Make it curiosity-driving and engaging
      - Can be question, statement, or tease
      - Apply voice profile
      - Example: "Spent 10 hours/week on tasks AI could do in 5 minutes. Here's what changed..."
    </action>

    <action>**Full Caption (after "more"):**
      - Expand on hook with context
      - Main points from idea_card.outline
      - Optimal length: 150-300 words (~600-1200 chars)
      - Can go up to 2200 chars if needed
      - Use line breaks between ideas (Instagram shows breaks)
      - Story-telling approach works well on Instagram
      - Apply voice profile (vocabulary, rhythm, tone)
      - Inject evidence naturally (but keep it conversational, not academic)
    </action>

    <action>**Structure suggestion:**
      - Para 1: Expand hook (relatable problem or story)
      - Para 2-3: Main points (use bullets or line breaks)
      - Para 4: Value/takeaway
      - Para 5: CTA
    </action>

    <action>**CTA:**
      - Use idea_card.cta OR voice-adapted version
      - Make Instagram-specific:
        • "Double-tap if you've experienced this"
        • "Save this for later when you need it"
        • "Tag someone who needs to see this"
        • "Drop a 🔥 if this resonates"
      - Apply voice profile to CTA
    </action>

    <action>**Emoji Strategy:**
      - Instagram is highly visual (emojis work well)
      - Use 2-5 relevant emojis (unless voice profile says user uses fewer)
      - Place strategically:
        • Hook: 1 emoji for emphasis
        • Throughout body: 1-2 to highlight points
        • CTA: 1 emoji for action cue
      - Don't overuse (still needs to be readable)
    </action>

    <action>**Hashtags:**
      - Instagram optimal: 5-10 hashtags (platform allows 30 but lower performs better)
      - Mix of broad + niche from idea_card.hashtags
      - Can place in caption OR in first comment (first comment recommended for cleaner look)
      - Format: #HashtagNoSpaces
      - Examples: #AI #Productivity #Automation #TechTips #CreatorEconomy
    </action>

    <action>**Line Break Strategy:**
      - Use line breaks to separate ideas
      - Instagram shows line breaks (unlike some platforms)
      - Makes caption scannable
      - Can use periods or dashes for bullet effects:
        • Use actual bullets if platform renders them
        • Or: "- Point 1", "- Point 2"
    </action>

    <action>Display:
      ✓ Instagram caption created

      **Stats:**
      - Total length: {word_count} words ({char_count} chars)
      - Hook (visible): First 125 chars
      - Emojis: {emoji_count}
      - Hashtags: {hashtag_count}
      - Voice-adapted: {voice_aware_mode}

      **Caption Preview (first 125 chars):**
      "{hook_preview}..."

      **Posting Tips:**
      - Any day works well
      - Prime times: 11am-1pm, 7-9pm
      - Add hashtags in first comment for cleaner look
      - Consider carousel image to go with caption (use AI Image Generator)
    </action>

    <template-output>instagram_caption_formatted</template-output>
  </check>

  <template-output>platform_content_formatted</template-output>
</step>

<step n="5" goal="Generate hook variants (optional)">
  <check if="generate_hook_variants == true">
    <action>Create 3 alternative hooks for A/B testing</action>
    <action>All variants voice-adapted</action>
    <template-output>hook_variants_generated</template-output>
  </check>
</step>

<step n="6" goal="Generate metadata and handoff package">
  <action>Create Handoff Package for Social Posting Agent</action>

  <action>JSON structure:

    {
      "content_type": "{platform}_post",
      "generated_by": "jarvis",
      "workflow": "write-posts",
      "idea_card_id": "{idea_card_id}",
      "platform": "{platform}",
      "ready_for_agent": "social-posting-agent",
      "suggested_command": "/post-{platform}",

      "content": {
        "text": "{final_post_text}",
        "format": "{twitter_format if twitter}",
        "metadata": {
          "hashtags": ["{tag1}", "{tag2}", ...],
          "char_count": {count},
          "word_count": {words},
          "hook_variants": ["{v1}", "{v2}", "{v3}"],
          "posting_tip": "{optimal_time}"
        }
      },

      "evidence": {
        "idea_card_file": "{idea_card_path}",
        "research_sources": ["{url1}", "{url2}"],
        "voice_profile_used": {voice_aware_mode}
      },

      "timestamp": "{generation_timestamp}",
      "cost": {total_cost}
    }

  </action>

  <action>Save handoff package to: {handoff_file}</action>

  <template-output>handoff_package_created</template-output>
</step>

<step n="7" goal="Save and present final output">
  <action>Save formatted post to: {default_output_file}</action>
  <action>Save handoff JSON to: {handoff_file}</action>

  <action>Display to user:

    ✅ {platform} Post Ready!

    **Platform:** {platform}
    {#twitter}**Format:** {twitter_format}{/twitter}
    **Length:** {char_count} characters ({word_count} words)
    {#voice_aware_mode}**Voice:** Matched to your style ✓{/voice_aware_mode}

    **Hook:**
    "{final_hook}"

    {#generate_hook_variants}
    **Alternative Hooks:**
    1. "{variant_1}"
    2. "{variant_2}"
    3. "{variant_3}"
    {/generate_hook_variants}

    **Files:**
    - 📄 Post: {default_output_file}
    - 📦 Handoff Package: {handoff_file}

    **Next Steps:**
    - Review post and make any edits
    - Ready to publish? Use Social Posting Agent:
      `{suggested_command}`
    - Or adjust and regenerate

    **Posting Tip:** {posting_tip}
  </action>

  <template-output>workflow_complete</template-output>
</step>

</workflow>
