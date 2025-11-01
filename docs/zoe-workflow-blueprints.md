# Zoe Video Workflow Blueprints - Detailed Implementation Designs

**Generated:** 2025-11-01
**Purpose:** Concrete workflow designs for each tool combination
**Status:** Ready for Review & Implementation

---

## 📐 Blueprint Anatomy

Each blueprint includes:
- **Workflow diagram** (visual flow)
- **Step-by-step implementation** (YAML-ready)
- **File management** (inputs/outputs)
- **Error handling** (what can go wrong)
- **Cost/time estimates** (realistic projections)
- **Real-world example** (concrete scenario)

---

## 🎬 Blueprint #1: SubMagic Only - "The Polish Master"

### Use Case
User has raw video footage → needs professional editing with captions

### Workflow Diagram
```
┌──────────────┐
│ User Input   │
│ - Video URL  │
│ - Platform   │
│ - Style      │
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│ SubMagic MCP             │
│ 1. List templates        │
│ 2. Create project        │
│    - Add captions        │
│    - Magic zooms         │
│    - B-rolls             │
│    - Remove silence      │
│ 3. Poll status           │
│ 4. Export video          │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Output Management        │
│ - Download video         │
│ - Save to outputs/       │
│ - Generate metadata      │
└──────────────────────────┘
```

### YAML Implementation

```yaml
name: edit-video-submagic
description: "Edit raw video with AI captions, zooms, and B-rolls"
version: 1.0.0
template: false
instructions: "{installed_path}/instructions.md"

# Configuration
config_source: "{agent-folder}/zoe-sidecar/config.yaml"
output_folder: "{outputs_base}/{date}-{project-slug}/04-media/videos"

# Variables
variables:
  video_url: ""
  platform: ""
  template_name: "Sara"
  custom_theme_id: ""
  editing_style: "balanced"  # conservative | balanced | aggressive

# Workflow Steps
steps:
  - step: 1
    name: "Gather Requirements"
    actions:
      - action: "ask_user"
        question: "What's the URL of your video to edit?"
        store_as: "video_url"

      - action: "ask_user"
        question: "Which platform is this for?"
        options: ["tiktok", "instagram", "youtube", "linkedin"]
        store_as: "platform"

      - action: "ask_user"
        question: "Do you have a custom SubMagic theme ID?"
        options: ["Yes, I'll provide it", "No, use default template"]
        store_as: "has_custom_theme"

      - action: "conditional"
        if: "has_custom_theme == 'Yes'"
        then:
          - ask_user: "Enter your SubMagic theme UUID"
            store_as: "custom_theme_id"
        else:
          - action: "call_mcp"
            tool: "submagic_list_templates"
            store_as: "available_templates"
          - action: "present_options"
            from: "available_templates"
            question: "Choose a template style:"
            store_as: "template_name"

  - step: 2
    name: "Configure Editing Strategy"
    actions:
      - action: "load_platform_defaults"
        from: "{agent-folder}/zoe-sidecar/platform-specs.yaml"
        platform: "{platform}"
        store_as: "platform_config"

      - action: "ask_user"
        question: "Editing style preference?"
        options:
          - label: "Conservative"
            description: "Gentle edits, natural pacing"
            value: "conservative"
          - label: "Balanced"
            description: "Good balance of editing and flow"
            value: "balanced"
          - label: "Aggressive"
            description: "Maximum compression, fast pacing"
            value: "aggressive"
        store_as: "editing_style"

      - action: "map_editing_params"
        input: "editing_style"
        output:
          conservative:
            remove_silence_pace: "natural"
            magic_zooms: false
            magic_brolls: false
            remove_bad_takes: false
          balanced:
            remove_silence_pace: "fast"
            magic_zooms: true
            magic_brolls: true
            remove_bad_takes: true
          aggressive:
            remove_silence_pace: "extra-fast"
            magic_zooms: true
            magic_brolls: true
            remove_bad_takes: true
        store_as: "editing_params"

  - step: 3
    name: "Create SubMagic Project"
    actions:
      - action: "call_mcp"
        tool: "submagic_create_project"
        params:
          title: "{platform} Video - {date}"
          language: "en"
          video_url: "{video_url}"
          template_name: "{template_name}"  # If no custom theme
          user_theme_id: "{custom_theme_id}"  # If custom theme
          magic_zooms: "{editing_params.magic_zooms}"
          magic_brolls: "{editing_params.magic_brolls}"
          magic_brolls_percentage: 75
          remove_silence_pace: "{editing_params.remove_silence_pace}"
          remove_bad_takes: "{editing_params.remove_bad_takes}"
        store_as: "project"
        error_handling:
          - on_error: "Log and notify user"
          - retry_count: 2
          - retry_delay: 5000

  - step: 4
    name: "Monitor Processing"
    actions:
      - action: "poll_until_complete"
        tool: "submagic_get_project"
        params:
          project_id: "{project.id}"
        poll_interval: 30000  # 30 seconds
        max_wait: 600000  # 10 minutes
        success_status: "completed"
        failure_status: "failed"
        store_as: "completed_project"

  - step: 5
    name: "Export Video"
    actions:
      - action: "call_mcp"
        tool: "submagic_export_project"
        params:
          project_id: "{completed_project.id}"
          width: "{platform_config.video_width}"
          height: "{platform_config.video_height}"
          fps: 30
        store_as: "export_result"

      - action: "poll_until_complete"
        tool: "submagic_get_project"
        params:
          project_id: "{completed_project.id}"
        poll_interval: 15000  # 15 seconds
        max_wait: 300000  # 5 minutes
        store_as: "final_project"

  - step: 6
    name: "Download and Save"
    actions:
      - action: "download_file"
        url: "{final_project.downloadUrl}"
        save_to: "{output_folder}/{platform}_edited_{date}.mp4"
        store_as: "local_video_path"

      - action: "create_metadata"
        data:
          project_id: "{final_project.id}"
          platform: "{platform}"
          template: "{template_name}"
          editing_style: "{editing_style}"
          processing_time: "{elapsed_time}"
          download_url: "{final_project.downloadUrl}"
          local_path: "{local_video_path}"
        save_to: "{output_folder}/{platform}_edited_{date}_metadata.json"

  - step: 7
    name: "Present Results"
    actions:
      - action: "display_message"
        message: |
          Video editing complete!

          Platform: {platform}
          Editing Style: {editing_style}
          Processing Time: {elapsed_time}

          Video saved to: {local_video_path}

          Features applied:
          - Captions: ✓
          - Magic Zooms: {editing_params.magic_zooms}
          - B-rolls: {editing_params.magic_brolls}
          - Silence Removal: {editing_params.remove_silence_pace}
          - Filler Words: {editing_params.remove_bad_takes}
```

