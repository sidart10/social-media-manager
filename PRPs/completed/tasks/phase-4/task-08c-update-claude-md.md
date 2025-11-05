<!-- Powered by BMAD™ Core -->

# Task 8C: Update CLAUDE.md Video Strategy

**Phase:** 4 (Documentation & Strategy)
**Priority:** MEDIUM  
**Estimated Time:** 10-15 minutes

---

## 🎯 Objective

Add video generation section to `CLAUDE.md` clarifying tool strategy.

---

## ✅ Implementation

Add section from PRP lines 1263-1283:

```markdown
### Video Generation

**PRIMARY:** fal-video

- Tool: mcp**fal-video**execute_custom_model
- Access: 22+ models (Veo 3, Luma Ray 2, Kling, Pixverse)

**SPECIALIZED:** heygen

- Tool: mcp**heygen**generate_avatar_video
- Use: Talking heads ONLY

**DEPRECATED:** veotools

- Reason: Veo 3 accessible via fal-video
```

**Validation:**

```bash
grep -q "fal-video" CLAUDE.md && echo "✅ Added"
```

---

**Estimated Time:** 10 minutes
