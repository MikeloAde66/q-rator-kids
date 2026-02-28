/**
 * LOADING STATES & SKELETONS - USAGE EXAMPLES
 * 
 * This file demonstrates how to use all the loading components in Q Rator Kids.
 * Copy these patterns into your pages for consistent, kid-friendly loading experiences!
 */

import { useState } from 'react';
import { LoadingSpinner, LoadingOverlay } from '../components/LoadingSpinner';
import { CharacterLoading, CharacterLoadingScreen, CharacterLoadingInline } from '../components/CharacterLoading';
import { Skeleton, SkeletonCard, SkeletonAvatar, SkeletonText, SkeletonButton, SkeletonImage } from '../components/ui/skeleton';
import { LoadingTransition, StaggerContainer, StaggerItem } from '../components/PageTransition';
import { useLoading, useAsyncWithLoading } from '../contexts/LoadingContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

// =========================
// EXAMPLE 1: Basic Spinners
// =========================
export function BasicSpinnerExamples() {
  return (
    <div className="space-y-8 p-8">
      <h2 className="text-3xl font-black">Loading Spinners</h2>
      
      {/* Default Spinner */}
      <Card className="p-8">
        <h3 className="text-xl font-bold mb-4">Default Spinner</h3>
        <LoadingSpinner size="md" variant="default" message="Loading..." />
      </Card>

      {/* Dots Variant */}
      <Card className="p-8">
        <h3 className="text-xl font-bold mb-4">Bouncing Dots</h3>
        <LoadingSpinner size="lg" variant="dots" message="Getting your lesson ready!" />
      </Card>

      {/* Bounce Variant (Emoji) */}
      <Card className="p-8">
        <h3 className="text-xl font-bold mb-4">Bouncing Art Tools</h3>
        <LoadingSpinner size="lg" variant="bounce" message="Preparing your art supplies!" />
      </Card>

      {/* Rainbow Variant */}
      <Card className="p-8">
        <h3 className="text-xl font-bold mb-4">Rainbow Pulse</h3>
        <LoadingSpinner size="xl" variant="rainbow" message="Loading colors..." />
      </Card>

      {/* Sparkle Variant */}
      <Card className="p-8">
        <h3 className="text-xl font-bold mb-4">Sparkle Effect</h3>
        <LoadingSpinner size="lg" variant="sparkle" message="Adding magic!" />
      </Card>
    </div>
  );
}

// ===============================
// EXAMPLE 2: Character Loading
// ===============================
export function CharacterLoadingExamples() {
  return (
    <div className="space-y-8 p-8">
      <h2 className="text-3xl font-black">Character Loading</h2>

      {/* Random Character */}
      <Card className="p-8">
        <h3 className="text-xl font-bold mb-4">Random Character</h3>
        <CharacterLoading message="Leo is getting your lesson ready!" />
      </Card>

      {/* Specific Character */}
      <Card className="p-8">
        <h3 className="text-xl font-bold mb-4">Specific Character (Leo)</h3>
        <CharacterLoading 
          characterId="leo"
          message="Leo is preparing something ROAR-some!" 
        />
      </Card>

      {/* With Custom Tips */}
      <Card className="p-8">
        <h3 className="text-xl font-bold mb-4">With Custom Tips</h3>
        <CharacterLoading 
          characterId="ellie"
          message="Ellie is mixing the perfect colors!"
          tips={[
            "Did you know? Ellie never forgets a color! 🐘",
            "Tip: Try mixing red and blue to make purple! 🎨",
            "Fun fact: Rainbows have 7 colors! 🌈"
          ]}
        />
      </Card>

      {/* Inline Version */}
      <Card className="p-8">
        <h3 className="text-xl font-bold mb-4">Inline (for components)</h3>
        <CharacterLoadingInline 
          characterId="milly"
          message="Milly is adding tiny details..."
        />
      </Card>
    </div>
  );
}

// ==========================
// EXAMPLE 3: Skeleton Screens
// ==========================
export function SkeletonExamples() {
  return (
    <div className="space-y-8 p-8">
      <h2 className="text-3xl font-black">Skeleton Screens</h2>

      {/* Basic Skeletons */}
      <Card className="p-8 space-y-4">
        <h3 className="text-xl font-bold mb-4">Basic Shapes</h3>
        <Skeleton className="h-4 w-3/4" variant="shimmer" />
        <Skeleton className="h-8 w-1/2" variant="pulse" />
        <Skeleton className="h-12 w-full" variant="shimmer" rounded="xl" />
      </Card>

      {/* Preset Components */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Preset Components</h3>
        
        {/* Card Skeleton */}
        <SkeletonCard />
        
        {/* Avatar */}
        <div className="flex gap-4 p-4">
          <SkeletonAvatar size="sm" />
          <SkeletonAvatar size="md" />
          <SkeletonAvatar size="lg" />
        </div>

        {/* Text */}
        <Card className="p-6">
          <SkeletonText lines={4} />
        </Card>

        {/* Image */}
        <SkeletonImage />

        {/* Button */}
        <SkeletonButton />
      </div>
    </div>
  );
}

// =====================================
// EXAMPLE 4: Page with Loading State
// =====================================
export function PageWithLoadingExample() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  // Simulate data fetch
  const loadData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setData({ title: 'My Lesson', content: 'Great content here!' });
    setIsLoading(false);
  };

  return (
    <LoadingTransition
      isLoading={isLoading}
      loadingComponent={<SkeletonCard />}
    >
      <Card className="p-8">
        <h2 className="text-2xl font-black mb-4">{data?.title}</h2>
        <p>{data?.content}</p>
        <Button onClick={loadData} className="mt-4">Reload</Button>
      </Card>
    </LoadingTransition>
  );
}

