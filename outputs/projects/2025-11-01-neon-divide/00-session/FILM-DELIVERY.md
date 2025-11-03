# NEON DIVIDE - Cinematic Film Delivery

**Genre:** Sci-Fi Dystopian Romance
**Inspiration:** Romeo & Juliet in retro-cyberpunk future
**Created:** November 1, 2025
**Runtime:** 64 seconds (8 scenes × 8s each)
**Format:** 1280x720 @ 24fps, 16:9 cinematic

---

## 🎬 THE FILM

**"NEON DIVIDE"** tells the story of Aria (corporate elite) and Kai (lower district rebel) - star-crossed lovers separated by a glowing neon wall in a dystopian megacity. Their forbidden connection defies faction borders, but discovery forces heartbreaking sacrifice. Separated by the barrier, a flickering holographic heart promises eventual reunion.

**Visual Style:** Dark moody cyberpunk with retro-futuristic 1980s Blade Runner aesthetic. Cyan/magenta neon color grading, film grain, analog warmth with digital decay.

---

## 📹 SCENE BREAKDOWN & CLOUDINARY URLS

### ACT I: The Divided World

**Scene 1: The Divided City (8s)**

- **Description:** Aerial establishing shot of megacity split by glowing neon wall
- **Local:** `04-media/videos/scene-01-divided-city.mp4`
- **Cloudinary:** https://res.cloudinary.com/dnezawwer/video/upload/v1762045446/neon-divide/scene-01-divided-city.mp4
- **Camera:** Slow forward dolly descending from altitude
- **Key Elements:** Corporate towers (blue) vs industrial decay (amber/red), rain, holographic ads

**Scene 2: Her World (8s)**

- **Description:** Close-up of Aria at corporate tower window gazing at lower district
- **Local:** `04-media/videos/scene-02-her-world.mp4`
- **Cloudinary:** https://res.cloudinary.com/dnezawwer/video/upload/v1762045448/neon-divide/scene-02-her-world.mp4
- **Camera:** Slow push-in from medium to close-up
- **Key Elements:** Holographic data streams, blue neon reflection, longing expression

**Scene 3: His World (8s)**

- **Description:** Kai working in industrial workshop, looks up toward upper city
- **Local:** `04-media/videos/scene-03-his-world.mp4`
- **Cloudinary:** https://res.cloudinary.com/dnezawwer/video/upload/v1762045452/neon-divide/scene-03-his-world.mp4
- **Camera:** Handheld-style circular tracking
- **Key Elements:** CRT monitors, analog dials, steam pipes, amber neon, determination

### ACT II: The Connection

**Scene 4: The Meeting (8s)**

- **Description:** First encounter in abandoned subway station at border
- **Local:** `04-media/videos/scene-04-the-meeting.mp4`
- **Cloudinary:** https://res.cloudinary.com/dnezawwer/video/upload/v1762045454/neon-divide/scene-04-the-meeting.mp4
- **Camera:** Dual tracking shots converging to center
- **Key Elements:** Flickering lights, pink/cyan graffiti, symmetrical composition, time slows

**Scene 5: The Connection (8s)**

- **Description:** Extreme close-up of hands reaching, holographic sparks between them
- **Local:** `04-media/videos/scene-05-the-connection.mp4`
- **Cloudinary:** https://res.cloudinary.com/dnezawwer/video/upload/v1762045468/neon-divide/scene-05-the-connection.mp4
- **Camera:** Macro shot, shallow depth of field, slow motion
- **Key Elements:** Cyan vs magenta hand lighting, neural-link particles, defiant love

### ACT III: The Consequences

**Scene 6: The Chase (8s)**

- **Description:** Couple runs hand-in-hand through tunnels pursued by drones
- **Local:** `04-media/videos/scene-06-the-chase.mp4`
- **Cloudinary:** https://res.cloudinary.com/dnezawwer/video/upload/v1762045470/neon-divide/scene-06-the-chase.mp4
- **Camera:** Fast tracking following from behind
- **Key Elements:** Security drones, red laser beams, alarm strobes, enforcer shadows, urgency

**Scene 7: The Sacrifice (8s)**

- **Description:** Kai pushes Aria through barrier to safety, separated by energy field
- **Local:** `04-media/videos/scene-07-the-sacrifice.mp4`
- **Cloudinary:** https://res.cloudinary.com/dnezawwer/video/upload/v1762045471/neon-divide/scene-07-the-sacrifice.mp4
- **Camera:** Split-screen composition, close-up on barrier
- **Key Elements:** Hands pressed on opposite sides, blue vs amber lighting, heartbreak, lens flare

**Scene 8: The Promise (8s)**

