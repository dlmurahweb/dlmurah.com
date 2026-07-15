import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  showWordmark?: boolean;
  size?: number;
  variant?: "logo" | "mark";
};

export function BrandLogo({
  className,
  imageClassName,
  priority = false,
  showWordmark = true,
  size = 48,
  variant = "logo",
}: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src={variant === "mark" ? "/brand/lock-mark.webp" : "/brand/logo.webp"}
        alt=""
        width={size}
        height={size}
        priority={priority}
        className={cn(
          "rounded-md object-cover ring-1 ring-brand-cyan/25",
          imageClassName,
        )}
      />
      {showWordmark ? (
        <span className="font-heading text-lg font-bold tracking-[0.08em] text-foreground">
          DLMURAH
        </span>
      ) : null}
    </span>
  );
}