### Real-World Example

**Scenario:** User has 5-minute product demo video, needs it polished for LinkedIn

**Execution:**
1. User runs `/zoe` → Selects "Edit Video"
2. Provides video URL: `https://cdn.mysite.com/product-demo.mp4`
3. Selects platform: LinkedIn
4. Chooses editing style: Balanced
5. Zoe:
   - Lists templates → User picks "Hormozi 2"
   - Creates SubMagic project with captions + zooms + B-rolls
   - Waits 5 minutes for processing
   - Exports in 1080x1920 (vertical)
   - Downloads to `outputs/projects/2025-11-01-product-demo/04-media/videos/`
6. **Result:** Professional LinkedIn video in 7 minutes total

**Cost:** $0.10-0.15
**Quality:** 9/10

---

## 🎤 Blueprint #2: HeyGen + SubMagic - "The Spokesperson Factory"

### Use Case
User needs professional talking head video with script

### Workflow Diagram
```
┌──────────────┐
│ User Input   │
│ - Script     │
│ - Avatar     │
│ - Voice      │
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│ HeyGen MCP               │
│ 1. List avatars/voices   │
│ 2. Generate video        │
│ 3. Poll status           │
│ 4. Get download URL      │
└──────┬───────────────────┘
       │
       ▼ (HeyGen MP4 output)
┌──────────────────────────┐
│ SubMagic MCP             │
│ 1. Upload HeyGen video   │
│ 2. Add captions          │
│ 3. Add B-rolls (optional)│
│ 4. Export polished video │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Output Management        │
│ - Professional video     │
│ - With captions          │
│ - Ready to publish       │
└──────────────────────────┘
```

### YAML Implementation

