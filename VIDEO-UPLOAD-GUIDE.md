# 🎬 Video Upload Guide for Q Rator Kids

## 🎉 NEW: Entertainment Gallery Page is Live!

You now have a **fully functional Entertainment Gallery page** at `/entertainment`! It features:
- **🎵 Video Playlist Player** - Watch multiple videos in sequence
- **📺 Grid View** - See all videos at once
- **🎯 Age Filtering** - Show videos for specific age groups (6-8, 9-12, or All)
- **✨ Beautiful animations** - Kid-friendly interface with bouncy buttons
- **📱 Fully responsive** - Works perfectly on tablets and phones

**Try it now:** Just navigate to "Videos" in the main menu!

---

## Quick Start: Adding Videos to Your App

### Step 1: Upload to Supabase Storage

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard/project/yopuithpufakmkiuufsl
   - Click **Storage** in the left sidebar
   - Select **"Q Rator Videos"** bucket

2. **Upload Your Video**
   - Click **"Upload File"** button
   - Select your video file (up to 5GB with Pro!)
   - Wait for upload to complete

3. **Get the Public URL**
   - Click on the uploaded video file
   - Click **"Get URL"** or **"Copy URL"** button
   - Your URL will look like:
     ```
     https://yopuithpufakmkiuufsl.supabase.co/storage/v1/object/public/Q%20Rator%20Videos/your-video.mp4
     ```

---

### Step 2: Add Video to Your App

Open `/src/app/data/videoUrls.ts` and add your video URL to the appropriate section:

#### **🏠 Home Page Video**
Replace the existing home video:
```typescript
export const HOME_VIDEO_URL = `https://yopuithpufakmkiuufsl.supabase.co/storage/v1/object/public/Q%20Rator%20Videos/your-new-home-video.mp4`;
```

#### **📚 Lesson Videos**
Add to the `LESSON_VIDEOS` object:
```typescript
export const LESSON_VIDEOS: Record<string, string> = {
  'lesson-1': `${SUPABASE_STORAGE_BASE}/Q%20Rator%20Videos/lessons/basic-shapes.mp4`,
  // Add your new lesson:
  'lesson-11': `${SUPABASE_STORAGE_BASE}/Q%20Rator%20Videos/lessons/advanced-coloring.mp4`,
};
```

#### **📖 Story Videos**
Add to the `STORY_VIDEOS` object:
```typescript
export const STORY_VIDEOS: Record<string, string> = {
  'story-1': `${SUPABASE_STORAGE_BASE}/Q%20Rator%20Videos/stories/starry-night.mp4`,
  // Add your new story:
  'story-7': `${SUPABASE_STORAGE_BASE}/Q%20Rator%20Videos/stories/the-kiss.mp4`,
};
```

#### **🎭 Character Introduction Videos**
Add to the `CHARACTER_VIDEOS` object:
```typescript
export const CHARACTER_VIDEOS: Record<string, string> = {
  'leo': `${SUPABASE_STORAGE_BASE}/Q%20Rator%20Videos/characters/leo-intro.mp4`,
  // Already set up for all 5 characters
};
```

#### **🎉 Entertainment Videos (NEW!)**
Add fun entertainment videos:
```typescript
export const ENTERTAINMENT_VIDEOS: Record<string, { url: string; title: string; description: string; ageGroup?: 'beginner' | 'intermediate' | 'all' }> = {
  'sing-along': {
    url: `${SUPABASE_STORAGE_BASE}/Q%20Rator%20Videos/entertainment/animal-sing-along.mp4`,
    title: 'Animal Art Song! 🎵',
    description: 'Sing along with your animal friends about colors and shapes!',
    ageGroup: 'all'
  },
  'dance-party': {
    url: `${SUPABASE_STORAGE_BASE}/Q%20Rator%20Videos/entertainment/art-dance-party.mp4`,
    title: 'Art Dance Party! 💃',
    description: 'Dance and move with Leo and friends!',
    ageGroup: 'beginner'
  },
  'story-time': {
    url: `${SUPABASE_STORAGE_BASE}/Q%20Rator%20Videos/entertainment/bedtime-stories.mp4`,
    title: 'Bedtime Art Stories 🌙',
    description: 'Relaxing art stories to wind down!',
    ageGroup: 'all'
  },
};
```

---

## 📁 Organizing Your Videos in Supabase

**Recommended folder structure in "Q Rator Videos" bucket:**

```
Q Rator Videos/
├── home/
│   └── Q Rator kids teachers.mp4 (current home video)
├── lessons/
│   ├── basic-shapes.mp4
│   ├── drawing-animals.mp4
│   └── ...
├── stories/
│   ├── starry-night.mp4
│   ├── mona-lisa.mp4
│   └── ...
├── characters/
│   ├── leo-intro.mp4
│   ├── ellie-intro.mp4
│   └── ...
├── entertainment/
│   ├── sing-along.mp4
│   ├── dance-party.mp4
│   └── ...
└── tutorials/
    ├── welcome-tour.mp4
    └── ...
