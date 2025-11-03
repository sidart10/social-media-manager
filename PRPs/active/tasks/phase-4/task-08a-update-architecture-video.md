<!-- Powered by BMAD™ Core -->

# Task 8A: Update Architecture.md Video Section

**Phase:** 4 (Documentation & Strategy)
**Priority:** MEDIUM
**Estimated Time:** 15-20 minutes

---

## 🎯 Objective

Update video tools section in `docs/architecture.md` to mark veotools as deprecated and fal-video as PRIMARY.

---

## ✅ Implementation

Update lines 955-976 and 2019-2030 as shown in PRP lines 1167-1205.

**Changes:**

- Mark veotools as deprecated
- Clarify fal-video as PRIMARY
- Add migration notes

**Validation:**

```bash
grep -A5 "veotools" docs/architecture.md | grep -q "DEPRECATED\|deprecated" && echo "✅ Marked deprecated"
```

---

**Estimated Time:** 15 minutes
