import { cn } from "@/lib/utils";

export function VaultIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 640"
      className={cn("overflow-visible", className)}
      role="img"
      aria-labelledby="vault-title vault-description"
    >
      <title id="vault-title">Ilustrasi brankas kristal DLMURAH</title>
      <desc id="vault-description">
        Brankas geometris orisinal dengan panel es, sayap tajam, dan jalur
        energi sian.
      </desc>
      <defs>
        <linearGradient id="vault-face" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#bffaff" />
          <stop offset="0.48" stopColor="#57ecf5" />
          <stop offset="1" stopColor="#377cff" />
        </linearGradient>
        <linearGradient id="vault-depth" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#142879" />
          <stop offset="1" stopColor="#071044" />
        </linearGradient>
      </defs>

      <path
        d="m75 205 118 44-57 35-91-26Zm490 0-118 44 57 35 91-26ZM96 317l99 7-60 55-93-20Zm448 0-99 7 60 55 93-20Z"
        fill="#293ceb"
        stroke="#57ecf5"
        strokeOpacity="0.5"
        strokeWidth="5"
      />
      <path
        d="M159 180 255 92h130l96 88-35 52H194Z"
        fill="url(#vault-depth)"
        stroke="#57ecf5"
        strokeWidth="7"
      />
      <path
        d="M223 182v-21c0-54 43-97 97-97s97 43 97 97v21h-48v-18c0-28-22-50-49-50s-49 22-49 50v18Z"
        fill="url(#vault-face)"
        stroke="#050b35"
        strokeWidth="11"
      />
      <path
        d="m155 206 33-32h264l33 32-19 314-35 31H209l-35-31Z"
        fill="url(#vault-depth)"
        stroke="#57ecf5"
        strokeWidth="8"
      />
      <path
        d="m202 236 24-20h188l24 20-15 242-22 20H239l-22-20Z"
        fill="url(#vault-face)"
        stroke="#050b35"
        strokeWidth="12"
      />
      <circle
        cx="320"
        cy="347"
        r="71"
        fill="#101d62"
        stroke="#050b35"
        strokeWidth="12"
      />
      <circle
        cx="320"
        cy="347"
        r="48"
        fill="#bffaff"
        stroke="#377cff"
        strokeWidth="10"
      />
      <path
        d="M320 303v88M276 347h88M289 316l62 62m0-62-62 62"
        stroke="#050b35"
        strokeLinecap="round"
        strokeWidth="10"
      />
      <path
        d="m246 247 52 17-56 31m154-48-52 17 56 31M245 450h150"
        fill="none"
        stroke="#f8fbff"
        strokeLinecap="round"
        strokeOpacity="0.72"
        strokeWidth="8"
      />
    </svg>
  );
}
