# Instagram Platform Specifications

**Complete specifications for Instagram image generation**

---

## Image Size Requirements

### Feed Posts (Square - Most Common)
- **Ideal size**: 1080×1080px
- **MCP size**: `1024x1024` (closest match)
- **Aspect ratio**: 1:1 (perfect square)
- **Min size**: 320×320px
- **Max size**: 1080×1080px
- **File size**: < 8MB per image

### Feed Posts (Portrait)
- **Ideal size**: 1080×1350px (4:5 ratio)
- **MCP size**: `1024x1536` (2:3, closest match)
- **Aspect ratio**: 4:5 (desired), 2:3 (available)
- **Use case**: Vertical content, quotes, portraits

### Feed Posts (Landscape)
- **Ideal size**: 1080×566px (16:9 ratio)
- **MCP size**: `1536x1024` (3:2, closest match)
- **Aspect ratio**: 16:9 (desired), 3:2 (available)
- **Use case**: Panoramic, wide shots

### Stories
- **Ideal size**: 1080×1920px (9:16 ratio)
- **MCP size**: `1024x1536` (2:3, closest match)
- **Aspect ratio**: 9:16 (desired), 2:3 (available)
- **Safe zones**: Top 250px, bottom 250px (avoid UI overlap)
- **Duration**: 15 seconds (video) or tap-through (image)

### Reels Cover
- **Ideal size**: 1080×1920px (9:16 ratio)
- **MCP size**: `1024x1536` (2:3, closest match)
- **Aspect ratio**: Vertical full-screen

### Carousel Posts
- **Size**: Same as feed (1080×1080px most common)
- **MCP size**: `1024x1024`
- **Slides**: Up to 10 images
- **Mix**: Can mix photos/videos in single carousel

### Profile Picture
- **Size**: 320×320px (displays at 110×110px)
- **Note**: Too small for standard MCP generation
- **Workaround**: Generate 1024×1024, resize afterward

---

## Design Aesthetic: Vibrant Social

### Color Palette

**Background:**
- Bright, clean backgrounds
- Colorful gradients
- White space OK
- Avoid pure black (too harsh for Instagram)

**Colors:**
- Saturated, vibrant hues
- Instagram aesthetic: warm tones, pastels, neons
- Cohesive palette per brand
- Eye-catching but not overwhelming

**Popular Palettes:**
- Warm: Coral, peach, gold, sunset tones
- Cool: Teal, mint, sky blue, lavender
- Vibrant: Neon pink, electric blue, lime green
- Earthy: Terracotta, sage, burnt orange

### Typography

**Font Styles:**
- Modern, clean sans-serifs
- Hand-lettered/script for creative accounts
- Bold, impactful headlines
- Minimal body text (visual-first platform)

**Font Sizes:**
- Headline: Large, dominant (48-72pt)
- Body: Minimal text (24-32pt if needed)
- Captions: Handle long-form text in caption, not image

**Text Treatment:**
- Bold for impact
- High contrast (readability)
- Decorative elements OK (borders, shapes)
- Overlays: Semi-transparent backgrounds for text

### Layout & Composition

**Rule of Thirds:**
- Place subject at intersection points
- Create visual interest
- Natural eye flow

**Subject Focus:**
- Clear main subject
- Blurred backgrounds work well
- Depth of field

**Spacing:**
- Can be busier than LinkedIn
- But avoid clutter
- Visual breathing room important

**Mobile-First:**
- Design for phone screen
- Test at actual size
- Thumb-stopping visual

---

## Content Best Practices

### Feed Post Strategy
- **Visual storytelling**: Every post tells a story
- **Consistency**: Maintain aesthetic across feed
- **Engagement**: Ask questions, encourage saves/shares
- **Authenticity**: Behind-the-scenes, real moments

### Stories Strategy
- **Ephemeral**: 24-hour lifespan
- **Interactive**: Polls, questions, quizzes
- **Casual**: Less polished than feed
- **Frequent**: Post multiple times daily

### Carousel Strategy
- **Educational**: Teach something in 5-10 slides
- **Before/After**: Transformations work well
- **Listicles**: "5 Tips for..." format
- **Engagement**: Saves and shares boost algorithm

### Reels Strategy
- **Trending**: Use trending audio
- **Hook**: First 3 seconds critical
- **Value**: Educational or entertaining
- **Cover**: Eye-catching thumbnail

---

## Instagram-Specific Guidelines

### What Works on Instagram
✅ Lifestyle content
✅ Behind-the-scenes
✅ User-generated content
✅ Authentic, relatable moments
✅ Vibrant, colorful visuals
✅ Aspirational but accessible
✅ Mobile-optimized
✅ Face-to-camera content

❌ Avoid:
- Text-heavy images
- Low-resolution/blurry
- Over-edited/fake-looking
- Overly promotional
- Desktop-first design
- Horizontal content (feed prefers square/vertical)

### Hashtag Strategy
- **Count**: 3-5 hashtags (optimal)
- **Mix**: Niche + popular
- **Placement**: First comment (cleaner post)
- **Research**: Check hashtag size (10K-500K sweet spot)

### Posting Times
- **Best days**: Tuesday, Wednesday, Thursday
- **Best times**: 11am-1pm, 7pm-9pm
- **Consistency**: Post regularly (3-7x week)
- **Stories**: Multiple daily

