import { ArrowUpRight, MessageCircle } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { createAdminWhatsAppLink } from "@/lib/whatsapp";
import type {
  NavigationItem,
  SiteSettings,
  WhatsAppAdmin,
  WhatsAppChannel,
} from "@/types/site";

export function Footer({
  admins,
  channels,
  navigation,
  settings,
}: {
  admins: WhatsAppAdmin[];
  channels: WhatsAppChannel[];
  navigation: NavigationItem[];
  settings: SiteSettings;
}) {
  return (
    <footer id="site-footer" className="border-t border-border bg-[#03082b]">
      <div className="section-shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr]">
        <div>
          <BrandLogo priority size={88} />
          <p className="mt-5 max-w-sm text-sm leading-6 text-foreground-muted">
            {settings.siteDescription}
          </p>
        </div>

        <div>
          <h2 className="font-heading text-sm font-bold text-foreground">
            {settings.footerNavigationHeading}
          </h2>
          <ul className="mt-4 space-y-1">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-sm text-foreground-muted hover:text-brand-cyan"
                  data-analytics-event="navigation_click"
                  data-source="footer"
                  data-label={item.label}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-sm font-bold text-foreground">
            {settings.footerAdminsHeading}
          </h2>
          <ul className="mt-4 space-y-1">
            {admins.map((admin) => {
              const href = createAdminWhatsAppLink(admin);
              return (
                <li key={admin.id}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 text-sm text-foreground-muted hover:text-success"
                      data-analytics-event="whatsapp_click"
                      data-source="footer_admin"
                      data-admin={admin.name}
                      data-service={admin.serviceCategory}
                      data-label={admin.name}
                    >
                      <MessageCircle aria-hidden="true" className="size-4" />
                      {admin.name}
                    </a>
                  ) : (
                    <span className="inline-flex min-h-11 items-center text-sm text-foreground-muted/70">
                      {admin.name} {settings.footerInactiveSuffix}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-sm font-bold text-foreground">
            {settings.footerChannelsHeading}
          </h2>
          <ul className="mt-4 space-y-1">
            {channels.map((channel) => (
              <li key={channel.id}>
                {channel.isActive && channel.url ? (
                  <a
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 text-sm text-foreground-muted hover:text-brand-cyan"
                    data-analytics-event="channel_click"
                    data-source="footer_channel"
                    data-channel={channel.title}
                    data-label={channel.title}
                  >
                    {channel.title}
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </a>
                ) : (
                  <span className="inline-flex min-h-11 items-center text-sm text-foreground-muted/70">
                    {channel.title} {settings.footerInactiveSuffix}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="section-shell flex flex-col gap-5 py-6 text-xs leading-5 text-foreground-muted md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p>{settings.footerDisclaimer}</p>
            <p className="mt-2">{settings.copyrightText}</p>
          </div>
          <div className="flex flex-wrap gap-x-5">
            <a
              href="/kebijakan-privasi"
              className="inline-flex min-h-11 items-center hover:text-brand-cyan"
            >
              {settings.footerPrivacyLabel}
            </a>
            <a
              href="/syarat-layanan"
              className="inline-flex min-h-11 items-center hover:text-brand-cyan"
            >
              {settings.footerTermsLabel}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
