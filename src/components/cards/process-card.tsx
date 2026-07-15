import { BrandIcon } from "@/components/brand/brand-icon";
import type { ProcessStep } from "@/types/site";

export function ProcessCard({ step }: { step: ProcessStep }) {
  return (
    <article className="relative grid grid-cols-[3.5rem_1fr] gap-4 pb-10 md:block md:pb-0">
      <div className="relative z-10 grid size-14 place-items-center border border-brand-cyan/35 bg-background font-heading text-sm font-bold text-brand-cyan">
        {step.stepNumber}
      </div>
      <div className="md:mt-7">
        <BrandIcon
          name={step.iconKey}
          className="mb-4 size-5 text-brand-blue"
        />
        <h3 className="font-heading text-xl font-bold text-foreground">
          {step.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-foreground-muted">
          {step.description}
        </p>
      </div>
    </article>
  );
}
