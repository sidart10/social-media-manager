# Analyze Profile Workflow Instructions

<workflow>
<critical>Load workflow.xml engine and workflow.yaml first</critical>
<critical>Cost optimization: Try FREE tools before PAID</critical>

<step n="1" goal="Detect platform and validate URL">
  <action>Parse {profile_url} to extract platform and handle/ID</action>

  <action>Platform detection patterns:
    - twitter.com OR x.com → platform = "twitter"
    - instagram.com → platform = "instagram"
    - tiktok.com → platform = "tiktok"
    - linkedin.com/in/ → platform = "linkedin"
    - youtube.com/@handle OR /channel/ → platform = "youtube"
  </action>

  <action>Extract handle/username from URL</action>
  <action>Store: {platform}, {handle}</action>

  <action>Display to user:
    🔍 Platform detected: {platform}
    👤 Profile: {handle}

    Analyzing last {window_days} days of content...
  </action>

  <template-output>platform_detected</template-output>
</step>

<step n="2" goal="Fetch content using cost-optimized approach">
  <action>Set max_posts based on {analysis_depth}:
    - quick: 20 posts
    - standard: 50 posts
    - deep: 100 posts
  </action>

  <!-- YOUTUBE (Tier 1 - FREE) -->
  <check if="platform == 'youtube'">
    <action>Attempt tool: youtube_mcp_server/get_channel_details</action>
    <action>Parameters: channel_id={handle}</action>

    <check if="tool succeeds">
      <action>Extract: subscriber_count, total_views, description, joined_date</action>
      <action>Store channel metadata</action>

      <action>Tool: youtube_mcp_server/get_channel_videos</action>
      <action>Parameters: channel_id={handle}, max_results={max_posts}</action>
      <action>Result: Array of recent videos with basic stats</action>

      <action>For top performing videos (by views):
        - Tool: youtube_mcp_server/analyze_video_engagement
        - Parameters: video_id={video_id}
        - Extract: engagement rate, like ratio, comment density
      </action>

      <action>Cost: $0 (FREE tier - log units used)</action>
      <action>Display: "✓ FREE YouTube API used ({units_used}/10,000 quota)"</action>
    </check>

    <check if="tool fails OR quota exceeded">
      <action>Log: "YouTube API unavailable or quota exceeded"</action>
      <action>Fallback to Apify</action>

      <action>Tool: apify_mcp/search-actors</action>
      <action>Query: "youtube channel scraper"</action>
      <action>Select actor: "apify/youtube-scraper"</action>

      <action>Estimate cost: ~$0.40 for channel analysis</action>
      <ask>YouTube API unavailable. Use Apify scraper? (~$0.40)

      Current month: ${month_total}/$10.00 budget
      Proceed? [yes/no/cancel]
      </ask>

      <check if="user approves">
        <action>Tool: apify_mcp/call-actor</action>
        <action>Actor: "apify/youtube-scraper"</action>
        <action>Inputs: {channelUrl: {profile_url}, maxVideos: {max_posts}}</action>
        <action>Store: run_id, dataset_id</action>

        <action>Tool: apify_mcp/get-actor-output</action>
        <action>Dataset: {dataset_id}</action>
        <action>Parse results for video data</action>

        <action>Log cost to memories.md:
          - Date: {date}
          - Tool: apify/youtube-scraper
          - Units: {max_posts} videos
          - Cost: $0.40
          - Monthly total: ${updated_total}
        </action>
      </check>

      <check if="user declines">
        <action>Return partial results: "Analysis incomplete - YouTube data unavailable"</action>
      </check>
    </check>
  </check>

  <!-- LINKEDIN (Tier 2 - Low cost via RapidAPI) -->
  <check if="platform == 'linkedin'">
    <action>Attempt tool: linkedin_mcp/fetch_and_save_linkedin_posts</action>
    <action>Parameters: username={handle}</action>

    <check if="tool succeeds">
      <action>Tool: linkedin_mcp/get_posts_by_date</action>
      <action>Calculate date range: start={today minus window_days}, end={today}</action>
      <action>Retrieve posts in date range</action>

      <action>Tool: linkedin_mcp/get_top_posts</action>
      <action>Parameters: metric="Like Count", top_n=10</action>
      <action>Extract top performers</action>

      <action>Display: "✓ LinkedIn data fetched via linkedin-mcp"</action>
      <action>Note: "RapidAPI charges may apply (check RapidAPI dashboard)"</action>
    </check>

    <check if="tool fails">
      <action>Log: "linkedin-mcp unavailable"</action>
      <action>Suggest fallback: "Use exa_mcp/linkedin_search for basic info OR Apify"</action>
    </check>
  </check>

  <!-- TWITTER (Tier 1 if yours, Tier 3 if competitor) -->
  <check if="platform == 'twitter'">
    <action>Determine if {handle} is user's account</action>
    <ask>Is @{handle} YOUR Twitter account? [yes/no]</ask>

    <check if="is your account">
      <action>Display: "Using your Twitter API credentials (FREE)"</action>

      <action>Note: Use twitter-api-client to fetch YOUR timeline</action>
      <action>This requires custom implementation (Twitter API v2 timeline endpoint)</action>
      <action>Alternative: Manually provide recent tweets OR use Apify</action>

      <ask>Twitter timeline fetch not yet implemented.
      Options:
      1. Use Apify to scrape YOUR profile (~$0.02)
      2. Manually paste recent tweets
      3. Skip Twitter analysis for now

      Select: [1/2/3]
      </ask>
    </check>

    <check if="is competitor account">
      <action>Display: "Analyzing competitor Twitter profile via Apify"</action>

      <action>Tool: apify_mcp/search-actors</action>
      <action>Query: "twitter profile scraper"</action>
      <action>Select actor: "xtdata/twitter-x-scraper" (reliable, good reviews)</action>

      <action>Tool: apify_mcp/fetch-actor-details</action>
      <action>Actor: "xtdata/twitter-x-scraper"</action>
      <action>Review required inputs: {username, maxTweets}</action>

      <action>Calculate cost: {max_posts} tweets × $0.40/1000 = ${estimated_cost}</action>
      <action>Display cost: "~${estimated_cost} for {max_posts} tweets"</action>

      <ask>Apify Twitter scraper cost: ~${estimated_cost}

      Current month: ${month_total}/$10.00 budget
      Remaining: ${remaining_budget}

      Proceed? [yes/no]
      </ask>

      <check if="user approves">
        <action>Tool: apify_mcp/call-actor</action>
        <action>Actor: "xtdata/twitter-x-scraper"</action>
        <action>Inputs: {username: {handle}, maxTweets: {max_posts}}</action>
        <action>Wait for completion (usually 10-30s)</action>
        <action>Store: run_id={run_id}, dataset_id={dataset_id}</action>

        <action>Tool: apify_mcp/get-actor-output</action>
        <action>Dataset: {dataset_id}</action>
        <action>Parse results: tweets[], engagement_data, profile_stats</action>

        <action>Log cost to memories.md:
          - Date: {date}
          - Workflow: analyze-profile
          - Platform: Twitter
          - Tool: apify/xtdata/twitter-x-scraper
          - Units: {max_posts} tweets
          - Cost: ${actual_cost}
          - Monthly total: ${updated_total}
        </action>

        <action>Display: "✓ Fetched {tweet_count} tweets (Cost: ${actual_cost})"</action>
      </check>

      <check if="user declines">
        <action>Return: "Analysis cancelled - user declined Apify cost"</action>
        <action>Exit workflow</action>
      </check>
    </check>
  </check>

  <!-- INSTAGRAM (Tier 3 - Apify only, no free alternative) -->
  <check if="platform == 'instagram'">
    <action>Display: "Instagram analysis requires Apify (no free API available)"</action>

    <action>Tool: apify_mcp/search-actors</action>
    <action>Query: "instagram profile scraper"</action>
    <action>Select actor: "apify/instagram-scraper" (official, most reliable)</action>

    <action>Tool: apify_mcp/fetch-actor-details</action>
    <action>Actor: "apify/instagram-scraper"</action>
    <action>Review inputs: {username, resultsLimit}</action>

    <action>Calculate cost: {max_posts} posts × $0.50/1000 = ${estimated_cost}</action>

    <ask>Instagram Analysis Cost Breakdown:
    - Actor: apify/instagram-scraper
    - Posts to analyze: {max_posts}
    - Estimated cost: ~${estimated_cost}

    Current budget:
    - This month: ${month_total}/$10.00
    - After this: ${projected_total}

    Proceed? [yes/no]
    </ask>

    <check if="user approves">
      <action>Tool: apify_mcp/call-actor</action>
      <action>Actor: "apify/instagram-scraper"</action>
      <action>Inputs: {username: {handle}, resultsLimit: {max_posts}}</action>
      <action>Store: run_id, dataset_id</action>

      <action>Display: "Instagram scraper running... (usually 20-60s)"</action>

      <action>Tool: apify_mcp/get-actor-output</action>
      <action>Dataset: {dataset_id}</action>
      <action>Parse: posts[], likes, comments, engagement_rate, follower_count</action>

      <action>Log cost to memories.md (same format as Twitter)</action>
      <action>Display: "✓ Fetched {post_count} Instagram posts (Cost: ${actual_cost})"</action>
    </check>

    <check if="user declines">
      <action>Return: "Analysis cancelled"</action>
      <action>Exit workflow</action>
    </check>
  </check>

  <!-- TIKTOK (Tier 3 - Apify only) -->
  <check if="platform == 'tiktok'">
    <action>Tool: apify_mcp/search-actors</action>
    <action>Query: "tiktok profile scraper"</action>
    <action>Select: "clockworks/tiktok-scraper" OR "autoscraping/tiktok-profile"</action>

    <action>Estimate cost: ~$0.50 per profile</action>

    <ask>TikTok Analysis (Apify):
    - Estimated cost: ~$0.50
    - Current month: ${month_total}

    Proceed? [yes/no]
    </ask>

    <check if="approved">
      <action>Execute actor (same pattern as Instagram)</action>
      <action>Parse: videos[], views, likes, comments, profile_data</action>
      <action>Log cost</action>
    </check>
  </check>

  <template-output>content_fetched</template-output>
