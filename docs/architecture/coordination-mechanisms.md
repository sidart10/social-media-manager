# Coordination Mechanisms

## Agent Handoff Protocol

**Handoff Package JSON Schema:**

```json
{
  "handoff_id": "jarvis-to-zoe-2025-10-31-10-25",
  "source_agent": "Jarvis",
  "target_agent": "Zoe",
  "content_type": "linkedin_post",
  "platform_specs": {
    "platform": "LinkedIn",
    "format": "single_image",
    "aspect_ratio": "1200x627",
    "design_choice": "dark_tech_monochrome"
  },
  "file_paths": {
    "post_content": "outputs/projects/2025-10-31-ai-agents-linkedin/03-drafts/linkedin-post-v2.md",
    "research_brief": "outputs/projects/2025-10-31-ai-agents-linkedin/01-research/research-brief.md"
  },
  "metadata": {
    "voice_version": "Enhanced Voice Profile v2.0",
    "voice_confidence": 8.7,
    "voice_mode": "Analyst",
    "quality_scores": {
      "evidence_backing": 9,
      "platform_compliance": 10,
      "voice_consistency": 8.7
    },
    "timestamp": "2025-10-31T10:25:00Z"
  },
  "notion_context": {
    "page_url": "https://notion.so/...",
    "current_status": "Editing",
    "focus_keywords": ["AI agents", "automation", "productivity"]
  },
  "suggested_next_step": "Generate LinkedIn professional dark tech image optimized for 1200x627"
}
```

**Handoff Locations:**
- **Local:** `outputs/projects/{slug}/handoffs/{source}-to-{target}.json`
- **Notion:** Key metadata summarized in page properties (voice_confidence, quality_scores)

## Routing Decision Tree

```
Content Idea Created (Notion Status: Idea)
    │
    ▼
Jarvis: research-topic (Status: Idea → Research)
    │
    ▼
Jarvis: write-post (Status: Research → Writing → Editing)
    │
    ├─────────────────────────────────────────────┐
    │                                             │
    ▼                                             ▼
Text-only post?                           Needs visuals?
    │                                             │
    ▼                                             ▼
Jarvis → Zoro                            Jarvis → Zoe
(Handoff: post content)                  (Handoff: post + design specs)
    │                                             │
    │                                             ▼
    │                                      Zoe generates visuals
    │                                      (Status stays Editing)
    │                                             │
    │                                             ▼
    │                                        Zoe → Zoro
    │                                      (Handoff: post + media URLs)
    │                                             │
    └─────────────────┬───────────────────────────┘
                      │
                      ▼
              Zoro: schedule-post (PRIMARY)
              OR publish-{platform}-now (backup)
                      │
                      ▼
              Status: Editing → Posted
              Update Publish Date, prompt for metrics
                      │
                      ▼
              User manually archives after analysis
              Status: Posted → Archived
```

**Alternative Path: Standalone Visuals**

```
Zoe: create-image (standalone graphic, no associated post)
    │
    ▼
Save to Notion with Status: Posted
    │
    ▼
Zoe → Zoro
(Handoff: image only, no post content)
    │
    ▼
Zoro: publish-{platform}-now (direct image post)
    │
    ▼
Update Notion with platform URL and metrics
```

## Notion Status Awareness

**How Agents Check Status:**

```python
# Conceptual example (actual implementation via Notion MCP)

# Jarvis checks for work to do
notion_pages = notion_search(status=["Idea", "Research", "Next Up"])
if pages_with_status_idea:
    suggest_workflow("research-topic")
elif pages_with_status_research:
    suggest_workflow("write-post")

# Zoe checks for visuals needed
notion_pages = notion_search(status="Editing", has_media=False)
if pages_needing_visuals:
    suggest_workflow("create-single-image" or "create-carousel")

# Zoro checks for content ready to publish
notion_pages = notion_search(status="Posted", published=False)
if pages_ready_to_publish:
    suggest_workflow("schedule-post" or "publish-{platform}-now")
```

**Status Update Pattern:**

```python
# Workflow completes, updates Notion
notion_update_page(
    page_id=notion_page_id,
    properties={
        "Status": "Writing",  # Transition from Research
        "Content Text": generated_post_content,
        "Publish Date": estimated_date,
        "local_files": f"outputs/projects/{project_slug}/"
    }
)
```

---
