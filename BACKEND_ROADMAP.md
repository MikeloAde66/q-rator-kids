# Q Rator Kids - Backend Integration Roadmap

## 🎯 Current Status

✅ **Completed**:
- Supabase project created: `https://yopuithpufakmkiuufsl.supabase.co`
- Supabase client installed and configured
- Database schema designed (14 tables)
- TypeScript types generated
- Complete SQL migration ready to run

⏳ **Next**: Run migration and integrate with frontend contexts

---

## 📋 Phase 1: Database Setup (DO THIS FIRST!)

### Task 1.1: Run Database Migration
**File**: `/supabase-schema.sql`

**Steps**:
1. Open Supabase Dashboard → SQL Editor
2. Copy ALL SQL from `/supabase-schema.sql`
3. Paste and run in SQL Editor
4. Verify 14 tables created + 5 characters seeded

**Verification**:
- ✅ All 14 tables visible in Table Editor
- ✅ `characters` table has 5 rows (animal teachers)
- ✅ RLS enabled on all tables

---

### Task 1.2: Configure Storage Buckets

**Create 3 Buckets**:
1. `artwork` - For children's art submissions
2. `lesson-media` - For lesson thumbnails/videos
3. `character-avatars` - For character profile images

**Settings**: All public, authenticated uploads

---

### Task 1.3: Configure Authentication

**Enable**:
- Email/Password auth
- (Optional) Google OAuth
- (Optional) Apple OAuth

**Settings**:
- Disable email confirmation (for dev)
- Set site URL and redirect URLs

---

## 🔄 Phase 2: Context Integration (In Order)

### Priority 1: Authentication & User Management

#### Task 2.1: Update AuthContext
**File**: `/src/app/contexts/AuthContext.tsx`

**Changes**:
- Replace mock `isAuthenticated` with real Supabase auth session
- Implement real `login()` with `supabase.auth.signInWithPassword()`
- Implement real `signup()` with `supabase.auth.signUp()`
- Implement real `logout()` with `supabase.auth.signOut()`
- Subscribe to `supabase.auth.onAuthStateChange()`
- Store user profile from `profiles` table

**New Functions**:
```typescript
const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

const signup = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
};
```

---

#### Task 2.2: Update OnboardingContext
**File**: `/src/app/contexts/OnboardingContext.tsx`

**Changes**:
- Save child profiles to `children` table (not localStorage)
- Fetch children from database on load
- Link children to authenticated parent (`parent_id`)

**New Functions**:
```typescript
const createChildProfile = async (childData) => {
  const { data, error } = await supabase
    .from('children')
    .insert({
      parent_id: user.id,
      name: childData.name,
      age: childData.age,
      difficulty_level: childData.difficultyLevel,
      avatar_emoji: childData.emoji,
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};
```

---

### Priority 2: Content & Subscriptions

#### Task 2.3: Create ContentContext
**New File**: `/src/app/contexts/ContentContext.tsx`

**Purpose**: Fetch lessons, stories, assignments from database

**Functions**:
- `fetchLessons()` - Get all lessons with character info
- `fetchStories()` - Get all stories with character info
- `fetchAssignments()` - Get all assignments
- `fetchCharacters()` - Get 5 animal teachers
- `checkContentAccess()` - Verify subscription tier access

**Example**:
```typescript
const fetchLessons = async (difficultyLevel?: string) => {
  let query = supabase
    .from('lessons')
    .select('*, characters(*)')
    .order('order_index');
  
  if (difficultyLevel) {
    query = query.eq('difficulty_level', difficultyLevel);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};
```

---

#### Task 2.4: Update SubscriptionContext
**File**: `/src/app/contexts/SubscriptionContext.tsx`

**Changes**:
- Fetch subscription from `subscriptions` table
- Implement real gift card redemption
- Check trial expiration dates
- Validate premium content access

