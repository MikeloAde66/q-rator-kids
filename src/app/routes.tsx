import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Lessons } from "./pages/Lessons";
import { LessonDetail } from "./pages/LessonDetail";
import { Stories } from "./pages/Stories";
import { StoryDetail } from "./pages/StoryDetail";
import { Subscription } from "./pages/Subscription";
import { Account } from "./pages/Account";
import { Assignments } from "./pages/Assignments";
import { Onboarding } from "./pages/Onboarding";
import { ParentalDashboard } from "./pages/ParentalDashboard";
import { Settings } from "./pages/Settings";
import { OfflineDownloads } from "./pages/OfflineDownloads";
import { Characters } from "./pages/Characters";
import { CharacterBio } from "./pages/CharacterBio";
import { ShareRewards } from "./pages/ShareRewards";
import { AppStoreAssets } from "./pages/AppStoreAssets";
import { TutorialSettings } from "./pages/TutorialSettings";
import { AccessibilitySettings } from "./pages/AccessibilitySettings";
import { Entertainment } from "./pages/Entertainment";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/onboarding",
    Component: Onboarding,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "lessons", Component: Lessons },
      { path: "lessons/:level/:lessonId", Component: LessonDetail },
      { path: "stories", Component: Stories },
      { path: "stories/:storyId", Component: StoryDetail },
      { path: "entertainment", Component: Entertainment },
      { path: "assignments", Component: Assignments },
      { path: "subscription", Component: Subscription },
      { path: "account", Component: Account },
      { path: "dashboard", Component: ParentalDashboard },
      { path: "settings", Component: Settings },
      { path: "offline", Component: OfflineDownloads },
      { path: "characters", Component: Characters },
      { path: "characters/:characterId", Component: CharacterBio },
      { path: "share", Component: ShareRewards },
      { path: "app-store", Component: AppStoreAssets },
      { path: "tutorial-settings", Component: TutorialSettings },
      { path: "accessibility", Component: AccessibilitySettings },
      { path: "*", Component: NotFound },
    ],
  },
]);