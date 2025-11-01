# Audio Replacement Guide for THE JOURNEY

## Quick FFmpeg Commands

### Option 1: Replace Audio Entirely
```bash
cd /Users/sid/Desktop/4.\ Coding\ Projects/social-media-manager/outputs/10-31-2025/cinematic-short-journey/videos

# Replace audio (your music file must be at least 64 seconds)
ffmpeg -i THE-JOURNEY-FINAL.mp4 -i YOUR-MUSIC-FILE.mp3 \
  -c:v copy -map 0:v:0 -map 1:a:0 -shortest \
  THE-JOURNEY-WITH-MUSIC.mp4
```

### Option 2: Mix Veo Audio with Music
```bash
# Keep atmospheric Veo sounds, add music underneath
ffmpeg -i THE-JOURNEY-FINAL.mp4 -i YOUR-MUSIC-FILE.mp3 \
  -filter_complex "[0:a]volume=0.3[a0];[1:a]volume=0.7[a1];[a0][a1]amix=inputs=2:duration=shortest[aout]" \
  -map 0:v -map "[aout]" -c:v copy \
  THE-JOURNEY-MIXED-AUDIO.mp4
```
**Mix levels**: Veo ambient at 30%, music at 70%

### Option 3: Remove All Audio (Silent Film)
```bash
# Create silent version
ffmpeg -i THE-JOURNEY-FINAL.mp4 -an -c:v copy \
  THE-JOURNEY-SILENT.mp4
```

---

## Music Recommendations (True Detective / No Country Style)

### Characteristics to Look For:
- **Tempo**: 60-80 BPM (slow, meditative)
- **Instrumentation**: Sparse piano, drones, ambient pads, minimal percussion
- **Mood**: Dark, atmospheric, tension, existential
- **Style**: Ambient, neo-classical, dark ambient, cinematic suspense
- **Artists similar to**: T Bone Burnett (No Country), Lera Lynn (True Detective), Hildur Guðnadóttir (Chernobyl)

### Royalty-Free Sources:
1. **Epidemic Sound** - "Dark Ambient" category
2. **Artlist** - "Cinematic Tension" playlists
3. **Soundstripe** - "True Detective style" search
4. **Free Music Archive** - Search "dark ambient cinematic"
5. **YouTube Audio Library** - "Ambient" + "Dark" filters

### Search Terms:
- "dark ambient drone royalty free"
- "cinematic tension building music"
- "atmospheric suspense soundtrack"
- "minimal piano noir"
- "existential ambient music"

---

## Step-by-Step Workflow

1. **Find or create 64-second music track** (or longer, will auto-trim)
2. **Download to project folder**
3. **Run FFmpeg command** (Option 1, 2, or 3 above)
4. **Review result**
5. **Adjust mix levels** if using Option 2

---

## Pro Tips

**If music is shorter than 64s**:
```bash
# Loop music to fit video length
ffmpeg -stream_loop -1 -i SHORT-MUSIC.mp3 -i THE-JOURNEY-FINAL.mp4 \
  -c:v copy -map 0:a -map 1:v -shortest \
  THE-JOURNEY-WITH-LOOPED-MUSIC.mp4
```

**Fade in/out**:
```bash
# Add 2s fade-in and 3s fade-out to music
ffmpeg -i THE-JOURNEY-FINAL.mp4 -i MUSIC.mp3 \
  -filter_complex "[1:a]afade=t=in:st=0:d=2,afade=t=out:st=61:d=3[a]" \
  -map 0:v -map "[a]" -c:v copy -shortest \
  THE-JOURNEY-FADED-MUSIC.mp4
```

**Adjust music volume**:
```bash
# Make music quieter/louder (1.0 = normal, 0.5 = half volume, 2.0 = double)
ffmpeg -i THE-JOURNEY-FINAL.mp4 -i MUSIC.mp3 \
  -filter_complex "[1:a]volume=0.6[a]" \
  -map 0:v -map "[a]" -c:v copy -shortest \
  THE-JOURNEY-ADJUSTED-VOLUME.mp4
```

---

## Current Status

- ✅ Final video ready: `THE-JOURNEY-FINAL.mp4` (with Veo native audio)
- ⏳ Awaiting music selection
- 📝 FFmpeg commands ready for audio replacement

**Next step**: Find your music track, then I'll help you replace the audio!
