---
name: platform-formatter
description: Format content for specific social media platforms (LinkedIn, Twitter, Instagram, YouTube, Reels, TikTok) based on platform specifications (length limits, structure rules, hashtag strategies). Use when content is generated and needs platform-specific formatting.
allowed-tools: Read, Edit
---

# Platform Formatter Skill

## Purpose

Apply platform-specific formatting rules, length constraints, and best practices to generated content.

## When to Use This Skill

Invoke when:

- Content is generated but needs platform adaptation
- User specifies target platform (Twitter, LinkedIn, etc.)
- Converting content from one platform to another
- Part of write-posts workflow with platform parameter
- User asks to "format for Instagram" or similar

## Platform Specifications

### Twitter / X

**Text Limits:**

- Maximum: 280 characters
- Optimal: 200-240 (leaves room for engagement)
- Thread: No limit on tweets, 280 per tweet

**Format Rules:**

- Hashtags: 1-2 max (more looks spammy)
- Position: End of post or inline naturally
- Line breaks: Use for readability (max 2 consecutive)
- Links: Count as 23 characters
- Mentions: Use @ for engagement

**Structure:**

- Hook: First line (critical for timeline)
- Body: 2-4 lines max
- CTA: Optional mention, like, or reply prompt
- Thread structure: Number tweets (1/x) or use hooks

**Best Practices:**

- One idea per tweet
- Question hooks perform well
- Use "•" bullets for lists
- Avoid hashtag stuffing

### LinkedIn

**Text Limits:**

- Maximum: 3,000 characters
- Optimal: 1,300-1,500 (full visible on feed)
- First 2 lines critical (preview text)

**Format Rules:**

- Hashtags: 3-5 max, highly relevant
- Position: End of post
- Line breaks: Use generously for scannability
- Emojis: Professional usage (1-3 total)
- Mentions: Use @ for companies/people

**Structure:**

- Hook: First 1-2 lines (show in preview)
- Line break after hook
- Body: 3-5 short paragraphs
- Bullet points for lists
- Line break before CTA
- CTA: Clear ask (comment, share, connect)
- Hashtags: Separate line at end

**Best Practices:**

- Professional tone
- Story or data-driven hooks
- Use "Key takeaways:" sections
- Tag relevant people/companies
- Question CTAs drive engagement

### Instagram (Feed)

**Text Limits:**

- Maximum: 2,200 characters
- Optimal: First 125 characters visible (hook!)
- Rest hidden under "...more"

**Format Rules:**

- Hashtags: 5-10 max (30 allowed but looks spammy)
- Position: End of caption or first comment
- Line breaks: Use for structure
- Emojis: Encouraged (3-8 typical)
- Mentions: Beginning or natural placement

**Structure:**

- Hook: First line (before "...more")
- Emoji or visual break
- Body: Short paragraphs, scannable
- Story or value-driven content
- Line breaks for breathing room
- CTA: Save, share, comment
- Hashtags: Last line or first comment

**Best Practices:**

- First line determines if they expand
- Use emojis as visual markers
- Hashtags in first comment option
- Save CTA drives reach
- Behind-the-scenes works well

### Instagram (Reels) / TikTok

**Text Limits:**

- Reels: 2,200 characters
- TikTok: 2,200 characters
- Optimal: 150 characters (most visible)

**Format Rules:**

- Hashtags: 3-5 relevant
- Position: Inline or end
- Line breaks: Minimal (shorter captions)
- Emojis: Encouraged
- Trending sounds: Mention if used

**Structure:**

- Hook: Immediate (first 3 words)
- Body: 1-2 short lines
- CTA: Watch till end, follow for more
- Hashtags: Mix trending + niche

**Best Practices:**

- Very short captions
- Video does the talking
- Question or teaser hooks
- Trending hashtag research critical
- CTA for engagement (duet, stitch, comment)

### YouTube (Video Description)

**Text Limits:**

- Maximum: 5,000 characters
- Optimal: First 200 characters (above fold)
- Title: 70 characters

**Format Rules:**

- Hashtags: 3 max (first 3 used)
- Position: Start or end
- Timestamps: Encouraged
- Links: Include (channel, social, affiliate)
- Chapters: Use for long videos

**Structure:**

