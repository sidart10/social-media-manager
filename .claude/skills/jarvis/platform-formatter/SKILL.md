---
name: platform-formatter
description: Format content for API upload to social platforms. Handles LinkedIn little Text escaping, Twitter/X content type routing (tweet vs long_form), Instagram media_product_type differentiation (feed vs reels). Validates character limits, escapes special characters, prepares API-compliant payloads. NO hashtags. Use before uploading via linkedin-api-client or twitter-api-client.
allowed-tools: Read, Edit, Bash
---

# Platform Formatter Skill - API Formatting Library

## Purpose

Prepare content for successful API uploads to LinkedIn, Twitter/X, and Instagram by handling platform-specific text escaping, content type routing, and API payload generation.

## Critical Understanding

This is NOT about social media best practices or engagement tactics.
This IS about API compliance for successful uploads.

- NO hashtag handling (user doesn't want hashtags)
- Focus: Escaping special characters, content type routing, API payloads
- Use BEFORE calling bmad/modules/linkedin-api-client or twitter-api-client

## When to Use This Skill

Invoke when:

- Content needs LinkedIn little Text escaping (reserved characters)
- Twitter content needs type differentiation (tweet vs long-form)
- Instagram needs media_product_type specification (feed vs reels)
- Preparing content for API upload via existing clients
- Part of automated posting workflows

## Supported Platforms & Content Types

### LinkedIn
- **Content Types**: text | image | multi_image | document | video
- **Special Handling**: little Text Format escaping (15 reserved chars)
- **Key Feature**: Escapes `| { } @ [ ] ( ) < > # \ * _ ~` with backslash
- **Implementation**: `scripts/platforms/linkedin.py`

### Twitter/X
- **Content Types**: tweet | long_form | media_tweet | thread
- **Char Limits**: 280 (regular), 25,000 (long-form/Premium)
- **Key Feature**: Content type routing, Premium detection
- **No Escaping Needed**: API handles text as-is
- **Implementation**: `scripts/platforms/twitter.py`

### Instagram
- **Content Types**: feed | reels | carousel
- **Char Limit**: 2,200 (all types)
- **Key Feature**: media_product_type differentiation
- **Critical**: Reels require `media_type: "REELS"` in payload
- **Implementation**: `scripts/platforms/instagram.py`

## Instructions

### Step 1: Identify Platform and Content Type

**Platform + Type combinations:**

```
LinkedIn:  text | image | multi_image | document | video
Twitter:   tweet | long_form | media_tweet | thread
Instagram: feed | reels | carousel
```

### Step 2: Run Formatter

**Using Python automation (RECOMMENDED):**

```bash
# LinkedIn text post (with escaping)
python3 scripts/format_platform.py linkedin --content "My (post) text" --type text

# Twitter long-form (Premium)
python3 scripts/format_platform.py twitter --content "Long article..." --type long_form

# Instagram Reels
python3 scripts/format_platform.py instagram --content "Reel caption" --type reels
```

**Direct Python import (for workflows):**

```python
from platforms.linkedin import format_for_api as linkedin_format
from platforms.twitter import format_for_api as twitter_format
from platforms.instagram import format_for_api as instagram_format

# LinkedIn with escaping
result = linkedin_format("Test (parens) and #hash", content_type='text')
print(result['formatted'])  # "Test \(parens\) and \#hash"

# Twitter long-form
result = twitter_format(long_text, content_type='long_form')
if result['requires_premium']:
    print("⚠️ Requires Premium account")

# Instagram Reels
result = instagram_format(caption, content_type='reels')
print(result['api_payload_template'])  # Has media_type: "REELS"
```

### Step 3: Validate Output

**Check formatter returns:**

```python
{
    'formatted': str,        # API-ready text
    'valid': bool,          # Passed validation
    'content_type': str,    # Confirmed type
    'api_payload_template': dict,  # For API call
    'requires_premium': bool,      # If applicable
    'char_count': int,
    'char_limit': int
}
```

### Step 4: Use in API Client

**LinkedIn Example:**

```javascript
// In bmad/modules/linkedin-api-client/lib/client.js
const formatted = formatPostText(rawText);  // Uses linkedin.py logic
await createTextPost(accessToken, personUrn, formatted.formatted);
```

**Twitter Example:**

```javascript
// In bmad/modules/twitter-api-client/lib/client.js
const payload = {text: formattedText};  // No escaping needed
await rwClient.v2.tweet(payload);
```

**Instagram Example:**

```javascript
// For Reels
const payload = {
    caption: formattedCaption,
    media_type: "REELS",  // From api_payload_template
    video_url: videoUrl
};
```

## Example Usage

**Input:** Raw text with special characters

```
Content: "Check out our new (AI) product @ #TechConf"
Platform: LinkedIn
Type: text
```

**Process:**

```bash
python3 scripts/format_platform.py linkedin \
  --content "Check out our new (AI) product @ #TechConf" \
  --type text
```

**Output:**

```json
{
  "formatted": "Check out our new \\(AI\\) product \\@ \\#TechConf",
  "valid": true,
  "content_type": "text",
  "api_payload_template": {
    "text": "Check out our new \\(AI\\) product \\@ \\#TechConf"
  }
}
```

**Result:** Ready for LinkedIn API `/rest/posts` endpoint!

## Reference Documentation

Detailed API requirements available in `reference/` directory:

- `linkedin-api-requirements.md` - little Text escaping rules
- `twitter-api-requirements.md` - Content type specifications
- `instagram-api-requirements.md` - media_product_type guide

## Quality Standards

- MUST escape LinkedIn reserved characters (15 total)
- MUST differentiate Twitter content types (affects char limit)
- MUST set Instagram media_product_type correctly
- MUST validate character limits per platform/type
- MUST return API-compliant payload templates
- NO hashtag handling (user preference)

## Integration Points

**Designed to work with:**

- `bmad/modules/linkedin-api-client` - LinkedIn posting
- `bmad/modules/twitter-api-client` - Twitter/X posting
- Instagram Graph API clients (if added)

**Replaces stub implementations:**

- LinkedIn: `lib/formatter.js` escapeLinkedInText() (currently empty)
- Twitter: Content type routing (not yet implemented)

## Edge Cases

**Content too long for type:**

- Returns `valid: false` with error message
- Includes char count and limit in response
- Caller must trim or change content type

**Unsupported content type:**

- Falls back to default type for platform
- Example: Unknown type → 'tweet' for Twitter

**Missing content_type parameter:**

- Uses 'default' which triggers legacy format_content()
- Backwards compatible with old usage

## Testing

Run formatters directly to test:

```bash
# Test LinkedIn escaping
python3 scripts/platforms/linkedin.py

# Test Twitter content types
python3 scripts/platforms/twitter.py

# Test all platforms
python3 scripts/test_formatters.py
```
