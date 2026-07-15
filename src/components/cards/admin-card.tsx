import Image from "next/image";
import { ArrowUpRight, Clock3, MessageCircle } from "lucide-react";

import { BrandIcon } from "@/components/brand/brand-icon";
import { SurfaceCard } from "@/components/cards/surface-card";
import { Button } from "@/components/ui/button";
import { createAdminWhatsAppLink } from "@/lib/whatsapp";
import type { WhatsAppAdmin } from "@/types/site";

export function AdminCard({ admin }: { admin: WhatsAppAdmin }) {
  const href = createAdminWhatsAppLink(admin);

  return (
    <SurfaceCard interactive className="flex h-full flex-col p-6">
      <div className="flex items-center gap-4">
        <div className="relative grid size-14 shrink-0 place-items-center overflow-hidden border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan">
          {admin.avatarUrl ? (
            <Image
              src={admin.avatarUrl}
              alt={`Avatar ${admin.name}`}
              fill
              sizes="56px"
              className="object-cover"
            />
          ) : (
            <BrandIcon name="user-key" className="size-6" />
          )}
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-foreground">
            {admin.name}
          </h3>
          <p className="mt-1 text-sm text-foreground-muted">{admin.role}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
        <span className="border border-border bg-background-secondary px-3 py-1.5 text-brand-ice">
          {admin.serviceCategory}
        </span>
        <span
          className={`border px-3 py-1.5 ${href ? "border-success/35 bg-success/10 text-success" : "border-warning/35 bg-warning/10 text-warning"}`}
        >
          {admin.availabilityLabel ?? (href ? "Tersedia" : "Belum aktif")}
        </span>
      </div>

      {admin.responseTimeLabel ? (
        <p className="mt-5 flex items-center gap-2 text-sm text-foreground-muted">
          <Clock3 aria-hidden="true" className="size-4 text-brand-cyan" />
          {admin.responseTimeLabel}
        </p>
      ) : null}

      <div className="mt-auto pt-7">
        {href ? (
          <Button variant="whatsapp" className="w-full" asChild>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="whatsapp_click"
              data-source="admin_card"
              data-admin={admin.name}
              data-service={admin.serviceCategory}
              data-label="Chat Admin"
            >
              <MessageCircle aria-hidden="true" />
              Chat Admin
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        ) : (
          <Button variant="secondary" className="w-full" disabled>
            Kontak belum aktif
          </Button>
        )}
      </div>
    </SurfaceCard>
  );
}
