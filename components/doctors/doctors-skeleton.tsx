import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function DoctorsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar Skeleton */}
        <aside className="hidden lg:block w-80 shrink-0">
          <Card className="p-6">
            <Skeleton className="h-6 w-24 mb-6" />
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </Card>
        </aside>

        {/* Main Content Skeleton */}
        <div className="flex-1">
          <Card className="p-4 mb-6">
            <Skeleton className="h-10 w-full" />
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-6">
                <div className="flex gap-4 mb-4">
                  <Skeleton className="w-20 h-20 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
