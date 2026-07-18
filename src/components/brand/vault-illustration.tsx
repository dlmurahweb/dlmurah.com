import { cn } from "@/lib/utils";

export function VaultIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 640"
      className={cn("overflow-visible", className)}
      role="img"
      aria-labelledby="diamond-lock-title diamond-lock-description"
    >
      <title id="diamond-lock-title">Ilustrasi Diamond Lock DLMURAH</title>
      <desc id="diamond-lock-description">
        Gembok kristal sian bergaya pixel dengan permukaan berlian bersegi dan
        siluet kunci gelap.
      </desc>

      <defs>
        <linearGradient id="diamond-shackle" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#e6fdff" />
          <stop offset="0.32" stopColor="#8cf7fb" />
          <stop offset="0.68" stopColor="#37cfe5" />
          <stop offset="1" stopColor="#2474dd" />
        </linearGradient>
        <linearGradient id="diamond-face" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#d9fcff" />
          <stop offset="0.3" stopColor="#78eef5" />
          <stop offset="0.7" stopColor="#35bddb" />
          <stop offset="1" stopColor="#2769d7" />
        </linearGradient>
        <linearGradient id="diamond-edge" x1="0" y1="0" x2="0.9" y2="1">
          <stop stopColor="#46e3ef" />
          <stop offset="1" stopColor="#182d8f" />
        </linearGradient>
        <radialGradient id="diamond-aura">
          <stop stopColor="#57ecf5" stopOpacity="0.5" />
          <stop offset="1" stopColor="#377cff" stopOpacity="0" />
        </radialGradient>
        <filter id="diamond-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="320" cy="322" r="292" fill="url(#diamond-aura)" />

      <g
        fill="#293ceb"
        stroke="#57ecf5"
        strokeLinejoin="miter"
        strokeOpacity="0.55"
        strokeWidth="5"
      >
        <path d="m82 211 98 39-55 38-79-28Z" />
        <path d="m558 211-98 39 55 38 79-28Z" />
        <path d="m75 326 105 8-62 55-88-19Z" />
        <path d="m565 326-105 8 62 55 88-19Z" />
        <path d="m103 438 92-36-33 76-86 17Z" />
        <path d="m537 438-92-36 33 76 86 17Z" />
      </g>

      <g fill="#bffaff" filter="url(#diamond-glow)" shapeRendering="crispEdges">
        <path d="M91 153h12v12H91Zm448 38h18v18h-18ZM75 416h14v14H75Zm482-74h10v10h-10Z" />
        <path d="M98 135h5v48h-5Zm-21 21h48v5H77Zm460 264h5v56h-5Zm-25 25h56v5h-56Z" />
      </g>

      <g shapeRendering="crispEdges">
        <path
          d="M186 256v-88h16v-48h24V96h32V72h48V56h80v16h40v24h32v32h16v40h16v88h-72v-80h-16v-24h-24v-16h-40v16h-24v24h-16v80Z"
          fill="#061044"
        />
        <path
          d="M202 240v-72h16v-40h24v-24h32V88h112v16h32v24h24v40h16v72h-40v-64h-16v-32h-32v-16h-64v16h-24v24h-16v72Z"
          fill="url(#diamond-shackle)"
        />
        <path
          d="M218 168v72h24v-72h16v-32h32v-24h32V88h-48v16h-32v24h-24v40Z"
          fill="#e6fdff"
          opacity="0.54"
        />
        <path
          d="M386 88h-32v24h32v16h32v40h16v72h24v-72h-16v-40h-24v-24h-32Z"
          fill="#2474dd"
          opacity="0.7"
        />

        <path
          d="M144 224h352l48 48v240l-48 48H144l-48-48V272Z"
          fill="#050b35"
        />
        <path
          d="M144 208h336l48 48v240l-48 48H144l-48-48V256Z"
          fill="url(#diamond-edge)"
        />
        <path
          d="M160 232h304l40 40v208l-40 40H160l-40-40V272Z"
          fill="url(#diamond-face)"
        />

        <path d="m160 232 72 72v144l-72 72-40-40V272Z" fill="#2aa7d4" />
        <path d="m464 232-72 72v144l72 72 40-40V272Z" fill="#2769d7" />
        <path d="m160 232 72 72h160l72-72Z" fill="#c9fbff" />
        <path d="m160 520 72-72h160l72 72Z" fill="#2382c4" />
        <path d="M232 304h160v144H232Z" fill="#61dce9" />

        <path
          d="M144 256h128l-40 40h-88Zm0 16h48l-48 48Zm16 40h16v72h-16Zm16-56h32v16h-32Z"
          fill="#f2feff"
          opacity="0.72"
        />
        <path
          d="M392 304h72v144l-72-24Zm-16 120h16v24h-16Zm16-120h16v16h-16Z"
          fill="#174aab"
          opacity="0.7"
        />

        <circle cx="278" cy="366" r="62" fill="#061044" />
        <circle cx="278" cy="366" r="30" fill="#61dce9" />
        <path
          d="m306 390 28-28 110 110v48h-48v-32h-32v-32h-24Z"
          fill="#061044"
        />
        <path d="M406 472h38v16h-38Zm-42-32h32v16h-32Z" fill="#102269" />

        <path
          d="M176 248h72v16h-72Zm-32 32h16v80h-16Zm304 216h32v-16h16v-64h16v72l-32 32h-32Z"
          fill="#e6fdff"
          opacity="0.55"
        />
      </g>
    </svg>
  );
}
