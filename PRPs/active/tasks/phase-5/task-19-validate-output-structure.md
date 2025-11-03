<!-- Powered by BMAD™ Core -->

# Task 19: Validate Output Structure Compliance

**Phase:** 5 (Testing & Validation)
**Priority:** MEDIUM
**Estimated Time:** 20-30 minutes

---

## 🎯 Objective

Archive legacy date folders and enforce outputs/projects/{YYYY-MM-DD}-{slug}/ pattern.

---

## ✅ Implementation

1. Identify legacy folders: `ls outputs/ | grep -E "^[0-9]{2}-[0-9]{2}-[0-9]{4}$"`
2. Move to archive or delete
3. Verify new projects follow pattern

**Validation:**

```bash
# No legacy folders
LEGACY=$(ls outputs/ | grep -E "^[0-9]{2}-[0-9]{2}-[0-9]{4}$" | wc -l)
[ "$LEGACY" -eq 0 ] && echo "✅ Clean" || echo "⚠️  $LEGACY legacy folders"
```

---

**Estimated Time:** 20 minutes
