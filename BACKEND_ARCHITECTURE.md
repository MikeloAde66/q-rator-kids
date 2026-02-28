# Q Rator Kids - Backend Architecture Diagram

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Q RATOR KIDS FRONTEND                           │
│                     (React + TypeScript + Tailwind)                     │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ API Calls
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           SUPABASE CLIENT                                │
│                      (/src/lib/supabase.ts)                             │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
        ┌──────────────────┐ ┌───────────┐ ┌──────────────┐
        │   SUPABASE AUTH  │ │ SUPABASE  │ │   SUPABASE   │
        │                  │ │ DATABASE  │ │   STORAGE    │
        │ • Email/Password │ │ PostgreSQL│ │              │
        │ • Social OAuth   │ │ 14 Tables │ │ • artwork    │
        │ • Session Mgmt   │ │ + RLS     │ │ • lessons    │
        └──────────────────┘ └───────────┘ │ • avatars    │
                                            └──────────────┘
```

---

## 📊 Database Entity Relationship Diagram

```
┌──────────────┐
│   profiles   │  (Parent Accounts)
│──────────────│
│ id (PK)      │───┐
│ email        │   │
│ role         │   │
└──────────────┘   │
                   │ parent_id (FK)
                   │
    ┌──────────────┼──────────────┬──────────────┐
    │              │              │              │
    ▼              ▼              ▼              ▼
┌──────────┐  ┌──────────────┐ ┌──────────┐  ┌──────────┐
│ children │  │subscriptions │ │ settings │  │gift_cards│
│──────────│  │──────────────│ │──────────│  │──────────│
│ id (PK)  │  │ parent_id(FK)│ │ user_id  │  │redeemed  │
│parent_id │  │ tier         │ │user_type │  │by (FK)   │
│ name     │  │ status       │ │font_scale│  └──────────┘
│ age      │  │trial_end_date│ │contrast  │
│difficulty│  └──────────────┘ └──────────┘
└──────────┘
    │
    │ child_id (FK)
    │
    ├──────────────────────┬──────────────────┬──────────────────┐
    ▼                      ▼                  ▼                  ▼
┌────────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐
│lesson_progress │  │story_progress│  │assignment    │  │activity_log │
│────────────────│  │──────────────│  │_submissions  │  │─────────────│
│child_id (FK)   │  │child_id (FK) │  │child_id (FK) │  │child_id(FK) │
│lesson_id (FK)  │  │story_id (FK) │  │assignment_id │  │type         │
│status          │  │status        │  │artwork_url   │  │title        │
│stars_earned    │  │completed_at  │  │stars_earned  │  │created_at   │
└────────────────┘  └──────────────┘  └──────────────┘  └─────────────┘
                                                                │
                                                                ▼
                                                         ┌──────────────┐
                                                         │achievements  │
                                                         │──────────────│
                                                         │child_id (FK) │
                                                         │type          │
                                                         │title         │
                                                         │earned_at     │
                                                         └──────────────┘

┌──────────────┐
│ characters   │  (5 Animal Art Teachers - Pre-seeded!)
│──────────────│
│ id (PK)      │───┐
│ name         │   │
│ species      │   │ character_id (FK)
│ specialty    │   │
└──────────────┘   │
                   │
    ┌──────────────┼──────────────┬──────────────┐
    ▼              ▼              ▼              
┌──────────┐  ┌──────────┐  ┌──────────────┐
│ lessons  │  │ stories  │  │ assignments  │
│──────────│  │──────────│  │──────────────│
│ id (PK)  │  │ id (PK)  │  │ id (PK)      │
│char_id   │  │char_id   │  │char_id       │
│title     │  │title     │  │title         │
│is_premium│  │is_premium│  │is_premium    │
│duration  │  │duration  │  │instructions  │
└──────────┘  └──────────┘  └──────────────┘
```

---

## 🔄 Data Flow: User Signup → Content Access

```
1. USER SIGNS UP
   │
   ▼
┌────────────────────────────────────────┐
│ supabase.auth.signUp()                 │
│ • Email: parent@example.com            │
│ • Password: ********                   │
└────────────────────────────────────────┘
   │
   ▼