</step>

<step n="3" goal="Extract top performers">
  <action>Sort all posts/videos by engagement rate</action>
  <action>Normalize by follower count (if available)</action>
  <action>Select top 10 performers</action>

  <action>For each top post, extract:
    - Content (text/title/caption)
    - Metrics (likes, comments, shares, views)
    - Engagement rate (%)
    - Timestamp/date posted
    - Format (text, image, video, carousel, reel)
    - URL (direct link to post/video)
  </action>

  <action>Store as structured data for pattern analysis</action>

  <template-output>top_performers_extracted</template-output>
</step>

<step n="4" goal="Mine content patterns">
  <action>Analyze top 10 performers for patterns</action>

  <action>**Hook Pattern Analysis:**
    Count and categorize opening lines:
    - Question hooks: Starts with Why/How/What/Do/Have/Can
    - Number hooks: Starts with digit or "X ways/things/tools"
    - Story hooks: Starts with "I/When I/Last week/Yesterday"
    - Reveal hooks: "The secret/Nobody tells/Here's what"
    - Imperative hooks: Starts with verb (Learn/Discover/Stop/Start)

    Calculate % distribution
    Identify most common type
    Extract 2-3 example hooks for each type found
  </action>

  <action>**Topic Clustering:**
    Extract main topic/theme from each post
    Group by similarity (keyword matching)
    Identify 5-8 topic clusters
    Count frequency per cluster
    Rank by engagement
  </action>

  <action>**Format Distribution:**
    Categorize each post by format
    Calculate percentages:
    - Text-only: X%
    - Image/photo: Y%
    - Video (short < 3min): Z%
    - Video (long > 3min): W%
    - Carousel/gallery: V%

    Note which format has highest avg engagement
  </action>

  <action>**Timing Patterns:**
    For each post, extract:
    - Day of week (Mon-Sun)
    - Hour of day (0-23)

    Identify:
    - Most common posting days
    - Most common posting hours
    - Best performing times (engagement correlation)
  </action>

  <action>**CTA Pattern Recognition:**
    Extract call-to-action from each post
    Identify common CTAs:
    - "Comment below"
    - "Share if you agree"
    - "Follow for more"
    - "Tag someone who needs this"
    - "Save this for later"
    - Question-based CTAs

    Note most common + most effective
  </action>

  <template-output>patterns_mined</template-output>