```

**To create folders:**
- Just upload files with slashes in the name: `lessons/basic-shapes.mp4`
- Supabase will automatically create folders

---

## 🎯 Example: Adding a Sing-Along Video

### Full Example Workflow:

1. **Upload Video to Supabase**
   - Go to Storage → Q Rator Videos
   - Click Upload
   - Select `animal-sing-along.mp4`
   - Upload completes

2. **Copy the URL**
   ```
   https://yopuithpufakmkiuufsl.supabase.co/storage/v1/object/public/Q%20Rator%20Videos/entertainment/animal-sing-along.mp4
   ```

3. **Add to videoUrls.ts**
   ```typescript
   export const ENTERTAINMENT_VIDEOS = {
     'sing-along': {
       url: `${SUPABASE_STORAGE_BASE}/Q%20Rator%20Videos/entertainment/animal-sing-along.mp4`,
       title: 'Animal Art Song! 🎵',
       description: 'Sing along with your animal friends!',
       ageGroup: 'all'
     },
   };
   ```

4. **Done!** Video is now available in your app!

---

## 🚀 Using Videos in Your App

### Import and Use Anywhere:

```typescript
import { HOME_VIDEO_URL, getAllEntertainmentVideos } from '../data/videoUrls';
import { VideoPlayer } from '../components/VideoPlayer';

// Use the home video
<VideoPlayer videoUrl={HOME_VIDEO_URL} title="Meet Your Friends!" />

// Get entertainment videos
const entertainmentVideos = getAllEntertainmentVideos();
entertainmentVideos.map(video => (
  <VideoPlayer 
    key={video.key}
    videoUrl={video.url} 
    title={video.title}
  />
))
```

---

## 🎨 Video Recommendations for Kids

**Best Settings for Q Rator Kids Videos:**

| Setting | Recommended | Why |
|---------|-------------|-----|
| **Resolution** | 1280x720 (720p) or 1920x1080 (1080p) | Perfect for tablets & computers |
| **Frame Rate** | 24-30 fps | Smooth playback, smaller file size |
| **Format** | MP4 (H.264) | Universal compatibility |
| **Bitrate** | 2-5 Mbps | High quality, reasonable size |
| **Audio** | AAC, 128-192 kbps | Clear sound for kids |
| **Length** | 2-10 minutes | Ideal attention span for kids |

**File Size Estimates:**
- 5-minute 720p video: ~75-150MB
- 5-minute 1080p video: ~150-300MB
- 10-minute 720p video: ~150-300MB

**With Pro (5GB limit), you can upload:**
- ~17 high-quality 10-minute videos (300MB each)
- ~33 medium-quality 10-minute videos (150MB each)
- ~66 short 5-minute videos (75MB each)

---

## 🎭 Ideas for Entertainment Videos

Here are some video ideas you can create:

1. **🎵 Sing-Along Videos**
   - Songs about colors, shapes, animals
   - Interactive karaoke-style with lyrics
   - Dance-along movements

2. **🎨 Art Challenges**
   - "Draw this in 30 seconds!"
   - "Color mixing magic!"
   - "What can you make with circles?"

3. **📚 Animated Storytelling**
   - Character adventures
   - Behind-the-scenes with animal teachers
   - "A Day in the Art Studio"

4. **🎮 Interactive Games**
   - "Spot the difference" in artwork
   - "Guess the color!"
   - "Find the shape!"

5. **🌟 Motivation & Encouragement**
   - "You're an amazing artist!"
   - Character pep talks
   - Celebration videos for milestones

6. **😴 Calm/Relaxation**
   - Bedtime art stories
   - Gentle drawing demonstrations
   - Relaxing color exploration

---

## 💡 Pro Tips

1. **Test Videos Locally First**
   - Make sure they play smoothly on different devices
   - Check audio levels (not too loud for kids!)
   - Verify length is appropriate

2. **Use Descriptive File Names**
   - Good: `animal-sing-along-colors.mp4`
   - Bad: `video1.mp4`

3. **Keep Originals**
   - Always save original high-quality versions
   - You can re-export if needed

4. **Monitor Storage Usage**
   - Check Supabase dashboard for storage stats
   - Pro plan: 100GB total (you have plenty!)

5. **Create Thumbnails**
   - Upload poster images for each video
   - Use as `posterImage` prop in VideoPlayer

---

## 🔧 Helper Functions Available

```typescript
// Get specific lesson video
const lessonUrl = getLessonVideoUrl('lesson-1');

// Get specific story video
const storyUrl = getStoryVideoUrl('story-1');

// Get specific character video
const characterUrl = getCharacterVideoUrl('leo');

// Get specific entertainment video
const entertainmentVideo = getEntertainmentVideo('sing-along');

// Get all entertainment videos
const allVideos = getAllEntertainmentVideos();

// Get entertainment videos by age group
const beginnerVideos = getEntertainmentVideosByAge('beginner');
const intermediateVideos = getEntertainmentVideosByAge('intermediate');
const allAgeVideos = getEntertainmentVideosByAge('all');

// Check if video is available
const isAvailable = isVideoAvailable(videoUrl);
```

---

## ✅ Quick Checklist

Before uploading a new video:

- [ ] Video is under 5GB (Pro limit)
- [ ] Video is in MP4 format (H.264)
- [ ] Audio is clear and appropriate volume
- [ ] Content is kid-friendly (ages 6-12)
- [ ] Length is appropriate (2-10 minutes ideal)
- [ ] File name is descriptive
- [ ] You have the public URL ready

After uploading:

- [ ] Added URL to `/src/app/data/videoUrls.ts`
- [ ] Tested video plays in the app
- [ ] Checked on different screen sizes
- [ ] Video loads smoothly

---

## 🎉 You're Ready to Add Videos!

Your Supabase Pro account is set up perfectly for adding tons of awesome video content. Just upload to Storage, copy the URL, add it to `videoUrls.ts`, and you're done!

**Need help creating an entertainment page?** Just ask and I'll build a beautiful video gallery page for all your entertainment content! 🚀