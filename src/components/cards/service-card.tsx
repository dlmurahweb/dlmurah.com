import { ArrowUpRight, MessageCircle } from "lucide-react";

import { BrandIcon } from "@/components/brand/brand-icon";
import { SurfaceCard } from "@/components/cards/surface-card";
import { Button } from "@/components/ui/button";
import { createAdminWhatsAppLink } from "@/lib/whatsapp";
import type { Service, WhatsAppAdmin } from "@/types/site";

export function ServiceCard({
  admin,
  featured = false,
  service,
}: {
  admin?: WhatsAppAdmin;
  featured?: boolean;
  service: Service;
}) {
  const href = createAdminWhatsAppLink(admin, service.whatsappPrefilledMessage);

  return (
    <SurfaceCard
      interactive
      className={`group flex h-full flex-col p-6 sm:p-7 ${featured ? "md:row-span-2" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-11 place-items-center border border-brand-cyan/25 bg-brand-cyan/10 text-brand-cyan">
          <BrandIcon name={service.iconKey} />
        </span>
        {service.badge ? (
          <span className="border border-brand-blue/40 bg-brand-blue/10 px-2.5 py-1 text-xs font-bold text-brand-ice">
            {service.badge}
          </span>
        ) : null}
      </div>

      <h3 className="mt-8 font-heading text-2xl font-bold tracking-tight text-foreground">
        {service.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-foreground-muted sm:text-base sm:leading-7">
        {service.shortDescription}
      </p>

      <div className="mt-7">
        {href ? (
          <Button variant="ghost" className="px-0 text-brand-cyan" asChild>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="whatsapp_click"
              data-source="service_card"
              data-service={service.slug}
              data-admin={admin?.name}
              data-label={service.title}
            >
              <MessageCircle aria-hidden="true" />
              Hubungi admin
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        ) : (
          <Button variant="ghost" className="px-0" disabled>
            Kontak belum aktif
          </Button>
        )}
      </div>
    </SurfaceCard>
  );
}
