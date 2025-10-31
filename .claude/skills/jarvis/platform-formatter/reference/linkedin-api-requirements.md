# LinkedIn API Formatting Requirements

## little Text Format Escaping

**Reserved Characters (MUST be escaped):**
`| { } @ [ ] ( ) < > # \ * _ ~`

**Escape Method:** Prefix with backslash `\`

**Examples:**
- `Hello (world)` → `Hello \(world\)`
- `#hashtag` → `\#hashtag`
- `@mention` → `\@mention`

**Implementation:**
See `scripts/platforms/linkedin.py` - `escape_little_text()` function

## Content Types

| Type | Description | API Requirements |
|------|-------------|------------------|
| text | Plain text post | Escaped text |
| image | Single image + text | Escaped text + Image URN |
| multi_image | Carousel 2-20 images | Escaped text + Multiple URNs |
| document | PDF/PPT/DOC + text | Escaped text + Document URN |
| video | Video + text | Escaped text + Video URN |

## Character Limits

- API Maximum: 3000 characters
- Recommended: 1600 characters (engagement)
- First line mobile: 140 characters (truncation point)

## Line Breaks

- Normalize: `\r\n` → `\n`, `\r` → `\n`
- Max consecutive: 2 blank lines

## API Endpoint

`POST /rest/posts` (v202410+)

**Payload Structure:**
```json
{
  "author": "urn:li:person:{id}",
  "commentary": "{escaped_text}",
  "visibility": "PUBLIC",
  "distribution": {
    "feedDistribution": "MAIN_FEED"
  }
}
```

## References

- Official Docs: https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/little-text-format
- Existing Implementation: bmad/modules/linkedin-api-client/lib/formatter.js
