import { supabase } from './supabase';
import type { Database } from './database.types';

// Type aliases for convenience
type Tables = Database['public']['Tables'];
type Profile = Tables['profiles']['Row'];
type Child = Tables['children']['Row'];
type Subscription = Tables['subscriptions']['Row'];
type Lesson = Tables['lessons']['Row'];
type Story = Tables['stories']['Row'];
type Assignment = Tables['assignments']['Row'];
type Character = Tables['characters']['Row'];

// =====================================================
// AUTHENTICATION HELPERS
// =====================================================

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

export const getProfile = async (userId: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

// =====================================================
// CHILDREN HELPERS
// =====================================================

export const getParentChildren = async (parentId: string): Promise<Child[]> => {
  const { data, error } = await supabase
    .from('children')
    .select('*')
    .eq('parent_id', parentId)
    .order('created_at', { ascending: true });
  
  if (error) throw error;
  return data || [];
};

export const createChild = async (childData: Tables['children']['Insert']): Promise<Child> => {
  const { data, error } = await supabase
    .from('children')
    .insert(childData)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateChild = async (childId: string, updates: Tables['children']['Update']): Promise<Child> => {
  const { data, error } = await supabase
    .from('children')
    .update(updates)
    .eq('id', childId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteChild = async (childId: string): Promise<void> => {
  const { error } = await supabase
    .from('children')
    .delete()
    .eq('id', childId);
  
  if (error) throw error;
};

// =====================================================
// SUBSCRIPTION HELPERS
// =====================================================

export const getSubscription = async (parentId: string): Promise<Subscription | null> => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('parent_id', parentId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const updateSubscription = async (
  parentId: string,
  updates: Tables['subscriptions']['Update']
): Promise<Subscription> => {
  const { data, error } = await supabase
    .from('subscriptions')
    .update(updates)
    .eq('parent_id', parentId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const checkSubscriptionAccess = async (parentId: string): Promise<{
  tier: 'Free' | 'Trial' | 'Standard';
  hasAccess: boolean;
  isExpired: boolean;
}> => {
  const subscription = await getSubscription(parentId);
  
  if (!subscription) {
    return { tier: 'Free', hasAccess: false, isExpired: false };
  }
  
  const isExpired = subscription.trial_end_date
    ? new Date(subscription.trial_end_date) < new Date()
    : false;
  
  return {
    tier: subscription.tier,
    hasAccess: subscription.tier !== 'Free' && !isExpired,
    isExpired,
  };
};

// =====================================================
// CONTENT HELPERS (Lessons, Stories, Assignments)
// =====================================================

export const getAllCharacters = async (): Promise<Character[]> => {
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .order('created_at', { ascending: true });
  
  if (error) throw error;
  return data || [];
};

export const getLessons = async (filters?: {
  difficultyLevel?: 'Beginner' | 'Intermediate';
  characterId?: string;
  isPremium?: boolean;
}): Promise<(Lesson & { characters: Character })[]> => {
  let query = supabase
    .from('lessons')
    .select('*, characters(*)')
    .order('order_index', { ascending: true });
  
  if (filters?.difficultyLevel) {
    query = query.eq('difficulty_level', filters.difficultyLevel);
  }
  if (filters?.characterId) {
    query = query.eq('character_id', filters.characterId);
  }
  if (filters?.isPremium !== undefined) {
    query = query.eq('is_premium', filters.isPremium);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
};

export const getStories = async (filters?: {
  difficultyLevel?: 'Beginner' | 'Intermediate';
  characterId?: string;
  isPremium?: boolean;
}): Promise<(Story & { characters: Character })[]> => {
  let query = supabase
    .from('stories')
    .select('*, characters(*)')
    .order('order_index', { ascending: true });
  
  if (filters?.difficultyLevel) {
    query = query.eq('difficulty_level', filters.difficultyLevel);
  }
  if (filters?.characterId) {
    query = query.eq('character_id', filters.characterId);
  }
  if (filters?.isPremium !== undefined) {
    query = query.eq('is_premium', filters.isPremium);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
};

export const getAssignments = async (filters?: {
  difficultyLevel?: 'Beginner' | 'Intermediate';
  characterId?: string;
  isPremium?: boolean;
}): Promise<(Assignment & { characters: Character })[]> => {
  let query = supabase
    .from('assignments')
    .select('*, characters(*)')
    .order('order_index', { ascending: true });
  
  if (filters?.difficultyLevel) {
    query = query.eq('difficulty_level', filters.difficultyLevel);
  }
  if (filters?.characterId) {
    query = query.eq('character_id', filters.characterId);
  }
  if (filters?.isPremium !== undefined) {
    query = query.eq('is_premium', filters.isPremium);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
};

// =====================================================
// PROGRESS HELPERS
// =====================================================

export const getLessonProgress = async (childId: string, lessonId: string) => {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('child_id', childId)
    .eq('lesson_id', lessonId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const upsertLessonProgress = async (
  childId: string,
  lessonId: string,
  progressData: Partial<Tables['lesson_progress']['Update']>
) => {
  const { data, error } = await supabase
    .from('lesson_progress')
    .upsert({
      child_id: childId,
      lesson_id: lessonId,
      ...progressData,
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getChildTotalStars = async (childId: string): Promise<number> => {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('stars_earned')
    .eq('child_id', childId);
  
  if (error) throw error;
  
  const total = data?.reduce((sum, progress) => sum + progress.stars_earned, 0) || 0;
  return total;
};

export const getChildProgressSummary = async (childId: string) => {
  const [lessonProgress, storyProgress, submissions] = await Promise.all([
    supabase
      .from('lesson_progress')
      .select('*')
      .eq('child_id', childId),
    supabase
      .from('story_progress')
      .select('*')
      .eq('child_id', childId),
    supabase
      .from('assignment_submissions')
      .select('*')
      .eq('child_id', childId),
  ]);
  
  return {
    lessonsCompleted: lessonProgress.data?.filter(p => p.status === 'completed').length || 0,
    lessonsInProgress: lessonProgress.data?.filter(p => p.status === 'in_progress').length || 0,
    storiesWatched: storyProgress.data?.filter(p => p.status === 'completed').length || 0,
    assignmentsSubmitted: submissions.data?.length || 0,
    totalStars: lessonProgress.data?.reduce((sum, p) => sum + p.stars_earned, 0) || 0,
  };
};

// =====================================================
// ACTIVITY LOG HELPERS
// =====================================================

export const logActivity = async (
  childId: string,
  activityType: 'lesson' | 'story' | 'assignment' | 'login' | 'achievement',
  title: string,
  description?: string,
  metadata?: any
) => {
  const { error } = await supabase
    .from('activity_log')
    .insert({
      child_id: childId,
      activity_type: activityType,
      activity_title: title,
      activity_description: description,
      metadata,
    });
  
  if (error) throw error;
};

export const getRecentActivity = async (childId: string, limit = 20) => {
  const { data, error } = await supabase
    .from('activity_log')
    .select('*')
    .eq('child_id', childId)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data || [];
};

export const getAllChildrenActivity = async (parentId: string, limit = 50) => {
  // First get all children for this parent
  const children = await getParentChildren(parentId);
  const childIds = children.map(c => c.id);
  
  if (childIds.length === 0) return [];
  
  // Get activity for all children
  const { data, error } = await supabase
    .from('activity_log')
    .select('*, children(name, avatar_emoji)')
    .in('child_id', childIds)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data || [];
};

// =====================================================
// ACHIEVEMENT HELPERS
// =====================================================

export const getChildAchievements = async (childId: string) => {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('child_id', childId)
    .order('earned_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const awardAchievement = async (
  childId: string,
  achievementType: string,
  title: string,
  description: string,
  iconEmoji: string
) => {
  const { data, error } = await supabase
    .from('achievements')
    .insert({
      child_id: childId,
      achievement_type: achievementType,
      title,
      description,
      icon_emoji: iconEmoji,
    })
    .select()
    .single();
  
  if (error) throw error;
  
  // Also log it as an activity
  await logActivity(childId, 'achievement', `Earned: ${title}`, description);
  
  return data;
};

// =====================================================
// SETTINGS HELPERS
// =====================================================

export const getUserSettings = async (userId: string, userType: 'parent' | 'child') => {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('user_id', userId)
    .eq('user_type', userType)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const upsertUserSettings = async (
  userId: string,
  userType: 'parent' | 'child',
  settings: Partial<Tables['settings']['Update']>
) => {
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

// =====================================================
// STORAGE HELPERS
// =====================================================

export const uploadArtwork = async (childId: string, file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${childId}/${Date.now()}.${fileExt}`;
  
  const { error: uploadError } = await supabase.storage
    .from('artwork')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });
  
  if (uploadError) throw uploadError;
  
  const { data: { publicUrl } } = supabase.storage
    .from('artwork')
    .getPublicUrl(fileName);
  
  return publicUrl;
};

export const deleteArtwork = async (url: string): Promise<void> => {
  const fileName = url.split('/artwork/').pop();
  if (!fileName) return;
  
  const { error } = await supabase.storage
    .from('artwork')
    .remove([fileName]);
  
  if (error) throw error;
};

// =====================================================
// GIFT CARD HELPERS
// =====================================================

export const verifyGiftCard = async (code: string) => {
  const { data, error } = await supabase
    .from('gift_cards')
    .select('*')
    .eq('code', code)
    .eq('status', 'available')
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const redeemGiftCard = async (code: string, parentId: string) => {
  // Verify card
  const card = await verifyGiftCard(code);
  if (!card) throw new Error('Invalid or already redeemed gift card');
  
  // Check if expired
  if (new Date(card.expires_at) < new Date()) {
    throw new Error('This gift card has expired');
  }
  
  // Mark as redeemed
  const { error: redeemError } = await supabase
    .from('gift_cards')
    .update({
      status: 'redeemed',
      redeemed_by: parentId,
      redeemed_at: new Date().toISOString(),
    })
    .eq('id', card.id);
  
  if (redeemError) throw redeemError;
  
  // Upgrade subscription to Trial (30 days)
  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + 30);
  
  const { error: subError } = await supabase
    .from('subscriptions')
    .update({
      tier: 'Trial',
      status: 'active',
      trial_start_date: new Date().toISOString(),
      trial_end_date: trialEndDate.toISOString(),
      gift_card_code: code,
    })
    .eq('parent_id', parentId);
  
  if (subError) throw subError;
  
  return { success: true, trialEndDate };
};

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

export const handleSupabaseError = (error: any): string => {
  if (error.message.includes('auth')) {
    return 'Authentication error. Please log in again.';
  }
  if (error.message.includes('network')) {
    return 'Network error. Please check your connection.';
  }
  if (error.code === 'PGRST116') {
    return 'No data found.';
  }
  return error.message || 'An unexpected error occurred.';
};
