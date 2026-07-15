import Image from "next/image";
import { ArrowDown, Check, LockKeyhole } from "lucide-react";

import { FOUNDATION_HIGHLIGHTS, SITE_DEFAULTS } from "@/lib/constants";

export default function Home() {
  return (
    <main className="site-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <a
          href="#beranda"
          className="inline-flex min-h-11 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan"
          aria-label="DLMURAH — kembali ke beranda"
        >
          <Image
            src="/brand/logo.webp"
            alt=""
            width={52}
            height={52}
            priority
            className="size-11 rounded-md object-cover ring-1 ring-brand-cyan/30"
          />
          <span className="font-heading text-lg font-bold tracking-[0.08em] text-foreground">
            {SITE_DEFAULTS.name}
          </span>
        </a>

        <span className="hidden items-center gap-2 text-sm font-semibold text-foreground-muted sm:inline-flex">
          <span className="size-2 rounded-full bg-success shadow-[0_0_16px_var(--success)]" />
          Fondasi aktif
        </span>
      </header>

      <section
        id="beranda"
        className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-5 pt-10 pb-16 sm:px-8 sm:pt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(24rem,0.95fr)] lg:gap-8 lg:px-12 lg:pt-12 lg:pb-24"
      >
        <div className="max-w-3xl">
          <p className="mb-6 inline-flex min-h-11 items-center gap-2 border border-brand-cyan/25 bg-brand-cyan/10 px-4 text-xs font-bold tracking-[0.16em] text-brand-ice uppercase [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))]">
            <LockKeyhole
              aria-hidden="true"
              className="size-4 text-brand-cyan"
            />
            Phase 1 · Brand foundation
          </p>

          <h1 className="max-w-4xl font-heading text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.98] font-bold tracking-[-0.055em] text-balance text-foreground">
            Fondasi cepat untuk jalur transaksi yang lebih jelas.
          </h1>

          <p className="mt-7 max-w-[62ch] text-base leading-7 text-foreground-muted sm:text-lg sm:leading-8">
            Sistem visual, struktur aplikasi, tipografi, metadata, dan validasi
            lingkungan DLMURAH telah disiapkan. Konten layanan dan kontak akan
            terhubung ke Contentful pada fase berikutnya.
          </p>

          <a
            href="#fondasi"
            className="mt-9 inline-flex min-h-12 items-center justify-center gap-3 bg-brand-cyan px-6 text-sm font-extrabold text-background transition-[transform,background-color] duration-200 [clip-path:polygon(0_0,calc(100%-12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%-12px))] hover:-translate-y-0.5 hover:bg-brand-ice focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan motion-reduce:transform-none"
          >
            Lihat fondasi
            <ArrowDown aria-hidden="true" className="size-4" />
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:justify-self-end">
          <div className="logo-aura" aria-hidden="true" />
          <div className="angular-frame relative aspect-square overflow-hidden border border-brand-cyan/25 bg-surface-glass p-5 sm:p-8">
            <div className="absolute inset-4 border border-brand-royal/40 sm:inset-6" />
            <Image
              src="/brand/logo.webp"
              alt="Logo DLMURAH berbentuk gembok es bersayap"
              fill
              priority
              sizes="(max-width: 1023px) 90vw, 42vw"
              className="object-cover p-9 sm:p-12"
            />
          </div>
        </div>
      </section>

      <section
        id="fondasi"
        aria-labelledby="foundation-title"
        className="relative z-10 border-t border-border bg-background-secondary/70"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1fr_2fr] md:items-center lg:px-12">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-brand-cyan uppercase">
              Siap dikembangkan
            </p>
            <h2
              id="foundation-title"
              className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground"
            >
              Dasar yang terukur
            </h2>
          </div>

          <dl className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
            {FOUNDATION_HIGHLIGHTS.map((item) => (
              <div key={item.label} className="bg-surface px-5 py-5">
                <dt className="flex items-center gap-2 text-xs font-semibold text-foreground-muted">
                  <Check aria-hidden="true" className="size-4 text-success" />
                  {item.label}
                </dt>
                <dd className="mt-2 font-heading text-lg font-bold text-foreground">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
