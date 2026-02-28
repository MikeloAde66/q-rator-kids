# DevOps Integration Guide - Q Rator Kids

This document provides technical details for integrating Q Rator Kids with your backend stack and deploying to production.

## 🏗️ Architecture Overview

### Current State (Frontend Only)
- React SPA with client-side routing
- Mock data in TypeScript files
- No authentication
- No persistent storage

### Recommended Production Architecture

```
┌─────────────┐
│   CDN/Edge  │ (Cloudflare, Vercel, etc.)
└──────┬──────┘
       │
┌──────▼──────────────────────────────────┐
│     React Frontend (Static Build)        │
│  - Vite optimized bundle                 │
│  - Code splitting by route               │
│  - Lazy loaded components                │
└──────┬──────────────────────────────────┘
       │
       │ API Calls
       │
┌──────▼──────────────────────────────────┐
│     Backend API Layer                    │
│  - REST or GraphQL                       │
│  - Authentication middleware             │
│  - Rate limiting                         │
│  - Caching layer (Redis)                 │
└──────┬──────────────────────────────────┘
       │
   ┌───┴────┐
   │        │
┌──▼──┐ ┌──▼────────┐
│ DB  │ │  Storage  │
│     │ │  (S3/etc) │
└─────┘ └───────────┘
```

## 🔧 Backend Integration Points

### 1. Data Models

Replace `/src/app/data/lessons.ts` and `/src/app/data/stories.ts` with API calls:

**Before (Current):**
```typescript
import { lessons } from "../data/lessons";
```

**After (With Backend):**
```typescript
import { useQuery } from '@tanstack/react-query'; // or your data fetching library

function useLessons() {
  return useQuery({
    queryKey: ['lessons'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/lessons`);
      return res.json();
    }
  });
}
```

### 2. User Progress Tracking

**Frontend Hook Example:**
```typescript
// /src/app/hooks/useProgress.ts
export function useProgress(userId: string) {
  const queryClient = useQueryClient();

  const completeLesson = useMutation({
    mutationFn: async (lessonId: string) => {
      return fetch(`${API_URL}/api/users/${userId}/lessons/${lessonId}/complete`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['progress', userId]);
    }
  });

  return { completeLesson };
}
```

### 3. Video Integration

**Replace placeholder video players with real embeds:**

```typescript
// LessonDetail.tsx - Update video section
<div className="relative aspect-video bg-black">
  {lesson.videoProvider === 'youtube' ? (
    <iframe
      src={`https://www.youtube.com/embed/${lesson.videoId}`}
      className="w-full h-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  ) : lesson.videoProvider === 'vimeo' ? (
    <iframe
      src={`https://player.vimeo.com/video/${lesson.videoId}`}
      className="w-full h-full"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
    />
  ) : (
    <video
      src={lesson.videoUrl}
      controls
      className="w-full h-full"
    />
  )}
</div>
```

## 🗄️ Database Schema (Supabase/PostgreSQL)

### Tables

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  age INTEGER,
  parent_email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lessons
CREATE TABLE lessons (
  id TEXT PRIMARY KEY,
  level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  title TEXT NOT NULL,
  description TEXT,
  character TEXT,
  character_avatar_url TEXT,
  video_provider TEXT CHECK (video_provider IN ('youtube', 'vimeo', 'custom')),
  video_id TEXT,
  video_url TEXT,
  duration TEXT,
  skills TEXT[],
  assignment_title TEXT,
  assignment_url TEXT,
  materials TEXT[],
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Progress
CREATE TABLE user_lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id TEXT REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  video_progress_seconds INTEGER DEFAULT 0,
  last_watched_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Stories
CREATE TABLE stories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  artwork TEXT NOT NULL,
  artist TEXT NOT NULL,
  year TEXT,
  thumbnail_url TEXT,
  artwork_image_url TEXT,
  description TEXT,
  fun_facts TEXT[],
  techniques TEXT[],
  video_provider TEXT,
  video_id TEXT,
  video_url TEXT,
  duration TEXT,
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Story Progress
CREATE TABLE user_story_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  story_id TEXT REFERENCES stories(id) ON DELETE CASCADE,
  watched BOOLEAN DEFAULT FALSE,
  watched_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, story_id)
);

-- Achievements
CREATE TABLE achievements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color_gradient TEXT,
  criteria JSONB,
  order_index INTEGER
);

-- User Achievements
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id TEXT REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Assignment Submissions
CREATE TABLE assignment_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id TEXT REFERENCES lessons(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_user_progress_user ON user_lesson_progress(user_id);
CREATE INDEX idx_user_progress_lesson ON user_lesson_progress(lesson_id);
CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX idx_assignment_submissions_user ON assignment_submissions(user_id);
```

### Supabase Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_story_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;

-- Policies
-- Users can only see their own progress
CREATE POLICY "Users can view own progress"
  ON user_lesson_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_lesson_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_lesson_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Similar policies for other tables...
```

## 🔐 Authentication Implementation

### Option 1: Supabase Auth

```typescript
// /src/app/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// /src/app/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### Option 2: Custom JWT Auth

