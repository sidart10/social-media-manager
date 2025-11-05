# Multi-Scene Video Workflows with Veotools

> Advanced patterns for creating cohesive multi-clip stories with frame seeding, transitions, and intelligent stitching

## Overview

Veotools excels at multi-scene video production through:

1. **Scene Planning** - Gemini-powered storyboard generation
2. **Frame Seeding** - Last frame of clip N → first frame of clip N+1
3. **Intelligent Stitching** - Audio-preserving FFmpeg pipeline
4. **Transition Management** - Crossfades and overlap control

---

## Frame Seeding Fundamentals

### What is Frame Seeding?

**Frame seeding** uses the final frame of one clip as the starting point for the next clip, creating **smooth visual continuity** between scenes.

```
Clip 1: [frames 0-191] → Extract frame 180 (at t=-0.25s)
                                ↓
Clip 2: Start from frame 180 → [frames 0-191 with smooth continuation]
```

### Why It Matters:

**Without frame seeding:**

```
Clip 1 ends: Character facing right ⎸ Clip 2 starts: Character facing left
                                     ↑
                            Jarring jump cut
```

**With frame seeding:**

```
Clip 1 ends: Character facing right → Clip 2 starts: Character facing right (same pose)
                                     ↑
                        Smooth continuation
```

### Seed Frame Offset:

**The offset determines which frame to extract**

```
Clip duration: 8 seconds (0.0s → 8.0s)
Offset: -0.25s

Extracted frame: 8.0 - 0.25 = 7.75 seconds

Why not the very last frame (8.0s)?
→ Last frame may be mid-motion blur
→ 0.25s before end is usually cleaner
→ Provides natural "lead-in" for next clip
```

**Recommended offsets:**

- **-0.25s**: Standard (recommended for most scenes)
- **-0.5s**: More continuity room (smoother transitions)
- **-0.1s**: Very tight continuity (risky if last frame has motion blur)
- **-1.0s**: Longer lead-in (for slow-paced scenes)

---

## Multi-Scene Patterns

### Pattern 1: Linear Story Progression

**Use case**: Tutorial, explainer, narrative story

```python
import veotools as veo

veo.init()

# Generate storyboard
plan = veo.generate_scene_plan(
    idea="How AI agents work - from input to output",
    number_of_scenes=5,
    additional_context="Educational, clear progression, technical aesthetic"
)

# Execute with frame seeding
result = veo.execute_scene_plan(
    plan,
    model="veo-3.0-generate-001",
    auto_seed_last_frame=True,  # Enable automatic seeding
    seed_frame_offset=-0.25,
    aspect_ratio="16:9"
)

# Result: 5 clips with smooth transitions
print(f"Final video: {result.final_result.path}")
```

**Storyboard Example:**

```json
{
  "scenes": [
    {
      "scene_number": 1,
      "description": "User types prompt into interface",
      "duration": 8
    },
    {
      "scene_number": 2,
      "description": "Prompt flows through processing pipeline",
      "duration": 8
    },
    {
      "scene_number": 3,
      "description": "AI model analyzes and generates response",
      "duration": 8
    },
    {
      "scene_number": 4,
      "description": "Response flows back through pipeline",
      "duration": 8
    },
    {
      "scene_number": 5,
      "description": "Final output displayed to user",
      "duration": 8
    }
  ]
}
```

**Frame Seeding Flow:**

```
Scene 1 (8s) → frame@7.75s → Scene 2 starts from this frame
Scene 2 (8s) → frame@7.75s → Scene 3 starts from this frame
Scene 3 (8s) → frame@7.75s → Scene 4 starts from this frame
Scene 4 (8s) → frame@7.75s → Scene 5 starts from this frame

Final: 40s video with 4 smooth transitions
```

---

### Pattern 2: Parallel Storylines

**Use case**: Compare/contrast, before/after, multiple perspectives

```python
# Generate two separate story plans
plan_a = veo.generate_scene_plan(
    idea="Day in life of developer",
    number_of_scenes=3
)

plan_b = veo.generate_scene_plan(
    idea="Day in life of designer",
    number_of_scenes=3
)

# Execute both
result_a = veo.execute_scene_plan(plan_a, auto_seed_last_frame=True)
result_b = veo.execute_scene_plan(plan_b, auto_seed_last_frame=True)

# Interleave clips
interleaved = [
    result_a.clip_results[0].path,
    result_b.clip_results[0].path,
    result_a.clip_results[1].path,
    result_b.clip_results[1].path,
    result_a.clip_results[2].path,
    result_b.clip_results[2].path
]

# Stitch alternating storylines
final = veo.stitch_videos(interleaved)
```

