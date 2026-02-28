import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'zh' | 'ja';
export type Theme = 'light' | 'dark' | 'auto';

interface NotificationPreferences {
  lessonReminders: boolean;
  newContent: boolean;
  achievements: boolean;
  parentalReports: boolean;
}

interface SoundSettings {
  masterVolume: number; // 0-100
  soundEffects: boolean;
  backgroundMusic: boolean;
  voiceOvers: boolean;
}

interface AppSettings {
  autoPlayNextLesson: boolean;
  showHints: boolean;
  pauseOnLosesFocus: boolean;
  lowDataMode: boolean;
}

interface SettingsContextType {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;
  
  // Sound
  soundSettings: SoundSettings;
  updateSoundSettings: (settings: Partial<SoundSettings>) => void;
  
  // Notifications
  notifications: NotificationPreferences;
  updateNotifications: (prefs: Partial<NotificationPreferences>) => void;
  
  // App Settings
  appSettings: AppSettings;
  updateAppSettings: (settings: Partial<AppSettings>) => void;
  
  // Actions
  clearCache: () => void;
  resetToDefaults: () => void;
  exportSettings: () => string;
  importSettings: (settingsJson: string) => void;
}

const defaultSoundSettings: SoundSettings = {
  masterVolume: 80,
  soundEffects: true,
  backgroundMusic: true,
  voiceOvers: true,
};

const defaultNotifications: NotificationPreferences = {
  lessonReminders: true,
  newContent: true,
  achievements: true,
  parentalReports: true,
};

const defaultAppSettings: AppSettings = {
  autoPlayNextLesson: false,
  showHints: true,
  pauseOnLosesFocus: true,
  lowDataMode: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  // Load from localStorage or use defaults
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('qrator-language');
    return (saved as Language) || 'en';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('qrator-theme');
    return (saved as Theme) || 'light';
  });

  const [soundSettings, setSoundSettings] = useState<SoundSettings>(() => {
    const saved = localStorage.getItem('qrator-sound-settings');
    return saved ? JSON.parse(saved) : defaultSoundSettings;
  });

  const [notifications, setNotifications] = useState<NotificationPreferences>(() => {
    const saved = localStorage.getItem('qrator-notifications');
    return saved ? JSON.parse(saved) : defaultNotifications;
  });

  const [appSettings, setAppSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('qrator-app-settings');
    return saved ? JSON.parse(saved) : defaultAppSettings;
  });

  // Persist to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem('qrator-language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('qrator-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('qrator-sound-settings', JSON.stringify(soundSettings));
  }, [soundSettings]);

  useEffect(() => {
    localStorage.setItem('qrator-notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('qrator-app-settings', JSON.stringify(appSettings));
  }, [appSettings]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const updateSoundSettings = (settings: Partial<SoundSettings>) => {
    setSoundSettings(prev => ({ ...prev, ...settings }));
  };

  const updateNotifications = (prefs: Partial<NotificationPreferences>) => {
    setNotifications(prev => ({ ...prev, ...prefs }));
  };

  const updateAppSettings = (settings: Partial<AppSettings>) => {
    setAppSettings(prev => ({ ...prev, ...settings }));
  };

  const clearCache = () => {
    try {
      // Clear all cached data except user settings
      const keysToKeep = [
        'qrator-language',
        'qrator-theme',
        'qrator-sound-settings',
        'qrator-notifications',
        'qrator-app-settings',
        'qrator-auth-user',
        'qrator-subscription',
      ];

      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('qrator-') && !keysToKeep.includes(key)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Failed to clear cache:', error);
      // Silently fail - app continues to work
    }
  };

  const resetToDefaults = () => {
    try {
      setLanguageState('en');
      setThemeState('light');
      setSoundSettings(defaultSoundSettings);
      setNotifications(defaultNotifications);
      setAppSettings(defaultAppSettings);
    } catch (error) {
      console.error('Failed to reset settings:', error);
      // Still update in memory
      setLanguageState('en');
      setThemeState('light');
      setSoundSettings(defaultSoundSettings);
      setNotifications(defaultNotifications);
      setAppSettings(defaultAppSettings);
    }
  };

  const exportSettings = (): string => {
    return JSON.stringify({
      language,
      theme,
      soundSettings,
      notifications,
      appSettings,
    }, null, 2);
  };

  const importSettings = (settingsJson: string) => {
    try {
      const imported = JSON.parse(settingsJson);
      if (imported.language) setLanguageState(imported.language);
      if (imported.theme) setThemeState(imported.theme);
      if (imported.soundSettings) setSoundSettings(imported.soundSettings);
      if (imported.notifications) setNotifications(imported.notifications);
      if (imported.appSettings) setAppSettings(imported.appSettings);
    } catch (error) {
      console.error('Failed to import settings:', error);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        soundSettings,
        updateSoundSettings,
        notifications,
        updateNotifications,
        appSettings,
        updateAppSettings,
        clearCache,
        resetToDefaults,
        exportSettings,
        importSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}

// Language labels for display
export const languageLabels: Record<Language, { name: string; flag: string }> = {
  en: { name: 'English', flag: '🇺🇸' },
  es: { name: 'Español', flag: '🇪🇸' },
  fr: { name: 'Français', flag: '🇫🇷' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  pt: { name: 'Português', flag: '🇧🇷' },
  zh: { name: '中文', flag: '🇨🇳' },
  ja: { name: '日本語', flag: '🇯🇵' },
};