```yaml
name: professional-spokesperson
description: "Create avatar spokesperson video with professional editing"
version: 1.0.0
template: false
instructions: "{installed_path}/instructions.md"

config_source: "{agent-folder}/zoe-sidecar/config.yaml"
output_folder: "{outputs_base}/{date}-{project-slug}/04-media/videos"

variables:
  script: ""
  avatar_id: ""
  voice_id: ""
  platform: "linkedin"
  add_captions: true
  add_brolls: false

steps:
  - step: 1
    name: "Gather Content"
    actions:
      - action: "ask_user"
        question: "What should the spokesperson say?"
        multiline: true
        max_length: 5000
        store_as: "script"

      - action: "ask_user"
        question: "Which platform is this for?"
        options: ["linkedin", "youtube", "twitter", "website"]
        store_as: "platform"

  - step: 2
    name: "Select Avatar & Voice"
    actions:
      - action: "call_mcp"
        tool: "heygen_get_avatar_groups"
        params:
          include_public: true
        store_as: "avatar_groups"

      - action: "present_options"
        from: "avatar_groups"
        question: "Choose avatar group:"
        store_as: "selected_group"

      - action: "call_mcp"
        tool: "heygen_get_avatars_in_avatar_group"
        params:
          group_id: "{selected_group.id}"
        store_as: "avatars"

      - action: "present_options"
        from: "avatars"
        question: "Choose your avatar:"
        store_as: "avatar_id"

      - action: "call_mcp"
        tool: "heygen_get_voices"
        store_as: "voices"

      - action: "present_options"
        from: "voices"
        question: "Choose voice:"
        filter: "language == 'en'"
        store_as: "voice_id"

  - step: 3
    name: "Generate Avatar Video"
    actions:
      - action: "call_mcp"
        tool: "heygen_generate_avatar_video"
        params:
          avatar_id: "{avatar_id}"
          voice_id: "{voice_id}"
          input_text: "{script}"
          title: "{platform} Spokesperson Video"
        store_as: "heygen_job"

      - action: "poll_until_complete"
        tool: "heygen_get_avatar_video_status"
        params:
          video_id: "{heygen_job.video_id}"
        poll_interval: 30000  # 30 seconds
        max_wait: 1800000  # 30 minutes (HeyGen can be slow)
        store_as: "heygen_result"

      - action: "download_file"
        url: "{heygen_result.video_url}"
        save_to: "/tmp/zoe-videos/heygen-raw-{date}.mp4"
        store_as: "heygen_video_path"

  - step: 4
    name: "Ask About SubMagic Editing"
    actions:
      - action: "ask_user"
        question: "Do you want to add captions and editing polish?"
        options: ["Yes, edit with SubMagic", "No, use HeyGen video as-is"]
        store_as: "use_submagic"

  - step: 5
    name: "SubMagic Editing (Optional)"
    dependencies:
      - use_submagic == "Yes, edit with SubMagic"
    actions:
      - action: "upload_to_cdn"
        file: "{heygen_video_path}"
        store_as: "public_video_url"
        note: "SubMagic requires public URL, not local path"

      - action: "ask_user"
        question: "Choose editing style:"
        options:
          - label: "Light Touch"
            description: "Just add captions, minimal editing"
            value: "light"
          - label: "Full Polish"
            description: "Captions + zooms + B-rolls + silence removal"
            value: "full"
        store_as: "editing_level"

      - action: "call_mcp"
        tool: "submagic_create_project"
        params:
          title: "{platform} Edited - {date}"
          language: "en"
          video_url: "{public_video_url}"
          template_name: "Sara"
          magic_zooms: "{editing_level == 'full'}"
          magic_brolls: "{editing_level == 'full'}"
          remove_silence_pace: "{editing_level == 'full' ? 'fast' : 'natural'}"
          remove_bad_takes: false  # HeyGen doesn't have filler words
        store_as: "submagic_project"

      - action: "poll_until_complete"
        tool: "submagic_get_project"
        params:
          project_id: "{submagic_project.id}"
        poll_interval: 30000
        max_wait: 600000  # 10 minutes
        store_as: "submagic_completed"

      - action: "call_mcp"
        tool: "submagic_export_project"
        params:
          project_id: "{submagic_completed.id}"
          width: 1080
          height: 1920
          fps: 30
        store_as: "export_result"

      - action: "poll_until_complete"
        tool: "submagic_get_project"
        params:
          project_id: "{submagic_completed.id}"
        poll_interval: 15000
        max_wait: 300000
        store_as: "final_project"

  - step: 6
    name: "Save Final Video"
    actions:
      - action: "conditional"
        if: "use_submagic == 'Yes'"
        then:
          - action: "download_file"
            url: "{final_project.downloadUrl}"
            save_to: "{output_folder}/spokesperson_{platform}_{date}.mp4"
            store_as: "final_video_path"
        else:
          - action: "copy_file"
            from: "{heygen_video_path}"
            to: "{output_folder}/spokesperson_{platform}_{date}.mp4"
            store_as: "final_video_path"

      - action: "create_metadata"
        data:
          type: "spokesperson-video"
          platform: "{platform}"
          avatar_id: "{avatar_id}"
          voice_id: "{voice_id}"
          script_length: "{script.length}"
          heygen_video_id: "{heygen_job.video_id}"
          submagic_project_id: "{final_project.id if use_submagic else null}"
          editing_applied: "{use_submagic}"
          final_path: "{final_video_path}"
        save_to: "{output_folder}/spokesperson_{platform}_{date}_metadata.json"

  - step: 7
    name: "Present Results"
    output:
      message: |
        Spokesperson video created successfully!

        Platform: {platform}
        Processing: HeyGen{use_submagic ? ' + SubMagic' : ''}
        Duration: {video_duration}

        Video: {final_video_path}
      files:
        - "{final_video_path}"
```

### Real-World Example

**Scenario:** Create LinkedIn product announcement with professional avatar

**Input:**
- Script: "Hello, I'm excited to announce our new AI-powered feature..."
- Avatar: Professional business avatar
- Voice: American English, friendly
- Platform: LinkedIn

**Execution Flow:**
1. HeyGen generates video (5 minutes)
2. User opts for SubMagic editing
3. SubMagic adds captions + light editing (5 minutes)
4. Final video downloaded (1080x1920, 30fps)

**Total Time:** 12 minutes
**Total Cost:** $0.30 (HeyGen) + $0.12 (SubMagic) = $0.42
**Quality:** 9/10

---

## 🎨 Blueprint #3: Fal + SubMagic - "The AI Content Machine"

### Use Case
User wants AI-generated video from text/image → polished with captions

