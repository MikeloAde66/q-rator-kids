# Q Rator Kids - Supabase Backend Setup Guide

## 🎯 Overview

This guide walks you through setting up the complete Supabase backend for Q Rator Kids, including database schema, authentication, storage, and Row Level Security (RLS).

---

## 📋 Step 1: Run Database Migration

### In Supabase Dashboard:

1. **Navigate to SQL Editor**
   - Open your Q Rator Kids project in Supabase
   - Click "SQL Editor" in the left sidebar
   - Click "+ New query"

2. **Copy and Paste the Schema**
   - Open `/supabase-schema.sql` file
   - Copy ALL the SQL code
   - Paste it into the Supabase SQL Editor

3. **Run the Migration**
   - Click "Run" button (or press Cmd/Ctrl + Enter)
   - Wait for success confirmation
   - You should see: "Success. No rows returned"

### What This Creates:

✅ **14 Database Tables:**
- `profiles` - Parent accounts
- `children` - Child profiles
- `subscriptions` - Subscription management
- `gift_cards` - $9.95 gift card system
- `characters` - 5 animal art teachers (pre-seeded!)
- `lessons` - Drawing/coloring lessons
- `stories` - Animated art adventures
- `assignments` - Creative art projects
- `lesson_progress` - Track lesson completion
- `story_progress` - Track story viewing
- `assignment_submissions` - Store artwork submissions
- `activity_log` - Parental dashboard activity
- `achievements` - Gamification badges
- `settings` - User preferences & accessibility

✅ **Row Level Security (RLS):**
- Parents can only access their own data
- Children data is protected by parent ownership
- Public content (lessons, stories) viewable by all

✅ **Automatic Triggers:**
- Auto-create profile on signup
- Auto-create free subscription for new users
- Auto-update timestamps

✅ **5 Pre-Seeded Characters:**
- 🦁 Leo the Lion (Drawing & Sketching)
- 🦋 Bella the Butterfly (Colors & Painting)
- 🦉 Ollie the Owl (Shapes & Patterns)
- 🦓 Zara the Zebra (Lines & Textures)
- 🦊 Frankie the Fox (Composition & Storytelling)

---

## 🔐 Step 2: Configure Authentication

### Enable Email/Password Auth:

1. Go to **Authentication** > **Providers**
2. Enable **Email** provider
3. **Disable email confirmation** for easier testing (enable later for production)

### Configure Auth Settings:

1. Go to **Authentication** > **URL Configuration**
2. Set **Site URL**: Your app's URL (e.g., `http://localhost:5173` for dev)
3. Add **Redirect URLs**: Same as site URL

### Optional - Enable Social Auth:

For production, you can enable:
- Google OAuth
- Apple OAuth
- GitHub OAuth

---

## 📁 Step 3: Configure Storage Buckets

### Create Storage Buckets:

1. Go to **Storage** in sidebar
2. Click **"New bucket"**
3. Create these buckets:

