-- Q Rator Kids Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROFILES TABLE (Parent Accounts)
-- =====================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'parent' CHECK (role IN ('parent', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- CHILDREN TABLE (Child Profiles)
-- =====================================================
CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 6 AND age <= 12),
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('Beginner', 'Intermediate')),
  avatar_emoji TEXT NOT NULL DEFAULT '😊',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- SUBSCRIPTIONS TABLE
-- =====================================================
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  tier TEXT NOT NULL DEFAULT 'Free' CHECK (tier IN ('Free', 'Trial', 'Standard')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  trial_start_date TIMESTAMPTZ,
  trial_end_date TIMESTAMPTZ,
  gift_card_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- GIFT CARDS TABLE
-- =====================================================
CREATE TABLE gift_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  value DECIMAL(10, 2) NOT NULL DEFAULT 9.95,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'redeemed', 'expired')),
  redeemed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  redeemed_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- CHARACTERS TABLE (5 Animal Art Teachers)
-- =====================================================
CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  specialty TEXT NOT NULL,
  bio TEXT NOT NULL,
  personality TEXT NOT NULL,
  teaching_style TEXT NOT NULL,
  emoji TEXT NOT NULL,
  color_primary TEXT NOT NULL,
  color_secondary TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- LESSONS TABLE
-- =====================================================
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('Beginner', 'Intermediate')),
  character_id UUID NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  duration_minutes INTEGER NOT NULL,
  thumbnail_url TEXT,
  video_url TEXT,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- STORIES TABLE
-- =====================================================
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('Beginner', 'Intermediate')),
  character_id UUID NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  duration_minutes INTEGER NOT NULL,
  thumbnail_url TEXT,
  video_url TEXT,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- ASSIGNMENTS TABLE
-- =====================================================
CREATE TABLE assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('Beginner', 'Intermediate')),
  character_id UUID NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  estimated_minutes INTEGER NOT NULL,
  thumbnail_url TEXT,
  instructions TEXT NOT NULL,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- LESSON PROGRESS TABLE
-- =====================================================
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  progress_percentage INTEGER NOT NULL DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  stars_earned INTEGER NOT NULL DEFAULT 0 CHECK (stars_earned >= 0 AND stars_earned <= 3),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(child_id, lesson_id)
);

-- =====================================================
-- STORY PROGRESS TABLE
-- =====================================================
CREATE TABLE story_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(child_id, story_id)
);

-- =====================================================
-- ASSIGNMENT SUBMISSIONS TABLE
-- =====================================================
CREATE TABLE assignment_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  artwork_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewed')),
  stars_earned INTEGER NOT NULL DEFAULT 0 CHECK (stars_earned >= 0 AND stars_earned <= 3),
  feedback TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- ACTIVITY LOG TABLE (for Parental Dashboard)
-- =====================================================
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('lesson', 'story', 'assignment', 'login', 'achievement')),
  activity_title TEXT NOT NULL,
  activity_description TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- ACHIEVEMENTS TABLE
