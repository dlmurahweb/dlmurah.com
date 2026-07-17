import { ArrowRight, ArrowUpRight } from "lucide-react";

import { BrandIcon } from "@/components/brand/brand-icon";
import { AngularFrame } from "@/components/brand/angular-frame";
import { Button } from "@/components/ui/button";
import type { HomePageContent, WhatsAppChannel } from "@/types/site";

export function ChannelCard({
  channel,
  homepage,
}: {
  channel: WhatsAppChannel;
  homepage: HomePageContent;
}) {
  const active = Boolean(channel.isActive && channel.url);

  return (
    <AngularFrame
      accent={active}
      className="flex h-full min-h-72 flex-col overflow-hidden p-7 sm:p-8"
    >
      <div
        className="absolute -top-16 -right-16 size-48 rotate-12 border border-brand-blue/20 bg-brand-blue/5"
        aria-hidden="true"
      />
      <BrandIcon name={channel.iconKey} className="size-7 text-brand-cyan" />
      <h3 className="mt-8 font-heading text-2xl font-bold text-foreground">
        {channel.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-foreground-muted sm:text-base sm:leading-7">
        {channel.description}
      </p>
      {channel.memberCountLabel ? (
        <p className="mt-5 text-xs font-bold text-brand-ice">
          {channel.memberCountLabel}
        </p>
      ) : null}
      <div className="mt-7">
        {active ? (
          <Button variant="channel" asChild>
            <a
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="channel_click"
              data-source="channel_card"
              data-channel={channel.title}
              data-label={homepage.channelCtaLabel}
            >
              {homepage.channelCtaLabel}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        ) : (
          <div className="space-y-4">
            <p className="text-sm leading-6 text-foreground-muted">
              {homepage.inactiveChannelMessage}
            </p>
            <Button variant="secondary" asChild>
              <a
                href="#pilih-admin"
                data-analytics-event="navigation_click"
                data-source="channel_card_inactive"
                data-channel={channel.title}
                data-label={homepage.inactiveChannelCtaLabel}
              >
                {homepage.inactiveChannelCtaLabel}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </AngularFrame>
  );
}
