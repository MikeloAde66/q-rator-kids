import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useOnboarding } from '../contexts/OnboardingContext';

export function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const { hasCompletedOnboarding } = useOnboarding();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If user hasn't completed onboarding and isn't already on onboarding page
    if (!hasCompletedOnboarding && location.pathname !== '/onboarding') {
      navigate('/onboarding', { replace: true });
    }
  }, [hasCompletedOnboarding, location.pathname, navigate]);

  // Show children if onboarding is complete or user is on onboarding page
  if (!hasCompletedOnboarding && location.pathname !== '/onboarding') {
    return null; // Don't render anything while redirecting
  }

  return <>{children}</>;
}
