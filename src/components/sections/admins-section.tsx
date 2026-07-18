import { AdminCard } from "@/components/cards/admin-card";
import { SectionBackdrop } from "@/components/brand/section-backdrop";
import { SectionHeading } from "@/components/sections/section-heading";
import type { HomePageContent, WhatsAppAdmin } from "@/types/site";

export function AdminsSection({
  admins,
  homepage,
}: {
  admins: WhatsAppAdmin[];
  homepage: HomePageContent;
}) {
  return (
    <section
      id="kontak"
      className="relative isolate overflow-hidden border-y border-border bg-background-secondary/45 scroll-mt-24 section-space"
    >
      <SectionBackdrop
        variant="wings"
        className="z-0 opacity-45 sm:opacity-70"
      />
      <div
        id="pilih-admin"
        className="relative z-10 section-shell scroll-mt-24"
      >
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <SectionHeading
            eyebrow={homepage.adminsEyebrow}
            title={homepage.adminsHeading}
            description={homepage.adminsDescription}
          />
          <p
            data-motion-reveal
            className="max-w-xl border-l border-brand-cyan/40 pl-5 text-sm leading-6 text-foreground-muted lg:justify-self-end"
          >
            {homepage.adminsWarning}
          </p>
        </div>

        <div
          className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
          data-motion-reveal
          data-motion-stagger
        >
          {admins.map((admin) => (
            <AdminCard key={admin.id} admin={admin} homepage={homepage} />
          ))}
        </div>
      </div>
    </section>
  );
}
