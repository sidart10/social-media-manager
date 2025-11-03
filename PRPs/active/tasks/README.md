<!-- Powered by BMAD™ Core -->

# Production-Ready System Fixes - Task Files

**Total Tasks:** 24 core tasks + 3 E2E tests = 27 files
**Organization:** 6 phases (critical → testing)
**Format:** Each task is a standalone markdown file with context, steps, validation

---

## Directory Structure

```
PRPs/active/tasks/
├── 00-INDEX.md              # Master task index with progress tracking
├── README.md                # This file
├── phase-1/                 # Critical agent & registry fixes (7 tasks)
│   ├── task-01a-create-zoe-agent.md
│   ├── task-01b-create-zoro-agent.md
│   ├── task-02-clean-agent-manifest.md
│   ├── task-03-clean-workflow-manifest.md
│   ├── task-04-update-workflow-registry.md
│   ├── task-05-update-tool-registry.md
│   └── task-15-sync-slash-commands.md
├── phase-2/                 # BMad workflow standardization (4 tasks)
│   ├── task-13-audit-external-instructions.md
│   ├── task-14-validate-workflow-variables.md
│   ├── task-16-validate-activation-sequences.md
│   └── task-21-fix-validation-error-handling.md
├── phase-3/                 # Tool names & MCP setup (5 tasks)
│   ├── task-12-verify-skill-tool-names.md
│   ├── task-22-clarify-notion-naming.md
│   ├── task-07-create-tool-naming-standards.md
│   ├── task-20-create-mcp-setup-guide.md
│   └── task-11-create-env-template.md
├── phase-4/                 # Documentation & strategy (6 tasks)
│   ├── task-06-update-epic-percentages.md
│   ├── task-08a-update-architecture-video.md
│   ├── task-08b-update-mcp-tool-selection.md
│   ├── task-08c-update-claude-md.md
│   ├── task-10-update-architecture-consistency.md
│   └── task-24-add-bmad-headers.md
├── phase-5/                 # Testing & validation (5 tasks)
│   ├── task-09-create-production-tests.md
│   ├── task-23-create-npm-scripts.md
│   ├── task-17-create-handoff-schema.md
│   ├── task-18-verify-memory-updates.md
│   └── task-19-validate-output-structure.md
└── phase-6/                 # E2E pipeline testing (3 tests)
    ├── e2e-test-text-pipeline.md
    ├── e2e-test-visual-pipeline.md
    └── e2e-test-handoffs.md
```

---

## How to Use

### Sequential Execution (Recommended)

1. Start with Phase 1 (CRITICAL - system cannot function without these)
2. Complete all tasks in phase before moving to next
3. Run phase validation after each phase
4. Mark progress in 00-INDEX.md

```bash
# Example workflow:
cd PRPs/active/tasks/phase-1
# Execute task-01a, task-01b, task-02, etc.
# Run validation: bash test/validate-file-structure.sh
# Move to phase-2
```

### Parallel Execution (Advanced)

Some tasks can run in parallel:

- **Phase 1:** Tasks 1A, 1B can run parallel, then 2-3 parallel, then 4-5 parallel
- **Phase 3:** All tasks independent
- **Phase 4:** All tasks independent

**BUT:** Phase dependencies must be respected (don't start Phase 2 until Phase 1 done)

---

## Task File Format

Each task file contains:

1. **Header:** Phase, priority, time estimate, dependencies
2. **Objective:** What needs to be accomplished
3. **Context:** Why this matters, current state
4. **Implementation Steps:** Exact commands and code
5. **Validation:** Scripts to verify success
6. **Success Criteria:** Checklist of requirements
7. **Related Tasks:** Dependencies and blockers
8. **Notes:** Additional context, gotchas

---

## Progress Tracking

### Update 00-INDEX.md After Each Task

Change status symbols:

- ⬜ Pending → 🔄 In Progress → ✅ Completed

Example:

```markdown
| 1A | `phase-1/task-01a-create-zoe-agent.md` | ✅ Completed | CRITICAL |
```

### Calculate Phase Progress

```bash
# Phase 1: 7 tasks
# Completed: X tasks
# Progress: X/7 = YY%
```

---

## Validation Gates

After each phase:

**Phase 1:** Run `bash test/validate-file-structure.sh` + `bash test/validate-registries.sh`
**Phase 2:** Run custom validation for workflow standards
**Phase 3:** Verify tool names with grep searches
**Phase 4:** Manual documentation review
**Phase 5:** Run `npm run deploy:check`
**Phase 6:** Execute E2E test scenarios

---

## Estimated Timeline

| Phase   | Tasks | Time      | Cumulative |
| ------- | ----- | --------- | ---------- |
| Phase 1 | 7     | 2-3 hours | 2-3 hours  |
| Phase 2 | 4     | 2-3 hours | 4-6 hours  |
| Phase 3 | 5     | 1-2 hours | 5-8 hours  |
| Phase 4 | 6     | 1 hour    | 6-9 hours  |
| Phase 5 | 5     | 1-2 hours | 7-11 hours |
| Phase 6 | 3     | 1-2 hours | 8-13 hours |

**Total:** 8-13 hours (comfortable range with buffer)

---

## Quick Start

```bash
# 1. Review master index
cat PRPs/active/tasks/00-INDEX.md

# 2. Start Phase 1
cd PRPs/active/tasks/phase-1

# 3. Execute task-01a
cat task-01a-create-zoe-agent.md
# Follow implementation steps

# 4. Mark completed in index
# Update 00-INDEX.md

# 5. Continue with task-01b, task-02, etc.
```

---

**Created:** 2025-11-02
**By:** BMad Builder
**Purpose:** Organize 24+ production-ready tasks for execution
