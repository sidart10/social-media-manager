# Documentation Management Rules

**Created:** 2025-10-27
**Last Updated:** 2025-10-27
**Status:** Active
**Category:** Project Guidelines

---

## Purpose

This document establishes mandatory rules for all agents and contributors regarding documentation creation, organization, and lifecycle management within the social-media-manager project.

---

## Rule 1: Root Directory Policy

### Allowed Files in Root
Only these files are permitted in the project root directory:
- `README.md` - Project overview and getting started guide
- `CHANGELOG.md` - Version history and release notes
- `CONTRIBUTING.md` - Contribution guidelines
- `LICENSE` - Legal license information
- `.env.example` - Example environment configuration (no sensitive data)

### Forbidden in Root
The following document types are **strictly prohibited** in root:
- Technical analysis reports
- Implementation guides
- Session summaries
- Bug fix documentation
- Feature completion reports
- Status reports
- Testing documentation
- Architecture documentation

**Enforcement:** Any agent creating documentation MUST place it in the appropriate `docs/` subdirectory.

---

## Rule 2: Document Lifecycle Management

### Directory Structure

```
docs/
├── current-session/          # Active development session documents
├── archived/                 # Completed and historical documents
│   ├── ai-video-agent/      # AI video agent feature docs
│   ├── ai-image-generator/  # AI image generator feature docs
│   ├── mcp-analysis/        # MCP server analysis docs
│   ├── session-history/     # Historical session summaries
│   └── other-features/      # Miscellaneous completed features
├── content-intelligence/     # Jarvis agent documentation
│   └── architecture/        # Architectural designs
├── project-docs/            # Project management and guidelines
├── installers-bundlers/     # Technical reference documentation
└── ide-info/                # IDE-specific configuration docs
```

### Document Flow

1. **Active Development:** `docs/current-session/`
   - Documents related to ongoing work
   - Session summaries and progress reports
   - Temporary analysis and debugging notes

2. **Feature Completion:** `docs/archived/[feature-name]/`
   - Completed feature documentation
   - Implementation reports
   - Bug fix summaries
   - Technical analyses

3. **Project Management:** `docs/project-docs/`
   - Guidelines and rules
   - Security and credential documentation
   - Open items and tracking documents

4. **Agent-Specific:** `docs/[agent-name]/`
   - Agent architecture documentation
   - Agent-specific workflows
   - Agent knowledge bases

---

## Rule 3: Naming Conventions

### Standard Format
```yaml
naming_rules:
  format: "lowercase-descriptive-name.md"
  word_separator: "-"  # Always use hyphens

forbidden_patterns:
  - "UPPERCASE-NAMES.md"       # Never use uppercase
  - "file_with_underscores.md" # Use hyphens instead
  - "spaces in names.md"       # Never use spaces
  - "CamelCaseNames.md"        # Use kebab-case instead
```

### Examples

✅ **Good:**
- `ai-video-agent-redesign-analysis.md`
- `veotools-mcp-usage-guide.md`
- `jarvis-skills-implementation.md`
- `current-session-summary.md`

❌ **Bad:**
- `AI-VIDEO-AGENT-REDESIGN-ANALYSIS.md` (uppercase)
- `working_image_to_video_strategy.md` (underscores)
- `Ready To Test After Restart.md` (spaces)
- `JarvisSkillsImplementation.md` (CamelCase)

---

## Rule 4: Mandatory Document Metadata

### Required Frontmatter
Every documentation file MUST include the following metadata at the top:

```markdown
# [Document Title]

**Created:** YYYY-MM-DD
**Last Updated:** YYYY-MM-DD
**Status:** [active|archived|obsolete]
**Category:** [session|feature|analysis|guide|reference]
**Related Agent:** [agent-name or "none"]

---

[Document content begins here]
```

### Metadata Definitions

- **Created:** Date document was first created
- **Last Updated:** Date of most recent modification
- **Status:**
  - `active` - Currently relevant and in use
  - `archived` - Completed work, kept for reference
  - `obsolete` - No longer relevant, candidate for deletion
- **Category:**
  - `session` - Session summary or progress report
  - `feature` - Feature implementation documentation
  - `analysis` - Technical analysis or investigation
  - `guide` - How-to or reference guide
  - `reference` - Technical reference material
- **Related Agent:** Name of primary agent (jarvis, bmad-master, etc.) or "none"

---

## Rule 5: Archive Management

### When to Archive
Documents should be moved to `docs/archived/` when:
- Feature development is complete
- Session has ended
- Bug fix is resolved and documented
- Analysis is concluded
- Document is no longer actively referenced

### Archive Organization
- Create feature-specific subdirectories under `archived/`
- Group related documents together
- Maintain clear naming that indicates the archived feature
- Add README.md files to archive directories explaining contents

### Obsolete Document Handling
Documents marked as `status: obsolete` should be:
1. Reviewed for any valuable information
2. Information extracted to relevant active documents if needed
3. Deleted from repository after review

---

## Rule 6: Agent Responsibilities

### When Creating Documentation
All agents MUST:
1. ✅ Check if documentation is root-appropriate (use Rule 1)
2. ✅ Select correct `docs/` subdirectory (use Rule 2)
3. ✅ Use lowercase kebab-case naming (use Rule 3)
4. ✅ Include complete metadata frontmatter (use Rule 4)
5. ✅ Update existing index files if present

### When Updating Documentation
All agents MUST:
1. ✅ Update the "Last Updated" date
2. ✅ Review and update status if necessary
3. ✅ Maintain consistent formatting
4. ✅ Archive if work is complete

### Prohibited Actions
Agents MUST NOT:
1. ❌ Create documentation in project root (except allowed files)
2. ❌ Use uppercase or spaces in filenames
3. ❌ Omit required metadata
4. ❌ Leave temporary documents in `current-session/` indefinitely
5. ❌ Create duplicate documentation

---

## Rule 7: Index Maintenance

### Master Index
The `docs/INDEX.md` file serves as the master directory of all documentation.

Agents should:
- Update the index when creating significant new documentation
- Ensure links are valid and descriptive
- Organize index entries by category

### Category Indexes
Subdirectories MAY contain their own `README.md` or `INDEX.md` files explaining:
- Purpose of the directory
- Overview of contained documents
- Navigation guidance

---

## Rule 8: Cleanup Responsibility

### Regular Cleanup Schedule
- **Weekly:** Review `docs/current-session/` for archivable documents
- **Monthly:** Review archived documents for obsolete status
- **Quarterly:** Comprehensive documentation audit

### Cleanup Checklist
- [ ] Move completed session docs to appropriate archives
- [ ] Rename any non-compliant filenames
- [ ] Update metadata on modified documents
- [ ] Delete obsolete documents after review
- [ ] Update index files

---

## Enforcement

These rules are **mandatory** for all agents operating within this project. Any violation should be:
1. Corrected immediately upon discovery
2. Reported if systematic issues are found
3. Used as learning for agent configuration updates

**BMad Master** and all BMad agents are configured to enforce these rules automatically.

---

## Change History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-10-27 | 1.0.0 | Initial documentation management rules | BMad Master |

---

## Related Documents

- `docs/project-docs/README.md` - Project documentation overview
- `docs/INDEX.md` - Master documentation index
- `bmad/core/config.yaml` - BMad core configuration