### Engagement Tips
- Respond to comments quickly
- Use stickers in Stories (polls, questions)
- Save/share-worthy content ranks higher
- Consistent aesthetic = recognizable brand

---

## MCP Generation Parameters

### For Instagram Feed (Square)
```yaml
provider: nanobanana  # Speed + cost-effective for volume
size: "1024x1024"     # Perfect 1:1
quality: "medium"     # Good enough for social
output_format: "png"
```

### For Instagram Feed (Portrait)
```yaml
provider: nanobanana
size: "1024x1536"     # Closest to 4:5
quality: "medium"
output_format: "png"
```

### For Instagram Story
```yaml
provider: nanobanana
size: "1024x1536"     # Closest to 9:16 vertical
quality: "medium"
output_format: "png"
# Note: Add safe zones in prompt (top/bottom 250px)
```

### For Hero/Important Post
```yaml
provider: gpt-image-1  # Upgrade quality for special posts
size: "1024x1024"
quality: "high"
output_format: "png"
```

---

## Prompt Templates

### Vibrant Feed Post
```
Create Instagram feed post with vibrant, engaging aesthetic.

Content: [describe visual]
Style: Modern, colorful, eye-catching
Colors: Vibrant [specify palette]
Composition: Rule of thirds, clear subject focus
Background: [bright/gradient/clean]
Mood: [aspirational/fun/inspiring]

Design: Mobile-optimized, thumb-stopping, Instagram aesthetic
Text: Minimal (if any)
Size: 1024×1024px (square)
```

### Instagram Story
```
Instagram Story vertical design (9:16 format).

Content: [describe]
Style: Casual, authentic, engaging
Layout: Safe zones - avoid top 250px and bottom 250px
Text: Bold, high contrast, easy to read on mobile
Interactive elements: [poll/question/sticker placement]
Background: [gradient/photo/solid color]

Design: Vertical, mobile-first, swipe-up worthy
Size: 1024×1536px (closest to 9:16)
```

### Lifestyle Content
```
Instagram lifestyle content with authentic aesthetic.

Subject: [describe scene/person/product]
Setting: Natural, relatable, aspirational
Lighting: Bright, natural light aesthetic
Colors: Warm tones, vibrant but natural
Mood: Authentic, approachable, inspiring

Style: Instagram-worthy, shareable, saves-worthy
Composition: Clear subject, beautiful background
Size: 1024×1024px
```

---

## Accessibility & Best Practices

### Mobile Optimization Checklist
- [ ] Designed for 375-414px phone width
- [ ] Text legible at actual size
- [ ] Subject clear at thumbnail size (preview)
- [ ] Colors vibrant on phone screen
- [ ] No fine details that get lost

### Instagram Algorithm Factors
- **Saves**: Highest ranking signal
- **Shares**: Strong signal
- **Comments**: Meaningful conversation
- **Time spent**: How long users view
- **Completion**: Did they watch full video?

### Alt Text
- [ ] Descriptive alt text added
- [ ] 100 characters max (Instagram limit)
- [ ] Describes image content clearly
- [ ] Keywords for discovery

---

## Content Categories

### Lifestyle
- Aspirational but relatable
- Natural settings
- Authentic moments
- Warm, inviting aesthetic

### Fashion/Beauty
- Clean backgrounds
- Focus on products/outfits
- Flat lays popular
- Consistent color palette

### Food
- Overhead shots work well
- Natural lighting crucial
- Vibrant, appetizing colors
- Context (table setting)

### Fitness/Wellness
- Action shots
- Before/after transformations
- Motivational quotes
- Progress tracking

### Travel
- Stunning landscapes
- Golden hour lighting
- Wide shots + detail shots
- Mix of places and faces

### Business/Education
- Clean, professional but approachable
- Infographics work well (carousel)
- Quote graphics
- Behind-the-scenes content

---

## Technical Notes

### Instagram Image Compression
- Instagram compresses all images
- Upload highest quality possible (within limits)
- PNG better than JPEG for graphics
- Test on actual device before posting

### Aspect Ratio Handling
- Feed crops images to fit
- Preview before posting
- Safe zone: Keep important elements center
- Avoid critical info at edges

### Multi-Image Posts (Carousel)
- All images should be same aspect ratio
- Mix of ratios causes cropping
- Design with swipe in mind
- Cohesive aesthetic across slides

---

## Examples

### Good Instagram Feed Post
- Clear subject (person, product, scene)
- Vibrant, eye-catching colors
- Clean composition (rule of thirds)
- Minimal or no text
- High quality, sharp focus
- Consistent with brand aesthetic

### Good Instagram Story
- Vertical design optimized
- Text in safe zones (middle third)
- Interactive element (poll, question)
- Behind-the-scenes feel
- Authentic, casual vibe

### Good Instagram Carousel
- Educational content (5-10 slides)
- "Swipe for more" hook on slide 1
- Consistent design across slides
- Value in every slide
- CTA on final slide
- Save-worthy content

---

**For other platforms, see:**
- LinkedIn: `linkedin-specs.md`
- Twitter: `twitter-specs.md`

**For design systems, see:** `design-systems.md`
