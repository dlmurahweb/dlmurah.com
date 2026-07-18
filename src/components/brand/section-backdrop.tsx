import { cn } from "@/lib/utils";

type SectionBackdropProps = {
  className?: string;
  variant: "diamonds" | "locks" | "wings";
};

export function SectionBackdrop({ className, variant }: SectionBackdropProps) {
  return (
    <svg
      viewBox="0 0 1440 720"
      preserveAspectRatio="xMidYMid slice"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-brand-cyan select-none",
        className,
      )}
      aria-hidden="true"
      focusable="false"
    >
      {variant === "diamonds" ? <DiamondField /> : null}
      {variant === "locks" ? <LockField /> : null}
      {variant === "wings" ? <WingCrest /> : null}
    </svg>
  );
}

function DiamondField() {
  return (
    <g stroke="currentColor" strokeLinejoin="miter">
      <g fill="none" strokeOpacity="0.15" strokeWidth="2">
        <path d="m-82 124 190-92 168 134-54 242L34 526-116 342Z" />
        <path d="m-82 124 228 116L34 526m242-360L146 240 108 32m38 208 76 168" />
        <path d="m1180 88 132-64 116 92-38 168-130 82-104-128Z" />
        <path d="m1180 88 158 80-78 198m168-250-90 52-26-144m26 144 52 116" />
      </g>

      <g fill="currentColor" stroke="none">
        <path d="m114 112 14 14-14 14-14-14Z" opacity="0.28" />
        <path d="m1298 424 20 20-20 20-20-20Z" opacity="0.18" />
        <path d="m1108 596 10 10-10 10-10-10Z" opacity="0.32" />
        <path d="m310 594 8 8-8 8-8-8Z" opacity="0.24" />
      </g>

      <g fill="none" strokeOpacity="0.1" strokeWidth="1">
        <path d="M0 594h332l48-48h208l54 54h312l42-42h218l46-46h180" />
        <path d="M0 608h338l48-48h196l54 54h324l42-42h218l46-46h174" />
      </g>
    </g>
  );
}

function LockField() {
  return (
    <g fill="none" stroke="currentColor" strokeLinejoin="miter">
      <g opacity="0.13" strokeWidth="2">
        <path d="M90 214v-48h12v-34h18v-22h26V98h48v12h26v22h18v34h12v48h-34v-46h-12v-22h-18v-12h-32v12h-18v22h-12v46Z" />
        <path d="m72 206 18-18h160l18 18-10 176-20 20H102l-20-20Z" />
        <path d="M146 256h48l12 12v48l-12 12h-48l-12-12v-48Z" />
        <path d="m170 266 12 12-8 18 12 12-16 14-16-14 12-12-8-18Z" />
      </g>

      <g
        opacity="0.11"
        strokeWidth="3"
        transform="translate(1072 252) scale(1.45)"
      >
        <path d="M90 214v-48h12v-34h18v-22h26V98h48v12h26v22h18v34h12v48h-34v-46h-12v-22h-18v-12h-32v12h-18v22h-12v46Z" />
        <path d="m72 206 18-18h160l18 18-10 176-20 20H102l-20-20Z" />
        <path d="M146 256h48l12 12v48l-12 12h-48l-12-12v-48Z" />
        <path d="m170 266 12 12-8 18 12 12-16 14-16-14 12-12-8-18Z" />
      </g>

      <g strokeOpacity="0.12" strokeWidth="2">
        <path d="M318 138h194l36 36h344l36-36h194" />
        <path d="M306 150h200l36 36h356l36-36h200" />
        <path d="M364 550h152l32-32h344l32 32h152" />
      </g>

      <g fill="currentColor" stroke="none">
        <path d="m336 120 12 12-12 12-12-12Z" opacity="0.25" />
        <path d="m1094 532 14 14-14 14-14-14Z" opacity="0.22" />
        <path d="m708 112 8 8-8 8-8-8Z" opacity="0.3" />
      </g>
    </g>
  );
}

function WingCrest() {
  return (
    <g stroke="currentColor" strokeLinejoin="miter">
      <g
        fill="currentColor"
        fillOpacity="0.035"
        strokeOpacity="0.13"
        strokeWidth="2"
      >
        <path d="m704 278-92-66-126-58-150 12 114 50 118 76-132-44-158 26 142 38 128 38-132 10-128 66 150-26 130-18-104 58-82 102 122-70 122-98Z" />
        <path d="m736 278 92-66 126-58 150 12-114 50-118 76 132-44 158 26-142 38-128 38 132 10 128 66-150-26-130-18 104 58 82 102-122-70-122-98Z" />
      </g>

      <g fill="none" strokeOpacity="0.12" strokeWidth="2">
        <path d="m704 278-136 14-148-76m148 76-148 20-142-38m270 76-130 50-128 26m258-76-112 90-82 102" />
        <path d="m736 278 136 14 148-76m-148 76 148 20 142-38M892 350l130 50 128 26M892 350l112 90 82 102" />
      </g>

      <path
        d="m720 196 72 72-72 112-72-112Z"
        fill="currentColor"
        fillOpacity="0.05"
        strokeOpacity="0.2"
        strokeWidth="2"
      />
      <path
        d="m720 196 14 72-14 112-16-112Zm72 72-58 0-14 112m-72-112h56"
        fill="none"
        strokeOpacity="0.15"
        strokeWidth="2"
      />
      <path d="m720 176 12 12-12 12-12-12Z" fill="currentColor" opacity="0.3" />
    </g>
  );
}
