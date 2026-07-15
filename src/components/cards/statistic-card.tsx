import { BrandIcon } from "@/components/brand/brand-icon";
import type { Statistic } from "@/types/site";

export function StatisticCard({ statistic }: { statistic: Statistic }) {
  return (
    <div className="flex min-h-32 items-start gap-4 bg-surface px-5 py-6">
      <BrandIcon
        name={statistic.iconKey}
        className="mt-1 size-5 shrink-0 text-brand-cyan"
      />
      <div>
        <p className="font-heading text-2xl font-bold tracking-tight text-foreground">
          {statistic.value}
        </p>
        <p className="mt-1 text-sm font-bold text-brand-ice">
          {statistic.label}
        </p>
        {statistic.description ? (
          <p className="mt-2 text-xs leading-5 text-foreground-muted">
            {statistic.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
