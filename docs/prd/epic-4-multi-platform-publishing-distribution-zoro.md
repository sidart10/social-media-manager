# Epic 4: Multi-Platform Publishing & Distribution (ZORO)

**Epic Goal:** Publish content to Twitter, LinkedIn, Instagram, Facebook, TikTok, and YouTube using Postiz MCP as PRIMARY unified scheduling hub with zero platform-specific errors through automatic validation, rate limit enforcement, and optional immediate posting via direct APIs for urgent content. Establish Postiz as the default publishing interface with direct APIs as backup only.

## Story 4.1: Unified Multi-Platform Scheduling via Postiz (PRIMARY)

**User Story:**
As a content creator,
I want to schedule posts for future dates across multiple platforms (Twitter, LinkedIn, Instagram, Facebook, TikTok, YouTube) from a single interface,
so that I batch-create content, optimize posting times for engagement, and avoid manual multi-platform posting.

**Note:** This is the PRIMARY publishing workflow for Zoro. Stories 4.2-4.4 (direct API publishing) are backup workflows for urgent immediate posting only.

**Acceptance Criteria:**

1. User invokes Zoro → `*schedule-post` workflow (**NEW DEVELOPMENT:** Primary Postiz workflow needs creation)
2. Workflow prompts for: platforms[] (select multiple), post_content, media_paths[] (optional), schedule_date (future ISO timestamp or "next-free-slot" for Postiz auto-scheduling)
3. **Step 1 (Platform Integration Discovery via Postiz MCP):**
   - Calls mcp__postiz__integrationList to get connected accounts
   - Displays available: "Twitter (@username), LinkedIn (Your Name), Instagram (@username), Facebook (Page Name), TikTok (@username), YouTube (Channel Name)"
   - User selects platforms[] (can select multiple for cross-posting)
4. **Step 2 (Platform Schema Validation for each selected platform):**
   - Calls mcp__postiz__integrationSchema to get platform requirements
   - Example schemas returned:
     - Twitter: max_chars=25000 (Premium) or 280 (Standard), supports_images=true (1-4), supports_video=true
     - LinkedIn: max_chars=3000, supports_carousel=true (2-20 images), supports_pdf=true
     - Instagram: max_chars=2200, supports_images=true (1-10), supports_video=true (Reels)
     - YouTube: supports_video=true, auto_detect_shorts=true (9:16, ≤3min)
5. **Step 3 (Content Validation per Platform):**
   - Validates post_content length against each platform's max_chars
   - Validates media_paths[] formats and counts against platform limits
   - Flags issues with specific remediation: "Instagram text too long (2400 chars), reduce to 2200" or "LinkedIn carousel has 25 images, reduce to 20 max"
   - User can edit content or deselect problematic platforms
6. **Step 4 (Schedule Posts via integrationSchedulePostTool):**
   - For each platform: Submits integration_id, schedule_date (UTC ISO), post_content, media attachments[], platform-specific settings
   - Postiz queues for auto-publishing at specified time
   - If schedule_date="next-free-slot" → Postiz determines optimal time based on audience analytics
7. **Step 5 (Confirmation & Queue Summary):**
   - Displays: "Scheduled for {date} on {platform_count} platforms:"
     - Twitter (@username): {date}
     - LinkedIn (Your Name): {date}
     - Instagram (@username): {date}
   - Provides Postiz dashboard URL: "View queue at https://app.postiz.com/posts"
8. **Step 6 (Update Notion):**
   - Sets Publish Date to schedule_date
   - Status stays "Editing" (Postiz will auto-publish, then requires manual update to "Posted" after confirmation)
   - Adds note: "Scheduled via Postiz to {platforms}" in page properties or notes
9. **Step 7 (Post-Publishing Tracking):**
   - After scheduled time passes, user confirms post went live
   - Updates Notion Status→Posted manually (or automated webhook if Postiz supports)
   - Tracks Channel relations for all platforms posted
10. Cost: $0 (Postiz free tier supports scheduling, paid tier adds analytics and team features)
11. Execution time: 2-4 minutes for multi-platform scheduling (includes validation for all platforms)
12. **Advantage over direct APIs:** Single workflow handles 6+ platforms vs needing separate workflow per platform

---

## Story 4.2: Twitter Premium Direct Publishing (BACKUP - Immediate Posting Only)

**Note:** This is a BACKUP workflow for urgent immediate posting. For scheduled posts, use Story 4.1 (Postiz).

