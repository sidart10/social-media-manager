# SubMagic API - Complete Video Editing Guide

**Generated:** 2025-11-01
**For:** Social Media Manager Project
**Status:** Production Ready

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Font & Caption Customization](#font--caption-customization)
3. [Custom Themes & Templates](#custom-themes--templates)
4. [API Editing Workflow](#api-editing-workflow)
5. [Advanced Editing Features](#advanced-editing-features)
6. [Best Practices for Full Video Editing](#best-practices-for-full-video-editing)
7. [Pro Tips & Limitations](#pro-tips--limitations)

---

## 🎯 Overview

SubMagic API provides two approaches to video editing:

1. **Template-Based (Recommended)** - Use pre-made templates like "Hormozi 2", "Sara", "Beast"
2. **Custom Theme-Based (Advanced)** - Create custom themes in UI, then reference via `user_theme_id` in API

### What You CAN Edit via API

✅ Template/theme selection
✅ Silence removal aggressiveness
✅ Filler word removal (AI-powered)
✅ Custom B-roll insertion at specific timestamps
✅ Magic zooms (enable/disable at project creation)
✅ Auto B-rolls (enable/disable at project creation)
✅ Transcription dictionary (custom words)
✅ Language for captions
✅ Export resolution (width, height, fps)

### What You CANNOT Edit via API (UI Only)

❌ Individual font selection
❌ Caption colors (primary + 3 highlight colors)
❌ Caption position/sizing
❌ Shadow effects
❌ Words per line
❌ Animation styles
❌ Emoji customization
❌ Direct transcript editing

**CRITICAL:** Font/styling customization happens in SubMagic UI → saved as custom theme → referenced in API via `user_theme_id`

---

## 🎨 Font & Caption Customization

### Available Font Options

SubMagic supports:

- **30+ Pre-designed Templates** (each with unique font/style)
- **Custom Font Upload** (PRO plan required)
- **3 Highlight Colors** for emphasis
- **Shadow Effects** for readability
- **Caption Positioning** (manual adjustment)
- **Words Per Line** control

### How to Access Font Customization

**Step 1:** Create a project in SubMagic UI (https://app.submagic.co)

**Step 2:** Navigate to STYLE section

**Step 3:** Select a base template (e.g., "Hormozi 2")

**Step 4:** Click EDIT to customize:

- Upload custom font (TTF/OTF files)
- Adjust shadow effects
- Set words per line (1-5 typical)
- Choose primary color
- Set 3 highlight colors for emphasis
- Adjust caption position/size

**Step 5:** Click "CREATE THEME" and name it (e.g., "My_Brand_Style")

**Step 6:** Copy the theme UUID from URL or theme settings

**Step 7:** Use that UUID as `user_theme_id` in API calls

### Font Best Practices

**For Business/Sales Videos:**

- Use **bold, thick fonts** (Hormozi style)
- **High contrast** (yellow text, black shadow)
- **2-3 words per line**
- **Large text size** for mobile viewing

**For Tutorial/Educational:**

- **Clean sans-serif fonts** (Arial, Helvetica)
- **White or light gray text**
- **3-4 words per line**
- **Medium size** for balance

**For Entertainment/Viral:**

- **Playful, animated fonts**
- **Multiple highlight colors** (yellow, pink, blue)
- **1-2 words per line** (fast-paced)
- **Large, attention-grabbing**

---

## 🎭 Custom Themes & Templates

### Understanding the Difference

| Feature           | Templates       | Custom Themes                 |
| ----------------- | --------------- | ----------------------------- |
| **Access**        | API directly    | UI creation → API reference   |
| **Customization** | None (pre-made) | Full control                  |
| **Font Upload**   | No              | Yes (PRO plan)                |
| **Colors**        | Fixed           | Custom primary + 3 highlights |
| **Plan Required** | Any             | PRO or higher                 |
| **API Parameter** | `template_name` | `user_theme_id`               |

### Available Templates (30+)

**Business/Sales:**

- Hormozi 1, 2, 3, 4, 5 (high-energy, bold)
- Daniel (professional)
- Leon (corporate)

**General Social Media:**

- Sara (default - most versatile)
- Ella (friendly)
- Maya (modern)

**Entertainment:**

- Beast (MrBeast-inspired)
- Josh (playful)
- Alex (trendy)

### Creating Custom Themes

**Requirements:**

- SubMagic PRO plan or higher
- Access to SubMagic web editor
- Font files (if uploading custom fonts)

**Process:**

```javascript
// Step 1: Create theme in UI (one-time setup)
// Go to https://app.submagic.co
// STYLE → Select base template → EDIT → Customize → CREATE THEME

// Step 2: Get theme UUID (appears in URL or theme settings)
const MY_BRAND_THEME_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

// Step 3: Use in API calls
const project = await submagic_create_project({
  title: 'Branded Video',
  language: 'en',
  video_url: 'https://example.com/video.mp4',
  user_theme_id: MY_BRAND_THEME_ID, // Your custom theme!
  magic_zooms: true,
  magic_brolls: true,
});
```

**⚠️ IMPORTANT:** Cannot use both `template_name` and `user_theme_id` - choose one!

---

## 🔧 API Editing Workflow

### Complete Video Editing Pipeline

```javascript
// ====================================
// PHASE 1: SETUP & CREATION
// ====================================

// 1. List available languages (cache this)
const languages = await submagic_list_languages();
// Result: "en", "es", "fr", "de", "cmn_en", etc.

// 2. List available templates (cache this)
const templates = await submagic_list_templates();
// Result: "Sara", "Hormozi 2", "Beast", etc.

// 3. Create project with editing features
const project = await submagic_create_project({
  title: 'Product Demo - Q4 2025',
  language: 'en',
  video_url: 'https://cdn.example.com/raw-video.mp4',

  // OPTION A: Use pre-made template
  template_name: 'Hormozi 2',

  // OPTION B: Use custom theme (PRO plan)
  // user_theme_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",

  // AI Features (can only set at creation)
  magic_zooms: true, // AI-powered dynamic zooms
  magic_brolls: true, // Auto B-roll insertion
  magic_brolls_percentage: 75, // 75% of video covered

  // Editing Features
  remove_silence_pace: 'fast', // "natural" | "fast" | "extra-fast"
  remove_bad_takes: true, // Remove "um", "uh", "like"

  // Transcription accuracy
  dictionary: ['Submagic', 'TikTok', 'AI-powered', 'MyBrandName'],

  // Webhook for async notification
  webhook_url: 'https://myapi.com/submagic-webhook',
});

// Store project ID
const projectId = project.id;
console.log(`Project created: ${projectId}`);

// ====================================
// PHASE 2: MONITOR PROCESSING
// ====================================

// Poll every 30-60 seconds
const checkStatus = async (projectId) => {
  const project = await submagic_get_project(projectId);

  if (project.status === 'processing') {
    console.log('⏳ Still processing...');
    setTimeout(() => checkStatus(projectId), 30000); // Wait 30s
  } else if (project.status === 'completed') {
    console.log('✅ Processing complete!');
    // Move to Phase 3
  } else if (project.status === 'failed') {
    console.error('❌ Processing failed:', project.error);
  }
};

await checkStatus(projectId);

// ====================================
// PHASE 3: FINE-TUNE EDITING (Optional)
// ====================================

// After initial processing, you can update editing settings
const updated = await submagic_update_project({
  project_id: projectId,

  // Make silence removal more aggressive
  remove_silence_pace: 'extra-fast', // Will remove more pauses

  // Enable filler word removal (takes 1-2 min to process)
  remove_bad_takes: true,

  // Insert custom B-roll clips
  custom_broll_items: [
    {
      startTime: 10.5, // At 10.5 seconds
      endTime: 15.0, // Until 15 seconds
      userMediaId: 'uuid-from-submagic-library',
    },
    {
      startTime: 30.0, // At 30 seconds
      endTime: 35.0, // Until 35 seconds
      userMediaId: 'uuid-another-clip',
    },
  ],
});

console.log('🔧 Updates applied. Must re-export to see changes.');

// Wait for update processing (if remove_bad_takes enabled)
await checkStatus(projectId);

// ====================================
// PHASE 4: EXPORT
// ====================================

// Export with custom resolution
const exported = await submagic_export_project({
  project_id: projectId,
  width: 1080, // HD width
  height: 1920, // Vertical (9:16 for social)
  fps: 30, // Frame rate
  webhook_url: 'https://myapi.com/export-webhook',
});

console.log('📤 Export started...');

// Wait for export to complete
await checkStatus(projectId);

// ====================================
// PHASE 5: DOWNLOAD
// ====================================

// Get final project with download URLs
const finalProject = await submagic_get_project(projectId);

console.log('✅ Video ready!');
console.log('Download URL:', finalProject.downloadUrl);
console.log('Direct URL:', finalProject.directUrl);

// Download the video
const response = await fetch(finalProject.downloadUrl);
const videoBlob = await response.blob();
// Save to disk or upload to your storage
```

---

## 🚀 Advanced Editing Features

### 1. Transcript Access & Word-Level Timecodes

**What it does:** Access the full transcript with precise timing for each word.

**Use cases:**

- Manual caption editing
- Finding specific moments in video
- Content analysis
- Creating custom overlays

**How to access:**

```javascript
// After project is completed
const project = await submagic_get_project(projectId);

// Project response includes transcript data
// (exact format depends on SubMagic API response structure)
const transcript = project.transcript;

// Example structure (typical):
// [
//   { word: "Hello", start: 0.0, end: 0.5 },
//   { word: "world", start: 0.6, end: 1.2 },
//   ...
// ]
```

**⚠️ Note:** The MCP server code doesn't explicitly expose transcript data, but it's available in the raw API response. You may need to use the API directly for this feature.

### 2. Custom B-Roll Insertion

**What it does:** Insert your own video clips at specific timestamps.

**Requirements:**

- Upload media to SubMagic library first (via UI)
- Get the `userMediaId` from SubMagic editor → B-roll tab → My videos

**Best practices:**

```javascript
// Example: Product demo with custom B-rolls
const updated = await submagic_update_project({
  project_id: projectId,
  custom_broll_items: [
    // Product shot during introduction
    {
      startTime: 5.0,
      endTime: 10.0,
      userMediaId: 'product-hero-shot-uuid',
    },
    // Feature demo during explanation
    {
      startTime: 25.0,
      endTime: 35.0,
      userMediaId: 'feature-demo-uuid',
    },
    // Customer testimonial during social proof
    {
      startTime: 50.0,
      endTime: 60.0,
      userMediaId: 'testimonial-uuid',
    },
  ],
});

// MUST re-export after updating!
await submagic_export_project({ project_id: projectId });
```

**Pro tips:**

- Use B-rolls to cover jump cuts
- Insert product shots during mentions
- Add variety to talking head videos
- Duration should match pacing (shorter = faster)

### 3. Silence Removal Strategies

**What it does:** Removes pauses/silence to tighten pacing.

**Three levels:**

| Pace         | Threshold   | Best For                            | Energy Level |
| ------------ | ----------- | ----------------------------------- | ------------ |
| `natural`    | 0.6+ sec    | Tutorials, explainers, storytelling | Low          |
| `fast`       | 0.2-0.6 sec | Social media, product demos         | Medium       |
| `extra-fast` | 0.1-0.2 sec | Viral shorts, high-energy content   | High         |

**When to use:**

```javascript
// Tutorial/educational (preserve natural pacing)
remove_silence_pace: 'natural';

// Social media posts (balanced)
remove_silence_pace: 'fast';

// TikTok/Reels (maximum compression)
remove_silence_pace: 'extra-fast';
```

### 4. Filler Word Removal (AI-Powered)

**What it does:** AI detects and removes "um", "uh", "like", "you know", etc.

**Processing time:** 1-2 minutes additional

**Best for:**

- Podcasts
- Interviews
- Presentations
- Any unscripted content

**How it works:**

```javascript
// Enable during creation
const project = await submagic_create_project({
  // ...
  remove_bad_takes: true, // AI will clean filler words
});

// OR update later
await submagic_update_project({
  project_id: projectId,
  remove_bad_takes: true,
});
// Wait 1-2 min, then re-export
```

**⚠️ Caution:** May occasionally remove intentional words. Review before publishing.

### 5. Magic Clips - Auto Viral Clip Generation

**What it does:** Analyzes long video and creates multiple viral short clips.

**Perfect for:**

- Repurposing podcast episodes → 10-20 clips
- Long YouTube videos → TikToks/Reels
- Webinars → promotional snippets

**Platform-optimized examples:**

```javascript
// TikTok clips (15-30 sec, high energy)
await submagic_create_magic_clips({
  title: 'TikTok Pack - Episode 42',
  youtube_url: 'https://youtube.com/watch?v=abc123',
  language: 'en',
  min_clip_length: 15,
  max_clip_length: 30,
  user_theme_id: 'tiktok-brand-theme-uuid', // Optional
});

// Instagram Reels (exactly 30 sec)
await submagic_create_magic_clips({
  title: 'Reels Pack - Episode 42',
  youtube_url: 'https://youtube.com/watch?v=abc123',
  language: 'en',
  min_clip_length: 30,
  max_clip_length: 30,
});

// YouTube Shorts (45-60 sec)
await submagic_create_magic_clips({
  title: 'Shorts Pack - Episode 42',
  youtube_url: 'https://youtube.com/watch?v=abc123',
  language: 'en',
  min_clip_length: 45,
  max_clip_length: 60,
});

// Podcast snippets (2-3 min highlights)
await submagic_create_magic_clips({
  title: 'Podcast Highlights - Episode 42',
  youtube_url: 'https://youtube.com/watch?v=abc123',
  language: 'en',
  min_clip_length: 120,
  max_clip_length: 180,
});
```

**Processing:** 5-15 minutes depending on source video length.

---

## 📚 Best Practices for Full Video Editing

### Strategy 1: Template-Based Quick Editing

**When to use:** Fast turnaround, standard branding, high volume

**Workflow:**

```javascript
// 1. Pick the right template for content type
const templates = {
  business: 'Hormozi 2',
  social: 'Sara',
  entertainment: 'Beast',
  tutorial: 'Daniel',
};

// 2. Create with aggressive editing settings
const project = await submagic_create_project({
  title: 'Quick Post - Product Launch',
  language: 'en',
  video_url: videoUrl,
  template_name: templates.business,
  magic_zooms: true,
  magic_brolls: true,
  remove_silence_pace: 'fast',
  remove_bad_takes: true,
});

// 3. Export immediately (no fine-tuning)
await submagic_export_project({ project_id: project.id });
```

**Pros:**

- ✅ Fast (no theme creation)
- ✅ Consistent look
- ✅ Works on any plan

**Cons:**

- ❌ No brand customization
- ❌ Limited font control

### Strategy 2: Custom Theme-Based Brand Editing

**When to use:** Brand consistency, professional look, recurring content

**One-Time Setup:**

1. Create custom theme in SubMagic UI:
   - Upload brand fonts
   - Set brand colors (primary + 3 highlights)
   - Adjust shadow, sizing, positioning
   - Save as "MyBrand_Style_2025"

2. Get theme UUID

3. Store in environment variables:
   ```bash
   SUBMAGIC_BRAND_THEME_ID=a1b2c3d4-e5f6-7890-abcd-ef1234567890
   ```

**Recurring Workflow:**

```javascript
// Always use your brand theme
const project = await submagic_create_project({
  title: 'Branded Post - Week 45',
  language: 'en',
  video_url: videoUrl,
  user_theme_id: process.env.SUBMAGIC_BRAND_THEME_ID, // Your brand!
  magic_zooms: true,
  magic_brolls: true,
  remove_silence_pace: 'fast',
  remove_bad_takes: true,
  dictionary: ['MyBrand', 'ProductName', 'TechTerm'],
});
```

**Pros:**

- ✅ Perfect brand consistency
- ✅ Custom fonts/colors
- ✅ Professional look

**Cons:**

- ❌ Requires PRO plan
- ❌ One-time UI setup needed

### Strategy 3: Hybrid Approach (Best of Both)

**When to use:** Multiple content types, different platforms, flexibility

**Setup:**

```javascript
// Define theme/template strategy per content type
const contentStrategy = {
  'linkedin-post': {
    type: 'custom',
    theme_id: process.env.SUBMAGIC_LINKEDIN_THEME_ID,
    silence: 'natural',
    zooms: false, // More professional
    brolls: false,
  },
  'tiktok-video': {
    type: 'template',
    template_name: 'Beast',
    silence: 'extra-fast',
    zooms: true, // High energy
    brolls: true,
  },
  'youtube-short': {
    type: 'custom',
    theme_id: process.env.SUBMAGIC_YOUTUBE_THEME_ID,
    silence: 'fast',
    zooms: true,
    brolls: true,
  },
  tutorial: {
    type: 'template',
    template_name: 'Daniel',
    silence: 'natural',
    zooms: false,
    brolls: false,
  },
};

// Apply strategy
const createVideo = async (contentType, videoUrl) => {
  const strategy = contentStrategy[contentType];

  const baseConfig = {
    title: `${contentType} - ${new Date().toISOString()}`,
    language: 'en',
    video_url: videoUrl,
    magic_zooms: strategy.zooms,
    magic_brolls: strategy.brolls,
    remove_silence_pace: strategy.silence,
    remove_bad_takes: true,
  };

  // Add theme or template
  if (strategy.type === 'custom') {
    baseConfig.user_theme_id = strategy.theme_id;
  } else {
    baseConfig.template_name = strategy.template_name;
  }

  return await submagic_create_project(baseConfig);
};

// Usage
await createVideo('tiktok-video', 'https://...');
await createVideo('linkedin-post', 'https://...');
```

### Strategy 4: Batch Processing for Content Factories

**When to use:** High volume, podcasts, course content

**Workflow:**

```javascript
// Process multiple videos in parallel
const videos = [
  { url: 'https://cdn.com/episode-1.mp4', title: 'Episode 1' },
  { url: 'https://cdn.com/episode-2.mp4', title: 'Episode 2' },
  { url: 'https://cdn.com/episode-3.mp4', title: 'Episode 3' },
];

// Create all projects (rate limit: 500/hour)
const projects = await Promise.all(
  videos.map((video) =>
    submagic_create_project({
      title: video.title,
      language: 'en',
      video_url: video.url,
      template_name: 'Sara',
      magic_zooms: true,
      magic_brolls: true,
      remove_silence_pace: 'fast',
      webhook_url: 'https://myapi.com/webhook',
    }),
  ),
);

// Store project IDs
const projectIds = projects.map((p) => p.id);

// Webhook handler will notify when each completes
// Then auto-export and download
```

**Pro tip:** Use webhooks instead of polling for batch processing!

---

## 💡 Pro Tips & Limitations

### ✅ DO

1. **Cache template/language lists** - They rarely change
2. **Use webhooks** for async processing (don't poll)
3. **Create custom themes once** - Reuse via `user_theme_id`
4. **Test templates** - Try 3-4 before committing
5. **Use dictionary** - Always add brand names, product names
6. **Start conservative** - Use "natural" pace first, then increase
7. **Platform-specific themes** - Different styles for TikTok vs LinkedIn
8. **Batch wisely** - Respect rate limits (500/hour for creation)

### ❌ DON'T

1. **Don't edit fonts via API** - Not supported, use custom themes
2. **Don't use both template_name and user_theme_id** - Choose one
3. **Don't forget to re-export** - Updates don't apply until re-export
4. **Don't over-compress silence** - "extra-fast" can feel unnatural
5. **Don't skip dictionary** - Misspelled brand names look unprofessional
6. **Don't ignore rate limits** - 500 creates/hour, 50 exports/hour
7. **Don't update magic_zooms/brolls** - Can only set at creation time
8. **Don't expect instant exports** - Can take 2-10 minutes

### 🚧 Known Limitations

**API Limitations:**

- Cannot edit individual captions/words via API
- Cannot adjust caption positioning via API
- Cannot change fonts/colors via API (must use custom themes)
- Cannot disable/enable magic_zooms after creation
- Cannot access raw transcript data via MCP server (need direct API)

**Plan Limitations:**

- Custom themes require PRO plan
- Custom font upload requires PRO plan
- Export limits vary by plan tier

**Processing Limitations:**

- Magic clips limited to YouTube URLs only
- Max video length varies by plan
- Processing time 2-10 min (not instant)
- Re-export required after updates (adds processing time)

### 🎯 Rate Limits Summary

| Operation      | Limit | Per  |
| -------------- | ----- | ---- |
| List languages | 1000  | hour |
| List templates | 1000  | hour |
| Create project | 500   | hour |
| Get project    | 500   | hour |
| Update project | 100   | hour |
| Export project | 50    | hour |
| Magic clips    | 500   | hour |

**Best practice:** Use webhooks to avoid excessive polling!

---

## 🎬 Real-World Example: Complete Production Pipeline

```javascript
// ============================================
// Full Production Pipeline
// ============================================

const VideoProduction = {
  // Step 1: Initialize with strategy
  async init() {
    // Cache these (call once per session)
    this.languages = await submagic_list_languages();
    this.templates = await submagic_list_templates();

    // Load brand themes
    this.brandThemes = {
      linkedin: process.env.SUBMAGIC_LINKEDIN_THEME_ID,
      tiktok: process.env.SUBMAGIC_TIKTOK_THEME_ID,
      youtube: process.env.SUBMAGIC_YOUTUBE_THEME_ID,
    };
  },

  // Step 2: Create video with smart defaults
  async createVideo(platform, videoUrl, options = {}) {
    const platformDefaults = {
      linkedin: {
        theme: this.brandThemes.linkedin,
        silence: 'natural',
        zooms: false,
        brolls: false,
      },
      tiktok: {
        theme: this.brandThemes.tiktok,
        silence: 'extra-fast',
        zooms: true,
        brolls: true,
      },
      youtube: {
        theme: this.brandThemes.youtube,
        silence: 'fast',
        zooms: true,
        brolls: true,
      },
    };

    const config = platformDefaults[platform];

    const project = await submagic_create_project({
      title: options.title || `${platform} - ${Date.now()}`,
      language: options.language || 'en',
      video_url: videoUrl,
      user_theme_id: config.theme,
      magic_zooms: config.zooms,
      magic_brolls: config.brolls,
      remove_silence_pace: config.silence,
      remove_bad_takes: true,
      dictionary: options.dictionary || [],
      webhook_url: `https://myapi.com/webhook/${platform}`,
    });

    return project.id;
  },

  // Step 3: Monitor via webhook (recommended)
  async handleWebhook(payload) {
    if (payload.status === 'completed') {
      // Auto-export with platform-specific settings
      const resolution = {
        linkedin: { width: 1080, height: 1920 }, // 9:16
        tiktok: { width: 1080, height: 1920 }, // 9:16
        youtube: { width: 1080, height: 1920 }, // 9:16
      };

      const res = resolution[payload.platform];

      await submagic_export_project({
        project_id: payload.projectId,
        width: res.width,
        height: res.height,
        fps: 30,
        webhook_url: `https://myapi.com/export-webhook/${payload.platform}`,
      });
    }
  },

  // Step 4: Auto-download when export complete
  async handleExportWebhook(payload) {
    if (payload.status === 'completed') {
      const project = await submagic_get_project(payload.projectId);

      // Download video
      const response = await fetch(project.downloadUrl);
      const blob = await response.blob();

      // Save to platform-specific output folder
      const filename = `${payload.platform}_${Date.now()}.mp4`;
      await saveToStorage(filename, blob);

      // Optionally: Auto-post to platform
      await this.autoPost(payload.platform, filename);
    }
  },

  // Step 5: Optional auto-posting
  async autoPost(platform, videoPath) {
    // Your social media posting logic here
    // (Twitter API, LinkedIn API, etc.)
  },
};

// Usage
await VideoProduction.init();

// Create LinkedIn video
const linkedinProjectId = await VideoProduction.createVideo('linkedin', 'https://cdn.mysite.com/raw-video.mp4', {
  title: 'Product Launch Announcement',
  dictionary: ['ProductName', 'FeatureX', 'MyCompany'],
});

// Create TikTok video (same source, different styling!)
const tiktokProjectId = await VideoProduction.createVideo('tiktok', 'https://cdn.mysite.com/raw-video.mp4', {
  title: 'Behind the Scenes - Product Launch',
});

// Webhooks handle the rest automatically!
```

---

## 📖 Summary

**For Fast, Volume Editing:**

- Use pre-made templates ("Hormozi 2", "Sara", "Beast")
- Enable magic_zooms + magic_brolls
- Use "fast" or "extra-fast" silence removal
- Let AI do the heavy lifting

**For Brand-Consistent Editing:**

- Create custom themes in UI (one-time setup)
- Reference via `user_theme_id` in API
- Store theme IDs in environment variables
- Maintain different themes per platform

**For Maximum Control:**

- Start with custom theme for fonts/colors
- Use `custom_broll_items` for specific shots
- Adjust `remove_silence_pace` per content type
- Access transcript for manual fine-tuning

**The SubMagic API is powerful for automation, but font/styling customization requires the UI for theme creation first!**

---

**Questions or issues?**

- API Docs: https://docs.submagic.co
- Support: support@submagic.co
- MCP Server: `/Users/sid/Desktop/4. Coding Projects/sub-magic-mcp-server/`
