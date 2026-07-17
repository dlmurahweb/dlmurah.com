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
    <section id="layanan" className="section-space">
      <div className="section-shell">
        <SectionHeading
          eyebrow={homepage.servicesEyebrow}
          title={homepage.servicesHeading}
          description={homepage.servicesDescription}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