**User Story:**
As a content creator with Twitter Premium,
I want to immediately post tweets (up to 25k characters), threads, images, and videos without scheduling,
so that I can publish time-sensitive breaking content instantly.

**Acceptance Criteria:**

1. User invokes Zoro `/zoro` → selects workflow: `*post-tweet` (text), `*post-tweet-image` (1-4 images), `*post-tweet-video`, or `*create-thread`
2. **For post-tweet workflow:**
   - Prompts for: tweet_text
   - **Step 1 (Validation):**
     - Length check: ≤25,000 characters for Premium (warns if >280 for standard accounts)
     - Shows character count and preview
   - **Step 2 (Rate Limit Check via custom twitter-api-client module):**
     - Checks remaining: 1500/month, 50/day, 10/hour
     - Warns at 80% utilization, blocks at 100%
     - Shows current usage: "Monthly: 1245/1500 used, Daily: 32/50 used"
   - **Step 3 (Confirmation):**
     - Displays tweet preview with character count
     - Asks: "Post now? yes/no"
   - **Step 4 (Publish via TwitterClient.createTweet):**
     - OAuth 1.0a authentication from .env
     - Returns: tweet_id, tweet_url, character_count
   - **Step 5 (Update Rate Limits in memories.md):**
     - Increments counters: monthly +1, daily +1, hourly +1
     - Saves timestamp for reset calculations
   - **Step 6 (Success Confirmation):**
     - Displays: Tweet ID, URL, character count, updated rate limits
3. **For post-tweet-image workflow:**
   - Prompts for: tweet_text, image_paths[] (1-4 images)
   - Validates: Each image ≤5MB, formats accepted (PNG/JPG/GIF/WEBP)
   - Uploads media first, then creates tweet with media_ids[]
4. **For create-thread workflow:**
   - Prompts for: thread_texts[] (array of tweet texts)
   - Validates: Each ≤25k chars
   - Posts sequentially: Tweet 1 (no parent) → Tweet 2 (reply to 1) → Tweet 3 (reply to 2)
   - Returns: Array of tweet_ids and URLs
5. **Error Handling:**
   - Invalid credentials → "Check .env: TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET"
   - Rate limit exceeded → "Wait {time} or upgrade to higher tier"
   - Validation failed (length) → "Shorten to {chars} or use /thread workflow"
6. Cost: $0 (using own Premium account, no per-tweet cost beyond subscription)
7. Execution time: 10-30 seconds per tweet, 30-90 seconds for threads

**Mermaid Diagram:**
```mermaid
graph TD
    A[User: tweet_text] --> B{Length check}
    B -->|> 25000| C[Error: Too long<br/>Suggest: Shorten or thread]
    B -->|<= 25000| D[Show preview + char count]

    D --> E[Rate limit check<br/>TwitterClient.getRateLimitStats]
    E --> F{Limits OK?}
    F -->|No: 100% used| G[Block: Wait {reset_time}]
    F -->|Warning: 80%+| H[Warn but allow]
    F -->|OK: < 80%| I[Proceed]

    H --> I
    I --> J[Ask confirmation: Post?]
    J -->|No| K{Edit or cancel?}
    K -->|Edit| A
    K -->|Cancel| L[End: Cancelled]

    J -->|Yes| M[TwitterClient.createTweet<br/>OAuth 1.0a from .env]
    M --> N{Success?}
    N -->|No| O[Error handling]
    O --> O1{Error type?}
    O1 -->|Auth| P[Check .env credentials]
    O1 -->|Rate limit| Q[Wait or upgrade]
    O1 -->|Validation| R[Fix and retry]

    N -->|Yes| S[Update rate limits in memories.md]
    S --> T[Display success]
    T --> T1[Tweet ID + URL]
    T1 --> T2[Updated limits:<br/>Monthly, Daily, Hourly]
    T2 --> U[End: Posted]
```

---

## Story 4.3: LinkedIn Direct Publishing (BACKUP - Immediate Posting Only)

**Note:** This is a BACKUP workflow for urgent immediate LinkedIn posting. For scheduled posts, use Story 4.1 (Postiz).

**User Story:**
As a content creator,
I want to immediately post to LinkedIn with text, images, carousels, or PDFs without scheduling,
so that I can publish urgent professional content instantly.

**Acceptance Criteria:**

