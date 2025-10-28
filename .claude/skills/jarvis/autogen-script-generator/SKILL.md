---
name: autogen-script-generator
description: Generate professional scripts and social media posts using multi-agent collaboration. Handles YouTube videos, Reels/TikTok shorts, LinkedIn posts, Twitter threads/long-form, and Instagram captions. Specialized agents for research, title, hook, content, tone, and review work together. Uses exa research data, applies user voice profile, and creates polished content with fact-checking. Use when user needs video script, reel, Twitter thread, or professional social media post.
---

# AutoGen Script Generator

## Prerequisites

**Python Environment:** This skill uses a virtual environment with autogen dependencies.
- Virtual env location: `venv/` (within skill directory)
- All python commands MUST use: `venv/bin/python`
- Dependencies: autogen-agentchat, autogen-core, autogen-ext, openai, tiktoken

**If venv missing or dependencies not installed:**
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Purpose

Professional content generation using multi-agent collaboration with research integration, voice matching, and fact-checking.

## Supported Content Types

**Social Media Posts:**
- Twitter threads (5-10 tweets)
- Twitter long-form (500-2500 chars)
- LinkedIn posts (professional, < 1600 chars)
- Instagram captions (story-driven, 125 char hook)

**Video Scripts:**
- YouTube (30s-10min with timestamps)
- Reels (30-90s, fast-paced)
- TikTok (15-180s, trend-aware)

## Instructions

When user needs content:

1. **Execute Python script** with appropriate parameters based on content type using venv python.

2. **For Twitter thread:**
   ```
   venv/bin/python scripts/generate_script.py \
     --topic "{topic}" \
     --platform "twitter" \
     --format "thread" \
     --research-file "{research_path}" \
     --voice-file "{voice_path}"
   ```

3. **For Twitter long-form:**
   ```
   --platform "twitter" --format "longform"
   ```

4. **For LinkedIn post:**
   ```
   --platform "linkedin"
   ```

5. **For YouTube script:**
   ```
   --platform "youtube" --duration "90s"
   ```

6. **For Reel:**
   ```
   --platform "reels" --duration "60s"
   ```

**AutoGen agents collaborate:**
- Research_Agent: Loads research data (from exa, not Tavily)
- Title_Agent: Creates compelling title/hook
- Content_Agent: Main content with research evidence
- Tone_Agent: Applies style + user voice profile
- Reviewer_Agent: Fact-checks against research

**Output:** Platform-ready content with:
- Research citations
- User's voice characteristics
- Platform-appropriate formatting
- Fact-checked accuracy

## Key Features

**Research Integration:**
- Loads research-brief.md from research-topic workflow
- Incorporates facts, quotes, examples
- Cites sources naturally

**Voice Matching:**
- Loads voice profile from memories.md
- Matches vocabulary, sentence structure, tone
- Uses signature phrases
- Applies emoji patterns

**Platform-Specific:**
- Twitter: Threads (numbered) or long-form (single post)
- LinkedIn: Professional hook < 140, body < 1600
- Instagram: Hook 125 chars, storytelling style
- YouTube: Timestamps, B-roll suggestions
- Reels: 3s hook, fast beats, engaging

## Example Usage

**Generate Twitter thread:**
```bash
venv/bin/python scripts/generate_script.py \
  --topic "AI automation tools" \
  --platform "twitter" \
  --format "thread" \
  --research-file "sessions/research-AI_automation-2025-10-27.md"
```

**Output:**
```
Tweet 1/6: 73% of developers automate < 20% of their workflows.

Here's what's changing that 🧵

Tweet 2/6: Tool #1: Zapier

Connects 5000+ apps. Set it once, runs forever.

Saved me 10 hours last week.

[etc...]
```

**Generate LinkedIn post:**
```bash
python generate_script.py \
  --topic "MCP is the USB-C moment for AI" \
  --platform "linkedin" \
  --voice-file "jarvis-sidecar/memories.md"
```

**Generate YouTube script:**
```bash
python generate_script.py \
  --topic "AI automation guide" \
  --platform "youtube" \
  --duration "5min" \
  --research-file "sessions/research-AI_automation-2025-10-27.md"
```

**Output includes timestamps, visual cues, B-roll suggestions.**

## Integration with Jarvis

**Used by:**
- write-posts workflow (LinkedIn, Twitter, Instagram)
- write-scripts workflow (YouTube, Reels, TikTok)

**Receives:**
- Idea Card (topic, outline, hook)
- Research brief (facts, quotes, examples)
- Voice profile (style, tone, phrases)

**Returns:**
- Polished, platform-ready content
- Research-backed and fact-checked
- In user's authentic voice
