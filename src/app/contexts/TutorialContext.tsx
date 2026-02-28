import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface TutorialStep {
  id: string;
  target: string; // CSS selector or element ID
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  emoji?: string;
  highlightPulse?: boolean;
  action?: string; // Button text like "Got it!" or "Next!"
}

export interface TutorialTour {
  id: string;
  name: string;
  steps: TutorialStep[];
  requiredFor?: 'all' | 'kids' | 'parents';
}

interface TutorialState {
  activeTour: string | null;
  currentStepIndex: number;
  completedTours: string[];
  dismissedTooltips: string[];
  showTooltips: boolean;
  isParentMode: boolean;
  hasSeenWelcome: boolean;
}

interface TutorialContextType {
  // State
  activeTour: string | null;
  currentStepIndex: number;
  completedTours: string[];
  dismissedTooltips: string[];
  showTooltips: boolean;
  isParentMode: boolean;
  hasSeenWelcome: boolean;
  
  // Actions
  startTour: (tourId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  skipTour: () => void;
  completeTour: () => void;
  dismissTooltip: (tooltipId: string) => void;
  resetTutorials: () => void;
  toggleTooltips: (show: boolean) => void;
  setParentMode: (isParent: boolean) => void;
  shouldShowTooltip: (tooltipId: string) => boolean;
  getCurrentStep: () => TutorialStep | null;
  getTourProgress: (tourId: string) => { completed: boolean; progress: number };
  markWelcomeSeen: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

// Define all available tours
export const TOURS: Record<string, TutorialTour> = {
  firstTime: {
    id: 'firstTime',
    name: 'Welcome to Q Rator Kids!',
    requiredFor: 'kids',
    steps: [
      {
        id: 'welcome',
        target: 'body',
        title: 'Welcome to Q Rator Kids! 🎨',
        content: 'Hi there! I\'m so excited to teach you about art! Let me show you around!',
        emoji: '👋',
        action: 'Let\'s Start!',
        highlightPulse: true,
      },
      {
        id: 'nav-lessons',
        target: '[href="/lessons"]',
        title: 'Fun Lessons Here! 📚',
        content: 'Click here to learn how to draw amazing things! We have lots of fun lessons!',
        position: 'bottom',
        emoji: '🦁',
        action: 'Next!',
        highlightPulse: true,
      },
      {
        id: 'nav-stories',
        target: '[href="/stories"]',
        title: 'Cool Stories! ✨',
        content: 'Tap here to watch fun stories about famous artists and their paintings!',
        position: 'bottom',
        emoji: '📖',
        action: 'Next!',
        highlightPulse: true,
      },
      {
        id: 'nav-characters',
        target: '[href="/characters"]',
        title: 'Meet Your Teachers! 🐾',
        content: 'These are your animal art teachers! Click to learn about each one!',
        position: 'bottom',
        emoji: '🦁',
        action: 'Next!',
        highlightPulse: true,
      },
      {
        id: 'complete',
        target: 'body',
        title: 'You\'re Ready! 🌟',
        content: 'Great job! Now you know where everything is. Let\'s make some art!',
        emoji: '🎨',
        action: 'Start Drawing!',
      },
    ],
  },
  
  lessons: {
    id: 'lessons',
    name: 'How to Use Lessons',
    requiredFor: 'kids',
    steps: [
      {
        id: 'lesson-welcome',
        target: 'body',
        title: 'Let\'s Learn About Lessons! 📚',
        content: 'Lessons teach you how to draw step-by-step. I\'ll show you how they work!',
        emoji: '🦁',
        action: 'Show Me!',
      },
      {
        id: 'lesson-levels',
        target: '.lesson-levels',
        title: 'Pick Your Level! 🖍️✏️',
        content: 'Choose Beginner (Crayons) for easy lessons or Intermediate (Pencils) for harder ones!',
        position: 'bottom',
        emoji: '🎯',
        action: 'Got it!',
        highlightPulse: true,
      },
      {
        id: 'lesson-card',
        target: '.lesson-card:first-child',
        title: 'Click a Lesson! 👆',
        content: 'Tap any lesson card to start learning! Each lesson has fun steps to follow!',
        position: 'bottom',
        emoji: '✨',
        action: 'Awesome!',
        highlightPulse: true,
      },
    ],
  },
  
  parentDashboard: {
    id: 'parentDashboard',
    name: 'Parent Dashboard Guide',
    requiredFor: 'parents',
    steps: [
      {
        id: 'dashboard-welcome',
        target: 'body',
        title: 'Welcome to Your Dashboard! 📊',
        content: 'Here you can track your child\'s progress, set time limits, and view their achievements.',
        emoji: '👨‍👩‍👧',
        action: 'Show Me Around',
      },
      {
        id: 'child-selector',
        target: '.child-selector',
        title: 'Select Child Profile',
        content: 'If you have multiple children, select which child\'s progress you want to view here.',
        position: 'bottom',
        emoji: '👶',
        action: 'Next',
        highlightPulse: true,
      },
      {
        id: 'stats-cards',
        target: '.stats-cards',
        title: 'Quick Stats',
        content: 'See at-a-glance how much time they\'ve spent, lessons completed, and skills learned.',
        position: 'bottom',
        emoji: '📈',
        action: 'Next',
      },
      {
        id: 'parental-controls',
        target: '[value="controls"]',
        title: 'Parental Controls',
        content: 'Set daily time limits, content filters, and manage what your child can access.',
        position: 'top',
        emoji: '🛡️',
        action: 'Got It!',
        highlightPulse: true,
      },
    ],
  },
};

export function TutorialProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TutorialState>(() => {
    // Load from localStorage
    const saved = localStorage.getItem('qrator-tutorial-state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Ignore parse errors
      }
    }
    return {
      activeTour: null,
      currentStepIndex: 0,
      completedTours: [],
      dismissedTooltips: [],
      showTooltips: true,
      isParentMode: false,
      hasSeenWelcome: false,
    };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('qrator-tutorial-state', JSON.stringify(state));
  }, [state]);

