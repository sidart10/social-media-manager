# Veotools Python SDK Reference

> Programmatic access to the complete veotools production system

## Installation

```python
# Basic installation
pip install veotools

# With MCP server support
pip install "veotools[mcp]"
```

## Initialization

```python
import veotools as veo

# Initialize (sets up logging, validates API key)
veo.init()

# Custom logging level
veo.init(log_level="DEBUG")

# Custom output directory
veo.init(output_dir="/custom/path")
```

---

## Core Functions

### 1. Scene Planning

#### `generate_scene_plan()`

**Generate Gemini-powered storyboard**

```python
plan = veo.generate_scene_plan(
    idea="N64 Japanese retro explainer about the x402 protocol",
    number_of_scenes=4,
    additional_context="Keep the tone energetic and educational",
    style="cinematic retro aesthetic",
    characters="Consistent protagonist with blue jacket"
)

print(f"Generated {len(plan.scenes)} scenes")
for scene in plan.scenes:
    print(f"Scene {scene.scene_number}: {scene.description}")
```

**Parameters:**

- `idea` (str, required): Story concept/description
- `number_of_scenes` (int, default=4): Number of scenes to generate
- `additional_context` (str, optional): Creative direction
- `style` (str, optional): Visual style guidance
- `characters` (str, optional): Character descriptions for consistency

**Returns:** `ScenePlan` object

```python
class ScenePlan:
    idea: str
    style: str
    scenes: List[Scene]

class Scene:
    scene_number: int
    description: str
    duration: int
    camera_movement: str
    mood: str
    audio_notes: str
```

#### `SceneWriter` Class

**Build storyboards programmatically**

```python
from veotools import SceneWriter

writer = SceneWriter(idea="Product demo video")

# Add scenes
writer.add_scene(
    description="Close-up of product with dramatic lighting",
    duration=8,
    camera_movement="slow zoom in",
    mood="professional, sleek"
)

writer.add_scene(
    description="Product in use, hands interacting naturally",
    duration=8,
    camera_movement="steady shot",
    mood="relatable, everyday"
)

# Build plan
plan = writer.build()

# Save to JSON
writer.save("product-demo-plan.json")
```

---

### 2. Plan Execution

#### `execute_scene_plan()`

**Render clips and stitch from storyboard**

```python
result = veo.execute_scene_plan(
    plan,
    model="veo-3.0-generate-001",
    auto_seed_last_frame=True,
    seed_frame_offset=-0.25,
    aspect_ratio="16:9",
    stitch=True
)

# Access results
print(f"Rendered {len(result.clip_results)} clips")
for clip in result.clip_results:
    print(f" - {clip.path} ({clip.duration}s)")

if result.final_result:
    print(f"Final stitched video: {result.final_result.path}")
```

**Parameters:**

- `plan` (ScenePlan, required): Storyboard to execute
- `model` (str, default="veo-3.0-generate-001"): Veo model
- `auto_seed_last_frame` (bool, default=False): Enable frame seeding
- `seed_frame_offset` (float, default=-0.25): Seed extraction offset (seconds)
- `aspect_ratio` (str, default="16:9"): Video format
- `stitch` (bool, default=True): Stitch clips into final video
- `scene_indices` (List[int], optional): Render specific scenes only

**Returns:** `PlanExecutionResult` object

```python
class PlanExecutionResult:
    clip_results: List[ClipResult]
    final_result: StitchResult | None

class ClipResult:
    scene_number: int
    path: str
    duration: float
    metadata: dict
```

---

### 3. Single Clip Generation

#### `generate_from_text()`

**Text-to-video generation**

```python
result = veo.generate_from_text(
    prompt="Sunset over cyberpunk cityscape with neon reflections",
    model="veo-3.0-generate-001",
    aspect_ratio="16:9",
    output_path="sunset-clip.mp4",
    person_generation="allow_all"
)

print(f"Video saved to: {result.path}")
print(f"Duration: {result.duration}s")
print(f"Resolution: {result.width}x{result.height}")
```

