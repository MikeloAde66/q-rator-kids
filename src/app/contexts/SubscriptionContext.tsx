import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type SubscriptionTier = 'none' | 'free' | 'trial' | 'standard';

interface SubscriptionContextType {
  tier: SubscriptionTier;
  trialStartDate: string | null;
  trialDaysRemaining: number;
  isTrialExpired: boolean;
  activateFreeTier: () => void;
  activateTrialTier: () => void;
  activateStandardTier: () => void;
  cancelSubscription: () => void;
  hasAccessToContent: (contentId: string) => boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const FREE_LESSONS = ['beginner-1', 'beginner-2', 'intermediate-1'];
const FREE_STORIES = ['mona-lisa-smile', 'starry-night-adventure'];

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [tier, setTier] = useState<SubscriptionTier>('none');
  const [trialStartDate, setTrialStartDate] = useState<string | null>(null);

  // Load subscription data from localStorage on mount
  useEffect(() => {
    try {
      const savedTier = localStorage.getItem('qrator_tier') as SubscriptionTier | null;
      const savedTrialStart = localStorage.getItem('qrator_trial_start');
      
      if (savedTier) setTier(savedTier);
      if (savedTrialStart) setTrialStartDate(savedTrialStart);
    } catch (error) {
      console.error('Failed to load subscription data:', error);
      // Set safe defaults
      setTier('none');
      setTrialStartDate(null);
    }
  }, []);

  // Calculate trial days remaining
  const trialDaysRemaining = trialStartDate
    ? Math.max(0, 30 - Math.floor((Date.now() - new Date(trialStartDate).getTime()) / (1000 * 60 * 60 * 24)))
    : 0;

  const isTrialExpired = tier === 'trial' && trialDaysRemaining <= 0;

  const activateFreeTier = () => {
    try {
      setTier('free');
      localStorage.setItem('qrator_tier', 'free');
    } catch (error) {
      console.error('Failed to save free tier:', error);
      setTier('free'); // Still set in memory
    }
  };

  const activateTrialTier = () => {
    try {
      const now = new Date().toISOString();
      setTier('trial');
      setTrialStartDate(now);
      localStorage.setItem('qrator_tier', 'trial');
      localStorage.setItem('qrator_trial_start', now);
    } catch (error) {
      console.error('Failed to save trial tier:', error);
      // Still set in memory
      const now = new Date().toISOString();
      setTier('trial');
      setTrialStartDate(now);
    }
  };

  const activateStandardTier = () => {
    try {
      setTier('standard');
      localStorage.setItem('qrator_tier', 'standard');
      // Clear trial data
      localStorage.removeItem('qrator_trial_start');
      setTrialStartDate(null);
    } catch (error) {
      console.error('Failed to save standard tier:', error);
      setTier('standard'); // Still set in memory
      setTrialStartDate(null);
    }
  };

  const cancelSubscription = () => {
    try {
      // When trial expires or user cancels, they go back to free tier
      setTier('free');
      localStorage.setItem('qrator_tier', 'free');
      localStorage.removeItem('qrator_trial_start');
      setTrialStartDate(null);
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      setTier('free'); // Still set in memory
      setTrialStartDate(null);
    }
  };

  const hasAccessToContent = (contentId: string) => {
    // Standard tier has access to everything
    if (tier === 'standard') return true;
    
    // Trial tier has access to everything (for 30 days)
    if (tier === 'trial' && !isTrialExpired) return true;
    
    // Free tier has access to specific content
    if (tier === 'free') {
      return FREE_LESSONS.includes(contentId) || FREE_STORIES.includes(contentId);
    }
    
    // No tier selected ('none') - still grant access to free content
    if (tier === 'none') {
      return FREE_LESSONS.includes(contentId) || FREE_STORIES.includes(contentId);
    }
    
    // Default - no access
    return false;
  };

  return (
    <SubscriptionContext.Provider
      value={{
        tier,
        trialStartDate,
        trialDaysRemaining,
        isTrialExpired,
        activateFreeTier,
        activateTrialTier,
        activateStandardTier,
        cancelSubscription,
        hasAccessToContent,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return context;
}