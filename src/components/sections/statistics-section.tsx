import { StatisticCard } from "@/components/cards/statistic-card";
import type { Statistic } from "@/types/site";

export function StatisticsSection({ statistics }: { statistics: Statistic[] }) {
  if (!statistics.length) return null;

  return (
    <section aria-label="Informasi layanan" className="relative z-10 -mt-px">
      <div className="section-shell">
        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((statistic) => (
            <StatisticCard key={statistic.id} statistic={statistic} />
          ))}
        </div>
      </div>
    </section>
  );
}