</step>

<step n="5" goal="Extract transcript insights (YouTube/TikTok only)">
  <check if="platform == 'youtube' AND extract_transcripts == true">
    <action>Select top 5 videos by views</action>

    <action>For each video:
      - Tool: youtube_transcript/get_transcript
      - Parameters: url={video_url}, lang="en"

      - From transcript, extract:
        • Hook (first 10 seconds / ~30-50 words)
        • Structure markers ("first", "next", "finally", "here's why", numbers)
        • Key quotes (memorable phrases)
        • Transition techniques
        • CTA placement and wording

      - Identify script structure type:
        • Problem → Solution → CTA
        • Listicle (X ways to...)
        • Story arc (intro → conflict → resolution)
        • Tutorial (step-by-step with examples)
    </action>

    <action>Summarize common patterns across transcripts</action>
    <action>Cost: $0 (youtube-transcript is FREE)</action>
  </check>

  <check if="platform == 'tiktok'">
    <action>Note: TikTok transcripts not reliably available</action>
    <action>Analyze from video titles and captions instead</action>
  </check>

  <template-output>transcript_insights</template-output>
</step>

<step n="6" goal="Generate profile summary">
  <action>Compile comprehensive profile summary</action>
  <action>Load template: {installed_path}/templates/profile-summary.md</action>

  <action>Fill template sections:</action>

  <action>**Profile Overview:**
    - Platform: {platform}
    - Handle: @{handle}
    - Followers/Subscribers: {follower_count}
    - Bio/Description: {bio}
    - Posting cadence: {posts_per_week} posts/week
    - Analysis window: {window_days} days
    - Posts analyzed: {posts_analyzed}
  </action>

  <action>**Content Strategy:**
    - Content mix: {format_percentages}
    - Top topics: {top_5_topics}
    - Hook preference: {most_common_hook_type} ({percentage}%)
    - Posting rhythm: {best_days} at {best_times}
    - CTA style: {common_cta_pattern}
  </action>

  <action>**What Works (Top 3):**
    - Best format: {top_format} ({engagement_lift} vs average)
    - Best topic: {top_topic} ({avg_engagement})
    - Best hook type: {top_hook} with examples
    - Best posting time: {optimal_time}
  </action>

  <action>**Evidence:**
    List all top 10 posts with:
    - Title/text snippet
    - URL (clickable)
    - Engagement metrics
    - Why it worked (format + topic + hook combo)
  </action>

  <template-output>profile_summary_compiled</template-output>
