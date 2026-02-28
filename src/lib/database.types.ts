export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          role: 'parent' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role?: 'parent' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'parent' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      children: {
        Row: {
          id: string
          parent_id: string
          name: string
          age: number
          difficulty_level: 'Beginner' | 'Intermediate'
          avatar_emoji: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          parent_id: string
          name: string
          age: number
          difficulty_level: 'Beginner' | 'Intermediate'
          avatar_emoji: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          parent_id?: string
          name?: string
          age?: number
          difficulty_level?: 'Beginner' | 'Intermediate'
          avatar_emoji?: string
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          parent_id: string
          tier: 'Free' | 'Trial' | 'Standard'
          status: 'active' | 'expired' | 'cancelled'
          trial_start_date: string | null
          trial_end_date: string | null
          gift_card_code: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          parent_id: string
          tier?: 'Free' | 'Trial' | 'Standard'
          status?: 'active' | 'expired' | 'cancelled'
          trial_start_date?: string | null
          trial_end_date?: string | null
          gift_card_code?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          parent_id?: string
          tier?: 'Free' | 'Trial' | 'Standard'
          status?: 'active' | 'expired' | 'cancelled'
          trial_start_date?: string | null
          trial_end_date?: string | null
          gift_card_code?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      gift_cards: {
        Row: {
          id: string
          code: string
          value: number
          status: 'available' | 'redeemed' | 'expired'
          redeemed_by: string | null
          redeemed_at: string | null
          expires_at: string
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          value: number
          status?: 'available' | 'redeemed' | 'expired'
          redeemed_by?: string | null
          redeemed_at?: string | null
          expires_at: string
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          value?: number
          status?: 'available' | 'redeemed' | 'expired'
          redeemed_by?: string | null
          redeemed_at?: string | null
          expires_at?: string
          created_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          title: string
          description: string
          difficulty_level: 'Beginner' | 'Intermediate'
          character_id: string
          duration_minutes: number
          thumbnail_url: string | null
          video_url: string | null
          is_premium: boolean
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          difficulty_level: 'Beginner' | 'Intermediate'
          character_id: string
          duration_minutes: number
          thumbnail_url?: string | null
          video_url?: string | null
          is_premium?: boolean
          order_index: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          difficulty_level?: 'Beginner' | 'Intermediate'
          character_id?: string
          duration_minutes?: number
          thumbnail_url?: string | null
          video_url?: string | null
          is_premium?: boolean
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      stories: {
        Row: {
          id: string
          title: string
          description: string
          difficulty_level: 'Beginner' | 'Intermediate'
          character_id: string
          duration_minutes: number
          thumbnail_url: string | null
          video_url: string | null
          is_premium: boolean
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          difficulty_level: 'Beginner' | 'Intermediate'
          character_id: string
          duration_minutes: number
          thumbnail_url?: string | null
          video_url?: string | null
          is_premium?: boolean
          order_index: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          difficulty_level?: 'Beginner' | 'Intermediate'
          character_id?: string
          duration_minutes?: number
          thumbnail_url?: string | null
          video_url?: string | null
          is_premium?: boolean
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      assignments: {
        Row: {
          id: string
          title: string
          description: string
          difficulty_level: 'Beginner' | 'Intermediate'
          character_id: string
          estimated_minutes: number
          thumbnail_url: string | null
          instructions: string
          is_premium: boolean
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          difficulty_level: 'Beginner' | 'Intermediate'
          character_id: string
          estimated_minutes: number
          thumbnail_url?: string | null
          instructions: string
          is_premium?: boolean
          order_index: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          difficulty_level?: 'Beginner' | 'Intermediate'
          character_id?: string
          estimated_minutes?: number
          thumbnail_url?: string | null
          instructions?: string
          is_premium?: boolean
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      lesson_progress: {
        Row: {
          id: string
          child_id: string
          lesson_id: string
          status: 'not_started' | 'in_progress' | 'completed'
          progress_percentage: number
          stars_earned: number
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          child_id: string
          lesson_id: string
          status?: 'not_started' | 'in_progress' | 'completed'
          progress_percentage?: number
          stars_earned?: number
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          child_id?: string
          lesson_id?: string
          status?: 'not_started' | 'in_progress' | 'completed'
          progress_percentage?: number
          stars_earned?: number
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      story_progress: {
        Row: {
          id: string
          child_id: string
          story_id: string
          status: 'not_started' | 'in_progress' | 'completed'
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          child_id: string
          story_id: string
          status?: 'not_started' | 'in_progress' | 'completed'
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          child_id?: string
          story_id?: string
          status?: 'not_started' | 'in_progress' | 'completed'
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      assignment_submissions: {
        Row: {
          id: string
          child_id: string
          assignment_id: string
          artwork_url: string
          status: 'submitted' | 'reviewed'
          stars_earned: number
          feedback: string | null
          submitted_at: string
          reviewed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          child_id: string
          assignment_id: string
          artwork_url: string
          status?: 'submitted' | 'reviewed'
          stars_earned?: number
          feedback?: string | null
          submitted_at?: string
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          child_id?: string
          assignment_id?: string
          artwork_url?: string
          status?: 'submitted' | 'reviewed'
          stars_earned?: number
          feedback?: string | null
          submitted_at?: string
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      activity_log: {
        Row: {
          id: string
          child_id: string
          activity_type: 'lesson' | 'story' | 'assignment' | 'login' | 'achievement'
          activity_title: string
          activity_description: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          child_id: string
          activity_type: 'lesson' | 'story' | 'assignment' | 'login' | 'achievement'
          activity_title: string
          activity_description?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          child_id?: string
          activity_type?: 'lesson' | 'story' | 'assignment' | 'login' | 'achievement'
          activity_title?: string
          activity_description?: string | null
          metadata?: Json | null
          created_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          child_id: string
          achievement_type: string
          title: string
          description: string
          icon_emoji: string
          earned_at: string
          created_at: string
        }
        Insert: {
          id?: string
          child_id: string
          achievement_type: string
          title: string
          description: string
          icon_emoji: string
          earned_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          child_id?: string
          achievement_type?: string
          title?: string
          description?: string
          icon_emoji?: string
          earned_at?: string
          created_at?: string
        }
      }
      characters: {
        Row: {
          id: string
          name: string
          species: string
          specialty: string
          bio: string
          personality: string
          teaching_style: string
          emoji: string
          color_primary: string
          color_secondary: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          species: string
          specialty: string
          bio: string
          personality: string
          teaching_style: string
          emoji: string
          color_primary: string
          color_secondary: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          species?: string
          specialty?: string
          bio?: string
          personality?: string
          teaching_style?: string
          emoji?: string
          color_primary?: string
          color_secondary?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      settings: {
        Row: {
          id: string
          user_id: string
          user_type: 'parent' | 'child'
          font_scale: number
          contrast_mode: 'normal' | 'high' | 'higher'
          color_blind_mode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'
          reduce_motion: boolean
          keyboard_nav_enabled: boolean
          screen_reader_optimized: boolean
          notifications_enabled: boolean
          sound_enabled: boolean
          music_enabled: boolean
          auto_save_enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          user_type: 'parent' | 'child'
          font_scale?: number
          contrast_mode?: 'normal' | 'high' | 'higher'
          color_blind_mode?: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'
          reduce_motion?: boolean
          keyboard_nav_enabled?: boolean
          screen_reader_optimized?: boolean
          notifications_enabled?: boolean
          sound_enabled?: boolean
          music_enabled?: boolean
          auto_save_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          user_type?: 'parent' | 'child'
          font_scale?: number
          contrast_mode?: 'normal' | 'high' | 'higher'
          color_blind_mode?: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'
          reduce_motion?: boolean
          keyboard_nav_enabled?: boolean
          screen_reader_optimized?: boolean
          notifications_enabled?: boolean
          sound_enabled?: boolean
          music_enabled?: boolean
          auto_save_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
