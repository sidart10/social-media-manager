# Twitter/X Platform Specifications

**Complete specifications for Twitter/X image generation**

---

## Image Size Requirements

### Single Image Tweet
- **Ideal size**: 1200×675px (16:9 ratio)
- **MCP size**: `1536x1024` (3:2, closest match)
- **Aspect ratio**: 16:9 (desired), 3:2 (available)
- **Min size**: 600×335px
- **Max size**: 4096×4096px
- **File size**: < 5MB per image

### Multi-Image Tweet
- **First image**: 700×800px
- **Subsequent**: Square or portrait
- **MCP size**: `1024x1536` (portrait)
- **Layout**: Twitter auto-arranges in grid

### Header Image
- **Ideal size**: 1500×500px (3:1 ratio)
- **Aspect ratio**: Very wide banner
- **Note**: Too wide for standard MCP
- **Workaround**: Generate 1536×1024, crop/extend

### Profile Picture
- **Size**: 400×400px (displays at 200×200px)
- **MCP size**: `1024x1024`, resize afterward
- **Format**: PNG (transparency supported)

### Twitter Card (Link Preview)
- **Size**: 1200×628px
- **MCP size**: `1536x1024`
- **Use case**: When sharing links with preview

---

## Design Aesthetic: Bold & Concise

### Color Palette

**High Contrast:**
- Black & white combinations
- Bold, saturated colors
- Twitter blue accent: `#1DA1F2`
- Clear visual hierarchy

**Background Options:**
- Solid colors (high contrast)
- Gradients (bold, not subtle)
- White/light for readability
- Black/dark for drama

**Text Colors:**
- High contrast required
- Black on white or white on black
- Colored text only if high contrast

### Typography

**Font Characteristics:**
- **Bold, readable fonts**
- Sans-serif preferred
- Large text sizes
- High impact headlines

**Sizes:**
- Headline: 48-64pt (dominant)
- Body: 24-32pt (if needed)
- Caption: 18-20pt (attribution, minimal)

**Text Treatment:**
- Bold weights for emphasis
- All caps for impact (sparingly)
- Short, punchy copy
- Quick-read format

### Layout & Composition

**Text-Forward Design:**
- Text is often the main element
- Quotes, statistics, bold statements
- Visual supports text (not vice versa)

**Quick Comprehension:**
- Message clear in 2 seconds
- Strong hierarchy
- Minimal elements
- Focus on one idea

**Mobile-First:**
- 70%+ of Twitter use is mobile
- Design for small screens
- Thumb-friendly

---

## Content Best Practices

### What Works on Twitter
✅ Timely/trending content
✅ Quick insights and hot takes
✅ Controversial or surprising
✅ Humor and memes
✅ News commentary
✅ Data visualizations
✅ Quote graphics
✅ Bold statements

❌ Avoid:
- Lengthy explanations
- Complex designs (hard to parse quickly)
- Multiple ideas in one image
- Slow-to-comprehend visuals
- Corporate/stiff tone

### Tweet Types

**Quote Tweets:**
- Large text quote
- Attribution below
- Clean background
- Eye-catching

**Stat/Data:**
- Bold number (large)
- Context (smaller)
- Source citation
- Visual elements minimal

**Meme Format:**
- Recognizable template
- Text overlay
- Humor/sarcasm
- Cultural relevance

**Thread Starter:**
- Hook image for first tweet
- "Thread" indicator
- Teases content below
- Encourages engagement

---

## Twitter-Specific Guidelines

### Engagement Strategy
✅ Tweet during high-activity times
✅ Use trending hashtags (1-2 max)
✅ Tag relevant accounts (mention limit: 10)
✅ Reply to own thread for visibility
✅ Controversial = engagement (use wisely)
✅ Ask questions
✅ Share data/statistics

### Timing
- **Best days**: Tuesday-Thursday
- **Best times**:
  - Morning: 8-10am
  - Lunch: 12-1pm
  - Evening: 5-6pm
- **Worst**: Late night, weekends
- **Breaking news**: Post immediately

### Thread Strategy
- First tweet: Hook with image
- Subsequent: Text-only or occasional image
- Final tweet: CTA or summary
- Number tweets (1/10, 2/10, etc.)

### Retweet Strategy
- Quote RT with commentary
- Add value to original
- Use image to amplify
- Drive conversation

---

## MCP Generation Parameters

