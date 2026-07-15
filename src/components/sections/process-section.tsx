import { ProcessCard } from "@/components/cards/process-card";
import { SectionHeading } from "@/components/sections/section-heading";
import type { ProcessStep } from "@/types/site";

export function ProcessSection({
  heading,
  steps,
}: {
  heading: string;
  steps: ProcessStep[];
}) {
  return (
    <section id="cara-kerja" className="section-space">
      <div className="section-shell">
        <SectionHeading
          eyebrow="ALUR TRANSPARAN"
          title={heading}
          description="Empat langkah sederhana untuk mengarahkan kebutuhanmu ke admin yang sesuai dan mengonfirmasi setiap detail."
        />

        <div className="relative mt-14 grid gap-0 md:grid-cols-4 md:gap-7">
          <div
            className="absolute top-7 right-[8%] left-[8%] hidden h-px bg-gradient-to-r from-transparent via-brand-cyan/45 to-transparent md:block"
            aria-hidden="true"
          />
          <div
            className="absolute top-7 bottom-8 left-7 w-px bg-gradient-to-b from-brand-cyan/45 to-transparent md:hidden"
            aria-hidden="true"
          />
          {steps.map((step) => (
            <ProcessCard key={step.id} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
