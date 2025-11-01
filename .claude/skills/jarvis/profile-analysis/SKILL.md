---
name: profile-analysis
description: Analyze social media profiles using Apify scrapers for Instagram, TikTok, Twitter, LinkedIn, or YouTube. Extract posts, engagement, patterns (hooks, topics, formats, timing). Use when user provides profile URLs (youtube.com, youtu.be, instagram.com, twitter.com, linkedin.com, tiktok.com) or asks to analyze accounts, profiles, channels, videos, or content creators.
---

# Profile Analysis

## Purpose

Analyze social media profiles across all major platforms using Apify's scraper ecosystem to extract patterns, top content, and actionable insights.

## Instructions

When user provides a social media profile URL or username:

1. **Detect platform** from URL (instagram.com → Instagram, tiktok.com → TikTok, etc.) or user request

2. **Verify correct username using Exa search** (CRITICAL STEP)
   - Search: "[Person Name] [Platform] profile username"
   - Extract exact username from search results
   - Example: "Varun Mayya Instagram" → Found @thevarunmayya (not @varunmayya)
   - This prevents failed scrapes due to incorrect usernames

3. **Select appropriate Apify actor** using search-actors and fetch-actor-details tools. **See reference/apify-tools.md for complete actor mapping and tool documentation.**

4. **Calculate cost and get approval** before scraping. Typical costs: $0.01-0.05 for most profiles. **See reference/cost-examples.md for detailed cost calculations.**

5. **Execute scraping** using call-actor with **verified username** and appropriate parameters, then retrieve results with get-actor-output.

6. **Analyze patterns** in the scraped posts: top performers, hook types, topic clusters, format distribution, posting timing.

7. **Log cost** to jarvis-sidecar/memories.md with date, platform, and amount.

8. **Create profile summary** showing what works for this account.

**If user declines cost:** Exit gracefully with clear message.

**If apify fails:** Suggest manual analysis or retry later.

**For complete examples and step-by-step flows, see:** `reference/usage-examples.md`

## Reference Documentation

This Skill includes comprehensive Apify documentation:

- **`reference/apify-tools.md`** - Complete tool reference (search-actors, call-actor, get-actor-output) with platform mapping
- **`reference/usage-examples.md`** - 5 real-world examples with actual flows and responses
- **`reference/cost-examples.md`** - Cost calculation formulas, budget tracking, optimization strategies
- **`reference/workflow-integration.md`** - Integration with analyze-profile, learn-voice, competitive-analysis workflows

**For complete workflow orchestration, see:**
`bmad/agents/content-intelligence/jarvis-sidecar/workflows/analyze-profile/instructions.md`

## Example

**User provides:** "Analyze Varun Mayya's Instagram"

**You:**
1. Search with Exa: "Varun Mayya Instagram profile username"
2. Find correct username: @thevarunmayya (not @varunmayya)
3. Detect Instagram → Select apify/instagram-reel-scraper
4. Estimate $0.05 → Get approval
5. Scrape 20 reels with verified username
6. Analyze patterns → Create summary → Log cost

**See reference/usage-examples.md Example 1 for complete flow.**
