import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-6">
          <Card className="p-6 bg-sidebar border border-sidebar-border rounded-2xl">
            <Skeleton className="h-6 w-48 mb-6" />
            <div className="flex gap-2 mb-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-9 flex-1 rounded-lg" />
              ))}
            </div>
            <Skeleton className="h-64 w-full rounded-lg" />
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card className="p-6 bg-sidebar border border-sidebar-border rounded-2xl">
            <Skeleton className="h-6 w-40 mb-6" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </Card>
        </div>
      </div>

      <Card className="p-6 bg-sidebar border border-sidebar-border rounded-2xl">
        <Skeleton className="h-6 w-56 mb-4" />
        <div className="space-y-4">
          <div className="flex gap-4">
            <Skeleton className="h-10 flex-1 rounded-lg" />
            <Skeleton className="h-10 w-48 rounded-lg" />
            <Skeleton className="h-10 w-48 rounded-lg" />
          </div>
          <Skeleton className="w-full h-[500px] rounded-xl" />
        </div>
      </Card>

      <Card className="p-6 bg-sidebar border border-sidebar-border rounded-2xl">
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      </Card>
    </div>
  );
}
