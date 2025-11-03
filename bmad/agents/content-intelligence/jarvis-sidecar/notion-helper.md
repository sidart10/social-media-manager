# Jarvis Notion Helper

**Purpose:** Query Notion Content Tracker to suggest relevant workflows based on status

**Agent:** Jarvis (Content Intelligence)
**Created:** 2025-11-05
**Epic:** Epic 2 Story 5.1 (Status-Aware Workflow Triggering)

---

## Status Query Logic

**Jarvis monitors these statuses:**

- **Idea** → Content idea exists, needs research
- **Research** → Research complete, needs writing
- **Next Up** → Scheduled for writing

**Workflow Suggestions:**

| Notion Status | Suggested Workflows                    | Reasoning                                  |
| ------------- | -------------------------------------- | ------------------------------------------ |
| Idea          | `*research-topic` or `*generate-ideas` | Content idea exists but no research yet    |
| Research      | `*write-post` or `*write-script`       | Research complete, ready to create content |
| Next Up       | `*write-post` or `*write-script`       | Scheduled content, ready to draft          |

---

## Implementation

### Query Notion on Agent Activation

**When user invokes `/jarvis`:**

```python
# Step 1: Query Notion Content Tracker
content_items = notion_search({
    "data_source_url": "collection://956447a76e7b4b2eafb1e4c9adfcbcf3",  # Content Tracker
    "filters": {
        "Status": ["Idea", "Research", "Next Up"],
        "Graveyard": false
    }
})

# Step 2: Count by status
counts = {
    "Idea": len([x for x in content_items if x.status == "Idea"]),
    "Research": len([x for x in content_items if x.status == "Research"]),
    "Next Up": len([x for x in content_items if x.status == "Next Up"])
}

# Step 3: Display suggestions if content found
if sum(counts.values()) > 0:
    display(f"📊 Found {sum(counts.values())} content items in Notion:")
    if counts["Idea"] > 0:
        display(f"  • {counts['Idea']} ideas waiting for research")
        display(f"    Top 3: {content_items[:3].map(x => x.Name)}")
        display(f"    → Suggest: *research-topic or *generate-ideas")

    if counts["Research"] > 0:
        display(f"  • {counts['Research']} items researched, ready to write")
        display(f"    → Suggest: *write-post")

    if counts["Next Up"] > 0:
        display(f"  • {counts['Next Up']} items scheduled for writing")
        display(f"    → Suggest: *write-post")

# Step 4: Show standard menu
display("\n📋 Jarvis Menu:\n")
display_standard_menu()
```

---

## Notion MCP Tools Used

**Primary Tool:** `notion-search`

**Query Parameters:**

```json
{
  "data_source_url": "collection://956447a76e7b4b2eafb1e4c9adfcbcf3",
  "filters": {
    "Status": ["Idea", "Research", "Next Up"],
    "Graveyard": "__NO__"
  }
}
```

**Note:** Graveyard checkbox uses `__NO__` not `false` in Notion

---

## Error Handling

**If Notion query fails:**

1. Log error: "Notion query failed: {error_message}"
2. Display: "⚠️ Couldn't check Notion (network/auth issue), showing standard menu"
3. Proceed with standard menu (don't block agent activation)

**If Notion query timeout (>5 seconds):**

1. Cancel query
2. Display: "⚠️ Notion query slow, showing standard menu"
3. Proceed without suggestions

---

## Example Output

**Scenario:** User invokes `/jarvis`, Notion has 2 ideas and 1 researched item

```
📊 Found 3 content items in Notion:

  • 2 ideas waiting for research
    Top 3: "How AI agents coordinate", "MCP server architecture"
    → Suggest: *research-topic or *generate-ideas

  • 1 item researched, ready to write
    Top item: "LinkedIn post about Claude Code"
    → Suggest: *write-post

📋 Jarvis Menu:

1. research-topic - Deep research on any topic
2. analyze-profile - Analyze creator profiles
3. competitive-analysis - Compare competitors
4. generate-ideas - Create evidence-backed ideas
5. learn-voice - Extract writing voice
6. write-post - Generate social posts (SUGGESTED!)
7. write-script - Generate video scripts
8. exit - Exit Jarvis

What's your command?
```

---

## Testing Checklist

- [ ] Query returns correct items for Jarvis domain (Status in Idea/Research/Next Up)
- [ ] Top 3 titles displayed correctly
- [ ] Suggestions match status (Idea → research, Research → write)
- [ ] User can still select any workflow from menu (suggestions not forced)
- [ ] Query completes in <5 seconds
- [ ] Error handling works (network failure, timeout)
- [ ] Graveyard filter excludes archived content
- [ ] Empty result shows standard menu without errors

---

**Next:** Create similar notion-helpers for Zoe and Zoro with their specific status queries.
