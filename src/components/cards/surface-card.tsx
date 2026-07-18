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
        "surface-card border border-border bg-surface text-card-foreground",
        interactive && "surface-card-interactive",
        className,
      )}
      {...props}
    />
  );
}