-- =====================================================
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  achievement_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_emoji TEXT NOT NULL,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- SETTINGS TABLE (User Preferences)
-- =====================================================
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('parent', 'child')),
  font_scale DECIMAL(3, 2) NOT NULL DEFAULT 1.0,
  contrast_mode TEXT NOT NULL DEFAULT 'normal' CHECK (contrast_mode IN ('normal', 'high', 'higher')),
  color_blind_mode TEXT NOT NULL DEFAULT 'none' CHECK (color_blind_mode IN ('none', 'protanopia', 'deuteranopia', 'tritanopia')),
  reduce_motion BOOLEAN NOT NULL DEFAULT false,
  keyboard_nav_enabled BOOLEAN NOT NULL DEFAULT false,
  screen_reader_optimized BOOLEAN NOT NULL DEFAULT false,
  notifications_enabled BOOLEAN NOT NULL DEFAULT true,
  sound_enabled BOOLEAN NOT NULL DEFAULT true,
  music_enabled BOOLEAN NOT NULL DEFAULT true,
  auto_save_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, user_type)
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX idx_children_parent_id ON children(parent_id);
CREATE INDEX idx_subscriptions_parent_id ON subscriptions(parent_id);
CREATE INDEX idx_gift_cards_code ON gift_cards(code);
CREATE INDEX idx_gift_cards_status ON gift_cards(status);
CREATE INDEX idx_lessons_character_id ON lessons(character_id);
CREATE INDEX idx_lessons_difficulty ON lessons(difficulty_level);
CREATE INDEX idx_stories_character_id ON stories(character_id);
CREATE INDEX idx_assignments_character_id ON assignments(character_id);
CREATE INDEX idx_lesson_progress_child_id ON lesson_progress(child_id);
CREATE INDEX idx_lesson_progress_lesson_id ON lesson_progress(lesson_id);
CREATE INDEX idx_story_progress_child_id ON story_progress(child_id);
CREATE INDEX idx_assignment_submissions_child_id ON assignment_submissions(child_id);
CREATE INDEX idx_activity_log_child_id ON activity_log(child_id);
CREATE INDEX idx_activity_log_created_at ON activity_log(created_at DESC);
CREATE INDEX idx_achievements_child_id ON achievements(child_id);
CREATE INDEX idx_settings_user_id ON settings(user_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only see their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Children: Parents can only see/manage their own children
CREATE POLICY "Parents can view own children" ON children FOR SELECT USING (auth.uid() = parent_id);
CREATE POLICY "Parents can insert own children" ON children FOR INSERT WITH CHECK (auth.uid() = parent_id);
CREATE POLICY "Parents can update own children" ON children FOR UPDATE USING (auth.uid() = parent_id);
CREATE POLICY "Parents can delete own children" ON children FOR DELETE USING (auth.uid() = parent_id);

-- Subscriptions: Parents can only see their own subscription
CREATE POLICY "Parents can view own subscription" ON subscriptions FOR SELECT USING (auth.uid() = parent_id);
CREATE POLICY "Parents can update own subscription" ON subscriptions FOR UPDATE USING (auth.uid() = parent_id);

-- Gift Cards: Anyone can view available gift cards
CREATE POLICY "Anyone can view available gift cards" ON gift_cards FOR SELECT USING (status = 'available' OR redeemed_by = auth.uid());

-- Characters: Everyone can view (public content)
CREATE POLICY "Anyone can view characters" ON characters FOR SELECT USING (true);

-- Lessons: Everyone can view (public content)
CREATE POLICY "Anyone can view lessons" ON lessons FOR SELECT USING (true);

-- Stories: Everyone can view (public content)
CREATE POLICY "Anyone can view stories" ON stories FOR SELECT USING (true);

-- Assignments: Everyone can view (public content)
CREATE POLICY "Anyone can view assignments" ON assignments FOR SELECT USING (true);

-- Lesson Progress: Parents can view their children's progress
CREATE POLICY "Parents can view children's lesson progress" ON lesson_progress FOR SELECT 
  USING (EXISTS (SELECT 1 FROM children WHERE children.id = lesson_progress.child_id AND children.parent_id = auth.uid()));
CREATE POLICY "Parents can manage children's lesson progress" ON lesson_progress FOR ALL 
  USING (EXISTS (SELECT 1 FROM children WHERE children.id = lesson_progress.child_id AND children.parent_id = auth.uid()));

-- Story Progress: Parents can view their children's progress
CREATE POLICY "Parents can view children's story progress" ON story_progress FOR SELECT 
  USING (EXISTS (SELECT 1 FROM children WHERE children.id = story_progress.child_id AND children.parent_id = auth.uid()));
CREATE POLICY "Parents can manage children's story progress" ON story_progress FOR ALL 
  USING (EXISTS (SELECT 1 FROM children WHERE children.id = story_progress.child_id AND children.parent_id = auth.uid()));

-- Assignment Submissions: Parents can view their children's submissions
CREATE POLICY "Parents can view children's submissions" ON assignment_submissions FOR SELECT 
  USING (EXISTS (SELECT 1 FROM children WHERE children.id = assignment_submissions.child_id AND children.parent_id = auth.uid()));
CREATE POLICY "Parents can manage children's submissions" ON assignment_submissions FOR ALL 
  USING (EXISTS (SELECT 1 FROM children WHERE children.id = assignment_submissions.child_id AND children.parent_id = auth.uid()));

-- Activity Log: Parents can view their children's activity
CREATE POLICY "Parents can view children's activity" ON activity_log FOR SELECT 
  USING (EXISTS (SELECT 1 FROM children WHERE children.id = activity_log.child_id AND children.parent_id = auth.uid()));
CREATE POLICY "System can insert activity" ON activity_log FOR INSERT WITH CHECK (true);

-- Achievements: Parents can view their children's achievements
CREATE POLICY "Parents can view children's achievements" ON achievements FOR SELECT 
  USING (EXISTS (SELECT 1 FROM children WHERE children.id = achievements.child_id AND children.parent_id = auth.uid()));
CREATE POLICY "System can insert achievements" ON achievements FOR INSERT WITH CHECK (true);

-- Settings: Users can manage their own settings
CREATE POLICY "Users can view own settings" ON settings FOR SELECT USING (
  (user_type = 'parent' AND auth.uid() = user_id) OR
  (user_type = 'child' AND EXISTS (SELECT 1 FROM children WHERE children.id = settings.user_id AND children.parent_id = auth.uid()))
);
CREATE POLICY "Users can manage own settings" ON settings FOR ALL USING (
  (user_type = 'parent' AND auth.uid() = user_id) OR
  (user_type = 'child' AND EXISTS (SELECT 1 FROM children WHERE children.id = settings.user_id AND children.parent_id = auth.uid()))
);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_children_updated_at BEFORE UPDATE ON children FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_characters_updated_at BEFORE UPDATE ON characters FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stories_updated_at BEFORE UPDATE ON stories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assignments_updated_at BEFORE UPDATE ON assignments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lesson_progress_updated_at BEFORE UPDATE ON lesson_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_story_progress_updated_at BEFORE UPDATE ON story_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assignment_submissions_updated_at BEFORE UPDATE ON assignment_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'parent');
  
  -- Create default free subscription
  INSERT INTO public.subscriptions (parent_id, tier, status)
  VALUES (NEW.id, 'Free', 'active');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile and subscription on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- SEED DATA: 5 Animal Art Teachers
