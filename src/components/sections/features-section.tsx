import { CrystalDecoration } from "@/components/brand/crystal-decoration";
import { FeatureCard } from "@/components/cards/feature-card";
import { SectionHeading } from "@/components/sections/section-heading";
import type { Feature, HomePageContent } from "@/types/site";

export function FeaturesSection({
  features,
  homepage,
}: {
  features: Feature[];
  homepage: HomePageContent;
}) {
  return (
    <section className="border-y border-border bg-[#071044] section-space">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div
          data-motion-reveal
          className="feature-visual relative min-h-80 overflow-hidden border border-border bg-background-secondary p-8 sm:min-h-96"
        >
          <div
            className="absolute inset-10 rotate-45 border border-brand-blue/25"
            aria-hidden="true"
          />
          <div
            className="absolute inset-20 -rotate-12 border border-brand-cyan/15"
            aria-hidden="true"
          />
          <CrystalDecoration className="absolute top-8 left-[20%] h-60 w-40 -rotate-12" />
          <CrystalDecoration className="absolute right-[16%] bottom-6 h-44 w-28 rotate-[18deg] opacity-55" />
          <p className="absolute bottom-8 left-8 max-w-xs font-heading text-3xl leading-tight font-bold text-foreground">
            {homepage.featuresVisualCaption}
          </p>
        </div>

        <div>
          <SectionHeading
            eyebrow={homepage.featuresEyebrow}
            title={homepage.featuresHeading}
            description={homepage.featuresDescription}
          />
          <ol
            className="mt-10 border-y border-border/80"
            data-motion-reveal
            data-motion-stagger
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                index={index + 1}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
