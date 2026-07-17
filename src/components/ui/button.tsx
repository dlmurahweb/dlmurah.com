import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex min-h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap border text-sm font-extrabold tracking-[-0.01em] transition-[transform,background-color,border-color,color,opacity] duration-200 ease-[var(--ease-out-quart)] outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:opacity-45 motion-reduce:transform-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "button-lift angular-button border-brand-cyan bg-brand-cyan text-background hover:bg-brand-ice",
        secondary:
          "button-lift angular-button border-border bg-surface text-foreground hover:border-brand-blue hover:bg-surface-elevated",
        ghost:
          "border-transparent bg-transparent text-foreground-muted hover:bg-brand-cyan/10 hover:text-foreground",
        whatsapp:
          "button-lift angular-button border-success bg-success text-background hover:bg-[#82f0bf]",
        channel:
          "button-lift angular-button border-brand-blue bg-brand-blue text-foreground hover:border-brand-cyan hover:bg-brand-royal",
        destructive:
          "border-danger/40 bg-danger/10 text-danger hover:border-danger hover:bg-danger/20",
        link: "min-h-11 border-transparent bg-transparent px-0 text-brand-cyan underline-offset-4 hover:text-brand-ice hover:underline",
      },
      size: {
        default: "px-5 py-2.5",
        sm: "px-4 py-2 text-xs",
        lg: "min-h-12 px-6 py-3 text-base",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  type,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      type={asChild ? undefined : (type ?? "button")}
      {...props}
    />
  );
}

export { Button, buttonVariants };
