import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export function CharacterBioSkeleton() {
  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-8">
      {/* Back Button */}
      <Skeleton className="h-12 w-32" rounded="xl" />

      {/* Hero Section */}
      <Card className="border-4 border-gray-200 rounded-3xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Character Emoji */}
          <Skeleton className="w-48 h-48" rounded="full" />

          {/* Character Info */}
          <div className="flex-1 text-center md:text-left space-y-4 w-full">
            <Skeleton className="h-16 w-3/4 mx-auto md:mx-0" rounded="xl" />
            <Skeleton className="h-8 w-1/2 mx-auto md:mx-0" rounded="lg" />
            
            {/* Personality Tags */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-8 w-24" rounded="full" />
              ))}
            </div>

            {/* Catchphrase */}
            <Skeleton className="h-16 w-full" rounded="xl" />
          </div>
        </div>
      </Card>

      {/* Quote */}
      <Card className="p-8 border-4 border-gray-200 rounded-3xl">
        <Skeleton className="h-6 w-full" rounded="md" />
        <Skeleton className="h-6 w-5/6 mt-2" rounded="md" />
        <Skeleton className="h-5 w-32 mt-3" rounded="md" />
      </Card>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6 border-4 border-gray-200 rounded-3xl space-y-3">
            <Skeleton className="h-6 w-24" rounded="md" />
            <Skeleton className="h-8 w-full" rounded="lg" />
            <Skeleton className="h-4 w-3/4" rounded="md" />
          </Card>
        ))}
      </div>

      {/* Backstory */}
      <Card className="p-8 border-4 border-gray-200 rounded-3xl space-y-4">
        <Skeleton className="h-8 w-48" rounded="lg" />
        <Skeleton className="h-5 w-full" rounded="md" />
        <Skeleton className="h-5 w-full" rounded="md" />
        <Skeleton className="h-5 w-4/5" rounded="md" />
      </Card>

      {/* Teaching Style */}
      <Card className="p-8 border-4 border-gray-200 rounded-3xl space-y-4">
        <Skeleton className="h-8 w-56" rounded="lg" />
        <Skeleton className="h-5 w-full" rounded="md" />
        <Skeleton className="h-5 w-full" rounded="md" />
        <Skeleton className="h-16 w-full mt-4" rounded="xl" />
      </Card>

      {/* Fun Facts */}
      <Card className="p-8 border-4 border-gray-200 rounded-3xl space-y-4">
        <Skeleton className="h-8 w-40" rounded="lg" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-start gap-3 p-4">
            <Skeleton className="w-8 h-8" rounded="md" />
            <Skeleton className="h-5 w-full" rounded="md" />
          </div>
        ))}
      </Card>

      {/* Likes & Dislikes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <Card key={i} className="p-8 border-4 border-gray-200 rounded-3xl space-y-4">
            <Skeleton className="h-8 w-32" rounded="lg" />
            {[1, 2, 3].map((j) => (
              <div key={j} className="flex items-center gap-2">
                <Skeleton className="w-6 h-6" rounded="md" />
                <Skeleton className="h-5 w-full" rounded="md" />
              </div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
}
