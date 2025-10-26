# MCP Servers - WORKING CONFIGURATION

**Date:** 2025-10-25
**Status:** ✅ FULLY FUNCTIONAL

Both OpenAI gpt-image-1 and Nanobanana MCP servers are now working!

---

## ✅ Working Configuration

### Config File Location

**CRITICAL:** Use `~/.claude.json` (NOT `~/.claude/.mcp.json`)

### Complete Working Config

**File:** `~/.claude.json`

```json
{
  "mcpServers": {
    "gpt-image-1": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@cloudwerxlab/gpt-image-1-mcp"],
      "env": {
        "OPENAI_API_KEY": "sk-your-key-here"
      }
    },
    "nanobanana": {
      "type": "stdio",
      "command": "uvx",
      "args": ["nanobanana-mcp-server@latest"],
      "env": {
        "GEMINI_API_KEY": "AIza-your-key-here"
      }
    }
  }
}
```

**Also add to `~/.claude/settings.json`:**

```json
{
  "enabledMcpjsonServers": [
    ...,
    "gpt-image-1",
    "nanobanana"
  ]
}
```

---

## 🛠️ Setup Commands (Using Claude CLI)

```bash
# Add OpenAI gpt-image-1
claude mcp add gpt-image-1 --scope user -- npx -y @cloudwerxlab/gpt-image-1-mcp

# Add Nanobanana
claude mcp add nanobanana --scope user -- uvx nanobanana-mcp-server@latest

# Add API keys manually (edit ~/.claude.json)
# Set OPENAI_API_KEY for gpt-image-1
# Set GEMINI_API_KEY for nanobanana

# Verify
claude mcp list
```

**Expected Output:**

```
gpt-image-1: npx -y @cloudwerxlab/gpt-image-1-mcp - ✓ Connected
nanobanana: uvx nanobanana-mcp-server@latest - ✓ Connected
```

---

## 🎯 Correct MCP Tool Names

### OpenAI gpt-image-1

**Tool Name:** `mcp__gpt-image-1__create_image`

**NOT:**

- ~~`mcp__gpt-image-1__generate_image`~~ ❌
- ~~`mcp__gpt-image-1__generate`~~ ❌

**Parameters:**

```typescript
{
  prompt: string,
  size: "1024x1024" | "1024x1536" | "1536x1024",
  quality: "low" | "medium" | "high" | "auto",
  n?: number,  // Number of images (default 1)
  output_format?: "png" | "jpeg" | "webp",
  background?: "transparent" | "opaque" | "auto",
  moderation?: "low" | "auto",
  output_compression?: number  // 0-100
}
```

**Output:**

- Saves to: `/Users/sid/Pictures/gpt-image-1/gpt-images/`
- Returns: File path, metadata, token usage

### Gemini Nanobanana

**Tool Name:** `mcp__nanobanana__generate_image`

**Parameters:**

```typescript
{
  prompt: string,
  n?: number,  // Number of images
  negative_prompt?: string,
  system_instruction?: string,
  input_image_path_1?: string,  // For editing/conditioning
  input_image_path_2?: string,
  input_image_path_3?: string,
  mode?: "auto" | "generate" | "edit",
  file_id?: string  // For editing existing Files API images
}
```

**Output:**

- Saves to: `/Users/sid/nanobanana-images/`
- Returns: File paths, Files API IDs, metadata, size info

---

## 🔍 Key Differences

| Feature                 | OpenAI gpt-image-1        | Nanobanana              |
| ----------------------- | ------------------------- | ----------------------- |
| **Tool Name**           | `create_image`            | `generate_image`        |
| **File Size**           | Larger (1-2MB)            | Smaller (250-500KB)     |
| **Output Location**     | `~/Pictures/gpt-image-1/` | `~/nanobanana-images/`  |
| **Files API**           | No                        | Yes (uploads to Gemini) |
| **Multi-image Input**   | No                        | Yes (up to 3 images)    |
| **Edit Mode**           | No                        | Yes                     |
| **System Instructions** | No                        | Yes                     |
| **Negative Prompts**    | No (in main prompt)       | Yes (separate param)    |

---

## 🚀 Usage Examples

