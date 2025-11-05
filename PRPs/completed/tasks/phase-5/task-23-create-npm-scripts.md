<!-- Powered by BMAD™ Core -->

# Task 23: Create npm Pre-Deploy Scripts

**Phase:** 5 (Testing & Validation)
**Priority:** MEDIUM
**Estimated Time:** 15-20 minutes

---

## 🎯 Objective

Add comprehensive validation scripts to `package.json`.

---

## ✅ Implementation

Add scripts from PRP lines 2377-2416:

```json
{
  "scripts": {
    "test:production": "node test/production-readiness-tests.js",
    "validate:file-structure": "bash test/validate-file-structure.sh",
    "validate:registries": "bash test/validate-registries.sh",
    "sync:commands": "cp bmad/agents/zoe/zoe.md .claude/commands/social-media-team/zoe.md && cp bmad/agents/zoro/zoro.md .claude/commands/social-media-team/zoro.md",
    "pre-deploy": "npm run lint:fix && npm run format:fix && npm run test && npm run validate:schemas && npm run test:production && npm run validate:file-structure && npm run validate:registries",
    "deploy:check": "echo '=== RUNNING ALL VALIDATION GATES ===' && npm run pre-deploy && echo '\n✅ SYSTEM PRODUCTION READY'"
  }
}
```

**Validation:**

```bash
grep -q "deploy:check" package.json && echo "✅ Scripts added"
npm run deploy:check  # Test it works
```

---

**Estimated Time:** 15 minutes
