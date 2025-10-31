---
name: video-script-writer
description: Generate professional YouTube video scripts (10-20 min talking head) and short-form vertical videos (Shorts/Reels/TikTok) using proven strategies from Ali Abdaal, MKBHD, and 2025 retention best practices. Creates complete scripts with hooks, retention tactics, and CTAs based on real creator methodology.
---

# Video Script Writer

Professional video script generation using proven creator strategies and 2025 retention best practices.

## When to Use This Skill

Use this skill when you need to:
- Write YouTube video scripts (10-20 minute talking head format)
- Create short-form vertical video scripts (YouTube Shorts, Instagram Reels, TikTok)
- Generate scripts with proven retention tactics
- Apply Ali Abdaal's or MKBHD's scripting methodology
- Maximize viewer retention and engagement

## Two Content Types Supported

### 1. Long-Form YouTube (10-20 min Talking Head)
**Use cases**:
- Educational content
- Tech reviews
- Deep dives
- Tutorial videos
- Commentary videos

**Output**: Complete script with hooks, main content, retention tactics, and CTAs

### 2. Short-Form Vertical (30-90s)
**Use cases**:
- YouTube Shorts
- Instagram Reels
- TikTok videos

**Output**: Fast-paced script with 3-second hook, beats, and CTA

## How It Works

**Simple Process**:
1. You specify: Topic, duration, platform, style preference
2. Skill loads appropriate prompt template
3. Claude generates complete script using proven patterns
4. Output includes: Hook, main content, retention tactics, CTA, production notes

**No complex multi-agent systems. No broken autogen. Just working prompts.**

## Script Methodologies Available

### Ali Abdaal's "Top 5" Format
Best for: Educational listicles, productivity tips, how-to guides

**Structure**: Strategic tip ordering that withholds best content until end for maximum retention

### MKBHD Tech Review Format
Best for: Product reviews, comparisons, tech analysis

**Structure**: Central theme/motif with comprehensive coverage in minimal time

### 2025 Retention-Optimized Format
Best for: Maximum algorithmic performance

**Structure**: Micro-loops, pattern interrupts, emotional pacing, 50-60% surprise rule

## Key Features

- ✅ **Proven retention tactics** (50-60% surprise rule, pattern interrupts)
- ✅ **85% lose 50% in 30s** - Hooks engineered to prevent this
- ✅ **Complete scripts** (not 300 characters like broken autogen)
- ✅ **Platform-specific** (different pacing for long-form vs short-form)
- ✅ **Production notes** (B-roll, timing, visual cues)
- ✅ **Based on real creator data** (Ali Abdaal, MKBHD, 2025 strategies)

## Reference Files

### Prompts (`prompts/`)
- `long-form-youtube.md` - Prompt for 10-20 min talking head videos
- `short-form-vertical.md` - Prompt for 30-90s vertical videos

### Examples (`examples/`)
- `ali-abdaal-top5-example.md` - Example using Top 5 format
- `mkbhd-tech-review-example.md` - Example tech review script
- `short-form-60s-example.md` - Example short-form script

### Best Practices Reference
- `../../../output/CONSOLIDATED-YOUTUBE-BEST-PRACTICES.md` - Complete research compilation

## Quick Start

**For 15-min YouTube video about AI automation**:
```
Use video-script-writer skill:
- Topic: "AI automation tools that save 10 hours/week"
- Duration: 15 minutes
- Format: Long-form talking head
- Style: Ali Abdaal Top 5
```

**For 60s Instagram Reel**:
```
Use video-script-writer skill:
- Topic: "3 AI tools you're not using"
- Duration: 60 seconds
- Format: Short-form vertical
- Platform: Instagram Reels
```

## Integration with Jarvis Workflow

This skill **replaces** the broken autogen-script-generator in:
- `bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-scripts/`

**Workflow Update**: Step 2 (generate script) now uses this skill instead of autogen.

## Quality Standards

Every script includes:
- Hook with curiosity gap (first 15-30s for long, 3s for short)
- Clear value proposition
- Pattern interrupts (every 45-60s)
- Surprise element at 50-60% mark (long-form only)
- Emotional pacing variation
- Best content withheld for finale (retention tactic)
- Natural CTA integration

## Performance Expectations

- **Long-form scripts**: 2000-4000 words (10-20 min speaking time)
- **Short-form scripts**: 150-250 words (30-90s speaking time)
- **Hook effectiveness**: Designed to beat 85% drop-off stat
- **Retention tactics**: Based on proven creator methods

## Notes

- This skill uses **direct Claude prompting** (no multi-agent complexity)
- Prompts are tested and proven (not experimental)
- Based on **real creator methodology** (Ali Abdaal, MKBHD)
- Incorporates **2025 retention strategies** from industry research
- Simple, reliable, and produces **full-length scripts**

---

*Generated scripts are production-ready and include timing, hooks, retention tactics, and CTAs.*
