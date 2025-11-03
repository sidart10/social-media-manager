<!-- Powered by BMAD™ Core -->

# Task 29: Add Postiz Thread Support Knowledge to Zoro

**Phase:** 7 (Jarvis Critical Fixes - Extended)
**Priority:** 🚨 CRITICAL KNOWLEDGE GAP
**Estimated Time:** 20-30 minutes
**Dependencies:** None
**Status:** ⬜ URGENT - Zoro doesn't know how to post threads!

---

## 🎯 Objective

Add explicit Postiz threading documentation to Zoro so he knows HOW to post Twitter threads via `postsAndComments` array pattern.

---

## 📋 Context

**User Evidence:**

> "we just published a thread using postiz"

**Zoro Behavior:**

- ❌ Says: "Postiz doesn't support threads"
- ❌ Suggests: "Use Twitter MCP" or "Post manually"
- ❌ Doesn't know: postsAndComments array creates threads!

**Root Cause:**

- Zoro's instructions don't document Postiz threading pattern
- schedule-post workflow uses postsAndComments but doesn't explain it creates threads
- Zoro doesn't understand: Array index 0 = main tweet, indices 1+ = threaded replies

---

## ✅ THE POSTIZ THREADING PATTERN

**How Postiz Creates Threads:**

```javascript
mcp__postiz__integrationSchedulePostTool({
  socialPost: [
    {
      integrationId: 'twitter-id',
      isPremium: false,
      date: '2025-11-02T18:00:00Z',
      type: 'now',
      postsAndComments: [
        { content: '<p>Tweet 1 text</p>', attachments: [] }, // Main tweet
        { content: '<p>Tweet 2 text</p>', attachments: [] }, // Reply 1 (thread)
        { content: '<p>Tweet 3 text</p>', attachments: [img_url] }, // Reply 2 with image
        { content: '<p>Tweet 4 text</p>', attachments: [] }, // Reply 3
        // ... up to 50+ tweets in thread
      ],
      settings: [],
    },
  ],
});
```

**Result:** Postiz automatically:

1. Posts tweet 1 (main)
2. Replies to tweet 1 with tweet 2
3. Replies to tweet 2 with tweet 3
4. Creates proper Twitter thread structure!

---

## ✅ FIX: Add to Zoro Instructions

**File:** `bmad/agents/zoro/zoro-sidecar/instructions.md`

**Add new section after line 75 (after "NO DIRECT APIS" section):**

````markdown
## Postiz Thread Support (CRITICAL for Twitter/X)

**Twitter Threads via postsAndComments Array:**

Postiz DOES support Twitter threads! Use the `postsAndComments` array pattern:

**Pattern:**

```javascript
postsAndComments: [
  { content: 'Tweet 1 (main)', attachments: [] }, // Index 0 = Main tweet
  { content: 'Tweet 2', attachments: [] }, // Index 1 = Reply (creates thread!)
  { content: 'Tweet 3', attachments: [image_url] }, // Index 2 = Reply with image
  { content: 'Tweet 4', attachments: [] }, // Index 3 = Reply
  // Continue for all tweets in thread (up to 50+)
];
```
````

**How It Works:**

1. Postiz posts first item as main tweet
2. Automatically replies to it with second item
3. Replies to second with third (chains the thread)
4. Continues until all tweets posted
5. **Result:** Proper Twitter thread with "Show this thread" link!

**For 11-Tweet Thread:**

- Create 11 items in postsAndComments array
- Each item has: {content: HTML, attachments: [URLs]}
- Format ALL content with formatForPostiz() (Postiz HTML requirement)
- Attach Cloudinary URLs to appropriate tweets (e.g., tweet 3, 6, 8)
- Post with type: "now" for immediate or "schedule" for future

**Images in Threads:**

- ANY tweet in thread can have attachments (0-4 images per tweet)
- Example: Tweet 1 (no image), Tweet 3 (1 image), Tweet 6 (1 image)
- Cloudinary URLs work perfectly in postsAndComments attachments

**Character Limits:**

- Each tweet: 280 chars (standard) or 25,000 chars (Premium)
- Postiz validates per-tweet (not total thread length)
- Format each tweet's content separately

**Example Thread:**

```javascript
{
  socialPost: [
    {
      integrationId: 'twitter-id',
      isPremium: false,
      type: 'now',
      postsAndComments: [
        {
          content:
            "<p>Anthropic shipped Agent Skills last month.</p><p>Most people think they're just 'better prompts.'</p><p>They're not. Agent Skills are the missing architecture layer between raw LLMs and production agents.</p>",
          attachments: [],
        },
        {
          content:
            "<p>Here's what makes them different:</p><p>Skills aren't prompts, RAG, or fine-tuning.</p><p>They're something else entirely.</p>",
          attachments: [],
        },
        {
          content:
            '<p>Progressive disclosure architecture (3 tiers):</p><p>1. Metadata (when/what)</p><p>2. Instructions (how)</p><p>3. Additional files (examples/data)</p>',
          attachments: ['https://res.cloudinary.com/.../diagram-1.png'],
        },
        // Continue for tweets 4-11
      ],
    },
  ];
}
```