**New Functions**:
```typescript
const redeemGiftCard = async (code: string) => {
  // 1. Verify gift card exists and is available
  const { data: card, error: cardError } = await supabase
    .from('gift_cards')
    .select('*')
    .eq('code', code)
    .eq('status', 'available')
    .single();
  
  if (cardError || !card) throw new Error('Invalid gift card');
  
  // 2. Mark as redeemed
  await supabase
    .from('gift_cards')
    .update({ status: 'redeemed', redeemed_by: user.id, redeemed_at: new Date() })
    .eq('id', card.id);
  
  // 3. Upgrade subscription to Trial
  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + 30);
  
  await supabase
    .from('subscriptions')
    .update({
      tier: 'Trial',
      status: 'active',
      trial_start_date: new Date(),
      trial_end_date: trialEndDate,
      gift_card_code: code,
    })
    .eq('parent_id', user.id);
};
```

---

### Priority 3: Progress Tracking & Gamification

#### Task 2.5: Create ProgressContext
**New File**: `/src/app/contexts/ProgressContext.tsx`

**Purpose**: Track lesson/story completion, stars earned

**Functions**:
- `startLesson(childId, lessonId)` - Mark lesson as in_progress
- `completeLesson(childId, lessonId, starsEarned)` - Mark completed
- `watchStory(childId, storyId)` - Track story views
- `submitAssignment(childId, assignmentId, artworkUrl)` - Submit artwork
- `getChildProgress(childId)` - Get all progress for a child
- `getTotalStars(childId)` - Calculate total stars earned

**Example**:
```typescript
const completeLesson = async (childId: string, lessonId: string, starsEarned: number) => {
  // Update lesson progress
  const { data, error } = await supabase
    .from('lesson_progress')
    .upsert({
      child_id: childId,
      lesson_id: lessonId,
      status: 'completed',
      progress_percentage: 100,
      stars_earned: starsEarned,
      completed_at: new Date(),
    })
    .select()
    .single();
  
  if (error) throw error;
  
  // Log activity
  await logActivity(childId, 'lesson', `Completed lesson`, { lessonId, starsEarned });
  
  // Check for achievements
  await checkAchievements(childId);
  
  return data;
};
```

---

#### Task 2.6: Update ActivityContext
**File**: `/src/app/contexts/ActivityContext.tsx`

**Changes**:
- Save activities to `activity_log` table
- Fetch real activity history for parental dashboard
- Real-time activity tracking

**New Functions**:
```typescript
const logActivity = async (childId: string, type: string, title: string, description?: string, metadata?: any) => {
  const { error } = await supabase
    .from('activity_log')
    .insert({
      child_id: childId,
      activity_type: type,
      activity_title: title,
      activity_description: description,
      metadata,
    });
  
  if (error) throw error;
};

const fetchRecentActivity = async (childId: string, limit = 20) => {
  const { data, error } = await supabase
    .from('activity_log')
    .select('*')
    .eq('child_id', childId)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data;
};
```

---

### Priority 4: Settings & Preferences

#### Task 2.7: Update SettingsContext
**File**: `/src/app/contexts/SettingsContext.tsx`

**Changes**:
- Save settings to `settings` table (not localStorage)
- Persist accessibility preferences
- Sync across devices

**New Functions**:
```typescript
const saveSettings = async (userId: string, userType: 'parent' | 'child', settings: Partial<Settings>) => {
  const { data, error } = await supabase
    .from('settings')
    .upsert({
      user_id: userId,
      user_type: userType,
      ...settings,
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

const loadSettings = async (userId: string, userType: 'parent' | 'child') => {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('user_id', userId)
    .eq('user_type', userType)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error; // Ignore "no rows" error
  return data;
};
```

---

### Priority 5: Advanced Features

#### Task 2.8: Update OfflineContext
**File**: `/src/app/contexts/OfflineContext.tsx`

**Changes**:
- Queue offline actions (lesson completions, activity logs)
- Sync with Supabase when back online
- Handle conflict resolution

---

#### Task 2.9: Create AchievementsContext
**New File**: `/src/app/contexts/AchievementsContext.tsx`

**Purpose**: Award badges, track milestones

**Functions**:
- `checkAchievements(childId)` - Check if child earned new achievements
- `awardAchievement(childId, type, title, description)` - Award badge
- `getChildAchievements(childId)` - Fetch all achievements

**Achievement Types**:
- First lesson completed
- 10 lessons completed
- First story watched
- First assignment submitted
- 50 stars earned
- 100 stars earned
- Week streak
- Month streak

---

## 🎨 Phase 3: UI Integration

### Task 3.1: Update Lesson Pages
**Files**: Lesson list and detail pages

