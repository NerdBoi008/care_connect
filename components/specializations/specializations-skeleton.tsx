import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SpecializationsSkeleton() {
  return (
    <section className="container mx-auto px-4 py-12">
      {/* Search Bar Skeleton */}
      <Card className="p-4 mb-8">
        <div className="flex gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-32" />
        </div>
      </Card>

      {/* Stats Skeleton */}
      <Skeleton className="h-6 w-48 mb-8" />

      {/* Grid Skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <Skeleton className="w-16 h-16 rounded-xl" />
              <Skeleton className="h-6 w-12" />
            </div>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            <div className="space-y-2 mb-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="h-9 w-full" />
          </Card>
        ))}
      </div>
    </section>
  );
}
