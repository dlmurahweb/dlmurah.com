import { ProcessCard } from "@/components/cards/process-card";
import { SectionHeading } from "@/components/sections/section-heading";
import type { HomePageContent, ProcessStep } from "@/types/site";

export function ProcessSection({
  homepage,
  steps,
}: {
  homepage: HomePageContent;
  steps: ProcessStep[];
}) {
  return (
    <section id="cara-kerja" className="scroll-mt-24 section-space">
      <div className="section-shell">
        <SectionHeading
          eyebrow={homepage.processEyebrow}
          title={homepage.howItWorksHeading}
          description={homepage.processDescription}
        />

        <div className="relative mt-14">
          <div
            className="absolute top-7 right-[8%] left-[8%] hidden h-px bg-gradient-to-r from-transparent via-brand-cyan/45 to-transparent md:block"
            aria-hidden="true"
          />
          <div
            className="absolute top-7 bottom-8 left-7 w-px bg-gradient-to-b from-brand-cyan/45 to-transparent md:hidden"
            aria-hidden="true"
          />
          <ol className="grid gap-0 md:grid-cols-4 md:gap-7">
            {steps.map((step) => (
              <ProcessCard key={step.id} step={step} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
