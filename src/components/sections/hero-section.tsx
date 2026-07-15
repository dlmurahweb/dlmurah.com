import { ArrowDown, ArrowUpRight, Check, MessageCircle } from "lucide-react";

import { CrystalDecoration } from "@/components/brand/crystal-decoration";
import { EnergyLine } from "@/components/brand/energy-line";
import { HeroAmbientMotion } from "@/components/brand/hero-ambient-motion";
import { VaultIllustration } from "@/components/brand/vault-illustration";
import { Button } from "@/components/ui/button";
import { createAdminWhatsAppLink } from "@/lib/whatsapp";
import type { Feature, HomePageContent, WhatsAppAdmin } from "@/types/site";

export function HeroSection({
  features,
  homepage,
  primaryAdmin,
}: {
  features: Feature[];
  homepage: HomePageContent;
  primaryAdmin?: WhatsAppAdmin;
}) {
  const whatsappHref = createAdminWhatsAppLink(primaryAdmin);
  const primaryHref = whatsappHref ?? homepage.primaryCtaTarget;
  const primaryExternal = primaryHref.startsWith("https://");
  const trustItems = features.slice(0, 3).map((feature) => feature.title);

  return (
    <section
      id="beranda"
      className="relative overflow-hidden border-b border-border"
    >
      <div className="ambient-grid" aria-hidden="true" />
      <HeroAmbientMotion />
      <EnergyLine className="absolute inset-x-0 bottom-6 h-20 w-full opacity-40" />
      <div className="section-shell grid min-h-[calc(100svh-4.5rem)] items-center gap-12 py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(25rem,0.95fr)] lg:gap-4 lg:py-20">
        <div className="relative z-10 max-w-3xl">
          <p className="angular-button inline-flex min-h-11 items-center gap-2 border border-brand-cyan/25 bg-brand-cyan/10 px-4 text-xs font-extrabold tracking-[0.16em] text-brand-ice uppercase">
            <span className="size-2 bg-brand-cyan" aria-hidden="true" />
            {homepage.eyebrow}
          </p>

          <h1 className="mt-7 font-heading text-[clamp(2.6rem,7vw,5.4rem)] leading-[0.98] font-bold tracking-[-0.06em] text-balance text-foreground">
            {homepage.heroTitle}
          </h1>
          <p className="mt-7 max-w-[62ch] text-base leading-7 text-foreground-muted sm:text-lg sm:leading-8">
            {homepage.heroDescription}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button variant="whatsapp" size="lg" asChild>
              <a
                href={primaryHref}
                target={primaryExternal ? "_blank" : undefined}
                rel={primaryExternal ? "noopener noreferrer" : undefined}
                data-analytics-event={
                  primaryExternal ? "whatsapp_click" : "hero_cta_click"
                }
                data-source="hero"
                data-label={homepage.primaryCtaLabel}
              >
                <MessageCircle aria-hidden="true" />
                {homepage.primaryCtaLabel}
                {primaryExternal ? <ArrowUpRight aria-hidden="true" /> : null}
              </a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a
                href={homepage.secondaryCtaTarget}
                data-analytics-event="navigation_click"
                data-source="hero_secondary"
                data-label={homepage.secondaryCtaLabel}
              >
                {homepage.secondaryCtaLabel}
                <ArrowDown aria-hidden="true" />
              </a>
            </Button>
          </div>

          {trustItems.length ? (
            <ul className="mt-9 flex flex-col gap-3 text-sm text-foreground-muted sm:flex-row sm:flex-wrap sm:gap-x-6">
              {trustItems.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check aria-hidden="true" className="size-4 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="relative mx-auto w-full max-w-[35rem] lg:justify-self-end">
          <div className="logo-aura" aria-hidden="true" />
          <CrystalDecoration className="absolute -top-4 -left-3 z-10 h-28 w-20 rotate-[-16deg] opacity-70" />
          <CrystalDecoration className="absolute right-0 bottom-10 z-10 h-20 w-14 rotate-12 opacity-50" />
          <div className="angular-frame relative aspect-square border border-brand-cyan/25 bg-surface-glass p-5 sm:p-8">
            <div className="absolute inset-4 border border-brand-royal/40 sm:inset-7" />
            <VaultIllustration className="relative z-10 h-full w-full drop-shadow-[0_24px_50px_rgb(3_8_43_/_0.55)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
