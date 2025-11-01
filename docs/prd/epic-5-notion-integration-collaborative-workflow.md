# Epic 5: Notion Integration & Collaborative Workflow

**Epic Goal:** Integrate Notion Content Tracker as collaborative workspace enabling status-driven agent coordination, asynchronous work handoffs, and unified analytics—transforming from linear pipelines to flexible, status-aware collaboration.

## Story 5.1: Notion Status-Aware Workflow Triggering

**User Story:**
As a content creator,
I want agents to check Notion content status and suggest relevant workflows automatically,
so that I don't manually coordinate which agent to invoke at which stage.

**Acceptance Criteria:**

1. When user invokes any agent (`/jarvis`, `/zoe`, `/zoro`), agent checks Notion Content Tracker before showing menu
2. **Jarvis status awareness:**
   - Queries Notion for content with Status = "Idea" or "Research" or "Next Up"
   - If found: Suggests workflows based on status
     - Status="Idea" → "Found 3 content ideas. Suggest: *research-topic for research, *generate-ideas for more ideas"
     - Status="Research" → "Found 2 content items researched. Suggest: *write-post to create posts"
     - Status="Next Up" → "Found 1 item scheduled. Suggest: *write-post to draft"
   - If none found: Shows standard menu
3. **Zoe status awareness:**
   - Queries for content with Status = "Editing" AND no media URLs in properties
   - If found: "Found 4 posts ready for visuals. Suggest: *create-single-image for thumbnails"
   - Can also check for specific needs: "Post marked 'needs carousel' → Suggest *create-carousel"
4. **Zoro status awareness:**
   - Queries for content with Status = "Posted" (content complete, ready to publish)
   - If found: "Found 2 posts ready to publish. Suggest: *publish-tweet or *linkedin-post-image"
   - Also checks for future scheduled: Status="Editing" + Publish Date set → Suggest *schedule-via-postiz
5. Notion query uses filters: `Status IN ('Idea', 'Research', 'Next Up') AND Graveyard = false` for active content only
6. Agent displays: Count of items per status, top 3 titles as examples, suggested workflows
7. User can override suggestions and select different workflow from menu
8. Execution time: 2-5 seconds for Notion query + agent menu display

---

## Story 5.2: Agent Status Updates During Workflow Execution

**User Story:**
As a content creator,
I want agents to automatically update Notion status as they complete work,
so that I have real-time visibility into content pipeline without manual tracking.

**Acceptance Criteria:**

1. **Jarvis status updates:**
   - When `research-topic` workflow completes → Updates Status: Idea→Research, adds research brief URL to Notes relation
   - When `write-post` workflow completes → Updates Status: Research→Writing→Editing, saves post to Content Text property, sets estimated Publish Date
   - When `generate-ideas` workflow completes → Creates new Notion pages with Status="Idea", sets Category and Priority based on topic
2. **Zoe status updates:**
   - When `create-single-image` completes → Adds image URL to page properties (custom field or embedded in Content Text), keeps Status="Editing"
   - When `create-carousel` completes → Adds all slide URLs to properties
   - When video workflows complete → Adds video URL, optionally updates Status to "Posted" if no publishing needed
3. **Zoro status updates:**
   - When any publish workflow completes → Updates Status: Editing→Posted, sets Publish Date to now(), prompts user to add YouTube URL if applicable
   - When `schedule-via-postiz` completes → Sets future Publish Date, Status stays "Editing" until scheduled time passes
4. Each status update includes: Agent name in log, timestamp, previous vs new status
5. Updates are immediate (within workflow execution, not batch)
6. If Notion update fails (API error), workflow logs error but continues (doesn't block publishing)
7. User can manually override status in Notion, agents respect current state on next invocation
8. Execution time: 1-2 seconds per Notion update
9. **Status transition rules enforced by agents:**
   - Only forward transitions allowed: Idea→Research→Next Up→Writing→Editing→Posted→Archived
   - Agents cannot skip states (e.g., cannot jump Idea→Posted without intermediate steps)
   - Agents validate current status before updating (prevents invalid transitions)
   - Backward transitions (e.g., Posted→Editing for corrections) require manual user update in Notion (agents don't move backward)
10. **Transition validation logging:**
    - Each update logged: "Status updated: Writing→Editing by Jarvis at 2025-10-31T14:23:45Z"
    - Invalid transition attempts logged as warnings: "Cannot transition Idea→Posted, current status must progress through intermediate states"
    - User manual overrides respected: "User manually set Status=Editing, agent proceeding from current state"
11. **Exception handling:**
    - If user manually sets invalid status (e.g., "In Progress" not in defined workflow), agents prompt: "Unrecognized status. Valid statuses: Idea, Research, Next Up, Writing, Editing, Posted, Archived. Update to valid status or agents will treat as 'Idea'."
12. **Concurrent agent coordination:**
    - Multiple agents can update same Notion page (Jarvis updates Content Text, Zoe adds image URL simultaneously)
    - Last-write-wins for conflicting property updates
    - Status updates atomic (no race conditions between agents)

---

## Story 5.3: Notion Relational Data Management

**User Story:**
As a content creator,
I want agents to automatically link content to Keywords, Channels, and Tasks in Notion,
so that I maintain relational integrity without manual database management.

**Acceptance Criteria:**

1. **Jarvis creates relational links:**
   - When `generate-ideas` creates new Notion page → Automatically links to Channel based on platform recommendation (e.g., "LinkedIn & X" channel for LinkedIn post idea)
   - Searches Keywords DB for relevant keywords, creates new keywords if not found, links via Focus Keywords relation
   - Can optionally create task in Action Items DB: "Write post: {title}" with Next Actions date
2. **Zoe maintains relational integrity:**
   - Reads parent Notion page to get Channel for platform specs
   - Adds media URLs preserving existing relations (doesn't overwrite Keywords, Channels, Tasks)
3. **Zoro tracks analytics in Notion:**
   - After publishing, prompts user: "Add Views/Likes/Comments to Notion? (can do later)"
   - If yes: Updates numeric properties in Content Tracker
   - Sets View Performance (Great/Good/Okay/Poor) based on thresholds
4. **Relationship examples:**
   - Content "How to use Claude Code" → Channel: "LinkedIn & X" → Keywords: "claude code", "ai tools", "productivity" → Tasks: "Write post", "Create thumbnail", "Publish"
5. All relations use Notion page URLs (not IDs) for stability
6. Agents validate relations exist before linking (no orphan references)
7. If relation creation fails, logs warning but continues (doesn't block workflow)

---