┌────────────────────────────────────────┐
│ TRIGGER: on_auth_user_created          │
│ Automatically runs:                    │
│                                        │
│ 1. Create profile in 'profiles' table  │
│    • id: <user_id>                     │
│    • email: parent@example.com         │
│    • role: 'parent'                    │
│                                        │
│ 2. Create subscription                 │
│    • parent_id: <user_id>              │
│    • tier: 'Free'                      │
│    • status: 'active'                  │
└────────────────────────────────────────┘
   │
   ▼
┌────────────────────────────────────────┐
│ PARENT CREATES CHILD PROFILE           │
│ • Name: Emma                           │
│ • Age: 7                               │
│ • Difficulty: Beginner                 │
└────────────────────────────────────────┘
   │
   ▼
┌────────────────────────────────────────┐
│ CHILD ACCESSES CONTENT                 │
│                                        │
│ ✅ Free Tier: 3 lessons, 3 stories,   │
│              3 assignments             │
│                                        │
│ 🔒 Premium: Locked (need Trial/Paid)  │
└────────────────────────────────────────┘
```

---

## 🎯 Data Flow: Lesson Completion

```
1. CHILD STARTS LESSON
   │
   ▼
┌────────────────────────────────────────┐
│ upsertLessonProgress()                 │
│ • child_id: <child_id>                 │
│ • lesson_id: <lesson_id>               │
│ • status: 'in_progress'                │
│ • progress_percentage: 0               │
└────────────────────────────────────────┘
   │
   ▼
2. CHILD WATCHES/COMPLETES LESSON
   │
   ▼
┌────────────────────────────────────────┐
│ upsertLessonProgress()                 │
│ • status: 'completed'                  │
│ • progress_percentage: 100             │
│ • stars_earned: 3                      │
│ • completed_at: NOW()                  │
└────────────────────────────────────────┘
   │
   ├──────────────────┬──────────────────┐
   │                  │                  │
   ▼                  ▼                  ▼
┌──────────┐   ┌─────────────┐   ┌──────────────┐
│Log       │   │Check for    │   │Update total  │
│Activity  │   │Achievements │   │stars count   │
│          │   │             │   │              │
│• type:   │   │• First      │   │SELECT SUM()  │
│  lesson  │   │  lesson?    │   │FROM lesson_  │
│• title:  │   │• 10 lessons?│   │progress      │
│  Completed│   │• 50 stars?  │   │WHERE child_id│
└──────────┘   └─────────────┘   └──────────────┘
```

---

## 🎁 Data Flow: Gift Card Redemption

```
1. PARENT ENTERS GIFT CARD CODE
   │
   ▼
┌────────────────────────────────────────┐
│ verifyGiftCard('QRATOR-ABC123')        │
│                                        │
│ SELECT * FROM gift_cards               │
│ WHERE code = 'QRATOR-ABC123'           │
│   AND status = 'available'             │
└────────────────────────────────────────┘
   │
   ├──── Valid? ────┐
   │                │
   NO              YES
   │                │
   ▼                ▼
Error          ┌────────────────────────────┐
"Invalid       │ Mark card as redeemed      │
 code"         │ • status: 'redeemed'       │
               │ • redeemed_by: <parent_id> │
               │ • redeemed_at: NOW()       │
               └────────────────────────────┘
                              │
                              ▼
               ┌────────────────────────────┐
               │ Update subscription        │
               │ • tier: 'Trial'            │
               │ • trial_start: NOW()       │
               │ • trial_end: NOW() + 30d   │
               │ • status: 'active'         │
               └────────────────────────────┘
                              │
                              ▼
               ┌────────────────────────────┐
               │ SUCCESS!                   │
               │ • All content unlocked     │
               │ • 30-day trial active      │
               └────────────────────────────┘
