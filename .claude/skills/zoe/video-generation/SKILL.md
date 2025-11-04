---
name: video-generation
description: Universal video generation using fal-video execute_custom_model (PRIMARY) and HeyGen avatars (SPECIALIZED). Access to 22+ models via fal-video including Veo 3, Luma Ray 2, Kling Master, Pixverse, Imagen 4, FLUX Kontext, and more. Use for: animating diagrams (Veo 3, LTX), cinematic videos (Luma Ray 2, Kling), b-roll scenes (Veo 3, Pixverse), talking heads (HeyGen avatars), image-to-video animation, text-to-video generation. Supports aspect ratio optimization (16:9 YouTube, 9:16 Shorts/Reels), model selection based on use case, and Cloudinary upload integration. Replaces veotools-mastery with broader fal-video coverage.
---

# Video Generation - Universal Video Production Skill

> Expert guide for using fal-video execute_custom_model to access 22+ video and image generation models, plus HeyGen for specialized talking head avatars.

**PRIMARY TOOL:** fal-video MCP (mcp__fal-video__execute_custom_model)
**SPECIALIZED TOOL:** HeyGen MCP (for avatars only)

## When to Use Veotools

### Primary Use Cases:
1. **Image-to-Video Animation** (MOST COMMON)
   - Animate static diagrams for YouTube explanations
   - Bring technical architecture diagrams to life
   - Create animated workflow visualizations
   - Add motion to infographics and data visualizations
   - Sequential reveal animations for educational content

2. **Text-to-Video Generation**
   - Generate video scenes from detailed text prompts
   - Create b-roll footage for social media
   - Produce short video clips for presentations

3. **Technical Content Animation**
   - System architecture connections
   - Process flow progressions
   - Checklist reveals
   - Timeline animations
   - Data flow visualizations

### When NOT to Use Veotools:
- Talking head videos → Use HeyGen instead
- Cinematic storytelling → Use Sora 2 instead
- Long-form videos (>10s) → Veo is optimized for 5-8s clips
- Real-time video editing → Veo is for generation only

---

## Available Veo Models

### Veo 3.1 (Newest - 2025)
```
veo-3.1-generate-preview
```
- **Best for**: Highest quality, newest capabilities
- **Generation time**: ~120 seconds
- **Default duration**: 8 seconds
- **Supports**: Audio, advanced motion understanding
- **When to use**: Production-quality content, complex animations

```
veo-3.1-fast-generate-preview
```
- **Best for**: Quick iterations, testing prompts
- **Generation time**: ~60 seconds
- **Default duration**: 8 seconds
- **Supports**: Audio, same quality as standard but faster

### Veo 3.0 (Current Generation)
```
veo-3.0-generate-preview
```
- **Best for**: Balanced quality and speed
- **Generation time**: ~120 seconds
- **Default duration**: 8 seconds
- **Supports**: Audio enabled
- **When to use**: Standard production workflows

```
veo-3.0-fast-generate-preview
```
- **Best for**: Rapid prototyping
- **Generation time**: ~60 seconds
- **Default duration**: 8 seconds
- **Supports**: Audio enabled
- **When to use**: Testing multiple variations quickly

### Veo 2.0 (Legacy)
```
veo-2.0-generate-001
```
- **Best for**: Specific feature requirements
- **Generation time**: ~180 seconds (slower)
- **Default duration**: 5 seconds
- **Unique features**:
  - supports_duration: true (can customize length)
  - supports_enhance: true (quality enhancement)
  - supports_fps: true (frame rate control)
- **When to use**: When you need duration/fps customization

---

## Model Selection Guide

### Decision Tree:
```
Need custom duration/fps?
├─ YES → Use veo-2.0-generate-001
│   └─ Set duration: 5-10s, fps: 24-30
│
└─ NO → Need fastest generation?
    ├─ YES → Use veo-3.1-fast-generate-preview
    │   └─ 60s generation, 8s output
    │
    └─ NO → Need highest quality?
        ├─ YES → Use veo-3.1-generate-preview
        │   └─ 120s generation, cutting-edge quality
        │
        └─ Standard workflow?
            └─ Use veo-3.0-generate-preview
                └─ Proven, reliable, 120s generation
```

