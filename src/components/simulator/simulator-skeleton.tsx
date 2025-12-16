import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SimulatorSkeleton() {
  return (
    <div className="flex gap-10">
      <div className="flex-1 flex flex-col gap-8">
        <Card className="p-6">
          <Skeleton className="h-7 w-56 mb-6" />

          <div className="grid grid-cols-3 gap-6 mb-10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-6 rounded-2xl border border-border">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-9 w-28 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>

          <div className="space-y-8">
            <div>
              <Skeleton className="h-4 w-48 mb-2" />
              <Skeleton className="h-2 w-full mb-1" />
              <div className="flex justify-between">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>

            <div>
              <Skeleton className="h-4 w-40 mb-2" />
              <Skeleton className="h-2 w-full mb-1" />
              <div className="flex justify-between">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Skeleton className="h-5 w-48 mb-4" />
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="w-[380px] flex flex-col gap-8">
        <Card className="p-6">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="flex flex-wrap gap-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-7 w-24 rounded-full" />
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <Skeleton className="h-6 w-32 mb-5" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
