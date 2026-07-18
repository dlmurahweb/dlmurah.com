import { SectionBackdrop } from "@/components/brand/section-backdrop";
import { ServiceCard } from "@/components/cards/service-card";
import { SectionHeading } from "@/components/sections/section-heading";
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
          className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
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
