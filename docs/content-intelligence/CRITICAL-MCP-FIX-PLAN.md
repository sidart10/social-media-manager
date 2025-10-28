# CRITICAL: MCP Fix Plan - Remove Fictional Dependencies

**Issue:** Workflows reference **script_generation_mcp** which DOES NOT EXIST

**Impact:** BLOCKS 4/7 workflows (57% of Jarvis)

---

## 🚨 THE REAL PROBLEM

### Fictional MCP Server: script_generation_mcp

**What workflows think it does:**

- `script_generate(topic, keywords)` - Generate scripts
- `add_note(name, content)` - Store research notes
- `summarize_notes(style)` - Aggregate notes

**Reality:** This MCP server **DOES NOT EXIST**

- Not in npm registry ✗
- Not on GitHub ✗
- Not in MCP marketplace ✗
- Completely made up by the other agent ✗

**Workflows affected:**

1. research-topic (uses add_note, summarize_notes)
2. generate-ideas (uses add_note, summarize_notes, script_generate)
3. write-posts (uses script_generate, add_note)
4. write-scripts (uses script_generate, add_note)

---

## ✅ WORKING MCP SERVERS

**Currently Connected:**

- ✅ apify (HTTP) - ALL platform scraping
- ✅ youtube-transcript - Video transcripts
- ✅ exa - Deep research

**Fixable:**

- ⏳ social-media-mcp - Being installed now

---

## 🔧 FIX STRATEGY

### Phase 1: Remove Fictional script_generation_mcp (30 min)

**Replace with NATIVE Claude capabilities:**

#### For Note-Taking (add_note, summarize_notes):

```xml
<!-- OLD (fictional MCP) -->
<action>Tool: script_generation_mcp/add_note</action>
<action>Parameters: name="trends", content={findings}</action>

<!-- NEW (native file operations) -->
<action>Create note file: {sessions_folder}/notes-{topic}-{date}.md</action>
<action>Append finding to file with category header</action>
```

#### For Script Generation (script_generate):

```xml
<!-- OLD (fictional MCP) -->
<action>Tool: script_generation_mcp/script_generate</action>
<action>Parameters: topic={topic}, keywords={keywords}</action>

<!-- NEW (native Claude generation) -->
<action>Generate content using Claude's native capabilities:</action>
<action>Prompt: "Create {platform} content for {topic} with these parameters:
  - Keywords: {keywords}
  - Style: {style}
  - Tone: {tone}
  - Length: {target_length}
  - Voice profile: {voice_characteristics}
"</action>
```

**Benefits:**

- ✅ No external dependencies
- ✅ Works immediately
- ✅ Claude is excellent at content generation
- ✅ More control over output
- ✅ No MCP connection issues

---

### Phase 2: Fix social-media-mcp (20 min)

**Currently:** Installed but not connecting

**Steps:**

1. ✅ Cloned repo
2. ✅ npm install complete
3. ✅ npm run build complete
4. ✅ Moved to /Users/sid/.mcp-servers/social-media-mcp
5. ✅ Configured in .claude.json with API keys
6. ⏳ Testing connection

**API Keys Available:**

- ✅ OPENAI_API_KEY
- ✅ ANTHROPIC_API_KEY
- ✅ BRAVE_API_KEY

**Test command:**

```bash
node /Users/sid/.mcp-servers/social-media-mcp/build/index.js
```

**If working, provides:**

- `get_trending_topics` - Get trends by platform
- `research_topic` - Research with Brave + Perplexity

---

## 📋 WORKFLOW MODIFICATIONS NEEDED

### 1. research-topic/instructions.md

**Remove:**

```xml
<action>Tool: script_generation_mcp/add_note</action>
<action>Tool: script_generation_mcp/summarize_notes</action>
```

**Replace with:**

```xml
<action>Maintain research notes in session variable {research_notes}</action>
<action>Write notes to file: {sessions_folder}/research-notes-{topic}-{date}.md</action>
<action>Organize notes by category (trends, data, examples, quotes, gaps)</action>
```

---

### 2. generate-ideas/instructions.md

**Remove:**

```xml
<action>script_generation_mcp.add_note(name="trends", content)</action>
<action>script_generation_mcp.summarize_notes(style="detailed")</action>
```

**Replace with:**

```xml
<action>Store findings in structured markdown file</action>
<action>Aggregate all findings into synthesis section</action>
```

---

### 3. write-posts/instructions.md

**Remove:**

```xml
<action>Tool: script_generation_mcp/script_generate</action>
<action>Parameters: topic={topic}, keywords={keywords}</action>
```

**Replace with:**

```xml
<action>Generate base content using Claude:</action>
<action>Context:
  - Topic: {idea_card.title}
  - Keywords: {idea_card.hashtags}
  - Style: {idea_card.style}
  - Tone: {voice_profile.tone_description}
  - Platform: {target_platform}
  - Outline: {idea_card.outline}
  - Evidence: {idea_card.evidence_items}
</action>

<action>Create {platform}-optimized post:
  - Match voice profile (vocabulary, sentence structure, tone)
  - Incorporate outline beats
  - Inject evidence naturally
  - Format for platform specs
  - Apply signature phrases
</action>
```

---

### 4. write-scripts/instructions.md

**Same replacement as write-posts but for video scripts**

---

## ⏱️ TIME ESTIMATE

| Task                                             | Time   | Status      |
| ------------------------------------------------ | ------ | ----------- |
| Remove script_generation_mcp from research-topic | 10 min | Pending     |
| Remove script_generation_mcp from generate-ideas | 10 min | Pending     |
| Remove script_generation_mcp from write-posts    | 15 min | Pending     |
| Remove script_generation_mcp from write-scripts  | 15 min | Pending     |
| Test social-media-mcp connection                 | 10 min | In progress |
| Test all workflows                               | 30 min | Pending     |

**Total:** ~90 min to fully functional Jarvis

---

## 🎯 WHAT YOU NEED TO DO

**Option 1: Let Me Fix Everything** (Recommended)

- I'll remove all script_generation_mcp references
- I'll replace with native Claude capabilities
- I'll test social-media-mcp
- Result: Working agent in 1.5 hours

**Option 2: Debug social-media-mcp First**

- You check why it's not connecting
- Look at error output
- Fix configuration
- Then I'll remove fictional MCPs

---

**Should I proceed with Option 1 and fix all the workflows now?**

This will make Jarvis 100% functional with real MCPs only (no fictional dependencies).
