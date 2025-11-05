# Veotools Mastery Skill

> Complete production system for Google Veo video generation - from single clips to multi-scene stories

## What This Skill Covers

Veotools is a FULL VIDEO PRODUCTION SYSTEM that goes far beyond simple video generation:

### Three Interfaces:

1. **MCP Server** - Claude Code integration (what we use in AI Video Agent)
2. **CLI** - Command-line tools for workflows (`veo plan-run`, `veo generate`, etc.)
3. **Python SDK** - Full programmatic access for advanced automation

### Capabilities:

- **Single Clip Generation** - Text-to-video, image-to-video, video-to-video
- **Multi-Scene Stories** - Idea → Storyboard → Render → Stitch (complete pipeline)
- **Scene Planning** - Gemini-powered cinemat storyboards
- **Video Stitching** - FFmpeg-based audio-preserving concatenation
- **Frame Seeding** - Use last frame of clip A as first frame of clip B for smooth transitions
- **Transition Management** - Intelligent overlap and cross-fades
- **Storage Management** - Organized output structure with metadata tracking

## File Structure

```
veotools-mastery/
├── SKILL.md                    # Main skill file (comprehensive guide)
├── README.md                   # This file (overview)
├── reference/
│   ├── cli-commands.md        # CLI reference guide
│   ├── python-sdk.md          # Python API documentation
│   ├── mcp-integration.md     # MCP server usage
│   ├── multi-scene-workflows.md # Story generation patterns
│   └── examples/
│       ├── simple-clip.md
│       ├── multi-scene-story.md
│       └── frame-seeding.md
└── templates/
    ├── story-prompt.txt       # Template for story generation
    ├── scene-structure.json   # Scene plan format
    └── stitch-config.json     # Stitching configuration
```

## When to Use This Skill

Claude will load this skill when you:

- Mention "veotools"
- Ask to "animate a diagram"
- Request "multi-scene video"
- Want to "create a story video"
- Need to "stitch video clips"
- Talk about "frame seeding" or "video transitions"
- Ask about "Veo 3" video generation

## Quick Links

- **Main Guide**: See `SKILL.md` for complete veotools mastery
- **CLI Reference**: See `reference/cli-commands.md`
- **Python API**: See `reference/python-sdk.md`
- **Multi-Scene Workflows**: See `reference/multi-scene-workflows.md`

## External Resources

- **GitHub**: https://github.com/frontboat/veotools
- **PyPI**: https://pypi.org/project/veotools/
- **Google Veo**: https://deepmind.google/technologies/veo/3/

## Version

v1.0 - Initial comprehensive documentation of veotools full production system
