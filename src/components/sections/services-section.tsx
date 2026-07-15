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
          eyebrow="PILIH KEBUTUHAN"
          title={homepage.servicesHeading}
          description={homepage.servicesDescription}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={index === 0 ? "lg:row-span-2" : undefined}
            >
              <ServiceCard
                service={service}
                admin={admins.find(
                  (admin) => admin.id === service.whatsappAdminId,
                )}
                featured={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
