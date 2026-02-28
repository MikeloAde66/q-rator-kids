import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ChildProfile {
  name: string;
  ageGroup: '6-8' | '9-12';
  favoriteCharacter: string;
}

interface ParentInfo {
  email: string;
  consent: boolean;
  language: string;
}

interface OnboardingContextType {
  hasCompletedOnboarding: boolean;
  currentStep: number;
  childProfile: ChildProfile;
  parentInfo: ParentInfo;
  setCurrentStep: (step: number) => void;
  updateChildProfile: (profile: Partial<ChildProfile>) => void;
  updateParentInfo: (info: Partial<ParentInfo>) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    try {
      return localStorage.getItem('onboarding_completed') === 'true';
    } catch {
      return false;
    }
  });

  const [currentStep, setCurrentStep] = useState(0);

  const [childProfile, setChildProfile] = useState<ChildProfile>(() => {
    try {
      const saved = localStorage.getItem('child_profile');
      return saved ? JSON.parse(saved) : {
        name: '',
        ageGroup: '6-8' as const,
        favoriteCharacter: ''
      };
    } catch {
      return {
        name: '',
        ageGroup: '6-8' as const,
        favoriteCharacter: ''
      };
    }
  });

  const [parentInfo, setParentInfo] = useState<ParentInfo>(() => {
    try {
      const saved = localStorage.getItem('parent_info');
      return saved ? JSON.parse(saved) : {
        email: '',
        consent: false,
        language: 'en'
      };
    } catch {
      return {
        email: '',
        consent: false,
        language: 'en'
      };
    }
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('child_profile', JSON.stringify(childProfile));
    } catch (error) {
      console.error('Failed to save child profile:', error);
    }
  }, [childProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('parent_info', JSON.stringify(parentInfo));
    } catch (error) {
      console.error('Failed to save parent info:', error);
    }
  }, [parentInfo]);

  const updateChildProfile = (profile: Partial<ChildProfile>) => {
    setChildProfile(prev => ({ ...prev, ...profile }));
  };

  const updateParentInfo = (info: Partial<ParentInfo>) => {
    setParentInfo(prev => ({ ...prev, ...info }));
  };

  const completeOnboarding = () => {
    try {
      setHasCompletedOnboarding(true);
      localStorage.setItem('onboarding_completed', 'true');
    } catch (error) {
      console.error('Failed to save onboarding completion:', error);
      setHasCompletedOnboarding(true); // Still complete in memory
    }
  };

  const resetOnboarding = () => {
    try {
      setHasCompletedOnboarding(false);
      setCurrentStep(0);
      localStorage.removeItem('onboarding_completed');
      localStorage.removeItem('child_profile');
      localStorage.removeItem('parent_info');
    } catch (error) {
      console.error('Failed to reset onboarding:', error);
      // Still reset in memory
      setHasCompletedOnboarding(false);
      setCurrentStep(0);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        hasCompletedOnboarding,
        currentStep,
        childProfile,
        parentInfo,
        setCurrentStep,
        updateChildProfile,
        updateParentInfo,
        completeOnboarding,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}