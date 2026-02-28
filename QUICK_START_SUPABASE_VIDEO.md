# 🎬 Quick Start: Upload Your Canva Video to Supabase

## ✅ Step-by-Step Checklist

### 1️⃣ Download Video from Canva

**Option A: Desktop Browser**
1. Go to: https://www.canva.com/design/DAHCWQucSuQ/RD1RaBUWpQWG2OPhp7Npww/watch
2. Click **Share** (top right corner)
3. Click **Download**
4. Select **MP4 Video**
5. Choose **720p** quality (recommended - smaller file size)
6. Click **Download**
7. Video saves to your Downloads folder

**Option B: If download button is grayed out**
- Click **Share** → **Copy link** 
- Open in a different browser (Chrome, Firefox, Edge)
- Try downloading again

**Option C: Canva Mobile App**
- Open Canva app on phone
- Find the design
- Download video
- AirDrop/email to yourself

---

### 2️⃣ Upload to Supabase Storage

**A. Login to Supabase**
1. Go to: https://supabase.com/dashboard
2. Login with your account
3. Select your **Q Rator Kids** project

**B. Create Storage Bucket**
1. Click **Storage** in left sidebar
2. Click **New bucket** button
3. Fill in:
   - **Name**: `videos`
   - **Public**: ✅ Check this box
   - **File size limit**: `52428800` (50MB)
   - **Allowed MIME types**: Leave blank or add `video/mp4`
4. Click **Create bucket**

**C. Upload Your Video**
1. Click on the **videos** bucket you just created
2. Click **Upload file** button
3. Select your downloaded video from Downloads folder
4. Rename it to: `animal-friends.mp4`
5. Click **Upload**
6. Wait for upload to complete (green checkmark)

**D. Get the Public URL**
1. Find `animal-friends.mp4` in the file list
2. Click on the filename
3. Click **Copy URL** button
4. Your URL will look like:
   ```
   https://abcdefghijk.supabase.co/storage/v1/object/public/videos/animal-friends.mp4
   ```

---

### 3️⃣ Update Your App Code

**A. Open the file:** `/src/app/data/videoUrls.ts`

**B. Find this line (around line 12):**
```typescript
const SUPABASE_PROJECT_ID = 'YOUR-PROJECT-ID';
```

**C. Replace with your actual project ID:**

Your Supabase URL is: `https://XXXXXXX.supabase.co/storage/...`

Extract the `XXXXXXX` part and use it:
```typescript
const SUPABASE_PROJECT_ID = 'XXXXXXX';
```

**Example:**
If your URL is:
```
https://abcdefghijk.supabase.co/storage/v1/object/public/videos/animal-friends.mp4
```

Then use:
```typescript
const SUPABASE_PROJECT_ID = 'abcdefghijk';
```

**D. Save the file**

---

### 4️⃣ Test Your Video

1. Run your app locally (if not already running)
2. Open the app in your browser
3. Scroll to the **"Meet Your Animal Friends!"** video section
4. Click the big **Play** button
5. Video should start playing! 🎉

---

## 🚨 Troubleshooting

### Video won't download from Canva?
- ✅ Make sure you're the owner/editor of the design
- ✅ Try a different browser
- ✅ Check internet connection
- ✅ Try Canva mobile app
- ✅ Contact Canva support if still failing

### Can't create Supabase bucket?
- ✅ Make sure you're logged into Supabase
- ✅ Check you selected the correct project
- ✅ Make sure bucket name is just `videos` (no spaces)

### Upload fails or is slow?
- ✅ Check file size (should be under 50MB for free tier)
- ✅ Try 720p instead of 1080p from Canva
- ✅ Check your internet upload speed
- ✅ Try again later (might be temporary server issue)

### Video won't play in app?
- ✅ Make sure bucket is set to **Public**
- ✅ Double-check the URL is correct in `videoUrls.ts`
- ✅ Test the URL directly in a browser tab
- ✅ Check browser console for errors (F12)
- ✅ Make sure the file uploaded completely

---

## 📊 File Size Guide

**Canva Export Quality vs File Size:**
- **480p (SD)**: ~3-8MB per minute (not recommended, too low quality)
- **720p (HD)**: ~8-15MB per minute ⭐ **RECOMMENDED**
- **1080p (Full HD)**: ~15-30MB per minute (only if video is short)

**Supabase Free Tier Limits:**
- ✅ Storage: 1GB total
- ✅ Bandwidth: 2GB/month
- ✅ File size: 50MB per file (can increase in settings)

**Recommendation:**
- Use **720p** for most videos
- If over 50MB, re-export at lower quality or shorter duration

---

## ✅ What's Next?

Once your first video is working:

1. ✅ Upload more lesson videos
2. ✅ Upload story videos
3. ✅ Update lesson/story data to use Supabase URLs
4. ✅ Create character introduction videos (optional)
5. ✅ Set up video bucket permissions/policies

---

## 🆘 Need Help?

**I'm here to help!** Just tell me:
1. What step you're on
2. What error you're seeing (if any)
3. Screenshot of the issue (if possible)

**Example:**
> "I got the URL from Supabase but don't know where to paste it"

> "Video uploaded but won't play - I see error: [paste error]"

> "Can't download from Canva - download button is grayed out"

---

**Your Supabase Project URL:** (paste here after you get it)
```
https://__________.supabase.co/storage/v1/object/public/videos/animal-friends.mp4
```

**Your Project ID:** (extract from URL above)
```
__________
```