- First line: Compelling summary
- Line break
- Body: Detailed description
- Timestamps: 0:00 format
- Line break
- Links section
- Line break
- Hashtags (if used)

**Best Practices:**

- SEO keywords in first 200 chars
- Timestamps improve retention
- Include relevant links
- Clear chapter markers
- Use for additional context video didn't cover

## Instructions

### Step 1: Identify Target Platform

**From user input or workflow parameter:**

- Platform: {twitter|linkedin|instagram|reels|tiktok|youtube}

**If multiple platforms requested:**

- Format for each separately
- Note variations in output

### Step 2: Analyze Content Length

**Check character count:**

- If exceeds platform limit: Trim or restructure
- If under optimal: Consider if more value can be added
- If way under minimum: Flag as too short

**Trimming Strategy (if needed):**

1. Remove redundant words
2. Shorten sentences
3. Cut less critical points
4. Preserve hook and CTA
5. Maintain voice and value

### Step 3: Apply Platform Structure

**For each platform, enforce:**

**Hook Placement:**

- Ensure hook in first line (or first 3 words for short-form)
- Make it compelling and complete
- No cliff-hangers that require expanding (except Instagram feed)

**Body Formatting:**

- Apply platform-specific line breaks
- Add bullets if appropriate
- Insert emojis if platform-appropriate
- Structure for scannability

**CTA Formatting:**

- Platform-appropriate ask
- Clear and specific
- Positioned correctly

**Hashtag Handling:**

- Right number for platform
- Positioned correctly
- Relevant and researched
- Mix trending + niche for discovery platforms

### Step 4: Optimize for Platform Algorithm

**Twitter:**

- Engagement-focused CTA
- Thread indicators if multi-tweet
- Use spaces around emojis

**LinkedIn:**

- Professional tone maintained
- First 2 lines critical (preview)
- Tag relevant connections
- Use "..." if needed in hook to drive clicks

**Instagram Feed:**

- First 125 characters = preview
- Hook must work standalone
- Consider hashtags in first comment
- Save CTA for algorithmic boost

**Reels/TikTok:**

- Very short, punchy
- Trending hashtag required
- Caption complements video
- Engagement CTA (duet, stitch)

**YouTube:**

- SEO-optimized first 200 chars
- Timestamps for retention
- Comprehensive but scannable

### Step 5: Output Formatted Content

**Return structure:**

```markdown
# Platform-Formatted Content

**Platform:** {platform}
**Character Count:** {count} / {limit}

---

## Formatted Content

{formatted_content}

---

**Applied Formatting:**

- Length: {optimized|within limits|trimmed}
- Hashtags: {count} ({position})
- Structure: {platform_structure}
- CTA: {cta_type}

**Platform Compliance:** ✅ Ready to post
```

## Example

**Input Content (Generic):**
"AI automation is changing productivity. Here's what I learned after testing 10 tools for a month. The results might surprise you. Thread below."

**Twitter Format:**

```
AI automation is changing productivity.

I tested 10 tools for a month.

The results? 👇

[Thread marker]
```

**LinkedIn Format:**

```
AI automation is changing how we work.

Last month, I tested 10 automation tools. The goal: find what actually boosts productivity (not just what sounds cool).

The results surprised me. Here's what I learned:

[Full breakdown]

What automation tools are you using? Drop them in comments 👇

#Productivity #AITools #Automation
```

**Instagram Format:**

```
I tested 10 AI automation tools so you don't have to ✨

Last month = non-stop testing
Goal = real productivity gains
Result = some wild discoveries

Full breakdown in today's post 👆

Which tools do you use? Tell me ⬇️

#AITools #Productivity #TechReview #AutomationTools #ProductivityHacks
```

## Quality Standards

- Must respect platform character limits (hard stop)
- Structure must follow platform best practices
- Hashtag count must match platform guidelines
- CTA must be platform-appropriate
- Formatting must enhance readability
- Voice must be preserved during formatting

## Edge Cases

**Content too long for platform:**

- Trim systematically (remove redundancy first)
- If still too long, suggest thread (Twitter) or carousel (Instagram)
- Preserve core message and hook

**Multiple platforms requested:**

- Create separate version for each
- Note key differences
- Optimize each individually (don't just copy-paste)

**Platform not recognized:**

- Ask user to clarify
- List supported platforms
- Return unformatted content with note
