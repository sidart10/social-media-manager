# Tool Selection Logic

**Quick reference for choosing nanobanana vs gpt-image-1 when creating images**

**For complete comparison, see**: `../../mcp-tool-selection/SKILL.md`

---

## Quick Decision Tree

```
Creating NEW image?
  ↓
Has TEXT in image?
  YES → gpt-image-1 (superior text rendering)
  NO → Continue
  ↓
Platform?
  LinkedIn → gpt-image-1 (professional quality)
  Instagram → nanobanana (speed + cost)
  Twitter + text → gpt-image-1
  ↓
Need photorealism 9.5/10?
  YES → gpt-image-1
  NO → Continue
  ↓
High volume (5+ images)?
  YES → nanobanana (cost-effective)
  NO → gpt-image-1 (quality default)
```

---

## Platform Defaults

| Platform | Default Tool | Why |
|----------|-------------|-----|
| **LinkedIn** | gpt-image-1 | Professional + text rendering |
| **Instagram** | nanobanana | Speed + cost for volume |
| **Twitter** | gpt-image-1 | Text accuracy matters |
| **Client work** | gpt-image-1 | Quality critical |
| **Testing** | nanobanana | Fast iteration |

---

## Use-Case Matrix

| Scenario | Tool | Reasoning |
|----------|------|-----------|
| Professional carousel with text | gpt-image-1 | LinkedIn quality + text |
| 10 Instagram posts this week | nanobanana | Volume savings |
| Hero product shot | gpt-image-1 | Photorealism 9.5/10 |
| Quick prototype to test idea | nanobanana | Speed for iteration |
| Data visualization | gpt-image-1 | Text/numbers accuracy |
| Lifestyle creative | nanobanana | Style over photorealism |

---

## Selection Criteria

### Choose gpt-image-1 when:
✅ Text rendering critical (infographics, quotes, labels)
✅ Photorealism 9.5/10 needed
✅ Professional/commercial content
✅ LinkedIn platform
✅ Complex multi-element compositions
✅ Client deliverables
✅ Not sure (safer default)

### Choose nanobanana when:
✅ Volume posting (5+ images)
✅ Speed priority (rapid iteration)
✅ Budget-conscious
✅ Instagram platform
✅ Creative/stylized acceptable
✅ Testing/prototyping
✅ Simple graphics

---

## Cost & Speed Comparison

| Factor | gpt-image-1 | nanobanana | Winner |
|--------|-------------|-----------|---------|
| **Speed** | 60-90s | Faster | Gemini |
| **Cost/image** | Higher | $0.039 | Gemini |
| **Photorealism** | 9.5/10 | 8.5/10 | OpenAI |
| **Text rendering** | 9.5/10 | 7/10 | OpenAI |
| **Professional** | Best | Excellent | OpenAI |

---

## Example Selections

**Scenario 1**: "LinkedIn post with statistics"
```
Has text: YES
Platform: LinkedIn
Quality: Professional
→ gpt-image-1
```

**Scenario 2**: "10 Instagram motivational quotes"
```
Volume: 10 images
Platform: Instagram
Budget: Matters
→ nanobanana
```

**Scenario 3**: "Not sure which style works"
```
Testing: YES
Speed: Matters
→ nanobanana (test fast, upgrade winner to GPT if needed)
```

---

**For detailed decision matrices and performance analysis:**
`../../mcp-tool-selection/reference/decision-matrix.md`

**For cost/speed/quality tradeoffs:**
`../../mcp-tool-selection/reference/cost-speed-quality-analysis.md`
