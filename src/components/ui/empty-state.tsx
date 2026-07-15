import { CircleOff } from "lucide-react";

import { cn } from "@/lib/utils";

export function EmptyState({
  className,
  description,
  title = "Konten belum tersedia",
}: {
  className?: string;
  description: string;
  title?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-40 flex-col items-start justify-center border border-dashed border-border bg-background-secondary/45 p-6",
        className,
      )}
    >
      <CircleOff aria-hidden="true" className="size-5 text-foreground-muted" />
      <p className="mt-4 font-heading font-bold text-foreground">{title}</p>
      <p className="mt-2 max-w-[55ch] text-sm leading-6 text-foreground-muted">
        {description}
      </p>
    </div>
  );
}
