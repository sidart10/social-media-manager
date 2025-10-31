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
```

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
