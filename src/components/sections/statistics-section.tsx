import { StatisticCard } from "@/components/cards/statistic-card";
import { cn } from "@/lib/utils";
import type { Statistic } from "@/types/site";

export function StatisticsSection({ statistics }: { statistics: Statistic[] }) {
  if (!statistics.length) return null;

  const columnClass =
    {
      1: "lg:grid-cols-1",
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
    }[Math.min(statistics.length, 4)] ?? "lg:grid-cols-4";

  return (
    <section aria-label="Informasi layanan" className="relative z-10 -mt-px">
      <div className="section-shell">
        <div
          className={cn(
            "grid gap-px border-x border-b border-border bg-border",
            statistics.length > 1 && "sm:grid-cols-2",
            columnClass,
          )}
        >
          {statistics.map((statistic) => (
            <StatisticCard key={statistic.id} statistic={statistic} />
          ))}
        </div>
      </div>
    </section>
  );
}
