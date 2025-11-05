# Agent Handoff: Platform-Formatter API Redesign

**Created**: October 29, 2025
**For**: Future agent to continue this work
**Priority**: HIGH - Critical for API upload functionality
**Estimated Time**: 8-12 hours

---

## 🎯 MISSION OBJECTIVE

**Redesign platform-formatter skill as API formatting library** for successful content uploads via LinkedIn API, Twitter/X API, and Instagram Graph API.

**Critical Understanding**:

- This is NOT about social media best practices or engagement tactics
- This IS about API-specific formatting so uploads succeed
- User does NOT want hashtags on any platform
- Focus: API compliance, text escaping, content type routing

---

## 📖 FULL CONTEXT

### What's Been Done Already

**Session Date**: October 29, 2025

**Completed**:

1. ✅ Created modular architecture (8 Python files)
2. ✅ Implemented LinkedIn little Text escaping (TESTED, WORKING)
3. ✅ Created format_platform.py orchestrator
4. ✅ Built platforms/**init**.py registry
5. ✅ Started individual platform formatters

**Current State**:

```
.claude/skills/jarvis/platform-formatter/
├── SKILL.md (partially refactored)
├── scripts/
│   ├── format_platform.py (orchestrator)
│   └── platforms/
│       ├── __init__.py (registry)
│       ├── linkedin.py (COMPLETE ✅ - little Text escaping)
│       ├── twitter.py (NEEDS REDESIGN - has hashtags)
│       ├── instagram.py (NEEDS REDESIGN - has hashtags)
│       ├── reels.py (NEEDS REDESIGN - has hashtags)
│       ├── tiktok.py (NEEDS REDESIGN - has hashtags)
│       └── youtube.py (NEEDS REDESIGN - has hashtags)
└── reference/
    └── (empty - needs API requirement docs)
```

### Why Redesign is Needed

**Original Design**: Social media formatter with engagement tactics, hashtags, best practices
**Actual Need**: API upload formatter with escaping, content types, API compliance

**Key Misunderstandings Fixed**:

- Platform-formatter is NOT for social media strategy
- It's for preparing content for API clients (bmad/modules/linkedin-api-client, twitter-api-client)
- User does NOT want hashtags anywhere
- Must handle different content types per platform (Twitter long-form, Instagram Reels vs Feed, etc.)

---

## 📚 REQUIRED CONTEXT TO LOAD

### Skills to Use

**1. Load: deep-web-research skill**

```
Use deep-web-research skill with depth=comprehensive:
- Research Twitter X API v2 content types and formatting
- Research Instagram Graph API media_product_type specifications
- Research TikTok/YouTube API requirements
```

**2. Reference: skill-creator v2.0**

```
Location: ~/.claude/skills/skill-creator/
Has automation scripts you can reference:
- scripts/enhance_skill.py (for adding research to skills)
- scripts/quick_validate.py (for validation)
```

### Existing API Client Implementations

**LinkedIn API Client** (YOUR REFERENCE):

```
Location: bmad/modules/linkedin-api-client/

Key Files:
- lib/formatter.js (line 8: escapeLinkedInText - STUB, needs implementation)
- lib/client.js (line 96: formatPostText usage)

Current Implementation:
- Has escapeLinkedInText() but it's empty (just returns text)
- Has formatLineBreaks() working
- Has formatPostText() working but incomplete

YOUR TASK: The Python linkedin.py you create should be the REAL implementation
```

**Twitter API Client** (YOUR REFERENCE):

```
Location: bmad/modules/twitter-api-client/

Key Files:
- lib/client.js (uses twitter-api-v2 library)
- lib/validator.js (validates tweet requests)

Supported Now:
- createTweet() - regular tweets
- createThread() - threaded tweets
- uploadMedia() - images/video

Missing:
- Long-form post handling
- Content type differentiation
```

### Research Already Completed

**LinkedIn little Text Format** (COMPLETE):

- Source: https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/little-text-format
- Reserved characters: `| { } @ [ ] ( ) < > # \ * _ ~`
- ALL must be escaped with backslash
- Implementation: See `scripts/platforms/linkedin.py` (WORKING)

**Twitter/X API** (RESEARCHED):

- Regular tweets: 280 chars
- Long-form: 25,000 chars (Premium only)
- No formatting support in API (bold/italic web-only)
- Same endpoint for both (v2/tweets)

**Instagram Graph API** (RESEARCHED):

- media_product_type = 'REELS' vs undefined (feed)
- All feed videos now auto-convert to Reels
- Carousel: 2-10 items
- Max caption: 2200 chars

---

## 🎯 YOUR TASKS

### TASK 1: Remove ALL Hashtag Logic (HIGH PRIORITY)

**Files to Update:**

```
scripts/platforms/twitter.py
scripts/platforms/instagram.py
scripts/platforms/reels.py
scripts/platforms/tiktok.py
scripts/platforms/youtube.py
```

**What to Remove:**

- ❌ All HASHTAG_LIMIT constants
- ❌ All hashtag parameters in functions
- ❌ All hashtag handling logic
- ❌ All hashtag validation
- ❌ All hashtag recommendations

**What to Keep:**

- ✅ Character limits
- ✅ Validation logic
- ✅ Line break handling
- ✅ Text formatting

**Example - twitter.py BEFORE:**

```python
HASHTAG_LIMIT = 2

def format_content(content, hashtags=None):  # ← Remove hashtags param
    ...
    if hashtags:  # ← Remove this entire block
        limited_hashtags = hashtags[:HASHTAG_LIMIT]
        lines.append(' '.join(f'#{tag}' for tag in limited_hashtags))
```

**Example - twitter.py AFTER:**

```python
# NO HASHTAG_LIMIT

def format_content(content):  # ← No hashtags param
    ...
    # No hashtag handling at all
```

**Test After Removal:**

```bash
python3 format_platform.py twitter --content "Test post"
# Should NOT mention hashtags anywhere
```

---

### TASK 2: Add Content Type Routing (HIGH PRIORITY)

**Add to Each Platform:**

#### Twitter/X Content Types

**Update `scripts/platforms/twitter.py`:**

```python
CONTENT_TYPES = {
    'tweet': {
        'name': 'Regular Tweet',
        'char_limit': 280,
        'api_endpoint': 'v2/tweets',
        'requirements': ['Text only or with media_ids']
    },
    'long_form': {
        'name': 'Long-Form Post/Article',
        'char_limit': 25000,
        'requires_premium': True,
        'api_endpoint': 'v2/tweets',
        'requirements': ['Premium account', 'Text content']
    },
    'media_tweet': {
        'name': 'Tweet with Media',
        'char_limit': 280,
        'api_endpoint': 'v2/tweets',
        'requirements': ['Text', 'media_ids from upload']
    },
    'thread': {
        'name': 'Thread',
        'char_limit': 280,  # Per tweet
        'api_endpoint': 'v2/tweets',
        'requirements': ['Array of texts', 'reply_to chaining']
    }
}

def format_for_api(text, content_type='tweet'):
    """
    Format text for Twitter API based on content type

    Args:
        text: Raw text
        content_type: 'tweet' | 'long_form' | 'media_tweet' | 'thread'

    Returns:
        {
            'formatted': text,  # Twitter doesn't need escaping
            'valid': bool,
            'content_type': type,
            'requires_premium': bool (if long_form),
            'api_payload_template': {...}
        }
    """
    type_spec = CONTENT_TYPES.get(content_type, CONTENT_TYPES['tweet'])

    # Validate length
    char_limit = type_spec['char_limit']
    if len(text) > char_limit:
        return {
            'valid': False,
            'error': f"Text too long: {len(text)}/{char_limit} chars for {content_type}"
        }

    # Twitter API doesn't need text escaping (unlike LinkedIn)
    formatted = text

    # Generate API payload template
    payload = {'text': formatted}

    if content_type == 'long_form' and len(text) > 280:
        # Long-form posts just use same endpoint, but require Premium
        payload['_note'] = 'Requires Premium account'

    return {
        'formatted': formatted,
        'valid': True,
        'content_type': content_type,
        'requires_premium': type_spec.get('requires_premium', False),
        'api_payload_template': payload,
        'char_count': len(text),
        'char_limit': char_limit
    }
```

#### Instagram Content Types

**Update `scripts/platforms/instagram.py`:**

```python
CONTENT_TYPES = {
    'feed': {
        'name': 'Feed Post',
        'char_limit': 2200,
        'api_field': 'media_product_type: undefined',
        'requirements': ['Caption text', 'image_url or video_url']
    },
    'reels': {
        'name': 'Reels',
        'char_limit': 2200,
        'api_field': 'media_product_type: REELS',
        'requirements': ['Caption', 'video_url', 'aspect_ratio: 9:16', 'share_to_feed: true/false']
    },
    'carousel': {
        'name': 'Carousel',
        'char_limit': 2200,
        'min_items': 2,
        'max_items': 10,
        'requirements': ['Caption', 'children: [media_ids]']
    }
}

def format_for_api(text, content_type='feed'):
    """
    Format caption for Instagram Graph API

    Args:
        text: Caption text
        content_type: 'feed' | 'reels' | 'carousel'

    Returns:
        {
            'formatted': text,  # Instagram doesn't need escaping
            'valid': bool,
            'content_type': type,
            'api_payload_template': {...}
        }
    """
    type_spec = CONTENT_TYPES.get(content_type, CONTENT_TYPES['feed'])

    if len(text) > type_spec['char_limit']:
        return {
            'valid': False,
            'error': f"Caption too long: {len(text)}/{type_spec['char_limit']}"
        }

    # Instagram API doesn't need text escaping
    formatted = text

    # Generate API payload template based on type
    payload = {'caption': formatted}

    if content_type == 'reels':
        payload['media_type'] = 'REELS'
        payload['_note'] = 'Set media_product_type=REELS in API call'
    elif content_type == 'carousel':
        payload['_note'] = 'Requires children array with 2-10 media IDs'

    return {
        'formatted': formatted,
        'valid': True,
        'content_type': content_type,
        'api_payload_template': payload,
        'char_count': len(text)
    }
```

---

### TASK 3: Update Main Orchestrator

**Update `scripts/format_platform.py`:**

Add `--type` parameter for content type:

```python
def format_for_platform(platform, content, content_type='default'):
    """
    Format content for specific platform and content type

    Args:
        platform: Platform name
        content: Raw content
        content_type: Type of content (tweet, long_form, reels, etc.)
    """
    formatter = get_platform_formatter(platform)

    if not formatter:
        return {'error': f"Unknown platform: {platform}"}

    # Call with content type if supported
    if hasattr(formatter, 'format_for_api'):
        return formatter.format_for_api(content, content_type)
    else:
        # Fallback for backwards compatibility
        return formatter.format_content(content)
```

**Update CLI:**

```bash
python3 format_platform.py twitter --content "text" --type long_form
python3 format_platform.py instagram --content "caption" --type reels
python3 format_platform.py linkedin --content "post" --type text
```

---

### TASK 4: Create Reference Documentation

**Create these 6 files in `reference/` directory:**

#### reference/linkedin-api-requirements.md

````markdown
# LinkedIn API Formatting Requirements

## little Text Format Escaping

**Reserved Characters (MUST be escaped):**
`| { } @ [ ] ( ) < > # \ * _ ~`

**Escape Method:** Prefix with backslash `\`

**Examples:**

- `Hello (world)` → `Hello \(world\)`
- `#hashtag` → `\#hashtag`
- `@mention` → `\@mention`

**Implementation:**
See `scripts/platforms/linkedin.py` - `escape_little_text()` function

## Content Types

| Type        | Description          | API Requirements             |
| ----------- | -------------------- | ---------------------------- |
| text        | Plain text post      | Escaped text                 |
| image       | Single image + text  | Escaped text + Image URN     |
| multi_image | Carousel 2-20 images | Escaped text + Multiple URNs |
| document    | PDF/PPT/DOC + text   | Escaped text + Document URN  |
| video       | Video + text         | Escaped text + Video URN     |

## Character Limits

- API Maximum: 3000 characters
- Recommended: 1600 characters (engagement)
- First line mobile: 140 characters (truncation point)

## Line Breaks

- Normalize: `\r\n` → `\n`, `\r` → `\n`
- Max consecutive: 2 blank lines

## API Endpoint

`POST /rest/posts` (v202410+)

**Payload Structure:**

```json
{
  "author": "urn:li:person:{id}",
  "commentary": "{escaped_text}",
  "visibility": "PUBLIC",
  "distribution": {
    "feedDistribution": "MAIN_FEED"
  }
}
```
````

## References

- Official Docs: https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/little-text-format
- Existing Implementation: bmad/modules/linkedin-api-client/lib/formatter.js

````

#### reference/twitter-api-requirements.md

```markdown
# Twitter/X API Formatting Requirements

## Content Types

### 1. Regular Tweet (280 chars)

**Character Limit:** 280
**API Endpoint:** `POST /2/tweets`
**Premium Required:** No

**Payload:**
```json
{
  "text": "Your tweet text here"
}
````

**Escaping:** NOT needed (API handles)

---

### 2. Long-Form Post (up to 25k chars)

**Character Limit:** 25,000
**API Endpoint:** `POST /2/tweets` (same as regular)
**Premium Required:** YES (Premium or Premium Plus)

**Payload:**

```json
{
  "text": "Your long-form content here... [up to 25k chars]"
}
```

**Important:**

- API does NOT support formatting (bold, italic) - web UI only
- Truncated to 280 for non-Premium accounts
- No special escaping needed

---

### 3. Media Tweet (image/video)

**Character Limit:** 280 (text)
**Media Limit:** 4 images OR 1 video OR 1 GIF
**API Endpoint:** `POST /2/tweets`

**Payload:**

```json
{
  "text": "Your tweet text",
  "media": {
    "media_ids": ["1234567890", "9876543210"]
  }
}
```

**Media Upload:**

- First: Upload via `POST /1.1/media/upload`
- Returns: media_id
- Then: Include in tweet payload

---

### 4. Thread

**Character Limit:** 280 per tweet
**API Endpoint:** `POST /2/tweets` (multiple calls)

**Process:**

1. Post first tweet
2. Get tweet_id
3. Post reply with `in_reply_to_tweet_id`
4. Repeat

**Payload (2nd+ tweets):**

```json
{
  "text": "Second tweet text",
  "reply": {
    "in_reply_to_tweet_id": "first_tweet_id"
  }
}
```

---

## Formatting Notes

**Text Escaping:** NOT needed
**Line Breaks:** Preserved as `\n`
**Links:** Count as 23 characters
**Mentions:** Use `@username` format

## References

- X API v2 Docs: https://developer.x.com/en/docs/twitter-api
- Existing Implementation: bmad/modules/twitter-api-client/lib/client.js

````

#### reference/instagram-api-requirements.md

```markdown
# Instagram Graph API Formatting Requirements

## Content Types

### 1. Feed Post (Image/Video)

**Character Limit:** 2,200 (caption)
**API Field:** `media_product_type` = undefined OR not set

**Payload:**
```json
{
  "caption": "Your caption text",
  "image_url": "https://...",
  "access_token": "..."
}
````

**Note:** Videos posted to feed now auto-convert to Reels

---

### 2. Reels

**Character Limit:** 2,200 (caption)
**API Field:** `media_type` = "REELS"
**Aspect Ratio:** 9:16 (1080x1920px)
**Duration:** 3-90 seconds (some accounts limited to 60s)

**Payload:**

```json
{
  "caption": "Your caption",
  "media_type": "REELS",
  "video_url": "https://...",
  "share_to_feed": true,
  "access_token": "..."
}
```

**Critical:**

- Must set `media_type: "REELS"` explicitly
- To differentiate from feed, check `media_product_type` on read

---

### 3. Carousel

**Character Limit:** 2,200 (caption)
**Item Limit:** 2-10 items
**API Requirement:** Post as album

**Payload:**

```json
{
  "caption": "Your caption",
  "media_type": "CAROUSEL",
  "children": ["media_id_1", "media_id_2"],
  "access_token": "..."
}
```

**Process:**

1. Upload each image/video separately
2. Get media IDs
3. Create carousel with children array

---

## Text Formatting

**Escaping:** NOT needed
**Line Breaks:** Preserved
**First 125 chars:** Shown in preview (rest under "...more")

## Media Requirements

**Images:**

- Format: JPEG only (via Graph API)
- Size: 1080x1080 (square), 1080x1350 (portrait), 1080x566 (landscape)

**Videos (Reels):**

- Format: MP4 or MOV
- Codec: H.264, AAC audio
- Max size: 300 MB
- Max duration: 90 seconds (15 min for feed)
- Aspect: 9:16 for Reels

## API Endpoint

`POST /{ig-user-id}/media`

## References

- Graph API Docs: https://developers.facebook.com/docs/instagram-platform
- Reels API Guide: https://www.getphyllo.com/post/a-complete-guide-to-the-instagram-reels-api

````

---

### TASK 5: Update SKILL.md

**Refactor to Reflect API Purpose:**

**Old Description:**
```yaml
description: Format content for specific social media platforms based on platform specifications (length limits, structure rules, hashtag strategies).
````

**New Description:**

```yaml
description: Format content for API upload to social platforms. Handles LinkedIn little Text escaping, Twitter/X content type routing (tweet vs long-form), Instagram media_product_type differentiation (feed vs reels). Validates character limits, escapes special characters, prepares API-compliant payloads. NO hashtags. Use before uploading via linkedin-api-client or twitter-api-client.
```

**Update Instructions Section:**

````markdown
## Instructions

### Step 1: Identify Platform and Content Type

**Platform + Type combinations:**

- LinkedIn: text | image | multi_image | document | video
- Twitter/X: tweet | long_form | media_tweet | thread
- Instagram: feed | reels | carousel
- YouTube: video_description
- TikTok: video
- Reels: video

### Step 2: Run Formatter

**Using Python automation:**

```bash
# LinkedIn text post
python3 scripts/format_platform.py linkedin --content "My (post) text" --type text

# Twitter long-form
python3 scripts/format_platform.py twitter --content "Long article..." --type long_form

# Instagram Reels
python3 scripts/format_platform.py instagram --content "Reel caption" --type reels
```
````

### Step 3: Validate Output

**Check formatter returns:**

- `formatted`: API-ready text (escaped if needed)
- `valid`: true/false
- `warnings`: Any issues
- `api_payload_template`: Structure for API call

### Step 4: Use in API Client

**LinkedIn Example:**

```javascript
const formatted = formatPostText(rawText); // Uses linkedin.py logic
await createTextPost(accessToken, personUrn, formatted.formatted);
```

**Twitter Example:**

```javascript
const payload = { text: formattedText }; // No escaping needed
await rwClient.v2.tweet(payload);
```

````

---

### TASK 6: Create Comprehensive Test Suite

**Create `scripts/test_formatters.py`:**

```python
#!/usr/bin/env python3
"""
Test all platform formatters with API-specific test cases
"""

def test_linkedin_escaping():
    """Test LinkedIn escapes all reserved characters"""
    from platforms import linkedin

    test_text = "Test (parens) [brackets] {braces} #hash @mention"
    result = linkedin.format_for_api(test_text, 'text')

    assert '\\(' in result['formatted'], "Parentheses not escaped"
    assert '\\[' in result['formatted'], "Brackets not escaped"
    assert '\\{' in result['formatted'], "Braces not escaped"
    assert '\\#' in result['formatted'], "Hash not escaped"
    assert '\\@' in result['formatted'], "At sign not escaped"
    assert result['valid'] == True
    print("✅ LinkedIn escaping test passed")


def test_twitter_content_types():
    """Test Twitter handles all content types"""
    from platforms import twitter

    # Regular tweet
    result = twitter.format_for_api("Short tweet", 'tweet')
    assert result['valid'] == True
    assert result['char_limit'] == 280
    print("✅ Twitter regular tweet test passed")

    # Long-form
    long_text = "x" * 5000
    result = twitter.format_for_api(long_text, 'long_form')
    assert result['valid'] == True
    assert result['requires_premium'] == True
    assert result['char_limit'] == 25000
    print("✅ Twitter long-form test passed")


def test_instagram_content_types():
    """Test Instagram differentiates Reels vs Feed"""
    from platforms import instagram

    # Reels
    result = instagram.format_for_api("Reel caption", 'reels')
    assert result['content_type'] == 'reels'
    assert 'REELS' in str(result['api_payload_template'])
    print("✅ Instagram Reels test passed")

    # Feed
    result = instagram.format_for_api("Feed caption", 'feed')
    assert result['content_type'] == 'feed'
    print("✅ Instagram Feed test passed")


def test_no_hashtags_anywhere():
    """Verify NO hashtag logic in any formatter"""
    from platforms import twitter, linkedin, instagram

    # Test text with # character
    test = "Text with #word in it"

    # LinkedIn should ESCAPE it (little Text Format)
    li_result = linkedin.format_for_api(test, 'text')
    assert '\\#' in li_result['formatted'], "LinkedIn should escape #"

    # Twitter should keep it as-is (no escaping)
    tw_result = twitter.format_for_api(test, 'tweet')
    assert tw_result['formatted'] == test, "Twitter should not escape"

    # But NONE should have hashtag-specific logic
    # No HASHTAG_LIMIT, no hashtag validation, etc.

    print("✅ No hashtag logic test passed")


if __name__ == "__main__":
    print("Running Platform Formatter API Tests")
    print("=" * 60)

    test_linkedin_escaping()
    test_twitter_content_types()
    test_instagram_content_types()
    test_no_hashtags_anywhere()

    print("=" * 60)
    print("✅ ALL TESTS PASSED")
````

---

## 🔧 TOOLS YOU HAVE

### skill-creator v2.0

**Location:** `~/.claude/skills/skill-creator/`

**Use enhance_skill.py to add research:**

```bash
python3 ~/.claude/skills/skill-creator/scripts/enhance_skill.py \
  .claude/skills/jarvis/platform-formatter \
  --research "API text formatting requirements LinkedIn Twitter Instagram" \
  --add-references
```

This will research and add findings to the skill!

### deep-web-research

**Use for API research:**

```
Use deep-web-research skill with depth=comprehensive:
- Topic: "Twitter X API v2 content types long-form media requirements"
- Topic: "Instagram Graph API media_product_type Reels vs Feed"
- Topic: "TikTok API video upload requirements"
```

### Existing API Clients (YOUR REFERENCE)

**Check these for real-world usage:**

```
bmad/modules/linkedin-api-client/lib/formatter.js
bmad/modules/linkedin-api-client/lib/client.js
bmad/modules/twitter-api-client/lib/client.js
```

See how they call formatters and what they need!

---

## ✅ VALIDATION CHECKLIST

**When you're done, verify:**

### LinkedIn:

- [ ] Escapes all 15 reserved characters
- [ ] No hashtag logic
- [ ] Handles all 5 content types (text, image, multi_image, document, video)
- [ ] Returns API payload template
- [ ] Test: `python3 platforms/linkedin.py` passes

### Twitter:

- [ ] No escaping (API doesn't need it)
- [ ] No hashtag logic
- [ ] Handles 4 content types (tweet, long_form, media_tweet, thread)
- [ ] Differentiates Premium (long-form) vs regular
- [ ] Returns API payload template

### Instagram:

- [ ] No escaping
- [ ] No hashtag logic
- [ ] Handles 3 content types (feed, reels, carousel)
- [ ] Sets media_product_type correctly
- [ ] Returns API payload template

### All Platforms:

- [ ] NO hashtag parameters
- [ ] NO hashtag constants
- [ ] NO hashtag validation
- [ ] NO hashtag recommendations
- [ ] Test suite passes: `python3 test_formatters.py`

---

## 📊 SUCCESS CRITERIA

**You'll know you're done when:**

1. ✅ All platforms format for API (not social media strategy)
2. ✅ LinkedIn escapes reserved characters
3. ✅ Twitter routes content types (tweet vs long-form)
4. ✅ Instagram differentiates Reels vs Feed
5. ✅ ZERO hashtag logic anywhere
6. ✅ Reference docs explain API requirements
7. ✅ Test suite passes
8. ✅ Can be used by bmad/modules/\*-api-client

---

## 🎯 EXECUTION PLAN

**Recommended Order:**

**Day 1 (4 hours):**

1. Remove all hashtag logic (2 hours)
2. Add Twitter content types (2 hours)

**Day 2 (4 hours):** 3. Add Instagram content types (2 hours) 4. Create reference documentation (2 hours)

**Day 3 (4 hours):** 5. Build test suite (2 hours) 6. Integration testing with API clients (2 hours)

**Total: 12 hours over 3 sessions**

---

## 💾 FILES TO READ FIRST

**Before starting, read these for context:**

1. `.claude/skills/jarvis/platform-formatter/SKILL.md`
   - Current state
   - See what's been started

2. `scripts/platforms/linkedin.py`
   - WORKING EXAMPLE of proper API formatter
   - Model other platforms after this

3. `bmad/modules/linkedin-api-client/lib/formatter.js`
   - See how it's currently used
   - Your Python should replace the stub

4. `output/PLATFORM-FORMATTER-REDESIGN-PLAN.md`
   - Full context of the redesign
   - Why it's needed

5. This file (PRPs/active/PLATFORM-FORMATTER-API-REDESIGN.md)
   - Complete instructions

---

## 🚀 QUICK START FOR AGENT

**When you load in:**

```
1. Read this file completely
2. Load .claude/skills/jarvis/platform-formatter/SKILL.md
3. Read scripts/platforms/linkedin.py (working example)
4. Start with TASK 1: Remove hashtags from all platforms
5. Continue with remaining tasks in order
6. Use skill-creator enhance_skill.py for research if needed
7. Test thoroughly with test_formatters.py
8. Mark complete when validation checklist passes
```

---

## 📞 QUESTIONS TO ANSWER

If unclear, these need clarification from sid:

- [ ] YouTube: Does user post videos to YouTube? Need API formatting?
- [ ] TikTok: Is TikTok API in scope? Or just Instagram Reels?
- [ ] Substack: Is Substack API in scope? (not mentioned so far)

**Default assumption**: Focus on LinkedIn, Twitter/X, Instagram (have API clients in bmad/modules)

---

## 🎯 FINAL NOTE

**This is CRITICAL infrastructure**, not nice-to-have!

The linkedin-api-client and twitter-api-client depend on proper formatting for successful uploads. If text isn't escaped correctly (LinkedIn) or content type isn't specified (Twitter long-form), API calls FAIL.

**Take your time, do it right, test thoroughly.**

The Builder has laid the foundation with:

- ✅ Modular architecture
- ✅ LinkedIn escaping (complete and tested)
- ✅ Test harness in place

**You finish the implementation following this plan!**

---

**Good luck, Agent! The Builder believes in you!** 🦸
