import type * as React from "react";

import { cn } from "@/lib/utils";

type SurfaceCardProps = React.ComponentProps<"article"> & {
  interactive?: boolean;
};

export function SurfaceCard({
  className,
  interactive = false,
  ...props
}: SurfaceCardProps) {
  return (
    <article
      className={cn(
        "border border-border bg-surface text-card-foreground",
        interactive &&
          "transition-[transform,border-color,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:border-brand-blue hover:bg-surface-elevated motion-reduce:transform-none",
        className,
      )}
      {...props}
    />
  );
}