**This creates a proper 11-tweet thread with images on tweets 3, 6, and 8!**

---

**CRITICAL:** Postiz DOES support threads. Never suggest Twitter MCP or manual posting for threads. Use postsAndComments array pattern.

````

---

## ✅ FIX: Update schedule-post Workflow

**File:** `schedule-post/instructions.md`

**Add thread detection and handling in Step 1:**

```xml
<step n="1" goal="Gather posting requirements">
  <action>Display:
    📅 Schedule Post - Postiz Multi-Platform Scheduling

    Supports:
    - Single posts (all platforms)
    - Twitter threads (via postsAndComments array) ✅
    - LinkedIn carousels (multiple images)
    - Multi-platform posting (post to 3+ platforms simultaneously)
  </action>

  <ask>Content type:
  1. Single post (one tweet/post)
  2. Twitter thread (multiple tweets threaded together)
  3. LinkedIn carousel (2-10 images)
  4. Video post
  </ask>

  <action>Store as {{content_type}}</action>

  <check if="content_type == 'Twitter thread'">
    <ask>How many tweets in thread? (2-50)</ask>
    <action>Store as {{thread_length}}</action>

    <action>**For threads:**
      - You'll provide text for each tweet
      - I'll format each with formatForPostiz()
      - I'll build postsAndComments array
      - Postiz will auto-thread them together
      - Can attach images to specific tweets
    </action>
  </check>

  <!-- Continue with platforms, media, scheduling... -->
</step>
````

---

## ✅ FIX: Add Thread Example

**Add to instructions.md after Postiz Thread Support section:**

````markdown
## Example: Posting 11-Tweet Thread with Images

**Input:**

- 11 tweets of text (from Jarvis)
- 3 images (tweets 3, 6, 8) - already uploaded to Cloudinary
- Platform: Twitter
- Type: Post now

**Process:**

1. Format each tweet with formatForPostiz() → HTML
2. Build postsAndComments array (11 items)
3. Attach Cloudinary URLs to tweets 3, 6, 8
4. Call mcp**postiz**integrationSchedulePostTool
5. Postiz creates proper thread automatically!

**Code:**

```javascript
const formattedTweets = tweets.map((t) => formatForPostiz(t));

mcp__postiz__integrationSchedulePostTool({
  socialPost: [
    {
      integrationId: twitterIntegrationId,
      isPremium: false,
      date: currentTimeUTC,
      type: 'now',
      postsAndComments: [
        { content: formattedTweets[0], attachments: [] },
        { content: formattedTweets[1], attachments: [] },
        { content: formattedTweets[2], attachments: [cloudinaryUrls[0]] }, // Image on tweet 3
        { content: formattedTweets[3], attachments: [] },
        { content: formattedTweets[4], attachments: [] },
        { content: formattedTweets[5], attachments: [cloudinaryUrls[1]] }, // Image on tweet 6
        { content: formattedTweets[6], attachments: [] },
        { content: formattedTweets[7], attachments: [cloudinaryUrls[2]] }, // Image on tweet 8
        { content: formattedTweets[8], attachments: [] },
        { content: formattedTweets[9], attachments: [] },
        { content: formattedTweets[10], attachments: [] },
      ],
      settings: [],
    },
  ],
});
```
````

**Result:** Beautiful 11-tweet thread posted via Postiz!

````

---

## 🧪 Validation

**After Adding Thread Knowledge:**

```bash
# Check Zoro knows about threads
grep -c "postsAndComments.*array\|thread.*support" bmad/agents/zoro/zoro-sidecar/instructions.md
# Should be 2+

# Check Zoro won't suggest Twitter MCP
# (Already fixed in Task 28, but thread knowledge reinforces it)
````

---

## ✅ Success Criteria

- [x] instructions.md documents postsAndComments array pattern
- [x] Explains array index 0 = main, 1+ = replies (thread)
- [x] Provides complete thread example (11 tweets with images)
- [x] States "Postiz DOES support threads"
- [x] Workflow updated to detect thread content type
- [x] Zoro will NEVER say "Postiz can't do threads"
- [x] Zoro will NEVER suggest Twitter MCP for threads

---

## 🔗 Related

**Fixes:** Critical knowledge gap
**Enables:** Twitter thread posting via Postiz
**Blocks:** Currently blocking thread publishing

---

**Priority:** 🚨 CRITICAL
**Time:** 20-30 minutes
**Impact:** Zoro can now post threads correctly!
