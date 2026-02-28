# Q Rator Kids - Backend Quick Reference

## 📦 Files Created

### Configuration Files
- ✅ `/src/lib/supabase.ts` - Supabase client instance
- ✅ `/src/lib/database.types.ts` - TypeScript types for all tables
- ✅ `/src/lib/supabase-helpers.ts` - Helper functions for common operations

### Database Files
- ✅ `/supabase-schema.sql` - Complete database migration (run in Supabase SQL Editor)

### Documentation
- ✅ `/BACKEND_SETUP_GUIDE.md` - Step-by-step setup instructions
- ✅ `/BACKEND_ROADMAP.md` - Integration roadmap and timeline
- ✅ `/BACKEND_QUICK_REFERENCE.md` - This file

---

## 🚀 Quick Start Steps

### 1. Run Database Migration (DO THIS FIRST!)

```bash
# 1. Open Supabase Dashboard
# 2. Go to SQL Editor
# 3. Copy ALL content from /supabase-schema.sql
# 4. Paste and Run
# 5. Verify success
```

### 2. Create Storage Buckets

In Supabase Dashboard > Storage:
- Create `artwork` bucket (public)
- Create `lesson-media` bucket (public)
- Create `character-avatars` bucket (public)

### 3. Configure Authentication

In Supabase Dashboard > Authentication:
- Enable Email/Password provider
- Disable email confirmation (for dev)
- Set site URL and redirect URLs

---

## 🗄️ Database Schema Overview

### 14 Tables:

1. **profiles** - Parent accounts (auto-created on signup)
2. **children** - Child profiles (linked to parents)
3. **subscriptions** - Free/Trial/Standard tiers (auto-created on signup)
4. **gift_cards** - $9.95 gift card codes
5. **characters** - 5 animal art teachers (pre-seeded!)
6. **lessons** - Drawing/coloring lessons
7. **stories** - Animated art adventures
8. **assignments** - Creative art projects
9. **lesson_progress** - Track lesson completion & stars
10. **story_progress** - Track story viewing
11. **assignment_submissions** - Store artwork submissions
12. **activity_log** - Activity for parental dashboard
13. **achievements** - Gamification badges
14. **settings** - User preferences & accessibility

---

## 🔑 Key Concepts

### Authentication Flow
```typescript
// User signs up → Auto-creates:
// 1. Profile in 'profiles' table
// 2. Free subscription in 'subscriptions' table
```

### Subscription Tiers
- **Free**: 3 free lessons/stories/assignments
- **Trial**: 30-day access to all content (via gift card)
- **Standard**: Full paid subscription (future)

### Difficulty Levels
- **Beginner**: Ages 6-8
- **Intermediate**: Ages 9-12

### Progress Tracking
- Lessons award 0-3 stars based on performance
- Stories are just watched (completed/not completed)
- Assignments are submitted with artwork

---

## 📚 Using Helper Functions

All helper functions are in `/src/lib/supabase-helpers.ts`

### Example: Fetch Lessons

```typescript
import { getLessons } from '@/lib/supabase-helpers';

// Get all lessons
const allLessons = await getLessons();

// Get beginner lessons only
const beginnerLessons = await getLessons({ difficultyLevel: 'Beginner' });

// Get Leo's lessons
const leoLessons = await getLessons({ characterId: 'leo-uuid' });

// Get free lessons only
const freeLessons = await getLessons({ isPremium: false });
```

### Example: Track Progress

```typescript
import { upsertLessonProgress, logActivity } from '@/lib/supabase-helpers';

// Child completes a lesson
await upsertLessonProgress(childId, lessonId, {
  status: 'completed',
  progress_percentage: 100,
  stars_earned: 3,
  completed_at: new Date().toISOString(),
});

// Log the activity
await logActivity(
  childId,
  'lesson',
  'Completed "Drawing Circles"',
  'Earned 3 stars!',
  { lessonId, starsEarned: 3 }
);
```

### Example: Child Profile Management

```typescript
import { createChild, getParentChildren } from '@/lib/supabase-helpers';

// Create a child profile
const child = await createChild({
  parent_id: parentId,
  name: 'Emma',
  age: 7,
  difficulty_level: 'Beginner',
  avatar_emoji: '🎨',
});

// Get all children for a parent
const children = await getParentChildren(parentId);
```

### Example: Gift Card Redemption

```typescript
import { redeemGiftCard } from '@/lib/supabase-helpers';

try {
  const result = await redeemGiftCard('QRATOR-ABC123', parentId);
  console.log(`Trial ends: ${result.trialEndDate}`);
} catch (error) {
  console.error('Redemption failed:', error.message);
}
```

### Example: Upload Artwork

```typescript
import { uploadArtwork } from '@/lib/supabase-helpers';

// Upload child's artwork
const artworkUrl = await uploadArtwork(childId, file);

// Save submission
await supabase.from('assignment_submissions').insert({
  child_id: childId,
  assignment_id: assignmentId,
  artwork_url: artworkUrl,
  status: 'submitted',
});
```

---

## 🔒 Row Level Security (RLS)

### What RLS Protects:

✅ **Parents can only see their own data**:
- Their profile
- Their subscription
- Their children
- Their children's progress/activity