### Workflow Diagram
```
┌──────────────┐
│ User Input   │
│ - Prompt OR  │
│ - Image      │
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│ Fal-video MCP            │
│ 1. Select model          │
│ 2. Generate video        │
│    (text-to-video OR     │
│     image-to-video)      │
│ 3. Download result       │
└──────┬───────────────────┘
       │
       ▼ (Raw AI video)
┌──────────────────────────┐
│ SubMagic MCP             │
│ 1. Upload AI video       │
│ 2. Add captions          │
│ 3. Add zooms/B-rolls     │
│ 4. Export polished       │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Final Output             │
│ - Professional quality   │
│ - Platform-optimized     │
└──────────────────────────┘
```

### YAML Implementation

```yaml
name: ai-video-from-prompt
description: "Generate AI video from text/image, then edit with SubMagic"
version: 1.0.0
template: false
instructions: "{installed_path}/instructions.md"

config_source: "{agent-folder}/zoe-sidecar/config.yaml"
output_folder: "{outputs_base}/{date}-{project-slug}/04-media/videos"

variables:
  input_type: ""  # text | image
  prompt: ""
  image_path: ""
  platform: ""
  fal_model: ""
  duration: 5

steps:
  - step: 1
    name: "Determine Input Type"
    actions:
      - action: "ask_user"
        question: "What do you want to create from?"
        options:
          - label: "Text Prompt"
            description: "Generate video from description"
            value: "text"
          - label: "Animate Image"
            description: "Turn image into video"
            value: "image"
        store_as: "input_type"

  - step: 2
    name: "Gather Content"
    actions:
      - action: "conditional"
        if: "input_type == 'text'"
        then:
          - action: "ask_user"
            question: "Describe the video you want (be specific!):"
            multiline: true
            store_as: "prompt"

          - action: "call_mcp"
            tool: "fal_list_available_models"
            params:
              category: "textToVideo"
            store_as: "available_models"

          - action: "present_options"
            from: "available_models"
            question: "Choose video generation model:"
            recommendations:
              - model: "veo3"
                reason: "Best quality, Google's latest"
              - model: "kling_master_text"
                reason: "Great motion, fast"
              - model: "luma_ray2"
                reason: "Balanced quality/speed"
            store_as: "fal_model"

        else:  # image input
          - action: "ask_user"
            question: "Provide image path or URL:"
            store_as: "image_path"

          - action: "ask_user"
            question: "Describe the motion/animation:"
            store_as: "prompt"

          - action: "call_mcp"
            tool: "fal_list_available_models"
            params:
              category: "imageToVideo"
            store_as: "available_models"

          - action: "present_options"
            from: "available_models"
            question: "Choose animation model:"
            recommendations:
              - model: "ltx_video"
                reason: "Fast, high quality"
              - model: "kling_master_image"
                reason: "Premium quality"
            store_as: "fal_model"

  - step: 3
    name: "Configure Video Settings"
    actions:
      - action: "ask_user"
        question: "Platform target?"
        options: ["tiktok", "instagram", "youtube", "linkedin"]
        store_as: "platform"

      - action: "ask_user"
        question: "Video duration?"
        options:
          - label: "5 seconds"
            value: 5
          - label: "10 seconds"
            value: 10
        store_as: "duration"

      - action: "load_platform_defaults"
        from: "{agent-folder}/zoe-sidecar/platform-specs.yaml"
        platform: "{platform}"
        store_as: "platform_config"

  - step: 4
    name: "Generate AI Video"
    actions:
      - action: "conditional"
        if: "input_type == 'text'"
        then:
          - action: "call_mcp"
            tool: "fal_{fal_model}"  # Dynamic tool selection
            params:
              prompt: "{prompt}"
              aspect_ratio: "{platform_config.aspect_ratio}"
              duration: "{duration}"
            store_as: "fal_result"
        else:
          - action: "call_mcp"
            tool: "fal_{fal_model}"
            params:
              image_url: "{image_path}"
              prompt: "{prompt}"
              aspect_ratio: "{platform_config.aspect_ratio}"
              duration: "{duration}"
            store_as: "fal_result"

      - action: "download_file"
        url: "{fal_result.video_url}"
        save_to: "/tmp/zoe-videos/fal-raw-{date}.mp4"
        store_as: "fal_video_path"

  - step: 5
    name: "SubMagic Enhancement"
    actions:
      - action: "ask_user"
        question: "Add captions and editing polish?"
        options: ["Yes, polish it", "No, use raw AI video"]
        default: "Yes, polish it"
        store_as: "apply_submagic"

      - action: "conditional"
        if: "apply_submagic == 'Yes'"
        then:
          - action: "upload_to_cdn"
            file: "{fal_video_path}"
            store_as: "public_fal_url"

          - action: "call_mcp"
            tool: "submagic_create_project"
            params:
              title: "AI Video - {platform} - {date}"
              language: "en"
              video_url: "{public_fal_url}"
              template_name: "Sara"
              magic_zooms: true
              magic_brolls: false  # AI video already has content
              remove_silence_pace: "natural"  # AI video unlikely to have silence
              remove_bad_takes: false  # AI video doesn't have filler words
            store_as: "submagic_project"

          - action: "wait_for_completion"
            project_id: "{submagic_project.id}"
            store_as: "edited_project"

          - action: "export_and_download"
            project_id: "{edited_project.id}"
            resolution: "{platform_config}"
            save_to: "{output_folder}/ai_video_{platform}_{date}.mp4"
            store_as: "final_video_path"
        else:
          - action: "copy_file"
            from: "{fal_video_path}"
            to: "{output_folder}/ai_video_{platform}_{date}.mp4"
            store_as: "final_video_path"

  - step: 6
    name: "Create Metadata"
    actions:
      - action: "save_json"
        path: "{output_folder}/ai_video_{platform}_{date}_metadata.json"
        data:
          type: "ai-generated-video"
          input_type: "{input_type}"
          prompt: "{prompt}"
          fal_model: "{fal_model}"
          platform: "{platform}"
          duration: "{duration}"
          submagic_applied: "{apply_submagic}"
          final_path: "{final_video_path}"
```

