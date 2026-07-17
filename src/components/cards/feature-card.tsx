import type { Feature } from "@/types/site";

export function FeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  return (
    <li className="grid grid-cols-[3.25rem_1fr] gap-4 border-b border-border/80 py-6 last:border-b-0">
      <span className="font-heading text-sm font-bold text-brand-cyan">
        {String(index).padStart(2, "0")}
      </span>
      <div>
        <h3 className="font-heading text-lg font-bold text-foreground">
          {feature.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-foreground-muted">
          {feature.description}
        </p>
      </div>
    </li>
  );
}
