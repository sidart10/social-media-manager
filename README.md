# Social Media Manager

AI-powered social media content creation and publishing system with specialized agents for research, content creation, visual production, video generation, and multi-platform publishing.

[![GitHub](https://img.shields.io/badge/GitHub-sidart10-blue?logo=github)](https://github.com/sidart10/social-media-manager)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)

**🎯 End-to-End Content Pipeline** • **🤖 Specialized AI Agents** • **📱 Multi-Platform Publishing**

---

## What is This?

A comprehensive AI-powered social media management system that handles the complete content creation pipeline:

**Research → Strategy → Content Creation → Visual Production → Video Generation → Publishing**

Built with specialized agents, Claude Code skills, and integrated MCP servers for maximum automation and quality.

---

## 🤖 Agent Architecture

### Team Structure

```
Jarvis (Content Intelligence - Team Head)
    ↓ coordinates
├── AI Image Generator (Visual Production Specialist)
├── AI Video Agent (Video Production Specialist)
└── Social Posting Agent (Publishing Specialist)
```

### Available Agents

#### **1. Jarvis** - Content Intelligence Team Head
**Command**: `/jarvis`
**Location**: `bmad/agents/content-intelligence/`

**Capabilities**:
- Deep web research (Exa, Apify, Firecrawl, WebSearch)
- Profile analysis across platforms
- Competitive intelligence
- Content idea generation
- Post writing (LinkedIn, Twitter/X, Substack)
- Video script writing (YouTube, Shorts, Reels, TikTok)
- Voice profile matching
- Team coordination and handoffs

**12 Specialized Skills**:
- deep-web-research
- profile-analysis
- post-writer
- video-script-writer
- platform-formatter
- voice-matcher
- research-synthesizer
- social-media-research
- youtube-research
- youtube-growth-mastery
- youtube-thumbnail-mastery
- evidence-tracker

---

#### **2. AI Image Generator** - Visual Production Specialist
**Command**: `/ai-image-generator`
**Location**: `bmad/agents/ai-image-generator/`

**Capabilities**:
- Social media image generation (LinkedIn, Instagram, Twitter, YouTube)
- LinkedIn carousels with dark monochrome tech design system
- YouTube thumbnails optimized for CTR
- Image editing and blending
- Platform-specific aspect ratios and dimensions
- Emily JSON methodology with 7-pillar quality framework

**9 Specialized Skills**:
- create-image
- edit-image
- blend-images
- platform-specs
- linkedin-design
- youtube-thumbnail-design
- mcp-tool-selection
- generating-sid-images

**MCP Tools**:
- gpt-image-1 (OpenAI DALL-E)
- nanobanana (Gemini 2.5 Flash)

---

#### **3. AI Video Agent** - Video Production Specialist
**Command**: `/ai-video-agent`
**Location**: `bmad/agents/ai-video-agent/`

**Capabilities**:
- Talking head videos with HeyGen (avatar + voice cloning)
- Scene generation with Veo 3 (fast b-roll, diagram animation)
- Cinematic videos with Sora 2 (premium quality)
- Image-to-video animation
- Multi-scene stitching and merging
- Platform optimization (9:16 vertical, 16:9 horizontal)
- Enhanced cinematic prompting system

**1 Specialized Skill**:
- veotools-mastery

**MCP Tools**:
- heygen (avatar videos)
- veotools (Veo 3 generation)
- fal-video (multiple video models)

---

#### **4. Social Posting Agent** - Publishing Specialist
**Command**: `/social-posting-agent`
**Location**: `bmad/agents/social-posting-agent/`

**Capabilities**:
- Twitter/X posting (Premium API with 25k character posts, images, threads)
- LinkedIn posting (carousels, documents, videos)
- YouTube uploads (videos and Shorts)
- Platform validation and rate limiting
- Multi-platform scheduling via Postiz
- Cross-platform publishing orchestration

**API Integrations**:
- Twitter Premium API (OAuth 1.0a)
- LinkedIn API (OAuth 2.0)
- YouTube Data API v3
- Postiz MCP (scheduling)

---

## 🎨 Skills Architecture

All domain knowledge lives in Claude Code skills organized by agent:

```
.claude/skills/
├── jarvis/                    (12 skills - research, writing, analysis)
├── ai-image-generator/        (9 skills - visual production)
├── ai-video-agent/            (1 skill - video generation)
├── visual-prompt-mastery/     (1 skill - prompt engineering)
└── skill-creator/             (1 skill - skill development)

Total: 24 specialized skills
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js v20+
- Claude Code CLI
- GitHub account (for pushing outputs)
- API keys configured:
  - OpenAI (for gpt-image-1)
  - Google AI (for nanobanana, veotools)
  - HeyGen (for avatar videos)
  - Twitter/LinkedIn/YouTube (for posting)

### Usage

**1. Start Jarvis (Content Intelligence)**:
```bash
/jarvis
```

**2. Research a topic**:
```
Select: *research-topic
Enter topic: "AI automation trends 2025"
```

**3. Generate content**:
```
Select: *write-post
Platform: LinkedIn
Topic: Based on research findings
```

**4. Create visuals** (if needed):
```bash
/ai-image-generator
```

**5. Create videos** (if needed):
```bash
/ai-video-agent
```

**6. Publish**:
```bash
/social-posting-agent
```

---

## 📁 Project Structure

```
social-media-manager/
├── .claude/
│   ├── commands/              # Slash command definitions
│   │   ├── jarvis/
│   │   ├── ai-image-generator/
│   │   ├── ai-video-agent/
│   │   └── social-posting-agent/
│   └── skills/                # 24 specialized skills
│       ├── jarvis/
│       ├── ai-image-generator/
│       ├── ai-video-agent/
│       ├── visual-prompt-mastery/
│       └── skill-creator/
├── bmad/
│   ├── agents/                # Agent configurations
│   │   ├── content-intelligence/    # Jarvis agent
│   │   ├── ai-image-generator/      # Image agent
│   │   ├── ai-video-agent/          # Video agent
│   │   └── social-posting-agent/    # Publishing agent
│   └── modules/               # Platform API clients
│       ├── twitter-api-client/
│       └── linkedin-api-client/
├── outputs/                   # Generated content by date
│   └── {MM-DD-YYYY}/
│       └── {session-name}/
│           ├── posts/
│           ├── images/
│           ├── videos/
│           ├── research/
│           └── handoff-*.json
└── scripts/                   # Utility scripts
```

---

## 🔧 Configuration

### Agent Configuration

Each agent has a sidecar folder with:
- `config.yaml` - API keys, user settings, platform specs
- `instructions.md` - Private agent directives
- `memories.md` - Learning log and context
- Platform-specific templates and references

**Example**: `bmad/agents/content-intelligence/jarvis-sidecar/config.yaml`

### MCP Servers

The system uses 20+ MCP servers for capabilities:

**Research & Scraping**:
- exa (neural search)
- firecrawl (web scraping)
- apify (Instagram, TikTok, Twitter scraping)
- social-media-mcp (Brave + Perplexity)

**Content Generation**:
- gpt-image-1 (OpenAI images)
- nanobanana (Gemini images)
- heygen (avatar videos)
- veotools (Veo 3 videos)
- fal-video (multi-model video)

**Publishing**:
- mcp-twitter (Twitter API)
- youtube-uploader (YouTube API)
- postiz (multi-platform scheduling)
- typefully (Twitter scheduling)

**Infrastructure**:
- notion (knowledge management)
- cloudinary (media storage)
- chrome-devtools (web automation)

---

## 💡 Key Features

### Content Intelligence (Jarvis)

- **Smart Research**: Auto-selects tools based on depth (free → low-cost → paid)
- **Voice Matching**: Learns your writing style and applies it to all content
- **Platform Optimization**: Formats content for specific platform algorithms
- **Evidence Tracking**: Every recommendation backed by sources with URLs

### Visual Production (AI Image Generator)

- **Emily JSON Methodology**: Structured prompting for high-quality images
- **7-Pillar Quality Framework**: Comprehensive evaluation system
- **Platform Design Systems**: LinkedIn dark monochrome, YouTube CTR-optimized
- **Intelligent Tool Routing**: Auto-selects best MCP tool for the use case

### Video Production (AI Video Agent)

- **Multi-Provider Routing**: HeyGen for talking heads, Veo for scenes, Sora for cinematic
- **Enhanced Prompting**: Virtual Film Producer methodology with cinematic terminology
- **Platform Optimization**: Automatic aspect ratio, duration, caption defaults
- **Consent Management**: Avatar verification and ethical AI production

### Publishing (Social Posting Agent)

- **Multi-Platform**: Twitter, LinkedIn, YouTube native API posting
- **Rate Limiting**: Smart throttling and quota management
- **Validation**: Platform-specific character limits and format checking
- **Cost Tracking**: Transparent API usage monitoring

---

## 📊 Workflow Examples

### Example 1: LinkedIn Post with Carousel

```bash
# 1. Research topic
/jarvis
*research-topic → "AI infrastructure trends"

# 2. Generate post
*write-post → LinkedIn, professional tone

# 3. Create carousel images
/ai-image-generator
*linkedin → 5 slides, dark monochrome design

# 4. Publish
/social-posting-agent
*linkedin → Post with carousel
```

### Example 2: YouTube Short with Thumbnail

```bash
# 1. Write script
/jarvis
*write-script → YouTube Short, 60 seconds, tech topic

# 2. Generate thumbnail
/ai-image-generator
*youtube-thumbnail → CTR-optimized design

# 3. Create talking head video
/ai-video-agent
*create-talking-head → 9:16 vertical, captions ON

# 4. Upload to YouTube
/social-posting-agent
*youtube → Auto-detects as Short, adds thumbnail
```

---

## 🎯 Output Management

All outputs saved to centralized structure:

```
outputs/
└── {MM-DD-YYYY}/
    └── {platform}-{content-type}-{topic}/
        ├── posts/              # Written content
        ├── images/             # Generated visuals
        ├── videos/             # Rendered videos
        ├── research/           # Research briefs
        ├── data/               # Raw data, spreadsheets
        └── handoff-*.json      # Agent coordination packages
```

**Metadata tracking**: Every output includes JSON metadata with:
- Generation parameters
- Quality scores
- Cost tracking
- Source attribution
- Timestamps

---

## 🔐 Security & Privacy

- API keys stored in gitignored config files
- Generated content stays local
- User prompts remain private
- No telemetry or tracking
- Full data ownership

---

## 📈 Cost Optimization

**Tiered Approach**:
1. **Free tier**: WebSearch, WebFetch, Firecrawl (with caching)
2. **Low cost**: Exa (~$0.05-0.15/search), Social Media MCP
3. **Paid tier**: Apify (~$0.40-0.50/1k results) - requires user approval

**Automatic Cost Tracking**: All API usage logged in `memories.md` with monthly totals

---

## 🛠️ Technology Stack

**Framework**: Custom agent architecture with Claude Code skills
**Language**: JavaScript/Node.js (API clients), Python (formatters, utilities)
**AI Models**: Claude 3.5 Sonnet (agents), GPT-4, Gemini 2.5 Flash
**Infrastructure**: MCP protocol for tool integration
**APIs**: Twitter Premium, LinkedIn, YouTube, HeyGen, Veo, OpenAI, Google AI

---

## 📚 Documentation

- **Agent Instructions**: See `bmad/agents/{agent-name}/{agent-name}-sidecar/instructions.md`
- **Skills Reference**: Each skill has `SKILL.md` with usage patterns
- **Workflow Guides**: `bmad/agents/{agent-name}/workflows/`
- **Output Standards**: `outputs/README.md`

---

## 🤝 Contributing

This is a personal project but open to collaboration. Feel free to:
- Report issues
- Suggest features
- Share improvements

---

## 📜 License

MIT License - See LICENSE for details

---

## 🔗 Related Projects

- **BMad Method** - Software development framework this architecture is inspired by
- **Claude Code** - The AI IDE powering the agents
- **MCP Protocol** - Tool integration standard

---

**Built for autonomous social media content creation with human oversight and quality control.**

_Last updated: October 31, 2025_
