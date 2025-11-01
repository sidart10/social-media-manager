# Epic 2: Notion Integration - Implementation Plan

**Epic:** Notion Integration & Status-Driven Collaboration
**Estimated:** 3-5 days (greenfield)
**Risk Level:** HIGH (never implemented before)
**Dependencies:** Epic 1 complete ✅

---

## Overview

Transform agents from stateless executors to Notion-aware collaborators. Agents will check Content Tracker status before suggesting workflows, update status as they complete work, and maintain relational integrity with Keywords, Channels, and Tasks databases.

---

## Story 5.1: Notion Status-Aware Workflow Triggering

**Goal:** Agents check Notion Content Tracker and suggest relevant workflows based on current status

**Implementation Steps:**

### Step 1: Add Notion Query Helper to Each Agent

**File:** `bmad/agents/{agent}/{agent}-sidecar/notion-helper.md`

**Functionality:**
```python
def check_content_status(agent_name):
    """Query Notion Content Tracker for content matching agent's domain"""

    # Agent-specific queries
    if agent_name == "jarvis":
        statuses = ["Idea", "Research", "Next Up"]
        suggestion_map = {
            "Idea": "research-topic or generate-ideas",
            "Research": "write-post",
            "Next Up": "write-post"
        }
    elif agent_name == "zoe":
        statuses = ["Editing"]
        # Check for content without media URLs
        filter: Status=Editing AND (no image URLs OR no video URLs)
        suggestion_map = {
            "Editing": "create-single-image or create-scene"
        }
    elif agent_name == "zoro":
        statuses = ["Posted"]
        # Actually "Editing with media ready" for publishing
        filter: Status=Editing AND (image URLs exist OR video URLs exist)
        suggestion_map = {
            "Editing": "schedule-post"
        }

    # Query Notion
    results = notion_mcp_search({
        "data_source_url": "collection://956447a76e7b4b2eafb1e4c9adfcbcf3",
        "filters": {
            "Status": statuses,
            "Graveyard": false
        }
    })

    return {
        "count": len(results),
        "top_3_titles": results[:3],
        "suggested_workflows": suggestion_map[status]
    }
```

### Step 2: Update Agent Activation to Check Notion First

**Modify:** Each agent's activation (jarvis.md, zoe.md, zoro.md)

**Add to activation sequence:**
```xml
<step n="2.5" name="Check Notion Status">
  <action>
    Call notion-helper to check Content Tracker
    If content found matching agent domain:
      Display: "Found {count} items with Status={status}"
      Display: "Top 3: {titles}"
      Display: "Suggested: {workflows}"
    Else:
      Proceed with standard menu
  </action>
</step>
```

### Step 3: Test Status-Aware Triggering

**Test Scenarios:**
1. Notion has 3 items with Status="Idea" → Jarvis suggests research-topic
2. Notion has 2 items with Status="Editing", no images → Zoe suggests create-single-image
3. Notion has 1 item with Status="Editing", has images → Zoro suggests schedule-post

**Success Criteria:**
- Agents display relevant suggestions based on Notion status
- User can override and select different workflow from menu
- Query completes in <5 seconds

**Estimated:** 1 day

---

## Story 5.2: Agent Status Updates During Workflow Execution

**Goal:** Agents update Notion status as they complete work with proper transition rules

**Implementation Steps:**

### Step 1: Create Notion Update Module

**File:** `.bmad-core/modules/notion-updates.md`

**Functions:**
```python
def update_content_status(page_url, new_status, agent_name):
    """Update Content Tracker status with validation"""

    # Status transition rules (forward-only)
    valid_transitions = {
        "Idea": ["Research"],
        "Research": ["Next Up", "Writing"],
        "Next Up": ["Writing"],
        "Writing": ["Editing"],
        "Editing": ["Posted"],
        "Posted": ["Archived"]
    }

    # Get current status
    current = notion_fetch(page_url).properties["Status"]

    # Validate transition
    if new_status not in valid_transitions.get(current, []):
        if user_manual_override:
            log("User manually set status, respecting override")
        else:
            raise InvalidTransition(f"Cannot transition {current} → {new_status}")

    # Update with logging
    notion_update_page(page_url, {
        "Status": new_status
    })

    log(f"Status updated: {current} → {new_status} by {agent_name} at {timestamp}")

def update_content_property(page_url, property_name, value):
    """Update any Content Tracker property"""
    notion_update_page(page_url, {
        property_name: value
    })
```

### Step 2: Add Notion Updates to Each Workflow

**Pattern for workflow instructions.md:**

```xml
<step n="X" name="Update Notion Status">
  <action>
    If notion_page_url exists in project metadata:
      Call update_content_status(notion_page_url, "{new_status}", "{agent}")
      Log transition to 00-session/session-log.md
    Else:
      Skip Notion update (local-only project)
  </action>
</step>
```

**Jarvis Workflows:**
- research-topic → Status: Idea → Research
- write-post → Status: Research → Writing → Editing
- generate-ideas → Create new pages with Status=Idea

**Zoe Workflows:**
- create-single-image → Add image URL, keep Status=Editing
- create-scene → Add video URL, keep Status=Editing

