<!-- Powered by BMAD™ Core -->

# E2E Test 1: Text-Only Pipeline (Jarvis → Zoro)

**Phase:** 6 (End-to-End Pipeline Testing)
**Priority:** VALIDATE
**Estimated Time:** 30-45 minutes
**Dependencies:** Phases 1-5 complete, MCPs configured

---

## 🎯 Objective

Test complete text-only content pipeline from research to publishing.

---

## 📋 Test Scenario

**Flow:** Jarvis (research + write) → Zoro (publish to Twitter)

**Steps from PRP lines 1762-1776:**

1. Invoke: `/jarvis`
2. Select: `*research-topic`
3. Input: topic="AI agents", depth="standard"
4. Verify: Research brief in `outputs/projects/{date}-ai-agents/01-research/`
5. Select: `*write-post`
6. Input: platform="twitter", voice_mode="analyst"
7. Verify: Post in `03-drafts/twitter/post-v1.md`
8. Invoke: `/zoro`
9. Select: `*schedule-post`
10. Input: platform="twitter", date="now"
11. Verify: Post published, URL in `05-published/twitter/url.md`
12. Check: Notion status updated to "Posted"

---

## ✅ Expected Results

**Duration:** 5-8 minutes
**Cost:** ~$0.05 (Exa research)
**Files Created:**

- 01-research/research-brief-ai-agents.md
- 03-drafts/twitter/post-v1.md
- 05-published/twitter/post.md
- 05-published/twitter/url.md
- 00-session/metadata.json

**Notion Updates:**

- Status: Idea → Research → Writing → Posted
- Content Text populated
- Publish Date set

---

## 🧪 Validation

- [x] Research brief created with citations
- [x] Twitter post created in correct folder
- [x] Post published successfully
- [x] Twitter URL captured
- [x] Notion status = "Posted"
- [x] Cost within estimate ($0.05 ± $0.02)
- [x] Total time < 10 minutes

---

**Estimated Time:** 30-45 minutes (including documentation)
