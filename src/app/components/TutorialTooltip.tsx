import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useTutorial, TutorialStep } from '../contexts/TutorialContext';

interface TutorialTooltipProps {
  step: TutorialStep;
  onNext?: () => void;
  onPrev?: () => void;
  onSkip?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  stepNumber?: number;
  totalSteps?: number;
}

export function TutorialTooltip({
  step,
  onNext,
  onPrev,
  onSkip,
  isFirst = false,
  isLast = false,
  stepNumber = 1,
  totalSteps = 1,
}: TutorialTooltipProps) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (step.target === 'body') {
        // Center on screen
        setPosition({
          top: window.innerHeight / 2,
          left: window.innerWidth / 2,
        });
        return;
      }

      const targetElement = document.querySelector(step.target);
      if (!targetElement) {
        console.warn(`Tutorial target not found: ${step.target}`);
        return;
      }

      const rect = targetElement.getBoundingClientRect();
      const tooltipRect = tooltipRef.current?.getBoundingClientRect();
      
      if (!tooltipRect) return;

      let top = 0;
      let left = 0;
      let arrow: 'top' | 'bottom' | 'left' | 'right' = 'top';

      switch (step.position || 'bottom') {
        case 'top':
          top = rect.top - tooltipRect.height - 20;
          left = rect.left + rect.width / 2;
          arrow = 'bottom';
          break;
        case 'bottom':
          top = rect.bottom + 20;
          left = rect.left + rect.width / 2;
          arrow = 'top';
          break;
        case 'left':
          top = rect.top + rect.height / 2;
          left = rect.left - tooltipRect.width - 20;
          arrow = 'right';
          break;
        case 'right':
          top = rect.top + rect.height / 2;
          left = rect.right + 20;
          arrow = 'left';
          break;
      }

      // Ensure tooltip stays within viewport
      if (left < 10) left = 10;
      if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
      }
      if (top < 10) top = 10;
      if (top + tooltipRect.height > window.innerHeight - 10) {
        top = window.innerHeight - tooltipRect.height - 10;
      }

      setPosition({ top, left });
      setArrowPosition(arrow);
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [step]);

  const getArrowStyles = () => {
    const baseStyles = 'absolute w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rotate-45';
    
    switch (arrowPosition) {
      case 'top':
        return `${baseStyles} -top-2 left-1/2 -translate-x-1/2`;
      case 'bottom':
        return `${baseStyles} -bottom-2 left-1/2 -translate-x-1/2`;
      case 'left':
        return `${baseStyles} -left-2 top-1/2 -translate-y-1/2`;
      case 'right':
        return `${baseStyles} -right-2 top-1/2 -translate-y-1/2`;
    }
  };

  const isCentered = step.target === 'body';

  return (
    <motion.div
      ref={tooltipRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      style={
        isCentered
          ? {
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10001,
            }
          : {
              position: 'fixed',
              top: position.top,
              left: position.left,
              transform: step.position === 'bottom' || step.position === 'top' ? 'translateX(-50%)' : 'translateY(-50%)',
              zIndex: 10001,
            }
      }
      className="max-w-sm"
    >
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-1 rounded-2xl shadow-2xl">
        <div className="bg-white rounded-xl p-6 relative">
          {/* Arrow */}
          {!isCentered && <div className={getArrowStyles()} />}

          {/* Close Button */}
          {onSkip && (
            <button
              onClick={onSkip}
              className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Skip tutorial"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i < stepNumber ? 'w-8 bg-purple-500' : 'w-4 bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 font-bold">
              {stepNumber}/{totalSteps}
            </span>
          </div>

          {/* Emoji */}
          {step.emoji && (
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              className="text-5xl mb-3 text-center"
            >
              {step.emoji}
            </motion.div>
          )}

          {/* Title */}
          <h3 className="text-2xl font-black text-gray-800 mb-2 text-center">
            {step.title}
          </h3>

          {/* Content */}
          <p className="text-lg text-gray-700 mb-4 text-center leading-relaxed">
            {step.content}
          </p>

          {/* Actions */}
          <div className="flex gap-2 justify-center">
            {!isFirst && onPrev && (
              <Button
                onClick={onPrev}
                variant="outline"
                className="border-2 border-purple-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            
            {onNext && (
              <Button
                onClick={onNext}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black"
              >
                {step.action || (isLast ? 'Finish!' : 'Next!')}
                {!isLast && <ArrowRight className="w-4 h-4 ml-2" />}
                {isLast && <Sparkles className="w-4 h-4 ml-2" />}
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Highlight overlay for targeted elements
export function TutorialHighlight({ target, pulse = false }: { target: string; pulse?: boolean }) {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

  useEffect(() => {
    const updatePosition = () => {
      if (target === 'body') return;

      const targetElement = document.querySelector(target);
      if (!targetElement) return;

      const rect = targetElement.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [target]);

  if (target === 'body') return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: position.top - 8,
        left: position.left - 8,
        width: position.width + 16,
        height: position.height + 16,
        zIndex: 10000,
        pointerEvents: 'none',
      }}
      className={`rounded-xl border-4 border-yellow-400 ${pulse ? 'animate-pulse' : ''}`}
    >
      <div className="absolute inset-0 bg-yellow-400/20 rounded-xl" />
    </motion.div>
  );
}

// Backdrop overlay
export function TutorialBackdrop({ onClick }: { onClick?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
    />
  );
}
