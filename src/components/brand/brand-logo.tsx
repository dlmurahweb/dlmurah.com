import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  size?: number;
};

export function BrandLogo({
  className,
  imageClassName,
  priority = false,
  size = 56,
}: BrandLogoProps) {
  return (
    <span className={cn("inline-flex shrink-0", className)}>
      <Image
        src="/brand/logo.webp"
        alt="DLMURAH"
        width={size}
        height={size}
        priority={priority}
        className={cn("object-contain", imageClassName)}
      />
    </span>
  );
}
