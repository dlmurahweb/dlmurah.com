"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";

export function HeroAmbientMotion() {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation} strict>
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <m.span
          className="absolute top-[12%] left-[8%] hidden size-2 rotate-45 bg-brand-cyan/70 sm:block"
          animate={
            reduceMotion
              ? undefined
              : { y: [0, -14, 0], opacity: [0.35, 0.85, 0.35] }
          }
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <m.span
          className="absolute top-[32%] right-[10%] hidden size-1.5 rotate-45 bg-brand-ice/70 sm:block"
          animate={reduceMotion ? undefined : { y: [0, 12, 0], x: [0, -5, 0] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <m.span
          className="absolute right-[24%] bottom-[13%] hidden h-1 w-6 bg-brand-blue/70 sm:block"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 18, 0], opacity: [0.25, 0.7, 0.25] }
          }
          transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <m.span
          className="absolute top-[20%] right-[34%] hidden size-32 rounded-full bg-brand-cyan/10 blur-3xl sm:block"
          animate={
            reduceMotion
              ? undefined
              : { scale: [0.9, 1.12, 0.9], opacity: [0.2, 0.48, 0.2] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </LazyMotion>
  );
}
