import { Check } from "lucide-react";

import type { Feature } from "@/types/site";

export function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className="grid grid-cols-[2.75rem_1fr] gap-4 border-b border-border py-6 first:pt-0 last:border-b-0 last:pb-0">
      <span className="grid size-11 place-items-center bg-brand-cyan/10 text-brand-cyan">
        <Check aria-hidden="true" className="size-5" />
      </span>
      <div>
        <h3 className="font-heading text-lg font-bold text-foreground">
          {feature.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-foreground-muted">
          {feature.description}
        </p>
      </div>
    </article>
  );
}
