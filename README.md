# 🎨 Q Rator Kids - Interactive Art Education App

An engaging educational web app that teaches children ages 6-12 drawing and coloring basics using animated animal characters as art teachers.

![Q Rator Kids](https://img.shields.io/badge/Status-Ready%20to%20Deploy-success)
![Age Group](https://img.shields.io/badge/Ages-6--12-blue)
![Platform](https://img.shields.io/badge/Platform-Web%20App-orange)

---

## ✨ Features

### **🎓 Educational Content**
- **Drawing Lessons** - 10 lessons with 2 difficulty levels (Beginner 6-8, Intermediate 9-12)
- **Art Stories** - Animated stories about famous artworks
- **Assignments** - Creative drawing challenges
- **Entertainment Videos** - Fun educational content with playlist player

### **🦁 5 Animal Art Teachers**
- **Leo the Lion** - Drawing basics & shapes
- **Ellie the Elephant** - Colors & painting
- **The Curator (Raccoon)** - Art history & stories
- **Milly the Mouse** - Fine details & precision
- **Benny the Bear** - Creative expression

### **👨‍👩‍👧 Parent Features**
- Parent account creation & child profile management
- Comprehensive parental dashboard with activity tracking
- Progress monitoring & time controls
- Offline mode with download capabilities
- Share & rewards system

### **💎 Subscription System**
- **Free Tier** - 3 free lessons/stories/assignments
- **Trial** - 30-day access via $9.95 gift card
- **Standard** - Full access to all content
- Parental approval required for subscriptions

### **♿ Accessibility**
- Large touch targets for little fingers
- High contrast, colorful UI
- Screen reader support
- Keyboard navigation
- Kid-friendly language (ages 6-8 reading level)

### **📱 Technical Features**
- Fully responsive (mobile, tablet, desktop)
- Offline mode with service worker
- Video hosting via Supabase Storage
- QR code download flow
- Share to social media
- Real-time progress tracking

---

## 🚀 Quick Start

### **1. Install Dependencies**
```bash
npm install
```

### **2. Set Up Environment Variables**
Create a `.env` file:
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### **3. Run Development Server**
```bash
npm run dev
```

Open **http://localhost:5173** 🎉

### **4. Build for Production**
```bash
npm run build
```

---

## 📂 Project Structure

```
q-rator-kids/
├── src/app/
│   ├── components/       # Reusable UI components
│   │   ├── VideoPlaylist.tsx
│   │   ├── VideoPlayer.tsx
│   │   ├── Layout.tsx
│   │   └── ui/          # shadcn/ui components
│   ├── contexts/        # React contexts (15 contexts)
│   │   ├── AuthContext.tsx
│   │   ├── SubscriptionContext.tsx
│   │   ├── OnboardingContext.tsx
│   │   └── ...
│   ├── pages/           # Page components
│   │   ├── Home.tsx
│   │   ├── Entertainment.tsx
│   │   ├── Lessons.tsx
│   │   └── ...
│   ├── data/            # Static data & configuration
│   │   ├── videoUrls.ts
│   │   ├── lessons.ts
│   │   └── ...
│   ├── supabase/        # Supabase integration
│   │   ├── client.ts
│   │   ├── schema.ts
│   │   └── helpers/
│   ├── routes.tsx       # React Router configuration
│   └── App.tsx          # Root component
├── public/              # Static assets
├── DEPLOYMENT-GUIDE.md  # How to deploy
├── VIDEO-UPLOAD-GUIDE.md # How to add videos
└── package.json
```

---

## 🗄️ Database Schema (Supabase)

14 tables managing:
- User accounts (parents & children)
- Lessons, stories, assignments
- Progress tracking & activity logs
- Subscriptions & gift cards
- Downloads & offline content
- Settings & preferences

**Full schema:** See `/src/app/supabase/schema.ts`

---

## 🎬 Adding Entertainment Videos

### **1. Upload to Supabase Storage**
- Go to Supabase Dashboard → Storage → "Q Rator Videos"
- Upload your video (up to 5GB with Pro!)
- Copy the public URL

### **2. Add to App**
Edit `/src/app/data/videoUrls.ts`:
```typescript
export const ENTERTAINMENT_VIDEOS = {
  'sing-along': {
    url: `${SUPABASE_STORAGE_BASE}/Q%20Rator%20Videos/entertainment/sing-along.mp4`,
    title: 'Animal Art Song! 🎵',
    description: 'Sing along with your friends!',
    ageGroup: 'all'
  },
};
```

### **3. Done!**
Videos appear automatically on `/entertainment` page!

**Full guide:** See `/VIDEO-UPLOAD-GUIDE.md`

---

## 🌐 Deployment

### **Quick Deploy to Vercel (Recommended)**

1. Push code to GitHub
2. Go to **vercel.com** → "Import Project"
3. Select your repository
4. Add environment variables (Supabase credentials)
5. Click "Deploy"
6. **Done!** Get your live URL: `https://q-rator-kids.vercel.app`

**Full guide:** See `/DEPLOYMENT-GUIDE.md`

### **Alternative: Netlify**

1. Build: `npm run build`
2. Go to **app.netlify.com/drop**
3. Drag `dist` folder
4. **Done!** Get your live URL

**Checklist:** See `/QUICK-DEPLOY-CHECKLIST.md`

---

## 🔧 Tech Stack

### **Frontend**
- **React 18.3** - UI library
- **Vite 6** - Build tool
- **React Router 7** - Routing
- **Tailwind CSS 4** - Styling
- **Motion (Framer Motion)** - Animations
- **Radix UI** - Accessible components
- **Lucide React** - Icons

### **Backend**
- **Supabase** - Authentication, database, storage
- **PostgreSQL** - Database (via Supabase)
- **Supabase Storage** - Video/image hosting

### **Additional Libraries**
- **recharts** - Charts & graphs
- **qrcode.react** - QR code generation
- **react-hook-form** - Form handling
- **sonner** - Toast notifications
- **date-fns** - Date formatting

---

## 📋 Context System

15 React contexts managing app-wide state:

1. **AuthContext** - User authentication
2. **SubscriptionContext** - Subscription tiers & features
3. **OnboardingContext** - Child profiles & onboarding
4. **ActivityContext** - Activity tracking & parental dashboard
5. **DownloadContext** - Offline downloads
6. **SearchContext** - Search & filtering
7. **SettingsContext** - App settings & preferences
8. **OfflineContext** - Offline mode management
9. **LoadingContext** - Loading states & skeletons
10. **ShareContext** - Social sharing features
11. **TutorialContext** - Guided tours & tooltips
12. **AccessibilityContext** - Accessibility settings
13. Plus more...

---

## 🎯 User Flows

### **For Kids:**
1. Parent creates account
2. Parent adds child profile(s)
3. Child selects their profile
4. Access lessons, stories, entertainment
5. Track progress automatically

### **For Parents:**
1. Create parent account
2. Manage child profiles
3. View dashboard (activity, progress, time spent)
4. Manage subscription
5. Download content for offline use
6. Configure settings & parental controls

---

## 🔐 Environment Variables

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Optional: Analytics, Error Tracking, etc.
# Add as needed
```

---

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server (localhost:5173)

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Deployment (after build)
# Deploy 'dist' folder to Vercel/Netlify
```

---

## 🎨 Design System

### **Colors**
- **Primary:** Purple/Pink gradients
- **Secondary:** Blue/Cyan gradients
- **Success:** Green/Emerald
- **Warning:** Orange/Yellow
- **Danger:** Red/Pink

### **Typography**
- Extra large text for kids
- Bold, playful fonts
- Simple language (6-8 year old reading level)
- Lots of emojis! 🎨🎉🌟

### **Components**
- Large buttons (min 48px touch targets)
- Rounded corners (rounded-2xl, rounded-3xl)
- Shadows & borders for depth
- Animations on all interactions

---

## 📱 Browser Support

- ✅ Chrome/Edge (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ iOS Safari 14+
- ✅ Android Chrome 90+

---

## 🤝 Contributing

This is a personal project, but suggestions are welcome!

---

## 📄 License

Private project - All rights reserved

---

## 🆘 Support

### **Documentation:**
- `/DEPLOYMENT-GUIDE.md` - How to deploy your app
- `/VIDEO-UPLOAD-GUIDE.md` - How to add entertainment videos
- `/QUICK-DEPLOY-CHECKLIST.md` - Quick deployment steps
- `/ENTERTAINMENT-FEATURES.md` - Entertainment gallery features

### **Need Help?**
Check the guides above or review the code comments!

---

## 🎉 Current Status

### **✅ Completed:**
- Phase 1: All core features
- Authentication system
- Parent dashboard
- Subscription system
- 5 Character bio pages
- Offline mode
- Entertainment gallery with video playlist
- Tutorial system
- Accessibility improvements
- Complete Supabase backend
- Video hosting system
- **Ready to deploy!** 🚀

### **📊 Stats:**
- **15 Contexts** managing app state
- **30+ Pages/Components**
- **14 Database Tables**
- **5 Animal Characters**
- **2 Difficulty Levels**
- **100% Kid-Friendly** 🎨

---

## 🔗 Links

- **Supabase Dashboard:** https://supabase.com/dashboard
- **Deploy to Vercel:** https://vercel.com/new
- **Deploy to Netlify:** https://app.netlify.com/drop

---

## 🌟 Made with Love

Created for children ages 6-12 to discover the joy of art! 🎨✨

**Now with Entertainment Videos!** 🎬🎉
