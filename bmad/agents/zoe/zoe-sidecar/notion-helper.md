# Zoe Notion Helper

**Purpose:** Query Notion Content Tracker to find content needing visuals

**Agent:** Zoe (Visual Production Specialist - Images + Videos)
**Created:** 2025-11-05
**Epic:** Epic 2 Story 5.1 (Status-Aware Workflow Triggering)

---

## Status Query Logic

**Zoe monitors:**

- **Status = "Editing"** with no media → Content ready for visuals

**Workflow Suggestions:**

| Content State                 | Suggested Workflows                          | Reasoning                              |
| ----------------------------- | -------------------------------------------- | -------------------------------------- |
| Editing, no images            | `*create-single-image` or `*create-carousel` | Post drafted, needs thumbnail/graphics |
| Editing, has images, no video | `*create-scene` or `*create-talking-head`    | Images exist, might need video         |
| Editing, needs carousel       | `*create-carousel`                           | Content marked for multi-slide visual  |

---

## Implementation

### Query Notion on Agent Activation

**When user invokes `/zoe`:**

```python
# Step 1: Query for content needing visuals
content_items = notion_search({
    "data_source_url": "collection://956447a76e7b4b2eafb1e4c9adfcbcf3",  # Content Tracker
    "filters": {
        "Status": ["Editing"],
        "Graveyard": false
    }
})

# Step 2: Filter for items without media
# Check if "Content Text" or custom fields contain image/video URLs
needs_visuals = []
for item in content_items:
    content_text = item.properties.get("Content Text", "")

    # Simple heuristic: Check if contains .png, .jpg, .mp4, https://res.cloudinary
    has_images = ".png" in content_text or ".jpg" in content_text or "cloudinary" in content_text
    has_videos = ".mp4" in content_text or "youtube.com" in content_text

    if not has_images and not has_videos:
        needs_visuals.append(item)

# Step 3: Display suggestions
if len(needs_visuals) > 0:
    display(f"🎨 Found {len(needs_visuals)} posts ready for visuals:")
    display(f"  Top 3: {needs_visuals[:3].map(x => x.Name)}")
    display(f"  → Suggest: *create-single-image for thumbnails")
    display(f"  → Or: *create-carousel for multi-slide content")

# Step 4: Check for video needs
if any([item for item in content_items if "video" in item.Description.lower() or "youtube" in item.Channel]):
    display(f"  → Suggest: *create-scene for b-roll or diagram animation")

# Step 5: Show standard menu
display("\n🎨 Zoe Menu:")
display_standard_menu()
```

---

## Example Output

**Scenario:** User invokes `/zoe`, Notion has 4 items with Status="Editing", 3 without images

```
🎨 Found 3 posts ready for visuals:

  Top 3: "How AI agents work", "MCP architecture guide", "LinkedIn carousel about tools"
  → Suggest: *create-single-image for thumbnails
  → Or: *create-carousel for multi-slide content

🎨 Zoe Menu:

1. create-single-image - Generate platform-optimized image (SUGGESTED!)
2. create-carousel - Generate 2-10 slide carousel (SUGGESTED!)
3. edit-image - Modify existing images
4. blend-images - Composite 2-3 images
5. create-scene - Generate b-roll or animate diagram
6. create-talking-head - Generate HeyGen avatar video
7. create-cinematic-sequence - Multi-scene cinematic video
8. exit - Exit Zoe

What's your command?
```

---

## Advanced: Platform-Specific Checks

**Optional Enhancement (Phase 2):**

Check Notion "Channel" property to suggest platform-specific workflows:

```python
if "YouTube" in item.Channel:
    suggest("*create-scene for video content")
    suggest("*create-single-image with design=YouTube for thumbnail")

if "LinkedIn" in item.Channel:
    suggest("*create-single-image with design=LinkedIn dark tech")
    if "carousel" in item.Description.lower():
        suggest("*create-carousel")
```

---

## Testing Checklist

- [ ] Query finds items with Status="Editing"
- [ ] Filters out items that already have images (heuristic works)
- [ ] Top 3 titles displayed correctly
- [ ] Suggestions relevant (universal-image-generation for images, create-scene for videos)
- [ ] User can override suggestions and select any workflow
- [ ] Query completes in <5 seconds
- [ ] Error handling works (Notion unavailable)
- [ ] Graveyard filter excludes archived content

---

**Integration Point:** This helper will be called from Zoe agent activation sequence (zoe.md) before showing standard menu.
