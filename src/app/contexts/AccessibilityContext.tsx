import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

export type FontScale = 'small' | 'normal' | 'large' | 'extra-large';
export type ContrastMode = 'normal' | 'high' | 'extra-high';
export type ReducedMotion = 'no-preference' | 'reduce';
export type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

interface AccessibilityPreferences {
  // Font & Text
  fontScale: FontScale;
  dyslexicFont: boolean;
  lineHeight: number; // 1.0 - 2.0
  letterSpacing: number; // 0 - 0.2em
  
  // Colors & Contrast
  contrastMode: ContrastMode;
  colorBlindMode: ColorBlindMode;
  grayscaleMode: boolean;
  
  // Motion & Animations
  reducedMotion: ReducedMotion;
  disableAnimations: boolean;
  slowAnimations: boolean;
  
  // Interaction
  keyboardNavigation: boolean;
  showFocusOutlines: boolean;
  largerClickTargets: boolean;
  enableVoiceCommand: boolean;
  
  // Screen Reader
  screenReaderOptimized: boolean;
  verboseDescriptions: boolean;
  announceChanges: boolean;
  
  // Other
  simplifiedUI: boolean;
  pauseAutoPlay: boolean;
  underlinkLinks: boolean;
}

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  updatePreference: <K extends keyof AccessibilityPreferences>(
    key: K,
    value: AccessibilityPreferences[K]
  ) => void;
  updatePreferences: (prefs: Partial<AccessibilityPreferences>) => void;
  resetToDefaults: () => void;
  
  // Utility functions
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
  isFocusVisible: boolean;
  setFocusVisible: (visible: boolean) => void;
  
  // Keyboard shortcuts
  registerShortcut: (key: string, handler: () => void) => void;
  unregisterShortcut: (key: string) => void;
  
  // Presets
  applyPreset: (preset: 'default' | 'visual-impairment' | 'motor-impairment' | 'cognitive' | 'screen-reader') => void;
}

const defaultPreferences: AccessibilityPreferences = {
  fontScale: 'normal',
  dyslexicFont: false,
  lineHeight: 1.5,
  letterSpacing: 0,
  
  contrastMode: 'normal',
  colorBlindMode: 'none',
  grayscaleMode: false,
  
  reducedMotion: 'no-preference',
  disableAnimations: false,
  slowAnimations: false,
  
  keyboardNavigation: true,
  showFocusOutlines: true,
  largerClickTargets: false,
  enableVoiceCommand: false,
  
  screenReaderOptimized: false,
  verboseDescriptions: false,
  announceChanges: true,
  
  simplifiedUI: false,
  pauseAutoPlay: false,
  underlinkLinks: false,
};

