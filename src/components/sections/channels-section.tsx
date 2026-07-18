import { ChannelCard } from "@/components/cards/channel-card";
import { SectionHeading } from "@/components/sections/section-heading";
import type { HomePageContent, WhatsAppChannel } from "@/types/site";

export function ChannelsSection({
  channels,
  homepage,
}: {
  channels: WhatsAppChannel[];
  homepage: HomePageContent;
}) {
  return (
    <section id="saluran" className="section-space">
      <div className="section-shell">
        <SectionHeading
          eyebrow={homepage.channelsEyebrow}
          title={homepage.channelsHeading}
          description={homepage.channelsDescription}
        />
        <div
          className="mt-12 grid gap-5 md:grid-cols-2"
          data-motion-reveal
          data-motion-stagger
        >
          {channels.slice(0, 2).map((channel) => (
            <ChannelCard
              key={channel.id}
              channel={channel}
              homepage={homepage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