### Real-World Example

**Scenario:** Create TikTok video showing "futuristic city at sunset"

**Execution:**
1. User: "Text prompt" → "Futuristic city at sunset, flying cars, neon lights"
2. Zoe suggests: Veo3 (best quality)
3. Platform: TikTok (9:16 aspect ratio)
4. Duration: 5 seconds
5. Fal generates video (2 minutes)
6. User opts for SubMagic polish
7. SubMagic adds captions (3 minutes)
8. Final video: 1080x1920, captioned, optimized

**Total Time:** 6 minutes
**Total Cost:** $0.25 (Fal) + $0.08 (SubMagic) = $0.33
**Quality:** 8/10

---

## 🎭 Blueprint #4: HeyGen + Fal + SubMagic - "The Complete Studio"

### Use Case
User needs complex video with avatar + AI scenes + professional editing

### Workflow Diagram
```
┌──────────────┐
│ User Input   │
│ - Script     │
│ - Scene desc │
└──────┬───────┘
       │
       ├─────────────────┬─────────────────┐
       ▼                 ▼                 ▼
┌──────────┐      ┌──────────┐     ┌──────────┐
│ HeyGen   │      │ Fal      │     │ Fal      │
│ Avatar   │      │ Scene 1  │     │ Scene 2  │
│ Speaking │      │ B-roll   │     │ B-roll   │
└────┬─────┘      └────┬─────┘     └────┬─────┘
     │                 │                 │
     └─────────────────┼─────────────────┘
                       ▼
            ┌──────────────────┐
            │ Video Merger     │
            │ (ffmpeg/local)   │
            └────────┬─────────┘
                     │
                     ▼
            ┌──────────────────┐
            │ SubMagic         │
            │ - Add captions   │
            │ - Final edit     │
            └────────┬─────────┘
                     │
                     ▼
            ┌──────────────────┐
            │ Professional     │
            │ Output Video     │
            └──────────────────┘
```

### YAML Implementation

```yaml
name: complete-production
description: "Multi-tool video production with avatar, AI scenes, and editing"
version: 1.0.0
template: false
instructions: "{installed_path}/instructions.md"

config_source: "{agent-folder}/zoe-sidecar/config.yaml"
output_folder: "{outputs_base}/{date}-{project-slug}/04-media/videos"

variables:
  script: ""
  num_scenes: 0
  scenes: []
  avatar_id: ""
  voice_id: ""

steps:
  - step: 1
    name: "Plan Production"
    actions:
      - action: "ask_user"
        question: "What's your video script?"
        multiline: true
        store_as: "script"

      - action: "ask_user"
        question: "How many B-roll/scene clips do you need?"
        type: "number"
        min: 0
        max: 5
        store_as: "num_scenes"

      - action: "loop"
        count: "{num_scenes}"
        variable: "i"
        actions:
          - action: "ask_user"
            question: "Scene {i+1} description:"
            store_as: "scenes[{i}].description"
          - action: "ask_user"
            question: "Scene {i+1} starts at (timestamp in script):"
            store_as: "scenes[{i}].start_time"

  - step: 2
    name: "Generate Avatar Video"
    actions:
      - action: "setup_heygen_avatar"
        store_as: "avatar_config"

      - action: "call_mcp"
        tool: "heygen_generate_avatar_video"
        params:
          avatar_id: "{avatar_config.avatar_id}"
          voice_id: "{avatar_config.voice_id}"
          input_text: "{script}"
        store_as: "heygen_job"

      - action: "wait_for_completion"
        video_id: "{heygen_job.video_id}"
        store_as: "avatar_video"

  - step: 3
    name: "Generate B-roll Scenes (Parallel)"
    parallel: true
    actions:
      - action: "foreach"
        array: "scenes"
        variable: "scene"
        parallel: true
        actions:
          - action: "call_mcp"
            tool: "fal_veo3"  # Or user's preferred model
            params:
              prompt: "{scene.description}"
              aspect_ratio: "16:9"
              duration: 5
            store_as: "scene.video_url"

          - action: "download_file"
            url: "{scene.video_url}"
            save_to: "/tmp/zoe-videos/scene-{scene.index}-{date}.mp4"
            store_as: "scene.local_path"

  - step: 4
    name: "Merge Videos"
    actions:
      - action: "bash_command"
        command: |
          # Use ffmpeg to merge avatar + scenes
          # Insert scenes at specified timestamps
          ffmpeg -i {avatar_video.path} \
                 -i {scenes[0].local_path} \
                 -i {scenes[1].local_path} \
                 -filter_complex "[0:v][1:v]overlay=..." \
                 /tmp/zoe-videos/merged-{date}.mp4
        store_as: "merged_video_path"
        note: "This requires local video merging capability"

  - step: 5
    name: "SubMagic Final Polish"
    actions:
      - action: "upload_to_cdn"
        file: "{merged_video_path}"
        store_as: "public_merged_url"

      - action: "call_mcp"
        tool: "submagic_create_project"
        params:
          title: "Complete Production - {date}"
          language: "en"
          video_url: "{public_merged_url}"
          template_name: "Hormozi 2"
          magic_zooms: true
          magic_brolls: false  # We already added B-rolls
          remove_silence_pace: "fast"
          remove_bad_takes: false
        store_as: "submagic_project"

      - action: "wait_and_export"
        project_id: "{submagic_project.id}"
        resolution: "1080x1920"
        save_to: "{output_folder}/complete_production_{date}.mp4"
        store_as: "final_video_path"
```

