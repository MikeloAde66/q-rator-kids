import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = 'https://yopuithpufakmkiuufsl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvcHVpdGhwdWZha21raXV1ZnNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NjI0NDUsImV4cCI6MjA4NzUzODQ0NX0.LMAi9FKXm1ZSvU7Wo08ZtuHg9dU8IxS2PMGoxm4B-aU';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
