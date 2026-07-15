import { AdminCard } from "@/components/cards/admin-card";
import { SectionHeading } from "@/components/sections/section-heading";
import type { WhatsAppAdmin } from "@/types/site";

export function AdminsSection({ admins }: { admins: WhatsAppAdmin[] }) {
  return (
    <section
      id="pilih-admin"
      className="border-y border-border bg-background-secondary/45 section-space"
    >
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <SectionHeading
            eyebrow="KONTAK SESUAI KATEGORI"
            title="Pilih Admin"
            description="Pilih admin berdasarkan layanan yang kamu butuhkan agar pesanmu dapat diproses oleh kontak yang sesuai."
          />
          <p className="max-w-xl border-l border-brand-cyan/40 pl-5 text-sm leading-6 text-foreground-muted lg:justify-self-end">
            Nomor yang belum aktif tidak dapat diklik. Gunakan hanya kontak yang
            tercantum pada website resmi DLMURAH.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {admins.map((admin) => (
            <AdminCard key={admin.id} admin={admin} />
          ))}
        </div>
      </div>
    </section>
  );
}
