import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";

export function PolicyPage({
  children,
  description,
  lastUpdated,
  title,
}: {
  children: React.ReactNode;
  description: string;
  lastUpdated: string;
  title: string;
}) {
  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border bg-background/95">
        <div className="section-shell flex min-h-20 items-center justify-between gap-5">
          <Link href="/" aria-label="DLMURAH — kembali ke beranda">
            <BrandLogo priority />
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft aria-hidden="true" />
              Beranda
            </Link>
          </Button>
        </div>
      </header>

      <main id="main-content" className="section-shell py-14 sm:py-20">
        <div className="max-w-[65ch]">
          <p className="text-xs font-extrabold tracking-[0.16em] text-brand-cyan uppercase">
            INFORMASI DLMURAH
          </p>
          <h1 className="mt-4 font-heading text-[clamp(2.4rem,7vw,4.5rem)] leading-none font-bold tracking-[-0.055em] text-foreground">
            {title}
          </h1>
          <p className="mt-6 text-base leading-7 text-foreground-muted sm:text-lg sm:leading-8">
            {description}
          </p>
          <p className="mt-4 text-sm text-foreground-muted">
            Terakhir diperbarui: {lastUpdated}
          </p>
        </div>

        <article className="policy-copy mt-12 max-w-[65ch] border-t border-border pt-10">
          {children}
        </article>
      </main>

      <footer className="border-t border-border bg-[#03082b]">
        <div className="section-shell py-7 text-xs leading-5 text-foreground-muted">
          DLMURAH adalah layanan independen dan tidak berafiliasi, didukung,
          atau disponsori oleh Growtopia maupun pemilik merek terkait.
        </div>
      </footer>
    </div>
  );
}
