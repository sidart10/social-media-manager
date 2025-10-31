# Platform-Formatter Redesign Plan - API Formatting Focus

**Date**: October 29, 2025
**Purpose**: Redesign platform-formatter as API upload formatting library
**Status**: ⏳ IN PROGRESS

---

## ✅ What sid Clarified

### REAL Purpose:
- **NOT**: Social media best practices or hashtag strategies
- **YES**: API-specific formatting for successful uploads
- **Focus**: Prepare content for API clients (linkedin-api-client, twitter-api-client)

### Key Requirements:
1. ❌ **NO HASHTAGS** - User doesn't want hashtags on any platform
2. ✅ **LinkedIn little Text escaping** - Reserved characters must be escaped
3. ✅ **Twitter/X content types** - Regular, long-form, media, video
4. ✅ **Instagram content types** - Feed, Reels, carousel
5. ✅ **API compliance** - Format so uploads succeed

---

## ✅ What's Been Done

### LinkedIn Formatter - COMPLETE ✅

**File**: `scripts/platforms/linkedin.py`

**Implements**:
- ✅ LinkedIn little Text Format escaping
- ✅ Reserved characters: `| { } @ [ ] ( ) < > # \ * _ ~`
- ✅ Line break normalization
- ✅ Validation (3000 char limit, 1600 recommended, 140 first line)
- ✅ TESTED and working

**Functions**:
```python
escape_little_text(text)  # Escapes reserved chars
format_line_breaks(text)  # Normalizes \r\n → \n
format_for_api(text)      # Complete formatting
validate(text)            # API validation
```

**Content Types Mapped**:
- text (plain text post)
- image (single image + text)
- multi_image (carousel 2-20 images)
- document (PDF/PPT/DOC + text)
- video (video + text)

---

## ⏳ What Still Needs to Be Done

### 1. Twitter/X Formatter - NEEDS REDESIGN

**Current State**: Basic tweet formatter with hashtag logic
**Needed**: API content type handler

**Twitter/X Content Types to Support:**

#### a) Regular Tweet (280 chars)
```python
CONTENT_TYPE = 'tweet'
CHAR_LIMIT = 280
API_ENDPOINT = 'v2/tweets'
PAYLOAD = {'text': text}
```

#### b) Long-Form Post/Article (Premium, up to 25k chars)
```python
CONTENT_TYPE = 'long_form'
CHAR_LIMIT = 25000  # Premium only
API_ENDPOINT = 'v2/tweets' # Same endpoint
PAYLOAD = {'text': long_text}
NOTE: "API doesn't support formatting (bold/italic) - web only"
```

#### c) Media Post (Tweet + images/video)
```python
CONTENT_TYPE = 'media_tweet'
COMPONENTS:
  - text (280 chars)
  - media_ids (from upload)
PAYLOAD = {
  'text': text,
  'media': {'media_ids': [id1, id2, ...]}
}
```

#### d) Thread
```python
CONTENT_TYPE = 'thread'
COMPONENTS:
  - Array of tweets (each 280 chars)
  - reply_to chaining
PAYLOAD = {
  'text': text,
  'reply': {'in_reply_to_tweet_id': previous_id}
}
```