---

### Pattern 3: Branching Narratives

**Use case**: Decision trees, alternative endings, A/B variants

```python
# Main storyline
main_plan = veo.generate_scene_plan(
    idea="Product demo with decision point",
    number_of_scenes=3
)

# Generate main clips
main_result = veo.execute_scene_plan(main_plan)

# Extract seed from decision point (end of scene 2)
decision_frame = veo.extract_frame(
    main_result.clip_results[1].path,
    timestamp=7.75
)

# Generate two alternative endings from same seed
ending_a = veo.generate_from_image(
    prompt="User chooses option A, sees success result",
    image_path=decision_frame,
    model="veo-3.0-generate-001"
)

ending_b = veo.generate_from_image(
    prompt="User chooses option B, sees alternative result",
    image_path=decision_frame,
    model="veo-3.0-generate-001"
)

# Create two final versions
version_a = veo.stitch_videos([
    main_result.clip_results[0].path,
    main_result.clip_results[1].path,
    ending_a.path
])

version_b = veo.stitch_videos([
    main_result.clip_results[0].path,
    main_result.clip_results[1].path,
    ending_b.path
])
```

---

### Pattern 4: Loop/Cycle Structure

**Use case**: Continuous process, day cycle, infinite loop feel

```python
plan = veo.generate_scene_plan(
    idea="24-hour city life cycle",
    number_of_scenes=4,
    additional_context="End should visually connect back to beginning"
)

result = veo.execute_scene_plan(plan, auto_seed_last_frame=True)

# Check if last frame could transition back to first
last_frame = veo.extract_frame(
    result.clip_results[-1].path,
    timestamp=7.75
)

first_frame = veo.extract_frame(
    result.clip_results[0].path,
    timestamp=0.0
)

# If needed, generate transition clip
loop_transition = veo.generate_from_image(
    prompt="Smooth transition from night back to dawn",
    image_path=last_frame,
    model="veo-3.0-fast-generate-001"
)

# Stitch with loop
clips = [r.path for r in result.clip_results] + [loop_transition.path]
looping_video = veo.stitch_videos(clips)
```

---

## Advanced Stitching Techniques

### Technique 1: Crossfade Transitions

```python
result = veo.stitch_with_transitions(
    video_paths=["clip1.mp4", "clip2.mp4", "clip3.mp4"],
    transition_duration=0.5,  # 500ms crossfade
    transition_type="crossfade"
)
```

**Effect:**

```
Clip 1 [.........fade out]
               [fade in........] Clip 2
```

**When to use:**

- Dreamy/artistic aesthetic
- Time jumps
- Location changes
- Mood shifts

### Technique 2: Hard Cuts (No Transition)

```python
result = veo.stitch_videos(
    video_paths=["clip1.mp4", "clip2.mp4", "clip3.mp4"],
    preserve_audio=True
)
```

**Effect:**

```
Clip 1 [........|] Clip 2 [........|] Clip 3
```

**When to use:**

- Fast-paced content
- Frame seeding already creates continuity
- Documentary style
- Rhythm-driven editing

### Technique 3: Custom Overlap

```python
# Create transition points
transitions = veo.create_transition_points(
    video_paths=["clip1.mp4", "clip2.mp4", "clip3.mp4"],
    overlap_duration=0.25  # 250ms overlap
)

# Stitch with custom transitions
result = veo.stitch_with_transitions(
    video_paths=["clip1.mp4", "clip2.mp4", "clip3.mp4"],
    transition_points=transitions
)
```

---

## Scene Timing Strategies

### Strategy 1: Variable Duration

```python
from veotools import SceneWriter

writer = SceneWriter(idea="Product demo")

# Vary scene lengths for rhythm
writer.add_scene("Hook: Problem statement", duration=5)  # Quick intro
writer.add_scene("Show product in action", duration=10)  # Detailed demo
writer.add_scene("Key benefits", duration=6)  # Medium pace
writer.add_scene("Call to action", duration=4)  # Quick close

plan = writer.build()
```

### Strategy 2: Beat-Based Timing

```python
# Sync to music beats (assuming 120 BPM = 0.5s per beat)
BEAT = 0.5

writer.add_scene("Beat 1-16: Opening", duration=8*BEAT)  # 8 beats
writer.add_scene("Beat 17-24: Build", duration=4*BEAT)   # 4 beats
writer.add_scene("Beat 25-40: Climax", duration=8*BEAT)  # 8 beats
writer.add_scene("Beat 41-48: Outro", duration=4*BEAT)   # 4 beats
```