### OpenAI gpt-image-1

```typescript
mcp__gpt-image-1__create_image({
  prompt: "Professional tech slide, dark background #0B0B0B, white text 'AI Architecture', minimalist Inter font",
  size: "1536x1024",
  quality: "high",
  output_format: "png"
})
```

### Nanobanana

```typescript
mcp__nanobanana__generate_image({
  prompt: 'Dark tech aesthetic slide with geometric patterns',
  negative_prompt: 'cluttered, colorful, gradients, cartoons',
  n: 1,
});
```

### Nanobanana with Image Editing

```typescript
mcp__nanobanana__generate_image({
  prompt: 'Change background to dark black, keep subject',
  input_image_path_1: '/path/to/image.png',
  mode: 'edit',
});
```

---

## 🎓 What We Learned

### The Fixes Required:

1. **Config Location:** `~/.claude.json` (NOT `~/.claude/.mcp.json`)
2. **Type Field:** Must include `"type": "stdio"`
3. **-y Flag:** npx needs `-y` for auto-accept
4. **Enabled List:** Add to `enabledMcpjsonServers` in settings.json
5. **CLI Method:** Use `claude mcp add` command (easiest)

### The Process:

```bash
# Step 1: Add via CLI
claude mcp add gpt-image-1 --scope user -- npx -y @cloudwerxlab/gpt-image-1-mcp
claude mcp add nanobanana --scope user -- uvx nanobanana-mcp-server@latest

# Step 2: Add API keys (edit ~/.claude.json with jq or manually)
cat ~/.claude.json | jq '.mcpServers["gpt-image-1"].env = {"OPENAI_API_KEY": "sk-..."}' > /tmp/temp.json
mv /tmp/temp.json ~/.claude.json

# Step 3: Add to enabled list in ~/.claude/settings.json
# Add "gpt-image-1" and "nanobanana" to enabledMcpjsonServers array

# Step 4: Restart Claude Code

# Step 5: Verify
claude mcp list
```

---

## 📊 Test Results

### OpenAI Test

✅ **Tool:** `mcp__gpt-image-1__create_image`
✅ **Generated:** 1024x1024 PNG
✅ **Quality:** High
✅ **Time:** ~2-3 seconds (much faster than direct API!)
✅ **File:** Saved successfully

### Nanobanana Test

✅ **Tool:** `mcp__nanobanana__generate_image`
✅ **Generated:** 1024x1024 PNG
✅ **File Size:** 265KB (smaller than OpenAI)
✅ **Files API:** Uploaded to Gemini
✅ **Time:** ~2-3 seconds

---

## 🎯 Critical Updates Needed

### Update agent instructions.md:

**Change tool names from:**

```
mcp__gpt-image-1__generate_image  ❌
```

**To:**

```
mcp__gpt-image-1__create_image  ✅
```

**Nanobanana is correct:**

```
mcp__nanobanana__generate_image  ✅
```

### Update all workflows and templates:

- Use correct tool names
- Add proper parameters
- Remove Bash fallback as primary (MCP now works!)
- Keep Bash fallback as emergency backup only

---

## 📁 Output Locations

**OpenAI gpt-image-1:**

- Default: `/Users/sid/Pictures/gpt-image-1/gpt-images/`
- Custom: Set `GPT_IMAGE_OUTPUT_DIR` env variable

**Nanobanana:**

- Default: `/Users/sid/nanobanana-images/`
- Custom: Set `IMAGE_OUTPUT_DIR` env variable

**For Agent Use:**

- May need to copy/move images to agent's `outputs/` folder
- Or update agent to read from MCP default locations

---

## ✅ WORKING CONFIGURATION SUMMARY

**Files Modified:**

1. `~/.claude.json` - MCP server definitions
2. `~/.claude/settings.json` - Enabled servers list

**Servers Added:**

1. gpt-image-1 (OpenAI)
2. nanobanana (Gemini)

**Tools Available:**

1. `mcp__gpt-image-1__create_image`
2. `mcp__nanobanana__generate_image`

**Status:** ✅ FULLY FUNCTIONAL

**Next:** Update agent to use correct tool names!

---

_Configuration verified and tested: 2025-10-25_
