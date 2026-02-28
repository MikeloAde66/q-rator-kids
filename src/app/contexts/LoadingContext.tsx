import { createContext, useContext, useState, ReactNode } from 'react';
import { CharacterLoadingScreen } from '../components/CharacterLoading';
import { LoadingOverlay } from '../components/LoadingSpinner';
import { AnimatePresence } from 'motion/react';

interface LoadingState {
  isLoading: boolean;
  message?: string;
  characterId?: string;
  variant?: 'character' | 'spinner';
}

interface LoadingContextType {
  showLoading: (options?: {
    message?: string;
    characterId?: string;
    variant?: 'character' | 'spinner';
  }) => void;
  hideLoading: () => void;
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    variant: 'character',
  });

  const showLoading = (options?: {
    message?: string;
    characterId?: string;
    variant?: 'character' | 'spinner';
  }) => {
    setLoadingState({
      isLoading: true,
      message: options?.message || 'Loading your art adventure...',
      characterId: options?.characterId,
      variant: options?.variant || 'character',
    });
  };

  const hideLoading = () => {
    setLoadingState((prev) => ({ ...prev, isLoading: false }));
  };

  return (
    <LoadingContext.Provider
      value={{
        showLoading,
        hideLoading,
        isLoading: loadingState.isLoading,
      }}
    >
      {children}
      
      {/* Global Loading Overlay */}
      <AnimatePresence>
        {loadingState.isLoading && (
          <>
            {loadingState.variant === 'character' ? (
              <CharacterLoadingScreen
                message={loadingState.message}
                characterId={loadingState.characterId}
              />
            ) : (
              <LoadingOverlay message={loadingState.message} variant="bounce" />
            )}
          </>
        )}
      </AnimatePresence>
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

// Hook for simulating async operations with loading states
export function useAsyncWithLoading() {
  const { showLoading, hideLoading } = useLoading();

  const executeWithLoading = async <T,>(
    asyncFunction: () => Promise<T>,
    options?: {
      message?: string;
      characterId?: string;
      variant?: 'character' | 'spinner';
      minDuration?: number; // Minimum loading duration in ms
    }
  ): Promise<T> => {
    const startTime = Date.now();
    const minDuration = options?.minDuration || 500;

    showLoading({
      message: options?.message,
      characterId: options?.characterId,
      variant: options?.variant,
    });

    try {
      const result = await asyncFunction();
      
      // Ensure minimum loading duration for better UX
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < minDuration) {
        await new Promise(resolve => setTimeout(resolve, minDuration - elapsedTime));
      }

      return result;
    } finally {
      hideLoading();
    }
  };

  return { executeWithLoading };
}
