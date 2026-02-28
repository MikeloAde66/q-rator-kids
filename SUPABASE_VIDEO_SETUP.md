# Supabase Video Storage Setup Guide

## Step 1: Download Your Video from Canva

Since the download didn't work, try these methods:

### Method A: Direct Download
1. Open your Canva design: https://www.canva.com/design/DAHCWQucSuQ/RD1RaBUWpQWG2OPhp7Npww/watch
2. Click the **Share** button (top right)
3. Select **Download**
4. Choose **MP4 Video**
5. Select quality: **1080p** (or 720p if file is too large)
6. Click **Download** - it should save to your Downloads folder

### Method B: Try Different Browser
If download fails in your current browser, try:
- Chrome
- Firefox
- Safari
- Edge

### Method C: Canva Mobile App
1. Open Canva app on your phone/tablet
2. Find the design
3. Download the video
4. Transfer to your computer via:
   - AirDrop (Mac/iOS)
   - Google Drive
   - Email to yourself

---

## Step 2: Set Up Supabase Storage

### A. Create Storage Bucket

1. **Go to your Supabase Dashboard:**
   - https://supabase.com/dashboard
   - Select your **Q Rator Kids** project

2. **Navigate to Storage:**
   - Click **Storage** in the left sidebar
   - Click **Create a new bucket**

3. **Create the "videos" bucket:**
   ```
   Name: videos
   Public bucket: ✅ YES (checked)
   File size limit: 52428800 (50MB) or higher if needed
   Allowed MIME types: video/mp4, video/webm
   ```
   - Click **Create bucket**

### B. Upload Your Video

1. **Click on the "videos" bucket** you just created
2. **Click "Upload file"**
3. **Select your downloaded Canva video** (animal-friends.mp4)
4. **Wait for upload to complete**

### C. Get the Public URL

1. **Click on the uploaded video file** in Supabase Storage
2. **Click "Copy URL"** or **"Get public URL"**
3. **Copy the full URL** - it will look like:
   ```
   https://[your-project-id].supabase.co/storage/v1/object/public/videos/animal-friends.mp4
   ```

---

## Step 3: Update Your App

Once you have the Supabase public URL, you'll update the Home.tsx file:

**Replace this line (around line 248):**
```tsx
videoUrl="https://www.canva.com/design/DAHCWQucSuQ/RD1RaBUWpQWG2OPhp7Npww/watch"
```

**With your Supabase URL:**
```tsx
videoUrl="https://YOUR-PROJECT-ID.supabase.co/storage/v1/object/public/videos/animal-friends.mp4"
```

---

## Step 4: Create Storage Policies (Optional - for security)

If you want to control access to videos (e.g., only authenticated users):

1. **Go to Storage > Policies**
2. **Click "New Policy"**
3. **Add policy for public read access:**
   ```sql
   -- Allow public read access to videos
   CREATE POLICY "Public videos are viewable by everyone"
   ON storage.objects FOR SELECT
   USING ( bucket_id = 'videos' );
   ```

---

## File Size Recommendations

### For Kids' Educational Videos:
- **720p (HD)**: ~5-15MB per minute (recommended for most lessons)
- **1080p (Full HD)**: ~15-30MB per minute (for high-quality content)
- **Compression**: Use Canva's "Standard" quality if file is too large

### Supabase Free Tier Limits:
- **Storage**: 1GB total
- **Bandwidth**: 2GB per month
- **File upload size**: 50MB per file (can be increased in settings)

### If Your Video is Too Large:
1. Re-export from Canva at **720p** instead of 1080p
2. Use **Standard quality** instead of High
3. Split longer videos into chapters
4. Consider using external video hosting:
   - **Bunny.net**: $1/month, 500GB bandwidth, fast CDN
   - **Vimeo**: $20/month, no file size limits
   - **YouTube (Unlisted)**: Free, unlimited

---

## Step 5: Upload More Lesson Videos

Once you have the "videos" bucket set up, you can upload all your lesson videos:

```
videos/
├── animal-friends.mp4          (Home page intro)
├── lessons/
│   ├── lesson-1-basic-shapes.mp4
│   ├── lesson-2-drawing-animals.mp4
│   ├── lesson-3-colors.mp4
│   └── ... (10 more lessons)
└── stories/
    ├── story-1-starry-night.mp4
    ├── story-2-mona-lisa.mp4
    └── ... (6 stories)
```

---

## Troubleshooting

### Video Won't Download from Canva:
- Check your internet connection
- Try a different browser
- Clear browser cache
- Try Canva mobile app
- Contact Canva support if still failing

### Video Won't Upload to Supabase:
- **File too large?** Increase bucket file size limit
- **Wrong format?** Make sure it's MP4 or WebM
- **Slow upload?** Check your internet speed
- **Storage full?** Check your Supabase usage limits

### Video Won't Play in App:
- Make sure bucket is **public**
- Check the URL is correct (should end in .mp4)
- Test URL directly in browser
- Check browser console for errors
- Make sure CORS is enabled on Supabase

---

## Next Steps After Video Upload

Once your video is uploaded to Supabase:

1. ✅ Copy the public URL
2. ✅ Paste it into `/src/app/pages/Home.tsx` (line 248)
3. ✅ Test the video plays in your app
4. ✅ Upload more lesson videos
5. ✅ Update lesson data files to use Supabase URLs

Let me know the Supabase public URL once you have it, and I'll update the code for you!
