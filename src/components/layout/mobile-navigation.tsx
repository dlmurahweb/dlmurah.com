"use client";

import { Menu, MessageCircle } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/types/site";

export function MobileNavigation({
  activeHref,
  ctaLabel,
  navigation,
  whatsappHref,
}: {
  activeHref?: string;
  ctaLabel: string;
  navigation: NavigationItem[];
  whatsappHref: string;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Buka menu navigasi"
        >
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0">
        <SheetHeader className="border-b border-border p-5 pr-16">
          <SheetTitle>
            <BrandLogo priority size={72} />
          </SheetTitle>
          <SheetDescription>Menu utama DLMURAH</SheetDescription>
        </SheetHeader>

        <nav aria-label="Navigasi mobile" className="flex flex-col p-4">
          {navigation.map((item) => (
            <SheetClose asChild key={item.id}>
              <a
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className={cn(
                  "flex min-h-12 items-center border-b border-border/70 px-3 font-heading font-bold text-foreground-muted transition-colors hover:bg-brand-cyan/10 hover:text-foreground focus-visible:bg-brand-cyan/10",
                  activeHref === item.href && "text-brand-cyan",
                )}
                data-analytics-event="navigation_click"
                data-source="mobile_navigation"
                data-label={item.label}
              >
                {item.label}
              </a>
            </SheetClose>
          ))}
        </nav>

        <div className="mt-auto border-t border-border p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <SheetClose asChild>
            <Button variant="whatsapp" size="lg" className="w-full" asChild>
              <a
                href={whatsappHref}
                data-analytics-event="navigation_click"
                data-source="mobile_cta"
                data-label={ctaLabel}
              >
                <MessageCircle aria-hidden="true" />
                {ctaLabel}
              </a>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
