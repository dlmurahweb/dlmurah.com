import { ArrowUpRight, Info, Megaphone, TriangleAlert } from "lucide-react";

import type { Announcement } from "@/types/site";

const icons = {
  information: Info,
  promotion: Megaphone,
  warning: TriangleAlert,
};

export function AnnouncementBar({
  announcement,
}: {
  announcement?: Announcement;
}) {
  if (!announcement) return null;

  const Icon = icons[announcement.variant];
  const external = announcement.linkUrl?.startsWith("https://");

  return (
    <aside
      className="relative z-50 border-b border-brand-cyan/15 bg-background-secondary px-5 py-2.5 text-sm text-foreground"
      aria-label="Pengumuman"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 text-center">
        <Icon aria-hidden="true" className="size-4 shrink-0 text-brand-cyan" />
        <span>{announcement.message}</span>
        {announcement.linkLabel && announcement.linkUrl ? (
          <a
            href={announcement.linkUrl}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="inline-flex min-h-11 items-center gap-1 font-bold text-brand-cyan underline-offset-4 hover:text-brand-ice hover:underline"
          >
            {announcement.linkLabel}
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </a>
        ) : null}
      </div>
    </aside>
  );
}
