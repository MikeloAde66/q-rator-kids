import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, X } from 'lucide-react';
import { useTutorial } from '../contexts/TutorialContext';

interface HelpBubbleProps {
  id: string;
  title: string;
  content: string;
  emoji?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  autoShow?: boolean; // Show automatically first time
  alwaysShow?: boolean; // Always show, even if dismissed before
}

export function HelpBubble({
  id,
  title,
  content,
  emoji = '💡',
  position = 'top',
  autoShow = false,
  alwaysShow = false,
}: HelpBubbleProps) {
  const { shouldShowTooltip, dismissTooltip } = useTutorial();
  const [isOpen, setIsOpen] = useState(autoShow && (alwaysShow || shouldShowTooltip(id)));

  const handleClose = () => {
    setIsOpen(false);
    if (!alwaysShow) {
      dismissTooltip(id);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full mb-2 left-1/2 -translate-x-1/2';
      case 'bottom':
        return 'top-full mt-2 left-1/2 -translate-x-1/2';
      case 'left':
        return 'right-full mr-2 top-1/2 -translate-y-1/2';
      case 'right':
        return 'left-full ml-2 top-1/2 -translate-y-1/2';
    }
  };

  const getArrowClasses = () => {
    const base = 'absolute w-3 h-3 bg-gradient-to-br from-blue-500 to-cyan-500 rotate-45';
    switch (position) {
      case 'top':
        return `${base} -bottom-1.5 left-1/2 -translate-x-1/2`;
      case 'bottom':
        return `${base} -top-1.5 left-1/2 -translate-x-1/2`;
      case 'left':
        return `${base} -right-1.5 top-1/2 -translate-y-1/2`;
      case 'right':
        return `${base} -left-1.5 top-1/2 -translate-y-1/2`;
    }
  };

  return (
    <div className="relative inline-block">
      {/* Help Icon Button */}
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative group"
        aria-label="Help"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
          <HelpCircle className="w-5 h-5 text-white" />
        </div>
        
        {/* Pulsing indicator for new tooltips */}
        {autoShow && (alwaysShow || shouldShowTooltip(id)) && !isOpen && (
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          />
        )}
      </motion.button>

      {/* Help Bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`absolute ${getPositionClasses()} z-50`}
          >
            <div className="relative">
              {/* Arrow */}
              <div className={getArrowClasses()} />
              
              {/* Bubble Content */}
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-0.5 rounded-2xl shadow-2xl">
                <div className="bg-white rounded-2xl p-4 min-w-[200px] max-w-[300px]">
                  {/* Close Button */}
                  <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close help"
                  >
                    <X className="w-3 h-3 text-gray-500" />
                  </button>

                  {/* Emoji */}
                  {emoji && (
                    <motion.div
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="text-3xl mb-2"
                    >
                      {emoji}
                    </motion.div>
                  )}

                  {/* Title */}
                  <h4 className="text-lg font-black text-gray-800 mb-2 pr-6">
                    {title}
                  </h4>

                  {/* Content */}
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {content}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Simpler inline help text (no button, just shows up)
export function InlineHelp({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-3 flex items-start gap-3 ${className}`}
    >
      <div className="text-2xl shrink-0">💡</div>
      <p className="text-sm text-gray-700 leading-relaxed">
        {children}
      </p>
    </motion.div>
  );
}
