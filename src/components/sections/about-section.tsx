import { KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";

import { AngularFrame } from "@/components/brand/angular-frame";
import { RichText } from "@/components/ui/rich-text";
import type { HomePageContent } from "@/types/site";

export function AboutSection({ homepage }: { homepage: HomePageContent }) {
  const values = [
    { icon: LockKeyhole, label: homepage.aboutValueOneLabel },
    { icon: KeyRound, label: homepage.aboutValueTwoLabel },
    { icon: ShieldCheck, label: homepage.aboutValueThreeLabel },
  ];

  return (
    <section
      id="tentang"
      className="border-y border-border bg-background-secondary/45 section-space"
    >
      <div className="section-shell grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div>
          <p className="text-xs font-extrabold tracking-[0.16em] text-brand-cyan uppercase">
            {homepage.aboutEyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[clamp(2rem,5vw,3.25rem)] leading-[1.03] font-bold tracking-[-0.045em] text-foreground">
            {homepage.aboutHeading}
          </h2>
          <div className="rich-copy mt-7 max-w-[65ch] text-base leading-8 text-foreground-muted">
            <RichText document={homepage.aboutContent} />
          </div>
        </div>

        <AngularFrame accent className="p-7 sm:p-9">
          <p className="font-heading text-sm font-bold tracking-[0.12em] text-brand-ice uppercase">
            {homepage.aboutValuesHeading}
          </p>
          <div className="mt-6 space-y-1">
            {values.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex min-h-16 items-center gap-4 border-b border-border py-4 last:border-b-0"
              >
                <Icon aria-hidden="true" className="size-5 text-brand-cyan" />
                <p className="font-heading font-bold text-foreground">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </AngularFrame>
      </div>
    </section>
  );
}