// ================================
// EXAMPLE 5: Global Loading Context
// ================================
export function GlobalLoadingExample() {
  const { showLoading, hideLoading } = useLoading();
  const { executeWithLoading } = useAsyncWithLoading();

  const handleManualLoading = () => {
    showLoading({
      message: "Loading your art adventure...",
      characterId: "leo",
      variant: "character"
    });

    setTimeout(() => {
      hideLoading();
    }, 3000);
  };

  const handleAsyncOperation = async () => {
    await executeWithLoading(
      async () => {
        // Your async operation here
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Operation complete!');
      },
      {
        message: "Benny is racing to get your lesson!",
        characterId: "benny",
        variant: "character",
        minDuration: 1000 // Minimum 1 second loading
      }
    );
  };

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-3xl font-black">Global Loading Context</h2>
      
      <Card className="p-8 space-y-4">
        <p className="text-lg font-semibold">
          Use the global loading context for full-screen loading overlays!
        </p>
        
        <Button onClick={handleManualLoading}>
          Show Manual Loading
        </Button>

        <Button onClick={handleAsyncOperation}>
          Execute Async with Loading
        </Button>
      </Card>
    </div>
  );
}

// ================================
// EXAMPLE 6: Staggered Animations
// ================================
export function StaggeredAnimationExample() {
  const items = ['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4'];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-black mb-6">Staggered Animations</h2>
      
      <StaggerContainer staggerDelay={0.1}>
        {items.map((item, i) => (
          <StaggerItem key={i}>
            <Card className="p-6 mb-4">
              <h3 className="text-xl font-bold">{item}</h3>
              <p className="text-gray-600">This card animates in sequence!</p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}

// =============================
// EXAMPLE 7: Full-Screen Loading
// =============================
export function FullScreenLoadingExample() {
  const [showFullScreen, setShowFullScreen] = useState(false);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-black mb-6">Full-Screen Loading</h2>
      
      <Button onClick={() => setShowFullScreen(true)}>
        Show Full-Screen Loading
      </Button>

      {showFullScreen && (
        <>
          {/* Character Loading Screen */}
          <CharacterLoadingScreen 
            message="Loading your masterpiece!"
            characterId="curator"
          />
          
          {/* Or Loading Overlay */}
          {/* <LoadingOverlay message="Please wait..." variant="bounce" /> */}
          
          {/* Auto-hide after 3 seconds */}
          {setTimeout(() => setShowFullScreen(false), 3000)}
        </>
      )}
    </div>
  );
}

/**
 * BEST PRACTICES FOR LOADING STATES:
 * 
 * 1. PAGE LOADING:
 *    - Use LoadingTransition with skeleton screens
 *    - Show skeleton layouts that match final content
 *    - Minimum loading time: 500ms for smooth UX
 * 
 * 2. BUTTON/ACTION LOADING:
 *    - Use inline spinners or disabled states
 *    - Keep buttons accessible with loading indicator
 * 
 * 3. FULL-SCREEN OPERATIONS:
 *    - Use CharacterLoadingScreen for big operations
 *    - Include fun tips to keep kids engaged
 *    - Match character to the operation (Leo for drawing, Ellie for colors)
 * 
 * 4. COMPONENT LOADING:
 *    - Use CharacterLoadingInline for cards/sections
 *    - Use small spinners for inline elements
 * 
 * 5. GLOBAL OPERATIONS:
 *    - Use LoadingContext for navigation/major changes
 *    - Use useAsyncWithLoading for async operations
 *    - Set minDuration to avoid flash of loading
 * 
 * 6. CHARACTER SELECTION:
 *    - Leo: Drawing/sketching lessons
 *    - Milly: Detail work/coloring
 *    - Ellie: Color mixing/theory
 *    - Benny: Quick actions/speed
 *    - Curator: General/museum/stories
 * 
 * 7. TIPS & MESSAGES:
 *    - Keep language simple (6-year-old level)
 *    - Use encouraging, positive tone
 *    - Include emojis for visual interest
 *    - Rotate tips every 3-4 seconds
 */
