"use client";

import { useEffect } from "react";
import {
  animate,
  inView,
  LazyMotion,
  domAnimation,
  m,
  stagger,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";

export function HeroAmbientMotion() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.35,
  });

  useEffect(() => {
    const revealGroups = document.querySelectorAll<HTMLElement>(
      "[data-motion-reveal]",
    );
    const clearRevealStyles = () => {
      revealGroups.forEach((group) => {
        const targets = group.matches("[data-motion-stagger]")
          ? Array.from(group.children)
          : [group];
        targets.forEach((target) => {
          if (!(target instanceof HTMLElement)) return;
          target.style.removeProperty("opacity");
          target.style.removeProperty("transform");
        });
      });
    };

    if (
      reduceMotion ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      clearRevealStyles();
      return;
    }

    const cleanups: VoidFunction[] = [];

    revealGroups.forEach((group) => {
      const targets = group.matches("[data-motion-stagger]")
        ? Array.from(group.children).filter(
            (child): child is HTMLElement => child instanceof HTMLElement,
          )
        : [group];

      targets.forEach((target) => {
        target.style.opacity = "0";
        target.style.transform = "translateY(1.75rem)";
      });

      cleanups.push(
        inView(
          group,
          () => {
            animate(
              targets,
              { opacity: 1, transform: "translateY(0rem)" },
              {
                duration: 0.72,
                delay: stagger(0.085),
                ease: [0.25, 1, 0.5, 1],
              },
            );
          },
          { amount: 0.14, margin: "0px 0px -8% 0px" },
        ),
      );
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      clearRevealStyles();
    };
  }, [reduceMotion]);

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-ice"
        style={{ scaleX: reduceMotion ? 0 : smoothProgress }}
        aria-hidden="true"
      />
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
        <m.span
          className="absolute top-[8%] right-[2%] hidden h-px w-[42vw] origin-right rotate-[-24deg] bg-gradient-to-l from-brand-cyan/50 to-transparent lg:block"
          animate={reduceMotion ? undefined : { scaleX: [0.35, 1, 0.35] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </LazyMotion>
  );
}