// Presets for different accessibility needs
const presets: Record<string, Partial<AccessibilityPreferences>> = {
  default: defaultPreferences,
  
  'visual-impairment': {
    fontScale: 'large',
    contrastMode: 'high',
    showFocusOutlines: true,
    largerClickTargets: true,
    screenReaderOptimized: true,
    verboseDescriptions: true,
    underlinkLinks: true,
    lineHeight: 1.8,
    letterSpacing: 0.05,
  },
  
  'motor-impairment': {
    largerClickTargets: true,
    showFocusOutlines: true,
    keyboardNavigation: true,
    pauseAutoPlay: true,
    disableAnimations: true,
    reducedMotion: 'reduce',
  },
  
  'cognitive': {
    simplifiedUI: true,
    disableAnimations: true,
    reducedMotion: 'reduce',
    pauseAutoPlay: true,
    fontScale: 'large',
    lineHeight: 1.8,
    verboseDescriptions: false, // Less text for cognitive load
  },
  
  'screen-reader': {
    screenReaderOptimized: true,
    verboseDescriptions: true,
    announceChanges: true,
    disableAnimations: true,
    reducedMotion: 'reduce',
    keyboardNavigation: true,
    showFocusOutlines: true,
  },
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(() => {
    const saved = localStorage.getItem('qrator-accessibility');
    if (saved) {
      return { ...defaultPreferences, ...JSON.parse(saved) };
    }
    return defaultPreferences;
  });

  const [isFocusVisible, setFocusVisible] = useState(false);
  const [shortcuts, setShortcuts] = useState<Map<string, () => void>>(new Map());

  // Persist preferences to localStorage
  useEffect(() => {
    localStorage.setItem('qrator-accessibility', JSON.stringify(preferences));
  }, [preferences]);

  // Apply CSS classes and attributes based on preferences
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Font scale
    const fontSizes = {
      small: '14px',
      normal: '16px',
      large: '18px',
      'extra-large': '22px',
    };
    root.style.setProperty('--font-size', fontSizes[preferences.fontScale]);

    // Line height
    root.style.setProperty('--line-height', preferences.lineHeight.toString());
    
    // Letter spacing
    root.style.setProperty('--letter-spacing', `${preferences.letterSpacing}em`);

    // Contrast mode
    body.classList.remove('contrast-high', 'contrast-extra-high');
    if (preferences.contrastMode !== 'normal') {
      body.classList.add(`contrast-${preferences.contrastMode.replace('-', '-')}`);
    }

    // Color blind mode
    body.classList.remove('colorblind-protanopia', 'colorblind-deuteranopia', 'colorblind-tritanopia', 'colorblind-achromatopsia');
    if (preferences.colorBlindMode !== 'none') {
      body.classList.add(`colorblind-${preferences.colorBlindMode}`);
    }

    // Grayscale
    body.classList.toggle('grayscale', preferences.grayscaleMode);

    // Reduced motion
    body.classList.toggle('reduce-motion', preferences.reducedMotion === 'reduce' || preferences.disableAnimations);
    
    // Slow animations
    body.classList.toggle('slow-animations', preferences.slowAnimations);

    // Larger click targets
    body.classList.toggle('large-targets', preferences.largerClickTargets);

    // Focus outlines
    body.classList.toggle('show-focus', preferences.showFocusOutlines);

    // Underline links
    body.classList.toggle('underline-links', preferences.underlinkLinks);

    // Dyslexic font
    body.classList.toggle('dyslexic-font', preferences.dyslexicFont);

    // Simplified UI
    body.classList.toggle('simplified-ui', preferences.simplifiedUI);

    // Screen reader optimized
    body.classList.toggle('screen-reader-optimized', preferences.screenReaderOptimized);

  }, [preferences]);

  // Detect system preferences
  useEffect(() => {
    // Reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches && preferences.reducedMotion === 'no-preference') {
      updatePreference('reducedMotion', 'reduce');
    }

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        updatePreference('reducedMotion', 'reduce');
      }
    };

    motionQuery.addEventListener('change', handleMotionChange);
    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Keyboard navigation detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setFocusVisible(true);
      }
    };

    const handleMouseDown = () => {
      setFocusVisible(false);
    };

    if (preferences.keyboardNavigation) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('mousedown', handleMouseDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [preferences.keyboardNavigation]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = `${e.ctrlKey ? 'Ctrl+' : ''}${e.shiftKey ? 'Shift+' : ''}${e.altKey ? 'Alt+' : ''}${e.key}`;
      const handler = shortcuts.get(key);
      if (handler) {
        e.preventDefault();
        handler();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [shortcuts]);

  const updatePreference = useCallback(<K extends keyof AccessibilityPreferences>(
    key: K,
    value: AccessibilityPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  }, []);

  const updatePreferences = useCallback((prefs: Partial<AccessibilityPreferences>) => {
    setPreferences(prev => ({ ...prev, ...prefs }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setPreferences(defaultPreferences);
    localStorage.removeItem('qrator-accessibility');
  }, []);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!preferences.announceChanges) return;

    const announcer = document.getElementById('a11y-announcer');
    if (announcer) {
      announcer.setAttribute('aria-live', priority);
      announcer.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        announcer.textContent = '';
      }, 1000);
    }
  }, [preferences.announceChanges]);

  const registerShortcut = useCallback((key: string, handler: () => void) => {
    setShortcuts(prev => new Map(prev).set(key, handler));
  }, []);

  const unregisterShortcut = useCallback((key: string) => {
    setShortcuts(prev => {
      const newMap = new Map(prev);
      newMap.delete(key);
      return newMap;
    });
  }, []);

  const applyPreset = useCallback((preset: keyof typeof presets) => {
    const presetPrefs = presets[preset];
    if (presetPrefs) {
      updatePreferences(presetPrefs);
      announce(`Applied ${preset.replace('-', ' ')} preset`, 'assertive');
    }
  }, [announce, updatePreferences]);

  return (
    <AccessibilityContext.Provider
      value={{
        preferences,
        updatePreference,
        updatePreferences,
        resetToDefaults,
        announce,
        isFocusVisible,
        setFocusVisible,
        registerShortcut,
        unregisterShortcut,
        applyPreset,
      }}
    >
      {children}
      
      {/* Screen Reader Announcer */}
      <div
        id="a11y-announcer"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}

// Font scale labels
export const fontScaleLabels: Record<FontScale, string> = {
  small: 'Small (14px)',
  normal: 'Normal (16px)',
  large: 'Large (18px)',
  'extra-large': 'Extra Large (22px)',
};

// Contrast mode labels
export const contrastModeLabels: Record<ContrastMode, string> = {
  normal: 'Normal',
  high: 'High Contrast',
  'extra-high': 'Extra High Contrast',
};

// Color blind mode labels
export const colorBlindModeLabels: Record<ColorBlindMode, { name: string; description: string }> = {
  none: { name: 'None', description: 'Standard colors' },
  protanopia: { name: 'Protanopia', description: 'Red-blind' },
  deuteranopia: { name: 'Deuteranopia', description: 'Green-blind' },
  tritanopia: { name: 'Tritanopia', description: 'Blue-blind' },
  achromatopsia: { name: 'Achromatopsia', description: 'Total color blindness' },
};
