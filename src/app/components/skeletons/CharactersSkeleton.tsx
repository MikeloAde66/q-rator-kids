import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export function CharactersSkeleton() {
  return (
    <div className="space-y-8 pb-20">
      {/* Header Skeleton */}
      <div className="text-center space-y-4">
        <Skeleton className="h-20 w-20 mx-auto" rounded="full" />
        <Skeleton className="h-16 w-3/4 mx-auto" rounded="xl" />
        <Skeleton className="h-6 w-1/2 mx-auto" rounded="lg" />
      </div>

      {/* Stats Skeleton */}
      <Card className="p-6 border-4 border-gray-200 rounded-3xl">
        <div className="flex flex-wrap items-center justify-center gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center space-y-2">
              <Skeleton className="h-10 w-16 mx-auto" rounded="md" />
              <Skeleton className="h-4 w-24" rounded="md" />
            </div>
          ))}
        </div>
      </Card>

      {/* Character Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="border-4 border-gray-200 rounded-3xl p-6">
            {/* Favorite Button */}
            <div className="flex justify-end mb-4">
              <Skeleton className="w-10 h-10" rounded="full" />
            </div>

            {/* Character Emoji */}
            <Skeleton className="w-32 h-32 mx-auto mb-4" rounded="full" />

            {/* Character Info */}
            <div className="text-center space-y-3">
              <Skeleton className="h-8 w-3/4 mx-auto" rounded="lg" />
              <Skeleton className="h-5 w-1/2 mx-auto" rounded="md" />

              {/* Personality Tags */}
              <div className="flex flex-wrap gap-2 justify-center">
                {[1, 2, 3].map((j) => (
                  <Skeleton key={j} className="h-6 w-20" rounded="full" />
                ))}
              </div>

              {/* Catchphrase */}
              <div className="mt-4">
                <Skeleton className="h-20 w-full" rounded="xl" />
              </div>

              {/* Button */}
              <Skeleton className="h-12 w-full mt-4" rounded="xl" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
