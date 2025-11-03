<!-- Powered by BMAD™ Core -->

# Task 18: Verify Agent Memory File Updates

**Phase:** 5 (Testing & Validation)
**Priority:** MEDIUM
**Estimated Time:** 20-30 minutes

---

## 🎯 Objective

Ensure workflow instructions properly update agent memories.md files.

---

## ✅ Implementation

Check each agent's memories.md has sections for:

- API cost tracking
- Voice profiles (Jarvis)
- Quality history (Zoe)
- Publishing history (Zoro)

Verify workflows reference memory updates in instructions.md

**Validation:**

```bash
# All sidecars have memories.md
for sidecar in bmad/agents/*/*-sidecar; do
  test -f "$sidecar/memories.md" && echo "✅ $(basename $(dirname $sidecar))" || echo "❌ Missing"
done
```

---

**Estimated Time:** 20 minutes