### Strategy 3: Golden Ratio

```python
# Use golden ratio for aesthetic timing
GOLDEN = 1.618

total_duration = 30  # seconds
intro = total_duration / (1 + GOLDEN)  # ~11.5s
main = total_duration - intro           # ~18.5s

writer.add_scene("Introduction", duration=int(intro))
writer.add_scene("Main content", duration=int(main))
```

---

## Quality Control Workflows

### Workflow 1: Iterative Refinement

```python
# Fast iteration on plan
plan = veo.generate_scene_plan(idea="Product demo", number_of_scenes=4)

# Quick test with fast model
test_result = veo.execute_scene_plan(
    plan,
    model="veo-3.0-fast-generate-001",  # ~60s per clip
    auto_seed_last_frame=True
)

# Review test output
# ... user reviews and approves ...

# Final render with high quality
final_result = veo.execute_scene_plan(
    plan,
    model="veo-3.0-generate-001",  # ~120s per clip, higher quality
    auto_seed_last_frame=True
)
```

### Workflow 2: Selective Re-rendering

```python
# Initial full render
result = veo.execute_scene_plan(plan)

# User identifies scene 3 needs improvement
# Re-generate only scene 3
improved_scene3 = veo.generate_from_text(
    prompt=plan.scenes[2].description + " with more dynamic camera movement",
    model="veo-3.0-generate-001"
)

# Re-stitch with improved scene
clips = [
    result.clip_results[0].path,
    result.clip_results[1].path,
    improved_scene3.path,  # Replaced
    result.clip_results[3].path
]

final = veo.stitch_videos(clips)
```

### Workflow 3: A/B Testing

```python
# Generate two variations of same story
variations = []

for i in range(2):
    plan = veo.generate_scene_plan(
        idea="Product demo",
        additional_context=f"Variation {i+1}"
    )
    result = veo.execute_scene_plan(plan)
    variations.append(result)

# Compare metrics
# - Viewer retention
# - Engagement rate
# - Conversion rate
```

---

## Production Best Practices

### 1. Storyboard Review Process

```python
# Generate plan
plan = veo.generate_scene_plan(idea="...", number_of_scenes=5)

# Save for review
import json
with open("storyboard.json", "w") as f:
    json.dump(plan.to_dict(), f, indent=2)

# Team reviews storyboard.json
# Make edits directly in JSON

# Load edited plan
with open("storyboard-approved.json") as f:
    approved_plan = veo.ScenePlan.from_dict(json.load(f))

# Execute approved plan
result = veo.execute_scene_plan(approved_plan)
```

### 2. Version Control for Storyboards

```
project/
├── storyboards/
│   ├── v1-initial.json
│   ├── v2-reviewed.json
│   └── v3-final.json
├── renders/
│   ├── v1/
│   ├── v2/
│   └── v3-final/
└── notes.md
```

### 3. Metadata Tracking

```python
import datetime

metadata = {
    "project": "Product Demo",
    "created_at": datetime.datetime.now().isoformat(),
    "storyboard_version": "v3",
    "model": "veo-3.0-generate-001",
    "scenes": len(result.clip_results),
    "total_duration": result.final_result.duration,
    "output_path": result.final_result.path,
    "notes": "Approved by marketing team"
}

with open("metadata.json", "w") as f:
    json.dump(metadata, f, indent=2)
```

### 4. Batch Processing Pipeline

```python
import os

projects = [
    {"idea": "Product A demo", "scenes": 4},
    {"idea": "Product B demo", "scenes": 5},
    {"idea": "Product C demo", "scenes": 3}
]

for project in projects:
    # Create project directory
    project_dir = f"renders/{project['idea'].replace(' ', '-')}"
    os.makedirs(project_dir, exist_ok=True)

    # Generate and execute
    plan = veo.generate_scene_plan(
        idea=project["idea"],
        number_of_scenes=project["scenes"]
    )

    result = veo.execute_scene_plan(
        plan,
        model="veo-3.0-generate-001",
        auto_seed_last_frame=True
    )

    # Move output to project directory
    import shutil
    shutil.move(result.final_result.path, f"{project_dir}/final.mp4")

    # Save storyboard
    with open(f"{project_dir}/storyboard.json", "w") as f:
        json.dump(plan.to_dict(), f, indent=2)
```

---

## Troubleshooting

### Issue: Jarring Transitions Despite Frame Seeding

**Symptoms:**

