# The Distance Between - Quick Start Guide

**Status**: Ready for production with corrected workflow
**Setup**: ✅ All 18 character references uploaded to Cloudinary

---

## 🚨 The Issue (Now Fixed)

**What was failing**:
```javascript
❌ Using father refs + son refs in same scene
{
  "image_urls": [
    "father-young-front.png",    // Person A
    "father-young-3quarter.png", // Person A
    "son-child-front.png"        // Person B ← Veo can't handle 2 people
  ]
}
```

**Why**: Veo 3.1 reference-to-video expects **3 views of ONE character**, not 2 different people.

---

## ✅ The Solution (3 Strategies)

### Strategy A: Primary Character Focus (Most Scenes)
**Use for**: Father + son together, one character dominates
```javascript
{
  "image_urls": [
    "[Primary character view 1]",  // e.g., father-young-front
    "[Primary character view 2]",  // e.g., father-young-3quarter
    "[Primary character view 3]"   // e.g., father-young-profile
  ],
  "prompt": "Using provided images for [primary]: [primary from refs] [actions]. [Secondary character DETAILED text description] [actions]..."
}
```

**Result**: Primary locked via refs, secondary generated from detailed text.

### Strategy B: Solo Character (3 Scenes)
**Use for**: Only one person in scene
```javascript
{
  "image_urls": [
    "[Character view 1]",
    "[Character view 2]",
    "[Character view 3]"
  ],
  "prompt": "Using provided images: [character actions]..."
}
```

**Result**: Perfect character consistency, easiest execution.

### Strategy C: Shot/Reverse-Shot (2-3 Scenes)
**Use for**: Emotional confrontations, dialogue-like exchanges
- Generate 2 separate videos (one for each character)
- Intercut in final edit

---

## 🎬 Start Here: Scene 8 Test (5 Minutes)

**Why Scene 8 first?**
- Solo character (son only) = guaranteed to work
- Validates entire workflow before committing to 18 scenes
- Quick (~4 min generation)

**Command**:
```javascript
{
  "endpoint": "fal-ai/veo3.1/reference-to-video",
  "category_hint": "image_to_video",
  "input_params": {
    "image_urls": [
      "https://res.cloudinary.com/dnezawwer/image/upload/v1761909204/films/the-distance-between-father-son/son-adult-front.png",
      "https://res.cloudinary.com/dnezawwer/image/upload/v1761909205/films/the-distance-between-father-son/son-adult-3quarter.png",
      "https://res.cloudinary.com/dnezawwer/image/upload/v1761909206/films/the-distance-between-father-son/son-adult-profile.png"
    ],
    "prompt": "Using the provided character images: Stylized animated aesthetic, South Asian male 28-32 years working late at laptop in dark urban apartment. Phone rings displaying Dad caller ID, son stares at phone for moment, doesn't answer, returns to work with subtle guilt visible in expression. Medium shot 3m away slow push-in to medium-close, 50mm lens, cool blue computer screen light, single warm desk lamp, city lights through window creating depth. Timeline: 0-2.5s son typing at desk focused, phone begins ringing, blue light illuminates his face from screen. 2.5-5s son looks at phone screen showing Dad, hand hovers over phone hesitates, internal conflict visible. 5-8s lets phone ring out unanswered, slight exhale of resignation, returns to laptop typing, subtle guilt in eyes, hold on urban isolation.",
    "duration": "8s",
    "resolution": "1080p",
    "generate_audio": false
  }
}
```

**If this works** → Full production ready
**If this fails** → Debug before proceeding

---

## 📋 Complete Scene Generation Order

**Use this order** (optimized for dependencies):

### Act 1: Childhood Wonder
1. Scene 1 (father primary + son text)
2. Scene 2 (father primary + scene1-lastframe)
3. Scene 3 (father primary + scene2-lastframe)

### Act 2: Teenage Fracture
4. Scene 4A (father solo) + 4B (son solo) → intercut
5. Scene 5 (father primary + scene4A-lastframe)
6. Scene 6 (father solo + scene5-lastframe)
7. Scene 7 (father primary + scene6-lastframe)

### Act 3: Adult Distance
8. Scene 8 (son solo) ← **START HERE FOR TEST**
9. Scene 9A (father solo) + 9B (son solo) → split screen
10. Scene 10A (father solo) + 10B (son solo) → intercut
11. Scene 11 (son primary + scene10B-lastframe)

### Act 4: Return & Resolution
12. Scene 12 (son solo + scene11-lastframe)
13. Scene 13 (son solo + scene12-lastframe)
14. Scene 14 (father primary + scene13-lastframe)
15. Scene 15 (father primary + scene14-lastframe)
16. Scene 16 (father primary + scene15-lastframe)
17. Scene 17 (father primary + scene16-lastframe)
18. Scene 18 (son solo + scene17-lastframe)

**Total videos to generate**: 24 (18 main + 6 splits/reverses)

---

## 🔧 Key Corrections Applied

1. ✅ **Never mix father + son refs in same image_urls array**
2. ✅ **Removed all "Ghibli" trademark mentions**
3. ✅ **Shortened prompts to 600-800 chars** (from 1000+)
4. ✅ **Clear primary character signal** in every prompt
5. ✅ **Detailed secondary character text descriptions**
6. ✅ **Proper last frame seeding workflow** (extract → upload → use)

---

## 📁 Your Current Assets (Ready!)

**Character References**: ✅ All 18 uploaded to Cloudinary
- Father young (3 views)
- Father middle (3 views)
- Father older (3 views)
- Son child (3 views)
- Son teenager (3 views)
- Son adult (3 views)

**Scripts & Planning**: ✅ Complete
- Story outline
- Complete video prompts JSON
- Production guide

**Folder Structure**: ✅ Ready
```
the-distance-between-father-son/
├── assets/ (character refs ready)
├── videos/ (empty, ready for output)
├── prompts/ (ready)
└── metadata/ (character-references.json ready)
```

---

## 🚀 Ready to Execute

**Recommended path**:

1. **Generate Scene 8** (test run, 4 min)
2. **Review result** (character consistency check)
3. **If approved**: Generate Act 1 (Scenes 1-3, ~12 min)
4. **Continue** through all 4 acts
5. **Edit & composite** multi-character scenes
6. **Add music** (4 different themes per act)
7. **Final assembly**

**Type "start with scene 8" to begin, or "full production" to go all-in!**

---

**This corrected strategy avoids the multi-character reference error entirely while maintaining character consistency through proven techniques from THE JOURNEY.**
