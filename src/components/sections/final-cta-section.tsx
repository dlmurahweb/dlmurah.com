import { ArrowUpRight, MessageCircle, Radio } from "lucide-react";

import { AngularFrame } from "@/components/brand/angular-frame";
import { VaultIllustration } from "@/components/brand/vault-illustration";
import { Button } from "@/components/ui/button";
import { createAdminWhatsAppLink } from "@/lib/whatsapp";
import type {
  HomePageContent,
  WhatsAppAdmin,
  WhatsAppChannel,
} from "@/types/site";

export function FinalCtaSection({
  channel,
  homepage,
  primaryAdmin,
}: {
  channel?: WhatsAppChannel;
  homepage: HomePageContent;
  primaryAdmin?: WhatsAppAdmin;
}) {
  const whatsappHref = createAdminWhatsAppLink(primaryAdmin);
  const channelHref = channel?.isActive ? channel.url : undefined;

  return (
    <section className="section-shell pb-20 sm:pb-28">
      <AngularFrame
        accent
        className="relative isolate overflow-hidden bg-surface-glass px-6 py-12 sm:px-10 lg:px-14 lg:py-16"
      >
        <div
          className="absolute -top-28 -right-20 -z-10 size-96 rotate-12 border border-brand-cyan/10 bg-brand-blue/5"
          aria-hidden="true"
        />
        <VaultIllustration className="absolute -right-12 -bottom-32 -z-10 hidden w-[32rem] opacity-20 lg:block" />

        <div className="max-w-3xl">
          <p className="text-xs font-extrabold tracking-[0.16em] text-brand-cyan uppercase">
            LANJUTKAN MELALUI WHATSAPP
          </p>
          <h2 className="mt-3 font-heading text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] font-bold tracking-[-0.05em] text-balance text-foreground">
            {homepage.finalCtaTitle}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-foreground-muted sm:text-lg sm:leading-8">
            {homepage.finalCtaDescription}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              variant={whatsappHref ? "whatsapp" : "default"}
              size="lg"
              asChild
            >
              <a
                href={whatsappHref ?? "#pilih-admin"}
                target={whatsappHref ? "_blank" : undefined}
                rel={whatsappHref ? "noopener noreferrer" : undefined}
                data-analytics-event={
                  whatsappHref ? "whatsapp_click" : "final_cta_click"
                }
                data-source="final_cta"
                data-admin={primaryAdmin?.name}
                data-label="Pilih Admin"
              >
                <MessageCircle aria-hidden="true" />
                Pilih Admin
                {whatsappHref ? <ArrowUpRight aria-hidden="true" /> : null}
              </a>
            </Button>
            {channelHref ? (
              <Button variant="secondary" size="lg" asChild>
                <a
                  href={channelHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-event="channel_click"
                  data-source="final_cta"
                  data-channel={channel?.title}
                  data-label="Buka Saluran WhatsApp"
                >
                  <Radio aria-hidden="true" />
                  Buka Saluran WhatsApp
                </a>
              </Button>
            ) : (
              <Button variant="secondary" size="lg" asChild>
                <a
                  href="#saluran"
                  data-analytics-event="final_cta_click"
                  data-source="final_cta"
                  data-label="Lihat Saluran"
                >
                  <Radio aria-hidden="true" />
                  Lihat Saluran
                </a>
              </Button>
            )}
          </div>
        </div>
      </AngularFrame>
    </section>
  );
}
