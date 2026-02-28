import { motion } from 'motion/react';
import { cn } from './utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'shimmer' | 'pulse';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Skeleton({ 
  className, 
  variant = 'shimmer',
  rounded = 'md' 
}: SkeletonProps) {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  if (variant === 'pulse') {
    return (
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "bg-gradient-to-r from-purple-200 to-pink-200",
          roundedClasses[rounded],
          className
        )}
      />
    );
  }

  if (variant === 'shimmer') {
    return (
      <div className={cn("relative overflow-hidden bg-gray-200", roundedClasses[rounded], className)}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  return (
    <div className={cn("bg-gray-200", roundedClasses[rounded], className)} />
  );
}

// Preset skeleton components for common use cases
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("p-6 border-4 border-gray-200 rounded-3xl space-y-4", className)}>
      <Skeleton className="h-8 w-3/4" rounded="lg" />
      <Skeleton className="h-4 w-full" rounded="md" />
      <Skeleton className="h-4 w-5/6" rounded="md" />
      <Skeleton className="h-40 w-full" rounded="xl" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-24" rounded="xl" />
        <Skeleton className="h-10 w-24" rounded="xl" />
      </div>
    </div>
  );
}

export function SkeletonAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <Skeleton className={sizeClasses[size]} rounded="full" />
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 ? "w-3/4" : "w-full"
          )}
          rounded="md"
        />
      ))}
    </div>
  );
}

export function SkeletonButton({ className }: { className?: string }) {
  return <Skeleton className={cn("h-12 w-32", className)} rounded="xl" />;
}

export function SkeletonImage({ className }: { className?: string }) {
  return <Skeleton className={cn("w-full h-64", className)} rounded="xl" />;
}