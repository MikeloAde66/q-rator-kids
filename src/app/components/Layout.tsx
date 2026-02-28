import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { Home, BookOpen, Sparkles, Download, User, LogIn, Palette, LogOut, Users, BarChart3, Settings, Share2, Film } from "lucide-react";
import { Button } from "./ui/button";
import { OnboardingGuard } from "./OnboardingGuard";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import { ProfileSwitcherModal } from "./ProfileSwitcherModal";
import { DownloadHistoryModal } from "./DownloadHistoryModal";
import { DemoDataGenerator } from "./DemoDataGenerator";
import { OfflineIndicator } from "./OfflineIndicator";
import { GuidedTour } from "./GuidedTour";
import { WelcomeModal } from "./WelcomeModal";
import { ModeIndicator } from "./ModeIndicator";
import { SkipLinks } from "./SkipLinks";
import { KeyboardShortcutsGuide } from "./KeyboardShortcutsGuide";
import { useAuth } from "../contexts/AuthContext";
import { useDownload } from "../contexts/DownloadContext";
import { useNavigate } from "react-router";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, parentUser, activeChildProfile, logout } = useAuth();
  const { getDownloadCount } = useDownload();
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showProfileSwitcher, setShowProfileSwitcher] = useState(false);
  const [showDownloadHistory, setShowDownloadHistory] = useState(false);

  const downloadCount = getDownloadCount();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/lessons', icon: BookOpen, label: 'Lessons' },
    { path: '/stories', icon: Sparkles, label: 'Stories' },
    { path: '/entertainment', icon: Film, label: 'Videos' },
    { path: '/characters', icon: Users, label: 'Characters' },
    { path: '/assignments', icon: Download, label: 'Assignments' },
  ];

  // Add dashboard, share, and settings for parent users
  const parentNavItems = isAuthenticated && parentUser ? [
    ...navItems,
    { path: '/share', icon: Share2, label: 'Share' },
    { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ] : navItems;

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <OnboardingGuard>
      {/* Skip Links for Accessibility */}
      <SkipLinks />
      
      {/* Keyboard Shortcuts Guide */}
      <KeyboardShortcutsGuide />
      
      {/* Demo Data Generator - creates sample activity for testing */}
      <DemoDataGenerator />
      
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-pink-50 to-purple-50">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-50" role="banner">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3" aria-label="Q Rator Kids Home">
                <div className="bg-gradient-to-br from-pink-500 to-purple-500 p-3 rounded-2xl">
                  <Palette className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h1 className="text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    Q Rator Kids
                  </h1>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav id="main-navigation" className="hidden md:flex items-center gap-6" aria-label="Main navigation">
                {parentNavItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                        active
                          ? 'bg-purple-100 text-purple-700 shadow-sm'
                          : 'text-gray-600 hover:bg-purple-50'
                      }`}
                      aria-current={active ? 'page' : undefined}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
                
                {/* Auth Buttons */}
                <div className="flex items-center gap-3 ml-4 pl-4 border-l-2 border-purple-200">
                  {/* Download History Button */}
                  <button
                    onClick={() => setShowDownloadHistory(true)}
                    className="relative p-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl shadow-md transition-all"
                    title="Download History"
                  >
                    <Download className="w-5 h-5" />
                    {downloadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-black rounded-full flex items-center justify-center border-2 border-white">
                        {downloadCount}
                      </span>
                    )}
                  </button>

                  {isAuthenticated && parentUser ? (
                    <>
                      {/* Active Child Profile Display */}
                      {activeChildProfile && (
                        <button
                          onClick={() => setShowProfileSwitcher(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all border-2 border-white shadow-md"
                        >
                          <Users className="w-4 h-4 text-gray-800" />
                          <span className="font-black text-gray-800">{activeChildProfile.name}</span>
                        </button>
                      )}
                      
                      <Link to="/account">
                        <Button 
                          size="sm"
                          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl shadow-lg font-bold"
                        >
                          <User className="w-4 h-4" />
                          Account
                        </Button>
                      </Link>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-xl border-2 border-gray-300 text-gray-600 hover:bg-gray-50 font-bold"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowLoginModal(true)}
                        className="flex items-center gap-2 rounded-xl border-2 border-purple-300 text-purple-600 hover:bg-purple-50 font-bold"
                      >
                        <LogIn className="w-4 h-4" />
                        Log In
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => setShowRegisterModal(true)}
                        className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl shadow-lg font-bold"
                      >
                        <User className="w-4 h-4" />
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main id="main-content" className="max-w-7xl mx-auto px-4 py-8" role="main">
          <Outlet />
        </main>

        {/* Mobile Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100 shadow-lg z-50" aria-label="Mobile navigation">
          <div className="flex items-center justify-around px-2 py-3">
            {parentNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                    active ? 'text-purple-600' : 'text-gray-500'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon className={`w-6 h-6 ${active ? 'fill-purple-100' : ''}`} aria-hidden="true" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom padding for mobile nav */}
        <div className="h-20 md:hidden" />
      </div>

      {/* Offline Indicator */}
      <OfflineIndicator />

      {/* Auth Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
        onSwitchToForgotPassword={() => {
          setShowLoginModal(false);
          setShowForgotPasswordModal(true);
        }}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />

      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
        onSwitchToLogin={() => {
          setShowForgotPasswordModal(false);
          setShowLoginModal(true);
        }}
      />

      <ProfileSwitcherModal
        isOpen={showProfileSwitcher}
        onClose={() => setShowProfileSwitcher(false)}
        onAddChild={() => {
          // TODO: Navigate to add child flow (could be part of onboarding or a separate flow)
          console.log('Add child profile');
        }}
      />

      <DownloadHistoryModal
        isOpen={showDownloadHistory}
        onClose={() => setShowDownloadHistory(false)}
      />

      {/* Tutorial Components */}
      <GuidedTour />
      <WelcomeModal />
      <ModeIndicator />
    </OnboardingGuard>
  );
}