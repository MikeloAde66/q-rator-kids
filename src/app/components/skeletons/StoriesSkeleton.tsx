import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export function StoriesSkeleton() {
  return (
    <div className="space-y-8 pb-20">
      {/* Header Skeleton */}
      <div className="text-center space-y-4">
        <Skeleton className="h-16 w-3/4 mx-auto" rounded="xl" />
        <Skeleton className="h-6 w-1/2 mx-auto" rounded="lg" />
      </div>

      {/* Stats Skeleton */}
      <Card className="p-6 border-4 border-gray-200 rounded-3xl">
        <div className="flex flex-wrap items-center justify-center gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center space-y-2">
              <Skeleton className="h-10 w-20 mx-auto" rounded="md" />
              <Skeleton className="h-4 w-32" rounded="md" />
            </div>
          ))}
        </div>
      </Card>

      {/* Story Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden border-4 border-gray-200 rounded-3xl">
            <div className="relative">
              {/* Thumbnail */}
              <Skeleton className="w-full h-56" rounded="none" />
              
              {/* Lock Badge */}
              <div className="absolute top-4 right-4">
                <Skeleton className="w-12 h-12" rounded="full" />
              </div>

              {/* Duration Badge */}
              <div className="absolute bottom-4 left-4">
                <Skeleton className="h-8 w-24" rounded="full" />
              </div>
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32" rounded="lg" />
                <Skeleton className="h-5 w-20" rounded="full" />
              </div>
              
              <Skeleton className="h-7 w-full" rounded="lg" />
              <Skeleton className="h-4 w-full" rounded="md" />
              <Skeleton className="h-4 w-4/5" rounded="md" />

              <Skeleton className="h-12 w-full mt-4" rounded="xl" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