**Parameters:**

- `prompt` (str, required): Scene/motion description
- `model` (str, default="veo-3.0-generate-001"): Veo model
- `aspect_ratio` (str, default="16:9"): 16:9 or 9:16
- `output_path` (str, optional): Custom save location
- `person_generation` (str, default="allow_all"): allow_all | allow_adult | disallow
- `negative_prompt` (str, optional): What to avoid

**Returns:** `VideoResult` object

#### `generate_from_image()`

**Image-to-video animation**

```python
result = veo.generate_from_image(
    prompt="Diagram elements light up sequentially from left to right",
    image_path="architecture-diagram.png",
    model="veo-3.0-generate-001",
    aspect_ratio="16:9",
    output_path="diagram-animated.mp4"
)
```

**Parameters:**

- `prompt` (str, required): Motion/animation description
- `image_path` (str, required): Path to input image
- `model` (str, default="veo-3.0-generate-001"): Veo model
- `aspect_ratio` (str, default="16:9"): Video format
- `output_path` (str, optional): Custom save location
- `person_generation` (str, default="allow_adult"): Generation policy

#### `generate_from_video()`

**Video-to-video continuation**

```python
result = veo.generate_from_video(
    prompt="Character continues walking forward and turns to camera",
    video_path="scene1.mp4",
    model="veo-3.0-generate-001",
    output_path="scene2.mp4"
)
```

**Parameters:**

- `prompt` (str, required): Continuation description
- `video_path` (str, required): Path to input video
- `model` (str, default="veo-3.0-generate-001"): Veo model
- `output_path` (str, optional): Custom save location

---

### 4. Media Analysis

#### `extract_frame()`

**Extract single frame from video**

```python
frame_path = veo.extract_frame(
    video_path="scene1.mp4",
    timestamp=7.5,  # seconds
    output_path="seed-frame.png"
)

print(f"Frame extracted to: {frame_path}")
```

#### `extract_frames()`

**Extract multiple frames**

```python
frame_paths = veo.extract_frames(
    video_path="scene1.mp4",
    timestamps=[0.0, 2.5, 5.0, 7.5],
    output_dir="frames/"
)

for i, path in enumerate(frame_paths):
    print(f"Frame {i}: {path}")
```

#### `get_video_info()`

**Get video metadata**

```python
info = veo.get_video_info("scene1.mp4")

print(f"Duration: {info.duration}s")
print(f"Resolution: {info.width}x{info.height}")
print(f"FPS: {info.fps}")
print(f"Frame count: {info.frame_count}")
```

**Returns:** `VideoInfo` object

```python
class VideoInfo:
    duration: float
    width: int
    height: int
    fps: float
    frame_count: int
    codec: str
    format: str
```

---

### 5. Video Stitching

#### `stitch_videos()`

**Concatenate clips with audio preservation**

```python
result = veo.stitch_videos(
    video_paths=["clip1.mp4", "clip2.mp4", "clip3.mp4"],
    output_path="final.mp4",
    preserve_audio=True
)

print(f"Stitched video: {result.path}")
print(f"Total duration: {result.duration}s")
```

**Parameters:**

- `video_paths` (List[str], required): Clips to concatenate (in order)
- `output_path` (str, optional): Custom save location
- `preserve_audio` (bool, default=True): Maintain audio tracks
- `re_encode` (bool, default=False): Force re-encoding (slower but safer)

#### `stitch_with_transitions()`

**Add cross-fade transitions between clips**

```python
result = veo.stitch_with_transitions(
    video_paths=["clip1.mp4", "clip2.mp4", "clip3.mp4"],
    transition_duration=0.5,  # seconds
    transition_type="crossfade",
    output_path="final-with-transitions.mp4"
)
```

**Parameters:**

- `transition_duration` (float, default=0.5): Transition length in seconds
- `transition_type` (str, default="crossfade"): crossfade | fade | wipe

#### `create_transition_points()`

**Plan intelligent transition points**

