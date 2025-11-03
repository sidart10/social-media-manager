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
```

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
