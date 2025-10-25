# AI Image Generator Workflows

This folder contains workflow files that the agent uses to execute image generation commands.

## Workflow Files

Each workflow is a YAML file that defines the steps for a specific image generation task:

- `generate-carousel.yaml` - Create 2-10 image carousel sets
- `generate-single.yaml` - Generate a single optimized image
- `generate-batch.yaml` - Generate multiple variants of the same concept
- `generate-instagram.yaml` - Quick Instagram-optimized generation
- `generate-twitter.yaml` - Quick Twitter/X-optimized generation
- `generate-linkedin.yaml` - Quick LinkedIn-optimized generation

## Implementation Status

🚧 **Workflows are placeholders** - Ready for implementation when MCP servers are configured.

## How Workflows Work

Each workflow:
1. Loads platform specifications
2. Validates user input (prompt, count, style)
3. Calls appropriate MCP tool (gpt-image-1 or nanobanana)
4. Processes generated images
5. Creates captions and alt text
6. Saves to outputs folder
7. Returns metadata and paths

## Next Steps

To implement these workflows:
1. Install MCP servers (see `../ai-image-generator-sidecar/MCP_SETUP.md`)
2. Configure API keys in `../ai-image-generator-sidecar/config.yaml`
3. Implement workflow YAML files using BMAD workflow syntax
4. Test each workflow independently

## Workflow Structure Example

```yaml
name: generate-carousel
description: Generate 2-10 image carousel set

config_source: '{agent-folder}/ai-image-generator-sidecar/config.yaml'

instructions:
  - step: 1
    goal: Get user requirements
    actions:
      - Ask for platform (or use default)
      - Ask for image count (2-10)
      - Ask for prompt/description
      - Ask for style preferences

  - step: 2
    goal: Load specifications
    actions:
      - Load platform specs from sidecar
      - Determine aspect ratio and size
      - Select provider based on requirements

  - step: 3
    goal: Generate images
    actions:
      - Call MCP tool for each image
      - Apply diversity settings
      - Track progress

  - step: 4
    goal: Process outputs
    actions:
      - Save images to outputs folder
      - Generate captions
      - Create alt text
      - Save metadata

  - step: 5
    goal: Present results
    actions:
      - Show generated images
      - Display metadata
      - Offer next actions
```
