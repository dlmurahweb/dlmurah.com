import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  align?: "left" | "center";
  className?: string;
  description?: string;
  eyebrow?: string;
  title: string;
};

export function SectionHeading({
  align = "left",
  className,
  description,
  eyebrow,
  title,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-extrabold tracking-[0.16em] text-brand-cyan uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-heading text-[clamp(2rem,5vw,3.25rem)] leading-[1.03] font-bold tracking-[-0.045em] text-balance text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-[65ch] text-base leading-7 text-foreground-muted sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}