```

---

## 🔒 Row Level Security (RLS) Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    PARENT TRIES TO ACCESS DATA               │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Is user         │
                    │ authenticated?  │
                    └─────────────────┘
                         │        │
                       NO │        │ YES
                         │        │
                         ▼        ▼
                    ┌─────┐  ┌──────────────────┐
                    │DENY │  │ Check RLS Policy │
                    └─────┘  └──────────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
                    ▼                ▼                ▼
          ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
          │ Own Profile? │  │Own Children? │  │Public Content│
          │              │  │              │  │              │
          │ auth.uid()   │  │ Check        │  │ Lessons,     │
          │ = profile.id │  │ parent_id    │  │ Stories,     │
          │              │  │ = auth.uid() │  │ Characters   │
          └──────────────┘  └──────────────┘  └──────────────┘
                │                  │                  │
               YES                YES                YES
                │                  │                  │
                └──────────────────┴──────────────────┘
                                   │
                                   ▼
                            ┌────────────┐
                            │   ALLOW    │
                            └────────────┘
```

---

## 🎨 Content Access Control

```
┌─────────────────────────────────────────────────────────────┐
│                    CHILD TRIES TO ACCESS LESSON              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Fetch lesson     │
                    │ is_premium?      │
                    └──────────────────┘
                         │        │
                    FREE │        │ PREMIUM
                         │        │
                         ▼        ▼
                  ┌─────────┐  ┌──────────────────┐
                  │ ALLOW   │  │ Check subscription│
                  │ ACCESS  │  └──────────────────┘
                  └─────────┘           │
                                        │
                         ┌──────────────┼──────────────┐
                         │              │              │
                         ▼              ▼              ▼
                  ┌──────────┐   ┌──────────┐   ┌──────────┐
                  │ Free     │   │ Trial    │   │ Standard │
                  │ Tier     │   │ Active   │   │ Active   │
                  └──────────┘   └──────────┘   └──────────┘
                       │              │              │
                       ▼              ▼              ▼
                  ┌─────────┐    ┌─────────┐    ┌─────────┐
                  │  DENY   │    │  ALLOW  │    │  ALLOW  │
                  │ "Upgrade│    │ ACCESS  │    │ ACCESS  │
                  │  needed"│    └─────────┘    └─────────┘
                  └─────────┘
```

---

## 📱 Context Integration Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         REACT APP                            │
└─────────────────────────────────────────────────────────────┘
                              │
      ┌───────────────────────┼───────────────────────┐
      │                       │                       │
      ▼                       ▼                       ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│ AuthContext  │      │ Subscription │      │ Onboarding   │
│              │      │ Context      │      │ Context      │
│ • login()    │◄─────│              │      │              │
│ • signup()   │      │ • getTier()  │      │ • children   │
│ • logout()   │      │ • redeem()   │      │ • create()   │
│ • user       │      │ • hasAccess()│      │ • update()   │
└──────────────┘      └──────────────┘      └──────────────┘
      │                       │                       │
      └───────────────────────┼───────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Supabase Helpers │
                    │ (/lib/helpers)   │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Supabase Client  │
                    │ (/lib/supabase)  │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ SUPABASE BACKEND │
                    └──────────────────┘
```

---

## 🎯 Summary: Your Complete Stack

```
┌─────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                    │
│  React Components + Tailwind CSS + Motion Animations        │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                        STATE MANAGEMENT                      │
│  React Contexts (Auth, Subscription, Progress, Activity)    │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                        BUSINESS LOGIC                        │
│  Helper Functions (supabase-helpers.ts)                     │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                        API CLIENT                            │
│  Supabase Client (supabase.ts)                              │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                        BACKEND (SUPABASE)                    │
│  • PostgreSQL Database (14 tables + RLS)                    │
│  • Authentication (Email + Social OAuth)                    │
│  • Storage (artwork, lessons, avatars)                      │
│  • Realtime (live updates)                                  │
└─────────────────────────────────────────────────────────────┘
```

---

**This architecture supports:**
- ✅ Multi-tenant (multiple parents/families)
- ✅ Role-based access control (parent vs child)
- ✅ Subscription tiers (Free/Trial/Paid)
- ✅ Progress tracking & gamification
- ✅ Content management
- ✅ File storage & uploads
- ✅ Real-time updates
- ✅ Secure data access (RLS)
- ✅ COPPA-ready architecture
