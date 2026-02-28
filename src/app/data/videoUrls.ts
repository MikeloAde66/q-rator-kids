/**
 * Video URLs Configuration
 * 
 * This file manages all video URLs for Q Rator Kids.
 * Videos are hosted on Supabase Storage in the "videos" bucket.
 * 
 * TO UPDATE VIDEOS:
 * 1. Upload video to Supabase Storage (videos bucket)
 * 2. Copy the public URL from Supabase
 * 3. Paste it in the appropriate section below
 */

// Your Supabase project URL base
// Replace with your actual Supabase project ID
const SUPABASE_PROJECT_ID = 'yopuithpufakmkiuufsl';
const SUPABASE_STORAGE_BASE = `https://${SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public`;

// ==========================================
// HOME PAGE VIDEO
// ==========================================

/**
 * Animal Friends Introduction Video
 * Shown on the home page featuring all 5 animal art teachers
 */
export const HOME_VIDEO_URL = `${SUPABASE_STORAGE_BASE}/Q%20Rator%20Videos/Q%20Rator%20kids%20teachers.mp4`;

// OR use the full URL directly:
// export const HOME_VIDEO_URL = 'https://your-project-id.supabase.co/storage/v1/object/public/videos/animal-friends.mp4';

// ==========================================
// LESSON VIDEOS
// ==========================================

/**
 * Individual lesson video URLs
 * Upload each lesson video to Supabase Storage: videos/lessons/
 */
export const LESSON_VIDEOS: Record<string, string> = {
  // Beginner Lessons (Ages 6-8)
  'lesson-1': `${SUPABASE_STORAGE_BASE}/videos/lessons/basic-shapes.mp4`,
  'lesson-2': `${SUPABASE_STORAGE_BASE}/videos/lessons/drawing-animals.mp4`,
  'lesson-3': `${SUPABASE_STORAGE_BASE}/videos/lessons/fun-with-colors.mp4`,
  'lesson-4': `${SUPABASE_STORAGE_BASE}/videos/lessons/trees-and-flowers.mp4`,
  'lesson-5': `${SUPABASE_STORAGE_BASE}/videos/lessons/houses-and-buildings.mp4`,
  
  // Intermediate Lessons (Ages 9-12)
  'lesson-6': `${SUPABASE_STORAGE_BASE}/videos/lessons/perspective-drawing.mp4`,
  'lesson-7': `${SUPABASE_STORAGE_BASE}/videos/lessons/shading-techniques.mp4`,
  'lesson-8': `${SUPABASE_STORAGE_BASE}/videos/lessons/portrait-basics.mp4`,
  'lesson-9': `${SUPABASE_STORAGE_BASE}/videos/lessons/landscape-composition.mp4`,
  'lesson-10': `${SUPABASE_STORAGE_BASE}/videos/lessons/cartoon-characters.mp4`,
};

// ==========================================
// STORY VIDEOS
// ==========================================

/**
 * Animated story video URLs
 * Upload each story video to Supabase Storage: videos/stories/
 */
export const STORY_VIDEOS: Record<string, string> = {
  'story-1': `${SUPABASE_STORAGE_BASE}/videos/stories/starry-night.mp4`,
  'story-2': `${SUPABASE_STORAGE_BASE}/videos/stories/mona-lisa.mp4`,
  'story-3': `${SUPABASE_STORAGE_BASE}/videos/stories/sunflowers.mp4`,
  'story-4': `${SUPABASE_STORAGE_BASE}/videos/stories/the-scream.mp4`,
  'story-5': `${SUPABASE_STORAGE_BASE}/videos/stories/girl-with-pearl-earring.mp4`,
  'story-6': `${SUPABASE_STORAGE_BASE}/videos/stories/water-lilies.mp4`,
};

// ==========================================
// CHARACTER INTRODUCTION VIDEOS
// ==========================================

/**
 * Individual character introduction videos (optional)
 * Upload to Supabase Storage: videos/characters/
 */
export const CHARACTER_VIDEOS: Record<string, string> = {
  'leo': `${SUPABASE_STORAGE_BASE}/videos/characters/leo-intro.mp4`,
  'ellie': `${SUPABASE_STORAGE_BASE}/videos/characters/ellie-intro.mp4`,
  'curator': `${SUPABASE_STORAGE_BASE}/videos/characters/curator-intro.mp4`,
  'milly': `${SUPABASE_STORAGE_BASE}/videos/characters/milly-intro.mp4`,
  'benny': `${SUPABASE_STORAGE_BASE}/videos/characters/benny-intro.mp4`,
};

