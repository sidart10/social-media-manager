# MCP Server Setup Guide

## Setting up Image Generation MCP Servers for AI Image Agent

This guide will help you install and configure the MCP servers needed for the AI Image Agent to generate images using OpenAI gpt-image-1 and Google Gemini Nanobanana.

---

## Prerequisites

- Python 3.11+ installed
- Node.js 18+ (for npm-based servers)
- API Keys:
  - OpenAI API key (from https://platform.openai.com/api-keys)
  - Google Gemini API key (from https://aistudio.google.com/apikey)

---

## Option 1: Nanobanana MCP Server (Google Gemini)

### Installation

**Recommended: Using uvx (fastest)**

```bash
uvx nanobanana-mcp-server@latest
```

**Alternative: Using pip**

```bash
pip install nanobanana-mcp-server
```

### Configuration

Add to your Claude Code config (`.claude/mcp_settings.json` or similar):

```json
{
  "mcpServers": {
    "nanobanana": {
      "command": "uvx",
      "args": ["nanobanana-mcp-server@latest"],
      "env": {
        "GEMINI_API_KEY": "YOUR_GEMINI_API_KEY_HERE"
      }
    }
  }
}
```

### Environment Variables

Create a `.env` file or set:

```bash
export GEMINI_API_KEY="your_gemini_api_key_here"
```

### Verification

The server provides these tools:

- `generate_image` - Generate images from text prompts
- `edit_image` - Edit existing images
- `create_variation` - Create variations of images

---

## Option 2: GPT-Image-1 MCP Server (OpenAI)

### Recommended Implementation: PierrunoYT

**Installation via GitHub:**

```bash
git clone https://github.com/PierrunoYT/gpt-image-1-mcp-server.git
cd gpt-image-1-mcp-server
npm install
```

**Or use npx directly:**

```bash
npx @cloudwerxlab/gpt-image-1-mcp
```

### Configuration

Add to your Claude Code config:

```json
{
  "mcpServers": {
    "gpt-image-1": {
      "command": "npx",
      "args": ["@cloudwerxlab/gpt-image-1-mcp"],
      "env": {
        "OPENAI_API_KEY": "YOUR_OPENAI_API_KEY_HERE"
      }
    }
  }
}
```

### Environment Variables

```bash
export OPENAI_API_KEY="your_openai_api_key_here"
```

### Verification

The server provides these tools:

- `generate_image` - Generate images using gpt-image-1
- `edit_image` - Edit/inpaint images
- Supports: 1024x1024, 1024x1536, 1536x1024 resolutions
- Formats: PNG, JPEG, WebP

---

## Alternative Implementations

### Other OpenAI gpt-image-1 Servers:

**1. SureScaleAI (with Azure support)**

```bash
git clone https://github.com/SureScaleAI/openai-gpt-image-mcp.git
cd openai-gpt-image-mcp
npm install
```

**2. CLOUDWERX-DEV (npm package)**

```bash
npm install -g @cloudwerxlab/gpt-image-1-mcp
```

---

## Complete Claude Code Configuration

Add both servers to your MCP config:

**Location:** `~/.config/claude-code/mcp_settings.json` or project-specific

```json
{
  "mcpServers": {
    "nanobanana": {
      "command": "uvx",
      "args": ["nanobanana-mcp-server@latest"],
      "env": {
        "GEMINI_API_KEY": "your_gemini_api_key"
      }
    },
    "gpt-image-1": {
      "command": "npx",
      "args": ["@cloudwerxlab/gpt-image-1-mcp"],
      "env": {
        "OPENAI_API_KEY": "your_openai_api_key"
      }
    }
  }
}
```

---

## Testing Your Setup

### Test Nanobanana:

```bash
# In Claude Code or terminal
mcp__nanobanana__generate_image --prompt "A serene mountain landscape"
```

### Test GPT-Image-1:

```bash
mcp__gpt-image-1__generate_image --prompt "A professional business meeting"
```

---

## Updating Your Agent Config

After installing MCP servers, update the agent's config:

**File:** `ai-image-generator-sidecar/config.yaml`

```yaml
api_keys:
  openai_api_key: 'sk-proj-...' # Your actual key
  gemini_api_key: 'AIza...' # Your actual key

providers:
  openai:
    enabled: true
  nanobanana:
    enabled: true

mcp_servers:
  gpt_image_1:
    server_name: 'gpt-image-1'
    tool_prefix: 'mcp__gpt-image-1__'
  nanobanana:
    server_name: 'nanobanana'
    tool_prefix: 'mcp__nanobanana__'
```

---

## Troubleshooting

### "MCP server not found"

- Verify installation: `which uvx` or `which npx`
- Check config file location and syntax
- Restart Claude Code after adding servers

### "Authentication failed"

- Verify API keys are correct
- Check environment variables: `echo $OPENAI_API_KEY`
- Ensure no extra spaces in config

### "Command not found: uvx"

- Install pipx: `pip install pipx`
- Ensure pipx is in PATH

### "Rate limit exceeded"

- OpenAI: Check usage at platform.openai.com
- Gemini: Check quota at console.cloud.google.com

---

## Security Best Practices

1. **Never commit API keys to git**
   - Add `config.yaml` to `.gitignore`
   - Use environment variables

2. **Rotate keys regularly**
   - OpenAI: Every 90 days
   - Gemini: Every 6 months

3. **Use project-specific keys**
   - Create separate keys for different projects
   - Set usage limits per key

4. **Monitor usage**
   - OpenAI: https://platform.openai.com/usage
   - Gemini: https://console.cloud.google.com/

---

## Next Steps

1. ✅ Install MCP servers
2. ✅ Configure API keys
3. ✅ Test both providers
4. ✅ Update agent config.yaml
5. 🚀 Start generating images!

Use the agent commands:

- `*create-single` - Generate one image
- `*create-carousel` - Generate carousel set
- `*instagram` - Quick Instagram-optimized generation

---

## Resources

- **Nanobanana GitHub:** https://github.com/zhongweili/nanobanana-mcp-server
- **GPT-Image-1 GitHub:** https://github.com/PierrunoYT/gpt-image-1-mcp-server
- **OpenAI API Docs:** https://platform.openai.com/docs
- **Gemini API Docs:** https://ai.google.dev/docs
- **MCP Protocol:** https://modelcontextprotocol.io

---

**Ready to generate!** 🎨
