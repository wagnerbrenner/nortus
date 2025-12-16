import { Skeleton } from "@/components/ui/skeleton";

export function ChatSkeleton() {
  return (
    <div className="w-full h-[calc(100vh-10rem)] flex flex-col items-center overflow-hidden">
      <div className="w-3/4 bg-secondary/40 dark:bg-secondary/30 border border-border rounded-2xl p-10 flex-1 flex flex-col shadow-xl overflow-hidden">
        <div className="flex items-center justify-center mb-6 pb-4 border-b border-border/40 dark:border-border/30">
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="flex-1 space-y-4 overflow-hidden">
          <div className="flex justify-start">
            <Skeleton className="h-24 w-[60%] rounded-xl" />
          </div>
          <div className="flex justify-end">
            <Skeleton className="h-20 w-[60%] rounded-xl" />
          </div>
          <div className="flex justify-start">
            <Skeleton className="h-28 w-[60%] rounded-xl" />
          </div>
          <div className="flex justify-end">
            <Skeleton className="h-32 w-[75%] rounded-2xl" />
          </div>
        </div>
      </div>

      <div className="w-1/2 mt-6">
        <Skeleton className="h-12 w-full rounded-full" />
      </div>
    </div>
  );
}
