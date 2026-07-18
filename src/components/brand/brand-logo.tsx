import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  size?: number;
  variant?: "logo" | "mark";
};

export function BrandLogo({
  className,
  imageClassName,
  priority = false,
  size = 56,
  variant = "logo",
}: BrandLogoProps) {
  return (
    <span className={cn("inline-flex shrink-0", className)}>
      <Image
        src={variant === "mark" ? "/brand/lock-mark.webp" : "/brand/logo.webp"}
        alt="DLMURAH"
        width={size}
        height={size}
        priority={priority}
        className={cn("object-contain", imageClassName)}
      />
    </span>
  );
}