### Real-World Example

**Scenario:** Product launch video with CEO talking + product B-rolls

**Input:**
- Script: CEO announcement (60 seconds)
- Scene 1: Product in action (insert at 15s)
- Scene 2: Customer testimonial (insert at 35s)

**Execution:**
1. HeyGen generates CEO avatar video (8 min)
2. Fal generates Scene 1 + Scene 2 in parallel (3 min each)
3. Local ffmpeg merges all videos (1 min)
4. SubMagic adds captions + final polish (6 min)

**Total Time:** 18 minutes
**Total Cost:** $0.25 (HeyGen) + $0.20 (Fal x2) + $0.12 (SubMagic) = $0.57
**Quality:** 9/10

**⚠️ COMPLEXITY WARNING:** Requires local video merging logic!

---

## 🚀 Blueprint #5: Fal Only - "The Speed Demon"

### Use Case
Quick AI video generation for testing/concepts

### Workflow Diagram
```
┌──────────────┐
│ User Prompt  │
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│ Fal-video MCP            │
│ - Generate video         │
│ - Download immediately   │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Output                   │
│ - Raw AI video           │
│ - Fast results           │
└──────────────────────────┘
```

### YAML Implementation

```yaml
name: quick-ai-video
description: "Fast AI video generation without editing"
version: 1.0.0
template: false
instructions: "{installed_path}/instructions.md"

steps:
  - step: 1
    name: "Generate Video"
    actions:
      - action: "ask_user"
        question: "Video prompt:"
        store_as: "prompt"

      - action: "call_mcp"
        tool: "fal_veo3"  # Default to best model
        params:
          prompt: "{prompt}"
          aspect_ratio: "16:9"
          duration: 5
        store_as: "video"

      - action: "download_file"
        url: "{video.video_url}"
        save_to: "{output_folder}/quick_ai_{date}.mp4"
```

**Total Time:** 2-3 minutes
**Total Cost:** $0.15-0.25
**Quality:** 7/10
**Best for:** Concept testing, storyboards

---

## 💎 Blueprint #6: SubMagic Magic Clips - "The Repurposing Engine"

### Use Case
Convert long YouTube video into 10-20 viral clips

### Workflow Diagram
```
┌──────────────────┐
│ YouTube URL      │
│ (30-60 min vid)  │
└──────┬───────────┘
       │
       ▼
┌─────────────────────────────┐
│ SubMagic Magic Clips        │
│ 1. Analyze full video       │
│ 2. Find engaging moments    │
│ 3. Generate 10-20 clips     │
│ 4. Add captions to each     │
│ 5. Optimize for platform    │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│ Output: 10-20 Videos        │
│ - Each 15-60 seconds        │
│ - Platform-optimized        │
│ - Ready to schedule         │
└─────────────────────────────┘
```

### YAML Implementation