### Recommendations by Use Case:
- **YouTube diagram animations**: veo-3.0-generate-preview (16:9)
- **Social media clips**: veo-3.1-fast-generate-preview (9:16)
- **Rapid testing**: veo-3.1-fast-generate-preview
- **Production finals**: veo-3.1-generate-preview
- **Custom timing needs**: veo-2.0-generate-001

---

## Image-to-Video Animation

### The Veotools Specialty

**80% of veotools usage is image-to-video animation**

### Workflow:
1. Create static image (diagram, infographic, workflow)
2. Write detailed motion prompt describing desired animation
3. Specify aspect ratio matching image
4. Generate 8-second animated version

### Prompt Engineering for Image Animation:

#### Structure:
```
[Motion Description] | [Style & Aesthetics] | [Technical Specs]
```

#### Examples from Production:

**Example 1: Architecture Diagram**
```
Image: mcp_architecture_diagram.png
Prompt:
Sequential connection animation where central Claude Code node pulses
with warm orange glow (#C15F3C), then connecting lines elegantly extend
outward to surrounding MCP server nodes one by one, each MCP node
illuminating with its brand color (Gmail red, Slack aubergine, GitHub blue)
as connections reach them, finally outer system nodes light up creating
complete architecture visualization | Smooth gentle animation with
professional tech aesthetic, subtle glow effects on nodes, clean linear
progression from center outward | 16:9 aspect ratio, technical diagram
style, maintaining all text clarity and professional presentation quality
```

**Example 2: Workflow Visualization**
```
Image: skill_execution_flow.png
Prompt:
Sequential process flow animation where numbered stages light up one by
one from top to bottom, user input box pulses first, then orange Master
Agent node glows, skill boxes illuminate in parallel with their brand color
accent bars (red, aubergine, blue), then MCP nodes activate, system boxes
respond, and finally green success result appears | Professional enterprise
workflow visualization with clean sequential progression, smooth transitions
between stages, maintaining all text clarity and numbered sequence visibility
| 16:9 technical diagram for YouTube, data flow aesthetic
```

**Example 3: Checklist Animation**
```
Image: build_checklist.png
Prompt:
Subtle checklist animation where orange BUILD GUIDE header gently pulses,
each numbered item with empty checkbox subtly highlights in sequence from
1 to 5 suggesting progressive completion | Minimal professional motion
keeping all text perfectly crisp and readable, clean checklist aesthetic
suitable for persistent video overlay | Portrait 9:16 aspect ratio for
YouTube video sidebar, maintaining readability at smaller overlay size
```

### Prompt Best Practices:

#### DO:
- **Be specific about motion sequence**: "first X, then Y, finally Z"
- **Mention colors by hex code**: "#C15F3C" for brand consistency
- **Specify text preservation**: "maintaining all text clarity"
- **Describe progression**: "one by one", "sequential", "in parallel"
- **Include aesthetic goals**: "professional", "clean", "subtle"
- **State aspect ratio**: "16:9 for YouTube", "9:16 for Instagram"
- **Use temporal words**: "first", "then", "finally", "simultaneously"

#### DON'T:
- **Avoid vague motion**: ❌ "make it move" → ✅ "pulse gently then expand"
- **Skip text concerns**: Always mention text/readability
- **Forget brand colors**: Use specific hex codes
- **Omit aspect ratio**: Always specify platform format
- **Rush the description**: Detailed prompts = better results
- **Use camera movement terms**: Veo works with object motion, not camera pans

### Animation Types:

#### 1. Sequential Reveals
```
"Elements appear one by one from left to right"
"Stages light up in numbered sequence 1→2→3→4"
```

#### 2. Connection Animations
```
"Lines extend from center node to outer nodes"
"Data flows through pipeline from input to output"
```

#### 3. Pulsing/Highlighting
```
"Header gently pulses with orange glow"
"Active section highlights with subtle color shift"
```

#### 4. Parallel Activations
```
"All skill boxes illuminate simultaneously"
"Multiple branches activate in parallel"
```

#### 5. Progressive Builds
```
"Diagram assembles from components sequentially"
"Architecture builds layer by layer"
```

---

