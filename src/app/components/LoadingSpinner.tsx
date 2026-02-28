import { motion } from 'motion/react';
import { Loader2, Sparkles } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'dots' | 'bounce' | 'rainbow' | 'sparkle';
  message?: string;
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'default',
  message,
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-6 h-6',
  };

  if (variant === 'dots') {
    return (
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`${dotSizes[size]} rounded-full bg-gradient-to-r from-purple-500 to-pink-500`}
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
        {message && (
          <p className="text-lg font-bold text-gray-700 text-center">{message}</p>
        )}
      </div>
    );
  }

  if (variant === 'bounce') {
    const emojis = ['🎨', '✏️', '🖍️'];
    return (
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        <div className="flex gap-3">
          {emojis.map((emoji, i) => (
            <motion.div
              key={i}
              className={`${size === 'sm' ? 'text-3xl' : size === 'md' ? 'text-5xl' : size === 'lg' ? 'text-7xl' : 'text-9xl'}`}
              animate={{
                y: [0, -20, 0],
                rotate: [-10, 10, -10],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>
        {message && (
          <p className="text-lg font-bold text-gray-700 text-center">{message}</p>
        )}
      </div>
    );
  }

  if (variant === 'rainbow') {
    const colors = [
      'from-red-500 to-orange-500',
      'from-orange-500 to-yellow-500',
      'from-yellow-500 to-green-500',
      'from-green-500 to-blue-500',
      'from-blue-500 to-purple-500',
      'from-purple-500 to-pink-500',
    ];

    return (
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        <div className="relative">
          {colors.map((color, i) => (
            <motion.div
              key={i}
              className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-gradient-to-r ${color}`}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
          <div className={sizeClasses[size]} />
        </div>
        {message && (
          <p className="text-lg font-bold text-gray-700 text-center mt-8">{message}</p>
        )}
      </div>
    );
  }

  if (variant === 'sparkle') {
    return (
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        <div className="relative">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Sparkles className={`${sizeClasses[size]} text-yellow-500`} />
          </motion.div>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 text-2xl"
              animate={{
                x: [0, Math.cos(i * 60 * Math.PI / 180) * 40],
                y: [0, Math.sin(i * 60 * Math.PI / 180) * 40],
                opacity: [1, 0],
                scale: [0, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
        {message && (
          <p className="text-lg font-bold text-gray-700 text-center">{message}</p>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className={`${sizeClasses[size]} text-purple-500`} />
      </motion.div>
      {message && (
        <p className="text-lg font-bold text-gray-700 text-center">{message}</p>
      )}
    </div>
  );
}

// Full-screen loading overlay
export function LoadingOverlay({ 
  message = "Loading...",
  variant = 'bounce'
}: { 
  message?: string;
  variant?: 'default' | 'dots' | 'bounce' | 'rainbow' | 'sparkle';
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 flex items-center justify-center z-50"
    >
      <LoadingSpinner size="xl" variant={variant} message={message} />
    </motion.div>
  );
}