-- =====================================================
INSERT INTO characters (name, species, specialty, bio, personality, teaching_style, emoji, color_primary, color_secondary) VALUES
  ('Leo the Lion', 'Lion', 'Drawing & Sketching', 'Leo is a brave and confident lion who loves teaching kids how to draw! He believes everyone can be an artist with practice and patience.', 'Brave, encouraging, patient', 'Step-by-step demonstrations with lots of encouragement', '🦁', '#F59E0B', '#FEF3C7'),
  ('Bella the Butterfly', 'Butterfly', 'Colors & Painting', 'Bella is a colorful butterfly who makes learning about colors fun and magical! She loves helping kids discover their favorite color combinations.', 'Cheerful, creative, gentle', 'Playful color experiments and hands-on activities', '🦋', '#EC4899', '#FCE7F3'),
  ('Ollie the Owl', 'Owl', 'Shapes & Patterns', 'Ollie is a wise owl who teaches kids about shapes and patterns. He shows how simple shapes can become amazing art!', 'Wise, thoughtful, smart', 'Clear explanations with visual examples', '🦉', '#8B5CF6', '#EDE9FE'),
  ('Zara the Zebra', 'Zebra', 'Lines & Textures', 'Zara is a playful zebra who loves teaching kids about different kinds of lines and textures. She makes every lesson exciting!', 'Playful, energetic, fun', 'Interactive games and creative challenges', '🦓', '#06B6D4', '#CFFAFE'),
  ('Frankie the Fox', 'Fox', 'Composition & Storytelling', 'Frankie is a clever fox who teaches kids how to tell stories through their art. He helps kids create pictures that share their ideas!', 'Clever, imaginative, friendly', 'Storytelling approach with creative prompts', '🦊', '#F97316', '#FFEDD5');