// ==========================================
// TUTORIAL VIDEOS
// ==========================================

/**
 * Tutorial and onboarding videos
 * Upload to Supabase Storage: videos/tutorials/
 */
export const TUTORIAL_VIDEOS: Record<string, string> = {
  'app-tour': `${SUPABASE_STORAGE_BASE}/videos/tutorials/welcome-tour.mp4`,
  'how-to-draw': `${SUPABASE_STORAGE_BASE}/videos/tutorials/how-to-use-lessons.mp4`,
  'parent-dashboard': `${SUPABASE_STORAGE_BASE}/videos/tutorials/parent-guide.mp4`,
};

// ==========================================
// ENTERTAINMENT VIDEOS (FOR KIDS!)
// ==========================================

/**
 * Fun entertainment videos for kids
 * Upload to Supabase Storage: Q Rator Videos/entertainment/
 * 
 * TO ADD A NEW ENTERTAINMENT VIDEO:
 * 1. Upload your video to Supabase Storage
 * 2. Copy the public URL 
 * 3. Add a new entry below with a descriptive key
 * 
 * Example URL format:
 * `${SUPABASE_STORAGE_BASE}/Q%20Rator%20Videos/entertainment/your-video-name.mp4`
 */
export const ENTERTAINMENT_VIDEOS: Record<string, { url: string; title: string; description: string; ageGroup?: 'beginner' | 'intermediate' | 'all' }> = {
  // Add your entertainment videos here!
  // Example:
  // 'sing-along': {
  //   url: `${SUPABASE_STORAGE_BASE}/Q%20Rator%20Videos/entertainment/animal-sing-along.mp4`,
  //   title: 'Animal Art Song! 🎵',
  //   description: 'Sing along with your animal friends about colors and shapes!',
  //   ageGroup: 'all'
  // },
  // 'dance-party': {
  //   url: `${SUPABASE_STORAGE_BASE}/Q%20Rator%20Videos/entertainment/art-dance-party.mp4`,
  //   title: 'Art Dance Party! 💃',
  //   description: 'Dance and move with Leo and friends!',
  //   ageGroup: 'beginner'
  // },
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get video URL for a specific lesson
 */
export function getLessonVideoUrl(lessonId: string): string | undefined {
  return LESSON_VIDEOS[lessonId];
}

/**
 * Get video URL for a specific story
 */
export function getStoryVideoUrl(storyId: string): string | undefined {
  return STORY_VIDEOS[storyId];
}

/**
 * Get video URL for a specific character
 */
export function getCharacterVideoUrl(characterId: string): string | undefined {
  return CHARACTER_VIDEOS[characterId];
}

/**
 * Get entertainment video by key
 */
export function getEntertainmentVideo(videoKey: string): { url: string; title: string; description: string; ageGroup?: 'beginner' | 'intermediate' | 'all' } | undefined {
  return ENTERTAINMENT_VIDEOS[videoKey];
}

/**
 * Get all entertainment videos
 */
export function getAllEntertainmentVideos(): Array<{ key: string; url: string; title: string; description: string; ageGroup?: 'beginner' | 'intermediate' | 'all' }> {
  return Object.entries(ENTERTAINMENT_VIDEOS).map(([key, data]) => ({
    key,
    ...data
  }));
}

/**
 * Get entertainment videos filtered by age group
 */
export function getEntertainmentVideosByAge(ageGroup: 'beginner' | 'intermediate' | 'all'): Array<{ key: string; url: string; title: string; description: string; ageGroup?: 'beginner' | 'intermediate' | 'all' }> {
  return Object.entries(ENTERTAINMENT_VIDEOS)
    .filter(([_, data]) => !data.ageGroup || data.ageGroup === 'all' || data.ageGroup === ageGroup)
    .map(([key, data]) => ({ key, ...data }));
}

/**
 * Check if a video URL is valid (uploaded to Supabase)
 */
export function isVideoAvailable(url: string | undefined): boolean {
  if (!url) return false;
  // Check if it's not a placeholder
  return !url.includes('YOUR-PROJECT-ID') && url.length > 0;
}

// ==========================================
// FALLBACK PLACEHOLDER
// ==========================================

/**
 * Placeholder for videos that haven't been uploaded yet
 * You can replace this with a "Coming Soon" video or poster image
 */
export const PLACEHOLDER_VIDEO = '/videos/coming-soon.mp4';