```python
transitions = veo.create_transition_points(
    video_paths=["clip1.mp4", "clip2.mp4", "clip3.mp4"],
    overlap_duration=0.25
)

for t in transitions:
    print(f"Transition at {t.timestamp}s: {t.type}")
```

---

### 6. Bridge API (Fluent Workflow)

**Chain operations fluently**

```python
from veotools import Bridge

story = (Bridge()
    .idea("Day in the life of an AI agent")
    .scenes(5)
    .style("cinematic documentary")
    .model("veo-3.0-generate-001")
    .aspect_ratio("16:9")
    .seed_last_frame()
    .execute()
)

print(f"Final video: {story.final_result.path}")
```

**Bridge Methods:**

- `.idea(text)` - Set story concept
- `.scenes(count)` - Number of scenes
- `.style(text)` - Visual style
- `.context(text)` - Additional guidance
- `.model(name)` - Veo model
- `.aspect_ratio(ratio)` - Video format
- `.seed_last_frame()` - Enable frame seeding
- `.seed_offset(seconds)` - Seed extraction offset
- `.execute()` - Run complete pipeline

**Example with custom scenes:**

```python
story = (Bridge()
    .add_scene("Opening shot of futuristic city", duration=8)
    .add_scene("Character walks through neon streets", duration=8)
    .add_scene("Close-up of character's determined face", duration=6)
    .model("veo-3.0-fast-generate-001")
    .execute()
)
```

---

## Advanced Patterns

### Pattern 1: Iterative Scene Development

```python
import veotools as veo

veo.init()

# Fast iteration
test_result = veo.generate_from_text(
    prompt="Product hero shot with dramatic lighting",
    model="veo-3.0-fast-generate-001"
)

# Review, refine prompt
final_result = veo.generate_from_text(
    prompt="Product hero shot with dramatic side lighting and slow zoom",
    model="veo-3.0-generate-001"
)
```

### Pattern 2: Custom Storyboard Editing

```python
# Generate initial plan
plan = veo.generate_scene_plan(
    idea="Product demo",
    number_of_scenes=4
)

# Manually edit scenes
plan.scenes[0].description = "Improved opening shot description"
plan.scenes[2].duration = 10  # Extend key scene

# Execute edited plan
result = veo.execute_scene_plan(plan, auto_seed_last_frame=True)
```

### Pattern 3: Selective Re-rendering

```python
# Execute full plan
initial_result = veo.execute_scene_plan(plan)

# Re-generate scene 3 at higher quality
scene3_result = veo.generate_from_text(
    prompt=plan.scenes[2].description,
    model="veo-3.0-generate-001"
)

# Re-stitch with new scene
video_paths = [
    initial_result.clip_results[0].path,
    initial_result.clip_results[1].path,
    scene3_result.path,  # Replaced scene 3
    initial_result.clip_results[3].path
]

final = veo.stitch_videos(video_paths)
```

### Pattern 4: Frame Seeding Control

```python
# Generate first clip
clip1 = veo.generate_from_text(
    prompt="Character enters frame from left",
    model="veo-3.0-generate-001"
)

# Extract custom seed frame
seed_frame = veo.extract_frame(
    clip1.path,
    timestamp=6.0,  # Custom timing, not last frame
    output_path="custom-seed.png"
)

# Generate continuation with custom seed
clip2 = veo.generate_from_image(
    prompt="Character continues walking and looks at camera",
    image_path=seed_frame,
    model="veo-3.0-generate-001"
)

# Stitch
final = veo.stitch_videos([clip1.path, clip2.path])
```

### Pattern 5: Batch Processing

```python
ideas = [
    "Tutorial about AI agents",
    "Product demo for smartphone",
    "Behind-the-scenes office tour"
]

results = []

for idea in ideas:
    plan = veo.generate_scene_plan(idea, number_of_scenes=4)
    result = veo.execute_scene_plan(
        plan,
        model="veo-3.0-fast-generate-001",
        auto_seed_last_frame=True
    )
    results.append(result)

print(f"Generated {len(results)} videos")
for i, r in enumerate(results):
    print(f"{i+1}. {r.final_result.path}")
```

