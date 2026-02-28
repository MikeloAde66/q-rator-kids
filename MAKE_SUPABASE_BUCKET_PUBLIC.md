# 🔓 Make Your Supabase Video Bucket Public

## ⚠️ Important: Your video URL is currently using a SIGNED token

The URL you provided:
```
https://yopuithpufakmkiuufsl.supabase.co/storage/v1/object/sign/...?token=...
```

This token **WILL EXPIRE** (usually in 7 days). We need to make the bucket **PUBLIC** so videos work permanently.

---

## ✅ Step-by-Step: Make Bucket Public

### Option 1: Update Existing Bucket

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project**: Q Rator Kids
3. **Click Storage** in left sidebar
4. **Find your bucket**: "Q Rator Videos"
5. **Click the three dots (⋮)** next to the bucket name
6. **Click "Edit bucket"**
7. **Check the box**: ✅ **Public bucket**
8. **Click "Save"**

### Option 2: Check Bucket Policies

If the bucket is already public but videos still don't load:

1. **Go to Storage** → **Policies**
2. **Click "New Policy"**
3. **Select**: "For full customization"
4. **Use this policy**:

```sql
-- Allow public read access to all files in Q Rator Videos bucket
CREATE POLICY "Public video access"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id = 'Q Rator Videos' );
```

5. **Click "Review"** → **Save policy**

---

## 🎯 Your Updated Video URL

Once the bucket is public, your video URL will be:

```
https://yopuithpufakmkiuufsl.supabase.co/storage/v1/object/public/Q%20Rator%20Videos/Q%20Rator%20kids%20teachers.mp4
```

**I've already updated your app to use this URL!** ✅

---

## 🧪 Test Your Video URL

**Method 1: Direct Browser Test**
1. Copy this URL:
   ```
   https://yopuithpufakmkiuufsl.supabase.co/storage/v1/object/public/Q%20Rator%20Videos/Q%20Rator%20kids%20teachers.mp4
   ```
2. Paste it in a new browser tab
3. **If public**: Video should start playing or downloading
4. **If not public**: You'll see an error message

**Method 2: Test in Your App**
1. Run your Q Rator Kids app
2. Go to the home page
3. Scroll to "Meet Your Animal Friends!" section
4. Click the big Play button
5. Video should play!

---

## 🚨 If Video Still Won't Play

### Check #1: Is the bucket public?
- Go to Storage → Click on bucket name
- Look for "Public" label next to bucket name
- If it says "Private", follow Option 1 above

### Check #2: CORS Settings
1. Go to **Storage** → **Settings**
2. Make sure CORS is enabled for your domain
3. Add these allowed origins:
   ```
   http://localhost:5173
   http://localhost:3000
   https://your-production-domain.com
   ```

### Check #3: File Name Issues
Your file has spaces in the name: "Q Rator kids teachers.mp4"

**Recommendation**: Rename to remove spaces:
1. In Supabase Storage, download the file
2. Rename to: `q-rator-kids-teachers.mp4`
3. Re-upload
4. Update the URL in `/src/app/data/videoUrls.ts`:
   ```typescript
   export const HOME_VIDEO_URL = `${SUPABASE_STORAGE_BASE}/Q%20Rator%20Videos/q-rator-kids-teachers.mp4`;
   ```

---

## 📁 Better Bucket Organization (For Future Uploads)

**Current structure:**
```
Q Rator Videos/
└── Q Rator kids teachers.mp4
```

**Recommended structure:**
```
Q Rator Videos/
├── home-intro.mp4
├── lessons/
│   ├── lesson-1.mp4
│   ├── lesson-2.mp4
│   └── ...
├── stories/
│   ├── story-1.mp4
│   └── ...
└── characters/
    ├── leo-intro.mp4
    └── ...
```

**Benefits:**
- No spaces in filenames (easier URLs)
- Organized by content type
- Easier to manage as you add more videos

---

## ✅ Checklist

- [ ] Go to Supabase Dashboard
- [ ] Select Q Rator Kids project
- [ ] Go to Storage
- [ ] Find "Q Rator Videos" bucket
- [ ] Click three dots → Edit bucket
- [ ] Check "Public bucket" ✅
- [ ] Save
- [ ] Test URL in browser (should play/download)
- [ ] Test in Q Rator Kids app (should play on home page)

---

## 🎉 Once Working

Your home page video is ready! Next steps:

1. ✅ Upload 10+ lesson videos
2. ✅ Upload story videos  
3. ✅ Update URLs in `/src/app/data/videoUrls.ts`
4. ✅ Consider renaming files to remove spaces
5. ✅ Organize into folders (lessons/, stories/, etc.)

---

**Let me know when the bucket is public and we can test it!**