### For Standard Tweet Image
```yaml
provider: gpt-image-1  # Text rendering matters
size: "1536x1024"      # Closest to 16:9
quality: "high"        # Stand out in feed
output_format: "png"   # Best for text
```

### For Quote Graphic
```yaml
provider: gpt-image-1  # Text accuracy critical
size: "1536x1024"
quality: "high"
output_format: "png"
```

### For Quick/Volume Posts
```yaml
provider: nanobanana   # Speed for trending topics
size: "1536x1024"
quality: "medium"
output_format: "png"
```

---

## Prompt Templates

### Quote Graphic
```
Twitter quote graphic with bold, high-contrast design.

Quote: "[insert quote text]"
Attribution: "[person/source]"
Background: [solid color/gradient - high contrast]
Text: Large, bold, easily readable (48-64pt)
Colors: High contrast (black on white OR white on bold color)
Layout: Quote centered, attribution bottom-right

Style: Bold, impactful, Twitter-friendly
Text rendering: Critical - must be perfect
Size: 1536×1024px
```

### Data/Stat Visual
```
Twitter data visualization with bold aesthetic.

Stat: "[large number or percentage]"
Context: "[brief explanation]"
Source: "[citation]"
Background: Clean, high contrast
Main stat: Dominant (72pt)
Supporting text: Clear hierarchy (28pt)
Visual: Simple chart/graph (optional)

Style: Bold, quick-read, data-driven
Size: 1536×1024px
```

### Thread Starter Image
```
Twitter thread starter with hook.

Message: "[attention-grabbing statement/question]"
Indicator: "THREAD \u2193" or "1/N"
Style: Bold, eye-catching, controversial (if appropriate)
Background: High contrast
Text: Large, readable, punchy
Design: Quick comprehension, thumb-stopping

Format: 1536×1024px
```

### News Commentary
```
Twitter news commentary visual.

Headline: "[news topic]"
Hot take: "[your commentary - bold statement]"
Style: Urgent, timely, bold
Colors: High contrast, attention-grabbing
Layout: Headline large, commentary prominent
Mood: Conversational, opinionated

Size: 1536×1024px
```

---

## Accessibility & Best Practices

### Mobile Optimization
- [ ] Text legible at phone size (test at 375px)
- [ ] High contrast (minimum 4.5:1)
- [ ] Single clear message
- [ ] No small text (<24pt)
- [ ] Quick to comprehend (<3 seconds)

### Alt Text
- [ ] Descriptive (1000 characters max on Twitter)
- [ ] Include text from image (for accessibility)
- [ ] Context for visually impaired users
- [ ] Keywords for searchability

### Twitter Algorithm Factors
- **Recency**: New tweets prioritized
- **Engagement**: Likes, RTs, replies
- **Media**: Images/videos rank higher
- **Conversation**: Replies boost visibility
- **Topic relevance**: Trending topics get boost

---

## Content Categories

### News & Commentary
- Breaking news graphics
- Hot takes on current events
- Data/statistics from news
- Timely observations

### Thought Leadership
- Industry insights
- Quick tips (numbered)
- Contrarian views
- Experience-based wisdom

### Humor & Memes
- Relatable situations
- Industry-specific humor
- Meme formats
- Sarcasm/irony

### Data & Research
- Survey results
- Market data
- Statistics visualization
- Research findings

---

## Technical Notes

### Twitter Image Compression
- Twitter compresses images significantly
- Upload highest quality within limits
- PNG preserves quality better
- Test on mobile before posting

### Aspect Ratio Handling
- Twitter crops to fit
- 16:9 shows fully in feed
- Avoid critical info at edges
- Preview before posting

### Multi-Image Layouts
- Twitter auto-arranges
- First image most important
- Mixed sizes create visual interest
- Max 4 images per tweet

---

## Examples

### Good Tweet Image
- Bold, readable text (48-64pt)
- High contrast (white on black or vice versa)
- Single clear message
- Quick to understand (<3 seconds)
- Professional but conversational

### Good Quote Tweet
- Large, impactful quote
- Clear attribution
- Clean design (not cluttered)
- Eye-catching colors
- Mobile-readable

### Good Thread Starter
- Attention-grabbing hook
- "Thread" indicator visible
- Bold statement or question
- Professional but engaging
- Encourages click-through

---

**For other platforms, see:**
- LinkedIn: `linkedin-specs.md`
- Instagram: `instagram-specs.md`

**For design systems, see:** `design-systems.md`