## Aspect Ratios & Platform Optimization

### Supported Formats:

#### 16:9 (Landscape - 1280x720)
```json
{
  "aspect_ratio": "16:9"
}
```
**Best for:**
- YouTube videos
- YouTube Shorts (landscape mode)
- Desktop presentations
- Educational content
- Tutorial overlays
- Webinars

**Output:** 1280px × 720px, 24fps, 8s

#### 9:16 (Portrait - 720x1280)
```json
{
  "aspect_ratio": "9:16"
}
```
**Best for:**
- Instagram Reels
- TikTok
- YouTube Shorts (vertical mode)
- Instagram Stories
- Mobile-first content

**Output:** 720px × 1280px, 24fps, 8s

### Platform Decision Matrix:

| Platform | Format | Model | Duration | Notes |
|----------|--------|-------|----------|-------|
| YouTube (main) | 16:9 | veo-3.0-generate-preview | 8s | Standard video player |
| YouTube Shorts | 9:16 | veo-3.1-fast-generate-preview | 8s | Vertical mobile |
| Instagram Reels | 9:16 | veo-3.1-fast-generate-preview | 8s | Auto-looping |
| TikTok | 9:16 | veo-3.1-fast-generate-preview | 8s | Short attention span |
| LinkedIn | 16:9 | veo-3.0-generate-preview | 8s | Professional aesthetic |
| Twitter/X | 9:16 | veo-3.1-fast-generate-preview | 8s | Mobile-first |

---

## Job Management & Async Operations

### Veotools Async Pattern:

#### Step 1: Start Generation
```javascript
{
  "kind": "image",  // or "text"
  "params": {
    "prompt": "Your detailed motion prompt",
    "model": "veo-3.0-generate-preview",
    "input_image_path": "/path/to/image.png",
    "options": {
      "aspect_ratio": "16:9"
    }
  }
}
```

**Returns:**
```json
{
  "job_id": "267c8942-0126-47c8-83bc-09c2ea27da96",
  "status": "pending",
  "created_at": 1761691725.3584828
}
```

#### Step 2: Poll Status
```javascript
// Check job status every 5-10 seconds
{
  "job_id": "267c8942-0126-47c8-83bc-09c2ea27da96"
}
```

**Response during processing:**
```json
{
  "job_id": "267c8942-0126-47c8-83bc-09c2ea27da96",
  "status": "processing",
  "progress": 45,
  "message": "Generating video...",
  "created_at": 1761691725.3584828,
  "updated_at": 1761691740.123456
}
```

**Response when complete:**
```json
{
  "job_id": "267c8942-0126-47c8-83bc-09c2ea27da96",
  "status": "complete",
  "progress": 100,
  "message": "Complete",
  "result": {
    "id": "755c5c67-69f9-4133-a6a3-41a70cc59adc",
    "path": "/path/to/video_755c5c67.mp4",
    "url": "file:///path/to/video_755c5c67.mp4",
    "metadata": {
      "fps": 24.0,
      "duration": 8.0,
      "width": 1280,
      "height": 720,
      "frame_count": 192
    }
  }
}
```

### Status Flow:
```
pending → processing → complete
                     → failed
```

### Managing Multiple Jobs:

**Track multiple generations simultaneously:**
```javascript
const jobs = [
  { id: "job-1", prompt: "Diagram 1 animation", status: "processing" },
  { id: "job-2", prompt: "Diagram 2 animation", status: "pending" },
  { id: "job-3", prompt: "Diagram 3 animation", status: "complete" }
];

// Poll all pending/processing jobs
jobs
  .filter(j => j.status !== 'complete')
  .forEach(j => checkJobStatus(j.id));
```

