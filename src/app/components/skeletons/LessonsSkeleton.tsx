import { Card } from '../ui/card';
import { Skeleton, SkeletonCard } from '../ui/skeleton';

export function LessonsSkeleton() {
  return (
    <div className="space-y-8 pb-20">
      {/* Header Skeleton */}
      <div className="text-center space-y-4">
        <Skeleton className="h-16 w-3/4 mx-auto" rounded="xl" />
        <Skeleton className="h-6 w-1/2 mx-auto" rounded="lg" />
      </div>

      {/* Difficulty Tabs Skeleton */}
      <div className="flex justify-center gap-4">
        <Skeleton className="h-14 w-48" rounded="xl" />
        <Skeleton className="h-14 w-48" rounded="xl" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6 border-4 border-gray-200 rounded-3xl">
            <div className="flex items-center gap-4">
              <Skeleton className="w-16 h-16" rounded="full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-8 w-16" rounded="md" />
                <Skeleton className="h-4 w-24" rounded="md" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Lesson Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden border-4 border-gray-200 rounded-3xl">
            <div className="relative">
              {/* Thumbnail */}
              <Skeleton className="w-full h-48" rounded="none" />
              
              {/* Lock Badge */}
              <div className="absolute top-4 right-4">
                <Skeleton className="w-12 h-12" rounded="full" />
              </div>

              {/* Character Badge */}
              <div className="absolute bottom-4 left-4">
                <Skeleton className="w-16 h-16" rounded="full" />
              </div>
            </div>

            <div className="p-6 space-y-3">
              <Skeleton className="h-7 w-3/4" rounded="lg" />
              <Skeleton className="h-4 w-full" rounded="md" />
              <Skeleton className="h-4 w-5/6" rounded="md" />
              
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-5 h-5" rounded="md" />
                  <Skeleton className="h-4 w-16" rounded="md" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="w-5 h-5" rounded="md" />
                  <Skeleton className="h-4 w-20" rounded="md" />
                </div>
              </div>

              <Skeleton className="h-12 w-full" rounded="xl" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