```yaml
name: generate-viral-clips
description: "Auto-generate viral clips from long YouTube video"
version: 1.0.0
template: false
instructions: "{installed_path}/instructions.md"

config_source: "{agent-folder}/zoe-sidecar/config.yaml"
output_folder: "{outputs_base}/{date}-{project-slug}/04-media/videos"

variables:
  youtube_url: ""
  platform: ""
  min_length: 15
  max_length: 60

steps:
  - step: 1
    name: "Gather Requirements"
    actions:
      - action: "ask_user"
        question: "YouTube video URL to repurpose:"
        validation: "youtube.com|youtu.be"
        store_as: "youtube_url"

      - action: "ask_user"
        question: "Target platform:"
        options:
          - label: "TikTok"
            description: "15-30 second clips"
            value: "tiktok"
            clip_config: {min: 15, max: 30}
          - label: "Instagram Reels"
            description: "30 second clips"
            value: "instagram"
            clip_config: {min: 30, max: 30}
          - label: "YouTube Shorts"
            description: "45-60 second clips"
            value: "youtube"
            clip_config: {min: 45, max: 60}
          - label: "LinkedIn"
            description: "60-90 second clips"
            value: "linkedin"
            clip_config: {min: 60, max: 90}
        store_as: "platform"

      - action: "set_from_selection"
        source: "platform.clip_config"
        store_as:
          min_length: "min"
          max_length: "max"

  - step: 2
    name: "Generate Magic Clips"
    actions:
      - action: "call_mcp"
        tool: "submagic_create_magic_clips"
        params:
          title: "Viral Clips - {platform} - {date}"
          youtube_url: "{youtube_url}"
          language: "en"
          min_clip_length: "{min_length}"
          max_clip_length: "{max_length}"
        store_as: "clips_project"

      - action: "display_message"
        message: |
          Magic Clips generation started!
          Project ID: {clips_project.id}

          This will take 10-20 minutes.
          I'll check status every minute...

  - step: 3
    name: "Monitor Processing"
    actions:
      - action: "poll_until_complete"
        tool: "submagic_get_project"
        params:
          project_id: "{clips_project.id}"
        poll_interval: 60000  # 1 minute
        max_wait: 1200000  # 20 minutes
        store_as: "completed_clips"

  - step: 4
    name: "Download All Clips"
    actions:
      - action: "foreach"
        array: "completed_clips.clips"
        variable: "clip"
        index: "i"
        actions:
          - action: "download_file"
            url: "{clip.downloadUrl}"
            save_to: "{output_folder}/clip_{i+1}_{platform}_{date}.mp4"

          - action: "create_metadata"
            data:
              clip_number: "{i+1}"
              duration: "{clip.duration}"
              start_time: "{clip.startTime}"
              end_time: "{clip.endTime}"
              engagement_score: "{clip.viralScore}"
            save_to: "{output_folder}/clip_{i+1}_metadata.json"

  - step: 5
    name: "Present Results"
    output:
      message: |
        Generated {completed_clips.clips.length} viral clips!

        Platform: {platform}
        Clip length: {min_length}-{max_length} seconds

        All clips saved to: {output_folder}

        Ready for batch scheduling!
      files: "{completed_clips.clips[*].local_path}"
```

### Real-World Example

**Scenario:** Repurpose 45-minute podcast episode into TikTok clips

**Input:**
- YouTube URL: `https://youtube.com/watch?v=podcast-episode-42`
- Platform: TikTok
- Clip length: 15-30 seconds

**Execution:**
1. SubMagic analyzes 45-minute video (15 minutes)
2. AI identifies 18 engaging moments
3. Generates 18 clips with captions (5 minutes)
4. Downloads all clips to output folder

**Total Time:** 22 minutes
**Total Output:** 18 ready-to-post videos
**Total Cost:** $1.50-2.00 (for entire batch)
**Cost per clip:** $0.08-0.11
**Quality:** 8/10

**💰 ROI:** 18 videos for the price of 2-3 manual edits!

---

## 🔧 Advanced Integration Scenarios

### Scenario A: "The Content Factory Pipeline"

**Goal:** Maximum volume, minimum cost

**Combination:** Fal (fast models) + SubMagic

**Strategy:**
```javascript
// Batch process 20 videos in parallel
const prompts = [...]; // 20 video ideas

// Generate all videos in parallel (Fal is fast)
const videos = await Promise.all(
  prompts.map(prompt =>
    fal_luma_ray2({ prompt, duration: 5 })  // Fast model
  )
);

// Edit all with SubMagic (sequential to respect rate limits)
for (const video of videos) {
  const edited = await submagic_create_project({
    video_url: video.url,
    template_name: "Sara",
    magic_zooms: true,
    remove_silence_pace: "fast"
  });

  await waitForCompletion(edited.id);
  await exportAndSave(edited.id);

  // Rate limit: 500/hour = 1 every 7.2 seconds
  await sleep(8000);
}
```

**Throughput:** 20 videos in 90 minutes
**Cost:** $6-8 total
**Best for:** Content calendars, batch posting

### Scenario B: "The Professional Suite"

**Goal:** Maximum quality, brand consistency

**Combination:** HeyGen + Nanobanana (thumbnails) + SubMagic

**Strategy:**
```javascript
// 1. Generate thumbnail (Nanobanana)
const thumbnail = await nanobanana_generate_image({
  prompt: "Professional product shot, clean background"
});

// 2. Generate spokesperson video (HeyGen)
const video = await heygen_generate_avatar_video({
  script: "Welcome to our product launch...",
  avatar_id: "professional-avatar-uuid",
  voice_id: "en-US-friendly-voice"
});

// 3. Edit with branded theme (SubMagic)
const edited = await submagic_create_project({
  video_url: video.url,
  user_theme_id: "company-brand-theme-uuid",  // Custom fonts/colors!
  magic_zooms: false,  // Professional = subtle
  magic_brolls: false,
  remove_silence_pace: "natural"
});

await exportWithThumbnail(edited.id, thumbnail.path);
```

**Quality:** 10/10
**Cost:** $0.50 per video
**Best for:** Corporate, investor relations, announcements

