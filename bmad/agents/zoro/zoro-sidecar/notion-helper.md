# Zoro Notion Helper

**Purpose:** Query Notion Content Tracker to find content ready for publishing

**Agent:** Zoro (Publishing & Distribution Specialist)
**Created:** 2025-11-05
**Epic:** Epic 2 Story 5.1 (Status-Aware Workflow Triggering)

---

## Status Query Logic

**Zoro monitors:**
- **Status = "Editing"** with media ready → Content complete, ready to publish/schedule

**Workflow Suggestions:**

| Content State | Suggested Workflows | Reasoning |
|---------------|---------------------|-----------|
| Editing, has media | `*schedule-post` (PRIMARY) | Content + visuals ready, schedule via Postiz |
| Editing, text-only | `*schedule-post` or `*publish-linkedin-now` | Text-only post, can publish immediately |
| Editing, has future Publish Date | `*schedule-post` | Already scheduled, can modify or confirm |

---

## Implementation

### Query Notion on Agent Activation

**When user invokes `/zoro`:**

```python
# Step 1: Query for content ready to publish
content_items = notion_search({
    "data_source_url": "collection://956447a76e7b4b2eafb1e4c9adfcbcf3",  # Content Tracker
    "filters": {
        "Status": ["Editing"],  # Content ready but not yet published
        "Graveyard": false
    }
})

# Step 2: Categorize by media readiness
ready_to_publish = []
text_only = []
already_scheduled = []

for item in content_items:
    content_text = item.properties.get("Content Text", "")
    publish_date = item.properties.get("Publish Date")

    # Check for media (images/videos)
    has_media = (
        ".png" in content_text or
        ".jpg" in content_text or
        ".mp4" in content_text or
        "cloudinary.com" in content_text or
        "res.cloudinary.com" in content_text
    )

    # Check if already scheduled
    if publish_date and publish_date > now():
        already_scheduled.append(item)
    elif has_media:
        ready_to_publish.append(item)
    else:
        text_only.append(item)

# Step 3: Display suggestions
total = len(ready_to_publish) + len(text_only) + len(already_scheduled)

if total > 0:
    display(f"📤 Found {total} items ready for publishing:")

    if len(ready_to_publish) > 0:
        display(f"\n  • {len(ready_to_publish)} posts with media ready:")
        display(f"    Top 3: {ready_to_publish[:3].map(x => x.Name)}")
        display(f"    → Suggest: *schedule-post (Postiz multi-platform)")

    if len(text_only) > 0:
        display(f"\n  • {len(text_only)} text-only posts:")
        display(f"    Top 3: {text_only[:3].map(x => x.Name)}")
        display(f"    → Suggest: *schedule-post or *publish-linkedin-now")

    if len(already_scheduled) > 0:
        display(f"\n  • {len(already_scheduled)} already scheduled:")
        display(f"    Dates: {already_scheduled.map(x => x.PublishDate)}")
        display(f"    → Suggest: *check-rate-limits to verify quota")

# Step 4: Show standard menu
display("\n📤 Zoro Menu:")
display_standard_menu()
```

---

## Notion MCP Tools Used

**Primary Tool:** `notion-search`

**Query:**
```json
{
  "data_source_url": "collection://956447a76e7b4b2eafb1e4c9adfcbcf3",
  "filters": {
    "Status": ["Editing"],
    "Graveyard": "__NO__"
  }
}
```

**Advanced:** Can also check for future Publish Dates:
```json
{
  "filters": {
    "Status": ["Editing"],
    "Graveyard": "__NO__",
    "Publish Date": {"after": "now()"}
  }
}
```

---

## Example Output

**Scenario:** User invokes `/zoro`, Notion has 2 items with media, 1 text-only

```
📤 Found 3 items ready for publishing:

  • 2 posts with media ready:
    Top 2: "LinkedIn post: AI agents" (has thumbnail), "YouTube Short: MCP tutorial" (has video)
    → Suggest: *schedule-post (Postiz multi-platform)

  • 1 text-only post:
    Top 1: "Twitter thread: Claude skills"
    → Suggest: *schedule-post or *publish-twitter-now

📤 Zoro Menu:

1. schedule-post - Schedule to multiple platforms via Postiz (SUGGESTED!)
2. publish-tweet-now - Post to Twitter immediately
3. publish-linkedin-now - Post to LinkedIn immediately
4. publish-youtube-now - Upload to YouTube immediately
5. check-rate-limits - Validate API quotas
6. exit - Exit Zoro

What's your command?
```

---

## Media Detection Heuristics

**Check for images:**
- Content Text contains: `.png`, `.jpg`, `.jpeg`, `.webp`
- Content Text contains: `cloudinary.com`, `res.cloudinary.com`
- Custom property: "Image URL" (if added to Notion schema)

**Check for videos:**
- Content Text contains: `.mp4`, `.mov`, `.mp4`
- Content Text contains: `youtube.com/watch`, `youtu.be/`
- Custom property: "Video URL" (if added to Notion schema)

**Future Enhancement:**
Add custom Notion properties:
- "Image URLs" (url or text property)
- "Video URLs" (url or text property)
- "Media Ready" (checkbox property)

This enables precise querying instead of heuristics.

---

## Channel-Specific Suggestions

**Optional Enhancement:**

```python
# Check Channel property for platform-specific suggestions
if "YouTube" in item.Channel:
    display("    → Suggest: *publish-youtube-now for video upload")

if "LinkedIn" in item.Channel and has_images:
    display("    → Suggest: *publish-linkedin-now with image")

if "Twitter" in item.Channel:
    display("    → Suggest: *publish-tweet-now or *schedule-post")
```

---

## Testing Checklist

- [ ] Query finds items with Status="Editing"
- [ ] Media detection works (finds images/videos in Content Text)
- [ ] Text-only posts identified correctly
- [ ] Already scheduled items detected (Publish Date in future)
- [ ] Suggestions match content state (media ready vs text-only)
- [ ] User can select any workflow (suggestions not forced)
- [ ] Query completes in <5 seconds
- [ ] Error handling works (Notion unavailable)

---

**Integration Point:** This helper will be called from Zoe agent activation (zoe.md) before showing menu.

**Note:** After Epic 3 (Zoe agent consolidation), this helper will be in `bmad/agents/zoe/zoe-sidecar/notion-helper.md` (merged location).
