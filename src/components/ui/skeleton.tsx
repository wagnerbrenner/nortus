import { cn } from "@/components/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-secondary/50 dark:bg-secondary/30", className)}
      {...props}
    />
  );
}

export { Skeleton };