</step>

<step n="7" goal="Generate actionable recommendations">
  <action>Based on patterns, create 5-7 specific recommendations</action>

  <action>Each recommendation must have:
    - **Finding:** What the data shows
    - **Evidence:** Specific examples with links
    - **Recommendation:** What to do
    - **Expected impact:** Predicted outcome
    - **Confidence:** high|medium|low
  </action>

  <action>Example structure:

    **Recommendation 1: Format**
    Finding: Video posts drive 3.2x engagement vs text posts
    Evidence: Top video got 450 likes vs text posts avg 140 likes
    - [Example video](url)
    - [Another example](url)
    Recommendation: Create more video content (Reels, TikTok, YouTube Shorts)
    Expected Impact: 2-3x engagement increase
    Confidence: High (based on 50 post sample)

  </action>

  <template-output>recommendations_generated</template-output>
</step>

<step n="8" goal="Save outputs and present">
  <action>Compile all sections into final markdown document</action>
  <action>Use template: {installed_path}/templates/profile-summary.md</action>
  <action>Save to: {default_output_file}</action>

  <action>Display to user:

    ✅ Profile Analysis Complete!

    **Profile:** @{handle} ({platform})
    **Posts Analyzed:** {post_count}
    **Window:** {window_days} days

    **Key Findings:**
    - Top format: {top_format} ({lift} higher engagement)
    - Top topic: {top_topic}
    - Top hook: {top_hook_type}
    - Best time: {optimal_posting_time}

    **Cost:** ${total_cost} ({cost_breakdown})

    📄 Full Report: {default_output_file}

    **Suggested Next Steps:**
    1. Review full report
    2. Use /generate-ideas to create content based on these patterns
    3. Use /competitive-analysis to compare with competitors
  </action>

  <template-output>workflow_complete</template-output>
</step>

</workflow>