  const startTour = (tourId: string) => {
    if (TOURS[tourId]) {
      setState(prev => ({
        ...prev,
        activeTour: tourId,
        currentStepIndex: 0,
      }));
    }
  };

  const nextStep = () => {
    setState(prev => {
      if (!prev.activeTour) return prev;
      const tour = TOURS[prev.activeTour];
      if (!tour) return prev;
      
      const nextIndex = prev.currentStepIndex + 1;
      if (nextIndex >= tour.steps.length) {
        // Tour complete
        return {
          ...prev,
          activeTour: null,
          currentStepIndex: 0,
          completedTours: [...prev.completedTours, prev.activeTour],
        };
      }
      
      return {
        ...prev,
        currentStepIndex: nextIndex,
      };
    });
  };

  const prevStep = () => {
    setState(prev => ({
      ...prev,
      currentStepIndex: Math.max(0, prev.currentStepIndex - 1),
    }));
  };

  const skipTour = () => {
    setState(prev => ({
      ...prev,
      activeTour: null,
      currentStepIndex: 0,
    }));
  };

  const completeTour = () => {
    setState(prev => {
      if (!prev.activeTour) return prev;
      return {
        ...prev,
        activeTour: null,
        currentStepIndex: 0,
        completedTours: [...prev.completedTours, prev.activeTour],
      };
    });
  };

  const dismissTooltip = (tooltipId: string) => {
    setState(prev => ({
      ...prev,
      dismissedTooltips: [...prev.dismissedTooltips, tooltipId],
    }));
  };

  const resetTutorials = () => {
    setState({
      activeTour: null,
      currentStepIndex: 0,
      completedTours: [],
      dismissedTooltips: [],
      showTooltips: true,
      isParentMode: state.isParentMode,
      hasSeenWelcome: false,
    });
  };

  const toggleTooltips = (show: boolean) => {
    setState(prev => ({
      ...prev,
      showTooltips: show,
    }));
  };

  const setParentMode = (isParent: boolean) => {
    setState(prev => ({
      ...prev,
      isParentMode: isParent,
    }));
  };

  const shouldShowTooltip = (tooltipId: string): boolean => {
    return (
      state.showTooltips &&
      !state.dismissedTooltips.includes(tooltipId)
    );
  };

  const getCurrentStep = (): TutorialStep | null => {
    if (!state.activeTour) return null;
    const tour = TOURS[state.activeTour];
    if (!tour) return null;
    return tour.steps[state.currentStepIndex] || null;
  };

  const getTourProgress = (tourId: string) => {
    const completed = state.completedTours.includes(tourId);
    const tour = TOURS[tourId];
    let progress = 0;
    
    if (completed) {
      progress = 100;
    } else if (state.activeTour === tourId) {
      progress = (state.currentStepIndex / tour.steps.length) * 100;
    }
    
    return { completed, progress };
  };

  const markWelcomeSeen = () => {
    setState(prev => ({
      ...prev,
      hasSeenWelcome: true,
    }));
  };

  const value: TutorialContextType = {
    activeTour: state.activeTour,
    currentStepIndex: state.currentStepIndex,
    completedTours: state.completedTours,
    dismissedTooltips: state.dismissedTooltips,
    showTooltips: state.showTooltips,
    isParentMode: state.isParentMode,
    hasSeenWelcome: state.hasSeenWelcome,
    startTour,
    nextStep,
    prevStep,
    skipTour,
    completeTour,
    dismissTooltip,
    resetTutorials,
    toggleTooltips,
    setParentMode,
    shouldShowTooltip,
    getCurrentStep,
    getTourProgress,
    markWelcomeSeen,
  };

  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  );
}

export function useTutorial() {
  const context = useContext(TutorialContext);
  if (context === undefined) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
}