1. User invokes Zoro → selects: `*linkedin-post-text`, `*linkedin-post-image`, `*linkedin-post-carousel`, or `*linkedin-post-pdf`
2. **For linkedin-post-image workflow:**
   - Prompts for: post_text, image_path, alt_text (accessibility)
   - **Step 1 (Validation):**
     - Text length: ≤3000 characters (LinkedIn limit)
     - Image: ≤8MB, formats (PNG/JPG)
     - Alt text: ≤300 characters
   - **Step 2 (Rate Limit Check):**
     - LinkedIn: 150 posts/day
     - Shows: "Daily: 23/150 used"
   - **Step 3 (Upload Image to LinkedIn via LinkedInClient.uploadImage):**
     - Returns asset URN for referencing in post
   - **Step 4 (Create Post via LinkedInClient.createPost):**
     - Uses custom linkedin-api-client module (OAuth 2.0)
     - Includes: text, asset URN, alt_text
     - Returns: post_id, post_url
   - **Step 5 (Update Rate Limits):**
     - Increments daily counter in memories.md
   - **Step 6 (Success Confirmation):**
     - Displays: Post URL, character count used, rate limits remaining
3. **For linkedin-post-carousel workflow:**
   - Prompts for: post_text, image_paths[] (2-20 images)
   - Validates: 2-20 images (LinkedIn carousel limit), each ≤8MB
   - Uploads all images sequentially, collects asset URNs
   - Creates post with multiple assets (carousel format)
4. **For linkedin-post-pdf workflow:**
   - Prompts for: post_text, pdf_path
   - Validates: PDF ≤100MB, page count ≤300
   - Uploads PDF as document asset
   - Creates post with document URN (displays as PDF carousel on LinkedIn)
5. Cost: $0 (using own LinkedIn account)
6. Execution time: 15-30 seconds for text, 30-60 seconds for images, 60-120 seconds for carousels/PDFs

---

## Story 4.4: YouTube Direct Upload (BACKUP - Immediate Posting Only)

**Note:** This is a BACKUP workflow for urgent immediate YouTube uploads. For scheduled YouTube posts, use Story 4.1 (Postiz).

**User Story:**
As a YouTube creator,
I want to immediately upload videos with automatic Short detection (9:16, ≤3min) without scheduling,
so that I can publish time-sensitive video content instantly.

**Acceptance Criteria:**

1. User invokes Zoro → `*upload-youtube` workflow (handles both videos and Shorts automatically)
2. Workflow prompts for: video_path, title, description, tags[], category, privacy (private/unlisted/public)
3. **Step 1 (Auto-Short Detection):**
   - Reads video metadata: duration, aspect_ratio
   - **Is Short if:** aspect_ratio = 9:16 (vertical) AND duration ≤ 180 seconds (3 min)
   - **Is Regular Video if:** Any other aspect_ratio OR duration > 180 seconds
   - Displays detection result: "Detected: YouTube Short (9:16, 47 seconds)"
4. **Step 2 (Validation):**
   - Video file: ≤256GB (YouTube limit)
   - Title: ≤100 characters
   - Description: ≤5000 characters
   - Tags: ≤500 characters total
5. **Step 3 (Rate Limit Check):**
   - YouTube Data API: 10,000 units/day (1 upload = ~1600 units = ~6 uploads/day)
   - Shows: "Daily quota: 3200/10000 used (4 uploads remaining today)"
6. **Step 4 (Category Auto-Selection if not provided):**
   - Uses youtube-growth-mastery knowledge to suggest category
   - Example: Tech review → Category 28 (Science & Technology)
7. **Step 5 (Upload via youtube-uploader-mcp):**
   - Calls mcp__youtube-uploader-mcp__upload_video
   - Parameters: file_path, title, description, tags, category_id, privacy (defaults to private for safety)
   - Upload progress shown (large files take 2-10 minutes)
8. **Step 6 (Success Confirmation):**
   - Displays: Video ID, YouTube URL (YouTube Studio link)
   - If Short detected: "Published as YouTube Short (will appear in Shorts feed)"
   - If Regular video: "Published as Regular Video"
   - Reminds: "Video uploaded as Private. Change to Public in YouTube Studio when ready."
9. **Step 7 (Update Rate Limits):**
   - Increments quota used (+1600 units)
   - Saves to memories.md
10. Cost: $0 (YouTube API free within quota)
11. Execution time: 30 seconds setup + 2-10 minutes upload depending on file size

---