✅ **Public content**:
- All characters (5 animal teachers)
- All lessons
- All stories
- All assignments

❌ **Parents CANNOT see**:
- Other parents' profiles
- Other parents' children
- Other children's progress

---

## 🎨 Pre-Seeded Data

### 5 Animal Art Teachers

Already in your database:

1. **🦁 Leo the Lion** - Drawing & Sketching
   - Brave, encouraging, patient
   - Colors: Orange/Yellow

2. **🦋 Bella the Butterfly** - Colors & Painting
   - Cheerful, creative, gentle
   - Colors: Pink/Rose

3. **🦉 Ollie the Owl** - Shapes & Patterns
   - Wise, thoughtful, smart
   - Colors: Purple/Lavender

4. **🦓 Zara the Zebra** - Lines & Textures
   - Playful, energetic, fun
   - Colors: Cyan/Blue

5. **🦊 Frankie the Fox** - Composition & Storytelling
   - Clever, imaginative, friendly
   - Colors: Orange/Peach

---

## 🧪 Testing Checklist

After running migration, verify:

- [ ] All 14 tables exist in Table Editor
- [ ] `characters` table has 5 rows
- [ ] RLS enabled on all tables (green shield icons)
- [ ] Storage buckets created
- [ ] Auth provider enabled

### Test User Flow:

```typescript
// 1. Sign up a test user
const { data } = await supabase.auth.signUp({
  email: 'parent@test.com',
  password: 'TestPass123!',
});

// 2. Verify auto-created profile
const profile = await supabase
  .from('profiles')
  .select('*')
  .eq('id', data.user.id)
  .single();

// 3. Verify auto-created subscription
const subscription = await supabase
  .from('subscriptions')
  .select('*')
  .eq('parent_id', data.user.id)
  .single();

console.log('Profile:', profile);
console.log('Subscription:', subscription);
```

---

## 🚨 Common Errors & Solutions

### Error: "relation does not exist"
**Fix**: Run the complete `/supabase-schema.sql` migration

### Error: "permission denied for table"
**Fix**: Check RLS policies. Make sure user is authenticated.

### Error: "duplicate key value violates unique constraint"
**Fix**: You're trying to insert duplicate data (e.g., same child twice)

### Error: "new row violates row-level security policy"
**Fix**: The user doesn't have permission. Check RLS policies.

---

## 📊 Useful SQL Queries

Run these in Supabase SQL Editor to inspect data:

### Get all parents with subscriptions
```sql
SELECT 
  p.email,
  s.tier,
  s.status,
  s.trial_end_date
FROM profiles p
JOIN subscriptions s ON p.id = s.parent_id;
```

### Get children with progress summary
```sql
SELECT 
  c.name,
  c.age,
  c.difficulty_level,
  COUNT(DISTINCT lp.id) as lessons_completed,
  SUM(lp.stars_earned) as total_stars
FROM children c
LEFT JOIN lesson_progress lp ON c.id = lp.child_id AND lp.status = 'completed'
GROUP BY c.id, c.name, c.age, c.difficulty_level;
```

### Get recent activity across all children
```sql
SELECT 
  c.name as child_name,
  al.activity_type,
  al.activity_title,
  al.created_at
FROM activity_log al
JOIN children c ON al.child_id = c.id
ORDER BY al.created_at DESC
LIMIT 20;
```

### Check gift card status
```sql
SELECT 
  code,
  status,
  redeemed_at,
  expires_at,
  p.email as redeemed_by_email
FROM gift_cards gc
LEFT JOIN profiles p ON gc.redeemed_by = p.id;
```

---

## 🎯 Next Steps

### Immediate (Do Now):
1. ✅ Run `/supabase-schema.sql` in Supabase SQL Editor
2. ✅ Create 3 storage buckets
3. ✅ Enable authentication
4. ✅ Create a test user to verify setup

### Phase 2 (Context Integration):
1. Update AuthContext to use real Supabase auth
2. Update OnboardingContext to save children to database
3. Create ContentContext to fetch lessons/stories/assignments
4. Update SubscriptionContext with real data
5. Create ProgressContext for tracking

### Phase 3 (UI Integration):
1. Connect lesson pages to database
2. Connect story pages to database
3. Connect assignment pages with upload
4. Update parental dashboard with real data

---

## 💡 Pro Tips

1. **Start with auth** - Get login/signup working first
2. **Use helper functions** - Don't write raw Supabase queries everywhere
3. **Test RLS** - Create multiple test accounts to verify data isolation
4. **Use TypeScript types** - Import from `database.types.ts` for type safety
5. **Handle errors** - Use `handleSupabaseError()` helper for user-friendly messages
6. **Check performance** - Use indexes (already created in schema)

---

## 🔗 Important Links

- **Supabase Project**: https://yopuithpufakmkiuufsl.supabase.co
- **Supabase Docs**: https://supabase.com/docs
- **Q Rator Setup Guide**: `/BACKEND_SETUP_GUIDE.md`
- **Q Rator Roadmap**: `/BACKEND_ROADMAP.md`

---

**Ready to build! Let's make Q Rator Kids come alive! 🎨🚀**
