import { SectionBackdrop } from "@/components/brand/section-backdrop";
import { ServiceCard } from "@/components/cards/service-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { cn } from "@/lib/utils";
import type { HomePageContent, Service, WhatsAppAdmin } from "@/types/site";

export function ServicesSection({
  admins,
  homepage,
  services,
}: {
  admins: WhatsAppAdmin[];
  homepage: HomePageContent;
  services: Service[];
}) {
  const columnClass =
    {
      1: "lg:grid-cols-1",
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
    }[Math.min(services.length, 4)] ?? "lg:grid-cols-4";

  return (
    <section
      id="layanan"
      className="relative isolate overflow-hidden section-space"
    >
      <SectionBackdrop
        variant="diamonds"
        className="z-0 opacity-45 sm:opacity-80"
      />
      <div className="relative z-10 section-shell">
        <SectionHeading
          eyebrow={homepage.servicesEyebrow}
          title={homepage.servicesHeading}
          description={homepage.servicesDescription}
        />

        <div
          className={cn("mt-12 grid gap-4 md:grid-cols-2", columnClass)}
          data-motion-reveal
          data-motion-stagger
        >
          {services.map((service) => (
            <div key={service.id}>
              <ServiceCard
                service={service}
                homepage={homepage}
                admin={admins.find(
                  (admin) => admin.id === service.whatsappAdminId,
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