**Formatting Requirements:**
- ✅ NO special escaping needed (API handles)
- ✅ Character counting (280 for regular, 25k for long-form)
- ✅ Validation (Premium check for long-form)
- ❌ NO hashtag logic (user doesn't want)
- ❌ NO formatting markup (API doesn't support)

---

### 2. Instagram Formatter - NEEDS REDESIGN

**Current State**: Feed post formatter with hashtags
**Needed**: API content type handler with Graph API specifics

**Instagram Content Types:**

#### a) Feed Post
```python
CONTENT_TYPE = 'feed'
CHAR_LIMIT = 2200
API_NOTE: "Videos auto-convert to Reels"
PAYLOAD = {
  'caption': text,
  'image_url': url  # OR media_id
}
```

#### b) Reels
```python
CONTENT_TYPE = 'reels'
CHAR_LIMIT = 2200
ASPECT_RATIO = '9:16'
MAX_DURATION = 90  # seconds
API_FIELD: media_product_type = 'REELS'
PAYLOAD = {
  'caption': text,
  'video_url': url,
  'media_type': 'REELS',
  'share_to_feed': true/false
}
```

#### c) Carousel
```python
CONTENT_TYPE = 'carousel'
CHAR_LIMIT = 2200
MIN_ITEMS = 2
MAX_ITEMS = 10
PAYLOAD = {
  'caption': text,
  'children': [media_ids...]
}
```

**Formatting Requirements:**
- ✅ Caption text (no special escaping)
- ✅ Character limits
- ❌ NO hashtag handling (user doesn't want)
- ✅ media_product_type differentiation (REELS vs feed)

---

### 3. Reels & TikTok - NEEDS REDESIGN

**Remove**: Hashtag strategies, trending hashtag logic
**Keep**: Character limits, caption formatting
**Add**: API-specific requirements

---

### 4. YouTube - NEEDS REDESIGN

**Remove**: Hashtag logic (user doesn't want)
**Keep**: Character limits, timestamp handling
**Add**: Description API requirements

---

## 🎯 Correct Architecture

### Python Formatters Should Handle:

**Per Platform:**
```python
# platform.py

CONTENT_TYPES = {
    'type1': {...},
    'type2': {...}
}

def format_for_api(text, content_type):
    """
    Format text for API upload

    Returns:
        {
            'formatted': escaped/normalized text,
            'valid': bool,
            'warnings': [],
            'content_type': type,
            'api_payload_template': {...}
        }
    """
    pass
```

**LinkedIn Example:**
```python
format_for_api(text, content_type='text')
→ {
    'formatted': '\\(escaped\\) text',
    'valid': True,
    'content_type': 'text',
    'api_payload': {
        'author': 'urn:li:person:...',
        'text': {
            'text': '\\(escaped\\) text'
        }
    }
}
```

**Twitter Example:**
```python
format_for_api(text, content_type='long_form')
→ {
    'formatted': text,  # No escaping needed
    'valid': True,
    'requires_premium': True,
    'content_type': 'long_form',
    'api_payload': {
        'text': text
    }
}
```

---

## 📋 Implementation Checklist

### Phase 1: Core Redesign (HIGH PRIORITY)

- ✅ LinkedIn escaping (DONE)
- [ ] Remove ALL hashtag logic from all platforms
- [ ] Add Twitter content type routing (tweet vs long-form vs media)
- [ ] Add Instagram content type routing (feed vs reels vs carousel)
- [ ] Update `format_platform.py` to route by content_type

### Phase 2: API Payload Templates (MEDIUM PRIORITY)

- [ ] Each formatter returns API payload structure
- [ ] Makes it easy for API clients to use
- [ ] Example: LinkedIn returns proper `{author, text: {text}}` structure

### Phase 3: Documentation (MEDIUM PRIORITY)

- [ ] `reference/linkedin-api-requirements.md` - little Text Format, content types
- [ ] `reference/twitter-api-requirements.md` - Content types, Premium requirements
- [ ] `reference/instagram-api-requirements.md` - Graph API, media_product_type
- [ ] Update SKILL.md to reflect API purpose

### Phase 4: Integration (LOW PRIORITY)

- [ ] Update `linkedin-api-client/lib/formatter.js` to call Python formatter
- [ ] Or port Python logic to JavaScript for direct use
- [ ] Test end-to-end with actual API uploads

---

## 🚨 Critical Issues to Fix

### Issue 1: Hashtags Everywhere ❌

**Current Code Has:**
- Twitter formatter: `HASHTAG_LIMIT = 2`
- LinkedIn formatter: `HASHTAG_LIMIT_MIN = 3, MAX = 5`
- Instagram formatter: `HASHTAG_LIMIT = 5-10`
- All with hashtag handling logic

**User Requirement:**
"I don't want hashtags in any of my posts for any platform"

**Action**: Remove ALL hashtag parameters, logic, and recommendations

---

### Issue 2: Missing Content Types ⚠️

**Twitter Missing:**
- Long-form posts (25k chars, Premium)
- Media posts (images/video attached)
- Differentiation between types

**Instagram Missing:**
- Reels vs Feed differentiation (media_product_type)
- Carousel handling
- Graph API specific requirements

**Action**: Add content_type parameter to all formatters

---

### Issue 3: Social Media Focus vs API Focus ⚠️

**Current**: Optimized for engagement, trending, social best practices
**Needed**: Optimized for API compliance, successful uploads

**Examples:**
- Current: "Optimal length 200-240 for engagement"
- Needed: "API limit 280, Premium limit 25k, no formatting support"

**Action**: Shift focus from engagement to API compliance

---

## 📊 Complexity Assessment

**This is a SIGNIFICANT redesign**, sid!

**Estimated Work:**
- Remove hashtags: 2 hours (all 6 platforms)
- Add content types: 4 hours (research + implement)
- API payload templates: 2 hours
- Documentation: 2 hours
- Testing: 2 hours

**Total**: ~12 hours of focused work

---

## 💡 Builder's Recommendation

**Given session length and complexity:**

**Option A**: Builder creates complete redesign plan (this document)
- You review and approve approach
- Builder implements in fresh session
- Ensures thoroughness

**Option B**: Builder continues NOW with critical pieces
- Remove hashtags (quick)
- Add Twitter content types (medium)
- Document the rest

**Option C**: Builder pauses, you decide scope
- What's most critical for you RIGHT NOW?
- LinkedIn escaping? (DONE ✅)
- Twitter content types?
- Removing hashtags?

**What's your priority, sid?** 🦸

The Builder wants to do this RIGHT, not rushed!
