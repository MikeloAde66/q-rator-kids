# Next.js Migration Guide
## Converting Q Rator Kids from React/Vite to Next.js

Since your stack uses **Next.js + Supabase + Docker + Railway + Stripe**, here's how to migrate this React app to Next.js.

## 🔄 Migration Steps

### 1. Create Next.js Project

```bash
npx create-next-app@latest q-rator-kids-nextjs --typescript --tailwind --app
cd q-rator-kids-nextjs
```

### 2. Install Dependencies

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install lucide-react motion class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-accordion @radix-ui/react-dialog @radix-ui/react-tabs
npm install stripe @stripe/stripe-js
```

### 3. Project Structure

```
/app
├── page.tsx                    # Home page
├── layout.tsx                  # Root layout
├── lessons/
│   ├── page.tsx                # Lessons list
│   └── [level]/
│       └── [lessonId]/
│           └── page.tsx        # Lesson detail
├── stories/
│   ├── page.tsx                # Stories list
│   └── [storyId]/
│       └── page.tsx            # Story detail
├── assignments/
│   └── page.tsx                # Assignments
├── progress/
│   └── page.tsx                # Progress tracking
└── api/
    ├── auth/
    │   └── route.ts            # Auth endpoints
    ├── lessons/
    │   └── route.ts            # Lessons API
    ├── progress/
    │   └── route.ts            # Progress API
    └── stripe/
        ├── create-checkout/
        │   └── route.ts        # Stripe checkout
        └── webhook/
            └── route.ts        # Stripe webhooks

/components
├── art-buddies/
│   └── ArtBuddyCard.tsx
├── lessons/
│   └── LessonCard.tsx
└── ui/                         # shadcn components

/lib
├── supabase.ts                 # Supabase client
├── stripe.ts                   # Stripe client
└── utils.ts                    # Utility functions

/data
├── characters.ts
├── lessons.ts
└── stories.ts
```

### 4. Environment Variables

Create `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Supabase Setup

```typescript
// /lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// /lib/supabase-server.ts (for server components)
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const createServerClient = () => {
  return createServerComponentClient({ cookies });
};
```

### 6. Convert Pages to Next.js App Router

**Example: Home Page**

```typescript
// /app/page.tsx
import { ArtBuddies } from '@/components/art-buddies/ArtBuddyList';
import { HeroSection } from '@/components/home/HeroSection';
import { Features } from '@/components/home/Features';

export default function HomePage() {
  return (
    <div className="space-y-12 pb-8">
      <HeroSection />
      <ArtBuddies />
      <Features />
    </div>
  );
}
```

**Example: Lessons Page with Server Components**

```typescript
// /app/lessons/page.tsx
import { createServerClient } from '@/lib/supabase-server';
import { LessonCard } from '@/components/lessons/LessonCard';

export default async function LessonsPage() {
  const supabase = createServerClient();
  
  // Fetch lessons from Supabase
  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .order('order_index');

  return (
    <div className="space-y-8">
      <h1>Fun Art Lessons! 🎨</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lessons?.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
```

### 7. API Routes

**Example: Progress Tracking**

```typescript
// /app/api/progress/route.ts
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { lessonId } = await request.json();

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('user_lesson_progress')
    .upsert({
      user_id: user.id,
      lesson_id: lessonId,
      completed: true,
      completed_at: new Date().toISOString()
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('user_lesson_progress')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
```

**Example: Stripe Checkout**

```typescript
// /app/api/stripe/create-checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
  const { priceId } = await request.json();

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
  });

  return NextResponse.json({ sessionId: session.id });
}
```

### 8. Authentication

```typescript
// /app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { email, password, childName, childAge } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        child_name: childName,
        child_age: childAge,
      },
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ user: data.user });
}
```

### 9. Client Components for Interactivity

```typescript
// /components/lessons/LessonCard.tsx
'use client';

import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import Link from 'next/link';

export function LessonCard({ lesson }: { lesson: any }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="..."
    >
      <Link href={`/lessons/${lesson.level}/${lesson.id}`}>
        {/* Card content */}
      </Link>
    </motion.div>
  );
}
```

### 10. Docker Configuration

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
      - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
      - STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET}
    restart: unless-stopped
```

### 11. Railway Deployment

```json
// railway.json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm run start",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

**Railway Environment Variables:**
Add all your `.env.local` variables in the Railway dashboard.

### 12. next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'your-supabase-url.supabase.co'],
  },
  output: 'standalone', // For Docker
}

module.exports = nextConfig
```

### 13. Middleware for Auth Protection

```typescript
// /middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect certain routes
  if (!user && req.nextUrl.pathname.startsWith('/progress')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/progress/:path*', '/assignments/:path*'],
};
```

### 14. Testing Locally

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Docker
docker-compose up --build
```

### 15. Deploy to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

## 🎯 Key Differences from React/Vite

1. **Routing**: File-based routing in `/app` directory instead of React Router
2. **Data Fetching**: Server Components can fetch data directly, no need for useEffect
3. **API Routes**: Built-in API routes instead of separate backend
4. **Image Optimization**: Use Next.js `<Image>` component
5. **Performance**: Automatic code splitting and optimization

## 📦 Migration Checklist

- [ ] Set up Next.js project
- [ ] Migrate all pages to app router
- [ ] Convert React Router links to Next.js Link
- [ ] Set up Supabase client and server helpers
- [ ] Create API routes for backend functionality
- [ ] Integrate Stripe for subscriptions
- [ ] Set up authentication flow
- [ ] Configure Docker and docker-compose
- [ ] Deploy to Railway
- [ ] Set up environment variables
- [ ] Test all features
- [ ] Set up monitoring and logging

---

Your current React app provides a solid foundation - the component structure and logic remain largely the same, you're just adapting to Next.js patterns!