**Changes**:
- Fetch lessons from ContentContext
- Show "locked" state for premium lessons (based on subscription)
- Track progress in real-time
- Award stars on completion

---

### Task 3.2: Update Story Pages
**Files**: Story list and detail pages

**Changes**:
- Fetch stories from ContentContext
- Track viewing history
- Show watch count

---

### Task 3.3: Update Assignment Pages
**Files**: Assignment list and detail pages

**Changes**:
- Fetch assignments from ContentContext
- Upload artwork to Supabase Storage
- Submit to `assignment_submissions` table
- Display submitted artwork in gallery

---

### Task 3.4: Update Parental Dashboard
**File**: `/src/app/pages/ParentalDashboard.tsx`

**Changes**:
- Real activity feed from ActivityContext
- Real progress stats from ProgressContext
- Real subscription status from SubscriptionContext
- Real child profiles from OnboardingContext

---

### Task 3.5: Update Character Pages
**Files**: Character bio pages

**Changes**:
- Fetch character data from database
- Show lessons/stories/assignments by character
- Link to content filtered by character

---

## 📦 Phase 4: Storage Integration

### Task 4.1: Artwork Upload System

**Create**: `/src/lib/storage.ts`

**Functions**:
```typescript
export const uploadArtwork = async (childId: string, file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${childId}/${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('artwork')
    .upload(fileName, file);
  
  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from('artwork')
    .getPublicUrl(fileName);
  
  return publicUrl;
};

export const deleteArtwork = async (url: string) => {
  const fileName = url.split('/artwork/')[1];
  const { error } = await supabase.storage
    .from('artwork')
    .remove([fileName]);
  
  if (error) throw error;
};
```

---

## 🧪 Phase 5: Testing & Optimization

### Task 5.1: End-to-End Testing
- [ ] Parent signup flow
- [ ] Child profile creation
- [ ] Lesson completion flow
- [ ] Gift card redemption
- [ ] Assignment submission
- [ ] Progress tracking
- [ ] Activity logging

### Task 5.2: Performance Optimization
- [ ] Add loading states for all queries
- [ ] Implement data caching (React Query or similar)
- [ ] Optimize image loading
- [ ] Add pagination for large lists

### Task 5.3: Error Handling
- [ ] Network error handling
- [ ] Auth error handling
- [ ] RLS policy violations
- [ ] User-friendly error messages

---

## 🚀 Phase 6: Production Preparation

### Task 6.1: Security Review
- [ ] Review all RLS policies
- [ ] Enable email confirmation
- [ ] Add rate limiting
- [ ] Implement COPPA compliance

### Task 6.2: Monitoring & Analytics
- [ ] Set up Supabase logs monitoring
- [ ] Add error tracking (Sentry)
- [ ] User analytics (Mixpanel/PostHog)

### Task 6.3: Backups & Disaster Recovery
- [ ] Configure daily backups
- [ ] Test data restoration
- [ ] Document recovery procedures

---

## ✅ Success Criteria

### Backend is "Production Ready" When:
- ✅ All 14 tables created and working
- ✅ RLS policies tested and verified
- ✅ Storage buckets configured
- ✅ Authentication working end-to-end
- ✅ All contexts integrated with Supabase
- ✅ Content (lessons/stories/assignments) seeded
- ✅ Progress tracking accurate
- ✅ Parental dashboard shows real data
- ✅ Gift card system functional
- ✅ Offline sync working
- ✅ Error handling comprehensive
- ✅ Performance optimized

---

## 📊 Implementation Timeline Estimate

**Phase 1**: Database Setup - **30 minutes**
**Phase 2**: Context Integration - **4-6 hours**
**Phase 3**: UI Integration - **3-4 hours**
**Phase 4**: Storage Integration - **1-2 hours**
**Phase 5**: Testing - **2-3 hours**
**Phase 6**: Production Prep - **2-3 hours**

**Total**: ~12-18 hours of focused development

---

## 🎯 Next Immediate Action

**RIGHT NOW**:
1. Open Supabase Dashboard
2. Go to SQL Editor
3. Run `/supabase-schema.sql`
4. Verify tables created
5. Come back and we'll start Phase 2!

---

**Questions? Let's tackle them together!** 🚀
