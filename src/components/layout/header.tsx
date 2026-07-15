"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/types/site";

export function Header({
  navigation,
  whatsappHref,
}: {
  navigation: NavigationItem[];
  whatsappHref?: string | null;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string>();
  const ctaHref = whatsappHref ?? "#pilih-admin";
  const whatsappExternal = ctaHref.startsWith("https://");

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 12);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    const anchors = navigation
      .map((item) => item.href)
      .filter((href) => href.startsWith("#"));
    const elements = anchors
      .map((href) => document.querySelector(href))
      .filter((element): element is Element => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: [0, 0.25, 0.5] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [navigation]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-transparent transition-[background-color,border-color,box-shadow] duration-300",
        scrolled &&
          "border-border bg-background/92 shadow-[0_12px_40px_rgb(2_7_35_/_0.35)] supports-backdrop-filter:backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <a
          href="#beranda"
          aria-label="DLMURAH — kembali ke beranda"
          className="rounded-md"
          data-analytics-event="navigation_click"
          data-source="header_logo"
          data-label="Beranda"
        >
          <BrandLogo priority />
        </a>

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center lg:flex"
        >
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
              className={cn(
                "relative inline-flex min-h-11 items-center px-3 text-sm font-bold text-foreground-muted transition-colors hover:text-foreground",
                activeHref === item.href && "text-brand-cyan",
              )}
              aria-current={activeHref === item.href ? "location" : undefined}
              data-analytics-event="navigation_click"
              data-source="header"
              data-label={item.label}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="whatsapp" className="hidden xl:inline-flex" asChild>
            <a
              href={ctaHref}
              target={whatsappExternal ? "_blank" : undefined}
              rel={whatsappExternal ? "noopener noreferrer" : undefined}
              data-analytics-event={
                whatsappExternal ? "whatsapp_click" : "navigation_click"
              }
              data-source="header_cta"
              data-label="Chat di WhatsApp"
            >
              <MessageCircle aria-hidden="true" />
              Chat di WhatsApp
            </a>
          </Button>
          <MobileNavigation
            activeHref={activeHref}
            navigation={navigation}
            whatsappHref={ctaHref}
          />
        </div>
      </div>
    </header>
  );
}