- **Description:** Dual split-screen showing both in separate worlds with holographic heart
- **Local:** `04-media/videos/scene-08-the-promise.mp4`
- **Cloudinary:** https://res.cloudinary.com/dnezawwer/video/upload/v1762045473/neon-divide/scene-08-the-promise.mp4
- **Camera:** Slow dolly back from close-ups to wide cityscape
- **Key Elements:** Symmetrical composition, flickering heart symbol, bittersweet hope, divided city callback

---

## 👥 CHARACTERS

**ARIA** (Upper District Elite)

- Young East Asian woman, early 20s
- Sleek black hair with blue highlights, cybernetic temple enhancement
- White corporate blazer, silver accents, holographic ID badge
- Cold blue neon lighting aesthetic
- **Reference:** `04-media/images/character-aria-reference.png`

**KAI** (Lower District Rebel)

- Young man, early 20s
- Messy dark brown hair, rugged appearance, scar on cheek
- Distressed brown leather jacket, cargo pants, combat boots
- Warm amber/red neon lighting aesthetic
- **Reference:** `04-media/images/character-kai-reference.png`

---

## 🎨 PRODUCTION DETAILS

**AI Model:** Google Veo 3 (veo-3.0-fast-generate-preview)
**Generation Platform:** veotools MCP server
**Character Design:** nanobanana (Gemini 2.5 Flash) using Emily JSON methodology
**Total Generation Time:** ~7 minutes (8 scenes in parallel)
**Total File Size:** ~32 MB (8 videos)

**Technical Specs:**

- Resolution: 1280×720 (HD)
- Frame Rate: 24 fps
- Total Frames: 1,536 frames
- Format: MP4 H.264
- Color: Cyan/magenta/amber grading with film grain

---

## 🎞️ POST-PRODUCTION NEXT STEPS

### 1. Combine Scenes (FFmpeg)

```bash
# Create concat file
cat > concat.txt << EOF
file 'scene-01-divided-city.mp4'
file 'scene-02-her-world.mp4'
file 'scene-03-his-world.mp4'
file 'scene-04-the-meeting.mp4'
file 'scene-05-the-connection.mp4'
file 'scene-06-the-chase.mp4'
file 'scene-07-the-sacrifice.mp4'
file 'scene-08-the-promise.mp4'
EOF

# Concatenate
ffmpeg -f concat -safe 0 -i concat.txt -c copy neon-divide-complete.mp4
```

### 2. Add Audio (Recommended)

- **Soundtrack:** Retro-synth wave (think Vangelis, Kavinsky, M83)
- **Sound Design:** Ambient cyberpunk sounds (rain, neon hum, machinery, alarms)
- **Dialogue:** Optional - could add voice-over narration or character dialogue
- **Music Tempo:** 80-100 BPM slow burn to match emotional pacing

### 3. Final Color Grade

- Apply unified cyan/magenta LUT across all scenes
- Add film grain overlay (16mm texture)
- Vignette on emotional moments (scenes 5, 7, 8)
- Enhance neon glow effects

### 4. Export & Distribute

- **Master:** 1920×1080 or 4K upscale
- **YouTube:** Upload as short film with title cards
- **Social Cutdowns:**
  - 15s trailer (scenes 1, 4, 6, 7)
  - 30s teaser (scenes 1-4 or 5-8)
  - 9:16 vertical version for Reels/Shorts

---

## 📊 PROJECT STATS

**Deliverables:**

- ✅ 8 cinematic scenes (64 seconds total)
- ✅ 2 character reference sheets
- ✅ All assets uploaded to Cloudinary CDN
- ✅ Complete metadata documentation
- ✅ Platform-agnostic naming for reusability

**Asset Locations:**

- **Local Project:** `/outputs/projects/2025-11-01-neon-divide/04-media/`
- **Cloudinary Folder:** `neon-divide/`
- **Character Refs:** `04-media/images/`
- **Video Scenes:** `04-media/videos/`

---

## 🎯 NARRATIVE ARC

**Setup (Scenes 1-3):** Establish divided world, introduce Aria (isolated privilege) and Kai (determined rebellion)

**Confrontation (Scenes 4-5):** First meeting in neutral ground, forbidden connection forms through neural-link

**Resolution (Scenes 6-8):** Discovery leads to chase, Kai sacrifices himself to save Aria, separated but connected by promise

**Theme:** Love transcends barriers, hope persists in darkness, unfinished story inviting continuation

---

## 🚀 READY FOR FINAL ASSEMBLY

All 8 scenes are rendered, organized, and hosted. You can:

1. Combine them using FFmpeg command above
2. Import into video editor (DaVinci Resolve, Premiere Pro, Final Cut)
3. Add audio/music/sound design
4. Apply final color grade
5. Export master file
6. Distribute to platforms

**Total Production Time:** ~10 minutes from concept to delivery! 🎬✨

---

**Project Status:** ✅ COMPLETE - Ready for post-production assembly