- Clips don't flow smoothly even with `auto_seed_last_frame=True`
- Visual discontinuity between scenes

**Solutions:**

1. **Adjust seed offset**: Try -0.5s instead of -0.25s

   ```python
   seed_frame_offset=-0.5
   ```

2. **Add transition overlap**:

   ```python
   veo.stitch_with_transitions(clips, transition_duration=0.3)
   ```

3. **Check motion blur**: Extract seed frame manually and verify it's clean
   ```python
   frame = veo.extract_frame(clip.path, timestamp=7.5)
   # Visually inspect frame before using
   ```

### Issue: Inconsistent Visual Style Across Scenes

**Symptoms:**

- Scene 1 looks different from Scene 2
- Lighting/color/mood shifts unexpectedly

**Solutions:**

1. **Add detailed style context**:

   ```python
   plan = veo.generate_scene_plan(
       idea="...",
       style="consistent cinematic look, warm lighting, golden hour aesthetic"
   )
   ```

2. **Use character descriptions**:
   ```python
   plan = veo.generate_scene_plan(
       idea="...",
       characters="Protagonist: male, 30s, blue jacket, determined expression"
   )
   ```

### Issue: Audio Desync After Stitching

**Symptoms:**

- Audio doesn't match video in final stitched output

**Solutions:**

1. **Ensure preserve_audio=True**:

   ```python
   veo.stitch_videos(clips, preserve_audio=True)
   ```

2. **Check input clips have audio**:

   ```python
   info = veo.get_video_info(clip.path)
   print(f"Has audio: {info.has_audio}")
   ```

3. **Force re-encode if needed**:
   ```python
   veo.stitch_videos(clips, re_encode=True)
   ```

---

## Advanced Examples

### Example 1: Documentary-Style Multi-Chapter Video

```python
chapters = [
    {"title": "Introduction", "scenes": 2},
    {"title": "Background", "scenes": 3},
    {"title": "The Problem", "scenes": 4},
    {"title": "The Solution", "scenes": 3},
    {"title": "Conclusion", "scenes": 2}
]

all_clips = []

for chapter in chapters:
    plan = veo.generate_scene_plan(
        idea=chapter["title"],
        number_of_scenes=chapter["scenes"],
        additional_context="Documentary style, professional narration"
    )

    result = veo.execute_scene_plan(
        plan,
        auto_seed_last_frame=True,
        stitch=False  # Don't stitch yet
    )

    all_clips.extend([c.path for c in result.clip_results])

# Final stitch of all chapters
final = veo.stitch_videos(all_clips)
```

### Example 2: Music Video with Beat Sync

```python
# Assuming 120 BPM track, 4/4 time
BPM = 120
BEAT_DURATION = 60 / BPM  # 0.5 seconds per beat

beats_per_scene = [8, 16, 8, 8, 16, 4]  # Scene durations in beats

from veotools import SceneWriter
writer = SceneWriter(idea="Energetic product showcase music video")

for i, beats in enumerate(beats_per_scene):
    duration = int(beats * BEAT_DURATION)
    writer.add_scene(
        description=f"Scene {i+1} matching musical phrase",
        duration=duration
    )

plan = writer.build()
result = veo.execute_scene_plan(plan, auto_seed_last_frame=True)
```

### Example 3: Comparison Video (Side-by-Side)

```python
# Generate two separate stories
before = veo.generate_scene_plan(idea="Before: Manual workflow", number_of_scenes=3)
after = veo.generate_scene_plan(idea="After: Automated workflow", number_of_scenes=3)

before_result = veo.execute_scene_plan(before)
after_result = veo.execute_scene_plan(after)

# Use FFmpeg to create side-by-side (requires custom FFmpeg command)
import subprocess

for i in range(len(before_result.clip_results)):
    subprocess.run([
        "ffmpeg",
        "-i", before_result.clip_results[i].path,
        "-i", after_result.clip_results[i].path,
        "-filter_complex", "[0:v][1:v]hstack=inputs=2[v]",
        "-map", "[v]",
        f"comparison_scene{i+1}.mp4"
    ])

# Stitch comparison scenes
comparison_clips = [f"comparison_scene{i+1}.mp4" for i in range(3)]
final = veo.stitch_videos(comparison_clips)
```

---

## Next Steps

- **CLI Reference**: See `cli-commands.md` for command-line workflows
- **Python SDK**: See `python-sdk.md` for complete API reference
- **Examples**: See `examples/` for working code samples
- **Main Skill**: See `../SKILL.md` for comprehensive veotools guide