**Zoro Workflows:**
- schedule-post → Status: Editing → Posted (after scheduled), add Publish Date

### Step 3: Implement Transition Validation

**Rules:**
- Forward-only: Cannot go Idea → Posted (must progress through states)
- Agents validate before updating
- User manual overrides respected
- Concurrent updates: last-write-wins for properties, atomic status updates

**Error Handling:**
- Notion API timeout → Log error, continue workflow (don't block)
- Invalid status → Log warning, prompt user
- Network failure → Graceful degradation

**Estimated:** 2 days

---

## Story 5.3: Notion Relational Data Management

**Goal:** Agents create and maintain relations between Content, Keywords, Channels, Tasks

**Implementation Steps:**

### Step 1: Implement Relational Linking

**Jarvis - Create Relations:**
```python
def create_content_idea_in_notion(idea_card, project_metadata):
    """Create Notion page with full relational linking"""

    # Create page
    page = notion_create_pages({
        "parent": {"data_source_id": "956447a76e7b4b2eafb1e4c9adfcbcf3"},
        "pages": [{
            "properties": {
                "Name": idea_card["title"],
                "Status": "Idea",
                "Category": determine_category(idea_card["topic"]),
                "Priority": idea_card["priority"],
                "Description": idea_card["outline"]
            }
        }]
    })

    # Link to Channel
    channel_url = find_or_create_channel(idea_card["platform"])
    update_relation(page_url, "Channel", channel_url)

    # Link to Keywords
    for keyword in idea_card["keywords"]:
        keyword_url = find_or_create_keyword(keyword)
        update_relation(page_url, "Focus Keywords", keyword_url)

    # Create Task (optional)
    if create_task:
        task = create_action_item(f"Write post: {idea_card['title']}")
        link_task_to_content(task_url, page_url)

    return page_url
```

**Zoro - Track Analytics:**
```python
def update_performance_metrics(page_url, platform_data):
    """Update Views/Likes/Comments after publishing"""

    notion_update_page(page_url, {
        "Views": platform_data["views"],
        "Likes": platform_data["likes"],
        "Comments": platform_data["comments"],
        "View Performance": calculate_performance_tier(views)  # Great/Good/Okay/Poor
    })
```

### Step 2: Test Relational Integrity

**Test Scenarios:**
1. Jarvis generate-ideas → Creates page → Links to Channel → Links to Keywords
2. Zoro publish → Updates Views/Likes → Links to correct Channel
3. Multi-platform publish → Single Notion page links to multiple Channels

**Validation:**
- All relations use page URLs (not IDs) for stability
- Relations exist before linking (no orphans)
- Failure to create relation logs warning but doesn't block workflow

**Estimated:** 1-2 days

---

## Implementation Order

**Day 1:**
- Create notion-helper.md for each agent
- Implement status query logic
- Test Jarvis status-aware triggering

**Day 2:**
- Create notion-updates.md module
- Add status updates to research-topic workflow
- Test status transitions

**Day 3:**
- Add status updates to all existing Jarvis workflows (5 workflows)
- Add status updates to Zoe workflows (4 workflows)
- Test concurrent updates

**Day 4:**
- Add status updates to Zoro workflows (4 workflows)
- Implement relational linking in generate-ideas
- Test end-to-end: Idea creation → Research → Writing → Editing → Posted

**Day 5 (Buffer):**
- Handle edge cases discovered during testing
- Document Notion integration patterns
- Update architecture.md with Notion implementation details

---

## Success Criteria

**Story 5.1 Complete:**
- ✅ All 3 agents check Notion before showing menu
- ✅ Suggestions relevant to status (Jarvis sees "Idea" → suggests research-topic)
- ✅ Query performance <5 seconds

**Story 5.2 Complete:**
- ✅ All workflows update Notion status
- ✅ Transition rules enforced (forward-only, validated)
- ✅ Status updates logged with timestamps
- ✅ Notion failures don't block workflows

**Story 5.3 Complete:**
- ✅ generate-ideas creates pages with full relations
- ✅ Keywords linked automatically
- ✅ Channels linked based on platform
- ✅ Analytics tracked after publishing

**Epic 2 Complete:**
- ✅ All 3 stories' acceptance criteria met
- ✅ Tested with real content (3+ test scenarios)
- ✅ Documentation updated (ARCHITECTURE.md reflects Notion integration)
- ✅ No blockers for Epic 3-6 (parallel development enabled)

---

## Risk Mitigation

**Risk 1: Notion MCP learning curve**
- Mitigation: Start with simple queries (fetch page, update single property)
- Mitigation: Reference docs/notion-content-dashboard.md for schema
- Mitigation: Test each Notion operation independently before integrating

**Risk 2: Status transition edge cases**
- Mitigation: User manual overrides respected (agents don't fight user)
- Mitigation: Extensive logging for debugging
- Mitigation: Graceful degradation if Notion unavailable

**Risk 3: Performance (Notion queries slow)**
- Mitigation: Cache status checks (don't query every time)
- Mitigation: Async where possible
- Mitigation: Timeout after 5 seconds, proceed without Notion suggestions

---

**Ready to implement, Sid! This is the critical epic that unlocks everything else.**

Starting with Story 5.1 implementation...