```typescript
// /src/app/lib/auth.ts
export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const { token, user } = await res.json();
  localStorage.setItem('token', token);
  return user;
}

export function getAuthToken() {
  return localStorage.getItem('token');
}

export async function fetchWithAuth(url: string, options = {}) {
  const token = getAuthToken();
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`
    }
  });
}
```

## 📦 File Storage Integration

### Assignment PDFs & User Submissions

**Supabase Storage:**
```typescript
// Upload assignment PDF (admin)
async function uploadAssignment(lessonId: string, file: File) {
  const { data, error } = await supabase.storage
    .from('assignments')
    .upload(`${lessonId}.pdf`, file, {
      cacheControl: '3600',
      upsert: true
    });
  
  return data?.path;
}

// Upload user submission
async function uploadSubmission(userId: string, lessonId: string, file: File) {
  const fileName = `${userId}/${lessonId}/${Date.now()}.jpg`;
  const { data, error } = await supabase.storage
    .from('submissions')
    .upload(fileName, file);
  
  return data?.path;
}

// Get signed URL for download
async function getAssignmentUrl(lessonId: string) {
  const { data } = await supabase.storage
    .from('assignments')
    .createSignedUrl(`${lessonId}.pdf`, 3600);
  
  return data?.signedUrl;
}
```

## 🚀 CI/CD Pipeline

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy Q Rator Kids

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build
      env:
        VITE_API_URL: ${{ secrets.API_URL }}
        VITE_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'
```

## 🔍 Monitoring & Analytics

### Add Analytics Tracking

```typescript
// /src/app/lib/analytics.ts
export function trackLessonStart(lessonId: string) {
  // Google Analytics
  if (window.gtag) {
    window.gtag('event', 'lesson_start', {
      lesson_id: lessonId
    });
  }
  
  // Custom API
  fetch(`${API_URL}/api/analytics/track`, {
    method: 'POST',
    body: JSON.stringify({
      event: 'lesson_start',
      lesson_id: lessonId,
      timestamp: new Date().toISOString()
    })
  });
}

export function trackLessonComplete(lessonId: string, duration: number) {
  if (window.gtag) {
    window.gtag('event', 'lesson_complete', {
      lesson_id: lessonId,
      duration_seconds: duration
    });
  }
}
```

### Error Tracking (Sentry)

```typescript
// /src/app/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay()
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

## 🌐 CDN & Performance

### Image Optimization

```typescript
// Use image CDN (Cloudinary, ImageKit, etc.)
function getOptimizedImage(url: string, width: number) {
  return `${CDN_URL}/w_${width},q_auto,f_auto/${url}`;
}

// Usage
<img 
  src={getOptimizedImage(lesson.characterAvatar, 400)} 
  srcSet={`
    ${getOptimizedImage(lesson.characterAvatar, 400)} 1x,
    ${getOptimizedImage(lesson.characterAvatar, 800)} 2x
  `}
  alt={lesson.character}
/>
```

### Lazy Loading

```typescript
// Already implemented with React Router
// Add lazy loading for heavy components
import { lazy, Suspense } from 'react';

const LessonDetail = lazy(() => import('./pages/LessonDetail'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LessonDetail />
    </Suspense>
  );
}
```

## 🧪 Testing

### Add Tests

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

```typescript
// /src/app/pages/__tests__/Home.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Home } from '../Home';

describe('Home Page', () => {
  it('renders welcome message', () => {
    render(<Home />);
    expect(screen.getByText(/Welcome to Q Rator Kids/i)).toBeInTheDocument();
  });
});
```

## 📋 Environment Variables Reference

```env
# API
VITE_API_URL=https://api.yourapp.com
VITE_API_VERSION=v1

# Authentication
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...

# Storage
VITE_STORAGE_BUCKET=qrator-kids
VITE_CDN_URL=https://cdn.yourapp.com

# Video
VITE_VIDEO_CDN=https://video.yourapp.com

# Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx

# Feature Flags
VITE_ENABLE_SUBMISSIONS=true
VITE_ENABLE_SOCIAL_SHARE=false
```

## 🔒 Security Checklist

- [ ] Implement rate limiting on API endpoints
- [ ] Add CSRF protection
- [ ] Sanitize user inputs
- [ ] Validate file uploads (type, size)
- [ ] Use HTTPS everywhere
- [ ] Implement proper CORS policies
- [ ] Add Content Security Policy headers
- [ ] Use environment variables for secrets
- [ ] Implement session timeout
- [ ] Add parental consent for users under 13 (COPPA compliance)

## 📞 Support & Maintenance

### Logging

```typescript
// /src/app/lib/logger.ts
export function logError(error: Error, context?: any) {
  console.error('[Q Rator Kids Error]', error, context);
  
  // Send to monitoring service
  Sentry.captureException(error, { extra: context });
}
```

---

This guide provides the foundation for your DevOps team to integrate Q Rator Kids with your production infrastructure. Adjust as needed for your specific stack and requirements.
