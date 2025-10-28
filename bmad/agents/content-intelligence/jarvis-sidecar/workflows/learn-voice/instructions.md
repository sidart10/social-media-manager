# Learn Voice Workflow Instructions

<workflow>
<critical>This workflow MUST complete before write-posts or write-scripts can generate authentic content</critical>
<critical>Prioritize FREE tools (user's own APIs) over paid tools</critical>

<step n="1" goal="Gather user's profile URLs">
  <ask>I'll analyze your writing to match your authentic voice!

Please provide your profile URLs (need at least 1, ideally 2-3):

1. Twitter: Your @handle or profile URL
2. LinkedIn: Your profile URL
3. YouTube: Your channel URL (I'll analyze your spoken voice too)

Note: I need at least {min_posts_required} posts total for accurate analysis.

Provide URLs (one per line or comma-separated):
</ask>

<action>Parse provided URLs</action>
<action>Extract platforms and handles</action>
<action>Store: {platforms_provided}, {handles}</action>

<template-output>profiles_collected</template-output>
</step>

<step n="2" goal="Fetch YOUR content (cost-optimized)">
  <action>Display: "Fetching your content using free APIs where possible..."</action>

  <!-- TWITTER - Automatic with smart fallback -->
  <check if="twitter_handle provided">
    <action>Display: "📱 Twitter: Fetching your posts..."</action>

    <!-- Try mcp_twitter first (if available) -->
    <check if="mcp_twitter available">
      <action>Try: mcp_twitter/get_last_tweet_from_user</action>
      <action>Parameters: username={handle}, maxTweets=50</action>

      <check if="succeeds">
        <action>Display: "✓ Fetched {tweet_count} tweets via Twitter MCP (FREE)"</action>
        <action>Store tweets for analysis</action>
      </check>

      <check if="fails">
        <action>Note: Twitter MCP unavailable, using Apify fallback</action>
        <action>Continue to Apify</action>
      </check>
    </check>

    <!-- Fallback to Apify (reliable, low cost) -->
    <check if="mcp_twitter failed OR not available">
      <action>Display: "Using Apify scraper (~$0.02 for 50 tweets)"</action>
      <action>Use Apify: apidojo/twitter-scraper-lite</action>
      <action>Parameters: twitterHandles=[{handle}], maxItems=50, sort=Latest</action>
      <action>Store tweets for analysis</action>
      <action>Display: "✓ Fetched {tweet_count} tweets via Apify"</action>
      <action>Log cost: ~$0.02</action>
    </check>

  </check>

  <!-- LINKEDIN - Use Apify (linkedin-mcp is broken) -->
  <check if="linkedin_url provided">
    <action>Display: "💼 LinkedIn: Fetching your posts..."</action>

    <action>Extract username from LinkedIn URL</action>
    <action>Use Apify: clockworks/linkedin-profile-scraper or similar</action>
    <action>Parameters:
      - profileUrl: {linkedin_url}
      - maxPosts: 50
    </action>

    <action>Store posts for analysis</action>
    <action>Display: "✓ Fetched {post_count} LinkedIn posts via Apify"</action>
    <action>Log cost: ~$0.03-0.05</action>

    <note>LinkedIn scraping via Apify is more reliable than broken linkedin-mcp</note>

  </check>

  <!-- YOUTUBE - Use Apify (reliable transcript extraction) -->
  <check if="youtube_channel provided">
    <action>Display: "🎥 YouTube: Fetching video transcripts..."</action>

    <!-- Get channel videos first -->
    <action>Display: "Getting recent videos from your channel..."</action>
    <action>Extract channel handle from URL (e.g., @siddani09)</action>

    <!-- Use Apify YouTube Full Channel Transcripts Extractor -->
    <action>Use Apify: karamelo/youtube-full-channel-transcripts-extractor</action>
    <action>Parameters:
      - channelUrl: {youtube_channel_url}
      - maxVideos: 10 (most recent)
      - includeTimestamps: false (for cleaner analysis)
    </action>

    <action>Store transcripts for analysis</action>
    <action>Display: "✓ Fetched transcripts from {video_count} YouTube videos"</action>
    <action>Log cost: ~$0.05 for 10 videos</action>

    <note>YouTube transcripts analyze your SPOKEN voice:
      - Speaking rhythm and pace
      - Natural transitions
      - Teaching patterns
      - Conversational markers
      - Filler words (um, like, so)

      This helps adapt scripts to match how you actually speak!
    </note>

  </check>

<action>Total posts collected: {total_posts}</action>

  <check if="total_posts < min_posts_required">
    <ask>⚠️  Only collected {total_posts} posts. Need {min_posts_required}+ for accurate voice profile.

    Options:
    1. Continue anyway (lower confidence score)
    2. Provide more profile URLs
    3. Reduce min_posts_required threshold

    Select: [1/2/3]
    </ask>

  </check>

<template-output>content_collected</template-output>
</step>

<step n="3" goal="Analyze writing patterns">
  <action>Display: "Analyzing your writing style across {total_posts} posts..."</action>

<action>**Vocabulary Analysis:** - Technical term frequency (count specialized words) - Complexity level: simple|moderate|advanced
• Simple: < 10% technical terms, short sentences
• Moderate: 10-30% technical terms, mixed length
• Advanced: > 30% technical terms, complex sentences - Jargon vs accessible language ratio - Common word choices (create frequency map)
</action>

<action>**Sentence Structure Analysis:** - Calculate average sentence length (words) - Count short (< 10 words) vs long (> 20 words) sentences - Identify rhythm pattern:
• Staccato: Mostly short sentences
• Flowing: Mostly long sentences
• Varied: Mix of short and long (most engaging) - Note sentence complexity (simple vs compound vs complex)
</action>

<action>**Tone Marker Extraction:** - Formality indicators: "Furthermore" vs "Plus", "Utilize" vs "Use" - Humor presence: Jokes, sarcasm, self-deprecation count - Enthusiasm markers: Exclamation points, caps, energetic words ("amazing", "excited") - Personal vs professional: "I think" vs "Research shows" - Calculate tone score: 1-10 (1=very formal, 10=very casual)
</action>

<action>**Signature Phrase Extraction:** - Find phrases used 3+ times - Common transitions: "here's the thing", "but", "so", "and" - Opening phrases: How user starts posts - Closing phrases: How user ends posts - Filler patterns: "actually", "basically", "literally" - Create ranked list by frequency
</action>

<action>**Emoji Usage Analysis:** - Count emoji frequency: never|rare|moderate|heavy
• Never: 0 emojis
• Rare: < 0.5 per post
• Moderate: 1-2 per post
• Heavy: 3+ per post - Placement pattern: beginning|middle|end|scattered - Type preferences: professional (📊📈) vs playful (🎉😊) vs specific meanings (🚀💡)
</action>

<action>**Hook Preference Identification:** - Categorize user's natural hooks (from their actual posts) - Calculate distribution:
• Question hooks: X%
• Number hooks: Y%
• Story hooks: Z%
• Statement hooks: W% - Identify natural tendency (which type user gravitates to)
</action>

<template-output>patterns_analyzed</template-output>
</step>

<step n="4" goal="Detect platform variations">
  <check if="multiple platforms provided">
    <action>Compare writing style across platforms</action>

    <action>**Twitter vs LinkedIn (if both available):**
      - Formality difference (tone score delta)
      - Length difference (avg words per post)
      - Emoji usage difference
      - Topic difference (professional vs personal)
      - Note: "On LinkedIn, user is X% more formal"
    </action>

    <action>**Written vs Spoken (if YouTube available):**
      - Vocabulary in videos vs posts
      - Sentence complexity difference
      - Conversational markers in videos ("um", "you know", "right?")
      - Teaching mode indicators
      - Note: "Spoken voice is more [casual/explanatory/energetic]"
    </action>

  </check>

  <check if="only one platform">
    <action>Note: "Single platform analyzed - voice profile based on {platform} only"</action>
    <action>Suggest: "For more accurate profile, provide LinkedIn/Twitter/YouTube URLs"</action>
  </check>

<template-output>platform_variations_detected</template-output>
</step>

<step n="5" goal="Build comprehensive voice profile">
  <action>Compile all findings into voice profile structure</action>

<action>**Voice Profile Format:**

    # Voice Profile: {user_name}

    **Status:** Complete ✅
    **Analyzed:** {date}
    **Sources:** {platform_breakdown}
    **Total Posts:** {total_posts}
    **Confidence Score:** {confidence}/10
      (20-30 posts: 6/10, 30-50 posts: 7/10, 50-100 posts: 8/10, 100+ posts: 9/10)

    ---

    ## Writing Characteristics

    **Vocabulary Level:** {vocab_level} (simple|moderate|advanced)
    **Sentence Structure:** {sentence_pattern} (staccato|flowing|varied)
    **Average Sentence Length:** {avg_length} words
    **Tone Score:** {tone_score}/10 (1=formal, 10=casual)
    **Overall Tone:** {tone_description}

    ---

    ## Signature Elements

    **Most Used Phrases:**
    {#top_phrases}
    - "{phrase}" (appears {count} times in {total_posts} posts)
    {/top_phrases}

    **Transition Words:** {transition_style}
    **Opening Style:** {typical_opening}
    **Closing Style:** {typical_closing}

    **Hook Preferences (Natural Tendency):**
    - Question: {question_pct}%
    - Number: {number_pct}%
    - Story: {story_pct}%
    - Statement: {statement_pct}%

    **Preferred Hook Type:** {top_hook_type} (use this most often)

    **Emoji Usage:**
    - Frequency: {emoji_freq} (never|rare|moderate|heavy)
    - Placement: {emoji_placement}
    - Favorite types: {emoji_types}

    **Humor Style:** {humor_description}

    ---

    ## Platform Variations

    {#twitter}
    **Twitter:**
    - Tone: {twitter_tone}
    - Length: {twitter_avg_words} words avg
    - Style: {twitter_style_notes}
    {/twitter}

    {#linkedin}
    **LinkedIn:**
    - Tone: {linkedin_tone}
    - Length: {linkedin_avg_words} words avg
    - Style: {linkedin_style_notes}
    {/linkedin}

    {#youtube}
    **YouTube (Spoken):**
    - Delivery: {youtube_delivery}
    - Teaching style: {teaching_approach}
    - Conversational markers: {spoken_patterns}
    {/youtube}

    ---

    ## Voice Matching Guidelines

    When writing as {user_name}, ALWAYS:

    1. {guideline_1}
    2. {guideline_2}
    3. {guideline_3}
    4. {guideline_4}
    5. {guideline_5}

    **Do:**
    {#do_patterns}
    - {pattern}
    {/do_patterns}

    **Don't:**
    {#dont_patterns}
    - {pattern}
    {/dont_patterns}

    ---

    ## Example Transformations

    **Generic AI voice:**
    "This tool can help you automate your workflow and save significant time on repetitive tasks."

    **{user_name}'s authentic voice:**
    "{user_voice_example}"

    **Why the difference:**
    - {explanation_1}
    - {explanation_2}

    ---

    *Voice profile will improve as more content is analyzed*
    *Run /learn-voice again after posting 50+ new pieces of content*

  </action>

<action>Save voice profile to memories.md (replace "Voice Profile" section)</action>
<action>Update voice_profile_status in memories.md: "complete"</action>
<action>Update voice_profile_date: {date}</action>
<action>Update confidence_score: {confidence}</action>

<template-output>voice_profile_saved</template-output>
</step>

<step n="6" goal="Present results to user">
  <action>Display:

    ✅ Voice Profile Complete!

    **Analyzed:**
    - {total_posts} posts across {platform_count} platforms
    - {twitter_count} Twitter + {linkedin_count} LinkedIn + {youtube_count} YouTube

    **Your Writing DNA:**
    - Vocabulary: {vocab_level}
    - Tone: {tone_description} ({tone_score}/10)
    - Sentence style: {sentence_pattern}
    - Hook preference: {top_hook_type}
    - Signature phrase: "{most_common_phrase}"
    - Emoji usage: {emoji_freq}

    **Confidence:** {confidence}/10
    {#confidence < 7}
    ⚠️  Based on limited sample. Profile will improve with more content.
    {/confidence}

    📄 Full Profile: Saved to memories.md

    **What This Unlocks:**
    ✅ /write-posts - Posts that sound like YOU
    ✅ /write-scripts - Scripts in your authentic voice
    ✅ All content generation is now voice-aware

    **Next Steps:**
    - Use /write-posts or /write-scripts
    - Content will match your style automatically
    - Re-run /learn-voice after 50+ new posts to refine

  </action>

<template-output>workflow_complete</template-output>
</step>

</workflow>
