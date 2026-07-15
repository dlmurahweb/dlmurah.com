import { cn } from "@/lib/utils";

export function CrystalDecoration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 160"
      className={cn("text-brand-cyan", className)}
      aria-hidden="true"
    >
      <path
        d="M60 3 108 47 91 132 60 157 28 132 12 47Z"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="2"
      />
      <path
        d="m60 3 9 67-9 87-19-84Zm48 44L69 70l22 62M12 47l29 26-13 59"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="2"
      />
      <path
        d="m41 73 28-3 22 62-31 25-32-25Z"
        fill="currentColor"
        fillOpacity="0.06"
      />
    </svg>
  );
}
