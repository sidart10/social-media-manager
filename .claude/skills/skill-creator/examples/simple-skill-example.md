# Example: Simple Skill Creation (Template Mode)

**Scenario:** Create a skill for extracting email addresses from text
**Mode:** Template-based (Mode 1)
**Time:** 1 minute
**Research:** None (simple utility)

---

## Creation Process

**User request:**

```
Create a skill for extracting email addresses from text
```

---

**skill-creator response:**

```
Using skill-creator skill...

Task: Extract email addresses
Complexity: Simple (utility function)
Mode: Template (no research needed)

**Name:** extracting-email-addresses
Conventions: ✓ Gerund form ✓ Lowercase ✓ Hyphens

**Description:**
"Extract email addresses from text using regex patterns. Use when parsing emails, processing text files, or extracting contact information from documents."

Triggers: email, addresses, parsing, extracting, contact
Length: 158/1024 ✓

**Structure:** Simple (SKILL.md only)
No additional files needed for regex task.

**Creating SKILL.md...**
```

---

## Generated SKILL.md

````yaml
---
name: extracting-email-addresses
description: Extract email addresses from text using regex patterns. Use when parsing emails, processing text files, or extracting contact information from documents.
---

# Extracting Email Addresses

Extract valid email addresses from any text using pattern matching.

## When to Use This Skill

Use when:
- Parsing email addresses from text files
- Extracting contacts from documents
- Processing forms or submissions
- Cleaning and validating email lists

## Instructions

When extracting emails:

1. **Use regex pattern for validation:**
   ```python
   import re
   pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
   emails = re.findall(pattern, text)
````

2. **Remove duplicates:**

   ```python
   unique_emails = list(set(emails))
   ```

3. **Validate format:**
   - Check for @ symbol
   - Verify domain has TLD
   - Remove invalid patterns

4. **Return sorted list:**
   ```python
   return sorted(unique_emails)
   ```

## Examples

**Example 1: Basic extraction**

Input:

```
Contact us at support@example.com or sales@company.co.uk
For urgent matters: admin@site.org
```

Output:

```python
['admin@site.org', 'sales@company.co.uk', 'support@example.com']
```

**Example 2: From messy text**

Input:

```
Emails: john.doe@gmail.com, invalid@, jane_smith@yahoo.com
```

Output:

```python
['jane_smith@yahoo.com', 'john.doe@gmail.com']
# Note: 'invalid@' filtered out (no domain)
```

## Best Practices

- Use established regex patterns (don't reinvent)
- Validate domain has proper TLD
- Handle edge cases (.co.uk, .museum, etc.)
- Remove duplicates
- Return sorted for consistency

## Notes

- Regex pattern covers 99% of valid emails
- May not catch every edge case (internationalized domains)
- For production, consider using email-validator library

````

---

## Validation

**Running validation:**
```bash
python scripts/validate-skill.py .claude/skills/jarvis/extracting-email-addresses/
````

**Result:**

```
============================================================
SKILL VALIDATION REPORT
============================================================

✅ VALIDATED:
------------------------------------------------------------
  ✓ Name: extracting-email-addresses (28/64 chars)
  ✓ Description: 158/1024 chars, ~24 words

============================================================
✅ VALIDATION PASSED - Skill ready to use!
============================================================
```

---

## File Created

**Location:** `.claude/skills/jarvis/extracting-email-addresses/`

**Contents:**

- SKILL.md (1.8 KB)

**Total time:** 1 minute
**Total size:** 1.8 KB

---

## Testing

**Test query:**

```
Extract email addresses from this text: "Contact john@example.com or jane.doe@company.org"
```

**Expected:**

```
Using extracting-email-addresses skill...

Found 2 valid email addresses:
1. jane.doe@company.org
2. john@example.com

(Sorted alphabetically)
```

---

## Key Takeaways

**Simple skills:**

- Quick to create (1 min)
- Template-based (no research)
- Single SKILL.md file
- Perfect for utilities
- No overkill with extras

**When to use simple:**

- Utility functions
- Data transformations
- Format conversions
- Well-understood tasks
- No domain expertise needed
