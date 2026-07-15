import { cn } from "@/lib/utils";

export function EnergyLine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 72"
      preserveAspectRatio="none"
      className={cn("text-brand-cyan", className)}
      aria-hidden="true"
    >
      <path
        d="M0 46h142l28-25h104l31 34h147l24-20h83l18-18h143"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.14"
        strokeWidth="12"
      />
      <path
        d="M0 46h142l28-25h104l31 34h147l24-20h83l18-18h143"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.75"
        strokeWidth="2"
      />
    </svg>
  );
}
