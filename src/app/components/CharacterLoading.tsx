import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { getAllCharacters, Character } from '../data/characters';

interface CharacterLoadingProps {
  message?: string;
  characterId?: string; // Specific character to show, or random if not provided
  tips?: string[]; // Optional loading tips to show
  size?: 'sm' | 'md' | 'lg';
}

const defaultTips = [
  "Did you know? Every great artist started as a beginner! 🎨",
  "Tip: Practice makes progress, not perfect! ✨",
  "Fun fact: There are NO mistakes in art, only happy accidents! 🌈",
  "Remember: Your art is unique, just like YOU! 💖",
  "Pro tip: Take breaks and come back with fresh eyes! 👀",
  "Did you know? Colors can make you feel different emotions! 🎨",
  "Tip: Start with simple shapes, then add details! 🔷",
  "Fun fact: Every artist has their own special style! ⭐",
];

export function CharacterLoading({
  message = "Loading your art adventure...",
  characterId,
  tips = defaultTips,
  size = 'lg'
}: CharacterLoadingProps) {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    // Select character
    const characters = getAllCharacters();
    if (characterId) {
      const selectedChar = characters.find(c => c.id === characterId);
      setCharacter(selectedChar || characters[0]);
    } else {
      // Random character
      const randomChar = characters[Math.floor(Math.random() * characters.length)];
      setCharacter(randomChar);
    }

    // Rotate tips every 3 seconds
    const tipInterval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }, 3000);

    return () => clearInterval(tipInterval);
  }, [characterId, tips.length]);

  if (!character) return null;

  const sizeClasses = {
    sm: 'text-6xl',
    md: 'text-9xl',
    lg: 'text-[12rem]',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      {/* Animated Character */}
      <motion.div
        className={`${sizeClasses[size]} mb-8`}
        animate={{
          y: [0, -30, 0],
          rotate: [-5, 5, -5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {character.emoji}
      </motion.div>

      {/* Character Speech Bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative mb-8 max-w-md mx-auto bg-white rounded-3xl px-8 py-6 border-4 shadow-2xl border-purple-300"
      >
        <p className="text-2xl font-black text-gray-800 text-center">
          {message}
        </p>
        {/* Speech bubble pointer */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[16px] border-b-purple-300" />
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-white" />
      </motion.div>

      {/* Loading Progress Dots */}
      <div className="flex gap-2 mb-8">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Rotating Tips */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTipIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl px-6 py-4 border-2 border-purple-300"
        >
          <p className="text-lg font-bold text-gray-700">
            {tips[currentTipIndex]}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Paint brush animation */}
      <div className="mt-8 flex gap-3">
        {['🖌️', '🎨', '✏️'].map((emoji, i) => (
          <motion.div
            key={i}
            className="text-4xl"
            animate={{
              rotate: [0, 360],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Full-screen character loading
export function CharacterLoadingScreen({
  message = "Loading your art adventure...",
  characterId,
  tips,
}: Omit<CharacterLoadingProps, 'size'>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 flex items-center justify-center z-50"
    >
      <CharacterLoading 
        message={message}
        characterId={characterId}
        tips={tips}
        size="lg"
      />
    </motion.div>
  );
}

// Inline smaller loading for components
export function CharacterLoadingInline({
  message = "Loading...",
  characterId,
}: Omit<CharacterLoadingProps, 'size' | 'tips'>) {
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const characters = getAllCharacters();
    if (characterId) {
      const selectedChar = characters.find(c => c.id === characterId);
      setCharacter(selectedChar || characters[0]);
    } else {
      const randomChar = characters[Math.floor(Math.random() * characters.length)];
      setCharacter(randomChar);
    }
  }, [characterId]);

  if (!character) return null;

  return (
    <div className="flex items-center gap-4 p-6">
      <motion.div
        className="text-6xl"
        animate={{
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      >
        {character.emoji}
      </motion.div>
      <div>
        <p className="text-xl font-black text-gray-800">{message}</p>
        <div className="flex gap-1 mt-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-purple-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}