import { ChannelCard } from "@/components/cards/channel-card";
import { SectionHeading } from "@/components/sections/section-heading";
import type { WhatsAppChannel } from "@/types/site";

export function ChannelsSection({ channels }: { channels: WhatsAppChannel[] }) {
  return (
    <section id="saluran" className="section-space">
      <div className="section-shell">
        <SectionHeading
          eyebrow="PEMBARUAN RESMI"
          title="Ikuti Saluran WhatsApp"
          description="Gunakan saluran resmi untuk melihat informasi harga, stok, perubahan kontak, dan pengumuman DLMURAH."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {channels.slice(0, 2).map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      </div>
    </section>
  );
}
