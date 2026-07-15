import { cn } from "@/lib/utils";

export function LoadingState({ className }: { className?: string }) {
  return (
    <div
      className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}
      aria-label="Memuat konten"
      aria-busy="true"
    >
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="h-44 animate-pulse border border-border bg-surface/70 motion-reduce:animate-none"
        />
      ))}
    </div>
  );
}
