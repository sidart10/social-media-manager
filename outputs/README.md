# Outputs Directory

This directory contains generated content from various agents.

## Structure

```
outputs/
├── videos/           # Generated video content
│   └── YYYY-MM-DD/  # Videos organized by date
├── images/           # Generated images and graphics
│   └── YYYY-MM-DD/  # Images organized by date
└── posts/            # Generated social media posts
    └── YYYY-MM-DD/  # Posts organized by date
```

## Organization Guidelines

- All outputs are organized by creation date (YYYY-MM-DD format)
- Large media files (.mp4, .mov) are gitignored to save space
- Metadata files (.json) are kept for reproducibility
- Each agent may also maintain its own outputs in its sidecar directory

## Agent-Specific Outputs

Some agents maintain their own output directories:
- AI Video Agent: `bmad/agents/ai-video-agent/ai-video-agent-sidecar/outputs/`
- AI Image Generator: `bmad/agents/ai-image-generator/ai-image-generator-sidecar/outputs/`

Check agent documentation for specific output locations.