---

## 📊 Complexity vs Value Matrix

```
High Value ▲
           │
           │  ┌─────────────┐
           │  │  HeyGen +   │
           │  │  SubMagic   │
           │  └─────────────┘
           │         ┌─────────────────┐
           │         │ Fal + SubMagic  │
           │         └─────────────────┘
           │  ┌─────────────┐
           │  │ SubMagic    │
           │  │ Magic Clips │
           │  └─────────────┘
           │                      ┌──────────────┐
           │                      │ HeyGen + Fal │
           │                      │ + SubMagic   │
           │                      └──────────────┘
           │         ┌──────────┐
           │         │ SubMagic │
           │         │   Only   │
           │         └──────────┘
           │  ┌──────┐
           │  │ Fal  │
           │  │ Only │
           │  └──────┘
           │
Low Value  └────────────────────────────────────► High Complexity
```

**Interpretation:**
- **Bottom Left (Fal Only):** Low effort, low value - good for testing
- **Middle Left (SubMagic Only):** Medium effort, high value - BEST ROI
- **Middle (Fal + SubMagic):** Medium effort, high value - RECOMMENDED
- **Top Left (Magic Clips):** Medium effort, very high value - BATCH WINNER
- **Top Middle (HeyGen + SubMagic):** Medium-high effort, very high value - PROFESSIONAL
- **Top Right (Full Suite):** Very high effort, high value - FUTURE GOAL

---

## 🎯 Implementation Priority Ranking

### Rank 1: **SubMagic Only** ⭐⭐⭐⭐⭐
**Effort:** Low | **Value:** High | **Complexity:** Low

**Why First:**
- Works with existing videos (users already have footage)
- Provides immediate editing value
- No dependencies on other tools
- Fast to implement (2-4 hours)
- Lowest risk

**Implement:** IMMEDIATELY

---

### Rank 2: **SubMagic Magic Clips** ⭐⭐⭐⭐⭐
**Effort:** Low | **Value:** Very High | **Complexity:** Low

**Why Second:**
- Incredible ROI (1 long video → 20 clips)
- Perfect for content repurposing
- Simple workflow (just YouTube URL)
- Same tool as Rank 1

**Implement:** WEEK 1-2

---

### Rank 3: **Fal + SubMagic** ⭐⭐⭐⭐
**Effort:** Medium | **Value:** High | **Complexity:** Medium

**Why Third:**
- Adds AI generation capability
- Good quality-to-cost ratio
- Flexible (14 models to choose from)
- Natural extension of SubMagic workflows

**Implement:** WEEK 2-3

---

### Rank 4: **HeyGen + SubMagic** ⭐⭐⭐⭐
**Effort:** Medium | **Value:** Very High | **Complexity:** Medium

**Why Fourth:**
- Professional use cases (business content)
- Existing setup-avatars workflow already in place
- High quality output
- Unique capability (realistic avatars)

**Implement:** WEEK 4

---

### Rank 5: **Multi-Tool Productions** ⭐⭐⭐
**Effort:** High | **Value:** High | **Complexity:** Very High

**Why Last:**
- Requires all previous integrations working
- Complex orchestration logic
- File merging complexity
- Higher failure risk

**Implement:** MONTH 2+

---

## 🎬 Conclusion & Decision Points

### Critical Questions for sid:

1. **What's your primary video need RIGHT NOW?**
   - Editing existing footage → SubMagic Only
   - Creating new AI content → Fal + SubMagic
   - Professional spokesperson → HeyGen + SubMagic

2. **What's your volume expectation?**
   - 1-5 videos/week → Any approach
   - 10-20 videos/week → SubMagic Magic Clips essential
   - 50+ videos/week → Need batch automation

3. **What's your quality bar?**
   - "Good enough" → Fal + SubMagic
   - "Professional" → HeyGen + SubMagic
   - "Exceptional" → Multi-tool suite

4. **What's your budget tolerance?**
   - $0.10-0.20 per video → SubMagic + Fal
   - $0.30-0.50 per video → Add HeyGen
   - $1.00+ per video → Full productions

5. **What's your time tolerance?**
   - 5-10 minutes → SubMagic or Fal alone
   - 10-20 minutes → Two-tool combinations
   - 30+ minutes → Multi-tool productions

### Recommended Starting Point

**My Hero Recommendation:** 🦸‍♂️

**START WITH:** SubMagic Only (Rank 1 + Rank 2)

**Week 1 Workflows:**
1. Edit Video (`edit-video.yaml`) - Edit user's raw footage
2. Generate Viral Clips (`generate-viral-clips.yaml`) - YouTube → Clips

**Why:**
- Fast implementation (4-6 hours total)
- Immediate value
- Low risk
- Users can start using immediately
- Foundation for future expansions

**Then ADD:** Fal + SubMagic (Week 2-3)
**Then ADD:** HeyGen + SubMagic (Week 4)
**Future:** Multi-tool orchestration

---

**NEXT ACTION:** Review these blueprints and tell me which approach you want to implement first!

I'm ready to create the actual workflow YAML files when you give the signal! 💪
