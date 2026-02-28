import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Character } from '../data/characters';

interface CharacterInteractionProps {
  character: Character;
  size?: 'sm' | 'md' | 'lg';
  showMessage?: boolean;
}

const messages: Record<string, string[]> = {
  'leo-lion': [
    "Let's create something ROAR-some! 🦁",
    "Be brave with your art!",
    "Every great artist starts somewhere!",
    "Don't be afraid to try new things!",
  ],
  'milly-monkey': [
    "Let's monkey around with colors! 🐵",
    "Mixing colors is like magic!",
    "Let's create something colorful!",
    "Colors make everything fun!",
  ],
  'ellie-elephant': [
    "An elephant never forgets! 🐘",
    "Let's remember all these patterns!",
    "I never forget a shape!",
    "Every pattern tells a story!",
  ],
  'benny-bunny': [
    "Quick like a bunny! 🐰",
    "Let's draw some shapes!",
    "Shapes can be fast AND fun!",
    "Hop to it, artist!",
  ],
  'the-curator': [
    "Welcome, young curator! 🎨",
    "Every masterpiece starts with imagination!",
    "Your artistic journey begins here!",
    "Discover the magic of art!",
  ],
};

export function CharacterInteraction({ 
  character, 
  size = 'md',
  showMessage = true 
}: CharacterInteractionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const handleClick = () => {
    if (showMessage && messages[character.id]) {
      setShowSpeechBubble(true);
      setCurrentMessage((prev) => (prev + 1) % messages[character.id].length);
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        setShowSpeechBubble(false);
      }, 3000);
    }
  };

  return (
    <div className="relative inline-block">
      {/* Speech Bubble */}
      <AnimatePresence>
        {showSpeechBubble && showMessage && messages[character.id] && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className={`
              absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-10
              max-w-xs
            `}
          >
            <div className={`
              bg-white rounded-2xl px-6 py-4 border-4 shadow-xl
              border-${character.borderColor}
              relative
            `}>
              <p className="text-lg font-black text-gray-800 text-center">
                {messages[character.id][currentMessage]}
              </p>
              {/* Speech bubble pointer */}
              <div
                className={`
                  absolute top-full left-1/2 -translate-x-1/2 -mt-1
                  w-0 h-0 
                  border-l-[12px] border-l-transparent
                  border-r-[12px] border-r-transparent
                  border-t-[12px]
                  border-t-${character.borderColor}
                `}
              />
              <div
                className={`
                  absolute top-full left-1/2 -translate-x-1/2 -mt-2
                  w-0 h-0 
                  border-l-[10px] border-l-transparent
                  border-r-[10px] border-r-transparent
                  border-t-[10px] border-t-white
                `}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character Image (not emoji!) */}
      <motion.div
        className={`${sizeClasses[size]} cursor-pointer select-none`}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        animate={{
          y: isHovered ? [-5, 5, -5] : 0,
          rotate: isHovered ? [-10, 10, -10] : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{
          duration: 0.5,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut",
        }}
        whileTap={{ scale: 0.9 }}
      >
        <img 
          src={character.image} 
          alt={character.name}
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Sparkle effect on hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                initial={{ 
                  opacity: 1, 
                  scale: 0,
                  x: 0,
                  y: 0,
                }}
                animate={{
                  opacity: 0,
                  scale: 1.5,
                  x: [0, (Math.random() - 0.5) * 100],
                  y: [0, (Math.random() - 0.5) * 100],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                style={{
                  left: '50%',
                  top: '50%',
                }}
              >
                ✨
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Click hint */}
      {showMessage && !showSpeechBubble && (
        <motion.div
          className={`
            absolute -bottom-2 left-1/2 -translate-x-1/2 
            bg-purple-500 text-white 
            text-xs font-bold px-3 py-1 rounded-full
            opacity-0 group-hover:opacity-100
            transition-opacity
          `}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          Click me!
        </motion.div>
      )}
    </div>
  );
}
