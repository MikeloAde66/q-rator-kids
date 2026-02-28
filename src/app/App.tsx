import { RouterProvider } from "react-router";
import { router } from "./routes";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import { OnboardingProvider } from "./contexts/OnboardingContext";
import { AuthProvider } from "./contexts/AuthContext";
import { DownloadProvider } from "./contexts/DownloadContext";
import { ActivityProvider } from "./contexts/ActivityContext";
import { SearchProvider } from "./contexts/SearchContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { OfflineProvider } from "./contexts/OfflineContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { ShareProvider } from "./contexts/ShareContext";
import { TutorialProvider } from "./contexts/TutorialContext";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";
import { ToastProvider } from "./components/ToastProvider";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <LoadingProvider>
          <AuthProvider>
            <OnboardingProvider>
              <SubscriptionProvider>
                <DownloadProvider>
                  <ActivityProvider>
                    <SearchProvider>
                      <SettingsProvider>
                        <OfflineProvider>
                          <ShareProvider>
                            <TutorialProvider>
                              <AccessibilityProvider>
                                <RouterProvider router={router} />
                              </AccessibilityProvider>
                            </TutorialProvider>
                          </ShareProvider>
                        </OfflineProvider>
                      </SettingsProvider>
                    </SearchProvider>
                  </ActivityProvider>
                </DownloadProvider>
              </SubscriptionProvider>
            </OnboardingProvider>
          </AuthProvider>
        </LoadingProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}