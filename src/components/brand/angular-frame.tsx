import type * as React from "react";

import { cn } from "@/lib/utils";

type AngularFrameProps = React.ComponentProps<"div"> & {
  accent?: boolean;
};

export function AngularFrame({
  accent = false,
  className,
  children,
  ...props
}: AngularFrameProps) {
  return (
    <div
      className={cn(
        "angular-frame relative border bg-surface",
        accent ? "border-brand-cyan/40" : "border-border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
