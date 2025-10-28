# 🎨 AI Image Generator Agent

**BMAD Expert Agent for Social Media Image Generation**

Generate high-quality images optimized for Instagram, X/Twitter, and LinkedIn using OpenAI gpt-image-1 and Google Gemini Nanobanana.

---

## Overview

The AI Image Generator Agent is a professional visual content producer that creates platform-optimized images at scale. It routes intelligently between multiple AI providers, applies platform-specific requirements, and delivers draft-ready assets with captions and alt text.

### Key Features

✅ **Single & Batch Generation** - Create one image or carousel sets (2-10 images)
✅ **Platform Presets** - Instagram, X/Twitter, LinkedIn with optimized specs
✅ **Multi-Provider** - Routes between OpenAI gpt-image-1 and Gemini Nanobanana
✅ **Quality Controls** - NSFW filtering, resolution checks, duplicate detection
✅ **Draft-Ready Output** - Generated images with captions, alt text, and metadata
✅ **Style Diversity** - Create related-but-distinct images for carousels

---

## Quick Start

### 1. Install MCP Servers

See detailed setup: [`ai-image-generator-sidecar/MCP_SETUP.md`](./ai-image-generator-sidecar/MCP_SETUP.md)

**Nanobanana (Gemini):**

```bash
uvx nanobanana-mcp-server@latest
```

**GPT-Image-1 (OpenAI):**

```bash
npx @cloudwerxlab/gpt-image-1-mcp
```

### 2. Configure API Keys

Edit `ai-image-generator-sidecar/config.yaml`:

```yaml
api_keys:
  openai_api_key: 'sk-proj-YOUR_KEY_HERE'
  gemini_api_key: 'AIzaYOUR_KEY_HERE'
```

### 3. Activate Agent

```bash
# Run BMAD installer to compile agent
# Then call the agent:
/ai-image-agent
```

### 4. Start Generating!

```
*create-carousel  - Generate carousel set
*create-single    - Generate one image
*instagram        - Quick Instagram generation
```

---

## Agent Structure

```
ai-image-generator/
├── ai-image-generator.agent.yaml      # Agent source (YAML)
├── ai-image-generator.md              # Compiled agent (generated)
├── .gitignore                         # Protect API keys
├── README.md                          # This file
│
├── ai-image-generator-sidecar/        # Expert agent resources
│   ├── instructions.md                # Private operational rules
│   ├── config.yaml                    # API keys & settings (gitignored)
│   ├── platform-specs.yaml            # Instagram/X/LinkedIn specs
│   ├── MCP_SETUP.md                   # MCP server installation guide
│   └── outputs/                       # Generated images folder
│       └── README.md
│
└── workflows/                         # Image generation workflows
    └── README.md                      # Workflow documentation
```

---

## Commands

### Primary Generation

- `*create-carousel` - Generate 2-10 image carousel set
- `*create-single` - Generate one optimized image
- `*create-batch` - Generate multiple variants of same concept

### Platform Quick Commands

- `*instagram` - Quick Instagram-optimized generation
- `*twitter` - Quick X/Twitter-optimized generation
- `*linkedin` - Quick LinkedIn-optimized generation

### Utilities

- `*preview` - Preview settings before generation
- `*presets` - List available platform presets
- `*config` - Show/update configuration

### Meta

- `*help` - Show command list
- `*exit` - Exit agent

---

## Platform Specifications

### Instagram

- **Square (1:1):** 1080x1080px - Standard feed post
- **Portrait (4:5):** 1080x1350px - Vertical post
- **Carousel:** 1080x1080px - Up to 10 images

### X/Twitter

- **Standard (16:9):** 1200x675px - Timeline image
- **Large (2:1):** 1200x600px - Summary card

### LinkedIn

- **Standard (1.91:1):** 1200x628px - Feed post
- **Square (1:1):** 1200x1200px - Alternative format

Full specifications: `ai-image-generator-sidecar/platform-specs.yaml`

---

## Provider Routing

**OpenAI gpt-image-1:**

- High detail and photorealism
- Complex compositions
- Professional imagery
- Resolutions: 1024x1024, 1024x1536, 1536x1024

**Gemini Nanobanana:**

- Fast iteration
- Stylized content
- Batch generation
- Cost-effective

The agent automatically selects the best provider based on your requirements.

---

## Output

Generated images are saved to:

```
ai-image-generator-sidecar/outputs/YYYY-MM-DD/
```

Each generation includes:

- ✅ Image files (PNG/JPEG/WebP)
- ✅ Metadata JSON (prompt, specs, provider)
- ✅ Suggested caption (platform-aware)
- ✅ Alt text (accessibility)

---

## Configuration

### API Keys

Store in `ai-image-generator-sidecar/config.yaml` (gitignored)

### Platform Defaults

```yaml
platform:
  default: instagram

generation:
  default_count: 1
  max_batch_size: 10
  safety_filter: true
```

### Provider Preferences

```yaml
providers:
  default: openai # or nanobanana
  openai:
    enabled: true
  nanobanana:
    enabled: true
```

---

## Security

🔒 **API keys are stored locally** in `config.yaml` (gitignored)
🔒 **Generated images stay local** in `outputs/` folder
🔒 **Never commit** API keys or generated images to git

---

## Troubleshooting

### "MCP server not found"

- Install MCP servers: See `MCP_SETUP.md`
- Restart Claude Code after installation

### "Authentication failed"

- Check API keys in `config.yaml`
- Verify keys are valid at provider dashboards

### "Generation failed"

- Check internet connection
- Verify API quota/rate limits
- Try alternative provider

### "Agent not found"

- Run BMAD installer to compile agent
- Check agent is in `bmad/agents/` directory

---

## Development Status

**Current Version:** 1.0.0

✅ Agent structure complete
✅ Sidecar resources configured
✅ MCP server documentation ready
✅ Platform specifications defined
🚧 Workflows ready for implementation
🚧 MCP servers need installation

---

## Next Steps

1. **Install MCP servers** - Follow `MCP_SETUP.md`
2. **Add API keys** - Update `config.yaml`
3. **Test providers** - Verify both OpenAI and Gemini work
4. **Generate first image** - Try `*create-single`
5. **Create carousel** - Test `*create-carousel`

---

## Resources

- **OpenAI gpt-image-1:** https://platform.openai.com/docs/guides/images
- **Gemini API:** https://ai.google.dev/docs
- **Nanobanana MCP:** https://github.com/zhongweili/nanobanana-mcp-server
- **GPT-Image-1 MCP:** https://github.com/PierrunoYT/gpt-image-1-mcp-server
- **BMAD Documentation:** Project root `/bmad/`

---

## Support

Issues or questions:

1. Check `MCP_SETUP.md` for installation help
2. Review `config.yaml` for configuration options
3. Check `platform-specs.yaml` for platform requirements
4. Review workflow READMEs for implementation details

---

**Ready to generate stunning social media images!** 🚀

_Built with BMAD Core - Expert Agent Architecture_
