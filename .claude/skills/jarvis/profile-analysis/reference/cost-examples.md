# profile-analysis - Cost Calculation & Examples

**How to calculate and track Apify costs**

---

## Cost Formula

```
Cost = (Posts/Videos to analyze) × (Cost per 1000) / 1000
```

**Example:**

```
50 Instagram posts × $0.50 per 1k / 1000 = $0.025
```

---

## Platform Costs

| Platform  | Actor                               | Cost per 1k        | 20 posts | 50 posts | 100 posts |
| --------- | ----------------------------------- | ------------------ | -------- | -------- | --------- |
| Instagram | apify/instagram-scraper             | $0.50              | $0.01    | $0.025   | $0.05     |
| TikTok    | clockworks/tiktok-scraper           | ~$0.50 per profile | $0.50    | $0.50    | $0.50     |
| Twitter   | apidojo/twitter-scraper-lite        | $0.40              | $0.008   | $0.02    | $0.04     |
| LinkedIn  | dev_fusion/Linkedin-Profile-Scraper | $0.30              | $0.006   | $0.015   | $0.03     |
| YouTube   | streamers/youtube-scraper           | $0.40              | $0.008   | $0.02    | $0.04     |

---

## Budget Tracking

**Monthly Budget:** $10.00

**Example spending:**

```
- Day 1: Instagram analysis (20 posts) = $0.01
  Running total: $0.01 / $10.00

- Day 3: TikTok analysis (profile) = $0.50
  Running total: $0.51 / $10.00

- Day 5: Twitter competitor (50 tweets) = $0.02
  Running total: $0.53 / $10.00
```

**Budget alerts:**

- 50% used ($5.00): Notify user
- 80% used ($8.00): Warn before each analysis
- 100% used ($10.00): Require explicit approval

---

## Optimization Strategies

**To minimize costs:**

1. **Use quick analysis first** (20 posts = $0.01)
   - Get patterns quickly
   - Decide if need more data
   - Then do deep analysis if needed

2. **Batch analyses** by platform
   - Analyze all Instagram profiles together
   - More efficient than switching platforms

3. **Cache results**
   - Save analysis to sessions/
   - Re-use for 30 days
   - Don't re-analyze same profile

4. **Smart sampling**
   - 20 posts usually enough for patterns
   - 50 posts for comprehensive
   - 100 posts only if historical trends needed

---

## Cost Logging Format

**In memories.md:**

```markdown
## API Usage Log - October 2025

- [2025-10-27] apify/instagram-scraper: $0.01 (20 posts, varunmayya)
  - Workflow: analyze-profile
  - Platform: Instagram

- [2025-10-27] apify/clockworks/tiktok-scraper: $0.50 (profile analysis, creator123)
  - Workflow: competitive-analysis
  - Platform: TikTok

**Monthly Total:** $0.51
**Budget:** $10.00
**Remaining:** $9.49
```

---

**For tool documentation, see:** `apify-tools.md`
**For usage examples, see:** `usage-examples.md`