#### Bucket 1: `artwork`
- **Name**: `artwork`
- **Public**: ✅ Yes (so parents can view children's artwork)
- **File size limit**: 10 MB
- **Allowed MIME types**: `image/png, image/jpeg, image/jpg, image/webp`

#### Bucket 2: `lesson-media`
- **Name**: `lesson-media`
- **Public**: ✅ Yes (for lesson thumbnails and videos)
- **File size limit**: 100 MB
- **Allowed MIME types**: `image/*, video/*`

#### Bucket 3: `character-avatars`
- **Name**: `character-avatars`
- **Public**: ✅ Yes (for character profile images)
- **File size limit**: 5 MB
- **Allowed MIME types**: `image/*`

### Storage Policies:

The buckets should allow:
- **Authenticated users** can upload
- **Everyone** can view (public buckets)

---

## 🧪 Step 4: Test Your Database

### Verify Tables Created:

1. Go to **Table Editor**
2. You should see all 14 tables listed
3. Click on `characters` table
4. You should see 5 rows (Leo, Bella, Ollie, Zara, Frankie)

### Test Authentication:

1. Go to **Authentication** > **Users**
2. Try creating a test user manually:
   - Email: `parent@test.com`
   - Password: `TestPass123!`
3. After creation, check:
   - `profiles` table should have 1 row
   - `subscriptions` table should have 1 row (Free tier)

---

## 🔄 Step 5: Seed Sample Content (Optional)

You can add sample lessons, stories, and assignments for testing. Here's a quick example:

### Add Sample Lesson:

```sql
INSERT INTO lessons (title, description, difficulty_level, character_id, duration_minutes, is_premium, order_index)
VALUES (
  'Drawing Your First Circle',
  'Learn how to draw perfect circles with Leo the Lion!',
  'Beginner',
  (SELECT id FROM characters WHERE name = 'Leo the Lion'),
  10,
  false, -- Free lesson
  1
);
```

### Add Sample Story:

```sql
INSERT INTO stories (title, description, difficulty_level, character_id, duration_minutes, is_premium, order_index)
VALUES (
  'Bella''s Rainbow Adventure',
  'Join Bella as she discovers all the colors of the rainbow!',
  'Beginner',
  (SELECT id FROM characters WHERE name = 'Bella the Butterfly'),
  5,
  false, -- Free story
  1
);
```

### Add Sample Assignment:

```sql
INSERT INTO assignments (title, description, difficulty_level, character_id, estimated_minutes, instructions, is_premium, order_index)
VALUES (
  'Draw Your Pet',
  'Draw a picture of your favorite pet or animal friend!',
  'Beginner',
  (SELECT id FROM characters WHERE name = 'Leo the Lion'),
  20,
  'Use simple shapes to start. Add details like eyes, nose, and ears. Color your drawing!',
  false, -- Free assignment
  1
);
```

---

## 📊 Step 6: Database Functions & Helpers

### Useful SQL Queries:

#### Get All Children for a Parent:
```sql
SELECT * FROM children WHERE parent_id = 'parent-uuid-here';
```

#### Get Child's Total Stars:
```sql
SELECT 
  c.name,
  COALESCE(SUM(lp.stars_earned), 0) as total_stars
FROM children c
LEFT JOIN lesson_progress lp ON c.id = lp.child_id
WHERE c.id = 'child-uuid-here'
GROUP BY c.name;
```

#### Get Recent Activity:
```sql
SELECT * FROM activity_log 
WHERE child_id = 'child-uuid-here'
ORDER BY created_at DESC
LIMIT 20;
```

#### Check Subscription Status:
```sql
SELECT 
  p.email,
  s.tier,
  s.status,
  s.trial_end_date
FROM profiles p
JOIN subscriptions s ON p.id = s.parent_id
WHERE p.id = 'parent-uuid-here';
```

---

## 🔒 Step 7: Row Level Security Verification

### Test RLS Policies:

1. **Create two test parent accounts** (parent1, parent2)
2. **Create children under each parent**
3. **Verify**:
   - Parent1 can only see their own children
   - Parent1 cannot see Parent2's children
   - Both can see all lessons/stories/assignments

### Important RLS Notes:

- **Profiles**: Users can only view/update their own
- **Children**: Parents can CRUD their own children only
- **Progress**: Parents can view their children's progress only
- **Content**: Lessons, stories, assignments are public (everyone can view)
- **Activity Log**: Parents can view their children's activity only

---

## 🚀 Step 8: Connect Frontend to Backend

### Files Already Created:

✅ `/src/lib/supabase.ts` - Supabase client instance
✅ `/src/lib/database.types.ts` - TypeScript types for all tables

### Next Steps (We'll Do Together):

1. **Update AuthContext** to use real Supabase auth
2. **Update SubscriptionContext** to use real subscription data
3. **Update OnboardingContext** to save children to database
4. **Update ActivityContext** to log real activities
5. **Create ContentContext** to fetch lessons/stories/assignments
6. **Update ProgressContext** to track real progress
7. **Update SettingsContext** to persist settings

---

## 📈 Production Checklist

Before launching to real users:

### Security:
- [ ] Enable email confirmation in Auth settings
- [ ] Review all RLS policies
- [ ] Add rate limiting on sensitive endpoints
- [ ] Set up monitoring and alerts

### Storage:
- [ ] Configure CDN for media files
- [ ] Set up automatic backups
- [ ] Add image optimization/resizing

### Database:
- [ ] Review and optimize indexes
- [ ] Set up daily backups
- [ ] Monitor query performance

### Compliance:
- [ ] Add COPPA compliance measures (age verification)
- [ ] Implement data export for GDPR
- [ ] Add privacy policy and terms of service
- [ ] Parental consent workflow

---

## 🆘 Troubleshooting

### Common Issues:

**Issue**: "relation does not exist" error
- **Fix**: Make sure you ran the ENTIRE schema SQL script

**Issue**: RLS policy blocking queries
- **Fix**: Check that user is authenticated (`auth.uid()` returns valid ID)

**Issue**: Can't insert into tables
- **Fix**: Verify RLS policies allow INSERT for authenticated users

**Issue**: Storage upload fails
- **Fix**: Check bucket exists and policies allow uploads

---

## 📞 Need Help?

If you run into issues:
1. Check Supabase logs (Dashboard > Logs)
2. Test queries in SQL Editor
3. Verify RLS policies in Table Editor
4. Check authentication status

---

## ✅ You're Ready!

Once you've completed all steps, your backend is ready! You should have:

✅ 14 database tables with proper relationships
✅ Row Level Security protecting user data
✅ 5 pre-seeded animal art teachers
✅ Authentication system configured
✅ Storage buckets for artwork and media
✅ Automatic profile creation on signup
✅ TypeScript types for type-safe queries

**Next**: Let's start updating the frontend contexts to use real Supabase data! 🎨