**Best practices:**
- Poll every 5-10 seconds (not faster, to avoid rate limits)
- Show progress to user: "Generating... 45%"
- Handle failures gracefully
- Store job metadata for tracking
- Deliver videos as each completes (don't wait for batch)

---

## Output Management

### File Locations:

**Default output structure:**
```
bmad/agents/ai-video-agent/ai-video-agent-sidecar/outputs/veotools/
├── videos/
│   ├── video_755c5c67.mp4
│   ├── video_9b099ea6.mp4
│   └── concat_list.txt
├── frames/
│   └── [extracted frames if needed]
├── temp/
│   └── [temporary processing files]
└── ops/
    ├── 267c8942-0126-47c8-83bc-09c2ea27da96.json
    └── models.json
```

**NEW REQUIREMENT (as of 2025-10-28):**
```
MANDATORY OUTPUT LOCATION:
{project-root}/outputs/{MM-DD-YYYY}/{session-name}/

Example:
outputs/10-28-2025/youtube-mac-setup-research/
├── videos/
│   ├── diagram1_animated.mp4
│   ├── diagram2_animated.mp4
│   └── metadata.json
└── assets/
    └── diagrams/
        ├── diagram1.png
        └── diagram2.png
```

### Metadata Preservation:

**Always save metadata JSON:**
```json
{
  "video_id": "755c5c67-69f9-4133-a6a3-41a70cc59adc",
  "job_id": "267c8942-0126-47c8-83bc-09c2ea27da96",
  "model": "veo-2.0-generate-001",
  "prompt": "[Image: asset8_build_checklist_FINAL.png] Subtle checklist animation...",
  "input_image": "asset8_build_checklist_FINAL.png",
  "aspect_ratio": "9:16",
  "duration": 8.0,
  "resolution": "720x1280",
  "fps": 24.0,
  "frame_count": 192,
  "generation_time_seconds": 34.5,
  "created_at": "2025-10-28T15:48:45.361046",
  "completed_at": "2025-10-28T15:49:19.953053",
  "output_path": "/path/to/video_755c5c67.mp4"
}
```

---

## Cost & Performance

### Estimated Costs:
- **Veo 3.1**: ~$0.30-0.50 per 8-second clip
- **Veo 3.0**: ~$0.20-0.40 per 8-second clip
- **Veo 2.0**: ~$0.15-0.30 per 5-second clip

*(Actual costs depend on Google AI pricing - verify current rates)*

### Generation Times:
- **veo-3.1-fast**: ~60 seconds
- **veo-3.0-fast**: ~60 seconds
- **veo-3.1-standard**: ~120 seconds
- **veo-3.0-standard**: ~120 seconds
- **veo-2.0**: ~180 seconds

### Optimization Tips:
1. **Use fast models for iterations**: Test prompts with -fast variants
2. **Batch similar jobs**: Generate all diagrams in one session
3. **Reuse successful prompts**: Save working patterns
4. **Start with lower quality**: Proof concept, then regenerate final
5. **Track costs**: Log generation count and estimate budget

---

## Integration with AI Video Agent

### Workflow Position:

```
AI Video Agent Decision Tree:
├─ Talking head? → HeyGen
├─ Cinematic story? → Sora 2
└─ Animated diagram? → Veotools ✓
    ├─ Have static image? → Image-to-video
    └─ Need generated scene? → Text-to-video
```

### When AI Video Agent Should Route to Veotools:

**Trigger phrases:**
- "animate this diagram"
- "bring this workflow to life"
- "add motion to this image"
- "make this infographic dynamic"
- "create animated version of [image]"
- "sequential reveal animation"
- "process flow animation"

**NOT veotools:**
- "talking head video" → HeyGen
- "cinematic b-roll" → Sora 2
- "avatar presentation" → HeyGen
- "story-driven video" → Sora 2

---

## Common Patterns & Templates

### Pattern 1: Sequential Node Activation
```
[Central element] pulses/glows, then [connections/lines] extend to
[surrounding elements], each [element] lights up as connections reach
them | [Style description] | [Aspect ratio] for [platform]
```

### Pattern 2: Top-to-Bottom Flow
```
[Starting element] activates first, then [flow/progression] moves
downward through [intermediate stages], finally [end result] appears |
[Animation style] | [Technical requirements]
```

### Pattern 3: Parallel Reveals
```
[Multiple elements] illuminate simultaneously, each with [unique
characteristic], creating [overall effect] | [Aesthetic guidance] |
[Platform optimization]
```

### Pattern 4: Checklist Progression
```
[Header/title] pulses gently, [list items] highlight in sequence from
[start] to [end], suggesting [completion/progress] | [Motion intensity] |
[Aspect ratio and placement]
```

---

## Troubleshooting

### Common Issues:

#### Text Becoming Unreadable:
**Problem**: Animation blurs or distorts text
**Solution**: Add "maintaining all text clarity" or "keeping text perfectly crisp" to prompt

#### Wrong Aspect Ratio:
**Problem**: Video is squashed or stretched
**Solution**: Always specify `"aspect_ratio": "16:9"` or `"9:16"` in options

#### Motion Too Subtle/Strong:
**Problem**: Animation barely visible or too distracting
**Solution**: Adjust motion descriptors:
- Too subtle → "pronounced", "clear", "obvious"
- Too strong → "subtle", "gentle", "minimal"

#### Job Stuck in Processing:
**Problem**: Status stays "processing" for >5 minutes
**Solution**:
1. Check remote_operation_id in job metadata
2. Wait up to 10 minutes for complex animations
3. If stuck >10min, cancel and retry with simpler prompt

#### Generation Failed:
**Problem**: Status becomes "failed"
**Solution**:
1. Check error_message in job metadata
2. Common fixes:
   - Image too large → Resize to <2MB
   - Prompt too long → Simplify description
   - Invalid aspect ratio → Use only "16:9" or "9:16"
   - Model unavailable → Try different Veo version

---

## Best Practices Summary

### ✅ DO:
1. **Write detailed motion prompts** with temporal sequence
2. **Specify hex colors** for brand consistency
3. **Mention text preservation** explicitly
4. **Choose aspect ratio** based on platform
5. **Use fast models** for testing iterations
6. **Save metadata** with every generation
7. **Poll status** every 5-10 seconds
8. **Track job IDs** for multi-generation sessions

### ❌ DON'T:
1. **Skip aspect ratio** specification
2. **Use vague motion terms** like "make it cool"
3. **Forget about text clarity** in animations
4. **Over-poll** status (< 5 second intervals)
5. **Use for talking heads** (that's HeyGen's job)
6. **Expect >10 second clips** (Veo is optimized for 5-8s)
7. **Strip metadata** from generated videos

---

## Quick Reference

### Model Quick Pick:
- **Fast iteration** → veo-3.1-fast-generate-preview
- **Production quality** → veo-3.1-generate-preview
- **Custom duration** → veo-2.0-generate-001
- **Proven reliable** → veo-3.0-generate-preview

### Aspect Ratio Quick Pick:
- **YouTube main** → 16:9
- **Instagram/TikTok** → 9:16
- **LinkedIn** → 16:9
- **Twitter/X** → 9:16

### Prompt Template:
```
[Sequential motion description with temporal markers] |
[Style/aesthetic/professional requirements] |
[Technical specs: aspect ratio, platform, quality level]
```

### Job Status Check:
```javascript
Poll every 5-10 seconds
Expected time: 60-180s depending on model
Status: pending → processing → complete
```

---

## Related Skills & Tools

### Complementary Skills:
- **ai-image-generator** skills - Create static diagrams BEFORE animating
- **youtube-thumbnail-mastery** - Thumbnail psychology for video covers
- **platform-specs** - Video format requirements per platform

### Complementary MCP Tools:
- **mcp__heygen__** - For talking head videos
- **mcp__sora2__** - For cinematic b-roll
- **mcp__veo3__** - Alternative Veo implementation (if available)

### When to Combine:
1. Generate diagram with ai-image-generator
2. Animate with veotools
3. Combine with HeyGen talking head for explainer video
4. Add to YouTube with optimized thumbnail

---

## References

### Example Operations:
See `bmad/agents/ai-video-agent/ai-video-agent-sidecar/outputs/veotools/ops/` for real production examples:
- Architecture diagram animations
- Workflow visualizations
- Checklist progressions
- Technical diagram reveals

### Model Capabilities:
See `outputs/veotools/ops/models.json` for complete model list and capability matrix

### Output Examples:
See `outputs/veotools/videos/` for generated video examples

---

## Version History
- **v1.0** (2025-10-28): Initial comprehensive veotools mastery skill
  - Complete model guide (Veo 2.0/3.0/3.1)
  - Image-to-video animation patterns
  - Async job management
  - Platform optimization
  - Production examples integration
