import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-400 dark:bg-slate-600",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
