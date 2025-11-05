<!-- Powered by BMAD™ Core -->

# E2E Test 2: Full Visual Pipeline (Jarvis → Zoe → Zoro)

**Phase:** 6 (End-to-End Pipeline Testing)
**Priority:** VALIDATE
**Estimated Time:** 45-60 minutes
**Dependencies:** E2E Test 1 passing, Cloudinary configured

---

## 🎯 Objective

Test complete pipeline with visual content generation (image + post).

---

## 📋 Test Scenario

**Flow:** Jarvis (research + write) → Zoe (image) → Zoro (publish to LinkedIn)

**Steps from PRP lines 1782-1791:**

1. Invoke: `/jarvis` → `*research-topic` (topic="AI agents", depth="standard")
2. Select: `*write-post` (platform="linkedin")
3. Invoke: `/zoe` → `*create-image`
4. Input: platform="linkedin", style="dark tech monochrome"
5. Verify: Image in `04-media/images/thumbnail-main.png`
6. Verify: Cloudinary URL obtained (starts with https://res.cloudinary.com/)
7. Invoke: `/zoro` → `*schedule-post`
8. Input: platform="linkedin", attachments=[cloudinary_url]
9. Verify: Post scheduled with image
10. Check: 05-published/linkedin/ populated

---

## ✅ Expected Results

**Duration:** 8-12 minutes
**Cost:** ~$0.10 (Exa $0.05 + gpt-image-1 $0.04 + Cloudinary free)

**Files Created:**

- 01-research/research-brief.md
- 03-drafts/linkedin/post-v1.md
- 04-media/images/thumbnail-main.png
- 04-media/images/metadata.json (tracks Cloudinary URL)
- 05-published/linkedin/post.md
- 05-published/linkedin/url.md
- 05-published/linkedin/publish-confirmation.json

**Cloudinary:**

- Asset uploaded successfully
- Public URL generated
- URL used in Postiz post

**Notion Updates:**

- Status: Idea → Research → Writing → Editing → Posted
- Media URL added to properties
- Publish Date set

---

## 🧪 Validation

- [x] Research brief created
- [x] LinkedIn post written
- [x] Image generated (Emily 7-pillar ≥7/10)
- [x] Cloudinary upload successful
- [x] Public URL obtained
- [x] Post published with image
- [x] LinkedIn URL captured
- [x] Notion status = "Posted" with media URL
- [x] Cost within estimate ($0.10 ± $0.03)
- [x] Total time < 15 minutes
- [x] Image quality meets standards

---

**Estimated Time:** 45-60 minutes