---

## Error Handling

```python
import veotools as veo
from veotools.exceptions import (
    VeoGenerationError,
    VeoAPIError,
    VeoStitchingError
)

try:
    result = veo.generate_from_text(
        prompt="Complex scene description",
        model="veo-3.0-generate-001"
    )
except VeoGenerationError as e:
    print(f"Generation failed: {e.message}")
    print(f"Error code: {e.error_code}")
except VeoAPIError as e:
    print(f"API error: {e.status_code} - {e.message}")
except Exception as e:
    print(f"Unexpected error: {e}")
```

---

## Configuration

### Environment Variables

```python
import os

# Set API key
os.environ["GEMINI_API_KEY"] = "your-key-here"

# Set provider
os.environ["VEO_PROVIDER"] = "google"  # or "daydreams"

# Set custom output directory
os.environ["VEO_OUTPUT_DIR"] = "/custom/path"
```

### Programmatic Configuration

```python
import veotools as veo

# Initialize with custom settings
veo.init(
    api_key="your-key-here",
    output_dir="/custom/path",
    log_level="DEBUG",
    provider="google"
)

# Access storage manager
storage = veo.get_storage_manager()
print(f"Output directory: {storage.base_dir}")
print(f"Videos: {storage.videos_dir}")
print(f"Frames: {storage.frames_dir}")
```

---

## Utility Functions

### Model Management

```python
# List available models
models = veo.list_models(include_remote=True)

for model in models:
    print(f"{model.id}:")
    print(f"  Name: {model.name}")
    print(f"  Capabilities: {model.capabilities}")
    print(f"  Generation time: ~{model.generation_time}s")
```

### Storage Management

```python
from veotools import StorageManager

storage = StorageManager(base_dir="/custom/path")

# Get organized paths
video_path = storage.get_video_path("my-clip.mp4")
frame_path = storage.get_frame_path("seed-frame.png")
ops_path = storage.get_ops_path("job_123.json")

# List files
videos = storage.list_videos()
frames = storage.list_frames()
```

---

## Testing & Development

### Mock Generation (for testing)

```python
import veotools as veo

# Enable test mode (no actual API calls)
veo.init(test_mode=True)

# Returns mock results
result = veo.generate_from_text(
    prompt="Test scene",
    model="veo-3.0-generate-001"
)

print(f"Mock video: {result.path}")  # Points to test fixture
```

### Logging

```python
import logging
import veotools as veo

# Enable debug logging
veo.init(log_level="DEBUG")

# Custom logger
logger = logging.getLogger("veotools")
logger.setLevel(logging.INFO)
```

---

## Complete Example

```python
import veotools as veo

# Initialize
veo.init()

# Generate storyboard
plan = veo.generate_scene_plan(
    idea="AI agent learns to code",
    number_of_scenes=5,
    additional_context="Educational, inspiring, fast-paced"
)

# Review and edit
print("Storyboard:")
for scene in plan.scenes:
    print(f"{scene.scene_number}. {scene.description}")

# Execute with frame seeding
result = veo.execute_scene_plan(
    plan,
    model="veo-3.0-generate-001",
    auto_seed_last_frame=True,
    seed_frame_offset=-0.25,
    aspect_ratio="16:9"
)

# Output results
print(f"\nRendered {len(result.clip_results)} clips:")
for clip in result.clip_results:
    print(f" - Scene {clip.scene_number}: {clip.path}")

print(f"\nFinal video: {result.final_result.path}")
print(f"Total duration: {result.final_result.duration}s")
```

---

## Next Steps

- **CLI Commands**: See `reference/cli-commands.md` for command-line workflows
- **Multi-Scene Workflows**: See `reference/multi-scene-workflows.md` for advanced patterns
- **MCP Integration**: See `reference/mcp-integration.md` for Claude Code usage
- **Examples**: See `reference/examples/` for complete code samples
