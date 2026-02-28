import { useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { useTutorial, TOURS } from '../contexts/TutorialContext';
import { TutorialTooltip, TutorialHighlight, TutorialBackdrop } from './TutorialTooltip';

export function GuidedTour() {
  const {
    activeTour,
    currentStepIndex,
    nextStep,
    prevStep,
    skipTour,
    getCurrentStep,
  } = useTutorial();

  const currentStep = getCurrentStep();
  const tour = activeTour ? TOURS[activeTour] : null;

  useEffect(() => {
    // Scroll target element into view
    if (currentStep && currentStep.target !== 'body') {
      const element = document.querySelector(currentStep.target);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [currentStep]);

  if (!activeTour || !tour || !currentStep) {
    return null;
  }

  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === tour.steps.length - 1;

  return (
    <AnimatePresence>
      <TutorialBackdrop onClick={skipTour} />
      
      <TutorialHighlight 
        target={currentStep.target} 
        pulse={currentStep.highlightPulse}
      />
      
      <TutorialTooltip
        step={currentStep}
        onNext={nextStep}
        onPrev={!isFirst ? prevStep : undefined}
        onSkip={skipTour}
        isFirst={isFirst}
        isLast={isLast}
        stepNumber={currentStepIndex + 1}
        totalSteps={tour.steps.length}
      />
    </AnimatePresence>
  );
}
